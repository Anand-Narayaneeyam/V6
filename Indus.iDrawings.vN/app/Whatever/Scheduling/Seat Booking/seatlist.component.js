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
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var scheduling_service_1 = require('../../../models/scheduling/scheduling.service');
var General_1 = require('../../../Models/Common/General');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var seatresourcelist_component_1 = require('./seatresourcelist.component');
var SeatsGridComponent = (function () {
    function SeatsGridComponent(schedulingService, validateService, notificationService, generFun) {
        this.schedulingService = schedulingService;
        this.validateService = validateService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.pageTitle = "";
        this.target = 0;
        this.inputItems = { dataKey: "Id", allowAdd: false, allowEdit: true, sortDir: "ASC", sortCol: "Id" };
        this.seatSuccess = new core_1.EventEmitter();
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.RoomNumber = "";
        this.category = "";
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.updateObj = [];
        this.seatspacearray = [];
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null
            },
            {
                "id": 2,
                "title": "Resources",
                "image": "Resources",
                "path": "Resources",
                "submenu": null
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            },
            {
                "id": 4,
                "title": "Update",
                "image": "Update",
                "path": "Update",
                "submenu": null
            }
        ];
        this.enableMenu = [];
        this.position = "top-right";
        this.showSlide = false;
        this.multiplespacerommnumber = [];
        this.slideMSg = "";
        this.slidewidth = 250;
    }
    SeatsGridComponent.prototype.ngOnInit = function () {
        //this.pagePath = "Employee / Scenarios ";
        var contextObj = this;
        this.schedulingService.getSeatListColumns().subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
                item.Width = "0.5*";
            });
            resultData["Data"].find(function (el) {
                if ((contextObj.category == "5" || contextObj.category == "6") && el.FieldId == 1966) {
                    el.IsVisible = false;
                    contextObj.menuData.splice(3, 1);
                    contextObj.menuData.splice(0, 1);
                }
            });
            contextObj.fieldObject = resultData["Data"];
        });
        this.dataLoad(1, contextObj);
    };
    SeatsGridComponent.prototype.dataLoad = function (target, context) {
        var reportFieldIdArray = [];
        for (var i = 0; i < context.SelectedSpaceId.length; i++) {
            reportFieldIdArray.push({ ReportFieldId: 8795, Value: context.SelectedSpaceId[i].toString() });
        }
        context.schedulingService.seatsListData(JSON.stringify(reportFieldIdArray), context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (resultData) {
            context.totalItems = resultData["Data"].DataCount;
            if (context.totalItems > 0) {
                context.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (target == 1) {
                    context.itemsPerPage = resultData["Data"].RowsPerPage;
                }
            }
            else {
                context.notificationService.ShowToaster("No Seats exist", 2);
                context.enableMenu = [1];
            }
        });
    };
    SeatsGridComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0, contextObj);
    };
    ;
    SeatsGridComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.dataLoad(0, contextObj);
    };
    SeatsGridComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        this.pageTitle = "";
        this.slideMSg = "";
        this.target = 0;
        switch (event.value) {
            case 1:
                this.pageTitle = "New Seat";
                this.target = 1;
                this.addSeat();
                break;
            case 2:
                this.pageTitle = "Resources";
                this.target = 2;
                this.loadSchedulingResource();
                break;
            case 3:
                this.target = 3;
                this.deleteClick();
                break;
            case 4:
                this.updateSeatNumberAsHoteling();
                break;
        }
    };
    SeatsGridComponent.prototype.addSeat = function () {
        var context = this;
        var maxValue = 0;
        var tempcount = 0;
        if (this.itemSource) {
            for (var i = 0; i < this.SelectedSpaceId.length; i++) {
                for (var j = 0; j < this.itemSource.length; j++) {
                    if (this.itemSource[j]["SpaceId"] == this.SelectedSpaceId[i])
                        tempcount++;
                }
                if (maxValue < tempcount) {
                    maxValue = tempcount;
                    tempcount = 0;
                }
            }
        }
        if (this.itemSource && maxValue == context.RoomSeatCapacity) {
            if (this.SelectedSpaceId.length == 1)
                context.notificationService.ShowToaster("Number of Seats should be less than or equal to Room Seating Capacity", 2);
            else
                context.notificationService.ShowToaster("Some of the selected spaces have more or same Number of Seats compared to  Room Seating Capacity", 2);
        }
        else {
            var count = 4; /*for finding numberObj and rdbtn obj*/
            this.schedulingService.getAddSeatFields().subscribe(function (resultData) {
                resultData["Data"].find(function (el) {
                    if (el.FieldId == 2032) {
                        el.FieldValue = "48";
                        count--;
                    }
                    if (el.FieldId == 2028) {
                        el.IsMandatory = true;
                        count--;
                    }
                    if (el.FieldId == 2099) {
                        el.FieldValue = "53";
                        count--;
                    }
                    if (el.FieldId == 2027) {
                        if (context.multiplespacerommnumber.length == 0) {
                            el.FieldValue = context.RoomNumber.toString();
                            el.IsVisible = true;
                        }
                        else {
                            el.FieldValue = "";
                            el.IsVisible = false;
                            el.IsMandatory = false;
                            el.HasValidationError = false;
                        }
                        el.IsEnabled = false;
                        count--;
                    }
                    if (count == 0)
                        return true;
                    else
                        return false;
                });
                context.fieldDetailsAdd = resultData["Data"];
                context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
            });
        }
    };
    SeatsGridComponent.prototype.loadSchedulingResource = function () {
        if (this.inputItems.selectedIds.length > 1) {
            var context = this;
            var isResourceObj = this.inputItems.rowData.filter(function (el) {
                return el["Resources"] == "true";
            });
            if (isResourceObj.length > 0) {
                context.slideMSg = "Resources already added will be deleted.Do you want to continue?";
                context.showSlide = !context.showSlide;
            }
        }
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    SeatsGridComponent.prototype.onSubmitData = function (event) {
        var addObj = JSON.parse(event["fieldobject"]);
        var count = 3;
        var rdbtnVal = "";
        var fromNum = 0;
        var toNum = 0;
        addObj.find(function (el) {
            switch (el.ReportFieldId) {
                case 7390:
                    rdbtnVal = el.Value;
                    count--;
                    break;
                case 6714:
                    fromNum = el.Value;
                    count--;
                    break;
                case 6715:
                    toNum = el.Value;
                    count--;
                    break;
            }
            if (count == 0)
                return true;
            else
                return false;
        });
        var ismultiple = rdbtnVal == "48" ? false : true;
        var context = this;
        if (ismultiple && +(fromNum) > +(toNum)) {
            context.notificationService.ShowToaster("To Number should be greater than or equal to From Number", 2);
        }
        else if (ismultiple && ((context.itemSource && (context.itemSource.length + (toNum - fromNum))) >= context.RoomSeatCapacity || (toNum - fromNum) >= context.RoomSeatCapacity)) {
            context.notificationService.ShowToaster("Number of Seats should be less than or equal to Room Seating Capacity", 2);
        }
        else {
            addObj.push({ "ReportFieldId": 8791, "Value": context.category });
            for (var i = 0; i < context.SelectedSpaceId.length; i++) {
                addObj.push({ "ReportFieldId": 780, "Value": context.SelectedSpaceId[i] });
            }
            this.schedulingService.addSeat(JSON.stringify(addObj), ismultiple, context.multiplespacerommnumber).subscribe(function (resultData) {
                switch (resultData.StatusId) {
                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        var msg = "";
                        if (ismultiple) {
                            msg = "Seats added";
                        }
                        else {
                            msg = "Seat added";
                        }
                        context.notificationService.ShowToaster(msg, 3);
                        context.dataLoad(0, context);
                        context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
                        context.seatSuccess.emit({ action: "AddSeat", type: context.category });
                        break;
                    case 3:
                        if (resultData.ServerId == -1)
                            var msg = "";
                        if (ismultiple) {
                            msg = "Seat Number(s) " + resultData["Data"] + " already exists";
                        }
                        else {
                            msg = "Seat Number already exists";
                        }
                        context.notificationService.ShowToaster(msg, 5);
                        break;
                }
            });
        }
    };
    SeatsGridComponent.prototype.deleteClick = function () {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.slideMSg = "Are you sure you want to delete the selected seat?";
            this.showSlide = !this.showSlide;
        }
    };
    SeatsGridComponent.prototype.okSlideClick = function (event) {
        if (this.target == 3) {
            this.deleteSeat();
        }
        else {
            this.loadSchedulingResource();
        }
        this.showSlide = !this.showSlide;
    };
    SeatsGridComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    SeatsGridComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    SeatsGridComponent.prototype.deleteSeat = function () {
        var contextObj = this;
        contextObj.schedulingService.deleteSeat(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            switch (resultData.StatusId) {
                case 0:
                    if (resultData.ServerId == 1) {
                        contextObj.notificationService.ShowToaster("Seat in use, cannot be deleted", 5);
                    }
                    break;
                case 1:
                    var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.itemSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [1];
                    }
                    contextObj.notificationService.ShowToaster("Seat deleted", 3);
                    var hotlingSeatCount = 0;
                    hotlingSeatCount = contextObj.hotelingSeatUpdate(0);
                    contextObj.seatSuccess.emit({ action: "DeleteSeat", hotellingSeatCount: hotlingSeatCount, type: contextObj.category });
                    break;
            }
        });
    };
    SeatsGridComponent.prototype.hotelingSeatUpdate = function (target) {
        var hotlingSeatCount = 0;
        this.updateObj = [];
        this.seatspacearray = [];
        for (var i = 0; i < this.itemSource.length; i++) {
            var singleObj = {
                "SeatId": this.itemSource[i]["Id"],
                "IsHotelling": this.itemSource[i]["Hoteling Seat?"],
                "IsApproval": false
            };
            this.seatspacearray.push({ SeatId: this.itemSource[i]["Id"], SpaceId: this.itemSource[i]["SpaceId"], IsHotelling: this.itemSource[i]["Hoteling Seat?"] });
            this.updateObj.push(singleObj);
            if (this.itemSource[i]["Hoteling Seat?"] == true) {
                hotlingSeatCount++;
            }
        }
        return hotlingSeatCount;
    };
    SeatsGridComponent.prototype.updateSeatNumberAsHoteling = function () {
        var context = this;
        var hotlingSeatCount = 0;
        hotlingSeatCount = context.hotelingSeatUpdate(1);
        //for (var i = 0; i < this.itemSource.length; i++) {
        //    var singleObj = {
        //        "SeatId": this.itemSource[i]["Id"],
        //        "IsHotelling": this.itemSource[i]["Hoteling Seat?"],
        //        "IsApproval": false
        //    }
        //    updateObj.push(singleObj);
        //}
        //    if (this.itemSource[i]["Hoteling Seat?"] == true) {
        //        hotlingSeatCount++;
        //    }
        //}
        this.schedulingService.updateSeatNumberAsHoteling(JSON.stringify(context.updateObj)).subscribe(function (resultData) {
            switch (resultData.StatusId) {
                case 0:
                    context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    context.notificationService.ShowToaster("Seat(s) updated", 3);
                    context.seatSuccess.emit({ action: "UpdateSeat", hotellingSeatCount: hotlingSeatCount, type: context.category, seatspacearray: context.seatspacearray });
                    break;
            }
        });
    };
    SeatsGridComponent.prototype.rdBtnChange = function (event) {
        var context = this;
        var blnShow = false;
        var fldObj = event.rbtnObject.fieldobject;
        var fldaddObj = this.fieldDetailsAdd;
        if (fldObj.FieldId == 2032) {
            for (var i = 0; i < fldaddObj.length; i++) {
                if (fldaddObj[i].FieldId == 2028) {
                    if (fldObj.FieldValue == "48") {
                        fldaddObj[i].IsVisible = true;
                        fldaddObj[i].IsMandatory = true;
                    }
                    else {
                        fldaddObj[i].IsVisible = false;
                        fldaddObj[i].IsMandatory = false;
                        fldaddObj[i].HasValidationError = false;
                    }
                }
                if (fldaddObj[i].FieldId == 2029 || fldaddObj[i].FieldId == 2030) {
                    if (fldObj.FieldValue == "49") {
                        fldaddObj[i].IsVisible = true;
                        fldaddObj[i].IsMandatory = true;
                        if (document.getElementById(fldaddObj[i].FieldId.toString())) {
                            var el = document.getElementById(fldaddObj[i].FieldId.toString());
                            context.validateService.initiateValidation(fldaddObj[i], context, true, el);
                        }
                    }
                    else {
                        fldaddObj[i].IsVisible = false;
                        fldaddObj[i].IsMandatory = false;
                        fldaddObj[i].HasValidationError = false;
                    }
                }
            }
        }
        else if (fldObj.FieldId == 2099) {
            var Item = context.fieldDetailsAdd.find(function (item) { return item.FieldId === 2027; }); //prefix
            Item.FieldValue = "";
            Item.IsEnabled = true;
            Item.IsMandatory = true;
            Item.HasValidationError = true;
            if (context.SelectedSpaceId.length > 1) {
                for (var i = 0; i < fldaddObj.length; i++) {
                    if (fldObj.FieldValue == "50" || fldObj.FieldValue == "51" || fldObj.FieldValue == "52") {
                        if (Item != undefined) {
                            Item.FieldValue = "";
                            Item.IsEnabled = false;
                            Item.IsMandatory = false;
                            fldaddObj[i].HasValidationError = false;
                        }
                    }
                    else if (fldObj.FieldValue == "53") {
                        var count = 0;
                        var prefix = "";
                        if (Item != undefined) {
                            Item.FieldValue = context.RoomNumber.toString();
                            fldaddObj[i].HasValidationError = false;
                            Item.IsEnabled = false;
                        }
                    }
                }
                Item.FieldValue = "";
                Item.IsEnabled = false;
                Item.IsMandatory = false;
                fldObj.HasValidationError = false;
            }
            else {
                for (var i = 0; i < fldaddObj.length; i++) {
                    if (fldObj.FieldValue == "51") {
                        if (Item != undefined) {
                            Item.FieldValue = "";
                            Item.IsEnabled = false;
                            Item.IsMandatory = false;
                            fldaddObj[i].HasValidationError = false;
                        }
                    }
                    else if (fldObj.FieldValue == "52") {
                        if (Item != undefined) {
                            Item.FieldValue = "";
                            Item.IsEnabled = false;
                            Item.IsMandatory = false;
                            fldaddObj[i].HasValidationError = false;
                        }
                    }
                    else if (fldObj.FieldValue == "53") {
                        var count = 0;
                        var prefix = "";
                        if (Item != undefined) {
                            Item.FieldValue = context.RoomNumber.toString();
                            fldaddObj[i].HasValidationError = false;
                            Item.IsEnabled = false;
                        }
                    }
                }
            }
        }
    };
    SeatsGridComponent.prototype.seatResourceAdd = function (event) {
        var context = this;
        var selCount = this.inputItems.selectedIds.length;
        this.refreshgrid = [];
        this.itemSource.find(function (el) {
            if (context.inputItems.selectedIds.indexOf(el["Id"]) > -1) {
                if (event.existingResrc.length > 0) {
                    el["Resources"] = "Yes";
                    el["Resource"] = "Yes";
                }
                else {
                    el["Resources"] = "No";
                    el["Resource"] = "No";
                }
                selCount--;
            }
            if (selCount == 0) {
                context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
                context.refreshgrid = context.refreshgrid.concat([true]);
                return true;
            }
            else
                return false;
        });
    };
    SeatsGridComponent.prototype.onSecondaryClose = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SeatsGridComponent.prototype, "seatSuccess", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SeatsGridComponent.prototype, "RoomNumber", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SeatsGridComponent.prototype, "category", void 0);
    SeatsGridComponent = __decorate([
        core_1.Component({
            selector: 'seats-List',
            templateUrl: './app/Views/Scheduling/Seat Booking/seatlist.component.html',
            directives: [submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, split_view_component_1.SplitViewComponent, slide_component_1.SlideComponent, fieldGeneration_component_1.FieldComponent, seatresourcelist_component_1.SeatResources],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, scheduling_service_1.SchedulingService, validation_service_1.ValidateService],
            inputs: ['SelectedSpaceId', 'RoomSeatCapacity', 'multiplespacerommnumber']
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, validation_service_1.ValidateService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], SeatsGridComponent);
    return SeatsGridComponent;
}());
exports.SeatsGridComponent = SeatsGridComponent;
//# sourceMappingURL=seatlist.component.js.map