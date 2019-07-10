import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { PostsComponent } from './components/posts/posts.component';
import { DummyDialogComponent } from './components/dummy-dialog/dummy-dialog.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: PostsComponent
  },

  {
    path: ':channel',
    pathMatch: 'prefix',
    redirectTo: ''
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
