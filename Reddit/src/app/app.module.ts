import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "./services/auth.service";
import { AuthInterceptor } from "src/app/auth.interceptor";
import { PostsComponent } from "./components/posts/posts.component";
import { DummyDialogComponent } from "./components/dummy-dialog/dummy-dialog.component";
import { DropdownComponent } from "./components/dropdown/dropdown.component";
import { ErrorDialogComponent } from "./components/error-dialog/error-dialog.component";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { HeaderComponent } from "src/app/components/header/header.component";
import { MatSelectModule } from "@angular/material/select";
import { PipeService } from "./pipes/elapsedTimePipe";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatCheckboxModule
} from "@angular/material";
import { RegisterComponent } from "./components/register/register.component";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";
import { SubmitComponent } from './components/submit/submit.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PostsComponent,
    ErrorDialogComponent,
    DummyDialogComponent,
    HeaderComponent,
    DummyDialogComponent,
    DropdownComponent,
    RegisterComponent,
    ConfirmationDialogComponent,
    SubmitComponent,
    PipeService
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    HttpClientModule,
    MatSelectModule
  ],

  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    PipeService
  ],

  bootstrap: [AppComponent],
  entryComponents: [ErrorDialogComponent, ConfirmationDialogComponent]
})
export class AppModule {}
