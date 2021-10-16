import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../components/student/student.component';
import { FormsModule, NgForm } from "@angular/forms"
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  student: any={}
  id: string="";
  constructor(private route: ActivatedRoute,private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.id=params.get('id')||"";
      this.http.get("http://localhost:3399/api/student/"+this.id).subscribe(res=>{
      this.student=res;
      })

    })
  }

  onSubmit(form: NgForm) {
    console.log("It's not working");
    console.log(form.value)
    if (form.valid) {
      const url = 'http://localhost:3399/api/student/'+this.id;
      this.http.put(url, form.value)
        .subscribe((result) => {
          this.router.navigate(['/main'])
    })
  }else {

    }
  }
  redirect(){
    this.router.navigateByUrl('/')
    console.log("It not");
    
  }
}