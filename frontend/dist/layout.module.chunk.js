webpackJsonp(["layout.module"],{

/***/ "./node_modules/@ngui/map/dist/@ngui/map.es5.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export BicyclingLayer */
/* unused harmony export NavigatorGeolocation */
/* unused harmony export OptionBuilder */
/* unused harmony export NG_MAP_CONFIG_TOKEN */
/* unused harmony export NgMapApiLoader */
/* unused harmony export NgMapAsyncApiLoader */
/* unused harmony export NgMapAsyncCallbackApiLoader */
/* unused harmony export NguiMapComponent */
/* unused harmony export InfoWindow */
/* unused harmony export CustomMarker */
/* unused harmony export Circle */
/* unused harmony export DataLayer */
/* unused harmony export DirectionsRenderer */
/* unused harmony export DrawingManager */
/* unused harmony export GeoCoder */
/* unused harmony export GroundOverlay */
/* unused harmony export HeatmapLayer */
/* unused harmony export KmlLayer */
/* unused harmony export Marker */
/* unused harmony export NguiMap */
/* unused harmony export PlacesAutoComplete */
/* unused harmony export Polygon */
/* unused harmony export Polyline */
/* unused harmony export StreetViewPanorama */
/* unused harmony export TrafficLayer */
/* unused harmony export TransitLayer */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NguiMapModule; });
/* unused harmony export ɵa */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__ = __webpack_require__("./node_modules/rxjs/_esm5/ReplaySubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_first__ = __webpack_require__("./node_modules/rxjs/_esm5/operator/first.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_debounceTime__ = __webpack_require__("./node_modules/rxjs/_esm5/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
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







/**
 * return json string from json-like string
 * @param {?} str
 * @return {?}
 */
function jsonize(str) {
    try {
        return str;
    }
    catch (e) {
        return str
            .replace(/([\$\w]+)\s*:/g, // wrap keys without double quote
        function (_, $1) {
            return '"' + $1 + '":';
        })
            .replace(/'([^']+)'/g, // replacing single quote to double quote
        function (_, $1) {
            return '"' + $1 + '"';
        });
    }
}
/**
 * Returns string to an object by using JSON.parse()
 * @param {?} input
 * @return {?}
 */
function getJSON(input) {
    if (typeof input === 'string') {
        var /** @type {?} */ re = /^[\+\-]?[0-9\.]+,[ ]*\ ?[\+\-]?[0-9\.]+$/; // lat,lng
        if (input.match(re)) {
            input = '[' + input + ']';
        }
        return JSON.parse(jsonize(input));
    }
    else {
        return input;
    }
}
/**
 * Returns camel-cased from string 'Foo Bar' to 'fooBar'
 * @param {?} str
 * @return {?}
 */
function toCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
}
/**
 * @return {?}
 */
function isMapsApiLoaded() {
    return typeof google === 'object' && typeof google.maps === 'object';
}
/**
 * @param {?} component
 * @param {?} libName
 * @return {?}
 */
function missingLibraryError(component, libName) {
    return Error(component + ": library '" + libName + "' is missing, please ensure to include it in a 'libraries' parameter.\n    Example:\n      NguiMapModule.forRoot({\n        apiUrl: 'https://maps.googleapis.com/maps/api/js?libraries=" + libName + "'\n      })\n  ");
}
/**
 * @abstract
 */
var BaseMapDirective = /** @class */ (function () {
    /**
     * @param {?} nguiMapComponent
     * @param {?} mapObjectName
     * @param {?} inputs
     * @param {?} outputs
     */
    function BaseMapDirective(nguiMapComponent, mapObjectName, inputs, outputs) {
        var _this = this;
        this.nguiMapComponent = nguiMapComponent;
        this.mapObjectName = mapObjectName;
        this.inputs = inputs;
        this.outputs = outputs;
        // this should be redefined on each childr directive
        this.initialized$ = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._subscriptions = [];
        this.nguiMap = this.nguiMapComponent['nguiMap'];
        this.optionBuilder = this.nguiMapComponent['optionBuilder'];
        // all outputs must be initialized
        this.outputs.forEach(function (output) { return _this[output] = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](); });
        this.mapObjectName = mapObjectName;
    }
    /**
     * @return {?}
     */
    BaseMapDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.nguiMapComponent.mapIdledOnce) {
            this.initialize();
        }
        else {
            this.nguiMapComponent.mapReady$.subscribe(function (map) { return _this.initialize(); });
        }
    };
    /**
     * @return {?}
     */
    BaseMapDirective.prototype.initialize = function () {
        this.objectOptions = this.optionBuilder.googlizeAllInputs(this.inputs, this);
        // will be set after geocoded
        typeof this.objectOptions.position === 'string' && (delete this.objectOptions.position);
        typeof this.objectOptions.center === 'string' && (delete this.objectOptions.center);
        // noinspection TypeScriptUnresolvedFunction
        if (this.libraryName) {
            if (!google.maps[this.libraryName]) {
                throw missingLibraryError(this.mapObjectName, this.libraryName);
            }
            this.mapObject = new google.maps[this.libraryName][this.mapObjectName](this.objectOptions);
        }
        else {
            this.mapObject = new google.maps[this.mapObjectName](this.objectOptions);
        }
        this.mapObject.setMap(this.nguiMapComponent.map);
        this.mapObject['mapObjectName'] = this.mapObjectName;
        this.mapObject['nguiMapComponent'] = this.nguiMapComponent;
        // set google events listeners and emits to this outputs listeners
        this.nguiMap.setObjectEvents(this.outputs, this, 'mapObject');
        this.nguiMapComponent.addToMapObjectGroup(this.mapObjectName, this.mapObject);
        this.initialized$.emit(this.mapObject);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    BaseMapDirective.prototype.ngOnChanges = function (changes) {
        this.nguiMap.updateGoogleObject(this.mapObject, changes);
    };
    /**
     * @return {?}
     */
    BaseMapDirective.prototype.ngOnDestroy = function () {
        this._subscriptions.map(function (subscription) { return subscription.unsubscribe(); });
        this.nguiMapComponent.removeFromMapObjectGroup(this.mapObjectName, this.mapObject);
        if (this.mapObject) {
            this.nguiMap.clearObjectEvents(this.outputs, this, 'mapObject');
        }
    };
    return BaseMapDirective;
}());
BaseMapDirective.propDecorators = {
    'initialized$': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
};
/**
 * change any object to google object options
 * e.g. [1,2] -> new google.maps.LatLng(1,2);
 */
var OptionBuilder = /** @class */ (function () {
    function OptionBuilder() {
    }
    /**
     * @param {?} definedInputs
     * @param {?} userInputs
     * @return {?}
     */
    OptionBuilder.prototype.googlizeAllInputs = function (definedInputs, userInputs) {
        var _this = this;
        var /** @type {?} */ options = {};
        // if options given from user, only take options and ignore other inputs
        if (userInputs.options) {
            options = userInputs.options;
            if (!this.onlyOptionsGiven(definedInputs, userInputs)) {
                console.error('when "options" are used, other options are ignored');
            }
        }
        else {
            definedInputs.forEach(function (input) {
                if (userInputs[input] !== undefined) {
                    options[input] = _this.googlize(userInputs[input], { key: input });
                }
            });
        }
        return options;
    };
    /**
     * @param {?} inputs
     * @param {?=} options
     * @return {?}
     */
    OptionBuilder.prototype.googlizeMultiple = function (inputs, options) {
        options = options || {};
        for (var /** @type {?} */ key in inputs) {
            var /** @type {?} */ val = inputs[key];
            // (non-strings are fully converted)
            if (typeof val !== 'string') {
                options[key] = val;
            } // sometimes '0' needed to stay as it is
            else if (!(options['doNotConverStringToNumber'] && val.match(/^[0-9]+$/))) {
                options[key] = this.googlize(val, { key: key });
            }
        } // for(var key in attrs)
        return options;
    };
    /**
     * @param {?} input
     * @param {?=} options
     * @return {?}
     */
    OptionBuilder.prototype.googlize = function (input, options) {
        options = options || {};
        var /** @type {?} */ output = input;
        if (typeof input === 'string') {
            if (input === 'false') {
                output = false;
            }
            else if (input === '0') {
                output = 0;
            }
            else {
                output =
                    // -> googlize -> getJsonParsed -> googlizeMultiple -> googlize until all elements are parsed
                    this.getJSONParsed(input, options)
                        /* Foo.Bar(...) -> new google.maps.Foo.Bar(...) */
                        || this.getAnyMapObject(input)
                        /*  MapTypeID.HYBRID -> new google.maps.MapTypeID.HYBRID */
                        || this.getAnyMapConstant(input, options)
                        /*  2016-06-20 -> new Date('2016-06-20') */
                        || this.getDateObject(input)
                        || input;
            }
        }
        if (options['key']) {
            var /** @type {?} */ key = (options['key']);
            if (output instanceof Array) {
                if (key === 'bounds') {
                    output = new google.maps.LatLngBounds(output[0], output[1]);
                }
                else if (key === 'icons') {
                    output = this.getMapIcons(output);
                }
                else if (key === 'position' || key.match(/^geoFallback/)) {
                    output = this.getLatLng(output);
                }
            }
            else if (output instanceof Object) {
                if (key === 'icon') {
                    output = this.getMarkerIcon(output);
                }
                else if (key.match(/ControlOptions$/)) {
                    output = this.getMapControlOption(output);
                }
            }
        }
        // delete keys only for processing, not used by google
        delete output['doNotConverStringToNumber'];
        delete output['key'];
        return output;
    };
    /**
     * @param {?} input
     * @return {?}
     */
    OptionBuilder.prototype.getLatLng = function (input) {
        var /** @type {?} */ output;
        if (input[0].constructor === Array) {
            output = ((input)).map(function (el) { return new google.maps.LatLng(el[0], el[1]); });
        }
        else if (!isNaN(parseFloat(input[0])) && isFinite(input[0])) {
            output = new google.maps.LatLng(input[0], input[1]);
        }
        return output;
    };
    /**
     * @param {?} input
     * @param {?} options
     * @return {?}
     */
    OptionBuilder.prototype.getJSONParsed = function (input, options) {
        var /** @type {?} */ output;
        try {
            output = getJSON(input);
            if (output instanceof Array) {
                // [{a:1}] : not lat/lng ones
                if (output[0].constructor !== Object) {
                    output = this.getLatLng(output);
                }
            }
            else if (output === Object(output)) {
                // check for nested hashes and convert to Google API options
                var /** @type {?} */ newOptions = options;
                newOptions['doNotConverStringToNumber'] = true;
                output = this.googlizeMultiple(output, newOptions);
            }
        }
        catch (e) {
        }
        return output;
    };
    /**
     * @param {?} input
     * @return {?}
     */
    OptionBuilder.prototype.getAnyMapObject = function (input) {
        var /** @type {?} */ output;
        if (input.match(/^[A-Z][a-zA-Z0-9]+\(.*\)$/)) {
            try {
                output = Function("return new google.maps." + input + ";")();
            }
            catch (e) { }
        }
        return output;
    };
    /**
     * @param {?} input
     * @param {?} options
     * @return {?}
     */
    OptionBuilder.prototype.getAnyMapConstant = function (input, options) {
        var /** @type {?} */ output;
        if (input.match(/^([A-Z][a-zA-Z0-9]+)\.([A-Z]+)$/)) {
            try {
                var /** @type {?} */ matches = input.match(/^([A-Z][a-zA-Z0-9]+)\.([A-Z]+)$/);
                output = google.maps[matches[1]][matches[2]];
            }
            catch (e) { }
        }
        else if (input.match(/^[A-Z]+$/)) {
            try {
                var /** @type {?} */ capitalizedKey = ((options['key'])).charAt(0).toUpperCase() +
                    ((options['key'])).slice(1);
                output = google.maps[capitalizedKey][input];
            }
            catch (e) { }
        }
        return output;
    };
    /**
     * streetviewControl, panControl, etc, not a general control
     * @param {?} controlOptions
     * @return {?}
     */
    OptionBuilder.prototype.getMapControlOption = function (controlOptions) {
        var /** @type {?} */ newControlOptions = controlOptions;
        for (var /** @type {?} */ key in newControlOptions) {
            if (newControlOptions[key]) {
                var /** @type {?} */ value = newControlOptions[key];
                if (typeof value === 'string') {
                    value = ((value)).toUpperCase();
                }
                else if (key === 'mapTypeIds') {
                    value = ((value)).map(function (str) {
                        if (str.match(/^[A-Z]+$/)) {
                            return google.maps.MapTypeId[str.toUpperCase()];
                        }
                        else {
                            return str;
                        }
                    });
                }
                if (key === 'style') {
                    var /** @type {?} */ objName = key.replace(/Options$/, '') + 'Style';
                    newControlOptions[key] = google.maps[objName][(value)];
                }
                else if (key === 'position') {
                    newControlOptions[key] = google.maps.ControlPosition[(value)];
                }
                else {
                    newControlOptions[key] = value;
                }
            }
        }
        return newControlOptions;
    };
    /**
     * @param {?} input
     * @return {?}
     */
    OptionBuilder.prototype.getDateObject = function (input) {
        var /** @type {?} */ output;
        if (input.match(/^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*)?)([zZ]|([+\-])(\d\d):?(\d\d))?$/)) {
            try {
                output = new Date(input);
            }
            catch (e) { }
        }
        return output;
    };
    /**
     * @param {?} input
     * @return {?}
     */
    OptionBuilder.prototype.getMapIcons = function (input) {
        return input.map(function (el) {
            if (el.icon.path.match(/^[A-Z_]+$/)) {
                el.icon.path = google.maps.SymbolPath[el.icon.path];
            }
            return el;
        });
    };
    /**
     * @param {?} input
     * @return {?}
     */
    OptionBuilder.prototype.getMarkerIcon = function (input) {
        var /** @type {?} */ output = input;
        if (('' + output.path).match(/^[A-Z_]+$/)) {
            output.path = google.maps.SymbolPath[output.path];
        }
        for (var /** @type {?} */ key in output) {
            var /** @type {?} */ arr = output[key];
            if (key === 'anchor' || key === 'origin' || key === 'labelOrigin') {
                output[key] = new google.maps.Point(arr[0], arr[1]);
            }
            else if (key === 'size' || key === 'scaledSize') {
                output[key] = new google.maps.Size(arr[0], arr[1]);
            }
        }
        return output;
    };
    /**
     * @param {?} definedInputs
     * @param {?} userInputs
     * @return {?}
     */
    OptionBuilder.prototype.onlyOptionsGiven = function (definedInputs, userInputs) {
        for (var /** @type {?} */ i = 0; i < definedInputs.length; i++) {
            var /** @type {?} */ input = definedInputs[i];
            if (input !== 'options' && typeof userInputs[input] !== 'undefined') {
                return false;
            }
        }
        return true;
    };
    return OptionBuilder;
}());
OptionBuilder.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
OptionBuilder.ctorParameters = function () { return []; };
/**
 *  service for navigator.geolocation methods
 */
var NavigatorGeolocation = /** @class */ (function () {
    function NavigatorGeolocation() {
    }
    /**
     * @param {?=} geoLocationOptions
     * @return {?}
     */
    NavigatorGeolocation.prototype.getCurrentPosition = function (geoLocationOptions) {
        geoLocationOptions = geoLocationOptions || { timeout: 5000 };
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */](function (responseObserver) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    responseObserver.next(position);
                    responseObserver.complete();
                }, function (evt) { return responseObserver.error(evt); }, geoLocationOptions);
            }
            else {
                responseObserver.error('Browser Geolocation service failed.');
            }
        });
    };
    return NavigatorGeolocation;
}());
NavigatorGeolocation.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
NavigatorGeolocation.ctorParameters = function () { return []; };
var NG_MAP_CONFIG_TOKEN = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["InjectionToken"]('NG_MAP_CONFIG_TOKEN');
/**
 * @abstract
 */
var NgMapApiLoader = /** @class */ (function () {
    /**
     * @param {?} config
     */
    function NgMapApiLoader(config) {
        this.config = config;
        this.api$ = __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_first__["a" /* first */].call(new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["a" /* ReplaySubject */](1));
        this.config = this.config || { apiUrl: 'https://maps.google.com/maps/api/js' };
    }
    /**
     * @abstract
     * @return {?}
     */
    NgMapApiLoader.prototype.load = function () { };
    /**
     * @return {?}
     */
    NgMapApiLoader.prototype.ngOnDestroy = function () {
        this.api$.complete();
    };
    return NgMapApiLoader;
}());
var NgMapAsyncCallbackApiLoader = /** @class */ (function (_super) {
    __extends(NgMapAsyncCallbackApiLoader, _super);
    /**
     * @param {?} zone
     * @param {?} config
     */
    function NgMapAsyncCallbackApiLoader(zone, config) {
        var _this = _super.call(this, config) || this;
        _this.zone = zone;
        return _this;
    }
    /**
     * @return {?}
     */
    NgMapAsyncCallbackApiLoader.prototype.load = function () {
        var _this = this;
        if (typeof window === 'undefined') {
            return;
        }
        if (isMapsApiLoaded()) {
            this.api$.next(google.maps);
        }
        else if (!document.querySelector('#ngui-map-api')) {
            ((window))['nguiMapRef'] = ((window))['nguiMapRef'] || [];
            ((window))['nguiMapRef'].push({ zone: this.zone, componentFn: function () { return _this.api$.next(google.maps); } });
            this.addGoogleMapsApi();
        }
    };
    /**
     * @return {?}
     */
    NgMapAsyncCallbackApiLoader.prototype.addGoogleMapsApi = function () {
        ((window))['initNguiMap'] = ((window))['initNguiMap'] || function () {
            ((window))['nguiMapRef'].forEach(function (nguiMapRef) {
                nguiMapRef.zone.run(function () { nguiMapRef.componentFn(); });
            });
            ((window))['nguiMapRef'].splice(0, ((window))['nguiMapRef'].length);
        };
        var /** @type {?} */ script = document.createElement('script');
        script.id = 'ngui-map-api';
        // script.src = "https://maps.google.com/maps/api/js?callback=initNguiMap";
        var /** @type {?} */ apiUrl = this.config.apiUrl;
        apiUrl += apiUrl.indexOf('?') !== -1 ? '&' : '?';
        script.src = apiUrl + 'callback=initNguiMap';
        document.querySelector('body').appendChild(script);
    };
    return NgMapAsyncCallbackApiLoader;
}(NgMapApiLoader));
NgMapAsyncCallbackApiLoader.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
NgMapAsyncCallbackApiLoader.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], },
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [NG_MAP_CONFIG_TOKEN,] },] },
]; };
var NgMapAsyncApiLoader = /** @class */ (function (_super) {
    __extends(NgMapAsyncApiLoader, _super);
    /**
     * @param {?} config
     */
    function NgMapAsyncApiLoader(config) {
        return _super.call(this, config) || this;
    }
    /**
     * @return {?}
     */
    NgMapAsyncApiLoader.prototype.load = function () {
        var _this = this;
        if (typeof window === 'undefined') {
            return;
        }
        if (isMapsApiLoaded()) {
            this.api$.next(google.maps);
        }
        else if (!document.querySelector('#ngui-map-api')) {
            var /** @type {?} */ script = document.createElement('script');
            script.id = 'ngui-map-api';
            script.async = true;
            script.onload = function () { return _this.api$.next(google.maps); };
            script.src = this.config.apiUrl;
            document.querySelector('body').appendChild(script);
        }
    };
    return NgMapAsyncApiLoader;
}(NgMapApiLoader));
NgMapAsyncApiLoader.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
NgMapAsyncApiLoader.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [NG_MAP_CONFIG_TOKEN,] },] },
]; };
/**
 *   Provides [defered/promise API](https://docs.angularjs.org/api/ng/service/$q)
 *   service for Google Geocoder service
 */
var GeoCoder = /** @class */ (function () {
    /**
     * @param {?} apiLoader
     */
    function GeoCoder(apiLoader) {
        this.apiLoader = apiLoader;
        this.apiLoaderSubs = [];
    }
    /**
     * @param {?} options
     * @return {?}
     */
    GeoCoder.prototype.geocode = function (options) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */](function (responseObserver) {
            _this.apiLoaderSubs.push(_this.apiLoader.api$
                .subscribe(function () { return _this.requestGeocode(options, responseObserver); }));
        });
    };
    /**
     * @return {?}
     */
    GeoCoder.prototype.ngOnDestroy = function () {
        this.apiLoaderSubs.map(function (sub) { return sub.unsubscribe(); });
    };
    /**
     * @param {?} options
     * @param {?} observer
     * @return {?}
     */
    GeoCoder.prototype.requestGeocode = function (options, observer) {
        var /** @type {?} */ geocoder = new google.maps.Geocoder();
        geocoder.geocode(options, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                observer.next(results);
                observer.complete();
            }
            else {
                observer.error(results);
            }
        });
    };
    return GeoCoder;
}());
GeoCoder.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
GeoCoder.ctorParameters = function () { return [
    { type: NgMapApiLoader, },
]; };
/**
 * collection of map instance-related properties and methods
 */
var NguiMap = /** @class */ (function () {
    /**
     * @param {?} geoCoder
     * @param {?} optionBuilder
     * @param {?} zone
     */
    function NguiMap(geoCoder, optionBuilder, zone) {
        var _this = this;
        this.geoCoder = geoCoder;
        this.optionBuilder = optionBuilder;
        this.zone = zone;
        this.updateGoogleObject = function (object, changes) {
            var /** @type {?} */ val, /** @type {?} */ currentValue, /** @type {?} */ setMethodName;
            if (object) {
                for (var /** @type {?} */ key in changes) {
                    setMethodName = "set" + key.replace(/^[a-z]/, function (x) { return x.toUpperCase(); });
                    currentValue = changes[key].currentValue;
                    if (['position', 'center'].indexOf(key) !== -1 && typeof currentValue === 'string') {
                        // To preserve setMethod name in Observable callback, wrap it as a function, then execute
                        (function (setMethodName) {
                            _this.geoCoder.geocode({ address: currentValue }).subscribe(function (results) {
                                if (typeof object[setMethodName] === 'function') {
                                    object[setMethodName](results[0].geometry.location);
                                }
                                else {
                                    console.error('Not all options are dynamically updatable according to Googles Maps API V3 documentation.\n' +
                                        'Please check Google Maps API documentation, and use "setOptions" instead.');
                                }
                            });
                        })(setMethodName);
                    }
                    else {
                        val = _this.optionBuilder.googlize(currentValue);
                        if (typeof object[setMethodName] === 'function') {
                            object[setMethodName](val);
                        }
                        else {
                            console.error('Not all options are dynamically updatable according to Googles Maps API V3 documentation.\n' +
                                'Please check Google Maps API documentation, and use "setOptions" instead.');
                        }
                    }
                }
            }
        };
    }
    /**
     * @param {?} definedEvents
     * @param {?} thisObj
     * @param {?} prefix
     * @return {?}
     */
    NguiMap.prototype.setObjectEvents = function (definedEvents, thisObj, prefix) {
        var _this = this;
        definedEvents.forEach(function (definedEvent) {
            var /** @type {?} */ eventName = _this.getEventName(definedEvent), /** @type {?} */ zone = _this.zone;
            zone.runOutsideAngular(function () {
                thisObj[prefix].addListener(eventName, function (event) {
                    var /** @type {?} */ param = event ? event : {};
                    param.target = this;
                    zone.run(function () { return thisObj[definedEvent].emit(param); });
                });
            });
        });
    };
    /**
     * @param {?} definedEvents
     * @param {?} thisObj
     * @param {?} prefix
     * @return {?}
     */
    NguiMap.prototype.clearObjectEvents = function (definedEvents, thisObj, prefix) {
        var _this = this;
        definedEvents.forEach(function (definedEvent) {
            var /** @type {?} */ eventName = _this.getEventName(definedEvent);
            _this.zone.runOutsideAngular(function () {
                if (thisObj[prefix]) {
                    google.maps.event.clearListeners(thisObj[prefix], eventName);
                }
            });
        });
        if (thisObj[prefix]) {
            if (thisObj[prefix].setMap) {
                thisObj[prefix].setMap(null);
            }
            delete thisObj[prefix].nguiMapComponent;
            delete thisObj[prefix];
        }
    };
    /**
     * @param {?} definedEvent
     * @return {?}
     */
    NguiMap.prototype.getEventName = function (definedEvent) {
        return definedEvent
            .replace(/([A-Z])/g, function ($1) { return "_" + $1.toLowerCase(); }) // positionChanged -> position_changed
            .replace(/^map_/, ''); // map_click -> click  to avoid DOM conflicts
    };
    return NguiMap;
}());
NguiMap.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
NguiMap.ctorParameters = function () { return [
    { type: GeoCoder, },
    { type: OptionBuilder, },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], },
]; };
var INPUTS$1 = [
    'backgroundColor', 'center', 'disableDefaultUI', 'disableDoubleClickZoom', 'draggable', 'draggableCursor',
    'draggingCursor', 'heading', 'keyboardShortcuts', 'mapMaker', 'mapTypeControl', 'mapTypeId', 'maxZoom', 'minZoom',
    'noClear', 'overviewMapControl', 'panControl', 'panControlOptions', 'rotateControl', 'scaleControl', 'scrollwheel',
    'streetView', 'styles', 'tilt', 'zoom', 'streetViewControl', 'zoomControl', 'zoomControlOptions', 'mapTypeControlOptions',
    'overviewMapControlOptions', 'rotateControlOptions', 'scaleControlOptions', 'streetViewControlOptions', 'fullscreenControl', 'fullscreenControlOptions',
    'options',
    // ngui-map-specific inputs
    'geoFallbackCenter'
];
var OUTPUTS$1 = [
    'bounds_changed', 'center_changed', 'click', 'dblclick', 'drag', 'dragend', 'dragstart', 'heading_changed', 'idle',
    'typeid_changed', 'mousemove', 'mouseout', 'mouseover', 'projection_changed', 'resize', 'rightclick',
    'tilesloaded', 'tile_changed', 'zoom_changed',
    // to avoid DOM event conflicts
    'mapClick', 'mapMouseover', 'mapMouseout', 'mapMousemove', 'mapDrag', 'mapDragend', 'mapDragstart'
];
var NguiMapComponent = /** @class */ (function () {
    /**
     * @param {?} optionBuilder
     * @param {?} elementRef
     * @param {?} geolocation
     * @param {?} geoCoder
     * @param {?} nguiMap
     * @param {?} apiLoader
     * @param {?} zone
     */
    function NguiMapComponent(optionBuilder, elementRef, geolocation, geoCoder, nguiMap, apiLoader, zone) {
        var _this = this;
        this.optionBuilder = optionBuilder;
        this.elementRef = elementRef;
        this.geolocation = geolocation;
        this.geoCoder = geoCoder;
        this.nguiMap = nguiMap;
        this.apiLoader = apiLoader;
        this.zone = zone;
        this.mapReady$ = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.mapOptions = {};
        this.inputChanges$ = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        this.infoWindows = {};
        this.mapIdledOnce = false;
        this.initializeMapAfterDisplayed = false;
        apiLoader.load();
        // all outputs needs to be initialized,
        // http://stackoverflow.com/questions/37765519/angular2-directive-cannot-read-property-subscribe-of-undefined-with-outputs
        OUTPUTS$1.forEach(function (output) { return _this[output] = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](); });
    }
    /**
     * @return {?}
     */
    NguiMapComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.apiLoaderSub = this.apiLoader.api$.subscribe(function () { return _this.initializeMap(); });
    };
    /**
     * @return {?}
     */
    NguiMapComponent.prototype.ngAfterViewChecked = function () {
        if (this.initializeMapAfterDisplayed && this.el && this.el.offsetWidth > 0) {
            this.initializeMap();
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NguiMapComponent.prototype.ngOnChanges = function (changes) {
        this.inputChanges$.next(changes);
    };
    /**
     * @return {?}
     */
    NguiMapComponent.prototype.initializeMap = function () {
        var _this = this;
        this.el = this.elementRef.nativeElement.querySelector('.google-map');
        if (this.el && this.el.offsetWidth === 0) {
            this.initializeMapAfterDisplayed = true;
            return;
        }
        this.initializeMapAfterDisplayed = false;
        this.mapOptions = this.optionBuilder.googlizeAllInputs(INPUTS$1, this);
        this.mapOptions.zoom = this.mapOptions.zoom || 15;
        typeof this.mapOptions.center === 'string' && (delete this.mapOptions.center);
        this.zone.runOutsideAngular(function () {
            _this.map = new google.maps.Map(_this.el, _this.mapOptions);
            _this.map['mapObjectName'] = 'NguiMapComponent';
            if (!_this.mapOptions.center) {
                _this.setCenter();
            }
            // set google events listeners and emits to this outputs listeners
            _this.nguiMap.setObjectEvents(OUTPUTS$1, _this, 'map');
            _this.map.addListener('idle', function () {
                if (!_this.mapIdledOnce) {
                    _this.mapIdledOnce = true;
                    setTimeout(function () {
                        _this.mapReady$.emit(_this.map);
                    });
                }
            });
            // update map when input changes
            __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_debounceTime__["a" /* debounceTime */].call(_this.inputChanges$, 1000)
                .subscribe(function (changes) { return _this.nguiMap.updateGoogleObject(_this.map, changes); });
            if (typeof window !== 'undefined' && ((window))['nguiMapRef']) {
                // expose map object for test and debugging on (<any>window)
                ((window))['nguiMapRef'].map = _this.map;
            }
        });
    };
    /**
     * @return {?}
     */
    NguiMapComponent.prototype.setCenter = function () {
        var _this = this;
        if (!this['center']) {
            this.geolocation.getCurrentPosition().subscribe(function (position) {
                var /** @type {?} */ latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                _this.map.setCenter(latLng);
            }, function (error) {
                console.error('ngui-map: Error finding the current position');
                _this.map.setCenter(_this.mapOptions['geoFallbackCenter'] || new google.maps.LatLng(0, 0));
            });
        }
        else if (typeof this['center'] === 'string') {
            this.geoCoder.geocode({ address: this['center'] }).subscribe(function (results) {
                _this.map.setCenter(results[0].geometry.location);
            }, function (error) {
                _this.map.setCenter(_this.mapOptions['geoFallbackCenter'] || new google.maps.LatLng(0, 0));
            });
        }
    };
    /**
     * @param {?} id
     * @param {?} anchor
     * @return {?}
     */
    NguiMapComponent.prototype.openInfoWindow = function (id, anchor) {
        this.infoWindows[id].open(anchor);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    NguiMapComponent.prototype.closeInfoWindow = function (id) {
        // if infoWindow for id exists, close the infoWindow
        if (this.infoWindows[id])
            this.infoWindows[id].close();
    };
    /**
     * @return {?}
     */
    NguiMapComponent.prototype.ngOnDestroy = function () {
        this.inputChanges$.complete();
        if (this.el && !this.initializeMapAfterDisplayed) {
            this.nguiMap.clearObjectEvents(OUTPUTS$1, this, 'map');
        }
        if (this.apiLoaderSub) {
            this.apiLoaderSub.unsubscribe();
        }
    };
    /**
     * @param {?} mapObjectName
     * @param {?} mapObject
     * @return {?}
     */
    NguiMapComponent.prototype.addToMapObjectGroup = function (mapObjectName, mapObject) {
        var /** @type {?} */ groupName = toCamelCase(mapObjectName.toLowerCase()) + 's'; // e.g. markers
        this.map[groupName] = this.map[groupName] || [];
        this.map[groupName].push(mapObject);
    };
    /**
     * @param {?} mapObjectName
     * @param {?} mapObject
     * @return {?}
     */
    NguiMapComponent.prototype.removeFromMapObjectGroup = function (mapObjectName, mapObject) {
        var /** @type {?} */ groupName = toCamelCase(mapObjectName.toLowerCase()) + 's'; // e.g. markers
        if (this.map && this.map[groupName]) {
            var /** @type {?} */ index = this.map[groupName].indexOf(mapObject);
            (index > -1) && this.map[groupName].splice(index, 1);
        }
    };
    return NguiMapComponent;
}());
NguiMapComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                selector: 'ngui-map',
                providers: [NguiMap, OptionBuilder, GeoCoder, NavigatorGeolocation],
                styles: ["\n    ngui-map {display: block; height: 300px;}\n    .google-map {width: 100%; height: 100%}\n  "],
                inputs: INPUTS$1,
                outputs: OUTPUTS$1,
                encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
                template: "\n    <div class=\"google-map\"></div>\n    <ng-content></ng-content>\n  ",
            },] },
];
/**
 * @nocollapse
 */
NguiMapComponent.ctorParameters = function () { return [
    { type: OptionBuilder, },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
    { type: NavigatorGeolocation, },
    { type: GeoCoder, },
    { type: NguiMap, },
    { type: NgMapApiLoader, },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], },
]; };
NguiMapComponent.propDecorators = {
    'mapReady$': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
};
var INPUTS = [];
var OUTPUTS = [];
var BicyclingLayer = /** @class */ (function (_super) {
    __extends(BicyclingLayer, _super);
    /**
     * @param {?} nguiMapComp
     */
    function BicyclingLayer(nguiMapComp) {
        return _super.call(this, nguiMapComp, 'BicyclingLayer', INPUTS, OUTPUTS) || this;
    }
    return BicyclingLayer;
}(BaseMapDirective));
BicyclingLayer.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: 'ngui-map > bicycling-layer',
                inputs: INPUTS,
                outputs: OUTPUTS,
            },] },
];
/**
 * @nocollapse
 */
BicyclingLayer.ctorParameters = function () { return [
    { type: NguiMapComponent, },
]; };
var INPUTS$2 = [
    'content', 'disableAutoPan', 'maxWidth', 'pixelOffset', 'position', 'zIndex', 'options'
];
var OUTPUTS$2 = [
    'closeclick', 'content_changed', 'domready', 'position_changed', 'zindex_changed'
];
var InfoWindow = /** @class */ (function () {
    /**
     * @param {?} elementRef
     * @param {?} nguiMap
     * @param {?} nguiMapComponent
     */
    function InfoWindow(elementRef, nguiMap, nguiMapComponent) {
        var _this = this;
        this.elementRef = elementRef;
        this.nguiMap = nguiMap;
        this.nguiMapComponent = nguiMapComponent;
        this.initialized$ = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.objectOptions = {};
        this.inputChanges$ = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        this.elementRef.nativeElement.style.display = 'none';
        OUTPUTS$2.forEach(function (output) { return _this[output] = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](); });
    }
    /**
     * @return {?}
     */
    InfoWindow.prototype.ngOnInit = function () {
        var _this = this;
        if (this.nguiMapComponent.mapIdledOnce) {
            this.initialize();
        }
        else {
            this.nguiMapComponent.mapReady$.subscribe(function (map) { return _this.initialize(); });
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    InfoWindow.prototype.ngOnChanges = function (changes) {
        this.inputChanges$.next(changes);
    };
    /**
     * @return {?}
     */
    InfoWindow.prototype.initialize = function () {
        var _this = this;
        this.objectOptions = this.nguiMapComponent.optionBuilder.googlizeAllInputs(INPUTS$2, this);
        this.infoWindow = new google.maps.InfoWindow(this.objectOptions);
        this.infoWindow['mapObjectName'] = 'InfoWindow';
        // register infoWindow ids to NguiMap, so that it can be opened by id
        if (this.elementRef.nativeElement.id) {
            this.nguiMapComponent.infoWindows[this.elementRef.nativeElement.id] = this;
        }
        else {
            console.error('An InfoWindow must have an id. e.g. id="detail"');
        }
        // set google events listeners and emits to this outputs listeners
        this.nguiMap.setObjectEvents(OUTPUTS$2, this, 'infoWindow');
        // update object when input changes
        __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_debounceTime__["a" /* debounceTime */].call(this.inputChanges$, 1000)
            .subscribe(function (changes) { return _this.nguiMap.updateGoogleObject(_this.infoWindow, changes); });
        this.nguiMapComponent.addToMapObjectGroup('InfoWindow', this.infoWindow);
        this.initialized$.emit(this.infoWindow);
    };
    /**
     * @param {?} anchor
     * @return {?}
     */
    InfoWindow.prototype.open = function (anchor) {
        // set content and open it
        this.infoWindow.setContent(this.template.element.nativeElement);
        this.infoWindow.open(this.nguiMapComponent.map, anchor);
    };
    /**
     * @return {?}
     */
    InfoWindow.prototype.close = function () {
        // check if infoWindow exists, and closes it
        if (this.infoWindow)
            this.infoWindow.close();
    };
    /**
     * @return {?}
     */
    InfoWindow.prototype.ngOnDestroy = function () {
        this.inputChanges$.complete();
        if (this.infoWindow) {
            this.nguiMap.clearObjectEvents(OUTPUTS$2, this, 'infoWindow');
            delete this.infoWindow;
        }
    };
    return InfoWindow;
}());
InfoWindow.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                selector: 'ngui-map > info-window',
                inputs: INPUTS$2,
                outputs: OUTPUTS$2,
                template: "<div #template><ng-content></ng-content></div>",
            },] },
];
/**
 * @nocollapse
 */
InfoWindow.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
    { type: NguiMap, },
    { type: NguiMapComponent, },
]; };
InfoWindow.propDecorators = {
    'initialized$': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'template': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"], args: ['template', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] },] },],
};
var INPUTS$3 = [
    'position'
];
// to avoid DOM event conflicts map_*
var OUTPUTS$3 = [
    'animationChanged', 'click', 'clickableChanged', 'cursorChanged', 'dblclick', 'drag', 'dragend', 'draggableChanged',
    'dragstart', 'flatChanged', 'iconChanged', 'mousedown', 'mouseout', 'mouseover', 'mouseup', 'positionChanged', 'rightclick',
    'shapeChanged', 'titleChanged', 'visibleChanged', 'zindexChanged',
    'map_click', 'map_mouseover', 'map_mouseout', 'map_mouseup', 'map_mousedown', 'map_drag', 'map_dragend'
];
/**
 * Wrapper to a create extend OverlayView at runtime, only after google maps is loaded.
 * Otherwise throws a google is unknown error.
 * @param {?} htmlEl
 * @param {?} position
 * @return {?}
 */
function getCustomMarkerOverlayView(htmlEl, position) {
    var CustomMarkerOverlayView = /** @class */ (function (_super) {
        __extends(CustomMarkerOverlayView, _super);
        /**
         * @param {?} htmlEl
         * @param {?} position
         */
        function CustomMarkerOverlayView(htmlEl, position) {
            var _this = _super.call(this) || this;
            _this.visible = true;
            _this.setPosition = function (position) {
                _this.htmlEl.style.visibility = 'hidden';
                if (position.constructor.name === 'Array') {
                    _this.position = new google.maps.LatLng(position[0], position[1]);
                }
                else if (typeof position === 'string') {
                    var /** @type {?} */ geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ address: position }, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            _this.setPosition(results[0].geometry.location);
                        }
                        else {
                        }
                    });
                }
                else if (position && typeof position.lng === 'function') {
                    _this.position = position;
                }
                if (_this.getProjection() && typeof _this.position.lng === 'function') {
                    var /** @type {?} */ positionOnMap_1 = function () {
                        var /** @type {?} */ projection = _this.getProjection();
                        if (!projection) {
                            return;
                        }
                        var /** @type {?} */ posPixel = projection.fromLatLngToDivPixel(_this.position);
                        var /** @type {?} */ x = Math.round(posPixel.x - (_this.htmlEl.offsetWidth / 2));
                        var /** @type {?} */ y = Math.round(posPixel.y - _this.htmlEl.offsetHeight / 2);
                        _this.htmlEl.style.left = x + 'px';
                        _this.htmlEl.style.top = y + 'px';
                        _this.htmlEl.style.visibility = 'visible';
                    };
                    if (_this.htmlEl.offsetWidth && _this.htmlEl.offsetHeight) {
                        positionOnMap_1();
                    }
                    else {
                        setTimeout(function () { return positionOnMap_1(); });
                    }
                }
            };
            _this.htmlEl = htmlEl;
            _this.position = position;
            return _this;
        }
        /**
         * @return {?}
         */
        CustomMarkerOverlayView.prototype.onAdd = function () {
            this.getPanes().overlayMouseTarget.appendChild(this.htmlEl);
            // required for correct display inside google maps container
            this.htmlEl.style.position = 'absolute';
        };
        /**
         * @return {?}
         */
        CustomMarkerOverlayView.prototype.draw = function () {
            this.setPosition(this.position);
            this.setZIndex(this.zIndex);
            this.setVisible(this.visible);
        };
        /**
         * @return {?}
         */
        CustomMarkerOverlayView.prototype.onRemove = function () {
            //
        };
        /**
         * @return {?}
         */
        CustomMarkerOverlayView.prototype.getPosition = function () {
            return this.position;
        };
        /**
         * @param {?} zIndex
         * @return {?}
         */
        CustomMarkerOverlayView.prototype.setZIndex = function (zIndex) {
            zIndex && (this.zIndex = zIndex); /* jshint ignore:line */
            this.htmlEl.style.zIndex = this.zIndex;
        };
        /**
         * @param {?} visible
         * @return {?}
         */
        CustomMarkerOverlayView.prototype.setVisible = function (visible) {
            this.htmlEl.style.display = visible ? 'inline-block' : 'none';
            this.visible = visible;
        };
        return CustomMarkerOverlayView;
    }(google.maps.OverlayView));
    return new CustomMarkerOverlayView(htmlEl, position);
}
var CustomMarker = /** @class */ (function () {
    /**
     * @param {?} nguiMapComponent
     * @param {?} elementRef
     * @param {?} nguiMap
     */
    function CustomMarker(nguiMapComponent, elementRef, nguiMap) {
        var _this = this;
        this.nguiMapComponent = nguiMapComponent;
        this.elementRef = elementRef;
        this.nguiMap = nguiMap;
        this.initialized$ = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.inputChanges$ = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        this.elementRef.nativeElement.style.display = 'none';
        OUTPUTS$3.forEach(function (output) { return _this[output] = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](); });
    }
    /**
     * @return {?}
     */
    CustomMarker.prototype.ngOnInit = function () {
        var _this = this;
        if (this.nguiMapComponent.mapIdledOnce) {
            this.initialize();
        }
        else {
            this.nguiMapComponent.mapReady$.subscribe(function (map) { return _this.initialize(); });
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    CustomMarker.prototype.ngOnChanges = function (changes) {
        this.inputChanges$.next(changes);
    };
    /**
     * @return {?}
     */
    CustomMarker.prototype.ngOnDestroy = function () {
        this.inputChanges$.complete();
        this.nguiMapComponent.removeFromMapObjectGroup('CustomMarker', this.mapObject);
        if (this.mapObject) {
            this.nguiMap.clearObjectEvents(OUTPUTS$3, this, 'mapObject');
        }
    };
    /**
     * @return {?}
     */
    CustomMarker.prototype.initialize = function () {
        var _this = this;
        this.el = this.elementRef.nativeElement;
        this.mapObject = getCustomMarkerOverlayView(this.el, this['position']);
        this.mapObject.setMap(this.nguiMapComponent.map);
        // set google events listeners and emits to this outputs listeners
        this.nguiMap.setObjectEvents(OUTPUTS$3, this, 'mapObject');
        // update object when input changes
        __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_debounceTime__["a" /* debounceTime */].call(this.inputChanges$, 1000)
            .subscribe(function (changes) { return _this.nguiMap.updateGoogleObject(_this.mapObject, changes); });
        this.nguiMapComponent.addToMapObjectGroup('CustomMarker', this.mapObject);
        this.initialized$.emit(this.mapObject);
    };
    return CustomMarker;
}());
CustomMarker.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                selector: 'ngui-map > custom-marker',
                inputs: INPUTS$3,
                outputs: OUTPUTS$3,
                template: "\n    <ng-content></ng-content>\n  ",
            },] },
];
/**
 * @nocollapse
 */
CustomMarker.ctorParameters = function () { return [
    { type: NguiMapComponent, },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
    { type: NguiMap, },
]; };
CustomMarker.propDecorators = {
    'initialized$': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
};
var INPUTS$4 = [
    'center', 'clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'map', 'radius',
    'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight', 'visible', 'zIndex', 'options',
    // ngui-map specific inputs
    'geoFallbackCenter'
];
var OUTPUTS$4 = [
    'centerChanged', 'click', 'dblclick', 'drag', 'dragend', 'dragstart',
    'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'radiusChanged', 'rightclick',
];
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    /**
     * @param {?} nguiMapComp
     */
    function Circle(nguiMapComp) {
        var _this = _super.call(this, nguiMapComp, 'Circle', INPUTS$4, OUTPUTS$4) || this;
        _this.nguiMapComp = nguiMapComp;
        _this.objectOptions = ({});
        return _this;
    }
    /**
     * @return {?}
     */
    Circle.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.setCenter();
    };
    /**
     * @return {?}
     */
    Circle.prototype.setCenter = function () {
        var _this = this;
        if (!this['center']) {
            this._subscriptions.push(this.nguiMapComp.geolocation.getCurrentPosition().subscribe(function (center) {
                var /** @type {?} */ latLng = new google.maps.LatLng(center.coords.latitude, center.coords.longitude);
                _this.mapObject.setCenter(latLng);
            }, function (error) {
                console.error('ngui-map, error in finding the current position');
                _this.mapObject.setCenter(_this.objectOptions['geoFallbackCenter'] || new google.maps.LatLng(0, 0));
            }));
        }
        else if (typeof this['center'] === 'string') {
            this._subscriptions.push(this.nguiMapComp.geoCoder.geocode({ address: this['center'] }).subscribe(function (results) {
                _this.mapObject.setCenter(results[0].geometry.location);
            }, function (error) {
                console.error('ngui-map, error in finding location from', _this['center']);
                _this.mapObject.setCenter(_this.objectOptions['geoFallbackCenter'] || new google.maps.LatLng(0, 0));
            }));
        }
    };
    return Circle;
}(BaseMapDirective));
Circle.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: 'ngui-map>circle, ngui-map>map-circle',
                inputs: INPUTS$4,
                outputs: OUTPUTS$4,
            },] },
];
/**
 * @nocollapse
 */
Circle.ctorParameters = function () { return [
    { type: NguiMapComponent, },
]; };
var INPUTS$5 = ['controlPosition', 'controls', 'drawingMode', 'featureFactory', 'style', 'geoJson', 'geoJsonUrl'];
var OUTPUTS$5 = [
    'addfeature', 'click', 'dblclick', 'mousedown', 'mouseout', 'mouseover',
    'mouseup', 'removefeature', 'removeproperty', 'rightclick', 'setgeometry', 'setproperty'
];
var DataLayer = /** @class */ (function (_super) {
    __extends(DataLayer, _super);
    /**
     * @param {?} nguiMapComponent
     */
    function DataLayer(nguiMapComponent) {
        return _super.call(this, nguiMapComponent, 'Data', INPUTS$5, OUTPUTS$5) || this;
    }
    /**
     * @return {?}
     */
    DataLayer.prototype.initialize = function () {
        if (this['geoJson']) {
            // addGeoJson from an object
            this.nguiMapComponent.map.data.addGeoJson(this['geoJson']);
        }
        else if (this['geoJsonUrl']) {
            // loadGeoJson from a URL
            this.nguiMapComponent.map.data.loadGeoJson(this['geoJsonUrl']);
        }
        else {
            this.objectOptions = this.optionBuilder.googlizeAllInputs(this.inputs, this);
            this.nguiMapComponent.map.data.add(this.objectOptions);
        }
        // unlike others, data belongs to map. e.g., map.data.loadGeoJson(), map.data.add()
        this.mapObject = this.nguiMapComponent.map.data;
        // set google events listeners and emits to this outputs listeners
        this.nguiMap.setObjectEvents(this.outputs, this, 'mapObject');
        this.nguiMapComponent.addToMapObjectGroup(this.mapObjectName, this.mapObject);
        this.initialized$.emit(this.mapObject);
    };
    return DataLayer;
}(BaseMapDirective));
DataLayer.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: 'ngui-map > data-layer',
                inputs: INPUTS$5,
                outputs: OUTPUTS$5,
            },] },
];
/**
 * @nocollapse
 */
DataLayer.ctorParameters = function () { return [
    { type: NguiMapComponent, },
]; };
var INPUTS$6 = [
    'directions', 'draggable', 'hideRouteList', 'infoWindow', 'panel', 'markerOptions',
    'polylineOptions', 'preserveViewport', 'routeIndex', 'suppressBicyclingLayer',
    'suppressInfoWindows', 'suppressMarkers', 'suppressPolylines'
];
var OUTPUTS$6 = ['directions_changed'];
var DirectionsRenderer = /** @class */ (function (_super) {
    __extends(DirectionsRenderer, _super);
    /**
     * @param {?} nguiMapComponent
     * @param {?} geolocation
     */
    function DirectionsRenderer(nguiMapComponent, geolocation) {
        var _this = _super.call(this, nguiMapComponent, 'DirectionsRenderer', INPUTS$6, OUTPUTS$6) || this;
        _this.geolocation = geolocation;
        return _this;
    }
    /**
     * @return {?}
     */
    DirectionsRenderer.prototype.initialize = function () {
        this.objectOptions = this.optionBuilder.googlizeAllInputs(this.inputs, this);
        if (typeof this.objectOptions['panel'] === 'string') {
            this.objectOptions['panel'] = document.querySelector(this.objectOptions['panel']);
        }
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer(this.objectOptions);
        this.directionsRenderer.setMap(this.nguiMapComponent.map);
        // set google events listeners and emidirectionsRenderer to this outputs listeners
        this.showDirections(this.directionsRequest);
        this.nguiMap.setObjectEvents(this.outputs, this, 'directionsRenderer');
        this.nguiMapComponent.addToMapObjectGroup(this.mapObjectName, this.mapObject);
        this.initialized$.emit(this.directionsRenderer);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    DirectionsRenderer.prototype.ngOnChanges = function (changes) {
        var /** @type {?} */ newOptions = {};
        for (var /** @type {?} */ key in changes) {
            if (this.inputs.indexOf(key) !== -1) {
                newOptions[key] = this.optionBuilder.googlize(changes[key].currentValue);
            }
        }
        if (changes['directionsRequest'] && this.directionsRenderer) {
            this.directionsService && this.showDirections(this.directionsRequest);
        }
    };
    /**
     * @param {?} directionsRequest
     * @return {?}
     */
    DirectionsRenderer.prototype.showDirections = function (directionsRequest) {
        var _this = this;
        this.directionsService.route(directionsRequest, function (response, status) {
            // in some-case the callback is called during destroy component,
            // we should make sure directionsRenderer is still defined (cancelling `route` callback is not possible).
            if (!_this.directionsRenderer) {
                return;
            }
            if (status === google.maps.DirectionsStatus.OK) {
                _this.directionsRenderer.setDirections(response);
            }
            else {
                console.error('Directions request failed due to ' + status);
            }
        });
    };
    /**
     * @return {?}
     */
    DirectionsRenderer.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.nguiMap.clearObjectEvents(this.outputs, this, 'directionsRenderer');
    };
    return DirectionsRenderer;
}(BaseMapDirective));
DirectionsRenderer.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: 'ngui-map > directions-renderer',
                inputs: INPUTS$6,
                outputs: OUTPUTS$6,
            },] },
];
/**
 * @nocollapse
 */
DirectionsRenderer.ctorParameters = function () { return [
    { type: NguiMapComponent, },
    { type: NavigatorGeolocation, },
]; };
DirectionsRenderer.propDecorators = {
    'directionsRequest': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['directions-request',] },],
};
var INPUTS$7 = [
    'options',
    'circleOptions', 'drawingControl', 'drawingControlOptions', 'drawingMode',
    'map', 'markerOptions', 'polygonOptions', 'polylineOptions', 'rectangleOptions'
];
var OUTPUTS$7 = [
    'circlecomplete', 'markercomplete', 'overlaycomplete',
    'polygoncomplete', 'polylinecomplete', 'rectanglecomplete'
];
var DrawingManager = /** @class */ (function (_super) {
    __extends(DrawingManager, _super);
    /**
     * @param {?} nguiMapComp
     */
    function DrawingManager(nguiMapComp) {
        var _this = _super.call(this, nguiMapComp, 'DrawingManager', INPUTS$7, OUTPUTS$7) || this;
        _this.libraryName = 'drawing';
        return _this;
    }
    return DrawingManager;
}(BaseMapDirective));
DrawingManager.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: 'ngui-map > drawing-manager',
                inputs: INPUTS$7,
                outputs: OUTPUTS$7,
            },] },
];
/**
 * @nocollapse
 */
DrawingManager.ctorParameters = function () { return [
    { type: NguiMapComponent, },
]; };
var INPUTS$8 = ['url', 'bounds', 'clickable', 'opacity'];
var OUTPUTS$8 = ['click', 'dblclick'];
var GroundOverlay = /** @class */ (function (_super) {
    __extends(GroundOverlay, _super);
    /**
     * @param {?} nguiMapComp
     */
    function GroundOverlay(nguiMapComp) {
        var _this = _super.call(this, nguiMapComp, 'GroundOverlay', INPUTS$8, OUTPUTS$8) || this;
        _this.objectOptions = ({});
        return _this;
    }
    /**
     * @return {?}
     */
    GroundOverlay.prototype.initialize = function () {
        // url, bounds are not the options of GroundOverlay
        this.objectOptions = this.optionBuilder.googlizeAllInputs(['clickable', 'opacity'], this);
        // noinspection TypeScriptUnresolvedFunction
        this.mapObject = new google.maps.GroundOverlay(this['url'], this['bounds'], this.objectOptions);
        this.mapObject.setMap(this.nguiMapComponent.map);
        this.mapObject['mapObjectName'] = this.mapObjectName;
        // set google events listeners and emits to this outputs listeners
        this.nguiMap.setObjectEvents(this.outputs, this, 'mapObject');
        this.nguiMapComponent.addToMapObjectGroup(this.mapObjectName, this.mapObject);
        this.initialized$.emit(this.mapObject);
    };
    return GroundOverlay;
}(BaseMapDirective));
GroundOverlay.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: 'ngui-map > ground-overlay',
                inputs: INPUTS$8,
                outputs: OUTPUTS$8,
            },] },
];
/**
 * @nocollapse
 */
GroundOverlay.ctorParameters = function () { return [
    { type: NguiMapComponent, },
]; };
var INPUTS$9 = ['data', 'dissipating', 'gradient', 'maxIntensity', 'opacity', 'radius', 'options'];
var OUTPUTS$9 = [];
var HeatmapLayer = /** @class */ (function (_super) {
    __extends(HeatmapLayer, _super);
    /**
     * @param {?} nguiMapComp
     */
    function HeatmapLayer(nguiMapComp) {
        var _this = _super.call(this, nguiMapComp, 'HeatmapLayer', INPUTS$9, OUTPUTS$9) || this;
        _this.libraryName = 'visualization';
        return _this;
    }
    return HeatmapLayer;
}(BaseMapDirective));
HeatmapLayer.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: 'ngui-map > heatmap-layer',
                inputs: INPUTS$9,
                outputs: OUTPUTS$9,
            },] },
];
/**
 * @nocollapse
 */
HeatmapLayer.ctorParameters = function () { return [
    { type: NguiMapComponent, },
]; };
var INPUTS$10 = ['clickable', 'preserveViewport', 'screenOverlays', 'suppressInfoWindows', 'url', 'zIndex', 'options'];
var OUTPUTS$10 = ['click', 'defaultviewport_changed', 'status_changed'];
var KmlLayer = /** @class */ (function (_super) {
    __extends(KmlLayer, _super);
    /**
     * @param {?} nguiMapComp
     */
    function KmlLayer(nguiMapComp) {
        return _super.call(this, nguiMapComp, 'KmlLayer', INPUTS$10, OUTPUTS$10) || this;
    }
    return KmlLayer;
}(BaseMapDirective));
KmlLayer.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: 'ngui-map > kml-layer',
                inputs: INPUTS$10,
                outputs: OUTPUTS$10,
            },] },
];
/**
 * @nocollapse
 */
KmlLayer.ctorParameters = function () { return [
    { type: NguiMapComponent, },
]; };
var INPUTS$11 = [
    'anchorPoint', 'animation', 'clickable', 'cursor', 'draggable', 'icon', 'label', 'opacity',
    'optimized', 'place', 'position', 'shape', 'title', 'visible', 'zIndex', 'options',
    // ngui-map specific inputs
    'geoFallbackPosition'
];
var OUTPUTS$11 = [
    'animationChanged', 'click', 'clickableChanged', 'cursorChanged', 'dblclick', 'drag', 'dragend', 'draggableChanged',
    'dragstart', 'flatChanged', 'iconChanged', 'mousedown', 'mouseout', 'mouseover', 'mouseup', 'positionChanged', 'rightclick',
    'shapeChanged', 'titleChanged', 'visibleChanged', 'zindexChanged'
];
var Marker = /** @class */ (function (_super) {
    __extends(Marker, _super);
    /**
     * @param {?} nguiMapComp
     */
    function Marker(nguiMapComp) {
        var _this = _super.call(this, nguiMapComp, 'Marker', INPUTS$11, OUTPUTS$11) || this;
        _this.nguiMapComp = nguiMapComp;
        _this.objectOptions = ({});
        return _this;
    }
    /**
     * @return {?}
     */
    Marker.prototype.ngOnInit = function () {
        var _this = this;
        if (this.nguiMapComponent.mapIdledOnce) {
            this.initialize();
        }
        else {
            this.nguiMapComponent.mapReady$.subscribe(function (map) { return _this.initialize(); });
        }
    };
    /**
     * @return {?}
     */
    Marker.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.setPosition();
    };
    /**
     * @return {?}
     */
    Marker.prototype.setPosition = function () {
        var _this = this;
        if (!this['position']) {
            this._subscriptions.push(this.nguiMapComp.geolocation.getCurrentPosition().subscribe(function (position) {
                var /** @type {?} */ latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                _this.mapObject.setPosition(latLng);
            }, function (error) {
                console.error('ngui-map, error finding the current location');
                _this.mapObject.setPosition(_this.objectOptions['geoFallbackPosition'] || new google.maps.LatLng(0, 0));
            }));
        }
        else if (typeof this['position'] === 'string') {
            this._subscriptions.push(this.nguiMapComp.geoCoder.geocode({ address: this['position'] }).subscribe(function (results) {
                _this.mapObject.setPosition(results[0].geometry.location);
            }, function (error) {
                console.error('ngui-map, error finding the location from', _this['position']);
                _this.mapObject.setPosition(_this.objectOptions['geoFallbackPosition'] || new google.maps.LatLng(0, 0));
            }));
        }
    };
    return Marker;
}(BaseMapDirective));
Marker.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: 'ngui-map > marker',
                inputs: INPUTS$11,
                outputs: OUTPUTS$11,
            },] },
];
/**
 * @nocollapse
 */
Marker.ctorParameters = function () { return [
    { type: NguiMapComponent, },
]; };
var PlacesAutoComplete = /** @class */ (function () {
    /**
     * @param {?} optionBuilder
     * @param {?} elementRef
     * @param {?} apiLoader
     */
    function PlacesAutoComplete(optionBuilder, elementRef, apiLoader) {
        var _this = this;
        this.optionBuilder = optionBuilder;
        this.elementRef = elementRef;
        this.apiLoader = apiLoader;
        this.place_changed = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.initialized$ = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        // only called when map is ready
        this.initialize = function () {
            _this.objectOptions =
                _this.optionBuilder.googlizeAllInputs(['bounds', 'componentRestrictions', 'types'], _this);
            if (!google.maps.places) {
                throw missingLibraryError('PlacesAutoComplete', 'places');
            }
            _this.autocomplete = new google.maps.places.Autocomplete(_this.elementRef.nativeElement, _this.objectOptions);
            _this.autocomplete.addListener('place_changed', function (place) {
                _this.place_changed.emit(_this.autocomplete.getPlace());
            });
            _this.initialized$.emit(_this.autocomplete);
        };
        apiLoader.load();
        apiLoader.api$.subscribe(function () { return _this.initialize(); });
    }
    return PlacesAutoComplete;
}());
PlacesAutoComplete.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: '[places-auto-complete]'
            },] },
];
/**
 * @nocollapse
 */
PlacesAutoComplete.ctorParameters = function () { return [
    { type: OptionBuilder, },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
    { type: NgMapApiLoader, },
]; };
PlacesAutoComplete.propDecorators = {
    'bounds': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['bounds',] },],
    'componentRestrictions': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['componentRestrictions',] },],
    'types': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['types',] },],
    'place_changed': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"], args: ['place_changed',] },],
    'initialized$': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
};
var INPUTS$12 = [
    'clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'geodesic', 'paths',
    'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight', 'visible', 'zIndex', 'options',
];
var OUTPUTS$12 = [
    'click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown',
    'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick',
];
var Polygon = /** @class */ (function (_super) {
    __extends(Polygon, _super);
    /**
     * @param {?} nguiMapComp
     */
    function Polygon(nguiMapComp) {
        return _super.call(this, nguiMapComp, 'Polygon', INPUTS$12, OUTPUTS$12) || this;
    }
    return Polygon;
}(BaseMapDirective));
Polygon.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: 'ngui-map>polygon, ngui-map>map-polygon',
                inputs: INPUTS$12,
                outputs: OUTPUTS$12,
            },] },
];
/**
 * @nocollapse
 */
Polygon.ctorParameters = function () { return [
    { type: NguiMapComponent, },
]; };
var INPUTS$13 = [
    'clickable', 'draggable', 'editable', 'geodesic', 'icons', 'path', 'strokeColor',
    'strokeOpacity', 'strokeWeight', 'visible', 'zIndex', 'options'
];
var OUTPUTS$13 = [
    'click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown',
    'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'
];
var Polyline = /** @class */ (function (_super) {
    __extends(Polyline, _super);
    /**
     * @param {?} nguiMapComp
     */
    function Polyline(nguiMapComp) {
        return _super.call(this, nguiMapComp, 'Polyline', INPUTS$13, OUTPUTS$13) || this;
    }
    return Polyline;
}(BaseMapDirective));
Polyline.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: 'ngui-map > polyline',
                inputs: INPUTS$13,
                outputs: OUTPUTS$13,
            },] },
];
/**
 * @nocollapse
 */
Polyline.ctorParameters = function () { return [
    { type: NguiMapComponent, },
]; };
var INPUTS$14 = [
    'selector', 'options',
    'addressControl', 'addressControlOptions', 'clickToGo', 'disableDefaultUI', 'disableDoubleClickZoom',
    'enableCloseButton', 'fullscreenControl', 'fullscreenControlOptions', 'imageDateControl', 'linksControl',
    'motionTracking', 'motionTrackingControl', 'panControl', 'panControlOptions', 'pano',
    'position', 'pov', 'scrollwheel', 'showRoadLabels', 'visible', 'zoomControl', 'zoomControlOptions'
];
var OUTPUTS$14 = [
    'closeclick', 'pano_changed', 'position_changed', 'pov_changed', 'resize', 'status_changed',
    'visible_changed', 'zoom_changed'
];
var StreetViewPanorama = /** @class */ (function (_super) {
    __extends(StreetViewPanorama, _super);
    /**
     * @param {?} nguiMapComp
     */
    function StreetViewPanorama(nguiMapComp) {
        return _super.call(this, nguiMapComp, 'StreetViewPanorama', INPUTS$14, OUTPUTS$14) || this;
    }
    /**
     * @return {?}
     */
    StreetViewPanorama.prototype.initialize = function () {
        this.objectOptions = this.optionBuilder.googlizeAllInputs(this.inputs, this);
        var /** @type {?} */ element;
        if (this.objectOptions.selector) {
            // noinspection TypeScriptValidateTypes
            element = document.querySelector(this['selector']);
            delete this.objectOptions.selector;
        }
        else {
            element = this.nguiMapComponent.el;
        }
        // will be set after geocoded
        typeof this.objectOptions.position === 'string' && (delete this.objectOptions.position);
        this.mapObject = new google.maps[this.mapObjectName](element, this.objectOptions);
        this.mapObject['mapObjectName'] = this.mapObjectName;
        this.mapObject['nguiMapComponent'] = this.nguiMapComponent;
        // set google events listeners and emits to this outputs listeners
        this.nguiMap.setObjectEvents(this.outputs, this, 'mapObject');
        this.nguiMapComponent.addToMapObjectGroup(this.mapObjectName, this.mapObject);
        this.initialized$.emit(this.mapObject);
    };
    /**
     * @return {?}
     */
    StreetViewPanorama.prototype.ngOnDestroy = function () {
        if (this.nguiMapComponent.el) {
            this.nguiMap.clearObjectEvents(this.outputs, this, 'mapObject');
        }
    };
    return StreetViewPanorama;
}(BaseMapDirective));
StreetViewPanorama.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: 'ngui-map > street-view-panorama',
                inputs: INPUTS$14,
                outputs: OUTPUTS$14,
            },] },
];
/**
 * @nocollapse
 */
StreetViewPanorama.ctorParameters = function () { return [
    { type: NguiMapComponent, },
]; };
var INPUTS$15 = ['autoRefresh', 'options'];
var OUTPUTS$15 = [];
var TrafficLayer = /** @class */ (function (_super) {
    __extends(TrafficLayer, _super);
    /**
     * @param {?} nguiMapComp
     */
    function TrafficLayer(nguiMapComp) {
        return _super.call(this, nguiMapComp, 'TrafficLayer', INPUTS$15, OUTPUTS$15) || this;
    }
    return TrafficLayer;
}(BaseMapDirective));
TrafficLayer.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: 'ngui-map > traffic-layer',
                inputs: INPUTS$15,
                outputs: OUTPUTS$15,
            },] },
];
/**
 * @nocollapse
 */
TrafficLayer.ctorParameters = function () { return [
    { type: NguiMapComponent, },
]; };
var INPUTS$16 = [];
var OUTPUTS$16 = [];
var TransitLayer = /** @class */ (function (_super) {
    __extends(TransitLayer, _super);
    /**
     * @param {?} nguiMapComp
     */
    function TransitLayer(nguiMapComp) {
        return _super.call(this, nguiMapComp, 'TransitLayer', INPUTS$16, OUTPUTS$16) || this;
    }
    return TransitLayer;
}(BaseMapDirective));
TransitLayer.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: 'ngui-map > transit-layer',
                inputs: INPUTS$16,
                outputs: OUTPUTS$16,
            },] },
];
/**
 * @nocollapse
 */
TransitLayer.ctorParameters = function () { return [
    { type: NguiMapComponent, },
]; };
var COMPONENTS_DIRECTIVES = [
    NguiMapComponent, InfoWindow,
    Marker, Circle, CustomMarker, Polygon, InfoWindow, Polyline, GroundOverlay,
    TransitLayer, TrafficLayer, HeatmapLayer, BicyclingLayer, KmlLayer, DataLayer,
    StreetViewPanorama, PlacesAutoComplete, DirectionsRenderer,
    DrawingManager,
];
var NguiMapModule = /** @class */ (function () {
    function NguiMapModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    NguiMapModule.forRoot = function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: NguiMapModule,
            providers: [
                { provide: NG_MAP_CONFIG_TOKEN, useValue: config }
            ],
        };
    };
    return NguiMapModule;
}());
NguiMapModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                imports: [__WEBPACK_IMPORTED_MODULE_6__angular_common__["CommonModule"]],
                declarations: COMPONENTS_DIRECTIVES,
                exports: [COMPONENTS_DIRECTIVES],
                providers: [
                    GeoCoder,
                    NavigatorGeolocation,
                    NguiMap,
                    OptionBuilder,
                    { provide: NgMapApiLoader, useClass: NgMapAsyncCallbackApiLoader },
                ]
            },] },
];
/**
 * @nocollapse
 */
NguiMapModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=map.es5.js.map


/***/ }),

/***/ "./node_modules/angular2-image-upload/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_image_upload_module__ = __webpack_require__("./node_modules/angular2-image-upload/lib/image-upload.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_image_upload_module___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__lib_image_upload_module__);
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__lib_image_upload_module__, "ImageUploadModule")) __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__lib_image_upload_module__["ImageUploadModule"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_image_upload_image_upload_component__ = __webpack_require__("./node_modules/angular2-image-upload/lib/image-upload/image-upload.component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_image_upload_image_upload_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__lib_image_upload_image_upload_component__);
/* unused harmony reexport ImageUploadComponent */
/* unused harmony reexport FileHolder */




/***/ }),

/***/ "./node_modules/angular2-image-upload/lib/file-drop.directive.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var FileDropDirective = (function () {
    function FileDropDirective() {
        this.fileOver = new core_1.EventEmitter();
        this.fileDrop = new core_1.EventEmitter();
    }
    FileDropDirective.prototype.onDrop = function (event) {
        var dataTransfer = FileDropDirective.getDataTransfer(event);
        if (!FileDropDirective.hasFiles(dataTransfer.types)) {
            return;
        }
        event.preventDefault();
        var files = this.filterFiles(dataTransfer.files);
        event.preventDefault();
        this.fileOver.emit(false);
        this.fileDrop.emit(files);
    };
    FileDropDirective.prototype.onDragLeave = function (event) {
        this.fileOver.emit(false);
    };
    FileDropDirective.prototype.onDragOver = function (event) {
        var dataTransfer = FileDropDirective.getDataTransfer(event);
        if (!FileDropDirective.hasFiles(dataTransfer.types)) {
            return;
        }
        dataTransfer.dropEffect = 'copy';
        event.preventDefault();
        this.fileOver.emit(true);
    };
    FileDropDirective.prototype.filterFiles = function (files) {
        if (!this.accept || this.accept.length === 0) {
            return files;
        }
        var acceptedFiles = [];
        for (var i = 0; i < files.length; i++) {
            for (var j = 0; j < this.accept.length; j++) {
                if (FileDropDirective.matchRule(this.accept[j], files[i].type)) {
                    acceptedFiles.push(files[i]);
                    break;
                }
            }
        }
        return acceptedFiles;
    };
    FileDropDirective.getDataTransfer = function (event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    };
    FileDropDirective.hasFiles = function (types) {
        if (!types) {
            return false;
        }
        if (types.indexOf) {
            return types.indexOf('Files') !== -1;
        }
        if (types.contains) {
            return types.contains('Files');
        }
        return false;
    };
    FileDropDirective.matchRule = function (rule, candidate) {
        return new RegExp("^" + rule.split("*").join(".*") + "$").test(candidate);
    };
    return FileDropDirective;
}());
FileDropDirective.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[fileDrop]'
            },] },
];
FileDropDirective.ctorParameters = function () { return []; };
FileDropDirective.propDecorators = {
    'accept': [{ type: core_1.Input },],
    'fileOver': [{ type: core_1.Output },],
    'fileDrop': [{ type: core_1.Output },],
    'onDrop': [{ type: core_1.HostListener, args: ['drop', ['$event'],] },],
    'onDragLeave': [{ type: core_1.HostListener, args: ['dragleave', ['$event'],] },],
    'onDragOver': [{ type: core_1.HostListener, args: ['dragover', ['$event'],] },],
};
exports.FileDropDirective = FileDropDirective;


/***/ }),

/***/ "./node_modules/angular2-image-upload/lib/image-upload.module.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var common_1 = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
var file_drop_directive_1 = __webpack_require__("./node_modules/angular2-image-upload/lib/file-drop.directive.js");
var image_upload_component_1 = __webpack_require__("./node_modules/angular2-image-upload/lib/image-upload/image-upload.component.js");
var image_service_1 = __webpack_require__("./node_modules/angular2-image-upload/lib/image-upload/image.service.js");
var ImageUploadModule = (function () {
    function ImageUploadModule() {
    }
    ImageUploadModule.forRoot = function () {
        return {
            ngModule: ImageUploadModule,
            providers: [image_service_1.ImageService]
        };
    };
    return ImageUploadModule;
}());
ImageUploadModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, http_1.HttpModule],
                declarations: [image_upload_component_1.ImageUploadComponent, file_drop_directive_1.FileDropDirective],
                exports: [image_upload_component_1.ImageUploadComponent]
            },] },
];
ImageUploadModule.ctorParameters = function () { return []; };
exports.ImageUploadModule = ImageUploadModule;


/***/ }),

/***/ "./node_modules/angular2-image-upload/lib/image-upload/image-upload.component.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var image_service_1 = __webpack_require__("./node_modules/angular2-image-upload/lib/image-upload/image.service.js");
var FileHolder = (function () {
    function FileHolder(src, file) {
        this.src = src;
        this.file = file;
        this.pending = false;
    }
    return FileHolder;
}());
exports.FileHolder = FileHolder;
var ImageUploadComponent = (function () {
    function ImageUploadComponent(imageService) {
        var _this = this;
        this.imageService = imageService;
        this.files = [];
        this.fileCounter = 0;
        this.fileOver = false;
        this.showFileTooLargeMessage = false;
        this.beforeUpload = function (data) { return data; };
        this.buttonCaption = 'Select Images';
        this.cssClass = 'img-ul';
        this.clearButtonCaption = 'Clear';
        this.dropBoxMessage = 'Drop your images here!';
        this.max = 100;
        this.preview = true;
        this.withCredentials = false;
        this.uploadedFiles = [];
        this.removed = new core_1.EventEmitter();
        this.uploadStateChanged = new core_1.EventEmitter();
        this.uploadFinished = new core_1.EventEmitter();
        this.pendingFilesCounter = 0;
        this.onFileOver = function (isOver) { return _this.fileOver = isOver; };
        this.countRemainingSlots = function () { return _this.max - _this.fileCounter; };
    }
    ImageUploadComponent.prototype.ngOnInit = function () {
        if (!this.fileTooLargeMessage) {
            this.fileTooLargeMessage = 'An image was too large and was not uploaded.' + (this.maxFileSize ? (' The maximum file size is ' + this.maxFileSize / 1024) + 'KiB.' : '');
        }
        this.supportedExtensions = this.supportedExtensions ? this.supportedExtensions.map(function (ext) { return 'image/' + ext; }) : ['image/*'];
    };
    ImageUploadComponent.prototype.deleteAll = function () {
        var _this = this;
        this.files.forEach(function (f) { return _this.removed.emit(f); });
        this.files = [];
        this.fileCounter = 0;
        this.inputElement.nativeElement.value = '';
    };
    ImageUploadComponent.prototype.deleteFile = function (file) {
        var index = this.files.indexOf(file);
        this.files.splice(index, 1);
        this.fileCounter--;
        this.inputElement.nativeElement.value = '';
        this.removed.emit(file);
    };
    ImageUploadComponent.prototype.ngOnChanges = function (changes) {
        if (changes.uploadedFiles && changes.uploadedFiles.currentValue.length > 0) {
            this.processUploadedFiles();
        }
    };
    ImageUploadComponent.prototype.onFileChange = function (files) {
        var remainingSlots = this.countRemainingSlots();
        var filesToUploadNum = files.length > remainingSlots ? remainingSlots : files.length;
        if (this.url && filesToUploadNum != 0) {
            this.uploadStateChanged.emit(true);
        }
        this.fileCounter += filesToUploadNum;
        this.showFileTooLargeMessage = false;
        this.uploadFiles(files, filesToUploadNum);
    };
    ImageUploadComponent.prototype.onResponse = function (response, fileHolder) {
        fileHolder.serverResponse = response;
        fileHolder.pending = false;
        this.uploadFinished.emit(fileHolder);
        if (--this.pendingFilesCounter == 0) {
            this.uploadStateChanged.emit(false);
        }
    };
    ImageUploadComponent.prototype.processUploadedFiles = function () {
        for (var i = 0; i < this.uploadedFiles.length; i++) {
            var data = this.uploadedFiles[i];
            var fileBlob = void 0, file = void 0, fileUrl = void 0;
            if (data instanceof Object) {
                fileUrl = data.url;
                fileBlob = (data.blob) ? data.blob : new Blob([data]);
                file = new File([fileBlob], data.fileName);
            }
            else {
                fileUrl = data;
                fileBlob = new Blob([fileUrl]);
                file = new File([fileBlob], fileUrl);
            }
            this.files.push(new FileHolder(fileUrl, file));
        }
    };
    ImageUploadComponent.prototype.uploadFiles = function (files, filesToUploadNum) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _loop_1, this_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _loop_1 = function (i) {
                            var file, beforeUploadResult, img, reader;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        file = files[i];
                                        if (this_1.maxFileSize && file.size > this_1.maxFileSize) {
                                            this_1.fileCounter--;
                                            this_1.inputElement.nativeElement.value = '';
                                            this_1.showFileTooLargeMessage = true;
                                            return [2 /*return*/, "continue"];
                                        }
                                        return [4 /*yield*/, this_1.beforeUpload({ file: file, url: this_1.url, abort: false })];
                                    case 1:
                                        beforeUploadResult = _a.sent();
                                        if (beforeUploadResult.abort) {
                                            this_1.fileCounter--;
                                            this_1.inputElement.nativeElement.value = '';
                                            return [2 /*return*/, "continue"];
                                        }
                                        img = document.createElement('img');
                                        img.src = window.URL.createObjectURL(beforeUploadResult.file);
                                        reader = new FileReader();
                                        reader.addEventListener('load', function (event) {
                                            var fileHolder = new FileHolder(event.target.result, beforeUploadResult.file);
                                            _this.uploadSingleFile(fileHolder, beforeUploadResult.url, beforeUploadResult.formData);
                                            _this.files.push(fileHolder);
                                        }, false);
                                        reader.readAsDataURL(beforeUploadResult.file);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < filesToUploadNum)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ImageUploadComponent.prototype.uploadSingleFile = function (fileHolder, url, customForm) {
        var _this = this;
        if (url === void 0) { url = this.url; }
        if (url) {
            this.pendingFilesCounter++;
            fileHolder.pending = true;
            this.imageService
                .postImage(this.url, fileHolder.file, this.headers, this.partName, customForm, this.withCredentials)
                .subscribe(function (response) { return _this.onResponse(response, fileHolder); }, function (error) {
                _this.onResponse(error, fileHolder);
                _this.deleteFile(fileHolder);
            });
        }
        else {
            this.uploadFinished.emit(fileHolder);
        }
    };
    return ImageUploadComponent;
}());
ImageUploadComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'image-upload',
                template: "\n    <div\n         fileDrop\n         [accept]=\"supportedExtensions\"\n         (fileOver)=\"onFileOver($event)\"\n         (fileDrop)=\"onFileChange($event)\"\n         [ngClass]=\"cssClass\"\n         [ngClass]=\"{'img-ul-file-is-over': fileOver}\"     \n         [ngStyle]=\"style?.layout\"\n    >\n      <div class=\"img-ul-file-upload img-ul-hr-inline-group\">    \n        <label class=\"img-ul-upload img-ul-button\" [ngStyle]=\"style?.selectButton\">\n          <span [innerText]=\"buttonCaption\"></span>\n          <input\n            type=\"file\"\n            [accept]=\"supportedExtensions\"\n            multiple (change)=\"onFileChange(input.files)\"\n            #input>\n        </label>\n        <label *ngIf=\"fileCounter > 0\" class=\"img-ul-clear img-ul-button\" (click)=\"deleteAll()\" [ngStyle]=\"style?.clearButton\">\n          <span [innerText]=\"clearButtonCaption\"></span>\n        </label>\n        <div class=\"img-ul-drag-box-msg\" [innerText]=\"dropBoxMessage\"></div>\n      </div>\n\n      <p class=\"img-ul-file-too-large\" *ngIf=\"showFileTooLargeMessage\" [innerText]=\"fileTooLargeMessage\"></p>\n\n      <div *ngIf=\"preview\" class=\"img-ul-container img-ul-hr-inline-group\" [ngStyle]=\"style?.previewPanel\">\n        <div\n          class=\"img-ul-image\"\n          *ngFor=\"let file of files\"\n          [ngStyle]=\"{'background-image': 'url('+ file.src +')'}\"\n        >\n          <div *ngIf=\"file.pending\" class=\"img-ul-loading-overlay\">\n            <div class=\"img-ul-spinning-circle\"></div>\n          </div>\n          <div *ngIf=\"!file.pending\" class=\"img-ul-x-mark\" (click)=\"deleteFile(file)\">\n            <span class=\"img-ul-close\"></span>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
                styles: ["\n    .img-ul {\n        --active-color: #3C9;\n        --common-radius: 3px;\n        background-color: #f8f8f8;\n        border-radius: var(--common-radius);\n        border: #d0d0d0 dashed 1px;\n        font-family: sans-serif;\n        position: relative;\n        color: #9b9b9b;\n    }\n\n    .img-ul-file-is-over {\n        border: var(--active-color) solid;\n    }\n\n    .img-ul-hr-inline-group:after {\n        clear: both;\n        content: \"\";\n        display: table;\n    }\n\n    .img-ul-file-upload {    \n        padding: 16px;\n    }\n\n    .img-ul-drag-box-msg {    \n        display: inline-block;\n        font-weight: 600;\n        margin-left: 12px;\n        padding-top: 14px;\n    }\n\n    label.img-ul-button input[type=file] {\n        display: none;\n        position: fixed;\n        top: -99999px;\n    }\n\n    .img-ul-clear {\n        background-color: #FF0000;\n    }\n\n    .img-ul-upload {\n        background-color: var(--active-color);\n    }\n\n    .img-ul-button {\n        -moz-box-shadow: 2px 2px 4px 0 rgba(148, 148, 148, 0.6);\n        -webkit-box-shadow: 2px 2px 4px 0 rgba(148, 148, 148, 0.6);\n        box-shadow: 2px 2px 4px 0 rgba(148, 148, 148, 0.6);\n        color: #FFF;\n        cursor: pointer;\n        display: inline-block;\n        float: left;\n        font-size: 1.25em;\n        font-weight: 500;\n        padding: 10px;\n        text-transform: uppercase;\n    }\n\n    .img-ul-button:active span {\n        display: block;\n        position: relative;\n        top: 1px;\n    }\n\n    .img-ul-container {\n        background-color: #fdfdfd;\n        padding: 0 10px;\n    }\n\n    .img-ul-image {    \n        background: center center no-repeat;\n        background-size: contain;\n        display: inline-block;\n        float: left;\n        height: 86px;\n        margin: 6px;\n        position: relative;\n        width: 86px;\n    }\n\n    .img-ul-x-mark {\n        background-color: #000;\n        border-radius: 2px;\n        color: #FFF;\n        cursor: pointer;\n        float: right;\n        height: 20px;\n        margin: 2px;\n        opacity: .7;\n        text-align: center;\n        width: 20px;\n    }\n\n    .img-ul-close {\n        height: 20px;\n        opacity: .7;\n        padding-right: 3px;\n        position: relative;\n        width: 20px;\n    }\n\n    .img-ul-x-mark:hover .img-ul-close {\n        opacity: 1;\n    }\n\n    .img-ul-close:before, .img-ul-close:after {\n        background-color: #FFF;\n        border-radius: 2px;\n        content: '';\n        height: 15px;\n        position: absolute;\n        top: 0;\n        width: 2px;\n    }\n\n    .img-ul-close:before {\n        transform: rotate(45deg);\n    }\n\n    .img-ul-close:after {\n        transform: rotate(-45deg);\n    }\n\n    .img-ul-loading-overlay {\n        background-color: #000;\n        bottom: 0;\n        left: 0;\n        opacity: .7;\n        position: absolute;\n        right: 0;\n        top: 0;\n    }\n\n    .img-ul-spinning-circle {\n        height: 30px;\n        width: 30px;\n        margin: auto;\n        position: absolute;\n        top: 0;\n        left: 0;\n        bottom: 0;\n        right: 0;\n        border-radius: 50%;\n        border: 3px solid rgba(255, 255, 255, 0);\n        border-top: 3px solid #FFF;\n        border-right: 3px solid #FFF;\n        -webkit-animation: spinner 2s infinite cubic-bezier(0.085, 0.625, 0.855, 0.360);\n        animation: spinner 2s infinite cubic-bezier(0.085, 0.625, 0.855, 0.360);\n    }\n\n    .img-ul-file-too-large {\n        color: red;\n        padding: 0 15px;\n    }\n\n    @-webkit-keyframes spinner {\n      0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n      }\n\n      100% {\n        -webkit-transform: rotate(360deg);\n        transform: rotate(360deg);\n      }\n    }\n\n    @keyframes spinner {\n      0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n      }\n\n      100% {\n        -webkit-transform: rotate(360deg);\n        transform: rotate(360deg);\n      }\n    }\n  "]
            },] },
];
ImageUploadComponent.ctorParameters = function () { return [
    { type: image_service_1.ImageService, },
]; };
ImageUploadComponent.propDecorators = {
    'beforeUpload': [{ type: core_1.Input },],
    'buttonCaption': [{ type: core_1.Input },],
    'cssClass': [{ type: core_1.Input, args: ['class',] },],
    'clearButtonCaption': [{ type: core_1.Input },],
    'dropBoxMessage': [{ type: core_1.Input },],
    'fileTooLargeMessage': [{ type: core_1.Input },],
    'headers': [{ type: core_1.Input },],
    'max': [{ type: core_1.Input },],
    'maxFileSize': [{ type: core_1.Input },],
    'preview': [{ type: core_1.Input },],
    'partName': [{ type: core_1.Input },],
    'style': [{ type: core_1.Input },],
    'supportedExtensions': [{ type: core_1.Input, args: ['extensions',] },],
    'url': [{ type: core_1.Input },],
    'withCredentials': [{ type: core_1.Input },],
    'uploadedFiles': [{ type: core_1.Input },],
    'removed': [{ type: core_1.Output },],
    'uploadStateChanged': [{ type: core_1.Output },],
    'uploadFinished': [{ type: core_1.Output },],
    'inputElement': [{ type: core_1.ViewChild, args: ['input',] },],
};
exports.ImageUploadComponent = ImageUploadComponent;


/***/ }),

/***/ "./node_modules/angular2-image-upload/lib/image-upload/image.service.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
var ImageService = (function () {
    function ImageService(http) {
        this.http = http;
    }
    ImageService.prototype.postImage = function (url, image, headers, partName, customFormData, withCredentials) {
        if (partName === void 0) { partName = 'image'; }
        if (!url || url === '') {
            throw new Error('Url is not set! Please set it before doing queries');
        }
        var options = new http_1.RequestOptions();
        if (withCredentials) {
            options.withCredentials = withCredentials;
        }
        if (headers) {
            options.headers = new http_1.Headers(headers);
        }
        var formData = new FormData();
        for (var key in customFormData) {
            formData.append(key, customFormData[key]);
        }
        formData.append(partName, image);
        return this.http.post(url, formData, options);
    };
    return ImageService;
}());
ImageService.decorators = [
    { type: core_1.Injectable },
];
ImageService.ctorParameters = function () { return [
    { type: http_1.Http, },
]; };
exports.ImageService = ImageService;


/***/ }),

/***/ "./node_modules/ngx-phone-mask/ngx-phone-mask/ngx-phone-mask.es5.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgxPhoneMaskModule; });
/* unused harmony export ɵa */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");



var noop = function () { };
var masks = [
    '1',
    '1 (1',
    '1 (11',
    '1 (111',
    '1 (111) 1',
    '1 (111) 11',
    '1 (111) 11-1',
    '1 (111) 11-11',
    '1 (111) 11-111',
    '1 (111) 111-111',
    '1 (111) 111-11-11',
    '1 (111) 111-111-11'
];
var clean = function (number) {
    return number
        .toString()
        .replace(/[^\d\^]/gm, '');
};
var format = function (number) {
    var /** @type {?} */ lastCharIndex = 0;
    var /** @type {?} */ cleanValue = clean(number);
    var /** @type {?} */ charCount = cleanValue.replace(/\^/gm, '').length;
    if (charCount === 0) {
        return {
            formatted: '',
            cursorPosition: 0
        };
    }
    var /** @type {?} */ mask = masks[charCount - 1];
    if (charCount > 1 && !mask) {
        return null;
    }
    var /** @type {?} */ cursorPosition;
    var /** @type {?} */ formatted = mask.split('').map(function (c, i) {
        if (c === '1') {
            if (cleanValue[lastCharIndex] == '^') {
                cursorPosition = i + 1;
                lastCharIndex++;
            }
            lastCharIndex++;
            return cleanValue[lastCharIndex - 1];
        }
        else {
            return c;
        }
    }).join('');
    if (!cursorPosition) {
        cursorPosition = formatted.length;
    }
    cursorPosition++; // because of '+'
    return {
        formatted: "+" + formatted,
        cursorPosition: cursorPosition
    };
};
var NgxPhoneMaskDirective = (function () {
    /**
     * @param {?} input
     */
    function NgxPhoneMaskDirective(input) {
        this.input = input;
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.valueType = 'clean';
        this.showMask = true;
        this.oldValue = '';
    }
    /**
     * @return {?}
     */
    NgxPhoneMaskDirective.prototype.updateInputView = function () {
        var /** @type {?} */ input = this.input.nativeElement;
        var /** @type {?} */ cursorPosition = input.selectionStart;
        var /** @type {?} */ value = this._value;
        var /** @type {?} */ valueWithCursor = value.substring(0, cursorPosition) + '^' + value.substring(cursorPosition);
        var /** @type {?} */ formatted = format(valueWithCursor);
        if (!formatted) {
            input.value = this.oldValue;
            return;
        }
        var /** @type {?} */ newValue = formatted.formatted;
        if (newValue != input.value) {
            input.value = newValue;
            input.setSelectionRange(formatted.cursorPosition, formatted.cursorPosition);
        }
        this.oldValue = newValue;
        this.emitValue(newValue);
    };
    /**
     * @param {?} v
     * @return {?}
     */
    NgxPhoneMaskDirective.prototype.emitValue = function (v) {
        var /** @type {?} */ value;
        switch (this.valueType) {
            case 'clean':
                value = v.replace(/[^\d\+]/gm, '');
                break;
            case 'full':
                value = v;
                break;
        }
        this.onChangeCallback(value);
    };
    /**
     * @return {?}
     */
    NgxPhoneMaskDirective.prototype.onInput = function () {
        this._value = this.input.nativeElement.value;
        this.updateInputView();
    };
    Object.defineProperty(NgxPhoneMaskDirective.prototype, "value", {
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) {
            var /** @type {?} */ value = v ? v : '';
            this._value = value;
            this.updateInputView();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    NgxPhoneMaskDirective.prototype.writeValue = function (value) {
        this.value = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxPhoneMaskDirective.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxPhoneMaskDirective.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgxPhoneMaskDirective.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    return NgxPhoneMaskDirective;
}());
NgxPhoneMaskDirective.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: '[ngxPhoneMask]',
                providers: [
                    {
                        provide: __WEBPACK_IMPORTED_MODULE_2__angular_forms__["NG_VALUE_ACCESSOR"],
                        useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return NgxPhoneMaskDirective; }),
                        multi: true
                    }
                ]
            },] },
];
/**
 * @nocollapse
 */
NgxPhoneMaskDirective.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
]; };
NgxPhoneMaskDirective.propDecorators = {
    'valueType': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'showMask': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'onInput': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"], args: ['input',] },],
};
var NgxPhoneMaskModule = (function () {
    function NgxPhoneMaskModule() {
    }
    return NgxPhoneMaskModule;
}());
NgxPhoneMaskModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                imports: [
                    __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]
                ],
                declarations: [NgxPhoneMaskDirective],
                exports: [NgxPhoneMaskDirective]
            },] },
];
/**
 * @nocollapse
 */
NgxPhoneMaskModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=ngx-phone-mask.es5.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/ReplaySubject.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReplaySubject; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scheduler_queue__ = __webpack_require__("./node_modules/rxjs/_esm5/scheduler/queue.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Subscription__ = __webpack_require__("./node_modules/rxjs/_esm5/Subscription.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__operators_observeOn__ = __webpack_require__("./node_modules/rxjs/_esm5/operators/observeOn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_ObjectUnsubscribedError__ = __webpack_require__("./node_modules/rxjs/_esm5/util/ObjectUnsubscribedError.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SubjectSubscription__ = __webpack_require__("./node_modules/rxjs/_esm5/SubjectSubscription.js");
/** PURE_IMPORTS_START ._Subject,._scheduler_queue,._Subscription,._operators_observeOn,._util_ObjectUnsubscribedError,._SubjectSubscription PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};






/**
 * @class ReplaySubject<T>
 */
var ReplaySubject = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) {
            bufferSize = Number.POSITIVE_INFINITY;
        }
        if (windowTime === void 0) {
            windowTime = Number.POSITIVE_INFINITY;
        }
        _super.call(this);
        this.scheduler = scheduler;
        this._events = [];
        this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
        this._windowTime = windowTime < 1 ? 1 : windowTime;
    }
    ReplaySubject.prototype.next = function (value) {
        var now = this._getNow();
        this._events.push(new ReplayEvent(now, value));
        this._trimBufferThenGetEvents();
        _super.prototype.next.call(this, value);
    };
    /** @deprecated internal use only */ ReplaySubject.prototype._subscribe = function (subscriber) {
        var _events = this._trimBufferThenGetEvents();
        var scheduler = this.scheduler;
        var subscription;
        if (this.closed) {
            throw new __WEBPACK_IMPORTED_MODULE_4__util_ObjectUnsubscribedError__["a" /* ObjectUnsubscribedError */]();
        }
        else if (this.hasError) {
            subscription = __WEBPACK_IMPORTED_MODULE_2__Subscription__["a" /* Subscription */].EMPTY;
        }
        else if (this.isStopped) {
            subscription = __WEBPACK_IMPORTED_MODULE_2__Subscription__["a" /* Subscription */].EMPTY;
        }
        else {
            this.observers.push(subscriber);
            subscription = new __WEBPACK_IMPORTED_MODULE_5__SubjectSubscription__["a" /* SubjectSubscription */](this, subscriber);
        }
        if (scheduler) {
            subscriber.add(subscriber = new __WEBPACK_IMPORTED_MODULE_3__operators_observeOn__["a" /* ObserveOnSubscriber */](subscriber, scheduler));
        }
        var len = _events.length;
        for (var i = 0; i < len && !subscriber.closed; i++) {
            subscriber.next(_events[i].value);
        }
        if (this.hasError) {
            subscriber.error(this.thrownError);
        }
        else if (this.isStopped) {
            subscriber.complete();
        }
        return subscription;
    };
    ReplaySubject.prototype._getNow = function () {
        return (this.scheduler || __WEBPACK_IMPORTED_MODULE_1__scheduler_queue__["a" /* queue */]).now();
    };
    ReplaySubject.prototype._trimBufferThenGetEvents = function () {
        var now = this._getNow();
        var _bufferSize = this._bufferSize;
        var _windowTime = this._windowTime;
        var _events = this._events;
        var eventsCount = _events.length;
        var spliceCount = 0;
        // Trim events that fall out of the time window.
        // Start at the front of the list. Break early once
        // we encounter an event that falls within the window.
        while (spliceCount < eventsCount) {
            if ((now - _events[spliceCount].time) < _windowTime) {
                break;
            }
            spliceCount++;
        }
        if (eventsCount > _bufferSize) {
            spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
        }
        if (spliceCount > 0) {
            _events.splice(0, spliceCount);
        }
        return _events;
    };
    return ReplaySubject;
}(__WEBPACK_IMPORTED_MODULE_0__Subject__["Subject"]));
var ReplayEvent = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function ReplayEvent(time, value) {
        this.time = time;
        this.value = value;
    }
    return ReplayEvent;
}());
//# sourceMappingURL=ReplaySubject.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/Scheduler.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Scheduler; });
/**
 * An execution context and a data structure to order tasks and schedule their
 * execution. Provides a notion of (potentially virtual) time, through the
 * `now()` getter method.
 *
 * Each unit of work in a Scheduler is called an {@link Action}.
 *
 * ```ts
 * class Scheduler {
 *   now(): number;
 *   schedule(work, delay?, state?): Subscription;
 * }
 * ```
 *
 * @class Scheduler
 */
var Scheduler = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) {
            now = Scheduler.now;
        }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    /**
     * Schedules a function, `work`, for execution. May happen at some point in
     * the future, according to the `delay` parameter, if specified. May be passed
     * some context object, `state`, which will be passed to the `work` function.
     *
     * The given arguments will be processed an stored as an Action object in a
     * queue of actions.
     *
     * @param {function(state: ?T): ?Subscription} work A function representing a
     * task, or some unit of work to be executed by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler itself.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @return {Subscription} A subscription in order to be able to unsubscribe
     * the scheduled work.
     */
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) {
            delay = 0;
        }
        return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    Scheduler.now = Date.now ? Date.now : function () { return +new Date(); };
    return Scheduler;
}());
//# sourceMappingURL=Scheduler.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/operator/debounceTime.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = debounceTime;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scheduler_async__ = __webpack_require__("./node_modules/rxjs/_esm5/scheduler/async.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__operators_debounceTime__ = __webpack_require__("./node_modules/rxjs/_esm5/operators/debounceTime.js");
/** PURE_IMPORTS_START .._scheduler_async,.._operators_debounceTime PURE_IMPORTS_END */


/**
 * Emits a value from the source Observable only after a particular time span
 * has passed without another source emission.
 *
 * <span class="informal">It's like {@link delay}, but passes only the most
 * recent value from each burst of emissions.</span>
 *
 * <img src="./img/debounceTime.png" width="100%">
 *
 * `debounceTime` delays values emitted by the source Observable, but drops
 * previous pending delayed emissions if a new value arrives on the source
 * Observable. This operator keeps track of the most recent value from the
 * source Observable, and emits that only when `dueTime` enough time has passed
 * without any other value appearing on the source Observable. If a new value
 * appears before `dueTime` silence occurs, the previous value will be dropped
 * and will not be emitted on the output Observable.
 *
 * This is a rate-limiting operator, because it is impossible for more than one
 * value to be emitted in any time window of duration `dueTime`, but it is also
 * a delay-like operator since output emissions do not occur at the same time as
 * they did on the source Observable. Optionally takes a {@link IScheduler} for
 * managing timers.
 *
 * @example <caption>Emit the most recent click after a burst of clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.debounceTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link auditTime}
 * @see {@link debounce}
 * @see {@link delay}
 * @see {@link sampleTime}
 * @see {@link throttleTime}
 *
 * @param {number} dueTime The timeout duration in milliseconds (or the time
 * unit determined internally by the optional `scheduler`) for the window of
 * time required to wait for emission silence before emitting the most recent
 * source value.
 * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
 * managing the timers that handle the timeout for each value.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by the specified `dueTime`, and may drop some values if they occur
 * too frequently.
 * @method debounceTime
 * @owner Observable
 */
function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) {
        scheduler = __WEBPACK_IMPORTED_MODULE_0__scheduler_async__["a" /* async */];
    }
    return Object(__WEBPACK_IMPORTED_MODULE_1__operators_debounceTime__["a" /* debounceTime */])(dueTime, scheduler)(this);
}
//# sourceMappingURL=debounceTime.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/operators/debounceTime.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = debounceTime;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscriber__ = __webpack_require__("./node_modules/rxjs/_esm5/Subscriber.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scheduler_async__ = __webpack_require__("./node_modules/rxjs/_esm5/scheduler/async.js");
/** PURE_IMPORTS_START .._Subscriber,.._scheduler_async PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * Emits a value from the source Observable only after a particular time span
 * has passed without another source emission.
 *
 * <span class="informal">It's like {@link delay}, but passes only the most
 * recent value from each burst of emissions.</span>
 *
 * <img src="./img/debounceTime.png" width="100%">
 *
 * `debounceTime` delays values emitted by the source Observable, but drops
 * previous pending delayed emissions if a new value arrives on the source
 * Observable. This operator keeps track of the most recent value from the
 * source Observable, and emits that only when `dueTime` enough time has passed
 * without any other value appearing on the source Observable. If a new value
 * appears before `dueTime` silence occurs, the previous value will be dropped
 * and will not be emitted on the output Observable.
 *
 * This is a rate-limiting operator, because it is impossible for more than one
 * value to be emitted in any time window of duration `dueTime`, but it is also
 * a delay-like operator since output emissions do not occur at the same time as
 * they did on the source Observable. Optionally takes a {@link IScheduler} for
 * managing timers.
 *
 * @example <caption>Emit the most recent click after a burst of clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.debounceTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link auditTime}
 * @see {@link debounce}
 * @see {@link delay}
 * @see {@link sampleTime}
 * @see {@link throttleTime}
 *
 * @param {number} dueTime The timeout duration in milliseconds (or the time
 * unit determined internally by the optional `scheduler`) for the window of
 * time required to wait for emission silence before emitting the most recent
 * source value.
 * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
 * managing the timers that handle the timeout for each value.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by the specified `dueTime`, and may drop some values if they occur
 * too frequently.
 * @method debounceTime
 * @owner Observable
 */
function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) {
        scheduler = __WEBPACK_IMPORTED_MODULE_1__scheduler_async__["a" /* async */];
    }
    return function (source) { return source.lift(new DebounceTimeOperator(dueTime, scheduler)); };
}
var DebounceTimeOperator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function DebounceTimeOperator(dueTime, scheduler) {
        this.dueTime = dueTime;
        this.scheduler = scheduler;
    }
    DebounceTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
    };
    return DebounceTimeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DebounceTimeSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(DebounceTimeSubscriber, _super);
    function DebounceTimeSubscriber(destination, dueTime, scheduler) {
        _super.call(this, destination);
        this.dueTime = dueTime;
        this.scheduler = scheduler;
        this.debouncedSubscription = null;
        this.lastValue = null;
        this.hasValue = false;
    }
    DebounceTimeSubscriber.prototype._next = function (value) {
        this.clearDebounce();
        this.lastValue = value;
        this.hasValue = true;
        this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
    };
    DebounceTimeSubscriber.prototype._complete = function () {
        this.debouncedNext();
        this.destination.complete();
    };
    DebounceTimeSubscriber.prototype.debouncedNext = function () {
        this.clearDebounce();
        if (this.hasValue) {
            this.destination.next(this.lastValue);
            this.lastValue = null;
            this.hasValue = false;
        }
    };
    DebounceTimeSubscriber.prototype.clearDebounce = function () {
        var debouncedSubscription = this.debouncedSubscription;
        if (debouncedSubscription !== null) {
            this.remove(debouncedSubscription);
            debouncedSubscription.unsubscribe();
            this.debouncedSubscription = null;
        }
    };
    return DebounceTimeSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]));
function dispatchNext(subscriber) {
    subscriber.debouncedNext();
}
//# sourceMappingURL=debounceTime.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/scheduler/Action.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Action; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscription__ = __webpack_require__("./node_modules/rxjs/_esm5/Subscription.js");
/** PURE_IMPORTS_START .._Subscription PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * A unit of work to be executed in a {@link Scheduler}. An action is typically
 * created from within a Scheduler and an RxJS user does not need to concern
 * themselves about creating and manipulating an Action.
 *
 * ```ts
 * class Action<T> extends Subscription {
 *   new (scheduler: Scheduler, work: (state?: T) => void);
 *   schedule(state?: T, delay: number = 0): Subscription;
 * }
 * ```
 *
 * @class Action<T>
 */
var Action = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        _super.call(this);
    }
    /**
     * Schedules this action on its parent Scheduler for execution. May be passed
     * some context object, `state`. May happen at some point in the future,
     * according to the `delay` parameter, if specified.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler.
     * @return {void}
     */
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        return this;
    };
    return Action;
}(__WEBPACK_IMPORTED_MODULE_0__Subscription__["a" /* Subscription */]));
//# sourceMappingURL=Action.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/scheduler/AsyncAction.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AsyncAction; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_root__ = __webpack_require__("./node_modules/rxjs/_esm5/util/root.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Action__ = __webpack_require__("./node_modules/rxjs/_esm5/scheduler/Action.js");
/** PURE_IMPORTS_START .._util_root,._Action PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AsyncAction = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
        this.pending = false;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (this.closed) {
            return this;
        }
        // Always replace the current state with the new state.
        this.state = state;
        // Set the pending flag indicating that this action has been scheduled, or
        // has recursively rescheduled itself.
        this.pending = true;
        var id = this.id;
        var scheduler = this.scheduler;
        //
        // Important implementation note:
        //
        // Actions only execute once by default, unless rescheduled from within the
        // scheduled callback. This allows us to implement single and repeat
        // actions via the same code path, without adding API surface area, as well
        // as mimic traditional recursion but across asynchronous boundaries.
        //
        // However, JS runtimes and timers distinguish between intervals achieved by
        // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
        // serial `setTimeout` calls can be individually delayed, which delays
        // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
        // guarantee the interval callback will be invoked more precisely to the
        // interval period, regardless of load.
        //
        // Therefore, we use `setInterval` to schedule single and repeat actions.
        // If the action reschedules itself with the same delay, the interval is not
        // canceled. If the action doesn't reschedule, or reschedules with a
        // different delay, the interval will be canceled after scheduled callback
        // execution.
        //
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.delay = delay;
        // If this action has already an async Id, don't request a new one.
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        return __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        // If this action is rescheduled with the same delay time, don't clear the interval id.
        if (delay !== null && this.delay === delay && this.pending === false) {
            return id;
        }
        // Otherwise, if the action's delay time is different from the current delay,
        // or the action has been rescheduled before it's executed, clear the interval id
        return __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].clearInterval(id) && undefined || undefined;
    };
    /**
     * Immediately executes this action and the `work` it contains.
     * @return {any}
     */
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            // Dequeue if the action didn't reschedule itself. Don't call
            // unsubscribe(), because the action could reschedule later.
            // For example:
            // ```
            // scheduler.schedule(function doWork(counter) {
            //   /* ... I'm a busy worker bee ... */
            //   var originalAction = this;
            //   /* wait 100ms before rescheduling the action */
            //   setTimeout(function () {
            //     originalAction.schedule(counter + 1);
            //   }, 100);
            // }, 1000);
            // ```
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, delay) {
        var errored = false;
        var errorValue = undefined;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    /** @deprecated internal use only */ AsyncAction.prototype._unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
    };
    return AsyncAction;
}(__WEBPACK_IMPORTED_MODULE_1__Action__["a" /* Action */]));
//# sourceMappingURL=AsyncAction.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/scheduler/AsyncScheduler.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AsyncScheduler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Scheduler__ = __webpack_require__("./node_modules/rxjs/_esm5/Scheduler.js");
/** PURE_IMPORTS_START .._Scheduler PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var AsyncScheduler = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler() {
        _super.apply(this, arguments);
        this.actions = [];
        /**
         * A flag to indicate whether the Scheduler is currently executing a batch of
         * queued actions.
         * @type {boolean}
         */
        this.active = false;
        /**
         * An internal ID used to track the latest asynchronous task such as those
         * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
         * others.
         * @type {any}
         */
        this.scheduled = undefined;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this.active) {
            actions.push(action);
            return;
        }
        var error;
        this.active = true;
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift()); // exhaust the scheduler queue
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(__WEBPACK_IMPORTED_MODULE_0__Scheduler__["a" /* Scheduler */]));
//# sourceMappingURL=AsyncScheduler.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/scheduler/QueueAction.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QueueAction; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AsyncAction__ = __webpack_require__("./node_modules/rxjs/_esm5/scheduler/AsyncAction.js");
/** PURE_IMPORTS_START ._AsyncAction PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var QueueAction = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(QueueAction, _super);
    function QueueAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
    }
    QueueAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay > 0) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
    };
    QueueAction.prototype.execute = function (state, delay) {
        return (delay > 0 || this.closed) ?
            _super.prototype.execute.call(this, state, delay) :
            this._execute(state, delay);
    };
    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        // If delay exists and is greater than 0, or if the delay is null (the
        // action wasn't rescheduled) but was originally scheduled as an async
        // action, then recycle as an async action.
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        // Otherwise flush the scheduler starting with this action.
        return scheduler.flush(this);
    };
    return QueueAction;
}(__WEBPACK_IMPORTED_MODULE_0__AsyncAction__["a" /* AsyncAction */]));
//# sourceMappingURL=QueueAction.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/scheduler/QueueScheduler.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QueueScheduler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AsyncScheduler__ = __webpack_require__("./node_modules/rxjs/_esm5/scheduler/AsyncScheduler.js");
/** PURE_IMPORTS_START ._AsyncScheduler PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var QueueScheduler = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(QueueScheduler, _super);
    function QueueScheduler() {
        _super.apply(this, arguments);
    }
    return QueueScheduler;
}(__WEBPACK_IMPORTED_MODULE_0__AsyncScheduler__["a" /* AsyncScheduler */]));
//# sourceMappingURL=QueueScheduler.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/scheduler/async.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return async; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AsyncAction__ = __webpack_require__("./node_modules/rxjs/_esm5/scheduler/AsyncAction.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AsyncScheduler__ = __webpack_require__("./node_modules/rxjs/_esm5/scheduler/AsyncScheduler.js");
/** PURE_IMPORTS_START ._AsyncAction,._AsyncScheduler PURE_IMPORTS_END */


/**
 *
 * Async Scheduler
 *
 * <span class="informal">Schedule task as if you used setTimeout(task, duration)</span>
 *
 * `async` scheduler schedules tasks asynchronously, by putting them on the JavaScript
 * event loop queue. It is best used to delay tasks in time or to schedule tasks repeating
 * in intervals.
 *
 * If you just want to "defer" task, that is to perform it right after currently
 * executing synchronous code ends (commonly achieved by `setTimeout(deferredTask, 0)`),
 * better choice will be the {@link asap} scheduler.
 *
 * @example <caption>Use async scheduler to delay task</caption>
 * const task = () => console.log('it works!');
 *
 * Rx.Scheduler.async.schedule(task, 2000);
 *
 * // After 2 seconds logs:
 * // "it works!"
 *
 *
 * @example <caption>Use async scheduler to repeat task in intervals</caption>
 * function task(state) {
 *   console.log(state);
 *   this.schedule(state + 1, 1000); // `this` references currently executing Action,
 *                                   // which we reschedule with new state and delay
 * }
 *
 * Rx.Scheduler.async.schedule(task, 3000, 0);
 *
 * // Logs:
 * // 0 after 3s
 * // 1 after 4s
 * // 2 after 5s
 * // 3 after 6s
 *
 * @static true
 * @name async
 * @owner Scheduler
 */
var async = /*@__PURE__*/ new __WEBPACK_IMPORTED_MODULE_1__AsyncScheduler__["a" /* AsyncScheduler */](__WEBPACK_IMPORTED_MODULE_0__AsyncAction__["a" /* AsyncAction */]);
//# sourceMappingURL=async.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/scheduler/queue.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return queue; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__QueueAction__ = __webpack_require__("./node_modules/rxjs/_esm5/scheduler/QueueAction.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__QueueScheduler__ = __webpack_require__("./node_modules/rxjs/_esm5/scheduler/QueueScheduler.js");
/** PURE_IMPORTS_START ._QueueAction,._QueueScheduler PURE_IMPORTS_END */


/**
 *
 * Queue Scheduler
 *
 * <span class="informal">Put every next task on a queue, instead of executing it immediately</span>
 *
 * `queue` scheduler, when used with delay, behaves the same as {@link async} scheduler.
 *
 * When used without delay, it schedules given task synchronously - executes it right when
 * it is scheduled. However when called recursively, that is when inside the scheduled task,
 * another task is scheduled with queue scheduler, instead of executing immediately as well,
 * that task will be put on a queue and wait for current one to finish.
 *
 * This means that when you execute task with `queue` scheduler, you are sure it will end
 * before any other task scheduled with that scheduler will start.
 *
 * @examples <caption>Schedule recursively first, then do something</caption>
 *
 * Rx.Scheduler.queue.schedule(() => {
 *   Rx.Scheduler.queue.schedule(() => console.log('second')); // will not happen now, but will be put on a queue
 *
 *   console.log('first');
 * });
 *
 * // Logs:
 * // "first"
 * // "second"
 *
 *
 * @example <caption>Reschedule itself recursively</caption>
 *
 * Rx.Scheduler.queue.schedule(function(state) {
 *   if (state !== 0) {
 *     console.log('before', state);
 *     this.schedule(state - 1); // `this` references currently executing Action,
 *                               // which we reschedule with new state
 *     console.log('after', state);
 *   }
 * }, 0, 3);
 *
 * // In scheduler that runs recursively, you would expect:
 * // "before", 3
 * // "before", 2
 * // "before", 1
 * // "after", 1
 * // "after", 2
 * // "after", 3
 *
 * // But with queue it logs:
 * // "before", 3
 * // "after", 3
 * // "before", 2
 * // "after", 2
 * // "before", 1
 * // "after", 1
 *
 *
 * @static true
 * @name queue
 * @owner Scheduler
 */
var queue = /*@__PURE__*/ new __WEBPACK_IMPORTED_MODULE_1__QueueScheduler__["a" /* QueueScheduler */](__WEBPACK_IMPORTED_MODULE_0__QueueAction__["a" /* QueueAction */]);
//# sourceMappingURL=queue.js.map


/***/ }),

/***/ "./src/app/layout/add-company-admin/add-company-admin.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl baseZIndex=\"1\" [(value)]=\"msgs\"></p-growl>\n<div [@routerTransition]>\n  <!--<app-page-header [heading]=\"'Forms'\" [icon]=\"'fa-edit'\"></app-page-header>-->\n\n  <div class=\"row\">\n    <div class=\"col-lg-6\">\n\n      <form [formGroup]=\"companyForm\" role=\"form\" (submit)=\"addCompany()\">\n        <!--<fieldset class=\"form-group\">\n          <label for=\"exampleInputFile\">Company Logo</label>\n          <input type=\"file\" class=\"form-control-file\" id=\"exampleInputFile\">\n          <p *ngIf=\"companyForm.controls['company_logo'].hasError('required') && isSubmited\" class=\"error-msg\">Company Logo is required</p>\n        </fieldset>-->\n        <image-upload [max]=\"1\" [buttonCaption]=\"'Select Image!'\" (uploadFinished)=\"onUploadFinished($event)\"></image-upload>\n\n        <fieldset class=\"form-group\">\n          <label>Full Name</label>\n          <input formControlName=\"full_name\" class=\"form-control\" placeholder=\"Full Name\">\n          <p *ngIf=\"companyForm.controls['full_name'].hasError('required') && isSubmited\" class=\"error-msg\">Full name is required</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>E-mail</label>\n          <input formControlName=\"email\" type=\"email\" class=\"form-control\" placeholder=\"E-mail\">\n          <p *ngIf=\"(companyForm.controls['email'].hasError('required')||companyForm.controls['email'].hasError('email')) && isSubmited\"\n            class=\"error-msg\">Enter a valid email address</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Company Name</label>\n          <input formControlName=\"company_name\" class=\"form-control\" placeholder=\"Company Name\">\n          <p *ngIf=\"companyForm.controls['company_name'].hasError('required') && isSubmited\" class=\"error-msg\">Company name is required</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Phone No</label>\n          <input ngxPhoneMask formControlName=\"phone_no\" class=\"form-control\" placeholder=\"Phone No.\">\n          <p *ngIf=\"companyForm.controls['phone_no'].hasError('required') && isSubmited\" class=\"error-msg\">Phone No. is required</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Password</label>\n          <input formControlName=\"password\" type=\"password\" class=\"form-control\" placeholder=\"Password\">\n          <p *ngIf=\"companyForm.controls['password'].hasError('required') && isSubmited\" class=\"error-msg\">Password is required</p>\n        </fieldset>\n\n        <button type=\"submit\" class=\"btn btn-secondary\">Save</button>\n        <button type=\"reset\" class=\"btn btn-secondary\">Reset</button>\n\n      </form>\n\n    </div>\n  </div>\n  <ngx-loading [show]=\"loading\" [config]=\"{ backdropBorderRadius: '14px',fullScreenBackdrop:true }\"></ngx-loading>\n</div>"

/***/ }),

/***/ "./src/app/layout/add-company-admin/add-company-admin.component.scss":
/***/ (function(module, exports) {

module.exports = ".error-msg {\n  color: maroon; }\n"

/***/ }),

/***/ "./src/app/layout/add-company-admin/add-company-admin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddCompanyAdminComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router_animations__ = __webpack_require__("./src/app/router.animations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
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




var AddCompanyAdminComponent = (function () {
    function AddCompanyAdminComponent(fb, userService) {
        this.fb = fb;
        this.userService = userService;
        this.isSubmited = false;
        this.loading = false;
        this.msgs = [];
        this.companyForm = this.fb.group({
            full_name: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            email: [null, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].email]],
            company_name: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            password: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            phone_no: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
    }
    AddCompanyAdminComponent.prototype.ngOnInit = function () {
    };
    AddCompanyAdminComponent.prototype.addCompany = function () {
        var _this = this;
        this.loading = true;
        if (this.companyForm.invalid) {
            this.loading = false;
            this.isSubmited = true;
            return;
        }
        this.companyForm.value['role'] = 1;
        if (this.imgUrl) {
            this.companyForm.value['imgUrl'] = this.imgUrl;
        }
        else {
            this.companyForm.value['company_logo'] = '/images/no-img.png';
        }
        console.log("CompanyForm", this.companyForm.value);
        this.userService.addUser(this.companyForm.value)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.companyForm.reset();
                _this.msgs = [];
                _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Company Admin Added successfully' });
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    AddCompanyAdminComponent.prototype.onUploadFinished = function (event) {
        this.imgUrl = event.src;
        // setTimeout(() => {
        //   this.userService.uploadImage(event.src)
        //     .then(res => {
        //       if (res.code == 200) {
        //         console.log(res.data)
        //         this.imgUrl = res.data;
        //       }
        //       else {
        //         alert(res.message)
        //       }
        //     })
        // }, 3000)
    };
    return AddCompanyAdminComponent;
}());
AddCompanyAdminComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-add-company-admin',
        template: __webpack_require__("./src/app/layout/add-company-admin/add-company-admin.component.html"),
        styles: [__webpack_require__("./src/app/layout/add-company-admin/add-company-admin.component.scss")],
        animations: [Object(__WEBPACK_IMPORTED_MODULE_1__router_animations__["a" /* routerTransition */])()]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_users_service__["a" /* UsersService */]) === "function" && _b || Object])
], AddCompanyAdminComponent);

var _a, _b;
//# sourceMappingURL=add-company-admin.component.js.map

/***/ }),

/***/ "./src/app/layout/add-company-user/add-company-user.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl baseZIndex=\"1\" [(value)]=\"msgs\"></p-growl>\n<div [@routerTransition]>\n  <!--<app-page-header [heading]=\"'Forms'\" [icon]=\"'fa-edit'\"></app-page-header>-->\n\n  <div class=\"row\">\n    <div class=\"col-lg-6\">\n\n      <form [formGroup]=\"companyUserForm\" role=\"form\" (submit)=\"addCompanyUser()\">\n        <fieldset class=\"form-group\">\n          <label>Full Name</label>\n          <input formControlName=\"full_name\" class=\"form-control\" placeholder=\"Full Name\">\n          <p *ngIf=\"companyUserForm.controls['full_name'].hasError('required') && isSubmited\" class=\"error-msg\">Full name is required</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>E-mail</label>\n          <input formControlName=\"email\" type=\"email\" class=\"form-control\" placeholder=\"E-mail\">\n          <p *ngIf=\"(companyUserForm.controls['email'].hasError('required')||companyUserForm.controls['email'].hasError('email')) && isSubmited\" class=\"error-msg\">Enter a valid email address</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Company Name</label>\n          <select formControlName=\"company_name\" class=\"form-control\">\n            <option value=\"null\" [selected]=true>Please select</option>\n            <option *ngFor=\"let c of compArr\" [ngValue]=\"c\">{{c.company_name}}</option>\n          </select>\n          <p *ngIf=\"companyUserForm.controls['company_name'].hasError('required') && isSubmited\" class=\"error-msg\">Company name is required</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Phone No</label>\n          <input formControlName=\"phone_no\" ngxPhoneMask class=\"form-control\" placeholder=\"Phone No.\">\n          <p *ngIf=\"companyUserForm.controls['phone_no'].hasError('required') && isSubmited\" class=\"error-msg\">Phone No. is required</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Password</label>\n          <input formControlName=\"password\" type=\"password\" class=\"form-control\" placeholder=\"Password\">\n          <p *ngIf=\"companyUserForm.controls['password'].hasError('required') && isSubmited\" class=\"error-msg\">Password is required</p>\n        </fieldset>\n\n        <button type=\"submit\" class=\"btn btn-secondary\">Save</button>\n        <button type=\"reset\" class=\"btn btn-secondary\">Reset</button>\n\n      </form>\n\n    </div>\n  </div>\n  <ngx-loading [show]=\"loading\" [config]=\"{ backdropBorderRadius: '14px',fullScreenBackdrop:true }\"></ngx-loading>\n</div>"

/***/ }),

/***/ "./src/app/layout/add-company-user/add-company-user.component.scss":
/***/ (function(module, exports) {

module.exports = ".error-msg {\n  color: maroon; }\n"

/***/ }),

/***/ "./src/app/layout/add-company-user/add-company-user.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddCompanyUserComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router_animations__ = __webpack_require__("./src/app/router.animations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
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




var AddCompanyUserComponent = (function () {
    function AddCompanyUserComponent(fb, userService) {
        this.fb = fb;
        this.userService = userService;
        this.isSubmited = false;
        this.loading = false;
        this.compArr = [];
        this.msgs = [];
        this.companyUserForm = this.fb.group({
            full_name: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            email: [null, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].email]],
            company_name: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            password: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            phone_no: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
    }
    AddCompanyUserComponent.prototype.ngOnInit = function () {
        this.fetchCompanies();
    };
    AddCompanyUserComponent.prototype.addCompanyUser = function () {
        var _this = this;
        this.loading = true;
        if (this.companyUserForm.invalid) {
            this.loading = false;
            this.isSubmited = true;
            return;
        }
        this.companyUserForm.value['role'] = 2;
        this.companyUserForm.value['companyId'] = this.companyUserForm.value.company_name._id;
        this.companyUserForm.value['company_name'] = this.companyUserForm.value.company_name.company_name;
        this.userService.addUser(this.companyUserForm.value)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.companyUserForm.reset();
                _this.msgs = [];
                _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Company user Added successfully' });
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    AddCompanyUserComponent.prototype.fetchCompanies = function () {
        var _this = this;
        this.loading = true;
        var role = this.userService.readSession().role;
        var companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        };
        this.userService.fetchCompanies(data)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.compArr = res.data;
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    return AddCompanyUserComponent;
}());
AddCompanyUserComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-add-company-user',
        template: __webpack_require__("./src/app/layout/add-company-user/add-company-user.component.html"),
        styles: [__webpack_require__("./src/app/layout/add-company-user/add-company-user.component.scss")],
        animations: [Object(__WEBPACK_IMPORTED_MODULE_1__router_animations__["a" /* routerTransition */])()]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_users_service__["a" /* UsersService */]) === "function" && _b || Object])
], AddCompanyUserComponent);

var _a, _b;
//# sourceMappingURL=add-company-user.component.js.map

/***/ }),

/***/ "./src/app/layout/add-hauler-admin/add-hauler-admin.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl baseZIndex=\"1\" [(value)]=\"msgs\"></p-growl> \n<div [@routerTransition]>\n  <!--<app-page-header [heading]=\"'Forms'\" [icon]=\"'fa-edit'\"></app-page-header>-->\n\n  <div class=\"row\">\n    <div class=\"col-lg-6\">\n\n      <form [formGroup]=\"haulerForm\" role=\"form\" (submit)=\"addHauler()\">\n        <fieldset class=\"form-group\">\n          <label>Full Name</label>\n          <input formControlName=\"full_name\" class=\"form-control\" placeholder=\"Full Name\">\n          <p *ngIf=\"haulerForm.controls['full_name'].hasError('required') && isSubmited\" class=\"error-msg\">Full name is required</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>E-mail</label>\n          <input formControlName=\"email\" type=\"email\" class=\"form-control\" placeholder=\"E-mail\">\n          <p *ngIf=\"(haulerForm.controls['email'].hasError('required')||haulerForm.controls['email'].hasError('email')) && isSubmited\" class=\"error-msg\">Enter a valid email address</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Company Name</label>\n          <input formControlName=\"company_name\" class=\"form-control\" placeholder=\"Company Name\">\n          <p *ngIf=\"haulerForm.controls['company_name'].hasError('required') && isSubmited\" class=\"error-msg\">Company name is required</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Phone No</label>\n          <input formControlName=\"phone_no\"ngxPhoneMask class=\"form-control\" placeholder=\"Phone No.\">\n          <p *ngIf=\"haulerForm.controls['phone_no'].hasError('required') && isSubmited\" class=\"error-msg\">Phone No. is required</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Password</label>\n          <input formControlName=\"password\" type=\"password\" class=\"form-control\" placeholder=\"Password\">\n          <p *ngIf=\"haulerForm.controls['password'].hasError('required') && isSubmited\" class=\"error-msg\">Password is required</p>\n        </fieldset>\n\n        <button type=\"submit\" class=\"btn btn-secondary\">Save</button>\n        <button type=\"reset\" class=\"btn btn-secondary\">Reset</button>\n\n      </form>\n\n    </div>\n  </div>\n  <!-- /.row -->\n</div>"

/***/ }),

/***/ "./src/app/layout/add-hauler-admin/add-hauler-admin.component.scss":
/***/ (function(module, exports) {

module.exports = ".error-msg {\n  color: maroon; }\n"

/***/ }),

/***/ "./src/app/layout/add-hauler-admin/add-hauler-admin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddHaulerAdminComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router_animations__ = __webpack_require__("./src/app/router.animations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
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




var AddHaulerAdminComponent = (function () {
    function AddHaulerAdminComponent(fb, userService) {
        this.fb = fb;
        this.userService = userService;
        this.isSubmited = false;
        this.msgs = [];
        this.haulerForm = this.fb.group({
            full_name: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            email: [null, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].email]],
            company_name: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            password: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            phone_no: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
    }
    AddHaulerAdminComponent.prototype.ngOnInit = function () {
    };
    AddHaulerAdminComponent.prototype.addHauler = function () {
        var _this = this;
        if (this.haulerForm.invalid) {
            this.isSubmited = true;
            return;
        }
        this.haulerForm.value['role'] = 3;
        this.userService.addUser(this.haulerForm.value)
            .then(function (res) {
            if (res.code == 200) {
                _this.haulerForm.reset();
                _this.msgs = [];
                _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Hauler admin Added successfully' });
            }
            else {
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    return AddHaulerAdminComponent;
}());
AddHaulerAdminComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-add-hauler-admin',
        template: __webpack_require__("./src/app/layout/add-hauler-admin/add-hauler-admin.component.html"),
        styles: [__webpack_require__("./src/app/layout/add-hauler-admin/add-hauler-admin.component.scss")],
        animations: [Object(__WEBPACK_IMPORTED_MODULE_1__router_animations__["a" /* routerTransition */])()]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_users_service__["a" /* UsersService */]) === "function" && _b || Object])
], AddHaulerAdminComponent);

var _a, _b;
//# sourceMappingURL=add-hauler-admin.component.js.map

/***/ }),

/***/ "./src/app/layout/add-hauler-user/add-hauler-user.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl baseZIndex=\"1\" [(value)]=\"msgs\"></p-growl> \n<div [@routerTransition]>\n  <!--<app-page-header [heading]=\"'Forms'\" [icon]=\"'fa-edit'\"></app-page-header>-->\n\n  <div class=\"row\">\n    <div class=\"col-lg-6\">\n\n      <form [formGroup]=\"haulerUserForm\" role=\"form\" (submit)=\"addHaulerUser()\">\n        <fieldset class=\"form-group\">\n          <label>Full Name</label>\n          <input formControlName=\"full_name\" class=\"form-control\" placeholder=\"Full Name\">\n          <p *ngIf=\"haulerUserForm.controls['full_name'].hasError('required') && isSubmited\" class=\"error-msg\">Full name is required</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>E-mail</label>\n          <input formControlName=\"email\" type=\"email\" class=\"form-control\" placeholder=\"E-mail\">\n          <p *ngIf=\"(haulerUserForm.controls['email'].hasError('required')||haulerUserForm.controls['email'].hasError('email')) && isSubmited\"\n            class=\"error-msg\">\n            Enter a valid email address\n          </p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Company Name</label>\n          <select formControlName=\"company_name\" class=\"form-control\">\n            <option value=\"null\" [selected]=true>Please select</option>\n            <option *ngFor=\"let c of haulerArr\" [ngValue]=\"c\">{{c.company_name}}</option>\n          </select>\n          <p *ngIf=\"haulerUserForm.controls['company_name'].hasError('required') && isSubmited\" class=\"error-msg\">Company name is required</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Phone No</label>\n          <input formControlName=\"phone_no\" ngxPhoneMask class=\"form-control\" placeholder=\"Phone No.\">\n          <p *ngIf=\"haulerUserForm.controls['phone_no'].hasError('required') && isSubmited\" class=\"error-msg\">Phone No. is required</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Password</label>\n          <input formControlName=\"password\" type=\"password\" class=\"form-control\" placeholder=\"Password\">\n          <p *ngIf=\"haulerUserForm.controls['password'].hasError('required') && isSubmited\" class=\"error-msg\">Password is required</p>\n        </fieldset>\n\n        <button type=\"submit\" class=\"btn btn-secondary\">Save</button>\n        <button type=\"reset\" class=\"btn btn-secondary\">Reset</button>\n\n      </form>\n\n    </div>\n  </div>\n  <ngx-loading [show]=\"loading\" [config]=\"{ backdropBorderRadius: '14px',fullScreenBackdrop:true }\"></ngx-loading>\n</div>"

/***/ }),

/***/ "./src/app/layout/add-hauler-user/add-hauler-user.component.scss":
/***/ (function(module, exports) {

module.exports = ".error-msg {\n  color: maroon; }\n"

/***/ }),

/***/ "./src/app/layout/add-hauler-user/add-hauler-user.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddHaulerUserComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router_animations__ = __webpack_require__("./src/app/router.animations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
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




var AddHaulerUserComponent = (function () {
    function AddHaulerUserComponent(fb, userService) {
        this.fb = fb;
        this.userService = userService;
        this.isSubmited = false;
        this.loading = false;
        this.haulerArr = [];
        this.msgs = [];
        this.haulerUserForm = this.fb.group({
            full_name: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            email: [null, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].email]],
            company_name: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            password: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            phone_no: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
    }
    AddHaulerUserComponent.prototype.ngOnInit = function () {
        this.fetchHaulers();
    };
    AddHaulerUserComponent.prototype.addHaulerUser = function () {
        var _this = this;
        //this.loading=true;
        if (this.haulerUserForm.invalid) {
            this.isSubmited = true;
            return;
        }
        this.haulerUserForm.value['role'] = "4";
        this.haulerUserForm.value['companyId'] = this.haulerUserForm.value.company_name._id;
        this.haulerUserForm.value['company_name'] = this.haulerUserForm.value.company_name.company_name;
        console.log(this.haulerUserForm.value);
        this.userService.addUser(this.haulerUserForm.value)
            .then(function (res) {
            if (res.code == 200) {
                //this.loading=false;
                _this.haulerUserForm.reset();
                _this.msgs = [];
                _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Hauler user Added successfully' });
            }
            else {
                //this.loading=false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    AddHaulerUserComponent.prototype.fetchHaulers = function () {
        var _this = this;
        this.loading = true;
        var role = this.userService.readSession().role;
        var companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        };
        this.userService.fetchHaulers(data)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.haulerArr = res.data;
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
            }
        });
    };
    return AddHaulerUserComponent;
}());
AddHaulerUserComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-add-hauler-user',
        template: __webpack_require__("./src/app/layout/add-hauler-user/add-hauler-user.component.html"),
        styles: [__webpack_require__("./src/app/layout/add-hauler-user/add-hauler-user.component.scss")],
        animations: [Object(__WEBPACK_IMPORTED_MODULE_1__router_animations__["a" /* routerTransition */])()]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_users_service__["a" /* UsersService */]) === "function" && _b || Object])
], AddHaulerUserComponent);

var _a, _b;
//# sourceMappingURL=add-hauler-user.component.js.map

/***/ }),

/***/ "./src/app/layout/add-pads/add-pads.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl baseZIndex=\"1\" [(value)]=\"msgs\"></p-growl> \n<div [@routerTransition]>\n  <!--<app-page-header [heading]=\"'Forms'\" [icon]=\"'fa-edit'\"></app-page-header>-->\n\n  <div class=\"row\">\n    <div class=\"col-lg-6\">\n\n      <form [formGroup]=\"padsForm\" role=\"form\" (submit)=\"addPads()\">\n        <fieldset class=\"form-group\">\n          <label>Pad Name</label>\n          <input formControlName=\"pad_name\" class=\"form-control\" placeholder=\"Pad Name\">\n          <p *ngIf=\"padsForm.controls['pad_name'].hasError('required') && isSubmited\" class=\"error-msg\">Pad Name is required</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Company Name</label>\n          <select formControlName=\"company_name\" class=\"form-control\">\n            <option value=\"null\" [selected]=true>Please select</option>\n            <option *ngFor=\"let c of compArr\" [ngValue]=\"c\">{{c.company_name}}</option>\n          </select>\n          <p *ngIf=\"padsForm.controls['company_name'].hasError('required') && isSubmited\" class=\"error-msg\">Company name is required</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Lattitude</label>\n          <input formControlName=\"lat\" type=\"text\" class=\"form-control\" placeholder=\"Lattitude\">\n          <p *ngIf=\"padsForm.controls['lat'].hasError('required') && isSubmited\" class=\"error-msg\">Lattitude is required</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Longitude</label>\n          <input formControlName=\"long\" type=\"text\" class=\"form-control\" placeholder=\"Longitude\">\n          <p *ngIf=\"padsForm.controls['long'].hasError('required') && isSubmited\" class=\"error-msg\">Longitude is required</p>\n        </fieldset>\n\n        <button type=\"submit\" class=\"btn btn-secondary\">Save</button>\n        <button type=\"reset\" class=\"btn btn-secondary\">Reset</button>\n\n      </form>\n\n    </div>\n  </div>\n  <ngx-loading [show]=\"loading\" [config]=\"{ backdropBorderRadius: '14px',fullScreenBackdrop:true }\"></ngx-loading>\n</div>"

/***/ }),

/***/ "./src/app/layout/add-pads/add-pads.component.scss":
/***/ (function(module, exports) {

module.exports = ".error-msg {\n  color: maroon; }\n"

/***/ }),

/***/ "./src/app/layout/add-pads/add-pads.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPadsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router_animations__ = __webpack_require__("./src/app/router.animations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
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




var AddPadsComponent = (function () {
    function AddPadsComponent(fb, userService) {
        this.fb = fb;
        this.userService = userService;
        this.isSubmited = false;
        this.loading = false;
        this.compArr = [];
        this.msgs = [];
        this.padsForm = this.fb.group({
            pad_name: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            company_name: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            lat: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            long: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
    }
    AddPadsComponent.prototype.ngOnInit = function () {
        this.fetchCompanies();
    };
    AddPadsComponent.prototype.addPads = function () {
        var _this = this;
        // this.loading=true;
        if (this.padsForm.invalid) {
            this.loading = false;
            this.isSubmited = true;
            return;
        }
        this.padsForm.value['companyId'] = this.padsForm.value.company_name._id;
        this.padsForm.value['company_name'] = this.padsForm.value.company_name.company_name;
        console.log(this.padsForm.value);
        this.position = this.padsForm.value;
        this.position.position = [,];
        this.userService.addPad(this.position)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.padsForm.reset();
                _this.msgs = [];
                _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Pad Added successfully' });
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    AddPadsComponent.prototype.fetchCompanies = function () {
        var _this = this;
        this.loading = true;
        var role = this.userService.readSession().role;
        var companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        };
        this.userService.fetchCompanies(data)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.compArr = res.data;
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    return AddPadsComponent;
}());
AddPadsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-add-pads',
        template: __webpack_require__("./src/app/layout/add-pads/add-pads.component.html"),
        styles: [__webpack_require__("./src/app/layout/add-pads/add-pads.component.scss")],
        animations: [Object(__WEBPACK_IMPORTED_MODULE_1__router_animations__["a" /* routerTransition */])()]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_users_service__["a" /* UsersService */]) === "function" && _b || Object])
], AddPadsComponent);

var _a, _b;
//# sourceMappingURL=add-pads.component.js.map

/***/ }),

/***/ "./src/app/layout/add-tanks/add-tanks.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl baseZIndex=\"1\" [(value)]=\"msgs\"></p-growl>\n<div [@routerTransition]>\n  <!--<app-page-header [heading]=\"'Forms'\" [icon]=\"'fa-edit'\"></app-page-header>-->\n\n  <div class=\"row\">\n    <div class=\"col-lg-6\">\n\n      <form [formGroup]=\"tanksForm\" role=\"form\" (submit)=\"addTank()\">\n        <fieldset class=\"form-group\">\n          <label>Tank Name</label>\n          <input formControlName=\"tank_name\" class=\"form-control\" placeholder=\"Tank Name\">\n          <p *ngIf=\"tanksForm.controls['tank_name'].hasError('required') && isSubmited\" class=\"error-msg\">Tank Name is required.</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Tank Number</label>\n          <input formControlName=\"tank_no\" class=\"form-control\" placeholder=\"Tank Number\">\n          <p *ngIf=\"tanksForm.controls['tank_no'].hasError('required') && isSubmited\" class=\"error-msg\">Tank No. is required.</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Company Name</label>\n          <select formControlName=\"company_name\" class=\"form-control\" (change)=\"fetchPads($event)\">\n            <option value=\"null\" [selected]=true>Please select</option>\n            <option *ngFor=\"let c of compArr\" [value]=\"c._id\">{{c.company_name}}</option>\n          </select>\n          <p *ngIf=\"tanksForm.controls['company_name'].hasError('required') && isSubmited\" class=\"error-msg\">Company name is required.</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Pad Name</label>\n          <select formControlName=\"pad_name\" class=\"form-control\" (change)=fetchwells($event);fetchPadsWithLatLong($event)>\n            <option value=\"null\" [selected]=true>Please select</option>\n            <option *ngFor=\"let c of padArr\" [value]=\"c._id\">{{c.pad_name}}</option>\n          </select>\n          <p *ngIf=\"tanksForm.controls['pad_name'].hasError('required') && isSubmited\" class=\"error-msg\">Pad name is required.</p>\n        </fieldset>\n           \n        <fieldset class=\"form-group\">\n          <label>Well Name</label>\n          <select formControlName=\"well_name\" class=\"form-control\">\n            <option value=\"null\" [selected]=true>Please select</option>\n            <option *ngFor=\"let well of wellArr\" [value]=\"well._id\">{{well.well_name}}</option>\n          </select>\n          <p *ngIf=\"tanksForm.controls['well_name'].hasError('required') && isSubmited\" class=\"error-msg\">well name is required.</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Lattitude</label>\n          <input formControlName=\"lat\" type=\"text\" class=\"form-control\" placeholder=\"Lattitude\">\n         \n          <p *ngIf=\"tanksForm.controls['lat'].hasError('required') && isSubmited\" class=\"error-msg\">Lattitude is required.</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Longitude</label>\n          <input formControlName=\"long\" type=\"text\" class=\"form-control\" placeholder=\"Longitude\">\n          \n          <p *ngIf=\"tanksForm.controls['long'].hasError('required') && isSubmited\" class=\"error-msg\">Longitude is required.</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Volume</label>\n          <input formControlName=\"volume\" type=\"text\" class=\"form-control\" placeholder=\"Volume\">\n          <p *ngIf=\"tanksForm.controls['volume'].hasError('required') && isSubmited\" class=\"error-msg\">Volume is required.</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Type</label>\n          <input formControlName=\"type\" type=\"text\" class=\"form-control\" placeholder=\"Type\">\n          <p *ngIf=\"tanksForm.controls['type'].hasError('required') && isSubmited\" class=\"error-msg\">Type is required.</p>\n        </fieldset>\n\n        <button type=\"submit\" class=\"btn btn-secondary\">Save</button>\n        <button type=\"reset\" class=\"btn btn-secondary\">Reset</button>\n        \n      </form>\n    </div>\n  </div>\n  <ngx-loading [show]=\"loading\" [config]=\"{ backdropBorderRadius: '14px',fullScreenBackdrop:true }\"></ngx-loading>\n</div>"

/***/ }),

/***/ "./src/app/layout/add-tanks/add-tanks.component.scss":
/***/ (function(module, exports) {

module.exports = ".error-msg {\n  color: maroon; }\n"

/***/ }),

/***/ "./src/app/layout/add-tanks/add-tanks.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddTanksComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router_animations__ = __webpack_require__("./src/app/router.animations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
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




var AddTanksComponent = (function () {
    function AddTanksComponent(fb, userService) {
        this.fb = fb;
        this.userService = userService;
        this.isSubmited = false;
        this.loading = false;
        this.compArr = [];
        this.padArr = [];
        this.msgs = [];
        this.wellArr = [];
        this.latLong = [];
        this.tanksForm = this.fb.group({
            tank_name: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            tank_no: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            company_name: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            pad_name: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            well_name: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            lat: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            long: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            volume: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            type: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
    }
    AddTanksComponent.prototype.ngOnInit = function () {
        this.fetchCompanies();
    };
    AddTanksComponent.prototype.fetchCompanies = function () {
        var _this = this;
        this.loading = true;
        var role = this.userService.readSession().role;
        var companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        };
        this.userService.fetchCompanies(data)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.compArr = res.data;
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    AddTanksComponent.prototype.fetchPads = function (event) {
        var _this = this;
        this.loading = true;
        var companyId = event.target.value;
        this.userService.fetchPadsWithComp(companyId)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.padArr = res.data;
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    AddTanksComponent.prototype.fetchPadsWithLatLong = function (event) {
        var _this = this;
        console.log('event in fetch lat long', event.target.value);
        this.loading = true;
        var padId = event.target.value;
        this.userService.fetchPadsWithLatLong(padId)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.latLong = res.data;
                _this.tanksForm.patchValue({
                    lat: _this.latLong[0].lat,
                    long: _this.latLong[0].long
                });
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    AddTanksComponent.prototype.fetchwells = function (event) {
        var _this = this;
        this.loading = true;
        var padId = event.target.value;
        this.userService.fetchWellWithPads(padId)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.wellArr = res.data;
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    AddTanksComponent.prototype.addTank = function () {
        var _this = this;
        this.loading = true;
        if (this.tanksForm.invalid) {
            this.loading = false;
            this.isSubmited = true;
            return;
        }
        this.tanksForm.value['companyId'] = this.tanksForm.value.company_name;
        this.tanksForm.value['padId'] = this.tanksForm.value.pad_name;
        this.tanksForm.value['wellId'] = this.tanksForm.value.well_name;
        delete this.tanksForm.value.company_name;
        delete this.tanksForm.value.pad_name;
        delete this.tanksForm.value.well_name;
        this.fetchCompanies();
        this.userService.addTank(this.tanksForm.value)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.tanksForm.reset();
                _this.msgs = [];
                _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Tank Added successfully' });
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    return AddTanksComponent;
}());
AddTanksComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-add-tanks',
        template: __webpack_require__("./src/app/layout/add-tanks/add-tanks.component.html"),
        styles: [__webpack_require__("./src/app/layout/add-tanks/add-tanks.component.scss")],
        animations: [Object(__WEBPACK_IMPORTED_MODULE_1__router_animations__["a" /* routerTransition */])()]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_users_service__["a" /* UsersService */]) === "function" && _b || Object])
], AddTanksComponent);

var _a, _b;
//# sourceMappingURL=add-tanks.component.js.map

/***/ }),

/***/ "./src/app/layout/add-wells/add-wells.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl baseZIndex=\"1\" [(value)]=\"msgs\"></p-growl>\n<div [@routerTransition]>\n  <!--<app-page-header [heading]=\"'Forms'\" [icon]=\"'fa-edit'\"></app-page-header>-->\n\n  <div class=\"row\">\n    <div class=\"col-lg-6\">\n\n      <form [formGroup]=\"wellsForm\" role=\"form\" (submit)=\"addWell()\">\n        <fieldset class=\"form-group\">\n          <label>Well Name</label>\n          <input formControlName=\"well_name\" class=\"form-control\" placeholder=\"Well Name\">\n          <p *ngIf=\"wellsForm.controls['well_name'].hasError('required') && isSubmited\" class=\"error-msg\">Well Name is required.</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>well  Number</label>\n          <input formControlName=\"well_no\" class=\"form-control\" placeholder=\"Well Number\">\n          <p *ngIf=\"wellsForm.controls['well_no'].hasError('required') && isSubmited\" class=\"error-msg\">Well No. is required.</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Company Name</label>\n          <select formControlName=\"company_name\" class=\"form-control\" (change)=\"fetchPads($event)\">\n            <option value=\"null\" [selected]=true>Please select</option>\n            <option *ngFor=\"let c of compArr\" [value]=\"c._id\">{{c.company_name}}</option>\n          </select>\n          <p *ngIf=\"wellsForm.controls['company_name'].hasError('required') && isSubmited\" class=\"error-msg\">Company name is required.</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Pad Name</label>\n          <select formControlName=\"pad_name\" class=\"form-control\">\n            <option value=\"null\" [selected]=true>Please select</option>\n            <option *ngFor=\"let c of padArr\" [value]=\"c._id\">{{c.pad_name}}</option>\n          </select>\n          <p *ngIf=\"wellsForm.controls['pad_name'].hasError('required') && isSubmited\" class=\"error-msg\">Pad name is required.</p>\n        </fieldset>\n<!-- \n        <fieldset class=\"form-group\">\n          <label>Lattitude</label>\n          <input formControlName=\"lat\" type=\"text\" class=\"form-control\" placeholder=\"Lattitude\">\n          <p *ngIf=\"tanksForm.controls['lat'].hasError('required') && isSubmited\" class=\"error-msg\">Lattitude is required</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Longitude</label>\n          <input formControlName=\"long\" type=\"text\" class=\"form-control\" placeholder=\"Longitude\">\n          <p *ngIf=\"tanksForm.controls['long'].hasError('required') && isSubmited\" class=\"error-msg\">Longitude is required</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Volume</label>\n          <input formControlName=\"volume\" type=\"text\" class=\"form-control\" placeholder=\"Volume\">\n          <p *ngIf=\"tanksForm.controls['volume'].hasError('required') && isSubmited\" class=\"error-msg\">Volume is required</p>\n        </fieldset>\n\n        <fieldset class=\"form-group\">\n          <label>Type</label>\n          <input formControlName=\"type\" type=\"text\" class=\"form-control\" placeholder=\"Type\">\n          <p *ngIf=\"tanksForm.controls['type'].hasError('required') && isSubmited\" class=\"error-msg\">Type is required</p>\n        </fieldset> -->\n\n        <button type=\"submit\" class=\"btn btn-secondary\">Save</button>\n        <button type=\"reset\" class=\"btn btn-secondary\">Reset</button>\n\n      </form>\n\n    </div>\n  </div>\n  <ngx-loading [show]=\"loading\" [config]=\"{ backdropBorderRadius: '14px',fullScreenBackdrop:true }\"></ngx-loading>\n</div>"

/***/ }),

/***/ "./src/app/layout/add-wells/add-wells.component.scss":
/***/ (function(module, exports) {

module.exports = ".error-msg {\n  color: maroon; }\n"

/***/ }),

/***/ "./src/app/layout/add-wells/add-wells.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddWellsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router_animations__ = __webpack_require__("./src/app/router.animations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
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




var AddWellsComponent = (function () {
    function AddWellsComponent(fb, userService) {
        this.fb = fb;
        this.userService = userService;
        this.isSubmited = false;
        this.loading = false;
        this.compArr = [];
        this.padArr = [];
        this.msgs = [];
        this.wellsForm = this.fb.group({
            well_name: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            well_no: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            company_name: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            pad_name: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
    }
    AddWellsComponent.prototype.ngOnInit = function () {
        this.fetchCompanies();
    };
    AddWellsComponent.prototype.fetchCompanies = function () {
        var _this = this;
        this.loading = true;
        var role = this.userService.readSession().role;
        var companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        };
        this.userService.fetchCompanies(data)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.compArr = res.data;
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    AddWellsComponent.prototype.fetchPads = function (event) {
        var _this = this;
        this.loading = true;
        var companyId = event.target.value;
        this.userService.fetchPadsWithComp(companyId)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.padArr = res.data;
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    AddWellsComponent.prototype.addWell = function () {
        var _this = this;
        this.loading = true;
        if (this.wellsForm.invalid) {
            this.loading = false;
            this.isSubmited = true;
            return;
        }
        this.wellsForm.value['companyId'] = this.wellsForm.value.company_name;
        this.wellsForm.value['padId'] = this.wellsForm.value.pad_name;
        delete this.wellsForm.value.company_name;
        delete this.wellsForm.value.pad_name;
        this.userService.addWell(this.wellsForm.value)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.wellsForm.reset();
                _this.msgs = [];
                _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Well Added successfully' });
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    return AddWellsComponent;
}());
AddWellsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-add-wells',
        template: __webpack_require__("./src/app/layout/add-wells/add-wells.component.html"),
        styles: [__webpack_require__("./src/app/layout/add-wells/add-wells.component.scss")],
        animations: [Object(__WEBPACK_IMPORTED_MODULE_1__router_animations__["a" /* routerTransition */])()]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_users_service__["a" /* UsersService */]) === "function" && _b || Object])
], AddWellsComponent);

var _a, _b;
//# sourceMappingURL=add-wells.component.js.map

/***/ }),

/***/ "./src/app/layout/gis/gis.component.html":
/***/ (function(module, exports) {

module.exports = "<div  [@routerTransition]>\n<p-growl baseZIndex=\"1\" [(value)]=\"msgs\"></p-growl>\n<p-gmap [options]=\"options\" [overlays]=\"overlays\" [style]=\"{'width':'100%','height':'500px'}\" (onMapClick)=\"handleMapClick($event)\" (onOverlayClick)=\"handleOverlayClick($event)\"></p-gmap>\n</div>\n<ngx-loading [show]=\"loading\" [config]=\"{ backdropBorderRadius: '14px',fullScreenBackdrop:true }\"></ngx-loading>\n"

/***/ }),

/***/ "./src/app/layout/gis/gis.component.scss":
/***/ (function(module, exports) {

module.exports = "agm-map {\n  height: 500px; }\n"

/***/ }),

/***/ "./src/app/layout/gis/gis.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GisComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_users_service__ = __webpack_require__("./src/app/providers/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router_animations__ = __webpack_require__("./src/app/router.animations.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { AgmCoreModule } from '@agm/core';
// declare var google: any;
var GisComponent = (function () {
    function GisComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.tanksArr = [];
        this.overlays = [];
        this.gisValue = [];
        this.msgs = [];
        this.loading = false;
    }
    GisComponent.prototype.ngOnInit = function () {
        this.fetchtanks(function (v) {
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
    };
    GisComponent.prototype.fetchtanks = function (cb) {
        var _this = this;
        this.loading = true;
        var role = this.userService.readSession().role;
        var companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        };
        this.userService.fetchtanks(data)
            .then(function (res) {
            if (res.code == 200) {
                _this.gisValue = res.data;
                if (_this.gisValue == '') {
                    _this.msgs = [];
                    _this.loading = false;
                    _this.msgs.push({ severity: 'error', summary: 'error', detail: "insufficient Data" });
                }
                cb(_this.gisValue);
                res.data.forEach(function (item, index) {
                    _this.loading = false;
                    var positionArray = new Array();
                    positionArray = [new google.maps.Marker({ position: { lat: parseFloat(item.lat), lng: parseFloat(item.long) }, title: item.tank_name, cursor: item._id })];
                    _this.overlays = _this.overlays.concat(positionArray);
                });
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    //new code
    GisComponent.prototype.handleMapClick = function (event) {
        //event: MouseEvent of Google Maps api
    };
    GisComponent.prototype.handleOverlayClick = function (event) {
        this.router.navigate(['/view-transactions/' + event.overlay.cursor]);
    };
    return GisComponent;
}());
GisComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-gis',
        template: __webpack_require__("./src/app/layout/gis/gis.component.html"),
        styles: [__webpack_require__("./src/app/layout/gis/gis.component.scss")],
        animations: [Object(__WEBPACK_IMPORTED_MODULE_3__router_animations__["a" /* routerTransition */])()]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _b || Object])
], GisComponent);

var _a, _b;
//# sourceMappingURL=gis.component.js.map

/***/ }),

/***/ "./src/app/layout/layout-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout_component__ = __webpack_require__("./src/app/layout/layout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__add_company_admin_add_company_admin_component__ = __webpack_require__("./src/app/layout/add-company-admin/add-company-admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__add_hauler_admin_add_hauler_admin_component__ = __webpack_require__("./src/app/layout/add-hauler-admin/add-hauler-admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__add_company_user_add_company_user_component__ = __webpack_require__("./src/app/layout/add-company-user/add-company-user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__add_hauler_user_add_hauler_user_component__ = __webpack_require__("./src/app/layout/add-hauler-user/add-hauler-user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__add_pads_add_pads_component__ = __webpack_require__("./src/app/layout/add-pads/add-pads.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__add_tanks_add_tanks_component__ = __webpack_require__("./src/app/layout/add-tanks/add-tanks.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__view_company_view_company_component__ = __webpack_require__("./src/app/layout/view-company/view-company.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__view_company_users_view_company_users_component__ = __webpack_require__("./src/app/layout/view-company-users/view-company-users.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__view_hauler_admins_view_hauler_admins_component__ = __webpack_require__("./src/app/layout/view-hauler-admins/view-hauler-admins.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__view_hauler_user_view_hauler_user_component__ = __webpack_require__("./src/app/layout/view-hauler-user/view-hauler-user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__view_wells_view_wells_component__ = __webpack_require__("./src/app/layout/view-wells/view-wells.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__add_wells_add_wells_component__ = __webpack_require__("./src/app/layout/add-wells/add-wells.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__view_well_view_well_component__ = __webpack_require__("./src/app/layout/view-well/view-well.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__view_pads_view_pads_component__ = __webpack_require__("./src/app/layout/view-pads/view-pads.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__gis_gis_component__ = __webpack_require__("./src/app/layout/gis/gis.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__transactions_transactions_component__ = __webpack_require__("./src/app/layout/transactions/transactions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__view_transactions_view_transactions_component__ = __webpack_require__("./src/app/layout/view-transactions/view-transactions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__view_image_view_image_component__ = __webpack_require__("./src/app/layout/view-image/view-image.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__viewlog_viewlog_component__ = __webpack_require__("./src/app/layout/viewlog/viewlog.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















var routes = [
    {
        path: '', component: __WEBPACK_IMPORTED_MODULE_2__layout_component__["a" /* LayoutComponent */],
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'add-company-admin', component: __WEBPACK_IMPORTED_MODULE_3__add_company_admin_add_company_admin_component__["a" /* AddCompanyAdminComponent */] },
            { path: 'add-hauler-admin', component: __WEBPACK_IMPORTED_MODULE_4__add_hauler_admin_add_hauler_admin_component__["a" /* AddHaulerAdminComponent */] },
            { path: 'add-company-user', component: __WEBPACK_IMPORTED_MODULE_5__add_company_user_add_company_user_component__["a" /* AddCompanyUserComponent */] },
            { path: 'add-hauler-user', component: __WEBPACK_IMPORTED_MODULE_6__add_hauler_user_add_hauler_user_component__["a" /* AddHaulerUserComponent */] },
            { path: 'add-pads', component: __WEBPACK_IMPORTED_MODULE_7__add_pads_add_pads_component__["a" /* AddPadsComponent */] },
            { path: 'view-pads', component: __WEBPACK_IMPORTED_MODULE_16__view_pads_view_pads_component__["a" /* ViewPadsComponent */] },
            { path: 'add-tanks', component: __WEBPACK_IMPORTED_MODULE_8__add_tanks_add_tanks_component__["a" /* AddTanksComponent */] },
            { path: 'add-wells', component: __WEBPACK_IMPORTED_MODULE_14__add_wells_add_wells_component__["a" /* AddWellsComponent */] },
            { path: 'gis', component: __WEBPACK_IMPORTED_MODULE_17__gis_gis_component__["a" /* GisComponent */] },
            { path: 'view-wells', component: __WEBPACK_IMPORTED_MODULE_15__view_well_view_well_component__["a" /* ViewWellComponent */] },
            { path: 'view-company-admin', component: __WEBPACK_IMPORTED_MODULE_9__view_company_view_company_component__["a" /* ViewCompanyComponent */] },
            { path: 'view-company-users', component: __WEBPACK_IMPORTED_MODULE_10__view_company_users_view_company_users_component__["a" /* ViewCompanyUsersComponent */] },
            { path: 'view-hauler-admin', component: __WEBPACK_IMPORTED_MODULE_11__view_hauler_admins_view_hauler_admins_component__["a" /* ViewHaulerAdminsComponent */] },
            { path: 'view-hauler-user', component: __WEBPACK_IMPORTED_MODULE_12__view_hauler_user_view_hauler_user_component__["a" /* ViewHaulerUserComponent */] },
            { path: 'view-tanks', component: __WEBPACK_IMPORTED_MODULE_13__view_wells_view_wells_component__["a" /* ViewWellsComponent */] },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'view-transactions/:id', component: __WEBPACK_IMPORTED_MODULE_18__transactions_transactions_component__["a" /* TransactionsComponent */] },
            { path: 'view-transactions-Details', component: __WEBPACK_IMPORTED_MODULE_19__view_transactions_view_transactions_component__["a" /* ViewTransactionsComponent */] },
            { path: 'view-image/:id', component: __WEBPACK_IMPORTED_MODULE_20__view_image_view_image_component__["a" /* ViewImageComponent */] },
            { path: 'viewlog', component: __WEBPACK_IMPORTED_MODULE_21__viewlog_viewlog_component__["a" /* ViewlogComponent */] },
        ]
    }
];
var LayoutRoutingModule = (function () {
    function LayoutRoutingModule() {
    }
    return LayoutRoutingModule;
}());
LayoutRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
    })
], LayoutRoutingModule);

//# sourceMappingURL=layout-routing.module.js.map

/***/ }),

/***/ "./src/app/layout/layout.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n<app-sidebar></app-sidebar>\n<section class=\"main-container\">\n    <router-outlet></router-outlet>\n</section>\n"

/***/ }),

/***/ "./src/app/layout/layout.component.scss":
/***/ (function(module, exports) {

module.exports = ".main-container {\n  margin-top: 60px;\n  margin-left: 235px;\n  padding: 15px;\n  -ms-overflow-x: hidden;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  position: relative;\n  overflow: hidden; }\n\n@media screen and (max-width: 992px) {\n  .main-container {\n    margin-left: 0px !important; } }\n"

/***/ }),

/***/ "./src/app/layout/layout.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LayoutComponent = (function () {
    function LayoutComponent(router) {
        this.router = router;
    }
    LayoutComponent.prototype.ngOnInit = function () {
        if (this.router.url === '/') {
            this.router.navigate(['/dashboard']);
        }
    };
    return LayoutComponent;
}());
LayoutComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-layout',
        template: __webpack_require__("./src/app/layout/layout.component.html"),
        styles: [__webpack_require__("./src/app/layout/layout.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _a || Object])
], LayoutComponent);

var _a;
//# sourceMappingURL=layout.component.js.map

/***/ }),

/***/ "./src/app/layout/layout.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutModule", function() { return LayoutModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__layout_routing_module__ = __webpack_require__("./src/app/layout/layout-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__layout_component__ = __webpack_require__("./src/app/layout/layout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared__ = __webpack_require__("./src/app/shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__add_company_admin_add_company_admin_component__ = __webpack_require__("./src/app/layout/add-company-admin/add-company-admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__add_hauler_admin_add_hauler_admin_component__ = __webpack_require__("./src/app/layout/add-hauler-admin/add-hauler-admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__add_company_user_add_company_user_component__ = __webpack_require__("./src/app/layout/add-company-user/add-company-user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__add_hauler_user_add_hauler_user_component__ = __webpack_require__("./src/app/layout/add-hauler-user/add-hauler-user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__add_pads_add_pads_component__ = __webpack_require__("./src/app/layout/add-pads/add-pads.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__add_tanks_add_tanks_component__ = __webpack_require__("./src/app/layout/add-tanks/add-tanks.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__view_company_view_company_component__ = __webpack_require__("./src/app/layout/view-company/view-company.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ngx_loading__ = __webpack_require__("./node_modules/ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__view_company_users_view_company_users_component__ = __webpack_require__("./src/app/layout/view-company-users/view-company-users.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__view_hauler_admins_view_hauler_admins_component__ = __webpack_require__("./src/app/layout/view-hauler-admins/view-hauler-admins.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__view_hauler_user_view_hauler_user_component__ = __webpack_require__("./src/app/layout/view-hauler-user/view-hauler-user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ngx_phone_mask__ = __webpack_require__("./node_modules/ngx-phone-mask/ngx-phone-mask/ngx-phone-mask.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__shared_pipes_phone_no_pipe__ = __webpack_require__("./src/app/shared/pipes/phone-no.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__view_pads_view_pads_component__ = __webpack_require__("./src/app/layout/view-pads/view-pads.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__add_wells_add_wells_component__ = __webpack_require__("./src/app/layout/add-wells/add-wells.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__view_wells_view_wells_component__ = __webpack_require__("./src/app/layout/view-wells/view-wells.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_angular2_image_upload__ = __webpack_require__("./node_modules/angular2-image-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__view_well_view_well_component__ = __webpack_require__("./src/app/layout/view-well/view-well.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__gis_gis_component__ = __webpack_require__("./src/app/layout/gis/gis.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__transactions_transactions_component__ = __webpack_require__("./src/app/layout/transactions/transactions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ngui_map__ = __webpack_require__("./node_modules/@ngui/map/dist/@ngui/map.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__view_transactions_view_transactions_component__ = __webpack_require__("./src/app/layout/view-transactions/view-transactions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__view_image_view_image_component__ = __webpack_require__("./src/app/layout/view-image/view-image.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__viewlog_viewlog_component__ = __webpack_require__("./src/app/layout/viewlog/viewlog.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




























//import { ImageUploadModule } from 'ng2-imageupload';



//import { GisComponent } from './gis.component';
//import { AgmCoreModule } from '@agm/core';
// import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';








// import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';
var LayoutModule = (function () {
    function LayoutModule() {
    }
    return LayoutModule;
}());
LayoutModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["d" /* NgbDropdownModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_5__layout_routing_module__["a" /* LayoutRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["ReactiveFormsModule"], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_15_primeng_primeng__["DataTableModule"], __WEBPACK_IMPORTED_MODULE_15_primeng_primeng__["SharedModule"], __WEBPACK_IMPORTED_MODULE_15_primeng_primeng__["ButtonModule"], __WEBPACK_IMPORTED_MODULE_15_primeng_primeng__["TooltipModule"], __WEBPACK_IMPORTED_MODULE_15_primeng_primeng__["ConfirmDialogModule"], __WEBPACK_IMPORTED_MODULE_15_primeng_primeng__["GrowlModule"], __WEBPACK_IMPORTED_MODULE_15_primeng_primeng__["OverlayPanelModule"], __WEBPACK_IMPORTED_MODULE_15_primeng_primeng__["DialogModule"],
            __WEBPACK_IMPORTED_MODULE_16_ngx_loading__["a" /* LoadingModule */],
            __WEBPACK_IMPORTED_MODULE_20_ngx_phone_mask__["a" /* NgxPhoneMaskModule */],
            __WEBPACK_IMPORTED_MODULE_15_primeng_primeng__["GMapModule"],
            __WEBPACK_IMPORTED_MODULE_15_primeng_primeng__["PaginatorModule"], __WEBPACK_IMPORTED_MODULE_15_primeng_primeng__["LightboxModule"], __WEBPACK_IMPORTED_MODULE_15_primeng_primeng__["CarouselModule"],
            __WEBPACK_IMPORTED_MODULE_25_angular2_image_upload__["a" /* ImageUploadModule */].forRoot(),
            // AgmCoreModule.forRoot({
            //     apiKey: 'AIzaSyDaRY14n8VMUdDaVFGgz7sui9jgKOWYcLo'
            // }),
            __WEBPACK_IMPORTED_MODULE_29__ngui_map__["a" /* NguiMapModule */].forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDaRY14n8VMUdDaVFGgz7sui9jgKOWYcLo' })
            // AgmSnazzyInfoWindowModule
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__layout_component__["a" /* LayoutComponent */],
            __WEBPACK_IMPORTED_MODULE_7__shared__["b" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_7__shared__["d" /* SidebarComponent */],
            __WEBPACK_IMPORTED_MODULE_8__add_company_admin_add_company_admin_component__["a" /* AddCompanyAdminComponent */],
            __WEBPACK_IMPORTED_MODULE_9__add_hauler_admin_add_hauler_admin_component__["a" /* AddHaulerAdminComponent */],
            __WEBPACK_IMPORTED_MODULE_10__add_company_user_add_company_user_component__["a" /* AddCompanyUserComponent */],
            __WEBPACK_IMPORTED_MODULE_11__add_hauler_user_add_hauler_user_component__["a" /* AddHaulerUserComponent */],
            __WEBPACK_IMPORTED_MODULE_12__add_pads_add_pads_component__["a" /* AddPadsComponent */],
            __WEBPACK_IMPORTED_MODULE_13__add_tanks_add_tanks_component__["a" /* AddTanksComponent */],
            __WEBPACK_IMPORTED_MODULE_14__view_company_view_company_component__["a" /* ViewCompanyComponent */],
            __WEBPACK_IMPORTED_MODULE_17__view_company_users_view_company_users_component__["a" /* ViewCompanyUsersComponent */],
            __WEBPACK_IMPORTED_MODULE_18__view_hauler_admins_view_hauler_admins_component__["a" /* ViewHaulerAdminsComponent */],
            __WEBPACK_IMPORTED_MODULE_19__view_hauler_user_view_hauler_user_component__["a" /* ViewHaulerUserComponent */],
            __WEBPACK_IMPORTED_MODULE_21__shared_pipes_phone_no_pipe__["a" /* PhoneNoPipe */],
            __WEBPACK_IMPORTED_MODULE_22__view_pads_view_pads_component__["a" /* ViewPadsComponent */],
            __WEBPACK_IMPORTED_MODULE_23__add_wells_add_wells_component__["a" /* AddWellsComponent */],
            __WEBPACK_IMPORTED_MODULE_24__view_wells_view_wells_component__["a" /* ViewWellsComponent */],
            __WEBPACK_IMPORTED_MODULE_26__view_well_view_well_component__["a" /* ViewWellComponent */],
            __WEBPACK_IMPORTED_MODULE_27__gis_gis_component__["a" /* GisComponent */],
            __WEBPACK_IMPORTED_MODULE_28__transactions_transactions_component__["a" /* TransactionsComponent */],
            __WEBPACK_IMPORTED_MODULE_30__view_transactions_view_transactions_component__["a" /* ViewTransactionsComponent */],
            __WEBPACK_IMPORTED_MODULE_31__view_image_view_image_component__["a" /* ViewImageComponent */],
            __WEBPACK_IMPORTED_MODULE_32__viewlog_viewlog_component__["a" /* ViewlogComponent */]
            // ViewTransactionsComponent
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["DatePipe"], __WEBPACK_IMPORTED_MODULE_15_primeng_primeng__["ConfirmationService"]]
    })
], LayoutModule);

//# sourceMappingURL=layout.module.js.map

/***/ }),

/***/ "./src/app/layout/transactions/transactions.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl baseZIndex=\"1\" [(value)]=\"msgs\"></p-growl>\n<p-dataTable [value]=\"transactionData\">\n  <p-column field=\"volume\" header=\"Volume\"></p-column>\n  <p-column field=\"invoice_no\" header=\"Invoice Number\"></p-column>\n  <p-column field=\"padId.pad_name\" header=\"Pad Name\"></p-column>\n<p-column field=\"hauler_id.full_name\" header=\"Hauler name\"></p-column>\n<p-column field=\"tank_id.tank_name\" header=\"Tank Name\"></p-column>\n<p-column field=\"hauler_id.company_name\" header=\"Company Name\"></p-column>\n<p-column>\n <ng-template pTemplate=\"header\">\n   Transaction Date\n </ng-template>\n <ng-template let-user=\"rowData\" pTemplate=\"body\">\n   {{user.created_at|date: 'dd/MM/yyyy'}} {{user.created_at|date: 'hh:MM:ss'}}\n </ng-template>\n \n</p-column>\n</p-dataTable>\n<p-confirmDialog header=\"Confirmation\" icon=\"fa fa-question-circle\" width=\"425\"></p-confirmDialog>\n\n<ngx-loading [show]=\"loading\" [config]=\"{ backdropBorderRadius: '14px',fullScreenBackdrop:true }\"></ngx-loading>"

/***/ }),

/***/ "./src/app/layout/transactions/transactions.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/transactions/transactions.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionsComponent; });
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



var TransactionsComponent = (function () {
    function TransactionsComponent(userService, router, route) {
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.transactionData = [];
        this.msgs = [];
    }
    TransactionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            // console.log('params=====',params);
            console.log('paramsId==', params['id']);
            if (params['id']) {
                _this.fetchtranc(params['id']);
            }
        });
    };
    TransactionsComponent.prototype.fetchtranc = function (tankId) {
        var _this = this;
        this.userService.fetchtranc(tankId)
            .then(function (res) {
            if (res.code == 200) {
                _this.transactionData = res.data;
                // console.log('this.transactionData',this.transactionData);
            }
            else {
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
            }
        });
    };
    return TransactionsComponent;
}());
TransactionsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-transactions',
        template: __webpack_require__("./src/app/layout/transactions/transactions.component.html"),
        styles: [__webpack_require__("./src/app/layout/transactions/transactions.component.scss")],
        providers: [__WEBPACK_IMPORTED_MODULE_2__providers_users_service__["a" /* UsersService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _c || Object])
], TransactionsComponent);

var _a, _b, _c;
//# sourceMappingURL=transactions.component.js.map

/***/ }),

/***/ "./src/app/layout/view-company-users/view-company-users.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl baseZIndex=\"1\" [(value)]=\"msgs\"></p-growl>\n<p-dataTable [tableStyle]=\"{'table-layout':'auto'}\"[value]=\"compUserArr\">\n  \n  <p-column field=\"full_name\" header=\"Full Name\"></p-column>\n  <p-column [styleClass]=\"adjust\" field=\"email\" header=\"Email\"></p-column>\n  <p-column>\n    <ng-template pTemplate=\"header\">\n      createdAt\n    </ng-template>\n    <ng-template let-user=\"rowData\" pTemplate=\"body\">\n      {{user.created_at|date: 'dd/MM/yyyy'}}\n    </ng-template>\n  </p-column>\n    <p-column>\n    <ng-template pTemplate=\"header\">\n      Phone No\n    </ng-template>\n    <ng-template let-user=\"rowData\" pTemplate=\"body\">\n      {{user.phone_no|phoneNo}}\n    </ng-template>\n  </p-column>\n  <p-column>\n    <ng-template pTemplate=\"header\">\n      Action\n    </ng-template>\n   \n    <ng-template let-user=\"rowData\" pTemplate=\"body\">\n      <i [ngClass]=\"user.status == 1?'fa fa-user':'fa fa-user-times'\" aria-hidden=\"true\" (click)=\"user.status == 1?disableCompany(user._id):enableCompany(user._id)\"\n        [pTooltip]=\"user.status == 1 ? 'Disable Company' : 'Enable Company'\" tooltipPosition=\"bottom\"></i>&nbsp;&nbsp;\n      <i class=\"fa fa-trash\" aria-hidden=\"true\" (click)=\"deleteCompany(user._id)\" pTooltip=\"Delete Company\" tooltipPosition=\"bottom\"></i>&nbsp;&nbsp;\n      <i class=\"fa fa-pencil\" aria-hidden=\"true\" pTooltip=\"Edit company user\"(click)=\"editUser(user._id)\" tooltipPosition=\"bottom\"></i>\n    </ng-template>\n  </p-column>\n</p-dataTable>\n<!-- <p-paginator [rows]=\"20\" [totalRecords]=\"60\" (onPageChange)=\"paginate($event)\"></p-paginator> -->\n<p-paginator rows=\"20\" totalRecords=\"{{records}}\" pageLinkSize=\"3\" (onPageChange)=\"paginate($event)\"\n></p-paginator>\n<p-confirmDialog header=\"Confirmation\" icon=\"fa fa-question-circle\" width=\"425\"></p-confirmDialog>\n<ngx-loading [show]=\"loading\" [config]=\"{ backdropBorderRadius: '14px',fullScreenBackdrop:true }\"></ngx-loading>\n\n<p-dialog header=\"Edit Company user\" [(visible)]=\"display\" modal=\"modal\" height=\"400\" width=\"400\" [responsive]=\"true\">\n\n  Name:\n    <td>\n        <input type=\"text\" [(ngModel)]=\"userDetails.full_name\" />\n    </td><br>\n    Email:\n    <td>\n        <input type=\"text\"[(ngModel)]=\"userDetails.email\" />\n    </td><br>\n    Phone Number:\n    <td>\n        <input type=\"text\" [(ngModel)]=\"userDetails.phone_no\" />\n    </td><br>\n    <td>\n        <input type=\"button\" (click)=\"backClicked()\" value=\"update\" (click)=\"updateUser(userDetails)\" class=\"btn btn-success\" />\n    </td>\n    <td>\n        <input type=\"button\" value=\"Cancel\" (click)=\"cancel()\" class=\"btn btn-warning\" />\n    </td>\n \n</p-dialog>\n\n<!-- <button type=\"button\" [(visible)]=\"display\" (click)=\"showDialog()\" pButton icon=\"fa-external-link-square\" label=\"Show\"></button> -->"

/***/ }),

/***/ "./src/app/layout/view-company-users/view-company-users.component.scss":
/***/ (function(module, exports) {

module.exports = ".adjust {\n  display: block;\n  word-break: break-all; }\n"

/***/ }),

/***/ "./src/app/layout/view-company-users/view-company-users.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewCompanyUsersComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_users_service__ = __webpack_require__("./src/app/providers/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_primeng_primeng__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ViewCompanyUsersComponent = (function () {
    function ViewCompanyUsersComponent(userService, confirmationService, router, route, _location) {
        this.userService = userService;
        this.confirmationService = confirmationService;
        this.router = router;
        this.route = route;
        this._location = _location;
        this.compUserArr = [];
        this.userDetails = [];
        this.loading = false;
        this.msgs = [];
        this.display = false;
        this.records = [];
        this.users = [];
    }
    ViewCompanyUsersComponent.prototype.ngOnInit = function () {
        this.fetchCompanyUsers(0, 20);
    };
    ViewCompanyUsersComponent.prototype.fetchCompanyUsers = function (offset, rows) {
        var _this = this;
        // let userdata = {offset: offset, rows: rows, type: 'user'}
        var role = this.userService.readSession().role;
        var companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId,
            offset: offset, rows: rows, type: 'user'
        };
        this.loading = true;
        this.userService.fetchCompanyUsers(data)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.compUserArr = res.data;
                _this.records = res.count;
                //this.users = res.data;
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    ViewCompanyUsersComponent.prototype.paginate = function (event) {
        console.log('in event', event);
        var offset = event.first;
        var rows = event.rows;
        this.fetchCompanyUsers(offset, rows);
    };
    ViewCompanyUsersComponent.prototype.disableCompany = function (userId) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to disable this company user?',
            accept: function () {
                _this.loading = true;
                //console.log(userId);
                _this.userService.disableUser(userId)
                    .then(function (res) {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Company user disabled successfully' });
                        _this.fetchCompanyUsers(0, 20);
                    }
                    else {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
                    }
                });
            }
        });
    };
    ViewCompanyUsersComponent.prototype.enableCompany = function (userId) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to enable this company user?',
            accept: function () {
                _this.loading = true;
                // console.log(userId);
                _this.userService.enableUser(userId)
                    .then(function (res) {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.fetchCompanyUsers(0, 20);
                        _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Company user enabled successfully' });
                    }
                    else {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
                    }
                });
            }
        });
    };
    ViewCompanyUsersComponent.prototype.deleteCompany = function (userId) {
        var _this = this;
        // console.log("userId in deletecompany",userId);
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this company user?',
            accept: function () {
                _this.loading = true;
                _this.userService.deleteUser(userId)
                    .then(function (res) {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.fetchCompanyUsers(0, 20);
                        _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Company user deleted successfully' });
                    }
                    else {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
                    }
                });
            }
        });
    };
    ViewCompanyUsersComponent.prototype.editUser = function (userId) {
        var _this = this;
        this.display = true;
        // console.log('userID==',userId);
        this.userService.editUser(userId)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.userDetails = res.data;
                // console.log('res.data===',this.userDetails);
            }
            else {
                //console.log('inside else');
                _this.loading = false;
            }
        });
    };
    ViewCompanyUsersComponent.prototype.updateUser = function (userDetails) {
        var _this = this;
        this.display = true;
        // console.log('userDetails==',userDetails);
        this.userService.updateUser(userDetails)
            .then(function (res) {
            if (res.code == 200) {
                _this.userDetails = res.data;
                _this.display = false;
                _this.loading = false;
                // console.log('this.router.navigate==',this.router.navigate);
                //this.router.navigate(['/view-company-users']);
                // console.log('user Details update succesfully');
                _this.fetchCompanyUsers(0, 20);
            }
            else {
                console.log('inside else');
                _this.loading = false;
            }
        });
    };
    ViewCompanyUsersComponent.prototype.cancel = function () {
        // console.log('userDetails in cancel',this.userDetails);
        this.display = false;
    };
    return ViewCompanyUsersComponent;
}());
ViewCompanyUsersComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-view-company-users',
        template: __webpack_require__("./src/app/layout/view-company-users/view-company-users.component.html"),
        styles: [__webpack_require__("./src/app/layout/view-company-users/view-company-users.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["ConfirmationService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["ConfirmationService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common__["Location"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common__["Location"]) === "function" && _e || Object])
], ViewCompanyUsersComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=view-company-users.component.js.map

/***/ }),

/***/ "./src/app/layout/view-company/view-company.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl baseZIndex=\"1\" [(value)]=\"msgs\"></p-growl>\n<p-dataTable [tableStyle]=\"{'table-layout':'auto'}\" [value]=\"compArr\">\n  <p-column field=\"full_name\" header=\"Full Name\"></p-column>\n  <p-column field=\"email\" header=\"Email\"></p-column>\\\n\n  <p-column>\n    <ng-template pTemplate=\"header\">\n      createdAt\n    </ng-template>\n    <ng-template let-user=\"rowData\" pTemplate=\"body\">\n      {{user.created_at|date: 'dd/MM/yyyy'}}\n    </ng-template>\n  </p-column>\n\n  <p-column>\n    <ng-template pTemplate=\"header\">\n      Phone No\n    </ng-template>\n    <ng-template let-user=\"rowData\" pTemplate=\"body\">\n      {{user.phone_no|phoneNo}}\n    </ng-template>\n  </p-column>\n\n  <!--<p-column field=\"phone_no\" header=\"Phone No\"></p-column>-->\n  <p-column>\n    <ng-template pTemplate=\"header\">\n      Action\n    </ng-template>\n    <ng-template let-user=\"rowData\" pTemplate=\"body\">\n      <i [ngClass]=\"user.status == 1?'fa fa-user':'fa fa-user-times'\" aria-hidden=\"true\" (click)=\"user.status == 1?disableCompany(user._id):enableCompany(user._id)\"\n        [pTooltip]=\"user.status == 1 ? 'Disable Company' : 'Enable Company'\" tooltipPosition=\"bottom\"></i>&nbsp;&nbsp;\n      <i class=\"fa fa-trash\" aria-hidden=\"true\" (click)=\"deleteCompany(user._id)\" pTooltip=\"Delete Company\" tooltipPosition=\"bottom\"></i>&nbsp;&nbsp;\n      <i class=\"fa fa-pencil\" aria-hidden=\"true\" pTooltip=\"Edit Company\" (click)=\"editUser(user._id)\"tooltipPosition=\"bottom\"></i>\n    </ng-template>\n  </p-column>\n</p-dataTable>\n<p-paginator rows=\"20\" totalRecords=\"{{records}}\" pageLinkSize=\"3\" (onPageChange)=\"paginate($event)\"\n></p-paginator>\n<p-confirmDialog header=\"Confirmation\" icon=\"fa fa-question-circle\" width=\"425\"></p-confirmDialog>\n\n<ngx-loading [show]=\"loading\" [config]=\"{ backdropBorderRadius: '14px',fullScreenBackdrop:true }\"></ngx-loading>\n\n<p-dialog header=\"Edit Company user\" [(visible)]=\"display\" modal=\"modal\" height=\"400\" width=\"400\" [responsive]=\"true\">\n  \n    Name:\n      <td>\n          <input type=\"text\" [(ngModel)]=\"userDetails.full_name\" />\n      </td><br>\n      Email:\n      <td>\n          <input type=\"text\"[(ngModel)]=\"userDetails.email\" />\n      </td><br>\n      Phone Number:\n      <td>\n          <input type=\"text\" [(ngModel)]=\"userDetails.phone_no\" />\n      </td><br>\n      <td>\n          <input type=\"button\" value=\"update\" (click)=\"updateUser(userDetails)\" class=\"btn btn-success\" />\n      </td>\n      <td>\n          <input type=\"button\" value=\"Cancel\" (click)=\"cancel()\" class=\"btn btn-warning\" />\n      </td>\n   \n  </p-dialog>"

/***/ }),

/***/ "./src/app/layout/view-company/view-company.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/view-company/view-company.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewCompanyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_users_service__ = __webpack_require__("./src/app/providers/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_primeng_primeng__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ViewCompanyComponent = (function () {
    function ViewCompanyComponent(userService, confirmationService, router, route, _location) {
        this.userService = userService;
        this.confirmationService = confirmationService;
        this.router = router;
        this.route = route;
        this._location = _location;
        this.compArr = [];
        this.loading = false;
        this.msgs = [];
        this.display = false;
        this.userDetails = [];
        this.records = [];
        this.users = [];
    }
    ViewCompanyComponent.prototype.ngOnInit = function () {
        this.fetchCompanies(0, 20);
    };
    ViewCompanyComponent.prototype.fetchCompanies = function (offset, rows) {
        var _this = this;
        console.log('offset', offset);
        console.log('offset', rows);
        var role = this.userService.readSession().role;
        var companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId, offset: offset, rows: rows, type: 'user'
        };
        this.loading = true;
        this.userService.fetchCompanies(data)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.compArr = res.data;
                _this.records = res.count;
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    ViewCompanyComponent.prototype.paginate = function (event) {
        console.log('in event', event);
        var offset = event.first;
        var rows = event.rows;
        this.fetchCompanies(offset, rows);
    };
    ViewCompanyComponent.prototype.disableCompany = function (userId) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to disable this company?',
            accept: function () {
                _this.loading = true;
                console.log(userId);
                _this.userService.disableUser(userId)
                    .then(function (res) {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Company disabled successfully' });
                        _this.fetchCompanies(0, 20);
                    }
                    else {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
                    }
                });
            }
        });
    };
    ViewCompanyComponent.prototype.enableCompany = function (userId) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to enable this company?',
            accept: function () {
                _this.loading = true;
                console.log(userId);
                _this.userService.enableUser(userId)
                    .then(function (res) {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.fetchCompanies(0, 20);
                        _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Company enabled successfully' });
                    }
                    else {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
                    }
                });
            }
        });
    };
    ViewCompanyComponent.prototype.deleteCompany = function (userId) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this company?',
            accept: function () {
                _this.loading = true;
                _this.userService.deleteUser(userId)
                    .then(function (res) {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.fetchCompanies(0, 20);
                        _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Company deleted successfully' });
                    }
                    else {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
                    }
                });
            }
        });
    };
    ViewCompanyComponent.prototype.editUser = function (userId) {
        var _this = this;
        this.display = true;
        // console.log('userID==',userId);
        this.userService.editUser(userId)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.userDetails = res.data;
                // console.log('res.data===',this.userDetails);
            }
            else {
                //console.log('inside else');
                _this.loading = false;
            }
        });
    };
    ViewCompanyComponent.prototype.updateUser = function (userDetails) {
        var _this = this;
        this.display = true;
        // console.log('userDetails==',userDetails);
        this.userService.updateUser(userDetails)
            .then(function (res) {
            if (res.code == 200) {
                _this.userDetails = res.data;
                _this.display = false;
                _this.loading = false;
                _this.fetchCompanies(0, 20);
                // console.log('this.router.navigate==', this.router.navigate);
                // this.router.navigate(['/view-company-users']);
                // console.log('user Details update succesfully');
            }
            else {
                console.log('inside else');
                _this.loading = false;
            }
        });
    };
    ViewCompanyComponent.prototype.cancel = function () {
        // console.log('userDetails in cancel',this.userDetails);
        this.display = false;
    };
    return ViewCompanyComponent;
}());
ViewCompanyComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-view-company',
        template: __webpack_require__("./src/app/layout/view-company/view-company.component.html"),
        styles: [__webpack_require__("./src/app/layout/view-company/view-company.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["ConfirmationService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["ConfirmationService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common__["Location"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common__["Location"]) === "function" && _e || Object])
], ViewCompanyComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=view-company.component.js.map

/***/ }),

/***/ "./src/app/layout/view-hauler-admins/view-hauler-admins.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl baseZIndex=\"1\" [(value)]=\"msgs\"></p-growl>\n<p-dataTable [tableStyle]=\"{'table-layout':'auto'}\" [value]=\"haulerArr\">\n  <p-column field=\"full_name\" header=\"Full Name\"></p-column>\n  <p-column field=\"email\" header=\"Email\"></p-column>\n  <p-column>\n    <ng-template pTemplate=\"header\">\n      createdAt\n    </ng-template>\n    <ng-template let-user=\"rowData\" pTemplate=\"body\">\n      {{user.created_at|date: 'dd/MM/yyyy'}}\n    </ng-template>\n  </p-column>\n   <p-column>\n    <ng-template pTemplate=\"header\">\n      Phone No\n    </ng-template>\n    <ng-template let-user=\"rowData\" pTemplate=\"body\">\n      {{user.phone_no|phoneNo}}\n    </ng-template>\n  </p-column>\n  <p-column>\n    <ng-template pTemplate=\"header\">\n      Action\n    </ng-template>\n    <ng-template let-user=\"rowData\" pTemplate=\"body\">\n      <i [ngClass]=\"user.status == 1?'fa fa-user':'fa fa-user-times'\" aria-hidden=\"true\" (click)=\"user.status == 1?disableCompany(user._id):enableCompany(user._id)\"\n        [pTooltip]=\"user.status == 1 ? 'Disable Company' : 'Enable Company'\" tooltipPosition=\"bottom\"></i>&nbsp;&nbsp;\n      <i class=\"fa fa-trash\" aria-hidden=\"true\" (click)=\"deleteCompany(user._id)\" pTooltip=\"Delete Company\" tooltipPosition=\"bottom\"></i>&nbsp;&nbsp;\n      <i class=\"fa fa-pencil\" aria-hidden=\"true\" pTooltip=\"Edit Company\"(click)=\"editUser(user._id)\" tooltipPosition=\"bottom\"></i>\n    </ng-template>\n  </p-column>\n</p-dataTable>\n<p-paginator rows=\"2\" totalRecords=\"{{records}}\" pageLinkSize=\"3\" (onPageChange)=\"paginate($event)\"\n></p-paginator>\n<p-confirmDialog header=\"Confirmation\" icon=\"fa fa-question-circle\" width=\"425\"></p-confirmDialog>\n\n<ngx-loading [show]=\"loading\" [config]=\"{ backdropBorderRadius: '14px',fullScreenBackdrop:true }\"></ngx-loading>\n\n\n<p-dialog header=\"Edit Company user\" [(visible)]=\"display\" modal=\"modal\" height=\"400\" width=\"400\" [responsive]=\"true\">\n  \n    Name:\n      <td>\n          <input type=\"text\" [(ngModel)]=\"userDetails.full_name\" />\n      </td><br>\n      Email:\n      <td>\n          <input type=\"text\"[(ngModel)]=\"userDetails.email\" />\n      </td><br>\n      Phone Number:\n      <td>\n          <input type=\"text\" [(ngModel)]=\"userDetails.phone_no\" />\n      </td><br>\n      <td>\n          <input type=\"button\" value=\"update\" (click)=\"updateUser(userDetails)\" class=\"btn btn-success\" />\n      </td>\n      <td>\n          <input type=\"button\" value=\"Cancel\" (click)=\"cancel()\" class=\"btn btn-warning\" />\n      </td>\n   \n  </p-dialog>"

/***/ }),

/***/ "./src/app/layout/view-hauler-admins/view-hauler-admins.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/view-hauler-admins/view-hauler-admins.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewHaulerAdminsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_users_service__ = __webpack_require__("./src/app/providers/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_primeng_primeng__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ViewHaulerAdminsComponent = (function () {
    function ViewHaulerAdminsComponent(userService, router, confirmationService, route, _location) {
        this.userService = userService;
        this.router = router;
        this.confirmationService = confirmationService;
        this.route = route;
        this._location = _location;
        this.haulerArr = [];
        this.loading = false;
        this.msgs = [];
        this.display = false;
        this.userDetails = [];
        this.records = [];
        this.users = [];
    }
    ViewHaulerAdminsComponent.prototype.ngOnInit = function () {
        this.fetchHaulers(0, 20);
    };
    ViewHaulerAdminsComponent.prototype.fetchHaulers = function (offset, rows) {
        var _this = this;
        var role = this.userService.readSession().role;
        var companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId,
            offset: offset, rows: rows, type: 'user'
        };
        this.loading = true;
        this.userService.fetchHaulers(data)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.haulerArr = res.data;
                _this.records = res.count;
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    ViewHaulerAdminsComponent.prototype.paginate = function (event) {
        console.log('in event', event);
        var offset = event.first;
        var rows = event.rows;
        this.fetchHaulers(offset, rows);
    };
    ViewHaulerAdminsComponent.prototype.disableCompany = function (userId) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to disable this hauler admin?',
            accept: function () {
                _this.loading = true;
                console.log(userId);
                _this.userService.disableUser(userId)
                    .then(function (res) {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Hauler admin disabled successfully' });
                        _this.fetchHaulers(0, 20);
                    }
                    else {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
                    }
                });
            }
        });
    };
    ViewHaulerAdminsComponent.prototype.enableCompany = function (userId) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to enable this hauler admin?',
            accept: function () {
                _this.loading = true;
                console.log(userId);
                _this.userService.enableUser(userId)
                    .then(function (res) {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.fetchHaulers(0, 20);
                        _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Hauler admin enabled successfully' });
                    }
                    else {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
                    }
                });
            }
        });
    };
    ViewHaulerAdminsComponent.prototype.deleteCompany = function (userId) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this hauler admin?',
            accept: function () {
                _this.loading = true;
                _this.userService.deleteUser(userId)
                    .then(function (res) {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.fetchHaulers(0, 20);
                        _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Hauler admin deleted successfully' });
                    }
                    else {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
                    }
                });
            }
        });
    };
    ViewHaulerAdminsComponent.prototype.editUser = function (userId) {
        var _this = this;
        this.display = true;
        // console.log('userID==',userId);
        this.userService.editUser(userId)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.userDetails = res.data;
                _this.fetchHaulers(0, 20);
                // console.log('res.data===',this.userDetails);
            }
            else {
                //console.log('inside else');
                _this.loading = false;
            }
        });
    };
    ViewHaulerAdminsComponent.prototype.updateUser = function (userDetails) {
        var _this = this;
        this.display = true;
        // console.log('userDetails==',userDetails);
        this.userService.updateUser(userDetails)
            .then(function (res) {
            if (res.code == 200) {
                _this.userDetails = res.data;
                _this.display = false;
                _this.loading = false;
                _this.fetchHaulers(0, 20);
                //console.log('this.router.navigate==', this.router.navigate);
                //this.router.navigate(['/view-company-users']);
                // console.log('user Details update succesfully');
            }
            else {
                console.log('inside else');
                _this.loading = false;
            }
        });
    };
    ViewHaulerAdminsComponent.prototype.cancel = function () {
        // console.log('userDetails in cancel',this.userDetails);
        this.display = false;
    };
    return ViewHaulerAdminsComponent;
}());
ViewHaulerAdminsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-view-hauler-admins',
        template: __webpack_require__("./src/app/layout/view-hauler-admins/view-hauler-admins.component.html"),
        styles: [__webpack_require__("./src/app/layout/view-hauler-admins/view-hauler-admins.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["ConfirmationService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["ConfirmationService"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common__["Location"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common__["Location"]) === "function" && _e || Object])
], ViewHaulerAdminsComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=view-hauler-admins.component.js.map

/***/ }),

/***/ "./src/app/layout/view-hauler-user/view-hauler-user.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl baseZIndex=\"1\" [(value)]=\"msgs\"></p-growl>\n<p-dataTable [tableStyle]=\"{'table-layout':'auto'}\" [value]=\"haulerArr\">\n  <p-column field=\"full_name\" header=\"Full Name\"></p-column>\n  <p-column field=\"email\" header=\"Email\"></p-column>\n  <p-column>\n    <ng-template pTemplate=\"header\">\n      createdAt\n    </ng-template>\n    <ng-template let-user=\"rowData\" pTemplate=\"body\">\n      {{user.created_at|date: 'dd/MM/yyyy'}}\n    </ng-template>\n  </p-column>\n    <p-column>\n    <ng-template pTemplate=\"header\">\n      Phone No\n    </ng-template>\n    <ng-template let-user=\"rowData\" pTemplate=\"body\">\n      {{user.phone_no|phoneNo}}\n    </ng-template>\n  </p-column>\n  <p-column>\n    <ng-template pTemplate=\"header\">\n      Action\n    </ng-template>\n    <ng-template let-user=\"rowData\" pTemplate=\"body\">\n      <i [ngClass]=\"user.status == 1?'fa fa-user':'fa fa-user-times'\" aria-hidden=\"true\" (click)=\"user.status == 1?disableCompany(user._id):enableCompany(user._id)\"\n        [pTooltip]=\"user.status == 1 ? 'Disable Company' : 'Enable Company'\" tooltipPosition=\"bottom\"></i>&nbsp;&nbsp;\n      <i class=\"fa fa-trash\" aria-hidden=\"true\" (click)=\"deleteCompany(user._id)\" pTooltip=\"Delete Company\" tooltipPosition=\"bottom\"></i>&nbsp;&nbsp;\n      <i class=\"fa fa-pencil\" aria-hidden=\"true\" pTooltip=\"Edit huler user\"(click)=\"editUser(user._id)\" tooltipPosition=\"bottom\"></i>\n    </ng-template>\n  </p-column>\n</p-dataTable>\n<p-paginator rows=\"20\" totalRecords=\"{{records}}\" pageLinkSize=\"3\" (onPageChange)=\"paginate($event)\"\n></p-paginator>\n<p-confirmDialog header=\"Confirmation\" icon=\"fa fa-question-circle\" width=\"425\"></p-confirmDialog>\n\n<ngx-loading [show]=\"loading\" [config]=\"{ backdropBorderRadius: '14px',fullScreenBackdrop:true }\"></ngx-loading>\n\n\n <p-dialog header=\"Edit Hular user\" [(visible)]=\"display\" modal=\"modal\" height=\"400\" width=\"400\" [responsive]=\"true\">\n  \n    Name:\n      <td>\n          <input type=\"text\" [(ngModel)]=\"userDetails.full_name\" />\n      </td><br>\n      Email:\n      <td>\n          <input type=\"text\"[(ngModel)]=\"userDetails.email\" />\n      </td><br>\n      Phone Number:\n      <td>\n          <input type=\"text\" [(ngModel)]=\"userDetails.phone_no\" />\n      </td><br>\n      <td>\n          <input type=\"button\" value=\"update\" (click)=\"updateUser(userDetails)\" class=\"btn btn-success\" />\n      </td>\n      <td>\n          <input type=\"button\" value=\"Cancel\" (click)=\"cancel()\" class=\"btn btn-warning\" />\n      </td>\n   \n  </p-dialog>\n  "

/***/ }),

/***/ "./src/app/layout/view-hauler-user/view-hauler-user.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/view-hauler-user/view-hauler-user.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewHaulerUserComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_users_service__ = __webpack_require__("./src/app/providers/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
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




var ViewHaulerUserComponent = (function () {
    function ViewHaulerUserComponent(userService, confirmationService, _location) {
        this.userService = userService;
        this.confirmationService = confirmationService;
        this._location = _location;
        this.haulerArr = [];
        this.loading = false;
        this.msgs = [];
        this.display = false;
        this.userDetails = [];
        this.records = [];
        this.users = [];
    }
    ViewHaulerUserComponent.prototype.ngOnInit = function () {
        this.fetchHaulersUser(0, 20);
    };
    ViewHaulerUserComponent.prototype.fetchHaulersUser = function (offset, rows) {
        var _this = this;
        var role = this.userService.readSession().role;
        var companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId,
            offset: offset, rows: rows, type: 'user'
        };
        this.loading = true;
        this.userService.fetchHaulersUser(data)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.haulerArr = res.data;
                _this.records = res.count;
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
            }
        });
    };
    ViewHaulerUserComponent.prototype.paginate = function (event) {
        console.log('in event', event);
        var offset = event.first;
        var rows = event.rows;
        this.fetchHaulersUser(offset, rows);
    };
    ViewHaulerUserComponent.prototype.disableCompany = function (userId) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to disable this hauler user?',
            accept: function () {
                _this.loading = true;
                console.log(userId);
                _this.userService.disableUser(userId)
                    .then(function (res) {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Hauler user disabled successfully' });
                        _this.fetchHaulersUser(0, 20);
                    }
                    else {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
                    }
                });
            }
        });
    };
    ViewHaulerUserComponent.prototype.enableCompany = function (userId) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to enable this hauler user?',
            accept: function () {
                _this.loading = true;
                console.log(userId);
                _this.userService.enableUser(userId)
                    .then(function (res) {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.fetchHaulersUser(0, 20);
                        _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Hauler user enabled successfully' });
                    }
                    else {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
                    }
                });
            }
        });
    };
    ViewHaulerUserComponent.prototype.deleteCompany = function (userId) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this hauler user?',
            accept: function () {
                _this.loading = true;
                _this.userService.deleteUser(userId)
                    .then(function (res) {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.fetchHaulersUser(0, 20);
                        _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Hauler user deleted successfully' });
                    }
                    else {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
                    }
                });
            }
        });
    };
    ViewHaulerUserComponent.prototype.editUser = function (userId) {
        var _this = this;
        this.display = true;
        console.log('userID==', userId);
        this.userService.editUser(userId)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.userDetails = res.data;
                _this.fetchHaulersUser(0, 20);
                // console.log('res.data===',this.userDetails);
            }
            else {
                //console.log('inside else');
                _this.loading = false;
            }
        });
    };
    ViewHaulerUserComponent.prototype.updateUser = function (userDetails) {
        var _this = this;
        this.display = true;
        // console.log('userDetails==',userDetails);
        this.userService.updateUser(userDetails)
            .then(function (res) {
            if (res.code == 200) {
                _this.userDetails = res.data;
                _this.display = false;
                _this.loading = false;
                _this.fetchHaulersUser(0, 20);
                //this.router.navigate(['/view-company-users']);
                console.log('user Details update succesfully');
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
            }
        });
    };
    ViewHaulerUserComponent.prototype.cancel = function () {
        // console.log('userDetails in cancel',this.userDetails);
        this.display = false;
    };
    return ViewHaulerUserComponent;
}());
ViewHaulerUserComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-view-hauler-user',
        template: __webpack_require__("./src/app/layout/view-hauler-user/view-hauler-user.component.html"),
        styles: [__webpack_require__("./src/app/layout/view-hauler-user/view-hauler-user.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__["ConfirmationService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__["ConfirmationService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["Location"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["Location"]) === "function" && _c || Object])
], ViewHaulerUserComponent);

var _a, _b, _c;
//# sourceMappingURL=view-hauler-user.component.js.map

/***/ }),

/***/ "./src/app/layout/view-image/view-image.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl baseZIndex=\"1\" [(value)]=\"msgs\"></p-growl>\n<p-dataTable [value]=\"fetchtImgData\">\n    <p-column field=\"tank_name\" header=\"Tank Name\"></p-column>\n    <p-column field=\"volume\" header=\"Volume\"></p-column>\n    <p-column field=\"tank_no\" header=\"tank_no\"></p-column>\n  <p-column>\n    <ng-template pTemplate=\"header\">\n      QrCode\n    </ng-template>\n    <ng-template let-user=\"rowData\" pTemplate=\"body\">\n      <img [src]=\"user.qrcode_url\">\n    </ng-template>\n  </p-column>\n</p-dataTable>\n\n<!-- <p-carousel [value]=\"fetchtImgData\">\n  <ng-template let-user pTemplate=\"body\">\n    <img [src]=\"user.qrcode_url\">\n  </ng-template>\n</p-carousel> -->\n\n<p-confirmDialog header=\"Confirmation\" icon=\"fa fa-question-circle\" width=\"425\"></p-confirmDialog>\n\n<ngx-loading [show]=\"loading\" [config]=\"{ backdropBorderRadius: '14px',fullScreenBackdrop:true }\"></ngx-loading>"

/***/ }),

/***/ "./src/app/layout/view-image/view-image.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/view-image/view-image.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewImageComponent; });
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



var ViewImageComponent = (function () {
    function ViewImageComponent(userService, router, route) {
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.fetchtImgData = [];
        this.msgs = [];
    }
    ViewImageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            //  console.log('paramsId in view image component==',params['id'])
            if (params['id']) {
                _this.fetchtImg(params['id']);
            }
        });
    };
    ViewImageComponent.prototype.fetchtImg = function (tankId) {
        var _this = this;
        // console.log('tankId in view component==',tankId);
        this.userService.fetchtImg(tankId)
            .then(function (res) {
            if (res.code == 200) {
                _this.fetchtImgData = res.data;
                //console.log('this.fetchtImgData in view image component',this.fetchtImgData);
            }
            else {
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
            }
        });
    };
    return ViewImageComponent;
}());
ViewImageComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-view-image',
        template: __webpack_require__("./src/app/layout/view-image/view-image.component.html"),
        styles: [__webpack_require__("./src/app/layout/view-image/view-image.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _c || Object])
], ViewImageComponent);

var _a, _b, _c;
//# sourceMappingURL=view-image.component.js.map

/***/ }),

/***/ "./src/app/layout/view-pads/view-pads.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl baseZIndex=\"1\" [(value)]=\"msgs\"></p-growl>\n<div>\n    <table>\n      <tr>\n        <td>\n          <input type=\"file\" name=\"uploads\" #fileImportInput name=\"File Upload\" id=\"txtFileUpload\" class=\"btn btn-primary\" (change)=\"fileChangeEvent($event)\"\n            accept=\".csv\" value={{selectedImageFile}}/>\n        </td>\n        <td style=\"padding: 5px;\">\n          <input type=\"button\" name=\"Upload\" id=\"txtFileReset\" class=\"btn btn-primary\" (click)=\"upload()\" value=\"Upload\" />\n        </td>\n        <td style=\"padding: 5px;\">\n          <input type=\"button\" name=\"Reset\" id=\"txtFileReset\" class=\"btn btn-primary\" (click)=\"fileReset()\" value=\"Reset\" />\n        </td>\n      </tr>\n    </table>\n  </div><br>\n  <div>\n    <button (click)=\"exportPadsCsv()\">Export Csv</button>\n  </div><br>\n\n<p-dataTable [value]=\"padsArr\">\n  \n  <p-column field=\"pad_name\" header=\"Pad Name\"></p-column>\n  <p-column field=\"company_name\" header=\"Company_name\"></p-column>\n  <p-column field=\"lat\" header=\"Lattitude\"></p-column>\n  <p-column field=\"long\" header=\"Longitude\"></p-column>\n  <p-column>\n    <ng-template pTemplate=\"header\">\n      Action\n    </ng-template>\n    <ng-template let-user=\"rowData\" pTemplate=\"body\">\n      <i [ngClass]=\"user.pad_status == 1?'fa fa-user':'fa fa-user-times'\" aria-hidden=\"true\" (click)=\"user.pad_status == 1?disablePad(user._id):enablePad(user._id)\"\n        [pTooltip]=\"user.pad_status == 1 ? 'Disable Pad' : 'Enable Pad'\" tooltipPosition=\"bottom\"></i>&nbsp;&nbsp;\n      <i class=\"fa fa-trash\" aria-hidden=\"true\" (click)=\"deletePads(user._id)\" pTooltip=\"Delete Pad\" tooltipPosition=\"bottom\"></i>&nbsp;&nbsp;\n      <i class=\"fa fa-pencil\" aria-hidden=\"true\" pTooltip=\"Edit Pad\" (click)=\"editPad(user._id)\" tooltipPosition=\"bottom\"></i>\n    </ng-template>\n  </p-column>\n\n</p-dataTable>\n<p-paginator rows=\"20\" totalRecords=\"{{records}}\" pageLinkSize=\"3\" (onPageChange)=\"paginate($event)\"\n></p-paginator>\n<p-confirmDialog header=\"Confirmation\" icon=\"fa fa-question-circle\" width=\"425\"></p-confirmDialog>\n<p-dialog header=\"Export csv\" [(visible)]=\"display\">\n    <input #email type=\"email\" placeholder=\"Enter your email\">\n    <button style=\"cursor:pointer\" (click)=\"exportCsv(email)\">Export</button>\n  </p-dialog>\n<ngx-loading [show]=\"loading\" [config]=\"{ backdropBorderRadius: '14px',fullScreenBackdrop:true }\"></ngx-loading>\n\n\n<p-dialog *ngIf=\"padDetails\" header=\"Edit Pad Details\" (onHide)=\"formReset()\" [(visible)]=\"showPadDetails\" modal=\"modal\"\nheight=\"500\" width=\"400\" [responsive]=\"true\">\n\nPad Name:\n<td>\n  <input type=\"text\" [(ngModel)]=\"padDetails.pad_name\" />\n</td>\n<br>Longitude:\n<td>\n  <input type=\"number\" [(ngModel)]=\"padDetails.long\" />\n</td>\n<br>Latitude:\n<td>\n  <input type=\"number\" [(ngModel)]=\"padDetails.lat\" />\n</td>\n<!-- <br> Company Name -->\n<!-- <td>\n  <select [(ngModel)]=\"wellDetails.companyId\" (change)=\"fetchPads($event)\">\n    <option value=\"null\" [selected]=true>Please select</option>\n    <option *ngFor=\"let c of compArr\" [value]=\"c._id\">{{c.company_name}}</option>\n  </select>\n</td> -->\n<!-- <br> Pad Name:\n<td>\n  <select [(ngModel)]=\"wellDetails.padId\">\n    <option value=\"null\" [selected]=true>Please select</option>\n    <option *ngFor=\"let c of padArr\" [value]=\"c._id\">{{c.pad_name}}</option>\n  </select>\n  <!-- <input type=\"text\" [(ngModel)]=\"tankDetails.padId\" /> -->\n<!--</td> -->\n<br>\n<td>\n  <input type=\"button\" value=\"update\" (click)=\"updatePad(padDetails)\" class=\"btn btn-success\" />\n</td>\n<td>\n  <input type=\"button\" value=\"Cancel\" (click)=\"cancel()\" class=\"btn btn-warning\" />\n</td>\n\n</p-dialog>"

/***/ }),

/***/ "./src/app/layout/view-pads/view-pads.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/view-pads/view-pads.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewPadsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_users_service__ = __webpack_require__("./src/app/providers/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_primeng_primeng__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ViewPadsComponent = (function () {
    function ViewPadsComponent(userService, confirmationService) {
        this.userService = userService;
        this.confirmationService = confirmationService;
        this.padsArr = [];
        this.loading = false;
        this.msgs = [];
        this.display = false;
        this.email = '';
        this.records = [];
        this.showPadDetails = false;
        this.padDetails = [];
    }
    ViewPadsComponent.prototype.ngOnInit = function () {
        this.fetchtpads(0, 20);
    };
    ViewPadsComponent.prototype.fetchtpads = function (offset, rows) {
        var _this = this;
        var role = this.userService.readSession().role;
        var companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId,
            offset: offset, rows: rows, type: 'user'
        };
        this.loading = true;
        this.userService.fetchtpads(data)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.padsArr = res.data;
                _this.records = res.count;
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: 'insufficient Data' });
            }
        });
    };
    ViewPadsComponent.prototype.paginate = function (event) {
        console.log('in event', event);
        var offset = event.first;
        var rows = event.rows;
        this.fetchtpads(offset, rows);
    };
    ViewPadsComponent.prototype.fileChangeEvent = function (fileInput) {
        this.filesToUpload = fileInput.target.files;
        console.log(this.filesToUpload);
    };
    ViewPadsComponent.prototype.upload = function () {
        var _this = this;
        this.loading = true;
        this.makeFileRequest("http://localhost:3034/api/import-pads-csv", [], this.filesToUpload).then(function (result) {
            if (result['code'] == 200) {
                setTimeout(function () {
                    _this.fetchtpads(0, 20);
                }, 1000);
            }
        }, function (error) {
            console.error(error);
        });
    };
    ViewPadsComponent.prototype.makeFileRequest = function (url, params, files) {
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    };
    ViewPadsComponent.prototype.exportPadsCsv = function () {
        console.log(' click on exportPadsCsv');
        this.display = true;
    };
    ViewPadsComponent.prototype.exportCsv = function (email) {
        var _this = this;
        //console.log(email.value);
        var role = this.userService.readSession().role;
        var companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId,
            email: email.value
        };
        if (email.value) {
            this.display = false;
            this.loading = true;
            this.userService.exportPadsCsv(data)
                .then(function (res) {
                if (res.code == 200) {
                    _this.loading = false;
                    _this.msgs = [];
                    _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Tanks Csv sent to you email' });
                }
                else {
                    _this.loading = false;
                    _this.msgs = [];
                    _this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
                }
            });
        }
        else {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error', detail: "Please enter the email" });
        }
    };
    ViewPadsComponent.prototype.editPad = function (padId) {
        var _this = this;
        console.log('userId', padId);
        this.showPadDetails = true;
        this.userService.editPad(padId)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.padDetails = res.data;
                _this.fetchtpads(0, 20);
                //console.log('this.padDetails',this.padDetails);
                //this.fetchPadsWithCompany(this.wellDetails.companyId);
                //this.fetchPadsWithCompany(this.tankDetails.companyId);
            }
            else {
                _this.loading = false;
            }
        });
    };
    ViewPadsComponent.prototype.updatePad = function (padDetails) {
        var _this = this;
        //  console.log('padDetails===>>>', padDetails);
        this.showPadDetails = true;
        this.userService.updatePads(padDetails)
            .then(function (res) {
            if (res.code == 200) {
                _this.padDetails = res.data;
                _this.showPadDetails = false;
                _this.loading = false;
                _this.fetchtpads(0, 20);
            }
            else {
                _this.loading = false;
            }
        });
    };
    ViewPadsComponent.prototype.cancel = function () {
        this.showPadDetails = false;
    };
    ViewPadsComponent.prototype.deletePads = function (userId) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this Pad?',
            accept: function () {
                _this.loading = true;
                _this.userService.deletePads(userId)
                    .then(function (res) {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.fetchtpads(0, 20);
                        _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Pad deleted successfully' });
                    }
                    else {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
                    }
                });
            }
        });
    };
    ViewPadsComponent.prototype.disablePad = function (userId) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to disable this Pad?',
            accept: function () {
                _this.loading = true;
                //console.log(userId);
                _this.userService.disablePad(userId)
                    .then(function (res) {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'disabled successfully' });
                        _this.fetchtpads(0, 20);
                    }
                    else {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
                    }
                });
            }
        });
    };
    ViewPadsComponent.prototype.enablePad = function (userId) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to enable this Pad?',
            accept: function () {
                _this.loading = true;
                // console.log(userId);
                _this.userService.enablePad(userId)
                    .then(function (res) {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.fetchtpads(0, 20);
                        _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Pad enabled successfully' });
                    }
                    else {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
                    }
                });
            }
        });
    };
    return ViewPadsComponent;
}());
ViewPadsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-view-pads',
        template: __webpack_require__("./src/app/layout/view-pads/view-pads.component.html"),
        styles: [__webpack_require__("./src/app/layout/view-pads/view-pads.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__["ConfirmationService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__["ConfirmationService"]) === "function" && _b || Object])
], ViewPadsComponent);

var _a, _b;
//# sourceMappingURL=view-pads.component.js.map

/***/ }),

/***/ "./src/app/layout/view-transactions/view-transactions.component.html":
/***/ (function(module, exports) {

module.exports = "<div  [@routerTransition]>\n  <p-growl baseZIndex=\"1\" [(value)]=\"msgs\"></p-growl>\n<p-dataTable  [value]=\"transactionData\">\n  <p-column field=\"volume\" header=\"Volume\"></p-column>\n   <p-column field=\"invoice_no\" header=\"Invoice Number\"></p-column>\n   <p-column field=\"padId.pad_name\" header=\"Pad Name\"></p-column>\n   <p-column field=\"tank_id.tank_name\" header=\"Tank Name\"></p-column>\n <p-column field=\"hauler_id.full_name\" header=\"Hauler name\"></p-column>\n <p-column field=\"hauler_id.company_name\" header=\"Company Name\"></p-column>\n <p-column>\n  <ng-template pTemplate=\"header\">\n    Transaction Date\n  </ng-template>\n  <ng-template let-user=\"rowData\" pTemplate=\"body\">\n    {{user.created_at|date: 'dd/MM/yyyy'}} {{user.created_at|date: 'hh:MM a'}}\n  </ng-template>\n  \n</p-column>\n<!-- <p-column>\n  <ng-template pTemplate=\"header\">\n  Time\n  </ng-template>\n  <ng-template let-user=\"rowData\" pTemplate=\"body\">\n    {{user.created_at|date: 'hh:MM:ss'}}\n  </ng-template>\n  \n</p-column> -->\n <!-- <p-column> -->\n    <!-- <ng-template pTemplate=\"header\">\n      Action\n    </ng-template> -->\n    <!-- <ng-template let-user=\"rowData\" pTemplate=\"body\">\n      <i [ngClass]=\"user.status == 1?'fa fa-user':'fa fa-user-times'\" aria-hidden=\"true\" (click)=\"user.status == 1?disableWell(user._id):enableWell(user._id)\"\n        [pTooltip]=\"user.status == 1 ? 'Disable Well' : 'Enable Well'\" tooltipPosition=\"bottom\"></i>&nbsp;&nbsp;\n      <i class=\"fa fa-trash\" aria-hidden=\"true\" (click)=\"deleteWells(user._id)\" pTooltip=\"Delete Well\" tooltipPosition=\"bottom\"></i>&nbsp;&nbsp;\n      <i class=\"fa fa-pencil\" aria-hidden=\"true\" pTooltip=\"Edit well\" (click)=\"editWell(user._id)\" tooltipPosition=\"bottom\"></i>\n    </ng-template> -->\n  <!-- </p-column> -->\n</p-dataTable>\n<p-paginator rows=\"20\" totalRecords=\"{{records}}\" pageLinkSize=\"3\" (onPageChange)=\"paginate($event)\"\n></p-paginator>\n<p-confirmDialog header=\"Confirmation\" icon=\"fa fa-question-circle\" width=\"425\"></p-confirmDialog>\n\n<ngx-loading [show]=\"loading\" [config]=\"{ backdropBorderRadius: '14px',fullScreenBackdrop:true }\"></ngx-loading>\n</div>\n"

/***/ }),

/***/ "./src/app/layout/view-transactions/view-transactions.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/view-transactions/view-transactions.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewTransactionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_users_service__ = __webpack_require__("./src/app/providers/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router_animations__ = __webpack_require__("./src/app/router.animations.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ViewTransactionsComponent = (function () {
    function ViewTransactionsComponent(userService) {
        this.userService = userService;
        this.transactionData = [];
        this.loading = false;
        this.records = [];
        this.msgs = [];
    }
    ViewTransactionsComponent.prototype.ngOnInit = function () {
        this.viewTransactions(0, 20);
    };
    ViewTransactionsComponent.prototype.viewTransactions = function (offset, rows) {
        var _this = this;
        this.loading = true;
        var role = this.userService.readSession().role;
        var companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId,
            offset: offset, rows: rows, type: 'user'
        };
        this.userService.viewTransactions(data)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.transactionData = res.data;
                _this.records = res.count;
                //  console.log('this.transactionData',this.transactionData);
                // console.log('view trans');
            }
            else {
                // console.log('view else');
                _this.loading = false;
                // console.log('inside else');
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'Error', detail: "insufficient Data" });
            }
        });
    };
    ViewTransactionsComponent.prototype.paginate = function (event) {
        //console.log('in event',event);
        var offset = event.first;
        var rows = event.rows;
        this.viewTransactions(offset, rows);
    };
    return ViewTransactionsComponent;
}());
ViewTransactionsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-view-transactions',
        template: __webpack_require__("./src/app/layout/view-transactions/view-transactions.component.html"),
        styles: [__webpack_require__("./src/app/layout/view-transactions/view-transactions.component.scss")],
        animations: [Object(__WEBPACK_IMPORTED_MODULE_2__router_animations__["a" /* routerTransition */])()]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */]) === "function" && _a || Object])
], ViewTransactionsComponent);

var _a;
//# sourceMappingURL=view-transactions.component.js.map

/***/ }),

/***/ "./src/app/layout/view-well/view-well.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl baseZIndex=\"1\" [(value)]=\"msgs\"></p-growl>\n<p-dataTable [value]=\"wellsArr\">\n  <p-column field=\"well_name\" header=\"Well Name\"></p-column>\n   <p-column field=\"well_no\" header=\"Well Number\"></p-column>\n   <p-column field=\"padId.pad_name\" header=\"Pad Name\"></p-column>\n <p-column field=\"companyId.company_name\" header=\"Company name\"></p-column>\n <p-column>\n    <ng-template pTemplate=\"header\">\n      Action\n    </ng-template>\n    <ng-template let-user=\"rowData\" pTemplate=\"body\">\n      <i [ngClass]=\"user.status == 1?'fa fa-user':'fa fa-user-times'\" aria-hidden=\"true\" (click)=\"user.status == 1?disableWell(user._id):enableWell(user._id)\"\n        [pTooltip]=\"user.status == 1 ? 'Disable Well' : 'Enable Well'\" tooltipPosition=\"bottom\"></i>&nbsp;&nbsp;\n      <i class=\"fa fa-trash\" aria-hidden=\"true\" (click)=\"deleteWells(user._id)\" pTooltip=\"Delete Well\" tooltipPosition=\"bottom\"></i>&nbsp;&nbsp;\n      <i class=\"fa fa-pencil\" aria-hidden=\"true\" pTooltip=\"Edit well\" (click)=\"editWell(user._id)\" tooltipPosition=\"bottom\"></i>\n    </ng-template>\n  </p-column>\n</p-dataTable>\n<p-paginator rows=\"20\" totalRecords=\"{{records}}\" pageLinkSize=\"3\" (onPageChange)=\"paginate($event)\"\n></p-paginator>\n<p-confirmDialog header=\"Confirmation\" icon=\"fa fa-question-circle\" width=\"425\"></p-confirmDialog>\n\n<ngx-loading [show]=\"loading\" [config]=\"{ backdropBorderRadius: '14px',fullScreenBackdrop:true }\"></ngx-loading>\n\n<p-dialog *ngIf=\"wellDetails\" header=\"Edit Well Details\" (onHide)=\"formReset()\" [(visible)]=\"showWellDetails\" modal=\"modal\"\nheight=\"500\" width=\"400\" [responsive]=\"true\">\n\nWell Name:\n<td>\n  <input type=\"text\" [(ngModel)]=\"wellDetails.well_name\" />\n</td>\n<br>Well Number:\n<td>\n  <input type=\"number\" [(ngModel)]=\"wellDetails.well_no\" />\n</td>\n<br> Company Name\n<td>\n  <select [(ngModel)]=\"wellDetails.companyId\" (change)=\"fetchPads($event)\">\n    <option value=\"null\" [selected]=true>Please select</option>\n    <option *ngFor=\"let c of compArr\" [value]=\"c._id\">{{c.company_name}}</option>\n  </select>\n</td>\n<br> Pad Name:\n<td>\n  <select [(ngModel)]=\"wellDetails.padId\">\n    <option value=\"null\" [selected]=true>Please select</option>\n    <option *ngFor=\"let c of padArr\" [value]=\"c._id\">{{c.pad_name}}</option>\n  </select>\n  <!-- <input type=\"text\" [(ngModel)]=\"tankDetails.padId\" /> -->\n</td>\n<br>\n<td>\n  <input type=\"button\" value=\"update\" (click)=\"updateWell(wellDetails)\" class=\"btn btn-success\" />\n</td>\n<td>\n  <input type=\"button\" value=\"Cancel\" (click)=\"cancel()\" class=\"btn btn-warning\" />\n</td>\n\n</p-dialog>"

/***/ }),

/***/ "./src/app/layout/view-well/view-well.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/view-well/view-well.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewWellComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_users_service__ = __webpack_require__("./src/app/providers/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_primeng_primeng__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ViewWellComponent = (function () {
    function ViewWellComponent(userService, confirmationService) {
        this.userService = userService;
        this.confirmationService = confirmationService;
        this.wellsArr = [];
        this.loading = false;
        this.msgs = [];
        this.records = [];
        this.showWellDetails = false;
        this.wellDetails = [];
        this.compArr = [];
        this.padArr = [];
    }
    ViewWellComponent.prototype.ngOnInit = function () {
        this.fetchwells(0, 20);
        this.fetchCompanies();
    };
    ViewWellComponent.prototype.fetchwells = function (offset, rows) {
        var _this = this;
        this.loading = true;
        var role = this.userService.readSession().role;
        var companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        };
        this.userService.fetchwells(data)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.wellsArr = res.data;
                _this.records = res.count;
                // console.log('this.wellsArr',this.wellsArr);
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    ViewWellComponent.prototype.paginate = function (event) {
        //console.log('in event',event);
        var offset = event.first;
        var rows = event.rows;
        this.fetchwells(offset, rows);
    };
    ViewWellComponent.prototype.deleteWells = function (userId) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this well?',
            accept: function () {
                _this.loading = true;
                _this.userService.deleteWells(userId)
                    .then(function (res) {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.fetchwells(0, 20);
                        _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'well deleted successfully' });
                    }
                    else {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
                    }
                });
            }
        });
    };
    ViewWellComponent.prototype.fetchCompanies = function () {
        var _this = this;
        this.loading = true;
        var role = this.userService.readSession().role;
        var companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        };
        this.userService.fetchCompanies(data)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.compArr = res.data;
                // console.log('compArr===',this.compArr)
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    ViewWellComponent.prototype.fetchPads = function (event) {
        var _this = this;
        this.loading = true;
        if (event != 0) {
            var companyId = event.target.value;
            //this.fetchCompanies();
            this.userService.fetchPadsWithComp(companyId)
                .then(function (res) {
                if (res.code == 200) {
                    _this.loading = false;
                    _this.padArr = res.data;
                    // this.fetchCompanies();
                    //console.log('this.padArr in view padArr',this.padArr)
                }
                else {
                    _this.loading = false;
                    _this.msgs = [];
                    _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
                }
            });
        }
    };
    ViewWellComponent.prototype.fetchPadsWithCompany = function (companyId) {
        var _this = this;
        console.log('companyId in fetchPads==', companyId);
        this.userService.fetchPadsWithComp(companyId)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.padArr = res.data;
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: res.message });
            }
        });
    };
    ViewWellComponent.prototype.editWell = function (userId) {
        var _this = this;
        this.showWellDetails = true;
        this.userService.editWell(userId)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.wellDetails = res.data;
                _this.fetchwells(0, 20);
                _this.fetchPadsWithCompany(_this.wellDetails.companyId);
                //this.fetchPadsWithCompany(this.tankDetails.companyId);
            }
            else {
                _this.loading = false;
            }
        });
    };
    ViewWellComponent.prototype.formReset = function () {
        this.fetchCompanies();
        //this.wellsArr = [];
    };
    ViewWellComponent.prototype.updateWell = function (wellDetails) {
        var _this = this;
        console.log('wellDetails', wellDetails);
        this.showWellDetails = true;
        this.userService.updateWell(wellDetails)
            .then(function (res) {
            if (res.code == 200) {
                _this.wellDetails = res.data;
                _this.showWellDetails = false;
                _this.loading = false;
                _this.fetchwells(0, 20);
            }
            else {
                _this.loading = false;
            }
        });
    };
    ViewWellComponent.prototype.cancel = function () {
        this.showWellDetails = false;
    };
    ViewWellComponent.prototype.disableWell = function (userId) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to disable this Well?',
            accept: function () {
                _this.loading = true;
                //console.log(userId);
                _this.userService.disableWell(userId)
                    .then(function (res) {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'disabled successfully' });
                        _this.fetchwells(0, 20);
                    }
                    else {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
                    }
                });
            }
        });
    };
    ViewWellComponent.prototype.enableWell = function (userId) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to enable this well?',
            accept: function () {
                _this.loading = true;
                // console.log(userId);
                _this.userService.enableWell(userId)
                    .then(function (res) {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.fetchwells(0, 20);
                        _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Well enabled successfully' });
                    }
                    else {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
                    }
                });
            }
        });
    };
    return ViewWellComponent;
}());
ViewWellComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-view-well',
        template: __webpack_require__("./src/app/layout/view-well/view-well.component.html"),
        styles: [__webpack_require__("./src/app/layout/view-well/view-well.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__["ConfirmationService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__["ConfirmationService"]) === "function" && _b || Object])
], ViewWellComponent);

var _a, _b;
//# sourceMappingURL=view-well.component.js.map

/***/ }),

/***/ "./src/app/layout/view-wells/view-wells.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl baseZIndex=\"1\" [(value)]=\"msgs\"></p-growl>\n<div>\n  <table>\n    <tr>\n      <td>\n        <input type=\"file\" name=\"uploads\" #fileImportInput name=\"File Upload\" id=\"txtFileUpload\" class=\"btn btn-primary\" (change)=\"fileChangeEvent($event)\"\n          accept=\".csv\" value={{selectedImageFile}}/>\n      </td>\n      <td style=\"padding: 5px;\">\n        <input type=\"button\" name=\"Upload\" id=\"txtFileReset\" class=\"btn btn-primary\" (click)=\"upload()\" value=\"Upload\" />\n      </td>\n      <td style=\"padding: 5px;\">\n        <input type=\"button\" name=\"Reset\" id=\"txtFileReset\" class=\"btn btn-primary\" (click)=\"fileReset()\" value=\"Reset\" />\n      </td>\n    </tr>\n  </table>\n</div>\n<br>\n<div>\n  <button (click)=\"exportTankCsv()\">Export Csv</button>\n</div>\n<br>\n<p-dataTable [value]=\"tanksArr\">\n  <p-column field=\"tank_name\" header=\"Tank Name\"></p-column>\n  <p-column field=\"padId.pad_name\" header=\"Pad Name\"></p-column>\n  <p-column field=\"wellId.well_name\" header=\"Well Name\"></p-column>\n  <p-column field=\"volume\" header=\"Volume\"></p-column>\n  <p-column field=\"type\" header=\"Type\"></p-column>\n  <p-column>\n    <ng-template pTemplate=\"header\">\n      QrCode\n    </ng-template>\n    <ng-template let-user=\"rowData\" pTemplate=\"body\">\n    <div  class=\"bar_code_img\">\n      <img [src]=\"user.qrcode_url\" (click)=\"viewimage(user._id)\">\n    </div>\n    \n    </ng-template>\n  </p-column>\n  <p-column>\n    <ng-template pTemplate=\"header\">\n      Action\n    </ng-template>\n    <ng-template let-user=\"rowData\" pTemplate=\"body\">\n      <i [ngClass]=\"user.tank_status == true?'fa fa-user':'fa fa-user-times'\" aria-hidden=\"true\" (click)=\"user.tank_status == true?disableTank(user._id):enableTank(user._id)\"\n        [pTooltip]=\"user.tank_status == true? 'Disable Tank' : 'Enable Tank'\" tooltipPosition=\"bottom\"></i>&nbsp;&nbsp;\n      <i class=\"fa fa-trash\" aria-hidden=\"true\" (click)=\"deleteTanks(user._id)\" pTooltip=\"Delete Tank\" tooltipPosition=\"bottom\"></i>&nbsp;&nbsp;\n      <i class=\"fa fa-pencil\" aria-hidden=\"true\" pTooltip=\"Edit Tank\" (click)=\"editTank(user._id)\" tooltipPosition=\"bottom\"></i>\n    </ng-template>\n  </p-column>\n</p-dataTable>\n<p-paginator rows=\"20\" totalRecords=\"{{records}}\" pageLinkSize=\"3\" (onPageChange)=\"paginate($event)\"></p-paginator>\n<p-confirmDialog header=\"Confirmation\" icon=\"fa fa-question-circle\" width=\"425\"></p-confirmDialog>\n<p-dialog header=\"Export csv\" [(visible)]=\"display\">\n  <input #email type=\"email\" placeholder=\"Enter your email\">\n  <button style=\"cursor:pointer\" (click)=\"exportCsv(email)\">Export</button>\n</p-dialog>\n<ngx-loading [show]=\"loading\" [config]=\"{ backdropBorderRadius: '14px',fullScreenBackdrop:true }\"></ngx-loading>\n\n\n<p-dialog *ngIf=\"tankDetails\" header=\"Edit Tank Details\" (onHide)=\"formReset()\" [(visible)]=\"showTankDetails\" modal=\"modal\"\n  height=\"500\" width=\"400\" [responsive]=\"true\">\n\n  Tank Name:\n  <td>\n    <input type=\"text\" [(ngModel)]=\"tankDetails.tank_name\" />\n  </td>\n  <br> Volume:\n  <td>\n    <input type=\"number\" [(ngModel)]=\"tankDetails.volume\" />\n  </td>\n  <br> Company Name\n  <td>\n    <select [(ngModel)]=\"tankDetails.companyId\" (change)=\"fetchPads($event)\">\n      <option value=\"null\" [selected]=true>Please select</option>\n      <option *ngFor=\"let c of compArr\" [value]=\"c._id\">{{c.company_name}}</option>\n    </select>\n  </td>\n  <br> Pad Name:\n  <td>\n    <select [(ngModel)]=\"tankDetails.padId\">\n      <option value=\"null\" [selected]=true>Please select</option>\n      <option *ngFor=\"let c of padArr\" [value]=\"c._id\">{{c.pad_name}}</option>\n    </select>\n    <!-- <input type=\"text\" [(ngModel)]=\"tankDetails.padId\" /> -->\n  </td>\n  <br>\n  <td>\n    <input type=\"button\" value=\"update\" (click)=\"updateTank(tankDetails)\" class=\"btn btn-success\" />\n  </td>\n  <td>\n    <input type=\"button\" value=\"Cancel\" (click)=\"cancel()\" class=\"btn btn-warning\" />\n  </td>\n\n</p-dialog>\n<!-- <p-lightbox [images]=\"images\"></p-lightbox> -->"

/***/ }),

/***/ "./src/app/layout/view-wells/view-wells.component.scss":
/***/ (function(module, exports) {

module.exports = ".bar_code_img img {\n  height: 135px;\n  width: 135px; }\n"

/***/ }),

/***/ "./src/app/layout/view-wells/view-wells.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewWellsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_users_service__ = __webpack_require__("./src/app/providers/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__router_animations__ = __webpack_require__("./src/app/router.animations.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ViewWellsComponent = (function () {
    function ViewWellsComponent(userService, confirmationService, router) {
        // this.images = [];
        // this.images.push({source:'assets/showcase/images/demo/sopranos/sopranos1.jpg', thumbnail: 'assets/showcase/images/demo/sopranos/sopranos1_small.jpg', title:'Sopranos 1'});
        // this.images.push({source:'assets/showcase/images/demo/sopranos/sopranos2.jpg', thumbnail: 'assets/showcase/images/demo/sopranos/sopranos2_small.jpg', title:'Sopranos 2'});
        // this.images.push({source:'assets/showcase/images/demo/sopranos/sopranos3.jpg', thumbnail: 'assets/showcase/images/demo/sopranos/sopranos3_small.jpg', title:'Sopranos 3'});
        // this.images.push({source:'assets/showcase/images/demo/sopranos/sopranos4.jpg', thumbnail: 'assets/showcase/images/demo/sopranos/sopranos4_small.jpg', title:'Sopranos 4'});
        this.userService = userService;
        this.confirmationService = confirmationService;
        this.router = router;
        this.tanksArr = [];
        this.loading = false;
        this.msgs = [];
        this.display = false;
        this.showTankDetails = false;
        this.email = '';
        this.records = [];
        this.tankDetails = [];
        this.padArr = [];
        this.compArr = [];
        this.tankImageDetails = [];
    }
    ViewWellsComponent.prototype.ngOnInit = function () {
        this.fetchtanks(0, 20);
        this.fetchCompanies();
    };
    ViewWellsComponent.prototype.fetchtanks = function (offset, rows) {
        var _this = this;
        console.log('inside fetch tanks');
        this.loading = true;
        var role = this.userService.readSession().role;
        var companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId,
            offset: offset, rows: rows, type: 'user'
        };
        this.userService.fetchtanks(data)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.tanksArr = res.data;
                _this.records = res.count;
                console.log('inside if', res.data);
                if (res.data == '') {
                    _this.loading = false;
                    _this.msgs = [];
                    _this.msgs.push({ severity: 'error', summary: 'Error', detail: "insufficient data" });
                }
                // this.tanksArr.forEach((item, index) => {
                // });
            }
            else {
                console.log('inside else');
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
            }
        });
    };
    ViewWellsComponent.prototype.viewimage = function (userId) {
        var _this = this;
        this.router.navigate(['/view-image/' + userId]);
        console.log('userId in view image', userId);
        this.userService.viewImage(userId)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.tankImageDetails = res.data;
                _this.fetchtanks(0, 20);
            }
            else {
                _this.loading = false;
            }
        });
    };
    ViewWellsComponent.prototype.paginate = function (event) {
        console.log('in event', event);
        var offset = event.first;
        var rows = event.rows;
        this.fetchtanks(offset, rows);
    };
    ViewWellsComponent.prototype.ViewQrCode = function (qrcode) {
        this.qrcode = qrcode;
    };
    ViewWellsComponent.prototype.fileChangeEvent = function (fileInput) {
        this.filesToUpload = fileInput.target.files;
        console.log(this.filesToUpload);
    };
    ViewWellsComponent.prototype.upload = function () {
        var _this = this;
        this.loading = true;
        this.makeFileRequest("http://localhost:3034/api/import-tanks-csv", [], this.filesToUpload).then(function (result) {
            if (result['code'] == 200) {
                setTimeout(function () {
                    _this.fetchtanks(0, 20);
                }, 1000);
            }
        }, function (error) {
            console.error(error);
        });
    };
    ViewWellsComponent.prototype.makeFileRequest = function (url, params, files) {
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    };
    ViewWellsComponent.prototype.exportTankCsv = function () {
        this.display = true;
        // this.loading = true;
        // this.userService.exportTankCsv()
        //   .then(res => {
        //     if (res.code == 200) {
        //       this.loading = false;
        //     
        //     }
        //     else {
        //       this.loading = false;
        //      
        //     }
        //   })
    };
    ViewWellsComponent.prototype.fetchCompanies = function () {
        var _this = this;
        this.loading = true;
        var role = this.userService.readSession().role;
        var companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        };
        this.userService.fetchCompanies(data)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.compArr = res.data;
                //console.log('compArr===',this.compArr)
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
            }
        });
    };
    ViewWellsComponent.prototype.fetchPads = function (event) {
        var _this = this;
        this.loading = true;
        if (event != 0) {
            var companyId = event.target.value;
            //this.fetchCompanies();
            this.userService.fetchPadsWithComp(companyId)
                .then(function (res) {
                if (res.code == 200) {
                    _this.loading = false;
                    _this.padArr = res.data;
                    // this.fetchCompanies();
                    //console.log('this.padArr in view tanks',this.padArr)
                }
                else {
                    _this.loading = false;
                    _this.msgs = [];
                    _this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
                }
            });
        }
    };
    ViewWellsComponent.prototype.fetchPadsWithCompany = function (companyId) {
        var _this = this;
        console.log('this.tankDetails', this.tankDetails);
        //let companyId=this.tankDetails.companyId;
        console.log('companyId==', companyId);
        this.userService.fetchPadsWithComp(companyId)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.padArr = res.data;
                // this.fetchCompanies();
                // console.log('this.padArr in view tanks',this.padArr)
            }
            else {
                _this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
            }
        });
    };
    ViewWellsComponent.prototype.editTank = function (userId) {
        var _this = this;
        this.showTankDetails = true;
        this.userService.editTank(userId)
            .then(function (res) {
            if (res.code == 200) {
                _this.loading = false;
                _this.tankDetails = res.data;
                _this.fetchtanks(0, 20);
                _this.fetchPadsWithCompany(_this.tankDetails.companyId);
                //console.log('res.data===><><',this.tankDetails.companyId);
            }
            else {
                _this.loading = false;
            }
        });
    };
    ViewWellsComponent.prototype.exportCsv = function (email) {
        var _this = this;
        console.log(email.value);
        var role = this.userService.readSession().role;
        var companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId,
            email: email.value
        };
        if (email.value) {
            this.display = false;
            this.loading = true;
            this.userService.exportTankCsv(data)
                .then(function (res) {
                if (res.code == 200) {
                    _this.loading = false;
                    console.log('res.data in export csv', res);
                    _this.msgs = [];
                    _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Tanks Csv sent to you email' });
                    email.value = '';
                }
                else {
                    _this.loading = false;
                    _this.msgs = [];
                    _this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
                }
            });
        }
        else {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error', detail: "Please enter the email" });
        }
    };
    ViewWellsComponent.prototype.deleteTanks = function (userId) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this Tank?',
            accept: function () {
                _this.loading = true;
                _this.userService.deleteTank(userId)
                    .then(function (res) {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.fetchtanks(0, 20);
                        _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Tank deleted successfully' });
                    }
                    else {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'res.message' });
                    }
                });
            }
        });
    };
    ViewWellsComponent.prototype.formReset = function () {
        this.fetchCompanies();
        this.padArr = [];
    };
    ViewWellsComponent.prototype.updateTank = function (tankDetails) {
        var _this = this;
        this.showTankDetails = true;
        this.userService.updateTank(tankDetails)
            .then(function (res) {
            if (res.code == 200) {
                _this.tankDetails = res.data;
                _this.showTankDetails = false;
                _this.loading = false;
                _this.fetchtanks(0, 20);
            }
            else {
                _this.loading = false;
            }
        });
    };
    ViewWellsComponent.prototype.cancel = function () {
        this.showTankDetails = false;
    };
    ViewWellsComponent.prototype.disableTank = function (tankId) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to disable this tank?',
            accept: function () {
                _this.loading = true;
                //console.log(userId);
                _this.userService.disableTank(tankId)
                    .then(function (res) {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'disabled successfully' });
                        _this.fetchtanks(0, 20);
                    }
                    else {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'tank is not disabled' });
                    }
                });
            }
        });
    };
    ViewWellsComponent.prototype.enableTank = function (tankId) {
        var _this = this;
        // console.log('tankId==',tankId)
        this.confirmationService.confirm({
            message: 'Are you sure that you want to enable this tank?',
            accept: function () {
                _this.loading = true;
                // console.log(userId);
                _this.userService.enableTank(tankId)
                    .then(function (res) {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.fetchtanks(0, 20);
                        _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'tank enabled successfully' });
                    }
                    else {
                        _this.loading = false;
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'tank not enabled' });
                    }
                });
            }
        });
    };
    return ViewWellsComponent;
}());
ViewWellsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-view-wells',
        template: __webpack_require__("./src/app/layout/view-wells/view-wells.component.html"),
        styles: [__webpack_require__("./src/app/layout/view-wells/view-wells.component.scss")],
        animations: [Object(__WEBPACK_IMPORTED_MODULE_4__router_animations__["a" /* routerTransition */])()]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__["ConfirmationService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__["ConfirmationService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"]) === "function" && _c || Object])
], ViewWellsComponent);

var _a, _b, _c;
//# sourceMappingURL=view-wells.component.js.map

/***/ }),

/***/ "./src/app/layout/viewlog/viewlog.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl baseZIndex=\"1\" [(value)]=\"msgs\"></p-growl>\n<br>\n\n<p-dataTable [value]=\"logArr\">\n  \n  <p-column field=\"padId.pad_name\" header=\"Pad Name\"></p-column>\n  <p-column field=\"userId.full_name\" header=\"User Name\"></p-column>\n  <p-column>\n    <ng-template pTemplate=\"header\">\n      Entry Time \n    </ng-template>\n    <ng-template let-user=\"rowData\" pTemplate=\"body\">\n      {{user.entry_time|date: 'dd/MM/yyyy'}} {{user.entry_time|date: 'hh:MM a'}}\n    </ng-template>\n    \n  </p-column>\n\n  <p-column>\n    <ng-template pTemplate=\"header\">\n      Exit Time \n    </ng-template>\n    <ng-template let-user=\"rowData\" pTemplate=\"body\">\n      {{user.exit_time|date: 'dd/MM/yyyy'}}  {{user.exit_time|date: 'hh:MM a'}}\n    </ng-template>\n    \n  </p-column>\n\n</p-dataTable>\n<p-paginator rows=\"20\" totalRecords=\"{{records}}\" pageLinkSize=\"3\" (onPageChange)=\"paginate($event)\"\n></p-paginator>\n<p-confirmDialog header=\"Confirmation\" icon=\"fa fa-question-circle\" width=\"425\"></p-confirmDialog>\n\n<ngx-loading [show]=\"loading\" [config]=\"{ backdropBorderRadius: '14px',fullScreenBackdrop:true }\"></ngx-loading>\n\n\n"

/***/ }),

/***/ "./src/app/layout/viewlog/viewlog.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/viewlog/viewlog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewlogComponent; });
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


var ViewlogComponent = (function () {
    function ViewlogComponent(userService) {
        this.userService = userService;
        this.loading = false;
        this.logArr = [];
        this.records = [];
        this.msgs = [];
    }
    ViewlogComponent.prototype.ngOnInit = function () {
        this.fetchLog(0, 20);
    };
    ViewlogComponent.prototype.fetchLog = function (offset, rows) {
        var _this = this;
        var role = this.userService.readSession().role;
        var companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId,
            offset: offset, rows: rows, type: 'user'
        };
        // this.loading = true;
        this.userService.fetchLog(data)
            .then(function (res) {
            if (res.code == 200) {
                // this.loading = false;
                _this.logArr = res.data;
                console.log('this.log', _this.logArr);
                _this.records = res.count;
            }
            else {
                // this.loading = false;
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'error', detail: 'insufficient Data' });
            }
        });
    };
    return ViewlogComponent;
}());
ViewlogComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-viewlog',
        template: __webpack_require__("./src/app/layout/viewlog/viewlog.component.html"),
        styles: [__webpack_require__("./src/app/layout/viewlog/viewlog.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_users_service__["a" /* UsersService */]) === "function" && _a || Object])
], ViewlogComponent);

var _a;
//# sourceMappingURL=viewlog.component.js.map

/***/ })

});
//# sourceMappingURL=layout.module.chunk.js.map