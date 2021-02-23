import axios from "axios";

export default axios.create({
  baseURL: "http://20.37.50.140:8000",
  headers: {
    "Content-type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  }
});