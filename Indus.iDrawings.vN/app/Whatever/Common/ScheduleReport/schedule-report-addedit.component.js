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
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var common_service_1 = require('../../../Models/Common/common.service');
var popupadd_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/popupadd.component');
var emailrecipients_schedulereport_component_1 = require('../../Common/ScheduleReport/emailrecipients-schedulereport.component');
var email_service_1 = require('./email.service');
var ScheduleReportAddEdit = (function () {
    function ScheduleReportAddEdit(commonService, AdministrationService, _notificationService, generFun, _emailRecService) {
        this.commonService = commonService;
        this.AdministrationService = AdministrationService;
        this._notificationService = _notificationService;
        this.generFun = generFun;
        this._emailRecService = _emailRecService;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        // @Output() isInserted = new EventEmitter();
        this.updateSuccess = new core_1.EventEmitter();
        this.insertSuccess = new core_1.EventEmitter();
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.reportFileName = "";
        this.isMonthlyRecurrenceSelected = false;
        this.isYearlyRecurrenceSelected = false;
        this.ddlDisableShowSelect = [2645, 2667, 2671, 2675, 2682, 2687, 2696, 2649, 2652, 2651, 2655, 2656, 2690];
        this.ddlOnChangeMonthly = [2649, 2652, 2651, 2655, 2656];
        this.ddlOnChangeYearly = [2667, 2671, 2682, 2687, 2690];
        this.ddlOnChangeMonthlyDay = [2649, 2652];
        this.ddlOnChangeMonthlyThe = [2651, 2655, 2656];
        this.ddlOnChangeYearlyOn = [2667, 2671];
        this.ddlOnChangeYearlyThe = [2682, 2687, 2690];
        this.ddlOnChangeDaily = [2645];
        this.ddlOnChangeWeekly = [2645];
        this.ddlOnChangeRecFrequency = [2715];
        this.showHideArrayPre = [2645, 2647, 2648, 2649, 2651, 2652, 2655, 2656, 2666, 2667, 2671, 2682, 2687, 2690];
        this.showHideArray1Pre = [2645]; //show daily 
        this.showHideArray2Pre = [2645, 2647]; //show weekly days  
        this.showHideArray3Pre = [2648, 2649, 2651, 2652, 2655, 2656]; //show monthly fields
        this.showHideArray4Pre = [2666, 2667, 2671, 2682, 2687, 2690]; // show yearly fields
        this.showHideArrayRecRangeDDL = [2715];
        this.showHideArrayRecRangeDatePicker = [2724];
        this.HideArray3Pre = [2649, 2652, 2651, 2655, 2656];
        this.showHideArray3of1Pre = [2649, 2652];
        this.showHideArray3of2Pre = [2651, 2655, 2656];
        this.HideArray4Pre = [2667, 2671, 2682, 2687, 2690];
        this.showHideArray4of1Pre = [2667, 2671];
        this.showHideArray4of2Pre = [2682, 2687, 2690];
        this.showEmailRecComp = false;
        this.pageTitle = "";
        this.clearEmailRec = false;
        this.reportId = 0;
        this.isEditOption = 1;
        this.emailRecCategory = [2, 4, 5, 6, 7];
        this.emailCount = 0;
        this.clearEmailUserIds = false;
        this.emailRecCount = 0;
        this.emailRecEditCount = 0;
    }
    ScheduleReportAddEdit.prototype.ngOnInit = function () {
        this.emailRecCount = 0;
        this.emailRecEditCount = 0;
        this.clearEmailRecUserIds();
        debugger;
        this.loadFields(this.isEdit);
        if (this.isEdit && this.fieldDetailsEdit) {
            this.getEmailIds(this.fieldDetailsEdit.Id);
            this.emailRecEditCount = this.getEmailReciepientEditCount();
        }
    };
    ScheduleReportAddEdit.prototype.ngDoCheck = function () {
        var formatRecurStart = document.getElementsByClassName("MainContainer_2691")[0];
        if (formatRecurStart != undefined) {
            formatRecurStart.getElementsByTagName("label")[0].innerHTML = "Range of Recurrence</br> Start";
        }
    };
    ScheduleReportAddEdit.prototype.onSplitViewClose = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    ScheduleReportAddEdit.prototype.getEmailIds = function (rId) {
        var contextObj = this;
        contextObj.commonService.loadEmailRecipientsList(contextObj.emailRecCategory[0], rId).subscribe(function (result) {
            contextObj.emailItemsSource = JSON.parse(result["FieldBinderData"]);
            for (var j = 0; j < contextObj.emailItemsSource.length; j++) {
                if (contextObj.emailItemsSource[j]['Select All'] == 1) {
                    contextObj.emailCount++;
                    if (!EmailReciepientEdit[0].UserIds.includes(contextObj.emailItemsSource[j]['Id'])) {
                        EmailReciepientEdit[0].UserIds.push(contextObj.emailItemsSource[j]['Id']);
                    }
                    contextObj.emailItemsSource = [];
                }
            }
        });
        contextObj.commonService.loadEmailRecipientsList(contextObj.emailRecCategory[1], rId).subscribe(function (result) {
            contextObj.emailItemsSource = JSON.parse(result["FieldBinderData"]);
            for (var j = 0; j < contextObj.emailItemsSource.length; j++) {
                if (contextObj.emailItemsSource[j]['Select All'] == 1) {
                    contextObj.emailCount++;
                    if (!EmailReciepientEdit[1].UserIds.includes(contextObj.emailItemsSource[j]['Id'])) {
                        EmailReciepientEdit[1].UserIds.push(contextObj.emailItemsSource[j]['Id']);
                    }
                }
            }
            contextObj.emailItemsSource = [];
        });
        contextObj.commonService.loadEmailRecipientsList(contextObj.emailRecCategory[2], rId).subscribe(function (result) {
            contextObj.emailItemsSource = JSON.parse(result["FieldBinderData"]);
            for (var j = 0; j < contextObj.emailItemsSource.length; j++) {
                if (contextObj.emailItemsSource[j]['Select All'] == 1) {
                    contextObj.emailCount++;
                    if (!EmailReciepientEdit[2].UserIds.includes(contextObj.emailItemsSource[j]['Id'])) {
                        EmailReciepientEdit[2].UserIds.push(contextObj.emailItemsSource[j]['Id']);
                    }
                }
            }
            contextObj.emailItemsSource = [];
        });
        contextObj.commonService.loadEmailRecipientsList(contextObj.emailRecCategory[3], rId).subscribe(function (result) {
            contextObj.emailItemsSource = JSON.parse(result["FieldBinderData"]);
            for (var j = 0; j < contextObj.emailItemsSource.length; j++) {
                if (contextObj.emailItemsSource[j]['Select All'] == 1) {
                    contextObj.emailCount++;
                    if (!EmailReciepientEdit[3].UserIds.includes(contextObj.emailItemsSource[j]['Id'])) {
                        EmailReciepientEdit[3].UserIds.push(contextObj.emailItemsSource[j]['Id']);
                    }
                }
            }
            contextObj.emailItemsSource = [];
        });
        contextObj.commonService.loadEmailRecipientsList(contextObj.emailRecCategory[4], rId).subscribe(function (result) {
            contextObj.emailItemsSource = JSON.parse(result["FieldBinderData"]);
            for (var j = 0; j < contextObj.emailItemsSource.length; j++) {
                if (contextObj.emailItemsSource[j]['Select All'] == 1) {
                    contextObj.emailCount++;
                    if (!EmailReciepientEdit[4].UserIds.includes(contextObj.emailItemsSource[j]['Id'])) {
                        EmailReciepientEdit[4].UserIds.push(contextObj.emailItemsSource[j]['Id']);
                    }
                }
            }
            contextObj.emailItemsSource = [];
        });
        contextObj.EmailReciepientArray = EmailReciepientEdit;
        return;
    };
    ScheduleReportAddEdit.prototype.loadFields = function (isEdit) {
        var contextObj = this;
        if (contextObj.isEdit == true) {
            contextObj.btnName = "Save Changes";
            contextObj.isEditOption = 2;
            if (contextObj.alterName && contextObj.alterName.length > 0) {
                contextObj.reportFileName = contextObj.alterName;
            }
            else {
                contextObj.reportFileName = contextObj.fieldDetailsEdit.Name;
            }
            contextObj.reportId = contextObj.fieldDetailsEdit.Id;
        }
        else {
            contextObj.btnName = "Save";
            contextObj.isEditOption = 1;
            if (contextObj.alterName && contextObj.alterName.length > 0) {
                contextObj.reportFileName = contextObj.alterName;
            }
            else {
                contextObj.reportFileName = contextObj.reportData.ExportFileName;
            }
            contextObj.reportId = 0;
        }
        contextObj.commonService.loadScheduleReportAddEditFields(contextObj.isEditOption, contextObj.reportId).subscribe(function (result) {
            result["Data"].find(function (item) { if (item.FieldId == 2691) {
                return item.FieldLabel = "Range of Recurrence Start";
            } });
            result["Data"].find(function (item) { if (item.FieldId == 2647) {
                return item.FieldLabel = "";
            } });
            result["Data"].find(function (item) { if (item.FieldId == 2652) {
                return item.FieldLabel = "of every month(s)";
            } });
            result["Data"].find(function (item) { if (item.FieldId == 2649) {
                return item.FieldLabel = "";
            } });
            result["Data"].find(function (item) { if (item.FieldId == 2649) {
                return item.FieldLabel = "";
            } });
            result["Data"].find(function (item) { if (item.FieldId == 2651) {
                return item.FieldLabel = "";
            } });
            result["Data"].find(function (item) { if (item.FieldId == 2655) {
                return item.FieldLabel = "";
            } });
            result["Data"].find(function (item) { if (item.FieldId == 2656) {
                return item.FieldLabel = "of every month(s)";
            } });
            result["Data"].find(function (item) { if (item.FieldId == 2666) {
                return item.FieldLabel = "";
            } });
            result["Data"].find(function (item) { if (item.FieldId == 2667) {
                return item.FieldLabel = "";
            } });
            result["Data"].find(function (item) { if (item.FieldId == 2671) {
                return item.FieldLabel = "";
            } });
            result["Data"].find(function (item) { if (item.FieldId == 2682) {
                return item.FieldLabel = "";
            } });
            result["Data"].find(function (item) { if (item.FieldId == 2687) {
                return item.FieldLabel = "";
            } });
            result["Data"].find(function (item) { if (item.FieldId == 2687) {
                return item.FieldLabel = "";
            } });
            result["Data"].find(function (item) { if (item.FieldId == 2710) {
                return item.FieldLabel = "";
            } });
            result["Data"].find(function (item) { if (item.FieldId == 2690) {
                return item.FieldLabel = "of";
            } });
            result["Data"].find(function (item) { if (item.FieldId == 2715) {
                return item.FieldLabel = "";
            } });
            result["Data"].find(function (item) { if (item.FieldId == 2724) {
                return item.FieldLabel = "";
            } });
            result["Data"].find(function (item) { if (item.FieldId == 2648) {
                return item.FieldLabel = "";
            } });
            result["Data"].find(function (item) { if (item.FieldId == 2640) {
                return item.FieldValue = contextObj.reportFileName;
            } });
            result["Data"].find(function (el) {
                if (el.FieldId == 2642) {
                    this.strPopupText = "Set Email Recipients";
                    el.LookupDetails.PopupComponent = { Name: this.strPopupText, showImage: false };
                    return true;
                }
            });
            var msgTemplateDdl = result["Data"].find(function (el) { return el.FieldId === 2642; });
            if (msgTemplateDdl.LookupDetails.LookupValues.length == 1) {
                msgTemplateDdl.FieldValue = msgTemplateDdl.LookupDetails.LookupValues[0].Id.toString();
            }
            contextObj.fieldDetails = (result["Data"]); //Result Data Assigned to Field
            var fileFormat = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2643;
            });
            if (contextObj.fieldDetailsEdit) {
                if (contextObj.fieldDetailsEdit.PermittedFileId == 6)
                    fileFormat.FieldValue = "81";
                else if (contextObj.fieldDetailsEdit.PermittedFileId == 1)
                    fileFormat.FieldValue = "80";
            }
            else {
                fileFormat.FieldValue = "81";
            }
            var msgTemplate = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2642;
            });
            var dailyFrequency = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2645;
            });
            var weeklyFrequency = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2645;
            });
            var weeklyWeekDays = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2647;
            });
            var monthlySubRadio = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2648;
            });
            var yearlySubRadio = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2666;
            });
            var monthlyDaySubFields1 = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2649;
            });
            var monthlyDaySubFields2 = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2652;
            });
            var monthlyTheSubFields1 = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2651;
            });
            var monthlyTheSubFields2 = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2655;
            });
            var monthlyTheSubFields3 = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2656;
            });
            var yearlyOnSubFields1 = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2667;
            });
            var yearlyOnSubFields2 = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2671;
            });
            var yearlyTheSubFields1 = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2682;
            });
            var yearlyTheSubFields2 = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2687;
            });
            var yearlyTheSubFields3 = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2690;
            });
            var recPattern = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2644;
            });
            var datePickerRecRange = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2724;
            });
            var ddlFrequencyRecRange = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2715;
            });
            var rdRecRange = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2710;
            });
            if (contextObj.fieldDetailsEdit) {
                for (var i = 0; i < msgTemplate.LookupDetails.LookupValues.length; i++) {
                    if (msgTemplate.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.MessageTemplateId) {
                        msgTemplate.FieldValue = msgTemplate.LookupDetails.LookupValues[i].Id.toString();
                    }
                }
            }
            if (contextObj.fieldDetailsEdit) {
                if (contextObj.fieldDetailsEdit.RecurrenceRangeId == 3) {
                    contextObj.enableRecFrequency();
                    rdRecRange.FieldValue = "11";
                    datePickerRecRange.IsEnabled = false;
                    datePickerRecRange.IsVisible = true;
                    ddlFrequencyRecRange.IsEnabled = true;
                    ddlFrequencyRecRange.IsVisible = true;
                    for (var i = 0; i < ddlFrequencyRecRange.LookupDetails.LookupValues.length; i++) {
                        if (ddlFrequencyRecRange.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.RangeRecurrenceNo) {
                            ddlFrequencyRecRange.FieldValue = ddlFrequencyRecRange.LookupDetails.LookupValues[i].Id.toString();
                        }
                    }
                }
                else if (contextObj.fieldDetailsEdit.RecurrenceRangeId == 4) {
                    rdRecRange.FieldValue = "12";
                    ddlFrequencyRecRange.IsEnabled = false;
                    ddlFrequencyRecRange.IsVisible = true;
                    datePickerRecRange.IsEnabled = true;
                    datePickerRecRange.IsVisible = true;
                    datePickerRecRange.FieldValue = contextObj.fieldDetailsEdit['End Date'];
                }
            }
            else {
                rdRecRange.FieldValue = "11";
                contextObj.refreshRecRangeDatePicker();
                contextObj.enableRecFields();
                contextObj.enableRecFrequency();
            }
            if (contextObj.fieldDetailsEdit) {
                if (contextObj.fieldDetailsEdit.RecurrencePatternId == 1) {
                    contextObj.refreshBeforeRender();
                    contextObj.reRenderCriteria("1");
                    contextObj.clearDDlShowSelect();
                    contextObj.enableDaily();
                    recPattern.FieldValue = "1";
                    if (contextObj.fieldDetailsEdit.IsWeekDaySpecific == false) {
                        for (var i = 0; i < dailyFrequency.LookupDetails.LookupValues.length; i++) {
                            if (dailyFrequency.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.Frequency) {
                                dailyFrequency.FieldValue = dailyFrequency.LookupDetails.LookupValues[i].Id.toString();
                            }
                        }
                    }
                }
                else if (contextObj.fieldDetailsEdit.RecurrencePatternId == 2) {
                    contextObj.refreshBeforeRender();
                    contextObj.reRenderCriteria("2");
                    contextObj.clearDDlShowSelect();
                    contextObj.enableWeekly();
                    recPattern.FieldValue = "2";
                    if (contextObj.fieldDetailsEdit.IsWeekDaySpecific == true) {
                        for (var i = 0; i < weeklyFrequency.LookupDetails.LookupValues.length; i++) {
                            if (weeklyFrequency.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.Frequency) {
                                weeklyFrequency.FieldValue = weeklyFrequency.LookupDetails.LookupValues[i].Id.toString();
                            }
                        }
                        var weeklyWeekDaysCast = weeklyWeekDays;
                        weeklyWeekDaysCast.MultiFieldValues = [];
                        for (var i = 0; i < weeklyWeekDaysCast.LookupDetails.LookupValues.length; i++) {
                            if (weeklyWeekDaysCast.LookupDetails.LookupValues[i].IsChecked == 1) {
                                weeklyWeekDaysCast.MultiFieldValues.push(weeklyWeekDaysCast.LookupDetails.LookupValues[i].Id.toString());
                            }
                        }
                    }
                }
                else if (contextObj.fieldDetailsEdit.RecurrencePatternId == 3) {
                    contextObj.refreshBeforeRender();
                    contextObj.reRenderCriteria("3");
                    contextObj.clearDDlShowSelect();
                    recPattern.FieldValue = "3";
                    if (contextObj.fieldDetailsEdit.IsWeekDaySpecific == false) {
                        contextObj.refreshMontlyDayThe();
                        contextObj.showMonthlyDay();
                        contextObj.enableMonthlyDay();
                        monthlySubRadio.FieldValue = "82";
                        for (var i = 0; i < monthlyDaySubFields1.LookupDetails.LookupValues.length; i++) {
                            if (monthlyDaySubFields1.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.DayNo) {
                                monthlyDaySubFields1.FieldValue = monthlyDaySubFields1.LookupDetails.LookupValues[i].Id.toString();
                            }
                        }
                        for (var i = 0; i < monthlyDaySubFields2.LookupDetails.LookupValues.length; i++) {
                            if (monthlyDaySubFields2.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.Frequency) {
                                monthlyDaySubFields2.FieldValue = monthlyDaySubFields2.LookupDetails.LookupValues[i].Id.toString();
                            }
                        }
                    }
                    else if (contextObj.fieldDetailsEdit.IsWeekDaySpecific == true) {
                        contextObj.refreshMontlyDayThe();
                        contextObj.showMonthlyThe();
                        contextObj.enableMonthlyThe();
                        contextObj.clearDDlShowSelect();
                        monthlySubRadio.FieldValue = "83";
                        contextObj.enableMonthlyThe();
                        for (var i = 0; i < monthlyTheSubFields1.LookupDetails.LookupValues.length; i++) {
                            if (monthlyTheSubFields1.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.WeekDayRecurrenceTypeId) {
                                monthlyTheSubFields1.FieldValue = monthlyTheSubFields1.LookupDetails.LookupValues[i].Id.toString();
                            }
                        }
                        for (var i = 0; i < monthlyTheSubFields2.LookupDetails.LookupValues.length; i++) {
                            if (monthlyTheSubFields2.LookupDetails.LookupValues[i].Id == (Math.log(contextObj.fieldDetailsEdit.WeekDays) / Math.log(2))) {
                                monthlyTheSubFields2.FieldValue = monthlyTheSubFields2.LookupDetails.LookupValues[i].Id.toString();
                            }
                        }
                        for (var i = 0; i < monthlyTheSubFields3.LookupDetails.LookupValues.length; i++) {
                            if (monthlyTheSubFields3.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.Frequency) {
                                monthlyTheSubFields3.FieldValue = monthlyTheSubFields3.LookupDetails.LookupValues[i].Id.toString();
                            }
                        }
                    }
                }
                else if (contextObj.fieldDetailsEdit.RecurrencePatternId == 4) {
                    contextObj.refreshBeforeRender();
                    contextObj.reRenderCriteria("4");
                    contextObj.clearDDlShowSelect();
                    recPattern.FieldValue = "4";
                    if (contextObj.fieldDetailsEdit.IsWeekDaySpecific == false) {
                        contextObj.refreshYearlyOnThe();
                        contextObj.showYearlyOn();
                        contextObj.enableYearlyOn();
                        yearlySubRadio.FieldValue = "84";
                        for (var i = 0; i < yearlyOnSubFields1.LookupDetails.LookupValues.length; i++) {
                            if (yearlyOnSubFields1.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.DayNo) {
                                yearlyOnSubFields1.FieldValue = yearlyOnSubFields1.LookupDetails.LookupValues[i].Id.toString();
                            }
                        }
                        for (var i = 0; i < yearlyOnSubFields2.LookupDetails.LookupValues.length; i++) {
                            if (yearlyOnSubFields2.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.MonthNo) {
                                yearlyOnSubFields2.FieldValue = yearlyOnSubFields2.LookupDetails.LookupValues[i].Id.toString();
                            }
                        }
                    }
                    else if (contextObj.fieldDetailsEdit.IsWeekDaySpecific == true) {
                        contextObj.refreshYearlyOnThe();
                        contextObj.showYearlyThe();
                        contextObj.enableYearlyThe();
                        yearlySubRadio.FieldValue = "85";
                        for (var i = 0; i < yearlyTheSubFields1.LookupDetails.LookupValues.length; i++) {
                            if (yearlyTheSubFields1.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.WeekDayRecurrenceTypeId) {
                                yearlyTheSubFields1.FieldValue = yearlyTheSubFields1.LookupDetails.LookupValues[i].Id.toString();
                            }
                        }
                        for (var i = 0; i < yearlyTheSubFields2.LookupDetails.LookupValues.length; i++) {
                            if (yearlyTheSubFields2.LookupDetails.LookupValues[i].Id == (Math.log(contextObj.fieldDetailsEdit.WeekDays) / Math.log(2))) {
                                yearlyTheSubFields2.FieldValue = yearlyTheSubFields2.LookupDetails.LookupValues[i].Id.toString();
                            }
                        }
                        for (var i = 0; i < yearlyTheSubFields3.LookupDetails.LookupValues.length; i++) {
                            if (yearlyTheSubFields3.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.MonthNo) {
                                yearlyTheSubFields3.FieldValue = yearlyTheSubFields3.LookupDetails.LookupValues[i].Id.toString();
                            }
                        }
                    }
                }
            }
            else {
                contextObj.refreshBeforeRender();
                contextObj.reRenderCriteria("1");
                contextObj.clearDDlShowSelect();
                contextObj.enableDaily();
                recPattern.FieldValue = "1";
            }
            var monthlySubRdGroup = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2648;
            });
            var yearlySubRdGroup = contextObj.fieldDetails.find(function (item) {
                return item.FieldId === 2666;
            });
        });
    };
    ScheduleReportAddEdit.prototype.reRenderCriteria = function (targetRecId) {
        switch (targetRecId) {
            case "1":
                this.recPatternSelected = 1;
                this.showDailyFields();
                break;
            case "2":
                this.recPatternSelected = 2;
                this.showWeeklyFields();
                break;
            case "3":
                this.recPatternSelected = 3;
                this.showMonthlyFields();
                break;
            case "4":
                this.recPatternSelected = 4;
                this.showYearlyFields();
                break;
            default:
                break;
        }
    };
    ScheduleReportAddEdit.prototype.showDailyFields = function () {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArray1Pre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArray1Pre[j]) {
                    this.fieldDetails[i].IsVisible = true;
                }
            }
        }
    };
    ScheduleReportAddEdit.prototype.showWeeklyFields = function () {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArray2Pre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArray2Pre[j]) {
                    this.fieldDetails[i].IsVisible = true;
                }
            }
        }
    };
    ScheduleReportAddEdit.prototype.showMonthlyFields = function () {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArray3Pre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArray3Pre[j]) {
                    this.fieldDetails[i].IsVisible = true;
                }
            }
        }
    };
    ScheduleReportAddEdit.prototype.showYearlyFields = function () {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArray4Pre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArray4Pre[j]) {
                    this.fieldDetails[i].IsVisible = true;
                }
            }
        }
    };
    ScheduleReportAddEdit.prototype.refreshMontlyDayThe = function () {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.HideArray3Pre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.HideArray3Pre[j]) {
                    this.fieldDetails[i].FieldValue = "-1";
                    this.fieldDetails[i].IsEnabled = false;
                    this.fieldDetails[i].IsVisible = false;
                }
            }
        }
    };
    ScheduleReportAddEdit.prototype.showMonthlyDay = function () {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArray3of1Pre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArray3of1Pre[j]) {
                    this.fieldDetails[i].IsEnabled = true;
                    this.fieldDetails[i].IsVisible = true;
                }
            }
        }
    };
    ScheduleReportAddEdit.prototype.showMonthlyThe = function () {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArray3of2Pre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArray3of2Pre[j]) {
                    this.fieldDetails[i].IsEnabled = true;
                    this.fieldDetails[i].IsVisible = true;
                }
            }
        }
    };
    ScheduleReportAddEdit.prototype.refreshYearlyOnThe = function () {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.HideArray4Pre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.HideArray4Pre[j]) {
                    this.fieldDetails[i].IsEnabled = false;
                    this.fieldDetails[i].IsVisible = false;
                    this.fieldDetails[i].FieldValue = "-1";
                }
            }
        }
    };
    ScheduleReportAddEdit.prototype.showYearlyOn = function () {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArray4of1Pre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArray4of1Pre[j]) {
                    this.fieldDetails[i].IsEnabled = true;
                    this.fieldDetails[i].IsVisible = true;
                }
            }
        }
    };
    ScheduleReportAddEdit.prototype.showYearlyThe = function () {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArray4of2Pre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArray4of2Pre[j]) {
                    this.fieldDetails[i].IsEnabled = true;
                    this.fieldDetails[i].IsVisible = true;
                }
            }
        }
    };
    ScheduleReportAddEdit.prototype.refreshBeforeRender = function () {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArrayPre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArrayPre[j]) {
                    this.fieldDetails[i].IsVisible = false;
                }
            }
        }
    };
    ScheduleReportAddEdit.prototype.refreshRecRangeDDL = function () {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArrayRecRangeDDL.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArrayRecRangeDDL[j]) {
                    this.fieldDetails[i].IsVisible = false;
                    this.fieldDetails[i].IsEnabled = false;
                    this.fieldDetails[i].FieldValue = "-1";
                }
            }
        }
    };
    ScheduleReportAddEdit.prototype.refreshRecRangeDatePicker = function () {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArrayRecRangeDatePicker.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArrayRecRangeDatePicker[j]) {
                    this.fieldDetails[i].IsVisible = false;
                    // this.fieldDetails[i].IsEnabled = false;
                    //this.fieldDetails[i].ReadOnlyMode = true;
                    this.fieldDetails[i].FieldValue = "";
                }
            }
        }
    };
    ScheduleReportAddEdit.prototype.enableRecFields = function () {
        var datePickerRecRange = this.fieldDetails.find(function (item) {
            return item.FieldId === 2724;
        });
        var ddlFrequencyRecRange = this.fieldDetails.find(function (item) {
            return item.FieldId === 2715;
        });
        var recFieldSelected = this.fieldDetails.find(function (item) {
            return item.FieldId === 2710;
        });
        if (recFieldSelected.FieldValue == "11") {
            datePickerRecRange.IsEnabled = false;
            datePickerRecRange.IsVisible = false;
            ddlFrequencyRecRange.IsEnabled = true;
            ddlFrequencyRecRange.IsVisible = true;
        }
        else if (recFieldSelected.FieldValue == "12") {
            ddlFrequencyRecRange.IsEnabled = false;
            ddlFrequencyRecRange.IsVisible = false;
            datePickerRecRange.IsEnabled = true;
            datePickerRecRange.IsVisible = true;
        }
    };
    ScheduleReportAddEdit.prototype.clearDDlShowSelect = function () {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            if (this.ddlDisableShowSelect.indexOf(this.fieldDetails[i].FieldId) > -1) {
                this.fieldDetails[i].ShowSelect = false;
                this.fieldDetails[i].FieldValue = "-1";
            }
        }
    };
    ScheduleReportAddEdit.prototype.enableMonthlyDay = function () {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            if (this.ddlOnChangeMonthlyDay.indexOf(this.fieldDetails[i].FieldId) > -1) {
                this.fieldDetails[i].ShowSelect = false;
                this.fieldDetails[i].FieldValue = this.fieldDetails[i].LookupDetails.LookupValues[0].Id.toString();
            }
        }
    };
    ScheduleReportAddEdit.prototype.enableMonthlyThe = function () {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            if (this.ddlOnChangeMonthlyThe.indexOf(this.fieldDetails[i].FieldId) > -1) {
                this.fieldDetails[i].ShowSelect = false;
                this.fieldDetails[i].FieldValue = this.fieldDetails[i].LookupDetails.LookupValues[0].Id.toString();
            }
        }
    };
    ScheduleReportAddEdit.prototype.enableYearlyOn = function () {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            if (this.ddlOnChangeYearlyOn.indexOf(this.fieldDetails[i].FieldId) > -1) {
                this.fieldDetails[i].ShowSelect = false;
                this.fieldDetails[i].FieldValue = this.fieldDetails[i].LookupDetails.LookupValues[0].Id.toString();
            }
        }
    };
    ScheduleReportAddEdit.prototype.enableYearlyThe = function () {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            if (this.ddlOnChangeYearlyThe.indexOf(this.fieldDetails[i].FieldId) > -1) {
                this.fieldDetails[i].ShowSelect = false;
                this.fieldDetails[i].FieldValue = this.fieldDetails[i].LookupDetails.LookupValues[0].Id.toString();
            }
        }
    };
    ScheduleReportAddEdit.prototype.enableDaily = function () {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            if (this.ddlOnChangeDaily.indexOf(this.fieldDetails[i].FieldId) > -1) {
                this.fieldDetails[i].ShowSelect = false;
                this.fieldDetails[i].FieldValue = this.fieldDetails[i].LookupDetails.LookupValues[0].Id.toString();
            }
        }
    };
    ScheduleReportAddEdit.prototype.enableWeekly = function () {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            if (this.ddlOnChangeWeekly.indexOf(this.fieldDetails[i].FieldId) > -1) {
                this.fieldDetails[i].ShowSelect = false;
                this.fieldDetails[i].FieldValue = this.fieldDetails[i].LookupDetails.LookupValues[0].Id.toString();
            }
        }
    };
    ScheduleReportAddEdit.prototype.enableRecFrequency = function () {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            if (this.ddlOnChangeRecFrequency.indexOf(this.fieldDetails[i].FieldId) > -1) {
                this.fieldDetails[i].ShowSelect = false;
                this.fieldDetails[i].FieldValue = this.fieldDetails[i].LookupDetails.LookupValues[0].Id.toString();
            }
        }
    };
    ScheduleReportAddEdit.prototype.enableRecDatePicker = function () {
        var datePickerRecRange = this.fieldDetails.find(function (item) {
            return item.FieldId === 2724;
        });
        //datePickerRecRange.ReadOnlyMode = false;
        debugger;
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        datePickerRecRange.FieldValue = this.getFormattedDate(tomorrow);
    };
    ScheduleReportAddEdit.prototype.getFormattedDate = function (dt) {
        var strDate = "";
        var date;
        if (dt != undefined) {
            date = new Date(dt);
        }
        else {
            date = new Date();
        }
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mon = monthNames[date.getMonth()];
        var yy = date.getFullYear();
        strDate = dd + " " + mon + " " + yy;
        return strDate;
    };
    ScheduleReportAddEdit.prototype.radioBtnChange = function (event) {
        debugger;
        if (event.rbtnObject.fieldobject.FieldId == 2644) {
            switch (event.rbtnObject.fieldobject.FieldValue) {
                case "1":
                    this.refreshBeforeRender();
                    this.showDailyFields();
                    this.clearDDlShowSelect();
                    this.enableDaily();
                    break;
                case "2":
                    this.refreshBeforeRender();
                    this.showWeeklyFields();
                    this.clearDDlShowSelect();
                    this.enableWeekly();
                    break;
                case "3":
                    this.refreshBeforeRender();
                    this.showMonthlyFields();
                    this.refreshMontlyDayThe();
                    this.showMonthlyDay();
                    this.clearDDlShowSelect();
                    this.enableMonthlyDay();
                    var monthlySubRadio = this.fieldDetails.find(function (item) {
                        return item.FieldId === 2648;
                    });
                    monthlySubRadio.FieldValue = "82";
                    break;
                case "4":
                    this.refreshBeforeRender();
                    this.showYearlyFields();
                    this.refreshYearlyOnThe();
                    this.showYearlyOn();
                    this.clearDDlShowSelect();
                    this.enableYearlyOn();
                    var yearlySubRadio = this.fieldDetails.find(function (item) {
                        return item.FieldId === 2666;
                    });
                    yearlySubRadio.FieldValue = "84";
                    break;
                default:
                    break;
            }
        }
        if (event.rbtnObject.fieldobject.FieldId == 2648) {
            switch (event.rbtnObject.fieldobject.FieldValue) {
                case "82":
                    this.refreshMontlyDayThe();
                    this.showMonthlyDay();
                    this.clearDDlShowSelect();
                    this.enableMonthlyDay();
                    break;
                case "83":
                    this.refreshMontlyDayThe();
                    this.showMonthlyThe();
                    this.clearDDlShowSelect();
                    this.enableMonthlyThe();
                    break;
                default:
                    break;
            }
        }
        if (event.rbtnObject.fieldobject.FieldId == 2666) {
            switch (event.rbtnObject.fieldobject.FieldValue) {
                case "84":
                    this.refreshYearlyOnThe();
                    this.showYearlyOn();
                    this.clearDDlShowSelect();
                    this.enableYearlyOn();
                    break;
                case "85":
                    this.refreshYearlyOnThe();
                    this.showYearlyThe();
                    this.clearDDlShowSelect();
                    this.enableYearlyThe();
                    break;
                default:
                    break;
            }
        }
        if (event.rbtnObject.fieldobject.FieldId == 2710) {
            switch (event.rbtnObject.fieldobject.FieldValue) {
                case "11":
                    this.refreshRecRangeDDL();
                    this.refreshRecRangeDatePicker();
                    this.enableRecFields();
                    this.enableRecFrequency();
                    break;
                case "12":
                    this.refreshRecRangeDDL();
                    this.refreshRecRangeDatePicker();
                    this.enableRecFields();
                    this.enableRecDatePicker();
                    break;
                default:
                    break;
            }
        }
    };
    ScheduleReportAddEdit.prototype.showRecRangeDDL = function () {
        var HideArrayRecRangeDDL = document.getElementsByClassName("MainContainer_2715")[0];
        HideArrayRecRangeDDL.getElementsByTagName("select")[0].disabled = false;
        HideArrayRecRangeDDL.getElementsByTagName("select")[0].style.backgroundColor = "white";
    };
    ScheduleReportAddEdit.prototype.showRecRangeDatePicker = function () {
        var HideArrayRecRangeDatePick = document.getElementsByClassName("MainContainer_2724")[0];
        HideArrayRecRangeDatePick.getElementsByTagName("input")[0].disabled = false;
        HideArrayRecRangeDatePick.getElementsByTagName("input")[0].style.backgroundColor = "white";
    };
    ScheduleReportAddEdit.prototype.popUpEmailRecipients = function (event) {
        var contextObj = this;
        if (contextObj.reportId == 0) {
            contextObj.btnName = "Save";
        }
        else {
            contextObj.btnName = "Save Changes";
        }
        contextObj.showEmailRecComp = true;
        contextObj.splitviewInput.showSecondaryView = true;
        contextObj.pageTitle = "Select Email Recipients";
        var reportTitle = contextObj.fieldDetails.find(function (item) {
            return item.FieldId == 2640;
        });
        contextObj.reportTitle = reportTitle.FieldValue;
        this.loadEmailRecFields();
    };
    ScheduleReportAddEdit.prototype.loadEmailRecFields = function () {
        var contextObj = this;
        contextObj.commonService.loadEmailRecipientsFields().subscribe(function (result) {
            contextObj.emailRecFieldDetails = (result["Data"]);
            contextObj.fieldTitle = result["Data"].find(function (item) {
                return item.FieldId == 2741;
            });
            contextObj.fieldTitle.FieldValue = contextObj.reportTitle;
            contextObj.fieldUserCategory = result["Data"].find(function (item) {
                return item.FieldId == 2742;
            });
            contextObj.fieldUserCategory.FieldValue = "-1";
            contextObj.emailRecFieldDetails = contextObj.emailRecFieldDetails.filter(function (item) {
                return item.FieldId !== 2741;
            });
            contextObj.emailRecFieldDetails = contextObj.emailRecFieldDetails.filter(function (item) {
                return item.FieldId !== 2742;
            });
        });
    };
    ScheduleReportAddEdit.prototype.onSubmitData = function (event) {
        var dateError = false;
        debugger;
        var endDate = JSON.parse(event["fieldobject"]).find(function (item) {
            if (item.ReportFieldId == 7376) {
                return item;
            }
        });
        var startDate = JSON.parse(event["fieldobject"]).find(function (item) {
            if (item.ReportFieldId == 7370) {
                return item;
            }
        });
        if (endDate.Value != "") {
            endDate = new Date(endDate.Value);
            startDate = new Date(startDate.Value);
            if (endDate <= startDate) {
                dateError = true;
                this._notificationService.ShowToaster("End by Date must be greater than Start Date", 5);
            }
        }
        var postRecPattern = this.fieldDetails.find(function (item) {
            return item.FieldId === 2644;
        });
        var postMonthlyDayORThe = this.fieldDetails.find(function (item) {
            return item.FieldId === 2648;
        });
        var postYearlyOnORThe = this.fieldDetails.find(function (item) {
            return item.FieldId === 2666;
        });
        var emailCount = 0;
        if (this.EmailReciepientArray) {
            for (var i = 0; i < this.EmailReciepientArray.length; i++) {
                if (this.EmailReciepientArray[i].UserIds.length > 0) {
                    emailCount = emailCount + this.EmailReciepientArray[i].UserIds.length;
                }
            }
        }
        if (emailCount == 0 && this.reportId == 0) {
            this._notificationService.ShowToaster("Select Email Recipients", 5);
        }
        else if (dateError == false) {
            switch (postRecPattern.FieldValue) {
                case "1":
                    var tempField1 = [
                        { ReportFieldId: 7368, Value: "0" },
                        { ReportFieldId: 7369, Value: "0" },
                        { ReportFieldId: 8646, Value: "1" }];
                    event["fieldobject"] = JSON.parse(event["fieldobject"]).filter(function (obj) {
                        return obj.Value !== "-1" && obj.Value !== null;
                    });
                    event["fieldobject"] = event["fieldobject"].filter(function (item) {
                        return item.ReportFieldId != 7368;
                    });
                    event["fieldobject"] = event["fieldobject"].concat(tempField1);
                    if (this.reportId == 0) {
                        this.postSubmit(JSON.stringify(event["fieldobject"]), JSON.stringify(this.reportData.ListReportFieldIdValues), JSON.stringify(this.EmailReciepientArray), 1);
                    }
                    else {
                        this.postSubmit(JSON.stringify(event["fieldobject"]), JSON.stringify(this.ReportData.ListReportFieldIdValues), JSON.stringify(this.EmailReciepientArray), 0);
                    }
                    break;
                case "2":
                    var WeekDays = JSON.parse(event["fieldobject"]).find(function (item) {
                        return item.ReportFieldId == 7369;
                    });
                    if (WeekDays.Value == null || WeekDays.Value == "-1") {
                        this._notificationService.ShowToaster("Select atleast one week day", 5);
                    }
                    else {
                        var tempField2 = [
                            {
                                ReportFieldId: 7368,
                                Value: "1"
                            },
                            {
                                ReportFieldId: 8646,
                                Value: "1"
                            }
                        ];
                        event["fieldobject"] = JSON.parse(event["fieldobject"]).filter(function (obj) {
                            return obj.Value !== "-1" && obj.Value !== null;
                        });
                        event["fieldobject"] = event["fieldobject"].filter(function (item) {
                            return item.ReportFieldId != 7368;
                        });
                        event["fieldobject"] = event["fieldobject"].concat(tempField2);
                        if (this.reportId == 0) {
                            this.postSubmit(JSON.stringify(event["fieldobject"]), JSON.stringify(this.reportData.ListReportFieldIdValues), JSON.stringify(this.EmailReciepientArray), 1);
                        }
                        else {
                            this.postSubmit(JSON.stringify(event["fieldobject"]), JSON.stringify(this.ReportData.ListReportFieldIdValues), JSON.stringify(this.EmailReciepientArray), 0);
                        }
                    }
                    break;
                case "3":
                    if (postMonthlyDayORThe.FieldValue == "82") {
                        var tempField31 = [
                            {
                                ReportFieldId: 7368,
                                Value: "0"
                            },
                            {
                                ReportFieldId: 7369,
                                Value: "0"
                            },
                            {
                                ReportFieldId: 8646,
                                Value: "1"
                            }
                        ];
                        event["fieldobject"] = JSON.parse(event["fieldobject"]).filter(function (obj) {
                            return obj.Value !== "-1" && obj.Value !== null;
                        });
                        event["fieldobject"] = event["fieldobject"].filter(function (item) {
                            return item.ReportFieldId != 7368;
                        });
                        event["fieldobject"] = event["fieldobject"].concat(tempField31);
                        if (this.reportId == 0) {
                            this.postSubmit(JSON.stringify(event["fieldobject"]), JSON.stringify(this.reportData.ListReportFieldIdValues), JSON.stringify(this.EmailReciepientArray), 1);
                        }
                        else {
                            this.postSubmit(JSON.stringify(event["fieldobject"]), JSON.stringify(this.ReportData.ListReportFieldIdValues), JSON.stringify(this.EmailReciepientArray), 0);
                        }
                    }
                    else if (postMonthlyDayORThe.FieldValue == "83") {
                        var tempField32 = [{ ReportFieldId: 7368, Value: "1" }, { ReportFieldId: 8646, Value: "1" }];
                        event["fieldobject"] = JSON.parse(event["fieldobject"]).filter(function (obj) {
                            return obj.Value !== "-1" && obj.Value !== null;
                        });
                        event["fieldobject"] = event["fieldobject"].filter(function (item) {
                            return item.ReportFieldId != 7368;
                        });
                        event["fieldobject"] = event["fieldobject"].concat(tempField32);
                        if (this.reportId == 0) {
                            this.postSubmit(JSON.stringify(event["fieldobject"]), JSON.stringify(this.reportData.ListReportFieldIdValues), JSON.stringify(this.EmailReciepientArray), 1);
                        }
                        else {
                            this.postSubmit(JSON.stringify(event["fieldobject"]), JSON.stringify(this.ReportData.ListReportFieldIdValues), JSON.stringify(this.EmailReciepientArray), 0);
                        }
                    }
                    break;
                case "4":
                    if (postYearlyOnORThe.FieldValue == "84") {
                        var tempField41 = [
                            {
                                ReportFieldId: 7368,
                                Value: "0"
                            },
                            {
                                ReportFieldId: 7369,
                                Value: "0"
                            },
                            {
                                ReportFieldId: 8646,
                                Value: "1"
                            },
                            {
                                ReportFieldId: 7367,
                                Value: "1"
                            }
                        ];
                        event["fieldobject"] = JSON.parse(event["fieldobject"]).filter(function (obj) {
                            return obj.Value !== "-1" && obj.Value !== null;
                        });
                        event["fieldobject"] = event["fieldobject"].filter(function (item) {
                            return item.ReportFieldId != 7368;
                        });
                        event["fieldobject"] = event["fieldobject"].concat(tempField41);
                        if (this.reportId == 0) {
                            this.postSubmit(JSON.stringify(event["fieldobject"]), JSON.stringify(this.reportData.ListReportFieldIdValues), JSON.stringify(this.EmailReciepientArray), 1);
                        }
                        else {
                            this.postSubmit(JSON.stringify(event["fieldobject"]), JSON.stringify(this.ReportData.ListReportFieldIdValues), JSON.stringify(this.EmailReciepientArray), 0);
                        }
                    }
                    else if (postYearlyOnORThe.FieldValue == "85") {
                        var tempField42 = [
                            {
                                ReportFieldId: 7368,
                                Value: "1"
                            },
                            {
                                ReportFieldId: 8646,
                                Value: "1"
                            },
                            {
                                ReportFieldId: 7367,
                                Value: "1"
                            }
                        ];
                        event["fieldobject"] = JSON.parse(event["fieldobject"]).filter(function (obj) {
                            return obj.Value !== "-1" && obj.Value !== null;
                        });
                        event["fieldobject"] = event["fieldobject"].filter(function (item) {
                            return item.ReportFieldId != 7368;
                        });
                        event["fieldobject"] = event["fieldobject"].concat(tempField42);
                        if (this.reportId == 0) {
                            this.postSubmit(JSON.stringify(event["fieldobject"]), JSON.stringify(this.reportData.ListReportFieldIdValues), JSON.stringify(this.EmailReciepientArray), 1);
                        }
                        else {
                            this.postSubmit(JSON.stringify(event["fieldobject"]), JSON.stringify(this.ReportData.ListReportFieldIdValues), JSON.stringify(this.EmailReciepientArray), 0);
                        }
                    }
            }
        }
    };
    ScheduleReportAddEdit.prototype.postSubmit = function (strsubmitField, reportData, emailReciepient, target) {
        var contextObj = this;
        contextObj.commonService.InsertScheduledReport(strsubmitField, reportData, emailReciepient, contextObj.isEditOption, contextObj.reportId, JSON.stringify(contextObj.reportData)).subscribe(function (resultData) {
            debugger;
            switch (resultData.StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (contextObj.reportId == 0) {
                        contextObj._notificationService.ShowToaster("Scheduled Report added", 3);
                        contextObj._emailRecService.setStatus(true);
                        contextObj.splitviewInput.showSecondaryView = false;
                        contextObj.insertSuccess.emit({});
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Scheduled Report updated", 3);
                        contextObj._emailRecService.setStatus(true);
                        contextObj.splitviewInput.showSecondaryView = false;
                        contextObj.updateSuccess.emit({ returnData: resultData["Data"][0] });
                    }
                    break;
                case 3:
                    if (resultData.ServerId == -1) {
                        contextObj._notificationService.ShowToaster("Scheduled Report already exists", 5);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Unknown problem", 1);
                    }
                    break;
            }
        });
    };
    ScheduleReportAddEdit.prototype.handleEmailRecUpdated = function (EmailReciepient) {
        this.EmailReciepientArray = [];
        this.EmailReciepientArray = EmailReciepient;
        this.emailRecCount = this.getEmailReciepientAddCount();
        console.log("From Scheduled Report", EmailReciepient, "Email Rec Count", this.emailRecCount);
    };
    ScheduleReportAddEdit.prototype.getEmailReciepientEditCount = function () {
        return EmailReciepientEdit[0].UserIds.length +
            EmailReciepientEdit[1].UserIds.length +
            EmailReciepientEdit[2].UserIds.length +
            EmailReciepientEdit[3].UserIds.length +
            EmailReciepientEdit[4].UserIds.length;
    };
    ScheduleReportAddEdit.prototype.getEmailReciepientAddCount = function () {
        if (this.EmailReciepientArray) {
            if (this.EmailReciepientArray.length > 0) {
                return this.EmailReciepientArray[0].UserIds.length +
                    this.EmailReciepientArray[1].UserIds.length +
                    this.EmailReciepientArray[2].UserIds.length +
                    this.EmailReciepientArray[3].UserIds.length +
                    this.EmailReciepientArray[4].UserIds.length;
            }
        }
        else
            return 0;
    };
    ScheduleReportAddEdit.prototype.clearEmailRecUserIds = function () {
        if (this.EmailReciepientArray) {
            if (this.EmailReciepientArray.length > 0) {
                this.EmailReciepientArray[0].UserIds = [];
                this.EmailReciepientArray[1].UserIds = [];
                this.EmailReciepientArray[2].UserIds = [];
                this.EmailReciepientArray[3].UserIds = [];
                this.EmailReciepientArray[4].UserIds = [];
            }
        }
    };
    __decorate([
        core_1.ViewChild(emailrecipients_schedulereport_component_1.EmailRecipientsScheduleReport), 
        __metadata('design:type', emailrecipients_schedulereport_component_1.EmailRecipientsScheduleReport)
    ], ScheduleReportAddEdit.prototype, "emailObj", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ScheduleReportAddEdit.prototype, "reportData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ScheduleReportAddEdit.prototype, "updateSuccess", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ScheduleReportAddEdit.prototype, "insertSuccess", void 0);
    ScheduleReportAddEdit = __decorate([
        core_1.Component({
            selector: 'schedule-report-addedit',
            templateUrl: './app/Views/Common/ScheduleReport/schedule-report-addedit.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent,
                section_component_1.SectionComponent,
                grid_component_1.GridComponent,
                paging_component_1.PagingComponent,
                fieldGeneration_component_1.FieldComponent,
                slide_component_1.SlideComponent,
                popupadd_component_1.PopupAddComponent,
                emailrecipients_schedulereport_component_1.EmailRecipientsScheduleReport],
            providers: [http_1.HTTP_PROVIDERS,
                notify_service_1.NotificationService,
                General_1.GeneralFunctions,
                administration_service_1.AdministrationService,
                common_service_1.CommonService,
                email_service_1.EmailRecipientService],
            encapsulation: core_1.ViewEncapsulation.None,
            inputs: ['reportData', 'isEdit', 'reportName', 'fieldDetailsEdit', 'alterName']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonService, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions, email_service_1.EmailRecipientService])
    ], ScheduleReportAddEdit);
    return ScheduleReportAddEdit;
}());
exports.ScheduleReportAddEdit = ScheduleReportAddEdit;
var EmailReciepientEdit = [
    {
        ReciepientType: 2,
        UserIds: []
    },
    {
        ReciepientType: 4,
        UserIds: []
    },
    {
        ReciepientType: 5,
        UserIds: []
    },
    {
        ReciepientType: 6,
        UserIds: []
    },
    {
        ReciepientType: 7,
        UserIds: []
    }
];
//# sourceMappingURL=schedule-report-addedit.component.js.map