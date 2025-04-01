import axios from "axios";

const url = import.meta.env.VITE_BASE_URL 
console.log(url,"baseURL");

const axiosInstance=axios.create({
    baseURL:url,
    withCredentials:true
})


// export const getEventDetails = (eventId) => {
//     return axiosInstance.get(`/events/eventdetails/${eventId}`);
// };

export { axiosInstance };