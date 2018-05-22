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
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var section_component_1 = require('../../../../Framework/Whatever/Section/section.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../../Models/Common/General');
var projects_service_1 = require('../../../../Models/Projects/projects.service');
var reviewsorcomments_addedit_component_1 = require('./reviewsorcomments-addedit.component');
var ReviewsORComments = (function () {
    function ReviewsORComments(projectService, notificationService, generFun) {
        this.projectService = projectService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.enableMenu = [1];
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 785
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 786
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 787
            },
            {
                "id": 4,
                "title": "Download",
                "image": "Download",
                "path": "Download",
                "submenu": null,
                "privilegeId": 788
            }
        ];
        this.selectedId = 0;
        this.showSlide = false;
        this.isReview = false;
    }
    ReviewsORComments.prototype.ngOnInit = function () {
        this.getReviewsORCommentsListDDL();
        this.getReviewsORCommentsFields();
        this.geReviewsORCommentsList();
        this.projectNameDetails = "Project Name: " + "<b>" + this.projectName + "</b>";
    };
    ReviewsORComments.prototype.getReviewsORCommentsListDDL = function () {
        var contextObj = this;
        this.projectService.getReviewsORCommentsGridFields().subscribe(function (resultData) {
            debugger;
            contextObj.fieldDetailsList = resultData.Data;
            contextObj.fieldDetailsList = contextObj.fieldDetailsList.filter(function (item) {
                return item.FieldId == 2991;
            });
        });
        return;
    };
    ReviewsORComments.prototype.getReviewsORCommentsFields = function () {
        var contextObj = this;
        this.projectService.getReviewsORCommentsGridFields().subscribe(function (resultData) {
            debugger;
            contextObj.fieldObject = resultData.Data;
            contextObj.fieldObject = contextObj.fieldObject.filter(function (item) {
                return item.FieldId != 2991;
            });
        });
        return;
    };
    ReviewsORComments.prototype.geReviewsORCommentsList = function () {
        var contextObj = this;
        var reportFieldArray = [];
        reportFieldArray.push({
            ReportFieldId: 1034,
            Value: this.projectId.toString()
        });
        debugger;
        contextObj.projectService.getReviewsORCommentsGridData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, reportFieldArray).subscribe(function (resultData) {
            debugger;
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            if (contextObj.totalItems > 0) {
                contextObj.enableMenu = [1, 2, 3];
            }
            else {
                contextObj.notificationService.ShowToaster("No Reviews or Comments exist", 2);
                contextObj.enableMenu = [1];
            }
        });
        return;
    };
    ReviewsORComments.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.addClick();
                break;
            case 2:
                this.editClick();
                break;
            case 3:
                this.deleteClick();
                break;
            case 4:
                this.downloadClick();
                break;
        }
    };
    ReviewsORComments.prototype.addClick = function () {
        this.splitviewInput.showSecondaryView = true;
        this.pageTitle = "New Review or Comment";
        this.btnName = "Upload";
        this.action = "add";
        this.getAddEditFields(this.action, 0);
    };
    ReviewsORComments.prototype.editClick = function () {
        this.splitviewInput.showSecondaryView = true;
        this.pageTitle = "Edit Review or Comment";
        this.btnName = "Update";
        this.action = "edit";
        this.selectedId = this.inputItems.selectedIds[0];
        if (this.inputItems.rowData['IsReview'] == 1) {
            this.isReview = true;
        }
        if (this.inputItems.rowData['IsReview'] == 0) {
            this.isReview = false;
        }
        this.getAddEditFields(this.action, this.selectedId);
        debugger;
    };
    ReviewsORComments.prototype.deleteClick = function () {
        debugger;
        var context = this;
        if (context.inputItems.selectedIds[0] != undefined) {
            context.selectedId = context.inputItems.selectedIds[0];
            context.showSlide = true;
            context.slideTitle = "iDrawings V6";
            context.slideType = "notification";
            context.slideMessage = "Are you sure you want to delete the selected Review or Comment?";
        }
    };
    ReviewsORComments.prototype.downloadClick = function () {
        if (this.inputItems.selectedIds.length != 0) {
            var contextObj = this;
            var filename;
            filename = contextObj.inputItems.rowData["File Name"];
            debugger;
            contextObj.projectService.downloadBaseDocumentFile(contextObj.inputItems.selectedIds[0], filename, 0, contextObj.projectId).subscribe(function (resultData) {
                if (resultData._body == "Data is Null")
                    contextObj.notificationService.ShowToaster("File Not found in server", 2);
                else {
                    var headers = resultData.headers;
                    var contentType = headers.get("Content-Type");
                    var linkElement = document.createElement('a');
                    var linkElement1 = document.createElement('a');
                    var data = contextObj.generFun.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
                    try {
                        var blob = new Blob([data], { type: contentType });
                        var url = window.URL.createObjectURL(blob);
                        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
                        if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                            window.navigator.msSaveOrOpenBlob(blob, filename);
                        }
                        else if (isSafari) {
                            contextObj.notificationService.ShowToaster("Download option is not supported now in Safari browser", 2);
                        }
                        else {
                            linkElement.setAttribute('href', url);
                            linkElement.setAttribute("download", filename);
                            var clickEvent = new MouseEvent("click", {
                                "view": window,
                                "bubbles": true,
                                "cancelable": false
                            });
                            linkElement.dispatchEvent(clickEvent);
                        }
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
            });
        }
    };
    ReviewsORComments.prototype.getAddEditFields = function (action, rowId) {
        var context = this;
        if (action == "add") {
            context.projectService.getReviewORCommentsAdd().subscribe(function (resultData) {
                context.fieldDetailsAddEdit = resultData.Data;
                var reviewCommnetType = context.fieldDetailsAddEdit.find(function (item) {
                    return item.FieldId === 3034;
                });
                reviewCommnetType.LookupDetails.LookupValues.reverse();
                reviewCommnetType.FieldValue = "95";
                var projctname = context.fieldDetailsAddEdit.find(function (item) {
                    return item.FieldId === 2957;
                });
                projctname.FieldValue = context.projectName;
            });
        }
        else if (action == "edit") {
            var reportFieldArray = [];
            reportFieldArray.push({
                ReportFieldId: 1034,
                Value: context.projectId.toString()
            });
            context.projectService.getReviewORCommentsEdit(JSON.stringify(reportFieldArray), rowId).subscribe(function (resultData) {
                context.fieldDetailsAddEdit = resultData.Data;
                var reviewCommnetType = context.fieldDetailsAddEdit.find(function (item) {
                    return item.FieldId === 3034;
                });
                reviewCommnetType.LookupDetails.LookupValues.reverse();
                var fileControl = context.fieldDetailsAddEdit.find(function (item) {
                    return item.FieldId === 3037;
                });
                if (context.isReview == true) {
                    reviewCommnetType.FieldValue = "94";
                }
                else {
                    reviewCommnetType.FieldValue = "95";
                }
                fileControl.IsEnabled = false;
                var projctname = context.fieldDetailsAddEdit.find(function (item) {
                    return item.FieldId === 2957;
                });
                projctname.FieldValue = context.projectName;
            });
        }
    };
    ReviewsORComments.prototype.onSort = function (objGrid) {
        this.geReviewsORCommentsList();
    };
    ReviewsORComments.prototype.closeSlide = function (event) {
        this.showSlide = false;
    };
    ReviewsORComments.prototype.onSplitViewClose = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    ReviewsORComments.prototype.yesOnClick = function (event) {
        this.deleteReviewsORComments();
        this.showSlide = false;
    };
    ReviewsORComments.prototype.deleteReviewsORComments = function () {
        var context = this;
        context.projectService.deleteReviewsORComments(this.selectedId).subscribe(function (resultData) {
            debugger;
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "delete", '', context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
                context.itemsSource = retUpdatedSrc["itemSrc"];
                context.totalItems = retUpdatedSrc["itemCount"];
                if (context.totalItems > 0) {
                    context.enableMenu = [1];
                }
                else {
                    context.notificationService.ShowToaster("No Reviews or Comments exist", 2);
                    context.enableMenu = [1];
                }
                context.notificationService.ShowToaster("Selected Review or Comment deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                }
            }
        });
        return;
    };
    ReviewsORComments.prototype.cancelClick = function (event) {
        this.showSlide = false;
    };
    ReviewsORComments.prototype.submitSuccess = function (event) {
        debugger;
        var retUpdatedSrc;
        var context = this;
        context.splitviewInput.showSecondaryView = false;
        context.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "add", event, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
            context.totalItems = retUpdatedSrc["itemCount"];
            context.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else {
            retUpdatedSrc = this.generFun.updateDataSource(context.itemsSource, "edit", event, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
            context.refreshgrid = context.refreshgrid.concat([true]);
        }
    };
    ReviewsORComments = __decorate([
        core_1.Component({
            selector: 'reviews-or-comments-list',
            templateUrl: './app/Views/Projects/Projects Data/Reviews or Comments/reviewsorcomments.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                slide_component_1.SlideComponent, reviewsorcomments_addedit_component_1.ReviewsORCommentsAddEdit],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, projects_service_1.ProjectsService],
            inputs: ['projectName', 'projectId', 'prjStatus']
        }), 
        __metadata('design:paramtypes', [projects_service_1.ProjectsService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ReviewsORComments);
    return ReviewsORComments;
}());
exports.ReviewsORComments = ReviewsORComments;
//# sourceMappingURL=reviewsorcomments.component.js.map