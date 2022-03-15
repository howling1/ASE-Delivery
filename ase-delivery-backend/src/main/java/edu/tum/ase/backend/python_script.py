import pymongo
from bson import ObjectId
import socket
import time
import base64
import requests
import json
import gc

if __name__ == '__main__':

    # connect MongoDB
    client = pymongo.MongoClient(host='localhost', port=27017)
    db = client['ase_database']
    collection_users = db['users']
    collection_boxes = db['boxes']
    collection_deliveries = db['deliveries']

    # Setup socket
    HOST = '192.168.1.241'
    PORT = 8001
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind((HOST, PORT))
    sock.listen(5)


# Start here
    while True:

        # Setup HTTP connection params
        hostUrl = "http://localhost:8080"
        session = requests.Session()
        info = "test@test.com" + ':' + "123"
        params = {
            'mode': "cors",
            "cache": "no-cache",
            "credentials": "include",
            "redirect": "follow",
            "referrerPolicy": "origin-when-cross-origin"
        }

        # define HTTP and auth functions
        def httpRequest(method, url, params, headers='', content=''):
            if method == 'GET':
                res = session.get(url, params=params)
                return res
            elif method == 'POST':
                res = session.post(url, params=params, headers=headers, json=content)
                return res
            else:
                raise ValueError('Method Not Found')

        def getBaseHeaders(xsrf_token):
            return {
                "Content-Type": "application/json",
                "X-XSRF-TOKEN": xsrf_token,
                "Authorization": "Basic " + base64.b64encode(info.encode()).decode('ascii')
            }

        def getXSRFToken():
            r = httpRequest('GET', hostUrl + '/auth/csrf', params)
            # print(r.status_code)
            # 1. CHECK RESPONSE STATUS AND RETURN THE XSRF TOKEN OR THROW AN EXCEPTION
            if (r.status_code == 200):
                cookie_dir = r.cookies.get_dict()
                cookie = cookie_dir['XSRF-TOKEN']
                info_en = base64.b64encode(info.encode()).decode('ascii')
                # print(info_en)
                return cookie
            else:
                return -1

        def auth(xsrf_token):
            r = httpRequest(
                'POST',
                hostUrl + '/auth',
                params,
                # 2. INCLUDE THE BASE HEADERS  # 3. USE BASIC AUTH
                getBaseHeaders(xsrf_token)
            )
            # 4. CHECK RESPONSE STATUS AND RETURN THE JWT TOKEN OR THROW AN EXCEPTION
            if (r.status_code == 200):
                # print('authStatusCode=', r.status_code)
                # print(r.content.decode('ascii'))
                return r.content.decode('ascii')

        def callEmail(xsrf_token, api, customerId):
            r = httpRequest(
                'POST',
                hostUrl + api,
                params,
                # 5. INCLUDE THE BASE HEADERS
                getBaseHeaders(xsrf_token),
                # 6. ADD THE REQUEST BODY
                json.dumps({"customerId": customerId})
            )
            # print("Status code send email", r.status_code)
        
        # build connection between PC and Raspberry Pi
        connection,address = sock.accept()
        try:
            connection.settimeout(300)
            #receive box_id
            byte_box_id = connection.recv(1024)

            # if box_id is valid
            if byte_box_id:
                box_id = str(byte_box_id, encoding="utf-8")
                # print(box_id)
                box = collection_boxes.find_one({'_id': ObjectId(box_id)})
                # print(box)
                customer_id = box.get('customerId')
                # print(customer_id)
                byte_customer_id = bytes(customer_id, encoding="utf-8")
                connection.send(byte_customer_id)
            # if box_id is invalid
            else:
                print("Invalid box")
                connection.close()

            byte_token = connection.recv(1024)
            if byte_token:
                token = str(byte_token, encoding="utf-8")
                # find the role of the corresponding token
                user = collection_users.find_one({'rfid': token})
                if user is None:
                    # invalid user
                    connection.close()
                else:
                    role = user.get('role')

                    # case 1: user_role == deliverer
                    if(role == "DELIVERER"):
                        # get deliverer_id from collection_users
                        deliverer = collection_users.find_one({'rfid': token})
                        deliverer_id = str(deliverer.get('_id'))
                        # if the deliverer exists
                        if deliverer:
                            # find the INTRANSIT deliveries of deliverer_id and customer_id
                            deliveries_query = {'customerId': customer_id,
                                                'delivererId': deliverer_id,
                                                'status': "INTRANSIT"}
                            deliveries = collection_deliveries.find(deliveries_query)
                            # if the deliveries exist
                            if list(deliveries) != []:
                                msg = 'DELIVERER'+','+'True'+','+str(deliverer_id)
                                byte_msg = bytes(msg, encoding="utf-8")
                                connection.send(byte_msg)
                                byte_closed = connection.recv(1024)
                                closed = str(byte_closed, encoding="utf-8")
                                # if the box is not closed properly
                                if closed == 'CLOSED':
                                    # update delivery status INTRANSIT to INBOX
                                    update_deliveries_query = {"$set": {'status': "INBOX"}}
                                    updated_deliveries = collection_deliveries.update_many(
                                        deliveries_query, update_deliveries_query)
                                    # print(updated_deliveries.modified_count, "deliveries集合已修改")
                                    # update box status to FILLED
                                    update_boxes_query = {'_id': ObjectId(box_id)}
                                    updated_boxes = {"$set": {"status": "FILLED"}}
                                    collection_boxes.update_one(update_boxes_query, updated_boxes)
                                    csrf_token = getXSRFToken()
                                    jwt = auth(csrf_token)
                                    callEmail(csrf_token, '/email_inbox', customer_id)
                                    connection.close()
                                else:
                                    connection.close()
                            else:
                                connection.send(b'No intransit deliveries exist')
                                connection.close()
                        else:
                            connection.send(b'Invalid delivery')
                            connection.close()

                    # case 2: user_role == customer
                    elif (role == "CUSTOMER"):
                        # get deliverer_id from collection_users
                        customer_new = collection_users.find_one({'rfid': token})
                        customer_id_new = str(customer_new.get('_id'))
                        # if the identity of customer is right
                        if customer_id_new == customer_id:
                            msg = 'CUSTOMER' + ',' + 'True'
                            byte_msg = bytes(msg, encoding="utf-8")
                            connection.send(byte_msg)
                            byte_closed = connection.recv(1024)
                            closed = str(byte_closed, encoding="utf-8")
                            # if the box is closed properly
                            if closed == 'CLOSED':
                                # update delivery status INTRANSIT to INBOX
                                deliveries_query = {'customerId': customer_id,
                                                    'status': 'INBOX'}
                                update_deliveries_query = {"$set": {"status": "FINISHED"}}
                                updated_deliveries = collection_deliveries.update_many(
                                    deliveries_query, update_deliveries_query)
                                # update box status to EMPTY
                                boxes_query = {'_id': ObjectId(box_id)}
                                updated_boxes_query = {"$set": {"status": "EMPTY"}}
                                collection_boxes.update_one(boxes_query, updated_boxes_query)
                                csrf_token = getXSRFToken()
                                jwt = auth(csrf_token)
                                callEmail(csrf_token, '/email_finished', customer_id)
                                connection.close()
                            else:
                                connection.close()
                        else:
                            connection.send(b'Invalid customer')
                            connection.close()
                    # invalid user
                    else:
                        connection.close()


        #socket timeout error
        except socket.timeout:
            print('time out!')

        # close connection
        connection.close()

