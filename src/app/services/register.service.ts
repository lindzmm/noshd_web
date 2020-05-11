import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  URL  =  'http://localhost:8000';
  // http options used for making API calls
  private httpOptions: any;
  // the username of the logged in user
  public username: string;

  // error messages received from the login attempt
  public errors: any = [];
  constructor(private http: HttpClient) {
    this.httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }; }

  public register(user) {
    this.http.post(`${this.URL}/api/users`, user).subscribe(
      data => {
        console.log('register user successful');
      },
      err => {
        this.errors = err['error'];
      }
    );
  }
}
