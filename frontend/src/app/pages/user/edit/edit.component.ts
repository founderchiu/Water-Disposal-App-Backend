import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../providers/users.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers:[UsersService]
})
export class EditComponent implements OnInit {
  private activeUser;
  userDetails:any;
  constructor(public usersService: UsersService,private _router: Router) {
   }

  ngOnInit() {
  }
  getUserDetails(id:string) {
  //   console.log('inside get user details');
  //   this.usersService.getUserDetails(id).subscribe(response =>{
      
  //     // if (this.userDetails && this.userDetails._id == id) {
  //     //   return this.userDetails;
  //     // }
  // },
  // (error:any)=>{
  //   console.log(error);
  // });
}
// loadTemplate(emp: Employee) {
//        if (this.selemp && this.selemp.EmpNo == emp.EmpNo) {
//            return this.editTemplate;
//        } else {
//            return this.readOnlyTemplate;
//        }
//
//
//    }
}
