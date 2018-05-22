import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/common';
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import {IField} from  '../../../../Framework/Models/Interface/IField';
import {GridComponent} from '../../../../Framework/Whatever/Grid/grid.component';
import {IGrid} from '../../../../Framework/Models/Interface/Igrid';
import { WorkOrdereService } from '../../../../Models/WorkOrder/workorder.service';
import { GeneralFunctions} from '../../../../Models/Common/General';
import { SlideComponent} from '../../../../Framework/Whatever/Slide/slide.component';
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';

@Component({
    selector: 'review-TeamMembers',
    templateUrl: './app/Views/WorkOrder/Review/Review Team Members/reviewTeam-Members.component.html',
    directives: [PageComponent, SlideComponent, GridComponent, SubMenu],
    providers: [NotificationService, WorkOrdereService, GeneralFunctions],
    inputs: ['currentActionPointId', 'workFlowEntityIds', 'isMultiple'],
})

export class ReviewTeamMemberComponent {
    @Output() onUpdate = new EventEmitter();

    fieldObject: IField[];
    workrequestId: number;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Name]", sortDir: "ASC", allowAdd: false, allowEdit: true, allowSort: false };;
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

    menuData = [
        {
            "id": 1,
            "title": "Save Changes",
            "image": "Update",
            "path": "Update",
            "subMenu": null,
            "privilegeId": null
        }
    ];

    position = "top-right";
    showSlide = false;
    slidewidth = 250;

    constructor(private workOrderService: WorkOrdereService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngAfterViewInit() {

        var contextObj = this;
        this.workOrderService.getTeamMembersListFields().subscribe(function (result) {
            contextObj.fieldObject = result["Data"];
            contextObj.dataLoad(1);
        });
    }

    public dataLoad(target?: number) {
        var contextObj = this;
        debugger;
        contextObj.workOrderService.getTeamMembersListData(contextObj.getReportFieldIdValuesForList(), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemSource = JSON.parse(result["Data"].FieldBinderData);
                for (var item of contextObj.itemSource) {
                    item["Select All"] = item["Select All"] == "True";
                }
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
                contextObj.enableMenu = [1];
            }
            else {
                contextObj.notificationService.ShowToaster("No Team Members exist", 5);
                contextObj.enableMenu = [];
            }
        });
    }

    public getReportFieldIdValuesForList() {
        var tempArray: ReportFieldIdValues[] = [];
        for (var item of this.workFlowEntityIds) {
            tempArray.push({
                ReportFieldId: 5859,
                Value: item
            })
        }
        tempArray.push({ ReportFieldId: 5827, Value: this.currentActionPointId });
        return JSON.stringify(tempArray);
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.onUpdateClick();
                break;
        }
    }

    public onUpdateClick() {
        if (this.allowSubmit) {
            var returnDatArray: ITeamMemberReportFieldIdValues[] = [];
            for (var entityId of this.workFlowEntityIds) {
                for (var item of this.itemSource) {
                    var tempArray: ReportFieldIdValues[] = [];
                    if (item["Select All"]) {
                        tempArray.push({ ReportFieldId: 5827, Value: this.currentActionPointId }, { ReportFieldId: 5859, Value: entityId });
                        switch (item["User Category"]) {
                            case 'Employee':
                                tempArray.push({ ReportFieldId: 7527, Value: item.Id });
                                break;
                            case 'Technician':
                                tempArray.push({ ReportFieldId: 7528, Value: item.Id });
                                break;
                            case 'Contractor':
                                tempArray.push({ ReportFieldId: 7529, Value: item.Id });
                                break;
                        }
                    }
                    if (tempArray.length > 0) {
                        returnDatArray.push({ WFReportFieldIdValues: tempArray });
                    }
                }
            }

            this.onUpdate.emit({ data: returnDatArray, target: this.isMultiple ? 2 : 1 });
            this.allowSubmit = false;
        }
    }

}

interface ReportFieldIdValues {
    ReportFieldId: number;
    Value: any;
}

interface ITeamMemberReportFieldIdValues {
    WFReportFieldIdValues: ReportFieldIdValues[];
}