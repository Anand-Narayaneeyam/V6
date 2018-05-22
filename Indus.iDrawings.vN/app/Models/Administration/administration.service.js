var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var http_1 = require('@angular/http');
var HttpHelpers_1 = require('../../Whatever/utils/HttpHelpers');
require('rxjs/Rx');
var AdministrationService = (function (_super) {
    __extends(AdministrationService, _super);
    function AdministrationService(http) {
        _super.call(this, http);
        this.http = http;
        ///////////////////////new ////////
        this.listFieldObjUrl = 'Common/GetListAppFormFields';
        this.ExportToExcel = 'Common/ExportToExcel';
        this.CustomerFolderName = 'Common/GetCustomerFolderName';
        this.listDataListUrl = 'Common/GetAppFormDataList';
        this.addDataUrl = 'Common/GetAddAppFormFields';
        this.editDataUrl = 'Common/GetEditAppFormFields';
        this.submitAddUrl = 'Common/InsertAppFormData';
        this.submitEditUrl = 'Common/UpdateAppFormData';
        this.lookupUrl = 'Common/GetFieldLookupValues';
        this.deleteUrl = 'Common/DeleteAppFormData';
        this.keywordLookUpUrl = 'Common/GetKeywordSearchLookups';
        this.deleteFieldValue = 'Common/DeleteAdditionalDataFieldValues';
        this.GetAdvancedSerachResulturl = 'Common/GetAdvancedSerachResult';
        this.AdvanceSearchLookUpUrl = 'Common/GetAdvancedSerachLookups';
        this.CheckIsEntityReferenceUrl = 'Common/CheckIsEntityReferenceExists';
        this.removeFloor = 'SiteBuildingFloor/RemoveFloors';
        this.getWhitelistUrl = 'Common/GetWhiteListDetails';
        this.getFieldFormatListUrl = 'Common/GetFieldFormatDetails';
        this.GetOrganizationUnitsUrl = 'Common/GetOrganizationUnits';
        this.siteCloseUrl = 'SiteBuildingFloor/CloseSite';
        this.siteReopenUrl = 'SiteBuildingFloor/ReOpenSite';
        this.buildingCloseUrl = 'SiteBuildingFloor/CloseBuilding';
        this.buildingReopenUrl = 'SiteBuildingFloor/ReOpenBuilding';
        this.CheckFieldValueExist = 'Common/GetAdditionalFieldHaveLookUpValues';
        this.checkIsInUse = 'Common/GetAdditionalFieldIsInUse';
        this.getCustomReportDetailsforSelectedAdditionalField = 'Common/GetCustomReportDetailsforSelectedAdditionalField';
        this.GetOrganizationMenu = 'Administration/GetCustomerOrganizationalStructureLookup';
        this.listLookUpOrgFieldObjUrl = "Administration/GetOrganizationalUnitsByLevelID";
        this.getAdditionalFieldDetails = 'Common/GetAdditionalDataFieldDetails';
        this.GetBaseOrganizationUsersUrl = 'User/GetBaseOrganizationUsers';
        this.UserDetails = 'User/GetUserDetails';
        this.insertUserUrl = 'User/InsertUser';
        this.updateModulacces = 'User/UpdateModuleAccess';
        this.updateDivacces = 'User/UpdateDivisionAccess';
        this.updateModulAdminacces = 'User/UpdateModuleAdminAccess';
        this.updateDivisionAdminacces = 'User/UpdateDivisionAdminAccess';
        this.UpdateDivisionAccessToManyUserUrl = 'User/UpdateDivisionAccessToManyUser';
        this.getMaxWOUserCreated = 'User/GetMaxWorkOrderUserCreated';
        this.getMaxUsrCreated = 'User/GetMaxUserCreated';
        this.customerFeatures = 'Common/GetSubscribedFeatures';
        this.getUserForRole = 'User/GetUserListForUserRole';
        this.getAccessTemplatesbyRole = 'User/GetAccessTemplatesForUserRole';
        this.checkUserNameAvailability = 'User/CheckLoginNameAvailability';
        this.checkMailDomains = 'User/CheckdomainValidations';
        this.getMaxandWOUSer = 'User/GetMaxUserandWOCreated';
        this.reserPswd = 'User/ResetPasswordUserList';
        this.resetPwdandMail = 'User/ResetpasswordAndSendEmail';
        this.getPswdPolicy = 'User/GetPasswordPolicy';
        this.isPwdChangePossible = 'User/GetPasswordChangePossible';
        this.getSessionValues = 'Common/GetSessionValues';
        this.logUserDataUrl = 'Logbook/GetLogUsers';
        this.logEntityDataUrl = 'Logbook/GetLogEntities';
        this.logEventsDataUrl = 'Logbook/GetLogEvents';
        this.logDataUrl = 'Logbook/GetLogs';
        this.logDataOnLoadUrl = 'Logbook/GetAllLogs';
        this.logGetLogsByConditionsUrl = 'Logbook/GetLogsByConditions';
        this.downloadUrl = 'Common/ArrayDownloadFile';
        this.checkIsModuleAdminUrl = 'Common/IsModuleAdmin';
        this.checkActionPointInUseUrl = 'WorkFlow/CheckActionPointInUse';
        this.CheckAdditionalDataFieldLookUpValueInUseurl = 'Common/CheckAdditionalDataFieldLookUpValueInUse';
        this.attachmentDate = "Common/GetCurrentDateTime";
        this.readExcelUrl = "Administration/uploadExcel";
        this.SavedImportColumnsUrl = "Administration/GetSavedImportColumns";
        this.FolderPathforImportUrl = "Administration/GetFolderPathforImport";
        this.GetImportColumnsUrl = "Administration/GetImportColumns";
        this.GetObjImportColumnsUrl = "Administration/GetObjectImportColumns";
        this.GetImportTepmlateIdUrl = "Administration/GetImportTemplateId";
        this.insertImportTemplateFieldsUrl = "Administration/InsertImportTemplateFields";
        this.updateSpaceImportTemplateFieldsUrl = "Administration/ImportSpaceData";
        this.ImportEmployeeDetailsUrl = "Administration/ImportEmployeeDetails";
        this.ImportAssetDetailsUrl = "Administration/ImportObjectDetails";
        this.ImportDocumentDetailsUrl = "Administration/ImportDocumentDetails";
        this.attachmentAssetClassorNotUrl = 'Common/CheckObjectClassAttachments';
        this.checkWorkFlowCategoryInUseUrl = 'Administration/CheckWorkFlowCategoryInUse';
        this.getBarCodeDataUrl = 'Common/DecodeBarCodeFromImageUploaded';
        this.GetOrganizationurl = 'Administration/GetCustomerOrganztnlStructureLookup';
        this.getIsModuleAdminUrl = 'Common/IsModuleAdmin';
        this.getSSOEnabledUrl = 'Administration/SSOEnabled';
        this.subscribedFeatureUrl = 'Common/GetSubscribedFeatures';
        this.getReportsAccessibleByUserUrl = 'Administration/GetReportsAccessibleByUser';
        this.updateReportAccessToUserUrl = 'User/UpdateReportAccessToUser';
        this.getOrganizationalUnitListForaSelectedUserUrl = 'User/GetOrganizationalUnitListForaSelectedUser';
        this.userReportsAccessListFrmId = 2469;
        //DashBoard
        this.getUserCountForDashBoard = 'Administration/GetUserCountForDashBoard';
        this.getUsersExpiringSoonForDashBoard = 'Administration/GetUsersExpiringSoonForDashBoard';
        this.getDashboardDetailsForSpaceBarChart = 'Administration/GetDashboardDetailsForSpaceBarChart';
        this.getModuleDetailsForDashBoard = 'Administration/GetModuleDetailsForDashBoard';
        this.getDrawingDistributionForDashBoard = 'Administration/GetDrawingDistributionForDashBoard';
        this.getkey = 'Administration/ChangePassword';
        this.updatePasswordUrl = 'Administration/ChangePasswordConfirmation';
        this.helpsMenuUrl = 'Common/GetHelpMenuDetails';
        this.getUserAccessibleSites = 'Common/GetUserAccessibleSites';
        this.checkIsSiteLevelAdmin = 'Common/CheckIsSiteLevelAdmin';
        this.checkIsSiteLevelUser = 'Common/CheckIsSiteLevelUser';
        this.SpaceFunctionCustomizedName = 'Space/getSpaceFunctionCustomizedName';
        this.getReportMenusbyModelWise = 'Common/GetUserAccessReportDetails';
        this.feedbackSubmiturl = 'Common/SendFeedback';
        this.StatusXref = 'Common/InsertXRefedFloorDrawingDetails';
        this.ListDataForSchedulingReportUrl = 'Common/GetCustomerAccessScheduleReportDetails';
        this.updateSchedulingReportDataUrl = 'Common/UpdateCustomerAccessScheduleReports';
        this.insertUpdateCustomerUrl = 'Administration/InsertUpdateCustomer';
        this.getCustomerDrawingCategoriesUrl = 'Administration/GetCustomerDrawingCategories';
        this.insertCustomerDrawingCategoriesUrl = 'Administration/InsertCustomerDrawingCategories';
        this.insertCustomerPermitedFilesUrl = 'Administration/InsertCustomerPermitedFiles';
        this.GetUserLicenseSetupUrl = 'Administration/GetUserLicenseSetup';
        this.GetUserLicenseSetupForCustomersUrl = 'Administration/GetUserLicenseSetupForCustomers';
        this.UpdaterolewiseUserLicenseSetupForCustomersUrl = 'Administration/UpdateUserLicensingSetupforCustomers';
        this.UpdateUserLicenseSetupForCustomersUrl = 'Administration/UpdateUserLicensingSetup';
        this.checkDrawingLayerInUseUrl = 'Administration/CheckDrawingLayerForModule';
        //private LogOutUrl = 'Account/LogOff';
        this.updateLogOutCountUrl = 'Common/UpdateLogOutCount';
        this.ViewDWGfile = 'Common/ViewDWGfile';
        this.InsertSymbolToLibrary = 'Common/InsertSymbolLibrary';
        this.customerListFormId = 528;
        this.customerAddEditFormId = 529;
        this.assignDwgCategoryFormId = 530;
        this.allowedFileTypesFormId = 553;
        this.userLicenseSetupFormId = 535;
        this.sitelistFormId = 44;
        this.siteaddEditformId = 49;
        this.buildinglistFormId = 1;
        this.buildingaddEditFormId = 2;
        this.floorListFormId = 71;
        this.flooraddeditFormID = 91;
        this.drawingLayerNameFormID = 31;
        this.addlDataFieldListFormId = 97;
        this.addlDataFieldAddEditFormId = 98;
        this.fieldValueListFormId = 109;
        this.plotStyleListFrmId = 33;
        this.plotStyleAddEditFrmId = 51;
        this.UserListFrmId = 53;
        this.UserAddEditFrmId = 54;
        this.UserModAccessFrmId = 85;
        this.UserDrwgAccess = 86;
        this.UserDvsnAccessFrmId = 87;
        this.UserModAdminSettFmId = 89;
        this.UserDivisionAdminSetFrmId = 90;
        this.AttachmentCategoryFrmId = 37;
        this.MailDomainsFrmId = 42;
        this.ReportSetupFrmId = 84;
        this.AssignStylesDrawingLyrFrmId = 106;
        this.AdminActionPointsFrmId = 114;
        this.AdminAddEditActionPointFrmId = 117;
        this.LogApplicationListFrmId = 100;
        this.LogParameterListFrmId = 108;
        this.LogUserListFrmId = 129;
        this.LogEntityListFrmId = 133;
        this.LogActivityListFrmId = 138;
        this.AdminActionPointUserFrmId = 134;
        this.AdminActionPointUserGroupFrmId = 137;
        this.attachmentDetailsFormId = 128;
        this.attachmentDetailsAddEditFormId = 304;
        this.ResetPwdFrmId = 175;
        this.displaySettingsFrmId = 150;
        this.GLAccountsFrmId = 298;
        this.dataImport = 302;
        this.UserGroupFormId = 393;
        this.UserGroupUserListFormId = 398;
        this.UserGroupNewUserFormId = 404;
        this.UserGroupUpdateUserFormId = 406;
        this.MessageTemplatesListFormId = 524;
        this.MessageTemplatesAddEditFormId = 522;
        this.CalendarFormId = 545;
        this.CalendarExceptionFormId = 561;
        this.CreateNewCalendarFormId = 549;
        this.SetWorkingTimeFormId = 551;
        this.BuildingConditionListFormId = 552;
        this.BuildingConditionAddEditFormId = 554;
        this.WorkingTimeBasedOnDateFormId = 559;
        this.seasonsListFormId = 563;
        this.seasonsAddEditFormId = 565;
        this.CalendarExceptionAddEditFormId = 566;
        this.ClientListFormId = 586;
        this.AddSymbolformid = 584;
        this.AddSymbolfeilds = 593;
        this.AssignSymbolFormId = 599;
        //////new///////////////
        this.passwordPolicyFieldData = 'Common/GetEditAppFormFields';
        this.customerSupportFieldData = 'Common/GetEditAppFormFields';
        this.organizationalStructureFieldData = 'MockData/Data/organizational-sturcture.json';
        /* private attachmentCategoryData = 'MockData/Data/atachment-categoriesData.json'; */
        this.attachmentCategoryData = 'Common/GetAppFormDataList';
        this.CheckMailDomainInUseUrl = 'Common/CheckMailDomainInUse';
        this.CheckAttachmentCategoryInUseUrl = 'Common/CheckAttachmentCategoryInUse';
        /*private attachmentCategoryFields = 'MockData/Data/attachment-categoriesFields.json'; */
        this.getAllColorsData = 'Common/GetAllColors';
        this.getPrivilegesOfPage = 'Common/GetPrivilegesOfPage';
        this.GetStatus = 'Common/GetEntityStatus';
        this.InsertAttachmentCategoryurl = 'Common/InsertAttachmentCategory';
        this.attachmentCategoryFields = 'Common/GetListAppFormFields';
        /* private mailDomainData = 'MockData/Data/mail-domainData.json'; */
        /* private mailDomainFields = 'MockData/Data/mail-domainFields.json'; */
        this.contactDetailsFieldData = 'MockData/Data/contact-details_fields.json';
        this.adminMainMenu = 'MockData/menu/admin.json';
        this.spaceMainMenu = 'MockData/menu/As-builts.json';
        this._drawingLayerURL = 'Common/GetEditAppFormFields';
        this.deleteDrawinglayersUrl = 'Common/DeleteAppFormData';
        this._submitURL = 'Common/UpdateAppFormData';
        this._submitAddURL = 'Common/InsertAppFormData';
        this.reportSetupUpdateUrl = 'Common/SaveReportSetupWithWaterMark';
        this.contactDetailsSetupUpdateUrl = 'Administration/UpdateContactDetails';
        this.attachmentDetails = 'Common/GetAttachmentsList';
        this.editAttachment = 'Common/UpdateAttachment';
        this.insertAttachment = 'Common/InsertAttachment';
        this.deleteAttachment = 'Common/DeleteAttachment';
        this.getAttachmentEditContent = 'Common/GetAttachmentEditContent';
        this.getCustomerPermittedFilesUrl = 'Common/GetCustomerPermittedFiles';
        this.usersList_url = 'MockData/Data/users_list.json';
        this.usersFieldList_url = 'MockData/Data/users_fieldList.json';
        this.userModulesAccess_url = 'MockData/Data/user_modules_access.json';
        this.userDivisionsAccess_url = 'MockData/Data/user_division_access.json';
        this.userDrawingAccessModules_url = 'MockData/Data/user_drawing_access_modules.json';
        this.userDrawingFloorAccessFields_url = 'MockData/Data/user-drawing_floor-accessFieldsList.json';
        this.userDrawingFloorAccess_url = 'MockData/Data/user-drawing-floor-access.json';
        this.userReportsAccessFields_url = 'MockData/Data/user-reports-accessFieldsList.json';
        this.userReportsAccess_url = 'MockData/Data/user-reports-access.json';
        this.divisionAdminSettings_url = 'MockData/Data/division-admin-settings.json';
        this.divisionAdminSettingsFields_url = 'MockData/Data/division-admin-settingsFieldsList.json';
        this.userSearchKeyWordLookup_url = 'MockData/Data/userSearchKeyWordLookup.json';
        ///Access templates
        this.accesstemplatedata_url = 'MockData/Data/access-templates-data.json';
        this.accesstemplatefields_url = 'MockData/Data/access-templates-fields.json';
        this.moduleaccess_url = 'MockData/Data/user_modules_access.json';
        this.flooraccessdata_url = 'MockData/Data/user-drawing-floor-access.json';
        this.flooraccessfields_url = 'MockData/Data/user-drawing_floor-accessFieldsList.json';
        this.divisionaccessdata_url = 'MockData/Data/user_division_access.json';
        this.drawingaccessdata_url = 'MockData/Data/access-templates-data.json';
        this.drawingaccessfields_url = 'MockData/Data/access-templates-fields.json';
        this.useraccess_url = 'MockData/Data/templateUserAccess.json';
        ///Access templates
        this.userGroupsFields = 'MockData/Data/user-groups_Fields.json';
        this.userGroupsData = 'MockData/Data/user-groups_Data.json';
        this.iDrawingsUsersFields = 'MockData/Data/iDrawings-usersFields.json';
        this.iDrawingsUsersData = 'MockData/Data/iDrawings-usersData.json';
        this.employeesUsersFields = 'MockData/Data/employees-usersFields.json';
        this.employeesUsersData = 'MockData/Data/employees-usersData.json';
        this.techniciansUsersFields = 'MockData/Data/technicians-usersFields.json';
        this.techniciansUsersData = 'MockData/Data/technicians-usersData.json';
        this.contractorsUsersFields = 'MockData/Data/contractors-usersFields.json';
        this.contractorsUsersData = 'MockData/Data/contractors-usersData.json';
        this.areaOptionFieldDetails = 'MockData/Data/area-options-fields.json';
        this.portfolioMenuUrl = 'MockData/Menu/administration_submenu.json';
        //private _SiteDataUrl = 'MockData/Data/siteList.json';
        this._SiteDataUrl = 'Common/GetAppFormDataList';
        //private _SiteColumnDataUrl = 'MockData/FieldObjects/siteColumnList.json'
        this._SiteColumnDataUrl = 'Common/GetListAppFormFields';
        // private _SiteAddEditDataUrl = 'MockData/FieldObjects/siteAddEdit.json'
        this._SiteAddEditDataUrl = 'Common/GetEditAppFormFields';
        this._BuildingDataUrl = 'MockData/Data/buildingList.json';
        this._BuildingColumnDataUrl = 'MockData/FieldObjects/buildingColumnList.json';
        this._BuildingColumnData_NewUrl = 'MockData/FieldObjects/buildingColumnList_new.json';
        this._buildingAddEditDataUrl = 'MockData/FieldObjects/buildingAddEdit.json';
        this._buildingAddEditDataServerUrl = 'Common/GetAppFormFields';
        this._buildingAddEditDataUrl_new = 'MockData/FieldObjects/buildingAddEdit_new.json';
        this._FloorDataUrl = 'MockData/Data/floorList.json';
        this._FloorColumnDataUrl = 'MockData/FieldObjects/floorColumnList.json';
        this._FloorAddEditDataUrl = 'MockData/FieldObjects/floorAddEdit.json';
        this._plotDataUrl = 'MockData/Drawing Settings/plotstylelist-mockdata.json';
        //'MockData/Drawing Settings/plotstylefieldlist-mockdata.json';
        this._plotStyleAddEdit = 'MockData/FieldObjects/PlotStyleAddEdit.json';
        this._drawingLayersFieldsDataUrl = 'Common/GetListAppFormFields';
        this._drawingLayersDataUrl = 'Common/GetAppFormDataList';
        this._layerMappingFunctionFieldsDataUrl = 'Common/GetListAppFormFields';
        this._layerMappingFunctionDataUrl = 'Common/GetAppFormDataList';
        this.logoutUrl = 'Account/LogOff';
        /* Additional Data Field*/
        this.ddlAddlDatafieldCategory = 'MockData/Data/ddl-additional-datafieldCategory.json';
        this.addlDatafield_Fields = 'MockData/Data/addl-Datafield_Fields.json';
        this.addlDatafieldFieldsAddEdit = 'MockData/Data/addlDatafieldFields-addEdit.json';
        this.addlDatafieldValidatedValues = 'MockData/Data/addlDatafield-Validated.json';
        this.site_AddlDatafieldData = 'MockData/Data/site_addlDatafield_Data.json';
        this.building_AddlDatafieldData = 'MockData/Data/building_addlDatafield_Data.json';
        this.floor_AddlDatafieldData = 'MockData/Data/floor_addlDatafield_Data.json';
        this.space_AddlDatafieldData = 'MockData/Data/space_addlDatafield_Data.json';
        this.employee_AddlDatafieldData = 'MockData/Data/space_addlDatafield_Data.json';
        this._displaySetingsDataUrl = 'Common/GetDisplaySettingData';
        this._displaySetingsDataTempUrl = 'Common/GetDisplaySettingDataTemp';
        this._updateDisplaySetingsDataUrl = 'Common/UpdateDisplaySettingsData';
        this._updateArchiveDisplaySetingsDataUrl = 'Common/UpdateCAIDisplaySettingsData';
        this._updateCustomerDisplaySetingsDataUrl = 'Common/UpdateCustomerDisplaySettings';
        this._checkprivilagesUrl = 'Common/GetUserPrivilegesofPage';
        /*  Field Values */
        this.fieldValues_Fields = 'MockData/Data/field-values_Fields.json';
        this.fieldValues_Data = 'MockData/Data/field-values_Data.json';
        /* Attachment */
        this.ddlAttachmentCategory = 'MockData/Data/ddl-attachment-category.json';
        this.attachment_Fields = 'MockData/Data/attachment-fields.json';
        this.site_AttachmentData = 'MockData/Data/site_attachment_Data.json';
        this.building_AttachmentData = 'MockData/Data/building_attachment_Data.json';
        this.floor_AttachmentData = 'MockData/Data/floor_attachment_Data.json';
        this.ddlStyleName = 'MockData/Drawing Settings/ddlstylename.json';
        this.assignStyleFieldList = 'MockData/Drawing Settings/assignstyle-drawing-layerfields.json';
        this.assignStyleList = 'MockData/Drawing Settings/assignstyle-drawing-layers.json';
        this.organizationalUnitsDataUrl = 'MockData/Data/organizationalunit_Data.json';
        this.organizationalUnitsFieldsUrl = 'MockData/Data/organizationalunits_fields.json';
        this.addorganizationalunit_DataUrl = 'MockData/Data/addorganizationalunit_Data.json';
        this.accessibleModuleForUserUrl = 'Common/GetAccessibleModulesForUser';
        this.CheckSiteInUseWorkorderUrl = "SiteBuildingFloor/CheckSiteInUse";
        this.CheckUserGroupInUse = 'User/CheckUserGroupInUse';
        ///Customer Settings
        this.custSettingsAdminsnUrl = "Administration/GetAdminCustomerSettingsFormFields";
        this.UpdateCustomerSettingsUrl = 'Administration/UpdateCustomerFeatureSubscription';
        this.GetSubscribedFeaturesWithFieldsUrl = 'Administration/GetSubscribedFeaturesWithFields';
        this.CheckAutoNumberingStatusUrl = 'Object/CheckAutoNumberingStatus';
        this.GetUniqueRoomNoUrl = 'Space/GetUniqueRoomNoExists';
        this.GetWorkOrderUsersCountUrl = 'WorkOrder/GetWorkOrderActiveUsersCount';
        this.getManageReportDataUrl = 'Common/GetScheduledReports';
        this.updateManageReportStatusDataUrl = 'Common/UpdateScheduleReportStatus';
        this.updateMultipleUserDataUrl = 'User/UpdateMultipleUserData';
        this.ImportUserDetailsUrl = "Administration/ImportUserDetails";
        this.CheckMessageTemplateInUse = 'Administration/CheckMessageTemplateInUse';
        this.InsertCalendar = 'Common/InsertCalendar';
        this.GetCalendarDetails = 'Common/GetCalendarDetails';
        this.InsertUpdateCalendarException = 'common/InsertUpdateCalendarExceptions';
        this.GetCalendarExceptionDays = 'common/GetCalendarExceptionsDays';
        this.CheckSeasonInUseUrl = 'Administration/CheckSeasonInUse';
        this.GetPlotSettingsAppConfigKey = 'Administration/GetPlotSettingsAppSetingsKey';
        this.GetRevit3DDrawingAppConfigKey = 'Administration/GetRevit3DDrawingAppSetingsKey';
        this.checkActionPointUsersAndUserGroupUrl = 'WorkFlow/CheckActionPointUsersandUserGroupsExists';
        this.SymbolLibraryfields = '';
    }
    AdministrationService.prototype.getPagePrivilege = function (pageId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:" + JSON.stringify(pageId) + " }" }, this.getPrivilegesOfPage);
    };
    AdministrationService.prototype.getcustomerlist = function () {
        return this.postaction({ Input: "{FormId: 96 }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getpasswordPolicyFields = function () {
        return this.postaction({ Input: "{FormId: 46 }" }, this.editDataUrl);
    };
    AdministrationService.prototype.updatePasswordPolicy = function (pageDetails) {
        return this.postaction({ Input: "{FormId:46,ListReportFieldIdValues:" + pageDetails + ",Id:1}" }, this.submitEditUrl);
    };
    /* Report Setup BEGIN*/
    AdministrationService.prototype.getReportSetupFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.ReportSetupFrmId + "}" }, this.editDataUrl);
    };
    AdministrationService.prototype.postUpdateReportSetupFields = function (pageDetails, fileData, strOldFileName) {
        return this.postaction({ ApplnInput: "{FormId:" + this.ReportSetupFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:1}", FileInput: fileData, OldFileName: strOldFileName }, this.reportSetupUpdateUrl);
    };
    AdministrationService.prototype.postUpdateReportSetupFieldsWithoutImage = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.ReportSetupFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:1}" }, this.submitEditUrl);
    };
    /* Report Setup END*/
    /* Color Picker Data BEGIN*/
    AdministrationService.prototype.getDataForColorpicker = function () {
        return this.postaction({}, this.getAllColorsData);
    };
    /* Color Picker Data END*/
    /* Permited File Extensions BEGIN*/
    AdministrationService.prototype.getCustomerPermittedFiles = function (pageDetails) {
        return this.postaction({ Input: "{ ListReportFieldIdValues:[{\"ReportFieldId\":331,\"Value\":\"\"}]}" }, this.getCustomerPermittedFilesUrl);
    };
    /* Permited File Extensions END*/
    AdministrationService.prototype.getCustomerSupportFields = function (target) {
        return this.postaction({ Input: "{FormId: 50 }" }, this.editDataUrl);
    };
    AdministrationService.prototype.customerSupportpostSubmit = function (pageDetails) {
        return this.postaction({ Input: "{FormId:50,ListReportFieldIdValues:" + pageDetails + ",Id:1 }" }, this.submitEditUrl);
    };
    AdministrationService.prototype.getOrganizationalStructureFields = function (formId) {
        return this.postaction({ Input: "{ FormId: " + formId + " }" }, this.editDataUrl);
    };
    AdministrationService.prototype.UpdateOrganizationalStructureFields = function (formId, pageDetails) {
        return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues:" + pageDetails + ",Id:1 }" }, this.submitEditUrl);
    };
    /* Mail Domain BEGIN*/
    AdministrationService.prototype.getMailDomainData = function () {
        return this.postaction({ Input: "{FormId:" + this.MailDomainsFrmId + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.getMailDomainFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.MailDomainsFrmId + "}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.postMailDomainInsert = function (pageDetails) {
        return this.postaction({ Input: "{ FormId:" + this.MailDomainsFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:1}", }, this.submitAddUrl);
    };
    AdministrationService.prototype.postMailDomainUpdate = function (pageDetails, selectId) {
        return this.postaction({ Input: "{ FormId:" + this.MailDomainsFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    AdministrationService.prototype.postMailDomainDelete = function (id) {
        return this.postaction({ Input: "{FormId:" + this.MailDomainsFrmId + ",Id:" + id + "}" }, this.deleteUrl);
    };
    AdministrationService.prototype.postMailDomainInUse = function (id) {
        return this.postaction({ Input: "{FormId:" + this.MailDomainsFrmId + ",Id:" + id + "}" }, this.CheckMailDomainInUseUrl);
    };
    /* Mail Domain END*/
    /* Attachment Category BEGIN*/
    AdministrationService.prototype.getAttachmentCategoryData = function () {
        return this.postaction({ Input: "{FormId:" + this.AttachmentCategoryFrmId + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.getAttachmentCategoryFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.AttachmentCategoryFrmId + "}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.postAttachmentCategoryInsert = function (pageDetails) {
        return this.postaction({ Input: "{ FormId:" + this.AttachmentCategoryFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:1}", }, this.submitAddUrl);
    };
    AdministrationService.prototype.postAttachmentCategoryUpdate = function (pageDetails, selectId) {
        return this.postaction({ Input: "{ FormId:" + this.AttachmentCategoryFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    AdministrationService.prototype.postAttachmentCategoryDelete = function (id) {
        return this.postaction({ Input: "{FormId:" + this.AttachmentCategoryFrmId + ",Id:" + id + "}" }, this.deleteUrl);
    };
    AdministrationService.prototype.postAttachmentCategoryinUse = function (id) {
        return this.postaction({ Input: "{FormId:" + this.AttachmentCategoryFrmId + ",Id:" + id + "}" }, this.CheckAttachmentCategoryInUseUrl);
    };
    /* Attachment Category END*/
    /*  LogBook BEGIN*/
    AdministrationService.prototype.getLogBookParameterFieldList = function () {
        return this.postaction({ Input: "{FormId:" + this.LogParameterListFrmId + "}" }, this.listFieldObjUrl);
    };
    /*getLogBookDataOnload() {
        return this.postaction({ Input: "{FormId:" + this.LogApplicationListFrmId + "}" }, this.logDataOnLoadUrl);
    }*/
    AdministrationService.prototype.getLogBookDataOnload = function (pageIndex, sortCol, sortDir) {
        var param = "{ FormId: " + this.LogApplicationListFrmId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}";
        return this.postaction({ Input: param }, this.logDataOnLoadUrl);
    };
    AdministrationService.prototype.postLogBookParameterFieldInsert = function (pageDetails, sortCol, sortDir) {
        if (sortCol == undefined) {
            sortCol = "";
            sortDir = "";
        }
        return this.postaction({ LogParameters: "{ FormId:" + this.LogParameterListFrmId + ",ListReportFieldIdValues:" + pageDetails + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',Id:1}", }, this.logUserDataUrl);
    };
    AdministrationService.prototype.getLogUserListColumns = function () {
        return this.postaction({ Input: "{FormId:" + this.LogUserListFrmId + "}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.postLogUserListFieldInsert = function (pageDetails, logParameterConditions) {
        return this.postaction({
            LogParameters: "{ ListReportFieldIdValues:" + logParameterConditions + "}",
            LogUserIds: "{ ListReportFieldIdValues:" + pageDetails + "}",
        }, this.logEntityDataUrl);
    };
    AdministrationService.prototype.getLogEntityListColumns = function () {
        return this.postaction({ Input: "{FormId:" + this.LogEntityListFrmId + "}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.postLogentitiesListFieldInsert = function (pageDetails, logParameterConditions, logSelectedUserIds) {
        return this.postaction({
            LogParameters: "{ ListReportFieldIdValues:" + logParameterConditions + "}",
            LogUserIds: "{ ListReportFieldIdValues:" + logSelectedUserIds + "}",
            LogEntityIds: "{ ListReportFieldIdValues:" + pageDetails + "}"
        }, this.logEventsDataUrl);
    };
    AdministrationService.prototype.getLogActivityListColumns = function () {
        return this.postaction({ Input: "{FormId:" + this.LogActivityListFrmId + "}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getLogListColumns = function () {
        return this.postaction({ Input: "{FormId:" + this.LogApplicationListFrmId + "}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.postLogListFieldInsert = function (pageDetails, logParameterConditions, logSelectedUserIds, logSelectedEntityIds, pageIndex, sortCol, sortDir) {
        return this.postaction({
            LogParameters: "{ ListReportFieldIdValues:" + logParameterConditions + "}",
            LogUserIds: "{ ListReportFieldIdValues:" + logSelectedUserIds + "}",
            LogEntityIds: "{ ListReportFieldIdValues:" + logSelectedEntityIds + "}",
            LogEventIds: "{ ListReportFieldIdValues:" + pageDetails + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}"
        }, this.logDataUrl);
    };
    /* log data on individual selections BEGIN */
    AdministrationService.prototype.postLogListOnRandomSelection = function (pageDetails, logParameterConditions, logSelectedUserIds, logSelectedEntityIds, pageIndex, sortCol, sortDir) {
        return this.postaction({
            LogParameters: "{ ListReportFieldIdValues:" + pageDetails + "}",
            LogUserIds: "{ ListReportFieldIdValues:" + "" + "}",
            LogEntityIds: "{ ListReportFieldIdValues:" + "" + "}",
            LogEventIds: "{ ListReportFieldIdValues:" + +",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}"
        }, this.logGetLogsByConditionsUrl);
    };
    /*log data on individual selections END */
    /* LogBook END*/
    /* Display Settings  BEGIN*/
    AdministrationService.prototype.getDisplaySettingsColumns = function () {
        return this.postaction({ Input: "{FormId:" + this.displaySettingsFrmId + "}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getDisplaySettingData = function (displaySettingRptFields) {
        return this.postaction({ Input: "{ListReportFieldIdValues:" + displaySettingRptFields + "}" }, this._displaySetingsDataUrl);
    };
    AdministrationService.prototype.postUpdateDataDisplaySettings = function (displaySettingRptFields, pageDetails) {
        return this.postaction({
            ApplnInput: "{ListReportFieldIdValues:" + displaySettingRptFields + "}",
            DisplaySettingsInput: pageDetails
        }, this._updateDisplaySetingsDataUrl);
    };
    AdministrationService.prototype.postUpdateArchiveDisplaySettings = function (displaySettingRptFields, pageDetails, archiveId, DrawingId) {
        return this.postaction({
            ApplnInput: "{ListReportFieldIdValues:" + displaySettingRptFields + "}",
            DisplaySettingsInput: pageDetails,
            ArchiveId: archiveId,
            DrawingId: DrawingId
        }, this._updateArchiveDisplaySetingsDataUrl);
    };
    AdministrationService.prototype.postUpdateCustomerDataDisplaySettings = function (displaySettingRptFields, pageDetails) {
        return this.postaction({
            ApplnInput: "{ListReportFieldIdValues:" + displaySettingRptFields + "}",
            DisplaySettingsInput: pageDetails
        }, this._updateCustomerDisplaySetingsDataUrl);
    };
    AdministrationService.prototype.postCheckPrivilagesForDisplaySettings = function (privilageId) {
        return this.postaction({ input: "", Privileges: privilageId }, this._checkprivilagesUrl);
    };
    AdministrationService.prototype.postcheckIsModuleAdminUrl = function (pageDetails) {
        return this.postaction({ Input: "{ListReportFieldIdValues:" + pageDetails + "}" }, this.checkIsModuleAdminUrl);
    };
    /*  Display Settings  END*/
    /* Action Points BEGIN*/
    AdministrationService.prototype.getActionPointsColumns = function () {
        return this.postaction({ Input: "{FormId:" + this.AdminActionPointsFrmId + "}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getActionPointsFieldList = function (pageIndex, sortCol, sortDir) {
        var param = "{ FormId: " + this.AdminActionPointsFrmId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}";
        return this.postaction({ Input: param }, this.listDataListUrl);
    };
    AdministrationService.prototype.listActionPointAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.AdminAddEditActionPointFrmId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.AdminAddEditActionPointFrmId + ",ParentFormId:" + this.AdminActionPointsFrmId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    AdministrationService.prototype.postSubmitActionPoints = function (pageDetails, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.AdminAddEditActionPointFrmId + ",ListReportFieldIdValues:" + pageDetails + ",ParentFormId:" + this.AdminActionPointsFrmId + "}" }, this.submitAddUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.AdminAddEditActionPointFrmId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.AdminActionPointsFrmId + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    AdministrationService.prototype.postActionPointsInUse = function (selectedId) {
        return this.postaction({ Input: "{FormId:" + this.AdminActionPointsFrmId + ",Id:" + selectedId + "}" }, this.checkActionPointInUseUrl);
    };
    AdministrationService.prototype.postDeleteActionPoints = function (selectedId) {
        return this.postaction({ Input: "{FormId:" + this.AdminActionPointsFrmId + ",Id:" + selectedId + "}" }, this.deleteUrl);
    };
    AdministrationService.prototype.getActionPointUsersColumns = function () {
        return this.postaction({ Input: "{FormId:" + this.AdminActionPointUserFrmId + "}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getActionPointUsersList = function (reportfieldIdValues, selectedid, pageIndex, sortCol, sortDir) {
        var param = "{ FormId: " + this.AdminActionPointUserFrmId + " ,ListReportFieldIdValues: " + reportfieldIdValues + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',Id:" + selectedid + "}";
        return this.postaction({ Input: param }, this.listDataListUrl);
    };
    /*getActionPointUsersFieldList(selectedid?: any, pageIndex?: number, sortCol?: string, sortDir?: string) {
          return this.postaction({ Input: "{FormId:" + this.AdminActionPointUserFrmId + ",Id:" + selectedid + "}" }, this.listDataListUrl);
          var param = "{ FormId: " + this.AdminActionPointUserFrmId + "}"
          return this.postaction({ Input: param }, this.listDataListUrl);
    } */
    AdministrationService.prototype.postSubmitActionPointUsers = function (pageDetails, selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.AdminActionPointUserFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectedId + "}" }, this.submitEditUrl);
    };
    AdministrationService.prototype.getActionPointUserGroupColumns = function () {
        return this.postaction({ Input: "{FormId:" + this.AdminActionPointUserGroupFrmId + "}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getActionPointUserGroupList = function (reportfieldIdValues, selectedid, pageIndex, sortCol, sortDir) {
        var param = "{ FormId: " + this.AdminActionPointUserGroupFrmId + " ,ListReportFieldIdValues: " + reportfieldIdValues + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',Id:" + selectedid + "}";
        return this.postaction({ Input: param }, this.listDataListUrl);
    };
    /*getActionPointUserGroupFieldList(selectedid?: any, pageIndex?: number, sortCol?: string, sortDir?: string) {
         return this.postaction({ Input: "{FormId:" + this.AdminActionPointUserGroupFrmId + ",Id:" + selectedid + "}" }, this.listDataListUrl);
         var param = "{ FormId: " + this.AdminActionPointUserGroupFrmId + "}"
         return this.postaction({ Input: param }, this.listDataListUrl);
    }  */
    AdministrationService.prototype.postSubmitActionPointUserGroup = function (pageDetails, selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.AdminActionPointUserGroupFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectedId + "}" }, this.submitEditUrl);
    };
    /* Action Points END*/
    /*Set Work Flow Category BEGIN */
    AdministrationService.prototype.getWorkflowCategoryActionPoint = function (id) {
        return this.postaction({ Input: "{FormId: 123}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getWorkFlowCategories = function (id) {
        return this.postaction({ Input: "{FormId: 253 ,ListLookupReportFieldIdValues:[{ \"FieldId\":1416,\"ReportFieldId\": 5844, \"Value\":" + id + " }]}" }, this.editDataUrl);
    };
    AdministrationService.prototype.checkWorkFlowCategoryInUse = function (id) {
        return this.postaction({ Input: "{FormId: 253 ,Id:" + id + " }" }, this.checkWorkFlowCategoryInUseUrl);
    };
    AdministrationService.prototype.getWorkflowddCategoryActionPoint = function (pageDetails) {
        return this.postaction({ Input: "{FormId:123,ListReportFieldIdValues:" + pageDetails + "}" }, this.listDataListUrl);
        /*  return this.postaction({ Input: "{FormId: 123},ListReportFieldIdValues:[" + JSON.stringify(id) + "]" }, this.listFieldObjUrl);*/
    };
    AdministrationService.prototype.postSubmitWorkflowCategoryActionPoint = function (pageDetails) {
        return this.postaction({ Input: "{ FormId: 123,ListReportFieldIdValues:" + pageDetails + ",Id: 1 }" }, this.submitEditUrl);
    };
    AdministrationService.prototype.postSubmitWorkflowCategoryActionPt = function (pageDetails) {
        return this.postaction({ Input: "{ FormId: 253,ListReportFieldIdValues:" + pageDetails + ",Id: 1 }" }, this.submitEditUrl);
    };
    /*Set Work Flow Category BEGIN */
    AdministrationService.prototype.getContactDetailsFields = function () {
        return this.postaction({ Input: "{ FormId: 56}" }, this.editDataUrl);
    };
    AdministrationService.prototype.postSubmitContactDetailsFields = function (pageDetails, fileData, strOldFileName) {
        return this.postaction({ ApplnInput: "{FormId:56,ListReportFieldIdValues:" + pageDetails + ",Id:1}", FileInput: fileData, OldFileName: strOldFileName }, this.contactDetailsSetupUpdateUrl);
    };
    AdministrationService.prototype.getDrawingLayerNames = function () {
        return this.postaction({ Input: "{ FormId:" + this.drawingLayerNameFormID + "}" }, this.editDataUrl);
        //return this.getaction<Observable<any>>(this._drawingLayerURL)
    };
    AdministrationService.prototype.postSubmit = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.drawingLayerNameFormID + ",ListReportFieldIdValues:" + pageDetails + ",Id:1 }" }, this.submitEditUrl);
    };
    AdministrationService.prototype.postSubmitEditdrawinglayer = function (pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:39,ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this._submitURL);
    };
    AdministrationService.prototype.postSubmitAdddrawinglayer = function (pageDetails) {
        return this.postaction({ Input: "{FormId:39,ListReportFieldIdValues:" + pageDetails + "}" }, this._submitAddURL);
    };
    AdministrationService.prototype.getDrawingLayersFields = function () {
        return this.postaction({ Input: "{FormId:39}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getDrawingLayersData = function () {
        return this.postaction({ Input: "{FormId:39,Id:0,ListReportFieldIdValues:[{\"ReportFieldId\":4404,\"Value\":\"0\"}]}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.postDrawingLayersDelete = function (id) {
        return this.postaction({
            Input: "{FormId:39 ,Id:" + id + "}"
        }, this.deleteDrawinglayersUrl);
    };
    AdministrationService.prototype.sortDrawingLayer = function (direction, column) {
        console.log("entered sort");
        return this.postaction({ Input: "{ FormId:39,SortColumn:'" + column + "',SortDirection:'" + direction + "',ListReportFieldIdValues:[{\"ReportFieldId\":4404,\"Value\":\"0\"}]}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.getPortfolioMenu = function () {
        return this.postgetaction(null, this.portfolioMenuUrl);
    };
    ///Site related data
    AdministrationService.prototype.getSiteData = function (index, direction, column) {
        return this.postaction({ Input: "{ FormId:" + this.sitelistFormId + ",ParentFormId:110,PageIndex:" + index + ",SortColumn:'" + column + "',SortDirection:'" + direction + "'}" }, this.listDataListUrl);
        // return this.postaction({ Input: "{FormId: 1 }" }, this._SiteDataUrl);
        //return this.postgetaction<Observable<any>>(null, this._SiteDataUrl);
    };
    AdministrationService.prototype.getSiteKeywordField = function () {
        return this.postaction({ Input: "{ FormId:107}" }, this.keywordLookUpUrl);
    };
    AdministrationService.prototype.getSiteColumnData = function () {
        return this.postaction({ Input: "{ FormId: " + this.sitelistFormId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.sitePaging = function (index, direction, column, filter, value, IsKeyword, IsAdvance) {
        return this.postaction({ Input: "{ FormId: " + this.sitelistFormId + ",ParentFormId:110,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.loadState = function (CountryId, parentFieldId) {
        return this.postaction({ Input: "{FormId:" + this.sitelistFormId + ",Id:" + CountryId + ",ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    };
    AdministrationService.prototype.loadSiteAddEdit = function (selectedId, addEdit) {
        //if (selectedId != undefined) {
        if (addEdit == "add") {
            return this.postaction({ Input: "{ FormId: " + this.siteaddEditformId + " }" }, this.addDataUrl);
        }
        else if (addEdit == "edit") {
            return this.postaction({ Input: "{ FormId: " + this.siteaddEditformId + ",Id:" + selectedId + ",ParentFormId:" + this.sitelistFormId + " }" }, this.editDataUrl);
        }
        //}
        //return this.postaction({ Input: "{ FormId: " + this.siteaddEditformId+" }" }, this.editDataUrl);
        // return this.postaction({ Input: "{FormId: 1, Id: 1 }" }, this._SiteAddEditDataUrl);
        //return this.postgetaction<Observable<any>>(null,this._SiteAddEditDataUrl)
    };
    AdministrationService.prototype.submitSiteAdd = function (pageDetails) {
        console.log('entered add service');
        return this.postaction({ Input: "{FormId:" + this.siteaddEditformId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.sitelistFormId + "}" }, this.submitAddUrl);
    };
    AdministrationService.prototype.submitSiteinlineAdd = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.sitelistFormId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.submitAddUrl);
    };
    AdministrationService.prototype.submitSiteEdit = function (pageDetails, id) {
        console.log('entered edit service');
        return this.postaction({ Input: "{FormId:" + this.siteaddEditformId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.sitelistFormId + "}" }, this.submitEditUrl);
    };
    AdministrationService.prototype.submitSiteinlineEdit = function (pageDetails, id) {
        return this.postaction({ Input: "{FormId:" + this.sitelistFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + "}" }, this.submitEditUrl);
    };
    AdministrationService.prototype.sortSite = function (index, direction, column, filter, value, IsKeyword, IsAdvance) {
        return this.postaction({ Input: "{ FormId: " + this.sitelistFormId + ",ParentFormId:110,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.submitSiteDelete = function (selectedID) {
        console.log('entered delete service');
        return this.postaction({ Input: "{FormId:" + this.sitelistFormId + ",Id:" + selectedID[0] + "}" }, this.deleteUrl);
    };
    AdministrationService.prototype.submitSiteClose = function (selectedID) {
        console.log('entered close service');
        return this.postaction({ Input: "{EntityId:" + selectedID[0] + "}" }, this.siteCloseUrl);
    };
    AdministrationService.prototype.submitSiteReopen = function (selectedID) {
        console.log('entered reopen service');
        return this.postaction({ Input: "{EntityId:" + selectedID[0] + "}" }, this.siteReopenUrl);
    };
    AdministrationService.prototype.getSiteSearchKeyWordLookup = function () {
        return this.postaction({ Input: "{FormId:107}" }, this.keywordLookUpUrl);
        //return ["Aberdeen", "Concord", "Arlington", "Framingham", "Greenwood", "Manchester", "Site 1", "WhiteField"];
    };
    AdministrationService.prototype.getloadSearch = function () {
        return this.postaction({ Input: "{FormId:113}" }, this.addDataUrl);
    };
    AdministrationService.prototype.getAdvnceSearchLookup = function () {
        return this.postaction({ Input: "{FormId:110}" }, this.AdvanceSearchLookUpUrl);
    };
    AdministrationService.prototype.SiteKeywordSeach = function (keyworsearch, index, direction, column) {
        //return this.postaction({ Input: "{ FormId:44,Filter:'" + keyworsearch + "',IsKeywordSearch:1,IsAdvancedSearch:0}" }, this.listDataListUrl);
        return this.postaction({ Input: "{FormId:44,ParentFormId:110,Filter:'" + keyworsearch + "',PageIndex:" + index + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',IsKeywordSearch:1,IsAdvancedSearch:0}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.SiteAdvanceSeachResult = function (value, index, direction, column) {
        return this.postaction({ Input: "{ FormId:44,ParentFormId:110, ListFilterIdValues: " + value + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}" }, this.listDataListUrl);
    };
    //building related data
    AdministrationService.prototype.getBuildingData = function (siteId, index, direction, column) {
        if (siteId == undefined) {
            return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + ",PageIndex:" + index + ",SortDirection:'" + direction + "'}" }, this.listDataListUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + ",ListReportFieldIdValues:[" + JSON.stringify(siteId[0]) + "],PageIndex:" + index + ",SortDirection:'" + direction + "'}" }, this.listDataListUrl);
        }
        // return this.getaction<Observable<any>>(this._BuildingDataUrl);
    };
    AdministrationService.prototype.getBuildingColumnData = function () {
        //return this.getaction<Observable<any>>(this._BuildingColumnDataUrl);
        return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + "}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.sortBuilding = function (siteId, index, direction, column, filter, value, IsKeyword, IsAdvance) {
        // return this.postaction({ Input: "{ FormId: " + this.buildinglistFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
        if (siteId.length == 0)
            return this.postaction({ Input: "{ FormId: " + this.buildinglistFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
        else
            return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + ",ListReportFieldIdValues:[" + JSON.stringify(siteId[0]) + "],SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.buildingPage = function (siteId, index, direction, column, filter, value, IsKeyword, IsAdvance) {
        if (siteId.length == 0)
            return this.postaction({ Input: "{ FormId: " + this.buildinglistFormId + ",ParentFormId:122,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
        else
            return this.postaction({ Input: "{ FormId: " + this.buildinglistFormId + ",,ListReportFieldIdValues:[" + JSON.stringify(siteId[0]) + "], ParentFormId:122,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.loadBuildingAddEdit = function (selectedId, addEdit) {
        //if (selectedId != undefined) {
        if (addEdit == "add") {
            return this.postaction({ Input: "{ FormId: " + this.buildingaddEditFormId + " }" }, this.addDataUrl);
        }
        else if (addEdit == "edit") {
            return this.postaction({ Input: "{ FormId: " + this.buildingaddEditFormId + ",Id:" + selectedId + ",ParentFormId:" + this.buildinglistFormId + " }" }, this.editDataUrl);
        }
        //}
        return this.postaction({ id: 1 }, this._buildingAddEditDataServerUrl);
        //return this.postgetaction<Observable<any>>(null, this._buildingAddEditDataUrl_new);
    };
    AdministrationService.prototype.submitBuildingAdd = function (pageDetails) {
        console.log('entered add service');
        return this.postaction({ Input: "{FormId:" + this.buildingaddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.buildinglistFormId + "}" }, this.submitAddUrl);
    };
    AdministrationService.prototype.submitBuildinginlineAdd = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.submitAddUrl);
    };
    AdministrationService.prototype.submitBuildingEdit = function (pageDetails, id) {
        console.log('entered edit service');
        return this.postaction({ Input: "{FormId:" + this.buildingaddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.buildinglistFormId + "}" }, this.submitEditUrl);
    };
    AdministrationService.prototype.submitBuildinginlineEdit = function (pageDetails, id) {
        return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + "}" }, this.submitEditUrl);
    };
    AdministrationService.prototype.submitBuildingDelete = function (selectedID) {
        console.log('entered delete service');
        return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + ",Id:" + selectedID[0] + "}" }, this.deleteUrl);
    };
    AdministrationService.prototype.submitBuildingClose = function (selectedID) {
        console.log('entered close service');
        return this.postaction({ Input: "{EntityId:" + selectedID[0] + "}" }, this.buildingCloseUrl);
    };
    AdministrationService.prototype.submitbuildingReopen = function (selectedID) {
        console.log('entered reopen service');
        return this.postaction({ Input: "{EntityId:" + selectedID[0] + "}" }, this.buildingReopenUrl);
    };
    AdministrationService.prototype.getBuildingAdvnceSearchLookup = function (siteId) {
        if (siteId == undefined) {
            return this.postaction({ Input: "{FormId:122}" }, this.AdvanceSearchLookUpUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:122,ListReportFieldIdValues:[" + JSON.stringify(siteId[0]) + "]}" }, this.AdvanceSearchLookUpUrl);
        }
        //return this.postaction({ Input: "{FormId:122}" }, this.AdvanceSearchLookUpUrl)
    };
    AdministrationService.prototype.getBuildingKeywordField = function () {
        return this.postaction({ Input: "{ FormId:121}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getBuildingSearchKeyWordLookup = function (siteId) {
        if (siteId == undefined) {
            return this.postaction({ Input: "{FormId:121}" }, this.keywordLookUpUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:121,ListReportFieldIdValues:[" + JSON.stringify(siteId[0]) + "]}" }, this.keywordLookUpUrl);
        }
        //return ["Aberdeen", "Concord", "Arlington", "Framingham", "Greenwood", "Manchester", "Site 1", "WhiteField"];
    };
    AdministrationService.prototype.BuildingAdvanceSeachResult = function (value, index, direction, column, siteIdArray) {
        if (siteIdArray == undefined) {
            return this.postaction({ Input: "{ FormId:1,ListFilterIdValues: " + value + ",ParentFormId:122,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}" }, this.listDataListUrl);
        }
        else
            return this.postaction({ Input: "{ FormId:1,ListReportFieldIdValues:[" + JSON.stringify(siteIdArray[0]) + "],ListFilterIdValues: " + value + ",ParentFormId:122,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.BuildingKeywordSeach = function (keyworsearch, siteId, index, direction, column) {
        if (siteId == undefined) {
            return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + ",ParentFormId:122,Filter:'" + keyworsearch + "',PageIndex:" + index + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',IsKeywordSearch:1,IsAdvancedSearch:0}" }, this.listDataListUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + ",ParentFormId:122,Filter:'" + keyworsearch + "', ListReportFieldIdValues:[" + JSON.stringify(siteId[0]) + "],PageIndex:" + index + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',IsKeywordSearch:1,IsAdvancedSearch:0}" }, this.listDataListUrl);
        }
    };
    //floor related data
    AdministrationService.prototype.getFloorData = function (buildingid, index, direction, column) {
        //return this.getaction<Observable<any>>(this._FloorDataUrl);
        if (buildingid == undefined) {
            return this.postaction({ Input: "{FormId:" + this.floorListFormId + ",PageIndex:" + index + ",SortDirection:'" + direction + "'}" }, this.listDataListUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.floorListFormId + ",ListReportFieldIdValues:[" + JSON.stringify(buildingid[0]) + "],PageIndex:" + index + ",SortDirection:'" + direction + "'}" }, this.listDataListUrl);
        }
    };
    AdministrationService.prototype.getFloorColumnData = function () {
        return this.postaction({ Input: "{FormId:" + this.floorListFormId + "}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.sortFloor = function (buildingid, index, direction, column, filter, value, IsKeyword, IsAdvance) {
        // return this.postaction({ Input: "{ FormId: " + this.floorListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
        if (buildingid.length == 0)
            return this.postaction({ Input: "{ FormId: " + this.floorListFormId + ",ParentFormId:125,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
        else
            return this.postaction({ Input: "{ FormId: " + this.floorListFormId + ",ParentFormId:125,ListReportFieldIdValues:[" + JSON.stringify(buildingid[0]) + "],SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.floorPage = function (index, direction, column, filter, value, IsKeyword, IsAdvance) {
        return this.postaction({ Input: "{ FormId: " + this.floorListFormId + ",ParentFormId:125,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues:" + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.loadBuilding = function (siteid, parentId) {
        //return this.postaction({ Input: "{FormId:" + this.floorListFormId + ",ListReportFieldIdValues:[" + JSON.stringify(siteid[0]) + "],ParentFieldId:" + parentId + "}" }, this.lookupUrl);
        return this.postaction({ Input: "{FormId:" + this.floorListFormId + ",Id:" + siteid + ",ParentFieldId:" + parentId + "}" }, this.lookupUrl);
    };
    AdministrationService.prototype.getStatus = function (selectedid, dbobjectid) {
        return this.postaction({ Input: "{Id:" + selectedid.toString() + "}", DbobjectId: dbobjectid.toString() }, this.GetStatus);
    };
    AdministrationService.prototype.loadFloorAddEdit = function (selectedId, addEdit) {
        //if (selectedId != undefined) {
        if (addEdit == "add") {
            return this.postaction({ Input: "{ FormId: " + this.flooraddeditFormID + " }" }, this.addDataUrl);
        }
        else if (addEdit == "edit") {
            return this.postaction({ Input: "{ FormId: " + this.flooraddeditFormID + ",Id:" + selectedId + ",ParentFormId:" + this.floorListFormId + " }" }, this.editDataUrl);
        }
        //    
        //}
        return this.getaction(this._FloorAddEditDataUrl);
    };
    AdministrationService.prototype.submitFloorAdd = function (pageDetails) {
        console.log('entered add service');
        return this.postaction({ Input: "{FormId:" + this.flooraddeditFormID + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.floorListFormId + "}" }, this.submitAddUrl);
    };
    AdministrationService.prototype.submitFloorinlineAdd = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.floorListFormId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.submitAddUrl);
    };
    AdministrationService.prototype.submitFloorEdit = function (pageDetails, id) {
        console.log('entered edit service');
        return this.postaction({ Input: "{FormId:" + this.flooraddeditFormID + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.floorListFormId + "}" }, this.submitEditUrl);
    };
    AdministrationService.prototype.submitFloorinlineEdit = function (pageDetails, id) {
        return this.postaction({ Input: "{FormId:" + this.floorListFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + "}" }, this.submitEditUrl);
    };
    AdministrationService.prototype.CheckIsEntityReferenceFound = function (Dbobject, Id) {
        return this.postaction({ Input: "{FormId:" + this.floorListFormId + ",Id:" + Id + ",ListReportFieldIdValues:" + JSON.stringify(Dbobject) + "}" }, this.CheckIsEntityReferenceUrl);
    };
    AdministrationService.prototype.submitFloorDelete = function (fieldobj, selectedID) {
        console.log('entered delete service');
        //return this.postaction({ Input: "{FormId:" + this.floorListFormId + ",Id:" + selectedID[0] + "}" }, this.deleteUrl)
        return this.postaction({ Input: "{FormId:" + this.floorListFormId + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + ",Id:" + selectedID[0] + "}" }, this.removeFloor);
    };
    AdministrationService.prototype.submitFloorClose = function (selectedID) {
        console.log('entered close service');
    };
    AdministrationService.prototype.submitFloorReopen = function (selectedID) {
        console.log('entered reopen service');
    };
    AdministrationService.prototype.getFloorAdvnceSearchLookup = function (buildingId) {
        if (buildingId == undefined) {
            return this.postaction({ Input: "{FormId:125}" }, this.AdvanceSearchLookUpUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:125,ListReportFieldIdValues:[" + JSON.stringify(buildingId[0]) + "]}" }, this.AdvanceSearchLookUpUrl);
        }
    };
    AdministrationService.prototype.getFloorSearchKeyWordLookup = function (buildingId) {
        if (buildingId == undefined) {
            return this.postaction({ Input: "{FormId:124}" }, this.keywordLookUpUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:124,ListReportFieldIdValues:[" + JSON.stringify(buildingId[0]) + "]}" }, this.keywordLookUpUrl);
        }
        //return ["Aberdeen", "Concord", "Arlington", "Framingham", "Greenwood", "Manchester", "Site 1", "WhiteField"];
    };
    AdministrationService.prototype.FloorAdvanceSeachResult = function (value, index, direction, column, buildingId) {
        if (buildingId == undefined) {
            return this.postaction({ Input: "{ FormId:71,ParentFormId:125,ListFilterIdValues: " + value + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}" }, this.listDataListUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:71,ParentFormId:125,ListFilterIdValues: " + value + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1,ListReportFieldIdValues:[" + JSON.stringify(buildingId[0]) + "]}" }, this.listDataListUrl);
        }
    };
    AdministrationService.prototype.FloorKeywordSeach = function (keyworsearch, buildingId) {
        if (buildingId == undefined) {
            return this.postaction({ Input: "{ FormId:71,Filter:'" + keyworsearch + "',IsKeywordSearch:1,IsAdvancedSearch:0}" }, this.listDataListUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:71,Filter:'" + keyworsearch + "',IsKeywordSearch:1,IsAdvancedSearch:0,ListReportFieldIdValues:[" + JSON.stringify(buildingId[0]) + "]}" }, this.listDataListUrl);
        }
    };
    ///User data
    AdministrationService.prototype.getUsersFieldList = function () {
        return this.postaction({ Input: "{ FormId: " + this.UserListFrmId + "}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getUsersList = function (pageIndex, sortCol, sortDir, keyworsearch, value, IsKeyword, IsAdvance) {
        var param = "{ FormId: " + this.UserListFrmId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "', Filter: '" + keyworsearch + "', ListFilterIdValues: " + value + ", IsKeywordSearch: " + IsKeyword + ", IsAdvancedSearch:" + IsAdvance + "}";
        return this.postaction({ Input: param }, this.listDataListUrl);
    };
    AdministrationService.prototype.loadUserAddEdit = function (selectedId, field, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.UserAddEditFrmId + ",ListLookupReportFieldIdValues:" + field + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.UserAddEditFrmId + ",Id:" + selectedId + ",ListLookupReportFieldIdValues:" + field + "}" }, this.editDataUrl);
        }
    };
    AdministrationService.prototype.addUser = function (userDetails) {
        console.log('added user');
        //  return this.postaction({ Input: "{ FormId: " + this.UserAddEditFrmId + "}" }, this.addDataUrl);
    };
    AdministrationService.prototype.GetMaxUsrCreated = function () {
        return this.postaction({}, this.getMaxUsrCreated);
    };
    AdministrationService.prototype.GetMaxWOUserCreated = function () {
        return this.postaction({}, this.getMaxWOUserCreated);
    };
    AdministrationService.prototype.GetMaxUserandWO = function () {
        return this.postaction({}, this.getMaxandWOUSer);
    };
    AdministrationService.prototype.getCustomerSubscribedFeatures = function (feaureIds) {
        return this.postaction({ input: "{Id:0}", FeatureCategoryIds: feaureIds }, this.customerFeatures);
    };
    AdministrationService.prototype.getUserListForUserRole = function (userRoleId, selectedUserId) {
        return this.postaction({ "UserRoleId": userRoleId, "selectedUserId": selectedUserId }, this.getUserForRole);
    };
    AdministrationService.prototype.getAccessTemplatesForUserRole = function (userRoleId) {
        return this.postaction({ "UserRoleId": userRoleId }, this.getAccessTemplatesbyRole);
    };
    AdministrationService.prototype.checkUserNameAvailable = function (loginName) {
        return this.postaction({ "LoginName": loginName }, this.checkUserNameAvailability);
    };
    AdministrationService.prototype.checkMailDomain = function (email) {
        return this.postaction({ "Email": email }, this.checkMailDomains);
    };
    AdministrationService.prototype.AddUpdateUserDetails = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.UserAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.UserListFrmId + "}" }, this.insertUserUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.UserAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.UserListFrmId + "}" }, this.submitEditUrl);
        }
    };
    AdministrationService.prototype.updateMultipleUserData = function (strReportFieldIdValues, reportField, newValue) {
        return this.postaction({ Input: "{FormId:" + this.UserAddEditFrmId + ",ListReportFieldIdValues:" + strReportFieldIdValues + "}", ReportField: reportField, NewValue: newValue }, this.updateMultipleUserDataUrl);
    };
    AdministrationService.prototype.deleteRestoreUser = function (selectedID, target) {
        var rptFieldValues = "";
        if (target == 1)
            rptFieldValues = "[{\"ReportFieldId\":387,\"Value\":\"4\"}]"; //delete
        else
            rptFieldValues = "[{\"ReportFieldId\":387,\"Value\":\"1\"}]"; //restore
        return this.postaction({ Input: "{FormId:" + this.UserListFrmId + ",Id:" + selectedID + ",ListReportFieldIdValues:" + rptFieldValues + "}" }, this.deleteUrl);
    };
    AdministrationService.prototype.loadResetPassword = function (selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.ResetPwdFrmId + ",Id:" + selectedId + "}" }, this.editDataUrl);
    };
    AdministrationService.prototype.passwordChangePossible = function (selUserId) {
        selUserId = selUserId == undefined ? 0 : selUserId;
        return this.postaction({ selUserId: selUserId }, this.isPwdChangePossible);
    };
    AdministrationService.prototype.resetPasswordthroghMail = function (selectedID) {
        return this.postaction({ "selectedUserId": selectedID.toString() }, this.resetPwdandMail);
    };
    AdministrationService.prototype.getPasswordPolicy = function () {
        return this.postaction({}, this.getPswdPolicy);
    };
    AdministrationService.prototype.resetPassword = function (selectedId, fieldObj) {
        return this.postaction({ Input: "{FormId:" + this.ResetPwdFrmId + ",Id:" + selectedId + ",ListReportFieldIdValues:" + fieldObj + "}" }, this.reserPswd);
    };
    AdministrationService.prototype.getUserModuleAccess = function (selectedIds) {
        return this.postaction({ Input: "{ FormId:" + this.UserModAccessFrmId + ",Id:" + selectedIds[0] + ",ListLookupReportFieldIdValues:[{ \"FieldId\":324,\"ReportFieldId\": 443, \"Value\":" + selectedIds[0] + " }]}" }, this.editDataUrl);
    };
    AdministrationService.prototype.updateUserModuleAccess = function (userIds, moduleIds) {
        return this.postaction({ Input: "{ FormId:" + this.UserModAccessFrmId + ",UserIds:[" + userIds + "],selectedIds:[" + moduleIds + "]}" }, this.updateModulacces);
    };
    AdministrationService.prototype.getSessionData = function () {
        return this.postaction({}, this.getSessionValues);
    };
    AdministrationService.prototype.getUserDivisionsAccess = function (selectUserId, pageIndex, sortCol, sortDir) {
        // return this.postaction({ Input: "{ FormId:" + this.UserDvsnAccessFrmId + ",ListLookupReportFieldIdValues: [{ \"FieldId\":339,\"ReportFieldId\" :300, \"Value\": " + selectedUserid + "}]}" }, this.listDataListUrl);
        var param = "{ FormId: " + this.UserDvsnAccessFrmId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',ListReportFieldIdValues:[{\"ReportFieldId\":300,\"Value\":\"" + selectUserId + "\"}]}";
        return this.postaction({ Input: param }, this.listDataListUrl);
    };
    AdministrationService.prototype.getUserDivisionsAccesssFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.UserDvsnAccessFrmId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.updateUserDivisionsAccess = function (updatedRptFldValues, selectedUserId, isDivisionAdmin) {
        return this.postaction({ Input: "{Id:" + selectedUserId + ",ListReportFieldIdValues:[" + updatedRptFldValues + "]}", IsDivisionAdmin: isDivisionAdmin }, this.updateDivacces);
        //return this.postaction({ Input: "{ FormId:" + this.UserDvsnAccessFrmId + ",UserIds:[" + userIds + "],selectedIds:[" + divisionIds + "]}" }, this.updateDivacces);
    };
    AdministrationService.prototype.getModuleAdminSettings = function (selectedUserid) {
        return this.postaction({ Input: "{ FormId:" + this.UserModAdminSettFmId + ",Id: " + selectedUserid + ",ListLookupReportFieldIdValues: [{ \"FieldId\":2036,\"ReportFieldId\" :333, \"Value\": " + selectedUserid + "}]}" }, this.editDataUrl);
        //   return this.postaction({ Input: "{ FormId:" + this.UserModAdminSettFmId + ",  Id: " + selectedIds[0] + " }" }, this.editDataUrl);
        // return this.postaction({ Input: "{ FormId:" + this.ResetPwdFrmId + ",Id:" + selectedId + "}" }, this.editDataUrl);
    };
    AdministrationService.prototype.isModuleAdmin = function (userIds) {
        return true;
    };
    AdministrationService.prototype.isDivisionAdmin = function (userIds) {
        return true;
    };
    AdministrationService.prototype.updateModuleAdminSettings = function (userIds, ModuleAdminInput) {
        return this.postaction({ Input: "{ FormId:" + this.UserModAdminSettFmId + ",UserIds:[" + userIds + "],ModuleAdminInput:" + JSON.stringify(ModuleAdminInput) + "}" }, this.updateModulAdminacces);
    };
    AdministrationService.prototype.getDivisionAccessData = function () {
        return this.getaction(this.divisionaccessdata_url);
    };
    AdministrationService.prototype.updateDivisionAccess = function (formObject) {
        console.log('Division Access updated');
    };
    AdministrationService.prototype.getDivisionAdminSettings = function (selectUserId, pageIndex, sortCol, sortDir) {
        var param = "{ FormId: " + this.UserDivisionAdminSetFrmId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',ListReportFieldIdValues:[{\"ReportFieldId\":300,\"Value\":\"" + selectUserId + "\"}]}";
        return this.postaction({ Input: param }, this.getOrganizationalUnitListForaSelectedUserUrl); // this.listDataListUrl
    };
    AdministrationService.prototype.getDivisionAdminSettingsFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.UserDivisionAdminSetFrmId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.updateDivisionAdminSettings = function (updatedRptFldValues, selectedUserId) {
        return this.postaction({ Input: "{Id:" + selectedUserId + ",ListReportFieldIdValues:[" + updatedRptFldValues + "]}" }, this.updateDivisionAdminacces);
        // return this.postaction({ Input: "{ FormId:" + this.UserDivisionAdminSetFrmId + ",UserIds:[" + userIds + "],divisionAdminInput:" + divAdminInpt + "}" }, this.updateDivisionAdminacces);
    };
    AdministrationService.prototype.getUserDrawingAccessModuleddl = function (selectedIds) {
        return this.postaction({ Input: "{ FormId: " + this.UserDrwgAccess + ",ListLookupReportFieldIdValues:[{ \"FieldId\":333,\"ReportFieldId\": 443, \"Value\":" + selectedIds[0] + "}]}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getUserDrawingAccessModules = function () {
        return this.getaction(this.userDrawingAccessModules_url);
    };
    //getUserDrawingFloorAccessList() {
    //    return this.getaction<Observable<any>>(this.userDrawingFloorAccess_url);
    //}
    //getUserDrawingFloorAccessFieldsList() {
    //    return this.getaction<Observable<any>>(this.userDrawingFloorAccessFields_url);
    //}
    //updateUserDrawingAccess(formObject: IField[]) {
    //    console.log('User drawing access updated');
    //}
    AdministrationService.prototype.getUserReportsAccessList = function () {
        return this.postaction({ Input: "{ FormId:" + this.userReportsAccessListFrmId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getUserReportsAccessFieldsList = function () {
        return this.getaction(this.userReportsAccessFields_url);
    };
    AdministrationService.prototype.updateUserReportsAccess = function (formObject) {
        console.log('User reports access updated');
    };
    AdministrationService.prototype.getSearchKeyWordLookup = function () {
        return ["Patrick, John", "Admin, Sys", "User1, SAG", "John, Marcus", "Mathew, Philip", "John, Hayden",
            "Jessica, Brown", "Stephany, White", "James, Sarah", "Davis, Eric"];
    };
    AdministrationService.prototype.getAccessTemplatesData = function () {
        return this.getaction(this.accesstemplatedata_url);
    };
    AdministrationService.prototype.getAccessTemplatesFields = function () {
        return this.getaction(this.accesstemplatefields_url);
    };
    AdministrationService.prototype.deleteAccessTemplate = function (selectedIds) {
        console.log("Template deleted");
    };
    ///User data
    ///Access Templates
    AdministrationService.prototype.getModuleAccessData = function () {
        return this.getaction(this.moduleaccess_url);
    };
    AdministrationService.prototype.updateModuleAccess = function (formObject) {
        console.log('Module Access updated');
    };
    AdministrationService.prototype.getFloorAccessData = function () {
        return this.getaction(this.flooraccessdata_url);
    };
    AdministrationService.prototype.getFloorAccessFields = function () {
        return this.getaction(this.flooraccessfields_url);
    };
    AdministrationService.prototype.updateFloorAccess = function (formObject) {
        console.log('Floor Access updated');
    };
    AdministrationService.prototype.updateDrawingAccess = function (isDrawingAccessEnabled) {
        console.log('Drawing Access updated');
    };
    AdministrationService.prototype.getTemplateUserAccess = function () {
        return this.getaction(this.useraccess_url);
    };
    AdministrationService.prototype.updateTemplateUserAccess = function (formObject) {
        console.log('User Access updated');
    };
    /* plotStyle list */
    AdministrationService.prototype.getPlotStyleData = function (pageIndex, sortCol, sortDir) {
        var param = "{ FormId: " + this.plotStyleListFrmId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}";
        return this.postaction({ Input: param }, this.listDataListUrl);
    };
    AdministrationService.prototype.getPlotStyleColumns = function () {
        return this.postaction({ Input: "{ FormId:" + this.plotStyleListFrmId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.loadPlotStyleAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.plotStyleAddEditFrmId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.plotStyleAddEditFrmId + ",ParentFormId:" + this.plotStyleListFrmId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    AdministrationService.prototype.AddUpdatePlotStyle = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.plotStyleAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.plotStyleListFrmId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.plotStyleAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.plotStyleListFrmId + "}" }, this.submitEditUrl);
        }
    };
    AdministrationService.prototype.InlineAddUpdatePlotStyle = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.plotStyleListFrmId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.plotStyleListFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    AdministrationService.prototype.deletePlotStyle = function (selectedID) {
        return this.postaction({ Input: "{FormId:" + this.plotStyleListFrmId + ",Id:" + selectedID + "}" }, this.deleteUrl);
    };
    /* End plotStyle list */
    AdministrationService.prototype.getMainMenu = function (selectedID) {
        if (selectedID == 1) {
            return this.postaction(null, this.adminMainMenu);
        }
        else {
            return this.getaction(this.spaceMainMenu);
        }
    };
    AdministrationService.prototype.getSpaceStandard = function () {
        return this.getaction(this._drawingLayersDataUrl);
    };
    AdministrationService.prototype.getAreaOptionFieldDetails = function () {
        return this.getaction(this.areaOptionFieldDetails);
    };
    AdministrationService.prototype.updateAreaOptionFieldDetails = function () {
        return this.getaction(this.areaOptionFieldDetails);
    };
    /* AdditionalDataField*/
    AdministrationService.prototype.getDdlAddtlDataFieldCategory = function () {
        // return this.getaction<Observable<any>>(this.ddlAddlDatafieldCategory);
        return this.postaction({ Input: "{ FormId: " + this.addlDataFieldListFormId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getAddtlDataFieldField = function () {
        //return this.getaction<Observable<any>>(this.addlDatafield_Fields);
        return this.postaction({ Input: "{ FormId: " + this.addlDataFieldListFormId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getAddtlDataFieldData = function (categoryid, index, direction, column) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldListFormId + ",ListReportFieldIdValues:[" + JSON.stringify(categoryid[0]) + "],SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.sortAdditionalDataField = function (index, direction, column, catid) {
        return this.postaction({ Input: "{ FormId: " + this.addlDataFieldListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[" + JSON.stringify(catid[0]) + "]}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.pagingAdditionalDataField = function (index, direction, column, catid) {
        return this.postaction({ Input: "{ FormId: " + this.addlDataFieldListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[" + JSON.stringify(catid[0]) + "]}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.getSiteAddtlDataFieldData = function () {
        return this.getaction(this.site_AddlDatafieldData);
    };
    AdministrationService.prototype.getBuildingAddtlDataFieldData = function () {
        return this.getaction(this.building_AddlDatafieldData);
    };
    AdministrationService.prototype.getFloorAddtlDataFieldData = function () {
        return this.getaction(this.floor_AddlDatafieldData);
    };
    AdministrationService.prototype.getSpaceAddtlDataFieldData = function () {
        return this.getaction(this.space_AddlDatafieldData);
    };
    AdministrationService.prototype.getEmpMoveProjectsAddtlDataFieldData = function () {
        return this.getaction(this.space_AddlDatafieldData);
    };
    AdministrationService.prototype.loadAddlDataFieldAddEdit = function (selectedId, addEdit, categoryid) {
        if (addEdit == "add") {
            if (categoryid == 5)
                return this.postaction({ Input: "{ FormId: " + this.addlDataFieldAddEditFormId + ",ListLookupReportFieldIdValues:[{\"FieldId\":2367,\"ReportFieldId\": 12097, \"Value\":\"3391\"}]}" }, this.addDataUrl);
            else
                return this.postaction({ Input: "{ FormId: " + this.addlDataFieldAddEditFormId + " }" }, this.addDataUrl);
        }
        else if (addEdit == "edit") {
            if (categoryid[0].Value == 5)
                return this.postaction({ Input: "{ FormId: " + this.addlDataFieldAddEditFormId + ",Id:" + selectedId[0] + ",ParentFormId:" + this.addlDataFieldListFormId + ", ListLookupReportFieldIdValues:[{\"FieldId\":2367,\"ReportFieldId\": 12097, \"Value\":\"3391\"}], ListReportFieldIdValues:[" + JSON.stringify(categoryid[0]) + "] }" }, this.editDataUrl);
            else
                return this.postaction({ Input: "{ FormId: " + this.addlDataFieldAddEditFormId + ",Id:" + selectedId[0] + ",ParentFormId:" + this.addlDataFieldListFormId + ",ListReportFieldIdValues:[" + JSON.stringify(categoryid[0]) + "] }" }, this.editDataUrl);
        }
    };
    AdministrationService.prototype.AdditionalDataFieldHaveLookUp = function (Id) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + ",Id:" + Id + "}" }, this.CheckFieldValueExist);
    };
    AdministrationService.prototype.CheckisinUse = function (fieldobj, id) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + ",Id:" + id + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.checkIsInUse);
    };
    AdministrationService.prototype.CheckAdditionalDataFieldLookUpValueInUse = function (id) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + ",Id:" + id + "}" }, this.CheckAdditionalDataFieldLookUpValueInUseurl);
    };
    AdministrationService.prototype.getMaxCharUsed = function (addFieldId) {
        return this.postaction({ Input: "{ListReportFieldIdValues: " + JSON.stringify(addFieldId) + "}" }, this.getAdditionalFieldDetails);
    };
    AdministrationService.prototype.addAddlDataField = function (formObject) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + " ,ListReportFieldIdValues: " + formObject + ",ParentFormId:" + this.addlDataFieldListFormId + "}" }, this.submitAddUrl);
    };
    AdministrationService.prototype.updateAddlDataField = function (formObject, id) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + " ,ListReportFieldIdValues: " + formObject + ",Id:" + id + ",ParentFormId:" + this.addlDataFieldListFormId + "}" }, this.submitEditUrl);
    };
    AdministrationService.prototype.deleteAddtlDataField = function (selectedID) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldListFormId + ",Id:" + selectedID[0] + "}" }, this.deleteUrl);
    };
    /* Field Values*/
    AdministrationService.prototype.getFieldValuesFields = function () {
        //return this.getaction<Observable<any>>(this.fieldValues_Fields)
        return this.postaction({ Input: "{ FormId: " + this.fieldValueListFormId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getFieldValuesData = function (additionalDataFieldId) {
        //return this.getaction<Observable<any>>(this.fieldValues_Data)
        return this.postaction({ Input: "{FormId:" + this.fieldValueListFormId + ",ListReportFieldIdValues:[" + JSON.stringify(additionalDataFieldId[0]) + "]}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.insertFieldValue = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.fieldValueListFormId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.submitAddUrl);
    };
    AdministrationService.prototype.updateFieldValue = function (pageDetails, id) {
        return this.postaction({ Input: "{FormId:" + this.fieldValueListFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + "}" }, this.submitEditUrl);
    };
    AdministrationService.prototype.sortFieldValue = function (additionalDataFieldId, index, direction, column, filter) {
        return this.postaction({ Input: "{ FormId: " + this.fieldValueListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[" + JSON.stringify(additionalDataFieldId[0]) + "]}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.pagingFieldValue = function (additionalDataFieldId, index, direction, column) {
        return this.postaction({ Input: "{ FormId: " + this.fieldValueListFormId + ",PageIndex:" + index + ",SortColumn:'" + column + "',SortDirection:'" + direction + ",ListReportFieldIdValues:[" + JSON.stringify(additionalDataFieldId[0]) + "]}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.postDataFieldValueDelete = function (id, pageDetails) {
        // return this.getaction<Observable<any>>(this.fieldValues_Fields);
        return this.postaction({ applnInput: "{FormId:" + this.fieldValueListFormId + ",Id:" + id[0] + ",ListReportFieldIdValues:" + JSON.stringify(pageDetails) + "}" }, this.deleteFieldValue);
    };
    AdministrationService.prototype.getWhitelistDetails = function (Id) {
        return this.postaction({ Input: "{Id:" + Id + "}" }, this.getWhitelistUrl);
    };
    AdministrationService.prototype.getFieldFormatDetails = function (Id) {
        return this.postaction({ Input: "{Id:" + Id + "}" }, this.getFieldFormatListUrl);
    };
    AdministrationService.prototype.getLayerMappingFunctionFields = function () {
        return this.postaction({ Input: "{FormId:55,ListLookupReportFieldIdValues:[{ \"FieldId\":240,\"ReportFieldId\": 4404, \"Value\":\"0\" }],}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getLayerMappingFunction = function () {
        return this.postaction({ Input: "{FormId:55}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.postSubmitEditayerMapping = function (pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:55,ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    AdministrationService.prototype.postSubmitAdddrawinglayerMapping = function (pageDetails) {
        return this.postaction({ Input: "{FormId:55,ListReportFieldIdValues:" + pageDetails + ",Id:0}" }, this.submitAddUrl);
    };
    AdministrationService.prototype.postLayerMappingFunctionDelete = function (id) {
        return this.postaction({ Input: "{FormId:55,Id:" + id + "}" }, this.deleteUrl);
    };
    /* User Groups */
    AdministrationService.prototype.getUserGroupsFields = function () {
        //return this.getaction<Observable<any>>(this.userGroupsFields);
        return this.postaction({ Input: "{FormId: " + this.UserGroupFormId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getUserGroupsData = function (index, column, direction, filter) {
        //return this.getaction<Observable<any>>(this.userGroupsData);
        return this.postaction({ Input: "{FormId:" + this.UserGroupFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.loadUserGroupAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.UserGroupFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.UserGroupFormId + ",ParentFormId:" + this.UserGroupFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    AdministrationService.prototype.AddUpdateUserGroup = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.UserGroupFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.UserGroupFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    AdministrationService.prototype.checkUserGroupInUse = function (id) {
        return this.postaction({ Input: "{FormId:" + this.UserGroupFormId + ",Id:" + id + ",ListReportFieldIdValues: [{\"ReportFieldId\":2807,\"Value\":\"" + id + "\"}]}" }, this.CheckUserGroupInUse);
    };
    AdministrationService.prototype.DeleteUserGroup = function (id) {
        return this.postaction({ Input: "{FormId:" + this.UserGroupFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    };
    AdministrationService.prototype.addUserGroups = function (userDetails) {
        console.log('User Group added ');
    };
    AdministrationService.prototype.updateUserGroups = function (fieldData) {
        console.log('User Group updated');
    };
    AdministrationService.prototype.deleteUserGroups = function (selectedID) {
        console.log(selectedID, "User Group Deleted");
    };
    AdministrationService.prototype.getiDrawingsUsersFields = function () {
        //return this.getaction<Observable<any>>(this.iDrawingsUsersFields);
        return this.postaction({ Input: "{FormId: " + this.UserGroupUserListFormId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getiDrawingsUsersData = function (UserGroupId, UserCategoryId, SiteId, index, column, direction, filter) {
        //return this.getaction<Observable<any>>(this.iDrawingsUsersData);
        return this.postaction({ Input: "{FormId:" + this.UserGroupUserListFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "',ListReportFieldIdValues: [{\"ReportFieldId\":406,\"Value\":\"" + UserCategoryId + "\"},{\"ReportFieldId\":2807,\"Value\":\"" + UserGroupId + "\"},{\"ReportFieldId\":6349,\"Value\":\"" + SiteId + "\"}]}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.getUserGroupNewUserFields = function () {
        return this.postaction({ Input: "{FormId: " + this.UserGroupNewUserFormId + "}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getUserGroupNewUserData = function (UserCategoryId, UserGroupId, index, column, direction, filter) {
        return this.postaction({ Input: "{FormId:" + this.UserGroupNewUserFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "',ListReportFieldIdValues: [{\"ReportFieldId\":406,\"Value\":\"" + UserCategoryId + "\"},{\"ReportFieldId\":2807,\"Value\":\"" + UserGroupId + "\"}]}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.UpdateUserGroupUsers = function (arrayList) {
        return this.postaction({ Input: "{ FormId:" + this.UserGroupUpdateUserFormId + ",ListReportFieldIdValues: " + arrayList + "}" }, this.submitEditUrl);
    };
    AdministrationService.prototype.DeleteUserGroupUsers = function (fieldobj) {
        return this.postaction({ Input: "{FormId:" + this.UserGroupUserListFormId + ",ListReportFieldIdValues:" + fieldobj + ",Id:0}" }, this.deleteUrl);
    };
    AdministrationService.prototype.updateiDrawingsUsers = function (formObject) {
        console.log('iDrawings Users updated');
    };
    AdministrationService.prototype.getEmployeesUsersFields = function () {
        return this.getaction(this.employeesUsersFields);
    };
    AdministrationService.prototype.getEmployeesUsersData = function () {
        return this.getaction(this.employeesUsersData);
    };
    AdministrationService.prototype.updateEmployeesUsers = function (formObject) {
        console.log('Employees Users updated');
    };
    AdministrationService.prototype.getTechniciansUsersFields = function () {
        return this.getaction(this.techniciansUsersFields);
    };
    AdministrationService.prototype.getTechniciansUsersData = function () {
        return this.getaction(this.techniciansUsersData);
    };
    AdministrationService.prototype.updateTechniciansUsers = function (formObject) {
        console.log('Technicians Users updated');
    };
    AdministrationService.prototype.getContractorsUsersFields = function () {
        return this.getaction(this.contractorsUsersFields);
    };
    AdministrationService.prototype.gettContractorsUsersData = function () {
        return this.getaction(this.contractorsUsersData);
    };
    AdministrationService.prototype.updatetContractorsUsers = function (formObject) {
        console.log('Contractors Users updated');
    };
    /*Assign Styles for Drawing Layers BEGIN*/
    AdministrationService.prototype.getAssignStyleColumns = function () {
        return this.postaction({ Input: "{FormId:" + this.AssignStylesDrawingLyrFrmId + "}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getAssignStyleData = function (pageDetails, pageIndex, sortCol, sortDir) {
        if (pageDetails == "") {
            var param = "{ FormId: " + this.AssignStylesDrawingLyrFrmId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}";
        }
        else {
            var param = "{ FormId: " + this.AssignStylesDrawingLyrFrmId + ",ListReportFieldIdValues:" + pageDetails + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}";
        }
        return this.postaction({ Input: param }, this.listDataListUrl);
    };
    /*updateAssignStyleData(plotStyleId?: number, layerIds?: string, moduleIds?: string) {
        var param = "{ FormId: " + this.AssignStylesDrawingLyrFrmId + ",PlotStyleId:" + plotStyleId + ",LayerIds:'" + layerIds + "',moduleIds:'" + moduleIds + "'}";
        return this.postaction({ Input: param }, this.submitEditUrl);
    }*/
    AdministrationService.prototype.updateAssignStyleData = function (selectId, pageDetails) {
        /*var param = "{ FormId: " + this.AssignStylesDrawingLyrFrmId + ",ListReportFieldIdValues:" + pageDetails + ", Id:" + selectId + "}";
         return this.postaction({ Input: param }, this.submitEditUrl);*/
        return this.postaction({ Input: "{FormId:" + this.AssignStylesDrawingLyrFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    /*Assign Styles for Drawing Layers END*/
    /* Attachments */
    AdministrationService.prototype.getDdlAttachmentCategory = function () {
        return this.getaction(this.ddlAttachmentCategory);
    };
    AdministrationService.prototype.getAttachmentField = function () {
        //  return this.getaction<Observable<any>>(this.attachment_Fields);
        return this.postaction({ Input: "{ FormId: " + this.attachmentDetailsFormId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getSiteAttachmentData = function (attachmentCategoryId, baseEntityId) {
        debugger;
        return this.postaction({ Input: "{FormId:" + this.attachmentDetailsFormId + "}", attachmentCategoryId: attachmentCategoryId, baseEntityId: baseEntityId }, this.attachmentDetails);
    };
    AdministrationService.prototype.getAttachmentDataGrid = function (pageDetails, attachmentCategoryId, baseEntityId, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{ FormId: " + this.attachmentDetailsFormId + ",ListReportFieldIdValues: " + pageDetails + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}", attachmentCategoryId: attachmentCategoryId, baseEntityId: baseEntityId }, this.attachmentDetails);
    };
    AdministrationService.prototype.postSubmitEditAttachmentList = function (pageDetails, fileData, selectId, attachmentCategoryId, oldcustomerAttachmentCategoryId, baseEntityId, oldFileName) {
        if (fileData != undefined)
            return this.postaction({ applnInput: "{FormId: " + this.attachmentDetailsFormId + ",ListReportFieldIdValues: " + pageDetails + ",BaseEntityId: " + baseEntityId + ",Id: " + selectId + " }", FileInput: fileData, attachmentCategoryId: attachmentCategoryId.toString(), baseEntityId: baseEntityId }, this.editAttachment);
        else
            return this.postaction({ applnInput: "{FormId: " + this.attachmentDetailsFormId + ",ListReportFieldIdValues: " + pageDetails + ",BaseEntityId: " + baseEntityId + ",Id: " + selectId + " }", FileInput: "{\"ReportFieldId\" :53, \"OldFileName\": \"" + oldFileName + "\", \"OldCustAtchmtCategoryId\": \"" + oldcustomerAttachmentCategoryId + "\"}", attachmentCategoryId: attachmentCategoryId, baseEntityId: baseEntityId }, this.editAttachment);
    };
    AdministrationService.prototype.loadAttachmentAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.attachmentDetailsAddEditFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.attachmentDetailsAddEditFormId + ",ParentFormId:" + this.attachmentDetailsFormId + ",Id:" + selectedId + "}" }, this.getAttachmentEditContent);
        }
    };
    AdministrationService.prototype.getAttachmentDataGridLoad = function (attachmentCategoryId, baseEntityId, attachmentId) {
        return this.postaction({ Input: "{ FormId:" + this.attachmentDetailsAddEditFormId + ",Id: " + attachmentId + "}", attachmentCategoryId: attachmentCategoryId, baseEntityId: baseEntityId }, this.getAttachmentEditContent);
    };
    AdministrationService.prototype.getAttachmentDataGridLoadLease = function (pageDetails, attachmentCategoryId, baseEntityId, attachmentId) {
        return this.postaction({ Input: "{ FormId:" + this.attachmentDetailsAddEditFormId + ",ListReportFieldIdValues: " + pageDetails + ",Id: " + attachmentId + "}", attachmentCategoryId: attachmentCategoryId, baseEntityId: baseEntityId }, this.getAttachmentEditContent);
    };
    AdministrationService.prototype.AddUpdateAttachment = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.attachmentDetailsAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.attachmentDetailsFormId + "}" }, this.insertAttachment);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.attachmentDetailsAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.attachmentDetailsFormId + "}" }, this.editAttachment);
        }
    };
    AdministrationService.prototype.postAttachmentDelete = function (id, attachmentCategoryId, baseEntityId, customerAttachmentCategoryId, filename) {
        return this.postaction({ applnInput: "{FormId:128, ListReportFieldIdValues: [{ \"ReportFieldId\" :51, \"Value\": " + attachmentCategoryId + "},{ \"ReportFieldId\" :53, \"Value\": \"" + filename + "\"},{ \"ReportFieldId\" :55, \"Value\": " + customerAttachmentCategoryId + "}],Id: " + id + ",BaseEntityId: " + baseEntityId + " }" }, this.deleteAttachment);
    };
    AdministrationService.prototype.sortAttachmentData = function (direction, column, attachmentCategoryId, baseEntityId) {
        console.log("entered sort");
        return this.postaction({ Input: "{FormId:" + this.attachmentDetailsFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "'}", attachmentCategoryId: attachmentCategoryId, baseEntityId: baseEntityId }, this.attachmentDetails);
    };
    AdministrationService.prototype.downloadAttachment = function (attachmentCategoryId, attachmentId, baseEntityId, fileName, objectClassId, custAtachmntCategryId) {
        return this.downloadaction({ Input: "{FormId:" + this.attachmentDetailsFormId + ",ListReportFieldIdValues: [{ \"ReportFieldId\" :55, \"Value\": " + custAtachmntCategryId + "}],EntityId:'" + attachmentCategoryId + "',BaseEntityId:'" + baseEntityId + "',ObjectClassId:'" + objectClassId + "'}", FileInput: "{FileName:'" + fileName + "',ReferenceId:'" + attachmentId + "'}" }, this.downloadUrl);
        //   return this.postaction({ Input: "{FormId:" + this.attachmentDetailsFormId + ",AttachmentCategoryId:'" + attachmentCategoryId + "',FileName:'" + fileName + "',ReferenceId:'" + attachmentId  + "',BaseEntityId:'" + baseEntityId +  "'}" }, this.downloadUrl);
    };
    AdministrationService.prototype.postSubmitAddtAttachmentList = function (pageDetails, fileData, attachmentCategoryId, baseEntityId) {
        return this.postaction({ applnInput: "{FormId: " + this.attachmentDetailsFormId + ",ListReportFieldIdValues: " + pageDetails + ",BaseEntityId: " + baseEntityId + " }", FileInput: fileData, attachmentCategoryId: attachmentCategoryId }, this.insertAttachment);
    };
    AdministrationService.prototype.attachmentAssetClassorNot = function (attachmentCategoryId) {
        return this.postaction({ applnInput: "{EntityId: " + attachmentCategoryId + " }" }, this.attachmentAssetClassorNotUrl);
    };
    AdministrationService.prototype.getSiteAttachmentKeyWordLookup = function () {
        return ["Miami.jpg", "sitedetails.xml", "bill.pdf", "JellyFish.jpg", "FileName", "Grid.doc"];
    };
    AdministrationService.prototype.getBuildingAttachmentData = function () {
        return this.getaction(this.building_AttachmentData);
    };
    AdministrationService.prototype.getBuildingAttachmentKeyWordLookup = function () {
        return ["Miami.jpg", "buildingdetails.xml", "equipment.pdf", "desert.jpg"];
    };
    AdministrationService.prototype.getFloorAttachmentData = function () {
        return this.getaction(this.floor_AttachmentData);
    };
    AdministrationService.prototype.getFloorAttachmentKeyWordLookup = function () {
        return ["lighthouse.jpg", "floordetails.xml", "floor.pdf"];
    };
    AdministrationService.prototype.getAttachmentDate = function () {
        return this.postaction({}, this.attachmentDate);
    };
    AdministrationService.prototype.getOrganizationalUnitsData = function () {
        return this.postaction({ Input: "{FormId:144}" }, this.GetOrganizationUnitsUrl);
    };
    AdministrationService.prototype.getEditOrganizationalUnitsData = function (level) {
        return this.postaction({ Input: "{FormId:212,Id:" + level + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.getOrganizationalUnitsFields = function () {
        return this.getaction(this.organizationalUnitsFieldsUrl);
    };
    AdministrationService.prototype.getOrganizationNamesForMenu = function () {
        return this.postaction({ applnInput: "{FormId:0}" }, this.GetOrganizationMenu);
    };
    AdministrationService.prototype.getOrganizationNames = function () {
        return this.postaction({ applnInput: "{FormId:0}" }, this.GetOrganizationurl);
    };
    AdministrationService.prototype.addOrganizationalUnitsFields = function (pageDetails) {
        return this.postaction({ Input: "{ FormId:144,ListReportFieldIdValues:" + pageDetails + "}", }, this.submitAddUrl);
    };
    AdministrationService.prototype.updateOrganizationalUnitsFields = function (selectedId, pageDetails) {
        return this.postaction({ Input: "{ FormId:144,Id:" + selectedId + ",ListReportFieldIdValues:" + pageDetails + "}", }, this.submitEditUrl);
    };
    AdministrationService.prototype.loadOrganizationalUnitAddEdit = function (selectedId, addEdit) {
        return this.postaction({ Input: "{FormId:" + selectedId + "}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.loadOrganizationUnitsLookUpValue = function (levelId, unitId) {
        return this.postaction({ applnInput: "{FormId:0,ListReportFieldIdValues: [{ \"ReportFieldId\" :289, \"Value\": " + levelId + "},{ \"ReportFieldId\" :288, \"Value\": " + unitId + "}]}" }, this.listLookUpOrgFieldObjUrl);
    };
    AdministrationService.prototype.deleteOrganizationalUnits = function (selectedID) {
        return this.postaction({ Input: "{FormId:144, Id:" + selectedID + "}" }, this.deleteUrl);
    };
    AdministrationService.prototype.getDataFieldValue = function (selectedID) {
        return this.getaction(this.fieldValues_Data);
    };
    AdministrationService.prototype.GetAdditionalDataFieldLookupValues = function (value) {
        return this.getaction(this.fieldValues_Data);
    };
    AdministrationService.prototype.getChildFieldValuesData = function (value) {
        return this.getaction(this.userModulesAccess_url);
    };
    AdministrationService.prototype.getValidatedFieldValues = function (Value) {
        return this.getaction(this.addlDatafieldValidatedValues);
    };
    AdministrationService.prototype.DeleteAdditionalFieldRelation = function (Value, Value2) {
        console.log(Value, "Delete Additional Field Relation");
    };
    AdministrationService.prototype.SetDataDFieldRelation = function (Value, Value2) {
        console.log(Value, "Set DataDField Relation ");
    };
    AdministrationService.prototype.UpdateAdditionalDataFieldRelation = function (Value, Value2) {
        console.log(Value, "Set DataDField Relation ");
    };
    AdministrationService.prototype.GetPossibleChildFields = function (Value) {
        console.log(Value, "get possible child Fields ");
    };
    AdministrationService.prototype.IsRelationExists = function (Value, Value2) {
        return this.getaction(this.addlDatafieldValidatedValues);
    };
    AdministrationService.prototype.GetAdditionalDataFieldValuesMapping = function (Value, Value2, Value3) {
        return this.getaction(this.userModulesAccess_url);
    };
    AdministrationService.prototype.logout = function () {
        return this.postaction({}, this.logoutUrl);
    };
    AdministrationService.prototype.getAccessibleModuleForUser = function () {
        return this.postaction({ applnInput: "{FormId:0}" }, this.accessibleModuleForUserUrl);
    };
    AdministrationService.prototype.CheckSiteInUseWorkorder = function (selectedID) {
        console.log('entered delete service');
        //return this.postaction({ Input: "{FormId:" + this.floorListFormId + ",Id:" + selectedID[0] + "}" }, this.deleteUrl)
        return this.postaction({ Input: "{FormId:" + this.floorListFormId + ",Id:" + selectedID + "}" }, this.CheckSiteInUseWorkorderUrl);
    };
    AdministrationService.prototype.getGLAccountsListFields = function () {
        return this.postaction({ Input: "{FormId:" + this.GLAccountsFrmId + "}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getGLAccountsListData = function (pageIndex, sortCol, sortDir, Id) {
        return this.postaction({ Input: "{FormId:" + this.GLAccountsFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",Id:" + Id + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.getGLAccountsAddEdit = function (target, selectedId) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.GLAccountsFrmId + "}" }, this.addDataUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.GLAccountsFrmId + ",ParentFormId:" + this.GLAccountsFrmId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    AdministrationService.prototype.GLAccountsSubmit = function (strRptFields, target, selectedId) {
        if (target == "add") {
            return this.postaction({ Input: "{ FormId:" + this.GLAccountsFrmId + ",ParentFormId:" + this.GLAccountsFrmId + ",ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        }
        else if (target == "edit") {
            return this.postaction({ Input: "{ FormId:" + this.GLAccountsFrmId + ",ParentFormId:" + this.GLAccountsFrmId + ",Id:" + selectedId + ",ListReportFieldIdValues: " + strRptFields + "}" }, this.submitEditUrl);
        }
    };
    AdministrationService.prototype.GLAccountsdelete = function (Id) {
        return this.postaction({ Input: "{FormId:" + this.GLAccountsFrmId + ",ParentFormId:" + this.GLAccountsFrmId + ",Id:" + Id + "}" }, this.deleteUrl);
    };
    AdministrationService.prototype.getCustomerSubscribedFeaturesGL = function (feaureIds) {
        return this.postaction({ input: "{Id:0}", FeatureCategoryIds: feaureIds }, this.customerFeatures);
    };
    AdministrationService.prototype.loadDataImportControls = function (modId) {
        if (modId == 0) {
            return this.postaction({ Input: "{FormId:" + this.dataImport + ",ListLookupReportFieldIdValues: [{\"FieldId\":1791,\"ReportFieldId\": 271, \"Value\":" + modId + "},{ \"FieldId\":1654,\"ReportFieldId\": 12097, \"Value\":\"2285\" },{ \"FieldId\":1678,\"ReportFieldId\": 12097, \"Value\":\"2317\" },{ \"FieldId\":1792,\"ReportFieldId\": 12097, \"Value\":\"2476\" },{ \"FieldId\":1794,\"ReportFieldId\": 12097, \"Value\":\"2478\" }]}" }, this.listFieldObjUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.dataImport + ",ListLookupReportFieldIdValues: [{\"FieldId\":1791,\"ReportFieldId\": 271, \"Value\":" + modId + "},{ \"FieldId\":1654,\"ReportFieldId\": 12097, \"Value\":\"2285\" },{ \"FieldId\":1678,\"ReportFieldId\": 12097, \"Value\":\"2317\" },{ \"FieldId\":1792,\"ReportFieldId\": 12097, \"Value\":\"2476\" },{ \"FieldId\":1794,\"ReportFieldId\": 12097, \"Value\":\"2478\" }]}" }, this.listFieldObjUrl);
        }
    };
    AdministrationService.prototype.readExcel = function (value, sheetName) {
        return this.postaction({ Input: "{FormId:0}", FileInput: value.fileObj.FileData, FileName: value.fileObj.FileName, FileSize: value.fileObj.FileSize, SheetName: sheetName }, this.readExcelUrl);
    };
    AdministrationService.prototype.loadConfigureFieldObjects = function () {
        return this.postaction({ Input: "{FormId:307}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.GetSavedImportColumns = function (excelColumnName, importCategoryId, classId) {
        return this.postaction({ Input: "{FormId:0}", ExcelCols: excelColumnName, ImportCategoryId: importCategoryId, Classid: classId }, this.SavedImportColumnsUrl);
    };
    AdministrationService.prototype.GetImportColumns = function (impId, adlId, classId, objCategoryId) {
        if (impId != 6 && impId != 7 && impId != 5 && impId != 8 && impId != 9 && impId != 10 && impId != 12) {
            return this.postaction({ Input: "{FormId:0 , ListReportFieldIdValues: [{ \"ReportFieldId\" :3403, \"Value\": " + impId + "},{ \"ReportFieldId\" :16, \"Value\": " + adlId + "}]}" }, this.GetImportColumnsUrl);
        }
        else {
            var objectTypeId;
            if (impId == 7) {
                objectTypeId = 2;
            }
            return this.postaction({ Input: "{FormId:0 , ListReportFieldIdValues: [{ \"ReportFieldId\" :3403, \"Value\": " + impId + "},{ \"ReportFieldId\" :67, \"Value\": " + adlId + "},{ \"ReportFieldId\" :645, \"Value\": " + classId + "}]}" }, this.GetObjImportColumnsUrl);
        }
    };
    AdministrationService.prototype.GetImportTepmlate = function (impId, moduleId, name) {
        return this.postaction({ Input: "{FormId:0 , ListReportFieldIdValues: [{ \"ReportFieldId\" :3411, \"Value\": " + impId + "},{ \"ReportFieldId\" :3412, \"Value\": " + moduleId + "},{ \"ReportFieldId\" :3413, \"Value\": \"" + name + "\"}]}" }, this.GetImportTepmlateIdUrl);
    };
    //getExportData(formId, ParentFormId, index: any, sortDirection: any, sortColumn: any, keywordSearch?: string, advancedSearchValue?: any) {
    //    if (keywordSearch)
    //        return this.postaction({ Input: "{FormId:" + formId + ",ParentFormId:" + ParentFormId + ",Filter:'" + keywordSearch + "',PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',IsKeywordSearch:1,IsAdvancedSearch:0,IsExport:1}" }, this.listDataListUrl)
    //    else if (advancedSearchValue && advancedSearchValue != "[]")
    //        return this.postaction({ Input: "{ FormId:" + formId + ",ParentFormId:" + ParentFormId + ", ListFilterIdValues: " + advancedSearchValue + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1,IsExport:1}" }, this.listDataListUrl);
    //    else
    //        return this.postaction({ Input: "{ FormId:" + formId + ",ParentFormId:" + ParentFormId + ",PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',IsExport:1}" }, this.listDataListUrl);
    //}
    AdministrationService.prototype.getExportData = function (formId, ParentFormId, index, sortDirection, sortColumn, fieldObjects, fileName, keywordSearch, advancedSearchValue) {
        var fields = fieldObjects;
        var filterArray = [];
        var singlecheck = fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel);
                return true;
            }
            else
                return false;
        });
        if (keywordSearch)
            return { Input: "{FormId:" + formId + ",ParentFormId:" + ParentFormId + ",Filter:'" + keywordSearch + "',PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',IsKeywordSearch:1,IsAdvancedSearch:0}", fileName: "Sites", fields: filterArray };
        else if (advancedSearchValue && advancedSearchValue != "[]")
            return { Input: "{ FormId:" + formId + ",ParentFormId:" + ParentFormId + ", ListFilterIdValues: " + advancedSearchValue + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}", fileName: "Sites", fields: filterArray };
        else
            return { Input: "{ FormId:" + formId + ",ParentFormId:" + ParentFormId + ",PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "'}", fileName: "Sites", fields: filterArray };
    };
    //getBuildingExportData(formId, ParentFormId, index: any, sortDirection: any, sortColumn: any, keywordSearch?: string, advancedSearchValue?: any, siteId?:any) {
    //    if (keywordSearch)
    //        if (siteId != undefined)
    //            return this.postaction({ Input: "{FormId:" + formId + ",ParentFormId:" + ParentFormId + ",ListReportFieldIdValues:[" + JSON.stringify(siteId[0]) + "],Filter:'" + keywordSearch + "',PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',IsKeywordSearch:1,IsAdvancedSearch:0,IsExport:1}" }, this.listDataListUrl)
    //        else
    //            return this.postaction({ Input: "{FormId:" + formId + ",ParentFormId:" + ParentFormId + ",Filter:'" + keywordSearch + "',PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',IsKeywordSearch:1,IsAdvancedSearch:0,IsExport:1}" }, this.listDataListUrl)
    //    else if (advancedSearchValue && advancedSearchValue!="[]")
    //        if (siteId != undefined)
    //            return this.postaction({ Input: "{ FormId:" + formId + ",ParentFormId:" + ParentFormId + ",ListReportFieldIdValues:[" + JSON.stringify(siteId[0]) + "], ListFilterIdValues: " + advancedSearchValue + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1,IsExport:1}" }, this.listDataListUrl);
    //        else
    //            return this.postaction({ Input: "{ FormId:" + formId + ",ParentFormId:" + ParentFormId + ", ListFilterIdValues: " + advancedSearchValue + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1,IsExport:1}" }, this.listDataListUrl);
    //    else
    //        if (siteId != undefined)
    //            return this.postaction({ Input: "{ FormId:" + formId + ",ParentFormId:" + ParentFormId + ",ListReportFieldIdValues:[" + JSON.stringify(siteId[0]) + "],PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',IsExport:1}" }, this.listDataListUrl);
    //        else
    //            return this.postaction({ Input: "{ FormId:" + formId + ",ParentFormId:" + ParentFormId + ",PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',IsExport:1}" }, this.listDataListUrl);
    //}
    AdministrationService.prototype.getBuildingExportData = function (formId, ParentFormId, index, sortDirection, sortColumn, fieldObjects, fileName, keywordSearch, advancedSearchValue, siteId) {
        var fields = fieldObjects;
        var filterArray = [];
        var singlecheck = fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel);
                return true;
            }
            else
                return false;
        });
        if (keywordSearch)
            if (siteId != undefined)
                return { Input: "{FormId:" + formId + ",ParentFormId:" + ParentFormId + ",ListReportFieldIdValues:[" + JSON.stringify(siteId[0]) + "],Filter:'" + keywordSearch + "',PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',IsKeywordSearch:1,IsAdvancedSearch:0,IsExport:1}", fileName: "Sites", fields: filterArray };
            else
                return { Input: "{FormId:" + formId + ",ParentFormId:" + ParentFormId + ",Filter:'" + keywordSearch + "',PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',IsKeywordSearch:1,IsAdvancedSearch:0,IsExport:1}", fileName: "Sites", fields: filterArray };
        else if (advancedSearchValue && advancedSearchValue != "[]")
            if (siteId != undefined)
                return { Input: "{ FormId:" + formId + ",ParentFormId:" + ParentFormId + ",ListReportFieldIdValues:[" + JSON.stringify(siteId[0]) + "], ListFilterIdValues: " + advancedSearchValue + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1,IsExport:1}", fileName: "Sites", fields: filterArray };
            else
                return { Input: "{ FormId:" + formId + ",ParentFormId:" + ParentFormId + ", ListFilterIdValues: " + advancedSearchValue + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1,IsExport:1}", fileName: "Sites", fields: filterArray };
        else if (siteId != undefined)
            return { Input: "{ FormId:" + formId + ",ParentFormId:" + ParentFormId + ",ListReportFieldIdValues:[" + JSON.stringify(siteId[0]) + "],PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',IsExport:1}", fileName: "Sites", fields: filterArray };
        else
            return { Input: "{ FormId:" + formId + ",ParentFormId:" + ParentFormId + ",PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',IsExport:1}", fileName: "Sites", fields: filterArray };
    };
    AdministrationService.prototype.updateSpaceImport = function (mappedClmns, excelData, importColumnsList, relationId, value, sheetName) {
        return this.postaction({ Input: "{FormId:0}", ColumnMapInput: JSON.stringify(mappedClmns), ValidationInput: JSON.stringify(importColumnsList), RowData: JSON.stringify(excelData), RelationId: relationId, FileInput: value.fileObj.FileData, FileName: value.fileObj.FileName, FileSize: value.fileObj.FileSize, SheetName: sheetName }, this.updateSpaceImportTemplateFieldsUrl);
    };
    AdministrationService.prototype.updateEmployeeImport = function (mappedClmns, excelData, importColumnsList, relationId, optionValue, value, sheetName) {
        return this.postaction({ Input: "{FormId:0}", ColumnMapInput: JSON.stringify(mappedClmns), ValidationInput: JSON.stringify(importColumnsList), RowData: JSON.stringify(excelData), RelationId: relationId, IsInsert: optionValue, FileInput: value.fileObj.FileData, FileName: value.fileObj.FileName, FileSize: value.fileObj.FileSize, SheetName: sheetName }, this.ImportEmployeeDetailsUrl);
    };
    AdministrationService.prototype.updateAssetImport = function (mappedClmns, excelData, importColumnsList, importFields, value, sheetName) {
        return this.postaction({ Input: "{FormId:0}", ColumnMapInput: JSON.stringify(mappedClmns), ValidationInput: JSON.stringify(importColumnsList), RowData: JSON.stringify(excelData), ImportInput: JSON.stringify(importFields[0]), FileInput: value.fileObj.FileData, FileName: value.fileObj.FileName, FileSize: value.fileObj.FileSize, SheetName: sheetName }, this.ImportAssetDetailsUrl);
    };
    AdministrationService.prototype.updateUserImport = function (mappedClmns, excelData, importColumnsList, value, sheetName) {
        return this.postaction({ Input: "{FormId:0}", ColumnMapInput: JSON.stringify(mappedClmns), ValidationInput: JSON.stringify(importColumnsList), RowData: JSON.stringify(excelData), FileInput: value.fileObj.FileData, FileName: value.fileObj.FileName, FileSize: value.fileObj.FileSize, SheetName: sheetName }, this.ImportUserDetailsUrl);
    };
    AdministrationService.prototype.updateDocumentImport = function (mappedClmns, excelData, importColumnsList, documentFolder, optionValue, value, sheetName) {
        return this.postaction({ Input: "{FormId:0}", ColumnMapInput: JSON.stringify(mappedClmns), ValidationInput: JSON.stringify(importColumnsList), RowData: JSON.stringify(excelData), DocumentFolder: documentFolder, IsInsert: optionValue, FileInput: value.fileObj.FileData, FileName: value.fileObj.FileName, FileSize: value.fileObj.FileSize, SheetName: sheetName }, this.ImportDocumentDetailsUrl);
    };
    AdministrationService.prototype.InsertImportTemplateFields = function (strRptFields, selectedId) {
        return this.postaction({ Input: "{FormId:0 ,ListReportFieldIdValues: " + JSON.stringify(strRptFields) + ",Id:" + selectedId + "}" }, this.insertImportTemplateFieldsUrl);
    };
    //Change Customer
    AdministrationService.prototype.ChangeCrossSessionValue = function (selectedId, value) {
        return this.postaction({ Input: "{FormId:96 ,Id: " + selectedId + ",ListReportFieldIdValues: [{ \"ReportFieldId\" :84, \"Value\": " + value + "}]}" }, this.submitEditUrl);
    };
    AdministrationService.prototype.getIsModuleAdmin = function (moduleId) {
        return this.postaction({
            input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"}]}"
        }, this.getIsModuleAdminUrl);
    };
    AdministrationService.prototype.getFloorExportData = function (index, direction, column, buildingId, fieldObjects, fileName, keywordSearch, advancedSearchValue, isExport) {
        // debugger
        var fields = fieldObjects;
        var filterArray = [];
        var singlecheck = fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel);
                return true;
            }
            else
                return false;
        });
        if (advancedSearchValue && advancedSearchValue != "[]") {
            if (buildingId == undefined) {
                if (isExport == true)
                    return { Input: "{ FormId:71,ParentFormId:125,isExport:1,ListFilterIdValues: " + advancedSearchValue + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}", fileName: fileName, fields: filterArray };
                else
                    return { Input: "{ FormId:71,ParentFormId:125,ListFilterIdValues: " + advancedSearchValue + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}", fileName: fileName, fields: filterArray };
            }
            else {
                if (isExport == true)
                    return { Input: "{ FormId:71,ParentFormId:125,isExport:1,ListFilterIdValues: " + advancedSearchValue + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1,ListReportFieldIdValues:[" + JSON.stringify(buildingId[0]) + "]}", fileName: fileName, fields: filterArray };
                else
                    return { Input: "{ FormId:71,ParentFormId:125,ListFilterIdValues: " + advancedSearchValue + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1,ListReportFieldIdValues:[" + JSON.stringify(buildingId[0]) + "]}", fileName: fileName, fields: filterArray };
            }
        }
        else if (keywordSearch) {
            if (buildingId == undefined) {
                if (isExport == true)
                    return { Input: "{ FormId:71,Filter:'" + keywordSearch + "',isExport:1,IsKeywordSearch:1,IsAdvancedSearch:0}", fileName: "Floors", fields: filterArray };
                else
                    return { Input: "{ FormId:71,Filter:'" + keywordSearch + "',IsKeywordSearch:1,IsAdvancedSearch:0}", fileName: "Floors", fields: filterArray };
            }
            else {
                if (isExport == true)
                    return { Input: "{ FormId:71,Filter:'" + keywordSearch + "',IsKeywordSearch:1,IsAdvancedSearch:0,ListReportFieldIdValues:[" + JSON.stringify(buildingId[0]) + "]}", fileName: "Floors", fields: filterArray };
            }
        }
        else {
            if (buildingId == undefined) {
                if (isExport == true)
                    return { Input: "{FormId:" + this.floorListFormId + ",isExport:1,PageIndex:" + index + ",SortDirection:'" + direction + "'}", fileName: "Floors", fields: filterArray };
                else
                    return { Input: "{FormId:" + this.floorListFormId + ",PageIndex:" + index + ",SortDirection:'" + direction + "'}", fileName: "Floors", fields: filterArray };
            }
            else {
                if (isExport == true)
                    return { Input: "{FormId:" + this.floorListFormId + ",isExport:1,ListReportFieldIdValues:[" + JSON.stringify(buildingId[0]) + "],PageIndex:" + index + ",SortDirection:'" + direction + "'}", fileName: "Floors", fields: filterArray };
                else
                    return { Input: "{FormId:" + this.floorListFormId + ",ListReportFieldIdValues:[" + JSON.stringify(buildingId[0]) + "],PageIndex:" + index + ",SortDirection:'" + direction + "'}", fileName: "Floors", fields: filterArray };
            }
        }
    };
    AdministrationService.prototype.getBarCodeData = function (event) {
        //return this.postaction({ fileInput: event }, this.getBarCodeDataUrl);
        return this.postaction({ fileInput: event }, this.getBarCodeDataUrl);
    };
    AdministrationService.prototype.getSSOEnabled = function () {
        return this.postaction({}, this.getSSOEnabledUrl);
    };
    AdministrationService.prototype.getWorkFlowEditableFields = function (selectedUserid) {
        return this.postaction({ Input: "{ FormId:90,ListLookupReportFieldIdValues: [{ \"FieldId\":339,\"ReportFieldId\" :300, \"Value\": " + selectedUserid + "}]}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.GetUserCountForDashBoard = function () {
        return this.postaction({}, this.getUserCountForDashBoard);
    };
    AdministrationService.prototype.checkSubscribedFeature = function (featureCategoryIds) {
        return this.postaction({ Input: "{FormId:353}", FeatureCategoryIds: featureCategoryIds }, this.subscribedFeatureUrl);
    };
    AdministrationService.prototype.GetSpaceBarChartDetailsForDashboard = function () {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":571, \"Value\":0 }]}" }, this.getDashboardDetailsForSpaceBarChart);
    };
    AdministrationService.prototype.GetDrawingDistributionForDashBoard = function () {
        return this.postaction({}, this.getDrawingDistributionForDashBoard);
    };
    AdministrationService.prototype.GetExpiredUserFields = function () {
        return this.postaction({ Input: "{FormId:374}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.GetExpiredUserData = function (column, direction) {
        return this.postaction({ Input: "{FormId:374, SortColumn: '" + column + "', SortDirection: '" + direction + "'}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.getReportsAccessibleByUser = function (selectedUserId) {
        return this.postaction({ Input: "{Id:" + selectedUserId + ",ListReportFieldIdValues:[{\"ReportFieldId\":3917, \"Value\":0 }]}" }, this.getReportsAccessibleByUserUrl);
    };
    AdministrationService.prototype.updateReportAccessToUser = function (updatedRptFldValues, selectedUserId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[" + updatedRptFldValues + "{\"ReportFieldId\":3915, \"Value\":" + selectedUserId + "}]}" }, this.updateReportAccessToUserUrl);
    };
    AdministrationService.prototype.getPersonalSettingsFieldWithData = function (userId) {
        return this.postaction({ Input: "{ FormId: 388,Id:" + userId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":2303,\"ReportFieldId\": 12097, \"Value\":\"3289\" }]}" }, this.editDataUrl);
    };
    AdministrationService.prototype.updatePersonalSettingsData = function (strRptFields) {
        return this.postaction({ Input: "{FormId: 388 ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitEditUrl);
    };
    AdministrationService.prototype.getChangePasswordlist = function () {
        return this.postaction({ Input: "{FormId: 389 }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getChangePasswordKey = function () {
        return this.postaction({}, this.getkey);
    };
    AdministrationService.prototype.updatePassword = function (currentPass, pass, confirmPass) {
        return this.postaction({ Input: "{CurrentPassword:'" + currentPass + "',Password:'" + pass + "',ConfirmPassword:'" + confirmPass + "'}" }, this.updatePasswordUrl);
    };
    AdministrationService.prototype.getUserAccessibleSiteslist = function (selectedUserId) {
        return this.postaction({ Input: "{FormId: 390,ListLookupReportFieldIdValues:[{ \"FieldId\":2096,\"ReportFieldId\": 6350, \"Value\":" + selectedUserId + " }] }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getUserAccessibleSiteIds = function (selectedUserId) {
        return this.postaction({ Input: "{UserId: " + selectedUserId + " }" }, this.getUserAccessibleSites);
    };
    AdministrationService.prototype.CheckIsSiteLevelAdmin = function (moduleId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278, \"Value\":" + moduleId + " }]}" }, this.checkIsSiteLevelAdmin);
    };
    AdministrationService.prototype.CheckIsSiteLevelUser = function () {
        return this.postaction({}, this.checkIsSiteLevelUser);
    };
    AdministrationService.prototype.getAdminstnCustomerSettingsFormFields = function (Formid) {
        var lookupRptField = "[{\"FieldId\":2080,\"ReportFieldId\": 187, \"Value\":\"2080\" },{\"FieldId\":2128,\"ReportFieldId\": 187, \"Value\":\"2128\" }"
            + ", {\"FieldId\":2130,\"ReportFieldId\": 187, \"Value\":\"2130\" }, {\"FieldId\":2134,\"ReportFieldId\": 187, \"Value\":\"2134\" }" +
            ", {\"FieldId\":2135,\"ReportFieldId\": 187, \"Value\":\"2135\" }, {\"FieldId\":2136,\"ReportFieldId\": 187, \"Value\":\"2136\" }" +
            ", {\"FieldId\":2162,\"ReportFieldId\": 187, \"Value\":\"2162\" }, {\"FieldId\":2158,\"ReportFieldId\": 187, \"Value\":\"2158\" }" +
            ", {\"FieldId\":2161,\"ReportFieldId\": 187, \"Value\":\"2161\" }, {\"FieldId\":2225,\"ReportFieldId\": 187, \"Value\":\"2225\" }]";
        return this.postaction({ Input: "{ FormId:" + Formid + ",ParentFormId:" + 0 + ",Id:" + 0 + ",ListLookupReportFieldIdValues:" + lookupRptField + "}" }, this.editDataUrl);
    };
    AdministrationService.prototype.getAdminstnCustomerSettingsFormFieldsForObjects = function (Formid, ModuleId) {
        var lookupRptField = "[{\"FieldId\":2210,\"ReportFieldId\": 187, \"Value\":\"2210\"  }" +
            ",{\"FieldId\":2210,\"ReportFieldId\": 271, \"Value\":\"" + ModuleId + "\" }]";
        return this.postaction({ Input: "{ FormId:" + Formid + ",ParentFormId:" + 0 + ",Id:" + 0 + ",ListLookupReportFieldIdValues:" + lookupRptField + "}" }, this.editDataUrl);
    };
    AdministrationService.prototype.getSubscribedFeaturesWithFields = function (Formid, ModuleId) {
        return this.postaction({ Input: "{ FormId:" + Formid + ",ListReportFieldIdValues:[{\"ReportFieldId\":271, \"Value\":" + ModuleId + " }]}" }, this.GetSubscribedFeaturesWithFieldsUrl);
    };
    AdministrationService.prototype.UpdateCustomerSettings = function (ModuleId, FeatureDetails, IsModuleEnabled) {
        return this.postaction({
            Input: "{ ModuleId:" + ModuleId + ",ListCustomerFeatureInput:" + FeatureDetails + ", IsModuleEnabled:" + IsModuleEnabled + "}" }, this.UpdateCustomerSettingsUrl);
    };
    AdministrationService.prototype.CheckAutoNumbering = function (Formid, ObjectCategoryId) {
        return this.postaction({ Input: "{ FormId:" + Formid + ",ListReportFieldIdValues:[{\"ReportFieldId\":649, \"Value\":" + ObjectCategoryId + " }]}" }, this.CheckAutoNumberingStatusUrl);
    };
    AdministrationService.prototype.GetUniqueRoomNo = function (Formid) {
        return this.postaction({ Input: "{ FormId:" + Formid + "}" }, this.GetUniqueRoomNoUrl);
    };
    AdministrationService.prototype.GetWorkorderCount = function () {
        return this.postaction({}, this.GetWorkOrderUsersCountUrl);
    };
    AdministrationService.prototype.getHelpMenuUrl = function () {
        return this.postaction({}, this.helpsMenuUrl);
    };
    AdministrationService.prototype.getSpaceFunctionCustomizedName = function () {
        return this.postaction({}, this.SpaceFunctionCustomizedName);
    };
    AdministrationService.prototype.getDivisionAccesUsersList = function (unitId, pageIndex, sortCol, sortDir) {
        var param = "{ FormId: 419,PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',ListReportFieldIdValues:[{\"ReportFieldId\":301, \"Value\":" + unitId + " }]}";
        return this.postaction({ Input: param }, this.listDataListUrl);
    };
    AdministrationService.prototype.getKeywordField = function (FormId) {
        return this.postaction({ Input: "{FormId:" + FormId + "}" }, this.keywordLookUpUrl);
    };
    AdministrationService.prototype.getFields = function (FormId) {
        return this.postaction({ Input: "{ FormId:" + FormId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getListSearch = function (formid, parentFormId, unitId, pageIndex, sortCol, sortDir, rptFieldValues, keywordvalue, IsKeyword, IsAdvance, advancedSearchvalue) {
        // var rptFieldValues = "[{\"ReportFieldId\":8795,\"Value\":\"" + selSpaceId + "\"}]";
        if (IsKeyword == "1") {
            return this.postaction({ Input: "{ FormId: " + formid + ",ListReportFieldIdValues:" + rptFieldValues + ",ParentFormId:" + parentFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",Filter:'" + keywordvalue + "',ListFilterIdValues: " + advancedSearchvalue + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId: " + formid + ",ListReportFieldIdValues:" + rptFieldValues + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
        }
    };
    AdministrationService.prototype.GetBaseOrganizationUsers = function (orgid) {
        return this.postaction({ OrganizationalUnitId: orgid }, this.GetBaseOrganizationUsersUrl);
    };
    AdministrationService.prototype.updateDivisionAccessToManyUsers = function (updatedRptFldValues, unitId) {
        return this.postaction({ Input: "{Id:" + unitId + ",ListReportFieldIdValues:[" + updatedRptFldValues + "]}" }, this.UpdateDivisionAccessToManyUserUrl);
        // return this.postaction({ Input: "{ FormId:" + this.UserDivisionAdminSetFrmId + ",UserIds:[" + userIds + "],divisionAdminInput:" + divAdminInpt + "}" }, this.updateDivisionAdminacces);
    };
    AdministrationService.prototype.getReportMenusbyModelwise = function (moduleId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":149, \"Value\":" + moduleId + "}]}" }, this.getReportMenusbyModelWise);
    };
    AdministrationService.prototype.getFeedbackFields = function () {
        return this.postaction({ Input: "{FormId: 426}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.submitFeedback = function (strRptFields, userId) {
        return this.postaction({ Input: "{FormId:426 ,ListReportFieldIdValues: " + strRptFields + ",Id:" + userId + "}" }, this.feedbackSubmiturl);
    };
    AdministrationService.prototype.getUserGridDataExportInput = function (formId, pageIndex, sortDirection, sortColumn, fieldObjects, fileName, keyworsearch, value, IsKeyword, IsAdvance) {
        var fields = fieldObjects;
        var filterArray = [];
        fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel);
                return true;
            }
            else
                return false;
        });
        return { Input: "{ FormId:" + formId + ",IsExport:1,PageIndex:" + pageIndex + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "', Filter: '" + keyworsearch + "', ListFilterIdValues: " + value + ", IsKeywordSearch: " + IsKeyword + ", IsAdvancedSearch:" + IsAdvance + "}", fileName: fileName, fields: filterArray };
    };
    AdministrationService.prototype.getCommonAdvnceSearchLookup = function (formId) {
        return this.postaction({ Input: "{FormId:" + formId + "}" }, this.AdvanceSearchLookUpUrl);
    };
    AdministrationService.prototype.getCommonKeywordField = function (formId) {
        return this.postaction({ Input: "{FormId:" + formId + "}" }, this.keywordLookUpUrl);
    };
    AdministrationService.prototype.downloadRevision = function (ReferenceId, fileName, RevisionNo) {
        return this.downloadaction({ Input: "{FormId:464,EntityId:22}", FileInput: "{ReferenceId:" + ReferenceId + ",FileName:'" + fileName + "',RevisionNo:'" + RevisionNo + "'}" }, this.downloadUrl);
    };
    AdministrationService.prototype.getkeywordFields = function (FormId) {
        return this.postaction({ Input: "{FormId:" + FormId + "}" }, this.keywordLookUpUrl);
    };
    AdministrationService.prototype.getAllAdvanceSearchLookup = function (FormId) {
        return this.postaction({ Input: "{FormId:" + FormId + "}" }, this.AdvanceSearchLookUpUrl);
    };
    AdministrationService.prototype.getStatusofXref = function (floorId, drawingId, revisionNumber, drawingNames) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":539, \"Value\":" + floorId + "},{\"ReportFieldId\":586, \"Value\":" + drawingId + "},{\"ReportFieldId\":512, \"Value\":" + revisionNumber + "},{\"ReportFieldId\":510, \"Value\":\"" + drawingNames + "\"}]}" }, this.StatusXref);
    };
    AdministrationService.prototype.getSchedulingReportFieldObject = function () {
        return this.postaction({ Input: "{FormId:513}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getSchedulingReportData = function (pageDetails) {
        return this.postaction({ Input: "{FormId:513,ListReportFieldIdValues:" + JSON.stringify(pageDetails) + "}" }, this.ListDataForSchedulingReportUrl);
    };
    AdministrationService.prototype.updateSchedulingReportData = function (pageDetails) {
        return this.postaction({ Input: "{FormId:513,ListReportFieldIdValues:" + pageDetails + "}" }, this.updateSchedulingReportDataUrl);
    };
    AdministrationService.prototype.getManageReportFieldObject = function () {
        return this.postaction({ Input: "{FormId:519}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getManageReportData = function (ModuleId, target, nameDisplayFormatId, scheduledReportId, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{ FormId:519,SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}", Moduleid: ModuleId, Target: target, NameDisplayFormatId: nameDisplayFormatId, ScheduledReportId: scheduledReportId }, this.getManageReportDataUrl);
    };
    AdministrationService.prototype.manageReportDataDelete = function (id) {
        return this.postaction({ Input: "{FormId:519,Id:" + id + "}" }, this.deleteUrl);
    };
    AdministrationService.prototype.manageReportDataStatus = function (pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:519,ListReportFieldIdValues:" + pageDetails + ", Id: " + selectId + " }" }, this.updateManageReportStatusDataUrl);
    };
    AdministrationService.prototype.getInputExportHighlighted = function (selectedIds, fileName, pagingTarget, fieldObjects, sortCol, sortDir, pageDetails, logParameterConditions, logSelectedUserIds, logSelectedEntityIds) {
        var returnInput;
        var rptIds = '';
        var filterArray = [];
        fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel);
                return true;
            }
            else
                return false;
        });
        if (selectedIds.length > 1) {
            rptIds += "{\"ReportFieldId\":1697,\"Value\":\"" + selectedIds.toString() + "\"}";
        }
        if (pagingTarget == 1) {
            var param;
            if (rptIds == '')
                param = "{ FormId: " + this.LogApplicationListFrmId + ",IsExport:1" + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}";
            else
                param = "{ FormId: " + this.LogApplicationListFrmId + ",ListReportFieldIdValues:[" + rptIds + "],IsExport:1" + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}";
            returnInput = { Target: 1, fileName: fileName, Input: param, fields: filterArray };
        }
        else if (pagingTarget == 2) {
            if (rptIds == '') {
                returnInput = {
                    Target: 2,
                    fileName: fileName,
                    fields: filterArray,
                    LogParameters: "{ ListReportFieldIdValues:" + logParameterConditions + "}",
                    LogUserIds: "{ ListReportFieldIdValues:" + logSelectedUserIds + "}",
                    LogEntityIds: "{ ListReportFieldIdValues:" + logSelectedEntityIds + "}",
                    LogEventIds: "{ ListReportFieldIdValues:" + pageDetails + ",IsExport:1" + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}"
                };
            }
            else {
                logParameterConditions = logParameterConditions.substring(0, logParameterConditions.length - 1);
                logParameterConditions = logParameterConditions + "," + rptIds + "]";
                returnInput = {
                    Target: 2,
                    fileName: fileName,
                    fields: filterArray,
                    LogParameters: "{ ListReportFieldIdValues:" + logParameterConditions + "}",
                    LogUserIds: "{ ListReportFieldIdValues:" + logSelectedUserIds + "}",
                    LogEntityIds: "{ ListReportFieldIdValues:" + logSelectedEntityIds + "}",
                    LogEventIds: "{ ListReportFieldIdValues:" + pageDetails + ",IsExport:1" + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}"
                };
            }
        }
        return returnInput;
    };
    AdministrationService.prototype.GetCustomReportDetailsforSelectedAdditionalField = function (fieldobj, id) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + ",Id:" + id + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.getCustomReportDetailsforSelectedAdditionalField);
    };
    AdministrationService.prototype.getMessageTemplateFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.MessageTemplatesListFormId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getMessageTemplatesData = function (reportfieldIdValues, index, column, direction) {
        return this.postaction({ Input: "{FormId:" + this.MessageTemplatesListFormId + ",ListReportFieldIdValues:" + JSON.stringify(reportfieldIdValues) + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.loadMessageTemplateAddEditFields = function (selectedId, target, reportfieldIdValues) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.MessageTemplatesAddEditFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.MessageTemplatesAddEditFormId + ",ParentFormId:" + this.MessageTemplatesListFormId + ",Id:" + selectedId + " ,ListReportFieldIdValues: " + reportfieldIdValues + "}" }, this.editDataUrl);
        }
    };
    AdministrationService.prototype.checkMessageTemplateInUse = function (id) {
        return this.postaction({ Input: "{FormId:" + this.MessageTemplatesListFormId + ",Id:" + id + "}" }, this.CheckMessageTemplateInUse);
    };
    AdministrationService.prototype.deleteMessageTemplate = function (selectedId) {
        return this.postaction({ Input: "{FormId:" + this.MessageTemplatesListFormId + ",Id:" + selectedId + "}" }, this.deleteUrl);
    };
    AdministrationService.prototype.postSubmitMessageTemplate = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.MessageTemplatesAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.MessageTemplatesListFormId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.MessageTemplatesAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.MessageTemplatesListFormId + "}" }, this.submitEditUrl);
        }
    };
    AdministrationService.prototype.getCustomerListFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.customerListFormId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getCustomerData = function (index, column, direction) {
        return this.postaction({ Input: "{FormId:" + this.customerListFormId + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.loadCustomerAddEditFields = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.customerAddEditFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.customerAddEditFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    AdministrationService.prototype.Insertinvoiceifnotexists = function (categoryName) {
        return this.postaction({ CategoryName: categoryName }, this.InsertAttachmentCategoryurl);
    };
    AdministrationService.prototype.postsubmitCustomerDetails = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.customerAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.customerListFormId + "}" }, this.insertUpdateCustomerUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.customerAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.customerListFormId + "}" }, this.insertUpdateCustomerUrl);
        }
    };
    AdministrationService.prototype.getAssignDrawingCategoryFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.assignDwgCategoryFormId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getUserDetails = function (selectedId, field) {
        return this.postaction({ Input: "{ EntityId:" + selectedId + ",ListLookupReportFieldIdValues:" + field + "}" }, this.UserDetails);
    };
    AdministrationService.prototype.getDrawingCategoryData = function (reportfieldIdValues, index, column, direction) {
        return this.postaction({ Input: "{FormId:" + this.assignDwgCategoryFormId + ",ListReportFieldIdValues:" + JSON.stringify(reportfieldIdValues) + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.getCustomerDrawingCategoriesUrl);
    };
    AdministrationService.prototype.postsubmitCustomerDwgCategory = function (strRptFields) {
        return this.postaction({ Input: "{FormId:" + this.assignDwgCategoryFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.insertCustomerDrawingCategoriesUrl);
    };
    AdministrationService.prototype.getAllowedFileTypesFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.allowedFileTypesFormId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getAllowedFileTypesData = function (reportfieldIdValues, index, column, direction) {
        return this.postaction({ Input: "{FormId:" + this.allowedFileTypesFormId + ",ListReportFieldIdValues:" + JSON.stringify(reportfieldIdValues) + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.postsubmitAllowedFileTypes = function (strRptFields) {
        return this.postaction({ Input: "{FormId:" + this.allowedFileTypesFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.insertCustomerPermitedFilesUrl);
    };
    AdministrationService.prototype.loadUserLicenseSetupFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.userLicenseSetupFormId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getUserLicenceSetupData = function (selectedId, deviceTypeId) {
        return this.postaction({ Input: "{FormId:" + this.userLicenseSetupFormId + ",Id:" + selectedId + "}", DeviceTypeId: deviceTypeId }, this.GetUserLicenseSetupUrl);
    };
    AdministrationService.prototype.getUserLicenceSetupDataForCustomers = function (selectedId, deviceTypeId, licenseAccountLevel) {
        return this.postaction({ Input: "{FormId:" + this.userLicenseSetupFormId + ",Id:" + selectedId + "}", DeviceTypeId: deviceTypeId, LicenseAccountLevel: licenseAccountLevel }, this.GetUserLicenseSetupForCustomersUrl);
    };
    AdministrationService.prototype.postsubmitUserLicenseSetupUrl = function (selectedId, strRptFields) {
        return this.postaction({ Input: "{FormId:" + this.userLicenseSetupFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id: " + selectedId + " }" }, this.UpdateUserLicenseSetupForCustomersUrl);
    };
    AdministrationService.prototype.postsubmitRolewiseUserLicenseSetupUrl = function (selectedId, strRptFields, lienseSetupData) {
        return this.postaction({ Input: "{FormId:" + this.userLicenseSetupFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id: " + selectedId + " }", SetupData: lienseSetupData }, this.UpdaterolewiseUserLicenseSetupForCustomersUrl);
    };
    AdministrationService.prototype.getCalendarFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.CalendarFormId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getCreateNewCalendarFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.CreateNewCalendarFormId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getWorkingTimeFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.SetWorkingTimeFormId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getWorkingTimeData = function () {
        return this.postaction({ Input: "{FormId:" + this.SetWorkingTimeFormId + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.postSubmitCalendar = function (strRptFields, lstCalendar) {
        return this.postaction({ Input: "{ FormId:" + this.CreateNewCalendarFormId + ",ListReportFieldIdValues:" + strRptFields + "}", CalendarInput: lstCalendar }, this.InsertCalendar);
    };
    AdministrationService.prototype.getWorkingTimeDataList = function (strRptFields) {
        return this.postaction({ Input: "{FormId:" + this.SetWorkingTimeFormId + ",ListReportFieldIdValues: " + strRptFields + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.getCalendarDetails = function (calendarId) {
        return this.postaction({ Input: "{ FormId:" + this.CreateNewCalendarFormId + ",Id:" + calendarId + "}" }, this.GetCalendarDetails);
    };
    AdministrationService.prototype.getWorkingTimeBasedOnDateList = function (strRptFields) {
        return this.postaction({ Input: "{FormId:" + this.WorkingTimeBasedOnDateFormId + ",ListReportFieldIdValues: " + strRptFields + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.getCalendarExceptionFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.CalendarExceptionFormId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getCalendarExceptionDataList = function (calendarId) {
        return this.postaction({ Input: "{FormId:" + this.CalendarExceptionFormId + ",Id:" + calendarId + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.loadCalendarExceptionAddEditFields = function (selectedId, excepId, target) {
        var rptlookupFieldValues = "[{\"FieldId\":2888,\"ReportFieldId\":12097,\"Value\":\"4089\"},{\"FieldId\":2905,\"ReportFieldId\":12097,\"Value\":\"4102\"},{\"FieldId\":2889,\"ReportFieldId\":6439,\"Value\":" + excepId + "}]";
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.CalendarExceptionAddEditFormId + ",ListLookupReportFieldIdValues:" + rptlookupFieldValues + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.CalendarExceptionAddEditFormId + ",ParentFormId:" + this.CalendarExceptionFormId + ",Id:" + selectedId + ",ListLookupReportFieldIdValues:" + rptlookupFieldValues + "}" }, this.editDataUrl);
        }
    };
    AdministrationService.prototype.postSubmitCalendarException = function (strsubmitField, lstCalendarWorkTime, Id, target) {
        if (target == 'add') {
            return this.postaction({ Input: "{FormId:" + this.CalendarExceptionAddEditFormId + ",ListReportFieldIdValues: " + strsubmitField + "}", CalendarInput: lstCalendarWorkTime }, this.InsertUpdateCalendarException);
        }
        else if (target == 'edit') {
            return this.postaction({ Input: "{EntityId:" + Id + ",ListReportFieldIdValues: " + strsubmitField + "}", CalendarInput: lstCalendarWorkTime }, this.InsertUpdateCalendarException);
        }
    };
    AdministrationService.prototype.postCalendarExceptionDelete = function (selectId) {
        return this.postaction({ Input: "{FormId:" + this.CalendarExceptionFormId + ",Id:" + selectId + "}" }, this.deleteUrl);
    };
    AdministrationService.prototype.getCalendarExceptionDays = function (CalendarId, StartDate, EndDate) {
        return this.postaction({ Input: "{Id:" + CalendarId + ",EntityId:" + CalendarId + "}", StartDate: StartDate, EndDate: EndDate }, this.GetCalendarExceptionDays);
    };
    AdministrationService.prototype.getBuildingConditionGridFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.BuildingConditionListFormId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getBuildingConditionGridData = function (index, column, direction) {
        return this.postaction({ Input: "{FormId:" + this.BuildingConditionListFormId + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.getBuildingConditionAddEditFields = function (selId) {
        if (selId == 0) {
            return this.postaction({ Input: "{ FormId:" + this.BuildingConditionAddEditFormId + " }" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.BuildingConditionAddEditFormId + ",Id:" + selId + ",ParentFormId:" + this.BuildingConditionListFormId + " }" }, this.editDataUrl);
        }
    };
    AdministrationService.prototype.postBuildingConditionInsert = function (pageDetails) {
        return this.postaction({ Input: "{ FormId:" + this.BuildingConditionAddEditFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id: 0 ,ParentFormId:" + this.BuildingConditionListFormId + "}", }, this.submitAddUrl);
    };
    AdministrationService.prototype.postBuildingConditionUpdate = function (pageDetails, selectId) {
        return this.postaction({ Input: "{ FormId:" + this.BuildingConditionAddEditFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + ",ParentFormId:" + this.BuildingConditionListFormId + "}" }, this.submitEditUrl);
    };
    AdministrationService.prototype.postBuildingConditioDelete = function (selectId) {
        return this.postaction({ Input: "{FormId:" + this.BuildingConditionAddEditFormId + ",Id:" + selectId + ",ParentFormId:" + this.BuildingConditionListFormId + "}" }, this.deleteUrl);
    };
    AdministrationService.prototype.getDrawingLayerColms = function () {
        return this.postaction({ Input: "{FormId: 558}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getDrawingLayerListData = function (pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{ FormId: 558,SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.loadDrawingLayerAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId: 558}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId: 558,ParentFormId: 558,Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    AdministrationService.prototype.UpdateDrawingLayer = function (strRptFields, selectedId) {
        return this.postaction({ Input: "{FormId: 558 ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId: 558}" }, this.submitEditUrl);
    };
    AdministrationService.prototype.AddDrawingLayer = function (strRptFields, selectedId) {
        return this.postaction({ Input: "{FormId: 558,ListReportFieldIdValues: " + strRptFields + ",ParentFormId: 558}" }, this.submitAddUrl);
    };
    AdministrationService.prototype.deleteDrawingLayer = function (seleId) {
        return this.postaction({ Input: "{FormId: 558,ParentFormId: 558,Id:" + seleId + "}" }, this.deleteUrl);
    };
    AdministrationService.prototype.checkDrawingLayerInUse = function (seleId) {
        return this.postaction({ Input: "{FormId: 558,ParentFormId: 558,Id:" + seleId + "}" }, this.checkDrawingLayerInUseUrl);
    };
    AdministrationService.prototype.getLayerFunctionMappingColms = function () {
        return this.postaction({ Input: "{FormId: 560}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getLayerFunctionMappingListData = function (pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{ FormId: 560,SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.loadLayerFunctionMappingAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({
                Input: "{ FormId: 560 ,ListLookupReportFieldIdValues:[{ \"FieldId\":2850,\"ReportFieldId\": 4404, \"Value\":\"3\" }]}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId: 560,ParentFormId: 560,Id:" + selectedId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":2850,\"ReportFieldId\": 4404, \"Value\":\"3\" }]}" }, this.editDataUrl);
        }
    };
    AdministrationService.prototype.UpdateLayerFunctionMapping = function (strRptFields, selectedId) {
        return this.postaction({ Input: "{FormId: 560 ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId: 560}" }, this.submitEditUrl);
    };
    AdministrationService.prototype.AddLayerFunctionMapping = function (strRptFields, selectedId) {
        return this.postaction({ Input: "{FormId: 560,ListReportFieldIdValues: " + strRptFields + ",ParentFormId: 560}" }, this.submitAddUrl);
    };
    AdministrationService.prototype.deleteLayerFunctionMapping = function (seleId) {
        return this.postaction({ Input: "{FormId: 560,ParentFormId: 560,Id:" + seleId + "}" }, this.deleteUrl);
    };
    AdministrationService.prototype.getSeasonsGridFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.seasonsListFormId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getSeasonsGridData = function (index, column, direction) {
        return this.postaction({ Input: "{FormId:" + this.seasonsListFormId + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.getSeasonsAddEditFields = function (selId) {
        if (selId == 0) {
            return this.postaction({ Input: "{ FormId:" + this.seasonsAddEditFormId + " }" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.seasonsAddEditFormId + ",Id:" + selId + ",ParentFormId:" + this.seasonsListFormId + " }" }, this.editDataUrl);
        }
    };
    AdministrationService.prototype.postSeasonsInsert = function (pageDetails) {
        return this.postaction({ Input: "{ FormId:" + this.seasonsAddEditFormId + ",ListReportFieldIdValues:" + pageDetails + ",ParentFormId:" + this.seasonsListFormId + "}", }, this.submitAddUrl);
    };
    AdministrationService.prototype.postSeasonUpdate = function (pageDetails, selectId) {
        return this.postaction({ Input: "{ FormId:" + this.seasonsAddEditFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + ",ParentFormId:" + this.seasonsListFormId + "}" }, this.submitEditUrl);
    };
    AdministrationService.prototype.postSeasonDelete = function (selectId) {
        return this.postaction({ Input: "{FormId:" + this.seasonsListFormId + ",Id:" + selectId + ",ParentFormId:" + this.seasonsListFormId + "}" }, this.deleteUrl);
    };
    AdministrationService.prototype.checkSeasonInUse = function (selectId) {
        return this.postaction({ Input: "{FormId:" + this.seasonsListFormId + ",Id:" + selectId + ",ParentFormId:" + this.seasonsListFormId + "}" }, this.CheckSeasonInUseUrl);
    };
    //LogOff() {
    //    return this.postaction({}, this.LogOutUrl);
    //}       
    AdministrationService.prototype.LogOff = function () {
        return this.postaction({}, this.updateLogOutCountUrl);
    };
    AdministrationService.prototype.getPlotSettingsAppSetingsKey = function () {
        return this.postaction({}, this.GetPlotSettingsAppConfigKey);
    };
    AdministrationService.prototype.getRevit3DDrawingAppSetingsKey = function () {
        return this.postaction({}, this.GetRevit3DDrawingAppConfigKey);
    };
    //Update Email
    AdministrationService.prototype.getChangeEmailForUser = function () {
        return this.postaction({ Input: "{FormId: 575 }" }, this.editDataUrl);
    };
    AdministrationService.prototype.UpdateEmailForUser = function (pageDetails) {
        return this.postaction({ Input: "{ FormId:575,ListReportFieldIdValues:" + pageDetails + "}", }, this.submitEditUrl);
    };
    AdministrationService.prototype.getClientColumns = function () {
        return this.postaction({ Input: "{ FormId:" + this.ClientListFormId + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.getClienttData = function (moduleId, categorytype, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{ FormId: " + this.ClientListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\": " + moduleId + " }, {\"ReportFieldId\":6140,\"Value\":\"" + categorytype + "\"}]}" }, this.listDataListUrl);
    };
    AdministrationService.prototype.loadClientAddEdit = function (selectedId, target, categorytype) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.ClientListFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.ClientListFormId + ",ParentFormId:" + this.ClientListFormId + ",Id:" + selectedId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":6140,\"Value\":\"" + categorytype + "\"}]}" }, this.editDataUrl);
        }
    };
    AdministrationService.prototype.AddUpdateClient = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.ClientListFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.ClientListFormId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.ClientListFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.ClientListFormId + "}" }, this.submitEditUrl);
        }
    };
    AdministrationService.prototype.deleteClient = function (selectedId, moduleId) {
        return this.postaction({ Input: "{FormId:" + this.ClientListFormId + ",Id:" + selectedId + ", ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\": " + moduleId + " }]}" }, this.deleteUrl);
    };
    AdministrationService.prototype.checkActionPointUsersAndUserGroup = function (selectedId, target) {
        return this.postaction({ input: "{ FormId: 007,Id:" + selectedId + "}", target: target }, this.checkActionPointUsersAndUserGroupUrl);
    };
    AdministrationService.prototype.getSymbolLibrary = function () {
        return this.postaction({ Input: "{ FormId: " + this.AddSymbolformid + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.viewDWGdata = function (fileData) {
        return this.postaction({ Input: "{ FormId:" + this.AddSymbolformid + " }", FileInput: JSON.stringify(fileData) }, this.ViewDWGfile);
    };
    AdministrationService.prototype.AddSymbolFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.AddSymbolfeilds + " }" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.AddingSymbol = function (strRptFields) {
        debugger;
        return this.postaction({ Input: "{FormId:" + this.AddSymbolfeilds + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.InsertSymbolToLibrary);
    };
    AdministrationService.prototype.AssignSymbolFeilds = function () {
        return this.postaction({ Input: "{FormId:" + this.AssignSymbolFormId + "}" }, this.listFieldObjUrl);
    };
    AdministrationService.prototype.loadModuleddl = function (parentFieldId, parentId) {
        return this.postaction({ Input: "{FormId:" + this.AssignSymbolFormId + ",Id:" + parentId + ",ParentFieldId:" + parentFieldId + ", ListReportFieldIdValues: [{ \"ReportFieldId\":112,\"Value\": " + parentId + " }]}" }, this.lookupUrl);
    };
    AdministrationService.prototype.UpdateAssignSymbol = function (strRptFields) {
        return this.postaction({ Input: "{FormId:" + this.AssignSymbolFormId + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.submitAddUrl);
    };
    AdministrationService.prototype.loadCheckBoxDataSort = function (strRptFields, pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{FormId:" + this.AssignSymbolFormId + ",ListReportFieldIdValues:" + strRptFields + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    AdministrationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AdministrationService);
    return AdministrationService;
}(HttpHelpers_1.HttpHelpers));
exports.AdministrationService = AdministrationService;
//# sourceMappingURL=administration.service.js.map