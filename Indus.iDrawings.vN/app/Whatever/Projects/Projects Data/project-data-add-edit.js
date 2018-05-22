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
var ProjectsAddEditComponent = (function () {
    function ProjectsAddEditComponent(projectsService, _notificationService, generalFunctions) {
        this.projectsService = projectsService;
        this._notificationService = _notificationService;
        this.generalFunctions = generalFunctions;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
        this.setReminderFlag = false;
        this.startDateflag = false;
    }
    ProjectsAddEditComponent.prototype.ngOnInit = function () {
        if (this.action == "edit")
            this.startDateflag = true;
    };
    ProjectsAddEditComponent.prototype.ngDoCheck = function () {
        if (this.fieldDetailsAdd) {
            var endDate = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 1057; });
            var startDate = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 1056; });
            if (endDate.FieldValue == "" || endDate.FieldValue == null) {
                startDate.IsMandatory = false;
                startDate.IsLocallyValidated = true;
                startDate.HasValidationError = false;
                if (startDate.IsMandatory == false && startDate.FieldValue == "" && this.startDateflag == true) {
                    var el = document.getElementById("1915"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/
                    if (el != null && el != undefined) {
                        el.focus();
                        el.blur();
                    }
                    this.startDateflag = false;
                }
            }
            else if (startDate.FieldValue != "" && startDate.FieldValue != null) {
                startDate.IsMandatory = false;
                startDate.IsLocallyValidated = true;
                startDate.HasValidationError = false;
            }
            else {
                startDate.IsMandatory = true;
                startDate.IsLocallyValidated = false;
                startDate.HasValidationError = true;
            }
        }
    };
    ProjectsAddEditComponent.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    };
    ProjectsAddEditComponent.prototype.postSubmit = function (strsubmitField, target) {
        var contextObj = this;
        var statusId;
        var newTemp = [];
        newTemp = JSON.parse(strsubmitField);
        for (var i = 0; i < newTemp.length; i++) {
            if (newTemp[i].ReportFieldId == 1053) {
                if (newTemp[i].Value == 46) {
                    newTemp[i].Value = 1;
                    statusId = newTemp[i].Value;
                }
                else if (newTemp[i].Value == 47) {
                    newTemp[i].Value = 2;
                    statusId = newTemp[i].Value;
                }
            }
        }
        for (var i = 0; i < newTemp.length; i++) {
            if (newTemp[i].ReportFieldId == 500237)
                newTemp[i].ReportFieldId = 1068;
            else if (newTemp[i].ReportFieldId == 500238)
                newTemp[i].ReportFieldId = 1070;
        }
        newTemp.push({
            ReportFieldId: 1051,
            Value: 2
        });
        newTemp.push({
            ReportFieldId: 1059,
            Value: contextObj.setReminderFlag
        });
        newTemp.push({
            ReportFieldId: 1060,
            Value: 1
        });
        newTemp.push({
            ReportFieldId: 1067,
            Value: statusId
        });
        strsubmitField = JSON.stringify(newTemp);
        var startDate = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 1056; });
        var endDate = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 1057; });
        var strtDate = new Date(startDate.FieldValue);
        var edDate = new Date(endDate.FieldValue);
        if (strtDate > edDate) {
            contextObj._notificationService.ShowToaster('Project End Date should be on or after Project Start Date', 2);
            return;
        }
        contextObj.projectsService.AddUpdateProjects(strsubmitField, this.selectedId[0], target).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("Project added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Project details updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster("Project already exists", 5);
                    }
                    else if (resultData["Data"].ServerId == -2) {
                        contextObj._notificationService.ShowToaster("Project already exists", 5);
                    }
                    break;
            }
        });
    };
    ProjectsAddEditComponent.prototype.chkChangeevent = function (event) {
        var reminderStartsFrom = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 500237; });
        var reminderInterval = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 500238; });
        if (event.chkBoxObject.IsChecked == true) {
            reminderStartsFrom.ReadOnlyMode = false;
            reminderStartsFrom.IsMandatory = true;
            reminderStartsFrom.IsLocallyValidated = false;
            reminderStartsFrom.HasValidationError = true;
            reminderInterval.IsEnabled = true;
            reminderInterval.IsMandatory = true;
            reminderInterval.IsLocallyValidated = false;
            reminderInterval.HasValidationError = true;
            this.setReminderFlag = true;
        }
        else if (event.chkBoxObject.IsChecked == false) {
            reminderStartsFrom.ReadOnlyMode = true;
            reminderStartsFrom.IsMandatory = false;
            reminderStartsFrom.IsLocallyValidated = true;
            reminderStartsFrom.HasValidationError = false;
            reminderInterval.IsEnabled = false;
            reminderInterval.IsMandatory = false;
            reminderInterval.IsLocallyValidated = true;
            reminderInterval.HasValidationError = false;
            this.setReminderFlag = false;
        }
    };
    ProjectsAddEditComponent.prototype.dateChange = function (event) {
        var startDate = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 1056; });
        var endDate = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 1057; });
        if (event.dateChangeObject.FieldObject.FieldId == 1916 && endDate.FieldValue.length > 0) {
            startDate.IsMandatory = true;
            startDate.IsLocallyValidated = false;
            startDate.HasValidationError = true;
            this.startDateflag = true;
            setTimeout(function () {
                var el = document.getElementById("1915"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/
                if (el != null && el != undefined) {
                    el.focus();
                    el.blur();
                }
            }, 20);
        }
        else {
            startDate.IsMandatory = false;
            startDate.IsLocallyValidated = true;
            startDate.HasValidationError = false;
            setTimeout(function () {
                var el = document.getElementById("1915"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/
                if (el != null && el != undefined) {
                    el.focus();
                    el.blur();
                }
            }, 20);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ProjectsAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ProjectsAddEditComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ProjectsAddEditComponent.prototype, "submitSuccess", void 0);
    ProjectsAddEditComponent = __decorate([
        core_1.Component({
            selector: 'projects-add-edit',
            templateUrl: './app/Views/Projects/Projects Data/project-data-add-edit.html',
            providers: [projects_service_1.ProjectsService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
        }), 
        __metadata('design:paramtypes', [projects_service_1.ProjectsService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ProjectsAddEditComponent);
    return ProjectsAddEditComponent;
}());
exports.ProjectsAddEditComponent = ProjectsAddEditComponent;
//# sourceMappingURL=project-data-add-edit.js.map