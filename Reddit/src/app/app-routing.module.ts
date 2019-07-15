import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./auth.guard";
import { PostsComponent } from "./components/posts/posts.component";
import { RegisterComponent } from "./components/register/register.component";
import { SubmitComponent } from "./components/submit/submit.component";
import { DropdownComponent } from "./components/dropdown/dropdown.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "submit",
    component: SubmitComponent
    
    //canActivate: [AuthGuard]
  },
  { path: 'submit/channelSelector', component:SubmitComponent},

  { path: ":channel", component: PostsComponent},


  {
    path: "",
    component: PostsComponent
  },
  {
    path: "register",
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
