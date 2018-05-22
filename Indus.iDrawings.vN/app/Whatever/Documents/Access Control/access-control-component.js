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
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var document_groups_accessible_to_user_1 = require('./document-groups-accessible-to-user');
var document_group_component_1 = require('./document-group-component');
var alldocu_accessble_touser_comp_1 = require('./alldocu-accessble-touser-comp');
var documents_directly_accessibletoaUser_1 = require('./documents-directly-accessibletoaUser');
var directAccesstoa_documentbyManyUsers_1 = require('./directAccesstoa-documentbyManyUsers');
var DocumentsAccessControlsComponent = (function () {
    function DocumentsAccessControlsComponent(administrationService) {
        this.administrationService = administrationService;
        this.pageTitle = "Access Control";
        this.pagePath = "Settings / Documents / Access Control";
        this.isMAdmin = false;
        this.sectionExpansionStatus = [{ "title": "Document Groups", "isExpanded": false }, { "title": "Document Groups Accessible to a User", "isExpanded": false }, { "title": "Documents Directly Accessible to a User", "isExpanded": false }, { "title": "Direct Access to a Document by Many Users", "isExpanded": false }, { "title": "View All Documents Accessible to a User", "isExpanded": false }];
    }
    DocumentsAccessControlsComponent.prototype.ngOnInit = function () {
    };
    DocumentsAccessControlsComponent.prototype.onSectionExpandChange = function (obj) {
        for (var i = 0; i < this.sectionExpansionStatus.length; i++) {
            if (this.sectionExpansionStatus[i].title !== obj[1].title) {
                this.sectionExpansionStatus[i].isExpanded = false;
            }
            else {
                this.sectionExpansionStatus[i].isExpanded = true;
            }
        }
        var updatedData = new Array(); /*To notify the watcher about the change*/
        updatedData = updatedData.concat(this.sectionExpansionStatus);
        this.sectionExpansionStatus = updatedData;
    };
    ;
    DocumentsAccessControlsComponent = __decorate([
        core_1.Component({
            selector: 'documents-accessControl',
            templateUrl: './app/Views/Documents/Access Control/access-control-component.html',
            directives: [section_component_1.SectionComponent, page_component_1.PageComponent, document_groups_accessible_to_user_1.DocumentGroupsAccessibletoaUserComponent, document_group_component_1.DocumentGroup, alldocu_accessble_touser_comp_1.AllDocumentsAccessibletoaUserComponent, documents_directly_accessibletoaUser_1.DocumentsDirectlyAccessibletoaUserComponent, directAccesstoa_documentbyManyUsers_1.DirectAccesstoaDocumentbyManyUsersComp]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService])
    ], DocumentsAccessControlsComponent);
    return DocumentsAccessControlsComponent;
}());
exports.DocumentsAccessControlsComponent = DocumentsAccessControlsComponent;
//# sourceMappingURL=access-control-component.js.map