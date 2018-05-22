var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/share');
var ConfirmToasterService = (function () {
    /**
18      * Creates an instance of ToasterService.
19      */
    function ConfirmToasterService() {
        var _this = this;
        this.addToast = new Observable_1.Observable(function (observer) { return _this._addToast = observer; }).share();
        this.clearToasts = new Observable_1.Observable(function (observer) { return _this._clearToasts = observer; }).share();
    }
    /**
27      * Synchronously create and show a new toast instance.
28      *
29      * @param {(string | Toast)} type The type of the toast, or a Toast object.
30      * @param {string=} title The toast title.
31      * @param {string=} body The toast body.
32      * @returns {Toast}
33      *          The newly created Toast instance with a randomly generated GUID Id.
34      */
    ConfirmToasterService.prototype.pop = function (type, title, body) {
        var toast = typeof type === 'string' ? { type: type, title: title, body: body } : type;
        toast.toastId = Guid.newGuid();
        if (!this._addToast) {
            throw new Error("No Toaster Containers have been initialized to receive toasts.");
        }
        this._addToast.next(toast);
        return toast;
    };
    /**
50      * Asynchronously create and show a new toast instance.
51      *
52      * @param {(string | Toast)} type The type of the toast, or a Toast object.
53      * @param {string=} title The toast title.
54      * @param {string=} body The toast body.
55      * @returns {Observable<Toast>}
56      *          A hot Observable that can be subscribed to in order to receive the Toast instance
57      *          with a randomly generated GUID Id.
58      */
    ConfirmToasterService.prototype.popAsync = function (type, title, body) {
        var _this = this;
        setTimeout(function () {
            _this.pop(type, title, body);
        }, 0);
        return this.addToast;
    };
    /**
69      * Clears a toast by toastId and/or toastContainerId.
70      *
71      * @param {string} toastId The toastId to clear.
72      * @param {number=} toastContainerId
73      *        The toastContainerId of the container to remove toasts from.
74      */
    ConfirmToasterService.prototype.clear = function (toastId, toastContainerId) {
        var clearWrapper = {
            toastId: toastId, toastContainerId: toastContainerId
        };
        this._clearToasts.next(clearWrapper);
    };
    ConfirmToasterService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ConfirmToasterService);
    return ConfirmToasterService;
}());
exports.ConfirmToasterService = ConfirmToasterService;
// http://stackoverflow.com/questions/26501688/a-typescript-guid-class 
var Guid = (function () {
    function Guid() {
    }
    Guid.newGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return Guid;
}());
//# sourceMappingURL=confirmtoaster.service.js.map