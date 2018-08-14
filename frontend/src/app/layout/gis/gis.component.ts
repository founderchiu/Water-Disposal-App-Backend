import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../providers/users.service';
import { Router } from '@angular/router';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';
import { routerTransition } from '../../router.animations';
// import { AgmCoreModule } from '@agm/core';
// declare var google: any;

@Component({
  selector: 'app-gis',
  templateUrl: './gis.component.html',
  styleUrls: ['./gis.component.scss'],
  animations: [routerTransition()]
})
export class GisComponent implements OnInit {
  tanksArr: any = [];
  markers: any[];
  options: any;
  overlays: any = [];
  infoWindow: any;
  positions: any[];
  tankId: string;
  gisValue: any = [];
  msgs: Message[] = [];
  public loading = false;

  constructor(private userService: UsersService, private router: Router) {

  }

  ngOnInit() {
    this.fetchtanks((v) => {
    });



    //isme option hota show label false karne ka baatata hu abhi ok??     
    var user = JSON.parse(localStorage.getItem('padValue'));
    this.options = {
      showLabel: false,
      center: { lat: parseFloat(user.lat), lng: parseFloat(user.long) },
      //center: { lat:40.712775, lng: -74.005973 },
      zoom: 8
    };

    //this.initOverlays();

    //this.infoWindow = new google.maps.InfoWindow();

  }

  fetchtanks(cb) {
    this.loading = true;
    let role = this.userService.readSession().role;
    let companyId = this.userService.readSession()._id;
    var data = {
      role: role,
      companyId: companyId
    }
    this.userService.fetchtanks(data)
      .then(res => {
        if (res.code == 200) {
          this.gisValue = res.data;
          if (this.gisValue == '') {
            this.msgs = [];
            this.loading = false;
            this.msgs.push({ severity: 'error', summary: 'error', detail: "insufficient Data" });
          }
          cb(this.gisValue);
          res.data.forEach((item, index) => {
            this.loading = false;
            let positionArray = new Array();
            positionArray = [new google.maps.Marker({ position: { lat: parseFloat(item.lat), lng: parseFloat(item.long) }, title: item.tank_name, cursor: item._id })]
            this.overlays = this.overlays.concat(positionArray);
          });
        }
        else {
          this.loading = false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });

        }
      });
  }
  //new code
  handleMapClick(event) {
    //event: MouseEvent of Google Maps api
  }

  handleOverlayClick(event) {
    this.router.navigate(['/view-transactions/' + event.overlay.cursor])

  }

}
