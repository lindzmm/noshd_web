import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class NewPostService {
  URL  =  'http://localhost:8000';

  constructor(private http: HttpClient,
              private loginService: LoginService ) { }

  // send a POST request to the API to create a new data object
  create(post) {
    const appHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.loginService.token   // this is our token from the UserService (see Part 1)
      })
    };
    console.log(post);
    console.log(appHeaders);
    return this.http.post(`${this.URL}/api/post`, JSON.stringify(post), appHeaders);
  }
}
