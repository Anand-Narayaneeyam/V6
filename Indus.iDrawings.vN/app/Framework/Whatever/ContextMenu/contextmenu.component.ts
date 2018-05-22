import { Component, Input, Output, forwardRef, EventEmitter, Inject, SimpleChange, OnChanges, DoCheck, OnInit, ElementRef, HostListener} from '@angular/core';
import {IContextMenu} from '../../Models/Interface/IContext-menu';


@Component({
    selector: 'context-menu',
    templateUrl: './app/Framework/Views/ContextMenu/contextmenu.component.html',
    styleUrls: ['app/Framework/Views/ContextMenu/contextmenu.css'],
    directives: []
})
export class ContextMenu implements OnInit, OnChanges{
    @Input() xposition: string;
    @Input() yposition: string;
    @Input() visibility: boolean;
    @Input() menuItems: any;
    @Input() canvas: any;
    @Output() contextMenuOnClick= new EventEmitter();
    display: string = 'hidden';
    secondmenudisplay: string = 'hidden';
    Styles: any;
    secondMenuStyles: any;
    change: boolean = false;
    secondMenu: any;
    public elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        console.log("this.xposition && this.yposition", this.xposition && this.yposition);
        if (this.xposition && this.yposition) {
            this.Styles = { 'top': this.yposition + 'px', 'left': this.xposition+'px' };
        }               
    }
    @HostListener('document:ContextMenuEvent', ['$event', '$event.detail.xPos', '$event.detail.yPos'])
    showContextMenu(event, xPos, yPos) {
        this.change = true;
        if (xPos == 0 && yPos == 0) {
            this.display = 'hidden';
            this.secondmenudisplay = 'hidden';
        }
        else {
            var contextObj = this;
            contextObj.xposition = xPos; contextObj.yposition = yPos;
            setTimeout(function () {
                debugger;
                // if (changes["xposition"] && changes["xposition"]["currentValue"] && changes["xposition"]["currentValue"] != changes["xposition"]["previousValue"] || (changes["yposition"] && changes["yposition"]["currentValue"] && changes["yposition"]["currentValue"] != changes["yposition"]["previousValue"])) {
                if (contextObj.canvas && contextObj.xposition && contextObj.yposition) {
                    // contextObj.yposition += 45;
                    var viewrectCanvas = contextObj.canvas.getBoundingClientRect();
                    var oldX = contextObj.xposition, oldY = contextObj.yposition;
                    var viewrectTooltip = contextObj.elementRef.nativeElement.children[0].getBoundingClientRect();

                    if ((contextObj.xposition + viewrectTooltip.width) > viewrectCanvas.width)
                        contextObj.xposition = (+contextObj.xposition - viewrectTooltip.width).toString();
                    if ((contextObj.yposition + viewrectTooltip.height) > viewrectCanvas.height)
                        contextObj.yposition = (+contextObj.yposition - viewrectTooltip.height).toString();

                    //////////////////////////////////////////////////////////////////////////////
                    var intYpos = +contextObj.yposition;
                    if (intYpos < 0) {
                        contextObj.yposition = (0 - (intYpos)).toString();
                        var offsetY = Math.abs(viewrectCanvas.height - (+oldY + +viewrectTooltip.height));
                        contextObj.yposition = Math.abs((+oldY - offsetY)).toString();
                    }

                    if (intYpos > window.innerHeight)
                        contextObj.yposition = (intYpos - (intYpos - window.innerHeight)).toString();

                    var intXpos = +contextObj.xposition;
                    if (intXpos < 0) {
                        contextObj.xposition = (0 - (intXpos)).toString();
                        var offsetX = Math.abs(viewrectCanvas.width - (+oldX + +viewrectTooltip.width));
                        contextObj.xposition = Math.abs((+oldX - offsetX)).toString();
                    }

                    if (intXpos > window.innerWidth)
                        contextObj.xposition = (intXpos - (intXpos - window.innerWidth)).toString();

                    contextObj.yposition = +contextObj.yposition + viewrectCanvas.top;
                    contextObj.xposition = +contextObj.xposition + viewrectCanvas.left;
                    //         //////////////////////////////////////////////////////////////////////////////
                    contextObj.Styles = { 'top': (contextObj.yposition) + 'px', 'left': contextObj.xposition + 'px' };
                }
                if (contextObj.visibility == true)
                    contextObj.display = 'visible';
                else {
                    contextObj.display = 'hidden';
                    contextObj.secondmenudisplay = 'hidden';
                }
            }, 50);       
        }       
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    //    this.change = true;
    //    var contextObj = this;
    //    console.log("contextObj.xposition: " + contextObj.xposition + ", contextObj.yposition: " + contextObj.yposition);
    //    if (changes["xposition"] && changes["xposition"]["currentValue"] && changes["xposition"]["currentValue"] != changes["xposition"]["previousValue"] || (changes["yposition"] && changes["yposition"]["currentValue"] && changes["yposition"]["currentValue"] != changes["yposition"]["previousValue"])) {
    //        if (contextObj.canvas && contextObj.xposition && contextObj.yposition) {
    //           // contextObj.yposition += 45;
    //            var viewrectCanvas = contextObj.canvas.getBoundingClientRect();
    //            var oldX = contextObj.xposition, oldY = contextObj.yposition;
    //            var viewrectTooltip = contextObj.elementRef.nativeElement.children[0].getBoundingClientRect();
    //            //if (viewrectTooltip.width < 10)
    //            //    viewrectTooltip.width = 170;
    //            //if (viewrectTooltip.height < 10)
    //            //    viewrectTooltip.height= 170;
    //            if ((contextObj.xposition + viewrectTooltip.width) > viewrectCanvas.width)
    //                contextObj.xposition = (+contextObj.xposition - viewrectTooltip.width).toString();
    //            if ((contextObj.yposition + viewrectTooltip.height) > viewrectCanvas.height)
    //                contextObj.yposition = (+contextObj.yposition - viewrectTooltip.height).toString();

    //            //////////////////////////////////////////////////////////////////////////////
    //            var intYpos = +contextObj.yposition;
    //            if (intYpos < 0) {
    //                contextObj.yposition = (0 - (intYpos)).toString();
    //                //var offsetY = Math.abs((viewrectCanvas.height - (+oldY + +viewrectTooltip.height)) + viewrectCanvas.top + 15);
    //                var offsetY = Math.abs(viewrectCanvas.height - (+oldY + +viewrectTooltip.height));
    //                contextObj.yposition = Math.abs((+oldY - offsetY)).toString();
    //            }

    //            if (intYpos > window.innerHeight)
    //                contextObj.yposition = (intYpos - (intYpos - window.innerHeight)).toString();

    //            var intXpos = +contextObj.xposition;
    //            if (intXpos < 0) {
    //                contextObj.xposition = (0 - (intXpos)).toString();
    //                // var offsetX = Math.abs((viewrectCanvas.width - (+oldX + +viewrectTooltip.width)) + viewrectCanvas.left);
    //                var offsetX = Math.abs(viewrectCanvas.width - (+oldX + +viewrectTooltip.width));
    //                contextObj.xposition = Math.abs((+oldX - offsetX)).toString();
    //            }

    //            if (intXpos > window.innerWidth)
    //                contextObj.xposition = (intXpos - (intXpos - window.innerWidth)).toString();

    //            contextObj.yposition = +contextObj.yposition + viewrectCanvas.top;
    //            contextObj.xposition = +contextObj.xposition + viewrectCanvas.left;
    //            //////////////////////////////////////////////////////////////////////////////
    //        }
    //        this.Styles = { 'top': (this.yposition) + 'px', 'left': this.xposition + 'px' };
    //    }
    //    if (this.visibility == true)
    //        this.display = 'visible';
    //    else
    //        this.display = 'hidden';
    }
    menuOnClick(event: any) {
        if (event != undefined) {
            if (event.secondMenu != undefined) {
                this.secondmenudisplay = 'hidden';
            }
            else {
                this.showHideSecondMenu();
                this.contextMenuOnClick.emit(event);
            }
        }
    }
    showHideSecondMenu() {
        if (this.secondmenudisplay == 'hidden')
            this.secondmenudisplay = 'visible';
        else
            this.secondmenudisplay = 'hidden';
    }
    firstLevelMenuOver(event: any) {
        if (event.secondMenu != undefined) {
        var index;
        index = this.menuItems.findIndex(function (el) { return el.menuId == event.menuId })
        var xPos;
        var yPos;
        if (index != -1) {
            yPos = index * 25;
            var width = document.getElementById("contextmenu_mainMenu").offsetWidth;
            xPos = width;
        }
        this.secondMenu = event.secondMenu
        this.secondMenuStyles = { 'top': (this.yposition + yPos) + 'px', 'left': (this.xposition + xPos) + 'px' };
        this.secondmenudisplay = 'visible';
        } else {
            this.secondmenudisplay = 'hidden';
        }
    }
    getSecondMenu() {
        
    }
}