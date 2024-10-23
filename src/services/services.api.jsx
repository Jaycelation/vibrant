import axios from "axios";

const API_KEY = "YrylhPuNPdnOLEm25hrWaFe8UpxsHO_xp4h4P9A2Gfs";
const API_URL = "https://api.unsplash.com/";
const getARandomPhotoAPI = () => {
    return axios.get(`${API_URL}photos/random?client_id=${API_KEY}`)
}
const fetchListPhotosAPI = () => {
    return axios.get(`${API_URL}photos/?client_id=${API_KEY}`)
}
const searchPhotosAPI = (query) => {
    return axios.get(`${API_URL}search/photos/?page=1&query=${query}&client_id=${API_KEY}`)
}
export {
    getARandomPhotoAPI, fetchListPhotosAPI, searchPhotosAPI
}