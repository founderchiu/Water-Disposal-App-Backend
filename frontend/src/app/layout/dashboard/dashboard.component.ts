import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UsersService } from '../../providers/users.service';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message, OverlayPanelModule } from 'primeng/primeng';
import {LightboxModule} from 'primeng/primeng';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    PadCount:any=[];
    totalTanksCount:any[];
    totalwellsCount:any=[];
    totalTransactions:any=[];
    msgs: Message[] = [];
    public loading = false;
    geofencingValue:any=[];
    radius:any;
    userRole = '';
    

    constructor(private userService: UsersService, private confirmationService: ConfirmationService,private router: Router) {
        // this.sliders.push({
        //     imagePath: 'assets/images/slider1.jpg',
        //     label: 'First slide label',
        //     text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
        // }, {
        //     imagePath: 'assets/images/slider2.jpg',
        //     label: 'Second slide label',
        //     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        // }, {
        //     imagePath: 'assets/images/slider3.jpg',
        //     label: 'Third slide label',
        //     text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
        // });

        // this.alerts.push({
        //     id: 1,
        //     type: 'success',
        //     message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        //         Voluptates est animi quibusdam praesentium quam, et perspiciatis,
        //         consectetur velit culpa molestias dignissimos
        //         voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
        // }, {
        //     id: 2,
        //     type: 'warning',
        //     message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        //         Voluptates est animi quibusdam praesentium quam, et perspiciatis,
        //         consectetur velit culpa molestias dignissimos
        //         voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
        // });
    }

    ngOnInit() {
      this.userRole = this.userService.readSession().role;
      console.log(this.userRole);
        this.fetchTotalPads();
        this.totalTanks();
        this.totalWells();
        this.totalTransaction();
        this.geofencing();
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
        fetchTotalPads() {
            this.loading = true;
            let role = this.userService.readSession().role;
            let companyId = this.userService.readSession()._id;
            var data = {
              role: role,
              companyId: companyId,
             // offset: offset, rows: rows, type: 'user'
            }
            this.userService.totalPads(data)
              .then(res => {
                if (res.code == 200) {
                  this.loading = false;
                  this.PadCount = res.data;
                 // console.log('PadCount==',this.PadCount);
                }
                else {
                  this.loading = false;
                  this.msgs = [];
                  this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
                }
              })
          }
        //totalPads

        totalTanks() {
             this.loading = true;
             let role = this.userService.readSession().role;
             let companyId = this.userService.readSession()._id;
             var data = {
               role: role,
               companyId: companyId,
              // offset: offset, rows: rows, type: 'user'
             }
             this.userService.totalTanks(data)
               .then(res => {
                 if (res.code == 200) {
                   this.loading = false;
                   this.totalTanksCount = res.data;
                   //console.log('totalTanksCount==',this.totalTanksCount);
                 }
                 else {
                    // console.log(res.message);
                   this.loading = false;
                   this.msgs = [];
                   this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
                 }
               })
           }

           totalWells() {
             this.loading = true;
             let role = this.userService.readSession().role;
             let companyId = this.userService.readSession()._id;
             var data = {
               role: role,
               companyId: companyId,
              // offset: offset, rows: rows, type: 'user'
             }
             this.userService.totalWells(data)
               .then(res => {
                 if (res.code == 200) {
                   this.loading = false;
                   this.totalwellsCount = res.data;
                  // console.log('totalwellsCount==',this.totalwellsCount);
                 
                 }
                 else {
                   this.loading = false;
                   this.msgs = [];
                   this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
                 }
               })
           }
           
           totalTransaction() {
             //  console.log('inside total tranc1')
             this.loading = true;
             let role = this.userService.readSession().role;
             let companyId = this.userService.readSession()._id;
             var data = {
               role: role,
               companyId: companyId,
              // offset: offset, rows: rows, type: 'user'
             }
             this.userService.totalTransactions(data)
               .then(res => {
                 if (res.code == 200) {
                   this.loading = false;
                   this.totalTransactions = res.data;
                 }
                 else {
                   this.loading = false;
                   this.msgs = [];
                   this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
                 }
               })
           }
           geofencing() {
            //  console.log('inside total tranc1')
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
                  this.geofencingValue = res.data;
                  // this.radius= this.geofencingValue[0].radius;
                  console.log('geofencingValue',this.geofencingValue);
                }
                else {
                  this.loading = false;
                  this.msgs = [];
                  this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
                }
              })
          }
        
}
