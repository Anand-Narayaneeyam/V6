import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { GeneralFunctions} from '../../../Models/Common/General';
import {AdministrationService} from '../../../Models/Administration/administration.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'






@Component({
    selector: 'Adding_Symbol',
    templateUrl: './app/Views/Administration/SymbolLibrary/AddingSymbol.html',
    directives: [Notification, SubMenu, SplitViewComponent, FieldComponent],
    providers: [HTTP_PROVIDERS, NotificationService, AdministrationService, NotificationService],
    inputs: ['fieldDetailsAdd', 'action', 'btnName', 'Coordinates', 'TextSize', 'EntityText'], 
    

})

export class AddingSymbolLibrary {
    @Input() action: string;
    @Input() fieldDetailsAdd: IField[];
    @Input() Coordinates: string;
    @Input() EntityText: string;
    @Input() TextSize: string;
    fieldObject: IField;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    @Output() closeSecondaryView = new EventEmitter();




    constructor(private notificationService: NotificationService,private _notificationService: NotificationService, private generalFunctions: GeneralFunctions, private administrationService: AdministrationService) { }

    ngOnInit() {
        var contextObj = this;
    }


    onSubmitData(event) {
        var contextObj = this;
        contextObj.splitviewInput.showSecondaryView = false;
        var AddSymbolfields = JSON.parse(event["fieldobject"])

        var symbolName = AddSymbolfields.find(function (item) { return item.ReportFieldId === 678 }).Value;
        var symbolCategory = AddSymbolfields.find(function (item) { return item.ReportFieldId === 679 }).Value;

        var reportfieldIdArray: ReportFieldIdValues[] = [];
        reportfieldIdArray.push({
            ReportFieldId: 678,
            Value: symbolName,
        });
        reportfieldIdArray.push({
            ReportFieldId: 679,
            Value: symbolCategory,
        });
        reportfieldIdArray.push({
            ReportFieldId: 681,
            Value: contextObj.EntityText,
        });
        reportfieldIdArray.push({
            ReportFieldId: 682,
            Value: contextObj.TextSize,
        });
        reportfieldIdArray.push({
            ReportFieldId: 680,
            Value: contextObj.Coordinates,
        });

        contextObj.administrationService.AddingSymbol(JSON.stringify(reportfieldIdArray)).subscribe(function (resultData) {
            if (resultData.Data.ServerId > 0) {
                contextObj.closeSecondaryView.emit({ returnData: resultData.Data.ServerId });
            }

        });
    }

}
interface ReportFieldIdValues {
    ReportFieldId: number,
    Value: any
}
    