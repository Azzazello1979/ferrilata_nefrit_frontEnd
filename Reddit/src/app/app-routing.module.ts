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
  {
    path: '',
    component: PostsComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  // {
  //   resolve: {results: PostsComponent},
  //   runGuardsAndResolvers: 'always'
  // }

  // ,{
  //   path: '/submit',
  //   component: SubmitComponent,
  //   canActivate: [AuthGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
