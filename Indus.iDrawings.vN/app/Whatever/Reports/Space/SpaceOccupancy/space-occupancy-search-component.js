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
var reportviewercomponent_1 = require('../../../../Framework/Whatever/ReportViewer/reportviewercomponent');
var dropdownlistcomponent_component_1 = require('../../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var fieldGeneration_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var space_service_1 = require('../../../../Models/Space/space.service');
var SpaceOccupancySearchComponent = (function () {
    function SpaceOccupancySearchComponent(spaceService) {
        this.spaceService = spaceService;
        this.onSubmitClick = new core_1.EventEmitter();
        this.level1DdlChangeFlag = true;
        this.selectedDdlValues = [];
        this.maxLevels = ""; //L1,L2,L3,L4,L5
        this.OrgUnitId = ""; // Value from dropdown
    }
    SpaceOccupancySearchComponent.prototype.ngAfterViewChecked = function () {
        if (this.selectedDdlArrayInput != null && this.selectedDdlArrayInput != undefined && this.selectedDdlArrayInput != "" && this.ddlLevel1 != undefined) {
            if (this.selectedDdlArrayInput.length > 0 && this.ddlLevel1.FieldValue == "-1" && this.level1DdlChangeFlag == true)
                this.ddlLevel1.FieldValue = this.selectedDdlArrayInput.split(",")[0];
        }
    };
    SpaceOccupancySearchComponent.prototype.ngOnInit = function () {
        var contexObj = this;
        contexObj.alignContent = "horizontal";
        this.ddlLevel1 = undefined;
        this.ddlLevel2 = undefined;
        this.ddlLevel3 = undefined;
        this.ddlLevel4 = undefined;
        this.ddlLevel5 = undefined;
        this.spaceService.ddlLoadOrganizationalUnitsSearch().subscribe(function (resultData) {
            if (contexObj.selectedDdlArrayInput == null || contexObj.selectedDdlArrayInput == undefined || contexObj.selectedDdlArrayInput == "") {
                if (contexObj.levelNumber == "1") {
                    contexObj.ddlLevel1 = resultData.Data[0];
                }
                else if (contexObj.levelNumber == "2") {
                    contexObj.ddlLevel1 = resultData.Data[0];
                    contexObj.ddlLevel2 = resultData.Data[1];
                }
                else if (contexObj.levelNumber == "3") {
                    contexObj.ddlLevel1 = resultData.Data[0];
                    contexObj.ddlLevel2 = resultData.Data[1];
                    contexObj.ddlLevel3 = resultData.Data[2];
                }
                else if (contexObj.levelNumber == "4") {
                    contexObj.ddlLevel1 = resultData.Data[0];
                    contexObj.ddlLevel2 = resultData.Data[1];
                    contexObj.ddlLevel3 = resultData.Data[2];
                    contexObj.ddlLevel4 = resultData.Data[3];
                }
                else if (contexObj.levelNumber == "5") {
                    contexObj.ddlLevel1 = resultData.Data[0];
                    contexObj.ddlLevel2 = resultData.Data[1];
                    contexObj.ddlLevel3 = resultData.Data[2];
                    contexObj.ddlLevel4 = resultData.Data[3];
                    contexObj.ddlLevel5 = resultData.Data[4];
                }
            }
            else if (contexObj.selectedDdlArrayInput.length > 0) {
                var idLevel1;
                var idLevel2;
                var idLevel3;
                var idLevel4;
                var idLevel5;
                idLevel1 = Number(contexObj.selectedDdlArrayInput.split(",")[0]);
                idLevel2 = Number(contexObj.selectedDdlArrayInput.split(",")[1]);
                idLevel3 = Number(contexObj.selectedDdlArrayInput.split(",")[2]);
                idLevel4 = Number(contexObj.selectedDdlArrayInput.split(",")[3]);
                idLevel5 = Number(contexObj.selectedDdlArrayInput.split(",")[4]);
                if (contexObj.levelNumber == "1") {
                    contexObj.ddlLevel1 = resultData.Data[0];
                    contexObj.ddlLevel1.FieldValue = idLevel1;
                }
                else if (contexObj.levelNumber == "2") {
                    contexObj.ddlLevel1 = resultData.Data[0];
                    contexObj.ddlLevel2 = resultData.Data[1];
                    contexObj.ddlLevel1.FieldValue = idLevel1;
                    contexObj.onChangeDdlLevel1(idLevel1, idLevel2);
                }
                else if (contexObj.levelNumber == "3") {
                    contexObj.ddlLevel1 = resultData.Data[0];
                    contexObj.ddlLevel2 = resultData.Data[1];
                    contexObj.ddlLevel3 = resultData.Data[2];
                    contexObj.ddlLevel1.FieldValue = idLevel1;
                    contexObj.onChangeDdlLevel1(idLevel1, idLevel2);
                    contexObj.onChangeDdlLevel2(idLevel2, idLevel3);
                }
                else if (contexObj.levelNumber == "4") {
                    contexObj.ddlLevel1 = resultData.Data[0];
                    contexObj.ddlLevel2 = resultData.Data[1];
                    contexObj.ddlLevel3 = resultData.Data[2];
                    contexObj.ddlLevel4 = resultData.Data[3];
                    contexObj.ddlLevel1.FieldValue = idLevel1;
                    contexObj.onChangeDdlLevel1(idLevel1, idLevel2);
                    contexObj.onChangeDdlLevel2(idLevel2, idLevel3);
                    contexObj.onChangeDdlLevel3(idLevel3, idLevel4);
                }
                else if (contexObj.levelNumber == "5") {
                    contexObj.ddlLevel1 = resultData.Data[0];
                    contexObj.ddlLevel2 = resultData.Data[1];
                    contexObj.ddlLevel3 = resultData.Data[2];
                    contexObj.ddlLevel4 = resultData.Data[3];
                    contexObj.ddlLevel5 = resultData.Data[4];
                    contexObj.ddlLevel1.FieldValue = idLevel1;
                    contexObj.onChangeDdlLevel1(idLevel1, idLevel2);
                    contexObj.onChangeDdlLevel2(idLevel2, idLevel3);
                    contexObj.onChangeDdlLevel3(idLevel3, idLevel4);
                    contexObj.onChangeDdlLevel4(idLevel4, idLevel5);
                }
            }
        });
    };
    SpaceOccupancySearchComponent.prototype.levelFiledValueNotchangeFunction = function () {
        if (this.selectedDdlArrayInput != null || this.selectedDdlArrayInput != undefined || this.selectedDdlArrayInput != "") {
            if (this.selectedDdlArrayInput.length > 0)
                this.ddlLevel1.FieldValue = this.selectedDdlArrayInput.split(",")[0];
        }
    };
    SpaceOccupancySearchComponent.prototype.onChangeDdlLevel1 = function (event, fieldValue) {
        var contextObj = this;
        if (event == "-1") {
            this.level1DdlChangeFlag = false;
            this.ddlLevel1.FieldValue = "-1";
        }
        if (Number(this.levelNumber) > 1 && this.ddlLevel2 != undefined && Number(event) > 0) {
            //if (Number(this.ddlLevel2.FieldValue) > 0)
            //    this.ddlLevel2.FieldValue = "-1";
            this.maxLevels = "L1";
            this.OrgUnitId = event;
            if (this.ddlLevel2 != undefined) {
                this.ddlLevel2.LookupDetails.LookupValues = null;
                this.ddlLevel2.FieldValue = "-1";
            }
            if (this.ddlLevel3 != undefined) {
                this.ddlLevel3.LookupDetails.LookupValues = null;
                this.ddlLevel3.FieldValue = "-1";
            }
            if (this.ddlLevel4 != undefined) {
                this.ddlLevel4.LookupDetails.LookupValues = null;
                this.ddlLevel4.FieldValue = "-1";
            }
            if (this.ddlLevel5 != undefined) {
                this.ddlLevel5.LookupDetails.LookupValues = null;
                this.ddlLevel5.FieldValue = "-1";
            }
            var newTemp = [];
            newTemp.push({
                ReportFieldId: 289,
                Value: "2"
            });
            newTemp.push({
                ReportFieldId: 288,
                Value: event
            });
            contextObj.spaceService.loadSpaceOrganizationalUnitDll(event, 737, newTemp).subscribe(function (resultData) {
                contextObj.ddlLevel2.LookupDetails.LookupValues = resultData.Data.LookupValues;
                if (fieldValue > 0) {
                    contextObj.ddlLevel2.FieldValue = fieldValue;
                    contextObj.ddlLevel1.FieldValue = contextObj.selectedDdlArrayInput.split(",")[0];
                }
            });
        }
        else if (Number(event) == -1) {
            this.maxLevels = "";
            this.OrgUnitId = "";
            if (this.ddlLevel2 != undefined) {
                this.ddlLevel2.LookupDetails.LookupValues = null;
                this.ddlLevel2.FieldValue = "-1";
            }
            if (this.ddlLevel3 != undefined) {
                this.ddlLevel3.LookupDetails.LookupValues = null;
                this.ddlLevel3.FieldValue = "-1";
            }
            if (this.ddlLevel4 != undefined) {
                this.ddlLevel4.LookupDetails.LookupValues = null;
                this.ddlLevel4.FieldValue = "-1";
            }
            if (this.ddlLevel5 != undefined) {
                this.ddlLevel5.LookupDetails.LookupValues = null;
                this.ddlLevel5.FieldValue = "-1";
            }
        }
        else {
            this.maxLevels = "L1";
            this.OrgUnitId = event;
        }
    };
    SpaceOccupancySearchComponent.prototype.onChangeDdlLevel2 = function (event, fieldValue) {
        var contextObj = this;
        if (Number(this.levelNumber) > 2 && this.ddlLevel3 != undefined && Number(event) > 0) {
            this.maxLevels = "L2";
            this.OrgUnitId = event;
            if (this.ddlLevel3 != undefined) {
                this.ddlLevel3.LookupDetails.LookupValues = null;
                this.ddlLevel3.FieldValue = "-1";
            }
            if (this.ddlLevel4 != undefined) {
                this.ddlLevel4.LookupDetails.LookupValues = null;
                this.ddlLevel4.FieldValue = "-1";
            }
            if (this.ddlLevel5 != undefined) {
                this.ddlLevel5.LookupDetails.LookupValues = null;
                this.ddlLevel5.FieldValue = "-1";
            }
            var newTemp = [];
            newTemp.push({
                ReportFieldId: 289,
                Value: "3"
            });
            newTemp.push({
                ReportFieldId: 288,
                Value: event
            });
            contextObj.spaceService.loadSpaceOrganizationalUnitDll(event, 738, newTemp).subscribe(function (resultData) {
                contextObj.ddlLevel3.LookupDetails.LookupValues = resultData.Data.LookupValues;
                if (fieldValue > 0)
                    contextObj.ddlLevel3.FieldValue = fieldValue;
            });
        }
        else if (Number(event) == -1) {
            this.maxLevels = "L1";
            this.OrgUnitId = this.ddlLevel1.FieldValue;
            if (this.ddlLevel3 != undefined) {
                this.ddlLevel3.LookupDetails.LookupValues = null;
                this.ddlLevel3.FieldValue = "-1";
            }
            if (this.ddlLevel4 != undefined) {
                this.ddlLevel4.LookupDetails.LookupValues = null;
                this.ddlLevel4.FieldValue = "-1";
            }
            if (this.ddlLevel5 != undefined) {
                this.ddlLevel5.LookupDetails.LookupValues = null;
                this.ddlLevel5.FieldValue = "-1";
            }
        }
        else {
            this.maxLevels = "L2";
            this.OrgUnitId = event;
        }
    };
    SpaceOccupancySearchComponent.prototype.onChangeDdlLevel3 = function (event, fieldValue) {
        var contextObj = this;
        if (Number(this.levelNumber) > 3 && this.ddlLevel4 != undefined && Number(event) > 0) {
            this.maxLevels = "L3";
            this.OrgUnitId = event;
            if (this.ddlLevel4 != undefined) {
                this.ddlLevel4.LookupDetails.LookupValues = null;
                this.ddlLevel4.FieldValue = "-1";
            }
            if (this.ddlLevel5 != undefined) {
                this.ddlLevel5.LookupDetails.LookupValues = null;
                this.ddlLevel5.FieldValue = "-1";
            }
            var newTemp = [];
            newTemp.push({
                ReportFieldId: 289,
                Value: "4"
            });
            newTemp.push({
                ReportFieldId: 288,
                Value: event
            });
            contextObj.spaceService.loadSpaceOrganizationalUnitDll(event, 739, newTemp).subscribe(function (resultData) {
                contextObj.ddlLevel4.LookupDetails.LookupValues = resultData.Data.LookupValues;
                if (fieldValue > 0)
                    contextObj.ddlLevel4.FieldValue = fieldValue;
            });
        }
        else if (Number(event) == -1) {
            this.maxLevels = "L2";
            this.OrgUnitId = this.ddlLevel2.FieldValue;
            if (this.ddlLevel4 != undefined) {
                this.ddlLevel4.LookupDetails.LookupValues = null;
                this.ddlLevel4.FieldValue = "-1";
            }
            if (this.ddlLevel5 != undefined) {
                this.ddlLevel5.LookupDetails.LookupValues = null;
                this.ddlLevel5.FieldValue = "-1";
            }
        }
        else {
            this.maxLevels = "L3";
            this.OrgUnitId = event;
        }
    };
    SpaceOccupancySearchComponent.prototype.onChangeDdlLevel4 = function (event, fieldValue) {
        var contextObj = this;
        if (Number(this.levelNumber) > 4 && this.ddlLevel5 != undefined && Number(event) > 0) {
            this.maxLevels = "L4";
            this.OrgUnitId = event;
            if (this.ddlLevel5 != undefined) {
                this.ddlLevel5.LookupDetails.LookupValues = null;
                this.ddlLevel5.FieldValue = "-1";
            }
            var newTemp = [];
            newTemp.push({
                ReportFieldId: 289,
                Value: "5"
            });
            newTemp.push({
                ReportFieldId: 288,
                Value: event
            });
            contextObj.spaceService.loadSpaceOrganizationalUnitDll(event, 740, newTemp).subscribe(function (resultData) {
                contextObj.ddlLevel5.LookupDetails.LookupValues = resultData.Data.LookupValues;
                if (fieldValue > 0)
                    contextObj.ddlLevel5.FieldValue = fieldValue;
            });
        }
        else if (Number(event) == -1) {
            this.maxLevels = "L3";
            this.OrgUnitId = this.ddlLevel3.FieldValue;
            if (this.ddlLevel5 != undefined) {
                this.ddlLevel5.LookupDetails.LookupValues = null;
                this.ddlLevel5.FieldValue = "-1";
            }
        }
        else {
            this.maxLevels = "L4";
            this.OrgUnitId = event;
        }
    };
    SpaceOccupancySearchComponent.prototype.onChangeDdlLevel5 = function (event, fieldValue) {
        var contextObj = this;
        if (Number(this.levelNumber) > 5 && Number(event) > 0) {
            this.maxLevels = "L5";
            this.OrgUnitId = event;
        }
        else if (Number(event) == -1) {
            this.maxLevels = "L4";
            this.OrgUnitId = this.ddlLevel4.FieldValue;
        }
    };
    SpaceOccupancySearchComponent.prototype.onSubmit = function (event) {
        var contextObj = this;
        if (this.ddlLevel1 != undefined) {
            this.selectedDdlValues[0] = this.ddlLevel1.FieldValue;
        }
        if (this.ddlLevel2 != undefined) {
            this.selectedDdlValues[1] = this.ddlLevel2.FieldValue;
        }
        if (this.ddlLevel3 != undefined) {
            this.selectedDdlValues[2] = this.ddlLevel3.FieldValue;
        }
        if (this.ddlLevel4 != undefined) {
            this.selectedDdlValues[3] = this.ddlLevel4.FieldValue;
        }
        if (this.ddlLevel5 != undefined) {
            this.selectedDdlValues[4] = this.ddlLevel5.FieldValue;
        }
        contextObj.onSubmitClick.emit({
            SelectedDdlArray: contextObj.selectedDdlValues.toString(),
            MaxLevels: contextObj.maxLevels,
            OrgUnitId: contextObj.OrgUnitId
        });
        // this.onSubmitClick.emit("");
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SpaceOccupancySearchComponent.prototype, "onSubmitClick", void 0);
    SpaceOccupancySearchComponent = __decorate([
        core_1.Component({
            selector: 'space-occupancy-search',
            templateUrl: './app/Views/Reports/Space/SpaceOccupancy/space-occupancy-search-component.html',
            directives: [reportviewercomponent_1.Html5ViewerComponent, dropdownlistcomponent_component_1.DropDownListComponent, fieldGeneration_component_1.FieldComponent],
            providers: [space_service_1.SpaceService],
            inputs: ['levelNumber', 'selectedDdlArrayInput']
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService])
    ], SpaceOccupancySearchComponent);
    return SpaceOccupancySearchComponent;
}());
exports.SpaceOccupancySearchComponent = SpaceOccupancySearchComponent;
//# sourceMappingURL=space-occupancy-search-component.js.map