// noinspection TypeScriptValidateTypes

import { Component, OnInit } from '@angular/core';
import { StudentsService } from "../../students.service";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from "@angular/common/http";
import { FormsModule, NgForm } from "@angular/forms"
import { createInput } from "@angular/compiler/src/core";
import { declareI18nVariable } from "@angular/compiler/src/render3/view/i18n/util";
import { Router } from '@angular/router';
export class Student {
  constructor(
    public _id: string,
    public name: string,
    public fatherName: string,
    public surname: string,
    public age: Date,
    public region: string,
    public course: number
  ) {

  }
}

@Component({
  selector: 'modal',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  // @ts-ignore
  public students: Student[];
  // @ts-ignore
  closeResult: string;
  deleteId: string = "";
  pageSize = 10;
  searchPage = false;
  search: string = "";
  totalPage = 0;
  totalPages: Array<any> = [];
  page: number = 0 + 1;
  constructor(private router: Router, private modalService: NgbModal, private http: HttpClient, private service: StudentsService) {
  }

  ngOnInit() {
    this.callToGetApi();
  }




  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // @ts-ignore
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  callToGetApi() {
    if (this.searchPage == false) {
      // @ts-ignore
      this.service.getData(this.page, this.pageSize).subscribe((res: any) => {
        if (!res.success) 
           this.router.navigate(['/'])
           
          this.students = res['content']
          console.log(res);

          this.totalPage = res['totalPages'];
          for (let i = 0; i <= this.totalPage; i++) {
            this.totalPages = new Array<any>(i)
          }
          console.warn(this.students)
      
      })
    } else {
      console.log("hi");

      this.service.getSearchData(this.page, this.pageSize, this.search).subscribe((data: any): any => {
        if (!data.success) {
           this.router.navigate(['/'])
        } else {
          // @ts-ignore
          this.students = data['content']
          // @ts-ignore
          this.totalPage = data['totalPages'];
          for (let i = 0; i <= this.totalPage; i++) {
            this.totalPages = new Array<any>(i)
          }
        }
      })
    }
  }
  setPage(i: number, event: any) {
    event.preventDefault();
    this.page = i;
    this.ngOnInit();
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      const url = 'http://localhost:3399/api/student';
      this.http.post(url, form.value)
        .subscribe((result: any) => {
          if(!result.success)
            this.router.navigate(['/'])

          this.callToGetApi();
        });
      this.modalService.dismissAll();
    } else {

    }
  }

  openDelete(targetModal: any, friend: Student) {
    this.deleteId = friend._id;
    console.log(friend);

    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
  deleteStudent() {
    const deleteURL = 'http://localhost:3399/api/student/' + this.deleteId;
    this.http.delete(deleteURL)
      .subscribe((results: any) => {
        if(!results.success)
          this.router.navigate(['/'])
        this.ngOnInit();
        console.log("IT's working");

        this.modalService.dismissAll();
      });

  }
  getSearchValue(event: Event) {
    // @ts-ignore
    this.search = event.target.value;
  }
  searchTable() {
    this.searchPage = true;
    this.page = 1;
    this.ngOnInit();
  }
}
