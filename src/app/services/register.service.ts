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
  public success: boolean;
  private registeruser: string;
  private userjson: JSON;
  // error messages received from the login attempt
  public errors: any = [];
  constructor(private http: HttpClient) {
    this.httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }; }

  public register(user) {
    console.log(user);
    this.registeruser = '{\"user\":{ \"email\": \"' + user.email + '\", \"username\": \"'
      + user.username + '\", \"password\": \"' + user.password + '\"}}';
    this.userjson = JSON.parse(this.registeruser);

    console.log(this.userjson);

    this.http.post(`${this.URL}/noshd/register/`, this.userjson).subscribe(
      data => {
        console.log('register user successful');
        this.success = true;
      },
      err => {
        this.errors = err['error'];
        this.success = false;
      }
    );
  }
}
