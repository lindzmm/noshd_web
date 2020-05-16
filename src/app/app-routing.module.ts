import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { RegisterComponent} from './register/register.component';
import {CommonModule} from '@angular/common';
import {FeedComponent} from './feed/feed.component';
import {NewPostComponent} from './new-post/new-post.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: FeedComponent
  },
  {
    path: 'newpost',
    component: NewPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
