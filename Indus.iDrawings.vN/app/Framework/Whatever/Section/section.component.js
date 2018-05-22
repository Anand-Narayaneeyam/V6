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
var SectionComponent = (function () {
    function SectionComponent() {
        this.isExpanded = false;
        this.onSectionExpandChange = new core_1.EventEmitter();
        this.className = this.isExpanded == true ? 'title-view-active' : 'title-view';
        this.expandIcon = "Content/Images/arrows_down.png";
        this.hideIcon = "Content/Images/arrows_up.png";
    }
    SectionComponent.prototype.ngOnInit = function () {
        if (this.height != undefined) {
            this.height = this.height + "%";
        }
        else {
            if (this.type == "menu") {
                this.height = "auto";
            }
            else {
                this.height = "auto";
            }
        }
        if (this.isGrid == true)
            if (this.isGrid == false || this.isGrid == undefined)
                this.contentView = "content-view";
            else
                this.contentView = "content-Gridview";
        this.className = this.isExpanded == true ? 'title-view-active' : 'title-view';
        if (this.type == undefined || this.type == "page")
            this.className = this.isExpanded == true ? 'title-view-active' : 'title-view';
        else {
            this.className = this.isExpanded == true ? 'title-view-general-active' : 'title-general-view';
            if (this.isGrid == false || this.isGrid == undefined)
                this.contentView = "content-General-view";
            else
                this.contentView = "content-General-Gridview";
        }
    };
    SectionComponent.prototype.ngOnChanges = function (changes) {
        if (changes["isExpanded"] !== undefined) {
            if ((Number(changes["isExpanded"]["currentValue"])) != (Number(changes["isExpanded"]["previousValue"]))) {
                if (this.type == undefined || this.type == "page") {
                    this.className = this.isExpanded == true ? 'title-view-active' : 'title-view';
                    if (this.isGrid == false || this.isGrid == undefined)
                        this.contentView = "content-view";
                    else
                        this.contentView = "content-Gridview";
                }
                else {
                    this.className = this.isExpanded == true ? 'title-view-general-active' : 'title-general-view';
                    if (this.isGrid == false || this.isGrid == undefined)
                        this.contentView = "content-General-view";
                    else
                        this.contentView = "content-General-Gridview";
                }
            }
        }
    };
    SectionComponent.prototype.onExpandClick = function () {
        this.isExpanded = !this.isExpanded;
        if (this.type == undefined || this.type == "page")
            this.className = this.isExpanded == true ? 'title-view-active' : 'title-view';
        else {
            this.className = this.isExpanded == true ? 'title-view-general-active' : 'title-general-view';
            if (this.isGrid == false || this.isGrid == undefined)
                this.contentView = "content-General-view";
            else
                this.contentView = "content-General-Gridview";
        }
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'));
        }, 10);
        this.onSectionExpandChange.emit([this.isExpanded, this]);
    };
    SectionComponent.prototype.onExpandKeyPress = function (Keyevent) {
        if (Keyevent.keyCode == 13 || Keyevent.keyCode == 32) {
            this.onExpandClick();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SectionComponent.prototype, "isExpanded", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SectionComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SectionComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SectionComponent.prototype, "height", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SectionComponent.prototype, "onSectionExpandChange", void 0);
    SectionComponent = __decorate([
        core_1.Component({
            selector: 'section',
            templateUrl: './app/Framework/Views/Section/section.component.html',
            styleUrls: ['./app/Framework/Views/Section/section-view.css'],
            inputs: ["title", "isExpanded", "isGrid"]
        }), 
        __metadata('design:paramtypes', [])
    ], SectionComponent);
    return SectionComponent;
}());
exports.SectionComponent = SectionComponent;
//# sourceMappingURL=section.component.js.map