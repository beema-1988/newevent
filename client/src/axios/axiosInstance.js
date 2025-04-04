import axios from "axios";

// const url = import.meta.env.VITE_BASE_URL 
// console.log(url,"baseURL");

// const axiosInstance=axios.create({
//     baseURL:url,
//     withCredentials:true
// })

const API_BASE_URL = import.meta.env.VITE_BASE_URL 
console.log(API_BASE_URL,"baseURL");

const axiosInstance=axios.create({
    baseURL:API_BASE_URL,
    withCredentials:true
})


// export const getEventDetails = (eventId) => {
//     return axiosInstance.get(`/events/eventdetails/${eventId}`);
// };

export { axiosInstance };