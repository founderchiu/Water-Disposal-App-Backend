import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../providers/users.service';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message, OverlayPanelModule } from 'primeng/primeng';
import {LightboxModule} from 'primeng/primeng';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
@Component({
  selector: 'app-view-wells',
  templateUrl: './view-wells.component.html',
  styleUrls: ['./view-wells.component.scss'],
  animations: [routerTransition()]
})
export class ViewWellsComponent implements OnInit {
  tanksArr: any = [];
  public loading = false;
  msgs: Message[] = [];
  qrcode;
  filesToUpload: Array<File>;
  display: boolean = false;
  showTankDetails: boolean = false;
  email = '';
  records: any = [];
  tankDetails : any = []
  padArr:any=[];
  compArr:any=[];
  images: any[];
  tankImageDetails:any=[];

  constructor(private userService: UsersService, private confirmationService: ConfirmationService,private router: Router) {

    // this.images = [];
    // this.images.push({source:'assets/showcase/images/demo/sopranos/sopranos1.jpg', thumbnail: 'assets/showcase/images/demo/sopranos/sopranos1_small.jpg', title:'Sopranos 1'});
    // this.images.push({source:'assets/showcase/images/demo/sopranos/sopranos2.jpg', thumbnail: 'assets/showcase/images/demo/sopranos/sopranos2_small.jpg', title:'Sopranos 2'});
    // this.images.push({source:'assets/showcase/images/demo/sopranos/sopranos3.jpg', thumbnail: 'assets/showcase/images/demo/sopranos/sopranos3_small.jpg', title:'Sopranos 3'});
    // this.images.push({source:'assets/showcase/images/demo/sopranos/sopranos4.jpg', thumbnail: 'assets/showcase/images/demo/sopranos/sopranos4_small.jpg', title:'Sopranos 4'});
  
  }

  ngOnInit() {
    this.fetchtanks(0, 20);
    this.fetchCompanies();
  }

  fetchtanks(offset, rows) {
    console.log('inside fetch tanks')
    this.loading = true;
    let role = this.userService.readSession().role;
    let companyId = this.userService.readSession()._id;
    var data = {
      role: role,
      companyId: companyId,
      offset: offset, rows: rows, type: 'user'
    }
    this.userService.fetchtanks(data)
      .then(res => {
        if (res.code == 200) {
          this.loading = false;
          this.tanksArr = res.data;
          this.records = res.count;
          console.log('inside if',res.data)
          if(res.data==''){
            this.loading = false;
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error', detail: "insufficient data" });

          }
          // this.tanksArr.forEach((item, index) => {
          // });
        }
        else {
          console.log('inside else')
          this.loading = false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
        }
      })
  }
  
  viewimage(userId) {
    this.router.navigate(['/view-image/' + userId])
    console.log('userId in view image',userId);
  
    this.userService.viewImage(userId)
      .then(res => {
        if (res.code == 200) {
          this.loading = false;
          this.tankImageDetails = res.data;
          this.fetchtanks(0, 20);
        }
        else {
          this.loading = false;
        }
      });
  }


  paginate(event) {
    console.log('in event', event);
    var offset = event.first;
    var rows = event.rows;
    this.fetchtanks(offset, rows);
  }


  ViewQrCode(qrcode) {
    this.qrcode = qrcode;
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

  upload() {
    this.loading = true;
    this.makeFileRequest("http://localhost:3034/api/import-tanks-csv", [], this.filesToUpload).then((result) => {
      if (result['code'] == 200) {
        setTimeout(() => {
          this.fetchtanks(0, 20);
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

  exportTankCsv() {
    this.display = true;
    // this.loading = true;
    // this.userService.exportTankCsv()
    //   .then(res => {
    //     if (res.code == 200) {
    //       this.loading = false;
    //     
    //     }
    //     else {
    //       this.loading = false;
    //      
    //     }
    //   })
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
          //console.log('compArr===',this.compArr)
        }
        else {
          this.loading = false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
        }
      })
  }

  fetchPads(event) {
    this.loading = true;
    if(event!=0){
    let companyId = event.target.value;
    //this.fetchCompanies();
    this.userService.fetchPadsWithComp(companyId)
      .then(res => {
        if (res.code == 200) {
          this.loading = false;
          this.padArr = res.data
         // this.fetchCompanies();
          //console.log('this.padArr in view tanks',this.padArr)
        }
        else {
          this.loading = false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
        }
      })
    }
  }

  fetchPadsWithCompany(companyId){
    console.log('this.tankDetails',this.tankDetails);
    //let companyId=this.tankDetails.companyId;
    console.log('companyId==',companyId);
    this.userService.fetchPadsWithComp(companyId)
    .then(res => {
      if (res.code == 200) {
        this.loading = false;
        this.padArr = res.data
       // this.fetchCompanies();
       // console.log('this.padArr in view tanks',this.padArr)
      }
      else {
        this.loading = false;
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
      }
    })
  }

  editTank(userId) {
    this.showTankDetails = true;
    this.userService.editTank(userId)
      .then(res => {
        if (res.code == 200) {
          this.loading = false;
          this.tankDetails = res.data;
          this.fetchtanks(0, 20);
          this.fetchPadsWithCompany(this.tankDetails.companyId);
           //console.log('res.data===><><',this.tankDetails.companyId);
        }
        else {
          this.loading = false;
        }
      });
  }

  exportCsv(email) {
    console.log(email.value);
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
      this.userService.exportTankCsv(data)
        .then(res => {
          if (res.code == 200) {
            this.loading = false;
            console.log('res.data in export csv',res);
            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Tanks Csv sent to you email' });
            email.value='';
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
  deleteTanks(userId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this Tank?',
      accept: () => {
        this.loading = true;
        this.userService.deleteTank(userId)
          .then(res => {
            if (res.code == 200) {
              this.loading = false;
              this.msgs = [];
              this.fetchtanks(0,20);
              this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Tank deleted successfully' });
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

  formReset(){
    this.fetchCompanies();
    this.padArr = [];
  }

  updateTank(tankDetails) {
    this.showTankDetails = true;
    this.userService.updateTank(tankDetails)
      .then(res => {
        if (res.code == 200) {
          this.tankDetails = res.data;
          this.showTankDetails = false;
          this.loading = false;
          this.fetchtanks(0,20);
        }
        else {
          this.loading = false;
        }
      });

  }

  cancel() {
    this.showTankDetails = false;
  }
  disableTank(tankId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to disable this tank?',
      accept: () => {
        this.loading = true;
        //console.log(userId);
        this.userService.disableTank(tankId)
          .then(res => {
            if (res.code == 200) {
              this.loading = false;
              this.msgs = [];
              this.msgs.push({ severity: 'success', summary: 'Success', detail: 'disabled successfully' });
              this.fetchtanks(0, 20);
            }
            else {
              this.loading = false;
              this.msgs = [];
              this.msgs.push({ severity: 'error', summary: 'Error', detail: 'tank is not disabled' });
            }
          })
      }
    });
  }

  enableTank(tankId) {
   // console.log('tankId==',tankId)
    this.confirmationService.confirm({
      message: 'Are you sure that you want to enable this tank?',
      accept: () => {
        this.loading = true;
        // console.log(userId);
        this.userService.enableTank(tankId)
          .then(res => {
            if (res.code == 200) {
              this.loading = false;
              this.msgs = [];
              this.fetchtanks(0, 20);
              this.msgs.push({ severity: 'success', summary: 'Success', detail: 'tank enabled successfully' });
            }
            else {
              this.loading = false;
              this.msgs = [];
              this.msgs.push({ severity: 'error', summary: 'Error', detail: 'tank not enabled' });
            }
          })
      }
    });
  }

}
