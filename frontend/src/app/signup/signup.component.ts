import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { LoginService } from '../providers/login.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
  currentuser:any;
  userName:string;
  Email:string;
  companyName:string;
  password:string;
  repeatPassword:string;
  userList: any;


    constructor(public loginservice: LoginService) {
    // this.getUsers();
      this.currentuser = {
      userName: '',
      Email:'',
      companyName:'',
      password:'',
      repeatPassword:''
      }
     }
    //  getUsers() {
    //    this.loginservice.getUsers().subscribe(response => {
    //      console.log(response);
    //      if (response.code == 200) {
    //        this.userList = response.data;
    //        console.log('this.userList===',this.userList);
    //      }
    //    },
     //
    //    );
    //  }
    ngOnInit() { }

    signup(signupForm) {
      if (signupForm.invalid) {
        return false;
      }
      console.log('this.currentuser',this.currentuser);
      return this.loginservice.getloginauth(this.currentuser)
        .subscribe((data: any) => {
          console.log('data=',data);
        },(error:any)=>{
          console.log(error);
        });
 }
}
