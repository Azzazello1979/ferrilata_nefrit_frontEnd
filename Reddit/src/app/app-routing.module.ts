import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { PostsComponent } from './components/posts/posts.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: ':channel', component: PostsComponent },
 
  {
    path: '',
    component: PostsComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
  ,{
    path: '/submit',
    component: SubmitComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
