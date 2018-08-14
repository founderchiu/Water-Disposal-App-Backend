import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../providers/users.service';
import {CarouselModule} from 'primeng/primeng';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';


@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent implements OnInit {
  fetchtImgData:any=[];
  msgs: Message[] = [];

  constructor(private userService: UsersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
    //  console.log('paramsId in view image component==',params['id'])
      if (params['id']) {
        this.fetchtImg(params['id'])
      }
    });
  }

  fetchtImg(tankId) {
   // console.log('tankId in view component==',tankId);
    this.userService.fetchtImg(tankId)
      .then(res => {
        if (res.code == 200) {
          this.fetchtImgData = res.data
          //console.log('this.fetchtImgData in view image component',this.fetchtImgData);
        }
        else {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
        }
      })
  }
}
