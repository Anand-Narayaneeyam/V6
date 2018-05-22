var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var app_component_1 = require('../../../app.component');
var PageComponent = (function () {
    function PageComponent(card) {
        this.App = card;
        this.App.pagepath = this.pagetitle;
    }
    PageComponent.prototype.ngOnInit = function () {
        if (this.pagetitle != undefined) {
            this.lastPath = this.pagetitle;
            this.App.lastpagepath = this.lastPath.substring(this.lastPath.lastIndexOf("/") + 1, this.lastPath.length);
            if (this.App.lastpagepath != undefined) {
                this.App.pagepath = this.lastPath.substring(0, this.lastPath.lastIndexOf("/") + 1);
            }
            else {
                this.App.pagepath = this.pagetitle;
            }
        }
        if (this.isEnableNotification == true || this.isEnableNotification == undefined)
            this.isEnableNotification = true;
        else
            this.isEnableNotification = false;
        var activeClass = document.getElementsByClassName("content-General-view");
        if (activeClass && activeClass.length > 0) {
            var initialfocus = document.getElementsByClassName("pageContent");
            if (initialfocus && initialfocus.length > 1) {
                var selectedclass = activeClass[0].getElementsByClassName("selected");
                var selectedtag;
                if (selectedclass && selectedclass.length > 0) {
                    selectedtag = selectedclass[0].getElementsByTagName("a");
                    if (selectedtag && selectedtag.length > 0)
                        var activeclassname = selectedtag[0].innerHTML + ' Page';
                }
                if (activeclassname && activeclassname.length > 0)
                    initialfocus[1].setAttribute('aria-label', activeclassname);
                else
                    initialfocus[1].setAttribute('aria-label', ' ');
                initialfocus[1].setAttribute('role', 'none');
                initialfocus[1].tabIndex = 0;
                initialfocus[1].focus();
                initialfocus[1].addEventListener('keydown', function (event) {
                    //check for 'Shift + Tab' key 
                    if (event.which == 9 && event.shiftKey && document.activeElement == initialfocus[1]) {
                        event.preventDefault();
                        if (selectedtag && selectedtag.length > 0) {
                            //var selectedclass: any = activeClass[0].getElementsByClassName("selected")[0].getElementsByTagName("a");
                            //selectedclass[0].tabIndex = 0;
                            selectedtag[0].focus();
                        }
                    }
                });
            }
        }
    };
    PageComponent.prototype.ngOnChanges = function (changes) {
        if (this.pagetitle != undefined) {
            this.lastPath = this.pagetitle;
            this.App.lastpagepath = this.lastPath.substring(this.lastPath.lastIndexOf("/") + 1, this.lastPath.length);
            if (this.App.lastpagepath != undefined) {
                this.App.pagepath = this.lastPath.substring(0, this.lastPath.lastIndexOf("/") + 1);
            }
            else {
                this.App.pagepath = this.pagetitle;
            }
        }
    };
    ;
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PageComponent.prototype, "pagetitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PageComponent.prototype, "isEnableNotification", void 0);
    PageComponent = __decorate([
        core_1.Component({
            selector: 'page',
            templateUrl: 'app/Framework/Views/Page/page.component.html',
            styleUrls: ['app/Framework/Views/Page/Page.css'],
            directives: [notify_component_1.Notification],
            providers: [notify_service_1.NotificationService],
            inputs: ['pagetitle', 'withoutSubmenu', 'isEnableNotification'],
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return app_component_1.AppComponent; }))), 
        __metadata('design:paramtypes', [app_component_1.AppComponent])
    ], PageComponent);
    return PageComponent;
}());
exports.PageComponent = PageComponent;
//# sourceMappingURL=page.component.js.map