import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { UsersService } from '../../providers/users.service';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';

@Component({
  selector: 'app-add-company-user',
  templateUrl: './add-company-user.component.html',
  styleUrls: ['./add-company-user.component.scss'],
  animations: [routerTransition()]
})
export class AddCompanyUserComponent implements OnInit {
  companyUserForm: FormGroup;
  isSubmited: boolean = false;
  public loading = false;
  compArr: any = [];
  msgs: Message[] = [];

  constructor(private fb: FormBuilder, private userService: UsersService) {
    this.companyUserForm = this.fb.group({
      full_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      company_name: [null, Validators.required],
      password: [null, Validators.required],
      phone_no: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.fetchCompanies();
  }

  addCompanyUser() {
    this.loading=true;
    if (this.companyUserForm.invalid) {
      this.loading=false;
      this.isSubmited = true;
      return;
    }
    this.companyUserForm.value['role'] = 2;
    this.companyUserForm.value['companyId'] = this.companyUserForm.value.company_name._id;
    this.companyUserForm.value['company_name'] = this.companyUserForm.value.company_name.company_name;
    this.userService.addUser(this.companyUserForm.value)
      .then(res => {
        if (res.code == 200) {
          this.loading=false;
          this.companyUserForm.reset();
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Company user Added successfully' });
         
        }
        else {
          this.loading=false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
        }
      })
  }

  fetchCompanies() {
    this.loading=true;
    let role = this.userService.readSession().role;
    let companyId = this.userService.readSession()._id;
    var data = {
      role: role,
      companyId: companyId
    }
    this.userService.fetchCompanies(data)
      .then(res => {
        if (res.code == 200) {
          this.loading=false;
          this.compArr = res.data
        }
        else {
          this.loading=false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
        
        }
      })
  }

}
