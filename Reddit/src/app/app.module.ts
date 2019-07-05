
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DummyDialogComponent } from './components/dummy-dialog/dummy-dialog.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { PostsComponent } from './components/posts/posts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipeService } from './pipes/elapsedTimePipe';

@NgModule({
  declarations: [AppComponent, PostsComponent, ErrorDialogComponent, DummyDialogComponent, DropdownComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatSelectModule],
  providers: [PipeService],
  bootstrap: [AppComponent],
  entryComponents: [ErrorDialogComponent]
})
export class AppModule {}
