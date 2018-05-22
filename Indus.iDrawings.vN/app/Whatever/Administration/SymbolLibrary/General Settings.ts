import {Component, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {AdministrationService} from '../../../Models/Administration/administration.service';
import {AddSymbolLibrary} from './AddSymbol';
import {SymbolAssign}from './AssignSymbol';
import { FileUploadComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fileuploadcomponent.component';
import {IField} from  '../../../Framework/Models/Interface/IField';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'General-Settings',
    templateUrl: './app/Views/Administration/SymbolLibrary/General Settings.html',
    directives: [SectionComponent, AddSymbolLibrary, FileUploadComponent, PageComponent, SymbolAssign]

})

export class SymbolLibrarySettings{
    pageTitle: string = "Symbol Library";
    pagePath: string;
    sectionExpansionStatus = [{ "title": "Add Symbol", "isExpanded": false }, { "title": "Assign Symbol", "isExpanded": false }];
    fieldObject: IField[];

    constructor(private administrationService: AdministrationService) {}
    ngOnInit() {
        debugger
        var contextObj = this;
        contextObj.pagePath = "Settings/Administration/Symbol Library";
            
    }

    onSectionExpandChange(obj) {
        for (var i = 0; i < this.sectionExpansionStatus.length; i++) {
            if (this.sectionExpansionStatus[i].title !== obj[1].title) {
                this.sectionExpansionStatus[i].isExpanded = false;
            } else {

                this.sectionExpansionStatus[i].isExpanded = true;


            }
        }
        var updatedData = new Array();/*To notify the watcher about the change*/
        updatedData = updatedData.concat(this.sectionExpansionStatus);
        this.sectionExpansionStatus = updatedData;
        console.log("onSectionExpandChange", this.sectionExpansionStatus);
    };

}
