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
var SlideComponent = (function () {
    function SlideComponent(elemRef) {
        this.show = false;
        this.closeDialog = new core_1.EventEmitter();
        this.dialogwidth = 0;
        this.count = 0;
        this.isviewfocuschange = false;
        this.el = elemRef;
    }
    SlideComponent.prototype.ngOnInit = function () {
        this.Imagepath = "Content/Icons/questionN.png";
        if (this.autoclose == undefined || this.autoclose == true)
            this.className = "slidenotificationcontainer";
        else
            this.className = "slidenotificationcontainerntauto";
        if (this.isAnimate == undefined || this.isAnimate == null || this.isAnimate == true)
            this.className = this.className + " transformAnimate";
        if (this.type == undefined || this.type == "notification") {
            this.type = "notification";
            if (this.width) {
                if (this.width <= 300)
                    this.width = 300;
                this.contentdialogwidth = this.width - 80;
                this.imageWidth = 80;
            }
        }
        else {
            this.contentdialogwidth = this.width;
            this.imageWidth = 0;
            this.type = "dialog";
        }
        if (this.title == undefined) {
            this.title = "iDrawings V6";
        }
        if (this.titlebar == undefined || this.titlebar == true) {
            this.titlebar = true;
        }
        else {
            this.titlebar = false;
        }
        if (this.closeicon == undefined || this.closeicon == true) {
            this.closeicon = true;
        }
        else {
            this.closeicon = false;
        }
        this.background = this.type == "notification" ? '#FFFFFF' : '#FFFFFF';
        if (this.show == false) {
            this.visible = "hidden";
        }
    };
    SlideComponent.prototype.closeonkeypress = function (Keyevent) {
        var key = Keyevent.keyCode || Keyevent.which;
        if (key == 13 || key == 32) {
            Keyevent.preventDefault();
            this.closeNav();
        }
    };
    SlideComponent.prototype.ngDoCheck = function () {
    };
    SlideComponent.prototype.ngOnChanges = function (changes) {
        this.title = this.title;
        if (this.zindex == undefined)
            this.zindex = 100;
        else
            this.zindex = this.zindex;
        if (this.type == undefined || this.type == "notification") {
            this.type = "notification";
            if (this.width) {
                if (this.width <= 300)
                    this.width = 300;
                this.contentdialogwidth = this.width - 80;
                this.imageWidth = 80;
            }
        }
        else {
            this.contentdialogwidth = this.width;
            this.imageWidth = 0;
            this.type = "dialog";
        }
        this.change;
        if (this.position == "center") {
            this.Styles = { 'top': '25%', 'left': '40%', 'z-index': this.zindex };
        }
        else if (this.position == "top-left") {
            this.Styles = { 'top': '60px', 'left': '0px', 'z-index': this.zindex };
        }
        else if (this.position == "top-right") {
            this.Styles = { 'top': '60px', 'right': '0px', 'z-index': this.zindex };
        }
        else if (this.position == "bottom-left") {
            this.Styles = { 'bottom': '50px', 'left': '0px', 'z-index': this.zindex };
        }
        else if (this.position == "center-right") {
            this.Styles = { 'top': '30%', 'right': '0px', 'z-index': this.zindex };
        }
        else if (this.position == "bottom-right") {
            if (this.inline == true)
                this.Styles = { 'bottom': '0px', 'right': '0px', 'z-index': this.zindex };
            else
                this.Styles = { 'bottom': '50px', 'right': '0px', 'z-index': this.zindex };
        }
        else {
            this.Styles = { 'top': '25%', 'left': '40%', 'z-index': this.zindex };
        }
        this.lengthsidenav = document.getElementsByClassName("slidenotificationcontainer").length;
        for (this.count = 0; this.count < this.lengthsidenav; this.count++) {
            if (document.getElementsByClassName("slidenotificationcontainer")[this.count].style.visibility == "visible" && this.show == true) {
                document.getElementsByClassName("slidenotificationcontainer")[this.count].style.width = "0";
            }
        }
        if (this.show == true && this.dialogwidth != 0) {
            if (this.absolute != undefined && this.absolute != false) {
                this.divPosition = "absolute";
                if (this.inline == true) {
                    this.divPosition = "relative";
                }
            }
            if (this.dialogwidth == this.width) {
                this.dialogwidth = this.dialogwidth + 1;
            }
            else {
                this.dialogwidth = this.dialogwidth - 1;
            }
        }
        else {
            this.dialogwidth = this.width;
        }
        if (this.show == true) {
            this.visible = "visible";
            this.dialogwidth = this.dialogwidth;
        }
        else {
            this.visible = "hidden";
            this.dialogwidth = 0;
            this.closeDialog.emit({
                value: false,
                change: true
            });
        }
        var contextObj = this; /* 508 Compliance*/
        if (contextObj.show == true) {
            contextObj.isviewfocuschange = true;
            if (window["GlobalFocusVariable"])
                contextObj.currentfocus = window["GlobalFocusVariable"];
            else
                contextObj.currentfocus = document.activeElement;
            setTimeout(function () { contextObj.SlideViewFocus(); }, 1000);
            window["GlobalFocusVariable"] = null;
        }
        else {
            if (contextObj.isviewfocuschange) {
                contextObj.isviewfocuschange = false;
                window["GlobalFocusVariable"] = null;
                var notify = document.getElementById('avoidaddress');
                if (notify)
                    notify.focus();
                if (contextObj.currentfocus) {
                    setTimeout(function () {
                        var RootClass = document.getElementsByClassName("toast-message");
                        if (!RootClass || RootClass.length == 0) {
                            contextObj.currentfocus.focus();
                        }
                        else {
                            window["GlobalFocusVariable"] = contextObj.currentfocus;
                        }
                    }, 100);
                }
            }
        }
    };
    SlideComponent.prototype.SlideViewFocus = function () {
        var ContextObj = this;
        var RootClass = ContextObj.el.nativeElement.getElementsByClassName("slidenotificationcontainer");
        if (RootClass && RootClass.length > 0) {
            var length = RootClass.length;
            var position;
            for (var i = 0; i < length; i++) {
                if (RootClass[i] && RootClass[i].style.visibility == "visible") {
                    position = i;
                    if (ContextObj.title && ContextObj.title.length > 0) {
                        RootClass[position].setAttribute('aria-label', ContextObj.title);
                        RootClass[position].removeAttribute("title");
                    }
                    RootClass[i].tabIndex = 0;
                    RootClass[i].focus();
                    var endClass = RootClass[position].getElementsByClassName("SlideEndfocus");
                    if (endClass && endClass.length > 0) {
                        endClass[0].addEventListener('focusin', function (event) {
                            RootClass[position].tabIndex = 0;
                            RootClass[position].focus();
                        });
                    }
                }
            }
        }
    };
    SlideComponent.prototype.closeNav = function () {
        this.dialogwidth = 0;
        this.closeDialog.emit({
            value: false,
            change: false
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SlideComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SlideComponent.prototype, "position", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SlideComponent.prototype, "absolute", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SlideComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SlideComponent.prototype, "show", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SlideComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SlideComponent.prototype, "titlebar", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SlideComponent.prototype, "closeicon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SlideComponent.prototype, "change", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SlideComponent.prototype, "autoclose", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SlideComponent.prototype, "zindex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SlideComponent.prototype, "inline", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SlideComponent.prototype, "isAnimate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SlideComponent.prototype, "closeDialog", void 0);
    SlideComponent = __decorate([
        core_1.Component({
            selector: 'slide',
            templateUrl: 'app/Framework/Views/Slide/slide.component.html',
            directives: [],
            providers: [],
            inputs: ['width', 'position', 'type', 'absolute'],
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], SlideComponent);
    return SlideComponent;
}());
exports.SlideComponent = SlideComponent;
//# sourceMappingURL=slide.component.js.map