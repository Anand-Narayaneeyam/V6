import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/common';
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import {IField} from  '../../../../Framework/Models/Interface/IField';
import {GridComponent} from '../../../../Framework/Whatever/Grid/grid.component';
import {IGrid} from '../../../../Framework/Models/Interface/Igrid';
import { GeneralFunctions} from '../../../../Models/Common/General';
import { SlideComponent} from '../../../../Framework/Whatever/Slide/slide.component';
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';
import {ProjectsService} from '../../../../models/projects/projects.service';
import {AdministrationService} from '../../../../models/administration/administration.service';
import {LabelComponent} from '../../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component';

@Component({
    selector: 'project-TeamMembers',
    templateUrl: './app/Views/Projects/Projects Data/TeamMembers/teammembers-list.component.html',
    directives: [PageComponent, SlideComponent, GridComponent, SubMenu, LabelComponent],
    providers: [NotificationService, GeneralFunctions, ProjectsService, AdministrationService],
    inputs: ['projectId','rowdata'],
})

export class ProjectTeamMemberComponent {
    @Output() onUpdate = new EventEmitter();

    fieldObject: IField[]=[];
    workrequestId: number;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Name]", sortDir: "ASC", allowAdd: false, allowEdit: true, allowSort: false, isHeaderCheckBx: false };;
    totalItems: number;
    itemsPerPage: number;
    pageIndex: number = 0;
    action: string;
    btnName: string;
    workFlowEntityIds: any[];
    enableMenu: number[];
    types: boolean = true;
    itemSource: any[];
    currentActionPointId: number;
    isMultiple: boolean;
    allowSubmit: boolean = true;
    projectId;
    rowdata;

    menuData = [
        {
            "id": 1,
            "title": "Save Changes",
            "image": "Update",
            "path": "Update",
            "subMenu": null,
            "privilegeId": 719
        }
    ];

    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    fieldProjectName: IField[];
    fieldPM: IField[]

    constructor(private administrationService: AdministrationService, private projectService: ProjectsService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }
    ngOnInit() {
        var context = this;
        var callBack = function (data) {
            context.menuData = data;
        };
        context.generFun.GetPrivilegesOfPage(context.menuData, callBack, 152, context.administrationService, context.menuData.length);
        context.projectService.getProjectTeamMembersFields(591).subscribe(function (resultFields) {
            console.log('result fileds in set project team members list', resultFields)
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
                        context.fieldObject.push(resultFields["Data"][i])
                        break;

                }
            }
        })
        this.dataLoad();
    }
    dataLoad() {
        var contextObj = this;
        this.projectService.getTeamMembersData(this.getReportFieldIdValuesForList(), this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            console.log(resultData["Data"])
            contextObj.totalItems = resultData["Data"]["DataCount"];
            if (contextObj.totalItems > 0) {
                contextObj.enableMenu = [1];
                contextObj.itemSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                var name = contextObj.fieldObject.find(function (item) { return item.ReportFieldId === 448 })
                name.FieldLabel = "Member";
            }
            else {
                contextObj.notificationService.ShowToaster('No Team Member exists',5)
                contextObj.enableMenu = [];
            }
            
        });
    }
    public getReportFieldIdValuesForList() {
        var tempArray: ReportFieldIdValues[] = [];      
            tempArray.push({
                ReportFieldId: 981,
                Value: this.projectId.toString()
            })

        return JSON.stringify(tempArray);
    }
    public getEntityReportField() {
        var outputList = new Array<OutputArray>();
        var arrayList = new Array<ReportFieldArray>();
        var entityValue = 0;
        for (var i = 0; i < this.itemSource.length; i++) {
           // if (this.itemSource[i]["Select All"] == true) {
                entityValue = this.itemSource[i]["Id"]
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
                    Value: this.itemSource[i]["Select All"].toString()});
                outputList.push({
                    EntityId: entityValue,
                    ReportFieldIdValues: arrayList
                });
                arrayList = JSON.parse(JSON.stringify(arrayList));
                arrayList = [];
            //}
        }
        return outputList;
    }

    checkBxClick(event) {
        console.log('check ebent', event)
        var row = event["dataSource"].find(function (item) {
            return item.Id === event["dataKeyValue"]
        })
        var seluserroleId = row.UserRoleId;
        if (event["colfieldObj"].ReportFieldId == 443) {
            if (seluserroleId > 3) {//for fac,mod,div users

                if (row["Select All"] == false) {
                    row["Authorized to Edit"] = row["Select All"];
                    row["DWG Access"] = row["Select All"]
                }
            }
            else if (seluserroleId == 3) {
                row["Authorized to Edit"] = row["Select All"];
                row["DWG Access"] = row["Select All"]
            }
        }
        else if (event["colfieldObj"].ReportFieldId == 983) {
            if (seluserroleId == 3) {
                row["Authorized to Edit"] = row["Select All"];
                row["DWG Access"] = row["Select All"]
                this.notificationService.ShowToaster("Cannot edit this field", 5)
            }
            else if (seluserroleId > 3) {
                row["DWG Access"] = row["Authorized to Edit"]
            }

        }
        else if (event["colfieldObj"].ReportFieldId == 982) {
            if (seluserroleId == 3) {
                row["Authorized to Edit"] = row["Select All"];
                row["DWG Access"] = row["Select All"]
                this.notificationService.ShowToaster("Cannot edit this field", 5)
            }
            else if (seluserroleId > 3) {
                row["DWG Access"] = row["Authorized to Edit"]
                 this.notificationService.ShowToaster("Cannot edit this field", 5)
            }
        }
    }
    onSubMenuChange(event) {
        var contextObj = this;
        switch (event.value) {
            case 1:
                console.log(this.getEntityReportField())
                var outputtobesaved = this.getEntityReportField();
                if (outputtobesaved.length > 0) {
                    this.projectService.SaveTeamMembers(JSON.stringify(outputtobesaved)).subscribe(function (resultData) {
                        console.log(resultData)
                        switch (resultData["StatusId"]) {
                            case 1:
                                contextObj.notificationService.ShowToaster("Team Members updated", 3)
                                break;
                            case 0:
                                contextObj.notificationService.ShowToaster("iDrawings encountered an error", 5);
                                break;
                    }
                    })
                }
                break;
        }

    }
}

interface ReportFieldIdValues {
    ReportFieldId: number;
    Value: any;
}
export interface OutputArray {
    EntityId: number;
    ReportFieldIdValues: any;
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}