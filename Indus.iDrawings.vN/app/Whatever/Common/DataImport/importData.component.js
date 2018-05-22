var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../../models/common/general.ts" />
var core_1 = require('@angular/core');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var configure_component_1 = require('./configure.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var exporttoexcel_service_1 = require('../../../Framework/Models/Export/exporttoexcel.service');
var objects_service_1 = require('../../../Models/Objects/objects.service');
var ImportDataComponent = (function () {
    function ImportDataComponent(administrationService, objectsService, _notificationService, confirmationService, generFun, exportObject) {
        this.administrationService = administrationService;
        this.objectsService = objectsService;
        this._notificationService = _notificationService;
        this.confirmationService = confirmationService;
        this.generFun = generFun;
        this.exportObject = exportObject;
        this.importGridFieldObject = [];
        this.moduleId = 0;
        this.addtnlcategoryId = 0;
        this.classId = 0;
        this.showField = false;
        this.showExcel = false;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.splitViewTarget = false;
        this.splitViewGridTarget = false;
        this.inputItems = { dataKey: "Id", allowAdd: false, allowEdit: false, sortDir: '', sortCol: '' };
        this.enableMenu = [1];
        this.splitViewTitle = "";
        this.drawingCategoryValue = "-1";
        this.slideMsg = "";
        this.attributeStatus = false;
        this.classIdValue = "-1";
        this.className = "";
        this.showSlide = false;
        this.Position = "top-right";
        this.width = 300;
        this.disabled = false;
        this.sheetName = "";
        this.importLoading = false;
        this.change = false;
        this.menumock = [
            {
                "id": 1,
                "title": "Export",
                "image": "Export",
                "path": "Export",
                "submenu": null,
                "privilegeId": null
            }
        ];
    }
    ImportDataComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.strAllowedExtensions = [".xls", ".xlsx"];
        this.administrationService.loadDataImportControls(0).subscribe(function (resultData) {
            contextObj.imprtCategoryfield = resultData["Data"].filter(function (el) {
                if (el.FieldId == 1620) {
                    el.FieldLabel = "Entity";
                    return true;
                }
                else
                    return false;
            });
        });
        contextObj.fieldObject = contextObj.imprtCategoryfield;
    };
    ImportDataComponent.prototype.ngDoCheck = function () {
    };
    ImportDataComponent.prototype.ngOnChanges = function (changes) {
    };
    ImportDataComponent.prototype.dropDownChange = function (value) {
        var contextObj = this;
        if (value.ddlRelationShipEvent.ChildFieldObject.FieldId == 1620) {
            contextObj.showField = false;
            contextObj.showExcel = false;
            if (value.ddlRelationShipEvent.ChildFieldObject.FieldValue != "-1") {
                contextObj.importcategoryId = value.ddlRelationShipEvent.ChildFieldObject.FieldValue;
                contextObj.createFieldControls(contextObj, contextObj.importcategoryId);
                contextObj.administrationService.GetImportTepmlate(contextObj.importcategoryId, contextObj.moduleId, "Default").subscribe(function (resultData1) {
                    contextObj.templateId = resultData1["Data"];
                });
                contextObj.administrationService.GetImportColumns(contextObj.importcategoryId, contextObj.addtnlcategoryId, contextObj.classIdValue, contextObj.drawingCategoryValue).subscribe(function (resultData) {
                    contextObj.importColumnsList = JSON.parse(resultData["Data"]["FieldBinderData"]);
                });
            }
            else {
                contextObj.importControlfield = [];
                contextObj.mappingtable = [];
            }
        }
        if (value.ddlRelationShipEvent.ChildFieldObject.FieldId == 1618) {
            contextObj.showField = false;
            contextObj.showExcel = false;
            contextObj.showField = true;
            var shtName = this.strSheetName[value.ddlRelationShipEvent.ChildFieldObject.FieldValue];
            contextObj.sheetName = shtName;
            if (shtName != undefined) {
                contextObj.showExcel = true;
                contextObj.administrationService.readExcel(this.fileData, shtName).subscribe(function (resultData) {
                    contextObj.disabled = false;
                    contextObj.excelData = JSON.parse(resultData[1]);
                    contextObj.importDataFromExcel = JSON.parse(resultData[0]);
                    var excelClmnNames = "";
                    ;
                    for (var i in contextObj.excelData[0])
                        excelClmnNames = excelClmnNames + [contextObj.excelData[0][i]] + "^";
                    if (excelClmnNames == "^") {
                        contextObj.disabled = true;
                        contextObj._notificationService.ShowToaster("No data found in the selected Worksheet", 3);
                    }
                    contextObj.excelColumnNames = excelClmnNames;
                    contextObj.reloadConfigMapping(true);
                });
            }
        }
        if (value.ddlRelationShipEvent.ChildFieldObject.FieldId == 1791) {
            this.drawingCategoryValue = value.ddlRelationShipEvent.ChildFieldObject.FieldValue;
            this.assetFiledChange();
            contextObj.reloadConfigMapping(true);
        }
        if (value.ddlRelationShipEvent.ChildFieldObject.FieldId == 1793) {
            contextObj.classIdValue = value.ddlRelationShipEvent.ChildFieldObject.FieldValue;
            if (contextObj.classIdValue != "-1") {
                value.ddlRelationShipEvent.ChildFieldObject.LookupDetails.LookupValues.find(function (el) {
                    if (+el.Id == +value.ddlRelationShipEvent.ChildFieldObject.FieldValue) {
                        contextObj.className = el.Value;
                        return true;
                    }
                });
            }
            else {
                contextObj.className = "";
            }
            contextObj.reloadConfigMapping(true);
        }
    };
    ImportDataComponent.prototype.onRbnChange = function (value) {
        if (value.rbtnObject.fieldobject.FieldValue == "41" || value.rbtnObject.fieldobject.FieldValue == "39") {
            var contextObj = this;
            contextObj.importControlfield.filter(function (el) {
                if (el.FieldId == 1793) {
                    contextObj.classIdValue = "-1";
                    if (value.rbtnObject.fieldobject.FieldValue == "41") {
                        contextObj.attributeStatus = true;
                        el.ReadOnlyMode = false;
                        el.IsEnabled = true;
                        var catg = 0;
                        if (contextObj.importcategoryId == 6)
                            catg = 1;
                        if (contextObj.importcategoryId == 7)
                            catg = 2;
                        contextObj.objectsService.getObjectClassDisplaySettings(1, "", 1, 1, 0).subscribe(function (resultData) {
                            el.LookupDetails.LookupValues = JSON.parse(resultData["Data"].FieldBinderData);
                            contextObj.reloadConfigMapping(true);
                        });
                    }
                    else {
                        contextObj.attributeStatus = false;
                        el.LookupDetails.LookupValues = [];
                        el.FieldValue = "-1";
                        el.ReadOnlyMode = true;
                        el.IsEnabled = false;
                        contextObj.reloadConfigMapping(true);
                    }
                }
                return true;
            });
        }
    };
    ImportDataComponent.prototype.onCancel = function () {
        this.splitViewTarget = false;
        this.splitviewInput.showSecondaryView = false;
        this.splitviewInput.secondaryArea = 70;
        this.splitViewGridTarget = false;
    };
    ImportDataComponent.prototype.loadSource = function (contextObj) {
        contextObj.importGridFieldObject = [];
        var itemSrc = contextObj.mappingtable;
        if (contextObj.mappingtable) {
            var fldObjectwthoutRef = JSON.parse(JSON.stringify(contextObj.imprtCategoryfield));
            for (var i = 0; i < itemSrc.length; i++) {
                fldObjectwthoutRef = JSON.parse(JSON.stringify(fldObjectwthoutRef));
                if (itemSrc[i]["iDrawingsColumns"] != "Not Selected") {
                    fldObjectwthoutRef[0].FieldValue = itemSrc[i]["ExcelColumns"];
                    fldObjectwthoutRef[0].FieldLabel = itemSrc[i]["ExcelColumns"];
                    contextObj.importGridFieldObject.push(fldObjectwthoutRef[0]);
                }
            }
            fldObjectwthoutRef = JSON.parse(JSON.stringify(fldObjectwthoutRef));
            fldObjectwthoutRef[0].FieldValue = "Comment";
            fldObjectwthoutRef[0].FieldLabel = "Comment";
            contextObj.importGridFieldObject.push(fldObjectwthoutRef[0]);
        }
    };
    ImportDataComponent.prototype.getFileData = function (value) {
        var contextObj = this;
        contextObj.showExcel = false;
        contextObj.fileData = value;
        contextObj.administrationService.readExcel(value, "").subscribe(function (resultData) {
            //contextObj.excelData = JSON.parse(resultData["Data"][1]);    
            contextObj.strSheetName = JSON.parse(resultData[0]);
            contextObj.importControlfield.filter(function (el) {
                if (el["FieldId"] == 1618) {
                    var lookupValues = new Array();
                    el.LookupDetails.LookupValues;
                    var count = 0;
                    contextObj.strSheetName = contextObj.strSheetName.filter(function (el) {
                        if (el.indexOf("FilterDataba") == -1) {
                            lookupValues.push({
                                Id: count,
                                Value: el.substring(0, el.length - 1)
                            });
                            count = count + 1;
                            return true;
                        }
                        else
                            return false;
                    });
                    el.LookupDetails.LookupValues = lookupValues;
                    el.FieldValue = "-1";
                }
                return true;
            });
        });
    };
    ImportDataComponent.prototype.reloadConfigMapping = function (initial) {
        var contextObj = this;
        if (initial != true) {
            this._notificationService.ShowToaster("Column Mappings saved", 3);
            contextObj.splitViewTarget = false;
            contextObj.splitviewInput.showSecondaryView = false;
            contextObj.splitviewInput.secondaryArea = 70;
        }
        if (contextObj.classIdValue == "-1") {
            contextObj.classId = 0;
        }
        else {
            contextObj.classId = +contextObj.classIdValue;
        }
        contextObj.administrationService.GetSavedImportColumns(contextObj.excelColumnNames, contextObj.importcategoryId, 0).subscribe(function (resultData1) {
            var excelMappingTableData = new Array();
            var resultData = JSON.parse(resultData1["Data"]["FieldBinderData"]);
            resultData.filter(function (el) {
                var res = el["Mappings"].split("^");
                excelMappingTableData.push({
                    ExcelColumns: res[0],
                    iDrawingsColumns: res[1],
                    ReportFieldId: el["ReportFieldId"],
                    PositionNo: el["PositionNo"]
                });
                return true;
            });
            contextObj.mappingtable = excelMappingTableData;
        });
    };
    ImportDataComponent.prototype.onConfigure = function () {
        this.splitviewInput.secondaryArea = 70;
        this.splitViewTarget = true;
        this.splitViewGridTarget = false;
        this.splitviewInput.showSecondaryView = false;
        var contextObj = this;
        if (contextObj.importcategoryId != 6 || (contextObj.importcategoryId == 6 && contextObj.drawingCategoryValue != "-1")) {
            if (contextObj.attributeStatus == false || (contextObj.attributeStatus == true && contextObj.classIdValue != "-1")) {
                debugger;
                contextObj.administrationService.GetImportColumns(contextObj.importcategoryId, contextObj.addtnlcategoryId, contextObj.classIdValue, contextObj.drawingCategoryValue).subscribe(function (resultData) {
                    debugger;
                    contextObj.importColumnsList = JSON.parse(resultData["Data"]["FieldBinderData"]);
                    contextObj.splitviewInput.secondaryArea = 70;
                    contextObj.splitViewTarget = true;
                    contextObj.splitviewInput.showSecondaryView = true;
                    if (contextObj.importcategoryId == 2) {
                        contextObj.splitViewTitle = "Map Space Details";
                    }
                    if (contextObj.importcategoryId == 4) {
                        contextObj.splitViewTitle = "Map Employee Details";
                    }
                    if (contextObj.importcategoryId == 6) {
                        contextObj.splitViewTitle = "Map Asset Details";
                    }
                    if (contextObj.importcategoryId == 21) {
                        contextObj.splitViewTitle = "Map User Details";
                    }
                    if (contextObj.importcategoryId == 7) {
                        contextObj.splitViewTitle = "Map Furniture Details";
                    }
                    if (contextObj.importcategoryId == 8) {
                        contextObj.splitViewTitle = "Map Electrical Details";
                    }
                    if (contextObj.importcategoryId == 9) {
                        contextObj.splitViewTitle = "Map Mechanical Details";
                    }
                    if (contextObj.importcategoryId == 10) {
                        contextObj.splitViewTitle = "Map Plumbing Details";
                    }
                    if (contextObj.importcategoryId == 12) {
                        contextObj.splitViewTitle = "Map Fire & Safety Details";
                    }
                    if (contextObj.importcategoryId == 5) {
                        contextObj.splitViewTitle = "Map Telecom Details";
                    }
                });
            }
            else {
                contextObj._notificationService.ShowToaster("Select a Class Specific", 2);
            }
        }
        else {
            contextObj._notificationService.ShowToaster("Select a Drawing Category", 2);
        }
    };
    ImportDataComponent.prototype.createFieldControls = function (contextObj, id) {
        debugger;
        contextObj.showField = true;
        if (contextObj.importcategoryId == 2) {
            contextObj.splitViewTitle = "Map Space Details";
            contextObj.moduleId = 3;
            contextObj.addtnlcategoryId = 7;
            contextObj.classId = 0;
            contextObj.drawingCategoryValue = "-1";
        }
        if (contextObj.importcategoryId == 3) {
            contextObj.splitViewTitle = "Map Document Details";
            contextObj.moduleId = 4;
            contextObj.addtnlcategoryId = 5;
            contextObj.classId = 0;
            contextObj.drawingCategoryValue = "-1";
        }
        if (contextObj.importcategoryId == 4) {
            contextObj.splitViewTitle = "Map Employee Details";
            contextObj.moduleId = 5;
            contextObj.addtnlcategoryId = 8;
            contextObj.classId = 0;
            contextObj.drawingCategoryValue = "-1";
        }
        if (contextObj.importcategoryId == 6) {
            contextObj.splitViewTitle = "Map Asset Details";
            contextObj.moduleId = 7;
            contextObj.addtnlcategoryId = 1;
            contextObj.classId = 0;
            contextObj.drawingCategoryValue = "-1";
        }
        if (contextObj.importcategoryId == 7) {
            contextObj.splitViewTitle = "Map Furniture Details";
            contextObj.moduleId = 8;
            contextObj.addtnlcategoryId = 2;
            contextObj.classId = 0;
            contextObj.drawingCategoryValue = "-1";
        }
        if (contextObj.importcategoryId == 21) {
            contextObj.splitViewTitle = "Map User Details";
            contextObj.moduleId = 0;
            contextObj.addtnlcategoryId = 0;
            contextObj.classId = 0;
            contextObj.drawingCategoryValue = "-1";
        }
        if (contextObj.importcategoryId == 5) {
            contextObj.splitViewTitle = "Map Telecom Details";
            contextObj.moduleId = 6;
            contextObj.addtnlcategoryId = 3;
            contextObj.classId = 0;
            contextObj.drawingCategoryValue = "-1";
        }
        if (contextObj.importcategoryId == 8) {
            contextObj.splitViewTitle = "Map Electrical Details";
            contextObj.moduleId = 17;
            contextObj.addtnlcategoryId = 8;
            contextObj.classId = 0;
            contextObj.drawingCategoryValue = "-1";
        }
        if (contextObj.importcategoryId == 9) {
            contextObj.splitViewTitle = "Map Mechanical Details";
            contextObj.moduleId = 25;
            contextObj.addtnlcategoryId = 10;
            contextObj.classId = 0;
            contextObj.drawingCategoryValue = "-1";
        }
        if (contextObj.importcategoryId == 10) {
            contextObj.splitViewTitle = "Map Plumbing Details";
            contextObj.moduleId = 26;
            contextObj.addtnlcategoryId = 11;
            contextObj.classId = 0;
            contextObj.drawingCategoryValue = "-1";
        }
        if (contextObj.importcategoryId == 12) {
            contextObj.splitViewTitle = "Map Fire & Safety Details";
            contextObj.moduleId = 18;
            contextObj.addtnlcategoryId = 9;
            contextObj.classId = 0;
            contextObj.drawingCategoryValue = "-1";
        }
        contextObj.administrationService.loadDataImportControls(contextObj.moduleId).subscribe(function (resultData) {
            if (contextObj.importcategoryId == 2) {
                contextObj.importControlfield = resultData["Data"].filter(function (el) {
                    if (el.FieldId != 1620 && el.FieldId != 1678 && el.FieldId != 1791 && el.FieldId != 1792 && el.FieldId != 1793 && el.FieldId != 1794) {
                        if (el.FieldId == 1654) {
                            el.FieldValue = "32";
                        }
                        return true;
                    }
                    else {
                        return false;
                    }
                });
            }
            else if (contextObj.importcategoryId == 3) {
                contextObj.importControlfield = resultData["Data"].filter(function (el) {
                    if (el.FieldId != 1620 && el.FieldId != 1791 && el.FieldId != 1792 && el.FieldId != 1793 && el.FieldId != 1794 && el.FieldId != 1654) {
                        if (el.FieldId == 2981) {
                            el.IsVisible = true;
                        }
                        if (el.FieldId == 1678) {
                            el.FieldValue = "37";
                        }
                        return true;
                    }
                    else {
                        return false;
                    }
                });
            }
            else if (contextObj.importcategoryId == 4) {
                contextObj.importControlfield = resultData["Data"].filter(function (el) {
                    if (el.FieldId != 1620 && el.FieldId != 1791 && el.FieldId != 1792 && el.FieldId != 1793 && el.FieldId != 1794) {
                        if (el.FieldId == 1654) {
                            el.FieldValue = "32";
                        }
                        if (el.FieldId == 1678) {
                            el.FieldValue = "37";
                        }
                        return true;
                    }
                    else {
                        return false;
                    }
                });
            }
            else if (contextObj.importcategoryId == 21) {
                contextObj.importControlfield = resultData["Data"].filter(function (el) {
                    if (el.FieldId == 1617 || el.FieldId == 1618) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
            }
            else if (contextObj.importcategoryId == 6 || contextObj.importcategoryId == 7 || contextObj.importcategoryId == 5 || contextObj.importcategoryId == 8 || contextObj.importcategoryId == 9 || contextObj.importcategoryId == 10 || contextObj.importcategoryId == 12) {
                debugger;
                contextObj.importControlfield = resultData["Data"].filter(function (el) {
                    if (el.FieldId != 1620) {
                        if (el.FieldId == 1654) {
                            if (contextObj.classIdValue != "1") {
                                el.ReadOnlyMode = true;
                                el.IsEnabled = false;
                            }
                            else {
                                el.ReadOnlyMode = false;
                                el.IsEnabled = true;
                            }
                            el.FieldValue = "32";
                        }
                        if (el.FieldId == 1678) {
                            //if (contextObj.classIdValue != "1") {
                            //    el.ReadOnlyMode = true;
                            //    el.IsEnabled = false;
                            //}
                            //else {
                            //    el.ReadOnlyMode = false;
                            //    el.IsEnabled = true;
                            //}
                            el.FieldValue = "37";
                        }
                        if (el.FieldId == 1792) {
                            el.FieldValue = "39";
                        }
                        if (el.FieldId == 1793) {
                            el.IsHiddenLabel = true;
                        }
                        if (el.FieldId == 1794) {
                            if (contextObj.classIdValue == "1") {
                                el.ReadOnlyMode = true;
                                el.IsEnabled = false;
                            }
                            else {
                                el.ReadOnlyMode = false;
                                el.IsEnabled = true;
                            }
                            el.FieldValue = "42";
                        }
                        if (el.FieldId == 1791 || el.FieldId == 1794 || el.FieldId == 1792 || el.FieldId == 1793) {
                            el.IsVisible = true;
                        }
                        return true;
                    }
                    else {
                        return false;
                    }
                });
            }
        });
    };
    ImportDataComponent.prototype.assetFiledChange = function () {
        var contextObj = this;
        this.importControlfield.filter(function (el) {
            if (el.FieldId == 1654) {
                if (contextObj.drawingCategoryValue != "1") {
                    el.ReadOnlyMode = true;
                    el.IsEnabled = false;
                }
                else {
                    el.ReadOnlyMode = false;
                    el.IsEnabled = true;
                }
            }
            //if (el.FieldId == 1678) {
            //    if (contextObj.drawingCategoryValue != "1") {
            //        el.ReadOnlyMode = true;
            //        el.IsEnabled = false;
            //    }
            //    else {
            //        el.ReadOnlyMode = false;
            //        el.IsEnabled = true;
            //    }
            //}
            if (el.FieldId == 1794) {
                if (contextObj.drawingCategoryValue == "1") {
                    el.ReadOnlyMode = true;
                    el.IsEnabled = false;
                }
                else {
                    el.ReadOnlyMode = false;
                    el.IsEnabled = true;
                }
            }
            return true;
        });
    };
    ImportDataComponent.prototype.onSecondaryClose = function () {
        this.splitViewGridTarget = false;
        this.splitviewInput.showSecondaryView = false;
        this.splitviewInput.secondaryArea = 70;
        this.splitViewTarget = false;
    };
    ImportDataComponent.prototype.userValidation = function () {
        var firstName = false;
        var lastName = false;
        var email = false;
        var loginName = false;
        var accountActivationDate = false;
        var accountExpiryDate = false;
        var userRole = false;
        var errorMsg = "";
        var reportIds = [];
        var VarSPAssnmntType = false;
        var errorMsg = "";
        var spaceExcelMappingDetails = "";
        var relationStaus = false;
        var itemSourceFieldObject = [];
        var importColumns = [];
        var submitValues = new Array();
        var contextObj = this;
        this.mappingtable.filter(function (el) {
            //Site;Building;Floor;Room No;"
            debugger;
            if (el["iDrawingsColumns"] == "First Name") {
                firstName = true;
            }
            else if (el["iDrawingsColumns"] == "Last Name") {
                lastName = true;
            }
            else if (el["iDrawingsColumns"] == "Email") {
                email = true;
            }
            //else if (el["iDrawingsColumns"] == "Login Name") {
            //    loginName = true
            //}
            //else if (el["iDrawingsColumns"] == "Account Activation Date") {
            //    accountActivationDate = true
            //}
            //else if (el["iDrawingsColumns"] == "Account Expiry Date") {
            //    accountExpiryDate = true
            //}
            //else if (el["iDrawingsColumns"] == "User Role") {
            //    userRole = true
            //}
            return true;
        });
        if (firstName != true)
            errorMsg = "First Name";
        if (lastName != true) {
            if (errorMsg.length == 0)
                errorMsg = "Last Name";
            else
                errorMsg = errorMsg + ", Last Name";
        }
        if (email != true) {
            if (errorMsg.length == 0)
                errorMsg = "Email";
            else
                errorMsg = errorMsg + ", Email";
        }
        //if (loginName != true) {
        //    if (errorMsg.length == 0)
        //        errorMsg = "Login Name";
        //    else
        //    errorMsg = errorMsg + ", Login Name";
        //}
        //if (accountActivationDate != true) {
        //    if (errorMsg.length == 0)
        //        errorMsg = "Account Activation Date";
        //    else
        //        errorMsg = errorMsg + ", Account Activation Date";
        //}
        //if (accountExpiryDate != true) {
        //    if (errorMsg.length == 0)
        //        errorMsg = "Account Expiry Date";
        //    else
        //        errorMsg = errorMsg + ", Account Expiry Date";
        //}
        //if (userRole != true) {
        //    if (errorMsg.length == 0)
        //        errorMsg = "User Role";
        //    else
        //        errorMsg = errorMsg + ", User Role";
        //}
        if (errorMsg.length == 0) {
            contextObj.slideMsg = "Data from the Excel sheet is going to be imported to iDrawings. Click 'OK' to proceed.";
            contextObj.width = 300;
            contextObj.change = !this.change;
            contextObj.showSlide = !this.showSlide;
        }
        else {
            this._notificationService.ShowToaster("Mandatory fields " + errorMsg + " missing", 2);
        }
    };
    ImportDataComponent.prototype.spaceValidation = function () {
        var siteStatus = false;
        var bldngStatus = false;
        var floorStatus = false;
        var spkRmnStatus = false;
        var varspstd = false;
        var varsc = false;
        var VarSPAssnmntType = false;
        var reportIds = [];
        var errorMsg = "";
        var spaceExcelMappingDetails = "";
        var relationStaus = false;
        var itemSourceFieldObject = [];
        var importColumns = [];
        var submitValues = new Array();
        var contextObj = this;
        this.mappingtable.filter(function (el) {
            //Site;Building;Floor;Room No;"
            if (el["iDrawingsColumns"] == "Site") {
                siteStatus = true;
            }
            else if (el["iDrawingsColumns"] == "Building") {
                bldngStatus = true;
            }
            else if (el["iDrawingsColumns"] == "Floor") {
                floorStatus = true;
            }
            else if (el["iDrawingsColumns"] == "Space Key" || el["iDrawingsColumns"] == "Room No" || el["iDrawingsColumns"] == "BOMA Handle") {
                spkRmnStatus = true;
                if (contextObj.importControlfield[2].FieldValue == "32") {
                    if (el["iDrawingsColumns"] == "Room No")
                        relationStaus = true;
                }
                if (contextObj.importControlfield[2].FieldValue == "33") {
                    if (el["iDrawingsColumns"] == "Space Key")
                        relationStaus = true;
                }
                if (contextObj.importControlfield[2].FieldValue == "34") {
                    if (el["iDrawingsColumns"] == "BOMA Handle")
                        relationStaus = true;
                }
            }
            else if (el["iDrawingsColumns"] == "Space Standard") {
                varspstd = true;
            }
            else if (el["iDrawingsColumns"] == "Seating Capacity") {
                varsc = true;
            }
            else if (el["iDrawingsColumns"] == "Space Assignment Type") {
                VarSPAssnmntType = true;
            }
            return true;
        });
        if (siteStatus != true)
            errorMsg = "Site";
        if (bldngStatus != true) {
            if (errorMsg.length == 0)
                errorMsg = "Building";
            else
                errorMsg = errorMsg + ", Building";
        }
        if (floorStatus != true) {
            if (errorMsg.length == 0)
                errorMsg = "Floor";
            else
                errorMsg = errorMsg + ", Floor";
        }
        if (spkRmnStatus != true) {
            if (errorMsg.length == 0)
                errorMsg = "Space Key/Room No/Space Handle";
            else
                errorMsg = errorMsg + ", Space Key/Room No/Space Handle";
        }
        if (VarSPAssnmntType == true) {
            if (varsc == false) {
                if (errorMsg.length == 0)
                    errorMsg = "Seating Capacity";
                else
                    errorMsg = errorMsg + ", Seating Capacity";
            }
        }
        if (varsc == true) {
            if (VarSPAssnmntType == false) {
                if (errorMsg.length == 0)
                    errorMsg = "Space Assignment Type";
                else
                    errorMsg = errorMsg + ", Space Assignment Type";
            }
        }
        //if (spkRmnStatus == true) {//for Bug 77055
        //    for (let i = 0; i < contextObj.importDataFromExcel.length; i++) {
        //        if (contextObj.importDataFromExcel[i]["Space Assignment Type"] == "Hoteling" || contextObj.importDataFromExcel[i]["Space Assignment Type"] == "Special Use Room") {
        //            if (contextObj.importDataFromExcel[i]["Room No."] == null || contextObj.importDataFromExcel[i]["Room No."] == undefined) {
        //                if (errorMsg.length == 0)
        //                    errorMsg = "Room No";
        //                else
        //                    errorMsg = errorMsg + ", Room No";
        //                break;
        //            }
        //        }
        //    }
        //}
        if (errorMsg.length == 0) {
            var contextObj = this;
            if (relationStaus == true) {
                contextObj.slideMsg = "Data from the Excel sheet is going to be imported to iDrawings. Click 'OK' to proceed.";
                contextObj.width = 300;
                contextObj.change = !this.change;
                contextObj.showSlide = !this.showSlide;
            }
            else {
                if (contextObj.importControlfield[2].FieldValue == "33") {
                    this._notificationService.ShowToaster("Space Key field has to be mapped as it is the 'Related by' field", 2);
                }
                if (contextObj.importControlfield[2].FieldValue == "32") {
                    this._notificationService.ShowToaster("Room No. field has to be mapped as it is the 'Related by' field", 2);
                }
                if (contextObj.importControlfield[2].FieldValue == "34") {
                    this._notificationService.ShowToaster("Space Handle field has to be mapped as it is the 'Related by' field", 2);
                }
            }
        }
        else {
            this._notificationService.ShowToaster("Mandatory fields " + errorMsg + " missing", 2);
        }
    };
    ImportDataComponent.prototype.employeeValidation = function () {
        var siteStatus = false;
        var bldngStatus = false;
        var floorStatus = false;
        var spkRmnStatus = false;
        var varfrstname = false;
        var varlstName = false;
        var varCode = false;
        var reportIds = [];
        var errorMsg = "";
        var spaceExcelMappingDetails = "";
        var relationStaus = false;
        var relationByneeded = false;
        var itemSourceFieldObject = [];
        var importColumns = [];
        var submitValues = new Array();
        var contextObj = this;
        this.mappingtable.filter(function (el) {
            if (el["iDrawingsColumns"] == "Code") {
                varCode = true;
            }
            else if (el["iDrawingsColumns"] == "First Name") {
                varfrstname = true;
            }
            else if (el["iDrawingsColumns"] == "Last Name") {
                varlstName = true;
            } //Site;Building;Floor;Room No;"
            if (el["iDrawingsColumns"] == "Site") {
                siteStatus = true;
            }
            else if (el["iDrawingsColumns"] == "Building") {
                bldngStatus = true;
            }
            else if (el["iDrawingsColumns"] == "Floor") {
                floorStatus = true;
            }
            else if (el["iDrawingsColumns"] == "Space Key" || el["iDrawingsColumns"] == "Room No" || el["iDrawingsColumns"] == "BOMA Handle") {
                spkRmnStatus = true;
                if (contextObj.importControlfield[2].FieldValue == "32") {
                    if (el["iDrawingsColumns"] == "Room No")
                        relationStaus = true;
                }
                if (contextObj.importControlfield[2].FieldValue == "33") {
                    if (el["iDrawingsColumns"] == "Space Key")
                        relationStaus = true;
                }
                if (contextObj.importControlfield[2].FieldValue == "34") {
                    if (el["iDrawingsColumns"] == "BOMA Handle")
                        relationStaus = true;
                }
            }
            return true;
        });
        if (varCode != true)
            errorMsg = "Employee Code";
        if (varfrstname != true) {
            if (errorMsg.length == 0)
                errorMsg = "First Name";
            else
                errorMsg = errorMsg + ", First Name";
        }
        if (varlstName != true) {
            if (errorMsg.length == 0)
                errorMsg = "Last Name";
            else
                errorMsg = errorMsg + ", Last Name";
        }
        if (siteStatus == true || bldngStatus == true || floorStatus == true || spkRmnStatus == true) {
            relationByneeded = true;
            if (siteStatus != true)
                if (errorMsg.length == 0)
                    errorMsg = "Site";
                else
                    errorMsg = errorMsg + ", Site";
            if (bldngStatus != true) {
                if (errorMsg.length == 0)
                    errorMsg = "Building";
                else
                    errorMsg = errorMsg + ", Building";
            }
            if (floorStatus != true) {
                if (errorMsg.length == 0)
                    errorMsg = "Floor";
                else
                    errorMsg = errorMsg + ", Floor";
            }
            if (spkRmnStatus != true) {
                if (errorMsg.length == 0)
                    errorMsg = "Space Key/Room No/Space Handle";
                else
                    errorMsg = errorMsg + ", Space Key/Room No/Space Handle";
            }
        }
        if (errorMsg.length == 0) {
            var contextObj = this;
            var optionValue = 0;
            if ((relationStaus == true && relationByneeded == true) || (relationByneeded == false)) {
                contextObj.slideMsg = "Data from the Excel sheet is going to be imported to iDrawings. Click 'OK' to proceed.";
                contextObj.width = 300;
                contextObj.change = !this.change;
                contextObj.showSlide = !this.showSlide;
            }
            else {
                if (contextObj.importControlfield[2].FieldValue == "33") {
                    this._notificationService.ShowToaster("Space Key field has to be mapped as it is the 'Related by' field", 2);
                }
                if (contextObj.importControlfield[2].FieldValue == "32") {
                    this._notificationService.ShowToaster("Room No. field has to be mapped as it is the 'Related by' field", 2);
                }
                if (contextObj.importControlfield[2].FieldValue == "34") {
                    this._notificationService.ShowToaster("Space Handle field has to be mapped as it is the 'Related by' field", 2);
                }
            }
        }
        else {
            this._notificationService.ShowToaster("Mandatory fields " + errorMsg + " missing", 2);
        }
    };
    ImportDataComponent.prototype.assetValidation = function () {
        var varObjNo = false;
        var g_blnTagMapped = false;
        var varobjPrefix = false;
        var spkRmnStatus = false;
        var relationStaus = false;
        var varBRH = false;
        var spkRmnStatus = false;
        var optionValue = 0;
        var autonuber = 0;
        var reportIds = [];
        var errorMsg = "";
        var errorMsg1 = "";
        var spaceExcelMappingDetails = "";
        var submitValues = new Array();
        var blnAutoNumber = false;
        var contextObj = this;
        if (this.drawingCategoryValue == "-1") {
            this._notificationService.ShowToaster("Select a Drawing Category", 2);
            return;
        }
        if (this.attributeStatus == true && this.classIdValue == "-1") {
            contextObj._notificationService.ShowToaster("Select a Class Specific", 2);
            return;
        }
        this.mappingtable.filter(function (el) {
            //Site;Building;Floor;Room No;"
            if (el["iDrawingsColumns"] == "Tag Number") {
                varObjNo = true;
                g_blnTagMapped = true;
            }
            if (el["iDrawingsColumns"] == "No Prefix") {
                varobjPrefix = true;
            }
            if (el["iDrawingsColumns"] == "Space Key" || el["iDrawingsColumns"] == "Room No" || el["iDrawingsColumns"] == "BOMA Handle") {
                if (contextObj.importControlfield[5].FieldValue == "32") {
                    if (el["iDrawingsColumns"] != "Room No") {
                        if (errorMsg.length == 0)
                            errorMsg = "Room No";
                        else
                            errorMsg = errorMsg + "/Room No";
                    }
                    else
                        spkRmnStatus = true;
                }
                if (contextObj.importControlfield[5].FieldValue == "33") {
                    if (el["iDrawingsColumns"] != "Space Key") {
                        if (errorMsg.length == 0)
                            errorMsg = "Space Key";
                        else
                            errorMsg = errorMsg + "/Space Key";
                    }
                    else
                        spkRmnStatus = true;
                }
                if (contextObj.importControlfield[5].FieldValue == "34") {
                    if (el["iDrawingsColumns"] != "BOMA Handle") {
                        if (errorMsg.length == 0)
                            errorMsg = "Space Handle";
                        else
                            errorMsg = errorMsg + "/Space Handle";
                    }
                    else
                        spkRmnStatus = true;
                }
            }
            if (contextObj.drawingCategoryValue != "1") {
                errorMsg = "";
                if (el["iDrawingsColumns"] == "Block Ref Handle") {
                    if (contextObj.importControlfield[6].FieldValue != "42") {
                        if (el["iDrawingsColumns"] != "Block Ref Handle") {
                            if (errorMsg.length == 0)
                                errorMsg = "Block Ref Handle";
                            else
                                errorMsg = errorMsg + ", Block Ref Handle";
                        }
                    }
                    else {
                        varBRH = true;
                    }
                }
            }
        });
        if (varObjNo && varobjPrefix && varBRH) {
            if (varObjNo == false) {
                errorMsg1 = "Asset Class Number";
            }
            if (varobjPrefix == false) {
                if (errorMsg1.length == 0)
                    errorMsg1 = " Asset Class Number Prefix";
                else
                    errorMsg1 = errorMsg + ", Asset Class Number Prefix";
            }
            if (varBRH == false) {
                if (errorMsg1.length == 0)
                    errorMsg1 = "Asset Class Name";
                else
                    errorMsg1 = errorMsg + ", Asset Class Name";
            }
        }
        if ((varBRH == false) && (contextObj.importControlfield[6].FieldValue == "42") && (contextObj.drawingCategoryValue != "1")) {
            if (errorMsg1.length == 0)
                errorMsg1 = "Block Ref Handle";
            else
                errorMsg1 = errorMsg + ", Block Ref Handle";
        }
        if (contextObj.drawingCategoryValue != "1") {
            if (contextObj.importControlfield[6].FieldValue == "42" && contextObj.importControlfield[7].FieldValue == "38") {
                contextObj._notificationService.ShowToaster("No update facility available for this Drawing Category", 2);
                return;
            }
            if (contextObj.importControlfield[6].FieldValue == "43" && contextObj.importControlfield[7].FieldValue == "37") {
                contextObj._notificationService.ShowToaster("No insert facility available for this Drawing Category", 2);
                return;
            }
        }
        if (spkRmnStatus == false) {
            if (errorMsg1.length > 0) {
                errorMsg1 = errorMsg1 + ", " + errorMsg;
            }
            else {
                errorMsg1 = errorMsg1 + errorMsg;
            }
        }
        if (errorMsg1.length == 0) {
            var contextObj = this;
            var importFields = new Array();
            var relationId = 0;
            if (contextObj.importControlfield[5].FieldValue == "32") {
                relationId = 1;
            }
            if (contextObj.importControlfield[5].FieldValue == "33") {
                relationId = 0;
            }
            if (contextObj.importControlfield[5].FieldValue == "34") {
                relationId = 2;
            }
            if (contextObj.importControlfield[7].FieldValue == "37") {
                optionValue = 1;
            }
            if (contextObj.importControlfield[7].FieldValue == "38") {
                optionValue = 0;
            }
            contextObj.assetimportFields = [];
            contextObj.administrationService.getCustomerSubscribedFeatures("72").subscribe(function (resultData1) {
                debugger;
                var objectTypeId = 0;
                var componentCategory = "";
                if (contextObj.importcategoryId == 6) {
                    objectTypeId = 1;
                    componentCategory = "39";
                }
                if (contextObj.importcategoryId == 7) {
                    objectTypeId = 2;
                    componentCategory = "40";
                }
                if (contextObj.importcategoryId == 5) {
                    objectTypeId = 3;
                    componentCategory = "41";
                }
                if (contextObj.importcategoryId == 8) {
                    objectTypeId = 8;
                    componentCategory = "42";
                }
                if (contextObj.importcategoryId == 12) {
                    objectTypeId = 9;
                    componentCategory = "43";
                }
                if (contextObj.importcategoryId == 9) {
                    objectTypeId = 10;
                    componentCategory = "44";
                }
                if (contextObj.importcategoryId == 10) {
                    objectTypeId = 11;
                    componentCategory = "45";
                }
                blnAutoNumber = resultData1["Data"][0].IsSubscribed;
                if (blnAutoNumber == true)
                    autonuber = 1;
                importFields.push({
                    Assigned: 0,
                    AutoNumbering: autonuber,
                    ObjectClassName: contextObj.className,
                    DwgCategoryId: +contextObj.drawingCategoryValue,
                    ComponentCategory: componentCategory,
                    ObjectType: objectTypeId,
                    Option: optionValue,
                    Relation: relationId
                });
                contextObj.assetimportFields = importFields;
                if (blnAutoNumber == true) {
                    g_blnTagMapped = true;
                    if (contextObj.importControlfield[6].FieldValue == "43" && contextObj.importControlfield[5].FieldValue == "38" && contextObj.drawingCategoryValue != "1")
                        contextObj.slideMsg = "Data from the Excel sheet is going to be imported to iDrawings. Click 'OK' to proceed.";
                    if (g_blnTagMapped && contextObj.importControlfield[7].FieldValue == "37")
                        contextObj.slideMsg = "You have selected autogenerate for 'Tag Number'.So the values in the excel file will be ignored. Click 'OK' to proceed.";
                    else
                        contextObj.slideMsg = "Data from the Excel sheet is going to be imported to iDrawings. Click 'OK' to proceed.";
                }
                else {
                    contextObj.slideMsg = "Data from the Excel sheet is going to be imported to iDrawings. Click 'OK' to proceed.";
                }
                contextObj.width = 300;
                contextObj.change = !this.change;
                contextObj.showSlide = !this.showSlide;
            });
        }
        else {
            this._notificationService.ShowToaster("Mandatory fields " + errorMsg1 + " missing", 2);
        }
    };
    ImportDataComponent.prototype.documentValidation = function () {
        var documentNo = false;
        var fileName = false;
        var errorMsg = "";
        var errorMsg1 = "";
        var isAutoNoEnabled = false;
        var isDocNoEnabled = false;
        var itemSourceFieldObject = [];
        var importColumns = [];
        var submitValues = new Array();
        var contextObj = this;
        this.mappingtable.filter(function (el) {
            if (el["iDrawingsColumns"] == "Document Number") {
                documentNo = true;
            }
            else if (el["iDrawingsColumns"] == "File Name") {
                fileName = true;
            }
            return true;
        });
        this.administrationService.getCustomerSubscribedFeatures("58,60").subscribe(function (resultData) {
            var customerFeatureobj = resultData["Data"];
            for (var i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 58:
                        isAutoNoEnabled = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 60:
                        isDocNoEnabled = customerFeatureobj[i]["IsSubscribed"];
                        break;
                }
            }
            if (!documentNo) {
                if (isDocNoEnabled && !isAutoNoEnabled)
                    errorMsg = "Document Number";
            }
            if (!fileName) {
                if (errorMsg.length == 0)
                    errorMsg = "File Name";
                else
                    errorMsg = errorMsg + ", File Name";
            }
            if (errorMsg.length == 0) {
                contextObj.slideMsg = "Data from the Excel sheet is going to be imported to iDrawings. Click 'OK' to proceed.";
                contextObj.width = 300;
                contextObj.change = !contextObj.change;
                contextObj.showSlide = !contextObj.showSlide;
            }
            else {
                contextObj._notificationService.ShowToaster("Mandatory fields " + errorMsg + " missing", 2);
            }
        });
    };
    ImportDataComponent.prototype.onImport = function () {
        this.splitViewTarget = false;
        if (this.importcategoryId == 2)
            this.spaceValidation();
        if (this.importcategoryId == 3)
            this.documentValidation();
        if (this.importcategoryId == 4)
            this.employeeValidation();
        if (this.importcategoryId == 6 || this.importcategoryId == 7 || this.importcategoryId == 5 || this.importcategoryId == 8 || this.importcategoryId == 12 || this.importcategoryId == 9 || this.importcategoryId == 10)
            this.assetValidation();
        if (this.importcategoryId == 21)
            this.userValidation();
    };
    ImportDataComponent.prototype.onMenuClick = function (value) {
        var contextObj = this;
        contextObj.exportObject.ExportData(JSON.stringify(contextObj.itemsSource), contextObj.importGridFieldObject, "Import Data", function (retCode) {
            if (retCode == 0) {
                contextObj._notificationService.ShowToaster("Import data exported", 3);
            }
            else {
                contextObj._notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
            }
        });
    };
    ImportDataComponent.prototype.update = function (event) {
        var contextObj = this;
        var PageTarget;
        var optionValue = 0;
        this.showSlide = !this.showSlide;
        if (contextObj.importcategoryId == 2) {
            var relationId = 0;
            if (contextObj.importControlfield[2].FieldValue == "32") {
                relationId = 0;
            }
            if (contextObj.importControlfield[2].FieldValue == "33") {
                relationId = 1;
            }
            if (contextObj.importControlfield[2].FieldValue == "34") {
                relationId = 2;
            }
            contextObj.importLoading = true;
            this.administrationService.updateSpaceImport(contextObj.mappingtable, contextObj.importDataFromExcel, contextObj.importColumnsList, relationId, this.fileData, contextObj.sheetName).subscribe(function (resultData1) {
                contextObj.loadSource(contextObj);
                contextObj.splitViewTitle = "Space Import Details";
                contextObj.templateId = resultData1;
                contextObj.itemsSource = JSON.parse(resultData1["Data"]);
                contextObj.splitViewGridTarget = true;
                contextObj.splitviewInput.secondaryArea = 79;
                contextObj.splitviewInput.showSecondaryView = true;
                contextObj.importLoading = false;
            });
        }
        else if (contextObj.importcategoryId == 3) {
            contextObj.importLoading = true;
            if (contextObj.importControlfield[2].FieldValue == "37") {
                optionValue = 1;
            }
            if (contextObj.importControlfield[2].FieldValue == "38") {
                optionValue = 0;
            }
            var documentFolder = contextObj.importControlfield[3].FieldValue;
            contextObj.administrationService.updateDocumentImport(contextObj.mappingtable, contextObj.importDataFromExcel, contextObj.importColumnsList, documentFolder, optionValue, this.fileData, contextObj.sheetName).subscribe(function (resultData1) {
                contextObj.loadSource(contextObj);
                contextObj.splitViewTitle = "Document Import Details";
                contextObj.templateId = resultData1;
                contextObj.itemsSource = JSON.parse(resultData1["Data"]);
                contextObj.splitViewGridTarget = true;
                contextObj.splitviewInput.secondaryArea = 79;
                contextObj.splitviewInput.showSecondaryView = true;
                contextObj.importLoading = false;
            });
        }
        else if (contextObj.importcategoryId == 4) {
            var relationId = 0;
            if (contextObj.importControlfield[2].FieldValue == "32") {
                relationId = 1;
            }
            if (contextObj.importControlfield[2].FieldValue == "33") {
                relationId = 0;
            }
            if (contextObj.importControlfield[2].FieldValue == "34") {
                relationId = 2;
            }
            if (contextObj.importControlfield[3].FieldValue == "37") {
                optionValue = 1;
            }
            if (contextObj.importControlfield[3].FieldValue == "38") {
                optionValue = 0;
            }
            contextObj.importLoading = true;
            this.administrationService.updateEmployeeImport(contextObj.mappingtable, contextObj.importDataFromExcel, contextObj.importColumnsList, relationId, optionValue, this.fileData, contextObj.sheetName).subscribe(function (resultData1) {
                contextObj.templateId = resultData1;
                contextObj.loadSource(contextObj);
                contextObj.splitViewTitle = "Employee Import Details";
                contextObj.itemsSource = JSON.parse(resultData1["Data"]);
                contextObj.splitViewGridTarget = true;
                contextObj.splitviewInput.secondaryArea = 79;
                contextObj.splitviewInput.showSecondaryView = true;
                contextObj.importLoading = false;
            });
        }
        else if (contextObj.importcategoryId == 6) {
            contextObj.importLoading = true;
            contextObj.administrationService.updateAssetImport(contextObj.mappingtable, contextObj.importDataFromExcel, contextObj.importColumnsList, contextObj.assetimportFields, this.fileData, contextObj.sheetName).subscribe(function (resultData1) {
                contextObj.loadSource(contextObj);
                contextObj.splitViewTitle = "Asset Import Details";
                contextObj.templateId = resultData1;
                contextObj.itemsSource = JSON.parse(resultData1["Data"]);
                contextObj.splitViewGridTarget = true;
                contextObj.splitviewInput.secondaryArea = 79;
                contextObj.splitviewInput.showSecondaryView = true;
                contextObj.importLoading = false;
            });
        }
        else if (contextObj.importcategoryId == 21) {
            contextObj.importLoading = true;
            contextObj.administrationService.updateUserImport(contextObj.mappingtable, contextObj.importDataFromExcel, contextObj.importColumnsList, this.fileData, contextObj.sheetName).subscribe(function (resultData1) {
                contextObj.loadSource(contextObj);
                contextObj.splitViewTitle = "User Import Details";
                contextObj.templateId = resultData1;
                contextObj.itemsSource = JSON.parse(resultData1["Data"]);
                contextObj.splitViewGridTarget = true;
                contextObj.splitviewInput.secondaryArea = 79;
                contextObj.splitviewInput.showSecondaryView = true;
                contextObj.importLoading = false;
            });
        }
        else if (contextObj.importcategoryId == 7 || contextObj.importcategoryId == 5 || contextObj.importcategoryId == 8 || contextObj.importcategoryId == 12 || contextObj.importcategoryId == 9 || contextObj.importcategoryId == 10) {
            debugger;
            contextObj.importLoading = true;
            contextObj.administrationService.updateAssetImport(contextObj.mappingtable, contextObj.importDataFromExcel, contextObj.importColumnsList, contextObj.assetimportFields, this.fileData, contextObj.sheetName).subscribe(function (resultData1) {
                contextObj.loadSource(contextObj);
                contextObj.splitViewTitle = "Furniture Import Details";
                contextObj.templateId = resultData1;
                contextObj.itemsSource = JSON.parse(resultData1["Data"]);
                contextObj.splitViewGridTarget = true;
                contextObj.splitviewInput.secondaryArea = 79;
                contextObj.splitviewInput.showSecondaryView = true;
                contextObj.importLoading = false;
            });
        }
    };
    ImportDataComponent.prototype.cancelClick = function (value) {
        this.showSlide = value.value;
    };
    ImportDataComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    ImportDataComponent = __decorate([
        core_1.Component({
            selector: 'data-import',
            templateUrl: 'app/Views/Common/DataImport/dataimport.component.html',
            styleUrls: ['app/Views/Common/DataImport/dataimport.css'],
            providers: [administration_service_1.AdministrationService, objects_service_1.ObjectsService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions, exporttoexcel_service_1.ExportToExcel],
            inputs: [],
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, submenu_component_1.SubMenu, page_component_1.PageComponent, notify_component_1.Notification, confirm_component_1.ConfirmationComponent, slide_component_1.SlideComponent, fieldGeneration_component_1.FieldComponent, split_view_component_1.SplitViewComponent, configure_component_1.ConfigureComponent]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, objects_service_1.ObjectsService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions, exporttoexcel_service_1.ExportToExcel])
    ], ImportDataComponent);
    return ImportDataComponent;
}());
exports.ImportDataComponent = ImportDataComponent;
//# sourceMappingURL=importData.component.js.map