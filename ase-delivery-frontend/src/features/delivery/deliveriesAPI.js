import axios from "axios";

const baseURL = 'http://localhost:8080/delivery'

export function fetchDeliveries(type, id) {
    return new Promise(async (resolve, reject) => {
        axios.get(`${baseURL}/${type}/${id}`, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => reject(err))
    });
}

export function searchDeliveriesById(id) {
    return new Promise(async (resolve, reject) => {
        axios.get(`${baseURL}/findAllById/${id}`, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => reject(err))
    });
}

export function fetchDeliveryById(id) {
    return new Promise(async (resolve, reject) => {
        axios.get(`${baseURL}/findById/${id}`, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => reject(err))
    });
}

export function createDelivery(newDelivery) {
    return new Promise(async (resolve, reject) => {
        axios.post(`${baseURL}/create`, newDelivery, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => {
                reject(err.response.data)
            })
    });
}

export function updateDelivery(newDelivery) {
    return new Promise(async (resolve, reject) => {
        axios.post(`${baseURL}/update`, newDelivery, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => {
                reject(err.response.data)
            })
    });
}

export function deleteDelivery(id) {
    return new Promise(async (resolve, reject) => {
        axios.delete(`${baseURL}/delete/${id}`, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => reject(err))
    });
}

export function readDeliveryDetail(id) {
    return new Promise(async (resolve, reject) => {
        axios.get(`${baseURL}/detail/${id}`, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => reject(err))
    })
}

export function fetchDeliveriesByBoxId(id) {
    return new Promise(async (resolve, reject) => {
        axios.get(`${baseURL}/findAllByBoxId/${id}`, {withCredentials: true})
            .then(resp => resolve(resp))
            .catch(err => reject(err))
    });
}

// TODO: add APIs here
