import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  environment: string = 'http://localhost:3333/api'

  registerUser(user: LoginData) {
    console.log(user)
    let headers = new HttpHeaders({
      'Content-type': 'application/json'
    })
    return this.http.post(`${this.environment}/user/create`, user, { headers: headers })
  }

  loginUser(user: LoginData) {
    let headers = new HttpHeaders({
      'Content-type': 'application/json'
    })
    return this.http.post(`${this.environment}/auth/login`, user, { headers: headers })
  }

  storeUserData(token: string) {
    console.log(token,'token ala')
    localStorage.setItem('access_token', token)
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  loadUserToken() {
    let token = localStorage.getItem('access_token')
    if (token) {
      return { token }
    }
    return null
  }

  logout() {
    localStorage.clear()
  }

}
