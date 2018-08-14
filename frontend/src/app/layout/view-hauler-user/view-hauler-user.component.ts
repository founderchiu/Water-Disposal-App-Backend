import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../providers/users.service';
import {Location} from '@angular/common';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';
@Component({
  selector: 'app-view-hauler-user',
  templateUrl: './view-hauler-user.component.html',
  styleUrls: ['./view-hauler-user.component.scss']
})
export class ViewHaulerUserComponent implements OnInit {
  haulerArr: any = [];
  public loading = false;
  msgs: Message[] = [];
  display: boolean = false;
  userDetails: any = [];
  offset:any;
  records:any=[];
  users:any=[];
  
  constructor(private userService: UsersService, private confirmationService: ConfirmationService,private _location: Location) { }

  ngOnInit() {
    this.fetchHaulersUser(0,20);
  }

  fetchHaulersUser(offset, rows) {
    let role = this.userService.readSession().role;
    let companyId = this.userService.readSession()._id;
    var data = {
      role: role,
      companyId: companyId,
      offset: offset, rows: rows, type: 'user'
    }
    this.loading = true;
    this.userService.fetchHaulersUser(data)
      .then(res => {
        if (res.code == 200) {
          this.loading = false;
          this.haulerArr = res.data;
          this.records = res.count;
        }
        else {
          this.loading = false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
        }
      })
  }

  paginate(event) {
    console.log('in event',event);
    var offset = event.first;
    var rows = event.rows;
    this.fetchHaulersUser(offset, rows);
  }

  disableCompany(userId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to disable this hauler user?',
      accept: () => {
        this.loading = true;
        console.log(userId);
        this.userService.disableUser(userId)
          .then(res => {
            if (res.code == 200) {
              this.loading = false;
              this.msgs = [];
              this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Hauler user disabled successfully' });
              this.fetchHaulersUser(0,20);
            }
            else {
              this.loading = false;
              this.msgs = [];
              this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
            }
          })
      }
    });
  }

  enableCompany(userId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to enable this hauler user?',
      accept: () => {
        this.loading = true;
        console.log(userId);
        this.userService.enableUser(userId)
          .then(res => {
            if (res.code == 200) {
              this.loading = false;
              this.msgs = [];
              this.fetchHaulersUser(0,20);
              this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Hauler user enabled successfully' });
            }
            else {
              this.loading = false;
              this.msgs = [];
              this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
            }
          })
      }
    });
  }

  deleteCompany(userId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this hauler user?',
      accept: () => {
        this.loading = true;
        this.userService.deleteUser(userId)
          .then(res => {
            if (res.code == 200) {
              this.loading = false;
              this.msgs = [];
              this.fetchHaulersUser(0,20);
              this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Hauler user deleted successfully' });
            }
            else {
              this.loading = false;
              this.msgs = [];
              this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
            }
          })
      }
    });
  }
  editUser(userId) {
    this.display = true;
    console.log('userID==', userId);
    this.userService.editUser(userId)
      .then(res => {
        if (res.code == 200) {
          this.loading = false;
          this.userDetails = res.data;
          this.fetchHaulersUser(0,20);
          // console.log('res.data===',this.userDetails);
        }
        else {
          //console.log('inside else');
          this.loading = false;
        }
      });
  }

  updateUser(userDetails) {
    this.display = true;
    // console.log('userDetails==',userDetails);
    this.userService.updateUser(userDetails)
      .then(res => {
        if (res.code == 200) {
          this.userDetails = res.data;
          this.display = false;
          this.loading = false;
          this.fetchHaulersUser(0,20);
          //this.router.navigate(['/view-company-users']);
          console.log('user Details update succesfully');
        }
        else {
          this.loading = false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
          
        }
      });

  }
  cancel() {
    // console.log('userDetails in cancel',this.userDetails);
    this.display = false;
  }
  // backClicked() {
  //   this._location.back();
  // }
}
