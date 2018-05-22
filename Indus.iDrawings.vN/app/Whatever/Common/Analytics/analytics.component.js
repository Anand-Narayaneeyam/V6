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
var slide_component_1 = require('../../../framework/whatever/slide/slide.component');
var analytics_service_1 = require('../../../models/common/analytics/analytics.service');
var dropdownlistcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var Analytics = (function () {
    function Analytics(analyticsservice, notificationService) {
        this.analyticsservice = analyticsservice;
        this.notificationService = notificationService;
        this.closeAnalytics = new core_1.EventEmitter();
        this.position = "center";
        this.analyticDropdownField = undefined;
        this.showSlide = false;
        this.slidewidth = 300;
        this.slidewidthResult = 310;
        this.showResult = false;
        this.firstSlideOkClick = false;
        this.columnName = "";
        this.aggregateValue = "";
        this.isAggregate = false;
        this.analyticName = "";
    }
    Analytics.prototype.ngOnInit = function () {
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
                        contextObj.analyticsservice.getAllEmployeeDetailsforAnalytics(0, contextObj.properties.selectedIds.toString(), contextObj.properties.moduleId, contextObj.properties.menuId, "", contextObj.properties.KeywordFilterValue, contextObj.properties.AdvanceFilterValue, contextObj.properties.IsKeywordSearch, contextObj.properties.IsAdvanceSearch, contextObj.properties.FormId, contextObj.properties.ParentFormId, 0).subscribe(function (resultData) {
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
        }
        else {
            this.showSlide = true;
        }
    };
    Analytics.prototype.okClick = function () {
        this.properties.menuId = 0;
        this.closeAnalytics.emit({});
    };
    Analytics.prototype.closeSlideDialog = function (event) {
        this.showSlide = false;
        this.properties.menuId = 0;
        if (this.firstSlideOkClick == false) {
            this.closeAnalytics.emit({});
        }
    };
    Analytics.prototype.closeSlideResultDialog = function () {
        if (this.showResult)
            this.closeAnalytics.emit({});
        this.showResult = false;
    };
    Analytics.prototype.getDropdownFieldObject = function () {
        var lookUpArray = [];
        for (var _i = 0, _a = this.properties.fieldObject; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.IsVisible) {
                if (this.properties.menuId == 5) {
                    if (item.IsMultiValued == false && (item.GenericDataTypeId == 4 || item.GenericDataTypeId == 5))
                        lookUpArray.push({ Id: item.FieldId, Value: item.FieldLabel });
                }
                else {
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
    };
    Analytics.prototype.okClickDrop = function () {
        var contextObj = this;
        this.firstSlideOkClick = true;
        if (contextObj.analyticDropdownField.FieldValue == "-1") {
            contextObj.notificationService.ShowToaster("Select a Column Name", 2);
        }
        else {
            this.columnName = this.analyticDropdownField.LookupDetails.LookupValues.find(function (el) { return el.Id.toString() == contextObj.analyticDropdownField.FieldValue; }).Value;
            switch (this.properties.menuId) {
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
    };
    Analytics.prototype.clearAnalyticObjects = function () {
        this.properties.menuId = 0;
        this.showResult = true;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Analytics.prototype, "properties", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Analytics.prototype, "closeAnalytics", void 0);
    Analytics = __decorate([
        core_1.Component({
            selector: 'analytics',
            templateUrl: './app/Views/Common/Analytics/analytics.component.html',
            directives: [dropdownlistcomponent_component_1.DropDownListComponent, slide_component_1.SlideComponent],
            providers: [analytics_service_1.AnalyticsService, notify_service_1.NotificationService]
        }), 
        __metadata('design:paramtypes', [analytics_service_1.AnalyticsService, notify_service_1.NotificationService])
    ], Analytics);
    return Analytics;
}());
exports.Analytics = Analytics;
//# sourceMappingURL=analytics.component.js.map