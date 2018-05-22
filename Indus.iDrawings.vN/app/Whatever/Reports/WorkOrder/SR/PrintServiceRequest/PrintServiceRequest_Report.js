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
var reportviewercomponent_1 = require('../../../../../Framework/Whatever/ReportViewer/reportviewercomponent');
var page_component_1 = require('../../../../../Framework/Whatever/Page/page.component');
var PrintServiceRequestReportComponent = (function () {
    function PrintServiceRequestReportComponent() {
    }
    PrintServiceRequestReportComponent.prototype.ngOnInit = function () {
        this.ReportData = new PrintServiceRequestReportComponent();
        this.ReportData.ModuleId = 9;
        this.ReportData.ReportCategoryId = 431;
        this.ReportData.ExportFileName = "Print Service Request Report";
        this.ReportData.ReportTitle = "Print Service Request Report";
        this.ReportData.ReportSubTitle = "";
        var arrRptFieldIds = new Array();
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 67,
            Value: "5"
        });
        arrRptFieldIds.push({
            ReportFieldId: 3382,
            Value: "0"
        });
        arrRptFieldIds.push({
            ReportFieldId: 3884,
            Value: "7"
        });
        if (this.selectedIds.length > 1) {
            for (var i = 0; i < this.rowDatas.length; i++) {
                arrRptFieldIds.push({
                    ReportFieldId: 5861,
                    Value: this.rowDatas[i]["WorkTypeId"]
                });
                if (this.rowDatas[i]["WorkflowEntityCategoryId"] == 1) {
                    arrRptFieldIds.push({
                        ReportFieldId: 1438,
                        Value: this.rowDatas[i]["WorkRequestId"]
                    });
                }
                else if (this.rowDatas[i]["WorkflowEntityCategoryId"] == 2) {
                    arrRptFieldIds.push({
                        ReportFieldId: 1438,
                        Value: this.rowDatas[i]["WorkOrderId"]
                    });
                }
                arrRptFieldIds.push({
                    ReportFieldId: 5863,
                    Value: this.rowDatas[i]["CurrentWorkFlowActionPointId"]
                });
            }
        }
        else {
            arrRptFieldIds.push({
                ReportFieldId: 5861,
                Value: this.rowDatas["WorkTypeId"]
            });
            if (this.rowDatas["WorkflowEntityCategoryId"] == 1) {
                arrRptFieldIds.push({
                    ReportFieldId: 1438,
                    Value: this.rowDatas["WorkRequestId"]
                });
            }
            else if (this.rowDatas["WorkflowEntityCategoryId"] == 2) {
                arrRptFieldIds.push({
                    ReportFieldId: 1438,
                    Value: this.rowDatas["WorkOrderId"]
                });
            }
            arrRptFieldIds.push({
                ReportFieldId: 5863,
                Value: this.rowDatas["CurrentWorkFlowActionPointId"]
            });
        }
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Work Order / Service Requests / Print Service Request Report";
    };
    PrintServiceRequestReportComponent = __decorate([
        core_1.Component({
            selector: 'printServiceRequest-report',
            template: "\n    <page  [pagetitle]=\"pagePath\">\n        <content>\n            <div style=\"width:100%;height:100%\" *ngIf=\"ReportData != undefined\">\n            <reportviewer [reportData]=ReportData > Loading ...</reportviewer>\n            </div>\n        </content>\n    </page>\n\n  ",
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent],
            inputs: ['rowDatas', 'selectedIds']
        }), 
        __metadata('design:paramtypes', [])
    ], PrintServiceRequestReportComponent);
    return PrintServiceRequestReportComponent;
}());
exports.PrintServiceRequestReportComponent = PrintServiceRequestReportComponent;
//# sourceMappingURL=PrintServiceRequest_Report.js.map