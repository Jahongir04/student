import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router,private service: TokenService) { }

  invalidLogin: boolean=false;
  token: string='';

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {  
      this.token=this.service.getToken(form.value);
      if(!this.token){
        this.router.navigate(['/sign-in']);
      }else{
         this.router.navigate(['/main']);
      }
    } else {
      this.invalidLogin=true;
    }
  }
}