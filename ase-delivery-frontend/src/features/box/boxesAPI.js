import axios from "axios";

const baseURL = 'http://localhost:8080/boxes'

export function fetchBoxes() {
    return new Promise((resolve, reject) => {
        axios.get(baseURL, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => reject(err))
    });
}

export function fetchBox(id) {
    return new Promise((resolve, reject) => {
       axios.get(`${baseURL}/${id}`, {withCredentials: true})
           .then(resp => resolve(resp))
           .catch(err => reject(err))
    });
}

export function fetchBoxesByCustomerId(id) {
    return new Promise((resolve, reject) => {
       axios.get(`${baseURL}/customer/${id}`, {withCredentials: true})
           .then(resp => resolve(resp))
           .catch(err => reject(err))
    });
}

export function fetchBoxesByDelivererId(id) {
    return new Promise((resolve, reject) => {
       axios.get(`${baseURL}/deliverer/${id}`, {withCredentials: true})
           .then(resp => resolve(resp))
           .catch(err => reject(err))
    });
}


export function createBox(newBox) {
    return new Promise((resolve, reject) => {
        axios.post(`${baseURL}/create`, newBox, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => reject(err.response.data))
    });
}



export function updateBox(newBox) {
    return new Promise((resolve, reject) => {
        axios.post(`${baseURL}/update`, newBox, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => reject(err.response.data))
    });
}

export function deleteBox(id) {
    return new Promise((resolve,reject) => {
        axios.delete(`${baseURL}/${id}`, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => reject(err))
    });
}

export function searchBoxes(text) {
    return new Promise((resolve, reject) => {
        axios.get(`${baseURL}/search/${text}`, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => reject(err))
    });
}


// TODO: add APIs here