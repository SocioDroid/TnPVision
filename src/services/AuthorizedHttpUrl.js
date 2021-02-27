import axios from "axios";
import Auth from './../auth';
import baseURL from './BaseUrl'

export default axios.create({
  baseURL: baseURL(),
  headers: {
    "Content-type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    //'Cache-Control': 'no-cache',
    "Authorization": "Token " + Auth.getToken()
  }
});