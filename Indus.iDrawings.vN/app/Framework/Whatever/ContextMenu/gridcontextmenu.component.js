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
var GridContextMenu = (function () {
    function GridContextMenu(elementRef) {
        this.contextMenuOnClick = new core_1.EventEmitter();
        this.display = 'hidden';
        this.change = false;
        this.elementRef = elementRef;
    }
    GridContextMenu.prototype.ngOnInit = function () {
        console.log("this.xposition && this.yposition", this.xposition && this.yposition);
        if (this.xposition && this.yposition) {
            this.Styles = { 'top': this.yposition + 'px', 'left': this.xposition + 'px' };
        }
    };
    GridContextMenu.prototype.showContextMenu = function (event, xPos, yPos) {
        this.change = true;
        if (xPos == 0 && yPos == 0) {
            this.display = 'hidden';
        }
        else {
            var contextObj = this;
            contextObj.xposition = xPos;
            contextObj.yposition = yPos;
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
    };
    GridContextMenu.prototype.ngOnChanges = function (changes) {
    };
    GridContextMenu.prototype.menuOnClick = function (event) {
        this.contextMenuOnClick.emit(event);
    };
    GridContextMenu.prototype.onContextMenu = function (event, item) {
        event.preventDefault();
    };
    GridContextMenu.prototype.hideContextMenu = function () {
        this.display = 'hidden';
        this.contextMenuOnClick.emit(false);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], GridContextMenu.prototype, "xposition", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], GridContextMenu.prototype, "yposition", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], GridContextMenu.prototype, "visibility", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridContextMenu.prototype, "menuItems", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridContextMenu.prototype, "gridElement", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GridContextMenu.prototype, "contextMenuOnClick", void 0);
    __decorate([
        core_1.HostListener('document:GridContextMenuEvent', ['$event', '$event.detail.xPos', '$event.detail.yPos']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Object, Object]), 
        __metadata('design:returntype', void 0)
    ], GridContextMenu.prototype, "showContextMenu", null);
    GridContextMenu = __decorate([
        core_1.Component({
            selector: 'grid-context-menu',
            templateUrl: './app/Framework/Views/ContextMenu/gridcontextmenu.component.html',
            styleUrls: ['app/Framework/Views/ContextMenu/contextmenu.css'],
            directives: []
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], GridContextMenu);
    return GridContextMenu;
}());
exports.GridContextMenu = GridContextMenu;
//# sourceMappingURL=gridcontextmenu.component.js.map