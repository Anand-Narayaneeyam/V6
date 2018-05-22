
import {Component, Input, Output, EventEmitter, OnInit, SimpleChange} from '@angular/core';
import {IField} from '../../../Models/Interface/IField';
import {Validation} from '../../Validation/validate.directive';
import {Notification} from '../../../Whatever/Notification/notify.component';
import {NotificationService } from '../../../Models/Notification/notify.service';
import {AdministrationService } from '../../../../models/administration/administration.service';
import {GeneralFunctions} from '../../../../Models/Common/General';
//import { ImageUploadComponent } from './imageuploadcomponent.component';
import { FileUploadComponent } from './fileuploadcomponent.component';

@Component({
    selector: 'barcodeReader',
    templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/barcodeReader.html',
    inputs: ['fieldObject'],
    styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
    directives: [Validation, FileUploadComponent],
    providers: [NotificationService, AdministrationService, GeneralFunctions]
})

export class BarcodeReaderComponent implements OnInit {
    public fieldObject: IField[];
    @Input() validationData;
    @Output() barcodeData = new EventEmitter();
    barcodeResult: string;
    validFileExt=[".jpg", ".jpeg"];
    constructor(private notificationService: NotificationService, private administrationService: AdministrationService, private getData: GeneralFunctions) {
    }

    ngOnInit() {
    }


    public getImageData(event: any) {
        var context = this;
        context.administrationService.getBarCodeData(JSON.stringify(event)).subscribe(function (result) {
            context.barcodeResult = result.Data;
            if (context.barcodeResult != null && context.barcodeResult != '') {
                context.barcodeData.emit({
                    barcode: context.barcodeResult

                });
            }

        });
    }


}


