import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {NewPostService} from '../services/new-post.service';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  public post: any;
  constructor(private loginService: LoginService,
              private newPostService: NewPostService,
              private router: Router) { }

  ngOnInit() {
    this.post = {
      establishment_name: '',
      pub_date: new Date().toISOString().slice(0, 16),
    };
  }

  submit() {
    console.log('submit post');
    this.newPostService.create(this.post).subscribe(
      data => {
        // refresh the list
        // this.getPosts();
        console.log('posted successfully');
        return true;
      },
      error => {
        console.error('Error saving!');
        return throwError(error);
      }
    );
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
