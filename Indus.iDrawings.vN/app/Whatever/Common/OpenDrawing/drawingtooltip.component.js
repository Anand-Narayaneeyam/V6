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
var DrawingTooltip = (function () {
    function DrawingTooltip(elementRef) {
        this.display = 'hidden';
        this.change = false;
        this.elementRef = elementRef;
    }
    DrawingTooltip.prototype.onMousemove = function (event) {
        if (this.display == "visible")
            this.display = 'hidden';
    };
    DrawingTooltip.prototype.showTooltip = function (event, xPos, yPos, tooltipValue) {
        console.log("showTooltip-" + this.canvas.id);
        this.change = true;
        this.xposition = xPos;
        this.yposition = yPos;
        this.tooltipData = tooltipValue;
        if (this.canvas && this.xposition && this.yposition) {
            var viewrectCanvas = this.canvas.getBoundingClientRect();
            if (this.data) {
                this.tooltipData = this.data;
            }
            var contextObj = this;
            setTimeout(function () {
                var isXPositionChange = false;
                var isYPositionChange = false;
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
    };
    DrawingTooltip.prototype.ngOnInit = function () {
        console.log("tooltipdata", this.data);
        if (this.xposition && this.yposition) {
            this.Styles = { 'top': this.yposition + 'px', 'left': this.xposition + 'px' };
        }
    };
    DrawingTooltip.prototype.ngOnChanges = function (changes) {
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
    };
    DrawingTooltip.prototype.menuOnClick = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DrawingTooltip.prototype, "xposition", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DrawingTooltip.prototype, "yposition", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DrawingTooltip.prototype, "visibility", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DrawingTooltip.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DrawingTooltip.prototype, "canvas", void 0);
    __decorate([
        core_1.HostListener('window:mousemove', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DrawingTooltip.prototype, "onMousemove", null);
    __decorate([
        core_1.HostListener('document:TooltipEvent', ['$event', '$event.detail.xPos', '$event.detail.yPos', '$event.detail.tooltipValue']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Object, Object, Object]), 
        __metadata('design:returntype', void 0)
    ], DrawingTooltip.prototype, "showTooltip", null);
    DrawingTooltip = __decorate([
        core_1.Component({
            selector: 'drawing-tooltip',
            templateUrl: './app/Views/Common/OpenDrawing/drawingtooltip.component.html',
            directives: []
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DrawingTooltip);
    return DrawingTooltip;
}());
exports.DrawingTooltip = DrawingTooltip;
//# sourceMappingURL=drawingtooltip.component.js.map