import axios from 'axios';
import authHeader from './auth-header';

const API_TEST_URL = 'http://localhost:8080/api/test/';
const API_INFO_URL = 'http://localhost:8080/api/informations/';
const API_CONCERT_URL = 'http://localhost:8080/api/concerts/';
const API_POINTEUR_URL = 'http://localhost:8080/api/pointeurs/';
const API_AUTH_URL = 'http://localhost:8080/api/auth/';

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
    console.log("service create"+data)
    console.log(authHeader())
    return axios.post(API_CONCERT_URL,data, { headers: authHeader() });
  }
  
  updateConcert(data,id){
    console.log("service create"+data)
    console.log(authHeader())
    return axios.put(API_CONCERT_URL+'update/'+id,data, { headers: authHeader() });
  }
  
  deleteConcert(id){
    console.log("service delete"+id)
    return axios.delete(API_CONCERT_URL + id, { headers: authHeader() });
  }
  
////////////////////////////////////////////////////////////////////// pointeur section

  getPointeur() {
    return axios.get(API_POINTEUR_URL + 'all', { headers: authHeader() });
  }
  
  createPointeur(data){
    console.log("service create"+data)
    console.log(authHeader())
    return axios.post(API_POINTEUR_URL,data, { headers: authHeader() });
  }
  
  updatePointeur(data,id){
    console.log("service create"+data)
    console.log(authHeader())
    return axios.put(API_POINTEUR_URL+'update/'+id,data, { headers: authHeader() });
  }
  
  deletePointeur(id){
    console.log("service delete"+id)
    return axios.delete(API_POINTEUR_URL + id, { headers: authHeader() });
  }
  
/////////////////////////////////////////////////////////////////////////// info section

  getInfo() {
    return axios.get(API_INFO_URL + 'all', { headers: authHeader() });
  }
  
  createInfo(data){
    console.log("service create"+data)
    console.log(authHeader())
    return axios.post(API_INFO_URL,data, { headers: authHeader() });
  }
  
  updateInfo(data,id){
    console.log("service create"+data)
    console.log(authHeader())
    return axios.put(API_INFO_URL+'update/'+id,data, { headers: authHeader() });
  }
  
  deleteInfo(id){
    console.log("service delete"+id)
    return axios.delete(API_INFO_URL + id, { headers: authHeader() });
  }

  ////////////////////////////////////////////////////////////////////////// auth section (users)

  getUsers() {
    return axios.get(API_AUTH_URL + 'all');
  }

  deleteUser(id){
    console.log("service delete"+id)
    return axios.delete(API_AUTH_URL + id, { headers: authHeader() });
  }

  updateUser(data,id){
    console.log(" service create "+id)
    console.log(data)
    console.log(authHeader())
    
    return axios.put(API_AUTH_URL + id,data, { headers: authHeader() });
  }

}

export default new UserService();
