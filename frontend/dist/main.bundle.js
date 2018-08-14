webpackJsonp(["main"],{

/***/ "./src/$$_gendir lazy recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./blank-page/blank-page.module": [
		"./src/app/layout/blank-page/blank-page.module.ts",
		"blank-page.module"
	],
	"./bs-component/bs-component.module": [
		"./src/app/layout/bs-component/bs-component.module.ts",
		"common",
		"bs-component.module"
	],
	"./bs-element/bs-element.module": [
		"./src/app/layout/bs-element/bs-element.module.ts",
		"bs-element.module"
	],
	"./charts/charts.module": [
		"./src/app/layout/charts/charts.module.ts",
		"charts.module"
	],
	"./dashboard/dashboard.module": [
		"./src/app/layout/dashboard/dashboard.module.ts",
		"common",
		"dashboard.module"
	],
	"./form/form.module": [
		"./src/app/layout/form/form.module.ts",
		"form.module"
	],
	"./grid/grid.module": [
		"./src/app/layout/grid/grid.module.ts",
		"grid.module"
	],
	"./layout/layout.module": [
		"./src/app/layout/layout.module.ts",
		"common",
		"layout.module"
	],
	"./login/login.module": [
		"./src/app/login/login.module.ts",
		"login.module"
	],
	"./not-found/not-found.module": [
		"./src/app/not-found/not-found.module.ts",
		"not-found.module"
	],
	"./pages/user/user.module": [
		"./src/app/pages/user/user.module.ts",
		"user.module"
	],
	"./signup/signup.module": [
		"./src/app/signup/signup.module.ts",
		"signup.module"
	],
	"./tables/tables.module": [
		"./src/app/layout/tables/tables.module.ts",
		"tables.module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_gendir lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared__ = __webpack_require__("./src/app/shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__forgot_password_forgot_password_component__ = __webpack_require__("./src/app/forgot-password/forgot-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reset_password_reset_password_component__ = __webpack_require__("./src/app/reset-password/reset-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__reset_confirmation_reset_confirmation_component__ = __webpack_require__("./src/app/reset-confirmation/reset-confirmation.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






//import { ViewCompanyUsersComponent } from './layout/view-company-users/view-company-users.component';
var routes = [
    {
        path: '',
        loadChildren: './layout/layout.module#LayoutModule',
        canActivate: [__WEBPACK_IMPORTED_MODULE_2__shared__["a" /* AuthGuard */]]
    },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
    //{ path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#forgotpasswordModule'},
    { path: 'users', loadChildren: './pages/user/user.module#UserModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: 'forgot-password', component: __WEBPACK_IMPORTED_MODULE_3__forgot_password_forgot_password_component__["a" /* ForgotPasswordComponent */] },
    { path: 'reset-password/:token', component: __WEBPACK_IMPORTED_MODULE_4__reset_password_reset_password_component__["a" /* ResetPasswordComponent */] },
    { path: 'reset-sucessfully', component: __WEBPACK_IMPORTED_MODULE_5__reset_confirmation_reset_confirmation_component__["a" /* ResetConfirmationComponent */] },
    // { path: 'view-company-users', component: ViewCompanyUsersComponent },
    { path: '**', redirectTo: 'not-found' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(translate) {
        this.translate = translate;
        translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa']);
        translate.setDefaultLang('en');
        var browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr|ur|es|it|fa/) ? browserLang : 'en');
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("./src/app/app.component.html"),
        styles: [__webpack_require__("./src/app/app.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HttpLoaderFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* unused harmony export httpServiceFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_http_loader__ = __webpack_require__("./node_modules/@ngx-translate/http-loader/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routing_module__ = __webpack_require__("./src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared__ = __webpack_require__("./src/app/shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_login_service__ = __webpack_require__("./src/app/providers/login.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_users_service__ = __webpack_require__("./src/app/providers/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_http_service_service__ = __webpack_require__("./src/app/providers/http-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ngx_cookie__ = __webpack_require__("./node_modules/ngx-cookie/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ngx_loading__ = __webpack_require__("./node_modules/ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__forgot_password_forgot_password_component__ = __webpack_require__("./src/app/forgot-password/forgot-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__reset_password_reset_password_component__ = __webpack_require__("./src/app/reset-password/reset-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__reset_confirmation_reset_confirmation_component__ = __webpack_require__("./src/app/reset-confirmation/reset-confirmation.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















//import { ViewCompanyUsersComponent } from './layout/view-company-users/view-company-users.component';
// AoT requires an exported function for factories
// import { ViewlogComponent } from './layout/viewlog/viewlog.component';
function HttpLoaderFactory(http) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-4/master/dist/assets/i18n/', '.json');
    return new __WEBPACK_IMPORTED_MODULE_5__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, '/assets/i18n/', '.json');
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_17__forgot_password_forgot_password_component__["a" /* ForgotPasswordComponent */], __WEBPACK_IMPORTED_MODULE_18__reset_password_reset_password_component__["a" /* ResetPasswordComponent */], __WEBPACK_IMPORTED_MODULE_19__reset_confirmation_reset_confirmation_component__["a" /* ResetConfirmationComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["ReactiveFormsModule"], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_15__angular_http__["HttpModule"],
            __WEBPACK_IMPORTED_MODULE_6__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_16_ngx_loading__["a" /* LoadingModule */],
            __WEBPACK_IMPORTED_MODULE_12_ngx_cookie__["a" /* CookieModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: HttpLoaderFactory,
                    deps: [__WEBPACK_IMPORTED_MODULE_15__angular_http__["Http"]]
                }
            }),
            __WEBPACK_IMPORTED_MODULE_13_primeng_primeng__["GrowlModule"]
        ],
        //     providers: [
        //     LoginService,
        //   { provide: BrowserXhr, useClass: NgProgressBrowserXhr }
        //   // AuthService
        // ],
        providers: [__WEBPACK_IMPORTED_MODULE_8__shared__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_9__providers_login_service__["a" /* LoginService */], __WEBPACK_IMPORTED_MODULE_10__providers_users_service__["a" /* UsersService */], __WEBPACK_IMPORTED_MODULE_14__angular_common__["DatePipe"], {
                provide: __WEBPACK_IMPORTED_MODULE_11__providers_http_service_service__["a" /* HttpService */],
                useFactory: httpServiceFactory,
                deps: [__WEBPACK_IMPORTED_MODULE_15__angular_http__["XHRBackend"], __WEBPACK_IMPORTED_MODULE_15__angular_http__["RequestOptions"]]
            },],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//This is for http interceptor
function httpServiceFactory(backend, options) {
    return new __WEBPACK_IMPORTED_MODULE_11__providers_http_service_service__["a" /* HttpService */](backend, options);
}
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "./src/app/config/constants.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConstants; });
var AppConstants = (function () {
    function AppConstants() {
    }
    return AppConstants;
}());

//  public static baseUrl = "http://localhost:3034/api";        //For Local
//    public static baseUrl = "http://52.39.212.226:3026/";          //For old staging
//  public static baseUrl = "http://35.164.207.181:3026/";             //For Live
// public static baseUrl = "http://52.34.207.5:3034/api";          //For New staging
AppConstants.baseUrl = "http://18.233.237.121:80/api"; //For New Live
//Basic Authorization Key
AppConstants.authorizationKey = 'cmVzaW1wbGk6YW5ndWxhcmV4cGVydA==';
//Server Routes constants
AppConstants.serverRoutes = {
    // login: "admin/users/signIn",
    getloginauth: "api/admin",
    getUsers: "admin/users/getUsers",
    deleteUser: "users/deleteUser",
    userDetails: "users/userDetails",
};
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./src/app/forgot-password/forgot-password.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl baseZIndex=\"1\" [(value)]=\"msgs\"></p-growl>\n<div class=\"login-page\" [@routerTransition]>\n  <div class=\"row\">\n    <div class=\"col-md-4 push-md-4\">\n      <img src=\"assets/images/logo.png\" width=\"150px\" class=\"user-avatar\" />\n      <h1>Water Disposal System</h1>\n      <form [formGroup]=\"forgotPasswordForm\" (submit)=\"forgotPassword()\">\n        <div class=\"form-content\">\n          <div class=\"form-group\">\n            <input type=\"email\" class=\"form-control input-underline input-lg\" formControlName=\"email\" placeholder=\"E-mail\">\n          </div>\n          <span class=\"text-danger\">\n            <span *ngIf=\"forgotPasswordForm.controls['email'].hasError('required') && isSubmited\">\n              Please Enter your E-mail\n            </span>\n          </span>\n        </div>\n        <button type=\"submit\" class=\"btn rounded-btn\">submit</button>\n      </form>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/forgot-password/forgot-password.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/forgot-password/forgot-password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_users_service__ = __webpack_require__("./src/app/providers/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router_animations__ = __webpack_require__("./src/app/router.animations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ForgotPasswordComponent = (function () {
    //isSubmited: boolean = false;
    function ForgotPasswordComponent(fb, userService, router) {
        this.fb = fb;
        this.userService = userService;
        this.router = router;
        this.data = [];
        this.isSubmited = false;
        this.msgs = [];
        this.forgotPasswordForm = this.fb.group({
            email: [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]
        });
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        console.log('on init');
        //this.forgotPassword();
    };
    ForgotPasswordComponent.prototype.forgotPassword = function () {
        var _this = this;
        if (this.forgotPasswordForm.invalid) {
            this.isSubmited = true;
            return;
        }
        this.forgotPasswordForm.value.role = "0";
        this.userService.forgotpassword(this.forgotPasswordForm.value)
            .then(function (res) {
            console.log(res);
            if (res.status == 200) {
                _this.msgs = [];
                _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'A password reset link send on your email' });
                //alert("A password reset link send on your email please check.")
                //this.router.navigate(['/login']);
            }
            else {
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: "Invalid Email" });
            }
        });
    };
    return ForgotPasswordComponent;
}());
ForgotPasswordComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-forgot-password',
        template: __webpack_require__("./src/app/forgot-password/forgot-password.component.html"),
        styles: [__webpack_require__("./src/app/forgot-password/forgot-password.component.scss")],
        animations: [Object(__WEBPACK_IMPORTED_MODULE_3__router_animations__["a" /* routerTransition */])()]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_users_service__["a" /* UsersService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["Router"]) === "function" && _c || Object])
], ForgotPasswordComponent);

var _a, _b, _c;
//# sourceMappingURL=forgot-password.component.js.map

/***/ }),

/***/ "./src/app/providers/http-service.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/throw.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HttpService = (function (_super) {
    __extends(HttpService, _super);
    function HttpService(backend, options) {
        var _this = this;
        var token = localStorage.user_login ? JSON.parse(localStorage.user_login).token : 'undefined'; // your custom token getter function here
        options.headers.set('token', "" + token);
        _this = _super.call(this, backend, options) || this;
        return _this;
    }
    HttpService.prototype.request = function (url, options) {
        var token = localStorage.user_login ? JSON.parse(localStorage.user_login).token : 'undefined';
        if (typeof url === 'string') {
            if (!options) {
                // let's make option object
                options = { headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]() };
            }
            options.headers.set('token', "" + token);
        }
        else {
            // we have to add the token to the url object
            url.headers.set('token', "" + token);
        }
        return _super.prototype.request.call(this, url, options).catch(this.catchAuthError(this));
    };
    HttpService.prototype.catchAuthError = function (self) {
        // we have to pass HttpService's own instance here as `self`
        return function (res) {
            console.log(res);
            if (res.status === 401 || res.status === 403) {
                // if not authenticated Need to redirect with msg
                console.log('unauthorized Access');
                delete localStorage.user_login;
            }
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].throw(res);
        };
    };
    return HttpService;
}(__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]));
HttpService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["XHRBackend"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["XHRBackend"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]) === "function" && _b || Object])
], HttpService);

var _a, _b;
//# sourceMappingURL=http-service.service.js.map

/***/ }),

/***/ "./src/app/providers/login.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_constants__ = __webpack_require__("./src/app/config/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/throw.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginService = (function () {
    function LoginService(http) {
        this.http = http;
    }
    LoginService.prototype.getloginauth = function (currentuser) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_constants__["a" /* AppConstants */].baseUrl + __WEBPACK_IMPORTED_MODULE_3__config_constants__["a" /* AppConstants */].serverRoutes.getloginauth, currentuser)
            .map(function (res) { return res.json(); });
    };
    return LoginService;
}());
LoginService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], LoginService);

var _a;
//# sourceMappingURL=login.service.js.map

/***/ }),

/***/ "./src/app/providers/users.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_constants__ = __webpack_require__("./src/app/config/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/throw.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__http_service_service__ = __webpack_require__("./src/app/providers/http-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_cookie__ = __webpack_require__("./node_modules/ngx-cookie/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UsersService = (function () {
    function UsersService(http, router, cookieService) {
        this.http = http;
        this.router = router;
        this.cookieService = cookieService;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        this.userUrl = __WEBPACK_IMPORTED_MODULE_3__config_constants__["a" /* AppConstants */].baseUrl;
    }
    UsersService.prototype.loginUser = function (userData) {
        return this.http.post(this.userUrl + '/login', JSON.stringify(userData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.forgotpassword = function (data) {
        // console.log('forgot password');
        return this.http.post(this.userUrl + '/forgotPassword', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.resetpassword = function (data) {
        // console.log('reset password',data);
        return this.http.post(this.userUrl + '/reset-Password', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //edit user profile
    UsersService.prototype.editUser = function (tankId) {
        var postData = {
            userId: tankId
        };
        return this.http.post(this.userUrl + '/editProfile', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //updateUser
    UsersService.prototype.updateUser = function (userData) {
        // var postData = {
        //   userId: userId
        // }
        //console.log('update user service',userData);
        return this.http.post(this.userUrl + '/update-Profile', JSON.stringify(userData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //updateTank
    UsersService.prototype.updateTank = function (userData) {
        return this.http.post(this.userUrl + '/update-tanks', JSON.stringify(userData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //updateWell
    UsersService.prototype.updateWell = function (userData) {
        return this.http.post(this.userUrl + '/update-wells', JSON.stringify(userData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //updatePads
    UsersService.prototype.updatePads = function (padData) {
        // console.log('padData',padData);
        return this.http.post(this.userUrl + '/update-pads', JSON.stringify(padData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.updateradius = function (radiusData) {
        //console.log('padData',padData);
        return this.http.post(this.userUrl + '/updateRadius', JSON.stringify(radiusData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //edit tank
    UsersService.prototype.editTank = function (tankId) {
        var postData = {
            userId: tankId
        };
        return this.http.post(this.userUrl + '/edit-tanks', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //View Image
    UsersService.prototype.viewImage = function (tankId) {
        var postData = {
            userId: tankId
        };
        return this.http.post(this.userUrl + '/view-image', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //View Image
    UsersService.prototype.fetchImgId = function (tankId) {
        var postData = {
            userId: tankId
        };
        return this.http.post(this.userUrl + '/fetch-TrancId', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //edit well
    UsersService.prototype.editWell = function (wellId) {
        var postData = {
            wellId: wellId
        };
        return this.http.post(this.userUrl + '/edit-wells', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //edit Pads
    UsersService.prototype.editPad = function (padId) {
        var postData = {
            padId: padId
        };
        return this.http.post(this.userUrl + '/edit-Pads', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.addUser = function (userData) {
        //console.log('in add user userData==',userData);
        return this.http.post(this.userUrl + '/signup', JSON.stringify(userData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.addPad = function (padData) {
        return this.http.post(this.userUrl + '/add-pads', JSON.stringify(padData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.addTank = function (tankData) {
        return this.http.post(this.userUrl + '/addtank', JSON.stringify(tankData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.addWell = function (wellData) {
        return this.http.post(this.userUrl + '/wells', JSON.stringify(wellData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchCompanies = function (data) {
        return this.http.post(this.userUrl + '/fetch-company', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchLog = function (data) {
        return this.http.post(this.userUrl + '/fetchlog', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchCompanyUsers = function (data) {
        // console.log('data in service==',data);
        return this.http.post(this.userUrl + '/fetch-company-users', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchHaulers = function (data) {
        return this.http.post(this.userUrl + '/fetch-hauler', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchHaulersUser = function (data) {
        return this.http.post(this.userUrl + '/fetch-hauler-users', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchPads = function () {
        return this.http.get(this.userUrl + '/fetch-pads', { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchPadsForGis = function () {
        console.log(' in service');
        return this.http.get(this.userUrl + '/fetch-Pads-For-Gis', { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.totalPads = function (data) {
        var postData = {
            data: data
        };
        console.log('inside total Pads');
        return this.http.post(this.userUrl + '/total-pads', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchPadsWithComp = function (companyId) {
        var postData = {
            companyId: companyId
        };
        return this.http.post(this.userUrl + '/fetch-pads-with-comp', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchPadsWithLatLong = function (PadId) {
        var postData = {
            PadId: PadId
        };
        return this.http.post(this.userUrl + '/fetch-Pads-LatLong', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchWellWithPads = function (padId) {
        var postData = {
            padId: padId
        };
        return this.http.post(this.userUrl + '/fetch-wells-with-pads', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.disableUser = function (userId) {
        var postData = {
            userId: userId
        };
        return this.http.post(this.userUrl + '/disable-user', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.enableUser = function (userId) {
        var postData = {
            userId: userId
        };
        return this.http.post(this.userUrl + '/enable-user', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.disableWell = function (userId) {
        var postData = {
            userId: userId
        };
        return this.http.post(this.userUrl + '/disable-wells', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.enableWell = function (userId) {
        var postData = {
            userId: userId
        };
        return this.http.post(this.userUrl + '/enable-wells', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.disablePad = function (userId) {
        var postData = {
            userId: userId
        };
        return this.http.post(this.userUrl + '/disable-pads', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.enablePad = function (padId) {
        var postData = {
            padId: padId
        };
        return this.http.post(this.userUrl + '/enable-pads', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.disableTank = function (tankId) {
        var postData = {
            tankId: tankId
        };
        return this.http.post(this.userUrl + '/disable-tanks', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.enableTank = function (tankId) {
        var postData = {
            tankId: tankId
        };
        return this.http.post(this.userUrl + '/enable-tanks', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //transaction Details
    UsersService.prototype.fetchtranc = function (tankId) {
        var postData = {
            tankId: tankId
        };
        return this.http.post(this.userUrl + '/fetchtransactionDetails', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchtImg = function (tankId) {
        var postData = {
            tankId: tankId
        };
        return this.http.post(this.userUrl + '/fetch-Images', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.deleteUser = function (userId) {
        var postData = {
            userId: userId
        };
        return this.http.post(this.userUrl + '/delete-user', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //Delete tank
    UsersService.prototype.deleteTank = function (userId) {
        var postData = {
            userId: userId
        };
        return this.http.post(this.userUrl + '/delete-tanks', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    // deleteWells
    UsersService.prototype.deleteWells = function (userId) {
        var postData = {
            userId: userId
        };
        return this.http.post(this.userUrl + '/delete-wells', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.deletePads = function (padId) {
        var postData = {
            padId: padId
        };
        return this.http.post(this.userUrl + '/delete-Pads', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchtanks = function (data) {
        return this.http.post(this.userUrl + '/fetch-tanks', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.totalTanks = function (data) {
        var postData = {
            data: data
        };
        return this.http.post(this.userUrl + '/total-tanks', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.totalWells = function (data) {
        var postData = {
            data: data
        };
        console.log('in service well', data);
        return this.http.post(this.userUrl + '/total-wells', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.totalTransactions = function (data) {
        var postData = {
            data: data
        };
        console.log('in service tranc', data);
        return this.http.post(this.userUrl + '/total-transaction', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.viewTransactions = function (data) {
        return this.http.post(this.userUrl + '/view-transaction-Details', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    // view-transaction-Details
    UsersService.prototype.fetchPadsForReport = function (data) {
        return this.http.post(this.userUrl + '/fetch-pads-report', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchTanksForChart = function (data) {
        return this.http.post(this.userUrl + '/fetch-tanks-chart', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchMonthChart = function (data) {
        //  console.log('in fetch month chart');
        return this.http.post(this.userUrl + '/fetch-month-chart', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchYearChart = function (data) {
        // console.log('in fetch month chart');
        return this.http.post(this.userUrl + '/fetch-year-chart', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //pie chat data
    UsersService.prototype.fetchDayPieChart = function (data) {
        console.log('data in service==', data);
        return this.http.post(this.userUrl + '/view-days-PieChart', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchMonthPieChart = function (data) {
        //  console.log('in fetch month chart');
        return this.http.post(this.userUrl + '/view-months-PieChart', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchYearPieChart = function (data) {
        // console.log('in fetch month chart');
        return this.http.post(this.userUrl + '/view-years-PieChart', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.totalTankVolume = function (data) {
        // console.log('in fetch month chart');
        return this.http.post(this.userUrl + '/fetch-total-volume', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchVolume = function (data) {
        //console.log('in chart',data);
        return this.http.post(this.userUrl + '/fetch-volume', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchSingleTankVolume = function (tankId) {
        var postData = {
            tankId: tankId
        };
        return this.http.post(this.userUrl + '/tank-volume', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchSingleTankLineVolume = function (tankId) {
        var postData = {
            tankId: tankId
        };
        console.log('tankIdin service', tankId);
        return this.http.post(this.userUrl + '/single-tankvolume-line', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //  fetchSingleTankLineVolume(padId){
    //   //console.log('tankIdin service',padId);
    //   return this.http.post(this.userUrl + '/single-tankvolume-line', JSON.stringify(postData), { headers: this.headers })
    //   .toPromise()
    //   .then(res => res.json())
    //   .catch(this.handleError);
    //  }
    UsersService.prototype.fetchSingleTankLineVolumeMonth = function (padId) {
        var postData = {
            padId: padId
        };
        return this.http.post(this.userUrl + '/single-tankvolume-line-month', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchSingleTankLineVolumeYear = function (tankId) {
        var postData = {
            tankId: tankId
        };
        return this.http.post(this.userUrl + '/single-tankvolume-line-year', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.fetchtpads = function (data) {
        return this.http.post(this.userUrl + '/fetch-padsData', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //new changes
    UsersService.prototype.fetchwells = function (data) {
        return this.http.post(this.userUrl + '/fetch-wells', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.geofence = function (data) {
        return this.http.post(this.userUrl + '/geofence', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.exportTankCsv = function (data) {
        return this.http.post(this.userUrl + '/export-tanks-csv', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.exportPadsCsv = function (data) {
        return this.http.post(this.userUrl + '/export-pads-csv', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.setSession = function (data) {
        localStorage.admin_login = JSON.stringify(data);
    };
    UsersService.prototype.logout = function () {
        delete localStorage.admin_login;
        this.cookieService.remove('session');
        this.router.navigate(['/login']);
    };
    UsersService.prototype.readSession = function () {
        return JSON.parse(localStorage.admin_login);
    };
    UsersService.prototype.isAuth = function () {
        return localStorage.admin_login != null;
    };
    UsersService.prototype.uploadImage = function (imgSrc) {
        var postData = {
            imgSrc: imgSrc
        };
        return this.http.post(this.userUrl + '/upload-image', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.importTanksCsv = function (data) {
        var postData = {
            data: data
        };
        return this.http.post(this.userUrl + '/import-tanks-csv', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.importPadsCsv = function (data) {
        var postData = {
            data: data
        };
        // console.log('postData',postData);
        return this.http.post(this.userUrl + '/import-pads-csv', JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return UsersService;
}());
UsersService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__http_service_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__http_service_service__["a" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_router__["Router"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7_ngx_cookie__["b" /* CookieService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7_ngx_cookie__["b" /* CookieService */]) === "function" && _c || Object])
], UsersService);

var _a, _b, _c;
//# sourceMappingURL=users.service.js.map

/***/ }),

/***/ "./src/app/reset-confirmation/reset-confirmation.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  <b>Password has been reset succesfully.</b>\n</p>\n"

/***/ }),

/***/ "./src/app/reset-confirmation/reset-confirmation.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/reset-confirmation/reset-confirmation.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetConfirmationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ResetConfirmationComponent = (function () {
    function ResetConfirmationComponent() {
    }
    ResetConfirmationComponent.prototype.ngOnInit = function () {
    };
    return ResetConfirmationComponent;
}());
ResetConfirmationComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-reset-confirmation',
        template: __webpack_require__("./src/app/reset-confirmation/reset-confirmation.component.html"),
        styles: [__webpack_require__("./src/app/reset-confirmation/reset-confirmation.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], ResetConfirmationComponent);

//# sourceMappingURL=reset-confirmation.component.js.map

/***/ }),

/***/ "./src/app/reset-password/reset-password.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl baseZIndex=\"1\" [(value)]=\"msgs\"></p-growl>\n<div class=\"login-page\" [@routerTransition]>\n    <div class=\"row\">\n      <div class=\"col-md-4 push-md-4\">\n        <img src=\"assets/images/logo.png\" width=\"150px\" class=\"user-avatar\" />\n        <h1>Water Disposal System</h1>\n        <form [formGroup]=\"resetPasswordForm\" (submit)=\"resetPassword()\">\n          <div class=\"form-content\">\n            <div class=\"form-group\">\n                Enter new Password.\n              <input type=\"password\" class=\"form-control input-underline input-lg\" formControlName=\"password\" placeholder=\"Type here\">\n            </div>\n            <!-- <span class=\"text-danger\">\n              <span *ngIf=\"resetPasswordForm.controls['email'].hasError('required') && isSubmited\">\n                Please Enter your new Password.\n              </span>\n            </span> -->\n          </div>\n          <button type=\"submit\" class=\"btn rounded-btn\">submit</button>\n        </form>\n      </div>\n    </div>\n  </div>"

/***/ }),

/***/ "./src/app/reset-password/reset-password.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/reset-password/reset-password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_users_service__ = __webpack_require__("./src/app/providers/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router_animations__ = __webpack_require__("./src/app/router.animations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ResetPasswordComponent = (function () {
    function ResetPasswordComponent(fb, userService, router, route) {
        this.fb = fb;
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.isSubmited = false;
        this.msgs = [];
        this.resetPasswordForm = this.fb.group({
            password: [null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required]
        });
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['token']) {
                _this.token = params['token'];
            }
        });
    };
    ResetPasswordComponent.prototype.resetPassword = function () {
        var _this = this;
        if (this.resetPasswordForm.invalid) {
            this.isSubmited = true;
            return;
        }
        this.resetPasswordForm.value['forgot_password_token'] = this.token;
        this.userService.resetpassword(this.resetPasswordForm.value)
            .then(function (res) {
            if (res.status == 200) {
                _this.router.navigate(['/reset-sucessfully']);
            }
            else {
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'Error', detail: "Password Reset Failed" });
            }
        });
    };
    return ResetPasswordComponent;
}());
ResetPasswordComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-reset-password',
        template: __webpack_require__("./src/app/reset-password/reset-password.component.html"),
        styles: [__webpack_require__("./src/app/reset-password/reset-password.component.scss")],
        animations: [Object(__WEBPACK_IMPORTED_MODULE_2__router_animations__["a" /* routerTransition */])()]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"]) === "function" && _d || Object])
], ResetPasswordComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=reset-password.component.js.map

/***/ }),

/***/ "./src/app/router.animations.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = routerTransition;
/* unused harmony export slideToRight */
/* unused harmony export slideToLeft */
/* unused harmony export slideToBottom */
/* unused harmony export slideToTop */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_animations__ = __webpack_require__("./node_modules/@angular/animations/@angular/animations.es5.js");

function routerTransition() {
    return slideToTop();
}
function slideToRight() {
    return Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["trigger"])('routerTransition', [
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["state"])('void', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({})),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["state"])('*', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({})),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["transition"])(':enter', [
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({ transform: 'translateX(-100%)' }),
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["animate"])('0.5s ease-in-out', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({ transform: 'translateX(0%)' }))
        ]),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["transition"])(':leave', [
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({ transform: 'translateX(0%)' }),
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["animate"])('0.5s ease-in-out', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({ transform: 'translateX(100%)' }))
        ])
    ]);
}
function slideToLeft() {
    return Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["trigger"])('routerTransition', [
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["state"])('void', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({})),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["state"])('*', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({})),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["transition"])(':enter', [
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({ transform: 'translateX(100%)' }),
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["animate"])('0.5s ease-in-out', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({ transform: 'translateX(0%)' }))
        ]),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["transition"])(':leave', [
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({ transform: 'translateX(0%)' }),
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["animate"])('0.5s ease-in-out', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({ transform: 'translateX(-100%)' }))
        ])
    ]);
}
function slideToBottom() {
    return Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["trigger"])('routerTransition', [
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["state"])('void', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({})),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["state"])('*', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({})),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["transition"])(':enter', [
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({ transform: 'translateY(-100%)' }),
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["animate"])('0.5s ease-in-out', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({ transform: 'translateY(0%)' }))
        ]),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["transition"])(':leave', [
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({ transform: 'translateY(0%)' }),
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["animate"])('0.5s ease-in-out', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({ transform: 'translateY(100%)' }))
        ])
    ]);
}
function slideToTop() {
    return Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["trigger"])('routerTransition', [
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["state"])('void', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({})),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["state"])('*', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({})),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["transition"])(':enter', [
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({ transform: 'translateY(100%)' }),
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["animate"])('0.5s ease-in-out', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({ transform: 'translateY(0%)' }))
        ]),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["transition"])(':leave', [
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({ transform: 'translateY(0%)' }),
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["animate"])('0.5s ease-in-out', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({ transform: 'translateY(-100%)' }))
        ])
    ]);
}
//# sourceMappingURL=router.animations.js.map

/***/ }),

/***/ "./src/app/shared/components/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"pos-f-t fixed-top header\">\n    <nav class=\"navbar navbar-inverse bg-inverse navbar-toggleable-md\">\n        <button class=\"navbar-toggler navbar-toggler-right\" (click)=\"toggleSidebar()\">\n            <span class=\"navbar-toggler-icon\"></span>\n        </button>\n        <a class=\"navbar-brand\" href=\"javascript:void(0)\">Water Disposal</a>\n        <div class=\"collapse navbar-collapse\">\n            <ul class=\"navbar-nav ml-auto mt-2 mt-md-0\">\n                <li class=\"nav-item dropdown\" ngbDropdown>\n                    <a href=\"javascript:void(0)\" class=\"nav-link\" ngbDropdownToggle>\n                        <i class=\"fa fa-user\"></i> {{email}} <b class=\"caret\"></b>\n                    </a>\n                    <div class=\"dropdown-menu dropdown-menu-right\">\n                       <!-- <a class=\"dropdown-item\" href=\"javascript:void(0)\"><i class=\"fa fa-fw fa-user\"></i> {{ 'Profile' | translate }}</a> -->\n                        <!-- <a class=\"dropdown-item\" href=\"javascript:void(0)\"><i class=\"fa fa-fw fa-envelope\"></i> {{ 'Inbox' | translate }}</a> -->\n                        <!-- <a class=\"dropdown-item\" href=\"javascript:void(0)\"><i class=\"fa fa-fw fa-gear\"></i> {{ 'Settings' | translate }}</a> -->\n                        <a class=\"dropdown-item\" (click)=\"onLogout()\"><i class=\"fa fa-fw fa-power-off\"></i> {{ 'Log Out' | translate }} </a>\n                    </div>\n                </li>\n            </ul>\n        </div>\n    </nav>\n</div>\n"

/***/ }),

/***/ "./src/app/shared/components/header/header.component.scss":
/***/ (function(module, exports) {

module.exports = ".topnav {\n  border-radius: 0;\n  background-color: #222;\n  padding: 6px;\n  z-index: 2; }\n  .topnav .text-center {\n    text-align: center;\n    padding-left: 0;\n    cursor: pointer; }\n  .topnav .top-right-nav .buy-now a {\n    color: #999; }\n  .topnav .top-right-nav .dropdown-menu {\n    top: 40px;\n    right: -5px;\n    left: auto; }\n  .topnav .top-right-nav .dropdown-menu .message-preview .media .media-body .media-heading {\n      font-size: 14px;\n      font-weight: bold;\n      margin-bottom: 0; }\n  .topnav .top-right-nav .dropdown-menu .message-preview .media .media-body p {\n      margin: 0; }\n  .topnav .top-right-nav .dropdown-menu .message-preview .media .media-body p.last {\n      font-size: 13px;\n      margin-bottom: 0; }\n  .topnav .top-right-nav .dropdown-menu hr {\n      margin-top: 1px;\n      margin-bottom: 4px; }\n  .messages {\n  width: 300px; }\n  .messages .media {\n    border-bottom: 1px solid #DDD;\n    padding: 5px 10px; }\n  .messages .media:last-child {\n      border-bottom: none; }\n  .messages .media-body h5 {\n    font-size: 13px;\n    font-weight: 600; }\n  .messages .media-body .small {\n    margin: 0; }\n  .messages .media-body .last {\n    font-size: 12px;\n    margin: 0; }\n  .header .navbar {\n  background: #222 !important; }\n"

/***/ }),

/***/ "./src/app/shared/components/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_users_service__ = __webpack_require__("./src/app/providers/users.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HeaderComponent = (function () {
    function HeaderComponent(userService, translate, router) {
        var _this = this;
        this.userService = userService;
        this.translate = translate;
        this.router = router;
        this.pushRightClass = 'push-right';
        this.router.events.subscribe(function (val) {
            if (val instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["NavigationEnd"] && window.innerWidth <= 992 && _this.isToggled()) {
                _this.toggleSidebar();
            }
        });
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.email = this.userService.readSession().email;
    };
    HeaderComponent.prototype.isToggled = function () {
        var dom = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    };
    HeaderComponent.prototype.toggleSidebar = function () {
        var dom = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    };
    HeaderComponent.prototype.rltAndLtr = function () {
        var dom = document.querySelector('body');
        dom.classList.toggle('rtl');
    };
    HeaderComponent.prototype.onLogout = function () {
        this.userService.logout();
    };
    HeaderComponent.prototype.changeLang = function (language) {
        this.translate.use(language);
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-header',
        template: __webpack_require__("./src/app/shared/components/header/header.component.html"),
        styles: [__webpack_require__("./src/app/shared/components/header/header.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _c || Object])
], HeaderComponent);

var _a, _b, _c;
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ "./src/app/shared/components/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__header_header_component__ = __webpack_require__("./src/app/shared/components/header/header.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__header_header_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sidebar_sidebar_component__ = __webpack_require__("./src/app/shared/components/sidebar/sidebar.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__sidebar_sidebar_component__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./src/app/shared/components/sidebar/sidebar.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"sidebar\" [ngClass]=\"{sidebarPushRight: isActive}\">\n    <ul class=\"list-group\">\n        <a routerLink=\"/dashboard\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-fw fa-dashboard\"></i>&nbsp;{{ 'Dashboard' | translate }}\n        </a>\n        <a [routerLink]=\"['/charts']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-fw fa-bar-chart-o\"></i>&nbsp;{{ 'Reports' | translate }}\n        </a>\n        <!-- <a [routerLink]=\"['/tables']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-fw fa-table\"></i>&nbsp;{{ 'Tables' | translate }}\n        </a>\n        <a [routerLink]=\"['/forms']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-fw fa-edit\"></i>&nbsp;{{ 'Forms' | translate }}\n        </a>\n        <a [routerLink]=\"['/bs-element']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-fw fa-desktop\"></i>&nbsp;{{ 'Boostrap Element' | translate }}\n        </a>\n        <a [routerLink]=\"['/grid']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-fw fa-wrench\"></i>&nbsp;{{ 'Boostrap Grid' | translate }}\n        </a>\n        <a [routerLink]=\"['/components']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-th-list\"></i>&nbsp;{{ 'Component' | translate }}\n        </a>-->\n        <div class=\"nested-menu\">\n            <a class=\"list-group-item\" (click)=\"addExpandClass('pages')\">\n                <span>\n                    <i class=\"fa fa-plus\"></i>&nbsp; {{ 'Users Management' | translate }}</span>\n            </a>\n            <li class=\"nested\" [class.expand]=\"showMenu === 'pages'\">\n                <ul class=\"submenu\">\n                    <li *ngIf=\"userRole == '0'\">\n                        <a routerLink=\"/add-company-admin\" [routerLinkActive]=\"['router-link-active']\" href=\"javascript:void(0)\">\n                            <span>{{ 'Add Company Admin' | translate }}</span>\n                        </a>\n                    </li>\n                    <li *ngIf=\"userRole == '0'\">\n                        <a routerLink=\"/add-hauler-admin\" [routerLinkActive]=\"['router-link-active']\" href=\"javascript:void(0)\" href=\"javascript:void(0)\">\n                            <span>{{ 'Add Hauler Admin' | translate }}</span>\n                        </a>\n                    </li>\n                    <li *ngIf=\"userRole == '0' || userRole == '1'\">\n                        <a routerLink=\"/add-company-user\" [routerLinkActive]=\"['router-link-active']\" href=\"javascript:void(0)\">\n                            <span>{{ 'Add Company User' | translate }}</span>\n                        </a>\n                    </li>\n                    <li *ngIf=\"userRole == '0' || userRole == '3'\">\n                        <a routerLink=\"/add-hauler-user\" [routerLinkActive]=\"['router-link-active']\" href=\"javascript:void(0)\" href=\"javascript:void(0)\">\n                            <span>{{ 'Add Hauler User' | translate }}</span>\n                        </a>\n                    </li>\n                    <li *ngIf=\"userRole == '0'\">\n                        <a routerLink=\"/view-company-admin\" [routerLinkActive]=\"['router-link-active']\" href=\"javascript:void(0)\" href=\"javascript:void(0)\">\n                            <span>{{ 'View Company Admins' | translate }}</span>\n                        </a>\n                    </li>\n                    <li *ngIf=\"userRole == '0'|| userRole == '1'\">\n                        <a routerLink=\"/view-company-users\" [routerLinkActive]=\"['router-link-active']\" href=\"javascript:void(0)\" href=\"javascript:void(0)\">\n                            <span>{{ 'View Company Users' | translate }}</span>\n                        </a>\n                    </li>\n                    <li *ngIf=\"userRole == '0'\">\n                        <a routerLink=\"/view-hauler-admin\" [routerLinkActive]=\"['router-link-active']\" href=\"javascript:void(0)\" href=\"javascript:void(0)\">\n                            <span>{{ 'View Hauler Admins' | translate }}</span>\n                        </a>\n                    </li>\n                    <li *ngIf=\"userRole == '0' || userRole == '3'\">\n                        <a routerLink=\"/view-hauler-user\" [routerLinkActive]=\"['router-link-active']\" href=\"javascript:void(0)\" href=\"javascript:void(0)\">\n                            <span>{{ 'View Hauler Users' | translate }}</span>\n                        </a>\n                    </li>\n                </ul>\n            </li>\n        </div>\n        <div class=\"nested-menu\">\n            <a class=\"list-group-item\" (click)=\"addExpandPads('pads_pages')\">\n                <span>\n                    <i class=\"fa fa-plus\"></i>&nbsp; {{ 'Pads Management' | translate }}</span>\n            </a>\n            <li class=\"nested\" [class.expand]=\"showMenu === 'pads_pages'\">\n                <ul class=\"submenu\">\n                    <li *ngIf=\"userRole == '0' || userRole == '1'\">\n                        <a routerLink=\"/add-pads\" [routerLinkActive]=\"['router-link-active']\" href=\"javascript:void(0)\">\n                            <span>{{ 'Add Pads' | translate }}</span>\n                        </a>\n                    </li>\n                    <li *ngIf=\"userRole == '0' || userRole == '1' || userRole == '3' || userRole == '2'\">\n                        <a routerLink=\"/view-pads\" [routerLinkActive]=\"['router-link-active']\" href=\"javascript:void(0)\">\n                            <span>{{ 'view Pads' | translate }}</span>\n                        </a>\n                    </li>\n                </ul>\n            </li>\n        </div>\n\n        <div class=\"nested-menu\">\n            <a class=\"list-group-item\" (click)=\"addExpandTanks('tanks_pages')\">\n                <span>\n                    <i class=\"fa fa-plus\"></i>&nbsp; {{ 'Tanks Management' | translate }}</span>\n            </a>\n            <li class=\"nested\" [class.expand]=\"showMenu === 'tanks_pages'\">\n                <ul class=\"submenu\">\n                    <li *ngIf=\"userRole == '0' || userRole == '1'\">\n                        <a routerLink=\"/add-tanks\" [routerLinkActive]=\"['router-link-active']\" href=\"javascript:void(0)\">\n                            <span>{{ 'Add Tanks' | translate }}</span>\n                        </a>\n                    </li>\n                    <li *ngIf=\"userRole == '0' || userRole == '1'|| userRole == '3' || userRole == '2'\">\n                        <a routerLink=\"/view-tanks\" [routerLinkActive]=\"['router-link-active']\" href=\"javascript:void(0)\">\n                            <span>{{ 'View Tanks' | translate }}</span>\n                        </a>\n                    </li>\n\n                    <li *ngIf=\"userRole == '0' || userRole == '1'\">\n                        <a routerLink=\"/add-wells\" [routerLinkActive]=\"['router-link-active']\" href=\"javascript:void(0)\">\n                            <span>{{ 'Add wells' | translate }}</span>\n                        </a>\n                    </li>\n\n                    <li *ngIf=\"userRole == '0' || userRole == '1'|| userRole == '3'\">\n                        <a routerLink=\"/view-wells\" [routerLinkActive]=\"['router-link-active']\" href=\"javascript:void(0)\">\n                            <span>{{ 'View wells' | translate }}</span>\n                        </a>\n                    </li>\n\n                    <!-- <li>   \n                        <a routerLink=\"/gis\" [routerLinkActive]=\"['router-link-active']\" href=\"javascript:void(0)\"><span>{{ 'View Gis' | translate }}</span></a>\n                    </li> -->\n\n                    <li *ngIf=\"userRole == '0' || userRole == '1'|| userRole == '3'\">\n                        <a routerLink=\"/view-transactions-Details\" [routerLinkActive]=\"['router-link-active']\" href=\"javascript:void(0)\">\n                            <span>{{ 'View transactions' | translate }}</span>\n                        </a>\n                    </li>\n                </ul>\n            </li>\n        </div>\n        <a *ngIf=\"userRole == '0' || userRole == '1'|| userRole == '3'\" [routerLink]=\"['/viewlog']\" [routerLinkActive]=\"['router-link-active']\"\n        class=\"list-group-item\">\n        <i class=\"fas fa-user\"></i>&nbsp;{{ 'ViewLog' | translate }}\n          </a>\n        <a *ngIf=\"userRole == '0' || userRole == '1'|| userRole == '3' || userRole == '2'\" [routerLink]=\"['/gis']\" [routerLinkActive]=\"['router-link-active']\"\n            class=\"list-group-item\">\n            <i class=\"fa fa-map-marker\"></i>&nbsp;{{ 'GIS' | translate }}\n        </a>\n        <!-- <i class=\"fa fa-fw fa-dashboard\"></i>&nbsp; -->\n        <!--<a [routerLink]=\"['/blank-page']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-file-o\"></i>&nbsp;{{ 'Blank Page' | translate }}\n        </a>\n        <a class=\"list-group-item more-themes\" href=\"http://www.strapui.com/\" >\n            {{ 'More Theme' | translate }}\n        </a>-->\n    </ul>\n</nav>"

/***/ }),

/***/ "./src/app/shared/components/sidebar/sidebar.component.scss":
/***/ (function(module, exports) {

module.exports = ".sidebar {\n  border-radius: 0;\n  position: fixed;\n  z-index: 1000;\n  top: 55px;\n  left: 235px;\n  width: 235px;\n  margin-left: -235px;\n  border: none;\n  border-radius: 0;\n  overflow-y: auto;\n  background-color: #222;\n  bottom: 0;\n  overflow-x: hidden;\n  padding-bottom: 40px;\n  -webkit-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out; }\n  .sidebar .list-group a.list-group-item {\n    background: #222;\n    border: 0;\n    border-radius: 0;\n    color: #999;\n    text-decoration: none; }\n  .sidebar .list-group a.list-group-item .fa {\n      margin-right: 10px; }\n  .sidebar .list-group a:hover {\n    background: #151515;\n    color: #fff; }\n  .sidebar .list-group a.router-link-active {\n    background: #151515;\n    color: #fff; }\n  .sidebar .sidebar-dropdown *:focus {\n    border-radius: none;\n    border: none; }\n  .sidebar .sidebar-dropdown .panel-title {\n    font-size: 1rem;\n    height: 50px;\n    margin-bottom: 0; }\n  .sidebar .sidebar-dropdown .panel-title a {\n      color: #999;\n      text-decoration: none;\n      font-weight: 400;\n      background: #222; }\n  .sidebar .sidebar-dropdown .panel-title a span {\n        position: relative;\n        display: block;\n        padding: .75rem 1.5rem;\n        padding-top: 1rem; }\n  .sidebar .sidebar-dropdown .panel-title a:hover, .sidebar .sidebar-dropdown .panel-title a:focus {\n      color: #fff;\n      outline: none;\n      outline-offset: -2px; }\n  .sidebar .sidebar-dropdown .panel-title:hover {\n    background: #151515; }\n  .sidebar .sidebar-dropdown .panel-collapse {\n    border-radious: 0;\n    border: none; }\n  .sidebar .sidebar-dropdown .panel-collapse .panel-body .list-group-item {\n      border-radius: 0;\n      background-color: #222;\n      border: 0 solid transparent; }\n  .sidebar .sidebar-dropdown .panel-collapse .panel-body .list-group-item a {\n        color: #999; }\n  .sidebar .sidebar-dropdown .panel-collapse .panel-body .list-group-item a:hover {\n        color: #FFF; }\n  .sidebar .sidebar-dropdown .panel-collapse .panel-body .list-group-item:hover {\n      background: #151515; }\n  .nested-menu .list-group-item {\n  cursor: pointer; }\n  .nested-menu .nested {\n  list-style-type: none; }\n  .nested-menu ul.submenu {\n  display: none;\n  height: 0; }\n  .nested-menu .expand ul.submenu {\n  display: block;\n  list-style-type: none;\n  height: auto; }\n  .nested-menu .expand ul.submenu li a {\n    color: #FFF;\n    padding: 10px;\n    display: block; }\n  @media screen and (max-width: 992px) {\n  .sidebar {\n    top: 54px;\n    left: 0px; } }\n"

/***/ }),

/***/ "./src/app/shared/components/sidebar/sidebar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_users_service__ = __webpack_require__("./src/app/providers/users.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SidebarComponent = (function () {
    function SidebarComponent(userService) {
        this.userService = userService;
        this.isActive = false;
        this.showMenu = '';
        this.userRole = '';
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this.userRole = this.userService.readSession().role;
        console.log(this.userRole);
    };
    SidebarComponent.prototype.eventCalled = function () {
        this.isActive = !this.isActive;
    };
    SidebarComponent.prototype.addExpandClass = function (element) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        }
        else {
            this.showMenu = element;
        }
    };
    SidebarComponent.prototype.addExpandPads = function (element) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        }
        else {
            this.showMenu = element;
        }
    };
    SidebarComponent.prototype.addExpandTanks = function (element) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        }
        else {
            this.showMenu = element;
        }
    };
    return SidebarComponent;
}());
SidebarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-sidebar',
        template: __webpack_require__("./src/app/shared/components/sidebar/sidebar.component.html"),
        styles: [__webpack_require__("./src/app/shared/components/sidebar/sidebar.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */]) === "function" && _a || Object])
], SidebarComponent);

var _a;
//# sourceMappingURL=sidebar.component.js.map

/***/ }),

/***/ "./src/app/shared/guard/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_users_service__ = __webpack_require__("./src/app/providers/users.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (this.userService.isAuth()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
        }
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _b || Object])
], AuthGuard);

var _a, _b;
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ "./src/app/shared/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pipes_shared_pipes_module__ = __webpack_require__("./src/app/shared/pipes/shared-pipes.module.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components__ = __webpack_require__("./src/app/shared/components/index.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__components__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__components__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules__ = __webpack_require__("./src/app/shared/modules/index.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__modules__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__modules__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__guard_auth_guard__ = __webpack_require__("./src/app/shared/guard/auth.guard.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__guard_auth_guard__["a"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./src/app/shared/modules/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stat_stat_module__ = __webpack_require__("./src/app/shared/modules/stat/stat.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__stat_stat_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__page_header_page_header_module__ = __webpack_require__("./src/app/shared/modules/page-header/page-header.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__page_header_page_header_module__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./src/app/shared/modules/page-header/page-header.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-xl-12\">\n        <h2 class=\"page-header\">\n            {{heading}}\n        </h2>\n        <ol class=\"breadcrumb\">\n            <li class=\"breadcrumb-item\">\n                <i class=\"fa fa-dashboard\"></i> <a href=\"Javascript:void(0)\" [routerLink]=\"['/dashboard']\">Dashboard</a>\n            </li>\n            <li class=\"breadcrumb-item active\"><i class=\"fa {{icon}}\"></i> {{heading}}</li>\n        </ol>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/shared/modules/page-header/page-header.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/shared/modules/page-header/page-header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageHeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageHeaderComponent = (function () {
    function PageHeaderComponent() {
    }
    return PageHeaderComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], PageHeaderComponent.prototype, "heading", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], PageHeaderComponent.prototype, "icon", void 0);
PageHeaderComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-page-header',
        template: __webpack_require__("./src/app/shared/modules/page-header/page-header.component.html"),
        styles: [__webpack_require__("./src/app/shared/modules/page-header/page-header.component.scss")]
    })
], PageHeaderComponent);

//# sourceMappingURL=page-header.component.js.map

/***/ }),

/***/ "./src/app/shared/modules/page-header/page-header.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageHeaderModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_header_component__ = __webpack_require__("./src/app/shared/modules/page-header/page-header.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PageHeaderModule = (function () {
    function PageHeaderModule() {
    }
    return PageHeaderModule;
}());
PageHeaderModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["RouterModule"]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_3__page_header_component__["a" /* PageHeaderComponent */]],
        exports: [__WEBPACK_IMPORTED_MODULE_3__page_header_component__["a" /* PageHeaderComponent */]]
    })
], PageHeaderModule);

//# sourceMappingURL=page-header.module.js.map

/***/ }),

/***/ "./src/app/shared/modules/stat/stat.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card card-inverse {{bgClass}}\">\n    <div class=\"card-header\">\n        <div class=\"row\">\n            <div class=\"col col-xs-3\">\n                <i class=\"fa {{icon}} fa-5x\"></i>\n            </div>\n            <div class=\"col col-xs-9 text-right\">\n                <!-- <div class=\"d-block huge\">{{count}}</div> -->\n                <div class=\"d-block huge\">{{count?count:0}}</div>\n                <div class=\"d-block\">{{label}}</div>\n                <!-- <div class=\"d-block\">{{link}}</div> -->\n            </div>\n        </div>\n    </div>\n    <div class=\"card-footer\" (click)=viewDetails(link)>\n           <!-- <div *ngIf=\"geofences\"> <span class=\"float-right\">Edit Details {{data}}</span></div> -->\n        <span class=\"float-left\">View Details {{data}}</span>\n        <a href=\"javascript:void(0)\" class=\"float-right card-inverse\">\n            <span ><i class=\"fa fa-arrow-circle-right\"></i></span>\n        </a>\n    </div>\n    \n    <!-- <div *ngIf=\"geofences\" class=\"card-footer\" (click)=viewDetails(link)>\n            <!-- <div *ngIf=\"geofences\"> <span class=\"float-right\">Edit Details {{data}}</span></div> -->\n       <!--    <span class=\"float-left\">Edit Details {{data}}</span>\n         <a href=\"javascript:void(0)\" class=\"float-right card-inverse\">\n             <span ><i class=\"fa fa-arrow-circle-right\"></i></span>\n         </a>\n     </div> -->\n    \n</div>\n    <!-- <div class=\"card card-inverse {{bgClass}}\">\n        <div class=\"card-header\">\n            <div class=\"row\">\n                <div class=\"col col-xs-3\">\n                    <i class=\"fa {{icon}} fa-5x\"></i>\n                </div>\n                <div class=\"col col-xs-9 text-right\">\n                    <div class=\"d-block huge\">{{count?count:0}}</div>\n                    <div class=\"d-block\">{{label}}</div>\n                </div>\n            </div>\n        </div>\n        <div class=\"card-footer\" (click)=viewDetails(link)>\n            <span class=\"float-left\">View Details {{data}}</span>\n            <a href=\"javascript:void(0)\" class=\"float-right card-inverse\">\n                <span ><i class=\"fa fa-arrow-circle-right\"></i></span>\n            </a>\n        </div>\n        \n    </div> -->\n\n\n<p-dialog *ngIf=\"geofences\" header=\"Edit Radius\" [(visible)]=\"showRadiusDetails\" modal=\"modal\"\nheight=\"200\" width=\"400\" [responsive]=\"true\">\n\nRadius:\n<!-- <div *ngFor=\"let geofrnce of geofences\"> -->\n<td>\n  <input type=\"text\" [(ngModel)]=\"geofences.radius\" />\n</td>\n<!-- </div> -->\n<br>\n<td>\n  <input type=\"button\" value=\"update\" (click)=\"updateRadius(geofences)\" class=\"btn btn-success\" />\n</td>\n<td>\n  <input type=\"button\" value=\"Cancel\" (click)=\"cancel()\" class=\"btn btn-warning\" />\n</td></p-dialog>"

/***/ }),

/***/ "./src/app/shared/modules/stat/stat.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/shared/modules/stat/stat.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_users_service__ = __webpack_require__("./src/app/providers/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_primeng_primeng__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StatComponent = (function () {
    function StatComponent(router, userService, confirmationService) {
        this.router = router;
        this.userService = userService;
        this.confirmationService = confirmationService;
        this.event = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.geofences = [];
        this.showRadiusDetails = false;
        this.updateDetails = [];
        this.loading = false;
        this.msgs = [];
    }
    StatComponent.prototype.ngOnInit = function () {
    };
    StatComponent.prototype.cancel = function () {
        this.showRadiusDetails = false;
    };
    StatComponent.prototype.viewDetails = function (link) {
        if (link == 'pads') {
            this.router.navigate(['/view-pads']);
        }
        else if (link == 'tanks') {
            this.router.navigate(['/view-tanks']);
        }
        else if (link == 'wells') {
            this.router.navigate(['/view-wells']);
        }
        else if (link == 'transactions') {
            this.router.navigate(['/view-transactions-Details']);
        }
        else if (link == 'geofencing') {
            this.showRadiusDetails = true;
            this.geofence();
            //this.updateRadius(this.geofences);
        }
    };
    StatComponent.prototype.updateRadius = function (geofences) {
        var _this = this;
        console.log('in update radius', geofences);
        this.showRadiusDetails = true;
        this.userService.updateradius(geofences)
            .then(function (res) {
            if (res.code == 200) {
                _this.updateDetails = res.data;
                _this.showRadiusDetails = false;
                _this.loading = false;
                // this.updateDetails
                // this.geofence();
            }
            else {
                console.log(res.message);
                _this.loading = false;
            }
        });
    };
    StatComponent.prototype.geofence = function () {
        var _this = this;
        this.loading = true;
        var role = this.userService.readSession().role;
        var companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId,
        };
        this.userService.geofence(data)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.geofences = res.data;
                // console.log('geofences==',this.geofences);
            }
            else {
                //console.log(res.message);
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
            }
        });
    };
    return StatComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], StatComponent.prototype, "bgClass", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], StatComponent.prototype, "icon", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], StatComponent.prototype, "count", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], StatComponent.prototype, "label", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], StatComponent.prototype, "data", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], StatComponent.prototype, "link", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], StatComponent.prototype, "event", void 0);
StatComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-stat',
        template: __webpack_require__("./src/app/shared/modules/stat/stat.component.html"),
        styles: [__webpack_require__("./src/app/shared/modules/stat/stat.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_users_service__["a" /* UsersService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__["ConfirmationService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__["ConfirmationService"]) === "function" && _d || Object])
], StatComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=stat.component.js.map

/***/ }),

/***/ "./src/app/shared/modules/stat/stat.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stat_component__ = __webpack_require__("./src/app/shared/modules/stat/stat.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var StatModule = (function () {
    function StatModule() {
    }
    return StatModule;
}());
StatModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__["DataTableModule"], __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__["SharedModule"], __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__["ButtonModule"], __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__["TooltipModule"], __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__["ConfirmDialogModule"], __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__["GrowlModule"], __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__["OverlayPanelModule"], __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__["DialogModule"],
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__stat_component__["a" /* StatComponent */]],
        exports: [__WEBPACK_IMPORTED_MODULE_2__stat_component__["a" /* StatComponent */]]
    })
], StatModule);

//# sourceMappingURL=stat.module.js.map

/***/ }),

/***/ "./src/app/shared/pipes/phone-no.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhoneNoPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_libphonenumber_js__ = __webpack_require__("./node_modules/libphonenumber-js/index.es6.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var PhoneNoPipe = (function () {
    function PhoneNoPipe() {
    }
    PhoneNoPipe.prototype.transform = function (value, args) {
        if (!value) {
            return value;
        }
        return Object(__WEBPACK_IMPORTED_MODULE_1_libphonenumber_js__["a" /* format */])(value, 'International');
    };
    return PhoneNoPipe;
}());
PhoneNoPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'phoneNo'
    })
], PhoneNoPipe);

//# sourceMappingURL=phone-no.pipe.js.map

/***/ }),

/***/ "./src/app/shared/pipes/shared-pipes.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SharedPipesModule */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__phone_no_pipe__ = __webpack_require__("./src/app/shared/pipes/phone-no.pipe.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SharedPipesModule = (function () {
    function SharedPipesModule() {
    }
    return SharedPipesModule;
}());
SharedPipesModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__phone_no_pipe__["a" /* PhoneNoPipe */]]
    })
], SharedPipesModule);

//# sourceMappingURL=shared-pipes.module.js.map

/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map