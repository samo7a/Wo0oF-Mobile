import axios from "axios";

const Axios = axios.create({
  baseURL: "https://wo0of.herokuapp.com",
  //baseURL: "http://192.168.0.9:5000/",
  //headers: { "X-Custom-Header": "foobar", "Content-Type": "application/json" },
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = (token) => {
  Axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default Axios;
