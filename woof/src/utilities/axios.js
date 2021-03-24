import axios from 'axios';
const instance = axios.create({
    baseURL : "https://wo0of.herokuapp.com",
});

export default instance;