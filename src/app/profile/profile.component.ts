import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  followerList = new Array<string>();
  followingList = new Array<string>();
  constructor(private loginService: LoginService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.getFollowers();
  }
  getFollowers() {
    console.log(this.loginService.username);
    this.userService.getFollowers(this.loginService.username)
      .subscribe((data: Array<object>) => {
        console.log(data);
        let userInfo = JSON.parse(JSON.stringify(data));
        let followers = userInfo.followers;
        for (let i = 0; i < followers.length; i++) {
          this.followerList.push(followers[i].user_username);
        }
        let following = userInfo.following;
        for (let i = 0; i < following.length; i++) {
          this.followingList.push(following[i].following_user_username);
        }
        console.log(this.followerList);
        console.log(this.followingList);
      });
  }

  goToDiscover() {
    this.router.navigate(['/discover']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

}
