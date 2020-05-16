import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private loginService: LoginService,
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

}
