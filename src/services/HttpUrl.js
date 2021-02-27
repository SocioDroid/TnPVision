import axios from "axios";
import baseURL from './BaseUrl'
export default axios.create({
  baseURL: baseURL(),
  headers: {
    "Content-type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  }
});