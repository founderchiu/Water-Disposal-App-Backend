import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { routerTransition } from '../router.animations';
import { Http, Headers, HttpModule, RequestOptions } from '@angular/http';
import { UsersService } from '../providers/users.service';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message, OverlayPanelModule } from 'primeng/primeng';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})


export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmited: boolean = false;
  msgs: Message[] = [];
  PadsValue:any=[];
  lat:any;
  long:any;

  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      // role: [null, Validators.required]
    });
    if (this.userService.isAuth()) {
      this.router.navigate(['/dashboard']);
    }
  }
  ngOnInit() {
   
  }

  login() {
    if (this.loginForm.invalid) {
      this.isSubmited = true;
      return;
    }
    this.userService.loginUser(this.loginForm.value)
      .then(res => {
        if (res.code === 200) {
          if (res.data.role == "4") {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error', detail: "Login not allowed" });
          } else {
            this.userService.setSession(res.data);
          }
          this.fetchPads();
          this.router.navigate(['/dashboard']);
        }
        else {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error', detail: "Authentication failed" });
          
        }
      })
  }

  fetchPads() {
    let role = this.userService.readSession().role;
    let companyId = this.userService.readSession()._id;
    var data = {
      role: role,
      companyId: companyId
    }
    this.userService.fetchPadsForGis()
      .then(res => {
        if (res.code == 200) {
          this.PadsValue = res.data;
          console.log('this.PadsValues in login',this.PadsValue);

          this.long=this.PadsValue[0].long,
          this.lat=this.PadsValue[0].lat

          console.log('laaat', this.lat)
          console.log('long', this.long)

          let letlocation = {
            'lat': this.lat,
            'long' : this.long
        };

          localStorage.setItem('padValue', JSON.stringify(letlocation));

         
        }
        else {
           this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
        }
      });
  }
}
