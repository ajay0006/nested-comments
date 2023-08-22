import axios from "axios";

// the services folder contains all the re-usable codes for making api calls to the server

// make request just contains the re-usable code for making calls to any api, be it getPosts, getPost by id etc
const api = axios.create({
    baseURL : process.env.REACT_APP_SERVER_URL,
    withCredentials: true
})

// this function takes 2 parameters the url which is a partial url
// remember we already have a base url set above

// and a optional options parameter
export function makeRequest(url, options) {
    return api(url, options)
        .then(res => res.data)
        .catch(error => Promise.reject(error?.response?.data?.message ?? "Error"))
}

export default makeRequest