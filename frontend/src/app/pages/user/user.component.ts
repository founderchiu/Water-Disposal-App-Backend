import { Component, OnInit } from '@angular/core';
//import { routerTransition } from '../router.animations';
import { UsersService } from '../../providers/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UsersService]
  //animations: [routerTransition()]
})
export class UserComponent implements OnInit {
userList:any;
empId:string;
  constructor(public usersService: UsersService, private router:Router) {
     this.getUsers();
   }

  deleteUser(id:number, index:number) {
    console.log('delete userid==',id);
  // this.usersService.deleteUser(id).subscribe(response =>{
  //     console.log('delete user service');
  //      this.userList.splice(index, 1);
  // });
}
editUser(id:string) {
  console.log('id===',id);
     this.empId = id;
      this.router.navigate(['/users/edit, id']);
 }

  ngOnInit() {
  }

  getUsers() {
    // this.usersService.getUsers().subscribe(response => {
    //   if (response) {
    //     var responseData=JSON.parse(response._body);
    //     this.userList = responseData.data;
    //   }
    // },(error:any)=>{
    //   console.log(error);
    // }

    // );
  }
}
