import { Component, Input, Output, forwardRef, EventEmitter, Inject, SimpleChange, OnChanges, DoCheck, OnInit, ElementRef, HostListener} from '@angular/core';
import {IContextMenu} from '../../Models/Interface/IContext-menu';


@Component({
    selector: 'grid-context-menu',
    templateUrl: './app/Framework/Views/ContextMenu/gridcontextmenu.component.html',
    styleUrls: ['app/Framework/Views/ContextMenu/contextmenu.css'],
    directives: []
})
export class GridContextMenu implements OnInit, OnChanges {
    @Input() xposition: string;
    @Input() yposition: string;
    @Input() visibility: boolean;
    @Input() menuItems: any;
    @Input() gridElement: any;
    @Output() contextMenuOnClick = new EventEmitter();
    display: string = 'hidden';
    Styles: any;
    change: boolean = false;
    public elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        console.log("this.xposition && this.yposition", this.xposition && this.yposition);
        if (this.xposition && this.yposition) {
            this.Styles = { 'top': this.yposition + 'px', 'left': this.xposition + 'px' };
        }
    }
    @HostListener('document:GridContextMenuEvent', ['$event', '$event.detail.xPos', '$event.detail.yPos'])
    showContextMenu(event, xPos, yPos) {
        this.change = true;
        if (xPos == 0 && yPos == 0) {
            this.display = 'hidden';
        }
        else {
            var contextObj = this;
            contextObj.xposition = xPos; contextObj.yposition = yPos;
            setTimeout(function () {
                // if (changes["xposition"] && changes["xposition"]["currentValue"] && changes["xposition"]["currentValue"] != changes["xposition"]["previousValue"] || (changes["yposition"] && changes["yposition"]["currentValue"] && changes["yposition"]["currentValue"] != changes["yposition"]["previousValue"])) {
                if (contextObj.gridElement && contextObj.xposition && contextObj.yposition) {
                    // contextObj.yposition += 45;
                    //var viewrectCanvas = contextObj.gridElement.getBoundingClientRect();
                    //var oldX = contextObj.xposition, oldY = contextObj.yposition;
                    //var viewrectTooltip = contextObj.elementRef.nativeElement.children[0].getBoundingClientRect();

                    //if ((contextObj.xposition + viewrectTooltip.width) > viewrectCanvas.width)
                    //    contextObj.xposition = (+contextObj.xposition - viewrectTooltip.width).toString();
                    //if ((contextObj.yposition + viewrectTooltip.height) > viewrectCanvas.height)
                    //    contextObj.yposition = (+contextObj.yposition - viewrectTooltip.height).toString();

                    ////////////////////////////////////////////////////////////////////////////////
                    //var intYpos = +contextObj.yposition;
                    //if (intYpos < 0) {
                    //    contextObj.yposition = (0 - (intYpos)).toString();
                    //    var offsetY = Math.abs(viewrectCanvas.height - (+oldY + +viewrectTooltip.height));
                    //    contextObj.yposition = Math.abs((+oldY - offsetY)).toString();
                    //}

                    //if (intYpos > window.innerHeight)
                    //    contextObj.yposition = (intYpos - (intYpos - window.innerHeight)).toString();

                    //var intXpos = +contextObj.xposition;
                    //if (intXpos < 0) {
                    //    contextObj.xposition = (0 - (intXpos)).toString();
                    //    var offsetX = Math.abs(viewrectCanvas.width - (+oldX + +viewrectTooltip.width));
                    //    contextObj.xposition = Math.abs((+oldX - offsetX)).toString();
                    //}

                    //if (intXpos > window.innerWidth)
                    //    contextObj.xposition = (intXpos - (intXpos - window.innerWidth)).toString();

                    //contextObj.yposition = +contextObj.yposition + viewrectCanvas.top;
                    //contextObj.xposition = +contextObj.xposition + viewrectCanvas.left;
                    //         //////////////////////////////////////////////////////////////////////////////
                    contextObj.Styles = { 'top': (contextObj.yposition) + 'px', 'left': contextObj.xposition + 'px' };
                }
                if (contextObj.visibility == true)
                    contextObj.display = 'visible';
                else
                    contextObj.display = 'hidden';
            }, 50);
        }
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {

    }
    menuOnClick(event: any) {
        this.contextMenuOnClick.emit(event);
    }
    onContextMenu(event: any, item: any) {
        event.preventDefault();
    }
    hideContextMenu() {
        this.display = 'hidden';
        this.contextMenuOnClick.emit(false);
    }
}