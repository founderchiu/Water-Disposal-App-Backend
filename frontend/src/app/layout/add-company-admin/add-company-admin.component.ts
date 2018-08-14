import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { UsersService } from '../../providers/users.service'
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';

@Component({
  selector: 'app-add-company-admin',
  templateUrl: './add-company-admin.component.html',
  styleUrls: ['./add-company-admin.component.scss'],
  animations: [routerTransition()]
})
export class AddCompanyAdminComponent implements OnInit {
  companyForm: FormGroup;
  isSubmited: boolean = false;
  public loading = false;
  imgUrl: String;
  msgs: Message[] = [];

  constructor(private fb: FormBuilder, private userService: UsersService) {
    this.companyForm = this.fb.group({
      full_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      company_name: [null, Validators.required],
      password: [null, Validators.required],
      phone_no: [null, Validators.required]
    });
  }
  ngOnInit() {
  }
  addCompany() {
    this.loading=true;
    if (this.companyForm.invalid) {
      this.loading=false;
      this.isSubmited = true;
      return;
    }
    this.companyForm.value['role'] = 1;
    if (this.imgUrl) {
      this.companyForm.value['imgUrl'] = this.imgUrl;
    }
    else {
      this.companyForm.value['company_logo'] = '/images/no-img.png';
    }
    console.log("CompanyForm", this.companyForm.value);
    this.userService.addUser(this.companyForm.value)
      .then(res => {
        if (res.code == 200) {
          this.loading=false;
          this.companyForm.reset();
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Company Admin Added successfully' });
        }
        else {
          this.loading=false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
        }
      })
  }

  onUploadFinished(event) {
    this.imgUrl = event.src;
    // setTimeout(() => {
    //   this.userService.uploadImage(event.src)
    //     .then(res => {
    //       if (res.code == 200) {
    //         console.log(res.data)
    //         this.imgUrl = res.data;
    //       }
    //       else {
    //         alert(res.message)
    //       }
    //     })
    // }, 3000)
  }

}
