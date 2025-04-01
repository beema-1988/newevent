import { axiosInstance } from "../axios/axiosInstance"



// export const listEvents = () =>{
//     return axiosInstance.get("/events/eventlist")
// }

export const userSignUp = (data) =>{
    return axiosInstance.post("/user/register",data)
}

export const userLogin = (data) =>{
    return axiosInstance.post("/user/login",data)
 }

 export const userLogout = () =>{
    return axiosInstance.post("/user/logout")
 }


// Correct the axios call to use the eventId
// export const eventsDetails = (eventId) => {
//   return axiosInstance.get(`/events/eventdetails/${eventId}`);
// };
export const getAll = () =>{
    return axiosInstance.get("/tickets/ticketlist")
}
export const adminLogin = (data) =>{
    return axiosInstance.post("/admin/login",data)
 }



