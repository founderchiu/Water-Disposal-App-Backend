import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { UsersService } from '../../providers/users.service';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';

@Component({
  selector: 'app-add-hauler-admin',
  templateUrl: './add-hauler-admin.component.html',
  styleUrls: ['./add-hauler-admin.component.scss'],
  animations: [routerTransition()]
})
export class AddHaulerAdminComponent implements OnInit {
  haulerForm: FormGroup;
  isSubmited: boolean = false;
  msgs: Message[] = [];
  constructor(private fb: FormBuilder, private userService: UsersService) {
    this.haulerForm = this.fb.group({
      full_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      company_name: [null, Validators.required],
      password: [null, Validators.required],
      phone_no: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  addHauler() {
    if (this.haulerForm.invalid) {
      this.isSubmited = true;
      return;
    }
    this.haulerForm.value['role'] = 3;
    this.userService.addUser(this.haulerForm.value)
      .then(res => {
        if (res.code == 200) {
          this.haulerForm.reset();
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Hauler admin Added successfully' });
         
        }
        else {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
          
        }
      })
  }

}
