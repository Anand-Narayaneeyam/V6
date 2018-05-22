import { Component, AfterViewInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { IField } from '../../../../Framework/Models/Interface/IField'
import { ISplitView } from '../../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../../Framework/Whatever/Grid/grid.component'
import { PagingComponent } from '../../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { SectionComponent } from '../../../../Framework/Whatever/Section/section.component';
import { IGrid } from '../../../../Framework/Models/Interface/Igrid'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { SlideComponent } from '../../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions } from '../../../../Models/Common/General';
import { ProjectsService } from '../../../../Models/Projects/projects.service';
import { ReviewsORCommentsAddEdit } from './reviewsorcomments-addedit.component';

@Component({
    selector: 'reviews-or-comments-list',
    templateUrl: './app/Views/Projects/Projects Data/Reviews or Comments/reviewsorcomments.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        SlideComponent, ReviewsORCommentsAddEdit],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, ProjectsService],
    inputs: ['projectName', 'projectId','prjStatus']
})


export class ReviewsORComments {


    fieldObject: IField[];
    fieldDetailsList: IField[];
    fieldDetailsAddEdit: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
    action: string;
    btnName: string;
    enableMenu = [1];
    menuData = [
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
    pageTitle: string;
    selectedId: number=0;
    showSlide: boolean = false;
    slideTitle: string;
    slideType: string;
    slideMessage: string;
    refreshgrid;
    projectId: number;
    isReview: boolean = false;
    projectName: string;
    prjStatus: string;
    projectNameDetails: string;
    constructor(private projectService: ProjectsService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }
    ngOnInit() {
        this.getReviewsORCommentsListDDL();
        this.getReviewsORCommentsFields(); 
        this.geReviewsORCommentsList();     
        this.projectNameDetails = "Project Name: " + "<b>" + this.projectName + "</b>"  
    }

    getReviewsORCommentsListDDL() {
        var contextObj = this;
        this.projectService.getReviewsORCommentsGridFields().subscribe(function (resultData) {
            debugger
            contextObj.fieldDetailsList = resultData.Data;
            contextObj.fieldDetailsList = contextObj.fieldDetailsList.filter(function (item) {
                return item.FieldId == 2991;
            });
        });
        return;
    }

    

    getReviewsORCommentsFields() {
        var contextObj = this;
        this.projectService.getReviewsORCommentsGridFields().subscribe(function (resultData) {
            debugger
            contextObj.fieldObject = resultData.Data;
            contextObj.fieldObject = contextObj.fieldObject.filter(function (item) {
                return item.FieldId != 2991;
            });
        });
        return;
    }

    geReviewsORCommentsList() {
        var contextObj = this;
        var reportFieldArray = [];
        reportFieldArray.push({
            ReportFieldId: 1034,
            Value: this.projectId.toString()
        });
        

        debugger
        contextObj.projectService.getReviewsORCommentsGridData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir,reportFieldArray).subscribe(function (resultData) {
            debugger
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            if (contextObj.totalItems > 0) {

                contextObj.enableMenu = [1, 2, 3];
            } else {
                contextObj.notificationService.ShowToaster("No Reviews or Comments exist", 2);
                contextObj.enableMenu = [1];
            }
        });

        return;

    }

    public onSubMenuChange(event: any) {
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
    }

    addClick() {
        this.splitviewInput.showSecondaryView = true;
        this.pageTitle = "New Review or Comment";
        this.btnName = "Upload";
        this.action = "add";
        this.getAddEditFields(this.action,0);
    }

    editClick() {
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
        this.getAddEditFields(this.action,this.selectedId);
        debugger
    }

    deleteClick() {

        debugger
        var context = this;
        if (context.inputItems.selectedIds[0] != undefined) {
            context.selectedId = context.inputItems.selectedIds[0];
            
                    context.showSlide = true;
                    context.slideTitle = "iDrawings V6";
                    context.slideType = "notification";
                    context.slideMessage = "Are you sure you want to delete the selected Review or Comment?";
                }                
           
        }
    

    downloadClick() {
        if (this.inputItems.selectedIds.length != 0) {
            var contextObj = this;
            var filename;

            filename = contextObj.inputItems.rowData["File Name"];

            debugger
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


                    } catch (ex) {
                        console.log(ex);
                    }
                }
            });
        }
    }


  

    getAddEditFields(action:string,rowId:number) {

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
                    return item.FieldId === 2957
                })
                projctname.FieldValue = context.projectName;
            });
        } else if (action == "edit") {
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
                    reviewCommnetType.FieldValue = "94"
                } else {
                    reviewCommnetType.FieldValue = "95"
                } 

                fileControl.IsEnabled = false;
                var projctname = context.fieldDetailsAddEdit.find(function (item) {
                    return item.FieldId === 2957
                })
                projctname.FieldValue = context.projectName;
            });
        }

    }
    
    public onSort(objGrid: any) {
        this.geReviewsORCommentsList();
    }

    closeSlide(event) {
        this.showSlide = false;
    }

    public onSplitViewClose(event) {
        this.splitviewInput.showSecondaryView = false;
    }

    yesOnClick(event: Event) {

        this.deleteReviewsORComments();
        this.showSlide = false;
    }
    deleteReviewsORComments() {
        var context = this;
        context.projectService.deleteReviewsORComments(this.selectedId).subscribe(function (resultData) {
            debugger
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "delete", '', context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
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
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;                    
                }
            }
        });
        return;
    }

    cancelClick(event: Event) {
        this.showSlide = false;
    }

    submitSuccess(event) {
        debugger
        let retUpdatedSrc;
        var context = this;
        context.splitviewInput.showSecondaryView = false;
        context.refreshgrid = [];

        if (this.action == "add") {
            retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "add", event, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
            context.totalItems = retUpdatedSrc["itemCount"];
            context.itemsSource = retUpdatedSrc["itemSrc"];
        } else {
            retUpdatedSrc = this.generFun.updateDataSource(context.itemsSource, "edit", event, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
            context.refreshgrid = context.refreshgrid.concat([true]);
        }

    }

}
