import decodeJWT from '../../lib/decodeJWT.js';
import { User } from "../models/user.model.js";
const URL_API = "http://localhost:7000/session";

const LoginService = {
  apiAuthUser: (user) => {
    return new Promise((resolve, reject) => {
      fetch(`${URL_API}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            sessionStorage.setItem('token', data.token);
            resolve('Usuario logado com sucesso');
          } else {
            reject(data.error);
          }
        })
        .catch(error => {
          reject('Erro na requisição de login. Error:', error);
        });
    });
  },
  getUserSession: ()=> {
    const token = sessionStorage.getItem('token');
    if (token) {
      const payload = decodeJWT(token);
      if (payload) {
        const user = new User(payload.id, payload.username, payload.password, payload.firstname, payload.lastname)
        console.log(user)
        return user;
      } else {
        return null;
      }
    }
  }
};


export { LoginService }