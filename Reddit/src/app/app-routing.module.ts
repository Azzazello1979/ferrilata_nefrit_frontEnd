import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./auth.guard";
import { PostsComponent } from "./components/posts/posts.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AuthGuard]
  },

  { path: ":channel", component: PostsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
