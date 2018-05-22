import { Component, ElementRef, Input, Output, AfterViewChecked,EventEmitter,SimpleChange} from '@angular/core';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import {Resizable, ResizeEvent, ResizeHandle} from '../../../Framework/ExternalLibraries/Resizable/resizable.directive';
import {DomSanitizationService} from '@angular/platform-browser';

@Component({
    selector: 'split-view',
    templateUrl: './app/Framework/Views/Split-View/split-view.component.html',
    styleUrls: ['./app/Framework/Views/Split-View/split-view.component.css'],
    directives: [Resizable, ResizeHandle]
})

export class SplitViewComponent implements AfterViewChecked{

    @Input() splitviewObject: ISplitView;
    @Input() pageTitle;
    @Input() inlineSecondaryView;
    blnSplitfocus: number = -1;
    isclosewindow: boolean = false;
    isviewfocuschange: boolean = true;
    currentfocus: any;
    inputSecondaryWidth:any;
    inlineprimarywidth: any;
    showIconPath: string = "Content/Images/General/add-icon.png";
    hideIconPath: string = "Content/Images/General/cancel-icon.png";
    closeIconPath: string = "Content/Images/close_01.png";
    resizeOption = false;
    el: any;
    labeltitle: string = '';
    public height_secondary: string = "";
    public width_secondary: string = "";
    public top_secondary: string = "0%";
    public style: Object = {
        width: `${this.width_secondary}px`,
        height: `${this.height_secondary}px`
    };
    edges: any;
    SecondaryViewheightClass: any = "Secondaryviewheight";

    @Output() afterResize = new EventEmitter();
    @Output() onSecondaryClose = new EventEmitter();
    constructor(private sanitizer: DomSanitizationService, elemRef: ElementRef) {
        this.el = elemRef;
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {

        this.pageTitle = this.pageTitle;
        this.splitviewObject.showSecondaryView = this.splitviewObject.showSecondaryView;
        if (this.inlineSecondaryView == true) {
            this.resizeOption = true;
            this.edges = { bottom: false, right: false, top: false, left: true };
            if (this.splitviewObject.secondaryArea  != undefined) {
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
    }

    onSecondaryViewClose() {
        this.blnSplitfocus = -1;
        if (this.currentfocus) {
            this.currentfocus.focus();
        }
        window["GlobalFocusVariable"] = null;
        this.isclosewindow = true;
        //this.isviewfocuschange = false;
        this.splitviewObject.showSecondaryView = false;
        this.onSecondaryClose.emit({});
    }

    ngOnInit()
    {

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
                else
                {
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
    }

    ngAfterViewChecked() {
        var contextObj: any = this;
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
                var notify: any = document.getElementById('avoidaddress');
                if (notify)
                    notify.focus();
                setTimeout(function () {
                    var RootClass: any = document.getElementsByClassName("toast-message");
                    if (!RootClass || RootClass.length == 0) {
                        contextObj.currentfocus.focus();
                    } else {
                        window["GlobalFocusVariable"] = contextObj.currentfocus;
                    }
                }, 100);
            }            
            if (this.isclosewindow)
                window["GlobalFocusVariable"] = null;
        }
    }

    SplitViewFocus(classname: string, SubClassname: string) {
        var ContextObj: any = this;
        var RootClass: any = ContextObj.el.nativeElement.getElementsByClassName(classname);
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
            }, 400)   
            ContextObj.blnSplitfocus = length;
            var endClass: any;
            endClass = CurrentElement.getElementsByClassName(SubClassname);
            if (endClass && endClass.length > 0) {
                endClass[0].addEventListener('focusin', function (event) {
                    if (endClass[0].className == SubClassname) {
                        CurrentElement.tabIndex = 0;
                        CurrentElement.focus();
                    }
                });
            } else {
                endClass = CurrentElement.getElementsByClassName("SplitEndfocus");
                if (endClass && endClass.length > 0) {
                    endClass[endClass.length - 1].addEventListener('focusin', function (event) {
                        CurrentElement.tabIndex = 0;
                        CurrentElement.focus();
                    });
                }
            }
        }
    }

    getPrimaryStyle() {
        if (this.inlineSecondaryView == false || this.inlineSecondaryView == undefined)
        {
            return "primary-view";
        }
        else {
            if (this.splitviewObject.showSecondaryView)
            {
                return "inline-primary-view-show";
            }
            else {
                return "inline-primary-view";
            }
        }
    }

    getSecondaryStyle() {
        var contextObj: any = this;
        if (this.inlineSecondaryView == false || this.inlineSecondaryView == undefined){
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
        else
        {
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
    }
    onResizeEnd(event: ResizeEvent): void {
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
            this.width_secondary = `${event.rectangle.width}px`;
            this.height_secondary = `${event.rectangle.height}px`;
            this.inlineprimarywidth = this.sanitizer.bypassSecurityTrustStyle("calc(100% - " + this.width_secondary + ")");
            if ((window.innerWidth - event.rectangle.width) < 50) {
                var rctngleWidth = event.rectangle.width - 50;
                this.inlineprimarywidth = this.sanitizer.bypassSecurityTrustStyle("calc(100% - " + rctngleWidth + ")");
                this.width_secondary = `${rctngleWidth}px`;
                this.inputSecondaryWidth = `${rctngleWidth}px`;
            }
            else {
                var rctngleWidth = event.rectangle.width;
                this.inputSecondaryWidth = `${rctngleWidth}px`;
            }
            setTimeout(function () {
                /*window.dispatchEvent(new Event("resize"));*/
                fireRefreshEventOnWindow();
            }, 100);
            this.afterResize.emit({});
        }

    }


}