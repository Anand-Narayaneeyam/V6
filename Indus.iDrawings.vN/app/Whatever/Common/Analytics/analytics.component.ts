
import {Component, ChangeDetectorRef, EventEmitter, Output, Input, SimpleChange, ViewEncapsulation, KeyValueDiffers, ElementRef, OnInit} from '@angular/core';
import {IAnalytics} from '../../../models/common/analytics/ianalytics'
import {SlideComponent} from '../../../framework/whatever/slide/slide.component'
import {AnalyticsService} from '../../../models/common/analytics/analytics.service'
import { DropDownListComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {IField, ILookupValues} from  '../../../Framework/Models/Interface/IField'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';

@Component({

    selector: 'analytics',
    templateUrl: './app/Views/Common/Analytics/analytics.component.html',
    directives: [DropDownListComponent,SlideComponent],
    providers: [AnalyticsService, NotificationService]
})

export class Analytics implements OnInit {
    @Input() properties: IAnalytics;
    @Output() closeAnalytics = new EventEmitter();
    totalCount: number;
    position: string = "center";
    analyticDropdownField: IField = undefined;
    showSlide: boolean = false;
    slidewidth = 300;
    slidewidthResult = 310;
    showResult: boolean = false;
    firstSlideOkClick: boolean = false;
    columnName: string = "";
    aggregateValue: string = "";
    isAggregate: boolean = false;
    analyticName: string = "";
    tableResult: any;
    constructor(private analyticsservice: AnalyticsService, private notificationService: NotificationService) { }

    ngOnInit() {
        if (this.properties.menuId == 3 || this.properties.menuId == 4 || this.properties.menuId == 5)
            this.getDropdownFieldObject();
        if (this.properties.menuId == 1) {
            var contextObj = this;
            switch (this.properties.moduleId) {
                case 0:
                    if (contextObj.properties.pageTarget == 1) {
                        contextObj.analyticsservice.getUsersforAnalytics(contextObj.properties.menuId, "", contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                            var tableResult = JSON.parse(resultData);
                            contextObj.totalCount = tableResult[0]["Count"];
                            contextObj.showSlide = true;
                        });
                    }
                    break;
                case 1:
                    if (contextObj.properties.pageTarget == 1) {
                        contextObj.analyticsservice.getFloorDrawingDetailsforAnalytics(contextObj.properties.menuId, "", contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                            var tableResult = JSON.parse(resultData);
                            contextObj.totalCount = tableResult[0]["Count"];
                            contextObj.showSlide = true;
                        });
                    }
                    else if (contextObj.properties.pageTarget == 2) {
                        
                        contextObj.analyticsservice.getBuildingDrawingDetailsforAnalytics(contextObj.properties.menuId, "", contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                            var tableResult = JSON.parse(resultData);
                            contextObj.totalCount = tableResult[0]["Count"];
                            contextObj.showSlide = true;
                        });
                    }
                    break;
                case 3:
                    if (contextObj.properties.pageTarget == 1) {
                        contextObj.analyticsservice.getAllSpaceDetailsforAnalytics(contextObj.properties.selectedIds.toString(), contextObj.properties.moduleId, contextObj.properties.menuId, "", contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                            var tableResult = JSON.parse(resultData);
                            contextObj.totalCount = tableResult[0]["Count"];
                            contextObj.showSlide = true;
                        });
                    }
                    else if (contextObj.properties.pageTarget == 2) {
                        contextObj.analyticsservice.getSpaceQueryDetailsforAnalytics(contextObj.properties.menuId, "", contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId, 0, contextObj.properties.QueryCategryId, contextObj.properties.buildarray).subscribe(function (resultData) {                           
                            var tableResult = JSON.parse(resultData);
                            contextObj.totalCount = tableResult[0]["Count"];
                            contextObj.showSlide = true;
                        });
                    }
                    break;
                case 4:
                    if (contextObj.properties.pageTarget == 1) {
                        contextObj.analyticsservice.getAllDocumentDetailsforAnalytics(contextObj.properties.menuId, "", contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {                           
                            var tableResult = JSON.parse(resultData);
                            contextObj.totalCount = tableResult[0]["Count"];
                            contextObj.showSlide = true;
                        });
                    }
                    break;
                case 5:
                    if (contextObj.properties.pageTarget == 1) {
                        contextObj.analyticsservice.getAllEmployeeDetailsforAnalytics(0, contextObj.properties.selectedIds.toString(), contextObj.properties.moduleId, contextObj.properties.menuId, "", contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId,0).subscribe(function (resultData) {                            
                            var tableResult = JSON.parse(resultData);
                            contextObj.totalCount = tableResult[0]["Count"];
                            contextObj.showSlide = true;
                        });
                    }
                    else if (contextObj.properties.pageTarget == 2) {
                        contextObj.analyticsservice.getAllEmployeeDetailsforAnalytics(0, contextObj.properties.selectedIds.toString(), contextObj.properties.moduleId, contextObj.properties.menuId, "", contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId, 1).subscribe(function (resultData) {                           
                            var tableResult = JSON.parse(resultData);
                            contextObj.totalCount = tableResult[0]["Count"];
                            contextObj.showSlide = true;
                        });
                    }
                    else if (contextObj.properties.pageTarget == 3) {
                        contextObj.analyticsservice.getAllEmployeeDetailsforAnalytics(0, contextObj.properties.selectedIds.toString(), contextObj.properties.moduleId, contextObj.properties.menuId, "", contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId, 2).subscribe(function (resultData) {                           
                            var tableResult = JSON.parse(resultData);
                            contextObj.totalCount = tableResult[0]["Count"];
                            contextObj.showSlide = true;
                        });
                    }
                    break;
                case 6:
                case 7:
                case 8:
                case 17:
                case 18:
                case 24:
                case 25:
                case 26:
                case 27:                  
                    if (contextObj.properties.pageTarget == 1) {
                        contextObj.analyticsservice.getObjectDetailsforAnalytics(contextObj.properties.menuId, "", contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId, contextObj.properties.objectCategoryId, contextObj.properties.dataOption, contextObj.properties.attributeOption, contextObj.properties.objectClassIds, contextObj.properties.selectedIds, contextObj.properties.searchCondition, contextObj.properties.isOrphan, contextObj.properties.objectId, contextObj.properties.isDataBasedOnUserAccess, contextObj.properties.objectComponentType).subscribe(function (resultData) {                           
                            var tableResult = JSON.parse(resultData);
                            contextObj.totalCount = tableResult[0]["Count"];
                            contextObj.showSlide = true;
                        });
                    }
                    break;
                case 30:
                    if (contextObj.properties.pageTarget == 1) {
                        contextObj.analyticsservice.getRealPropertyDetailsforAnalytics(contextObj.properties.menuId, "", contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                            var tableResult = JSON.parse(resultData);
                            contextObj.totalCount = tableResult[0]["Count"];
                            contextObj.showSlide = true;
                        });
                    }
                    break;
                default:
                    break;
            }
        } else {
            this.showSlide = true;
        }
    }   
    okClick() {
        this.properties.menuId = 0;
        this.closeAnalytics.emit({});
    }
    closeSlideDialog(event: any) {
        this.showSlide = false;
        this.properties.menuId = 0;
        if (this.firstSlideOkClick == false) {
            this.closeAnalytics.emit({});
        }
    }   
    closeSlideResultDialog() {
        if (this.showResult)
            this.closeAnalytics.emit({});
        this.showResult = false;
    }
    getDropdownFieldObject() {
        var lookUpArray: ILookupValues[] = [];
        for (var item of this.properties.fieldObject) {
            if (item.IsVisible) {
                if (this.properties.menuId == 5) {
                    if (item.IsMultiValued == false &&( item.GenericDataTypeId == 4 || item.GenericDataTypeId == 5 ))
                        lookUpArray.push({ Id: item.FieldId, Value: item.FieldLabel });
                } else {
                    lookUpArray.push({ Id: item.FieldId, Value: item.FieldLabel });
                }
            }
        }
        this.analyticDropdownField =
            {
                FormFieldId: null, FieldId: 100,
                ReportFieldId: 1, FieldLabel: null,
                DataEntryControlId: 7,
                GenericDataTypeId: 6,
                Whitelist: { Id: 3, FormatString: null, RegularExpression: "^ [a - zA - Z0 - 9!@#$ %&()/+=\s\:.,?_ -]+$" },
                FieldValue: null, MultiFieldValues: null, IsValidated: true, IsMultivalued: true, LookupDetails: { LookupValues: lookUpArray, PopupComponent: null },
                IsMandatory: false, IsVisible: true, IsEnabled: true, ReadOnlyMode: false, NotificationType: null, Precision: null,
                Scale: null, Height: null, IsSigned: false, RangeFrom: null, RangeTo: null, HelpText: null,
                IsGrouped: false, HasChild: null, ParentId: null, IsSubField: null, isContentHtml: null, Width: "275"

            };
    }
    okClickDrop() {
        var contextObj = this;
        this.firstSlideOkClick = true;
        if (contextObj.analyticDropdownField.FieldValue == "-1") {
            contextObj.notificationService.ShowToaster("Select a Column Name", 2);
        } else {
            this.columnName = this.analyticDropdownField.LookupDetails.LookupValues.find(function (el) { return el.Id.toString() == contextObj.analyticDropdownField.FieldValue }).Value;
            switch (this.properties.menuId) {   //menu id of context menu
                case 3:
                    contextObj.analyticName = "Unique";
                    contextObj.isAggregate = false;
                    switch (contextObj.properties.moduleId) {
                        case 0:
                            if (contextObj.properties.pageTarget == 1) {
                                contextObj.analyticsservice.getUsersforAnalytics(contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            break;
                        case 1:
                            if (contextObj.properties.pageTarget == 1) {

                                contextObj.analyticsservice.getFloorDrawingDetailsforAnalytics(contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            else if (contextObj.properties.pageTarget == 2) {

                                contextObj.analyticsservice.getBuildingDrawingDetailsforAnalytics(contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            break;
                        case 3:
                            if (contextObj.properties.pageTarget == 1) {
                                contextObj.analyticsservice.getAllSpaceDetailsforAnalytics(contextObj.properties.selectedIds.toString(), contextObj.properties.moduleId, contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            if (contextObj.properties.pageTarget == 2) {
                                contextObj.analyticsservice.getSpaceQueryDetailsforAnalytics(contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId, 0, contextObj.properties.QueryCategryId, contextObj.properties.buildarray).subscribe(function (resultData) {                                   
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            break;
                        case 4:
                            if (contextObj.properties.pageTarget == 1) {
                                contextObj.analyticsservice.getAllDocumentDetailsforAnalytics(contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            break;
                        case 5:
                            if (contextObj.properties.pageTarget == 1) {
                                contextObj.analyticsservice.getAllEmployeeDetailsforAnalytics(0, contextObj.properties.selectedIds.toString(), contextObj.properties.moduleId, contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId, 0).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            else if (contextObj.properties.pageTarget == 2) {
                                contextObj.analyticsservice.getAllEmployeeDetailsforAnalytics(0, contextObj.properties.selectedIds.toString(), contextObj.properties.moduleId, contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId, 1).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            else if (contextObj.properties.pageTarget == 3) {
                                contextObj.analyticsservice.getAllEmployeeDetailsforAnalytics(0, contextObj.properties.selectedIds.toString(), contextObj.properties.moduleId, contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId, 2).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            break;
                        case 6:
                        case 7:
                        case 8:
                        case 17:
                        case 18:
                        case 24:
                        case 25:
                        case 26:
                        case 27:
                            if (contextObj.properties.pageTarget == 1) {
                                contextObj.analyticsservice.getObjectDetailsforAnalytics(contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId, contextObj.properties.objectCategoryId, contextObj.properties.dataOption, contextObj.properties.attributeOption, contextObj.properties.objectClassIds, contextObj.properties.selectedIds, contextObj.properties.searchCondition, contextObj.properties.isOrphan, contextObj.properties.objectId, contextObj.properties.isDataBasedOnUserAccess, contextObj.properties.objectComponentType).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            break;
                        case 30:
                            if (contextObj.properties.pageTarget == 1) {
                                contextObj.analyticsservice.getRealPropertyDetailsforAnalytics(contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case 4:
                    contextObj.analyticName = "Duplicate";
                    contextObj.isAggregate = false;
                    switch (contextObj.properties.moduleId) {
                        case 0:
                            if (contextObj.properties.pageTarget == 1) {
                                contextObj.analyticsservice.getUsersforAnalytics(contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            break;
                        case 1:
                            if (contextObj.properties.pageTarget == 1) {
                                contextObj.analyticsservice.getFloorDrawingDetailsforAnalytics(contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            else if (contextObj.properties.pageTarget == 2) {
                                contextObj.analyticsservice.getBuildingDrawingDetailsforAnalytics(contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            break;
                        case 3:
                            if (contextObj.properties.pageTarget == 1) {
                                contextObj.analyticsservice.getAllSpaceDetailsforAnalytics(contextObj.properties.selectedIds.toString(), contextObj.properties.moduleId, contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                           if (contextObj.properties.pageTarget == 2) {
                               contextObj.analyticsservice.getSpaceQueryDetailsforAnalytics(contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId, 0, contextObj.properties.QueryCategryId, contextObj.properties.buildarray).subscribe(function (resultData) {                              
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            break;
                        case 4:
                            if (contextObj.properties.pageTarget == 1) {
                                contextObj.analyticsservice.getAllDocumentDetailsforAnalytics(contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            break;
                        case 5:
                            if (contextObj.properties.pageTarget == 1) {
                                contextObj.analyticsservice.getAllEmployeeDetailsforAnalytics(0, contextObj.properties.selectedIds.toString(), contextObj.properties.moduleId, contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId, 0).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            else if (contextObj.properties.pageTarget == 2) {
                                contextObj.analyticsservice.getAllEmployeeDetailsforAnalytics(0, contextObj.properties.selectedIds.toString(), contextObj.properties.moduleId, contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId, 1).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            else if (contextObj.properties.pageTarget == 3) {
                                contextObj.analyticsservice.getAllEmployeeDetailsforAnalytics(0, contextObj.properties.selectedIds.toString(), contextObj.properties.moduleId, contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId, 2).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            break;
                        case 6:
                        case 7:
                        case 8:
                        case 17:
                        case 18:
                        case 24:
                        case 25:
                        case 26:
                        case 27:
                            if (contextObj.properties.pageTarget == 1) {
                                contextObj.analyticsservice.getObjectDetailsforAnalytics(contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId, contextObj.properties.objectCategoryId, contextObj.properties.dataOption, contextObj.properties.attributeOption, contextObj.properties.objectClassIds, contextObj.properties.selectedIds, contextObj.properties.searchCondition, contextObj.properties.isOrphan, contextObj.properties.objectId, contextObj.properties.isDataBasedOnUserAccess, contextObj.properties.objectComponentType).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            break;
                        case 30:
                            if (contextObj.properties.pageTarget == 1) {
                                contextObj.analyticsservice.getRealPropertyDetailsforAnalytics(contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case 5:
                    contextObj.isAggregate = true;
                    switch (contextObj.properties.moduleId) {
                        case 0:
                            if (contextObj.properties.pageTarget == 1) {
                                contextObj.analyticsservice.getUsersforAnalytics(contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.aggregateValue = contextObj.tableResult[0]["Sum"];
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            break;
                        case 1:
                            if (contextObj.properties.pageTarget == 1) {
                                contextObj.analyticsservice.getFloorDrawingDetailsforAnalytics(contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.aggregateValue = contextObj.tableResult[0]["Sum"];
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            else if (contextObj.properties.pageTarget == 2) {
                                contextObj.analyticsservice.getBuildingDrawingDetailsforAnalytics(contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.aggregateValue = contextObj.tableResult[0]["Sum"];
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            break;
                        case 3:
                            if (contextObj.properties.pageTarget == 1) {
                                contextObj.analyticsservice.getAllSpaceDetailsforAnalytics(contextObj.properties.selectedIds.toString(), contextObj.properties.moduleId, contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.aggregateValue = contextObj.tableResult[0]["Sum"];
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            if (contextObj.properties.pageTarget == 2) {
                                contextObj.analyticsservice.getSpaceQueryDetailsforAnalytics(contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId, 0, contextObj.properties.QueryCategryId, contextObj.properties.buildarray).subscribe(function (resultData) {                                
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.aggregateValue = contextObj.tableResult[0]["Sum"];
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            break;
                        case 4:
                            if (contextObj.properties.pageTarget == 1) {
                                contextObj.analyticsservice.getAllDocumentDetailsforAnalytics(contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.aggregateValue = contextObj.tableResult[0]["Sum"];
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            break;
                        case 5:
                            if (contextObj.properties.pageTarget == 1) {
                                contextObj.analyticsservice.getAllEmployeeDetailsforAnalytics(0, contextObj.properties.selectedIds.toString(), contextObj.properties.moduleId, contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId, 0).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.aggregateValue = contextObj.tableResult[0]["Sum"];
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            if (contextObj.properties.pageTarget == 2) {
                                contextObj.analyticsservice.getAllEmployeeDetailsforAnalytics(0, contextObj.properties.selectedIds.toString(), contextObj.properties.moduleId, contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId, 1).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.aggregateValue = contextObj.tableResult[0]["Sum"];
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            if (contextObj.properties.pageTarget == 3) {
                                contextObj.analyticsservice.getAllEmployeeDetailsforAnalytics(0, contextObj.properties.selectedIds.toString(), contextObj.properties.moduleId, contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId, 2).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.aggregateValue = contextObj.tableResult[0]["Sum"];
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            break;
                        case 6:
                        case 7:
                        case 8:
                        case 17:
                        case 18:
                        case 24:
                        case 25:
                        case 26:
                        case 27:
                            if (contextObj.properties.pageTarget == 1) {
                                contextObj.analyticsservice.getObjectDetailsforAnalytics(contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId, contextObj.properties.objectCategoryId, contextObj.properties.dataOption, contextObj.properties.attributeOption, contextObj.properties.objectClassIds, contextObj.properties.selectedIds, contextObj.properties.searchCondition, contextObj.properties.isOrphan, contextObj.properties.objectId, contextObj.properties.isDataBasedOnUserAccess, contextObj.properties.objectComponentType).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.aggregateValue = contextObj.tableResult[0]["Sum"];
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            break;
                        case 30:
                            if (contextObj.properties.pageTarget == 1) {
                                contextObj.analyticsservice.getRealPropertyDetailsforAnalytics(contextObj.properties.menuId, contextObj.columnName, contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId).subscribe(function (resultData) {
                                    contextObj.tableResult = JSON.parse(resultData);
                                    contextObj.aggregateValue = contextObj.tableResult[0]["Sum"];
                                    contextObj.clearAnalyticObjects();
                                });
                            }
                            break;
                        default:
                            break;
                    }
                    break;
            }
        }
    }

    clearAnalyticObjects() {
        this.properties.menuId = 0;
        this.showResult = true;
    }
}
