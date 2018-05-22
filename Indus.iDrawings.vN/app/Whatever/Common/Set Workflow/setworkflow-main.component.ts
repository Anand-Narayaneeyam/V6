import { Component, OnInit, OnChanges, SimpleChange, Input} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component';
import {SplitViewComponent} from '../../../Framework/Whatever/Split-View/split-view.component';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view';
import { SetWorkflowComponent } from '../../Common/Set Workflow/setworkflow.component';
import {OpenWorkflowComponent} from '../openworkflow/openworkflow.component';
import {OpenWorkflowServices} from '../../../models/common/openworkflow.services';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
@Component({
    selector: 'setworkflowmain',
    templateUrl: './app/Views/Common/Set Workflow/setworkflow-main.component.html',
    directives: [TabsComponent, TabComponent, SlideComponent, SplitViewComponent, Notification, SetWorkflowComponent, OpenWorkflowComponent],
    providers: [OpenWorkflowServices, NotificationService]
})

export class SetWorkflowMainComponent {
    @Input() moduleId: number = 0; 
    @Input() workFlowCategoryId: number; 
    selectedTab: number = 0;
    viewWorkflow: boolean = false;
    isOpenWorkflowComponentActive: boolean = false;
    workTypeId: number;
    localselection: number;
    deleteIndex: number;
    closeTbFuns: any = undefined;
    openWorkflowObj: any = undefined;
    openFlowchartObj: any = undefined;
    showSlide: boolean = false;
    isNotInuse: boolean;
    isCloseOnClick: boolean = false;
    workTypeName: string = "";
    isDrawChange: boolean = false;
    constructor(private openWorkflowService: OpenWorkflowServices, private notificationService: NotificationService) {

    }
    getSelectedTab(event: any) {
        var contextObj = this;
        if (event[0] == 0 && event[1] && contextObj.viewWorkflow) {
            contextObj.viewWorkflow = false;
            contextObj.isOpenWorkflowComponentActive = false;
            contextObj.deleteIndex = 1;
            setTimeout(function () {
                contextObj.deleteIndex = 0;
            }, 50);
            if (contextObj.isDrawChange)
                contextObj.saveOnClick();
           // this.showSlide = true;
        }
        contextObj.selectedTab = event[0];
    }
    ngOnInit() {
        if (this.moduleId == 0) {
            this.moduleId = 9;
            this.workFlowCategoryId = 1;
        }
    }
    openWorkflow(event: any) {
        this.workTypeId = event["Id"];
        this.workTypeName = event["Value"];
        var contextObj = this;
        contextObj.selectedTab = 0;
        this.openWorkflowService.getWorkflowIsEditableForWorktype(contextObj.workTypeId).subscribe(function (isEditable) {
            contextObj.isNotInuse = isEditable["Data"];

            contextObj.viewWorkflow = true;
            setTimeout(function () {
                contextObj.selectedTab = 1;
            }, 200);
            setTimeout(function () {
                contextObj.isOpenWorkflowComponentActive = true;
            }, 250);
        }); 
    }
    getOpenWorkflowobject(event: any) {
        this.openWorkflowObj = event['openworkflowObj'];
        this.openFlowchartObj = event['workflowObj'];
    }
    onTabBeforeClose($event) {
        var contextObj = this;
        contextObj.closeTbFuns = $event;
        // this.showSlide = true;
        this.isCloseOnClick = true;
        this.saveOnClick();
        this.onTabClose();
    }
    okWorkFlowDiagramSave() {
        debugger
        this.showSlide = false;
    }
    closeSlideConfirmDialog(event: any) {
        debugger
        this.showSlide = false;
        if (!event.change) {
            if (this.openFlowchartObj != undefined && this.closeTbFuns != undefined)
                this.onTabClose();
        }
    }
    drawChanged(event) {
        this.isDrawChange = event;
    }
    onTabClose() {
        var callBackForCloseTab = this.closeTbFuns[1];
        var selectedTabObj = this.closeTbFuns[2];
        var tabContextObj = this.closeTbFuns[3];
        callBackForCloseTab(selectedTabObj, tabContextObj, "out");
        var contextObj = this;
        if (this.openFlowchartObj) {
            this.openFlowchartObj.close(function (returnCode) {
                contextObj.openFlowchartObj = null;
            });
        }
        this.isOpenWorkflowComponentActive = false;
        this.viewWorkflow = false;
    }
    saveOnClick() {
        var contextObj = this;
        this.openFlowchartObj.saveFlowchartView(function (retcode, XMLData) {
            var xmlData = XMLData;
            contextObj.openWorkflowService.saveFlowchartFile(xmlData, contextObj.workTypeId, 0).subscribe(function (resultData) {
                contextObj.isDrawChange = false;
                contextObj.notificationService.ShowToaster("Workflow saved", 3);
            });
        });
    }

}