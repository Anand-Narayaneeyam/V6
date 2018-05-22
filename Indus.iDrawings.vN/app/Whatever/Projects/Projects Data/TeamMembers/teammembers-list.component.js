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
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var General_1 = require('../../../../Models/Common/General');
var slide_component_1 = require('../../../../Framework/Whatever/Slide/slide.component');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var projects_service_1 = require('../../../../models/projects/projects.service');
var administration_service_1 = require('../../../../models/administration/administration.service');
var labelcomponent_component_1 = require('../../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component');
var ProjectTeamMemberComponent = (function () {
    function ProjectTeamMemberComponent(administrationService, projectService, notificationService, generFun) {
        this.administrationService = administrationService;
        this.projectService = projectService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.onUpdate = new core_1.EventEmitter();
        this.fieldObject = [];
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Name]", sortDir: "ASC", allowAdd: false, allowEdit: true, allowSort: false, isHeaderCheckBx: false };
        this.pageIndex = 0;
        this.types = true;
        this.allowSubmit = true;
        this.menuData = [
            {
                "id": 1,
                "title": "Save Changes",
                "image": "Update",
                "path": "Update",
                "subMenu": null,
                "privilegeId": 719
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
    }
    ;
    ProjectTeamMemberComponent.prototype.ngOnInit = function () {
        var context = this;
        var callBack = function (data) {
            context.menuData = data;
        };
        context.generFun.GetPrivilegesOfPage(context.menuData, callBack, 152, context.administrationService, context.menuData.length);
        context.projectService.getProjectTeamMembersFields(591).subscribe(function (resultFields) {
            console.log('result fileds in set project team members list', resultFields);
            for (var i = 0; i < resultFields["Data"].length; i++) {
                switch (resultFields["Data"][i].ReportFieldId) {
                    case 1052:
                        context.fieldProjectName = resultFields["Data"][i];
                        context.fieldProjectName["FieldValue"] = context.rowdata["Project Name"];
                        break;
                    case 1054:
                        context.fieldPM = resultFields["Data"][i];
                        context.fieldPM["FieldValue"] = context.rowdata["Project Manager"];
                        break;
                    case 448:
                    // resultFields["Data"][i].FieldLabel = "Member";
                    case 983:
                    case 443:
                    case 439:
                    case 982:
                        context.fieldObject.push(resultFields["Data"][i]);
                        break;
                }
            }
        });
        this.dataLoad();
    };
    ProjectTeamMemberComponent.prototype.dataLoad = function () {
        var contextObj = this;
        this.projectService.getTeamMembersData(this.getReportFieldIdValuesForList(), this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            console.log(resultData["Data"]);
            contextObj.totalItems = resultData["Data"]["DataCount"];
            if (contextObj.totalItems > 0) {
                contextObj.enableMenu = [1];
                contextObj.itemSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                var name = contextObj.fieldObject.find(function (item) { return item.ReportFieldId === 448; });
                name.FieldLabel = "Member";
            }
            else {
                contextObj.notificationService.ShowToaster('No Team Member exists', 5);
                contextObj.enableMenu = [];
            }
        });
    };
    ProjectTeamMemberComponent.prototype.getReportFieldIdValuesForList = function () {
        var tempArray = [];
        tempArray.push({
            ReportFieldId: 981,
            Value: this.projectId.toString()
        });
        return JSON.stringify(tempArray);
    };
    ProjectTeamMemberComponent.prototype.getEntityReportField = function () {
        var outputList = new Array();
        var arrayList = new Array();
        var entityValue = 0;
        for (var i = 0; i < this.itemSource.length; i++) {
            // if (this.itemSource[i]["Select All"] == true) {
            entityValue = this.itemSource[i]["Id"];
            arrayList.push({
                ReportFieldId: 981,
                Value: this.projectId.toString()
            }, {
                ReportFieldId: 982,
                Value: this.itemSource[i]["Authorized to Edit"].toString()
            }, {
                ReportFieldId: 983,
                Value: this.itemSource[i]["DWG Access"].toString()
            }, {
                ReportFieldId: 980,
                Value: this.itemSource[i]["Select All"].toString() });
            outputList.push({
                EntityId: entityValue,
                ReportFieldIdValues: arrayList
            });
            arrayList = JSON.parse(JSON.stringify(arrayList));
            arrayList = [];
        }
        return outputList;
    };
    ProjectTeamMemberComponent.prototype.checkBxClick = function (event) {
        console.log('check ebent', event);
        var row = event["dataSource"].find(function (item) {
            return item.Id === event["dataKeyValue"];
        });
        var seluserroleId = row.UserRoleId;
        if (event["colfieldObj"].ReportFieldId == 443) {
            if (seluserroleId > 3) {
                if (row["Select All"] == false) {
                    row["Authorized to Edit"] = row["Select All"];
                    row["DWG Access"] = row["Select All"];
                }
            }
            else if (seluserroleId == 3) {
                row["Authorized to Edit"] = row["Select All"];
                row["DWG Access"] = row["Select All"];
            }
        }
        else if (event["colfieldObj"].ReportFieldId == 983) {
            if (seluserroleId == 3) {
                row["Authorized to Edit"] = row["Select All"];
                row["DWG Access"] = row["Select All"];
                this.notificationService.ShowToaster("Cannot edit this field", 5);
            }
            else if (seluserroleId > 3) {
                row["DWG Access"] = row["Authorized to Edit"];
            }
        }
        else if (event["colfieldObj"].ReportFieldId == 982) {
            if (seluserroleId == 3) {
                row["Authorized to Edit"] = row["Select All"];
                row["DWG Access"] = row["Select All"];
                this.notificationService.ShowToaster("Cannot edit this field", 5);
            }
            else if (seluserroleId > 3) {
                row["DWG Access"] = row["Authorized to Edit"];
                this.notificationService.ShowToaster("Cannot edit this field", 5);
            }
        }
    };
    ProjectTeamMemberComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 1:
                console.log(this.getEntityReportField());
                var outputtobesaved = this.getEntityReportField();
                if (outputtobesaved.length > 0) {
                    this.projectService.SaveTeamMembers(JSON.stringify(outputtobesaved)).subscribe(function (resultData) {
                        console.log(resultData);
                        switch (resultData["StatusId"]) {
                            case 1:
                                contextObj.notificationService.ShowToaster("Team Members updated", 3);
                                break;
                            case 0:
                                contextObj.notificationService.ShowToaster("iDrawings encountered an error", 5);
                                break;
                        }
                    });
                }
                break;
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ProjectTeamMemberComponent.prototype, "onUpdate", void 0);
    ProjectTeamMemberComponent = __decorate([
        core_1.Component({
            selector: 'project-TeamMembers',
            templateUrl: './app/Views/Projects/Projects Data/TeamMembers/teammembers-list.component.html',
            directives: [page_component_1.PageComponent, slide_component_1.SlideComponent, grid_component_1.GridComponent, submenu_component_1.SubMenu, labelcomponent_component_1.LabelComponent],
            providers: [notify_service_1.NotificationService, General_1.GeneralFunctions, projects_service_1.ProjectsService, administration_service_1.AdministrationService],
            inputs: ['projectId', 'rowdata'],
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, projects_service_1.ProjectsService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ProjectTeamMemberComponent);
    return ProjectTeamMemberComponent;
}());
exports.ProjectTeamMemberComponent = ProjectTeamMemberComponent;
//# sourceMappingURL=teammembers-list.component.js.map