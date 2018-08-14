import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { routerTransition } from '../../router.animations';
import { Http, Headers, HttpModule, RequestOptions } from '@angular/http';
import { UsersService } from '../../providers/users.service'

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
  animations: [routerTransition()]
})
export class AdminLoginComponent implements OnInit {
  
  loginForm: FormGroup;
  isSubmited: boolean = false;

  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
    // if (this.userService.isAuth()) {
    //   this.router.navigate(['/dashboard']);
    // }
  }
  ngOnInit() {

  }

  login() {
    if (this.loginForm.invalid) {
      console.log("hello")
      this.isSubmited = true;
      return;
    }
    this.loginForm.value.role = "0"
    this.userService.loginUser(this.loginForm.value)
      .then(res => {
        console.log(res)
        if (res.code === 200) {
          this.userService.setSession(res.data);
          this.router.navigate(['/dashboard']);
        }
        else{
          alert("Authentication failed")
        }
      })
  }

}
