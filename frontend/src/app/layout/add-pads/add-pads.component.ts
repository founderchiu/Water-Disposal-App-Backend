import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { UsersService } from '../../providers/users.service';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';

declare var google: any;

@Component({
  selector: 'app-add-pads',
  templateUrl: './add-pads.component.html',
  styleUrls: ['./add-pads.component.scss'],
  animations: [routerTransition()]
})
export class AddPadsComponent implements OnInit {
  padsForm: FormGroup;
  isSubmited: boolean = false;
  public loading = false;
  compArr: any = [];
  msgs: Message[] = [];
  position:any;

  constructor(private fb: FormBuilder, private userService: UsersService) {
    this.padsForm = this.fb.group({
      pad_name: [null, Validators.required],
      company_name: [null, Validators.required],
      lat: [null, Validators.required],
      long: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.fetchCompanies();
  }
 
  addPads() {
   // this.loading=true;
    if (this.padsForm.invalid) {
      this.loading=false;
      this.isSubmited = true;
      return;
    }
    
    this.padsForm.value['companyId'] = this.padsForm.value.company_name._id;
    this.padsForm.value['company_name'] = this.padsForm.value.company_name.company_name;
    console.log(this.padsForm.value)
    this.position = this.padsForm.value;
    this.position.position = [ , ] 
    this.userService.addPad(this.position)
      .then(res => {
        if (res.code == 200) {
          this.loading=false;
          this.padsForm.reset();
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Pad Added successfully' });
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
