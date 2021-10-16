import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {StudentComponent} from "./components/student/student.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxPaginationModule} from "ngx-pagination";
import { HttpClientModule} from "@angular/common/http";
import {StudentsService} from "./students.service";
import {FormsModule} from "@angular/forms";
import { EditComponent } from './edit/edit.component';
import { PageNotFaundComponent } from './page-not-faund/page-not-faund.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
const routes: Routes=[
  {path :'',component: LoginComponent},
  {path: 'sign-in',component: SignInComponent},
  {path: 'main',component: StudentComponent},
  {path: 'edit/:id',component: EditComponent},
  {path: 'edit',component: EditComponent},
  {path:'**',component: PageNotFaundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    EditComponent,
    PageNotFaundComponent,
    SignInComponent,
    LoginComponent,
    NavbarComponent,
  ],
    imports: [
        BrowserModule,
        NgbModule,
        HttpClientModule,
        NgxPaginationModule,
        FormsModule,
        RouterModule.forRoot(routes),
    ],
  providers: [StudentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
