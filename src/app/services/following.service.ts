import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class FollowingService {
  URL  =  'http://localhost:8000';
  private follow: string;
  private userjson: JSON;
  public success: boolean;
  public errors: any = [];
  constructor(private http: HttpClient,
              private loginService: LoginService) { }


  Follow(user, followUser) {
    const appHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.loginService.token   // this is our token from the UserService (see Part 1)
      })
    };
    this.follow = '{ \"following_user_id\": \"' + followUser.id + '\", \"user_id\": \"'
      + user.id + '\"}';
    this.userjson = JSON.parse(this.follow);

    console.log(this.userjson);

    this.http.post(`${this.URL}/api/following`, this.userjson, appHeaders).subscribe(
      data => {
        console.log('Successfully followed' + user);
        this.success = true;
      },
      err => {
        this.errors = err['error'];
        this.success = false;
      }
    );
  }

  Unfollow(relationshipId) {
    const appHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.loginService.token   // this is our token from the UserService (see Part 1)
      })
    };
    this.http.delete(`${this.URL}/api/following/` + relationshipId, appHeaders).subscribe(
      data => {
        console.log('Successfully deleted' + relationshipId);
        this.success = true;
      },
      err => {
        this.errors = err['error'];
        this.success = false;
      }
    );
  }
}
