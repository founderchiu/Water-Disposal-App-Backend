import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../providers/users.service';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';

@Component({
  selector: 'app-view-pads',
  templateUrl: './view-pads.component.html',
  styleUrls: ['./view-pads.component.scss']
})
export class ViewPadsComponent implements OnInit {
  padsArr: any = [];
  public loading = false;
  msgs: Message[] = [];
  qrcode;
  filesToUpload: Array<File>;
  display: boolean = false;
  email = '';
  records:any=[];
  showPadDetails: boolean = false;
  padDetails:any=[];

  constructor(private userService: UsersService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.fetchtpads(0,20);
  }
  fetchtpads(offset, rows) {
    let role = this.userService.readSession().role;
    let companyId = this.userService.readSession()._id;
    var data = {
      role: role,
      companyId: companyId,
      offset: offset, rows: rows, type: 'user'
    }
    this.loading = true;
    this.userService.fetchtpads(data)
      .then(res => {
        if (res.code == 200) {
          this.loading = false;
          this.padsArr = res.data;
          this.records = res.count;
        }
        else {
          this.loading = false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'error', detail: 'insufficient Data' });
        }
      })
  }

  paginate(event) {
    console.log('in event',event);
    var offset = event.first;
    var rows = event.rows;
    this.fetchtpads(offset, rows);
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

  upload() {
    this.loading = true;
    this.makeFileRequest("http://localhost:3034/api/import-pads-csv", [], this.filesToUpload).then((result) => {
      if (result['code'] == 200) {
        setTimeout(() => {
          this.fetchtpads(0,20);
        }, 1000);
      }
    }, (error) => {
      console.error(error);
    });
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for (var i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i].name);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }

  exportPadsCsv() {
    console.log(' click on exportPadsCsv');
    this.display = true;
  }


  exportCsv(email) {
    //console.log(email.value);
    let role = this.userService.readSession().role;
    let companyId = this.userService.readSession()._id;
    var data = {
      role: role,
      companyId: companyId,
      email: email.value
    }
    if (email.value) {
      this.display = false;
      this.loading = true;
      this.userService.exportPadsCsv(data)
        .then(res => {
          if (res.code == 200) {
            this.loading = false;
            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Tanks Csv sent to you email' });
          }
          else {
            this.loading = false;
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
          }
        })
    }
    else {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error', detail: "Please enter the email" });
    }
  }
  editPad(padId) {
    console.log('userId',padId);
    this.showPadDetails = true;
    this.userService.editPad(padId)
      .then(res => {
        if (res.code == 200) {
          this.loading = false;
          this.padDetails = res.data;
          this.fetchtpads(0, 20);
          //console.log('this.padDetails',this.padDetails);
          //this.fetchPadsWithCompany(this.wellDetails.companyId);
          //this.fetchPadsWithCompany(this.tankDetails.companyId);
        }
        else {
          this.loading = false;
        }
      });
  }
  updatePad(padDetails) {
  //  console.log('padDetails===>>>', padDetails);
    this.showPadDetails = true;
    this.userService.updatePads(padDetails)
      .then(res => {
        if (res.code == 200) {
          this.padDetails = res.data;
          this.showPadDetails = false;
          this.loading = false;
          this.fetchtpads(0, 20);
        }
        else {
          this.loading = false;
        }
      });
  }
  cancel() {
    this.showPadDetails = false;
  }

  deletePads(userId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this Pad?',
      accept: () => {
        this.loading = true;
        this.userService.deletePads(userId)
          .then(res => {
            if (res.code == 200) {
              this.loading = false;
              this.msgs = [];
              this.fetchtpads(0, 20);
              this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Pad deleted successfully' });
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

  disablePad(userId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to disable this Pad?',
      accept: () => {
        this.loading = true;
        //console.log(userId);
        this.userService.disablePad(userId)
          .then(res => {
            if (res.code == 200) {
              this.loading = false;
              this.msgs = [];
              this.msgs.push({ severity: 'success', summary: 'Success', detail: 'disabled successfully' });
              this.fetchtpads(0, 20);
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

  enablePad(userId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to enable this Pad?',
      accept: () => {
        this.loading = true;
        // console.log(userId);
        this.userService.enablePad(userId)
          .then(res => {
            if (res.code == 200) {
              this.loading = false;
              this.msgs = [];
              this.fetchtpads(0, 20);
              this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Pad enabled successfully' });
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
