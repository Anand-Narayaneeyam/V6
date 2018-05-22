import { Component, OnInit } from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { DocumentGroupsAccessibletoaUserComponent } from './document-groups-accessible-to-user';
import { DocumentGroup } from './document-group-component';
import { AllDocumentsAccessibletoaUserComponent } from './alldocu-accessble-touser-comp';
import { DocumentsDirectlyAccessibletoaUserComponent } from './documents-directly-accessibletoaUser';
import { DirectAccesstoaDocumentbyManyUsersComp } from './directAccesstoa-documentbyManyUsers';

@Component({
    selector: 'documents-accessControl',
    templateUrl: './app/Views/Documents/Access Control/access-control-component.html',
    directives: [SectionComponent, PageComponent, DocumentGroupsAccessibletoaUserComponent, DocumentGroup, AllDocumentsAccessibletoaUserComponent, DocumentsDirectlyAccessibletoaUserComponent, DirectAccesstoaDocumentbyManyUsersComp]
})

export class DocumentsAccessControlsComponent implements OnInit {
    pageTitle: string = "Access Control";
    pagePath = "Settings / Documents / Access Control";
    isMAdmin: boolean = false;
    sectionExpansionStatus = [{ "title": "Document Groups", "isExpanded": false }, { "title": "Document Groups Accessible to a User", "isExpanded": false }, { "title": "Documents Directly Accessible to a User", "isExpanded": false }, { "title": "Direct Access to a Document by Many Users", "isExpanded": false }, { "title": "View All Documents Accessible to a User", "isExpanded": false }];
    constructor(private administrationService: AdministrationService) {

    }
    ngOnInit(): void {
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
    };
}
