import { Injectable } from '@angular/core';
import { Http, Headers, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map'
import { AppConstants } from '../config/constants';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import { HttpService } from './http-service.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
@Injectable()

export class UsersService {
  constructor(private http: HttpService, private router: Router, private cookieService: CookieService) { }

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private userUrl = AppConstants.baseUrl;

  loginUser(userData): Promise<any> {
    return this.http.post(this.userUrl + '/login', JSON.stringify(userData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  forgotpassword(data) {
    // console.log('forgot password');
    return this.http.post(this.userUrl + '/forgotPassword', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);

  }

  resetpassword(data) {
    // console.log('reset password',data);
    return this.http.post(this.userUrl + '/reset-Password', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);

  }
  //edit user profile
  editUser(tankId): Promise<any> {
    var postData = {
      userId: tankId
    }
    return this.http.post(this.userUrl + '/editProfile', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  //updateUser
  updateUser(userData): Promise<any> {
    // var postData = {
    //   userId: userId
    // }
    //console.log('update user service',userData);
    return this.http.post(this.userUrl + '/update-Profile', JSON.stringify(userData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  //updateTank
  updateTank(userData): Promise<any> {
    return this.http.post(this.userUrl + '/update-tanks', JSON.stringify(userData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  //updateWell
  updateWell(userData): Promise<any> {
   
    return this.http.post(this.userUrl + '/update-wells', JSON.stringify(userData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  //updatePads
  updatePads(padData): Promise<any> {
   // console.log('padData',padData);
    return this.http.post(this.userUrl + '/update-pads', JSON.stringify(padData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  updateradius(radiusData): Promise<any> {
    //console.log('padData',padData);
    return this.http.post(this.userUrl + '/updateRadius', JSON.stringify(radiusData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  //edit tank
  editTank(tankId): Promise<any> {
    var postData = {
      userId: tankId
    }
    return this.http.post(this.userUrl + '/edit-tanks', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

//View Image
  viewImage(tankId): Promise<any> {
    var postData = {
      userId: tankId
    }
    return this.http.post(this.userUrl + '/view-image', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  //View Image
  fetchImgId(tankId): Promise<any> {
    var postData = {
      userId: tankId
    }
    return this.http.post(this.userUrl + '/fetch-TrancId', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  //edit well
  editWell(wellId): Promise<any> {
    var postData = {
      wellId: wellId
    }
    return this.http.post(this.userUrl + '/edit-wells', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  //edit Pads
  editPad(padId): Promise<any> {
    var postData = {
      padId: padId
    }
    return this.http.post(this.userUrl + '/edit-Pads', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }



  addUser(userData): Promise<any> {
    //console.log('in add user userData==',userData);
    return this.http.post(this.userUrl + '/signup', JSON.stringify(userData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  addPad(padData): Promise<any> {
    return this.http.post(this.userUrl + '/add-pads', JSON.stringify(padData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  addTank(tankData): Promise<any> {
    return this.http.post(this.userUrl + '/addtank', JSON.stringify(tankData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  addWell(wellData): Promise<any> {
    return this.http.post(this.userUrl + '/wells', JSON.stringify(wellData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  fetchCompanies(data): Promise<any> {
    return this.http.post(this.userUrl + '/fetch-company', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  fetchLog(data): Promise<any> {
    return this.http.post(this.userUrl + '/fetchlog', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  fetchCompanyUsers(data): Promise<any> {
    // console.log('data in service==',data);
    return this.http.post(this.userUrl + '/fetch-company-users', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  fetchHaulers(data): Promise<any> {
    return this.http.post(this.userUrl + '/fetch-hauler', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  fetchHaulersUser(data): Promise<any> {
    return this.http.post(this.userUrl + '/fetch-hauler-users', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  fetchPads(): Promise<any> {
    return this.http.get(this.userUrl + '/fetch-pads', { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  fetchPadsForGis(): Promise<any> {
    console.log(' in service');
    return this.http.get(this.userUrl + '/fetch-Pads-For-Gis', { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  
  totalPads(data): Promise<any> {
    let postData = {
      data: data
    }
    console.log('inside total Pads');
    return this.http.post(this.userUrl + '/total-pads',JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  fetchPadsWithComp(companyId): Promise<any> {
    var postData = {
      companyId: companyId
    }
    return this.http.post(this.userUrl + '/fetch-pads-with-comp', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  fetchPadsWithLatLong(PadId): Promise<any> {
    var postData = {
      PadId: PadId
    }
    return this.http.post(this.userUrl + '/fetch-Pads-LatLong', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  fetchWellWithPads(padId): Promise<any> {
    var postData = {
      padId: padId
    }
    return this.http.post(this.userUrl + '/fetch-wells-with-pads', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  disableUser(userId): Promise<any> {
    let postData = {
      userId: userId
    }
    return this.http.post(this.userUrl + '/disable-user', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  enableUser(userId): Promise<any> {
    let postData = {
      userId: userId
    }
    return this.http.post(this.userUrl + '/enable-user', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  disableWell(userId): Promise<any> {
    let postData = {
      userId: userId
    }
    return this.http.post(this.userUrl + '/disable-wells', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  enableWell(userId): Promise<any> {
    let postData = {
      userId: userId
    }
    return this.http.post(this.userUrl + '/enable-wells', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  disablePad(userId): Promise<any> {
    let postData = {
      userId: userId
    }
    return this.http.post(this.userUrl + '/disable-pads', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  enablePad(padId): Promise<any> {
    let postData = {
      padId: padId
    }
    return this.http.post(this.userUrl + '/enable-pads', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
 
  disableTank(tankId): Promise<any> {
    let postData = {
      tankId: tankId
    }
    return this.http.post(this.userUrl + '/disable-tanks', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  enableTank(tankId): Promise<any> {
    let postData = {
      tankId: tankId
    }
    return this.http.post(this.userUrl + '/enable-tanks', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  //transaction Details
  fetchtranc(tankId): Promise<any> {
    let postData = {
      tankId: tankId
    }
    return this.http.post(this.userUrl + '/fetchtransactionDetails', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  fetchtImg(tankId): Promise<any> {
    let postData = {
      tankId: tankId
    }
    return this.http.post(this.userUrl + '/fetch-Images', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  deleteUser(userId): Promise<any> {
    let postData = {
      userId: userId
    }
    return this.http.post(this.userUrl + '/delete-user', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  //Delete tank
  deleteTank(userId): Promise<any> {
    let postData = {
      userId: userId
    }
    return this.http.post(this.userUrl + '/delete-tanks', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  // deleteWells
  deleteWells(userId): Promise<any> {
    let postData = {
      userId: userId
    }
    return this.http.post(this.userUrl + '/delete-wells', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  deletePads(padId): Promise<any> {
    let postData = {
      padId: padId
    }
    return this.http.post(this.userUrl + '/delete-Pads', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  fetchtanks(data): Promise<any> {
    return this.http.post(this.userUrl + '/fetch-tanks', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  totalTanks(data): Promise<any> {
    let postData = {
      data: data
    }
    return this.http.post(this.userUrl + '/total-tanks', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  totalWells(data): Promise<any> {
    let postData = {
      data: data
    }
    console.log('in service well',data)
    return this.http.post(this.userUrl + '/total-wells', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  totalTransactions(data): Promise<any> {
    let postData = {
      data: data
    }
    console.log('in service tranc',data)
    return this.http.post(this.userUrl + '/total-transaction',  JSON.stringify(postData),{ headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  viewTransactions(data): Promise<any> {
    return this.http.post(this.userUrl + '/view-transaction-Details', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  // view-transaction-Details

  fetchPadsForReport(data): Promise<any> {
    return this.http.post(this.userUrl + '/fetch-pads-report', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  fetchTanksForChart(data): Promise<any> {
    return this.http.post(this.userUrl + '/fetch-tanks-chart', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  fetchMonthChart(data): Promise<any> {
    //  console.log('in fetch month chart');
    return this.http.post(this.userUrl + '/fetch-month-chart', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  fetchYearChart(data): Promise<any> {
    // console.log('in fetch month chart');
    return this.http.post(this.userUrl + '/fetch-year-chart', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
//pie chat data
  fetchDayPieChart(data): Promise<any> {
    console.log('data in service==',data);
    return this.http.post(this.userUrl + '/view-days-PieChart', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  fetchMonthPieChart(data): Promise<any> {
    //  console.log('in fetch month chart');
    return this.http.post(this.userUrl + '/view-months-PieChart', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  fetchYearPieChart(data): Promise<any> {
    // console.log('in fetch month chart');
    return this.http.post(this.userUrl + '/view-years-PieChart', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }



  totalTankVolume(data): Promise<any> {
    // console.log('in fetch month chart');
    return this.http.post(this.userUrl + '/fetch-total-volume', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  fetchVolume(data): Promise<any> {
    //console.log('in chart',data);
    return this.http.post(this.userUrl + '/fetch-volume', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  fetchSingleTankVolume(tankId) {
    var postData = {
      tankId: tankId
    }
    return this.http.post(this.userUrl + '/tank-volume', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);

  }

  fetchSingleTankLineVolume(tankId) {
    var postData = {
      tankId: tankId
    }
     console.log('tankIdin service',tankId);
    return this.http.post(this.userUrl + '/single-tankvolume-line', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);

  }

  //  fetchSingleTankLineVolume(padId){

  //   //console.log('tankIdin service',padId);
  //   return this.http.post(this.userUrl + '/single-tankvolume-line', JSON.stringify(postData), { headers: this.headers })
  //   .toPromise()
  //   .then(res => res.json())
  //   .catch(this.handleError);

  //  }
  fetchSingleTankLineVolumeMonth(padId) {
    var postData = {
      padId: padId
    }
    return this.http.post(this.userUrl + '/single-tankvolume-line-month', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);

  }
  fetchSingleTankLineVolumeYear(tankId) {
    var postData = {
      tankId: tankId
    }
    return this.http.post(this.userUrl + '/single-tankvolume-line-year', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);

  }

  fetchtpads(data): Promise<any> {
    return this.http.post(this.userUrl + '/fetch-padsData', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  //new changes
  fetchwells(data): Promise<any> {
    return this.http.post(this.userUrl + '/fetch-wells', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  geofence(data): Promise<any> {
    return this.http.post(this.userUrl + '/geofence', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  exportTankCsv(data): Promise<any> {
    return this.http.post(this.userUrl + '/export-tanks-csv', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  exportPadsCsv(data): Promise<any> {
    return this.http.post(this.userUrl + '/export-pads-csv', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  setSession(data) {
    localStorage.admin_login = JSON.stringify(data);
  }


  logout() {
    delete localStorage.admin_login;
    this.cookieService.remove('session');
    this.router.navigate(['/login']);

  }

  readSession() {
    return JSON.parse(localStorage.admin_login);
  }

  isAuth() {
    return localStorage.admin_login != null;
  }

  uploadImage(imgSrc): Promise<any> {
    let postData = {
      imgSrc: imgSrc
    }
    return this.http.post(this.userUrl + '/upload-image', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  importTanksCsv(data): Promise<any> {
    let postData = {
      data: data
    }
    return this.http.post(this.userUrl + '/import-tanks-csv', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  importPadsCsv(data): Promise<any> {
    let postData = {
      data: data
    }
    // console.log('postData',postData);
    return this.http.post(this.userUrl + '/import-pads-csv', JSON.stringify(postData), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
} 
