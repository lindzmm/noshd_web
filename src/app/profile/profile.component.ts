import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  followerList = new Array<string>();
  followingList = new Array<string>();
  username: string;
  email: string;
  constructor(private loginService: LoginService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let username = params.username;
      this.getUserDetails(username);
      this.getFollowers(username);
      this.getFollowing(username);
    });
  }
  getUserDetails(username) {
    this.userService.getUser(username)
      .subscribe((data: Array<object>) => {
        console.log(data);
        let userInfo = JSON.parse(JSON.stringify(data));
        this.username = userInfo.username;
        this.email = userInfo.email;
        /*let userInfo = JSON.parse(JSON.stringify(data));
        let followers = userInfo.followers;
        for (let i = 0; i < followers.length; i++) {
          this.followerList.push(followers[i].user_username);
        }
        let following = userInfo.following;
        for (let i = 0; i < following.length; i++) {
          this.followingList.push(following[i].following_user_username);
        }
        console.log(this.followerList);
        console.log(this.followingList);*/
      });
  }

  getFollowing(username) {
    this.userService.GetFollowing(username)
      .subscribe((data: Array<object>) => {
        //  console.log(data);
        let userFollowing = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < userFollowing.length; i++) {
          this.followingList.push(userFollowing[i].following_user_username);
        }
        console.log(this.followingList);
      });

  }

  getFollowers(username) {
    this.userService.GetFollowers(username)
      .subscribe((data: Array<object>) => {
        // console.log(data);
        let userFollowers = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < userFollowers.length; i++) {
          this.followerList.push(userFollowers[i].user_username);
        }
        console.log(this.followerList);
      });
  }

  goToDiscover() {
    this.router.navigate(['/discover']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToProfile() {
    this.router.navigate(['/profile/' + this.loginService.username]);
  }

}
