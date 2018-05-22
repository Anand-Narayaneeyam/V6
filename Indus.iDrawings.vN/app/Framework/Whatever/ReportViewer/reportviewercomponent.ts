import {Component, OnInit, Input} from '@angular/core';
import {IReportDataEntity} from '../../Models/Interface/IReportDataEntity';
import { CommonReportService } from '../../../Models/reports/common.service'


var viewer = null;
var element;
var currentZoom;
var reportName;
var documentFileName;


@Component({
    selector: 'reportviewer',
    templateUrl: 'app/Framework/Views/ReportViewer/reportviewertemplate.html',
    providers: [CommonReportService]
})


export class Html5ViewerComponent implements OnInit{

    @Input() reportData: IReportDataEntity;
    //ModuleId: any;
    //ReportCategoryId: any; 
    //ReportDetailId: any =0; 
    //CustomReportId: any =0; 
    //ReportFieldId: any =0; 

    constructor(private commonreportservice: CommonReportService) { }

    

    initializeHtml5Viewer() {
        documentFileName = this.reportData.ExportFileName;
       
        var GrapeCity = window["GrapeCity"];
        
        GrapeCity.ActiveReports.onPDFExportClick = this.exportReportToPDF;
        GrapeCity.ActiveReports.onExcelExportClick = this.exportReportToExcel;
        GrapeCity.ActiveReports.onRTFExportClick = this.exportReportToRTF;
        GrapeCity.ActiveReports.onTextExportClick = this.exportReportToText;
        GrapeCity.ActiveReports.onZoomInClick = this.reportZoomIn;
        GrapeCity.ActiveReports.onZoomOutClick = this.reportZoomOut;

            viewer = GrapeCity.ActiveReports.Viewer({
                reportLoaded: function () {
                    currentZoom = 1;
                    reportName = documentFileName;
                
                $("#btnZoomIn").prop("disabled", false);
                $("#btnZoomOut").prop("disabled", false);
            },
            element: '#Viewer',
            reportService: {
                url: './app/CustomReportService.asmx'
            },
            uiType: 'custom',
            documentLoaded: function () {
           
            },
           
            error: function (error) {
                error["message"] = "iDrawings encountered a problem while executing your command";
                var isIE11 = /msie|Trident/.test(navigator.userAgent);
                if (isIE11 == false) {
                    (<any>window).BrowserName = "IE11";
                    this.IE11Staus = true;
                    var baseUrl = window.document.baseURI;
                }
                else {

                    var baseUrl = window.location.origin + '/' + window.location.pathname.split('/')[1] + '/';

                }
                
                if (baseUrl.includes("undefined/")) {
                    baseUrl.replace("undefined/", "");
                }
                var logoutUrl = baseUrl + "/Account/LogOff";
                window.location.href = logoutUrl;                
            }
        });

            var reportOption = {
               
               id: JSON.stringify(this.reportData)
               
               // id: JSON.parse(JSON.stringify(this.reportData))
        };


            debugger
            viewer.option('report', reportOption);
        
    }

    ngOnInit() {
        //this.ModuleId = this.reportData.ModuleId;
        //this.ReportCategoryId = this.reportData.ReportCategoryId;
        //var contexObj = this;
        //contexObj.commonreportservice.getReportPrivilegeforUser(contexObj.ModuleId, contexObj.ReportDetailId, contexObj.ReportCategoryId, contexObj.CustomReportId, contexObj.ReportFieldId).subscribe(function (resultData) {
        //    if (resultData["Data"] == 1) {
        //         contexObj.initializeHtml5Viewer();
        //    }
        //    else {
        //        var logoutUrl = window.document.baseURI + "/Account/LogOff";
        //        window.location.href = logoutUrl;                
        //    }

        //});
        debugger
        this.initializeHtml5Viewer();
    }
   
    exportReportToPDF() {
          viewer.export('Pdf', function (uri) {
            window.location = uri;
              }, true, { FileName: documentFileName });
        
    }

    exportReportToExcel() {
        viewer.export('Xls', function (uri) {
            window.location = uri;
        }, true, { FileName: documentFileName });
       
    }

    exportReportToRTF() {
        viewer.export('Word', function (uri) {
            window.location = uri;
        }, true, { FileName: documentFileName, EnableShapes: true });
       
    }

    exportReportToText() {

        //ToDo:
      
    }

    reportZoomIn() {
       
        var repExt = reportName.substr(reportName.indexOf(".") + 1)
        if (repExt == "rdlx") {
            element = $(".document-view");
        } else {
            element = $(".document-view").find("div").eq(0).children("div");
        }
        currentZoom *= 1.1;
        element.css("zoom", currentZoom);
        element.css("-moz-transform", "Scale(" + currentZoom + ")");
        element.css("-moz-transform-origin", "0 0");
    }

    reportZoomOut() {
        
        var repExt = reportName.substr(reportName.indexOf(".") + 1)
        if (repExt == "rdlx") {
            element = $(".document-view");
        } else {
            element = $(".document-view").find("div").eq(0).children("div");
        }
        if (currentZoom > 0.6) {
            currentZoom *= 0.9;
            element.css("zoom", currentZoom);
            element.css("-moz-transform", "Scale(" + currentZoom + ")");
            element.css("-moz-transform-origin", "0 0");
        }

    }

}
