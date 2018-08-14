import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { UsersService } from '../../providers/users.service';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';

@Component({
  selector: 'app-add-hauler-user',
  templateUrl: './add-hauler-user.component.html',
  styleUrls: ['./add-hauler-user.component.scss'],
  animations: [routerTransition()]
})
export class AddHaulerUserComponent implements OnInit {
  haulerUserForm: FormGroup;
  isSubmited: boolean = false;
  public loading = false;
  haulerArr: any = [];
  msgs: Message[] = [];

  constructor(private fb: FormBuilder, private userService: UsersService) {
    this.haulerUserForm = this.fb.group({
      full_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      company_name: [null, Validators.required],
      password: [null, Validators.required],
      phone_no: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.fetchHaulers();
  }

  addHaulerUser() {
    //this.loading=true;
    if (this.haulerUserForm.invalid) {
      this.isSubmited = true;
      return;
    }
    this.haulerUserForm.value['role'] = "4";
    this.haulerUserForm.value['companyId'] = this.haulerUserForm.value.company_name._id;
    this.haulerUserForm.value['company_name'] = this.haulerUserForm.value.company_name.company_name;
    console.log(this.haulerUserForm.value)
    this.userService.addUser(this.haulerUserForm.value)
      .then(res => {
        if (res.code == 200) {
          //this.loading=false;
          this.haulerUserForm.reset();
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Hauler user Added successfully' });
         
        }
        else {
          //this.loading=false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
        }
      })
  }

  fetchHaulers() {
    this.loading=true;
    let role = this.userService.readSession().role;
    let companyId = this.userService.readSession()._id;
    var data = {
      role: role,
      companyId: companyId
    }
    this.userService.fetchHaulers(data)
      .then(res => {
        if (res.code == 200) {
          this.loading=false;
          this.haulerArr = res.data
        }
        else {
          this.loading=false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
       
        }
      })
  }

}
