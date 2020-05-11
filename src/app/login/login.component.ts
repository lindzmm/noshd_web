import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: any;

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.user = {
      username: '',
      password: '',
    };
  }

  login() {
    this.loginService.login({username: this.user.username, password: this.user.password});
  }

  register() {
    // go to register component
    this.router.navigate(['/register']);
  }

  refreshToken() {
    this.loginService.refreshToken();
  }

  logout() {
    this.loginService.logout();
  }

}
