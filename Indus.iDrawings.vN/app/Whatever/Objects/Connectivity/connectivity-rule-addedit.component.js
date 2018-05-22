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
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var objects_service_1 = require('../../../Models/Objects/objects.service');
var ConnectivityRuleAddEdit = (function () {
    function ConnectivityRuleAddEdit(objService, _notificationService) {
        this.objService = objService;
        this._notificationService = _notificationService;
        this.previewRelationship = "";
        this.previewRevRelationship = "";
        this.firstComponentType = "";
        this.secondComponentType = "";
        this.submitSuccess = new core_1.EventEmitter();
    }
    ConnectivityRuleAddEdit.prototype.ngOnInit = function () {
        if (this.action == "edit") {
            this.showPreview(this.fieldDetailsAdd, 1);
        }
    };
    ConnectivityRuleAddEdit.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    };
    ConnectivityRuleAddEdit.prototype.showPreview = function (dataSource, target) {
        var contextObj = this;
        if (target == 1) {
            contextObj.secondComponentType = "";
            contextObj.firstComponentType = "";
            contextObj.previewRelationship = "";
            contextObj.previewRevRelationship = "";
            for (var i = 0; i < dataSource.length; i++) {
                if (dataSource[i].FieldId == "2606") {
                    contextObj.getAssociationForPreview(dataSource[i].FieldValue, contextObj);
                }
                else if (dataSource[i].FieldId == "2605") {
                    var firstComp = dataSource[i].LookupDetails["LookupValues"].find(function (item) {
                        return item.Id == dataSource[i].FieldValue;
                    });
                    if (firstComp != undefined && firstComp != "") {
                        contextObj.firstComponentType = firstComp.Value;
                    }
                }
                else if (dataSource[i].FieldId == "2607") {
                    var secondComp = dataSource[i].LookupDetails["LookupValues"].find(function (item) {
                        return item.Id == dataSource[i].FieldValue;
                    });
                    if (secondComp != undefined && secondComp != "") {
                        contextObj.secondComponentType = secondComp.Value;
                    }
                }
            }
        }
        else {
            if (dataSource.FieldId == "2606") {
                contextObj.getAssociationForPreview(dataSource.FieldValue, contextObj);
            }
            else if (dataSource.FieldId == "2605") {
                contextObj.firstComponentType = "";
                var firstComp = dataSource.LookupDetails.LookupValues.find(function (item) { return item.Id == dataSource.FieldValue; });
                if (firstComp != undefined && firstComp != "") {
                    contextObj.firstComponentType = firstComp.Value;
                }
            }
            else if (dataSource.FieldId == "2607") {
                contextObj.secondComponentType = "";
                var secondComp = dataSource.LookupDetails.LookupValues.find(function (item) { return item.Id == dataSource.FieldValue; });
                if (secondComp != undefined && secondComp != "") {
                    contextObj.secondComponentType = secondComp.Value;
                }
            }
        }
    };
    ConnectivityRuleAddEdit.prototype.getAssociationForPreview = function (selId, contextObj) {
        contextObj.previewRelationship = "";
        contextObj.previewRevRelationship = "";
        var objReportFields = [{
                ReportFieldId: "4456",
                Value: contextObj.objCategoryId
            }];
        contextObj.objService.GetAssociationforselectedConnection(selId, JSON.stringify(objReportFields)).subscribe(function (resultData) {
            var parsedResult = JSON.parse(resultData.FieldBinderData);
            contextObj.previewRelationship = parsedResult[0]["Relationship"];
            contextObj.previewRevRelationship = parsedResult[0]["Reverse Relationship"];
        });
    };
    ConnectivityRuleAddEdit.prototype.dropDownChange = function (event) {
        var contextObj = this;
        if (event.ddlRelationShipEvent.ChildFieldObject.FieldValue == "-1") {
            debugger;
            switch (event.ddlRelationShipEvent.ChildFieldObject.FieldId) {
                case 2606:
                    contextObj.previewRelationship = "";
                    contextObj.previewRevRelationship = "";
                    break;
                case 2605:
                    contextObj.firstComponentType = "";
                    break;
                case 2607:
                    contextObj.secondComponentType = "";
                    break;
            }
        }
        else {
            contextObj.showPreview(event.ddlRelationShipEvent.ChildFieldObject, 0);
        }
    };
    ConnectivityRuleAddEdit.prototype.postSubmit = function (strsubmitField, target) {
        var contextObj = this;
        var tempObj = {
            ReportFieldId: 649,
            Value: contextObj.objCategoryId
        };
        var arrayField = JSON.parse(strsubmitField);
        var firstComp = arrayField.find(function (item) { return item.ReportFieldId == "4481"; });
        var secondComp = arrayField.find(function (item) { return item.ReportFieldId == "4482"; });
        if (firstComp.Value == secondComp.Value) {
            contextObj._notificationService.ShowToaster("Select different component Types", 5);
        }
        else {
            arrayField = arrayField.concat(tempObj);
            strsubmitField = JSON.stringify(arrayField);
            var contextObj = this;
            contextObj.objService.AddConnectivityRules(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        if (target == 1) {
                            contextObj._notificationService.ShowToaster("Connectivity Rule added", 3);
                        }
                        else {
                            contextObj._notificationService.ShowToaster("Connectivity Rule updated", 3);
                        }
                        contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj._notificationService.ShowToaster("Connectivity Rule already exists", 5);
                        }
                        else if (resultData["Data"].ServerId == -2) {
                            contextObj._notificationService.ShowToaster("Connectivity Rule already exists in reverse order", 5);
                        }
                        else {
                            contextObj._notificationService.ShowToaster("Unknown problem", 1);
                        }
                        break;
                }
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ConnectivityRuleAddEdit.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ConnectivityRuleAddEdit.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ConnectivityRuleAddEdit.prototype, "submitSuccess", void 0);
    ConnectivityRuleAddEdit = __decorate([
        core_1.Component({
            selector: 'connectivity-rule-addedit',
            templateUrl: './app/Views/Objects/Connectivity/connectivity-rule-addedit.component.html',
            providers: [objects_service_1.ObjectsService, notify_service_1.NotificationService],
            directives: [fieldGeneration_component_1.FieldComponent],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'objCategoryId', 'previewConnectivity'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [objects_service_1.ObjectsService, notify_service_1.NotificationService])
    ], ConnectivityRuleAddEdit);
    return ConnectivityRuleAddEdit;
}());
exports.ConnectivityRuleAddEdit = ConnectivityRuleAddEdit;
//# sourceMappingURL=connectivity-rule-addedit.component.js.map