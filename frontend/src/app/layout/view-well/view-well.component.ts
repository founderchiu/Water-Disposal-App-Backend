import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../providers/users.service';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message, OverlayPanelModule } from 'primeng/primeng';


@Component({
  selector: 'app-view-well',
  templateUrl: './view-well.component.html',
  styleUrls: ['./view-well.component.scss']
})
export class ViewWellComponent implements OnInit {
  wellsArr: any = [];
  public loading = false;
  msgs: Message[] = [];
  qrcode;
  records: any = [];
  showWellDetails: boolean = false;
  wellDetails: any = [];
  compArr: any = [];
  padArr: any = [];

  constructor(private userService: UsersService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.fetchwells(0, 20);
    this.fetchCompanies();
  }
  fetchwells(offset, rows) {
    this.loading = true;
    let role = this.userService.readSession().role;
    let companyId = this.userService.readSession()._id;
    var data = {
      role: role,
      companyId: companyId
    }
    this.userService.fetchwells(data)
      .then(res => {
        if (res.code == 200) {
          this.loading = false;
          this.wellsArr = res.data;
          this.records = res.count;
          // console.log('this.wellsArr',this.wellsArr);
        }
        else {
          this.loading = false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
        }
      })
  }
  paginate(event) {
    //console.log('in event',event);
    var offset = event.first;
    var rows = event.rows;
    this.fetchwells(offset, rows);
  }

  deleteWells(userId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this well?',
      accept: () => {
        this.loading = true;
        this.userService.deleteWells(userId)
          .then(res => {
            if (res.code == 200) {
              this.loading = false;
              this.msgs = [];
              this.fetchwells(0, 20);
              this.msgs.push({ severity: 'success', summary: 'Success', detail: 'well deleted successfully' });
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
          // console.log('compArr===',this.compArr)
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
    if (event != 0) {
      let companyId = event.target.value;
      //this.fetchCompanies();
      this.userService.fetchPadsWithComp(companyId)
        .then(res => {
          if (res.code == 200) {
            this.loading = false;
            this.padArr = res.data
            // this.fetchCompanies();
            //console.log('this.padArr in view padArr',this.padArr)
          }
          else {
            this.loading = false;
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
          }
        })
    }
  }
  fetchPadsWithCompany(companyId) {
    console.log('companyId in fetchPads==', companyId);
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
  editWell(userId) {
    this.showWellDetails = true;
    this.userService.editWell(userId)
      .then(res => {
        if (res.code == 200) {
          this.loading = false;
          this.wellDetails = res.data;
          this.fetchwells(0, 20);
          this.fetchPadsWithCompany(this.wellDetails.companyId);
          //this.fetchPadsWithCompany(this.tankDetails.companyId);
        }
        else {
          this.loading = false;
        }
      });
  }
  formReset() {
    this.fetchCompanies();
    //this.wellsArr = [];
  }


  updateWell(wellDetails) {
    console.log('wellDetails', wellDetails);
    this.showWellDetails = true;
    this.userService.updateWell(wellDetails)
      .then(res => {
        if (res.code == 200) {
          this.wellDetails = res.data;
          this.showWellDetails = false;
          this.loading = false;
          this.fetchwells(0, 20);
        }
        else {
          this.loading = false;
        }
      });

  }
  cancel() {
    this.showWellDetails = false;
  }
  disableWell(userId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to disable this Well?',
      accept: () => {
        this.loading = true;
        //console.log(userId);
        this.userService.disableWell(userId)
          .then(res => {
            if (res.code == 200) {
              this.loading = false;
              this.msgs = [];
              this.msgs.push({ severity: 'success', summary: 'Success', detail: 'disabled successfully' });
              this.fetchwells(0, 20);
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

  enableWell(userId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to enable this well?',
      accept: () => {
        this.loading = true;
        // console.log(userId);
        this.userService.enableWell(userId)
          .then(res => {
            if (res.code == 200) {
              this.loading = false;
              this.msgs = [];
              this.fetchwells(0, 20);
              this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Well enabled successfully' });
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
}
