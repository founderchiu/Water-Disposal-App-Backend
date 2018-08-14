import { Injectable } from '@angular/core';
import { Http, Headers, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map'
import { AppConstants } from '../config/constants';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Rx';
@Injectable()

export class LoginService {
  constructor(public http: Http) { }
  getloginauth(currentuser) {
     return this.http.post(AppConstants.baseUrl + AppConstants.serverRoutes.getloginauth, currentuser)
      .map(res => res.json());
  }
// 
//   getUsers() {
//     return this.http.get(AppConstants.baseUrl + AppConstants.serverRoutes.getUsers)
//         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
// };



    // saveCustomer(postData) {
    //     console.log(postData);
    //     return this.http.post(AppConstants.baseUrl + AppConstants.serverRoutes.saveCustomer, postData)
    //         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    // };


  // saveCustomer(postData) {
  //   return this.http.post(AppConstants.baseUrl + AppConstants.serverRoutes.saveCustomer, postData)
  //     .map(res => res.json())
  //     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  // }

  // activateUserAccount(userId) {
  //   let body: Object = { userId: userId }
  //   return this.http.put(AppConstants.baseUrl + AppConstants.serverRoutes.activateUserAccount, body)
  //     .map(res => res.json())
  //     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  // }
}
