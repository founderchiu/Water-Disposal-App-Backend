webpackJsonp(["user.module"],{

/***/ "./src/app/pages/user/edit/edit.component.html":
/***/ (function(module, exports) {

module.exports = "<form role=\"form\">\n\n    <div class=\"form-group has-success\">\n        <!-- <label class=\"form-control-label\" for=\"inputSuccess\">Input with success</label> -->\n          <!-- <input type=\"text\" [(ngModel)]=\"userDetails.userName\" /> -->\n          <input type=\"text\"/>\n    </div>\n\n    <div class=\"form-group has-success\">\n        <!-- <label class=\"form-control-label\" for=\"inputWarning\">Input with warning</label> -->\n        <!-- <input type=\"text\" [(ngModel)]=\"selemuserDetailsp.companyName\" /> -->\n    </div>\n\n    <div class=\"form-group has-success\">\n        <!-- <label class=\"form-control-label\" for=\"inputError\">Input with danger</label> -->\n        <!-- <input type=\"text\" [(ngModel)]=\"userDetails.Email\" /> -->\n    </div>\n    <button type=\"button\" (click)=\"getUserDetails\">Update </button>\n\n</form>\n"

/***/ }),

/***/ "./src/app/pages/user/edit/edit.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/user/edit/edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_users_service__ = __webpack_require__("./src/app/providers/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EditComponent = (function () {
    function EditComponent(usersService, _router) {
        this.usersService = usersService;
        this._router = _router;
    }
    EditComponent.prototype.ngOnInit = function () {
    };
    EditComponent.prototype.getUserDetails = function (id) {
        //   console.log('inside get user details');
        //   this.usersService.getUserDetails(id).subscribe(response =>{
        //     // if (this.userDetails && this.userDetails._id == id) {
        //     //   return this.userDetails;
        //     // }
        // },
        // (error:any)=>{
        //   console.log(error);
        // });
    };
    return EditComponent;
}());
EditComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-edit',
        template: __webpack_require__("./src/app/pages/user/edit/edit.component.html"),
        styles: [__webpack_require__("./src/app/pages/user/edit/edit.component.scss")],
        providers: [__WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _b || Object])
], EditComponent);

var _a, _b;
//# sourceMappingURL=edit.component.js.map

/***/ }),

/***/ "./src/app/pages/user/user.component.html":
/***/ (function(module, exports) {

module.exports = "\n<!-- <div class=\"card mb-3\" [@routerTransition]> -->\n                <div class=\"card-header\">Users List</div>\n                <table class=\"card-block table table-hover\">\n                    <thead>\n                    <tr>\n                        <th>User Name</th>\n                        <th>Company Name</th>\n                        <th>Email</th>\n                    </tr>\n                    </thead>\n                    <tbody>\n                   <tr *ngFor=\"let user of userList; let i = index;\">\n                       <td scope=\"row\"><a href [routerLink]=\"['/users/edit', user._id]\">{{user.userName}}</a></td>\n                        <td>{{user.companyName}}</td>\n                        <td>{{user.Email}}</td>\n                          <!-- <button type=\"button\" [routerLink]=\"['/users/edit',user._id]\" (click)=\"editUser\">Edit </button> -->\n                          <button type=\"button\" (click)=\"deleteUser(user._id, i)\">Delete </button>\n                    </tr>\n                    </tbody>\n                </table>\n            <!-- </div> -->\n"

/***/ }),

/***/ "./src/app/pages/user/user.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/user/user.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_users_service__ = __webpack_require__("./src/app/providers/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { routerTransition } from '../router.animations';


var UserComponent = (function () {
    function UserComponent(usersService, router) {
        this.usersService = usersService;
        this.router = router;
        this.getUsers();
    }
    UserComponent.prototype.deleteUser = function (id, index) {
        console.log('delete userid==', id);
        // this.usersService.deleteUser(id).subscribe(response =>{
        //     console.log('delete user service');
        //      this.userList.splice(index, 1);
        // });
    };
    UserComponent.prototype.editUser = function (id) {
        console.log('id===', id);
        this.empId = id;
        this.router.navigate(['/users/edit, id']);
    };
    UserComponent.prototype.ngOnInit = function () {
    };
    UserComponent.prototype.getUsers = function () {
        // this.usersService.getUsers().subscribe(response => {
        //   if (response) {
        //     var responseData=JSON.parse(response._body);
        //     this.userList = responseData.data;
        //   }
        // },(error:any)=>{
        //   console.log(error);
        // }
        // );
    };
    return UserComponent;
}());
UserComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-user',
        template: __webpack_require__("./src/app/pages/user/user.component.html"),
        styles: [__webpack_require__("./src/app/pages/user/user.component.scss")],
        providers: [__WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */]]
        //animations: [routerTransition()]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _b || Object])
], UserComponent);

var _a, _b;
//# sourceMappingURL=user.component.js.map

/***/ }),

/***/ "./src/app/pages/user/user.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserModule", function() { return UserModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_component__ = __webpack_require__("./src/app/pages/user/user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__edit_edit_component__ = __webpack_require__("./src/app/pages/user/edit/edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_routing_module__ = __webpack_require__("./src/app/pages/user/user.routing.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var UserModule = (function () {
    function UserModule() {
    }
    return UserModule;
}());
UserModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_4__user_routing_module__["a" /* UserRoutingModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__user_component__["a" /* UserComponent */], __WEBPACK_IMPORTED_MODULE_3__edit_edit_component__["a" /* EditComponent */]]
    })
], UserModule);

//# sourceMappingURL=user.module.js.map

/***/ }),

/***/ "./src/app/pages/user/user.routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_component__ = __webpack_require__("./src/app/pages/user/user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__edit_edit_component__ = __webpack_require__("./src/app/pages/user/edit/edit.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: 'list', component: __WEBPACK_IMPORTED_MODULE_2__user_component__["a" /* UserComponent */] },
    { path: 'edit/:id', component: __WEBPACK_IMPORTED_MODULE_3__edit_edit_component__["a" /* EditComponent */] }
];
var UserRoutingModule = (function () {
    function UserRoutingModule() {
    }
    return UserRoutingModule;
}());
UserRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
    })
], UserRoutingModule);

//# sourceMappingURL=user.routing.module.js.map

/***/ })

});
//# sourceMappingURL=user.module.chunk.js.map