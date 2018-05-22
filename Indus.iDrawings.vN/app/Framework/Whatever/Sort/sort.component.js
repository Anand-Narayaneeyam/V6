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
var visibleFields_pipe_1 = require('../Common/visibleFields.pipe');
var Sorting = (function () {
    function Sorting() {
        this.sortEvent = new core_1.EventEmitter();
        this.columnName = "";
        this.sortDirection = 'ASC';
        this.clickNum = 0;
        this.sortIcon = "";
        this.disableSort = false;
    }
    Sorting.prototype.sortMultipleField = function (selectedField) {
        if (!this.disableSort) {
            this.clickNum++;
            if (this.clickNum == 2) {
                this.sortOnChange(selectedField);
                this.clickNum = 0;
            }
        }
    };
    Sorting.prototype.sortSingleField = function (selectedField) {
        if (!this.disableSort) {
            if (this.sortDirection == 'ASC') {
                this.sortDirection = 'DESC';
                this.sortIcon = "sort_Desc_1.png";
            }
            else {
                this.sortDirection = 'ASC';
                this.sortIcon = "sort_Asc_1.png";
            }
            if (!selectedField.includes("["))
                this.columnName = "[" + selectedField + "]";
            else
                this.columnName = selectedField;
            this.sortEvent.emit({
                selectedField: this.columnName,
                sortDirection: this.sortDirection
            });
        }
    };
    Sorting.prototype.sortOnChange = function (selectedField) {
        if ((this.sortDirection == 'ASC') && (this.columnName == selectedField)) {
            this.sortDirection = 'DESC';
            this.sortIcon = "sort_Desc.png";
        }
        else {
            this.sortDirection = 'ASC';
            this.sortIcon = "sort_Asc.png";
        }
        if (!selectedField.includes("["))
            this.columnName = "[" + selectedField + "]";
        else
            this.columnName = selectedField;
        this.sortEvent.emit({
            selectedField: this.columnName,
            sortDirection: this.sortDirection
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Sorting.prototype, "sortEvent", void 0);
    Sorting = __decorate([
        core_1.Component({
            selector: 'sort',
            templateUrl: './app/Framework/Views/Sort/sort.component.html',
            inputs: ["fieldNames", "listItems", "disableSort"],
            pipes: [visibleFields_pipe_1.VisibleFieldsPipe]
        }), 
        __metadata('design:paramtypes', [])
    ], Sorting);
    return Sorting;
}());
exports.Sorting = Sorting;
//# sourceMappingURL=sort.component.js.map