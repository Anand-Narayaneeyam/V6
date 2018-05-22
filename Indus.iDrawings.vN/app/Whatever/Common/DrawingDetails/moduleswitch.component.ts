import {Component, Output, EventEmitter } from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import { ListBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component'
import {DrawingDetailsService} from '../../../Models/Common/drawingdetails.service';

@Component({
    selector: 'module-switch',
    templateUrl: 'app/Views/Common/DrawingDetails/moduleswitch.component.html',
    directives: [ ListBoxComponent],
    providers: [HTTP_PROVIDERS, DrawingDetailsService],
    inputs: ["selectedIds"]
})

export class ModuleSwitchComponent {

    moduleSwitchList: IField[];
    errorMessage: string;
    @Output() onChange = new EventEmitter(); 
    constructor(private drawingDetailsService: DrawingDetailsService) {
        this.drawingDetailsService.getModuleSwitchData().subscribe(
            fieldDetails => this.moduleSwitchList = fieldDetails["data"],
            error => this.errorMessage = error);
    }

//    private changeModules(event) {
//        console.log("Array", event.MultiFieldValues);
//        this.onChange
//}
    selectAllOptions(event: any) {
        //this.changeModules(this.moduleSwitchList)
        this.onChange.emit(this.moduleSwitchList)
    }
}