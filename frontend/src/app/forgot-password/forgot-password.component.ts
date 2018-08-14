import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { UsersService } from './../providers/users.service';
import { routerTransition } from './../router.animations';
import { Router } from '@angular/router';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [routerTransition()]
})
export class ForgotPasswordComponent implements OnInit {
  data: any = [];
  forgotPasswordForm: FormGroup;
  isSubmited: boolean = false;
  msgs: Message[] = [];
  //isSubmited: boolean = false;
  constructor(private fb: FormBuilder, private userService: UsersService,private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: [null, Validators.required]
    });
  }

  ngOnInit() {
    console.log('on init');
    //this.forgotPassword();
  }

  forgotPassword() {
    if (this.forgotPasswordForm.invalid) {
      this.isSubmited = true;
      return;
    }
    this.forgotPasswordForm.value.role = "0"
    this.userService.forgotpassword(this.forgotPasswordForm.value)
      .then(res => {
        console.log(res)
        if (res.status == 200) {
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Success', detail: 'A password reset link send on your email' });
         //alert("A password reset link send on your email please check.")
          //this.router.navigate(['/login']);
        }
        else{
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'error', detail: "Invalid Email" });
        }
      })
  }

}
