import axios from "axios";

const instance = axios.create({
  // .. where we make our configurations
  baseURL: "http://localhost:5005/api",
});

// // Where you would set stuff like your 'Authorization' header, etc ...
// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// // Also add/ configure interceptors && all the other cool stuff

// instance.interceptors.request...

export default instance;
