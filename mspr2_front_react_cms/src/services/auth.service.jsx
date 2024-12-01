import axios from "axios";
import {BASE_URL} from '../config/config.js';

const API_URL = `${BASE_URL}/api/auth/`;

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    
  }

    
  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  verifyCaptcha(token) {
    console.log("send verif request")
    return axios.post(API_URL + "verify", {
      token
    });

  }

}

export default new AuthService();
