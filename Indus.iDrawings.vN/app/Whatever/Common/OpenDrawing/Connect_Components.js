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
var space_service_1 = require('../../../Models/space/space.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var objects_service_1 = require('../../../Models/Objects/objects.service');
var dropdownlistcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var stringtextbox_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var ConnectComponents = (function () {
    // showButton: boolean = false;
    function ConnectComponents(notificationService, _validateService, generalFunctions, ObjectsService, generFun) {
        this.notificationService = notificationService;
        this._validateService = _validateService;
        this.generalFunctions = generalFunctions;
        this.ObjectsService = ObjectsService;
        this.generFun = generFun;
        this.fieldDetailsAdd1 = [];
        this.inputItems = { dataKey: "ObjectId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: 'single' };
        this.pageIndex = 0;
        this.secondaryTarget = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.submitSuccess = new core_1.EventEmitter();
        this.dropChange = new core_1.EventEmitter();
        this.totalItems = 0;
        this.showSlide = false;
        this.position = "top-right";
        this.message = "";
        this.ShowRemoveConnection = false;
    }
    ConnectComponents.prototype.ngOnChanges = function (changes) {
        if (this.RemoveConnectionResult == 1) {
            this.onDropDownChange(event);
        }
    };
    ConnectComponents.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.btnName = contextObj.fieldDetails[3] == 0 ? "Remove Connection" : "Save";
        var drawingclass = JSON.parse(contextObj.fieldDetails[0])[0].Class;
        var Objnumber = JSON.parse(contextObj.fieldDetails[0])[0].ObjectNumber;
        var classId = contextObj.fieldDetails[1];
        var objectCategoryId = contextObj.fieldDetails[2];
        contextObj.ObjectsService.getComponentConectivity(classId).subscribe(function (result) {
            //contextObj.fieldDetailsAdd = result["Data"];
            result["Data"].find(function (item) {
                if (item.ReportFieldId == 4481) {
                    item.FieldValue = drawingclass;
                    item.IsEnabled = false;
                }
                else if (item.ReportFieldId == 500108) {
                    item.FieldValue = Objnumber;
                    item.IsEnabled = false;
                }
            });
            contextObj.fieldDetailsAdd = result["Data"];
            //contextObj.fieldDetailsAdd = contextObj.fieldDetailsAdd;
        });
    };
    ConnectComponents.prototype.onDropDownChange = function (event) {
        var contextObj = this;
        var objectCategoryId = contextObj.fieldDetails[2];
        //if (event.ReportFieldId == 4455)
        this.AssociationId = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId == 4455; }).FieldValue; //event.LookupDetails.LookupValues[0].Id;
        if (event.FieldId == 2664 && contextObj.fieldDetails[3] == 0) {
            contextObj.ObjectsService.GetAssociationTypeForConnectivity(contextObj.primaryObjectId).subscribe(function (result) {
                var PrimaryComponentNoId = JSON.parse(result.FieldBinderData)[0].Id;
                var secondaryClassId = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId == 4482; }).FieldValue;
                contextObj.ObjectsService.RemoveConnectivity(objectCategoryId, contextObj.drawingId, contextObj.isBuildingDrawing, secondaryClassId, contextObj.AssociationId, 0, PrimaryComponentNoId).subscribe(function (result) {
                    contextObj.fieldDetailsConnectivity = JSON.parse(result['FieldBinderData']);
                    contextObj.gridDataload(objectCategoryId);
                });
            });
        }
        else {
            var classId = contextObj.fieldDetails[1];
            var reportfieldIdArray = [];
            reportfieldIdArray.push({
                ReportFieldId: 649,
                Value: objectCategoryId,
            });
            reportfieldIdArray.push({
                ReportFieldId: 647,
                Value: classId,
            });
            reportfieldIdArray.push({
                ReportFieldId: 4483,
                Value: contextObj.AssociationId,
            });
            var Clearddl = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId == 4455; }).FieldValue;
            if (Clearddl == "-1") {
                var secondComp = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId == 4482; });
                secondComp.LookupDetails.LookupValues = [];
                contextObj.fieldDetailsConnectivity = undefined;
                secondComp.FieldValue = "-1";
                var fieldObject = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId == 4482; });
                var el = document.getElementById(fieldObject.FieldId.toString());
                if (el != null && el != undefined) {
                    setTimeout(function () {
                        contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
                    }, 100);
                }
            }
            else {
                var relationshiddl = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId == 4455; });
                var DropdownList = document.getElementById(relationshiddl.FieldId.toString());
                if (DropdownList != null) {
                    var tempselectedtext = DropdownList.options[DropdownList.selectedIndex].innerHTML;
                    var ddlvalue = [];
                    ddlvalue = relationshiddl.LookupDetails.LookupValues;
                    var Isinverse = ddlvalue.find(function (item) { return item.Value == tempselectedtext; });
                    reportfieldIdArray.push({
                        ReportFieldId: 1089,
                        Value: Isinverse.IsChecked,
                    });
                }
                contextObj.ObjectsService.GetAssociationTypeConnectivity(JSON.stringify(reportfieldIdArray)).subscribe(function (result) {
                    contextObj.ObjectsService.getComponentConectivity(JSON.parse(result.FieldBinderData)[0].Id).subscribe(function (result1) {
                    });
                    var ComponentType = [];
                    // ComponentType.push(JSON.parse(result.FieldBinderData)[0].Value);
                    ComponentType = JSON.parse(result.FieldBinderData);
                    contextObj.fieldDetailsAdd.find(function (item) {
                        if (item.ReportFieldId == 4482) {
                            item.LookupDetails.LookupValues = ComponentType;
                            return true;
                        }
                        return false;
                    });
                });
            }
        }
    };
    ConnectComponents.prototype.gridDataload = function (event) {
        var contextObj = this;
        contextObj.ObjectsService.getRemoveConnectivity().subscribe(function (result) {
            contextObj.fieldObjectlist = result["Data"];
            if (event == 20) {
                var checkFieldLabel = contextObj.fieldObjectlist.find(function (item) { return item.FieldId == 2785; });
                checkFieldLabel.FieldLabel = 'Equipment No.';
            }
            else if (event == 3) {
                var checkFieldLabel = contextObj.fieldObjectlist.find(function (item) { return item.FieldId == 2785; });
                checkFieldLabel.FieldLabel = 'Object No.';
            }
            if (contextObj.fieldDetailsConnectivity.length == 0) {
                //  contextObj.showButton = false;
                contextObj.isbtnDisable = true;
                contextObj.btnName = contextObj.fieldDetails[3] == 0 ? "Remove Connection" : "Save";
                contextObj.notificationService.ShowToaster("No data exists", 2);
                return;
            }
            else
                // contextObj.showButton = true;
                contextObj.isbtnDisable = false;
            contextObj.GridObjectId = contextObj.inputItems.selectedIds[0];
            contextObj.gridLength = contextObj.fieldDetailsConnectivity.length;
        });
    };
    ConnectComponents.prototype.onSubmitData = function (event) {
        if (this.fieldDetails[3] == 1) {
            this.submitSuccess.emit({
                "details": this.fieldDetailsAdd,
                "associationId": this.AssociationId,
                "connectivityStatus": this.fieldDetails[3],
                "GridObjectId": this.GridObjectId,
                "gridLength": this.gridLength,
                "grid": this.fieldDetailsConnectivity,
                "NewprimaryObjectId": this.primaryObjectId
            });
        }
        else {
            if (this.fieldDetailsConnectivity.length > 0)
                this.ShowRemoveConnection = true;
        }
    };
    ConnectComponents.prototype.showComponent = function (fieldName, isVisible) {
        if (isVisible == false) {
            return "none";
        }
        else {
            return "block";
        }
    };
    ConnectComponents.prototype.RemoveConnectionfromConnection = function () {
        var contextObj = this;
        contextObj.ObjectsService.RemoveConnectivityFromGrid(0, contextObj.primaryObjectId, contextObj.inputItems.selectedIds[0], contextObj.AssociationId, 0, 0, 0, 0, 0).subscribe(function (result) {
            if (result.StatusId == 1) {
                var index = contextObj.fieldDetailsConnectivity.findIndex(function (item) { return item.ObjectId == contextObj.inputItems.selectedIds[0]; });
                contextObj.fieldDetailsConnectivity.splice(index, 1);
                var s = JSON.stringify(contextObj.fieldDetailsConnectivity);
                contextObj.fieldDetailsConnectivity = [];
                setTimeout(function () {
                    contextObj.fieldDetailsConnectivity = JSON.parse(s);
                }, 100);
                contextObj.notificationService.ShowToaster("Connection Removed", 3);
            }
        });
    };
    ConnectComponents.prototype.okClick = function (event) {
        this.ShowRemoveConnection = !this.ShowRemoveConnection;
    };
    ConnectComponents.prototype.cancelClick = function (event) {
        this.ShowRemoveConnection = !this.ShowRemoveConnection;
    };
    ConnectComponents.prototype.closeSlideDialog = function (value) {
        this.ShowRemoveConnection = value.value;
    };
    ConnectComponents.prototype.okRemoveConnectivityClick = function (event) {
        this.ShowRemoveConnection = false;
        this.RemoveConnectionfromConnection();
        if ((this.fieldDetailsConnectivity.length - 1) <= 0)
            this.submitSuccess.emit({
                "connectivityStatus": this.fieldDetails[3],
                "NewprimaryObjectId": this.primaryObjectId
            });
    };
    ConnectComponents.prototype.cancelRemoveConnectivityClick = function (event) {
        this.ShowRemoveConnection = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ConnectComponents.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ConnectComponents.prototype, "drawingId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ConnectComponents.prototype, "isBuildingDrawing", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ConnectComponents.prototype, "primaryObjectId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ConnectComponents.prototype, "RemoveConnectionResult", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ConnectComponents.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ConnectComponents.prototype, "fieldDetails", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ConnectComponents.prototype, "submitSuccess", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ConnectComponents.prototype, "dropChange", void 0);
    ConnectComponents = __decorate([
        core_1.Component({
            selector: 'connect-components',
            templateUrl: './app/Views/Common/OpenDrawing/Connect_Components.html',
            directives: [grid_component_1.GridComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, submenu_component_1.SubMenu, confirm_component_1.ConfirmationComponent, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, dropdownlistcomponent_component_1.DropDownListComponent, stringtextbox_component_1.StringTextBoxComponent],
            providers: [http_1.HTTP_PROVIDERS, space_service_1.SpaceService, notify_service_1.NotificationService, validation_service_1.ValidateService, General_1.GeneralFunctions, objects_service_1.ObjectsService],
            inputs: ['selectedId', 'action', 'fieldDetails', 'btnName', 'pageTarget', 'drawingId', 'isBuildingDrawing'],
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, validation_service_1.ValidateService, General_1.GeneralFunctions, objects_service_1.ObjectsService, General_1.GeneralFunctions])
    ], ConnectComponents);
    return ConnectComponents;
}());
exports.ConnectComponents = ConnectComponents;
//# sourceMappingURL=Connect_Components.js.map