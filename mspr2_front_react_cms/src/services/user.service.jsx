import axios from 'axios';
import authHeader from './auth-header';
import {BASE_URL} from '../config/config.js';

const API_TEST_URL =    `${BASE_URL}/api/access/`;
const API_INFO_URL =    `${BASE_URL}/api/informations/`;
const API_CONCERT_URL = `${BASE_URL}/api/concerts/`;
const API_POINTEUR_URL = `${BASE_URL}/api/pointeurs/`;
const API_AUTH_URL = `${BASE_URL}/api/auth/`;

class UserService {
  getPublicContent() {
    return axios.get(API_TEST_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_TEST_URL + 'viewer', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_TEST_URL + 'editor', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_TEST_URL + 'admin', { headers: authHeader() });
  }

////////////////////////////////////////////////////////////////////// concert section 

  getConcert() {
    return axios.get(API_CONCERT_URL + 'all', { headers: authHeader() });
  }

  createConcert(data){    
    return axios.post(API_CONCERT_URL,data, { headers: authHeader() });
  }
  
  updateConcert(data,id){    
    return axios.put(API_CONCERT_URL+'update/'+id,data, { headers: authHeader() });
  }
  
  deleteConcert(id){    
    return axios.delete(API_CONCERT_URL + id, { headers: authHeader() });
  }
  
////////////////////////////////////////////////////////////////////// pointeur section

  getPointeur() {
    return axios.get(API_POINTEUR_URL + 'all', { headers: authHeader() });
  }
  
  createPointeur(data){    
    return axios.post(API_POINTEUR_URL,data, { headers: authHeader() });
  }
  
  updatePointeur(data,id){    
    return axios.put(API_POINTEUR_URL+'update/'+id,data, { headers: authHeader() });
  }
  
  deletePointeur(id){    
    return axios.delete(API_POINTEUR_URL + id, { headers: authHeader() });
  }
  
/////////////////////////////////////////////////////////////////////////// info section

  getInfo() {
    const url=API_INFO_URL + 'all';    
    return axios.get(url, { headers: authHeader() });
  }
  
  createInfo(data){    
    return axios.post(API_INFO_URL,data, { headers: authHeader() });
  }
  
  updateInfo(data,id){    
    return axios.put(API_INFO_URL+'update/'+id,data, { headers: authHeader() });
  }
  
  deleteInfo(id){   
    return axios.delete(API_INFO_URL + id, { headers: authHeader() });
  }

  ////////////////////////////////////////////////////////////////////////// auth section (users)

  getUsers() {
    return axios.get(API_AUTH_URL + 'all', { headers: authHeader() });
  }

  deleteUser(id){    
    return axios.delete(API_AUTH_URL + id, { headers: authHeader() });
  }

  updateUser(data,id){  
    return axios.put(API_AUTH_URL + id,data, { headers: authHeader() });
  }

}

export default new UserService();
