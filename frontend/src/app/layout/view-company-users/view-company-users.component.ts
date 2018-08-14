import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../providers/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';

@Component({
  selector: 'app-view-company-users',
  templateUrl: './view-company-users.component.html',
  styleUrls: ['./view-company-users.component.scss']
})
export class ViewCompanyUsersComponent implements OnInit {
  compUserArr: any = [];
  userDetails: any = [];
  public loading = false;
  msgs: Message[] = [];
  rows: Number;
  totalRecords: Number;
  display: boolean = false;
  offset: any;
  records: any = [];
  users: any = [];
  constructor(private userService: UsersService, private confirmationService: ConfirmationService, private router: Router, private route: ActivatedRoute, private _location: Location) { }

  ngOnInit() {
    this.fetchCompanyUsers(0, 20);
  }
  fetchCompanyUsers(offset, rows) {
    // let userdata = {offset: offset, rows: rows, type: 'user'}
    let role = this.userService.readSession().role;
    let companyId = this.userService.readSession()._id;
    var data = {
      role: role,
      companyId: companyId,
      offset: offset, rows: rows, type: 'user'
    }
    this.loading = true;
    this.userService.fetchCompanyUsers(data)
      .then(res => {
        if (res.code == 200) {
          this.loading = false;
          this.compUserArr = res.data;
          this.records = res.count;
          //this.users = res.data;
        }
        else {
          this.loading = false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
        }
      })
  }
  paginate(event) {
    console.log('in event', event);
    var offset = event.first;
    var rows = event.rows;
    this.fetchCompanyUsers(offset, rows);
  }
  disableCompany(userId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to disable this company user?',
      accept: () => {
        this.loading = true;
        //console.log(userId);
        this.userService.disableUser(userId)
          .then(res => {
            if (res.code == 200) {
              this.loading = false;
              this.msgs = [];
              this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Company user disabled successfully' });
              this.fetchCompanyUsers(0, 20);
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
      message: 'Are you sure that you want to enable this company user?',
      accept: () => {
        this.loading = true;
        // console.log(userId);
        this.userService.enableUser(userId)
          .then(res => {
            if (res.code == 200) {
              this.loading = false;
              this.msgs = [];
              this.fetchCompanyUsers(0, 20);
              this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Company user enabled successfully' });
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
    // console.log("userId in deletecompany",userId);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this company user?',
      accept: () => {
        this.loading = true;
        this.userService.deleteUser(userId)
          .then(res => {
            if (res.code == 200) {
              this.loading = false;
              this.msgs = [];
              this.fetchCompanyUsers(0, 20);
              this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Company user deleted successfully' });
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
    // console.log('userID==',userId);
    this.userService.editUser(userId)
      .then(res => {
        if (res.code == 200) {
          this.loading = false;
          this.userDetails = res.data;
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
          // console.log('this.router.navigate==',this.router.navigate);
          //this.router.navigate(['/view-company-users']);
          // console.log('user Details update succesfully');
          this.fetchCompanyUsers(0, 20);
        }
        else {
          console.log('inside else');
          this.loading = false;
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
