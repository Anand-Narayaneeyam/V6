import { Component, Input, Output, forwardRef, EventEmitter, Inject, SimpleChange, OnChanges, DoCheck, OnInit, ElementRef, HostListener} from '@angular/core';


@Component({
    selector: 'drawing-tooltip',
    templateUrl: './app/Views/Common/OpenDrawing/drawingtooltip.component.html',
    directives: []
})
export class DrawingTooltip implements OnInit, OnChanges {
    @Input() xposition: string;
    @Input() yposition: string;
    @Input() visibility: boolean;
    @Input() data: any[];
    @Input() canvas: any;
    display: string = 'hidden';
    change: boolean = false;
    tooltipData: any[];
    Styles: any;
    public elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }

    @HostListener('window:mousemove', ['$event'])
    onMousemove(event) {
        if (this.display == "visible")
            this.display='hidden';
    }

    @HostListener('document:TooltipEvent', ['$event', '$event.detail.xPos', '$event.detail.yPos', '$event.detail.tooltipValue'])

    showTooltip(event, xPos, yPos, tooltipValue) {
        console.log("showTooltip-" + this.canvas.id);
        this.change = true;
        this.xposition = xPos; this.yposition = yPos;
        this.tooltipData = tooltipValue;
        if (this.canvas && this.xposition && this.yposition) {            
            var viewrectCanvas = this.canvas.getBoundingClientRect();
            if (this.data) {
                this.tooltipData = this.data;
            }
            var contextObj = this;
            setTimeout(function () {
                var isXPositionChange: boolean = false;
                var isYPositionChange: boolean = false;
                var oldX = contextObj.xposition, oldY = contextObj.yposition;
                var viewrectTooltip = contextObj.elementRef.nativeElement.children[0].getBoundingClientRect();
                //console.log("tooltip: this.xposition && this.yposition: "+ contextObj.xposition +","+ contextObj.yposition);
                if ((contextObj.xposition + viewrectTooltip.width) > viewrectCanvas.width) {
                    contextObj.xposition = (+contextObj.xposition - viewrectTooltip.width).toString();
                    isXPositionChange = true;
                }

                if ((contextObj.yposition + viewrectTooltip.height) > viewrectCanvas.height) {
                    contextObj.yposition = (+contextObj.yposition - viewrectTooltip.height).toString();
                    isYPositionChange = true;
                }
                                               
                //console.log("tooltip: this.yposition  " + contextObj.yposition);
                if (isXPositionChange == false && isYPositionChange == false) {
                    contextObj.xposition = contextObj.xposition + 10;
                    contextObj.yposition = contextObj.yposition + 10;
                }
                var intYpos = +contextObj.yposition;
                if (intYpos < 0) {
                    contextObj.yposition = (0 - (intYpos)).toString();
                    //var offsetY = Math.abs((viewrectCanvas.height - (+oldY + +viewrectTooltip.height)) + viewrectCanvas.top + 15);
                    var offsetY = Math.abs(viewrectCanvas.height - (+oldY + +viewrectTooltip.height));
                    contextObj.yposition = Math.abs((+oldY - offsetY)).toString();
                }

                if (intYpos > window.innerHeight)
                    contextObj.yposition = (intYpos - (intYpos - window.innerHeight)).toString();

                var intXpos = +contextObj.xposition;
                if (intXpos < 0) {
                    contextObj.xposition = (0 - (intXpos)).toString();
                   // var offsetX = Math.abs((viewrectCanvas.width - (+oldX + +viewrectTooltip.width)) + viewrectCanvas.left);
                    var offsetX = Math.abs(viewrectCanvas.width - (+oldX + +viewrectTooltip.width));
                    contextObj.xposition = Math.abs((+oldX - offsetX)).toString();                   
                }

                if (intXpos > window.innerWidth)
                    contextObj.xposition = (intXpos - (intXpos - window.innerWidth)).toString();

                contextObj.yposition = +contextObj.yposition + viewrectCanvas.top;
                contextObj.xposition = +contextObj.xposition + viewrectCanvas.left;

                contextObj.Styles = { 'top': (contextObj.yposition) + 'px', 'left': (contextObj.xposition) + 'px' };
                //console.log("viewrect", viewrect);
                //console.log("tooltip: this.xposition && this.yposition: " + contextObj.xposition + "," + contextObj.yposition);

                if (contextObj.visibility == true) {

                    contextObj.display = 'visible';
                }
                else {
                    contextObj.display = 'hidden';
                }
            }, 50);
        }
    }

    ngOnInit() {
        console.log("tooltipdata", this.data);
        if (this.xposition && this.yposition) {
            this.Styles = { 'top': this.yposition + 'px', 'left': this.xposition + 'px' };
        }
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {  
        //this.change = true;
        //if (this.canvas && this.xposition && this.yposition) {
        //   // this.yposition += 45;
        //    var viewrectCanvas = this.canvas.getBoundingClientRect();
        //    if (this.data) {
        //        this.tooltipData = this.data;
        //    }
        //    var contextObj = this;
        //    setTimeout(function () {
        //        var isXPositionChange: boolean = false;
        //        var isYPositionChange: boolean = false;
        //        //console.log("tooltip: this.xposition && this.yposition: "+ contextObj.xposition +","+ contextObj.yposition);
        //        contextObj.yposition = contextObj.yposition + viewrectCanvas.top;
        //        contextObj.xposition = contextObj.xposition + viewrectCanvas.left;
        //        var oldX = contextObj.xposition, oldY = contextObj.yposition;
        //        var viewrectTooltip = contextObj.elementRef.nativeElement.children[0].getBoundingClientRect();
              
        //        if ((contextObj.xposition + viewrectTooltip.width) > viewrectCanvas.width) {
        //            contextObj.xposition = (+contextObj.xposition - viewrectTooltip.width).toString();
        //            isXPositionChange = true;
        //        }
        //        if ((contextObj.yposition + viewrectTooltip.height) > viewrectCanvas.height) {
        //            contextObj.yposition = (+contextObj.yposition - viewrectTooltip.height).toString();
        //            isYPositionChange = true;
        //        }
        //        if (isXPositionChange == false && isYPositionChange == false) {
        //            contextObj.xposition = contextObj.xposition + 10;
        //            contextObj.yposition = contextObj.yposition + 10;
        //        }
        //        var intYpos = +contextObj.yposition;
        //        if (intYpos < 0) {
        //            contextObj.yposition = (0 - (intYpos)).toString();
        //            var offsetY = Math.abs((viewrectCanvas.height - (+oldY + +viewrectTooltip.height)) + viewrectCanvas.top + 15);
        //            contextObj.yposition = Math.abs((+oldY - offsetY)).toString();
        //        }
        //        if (intYpos > window.innerHeight)
        //            contextObj.yposition = (intYpos - (intYpos - window.innerHeight)).toString();
        //        contextObj.Styles = { 'top': (contextObj.yposition ) + 'px', 'left': (contextObj.xposition ) + 'px' };
        //        //console.log("viewrect", viewrect);
        //        //console.log("tooltip: this.xposition && this.yposition: " + contextObj.xposition + "," + contextObj.yposition);

        //        if (contextObj.visibility == true) {

        //            contextObj.display = 'visible';
        //        }
        //        else {
        //            contextObj.display = 'hidden';
        //        }
        //    }, 50);
        
            
        //}
        
    }
    menuOnClick() {

    }
}