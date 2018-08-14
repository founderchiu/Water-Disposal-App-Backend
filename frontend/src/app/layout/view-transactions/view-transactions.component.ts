import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../providers/users.service';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';
import { routerTransition } from '../../router.animations';
@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.scss'],
  animations: [routerTransition()]
})
export class ViewTransactionsComponent implements OnInit {
  transactionData:any=[];
  public loading = false;
  records: any = [];
  msgs: Message[] = [];
  constructor(private userService: UsersService,) { }

  ngOnInit() {
    this.viewTransactions(0,20);
  }
    
  viewTransactions(offset, rows) {
  
    this.loading = true;
    let role = this.userService.readSession().role;
    let companyId = this.userService.readSession()._id;
    var data = {
      role: role,
      companyId: companyId,
      offset: offset, rows: rows, type: 'user'
    }
    this.userService.viewTransactions(data)
      .then(res => {
        if (res.code == 200) {
          this.loading = false;
          this.transactionData = res.data
          this.records = res.count;
        //  console.log('this.transactionData',this.transactionData);
        // console.log('view trans');
        }
        else {
          // console.log('view else');
          this.loading = false;
          // console.log('inside else');
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error', detail: "insufficient Data" });
        }
      })
  }
  paginate(event) {
    //console.log('in event',event);
    var offset = event.first;
    var rows = event.rows;
    this.viewTransactions(offset, rows);
  }

}
