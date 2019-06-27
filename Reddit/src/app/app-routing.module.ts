import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { DummyDialogComponent } from './components/dummy-dialog/dummy-dialog.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: '', component: DummyDialogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
