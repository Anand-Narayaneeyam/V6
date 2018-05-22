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
var projects_service_1 = require('../../../Models/Projects/projects.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var General_1 = require('../../../Models/Common/General');
var EditMarkUpComponent = (function () {
    function EditMarkUpComponent(projectService, notificationService) {
        this.projectService = projectService;
        this.notificationService = notificationService;
        this.pagetarget = 0;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    EditMarkUpComponent.prototype.ngOnInit = function () {
        var context = this;
        this.btnName = "Save Changes";
        this.projectService.getBaseDrawingListFormId(579).subscribe(function (resultFields) {
            debugger;
            for (var i = 0; i < resultFields["Data"].length; i++) {
                switch (resultFields["Data"][i].FieldId) {
                    case 2957:
                        resultFields["Data"][i].FieldValue = context.projectName;
                        break;
                    case 2958:
                        resultFields["Data"][i].IsEnabled = false;
                        resultFields["Data"][i].FieldValue = context.rowData["Title"];
                        break;
                    case 2959:
                        resultFields["Data"][i].DataEntryControlId = 1;
                        resultFields["Data"][i].IsEnabled = false;
                        if (context.pagetarget == 0)
                            resultFields["Data"][i]["FieldValue"] = context.rowData["Category"];
                        else
                            resultFields["Data"][i]["FieldValue"] = context.rowData["Drawing Category"];
                        break;
                    case 2971:
                        if (context.pagetarget == 0)
                            resultFields["Data"][i]["FieldValue"] = context.rowData["Latest Revision No"];
                        else
                            resultFields["Data"][i]["FieldValue"] = context.rowData["Revision No."];
                        break;
                    case 2972:
                        resultFields["Data"][i]["FieldValue"] = context.markuprowData["Description"];
                        break;
                }
            }
            context.fieldDetailsAdd = resultFields["Data"];
        });
    };
    EditMarkUpComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        var fieldObj = new Array();
        fieldObj.push({ ReportFieldId: 1017, Value: this.rowData["Id"] }, { ReportFieldId: 1018, Value: JSON.parse(event["fieldobject"]).find(function (item) { return item.ReportFieldId === 1018; }).Value }, { ReportFieldId: 1021, Value: JSON.parse(event["fieldobject"]).find(function (item) { return item.ReportFieldId === 1021; }).Value });
        console.log(fieldObj);
        this.projectService.updateMarkUp(JSON.stringify(fieldObj), this.selectedId).subscribe(function (resultData) {
            console.log(resultData);
            contextObj.success = (resultData["Data"]);
            if (contextObj.success["StatusId"] == 1) {
                contextObj.notificationService.ShowToaster("Markup updated", 3);
                contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success["Data"], isUpdate: false });
            }
            else if (contextObj.success["StatusId"] == 0)
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            else if (contextObj.success["StatusId"] == 3) {
                if (contextObj.success["ServerId"] == -1) {
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                }
            }
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EditMarkUpComponent.prototype, "submitSuccess", void 0);
    EditMarkUpComponent = __decorate([
        core_1.Component({
            selector: 'markup-edit',
            templateUrl: './app/Views/Projects/Projects Data/editMarkup.component.html',
            providers: [projects_service_1.ProjectsService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'markuprowData', 'projectName', 'projectId', 'rowData', 'pagetarget'],
        }), 
        __metadata('design:paramtypes', [projects_service_1.ProjectsService, notify_service_1.NotificationService])
    ], EditMarkUpComponent);
    return EditMarkUpComponent;
}());
exports.EditMarkUpComponent = EditMarkUpComponent;
//# sourceMappingURL=editmarkup.component.js.map