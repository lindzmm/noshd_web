import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {FeedService} from '../services/feed.service';
import {post} from 'selenium-webdriver/http';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  followerList = new Array<string>();
  followingList = new Array<string>();
  restPostList = new Array<RestaurantPost>();
  constructor(private loginService: LoginService,
              private userService: UserService,
              private feedService: FeedService,
              private router: Router) { }

  ngOnInit() {
    if (!this.loginService.token) {
      this.router.navigate(['/login']);
    }
    this.getPosts();
  }

  newPost() {
    this.router.navigate(['/newpost']);
  }

  getPosts() {
    this.feedService.getPosts()
      .subscribe((data: Array<object>) => {
      for (let i = 0; i < data.length; i++) {
        let restPost = new RestaurantPost();
        // @ts-ignore
        restPost.establishmentName = data[i].establishment_name;
        // @ts-ignore
        restPost.postAuthor = data[i].user;
        // @ts-ignore
        restPost.pubDate = data[i].pub_date;
        this.restPostList.push(restPost);
      }
      console.log(this.restPostList);
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/profile/' + this.loginService.username]);
  }

  goToDiscover() {
    this.router.navigate(['/discover']);
  }

}

class RestaurantPost {
  establishmentName: string;
  postAuthor: string;
  pubDate: string;
}
