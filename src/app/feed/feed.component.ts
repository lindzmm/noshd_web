import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  followerList = new Array<string>();
  followingList = new Array<string>();
  constructor(private loginService: LoginService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    if (!this.loginService.token) {
      this.router.navigate(['/login']);
    }
  }

  newPost() {
    this.router.navigate(['/newpost']);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToDiscover() {
    this.router.navigate(['/discover']);
  }

}
