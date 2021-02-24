import axios from "axios";
import Auth from './../auth';


export default axios.create({
  baseURL: "http://20.37.50.140:8000",
  headers: {
    "Content-type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    //'Cache-Control': 'no-cache',
    "Authorization": "Token " + Auth.getToken()
  }
});