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
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var MasterPMScheduleAddEditComponent = (function () {
    function MasterPMScheduleAddEditComponent(workOrdereService, notificationService, el) {
        this.workOrdereService = workOrdereService;
        this.notificationService = notificationService;
        this.el = el;
        this.dataKey = "Id";
        this.isMeterBased = false;
        this.submitSuccess = new core_1.EventEmitter();
        this.ngStatus = false;
    }
    MasterPMScheduleAddEditComponent.prototype.ngDoCheck = function () {
        var context = this;
        if (this.fieldDetailsAddEditChk == undefined) {
            if (this.fieldDetailsAddEdit != undefined) {
                var chk;
                chk = this.fieldDetailsAddEdit.filter(function (el) {
                    if (el["FieldId"] == 1414)
                        return true;
                    else
                        return false;
                });
                this.fieldDetailsAddEditChk = chk;
            }
        }
        if (this.fieldDetailsAddEditChk != undefined && this.ngStatus == false) {
            var element5 = this.el.nativeElement.getElementsByClassName("Radio-1540");
            if (element5.length != 0) {
                this.ngStatus = true;
                context.fieldDetailsAddEdit.find(function (item) {
                    if (item.FieldId == 1540) {
                        if (item.FieldValue == "1") {
                            var element = context.el.nativeElement.getElementsByClassName("MainContainer_1373");
                            element[0].style.margin = "0px";
                            var element2 = context.el.nativeElement.getElementsByClassName("MainContainer_1374");
                            element2[0].style.margin = "0px";
                            var element3 = context.el.nativeElement.getElementsByClassName("MainContainer_1375");
                            element3[0].style.margin = "0px";
                            var element4 = context.el.nativeElement.getElementsByClassName("MainContainer_1376");
                            element4[0].style.margin = "0px";
                            var element5 = context.el.nativeElement.getElementsByClassName("MainContainer_1377");
                            element5[0].style.margin = "0px";
                            var element6 = context.el.nativeElement.getElementsByClassName("MainContainer_1378");
                            element6[0].style.margin = "0px";
                            var element7 = context.el.nativeElement.getElementsByClassName("MainContainer_1379");
                            element7[0].style.margin = "0px";
                            var element8 = context.el.nativeElement.getElementsByClassName("MainContainer_1380");
                            element8[0].style.margin = "0px";
                            var element9 = context.el.nativeElement.getElementsByClassName("Div-1380");
                            if (element9.length != 0)
                                element9[0].style.margin = "0px;";
                        }
                        if (item.FieldValue == "2") {
                            var element = context.el.nativeElement.getElementsByClassName("MainContainer_1373");
                            element[0].style.margin = "0px";
                            var element2 = context.el.nativeElement.getElementsByClassName("MainContainer_1374");
                            element2[0].style.margin = "0px";
                            var element3 = context.el.nativeElement.getElementsByClassName("MainContainer_1375");
                            element3[0].style.margin = "0px";
                            var element4 = context.el.nativeElement.getElementsByClassName("MainContainer_1376");
                            element4[0].style.margin = "0px";
                            var element5 = context.el.nativeElement.getElementsByClassName("MainContainer_1377");
                            element5[0].style.margin = "0px";
                            var element6 = context.el.nativeElement.getElementsByClassName("MainContainer_1378");
                            element6[0].style.margin = "0px";
                            var element7 = context.el.nativeElement.getElementsByClassName("MainContainer_1379");
                            element7[0].style.margin = "0px";
                            var element8 = context.el.nativeElement.getElementsByClassName("MainContainer_1380");
                            element8[0].style.margin = "0px";
                            var element9 = context.el.nativeElement.getElementsByClassName("Div-1380");
                            if (element9.length != 0)
                                element9[0].style.margin = "0px;";
                        }
                        if (item.FieldValue == "3") {
                            var element = context.el.nativeElement.getElementsByClassName("MainContainer_1373");
                            element[0].style.margin = "-68px 0px 0px 60px";
                            var element2 = context.el.nativeElement.getElementsByClassName("MainContainer_1374");
                            element2[0].style.margin = "-18px 0px 0px 60px";
                            var element3 = context.el.nativeElement.getElementsByClassName("MainContainer_1375");
                            element3[0].style.margin = "-54px 0px 0px 170px";
                            var element3 = context.el.nativeElement.getElementsByClassName("Radio-1372");
                            element3[0].style.display = "block";
                            element3[1].style.display = "block";
                            element3[2].style.display = "block";
                            element3[0].style.padding = "5px 0px";
                            element3[1].style.padding = "5px 0px";
                            element3[2].style.padding = "5px 0px";
                            var element4 = context.el.nativeElement.getElementsByClassName("MainContainer_1376");
                            element4[0].style.margin = "0px";
                            var element5 = context.el.nativeElement.getElementsByClassName("MainContainer_1377");
                            element5[0].style.margin = "0px";
                            var element6 = context.el.nativeElement.getElementsByClassName("MainContainer_1378");
                            element6[0].style.margin = "0px";
                            var element7 = context.el.nativeElement.getElementsByClassName("MainContainer_1379");
                            element7[0].style.margin = "0px";
                            var element8 = context.el.nativeElement.getElementsByClassName("MainContainer_1380");
                            element8[0].style.margin = "0px";
                            var element9 = context.el.nativeElement.getElementsByClassName("Div-1380");
                            if (element9.length != 0)
                                element9[0].style.margin = "0px;";
                        }
                        if (item.FieldValue == "4") {
                            var elementPre = context.el.nativeElement.getElementsByClassName("MainContainer_1373");
                            elementPre[0].style.margin = "0px";
                            var elementPre2 = context.el.nativeElement.getElementsByClassName("MainContainer_1374");
                            elementPre2[0].style.margin = "0px";
                            var elementPre3 = context.el.nativeElement.getElementsByClassName("MainContainer_1375");
                            elementPre3[0].style.margin = "0px";
                            var element = context.el.nativeElement.getElementsByClassName("MainContainer_1376");
                            element[0].style.margin = "-68px 0px 0px 60px";
                            var element = context.el.nativeElement.getElementsByClassName("MainContainer_1377");
                            element[0].style.margin = "-54px 0px 0px 160px";
                            var element2 = context.el.nativeElement.getElementsByClassName("MainContainer_1378");
                            element2[0].style.margin = "-18px 0px 0px 60px";
                            var element3 = context.el.nativeElement.getElementsByClassName("MainContainer_1379");
                            element3[0].style.margin = "-54px 0px 0px 160px";
                            var element4 = context.el.nativeElement.getElementsByClassName("MainContainer_1380");
                            element4[0].style.margin = "-40px 0px 0px 255px";
                            var element6 = context.el.nativeElement.getElementsByClassName("Div-1380");
                            if (element6.length != 0)
                                element6[0].style.margin = "-30px 0px 0px 20px";
                            var element5 = context.el.nativeElement.getElementsByClassName("Radio-1381");
                            element5[0].style.display = "block";
                            element5[1].style.display = "block";
                            element5[2].style.display = "block";
                            element5[0].style.padding = "5px 0px";
                            element5[1].style.padding = "5px 0px";
                            element5[2].style.padding = "5px 0px";
                        }
                    }
                    return false;
                });
            }
        }
    };
    MasterPMScheduleAddEditComponent.prototype.ngOnInit = function () {
        this.formHeight = window.innerHeight - 200;
        this.formHeight = this.formHeight + "px";
        var contextObj = this;
        this.ddlEquipmentClass = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1538;
        });
        this.lstBxWeekDays = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1543;
        });
        this.rbtnMonthlyReccurencePatternCriteria = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1372;
        });
        this.ddlMonthlyDayNo = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1373;
        });
        this.ddlMonthlyWeekOccurence = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1374;
        });
        this.ddlMonthlyWeekDay = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1375;
        });
        this.rbtnYearlyReccurencePatternCriteria = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1381;
        });
        this.ddlYearlyDayNo = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1376;
        });
        this.ddlYearlyMonthDay = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1377;
        });
        this.ddlYearlyWeekOccurence = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1378;
        });
        this.ddlYearlyWeekDay = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1379;
        });
        this.ddlYearlyMonthofYear = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1380;
        });
        this.ddlMeterField = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1563;
        });
        this.rbtnFrequency = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1553;
        });
        this.ddlPerformOn = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1547;
        });
        this.rbtnReccurencePattern = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1540;
        });
        this.lstBxSeasons = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1382;
        });
    };
    MasterPMScheduleAddEditComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        switch (this.action) {
            case "add":
                this.postSubmit(contextObj, event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(contextObj, event["fieldobject"], 2);
                break;
        }
    };
    MasterPMScheduleAddEditComponent.prototype.postSubmit = function (contextObj, pageDetails, target) {
        this.workOrdereService.postSubmitMasterPMSchedule(pageDetails, this.selectedId, target).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 1:
                    if (target == 1) {
                        contextObj.notificationService.ShowToaster("Master PM Schedule added", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Master PM Schedule updated", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster("Master PM Schedule already exists", 5);
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Action Failure", 5);
                    }
                    break;
            }
        });
    };
    MasterPMScheduleAddEditComponent.prototype.rbtnOnChange = function (event) {
        var contextObj = this;
        switch (event["rbtnObject"]["fieldobject"]["FieldValue"]) {
            case "1":
                contextObj.lstBxWeekDays.IsEnabled = false;
                contextObj.lstBxWeekDays.IsVisible = false;
                contextObj.lstBxWeekDays.MultiFieldValues = [];
                contextObj.rbtnMonthlyReccurencePatternCriteria.IsEnabled = false;
                contextObj.rbtnMonthlyReccurencePatternCriteria.IsVisible = false;
                contextObj.rbtnYearlyReccurencePatternCriteria.IsEnabled = false;
                contextObj.rbtnYearlyReccurencePatternCriteria.IsVisible = false;
                contextObj.ddlMonthlyDayNo.IsEnabled = false;
                contextObj.ddlMonthlyDayNo.IsVisible = false;
                contextObj.ddlMonthlyWeekOccurence.IsEnabled = false;
                contextObj.ddlMonthlyWeekOccurence.IsVisible = false;
                contextObj.ddlMonthlyWeekDay.IsEnabled = false;
                contextObj.ddlMonthlyWeekDay.IsVisible = false;
                contextObj.ddlYearlyDayNo.IsEnabled = false;
                contextObj.ddlYearlyDayNo.IsVisible = false;
                contextObj.ddlYearlyMonthDay.IsEnabled = false;
                contextObj.ddlYearlyMonthDay.IsVisible = false;
                contextObj.ddlYearlyWeekOccurence.IsEnabled = false;
                contextObj.ddlYearlyWeekOccurence.IsVisible = false;
                contextObj.ddlYearlyWeekDay.IsEnabled = false;
                contextObj.ddlYearlyWeekDay.IsVisible = false;
                contextObj.ddlYearlyMonthofYear.IsEnabled = false;
                contextObj.ddlYearlyMonthofYear.IsVisible = false;
                var element = this.el.nativeElement.getElementsByClassName("MainContainer_1373");
                element[0].style.margin = "0px";
                var element2 = this.el.nativeElement.getElementsByClassName("MainContainer_1374");
                element2[0].style.margin = "0px";
                var element3 = this.el.nativeElement.getElementsByClassName("MainContainer_1375");
                element3[0].style.margin = "0px";
                var element4 = this.el.nativeElement.getElementsByClassName("MainContainer_1376");
                element4[0].style.margin = "0px";
                var element5 = this.el.nativeElement.getElementsByClassName("MainContainer_1377");
                element5[0].style.margin = "0px";
                var element6 = this.el.nativeElement.getElementsByClassName("MainContainer_1378");
                element6[0].style.margin = "0px";
                var element7 = this.el.nativeElement.getElementsByClassName("MainContainer_1379");
                element7[0].style.margin = "0px";
                var element8 = this.el.nativeElement.getElementsByClassName("MainContainer_1380");
                element8[0].style.margin = "0px";
                var element9 = this.el.nativeElement.getElementsByClassName("Div-1380");
                if (element9.length != 0)
                    element9[0].style.margin = "0px;";
                break;
            case "2":
                contextObj.lstBxWeekDays.IsEnabled = true;
                contextObj.lstBxWeekDays.IsVisible = true;
                contextObj.lstBxWeekDays.FieldLabel = "";
                contextObj.rbtnMonthlyReccurencePatternCriteria.IsEnabled = false;
                contextObj.rbtnMonthlyReccurencePatternCriteria.IsVisible = false;
                contextObj.rbtnYearlyReccurencePatternCriteria.IsEnabled = false;
                contextObj.rbtnYearlyReccurencePatternCriteria.IsVisible = false;
                contextObj.ddlMonthlyDayNo.IsEnabled = false;
                contextObj.ddlMonthlyDayNo.IsVisible = false;
                contextObj.ddlMonthlyWeekOccurence.IsEnabled = false;
                contextObj.ddlMonthlyWeekOccurence.IsVisible = false;
                contextObj.ddlMonthlyWeekDay.IsEnabled = false;
                contextObj.ddlMonthlyWeekDay.IsVisible = false;
                contextObj.ddlYearlyDayNo.IsEnabled = false;
                contextObj.ddlYearlyDayNo.IsVisible = false;
                contextObj.ddlYearlyMonthDay.IsEnabled = false;
                contextObj.ddlYearlyMonthDay.IsVisible = false;
                contextObj.ddlYearlyWeekOccurence.IsEnabled = false;
                contextObj.ddlYearlyWeekOccurence.IsVisible = false;
                contextObj.ddlYearlyWeekDay.IsEnabled = false;
                contextObj.ddlYearlyWeekDay.IsVisible = false;
                contextObj.ddlYearlyMonthofYear.IsEnabled = false;
                contextObj.ddlYearlyMonthofYear.IsVisible = false;
                var element = this.el.nativeElement.getElementsByClassName("MainContainer_1373");
                element[0].style.margin = "0px";
                var element2 = this.el.nativeElement.getElementsByClassName("MainContainer_1374");
                element2[0].style.margin = "0px";
                var element3 = this.el.nativeElement.getElementsByClassName("MainContainer_1375");
                element3[0].style.margin = "0px";
                var element4 = this.el.nativeElement.getElementsByClassName("MainContainer_1376");
                element4[0].style.margin = "0px";
                var element5 = this.el.nativeElement.getElementsByClassName("MainContainer_1377");
                element5[0].style.margin = "0px";
                var element6 = this.el.nativeElement.getElementsByClassName("MainContainer_1378");
                element6[0].style.margin = "0px";
                var element7 = this.el.nativeElement.getElementsByClassName("MainContainer_1379");
                element7[0].style.margin = "0px";
                var element8 = this.el.nativeElement.getElementsByClassName("MainContainer_1380");
                element8[0].style.margin = "0px";
                var element9 = this.el.nativeElement.getElementsByClassName("Div-1380");
                if (element9.length != 0)
                    element9[0].style.margin = "0px;";
                break;
            case "3":
                contextObj.rbtnMonthlyReccurencePatternCriteria.IsEnabled = true;
                contextObj.rbtnMonthlyReccurencePatternCriteria.IsVisible = true;
                contextObj.rbtnMonthlyReccurencePatternCriteria.FieldLabel = "";
                contextObj.ddlMonthlyDayNo.IsVisible = true;
                contextObj.ddlMonthlyWeekOccurence.IsVisible = true;
                contextObj.ddlMonthlyWeekDay.IsVisible = true;
                contextObj.lstBxWeekDays.IsEnabled = false;
                contextObj.lstBxWeekDays.IsVisible = false;
                contextObj.lstBxWeekDays.MultiFieldValues = [];
                contextObj.rbtnYearlyReccurencePatternCriteria.IsEnabled = false;
                contextObj.rbtnYearlyReccurencePatternCriteria.IsVisible = false;
                contextObj.ddlYearlyDayNo.IsEnabled = false;
                contextObj.ddlYearlyDayNo.IsVisible = false;
                contextObj.ddlYearlyMonthDay.IsEnabled = false;
                contextObj.ddlYearlyMonthDay.IsVisible = false;
                contextObj.ddlYearlyWeekOccurence.IsEnabled = false;
                contextObj.ddlYearlyWeekOccurence.IsVisible = false;
                contextObj.ddlYearlyWeekDay.IsEnabled = false;
                contextObj.ddlYearlyWeekDay.IsVisible = false;
                contextObj.ddlYearlyMonthofYear.IsEnabled = false;
                contextObj.ddlYearlyMonthofYear.IsVisible = false;
                for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    switch (contextObj.fieldDetailsAddEdit[i].FieldId) {
                        case 1372:
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "5";
                            break;
                        case 1373:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1374:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1375:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                    }
                }
                var element = this.el.nativeElement.getElementsByClassName("MainContainer_1373");
                element[0].style.margin = "-68px 0px 0px 60px";
                var element2 = this.el.nativeElement.getElementsByClassName("MainContainer_1374");
                element2[0].style.margin = "-18px 0px 0px 60px";
                var element3 = this.el.nativeElement.getElementsByClassName("MainContainer_1375");
                element3[0].style.margin = "-54px 0px 0px 170px";
                var element3 = this.el.nativeElement.getElementsByClassName("Radio-1372");
                element3[0].style.display = "block";
                element3[1].style.display = "block";
                element3[2].style.display = "block";
                element3[0].style.padding = "5px 0px";
                element3[1].style.padding = "5px 0px";
                element3[2].style.padding = "5px 0px";
                var element4 = this.el.nativeElement.getElementsByClassName("MainContainer_1376");
                element4[0].style.margin = "0px";
                var element5 = this.el.nativeElement.getElementsByClassName("MainContainer_1377");
                element5[0].style.margin = "0px";
                var element6 = this.el.nativeElement.getElementsByClassName("MainContainer_1378");
                element6[0].style.margin = "0px";
                var element7 = this.el.nativeElement.getElementsByClassName("MainContainer_1379");
                element7[0].style.margin = "0px";
                var element8 = this.el.nativeElement.getElementsByClassName("MainContainer_1380");
                element8[0].style.margin = "0px";
                var element9 = this.el.nativeElement.getElementsByClassName("Div-1380");
                if (element9.length != 0)
                    element9[0].style.margin = "0px;";
                break;
            case "4":
                contextObj.rbtnYearlyReccurencePatternCriteria.IsEnabled = true;
                contextObj.rbtnYearlyReccurencePatternCriteria.IsVisible = true;
                contextObj.rbtnYearlyReccurencePatternCriteria.FieldLabel = "";
                contextObj.ddlYearlyDayNo.IsVisible = true;
                contextObj.ddlYearlyMonthDay.IsVisible = true;
                contextObj.ddlYearlyWeekOccurence.IsVisible = true;
                contextObj.ddlYearlyWeekDay.IsVisible = true;
                contextObj.ddlYearlyMonthofYear.IsVisible = true;
                contextObj.lstBxWeekDays.IsEnabled = false;
                contextObj.lstBxWeekDays.IsVisible = false;
                contextObj.lstBxWeekDays.MultiFieldValues = [];
                contextObj.rbtnMonthlyReccurencePatternCriteria.IsEnabled = false;
                contextObj.rbtnMonthlyReccurencePatternCriteria.IsVisible = false;
                contextObj.ddlMonthlyDayNo.IsEnabled = false;
                contextObj.ddlMonthlyDayNo.IsVisible = false;
                contextObj.ddlMonthlyWeekOccurence.IsEnabled = false;
                contextObj.ddlMonthlyWeekOccurence.IsVisible = false;
                contextObj.ddlMonthlyWeekDay.IsEnabled = false;
                contextObj.ddlMonthlyWeekDay.IsVisible = false;
                for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    switch (contextObj.fieldDetailsAddEdit[i].FieldId) {
                        case 1381:
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "8";
                            break;
                        case 1376:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1377:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1378:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1379:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1380:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "of";
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                    }
                }
                var elementPre = this.el.nativeElement.getElementsByClassName("MainContainer_1373");
                elementPre[0].style.margin = "0px";
                var elementPre2 = this.el.nativeElement.getElementsByClassName("MainContainer_1374");
                elementPre2[0].style.margin = "0px";
                var elementPre3 = this.el.nativeElement.getElementsByClassName("MainContainer_1375");
                elementPre3[0].style.margin = "0px";
                var element = this.el.nativeElement.getElementsByClassName("MainContainer_1376");
                element[0].style.margin = "-68px 0px 0px 60px";
                var element = this.el.nativeElement.getElementsByClassName("MainContainer_1377");
                element[0].style.margin = "-54px 0px 0px 160px";
                var element2 = this.el.nativeElement.getElementsByClassName("MainContainer_1378");
                element2[0].style.margin = "-18px 0px 0px 60px";
                var element3 = this.el.nativeElement.getElementsByClassName("MainContainer_1379");
                element3[0].style.margin = "-54px 0px 0px 160px";
                var element4 = this.el.nativeElement.getElementsByClassName("MainContainer_1380");
                element4[0].style.margin = "-40px 0px 0px 255px";
                var element6 = this.el.nativeElement.getElementsByClassName("Div-1380");
                if (element6.length != 0)
                    element6[0].style.margin = "-30px 0px 0px 20px";
                var element5 = this.el.nativeElement.getElementsByClassName("Radio-1381");
                element5[0].style.display = "block";
                element5[1].style.display = "block";
                element5[2].style.display = "block";
                element5[0].style.padding = "5px 0px";
                element5[1].style.padding = "5px 0px";
                element5[2].style.padding = "5px 0px";
                break;
            case "5":
                contextObj.lstBxWeekDays.IsEnabled = false;
                contextObj.lstBxWeekDays.IsVisible = false;
                contextObj.lstBxWeekDays.MultiFieldValues = [];
                contextObj.ddlMonthlyDayNo.IsEnabled = false;
                contextObj.ddlMonthlyWeekOccurence.IsEnabled = false;
                contextObj.ddlMonthlyWeekDay.IsEnabled = false;
                break;
            case "6":
                contextObj.ddlMonthlyDayNo.IsEnabled = true;
                contextObj.lstBxWeekDays.IsEnabled = false;
                contextObj.lstBxWeekDays.IsVisible = false;
                contextObj.lstBxWeekDays.MultiFieldValues = [];
                contextObj.ddlMonthlyWeekOccurence.IsEnabled = false;
                contextObj.ddlMonthlyWeekDay.IsEnabled = false;
                break;
            case "7":
                contextObj.ddlMonthlyWeekOccurence.IsEnabled = true;
                contextObj.ddlMonthlyWeekDay.IsEnabled = true;
                contextObj.lstBxWeekDays.IsEnabled = false;
                contextObj.lstBxWeekDays.IsVisible = false;
                contextObj.ddlMonthlyDayNo.IsEnabled = false;
                break;
            case "8":
                contextObj.ddlYearlyDayNo.IsEnabled = false;
                contextObj.ddlYearlyMonthDay.IsEnabled = false;
                contextObj.ddlYearlyWeekOccurence.IsEnabled = false;
                contextObj.ddlYearlyWeekDay.IsEnabled = false;
                contextObj.ddlYearlyMonthofYear.IsEnabled = false;
                break;
            case "9":
                contextObj.ddlYearlyDayNo.IsEnabled = true;
                contextObj.ddlYearlyMonthDay.IsEnabled = true;
                contextObj.ddlYearlyWeekOccurence.IsEnabled = false;
                contextObj.ddlYearlyWeekDay.IsEnabled = false;
                contextObj.ddlYearlyMonthofYear.IsEnabled = false;
                break;
            case "10":
                contextObj.ddlYearlyWeekOccurence.IsEnabled = true;
                this.ddlYearlyWeekDay.IsEnabled = true;
                contextObj.ddlYearlyMonthofYear.IsEnabled = true;
                contextObj.ddlMonthlyDayNo.IsEnabled = false;
                contextObj.ddlMonthlyWeekOccurence.IsEnabled = false;
                contextObj.ddlMonthlyWeekDay.IsEnabled = false;
                contextObj.ddlYearlyDayNo.IsEnabled = false;
                contextObj.ddlYearlyMonthDay.IsEnabled = false;
                break;
        }
    };
    MasterPMScheduleAddEditComponent.prototype.checkBoxChange = function (event) {
        var contextObj = this;
        if (event.chkBoxObject.fieldId == 1539) {
            contextObj.isMeterBased = event.chkBoxObject.IsChecked;
            if (contextObj.isMeterBased == true) {
                contextObj.ddlMeterField.IsEnabled = true;
                contextObj.ddlMeterField.IsVisible = true;
                contextObj.ddlMeterField.IsMandatory = true;
                contextObj.rbtnFrequency.IsVisible = true;
                contextObj.rbtnFrequency.IsMandatory = true;
                contextObj.ddlPerformOn.IsEnabled = false;
                contextObj.ddlPerformOn.IsVisible = false;
                contextObj.rbtnReccurencePattern.IsEnabled = false;
                contextObj.rbtnReccurencePattern.IsVisible = false;
                contextObj.rbtnMonthlyReccurencePatternCriteria.IsEnabled = false;
                contextObj.rbtnMonthlyReccurencePatternCriteria.IsVisible = false;
                contextObj.rbtnYearlyReccurencePatternCriteria.IsEnabled = false;
                contextObj.rbtnYearlyReccurencePatternCriteria.IsVisible = false;
                contextObj.ddlMonthlyDayNo.IsEnabled = false;
                contextObj.ddlMonthlyDayNo.IsVisible = false;
                contextObj.ddlMonthlyWeekOccurence.IsEnabled = false;
                contextObj.ddlMonthlyWeekOccurence.IsVisible = false;
                contextObj.ddlMonthlyWeekDay.IsEnabled = false;
                contextObj.ddlMonthlyWeekDay.IsVisible = false;
                contextObj.ddlYearlyDayNo.IsEnabled = false;
                contextObj.ddlYearlyDayNo.IsVisible = false;
                contextObj.ddlYearlyMonthDay.IsEnabled = false;
                contextObj.ddlYearlyMonthDay.IsVisible = false;
                contextObj.ddlYearlyWeekOccurence.IsEnabled = false;
                contextObj.ddlYearlyWeekOccurence.IsVisible = false;
                contextObj.ddlYearlyWeekDay.IsEnabled = false;
                contextObj.ddlYearlyWeekDay.IsVisible = false;
                contextObj.ddlYearlyMonthofYear.IsEnabled = false;
                contextObj.ddlYearlyMonthofYear.IsVisible = false;
                contextObj.lstBxSeasons.IsEnabled = false;
                contextObj.lstBxSeasons.IsVisible = false;
                for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    switch (contextObj.fieldDetailsAddEdit[i].FieldId) {
                        case 1406:
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1407:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            break;
                        case 1408:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            break;
                    }
                }
            }
            else if (contextObj.isMeterBased == false) {
                contextObj.ddlMeterField.IsEnabled = false;
                contextObj.ddlMeterField.IsVisible = false;
                contextObj.ddlMeterField.IsMandatory = false;
                contextObj.rbtnFrequency.IsVisible = false;
                contextObj.rbtnFrequency.IsMandatory = false;
                contextObj.ddlPerformOn.IsEnabled = true;
                contextObj.ddlPerformOn.IsVisible = true;
                contextObj.rbtnReccurencePattern.IsEnabled = true;
                contextObj.rbtnReccurencePattern.IsVisible = true;
                contextObj.lstBxSeasons.IsEnabled = true;
                contextObj.lstBxSeasons.IsVisible = true;
            }
        }
    };
    MasterPMScheduleAddEditComponent.prototype.fieldChange = function (event) {
        var contextObj = this;
        var fieldLabel = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldLabel"];
        if (this.action == "add") {
            if (fieldLabel == "Equipment Category") {
                this.equipmentCategoryId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
                var equipmentCategoryFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
                this.ddlEquipmentClass.FieldValue = "-1";
                this.ddlEquipmentClass.LookupDetails.LookupValues = [];
                if (this.equipmentCategoryId > -1 && equipmentCategoryFieldId == 1537) {
                    this.ddlEquipmentClass.IsMandatory = true;
                    this.ddlEquipmentClass.HasValidationError = true;
                    this.ddlEquipmentClass.IsLocallyValidated = false;
                    this.ddlEquipmentClass.IsEnabled = true;
                    this.ddlEquipmentClass.IsVisible = true;
                    this.workOrdereService.loadEquipmentClassForMasterPM(this.equipmentCategoryId, equipmentCategoryFieldId).subscribe(function (resultData) {
                        if (resultData["Data"]["LookupValues"] != "") {
                            contextObj.ddlEquipmentClass.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                        }
                    });
                }
                else {
                    this.ddlEquipmentClass.IsMandatory = false;
                    this.ddlEquipmentClass.HasValidationError = false;
                    this.ddlEquipmentClass.IsEnabled = false;
                    this.ddlEquipmentClass.IsVisible = true;
                    this.clearFieldDetails();
                }
            }
            else if (fieldLabel == "Equipment Class") {
                this.equipmentClassId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
                var equipmentClassFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
                if (this.equipmentClassId == -1 && equipmentClassFieldId == 1538) {
                    this.clearFieldDetails();
                }
            }
        }
        else if (this.action == "edit") {
            if (fieldLabel == "Equipment Category") {
                this.equipmentCategoryId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
                var equipmentCategoryFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
                this.ddlEquipmentClass.FieldValue = "-1";
                this.ddlEquipmentClass.LookupDetails.LookupValues = [];
                if (this.equipmentCategoryId > -1 && equipmentCategoryFieldId == 1537) {
                    this.ddlEquipmentClass.IsMandatory = true;
                    this.ddlEquipmentClass.HasValidationError = true;
                    this.ddlEquipmentClass.IsLocallyValidated = false;
                    this.ddlEquipmentClass.IsEnabled = true;
                    this.ddlEquipmentClass.IsVisible = true;
                    this.workOrdereService.loadEquipmentClassForMasterPM(this.equipmentCategoryId, equipmentCategoryFieldId).subscribe(function (resultData) {
                        if (resultData["Data"]["LookupValues"] != "") {
                            contextObj.ddlEquipmentClass.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                        }
                    });
                }
                else {
                    this.ddlEquipmentClass.IsMandatory = false;
                    this.ddlEquipmentClass.HasValidationError = false;
                    this.ddlEquipmentClass.IsEnabled = false;
                    this.ddlEquipmentClass.IsVisible = true;
                    this.clearFieldDetails();
                }
            }
            else if (fieldLabel == "Equipment Class") {
                this.equipmentClassId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
                var equipmentClassFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
                if (this.equipmentClassId == -1 && equipmentClassFieldId == 1538) {
                    this.clearFieldDetails();
                }
            }
        }
    };
    MasterPMScheduleAddEditComponent.prototype.clearFieldDetails = function () {
        this.ddlPerformOn.FieldValue = "1";
        this.rbtnReccurencePattern.FieldValue = "1";
        this.lstBxWeekDays.IsEnabled = false;
        this.lstBxWeekDays.IsVisible = false;
        this.lstBxWeekDays.MultiFieldValues = [];
        this.rbtnMonthlyReccurencePatternCriteria.IsEnabled = false;
        this.rbtnMonthlyReccurencePatternCriteria.IsVisible = false;
        this.rbtnMonthlyReccurencePatternCriteria.FieldValue = "5";
        this.rbtnYearlyReccurencePatternCriteria.IsEnabled = false;
        this.rbtnYearlyReccurencePatternCriteria.IsVisible = false;
        this.rbtnYearlyReccurencePatternCriteria.FieldValue = "8";
        this.ddlMonthlyDayNo.IsEnabled = false;
        this.ddlMonthlyDayNo.IsVisible = false;
        this.ddlMonthlyDayNo.FieldValue = "1";
        this.ddlMonthlyWeekOccurence.IsEnabled = false;
        this.ddlMonthlyWeekOccurence.IsVisible = false;
        this.ddlMonthlyWeekOccurence.FieldValue = "1";
        this.ddlMonthlyWeekDay.IsEnabled = false;
        this.ddlMonthlyWeekDay.IsVisible = false;
        this.ddlMonthlyWeekDay.FieldValue = "1";
        this.ddlYearlyDayNo.IsEnabled = false;
        this.ddlYearlyDayNo.IsVisible = false;
        this.ddlYearlyDayNo.FieldValue = "1";
        this.ddlYearlyMonthDay.IsEnabled = false;
        this.ddlYearlyMonthDay.IsVisible = false;
        this.ddlYearlyMonthDay.FieldValue = "1";
        this.ddlYearlyWeekOccurence.IsEnabled = false;
        this.ddlYearlyWeekOccurence.IsVisible = false;
        this.ddlYearlyWeekOccurence.FieldValue = "1";
        this.ddlYearlyWeekDay.IsEnabled = false;
        this.ddlYearlyWeekDay.IsVisible = false;
        this.ddlYearlyWeekDay.FieldValue = "1";
        this.ddlYearlyMonthofYear.IsEnabled = false;
        this.ddlYearlyMonthofYear.IsVisible = false;
        this.ddlYearlyMonthofYear.FieldValue = "1";
        this.lstBxSeasons.MultiFieldValues = [];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MasterPMScheduleAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MasterPMScheduleAddEditComponent.prototype, "submitSuccess", void 0);
    MasterPMScheduleAddEditComponent = __decorate([
        core_1.Component({
            selector: 'masterpm-addedit',
            templateUrl: 'app/Views/WorkOrder/Maintenance/masterpm-addedit.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            providers: [workorder_service_1.WorkOrdereService, notify_service_1.NotificationService],
            inputs: ['selectedId', 'action', 'fieldDetailsAddEdit', 'btnName']
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, core_1.ElementRef])
    ], MasterPMScheduleAddEditComponent);
    return MasterPMScheduleAddEditComponent;
}());
exports.MasterPMScheduleAddEditComponent = MasterPMScheduleAddEditComponent;
//# sourceMappingURL=masterpm-addedit.js.map