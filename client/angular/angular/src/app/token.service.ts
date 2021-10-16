import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token: string = ""
  constructor(private http: HttpClient) { }

  getToken(user: {}): string{
    const url = 'http://localhost:3399/api/user/login';
    this.http.post(url, user).subscribe((res: any): any  => {
      if(!res.success){
        return null;
      }else{
      this.token = res.toString();
      localStorage.setItem('authorization',this.token);
      console.log(this.token);
      }
    })
    console.log();
    
      return this.token;
    }
    useToken(){
      const token=localStorage.getItem('token');
      if(token!=null){
        return token;
      }
      return this.token;
      console.log(token);
    }
}