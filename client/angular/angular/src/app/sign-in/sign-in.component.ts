import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  
  constructor(private http: HttpClient,private router: Router) {}
 correct: boolean=true;
 message: string="";


  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const url = 'http://localhost:3399/api/user';
      this.http.post(url,form.value).subscribe((res: any)=>{
        if(!res.success){
          this.correct=false;
          this.message=res.message;
          console.log(this.message);
          
        }else{
          console.log('Ishlayapti')
          this.router.navigate(['/']);
        }
      })
    } else {

    }
  }
}
