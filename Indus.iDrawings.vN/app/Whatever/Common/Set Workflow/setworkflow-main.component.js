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
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var setworkflow_component_1 = require('../../Common/Set Workflow/setworkflow.component');
var openworkflow_component_1 = require('../openworkflow/openworkflow.component');
var openworkflow_services_1 = require('../../../models/common/openworkflow.services');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var SetWorkflowMainComponent = (function () {
    function SetWorkflowMainComponent(openWorkflowService, notificationService) {
        this.openWorkflowService = openWorkflowService;
        this.notificationService = notificationService;
        this.moduleId = 0;
        this.selectedTab = 0;
        this.viewWorkflow = false;
        this.isOpenWorkflowComponentActive = false;
        this.closeTbFuns = undefined;
        this.openWorkflowObj = undefined;
        this.openFlowchartObj = undefined;
        this.showSlide = false;
        this.isCloseOnClick = false;
        this.workTypeName = "";
        this.isDrawChange = false;
    }
    SetWorkflowMainComponent.prototype.getSelectedTab = function (event) {
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
        }
        contextObj.selectedTab = event[0];
    };
    SetWorkflowMainComponent.prototype.ngOnInit = function () {
        if (this.moduleId == 0) {
            this.moduleId = 9;
            this.workFlowCategoryId = 1;
        }
    };
    SetWorkflowMainComponent.prototype.openWorkflow = function (event) {
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
    };
    SetWorkflowMainComponent.prototype.getOpenWorkflowobject = function (event) {
        this.openWorkflowObj = event['openworkflowObj'];
        this.openFlowchartObj = event['workflowObj'];
    };
    SetWorkflowMainComponent.prototype.onTabBeforeClose = function ($event) {
        var contextObj = this;
        contextObj.closeTbFuns = $event;
        // this.showSlide = true;
        this.isCloseOnClick = true;
        this.saveOnClick();
        this.onTabClose();
    };
    SetWorkflowMainComponent.prototype.okWorkFlowDiagramSave = function () {
        debugger;
        this.showSlide = false;
    };
    SetWorkflowMainComponent.prototype.closeSlideConfirmDialog = function (event) {
        debugger;
        this.showSlide = false;
        if (!event.change) {
            if (this.openFlowchartObj != undefined && this.closeTbFuns != undefined)
                this.onTabClose();
        }
    };
    SetWorkflowMainComponent.prototype.drawChanged = function (event) {
        this.isDrawChange = event;
    };
    SetWorkflowMainComponent.prototype.onTabClose = function () {
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
    };
    SetWorkflowMainComponent.prototype.saveOnClick = function () {
        var contextObj = this;
        this.openFlowchartObj.saveFlowchartView(function (retcode, XMLData) {
            var xmlData = XMLData;
            contextObj.openWorkflowService.saveFlowchartFile(xmlData, contextObj.workTypeId, 0).subscribe(function (resultData) {
                contextObj.isDrawChange = false;
                contextObj.notificationService.ShowToaster("Workflow saved", 3);
            });
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SetWorkflowMainComponent.prototype, "moduleId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SetWorkflowMainComponent.prototype, "workFlowCategoryId", void 0);
    SetWorkflowMainComponent = __decorate([
        core_1.Component({
            selector: 'setworkflowmain',
            templateUrl: './app/Views/Common/Set Workflow/setworkflow-main.component.html',
            directives: [tabs_component_1.TabsComponent, tab_component_1.TabComponent, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, notify_component_1.Notification, setworkflow_component_1.SetWorkflowComponent, openworkflow_component_1.OpenWorkflowComponent],
            providers: [openworkflow_services_1.OpenWorkflowServices, notify_service_1.NotificationService]
        }), 
        __metadata('design:paramtypes', [openworkflow_services_1.OpenWorkflowServices, notify_service_1.NotificationService])
    ], SetWorkflowMainComponent);
    return SetWorkflowMainComponent;
}());
exports.SetWorkflowMainComponent = SetWorkflowMainComponent;
//# sourceMappingURL=setworkflow-main.component.js.map