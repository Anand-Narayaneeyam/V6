/// <reference path="../../../framework/whatever/search/search.component.ts" />

import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { StringTextBoxComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/stringtextbox.component'
import { FileUploadComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/fileuploadcomponent.component'
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service';


@Component({
    selector: 'barCode',
    templateUrl: './app/Views/WorkOrder/BarCode/barCode.component.html',
    directives: [FieldComponent, StringTextBoxComponent, FileUploadComponent],
    providers: [GeneralFunctions, AdministrationService, WorkOrdereService],
    inputs: ['fileUploadField', 'textField'],
    encapsulation: ViewEncapsulation.None
})

export class BarCodeComponent implements OnInit {

    @Output() objectId = new EventEmitter();
    fileUploadField: IField = undefined;
    textField: IField = undefined;
    strFileExtensions: string[] = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG'];
    dynamicFields: IField[] = undefined;
    btnName: string = 'Search';
    dataKey: string = '';

    constructor(private administrationServices: AdministrationService, private generFun: GeneralFunctions, private workOrderService: WorkOrdereService) { }

    ngOnInit() {
        var contextObj = this;
        //contextObj.dynamicFields = [contextObj.fileUploadField, contextObj.textField];
    }

    public txtBoxChanges(event) {

    }

    public getFileData(event) {

    }

    public onSubmit(event) {
        var value = this.textField.FieldValue;
        var dbobjectId = 50881;
        var contextObj = this;
        contextObj.workOrderService.getObjectIdforEquipment(dbobjectId, value).subscribe(function (resultData) {
            var objId = JSON.parse(resultData["Data"]);
            contextObj.objectId.emit(objId[0].ObjectId);
        });

    }

}
