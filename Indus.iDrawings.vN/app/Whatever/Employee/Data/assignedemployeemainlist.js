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
var http_1 = require('@angular/http');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var employee_services_1 = require('../../../Models/Employee/employee.services');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var AssignedMainListComponent = (function () {
    function AssignedMainListComponent(cdr, employeeService, differs) {
        this.employeeService = employeeService;
        this.differs = differs;
        this.inputItems = {
            dataKey: "Id", groupBy: ["Site", "Building"], grpWithCheckBx: true, allowAdd: false
        };
        this.getSelectedFloor = new core_1.EventEmitter();
        this.floorSelected = new core_1.EventEmitter();
        this.differ = differs.find({}).create(null);
        // this.employeeService.getAssignedEmployeeMainListField().subscribe(resultData => //console.log(this.fieldObject = resultData["data"]));
        //this.employeeService.getAssignedEmployeeMainListData().subscribe(resultData => //console.log(this.itemsSource = resultData["data"]));
        //this.keyWordLookup = this.employeeService.getAssingedEmployeeMainKeyWordLookUp();
    }
    AssignedMainListComponent.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.inputItems.selectedIds);
        if (changes) {
            var selectedFloor = this.inputItems.selectedIds;
            this.getSelectedFloor.emit({
                selectedFloor: selectedFloor
            });
        }
    };
    AssignedMainListComponent.prototype.pageChanged = function (event) {
        this.employeeService.floorSelectionPaging(event.pageEvent.page);
    };
    AssignedMainListComponent.prototype.SaveAs = function (event) {
        //console.log('Entered Save As');
    };
    AssignedMainListComponent.prototype.Delete = function (event) {
        //console.log('Entered Delete');
    };
    AssignedMainListComponent.prototype.onloadSearch = function (event) {
        //console.log('Enetered On Load Search');
    };
    AssignedMainListComponent.prototype.Clear = function (event) {
        //console.log('Entered Clear');
    };
    AssignedMainListComponent.prototype.Submit = function (event) {
        //console.log('Entered Search')
    };
    AssignedMainListComponent.prototype.NextClick = function () {
        if (this.inputItems.selectedIds) {
            var floorselected = true;
            this.floorSelected.emit({ floorselected: floorselected });
        }
    };
    __decorate([
        // = 200;
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssignedMainListComponent.prototype, "getSelectedFloor", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssignedMainListComponent.prototype, "floorSelected", void 0);
    AssignedMainListComponent = __decorate([
        core_1.Component({
            selector: 'assignedMain',
            templateUrl: './app/Views/Employee/Data/assignedEmployeeMainList.html',
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, search_component_1.searchBox],
            providers: [employee_services_1.EmployeeService, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, employee_services_1.EmployeeService, core_1.KeyValueDiffers])
    ], AssignedMainListComponent);
    return AssignedMainListComponent;
}());
exports.AssignedMainListComponent = AssignedMainListComponent;
//# sourceMappingURL=assignedemployeemainlist.js.map