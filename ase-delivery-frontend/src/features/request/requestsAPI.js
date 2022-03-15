import axios from "axios"

const baseURL = 'http://localhost:8080/requests'


export function createRequest(request) {
    return new Promise((resolve, reject) => {
        axios.post(`${baseURL}/create`, request, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => {
                if (err.response) {
                    let statusCode = err.response.status;
                    if (statusCode === 400) {
                        reject(new Error("Request with same email already exists"))
                    } else if (statusCode === 409) {
                        reject(new Error("User already exists"))
                    } else {
                        reject(new Error("Unknown error"))
                    }
                }
            })
    });
}

export function deleteRequest(id) {
    return new Promise((resolve, reject) => {
        axios.delete(`${baseURL}/${id}`, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => reject(err))
    });
}

export function readRequests() {
    return new Promise((resolve, reject) => {
        axios.get(`${baseURL}`, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => reject(err))
    });
}

export function readRequestsByEmail(email) {
    return new Promise((resolve, reject) => {
        axios.get(`${baseURL}/search/${email}`, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => reject(err))
    });
}
