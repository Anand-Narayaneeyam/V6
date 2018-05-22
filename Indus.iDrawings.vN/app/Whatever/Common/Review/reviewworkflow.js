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
var dropdownlistcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/dropdownlistcomponent.component');
var reviewworkflow_service_1 = require('../../../models/common/reviewworkflow.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var labelcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component');
var stringtextbox_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/stringtextbox.component');
var submenu_component_1 = require('../../../framework/whatever/submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var floor_selection_component_1 = require('../../space/space data/floor-selection.component');
var drawingdetails_component_1 = require('../drawingdetails/drawingdetails.component');
var reviewhistory_component_1 = require('./reviewhistory.component');
var textareacomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/textareacomponent.component');
var sortHelper_1 = require('../../utils/sortHelper');
var ReviewWorkFlowComponent = (function () {
    function ReviewWorkFlowComponent(_reviewWorkFlowService, _sortHelper) {
        this._reviewWorkFlowService = _reviewWorkFlowService;
        this._sortHelper = _sortHelper;
        this.splitviewReview = { secondaryArea: 60, showSecondaryView: false, showButton: false };
        this.enableSiteMenu = [0, 5, 6, 7, 8];
        this.siteTotalItems = 8;
        this.inputItems = { dataKey: "", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: "'single'" };
    }
    ReviewWorkFlowComponent.prototype.ngOnInit = function () {
        this.alignContent = "horizontal";
        if ((this.workflowCatId == 4) && (this.entityCatId == 5))
            this.getSubMenu(this.selectedid);
    };
    ReviewWorkFlowComponent.prototype.ngOnChanges = function (changes) {
        if (changes["workflowCatId"] && changes["entityCatId"] && changes["workflowCatId"]["currentValue"] != changes["workflowCatId"]["previousValue"] && changes["entityCatId"]["currentValue"] != changes["entityCatId"]["previousValue"]) {
            //switch (this.workflowCatId) {
            //    case 1: {
            //        this.getRequestNumber(this.selectedid);
            //        this.getRequestBy(this.selectedid);
            //        this.getActionSection(this.selectedid);
            //        this.getTime(this.selectedid);
            //        this.getDescriptionData(this.selectedid);
            //        this.getRequestDetailsData(this.selectedid);
            //    } break;
            //    case 4: {
            //        debugger
            //        this.getActionSection(this.selectedid);
            //        this.getStackPlanData(this.selectedid);
            //        this.getRequestDetailsData(this.selectedid);
            //    } break;
            //}
            if ((this.workflowCatId == 4) && (this.entityCatId == 5)) {
                this.getActionSection(this.selectedid);
                this.getStackPlanData(this.selectedid);
                this.getRequestDetailsData(this.selectedid);
            }
            if (this.workflowCatId == 1) {
                this.getRequestNumber(this.selectedid);
                if (this.entityCatId != 3)
                    this.getRequestBy(this.selectedid);
                this.getActionSection(this.selectedid);
                this.getSubMenu(this.selectedid);
                this.getTime(this.selectedid);
                this.getDescriptionData(this.selectedid);
                this.getRequestDetailsData(this.selectedid);
            }
        }
    };
    ReviewWorkFlowComponent.prototype.onSort = function (objGrid) {
        var sortedData = new Array(); /*To notify the watcher about the change*/
        sortedData = sortedData.concat(this.itemsSource.sort(this._sortHelper.sortByProperty(this.inputItems["sortCol"], this.inputItems["sortDir"])));
        this.itemsSource = sortedData;
    };
    //Request Section
    ReviewWorkFlowComponent.prototype.getRequestNumber = function (selectedid) {
        var _this = this;
        this._reviewWorkFlowService.getRequestNumberDetails(selectedid).subscribe(function (resultData) { return console.log(_this.fieldrequestnumber = resultData["requestnumberdetails"][0]); });
    };
    ReviewWorkFlowComponent.prototype.getRequestBy = function (selectedid) {
        var _this = this;
        this._reviewWorkFlowService.getRequestNumberDetails(selectedid).subscribe(function (resultData) { return console.log(_this.fieldrequestby = resultData["requestnumberdetails"][1]); });
    };
    //Action Section
    ReviewWorkFlowComponent.prototype.getActionSection = function (selectedid) {
        var _this = this;
        this._reviewWorkFlowService.getAction(this.workflowCatId, this.entityCatId, selectedid).subscribe(function (resultData) { return console.log(_this.fieldaction = resultData["spaceplanningapprovalreview"][0]); });
        this._reviewWorkFlowService.getAction(this.workflowCatId, this.entityCatId, selectedid).subscribe(function (resultData) { return console.log(_this.fieldsendto = resultData["spaceplanningapprovalreview"][1]); });
    };
    ReviewWorkFlowComponent.prototype.getTime = function (selectedid) {
        var _this = this;
        this._reviewWorkFlowService.getRequestNumberDetails(selectedid).subscribe(function (resultData) { return console.log(_this.fieldtimespent = resultData["requestnumberdetails"][2]); });
    };
    //Sub Menu Section
    ReviewWorkFlowComponent.prototype.getSubMenu = function (selectedid) {
        var _this = this;
        this._reviewWorkFlowService.getsubMenu(this.workflowCatId, this.entityCatId, selectedid).subscribe(function (resultData) { return _this.reviewMenu = resultData["spaceplanningsubmenu"]; });
    };
    //Description or Stack Plan section
    ReviewWorkFlowComponent.prototype.getDescriptionData = function (selectedid) {
        var _this = this;
        if (this.entityCatId != 3)
            this._reviewWorkFlowService.getDescriptionData(selectedid).subscribe(function (result) { return _this.fieldDescription = result["descriptionData"][0]; });
        this._reviewWorkFlowService.getDescriptionData(selectedid).subscribe(function (result) { return _this.fieldPreviousComments = result["descriptionData"][1]; });
        this._reviewWorkFlowService.getDescriptionData(selectedid).subscribe(function (result) { return _this.fieldComments = result["descriptionData"][2]; });
    };
    ReviewWorkFlowComponent.prototype.getStackPlanData = function (selectedid) {
        var _this = this;
        this._reviewWorkFlowService.getStackPlans(selectedid).subscribe(function (resultData) { return _this.fieldObject = resultData["stackplancolumn"]; });
        this._reviewWorkFlowService.getStackPlans(selectedid).subscribe(function (resultData) { return _this.itemsSource = resultData["stackplandata"]; });
    };
    //Request details section
    ReviewWorkFlowComponent.prototype.getRequestDetailsData = function (selectedid) {
        var _this = this;
        this._reviewWorkFlowService.getRequestDetails().subscribe(function (resultData) { return _this.fieldDetailsSpaceEdit = resultData["requestDetails"]; });
    };
    ReviewWorkFlowComponent.prototype.updateReviewMenu = function (event) {
        this.activemenu = event.value;
        this.splitviewReview.showSecondaryView = true;
        switch (event.value) {
            case 6:
                break; //select floor
            case 7: {
                this.moduleId = 3;
                this.pageTarget = 1;
            }
            case 0: {
            }
        }
    };
    ReviewWorkFlowComponent.prototype.doneClick = function (event) {
        console.log(event["selectedFloor"]);
        this.splitviewReview.showSecondaryView = false;
    };
    ReviewWorkFlowComponent.prototype.ClickEvent = function (event) {
        if (event == "cancel")
            this.splitviewReview.showSecondaryView = false;
    };
    ReviewWorkFlowComponent.prototype.getdescription = function () {
        if (this.workflowCatId == 4 && this.entityCatId == 5)
            this.description = "Stack Plans";
        if (this.workflowCatId == 1)
            this.description = "Description";
        return this.description;
    };
    ReviewWorkFlowComponent.prototype.getRequestDetails = function () {
        if (this.workflowCatId == 4 && this.entityCatId == 5)
            this.details = "Request Details";
        if (this.workflowCatId == 1) {
            this.details = "Request Details";
            if (this.entityCatId == 2 || this.entityCatId == 3)
                this.details = "Work Order Details";
            if (this.fieldrequestnumber) {
                if ((this.entityCatId == 2) || (this.entityCatId == 3)) {
                    this.fieldrequestnumber.FieldLabel = "Work Order Number";
                }
            }
        }
        return this.details;
    };
    ReviewWorkFlowComponent.prototype.submitClick = function () {
        console.log(this.fieldDetailsSpaceEdit + "  " + this.fieldaction);
    };
    ReviewWorkFlowComponent = __decorate([
        core_1.Component({
            selector: 'reviewWorkFlow',
            templateUrl: 'app/Views/Common/Review/reviewWorkFlow.html',
            inputs: ['workflowCatId', 'entityCatId', 'selectedid'],
            directives: [dropdownlistcomponent_component_1.DropDownListComponent, textareacomponent_component_1.TextAreaComponent, reviewhistory_component_1.ReviewHistoryComponent, drawingdetails_component_1.DrawingDetailsComponent, floor_selection_component_1.FloorSelectionComponent, split_view_component_1.SplitViewComponent, submenu_component_1.SubMenu, grid_component_1.GridComponent, fieldGeneration_component_1.FieldComponent, labelcomponent_component_1.LabelComponent, stringtextbox_component_1.StringTextBoxComponent],
            providers: [reviewworkflow_service_1.ReviewWorkFlowService, sortHelper_1.SortHelper]
        }), 
        __metadata('design:paramtypes', [reviewworkflow_service_1.ReviewWorkFlowService, sortHelper_1.SortHelper])
    ], ReviewWorkFlowComponent);
    return ReviewWorkFlowComponent;
}());
exports.ReviewWorkFlowComponent = ReviewWorkFlowComponent;
//# sourceMappingURL=reviewworkflow.js.map