import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../providers/users.service';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';

@Component({
  selector: 'app-viewlog',
  templateUrl: './viewlog.component.html',
  styleUrls: ['./viewlog.component.scss']
})
export class ViewlogComponent implements OnInit {
  public loading = false;
  logArr:any=[];
  records:any=[];
  msgs: Message[] = [];
  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.fetchLog(0,20);
  }

fetchLog(offset, rows) {
  let role = this.userService.readSession().role;
  let companyId = this.userService.readSession()._id;
  var data = {
    role: role,
    companyId: companyId,
    offset: offset, rows: rows, type: 'user'
  }
  // this.loading = true;
  this.userService.fetchLog(data)
    .then(res => {
      if (res.code == 200) {
        // this.loading = false;
        this.logArr = res.data;
        console.log('this.log',this.logArr);
        this.records = res.count;
      }
      else {
        // this.loading = false;
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'error', detail: 'insufficient Data' });
      }
    })
}

}
