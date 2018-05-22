import { ViewEncapsulation,Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import { IField } from '../../../Framework/Models//Interface/IField'
import { ObjectsService } from '../../../Models/Objects/objects.service'

@Component({
    selector: 'connectivity-rule-addedit',
    templateUrl: './app/Views/Objects/Connectivity/connectivity-rule-addedit.component.html',
    providers: [ObjectsService, NotificationService],
    directives: [FieldComponent],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'objCategoryId', 'previewConnectivity'],    
    encapsulation: ViewEncapsulation.None
})

export class ConnectivityRuleAddEdit  {
    selectedId: number;  
    previewRelationship: string = "";
    previewRevRelationship: string = "";
    firstComponentType: string = "";
    secondComponentType: string = "";
    objCategoryId: any;    
    @Input() action: string;  
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();

    constructor(private objService: ObjectsService, private _notificationService: NotificationService) { }


    ngOnInit() {   
        if (this.action == "edit") {
            this.showPreview(this.fieldDetailsAdd,1);
            } 
    }

    onSubmitData(event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    }

    showPreview(dataSource,target) {
        var contextObj = this;           
           
        if (target == 1) {
            contextObj.secondComponentType = "";
            contextObj.firstComponentType = "";
            contextObj.previewRelationship = "";
            contextObj.previewRevRelationship = "";
                for (var i = 0; i < dataSource.length; i++) {

                    if (dataSource[i].FieldId == "2606") {
                        contextObj.getAssociationForPreview(dataSource[i].FieldValue, contextObj);
                    }
                    else if (dataSource[i].FieldId == "2605") {

                        var firstComp = dataSource[i].LookupDetails["LookupValues"].find(function (item) {
                            return item.Id == dataSource[i].FieldValue
                        });

                        if (firstComp != undefined && firstComp != "") {
                            contextObj.firstComponentType = firstComp.Value;
                        }
                    } else if (dataSource[i].FieldId == "2607") {

                        var secondComp = dataSource[i].LookupDetails["LookupValues"].find(function (item) {
                            return item.Id == dataSource[i].FieldValue
                        });

                        if (secondComp != undefined && secondComp != "") {
                            contextObj.secondComponentType = secondComp.Value;
                        }
                    }
                }
            } else {

                if (dataSource.FieldId == "2606") {
                    contextObj.getAssociationForPreview(dataSource.FieldValue, contextObj);
                } else if (dataSource.FieldId == "2605") {
                    contextObj.firstComponentType = "";
                    var firstComp = dataSource.LookupDetails.LookupValues.find(function (item) { return item.Id == dataSource.FieldValue })
                    if (firstComp != undefined && firstComp != "") {
                        contextObj.firstComponentType = firstComp.Value;
                    }
                } else if (dataSource.FieldId == "2607") {
                    contextObj.secondComponentType = "";
                    var secondComp = dataSource.LookupDetails.LookupValues.find(function (item) { return item.Id == dataSource.FieldValue })
                    if (secondComp != undefined && secondComp != "") {
                        contextObj.secondComponentType = secondComp.Value;
                    }
                }
            }
       

    }
    private getAssociationForPreview(selId, contextObj) {
        contextObj.previewRelationship = "";
        contextObj.previewRevRelationship = "";
        var objReportFields = [{

            ReportFieldId: "4456",
            Value: contextObj.objCategoryId
        }];
        contextObj.objService.GetAssociationforselectedConnection(selId, JSON.stringify(objReportFields)).subscribe(function (resultData) {
            var parsedResult = JSON.parse(resultData.FieldBinderData);
            contextObj.previewRelationship = parsedResult[0]["Relationship"];
            contextObj.previewRevRelationship = parsedResult[0]["Reverse Relationship"];


        });
    }

    dropDownChange(event) {
        var contextObj = this;
        if (event.ddlRelationShipEvent.ChildFieldObject.FieldValue == "-1")
        {
            debugger
            switch (event.ddlRelationShipEvent.ChildFieldObject.FieldId)
            {
                case 2606:
                    contextObj.previewRelationship = "";
                    contextObj.previewRevRelationship = "";
                    break;
                case 2605:
                    contextObj.firstComponentType = "";
                    break;
                case 2607:
                    contextObj.secondComponentType = "";
                    break;
            }     
        }
        else {
            contextObj.showPreview(event.ddlRelationShipEvent.ChildFieldObject,0);
        }


    }

    postSubmit(strsubmitField: string, target: number) {

        var contextObj = this;
        var tempObj = {
            ReportFieldId: 649,
            Value: contextObj.objCategoryId
        }
        var arrayField = JSON.parse(strsubmitField);

        var firstComp = arrayField.find(function (item) { return item.ReportFieldId == "4481" })
        var secondComp = arrayField.find(function (item) { return item.ReportFieldId == "4482" })

        if (firstComp.Value == secondComp.Value) {

            contextObj._notificationService.ShowToaster("Select different component Types", 5);

        }
        else {
            arrayField = arrayField.concat(tempObj);
            strsubmitField = JSON.stringify(arrayField);
            var contextObj = this;
            contextObj.objService.AddConnectivityRules(strsubmitField, this.selectedId, target).subscribe(function (resultData) {

                switch (resultData["Data"].StatusId) {

                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        if (target == 1) {
                            contextObj._notificationService.ShowToaster("Connectivity Rule added", 3);
                        }
                        else {
                            contextObj._notificationService.ShowToaster("Connectivity Rule updated", 3);
                        }
                        contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj._notificationService.ShowToaster("Connectivity Rule already exists", 5);
                        }
                        else if (resultData["Data"].ServerId == -2) {
                            contextObj._notificationService.ShowToaster("Connectivity Rule already exists in reverse order", 5);
                        }
                        else {
                            contextObj._notificationService.ShowToaster("Unknown problem", 1);
                        }
                        break;
                }
            });
        }

    }


}