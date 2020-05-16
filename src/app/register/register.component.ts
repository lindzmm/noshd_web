import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RegisterService} from '../services/register.service';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: any;

  constructor(private registerService: RegisterService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.user = {
        email: '',
        username: '',
        password: '',
    };
  }

  register() {
    // register new user
    console.log('registering user ' + this.user.username);
    this.registerService.register(this.user);
    if (this.registerService.success) {
      this.login();
    }
  }

  login() {
    console.log('login user, success!!');
    this.loginService.login({username: this.user.username, password: this.user.password});
  }

  goToHome() {
    if (this.loginService.token) {
      console.log('token aquired');
      this.router.navigate(['/home']);
    }
  }

}
