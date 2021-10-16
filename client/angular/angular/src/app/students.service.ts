
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient,private token: TokenService) {}
  getData(pageNumber: number,pageSize : number): any{
    let url='http://localhost:3399/api/student/list?pageSize=' + pageSize + '&pageNumber=' + pageNumber;
    return this.http.get(url);
    
  }
getSearchData(pageNumber: number,pageSize: number,search: string){
 const headers=new HttpHeaders({
   'authorization': this.token.useToken(),
   'content-type': 'application/json'
 })
  let url='http://localhost:3399/api/student/?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&search=' + search
  return this.http.get(url,{headers: headers});
}
}
