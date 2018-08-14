import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { UsersService } from '../../providers/users.service';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';

@Component({
  selector: 'app-add-tanks',
  templateUrl: './add-tanks.component.html',
  styleUrls: ['./add-tanks.component.scss'],
  animations: [routerTransition()]
})
export class AddTanksComponent implements OnInit {
  tanksForm: FormGroup;
  isSubmited: boolean = false;
  public loading = false;
  compArr: any = [];
  padArr: any = [];
  msgs: Message[] = [];
  wellArr:any=[];
  latLong:any=[];

  constructor(private fb: FormBuilder, private userService: UsersService) {
    this.tanksForm = this.fb.group({
      tank_name: [null, Validators.required],
      tank_no: [null, Validators.required],
      company_name: [null, Validators.required],
      pad_name: [null, Validators.required],  
      well_name: [null, Validators.required],
      lat: [null, Validators.required],
      long: [null, Validators.required],
      volume: [null, Validators.required],
      type: [null, Validators.required]
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

  fetchPadsWithLatLong(event) {
    console.log('event in fetch lat long',event.target.value);
      this.loading = true;
      let padId = event.target.value;
      this.userService.fetchPadsWithLatLong(padId)
        .then(res => {
          if (res.code == 200) {
            this.loading = false;
            this.latLong = res.data


          this.tanksForm.patchValue({
          lat:this.latLong[0].lat,
          long:this.latLong[0].long
        });

            
          }
          else {
            this.loading = false;
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
          }
        })
    }


  fetchwells(event) {
    this.loading = true;
    let padId = event.target.value;
    this.userService.fetchWellWithPads(padId)
      .then(res => {
        if (res.code == 200) {
          this.loading = false;
          this.wellArr = res.data
        }
        else {
          this.loading = false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
        }
      })
  }

  

  addTank() {
    this.loading = true;
    if (this.tanksForm.invalid) {
      this.loading = false;
      this.isSubmited = true;
      return;
    }
     
    this.tanksForm.value['companyId'] = this.tanksForm.value.company_name;
    this.tanksForm.value['padId'] = this.tanksForm.value.pad_name;
    this.tanksForm.value['wellId'] = this.tanksForm.value.well_name;
    delete this.tanksForm.value.company_name;
    delete this.tanksForm.value.pad_name;
    delete this.tanksForm.value.well_name;
    this.fetchCompanies();
    this.userService.addTank(this.tanksForm.value)
      .then(res => {
        if (res.code == 200) {
          this.loading = false;
          this.tanksForm.reset();
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Tank Added successfully' });
        }
        else {
          this.loading = false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
        }
      })
  }

}
