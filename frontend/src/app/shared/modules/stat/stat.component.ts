import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../providers/users.service';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';

@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
    @Input() bgClass: string;
    @Input() icon: string;
    @Input() count: number;
    @Input() label: string;
    @Input() data: number;
    @Input() link: string;
    @Output() event: EventEmitter<any> = new EventEmitter();
    geofences: any = [];
    showRadiusDetails:boolean = false;
    updateDetails:any=[];
    public loading = false;
    msgs: Message[] = [];
    constructor(private router: Router, private userService: UsersService,private confirmationService: ConfirmationService) { }

    ngOnInit() {
      

    }
    cancel() {
        this.showRadiusDetails = false;
      }
    viewDetails(link) {
        if (link == 'pads') {
            this.router.navigate(['/view-pads'])
        } else if (link == 'tanks') {
            this.router.navigate(['/view-tanks'])
        } else if (link == 'wells') {
            this.router.navigate(['/view-wells'])
        } else if (link == 'transactions') {
            this.router.navigate(['/view-transactions-Details'])
        } else if (link == 'geofencing') {
            this.showRadiusDetails = true;
            this.geofence();
            //this.updateRadius(this.geofences);
        }

    }
    updateRadius(geofences) {
        console.log('in update radius',geofences);
          this.showRadiusDetails = true;
          this.userService.updateradius(geofences)
            .then(res => {
              if (res.code == 200) {
                this.updateDetails = res.data;
                this.showRadiusDetails = false;
                this.loading = false;
               // this.updateDetails
                // this.geofence();
              }
              else {
                console.log(res.message);
                this.loading = false;
              }
            });
        }
      

    geofence() {
         this.loading = true;
         let role = this.userService.readSession().role;
         let companyId = this.userService.readSession()._id;
        var data = {
             role: role,
             companyId: companyId,
            // offset: offset, rows: rows, type: 'user'
        }
        this.userService.geofence(data)
            .then(res => {
                if (res.code == 200) {
                     this.loading = false;
                    this.geofences = res.data;
                   // console.log('geofences==',this.geofences);
                }
                else {
                    //console.log(res.message);
                      this.loading = false;
                      this.msgs = [];
                     this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
                }
            })
    }
}
