import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RegisterService} from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: any;

  constructor(private registerService: RegisterService,
              private router: Router) { }

  ngOnInit() {
    this.user = {
      username: '',
      email: '',
      password: '',
    };
  }

  register() {
    // register new user
    console.log('registering user' + this.user.username);
    this.registerService.register(this.user);
  }

}
