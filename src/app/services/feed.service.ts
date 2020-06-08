import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  URL = 'http://localhost:8000';

  constructor(private http: HttpClient,
              private loginService: LoginService) {
  }

  getPosts() {
    const appHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.loginService.token   // this is our token from the UserService (see Part 1)
      })
    };
    return this.http.get(`${this.URL}/feed/`, appHeaders);

  }
}
