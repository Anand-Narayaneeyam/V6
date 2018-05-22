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
var resizable_directive_1 = require('../../../Framework/ExternalLibraries/Resizable/resizable.directive');
var platform_browser_1 = require('@angular/platform-browser');
var SplitViewComponent = (function () {
    function SplitViewComponent(sanitizer, elemRef) {
        this.sanitizer = sanitizer;
        this.blnSplitfocus = -1;
        this.isclosewindow = false;
        this.isviewfocuschange = true;
        this.showIconPath = "Content/Images/General/add-icon.png";
        this.hideIconPath = "Content/Images/General/cancel-icon.png";
        this.closeIconPath = "Content/Images/close_01.png";
        this.resizeOption = false;
        this.labeltitle = '';
        this.height_secondary = "";
        this.width_secondary = "";
        this.top_secondary = "0%";
        this.style = {
            width: this.width_secondary + "px",
            height: this.height_secondary + "px"
        };
        this.SecondaryViewheightClass = "Secondaryviewheight";
        this.afterResize = new core_1.EventEmitter();
        this.onSecondaryClose = new core_1.EventEmitter();
        this.el = elemRef;
    }
    SplitViewComponent.prototype.ngOnChanges = function (changes) {
        this.pageTitle = this.pageTitle;
        this.splitviewObject.showSecondaryView = this.splitviewObject.showSecondaryView;
        if (this.inlineSecondaryView == true) {
            this.resizeOption = true;
            this.edges = { bottom: false, right: false, top: false, left: true };
            if (this.splitviewObject.secondaryArea != undefined) {
                this.inputSecondaryWidth = this.splitviewObject.secondaryArea + "%";
                this.inlineprimarywidth = 100 - this.splitviewObject.secondaryArea - 1 + "%";
            }
            else {
                if (this.splitviewObject.secondaryArea != undefined && this.splitviewObject.secondaryArea == 79) {
                    this.inlineprimarywidth = '';
                    this.inputSecondaryWidth = this.splitviewObject.secondaryArea + "%";
                }
                else {
                    this.inlineprimarywidth = '';
                    this.inputSecondaryWidth = '';
                }
            }
            this.SecondaryViewheightClass = "inlineSecondaryviewheight";
        }
        else {
            this.edges = { bottom: false, right: false, top: false, left: false };
            if (this.splitviewObject.secondaryArea != undefined && this.splitviewObject.secondaryArea == 79) {
                this.inlineprimarywidth = '';
                this.inputSecondaryWidth = this.splitviewObject.secondaryArea + "%";
            }
            else {
                this.inlineprimarywidth = '';
                this.inputSecondaryWidth = '';
            }
            this.SecondaryViewheightClass = "Secondaryviewheight";
        }
        this.blnSplitfocus = -1;
        if (this.pageTitle)
            this.labeltitle = this.pageTitle;
    };
    SplitViewComponent.prototype.onSecondaryViewClose = function () {
        this.blnSplitfocus = -1;
        if (this.currentfocus) {
            this.currentfocus.focus();
        }
        window["GlobalFocusVariable"] = null;
        this.isclosewindow = true;
        //this.isviewfocuschange = false;
        this.splitviewObject.showSecondaryView = false;
        this.onSecondaryClose.emit({});
    };
    SplitViewComponent.prototype.ngOnInit = function () {
        if (this.inlineSecondaryView == true) {
            this.resizeOption = true;
            this.edges = { bottom: false, right: false, top: false, left: true };
            if (this.splitviewObject.secondaryArea != undefined) {
                this.inputSecondaryWidth = this.splitviewObject.secondaryArea + "%";
                this.inlineprimarywidth = 100 - this.splitviewObject.secondaryArea - 1 + "%";
            }
            else {
                if (this.splitviewObject.secondaryArea != undefined && this.splitviewObject.secondaryArea == 79) {
                    this.inlineprimarywidth = '';
                    this.inputSecondaryWidth = this.splitviewObject.secondaryArea + "%";
                }
                else {
                    this.inlineprimarywidth = '';
                    this.inputSecondaryWidth = '';
                }
            }
            this.SecondaryViewheightClass = "inlineSecondaryviewheight";
        }
        else {
            this.edges = { bottom: false, right: false, top: false, left: false };
            if (this.splitviewObject.secondaryArea != undefined && this.splitviewObject.secondaryArea == 79) {
                this.inlineprimarywidth = '';
                this.inputSecondaryWidth = this.splitviewObject.secondaryArea + "%";
            }
            else {
                this.inlineprimarywidth = '';
                this.inputSecondaryWidth = '';
            }
            this.SecondaryViewheightClass = "Secondaryviewheight";
        }
        this.blnSplitfocus = -1;
    };
    SplitViewComponent.prototype.ngAfterViewChecked = function () {
        var contextObj = this;
        if (contextObj.splitviewObject.showSecondaryView) {
            if (contextObj.blnSplitfocus < 0) {
                if (window.innerWidth > 400) {
                    contextObj.currentfocus = document.activeElement;
                    contextObj.SplitViewFocus("secondary-view show", "secondary-view");
                    window["GlobalFocusVariable"] = null;
                    contextObj.isviewfocuschange = true;
                    contextObj.isclosewindow = false;
                }
                else {
                    contextObj.currentfocus = document.activeElement;
                    contextObj.SplitViewFocus("secondary-view show-vertical", "secondary-view-vertical");
                    window["GlobalFocusVariable"] = null;
                    contextObj.isviewfocuschange = true;
                    contextObj.isclosewindow = false;
                }
            }
        }
        else {
            contextObj.blnSplitfocus = -1;
            if (this.currentfocus && this.isviewfocuschange) {
                this.isviewfocuschange = false;
                //window["GlobalFocusVariable"] = this.currentfocus;
                var notify = document.getElementById('avoidaddress');
                if (notify)
                    notify.focus();
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
            if (this.isclosewindow)
                window["GlobalFocusVariable"] = null;
        }
    };
    SplitViewComponent.prototype.SplitViewFocus = function (classname, SubClassname) {
        var ContextObj = this;
        var RootClass = ContextObj.el.nativeElement.getElementsByClassName(classname);
        if (RootClass && RootClass.length > 0) {
            var length = RootClass.length;
            var CurrentElement = RootClass[length - 1];
            if (ContextObj.labeltitle) {
                CurrentElement.setAttribute('aria-label', ContextObj.labeltitle);
                CurrentElement.removeAttribute("title");
            }
            CurrentElement.tabIndex = 0;
            setTimeout(function () {
                CurrentElement.focus();
            }, 400);
            ContextObj.blnSplitfocus = length;
            var endClass;
            endClass = CurrentElement.getElementsByClassName(SubClassname);
            if (endClass && endClass.length > 0) {
                endClass[0].addEventListener('focusin', function (event) {
                    if (endClass[0].className == SubClassname) {
                        CurrentElement.tabIndex = 0;
                        CurrentElement.focus();
                    }
                });
            }
            else {
                endClass = CurrentElement.getElementsByClassName("SplitEndfocus");
                if (endClass && endClass.length > 0) {
                    endClass[endClass.length - 1].addEventListener('focusin', function (event) {
                        CurrentElement.tabIndex = 0;
                        CurrentElement.focus();
                    });
                }
            }
        }
    };
    SplitViewComponent.prototype.getPrimaryStyle = function () {
        if (this.inlineSecondaryView == false || this.inlineSecondaryView == undefined) {
            return "primary-view";
        }
        else {
            if (this.splitviewObject.showSecondaryView) {
                return "inline-primary-view-show";
            }
            else {
                return "inline-primary-view";
            }
        }
    };
    SplitViewComponent.prototype.getSecondaryStyle = function () {
        var contextObj = this;
        if (this.inlineSecondaryView == false || this.inlineSecondaryView == undefined) {
            if (this.splitviewObject.showSecondaryView) {
                if (window.innerWidth > 400) {
                    //if (contextObj.blnSplitfocus < 0) {
                    //    contextObj.currentfocus = document.activeElement;
                    //    setTimeout(function () {
                    //        contextObj.SplitViewFocus("secondary-view show", "secondary-view");
                    //        window["GlobalFocusVariable"] = null;                            
                    //        contextObj.isviewfocuschange = true;
                    //    }, 100);  
                    //    contextObj.isclosewindow = false;                      
                    //}
                    this.closeIconPath = "Content/Images/close_01.png";
                    this.width_secondary = this.splitviewObject.secondaryArea + "%";
                    this.height_secondary = "99%";
                    this.top_secondary = "0%";
                    return "secondary-view show";
                }
                else {
                    //if (contextObj.blnSplitfocus < 0) {
                    //    contextObj.currentfocus = document.activeElement;
                    //    setTimeout(function () {
                    //        contextObj.SplitViewFocus("secondary-view show-vertical", "secondary-view-vertical");
                    //        window["GlobalFocusVariable"] = null;
                    //        contextObj.isviewfocuschange = true;
                    //    }, 100);                       
                    //    contextObj.isclosewindow = false;
                    //}  
                    this.closeIconPath = "Content/Images/bottompanelshow_icon.png";
                    this.width_secondary = "99%";
                    this.height_secondary = this.splitviewObject.secondaryArea + "%";
                    this.top_secondary = 100 - this.splitviewObject.secondaryArea + "%";
                    return "secondary-view show-vertical";
                }
            }
            else {
                //this.blnSplitfocus = -1;
                //if (this.currentfocus && this.isviewfocuschange) {
                //    this.isviewfocuschange = false;
                //    window["GlobalFocusVariable"] = this.currentfocus;
                //}
                //if (this.isclosewindow)
                //    window["GlobalFocusVariable"] = null;
                if (window.innerWidth > 400) {
                    this.width_secondary = this.splitviewObject.secondaryArea + "%";
                    this.height_secondary = "99%";
                    this.top_secondary = "0%";
                    return "secondary-view";
                }
                else {
                    this.width_secondary = "99%";
                    this.height_secondary = this.splitviewObject.secondaryArea + "%";
                    this.top_secondary = "100%";
                    return "secondary-view-vertical";
                }
            }
        }
        else {
            if (this.splitviewObject.showSecondaryView) {
                if (window.innerWidth > 400) {
                    this.closeIconPath = "Content/Images/close_01.png";
                    this.width_secondary = "40%";
                    this.height_secondary = "99%";
                    this.top_secondary = "0%";
                    return "inline-secondary-view show";
                }
                else {
                    this.closeIconPath = "Content/Images/bottompanelshow_icon.png";
                    this.width_secondary = "40%";
                    this.height_secondary = "99%";
                    return "inline-secondary-view show-vertical";
                }
            }
            else {
                if (window.innerWidth > 400) {
                    this.width_secondary = "40%";
                    this.height_secondary = "99%";
                    this.top_secondary = "0%";
                    return "inline-secondary-view";
                }
                else {
                    this.width_secondary = "40%";
                    this.height_secondary = "99%";
                    this.top_secondary = "100%";
                    return "inline-secondary-view-vertical";
                }
            }
        }
    };
    SplitViewComponent.prototype.onResizeEnd = function (event) {
        var fireRefreshEventOnWindow = function () {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent('resize', true, false);
            window.dispatchEvent(evt);
        };
        //left: `${event.rectangle.left}px`,
        //top: `${event.rectangle.top}px`,
        /*console.log("onresize");*/
        this.inputSecondaryWidth = this.splitviewObject.secondaryArea + "%";
        this.inlineprimarywidth = 100 - this.splitviewObject.secondaryArea + "%";
        if (this.inlineSecondaryView == true) {
            this.width_secondary = event.rectangle.width + "px";
            this.height_secondary = event.rectangle.height + "px";
            this.inlineprimarywidth = this.sanitizer.bypassSecurityTrustStyle("calc(100% - " + this.width_secondary + ")");
            if ((window.innerWidth - event.rectangle.width) < 50) {
                var rctngleWidth = event.rectangle.width - 50;
                this.inlineprimarywidth = this.sanitizer.bypassSecurityTrustStyle("calc(100% - " + rctngleWidth + ")");
                this.width_secondary = rctngleWidth + "px";
                this.inputSecondaryWidth = rctngleWidth + "px";
            }
            else {
                var rctngleWidth = event.rectangle.width;
                this.inputSecondaryWidth = rctngleWidth + "px";
            }
            setTimeout(function () {
                /*window.dispatchEvent(new Event("resize"));*/
                fireRefreshEventOnWindow();
            }, 100);
            this.afterResize.emit({});
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SplitViewComponent.prototype, "splitviewObject", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SplitViewComponent.prototype, "pageTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SplitViewComponent.prototype, "inlineSecondaryView", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SplitViewComponent.prototype, "afterResize", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SplitViewComponent.prototype, "onSecondaryClose", void 0);
    SplitViewComponent = __decorate([
        core_1.Component({
            selector: 'split-view',
            templateUrl: './app/Framework/Views/Split-View/split-view.component.html',
            styleUrls: ['./app/Framework/Views/Split-View/split-view.component.css'],
            directives: [resizable_directive_1.Resizable, resizable_directive_1.ResizeHandle]
        }), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizationService, core_1.ElementRef])
    ], SplitViewComponent);
    return SplitViewComponent;
}());
exports.SplitViewComponent = SplitViewComponent;
//# sourceMappingURL=split-view.component.js.map