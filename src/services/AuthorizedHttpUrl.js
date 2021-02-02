// import axios from "axios";

// export default axios.create({
//   baseURL: "http://localhost:3000/api",
//   headers: {
//     "Content-type": "application/json"
//   }
// });

import axios from "axios";
import Auth from './../auth';
import {Redirect } from 'react-router';


export default axios.create({
  baseURL: "https://tnpvision-cors.herokuapp.com/http://20.37.50.140:8000",
  headers: {
    "Content-type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Authorization": "Token " + Auth.getToken() 
    // != null ? Auth.getToken : {<Redirect to="/" />}
  }
});