import axios from "axios";

const baseURL = 'http://localhost:8080/users'

// params: role should be uppercase string, like 'CUSTOMER'
export function fetchUsers() {
    return new Promise((resolve, reject) => {
        axios.get(baseURL, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => reject(err))
    });
}

export function fetchUser(id) {
    return new Promise((resolve, reject) => {
       axios.get(`${baseURL}/${id}`, {withCredentials: true})
           .then(resp => resolve(resp))
           .catch(err => reject(err))
    });
}

export function searchUsers(text) {
    return new Promise((resolve, reject) => {
        axios.get(`${baseURL}/search/${text}`, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => reject(err))
    });
}

export function createUser(newUser) {
    return new Promise((resolve, reject) => {
        axios.post(`${baseURL}/create`, newUser, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => reject(err))
    });
}

export function updateUser(newUser) {
    return new Promise((resolve, reject) => {
        axios.post(`${baseURL}/update`, newUser, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => reject(err))
    });
}

export function deleteUser(id) {
    return new Promise((resolve,reject) => {
        axios.delete(`${baseURL}/${id}`, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => reject(err))
    });
}

// TODO: add APIs here