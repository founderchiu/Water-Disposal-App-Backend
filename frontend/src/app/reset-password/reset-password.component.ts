import { Component, OnInit } from '@angular/core';
import { UsersService } from './../providers/users.service';
import { routerTransition } from './../router.animations';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: [routerTransition()]
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  isSubmited: boolean = false;
  token: any;
  msgs: Message[] = [];
  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router, private route: ActivatedRoute) {
    this.resetPasswordForm = this.fb.group({
      password: [null, Validators.required]
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['token']) {
        this.token = params['token']
      }
    });

  }
  resetPassword() {
    if (this.resetPasswordForm.invalid) {
      this.isSubmited = true;
      return;
    }
    this.resetPasswordForm.value['forgot_password_token'] = this.token;
    this.userService.resetpassword(this.resetPasswordForm.value)
      .then(res => {
        if (res.status == 200) {
          this.router.navigate(['/reset-sucessfully']);
        }
        else {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error', detail: "Password Reset Failed" });
        }
      })
  }
}
