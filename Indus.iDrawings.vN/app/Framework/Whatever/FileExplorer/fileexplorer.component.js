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
var NodeComponent = (function () {
    function NodeComponent() {
        /*expandIcon: string = "Content/Images/arrows_down.png";
        hideIcon: string = "Content/Images/ arrows_up.png";*/
        this.expandIcon = "Content/Images/folder-close.png";
        this.hideIcon = "Content/Images/folder-close.png";
        this.downarrowIcon = "Content/Images/arrows_down.png";
        this.uparrowIcon = "Content/Images/arrows_right.png";
        this.noIcon = "Content/Icons/no_expanD.png";
        this.clicked = new core_1.EventEmitter();
        this.folderexpand = new core_1.EventEmitter();
    }
    NodeComponent.prototype.isExpandable = function () {
        var isDirectory;
        if (this.node && ((this.node.children && this.node.children.length > 0) || this.node.HasChild))
            return true;
        else
            return false;
    };
    NodeComponent.prototype.isExpanded = function () {
        if (this.node.Isexpanded && this.node.children && this.node.children.length > 0)
            return true;
        else
            return false;
    };
    NodeComponent.prototype.expandFolder = function (node) {
        if (this.node.Isexpanded) {
            this.node.Isexpanded = false;
        }
        else {
            this.node.Isexpanded = true;
            this.folderexpand.emit(node);
        }
    };
    NodeComponent.prototype.clickItem = function (node) {
        this.clicked.emit(node);
    };
    NodeComponent.prototype.propagate = function (node) {
        this.clicked.emit(node);
    };
    NodeComponent.prototype.propagateexpand = function (node) {
        this.folderexpand.emit(node);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NodeComponent.prototype, "node", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], NodeComponent.prototype, "index", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NodeComponent.prototype, "clicked", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NodeComponent.prototype, "folderexpand", void 0);
    NodeComponent = __decorate([
        core_1.Component({
            selector: 'node',
            templateUrl: 'app/Framework/Views/FileExplorer/fileexplorer.component.html',
            directives: [NodeComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], NodeComponent);
    return NodeComponent;
}());
exports.NodeComponent = NodeComponent;
//# sourceMappingURL=fileexplorer.component.js.map