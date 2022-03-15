from time import sleep
import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
reader = SimpleMFRC522()
import time
import sys
import json
import socket

# set host and port
HOST = '192.168.1.241'
PORT = 8001

# set GPIO pin
green_pin = 40
red_pin = 38
rfid_reader = 11
photoresistor_pin = 7

# set local data
raspberry = "XO739926472323245654"
box_id = "61d60363ebd7f582e4ad2078"
box_name = "ASE Box"
box_address = "XXX Street"


GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)

# set the initial state of devices
GPIO.setup(green_pin,GPIO.OUT,initial=GPIO.LOW)
GPIO.setup(red_pin,GPIO.OUT,initial=GPIO.LOW)
GPIO.setup(rfid_reader,GPIO.IN,pull_up_down=GPIO.PUD_UP)

def light_led(color,sec):
    GPIO.output(color,GPIO.HIGH)
    sleep(sec)
    GPIO.output(color,GPIO.LOW)


def check_time(photoresistor_pin):

    #Output on the pin for 
    GPIO.setup(photoresistor_pin, GPIO.OUT)
    GPIO.output(photoresistor_pin, GPIO.LOW)
    
    #Change the pin back to input
    GPIO.setup(photoresistor_pin, GPIO.IN)
    
    t0 = time.time()
    
    #Count until the pin goes high
    while (GPIO.input(photoresistor_pin) == GPIO.LOW):
        if(time.time()-t0>10):
            GPIO.output(red_pin, GPIO.HIGH)
            GPIO.output(red_pin, GPIO.LOW)


# main function
try:
    while True:
        
        # create the connection between raspberry_pi and PC
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.connect((HOST,PORT))
        
        # upon starting the raspberry_pi, send the box_id first
        byte_box_id = bytes(box_id, encoding = "utf-8")
        sock.send(byte_box_id)
        # receive the corresponding customer_id
        customer_id = sock.recv(1024).decode("utf-8")
        print("Customer ID: "+customer_id)
        
        # Ready to scan the RFID token
        print("Please hold a tag near the reader")
        b_token, user_obj = reader.read()
        # print("ID: %s\nText: %s" % (id,user_obj))
        token = str(b_token)
        # send byte_token to PC
        byte_token = bytes(token, encoding = "utf-8")
        sock.send(byte_token)

        # receive msg from PC
        msg = sock.recv(1024).decode("utf-8")
        
        # split the message, and store the role of user
        msg_splited = msg.split(",");
        user_role = msg_splited[0]
        
        try:
            # case 1: user_role == deliverer
            if user_role == "DELIVERER":
                # if the deliverer is correct
                if msg_splited[1] == "True":
                    # print deliverer's token
                    print("Deliverer token: %s\nBox open!\n" % (token))
                    # open the green light for 3 seconds
                    light_led(green_pin, 3)
                    # use photoresistor to check whether the box is closed properly
                    check_time(photoresistor_pin)
                    # transfer "CLOSED" type from str to byte
                    byte_closed = bytes("CLOSED", encoding = "utf-8")
                    # send byte_closed to PC
                    sock.send(byte_closed)
                else:
                    print("Deliverer ID: %s\nAuthentication fails!\n" % (token))
                    # open the red light for 3 seconds
                    light_led(red_pin, 3)
            
            # case 2: user_role == customer
            elif user_role == "CUSTOMER":
                # if the deliverer is correct
                if msg_splited[1] == "True":
                    # print customer's token
                    print("Customer token: %s\nBox open!\n" % (token))
                    # open the green light for 3 seconds
                    light_led(green_pin, 3)
                    # use photoresistor to check whether the box is closed properly
                    check_time(photoresistor_pin)
                    # transfer "CLOSED" type from str to byte
                    byte_closed = bytes("CLOSED", encoding = "utf-8")
                    # send byte_closed to PC
                    sock.send(byte_closed)
                else:
                    print("Customer ID: %s\nAuthentication fails!\n" % (token))
                    # open the red light for 3 seconds
                    light_led(red_pin, 3)
            else:
                # print invalid token
                print("Fail to open the box!\n")
                # open the red light for 3 seconds
                light_led(red_pin, 3)
            
        except ValueError:
            light_led(red_pin, 10)
        sock.close()

except KeyboardInterrupt:
    GPIO.cleanup()
    raise

