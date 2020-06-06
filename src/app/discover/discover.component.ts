import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {LoginService} from '../services/login.service';
import {FollowingService} from '../services/following.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

  userList = new Array<User>();
  followingList = new Array<FollowingObject>();
  currentUser = new User();
  constructor(private router: Router,
              protected userService: UserService,
              protected loginService: LoginService,
              protected followingService: FollowingService) { }

  ngOnInit() {
    this.getAllUsers();
    this.getFollowing();
  }
  getAllUsers() {
    this.userService.getAllUsers()
      .subscribe((data: Array<object>) => {
        let userJSON = JSON.parse(JSON.stringify(data));
        for (let i =0; i < userJSON.length; i++) {
          let tempUser = new User();
          tempUser.username = userJSON[i].username;
          tempUser.id = userJSON[i].id;
          this.userList.push(tempUser);
        }
      });
  }

  isFollowing(user) {
    for (let i = 0; i < this.followingList.length; i++) {
      if (this.followingList[i].username === user.username){
        return true;
      }
    }
    return false;
  }

  isCurrentUser(user) {
    this.currentUser = user;
    return user.username === this.loginService.username;
  }

  follow(user) {
    // todo: create follow function
    this.followingService.Follow(this.currentUser, user);
    console.log(this.currentUser.username + ' is now following ' + user.username);
  }

  unfollow(user) {
    for (let i = 0; i < this.followingList.length; i++) {
      if (this.followingList[i].username === user.username){
        console.log('unfollowing ' + user.username);
        this.followingService.Unfollow(this.followingList[i].relationshipId);
      }
    }
    // todo: create unfollow function
  }

  getFollowing() {
    console.log(this.loginService.username);
    this.userService.getFollowers(this.loginService.username)
      .subscribe((data: Array<object>) => {
        console.log(data);
        let userInfo = JSON.parse(JSON.stringify(data));
        let following = userInfo.following;
        for (let i = 0; i < following.length; i++) {
          let tempUser = new FollowingObject();
          tempUser.username = following[i].following_user_username;
          tempUser.relationshipId = following[i].id;
          this.followingList.push(tempUser);
        }
        console.log(this.followingList);
      });
  }
  goToDiscover() {
    this.router.navigate(['/discover']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

}

class User {
  username: string;
  id: number;
}

class FollowingObject {
  username: string;
  relationshipId: number;
}
