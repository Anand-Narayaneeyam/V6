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
var ContextMenu = (function () {
    function ContextMenu(elementRef) {
        this.contextMenuOnClick = new core_1.EventEmitter();
        this.display = 'hidden';
        this.secondmenudisplay = 'hidden';
        this.change = false;
        this.elementRef = elementRef;
    }
    ContextMenu.prototype.ngOnInit = function () {
        console.log("this.xposition && this.yposition", this.xposition && this.yposition);
        if (this.xposition && this.yposition) {
            this.Styles = { 'top': this.yposition + 'px', 'left': this.xposition + 'px' };
        }
    };
    ContextMenu.prototype.showContextMenu = function (event, xPos, yPos) {
        this.change = true;
        if (xPos == 0 && yPos == 0) {
            this.display = 'hidden';
            this.secondmenudisplay = 'hidden';
        }
        else {
            var contextObj = this;
            contextObj.xposition = xPos;
            contextObj.yposition = yPos;
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
    };
    ContextMenu.prototype.ngOnChanges = function (changes) {
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
    };
    ContextMenu.prototype.menuOnClick = function (event) {
        if (event != undefined) {
            if (event.secondMenu != undefined) {
                this.secondmenudisplay = 'hidden';
            }
            else {
                this.showHideSecondMenu();
                this.contextMenuOnClick.emit(event);
            }
        }
    };
    ContextMenu.prototype.showHideSecondMenu = function () {
        if (this.secondmenudisplay == 'hidden')
            this.secondmenudisplay = 'visible';
        else
            this.secondmenudisplay = 'hidden';
    };
    ContextMenu.prototype.firstLevelMenuOver = function (event) {
        if (event.secondMenu != undefined) {
            var index;
            index = this.menuItems.findIndex(function (el) { return el.menuId == event.menuId; });
            var xPos;
            var yPos;
            if (index != -1) {
                yPos = index * 25;
                var width = document.getElementById("contextmenu_mainMenu").offsetWidth;
                xPos = width;
            }
            this.secondMenu = event.secondMenu;
            this.secondMenuStyles = { 'top': (this.yposition + yPos) + 'px', 'left': (this.xposition + xPos) + 'px' };
            this.secondmenudisplay = 'visible';
        }
        else {
            this.secondmenudisplay = 'hidden';
        }
    };
    ContextMenu.prototype.getSecondMenu = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ContextMenu.prototype, "xposition", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ContextMenu.prototype, "yposition", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ContextMenu.prototype, "visibility", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ContextMenu.prototype, "menuItems", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ContextMenu.prototype, "canvas", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ContextMenu.prototype, "contextMenuOnClick", void 0);
    __decorate([
        core_1.HostListener('document:ContextMenuEvent', ['$event', '$event.detail.xPos', '$event.detail.yPos']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Object, Object]), 
        __metadata('design:returntype', void 0)
    ], ContextMenu.prototype, "showContextMenu", null);
    ContextMenu = __decorate([
        core_1.Component({
            selector: 'context-menu',
            templateUrl: './app/Framework/Views/ContextMenu/contextmenu.component.html',
            styleUrls: ['app/Framework/Views/ContextMenu/contextmenu.css'],
            directives: []
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ContextMenu);
    return ContextMenu;
}());
exports.ContextMenu = ContextMenu;
//# sourceMappingURL=contextmenu.component.js.map