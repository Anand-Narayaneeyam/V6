import { Component, Input, Output, forwardRef, EventEmitter, Inject, SimpleChange, OnChanges,DoCheck, OnInit,ElementRef} from '@angular/core';
import {AppComponent } from '../../../app.component';

@Component({
    selector: 'slide',
    templateUrl:'app/Framework/Views/Slide/slide.component.html',
    directives: [],
    providers: [],
    inputs: ['width', 'position','type','absolute'],
})

export class SlideComponent implements OnInit,DoCheck {
    @Input() width;
    @Input() position;
    @Input() absolute;
    @Input() type;
    @Input() show = false;
    @Input() title;
    @Input() titlebar;
    @Input() closeicon;
    @Input() change;
    @Input() autoclose;
    @Input() zindex;
    @Input() inline;
    @Input() isAnimate;
    @Output() closeDialog = new EventEmitter();
    dialogwidth = 0;
    divPosition;
    contentdialogwidth: any;
    imageWidth: any;
    visible;
    lengthsidenav;
    Styles: any;
    Imagepath;
    background;
    count = 0;
    className;
    currentfocus: any;
    isviewfocuschange: boolean = false;
    el: any;
    constructor(elemRef: ElementRef) {
        this.el = elemRef;
    }

    ngOnInit() {
        this.Imagepath ="Content/Icons/questionN.png";
        if (this.autoclose == undefined || this.autoclose == true)
            this.className = "slidenotificationcontainer";
        else
            this.className = "slidenotificationcontainerntauto";
        if (this.isAnimate == undefined || this.isAnimate == null || this.isAnimate == true)
            this.className = this.className + " transformAnimate";
        if (this.type == undefined || this.type =="notification" )
        {
            this.type = "notification";
            if (this.width) {
                if (this.width <= 300)
                    this.width = 300;
                this.contentdialogwidth = this.width - 80;
                this.imageWidth = 80;
            }
        }
        else
        {
            this.contentdialogwidth = this.width;
            this.imageWidth =0;
            this.type = "dialog";
        }
        if (this.title == undefined)
        {
            this.title = "iDrawings V6";
        }

        if (this.titlebar == undefined || this.titlebar == true) {
            this.titlebar = true;
        }       
        else
        {
            this.titlebar = false;
        }
        if (this.closeicon == undefined || this.closeicon == true) {
            this.closeicon = true;
        }
        else
        {
            this.closeicon = false;
        }    
        this.background = this.type == "notification" ? '#FFFFFF' : '#FFFFFF';
        if (this.show == false) {
            this.visible = "hidden";
        }
        
    }

    

    closeonkeypress(Keyevent) {
        var key = Keyevent.keyCode || Keyevent.which;
        if (key == 13 || key == 32) {
            Keyevent.preventDefault(); 
            this.closeNav();
        }
    }

    ngDoCheck() {

    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
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
                this.contentdialogwidth = this.width - 80
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
            this.Styles = { 'top': '25%', 'left': '40%', 'z-index': this.zindex};
        }
        else if (this.position == "top-left") {
            this.Styles = { 'top': '60px', 'left': '0px', 'z-index': this.zindex };
        }
        else if (this.position == "top-right") {
            this.Styles = { 'top': '60px', 'right': '0px','z-index': this.zindex };
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
        else
        {
            this.Styles = { 'top': '25%', 'left': '40%', 'z-index': this.zindex };
        }
        this.lengthsidenav = document.getElementsByClassName("slidenotificationcontainer").length;
        for (this.count = 0; this.count < this.lengthsidenav; this.count++)
        {
            if ((<HTMLInputElement>document.getElementsByClassName("slidenotificationcontainer")[this.count]).style.visibility == "visible" && this.show == true )
            {
                (<HTMLInputElement>document.getElementsByClassName("slidenotificationcontainer")[this.count]).style.width ="0";
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
        else
        {
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
            })  
        }
        var contextObj: any = this; /* 508 Compliance*/
        if (contextObj.show == true) {
            contextObj.isviewfocuschange = true;
            if (window["GlobalFocusVariable"])
                contextObj.currentfocus = window["GlobalFocusVariable"];
            else
                contextObj.currentfocus = document.activeElement;
            setTimeout(function () { contextObj.SlideViewFocus() }, 1000);
            window["GlobalFocusVariable"] = null;
        } else {
            if (contextObj.isviewfocuschange) {
                contextObj.isviewfocuschange = false;
                window["GlobalFocusVariable"] = null;
                var notify: any = document.getElementById('avoidaddress');
                if (notify)
                    notify.focus();
                if (contextObj.currentfocus) {
                    setTimeout(function () {
                        var RootClass: any = document.getElementsByClassName("toast-message");
                        if (!RootClass || RootClass.length == 0) {
                            contextObj.currentfocus.focus();
                        } else {
                            window["GlobalFocusVariable"] = contextObj.currentfocus;
                        }
                    }, 100);
                }
            }
        }
    }
    SlideViewFocus() { /* 508 Compliance*/
        var ContextObj: any = this;
        var RootClass: any = ContextObj.el.nativeElement.getElementsByClassName("slidenotificationcontainer");
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
                    var endClass: any = RootClass[position].getElementsByClassName("SlideEndfocus");
                    if (endClass && endClass.length > 0) {
                        endClass[0].addEventListener('focusin', function (event) {
                            RootClass[position].tabIndex = 0;
                            RootClass[position].focus();
                        });
                    }
                }
            }
        }
    }
    closeNav()
    {
        this.dialogwidth = 0; 
        this.closeDialog.emit({
            value: false,
            change: false
        })
    } 
}
