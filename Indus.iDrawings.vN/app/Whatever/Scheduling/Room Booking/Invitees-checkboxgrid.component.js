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
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var checkboxcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var General_1 = require('../../../Models/Common/General');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var Inviteescheckboxgrid = (function () {
    function Inviteescheckboxgrid(SchedulingService, notificationService, generFun) {
        this.SchedulingService = SchedulingService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.showSlide = false;
        this.position = "top-right";
        this.slidewidth = 300;
        this.listtarget = 1;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.hasFieldValue = false;
        this.submitSuccess = new core_1.EventEmitter();
        this.isinUse = false;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "[User Name]", sortDir: "ASC", selectedIds: [], allowAdd: false };
    }
    Inviteescheckboxgrid.prototype.ngOnInit = function () {
        var contextObj = this;
        this.alignContent = "horizontal";
        contextObj.SchedulingService.getInviteesCheckboxgridFields(contextObj.listtarget).subscribe(function (resultdata) {
            contextObj.ddlUserCategory = resultdata["Data"].find(function (el) { return el.ReportFieldId === 458; });
            contextObj.inputItems.isHeaderCheckBx = false;
            var removeArr = [458];
            contextObj.fieldObject = resultdata["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            });
        });
    };
    Inviteescheckboxgrid.prototype.onChangeUserCategory = function (event) {
        var contextObj = this;
        contextObj.listtarget = parseInt(event);
        if (contextObj.listtarget == -1) {
            contextObj.itemsSource = [];
            contextObj.inputItems.isHeaderCheckBx = false;
        }
        else {
            contextObj.inputItems.isHeaderCheckBx = true;
            contextObj.Customfieldgeneration(contextObj.listtarget);
            contextObj.SchedulingService.GetInviteesListForUserCategory(contextObj.listtarget).subscribe(function (data) {
                contextObj.itemsSource = JSON.parse(data.Data["FieldBinderData"]);
            });
        }
    };
    Inviteescheckboxgrid.prototype.Customfieldgeneration = function (Target) {
        var contextObj = this;
        this.SchedulingService.getInviteesCheckboxgridFields(Target).subscribe(function (resultdata) {
            contextObj.fieldObject = resultdata["Data"];
            if (Target == "1") {
                var removeArr = [458];
                contextObj.fieldObject = resultdata["Data"].filter(function (item) {
                    return removeArr.indexOf(item.ReportFieldId) == -1;
                });
            }
        });
    };
    Inviteescheckboxgrid.prototype.insertInviteesList = function (event) {
        debugger;
        var contextObj = this;
        if (contextObj.ddlUserCategory.FieldValue == "-1")
            contextObj.notificationService.ShowToaster("Select a User Category", 2);
        else {
            var InsertValue;
            var tempInviteesList = "";
            var Id;
            var arrayList = new Array();
            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                    InsertValue = contextObj.itemsSource[i].Id.toString().split("µ")[0] + "µ" + contextObj.itemsSource[i].Id.toString().split("µ")[1];
                    Id = parseInt(contextObj.itemsSource[i].Id.toString().split("µ")[1]);
                    if (contextObj.itemsSource[i].Id.toString().split("µ")[0] == "1")
                        Id = (Id + 2) * -1;
                    var value = contextObj.itemsSource[i].Id.toString().split("µ")[2];
                    //InsertValue = InsertValue + tempInviteesList + "µ1µ§"              
                    arrayList.push({
                        Id: Id,
                        Value: value,
                        InsertValue: InsertValue
                    });
                }
            }
            contextObj.submitSuccess.emit({ arrayList: arrayList });
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Inviteescheckboxgrid.prototype, "submitSuccess", void 0);
    Inviteescheckboxgrid = __decorate([
        core_1.Component({
            selector: 'Invitees-checkboxgrid',
            templateUrl: './app/Views/Scheduling/Room Booking/Invitees-checkboxgrid.component.html',
            directives: [grid_component_1.GridComponent, submenu_component_1.SubMenu, dropdownlistcomponent_component_1.DropDownListComponent, checkboxcomponent_component_1.CustomCheckBoxComponent, paging_component_1.PagingComponent],
            providers: [http_1.HTTP_PROVIDERS, scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions],
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], Inviteescheckboxgrid);
    return Inviteescheckboxgrid;
}());
exports.Inviteescheckboxgrid = Inviteescheckboxgrid;
//# sourceMappingURL=Invitees-checkboxgrid.component.js.map