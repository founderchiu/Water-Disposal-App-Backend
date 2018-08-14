import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../providers/users.service';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  providers: [UsersService]
})
export class TransactionsComponent implements OnInit {
  transactionData: any = [];
  tankId: any;
  msgs: Message[] = [];
  constructor(private userService: UsersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
     // console.log('params=====',params);
      console.log('paramsId==',params['id'])
      if (params['id']) {
        this.fetchtranc(params['id'])
      }
    });
  }

  fetchtranc(tankId) {
    this.userService.fetchtranc(tankId)
      .then(res => {
        if (res.code == 200) {
          this.transactionData = res.data
         // console.log('this.transactionData',this.transactionData);
        }
        else {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
        }
      })
  }


}
