import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { UsersService } from '../../providers/users.service';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';


@Component({
  selector: 'app-add-wells',
  templateUrl: './add-wells.component.html',
  styleUrls: ['./add-wells.component.scss'],
  animations: [routerTransition()]
})
export class AddWellsComponent implements OnInit {
  wellsForm: FormGroup;
  isSubmited: boolean = false;
  public loading = false;
  compArr: any = [];
  padArr: any = [];
  msgs: Message[] = [];
  constructor(private fb: FormBuilder, private userService: UsersService) {

    this.wellsForm = this.fb.group({
      well_name: [null, Validators.required],
      well_no: [null, Validators.required],
      company_name: [null, Validators.required],
      pad_name: [null, Validators.required]
    });
  }


  ngOnInit() {
    this.fetchCompanies();
  }


  fetchCompanies() {
    this.loading = true;
    let role = this.userService.readSession().role;
    let companyId = this.userService.readSession()._id;
    var data = {
      role: role,
      companyId: companyId
    }
    this.userService.fetchCompanies(data)
      .then(res => {
        if (res.code == 200) {
          this.loading = false;
          this.compArr = res.data
        }
        else {
          this.loading = false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
        }
      })
  }
  fetchPads(event) {
    this.loading = true;
    let companyId = event.target.value;
    this.userService.fetchPadsWithComp(companyId)
      .then(res => {
        if (res.code == 200) {
          this.loading = false;
          this.padArr = res.data
        }
        else {
          this.loading = false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
       
        }
      })
  }


  addWell() {
    this.loading = true;
    if (this.wellsForm.invalid) {
      this.loading = false;
      this.isSubmited = true;
      return;
    }
    this.wellsForm.value['companyId'] = this.wellsForm.value.company_name;
    this.wellsForm.value['padId'] = this.wellsForm.value.pad_name;
    delete this.wellsForm.value.company_name;
    delete this.wellsForm.value.pad_name;
    this.userService.addWell(this.wellsForm.value)
      .then(res => {
        if (res.code == 200) {
          this.loading = false;
          this.wellsForm.reset();
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Well Added successfully' });
        }
        else {
          this.loading = false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
        }
      })
  }

}
