import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../providers/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';

@Component({
  selector: 'app-view-hauler-admins',
  templateUrl: './view-hauler-admins.component.html',
  styleUrls: ['./view-hauler-admins.component.scss']
})
export class ViewHaulerAdminsComponent implements OnInit {
  haulerArr: any = [];
  public loading = false;
  msgs: Message[] = [];
  display: boolean = false;
  userDetails: any =[];
  offset:any;
  records:any=[];
  users:any=[];
  
  constructor(private userService: UsersService,private router: Router, private confirmationService: ConfirmationService,private route: ActivatedRoute, private _location: Location) { }

  ngOnInit() {
    this.fetchHaulers(0,20);
  }

  fetchHaulers(offset, rows) {
    let role = this.userService.readSession().role;
    let companyId = this.userService.readSession()._id;
    var data = {
      role: role,
      companyId: companyId,
      offset: offset, rows: rows, type: 'user'
    }
    this.loading = true;
    this.userService.fetchHaulers(data)
      .then(res => {
        if (res.code == 200) {
          this.loading = false;
          this.haulerArr = res.data;
          this.records = res.count;
        }
        else {
          this.loading = false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
        }
      })
  }
  paginate(event) {
    console.log('in event',event);
    var offset = event.first;
    var rows = event.rows;
    this.fetchHaulers(offset, rows);
  }

  disableCompany(userId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to disable this hauler admin?',
      accept: () => {
        this.loading = true;
        console.log(userId);
        this.userService.disableUser(userId)
          .then(res => {
            if (res.code == 200) {
              this.loading = false;
              this.msgs = [];
              this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Hauler admin disabled successfully' });
              this.fetchHaulers(0,20);
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
      message: 'Are you sure that you want to enable this hauler admin?',
      accept: () => {
        this.loading = true;
        console.log(userId);
        this.userService.enableUser(userId)
          .then(res => {
            if (res.code == 200) {
              this.loading = false;
              this.msgs = [];
              this.fetchHaulers(0,20);
              this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Hauler admin enabled successfully' });
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
      message: 'Are you sure that you want to delete this hauler admin?',
      accept: () => {
        this.loading = true;
        this.userService.deleteUser(userId)
          .then(res => {
            if (res.code == 200) {
              this.loading = false;
              this.msgs = [];
              this.fetchHaulers(0,20);
              this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Hauler admin deleted successfully' });
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
          this.fetchHaulers(0,20);
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
          this.fetchHaulers(0,20);
          //console.log('this.router.navigate==', this.router.navigate);
          //this.router.navigate(['/view-company-users']);
          // console.log('user Details update succesfully');
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
