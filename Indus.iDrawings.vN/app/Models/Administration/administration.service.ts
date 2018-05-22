import {Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from  '../../Framework/Models/Interface/IField'
import {HttpHelpers} from '../../Whatever/utils/HttpHelpers';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AdministrationService extends HttpHelpers {
    ///////////////////////new ////////
    private listFieldObjUrl = 'Common/GetListAppFormFields';
    private ExportToExcel = 'Common/ExportToExcel';
    private CustomerFolderName = 'Common/GetCustomerFolderName';
    private listDataListUrl = 'Common/GetAppFormDataList';
    private addDataUrl = 'Common/GetAddAppFormFields';
    private editDataUrl = 'Common/GetEditAppFormFields';
    private submitAddUrl = 'Common/InsertAppFormData';
    private submitEditUrl = 'Common/UpdateAppFormData';
    private lookupUrl = 'Common/GetFieldLookupValues';
    private deleteUrl = 'Common/DeleteAppFormData';
    private keywordLookUpUrl = 'Common/GetKeywordSearchLookups';
    private deleteFieldValue = 'Common/DeleteAdditionalDataFieldValues';
    private GetAdvancedSerachResulturl = 'Common/GetAdvancedSerachResult';
    private AdvanceSearchLookUpUrl = 'Common/GetAdvancedSerachLookups';
    private CheckIsEntityReferenceUrl = 'Common/CheckIsEntityReferenceExists';
    private removeFloor = 'SiteBuildingFloor/RemoveFloors'
    private getWhitelistUrl = 'Common/GetWhiteListDetails'
    private getFieldFormatListUrl ='Common/GetFieldFormatDetails'
    private GetOrganizationUnitsUrl='Common/GetOrganizationUnits'
    private siteCloseUrl = 'SiteBuildingFloor/CloseSite';
    private siteReopenUrl = 'SiteBuildingFloor/ReOpenSite';
    private buildingCloseUrl = 'SiteBuildingFloor/CloseBuilding';
    private buildingReopenUrl = 'SiteBuildingFloor/ReOpenBuilding';
    private CheckFieldValueExist = 'Common/GetAdditionalFieldHaveLookUpValues'
    private checkIsInUse = 'Common/GetAdditionalFieldIsInUse'
    private getCustomReportDetailsforSelectedAdditionalField = 'Common/GetCustomReportDetailsforSelectedAdditionalField';
    private GetOrganizationMenu = 'Administration/GetCustomerOrganizationalStructureLookup';
    private listLookUpOrgFieldObjUrl = "Administration/GetOrganizationalUnitsByLevelID";
    private getAdditionalFieldDetails = 'Common/GetAdditionalDataFieldDetails';
    private GetBaseOrganizationUsersUrl = 'User/GetBaseOrganizationUsers'
    private UserDetails = 'User/GetUserDetails';
    private insertUserUrl = 'User/InsertUser';
    private updateModulacces = 'User/UpdateModuleAccess';
    private updateDivacces = 'User/UpdateDivisionAccess';
    private updateModulAdminacces = 'User/UpdateModuleAdminAccess';
    private updateDivisionAdminacces = 'User/UpdateDivisionAdminAccess';
    private UpdateDivisionAccessToManyUserUrl = 'User/UpdateDivisionAccessToManyUser';
    private getMaxWOUserCreated = 'User/GetMaxWorkOrderUserCreated';
    private getMaxUsrCreated = 'User/GetMaxUserCreated';
    private customerFeatures = 'Common/GetSubscribedFeatures';
    private getUserForRole = 'User/GetUserListForUserRole';
    private getAccessTemplatesbyRole = 'User/GetAccessTemplatesForUserRole';
    private checkUserNameAvailability = 'User/CheckLoginNameAvailability';
    private checkMailDomains = 'User/CheckdomainValidations';
    private getMaxandWOUSer = 'User/GetMaxUserandWOCreated';
    private reserPswd = 'User/ResetPasswordUserList';
    private resetPwdandMail = 'User/ResetpasswordAndSendEmail';
    private getPswdPolicy = 'User/GetPasswordPolicy';
    private isPwdChangePossible = 'User/GetPasswordChangePossible'
    private getSessionValues = 'Common/GetSessionValues';
    private logUserDataUrl = 'Logbook/GetLogUsers';
    private logEntityDataUrl = 'Logbook/GetLogEntities';
    private logEventsDataUrl = 'Logbook/GetLogEvents';
    private logDataUrl = 'Logbook/GetLogs';
    private logDataOnLoadUrl = 'Logbook/GetAllLogs';
    private logGetLogsByConditionsUrl = 'Logbook/GetLogsByConditions';
    private downloadUrl = 'Common/ArrayDownloadFile';
    private checkIsModuleAdminUrl = 'Common/IsModuleAdmin';
    private checkActionPointInUseUrl = 'WorkFlow/CheckActionPointInUse';
    private CheckAdditionalDataFieldLookUpValueInUseurl = 'Common/CheckAdditionalDataFieldLookUpValueInUse';
    private attachmentDate = "Common/GetCurrentDateTime";
    private readExcelUrl = "Administration/uploadExcel";
    private SavedImportColumnsUrl = "Administration/GetSavedImportColumns";
    private FolderPathforImportUrl = "Administration/GetFolderPathforImport"
    private GetImportColumnsUrl = "Administration/GetImportColumns";
    private GetObjImportColumnsUrl = "Administration/GetObjectImportColumns";
    private GetImportTepmlateIdUrl = "Administration/GetImportTemplateId";
    private insertImportTemplateFieldsUrl = "Administration/InsertImportTemplateFields";
    private updateSpaceImportTemplateFieldsUrl = "Administration/ImportSpaceData";
    private ImportEmployeeDetailsUrl = "Administration/ImportEmployeeDetails";
    private ImportAssetDetailsUrl = "Administration/ImportObjectDetails";
    private ImportDocumentDetailsUrl = "Administration/ImportDocumentDetails";
    private attachmentAssetClassorNotUrl = 'Common/CheckObjectClassAttachments';
    private checkWorkFlowCategoryInUseUrl = 'Administration/CheckWorkFlowCategoryInUse';
    private getBarCodeDataUrl = 'Common/DecodeBarCodeFromImageUploaded';
    private GetOrganizationurl = 'Administration/GetCustomerOrganztnlStructureLookup';
    private getIsModuleAdminUrl = 'Common/IsModuleAdmin';
    private getSSOEnabledUrl = 'Administration/SSOEnabled';
    private subscribedFeatureUrl = 'Common/GetSubscribedFeatures';
    private getReportsAccessibleByUserUrl = 'Administration/GetReportsAccessibleByUser';
    private updateReportAccessToUserUrl = 'User/UpdateReportAccessToUser';
    private getOrganizationalUnitListForaSelectedUserUrl = 'User/GetOrganizationalUnitListForaSelectedUser';
    private userReportsAccessListFrmId = 2469;
    //DashBoard
    private getUserCountForDashBoard = 'Administration/GetUserCountForDashBoard';
    private getUsersExpiringSoonForDashBoard = 'Administration/GetUsersExpiringSoonForDashBoard';
    private getDashboardDetailsForSpaceBarChart = 'Administration/GetDashboardDetailsForSpaceBarChart';
    private getModuleDetailsForDashBoard = 'Administration/GetModuleDetailsForDashBoard';
    private getDrawingDistributionForDashBoard = 'Administration/GetDrawingDistributionForDashBoard'; 
    private getkey = 'Administration/ChangePassword';
    private updatePasswordUrl = 'Administration/ChangePasswordConfirmation';
    private helpsMenuUrl = 'Common/GetHelpMenuDetails';

    private getUserAccessibleSites = 'Common/GetUserAccessibleSites';
    private checkIsSiteLevelAdmin = 'Common/CheckIsSiteLevelAdmin';
    private checkIsSiteLevelUser = 'Common/CheckIsSiteLevelUser';
    private SpaceFunctionCustomizedName = 'Space/getSpaceFunctionCustomizedName';
    private getReportMenusbyModelWise = 'Common/GetUserAccessReportDetails';
    private feedbackSubmiturl = 'Common/SendFeedback';
    private StatusXref = 'Common/InsertXRefedFloorDrawingDetails';
    private ListDataForSchedulingReportUrl = 'Common/GetCustomerAccessScheduleReportDetails';
    private updateSchedulingReportDataUrl = 'Common/UpdateCustomerAccessScheduleReports';
    
    private insertUpdateCustomerUrl = 'Administration/InsertUpdateCustomer';
    private getCustomerDrawingCategoriesUrl = 'Administration/GetCustomerDrawingCategories';
    private insertCustomerDrawingCategoriesUrl = 'Administration/InsertCustomerDrawingCategories';
    private insertCustomerPermitedFilesUrl = 'Administration/InsertCustomerPermitedFiles';
    private GetUserLicenseSetupUrl = 'Administration/GetUserLicenseSetup';
    private GetUserLicenseSetupForCustomersUrl = 'Administration/GetUserLicenseSetupForCustomers';
    private UpdaterolewiseUserLicenseSetupForCustomersUrl = 'Administration/UpdateUserLicensingSetupforCustomers';
    private UpdateUserLicenseSetupForCustomersUrl = 'Administration/UpdateUserLicensingSetup';
    private checkDrawingLayerInUseUrl = 'Administration/CheckDrawingLayerForModule';    
    //private LogOutUrl = 'Account/LogOff';
    private updateLogOutCountUrl = 'Common/UpdateLogOutCount';
    private ViewDWGfile = 'Common/ViewDWGfile';
    private InsertSymbolToLibrary = 'Common/InsertSymbolLibrary'
    

    private customerListFormId = 528;
    private customerAddEditFormId = 529;
    private assignDwgCategoryFormId = 530;
    private allowedFileTypesFormId = 553;
    private userLicenseSetupFormId = 535;

    private sitelistFormId = 44;
    private siteaddEditformId = 49;
    private buildinglistFormId = 1;
    private buildingaddEditFormId = 2;
    private floorListFormId = 71;
    private flooraddeditFormID = 91;
    private drawingLayerNameFormID = 31;

    private addlDataFieldListFormId = 97;
    private addlDataFieldAddEditFormId = 98;
    private fieldValueListFormId = 109;

    private plotStyleListFrmId = 33;
    private plotStyleAddEditFrmId = 51;
    private UserListFrmId = 53;
    private UserAddEditFrmId = 54;
    private UserModAccessFrmId = 85;
    private UserDrwgAccess = 86;
    private UserDvsnAccessFrmId = 87;
    private UserModAdminSettFmId = 89;
    private UserDivisionAdminSetFrmId = 90;
    private AttachmentCategoryFrmId = 37;
    private MailDomainsFrmId = 42;
    private ReportSetupFrmId = 84;
    private AssignStylesDrawingLyrFrmId = 106;
    private AdminActionPointsFrmId = 114;
    private AdminAddEditActionPointFrmId = 117;
    private LogApplicationListFrmId = 100;
    private LogParameterListFrmId = 108;
    private LogUserListFrmId = 129;
    private LogEntityListFrmId = 133;
    private LogActivityListFrmId = 138;
    private AdminActionPointUserFrmId = 134;
    private AdminActionPointUserGroupFrmId = 137;
    private attachmentDetailsFormId = 128;
    private attachmentDetailsAddEditFormId = 304;
    private ResetPwdFrmId = 175;
    private displaySettingsFrmId = 150;
    private GLAccountsFrmId = 298;
    private dataImport = 302;
    private UserGroupFormId = 393;
    private UserGroupUserListFormId = 398;
    private UserGroupNewUserFormId = 404;
    private UserGroupUpdateUserFormId = 406;
    private MessageTemplatesListFormId = 524;
    private MessageTemplatesAddEditFormId = 522;
    private CalendarFormId = 545;
    private CalendarExceptionFormId = 561;
    private CreateNewCalendarFormId = 549;
    private SetWorkingTimeFormId = 551;
    private BuildingConditionListFormId = 552;
    private BuildingConditionAddEditFormId = 554;
    private WorkingTimeBasedOnDateFormId = 559;
    private seasonsListFormId = 563;
    private seasonsAddEditFormId = 565;   
    private CalendarExceptionAddEditFormId = 566;
    private ClientListFormId = 586;
    private AddSymbolformid = 584;
    private AddSymbolfeilds = 593;
    private AssignSymbolFormId = 599;

    //////new///////////////

    private passwordPolicyFieldData = 'Common/GetEditAppFormFields';
    private customerSupportFieldData = 'Common/GetEditAppFormFields';
    private organizationalStructureFieldData = 'MockData/Data/organizational-sturcture.json';
    /* private attachmentCategoryData = 'MockData/Data/atachment-categoriesData.json'; */
    private attachmentCategoryData = 'Common/GetAppFormDataList';
    private CheckMailDomainInUseUrl = 'Common/CheckMailDomainInUse';
    private CheckAttachmentCategoryInUseUrl = 'Common/CheckAttachmentCategoryInUse';

    /*private attachmentCategoryFields = 'MockData/Data/attachment-categoriesFields.json'; */

    private getAllColorsData = 'Common/GetAllColors';
    private getPrivilegesOfPage = 'Common/GetPrivilegesOfPage';
    private GetStatus = 'Common/GetEntityStatus';
    private InsertAttachmentCategoryurl ='Common/InsertAttachmentCategory'

    private attachmentCategoryFields = 'Common/GetListAppFormFields';
   /* private mailDomainData = 'MockData/Data/mail-domainData.json'; */
   /* private mailDomainFields = 'MockData/Data/mail-domainFields.json'; */
    private contactDetailsFieldData = 'MockData/Data/contact-details_fields.json';
    private adminMainMenu = 'MockData/menu/admin.json';
    private spaceMainMenu = 'MockData/menu/As-builts.json';
    private _drawingLayerURL = 'Common/GetEditAppFormFields';
    private deleteDrawinglayersUrl = 'Common/DeleteAppFormData';
    private _submitURL = 'Common/UpdateAppFormData';
    private _submitAddURL = 'Common/InsertAppFormData';
    private reportSetupUpdateUrl = 'Common/SaveReportSetupWithWaterMark';
    private contactDetailsSetupUpdateUrl = 'Administration/UpdateContactDetails';
    private attachmentDetails = 'Common/GetAttachmentsList';
    private editAttachment = 'Common/UpdateAttachment';
    private insertAttachment = 'Common/InsertAttachment';
    private deleteAttachment = 'Common/DeleteAttachment';
    private getAttachmentEditContent = 'Common/GetAttachmentEditContent';
    private getCustomerPermittedFilesUrl = 'Common/GetCustomerPermittedFiles';

    private usersList_url = 'MockData/Data/users_list.json';
    private usersFieldList_url = 'MockData/Data/users_fieldList.json';
    private userModulesAccess_url = 'MockData/Data/user_modules_access.json';
    private userDivisionsAccess_url = 'MockData/Data/user_division_access.json';
    private userDrawingAccessModules_url = 'MockData/Data/user_drawing_access_modules.json';
    private userDrawingFloorAccessFields_url = 'MockData/Data/user-drawing_floor-accessFieldsList.json';
    private userDrawingFloorAccess_url = 'MockData/Data/user-drawing-floor-access.json';
    private userReportsAccessFields_url = 'MockData/Data/user-reports-accessFieldsList.json';
    private userReportsAccess_url = 'MockData/Data/user-reports-access.json';
    private divisionAdminSettings_url = 'MockData/Data/division-admin-settings.json';
    private divisionAdminSettingsFields_url = 'MockData/Data/division-admin-settingsFieldsList.json';
    private userSearchKeyWordLookup_url = 'MockData/Data/userSearchKeyWordLookup.json';

    ///Access templates
    private accesstemplatedata_url = 'MockData/Data/access-templates-data.json';
    private accesstemplatefields_url = 'MockData/Data/access-templates-fields.json';
    private moduleaccess_url = 'MockData/Data/user_modules_access.json';
    private flooraccessdata_url = 'MockData/Data/user-drawing-floor-access.json';
    private flooraccessfields_url = 'MockData/Data/user-drawing_floor-accessFieldsList.json';
    private divisionaccessdata_url = 'MockData/Data/user_division_access.json';
    private drawingaccessdata_url = 'MockData/Data/access-templates-data.json';
    private drawingaccessfields_url = 'MockData/Data/access-templates-fields.json';
    private useraccess_url = 'MockData/Data/templateUserAccess.json';
    ///Access templates

    private userGroupsFields = 'MockData/Data/user-groups_Fields.json';
    private userGroupsData = 'MockData/Data/user-groups_Data.json';
    private iDrawingsUsersFields = 'MockData/Data/iDrawings-usersFields.json';
    private iDrawingsUsersData = 'MockData/Data/iDrawings-usersData.json';
    private employeesUsersFields = 'MockData/Data/employees-usersFields.json';
    private employeesUsersData = 'MockData/Data/employees-usersData.json';
    private techniciansUsersFields = 'MockData/Data/technicians-usersFields.json';
    private techniciansUsersData = 'MockData/Data/technicians-usersData.json';
    private contractorsUsersFields = 'MockData/Data/contractors-usersFields.json';
    private contractorsUsersData = 'MockData/Data/contractors-usersData.json';
    private areaOptionFieldDetails = 'MockData/Data/area-options-fields.json';

    private portfolioMenuUrl = 'MockData/Menu/administration_submenu.json';

    //private _SiteDataUrl = 'MockData/Data/siteList.json';
    private _SiteDataUrl = 'Common/GetAppFormDataList';
    //private _SiteColumnDataUrl = 'MockData/FieldObjects/siteColumnList.json'
    private _SiteColumnDataUrl = 'Common/GetListAppFormFields'
    // private _SiteAddEditDataUrl = 'MockData/FieldObjects/siteAddEdit.json'
    private _SiteAddEditDataUrl = 'Common/GetEditAppFormFields'

    private _BuildingDataUrl = 'MockData/Data/buildingList.json';
    private _BuildingColumnDataUrl = 'MockData/FieldObjects/buildingColumnList.json'
    private _BuildingColumnData_NewUrl = 'MockData/FieldObjects/buildingColumnList_new.json'

    private _buildingAddEditDataUrl = 'MockData/FieldObjects/buildingAddEdit.json'
    private _buildingAddEditDataServerUrl = 'Common/GetAppFormFields'
    private _buildingAddEditDataUrl_new = 'MockData/FieldObjects/buildingAddEdit_new.json'

    private _FloorDataUrl = 'MockData/Data/floorList.json';
    private _FloorColumnDataUrl = 'MockData/FieldObjects/floorColumnList.json'
    private _FloorAddEditDataUrl = 'MockData/FieldObjects/floorAddEdit.json'

    private _plotDataUrl = 'MockData/Drawing Settings/plotstylelist-mockdata.json';
    //'MockData/Drawing Settings/plotstylefieldlist-mockdata.json';
    private _plotStyleAddEdit = 'MockData/FieldObjects/PlotStyleAddEdit.json';

    private _drawingLayersFieldsDataUrl = 'Common/GetListAppFormFields';
    private _drawingLayersDataUrl = 'Common/GetAppFormDataList';

    private _layerMappingFunctionFieldsDataUrl = 'Common/GetListAppFormFields';
    private _layerMappingFunctionDataUrl = 'Common/GetAppFormDataList';

    private logoutUrl = 'Account/LogOff';

    /* Additional Data Field*/
    private ddlAddlDatafieldCategory = 'MockData/Data/ddl-additional-datafieldCategory.json';
    private addlDatafield_Fields = 'MockData/Data/addl-Datafield_Fields.json';
    private addlDatafieldFieldsAddEdit = 'MockData/Data/addlDatafieldFields-addEdit.json';
    private addlDatafieldValidatedValues = 'MockData/Data/addlDatafield-Validated.json';
    private site_AddlDatafieldData = 'MockData/Data/site_addlDatafield_Data.json';
    private building_AddlDatafieldData = 'MockData/Data/building_addlDatafield_Data.json';
    private floor_AddlDatafieldData = 'MockData/Data/floor_addlDatafield_Data.json';
    private space_AddlDatafieldData = 'MockData/Data/space_addlDatafield_Data.json';
    private employee_AddlDatafieldData = 'MockData/Data/space_addlDatafield_Data.json';

    private _displaySetingsDataUrl = 'Common/GetDisplaySettingData';
    private _displaySetingsDataTempUrl = 'Common/GetDisplaySettingDataTemp';
    private _updateDisplaySetingsDataUrl = 'Common/UpdateDisplaySettingsData';
    private _updateArchiveDisplaySetingsDataUrl = 'Common/UpdateCAIDisplaySettingsData';
    private _updateCustomerDisplaySetingsDataUrl = 'Common/UpdateCustomerDisplaySettings';
    private _checkprivilagesUrl = 'Common/GetUserPrivilegesofPage';

    /*  Field Values */
    private fieldValues_Fields = 'MockData/Data/field-values_Fields.json';
    private fieldValues_Data = 'MockData/Data/field-values_Data.json';

    /* Attachment */
    private ddlAttachmentCategory = 'MockData/Data/ddl-attachment-category.json';
    private attachment_Fields = 'MockData/Data/attachment-fields.json';
    private site_AttachmentData = 'MockData/Data/site_attachment_Data.json';
    private building_AttachmentData = 'MockData/Data/building_attachment_Data.json';
    private floor_AttachmentData = 'MockData/Data/floor_attachment_Data.json';

    private ddlStyleName = 'MockData/Drawing Settings/ddlstylename.json';
    private assignStyleFieldList = 'MockData/Drawing Settings/assignstyle-drawing-layerfields.json';
    private assignStyleList = 'MockData/Drawing Settings/assignstyle-drawing-layers.json';


    private organizationalUnitsDataUrl = 'MockData/Data/organizationalunit_Data.json';
    private organizationalUnitsFieldsUrl = 'MockData/Data/organizationalunits_fields.json';

    private addorganizationalunit_DataUrl = 'MockData/Data/addorganizationalunit_Data.json';

    private accessibleModuleForUserUrl = 'Common/GetAccessibleModulesForUser';
    private CheckSiteInUseWorkorderUrl = "SiteBuildingFloor/CheckSiteInUse";
    private CheckUserGroupInUse = 'User/CheckUserGroupInUse';


    ///Customer Settings
    private custSettingsAdminsnUrl = "Administration/GetAdminCustomerSettingsFormFields";
    private UpdateCustomerSettingsUrl = 'Administration/UpdateCustomerFeatureSubscription';
    private GetSubscribedFeaturesWithFieldsUrl = 'Administration/GetSubscribedFeaturesWithFields';
    private CheckAutoNumberingStatusUrl = 'Object/CheckAutoNumberingStatus';
    private GetUniqueRoomNoUrl = 'Space/GetUniqueRoomNoExists';
    private GetWorkOrderUsersCountUrl = 'WorkOrder/GetWorkOrderActiveUsersCount'; 
    private getManageReportDataUrl = 'Common/GetScheduledReports'; 
    private updateManageReportStatusDataUrl = 'Common/UpdateScheduleReportStatus';
    private updateMultipleUserDataUrl = 'User/UpdateMultipleUserData';
    private ImportUserDetailsUrl = "Administration/ImportUserDetails";
    private CheckMessageTemplateInUse = 'Administration/CheckMessageTemplateInUse';
    private InsertCalendar = 'Common/InsertCalendar';
    private GetCalendarDetails = 'Common/GetCalendarDetails';
    private InsertUpdateCalendarException = 'common/InsertUpdateCalendarExceptions';
    private GetCalendarExceptionDays = 'common/GetCalendarExceptionsDays';
    private CheckSeasonInUseUrl = 'Administration/CheckSeasonInUse';

    private GetPlotSettingsAppConfigKey = 'Administration/GetPlotSettingsAppSetingsKey';
    private GetRevit3DDrawingAppConfigKey = 'Administration/GetRevit3DDrawingAppSetingsKey';
    private checkActionPointUsersAndUserGroupUrl = 'WorkFlow/CheckActionPointUsersandUserGroupsExists';
    


    private SymbolLibraryfields = '';
    

    constructor(private http: Http) {
        super(http);
    }

    getPagePrivilege(pageId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:" + JSON.stringify(pageId)+" }" }, this.getPrivilegesOfPage);
    }

    getcustomerlist() {
        return this.postaction({ Input: "{FormId: 96 }" }, this.listFieldObjUrl);
    }

    getpasswordPolicyFields() {
        return this.postaction({ Input: "{FormId: 46 }" }, this.editDataUrl);
    }
    updatePasswordPolicy(pageDetails) {
        return this.postaction({ Input: "{FormId:46,ListReportFieldIdValues:" + pageDetails + ",Id:1}" }, this.submitEditUrl);
    }

    /* Report Setup BEGIN*/
    getReportSetupFields() {
        return this.postaction({ Input: "{ FormId:" + this.ReportSetupFrmId + "}" }, this.editDataUrl);
    }

    postUpdateReportSetupFields(pageDetails, fileData, strOldFileName) {
        return this.postaction({ ApplnInput: "{FormId:" + this.ReportSetupFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:1}", FileInput: fileData, OldFileName: strOldFileName }, this.reportSetupUpdateUrl);
    }


    postUpdateReportSetupFieldsWithoutImage(pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.ReportSetupFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:1}" }, this.submitEditUrl);
    }

    /* Report Setup END*/

    /* Color Picker Data BEGIN*/
    getDataForColorpicker() {
        return this.postaction({},this.getAllColorsData);
    }
    /* Color Picker Data END*/

    /* Permited File Extensions BEGIN*/
    getCustomerPermittedFiles(pageDetails) {
        return this.postaction({ Input: "{ ListReportFieldIdValues:[{\"ReportFieldId\":331,\"Value\":\"\"}]}" }, this.getCustomerPermittedFilesUrl);
    }
    /* Permited File Extensions END*/

    getCustomerSupportFields(target) {
        return this.postaction({ Input: "{FormId: 50 }" }, this.editDataUrl);
    }

    customerSupportpostSubmit(pageDetails) {
        return this.postaction({ Input: "{FormId:50,ListReportFieldIdValues:" + pageDetails + ",Id:1 }" }, this.submitEditUrl);
    }


    getOrganizationalStructureFields(formId) {
        return this.postaction({ Input: "{ FormId: " + formId + " }" }, this.editDataUrl);

    }
    UpdateOrganizationalStructureFields(formId, pageDetails) {
        return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues:" + pageDetails + ",Id:1 }" }, this.submitEditUrl);
    }

    /* Mail Domain BEGIN*/
    getMailDomainData() {
        return this.postaction({ Input: "{FormId:" + this.MailDomainsFrmId + "}" }, this.listDataListUrl);
    }

    getMailDomainFields() {
        return this.postaction({ Input: "{ FormId:" + this.MailDomainsFrmId + "}" }, this.listFieldObjUrl);
    }

    postMailDomainInsert(pageDetails) {
        return this.postaction({ Input: "{ FormId:" + this.MailDomainsFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:1}", }, this.submitAddUrl);
    }

    postMailDomainUpdate(pageDetails, selectId) {
        return this.postaction({ Input: "{ FormId:" + this.MailDomainsFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }

    postMailDomainDelete(id: any) {
        return this.postaction({ Input: "{FormId:" + this.MailDomainsFrmId + ",Id:" + id + "}" }, this.deleteUrl);
    }

    postMailDomainInUse(id: any) {
        return this.postaction({ Input: "{FormId:" + this.MailDomainsFrmId + ",Id:" + id + "}" }, this.CheckMailDomainInUseUrl);
    }
    /* Mail Domain END*/

    /* Attachment Category BEGIN*/
    getAttachmentCategoryData() {
        return this.postaction({ Input: "{FormId:" + this.AttachmentCategoryFrmId + "}" }, this.listDataListUrl);
    }

    getAttachmentCategoryFields() {
        return this.postaction({ Input: "{ FormId:" + this.AttachmentCategoryFrmId + "}" }, this.listFieldObjUrl);
    }

    postAttachmentCategoryInsert(pageDetails) {
        return this.postaction({ Input: "{ FormId:" + this.AttachmentCategoryFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:1}", }, this.submitAddUrl);
    }

    postAttachmentCategoryUpdate(pageDetails, selectId) {
        return this.postaction({ Input: "{ FormId:" + this.AttachmentCategoryFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }

    postAttachmentCategoryDelete(id: any) {
        return this.postaction({ Input: "{FormId:" + this.AttachmentCategoryFrmId + ",Id:" + id + "}" }, this.deleteUrl);
    }

    postAttachmentCategoryinUse(id: any) {
        return this.postaction({ Input: "{FormId:" + this.AttachmentCategoryFrmId + ",Id:" + id + "}" }, this.CheckAttachmentCategoryInUseUrl);
    }
    /* Attachment Category END*/

    /*  LogBook BEGIN*/

    getLogBookParameterFieldList() {
        return this.postaction({ Input: "{FormId:" + this.LogParameterListFrmId + "}" }, this.listFieldObjUrl);
    }

    /*getLogBookDataOnload() {
        return this.postaction({ Input: "{FormId:" + this.LogApplicationListFrmId + "}" }, this.logDataOnLoadUrl);
    }*/

    getLogBookDataOnload(pageIndex?: number, sortCol?: string, sortDir?: string) {
        var param = "{ FormId: " + this.LogApplicationListFrmId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}"
        return this.postaction({ Input: param }, this.logDataOnLoadUrl);
    }

    postLogBookParameterFieldInsert(pageDetails, sortCol?: string, sortDir?: string) {
        if (sortCol == undefined) {
            sortCol = ""; sortDir = "";
        }
        return this.postaction({ LogParameters: "{ FormId:" + this.LogParameterListFrmId + ",ListReportFieldIdValues:" + pageDetails + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',Id:1}", }, this.logUserDataUrl);
    }

    getLogUserListColumns() {
        return this.postaction({ Input: "{FormId:" + this.LogUserListFrmId + "}" }, this.listFieldObjUrl);
    }

    postLogUserListFieldInsert(pageDetails, logParameterConditions) {
        return this.postaction({
            LogParameters: "{ ListReportFieldIdValues:" + logParameterConditions + "}",
            LogUserIds: "{ ListReportFieldIdValues:" +  pageDetails + "}",
        }, this.logEntityDataUrl);
    }


    getLogEntityListColumns() {
        return this.postaction({ Input: "{FormId:" + this.LogEntityListFrmId + "}" }, this.listFieldObjUrl);
    }
   
    postLogentitiesListFieldInsert(pageDetails, logParameterConditions, logSelectedUserIds) {
        return this.postaction({
            LogParameters: "{ ListReportFieldIdValues:" + logParameterConditions + "}",
            LogUserIds: "{ ListReportFieldIdValues:" + logSelectedUserIds + "}",
            LogEntityIds: "{ ListReportFieldIdValues:" + pageDetails + "}"
        }, this.logEventsDataUrl);
    }

    getLogActivityListColumns() {
        return this.postaction({ Input: "{FormId:" + this.LogActivityListFrmId + "}" }, this.listFieldObjUrl);
    }

    getLogListColumns() {
        return this.postaction({ Input: "{FormId:" + this.LogApplicationListFrmId + "}" }, this.listFieldObjUrl);
    }

    postLogListFieldInsert(pageDetails, logParameterConditions, logSelectedUserIds, logSelectedEntityIds, pageIndex?: number, sortCol?: string, sortDir?: string) {
        return this.postaction({
            LogParameters: "{ ListReportFieldIdValues:" + logParameterConditions + "}",
            LogUserIds: "{ ListReportFieldIdValues:" + logSelectedUserIds + "}",
            LogEntityIds: "{ ListReportFieldIdValues:" + logSelectedEntityIds + "}",
            LogEventIds: "{ ListReportFieldIdValues:" + pageDetails + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}"
        }, this.logDataUrl);
    }

        /* log data on individual selections BEGIN */

            postLogListOnRandomSelection(pageDetails, logParameterConditions, logSelectedUserIds, logSelectedEntityIds, pageIndex?: number, sortCol?: string, sortDir?: string) {
                return this.postaction({
                    LogParameters: "{ ListReportFieldIdValues:" + pageDetails + "}",
                    LogUserIds: "{ ListReportFieldIdValues:" + "" + "}",
                    LogEntityIds: "{ ListReportFieldIdValues:" + "" + "}",
                    LogEventIds: "{ ListReportFieldIdValues:" +  + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}"
                }, this.logGetLogsByConditionsUrl);
            }
         /*log data on individual selections END */
    /* LogBook END*/

     /* Display Settings  BEGIN*/
    getDisplaySettingsColumns() {
        return this.postaction({ Input: "{FormId:" + this.displaySettingsFrmId + "}" }, this.listFieldObjUrl);
    }

    getDisplaySettingData(displaySettingRptFields) {
        return this.postaction({ Input: "{ListReportFieldIdValues:" + displaySettingRptFields + "}" }, this._displaySetingsDataUrl);
    }

    postUpdateDataDisplaySettings(displaySettingRptFields, pageDetails) {  /* Useer Display Settings */
        return this.postaction({
            ApplnInput: "{ListReportFieldIdValues:" + displaySettingRptFields + "}",
            DisplaySettingsInput: pageDetails
        }, this._updateDisplaySetingsDataUrl);
    }
    postUpdateArchiveDisplaySettings(displaySettingRptFields, pageDetails,archiveId,DrawingId) {  
        return this.postaction({
            ApplnInput: "{ListReportFieldIdValues:" + displaySettingRptFields + "}",
            DisplaySettingsInput: pageDetails,
            ArchiveId: archiveId,
            DrawingId: DrawingId
        }, this._updateArchiveDisplaySetingsDataUrl);
    }
    postUpdateCustomerDataDisplaySettings(displaySettingRptFields, pageDetails) { /*Customer Display Settings */
        return this.postaction({
            ApplnInput: "{ListReportFieldIdValues:" + displaySettingRptFields + "}",
            DisplaySettingsInput: pageDetails
        }, this._updateCustomerDisplaySetingsDataUrl);
    }

    postCheckPrivilagesForDisplaySettings(privilageId) {
        return this.postaction({ input: "", Privileges: privilageId}, this._checkprivilagesUrl);
    }

    postcheckIsModuleAdminUrl(pageDetails) {
        return this.postaction({ Input: "{ListReportFieldIdValues:" + pageDetails + "}" }, this.checkIsModuleAdminUrl);
    }

    /*  Display Settings  END*/

    /* Action Points BEGIN*/

    getActionPointsColumns() {
        return this.postaction({ Input: "{FormId:" + this.AdminActionPointsFrmId + "}" }, this.listFieldObjUrl);
    }

    getActionPointsFieldList(pageIndex?: number, sortCol?: string, sortDir?: string) {
        var param = "{ FormId: " + this.AdminActionPointsFrmId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}"
        return this.postaction({ Input: param }, this.listDataListUrl);
    }

    listActionPointAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.AdminAddEditActionPointFrmId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.AdminAddEditActionPointFrmId + ",ParentFormId:" + this.AdminActionPointsFrmId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }

    postSubmitActionPoints(pageDetails, selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.AdminAddEditActionPointFrmId + ",ListReportFieldIdValues:" + pageDetails + ",ParentFormId:" + this.AdminActionPointsFrmId + "}" }, this.submitAddUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.AdminAddEditActionPointFrmId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.AdminActionPointsFrmId + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    }

    postActionPointsInUse(selectedId: any) {
        return this.postaction({ Input: "{FormId:" + this.AdminActionPointsFrmId + ",Id:" + selectedId + "}" }, this.checkActionPointInUseUrl);
    }

    postDeleteActionPoints(selectedId: any) {
        return this.postaction({ Input: "{FormId:" + this.AdminActionPointsFrmId + ",Id:" + selectedId + "}" }, this.deleteUrl);
    }

    getActionPointUsersColumns() {
        return this.postaction({ Input: "{FormId:" + this.AdminActionPointUserFrmId + "}" }, this.listFieldObjUrl);
    }

    getActionPointUsersList(reportfieldIdValues, selectedid?: any, pageIndex?: number, sortCol?: string, sortDir?: string) {
        var param = "{ FormId: " + this.AdminActionPointUserFrmId + " ,ListReportFieldIdValues: " + reportfieldIdValues + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',Id:" + selectedid + "}"
        return this.postaction({ Input: param }, this.listDataListUrl);
    }

    /*getActionPointUsersFieldList(selectedid?: any, pageIndex?: number, sortCol?: string, sortDir?: string) {
          return this.postaction({ Input: "{FormId:" + this.AdminActionPointUserFrmId + ",Id:" + selectedid + "}" }, this.listDataListUrl);
          var param = "{ FormId: " + this.AdminActionPointUserFrmId + "}"
          return this.postaction({ Input: param }, this.listDataListUrl);
    } */

    postSubmitActionPointUsers(pageDetails, selectedId) { /* submit update point users */
        return this.postaction({ Input: "{ FormId:" + this.AdminActionPointUserFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectedId + "}" }, this.submitEditUrl);
    }

    getActionPointUserGroupColumns() {
        return this.postaction({ Input: "{FormId:" + this.AdminActionPointUserGroupFrmId + "}" }, this.listFieldObjUrl);
    }

    getActionPointUserGroupList(reportfieldIdValues, selectedid?: any, pageIndex?: number, sortCol?: string, sortDir?: string) {
        var param = "{ FormId: " + this.AdminActionPointUserGroupFrmId + " ,ListReportFieldIdValues: " + reportfieldIdValues + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',Id:" + selectedid + "}"
        return this.postaction({ Input: param }, this.listDataListUrl);
    }

    /*getActionPointUserGroupFieldList(selectedid?: any, pageIndex?: number, sortCol?: string, sortDir?: string) {
         return this.postaction({ Input: "{FormId:" + this.AdminActionPointUserGroupFrmId + ",Id:" + selectedid + "}" }, this.listDataListUrl);
         var param = "{ FormId: " + this.AdminActionPointUserGroupFrmId + "}"
         return this.postaction({ Input: param }, this.listDataListUrl);
    }  */

    postSubmitActionPointUserGroup(pageDetails, selectedId) { /* submit update point user groups */
        return this.postaction({ Input: "{ FormId:" + this.AdminActionPointUserGroupFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectedId + "}" }, this.submitEditUrl);
    }
    /* Action Points END*/

    /*Set Work Flow Category BEGIN */

    getWorkflowCategoryActionPoint(id: number) {
        return this.postaction({ Input: "{FormId: 123}" }, this.listFieldObjUrl);
    }
    getWorkFlowCategories(id: any) {
        return this.postaction({ Input: "{FormId: 253 ,ListLookupReportFieldIdValues:[{ \"FieldId\":1416,\"ReportFieldId\": 5844, \"Value\":" + id + " }]}"}, this.editDataUrl);
    }

    checkWorkFlowCategoryInUse(id: any) {
        return this.postaction({ Input: "{FormId: 253 ,Id:" + id + " }" }, this.checkWorkFlowCategoryInUseUrl);
    }

    getWorkflowddCategoryActionPoint(pageDetails) {
        return this.postaction({ Input: "{FormId:123,ListReportFieldIdValues:" + pageDetails + "}" }, this.listDataListUrl)
        /*  return this.postaction({ Input: "{FormId: 123},ListReportFieldIdValues:[" + JSON.stringify(id) + "]" }, this.listFieldObjUrl);*/
     
    }

    postSubmitWorkflowCategoryActionPoint(pageDetails) {
        return this.postaction({ Input: "{ FormId: 123,ListReportFieldIdValues:" + pageDetails + ",Id: 1 }" }, this.submitEditUrl);
    }
    postSubmitWorkflowCategoryActionPt(pageDetails) {
        return this.postaction({ Input: "{ FormId: 253,ListReportFieldIdValues:" + pageDetails + ",Id: 1 }" }, this.submitEditUrl);
    }

    /*Set Work Flow Category BEGIN */

    getContactDetailsFields() {
        return this.postaction({ Input: "{ FormId: 56}" }, this.editDataUrl);
    }

    postSubmitContactDetailsFields(pageDetails, fileData, strOldFileName) {
        return this.postaction({ ApplnInput: "{FormId:56,ListReportFieldIdValues:" + pageDetails + ",Id:1}", FileInput: fileData, OldFileName: strOldFileName }, this.contactDetailsSetupUpdateUrl);
    }

    getDrawingLayerNames() {
        return this.postaction({ Input: "{ FormId:" + this.drawingLayerNameFormID + "}" }, this.editDataUrl);
        //return this.getaction<Observable<any>>(this._drawingLayerURL)
    }
    postSubmit(pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.drawingLayerNameFormID + ",ListReportFieldIdValues:" + pageDetails + ",Id:1 }" }, this.submitEditUrl);
    }

    postSubmitEditdrawinglayer(pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:39,ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this._submitURL);
    }
    postSubmitAdddrawinglayer(pageDetails) {
        return this.postaction({ Input: "{FormId:39,ListReportFieldIdValues:" + pageDetails + "}" }, this._submitAddURL);
    }
    getDrawingLayersFields() {
        return this.postaction({ Input: "{FormId:39}" }, this.listFieldObjUrl);
    }
    getDrawingLayersData() {
        return this.postaction({ Input: "{FormId:39,Id:0,ListReportFieldIdValues:[{\"ReportFieldId\":4404,\"Value\":\"0\"}]}" }, this.listDataListUrl);
    }
    postDrawingLayersDelete(id: any) {
        return this.postaction({
            Input: "{FormId:39 ,Id:" + id + "}"
        }, this.deleteDrawinglayersUrl);
    }

    sortDrawingLayer(direction: any, column: any) {
        console.log("entered sort");
        return this.postaction({ Input: "{ FormId:39,SortColumn:'" + column + "',SortDirection:'" + direction + "',ListReportFieldIdValues:[{\"ReportFieldId\":4404,\"Value\":\"0\"}]}" }, this.listDataListUrl);
    }

    getPortfolioMenu() {
        return this.postgetaction<Observable<any>>(null, this.portfolioMenuUrl)
    }
    ///Site related data
    getSiteData(index: any, direction: any, column: any) {
        return this.postaction({ Input: "{ FormId:" + this.sitelistFormId + ",ParentFormId:110,PageIndex:" + index + ",SortColumn:'" + column + "',SortDirection:'" + direction + "'}" }, this.listDataListUrl);
        // return this.postaction({ Input: "{FormId: 1 }" }, this._SiteDataUrl);
        //return this.postgetaction<Observable<any>>(null, this._SiteDataUrl);
    }

    getSiteKeywordField() {
        return this.postaction({ Input: "{ FormId:107}" }, this.keywordLookUpUrl);
    }

    getSiteColumnData() {
        return this.postaction({ Input: "{ FormId: " + this.sitelistFormId + " }" }, this.listFieldObjUrl);
    }

    sitePaging(index: number, direction: any, column: any, filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        return this.postaction({ Input: "{ FormId: " + this.sitelistFormId + ",ParentFormId:110,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
    }
    loadState(CountryId: number, parentFieldId: number) {
        return this.postaction({ Input: "{FormId:" + this.sitelistFormId + ",Id:" + CountryId + ",ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    }
    loadSiteAddEdit(selectedId: number, addEdit: string) {
        //if (selectedId != undefined) {
        if (addEdit == "add") { //code for loading add
            return this.postaction({ Input: "{ FormId: " + this.siteaddEditformId + " }" }, this.addDataUrl);
        }
        else if (addEdit == "edit") { //code for loading edit
            return this.postaction({ Input: "{ FormId: " + this.siteaddEditformId + ",Id:" + selectedId + ",ParentFormId:" + this.sitelistFormId + " }" }, this.editDataUrl);
        }

        //}
        //return this.postaction({ Input: "{ FormId: " + this.siteaddEditformId+" }" }, this.editDataUrl);
        // return this.postaction({ Input: "{FormId: 1, Id: 1 }" }, this._SiteAddEditDataUrl);
        //return this.postgetaction<Observable<any>>(null,this._SiteAddEditDataUrl)
    }
    submitSiteAdd(pageDetails) {
        console.log('entered add service')
        return this.postaction({ Input: "{FormId:" + this.siteaddEditformId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.sitelistFormId + "}" }, this.submitAddUrl);
    }
    submitSiteinlineAdd(pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.sitelistFormId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.submitAddUrl);

    }
    submitSiteEdit(pageDetails, id: any) {
        console.log('entered edit service')
        return this.postaction({ Input: "{FormId:" + this.siteaddEditformId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.sitelistFormId + "}" }, this.submitEditUrl);
    }
    submitSiteinlineEdit(pageDetails, id) {
        return this.postaction({ Input: "{FormId:" + this.sitelistFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + "}" }, this.submitEditUrl);

    }
    sortSite(index?: number, direction?: any, column?: any, filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        return this.postaction({ Input: "{ FormId: " + this.sitelistFormId + ",ParentFormId:110,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
    }
    submitSiteDelete(selectedID: any) {
        console.log('entered delete service')
        return this.postaction({ Input: "{FormId:" + this.sitelistFormId + ",Id:" + selectedID[0] + "}" }, this.deleteUrl)

    }
    submitSiteClose(selectedID: any) {
        console.log('entered close service');
        return this.postaction({ Input: "{EntityId:" + selectedID[0] + "}" }, this.siteCloseUrl)

    }
    submitSiteReopen(selectedID: any) {
        console.log('entered reopen service')
        return this.postaction({ Input: "{EntityId:" + selectedID[0] + "}" }, this.siteReopenUrl)
    }
    getSiteSearchKeyWordLookup() {
        return this.postaction({ Input: "{FormId:107}" }, this.keywordLookUpUrl)
        //return ["Aberdeen", "Concord", "Arlington", "Framingham", "Greenwood", "Manchester", "Site 1", "WhiteField"];
    }

    getloadSearch() {
        return this.postaction({ Input: "{FormId:113}" }, this.addDataUrl)
    }

    getAdvnceSearchLookup() {
        return this.postaction({ Input: "{FormId:110}" }, this.AdvanceSearchLookUpUrl)
    }

    SiteKeywordSeach(keyworsearch: string, index: number, direction: any, column: any) {
        //return this.postaction({ Input: "{ FormId:44,Filter:'" + keyworsearch + "',IsKeywordSearch:1,IsAdvancedSearch:0}" }, this.listDataListUrl);
        return this.postaction({ Input: "{FormId:44,ParentFormId:110,Filter:'" + keyworsearch + "',PageIndex:" + index + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',IsKeywordSearch:1,IsAdvancedSearch:0}" }, this.listDataListUrl)
    }

    SiteAdvanceSeachResult(value: any, index: number, direction: any, column: any) {
        return this.postaction({ Input: "{ FormId:44,ParentFormId:110, ListFilterIdValues: " + value + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}" }, this.listDataListUrl);
    }

    //building related data
    getBuildingData(siteId: any, index: number, direction: any, column: any) {

        if (siteId == undefined) { //code to call complete building list SP
            return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + ",PageIndex:" + index + ",SortDirection:'" + direction + "'}" }, this.listDataListUrl)
        }
        else {//code to call connected building list
            return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + ",ListReportFieldIdValues:[" + JSON.stringify(siteId[0]) + "],PageIndex:" + index + ",SortDirection:'" + direction + "'}" }, this.listDataListUrl)
        }
        // return this.getaction<Observable<any>>(this._BuildingDataUrl);
    }
    getBuildingColumnData() {
        //return this.getaction<Observable<any>>(this._BuildingColumnDataUrl);
        return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + "}" }, this.listFieldObjUrl)
    }

    sortBuilding(siteId,index?: number, direction?: any, column?: any, filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
       // return this.postaction({ Input: "{ FormId: " + this.buildinglistFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
        if (siteId.length == 0)
            return this.postaction({ Input: "{ FormId: " + this.buildinglistFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
        else
            return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + ",ListReportFieldIdValues:[" + JSON.stringify(siteId[0]) + "],SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);


    }

    buildingPage(siteId , index: number, direction: any, column: any, filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        if (siteId.length == 0)
            return this.postaction({ Input: "{ FormId: " + this.buildinglistFormId + ",ParentFormId:122,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
        else
            return this.postaction({ Input: "{ FormId: " + this.buildinglistFormId + ",,ListReportFieldIdValues:[" + JSON.stringify(siteId[0]) + "], ParentFormId:122,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
                 
    }

    loadBuildingAddEdit(selectedId: number, addEdit: string) {
        //if (selectedId != undefined) {
        if (addEdit == "add") { //code for loading add
            return this.postaction({ Input: "{ FormId: " + this.buildingaddEditFormId + " }" }, this.addDataUrl);
        }
        else if (addEdit == "edit") { //code for loading edit
            return this.postaction({ Input: "{ FormId: " + this.buildingaddEditFormId + ",Id:" + selectedId + ",ParentFormId:" + this.buildinglistFormId + " }" }, this.editDataUrl);
        }
        //}

        return this.postaction({ id: 1 }, this._buildingAddEditDataServerUrl);
        //return this.postgetaction<Observable<any>>(null, this._buildingAddEditDataUrl_new);
    }
    submitBuildingAdd(pageDetails) {
        console.log('entered add service')
        return this.postaction({ Input: "{FormId:" + this.buildingaddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.buildinglistFormId + "}" }, this.submitAddUrl);
    }
    submitBuildinginlineAdd(pageDetails: IField[]) {
        return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.submitAddUrl);

    }
    submitBuildingEdit(pageDetails, id: any) {
        console.log('entered edit service');
        return this.postaction({ Input: "{FormId:" + this.buildingaddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.buildinglistFormId + "}" }, this.submitEditUrl);
    }
    submitBuildinginlineEdit(pageDetails: IField[], id: any) {
        return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + "}" }, this.submitEditUrl);

    }
    submitBuildingDelete(selectedID: any) {
        console.log('entered delete service')
        return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + ",Id:" + selectedID[0] + "}" }, this.deleteUrl)
    }
    submitBuildingClose(selectedID: any) {
        console.log('entered close service')
        return this.postaction({ Input: "{EntityId:" + selectedID[0] + "}" }, this.buildingCloseUrl)
    }
    submitbuildingReopen(selectedID: any) {
        console.log('entered reopen service')
        return this.postaction({ Input: "{EntityId:" + selectedID[0] + "}" }, this.buildingReopenUrl)
    }

    getBuildingAdvnceSearchLookup(siteId: any) {
        if (siteId == undefined) { //code to call complete building list SP
            return this.postaction({ Input: "{FormId:122}" }, this.AdvanceSearchLookUpUrl)
        }
        else {//code to call connected building list
            return this.postaction({ Input: "{FormId:122,ListReportFieldIdValues:[" + JSON.stringify(siteId[0]) + "]}" }, this.AdvanceSearchLookUpUrl)
        }
        //return this.postaction({ Input: "{FormId:122}" }, this.AdvanceSearchLookUpUrl)
    }

    getBuildingKeywordField() {
        return this.postaction({ Input: "{ FormId:121}" }, this.listFieldObjUrl);
    }

    getBuildingSearchKeyWordLookup(siteId) {
        if (siteId == undefined) { //code to call complete building list SP
            return this.postaction({ Input: "{FormId:121}" }, this.keywordLookUpUrl)
        }
        else {//code to call connected building list
            return this.postaction({ Input: "{FormId:121,ListReportFieldIdValues:[" + JSON.stringify(siteId[0]) + "]}" }, this.keywordLookUpUrl)
        }
        //return ["Aberdeen", "Concord", "Arlington", "Framingham", "Greenwood", "Manchester", "Site 1", "WhiteField"];
    }

    BuildingAdvanceSeachResult(value: any, index: number, direction: any, column: any, siteIdArray?: any) {
        if (siteIdArray == undefined)
        {
            return this.postaction({ Input: "{ FormId:1,ListFilterIdValues: " + value + ",ParentFormId:122,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}" }, this.listDataListUrl);
        }
        else
            return this.postaction({ Input: "{ FormId:1,ListReportFieldIdValues:[" + JSON.stringify(siteIdArray[0]) + "],ListFilterIdValues: " + value + ",ParentFormId:122,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}" }, this.listDataListUrl);
    }

    BuildingKeywordSeach(keyworsearch: string, siteId: any, index: number, direction: any, column: any) {
        if (siteId == undefined) { //code to call complete building list SP
            return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + ",ParentFormId:122,Filter:'" + keyworsearch + "',PageIndex:" + index + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',IsKeywordSearch:1,IsAdvancedSearch:0}" }, this.listDataListUrl)
        }
        else {//code to call connected building list
            return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + ",ParentFormId:122,Filter:'" + keyworsearch + "', ListReportFieldIdValues:[" + JSON.stringify(siteId[0]) + "],PageIndex:" + index + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',IsKeywordSearch:1,IsAdvancedSearch:0}" }, this.listDataListUrl)
        }
    }

    //floor related data
    getFloorData(buildingid: any, index: number, direction: any, column: any) {
        //return this.getaction<Observable<any>>(this._FloorDataUrl);
        if (buildingid == undefined) { //code to call complete building list SP
            return this.postaction({ Input: "{FormId:" + this.floorListFormId + ",PageIndex:" + index + ",SortDirection:'" + direction + "'}" }, this.listDataListUrl)
        }
        else {//code to call connected building list
            return this.postaction({ Input: "{FormId:" + this.floorListFormId + ",ListReportFieldIdValues:[" + JSON.stringify(buildingid[0]) + "],PageIndex:" + index + ",SortDirection:'" + direction + "'}" }, this.listDataListUrl)
        }
    }
    getFloorColumnData() {
        return this.postaction({ Input: "{FormId:" + this.floorListFormId + "}" }, this.listFieldObjUrl)
    }

    sortFloor(buildingid,index?: number, direction?: any, column?: any, filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        // return this.postaction({ Input: "{ FormId: " + this.floorListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
        if (buildingid.length == 0)
            return this.postaction({ Input: "{ FormId: " + this.floorListFormId + ",ParentFormId:125,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
        else
            return this.postaction({ Input: "{ FormId: " + this.floorListFormId + ",ParentFormId:125,ListReportFieldIdValues:[" + JSON.stringify(buildingid[0]) + "],SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);

    }

    floorPage(index: number, direction: any, column: any, filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        return this.postaction({ Input: "{ FormId: " + this.floorListFormId + ",ParentFormId:125,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues:" + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
    }

    loadBuilding(siteid: any, parentId: number) {
        //return this.postaction({ Input: "{FormId:" + this.floorListFormId + ",ListReportFieldIdValues:[" + JSON.stringify(siteid[0]) + "],ParentFieldId:" + parentId + "}" }, this.lookupUrl);
        return this.postaction({ Input: "{FormId:" + this.floorListFormId + ",Id:" + siteid + ",ParentFieldId:" + parentId + "}" }, this.lookupUrl);
    }
    getStatus(selectedid: any, dbobjectid) {
        return this.postaction({ Input: "{Id:" + selectedid.toString() + "}", DbobjectId: dbobjectid.toString() }, this.GetStatus);

    }
    loadFloorAddEdit(selectedId: number, addEdit: string) {
        //if (selectedId != undefined) {
        if (addEdit == "add") { //code for loading add
            return this.postaction({ Input: "{ FormId: " + this.flooraddeditFormID + " }" }, this.addDataUrl);
        }
        else if (addEdit == "edit") { //code for loading edit
            return this.postaction({ Input: "{ FormId: " + this.flooraddeditFormID + ",Id:" + selectedId + ",ParentFormId:" + this.floorListFormId + " }" }, this.editDataUrl);
        }
        //    
        //}
        return this.getaction<Observable<any>>(this._FloorAddEditDataUrl);
    }
    submitFloorAdd(pageDetails) {
        console.log('entered add service')
        return this.postaction({ Input: "{FormId:" + this.flooraddeditFormID + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.floorListFormId + "}" }, this.submitAddUrl);
    }
    submitFloorinlineAdd(pageDetails: IField[]) {
        return this.postaction({ Input: "{FormId:" + this.floorListFormId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.submitAddUrl);

    }
    submitFloorEdit(pageDetails, id: any) {
        console.log('entered edit service')
        return this.postaction({ Input: "{FormId:" + this.flooraddeditFormID + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.floorListFormId + "}" }, this.submitEditUrl);
    }
    submitFloorinlineEdit(pageDetails: IField[], id: any) {
        return this.postaction({ Input: "{FormId:" + this.floorListFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + "}" }, this.submitEditUrl);

    }
    CheckIsEntityReferenceFound(Dbobject: any, Id: any) {
        return this.postaction({ Input: "{FormId:" + this.floorListFormId + ",Id:" + Id + ",ListReportFieldIdValues:" + JSON.stringify(Dbobject) + "}" }, this.CheckIsEntityReferenceUrl);
    }
    submitFloorDelete(fieldobj,selectedID: any) {
        console.log('entered delete service')
        //return this.postaction({ Input: "{FormId:" + this.floorListFormId + ",Id:" + selectedID[0] + "}" }, this.deleteUrl)
        return this.postaction({ Input: "{FormId:" + this.floorListFormId + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + ",Id:" + selectedID[0] + "}" }, this.removeFloor)
    }
    submitFloorClose(selectedID: any) {
        console.log('entered close service')
    }
    submitFloorReopen(selectedID: any) {
        console.log('entered reopen service')
    }

    getFloorAdvnceSearchLookup(buildingId) {
        if (buildingId == undefined) { //code to call complete building list SP
            return this.postaction({ Input: "{FormId:125}" }, this.AdvanceSearchLookUpUrl)
        }
        else {//code to call connected building list
            return this.postaction({ Input: "{FormId:125,ListReportFieldIdValues:[" + JSON.stringify(buildingId[0]) + "]}" }, this.AdvanceSearchLookUpUrl)
        }
    }

    getFloorSearchKeyWordLookup(buildingId) {
        if (buildingId == undefined) { //code to call complete building list SP
            return this.postaction({ Input: "{FormId:124}" }, this.keywordLookUpUrl)
        }
        else {//code to call connected building list
            return this.postaction({ Input: "{FormId:124,ListReportFieldIdValues:[" + JSON.stringify(buildingId[0]) + "]}" }, this.keywordLookUpUrl)
        }
        //return ["Aberdeen", "Concord", "Arlington", "Framingham", "Greenwood", "Manchester", "Site 1", "WhiteField"];
    }

    FloorAdvanceSeachResult(value: any, index: number, direction: any, column: any, buildingId: any) {

        if (buildingId == undefined) { //code to call complete building list SP
            return this.postaction({ Input: "{ FormId:71,ParentFormId:125,ListFilterIdValues: " + value + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}" }, this.listDataListUrl);
        }
        else {//code to call connected building list
            return this.postaction({ Input: "{ FormId:71,ParentFormId:125,ListFilterIdValues: " + value + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1,ListReportFieldIdValues:[" + JSON.stringify(buildingId[0]) + "]}" }, this.listDataListUrl);
        }
    }

    FloorKeywordSeach(keyworsearch: string, buildingId: any) {
        if (buildingId == undefined) { //code to call complete building list SP
            return this.postaction({ Input: "{ FormId:71,Filter:'" + keyworsearch + "',IsKeywordSearch:1,IsAdvancedSearch:0}" }, this.listDataListUrl);
        }
        else {//code to call connected building list
            return this.postaction({ Input: "{ FormId:71,Filter:'" + keyworsearch + "',IsKeywordSearch:1,IsAdvancedSearch:0,ListReportFieldIdValues:[" + JSON.stringify(buildingId[0]) + "]}" }, this.listDataListUrl);
        }
    }


    ///User data
    getUsersFieldList() {
        return this.postaction({ Input: "{ FormId: " + this.UserListFrmId + "}" }, this.listFieldObjUrl);
    }
    getUsersList(pageIndex?: number, sortCol?: string, sortDir?: string, keyworsearch?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        var param = "{ FormId: " + this.UserListFrmId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "', Filter: '" + keyworsearch + "', ListFilterIdValues: " + value + ", IsKeywordSearch: " + IsKeyword + ", IsAdvancedSearch:" + IsAdvance + "}"
        return this.postaction({ Input: param }, this.listDataListUrl);
    }

    loadUserAddEdit(selectedId: number, field, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.UserAddEditFrmId + ",ListLookupReportFieldIdValues:" + field + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.UserAddEditFrmId + ",Id:" + selectedId + ",ListLookupReportFieldIdValues:" + field + "}" }, this.editDataUrl);
        }
    }
    addUser(userDetails: IField[]) {
        console.log('added user')
        //  return this.postaction({ Input: "{ FormId: " + this.UserAddEditFrmId + "}" }, this.addDataUrl);
    }
    
    GetMaxUsrCreated() {
        return this.postaction({}, this.getMaxUsrCreated);
    }
    GetMaxWOUserCreated() {
        return this.postaction({}, this.getMaxWOUserCreated);
    }
    GetMaxUserandWO() {
        return this.postaction({}, this.getMaxandWOUSer);       
    }
    getCustomerSubscribedFeatures(feaureIds:string) {
        return this.postaction({ input: "{Id:0}",FeatureCategoryIds: feaureIds}, this.customerFeatures);
    }
    getUserListForUserRole(userRoleId, selectedUserId) {
        return this.postaction({ "UserRoleId": userRoleId , "selectedUserId": selectedUserId}, this.getUserForRole);
    }
    getAccessTemplatesForUserRole(userRoleId) {
        return this.postaction({ "UserRoleId": userRoleId}, this.getAccessTemplatesbyRole);
    }
     
    checkUserNameAvailable(loginName:string) {
        return this.postaction({ "LoginName": loginName }, this.checkUserNameAvailability);
    }
    checkMailDomain(email: string) {
        return this.postaction({ "Email": email }, this.checkMailDomains);
    }
    AddUpdateUserDetails(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.UserAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.UserListFrmId + "}" }, this.insertUserUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.UserAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.UserListFrmId + "}" }, this.submitEditUrl);
        }

    }
    updateMultipleUserData(strReportFieldIdValues: string, reportField: number, newValue: any) {
        return this.postaction({ Input: "{FormId:" + this.UserAddEditFrmId + ",ListReportFieldIdValues:" + strReportFieldIdValues + "}", ReportField: reportField, NewValue: newValue }, this.updateMultipleUserDataUrl);
    }
    deleteRestoreUser(selectedID: any, target) {
        let rptFieldValues = "";
        if (target == 1)
            rptFieldValues = "[{\"ReportFieldId\":387,\"Value\":\"4\"}]"; //delete
        else
            rptFieldValues = "[{\"ReportFieldId\":387,\"Value\":\"1\"}]"; //restore

        return this.postaction({ Input: "{FormId:" + this.UserListFrmId + ",Id:" + selectedID + ",ListReportFieldIdValues:" + rptFieldValues + "}" }, this.deleteUrl)

    }
    loadResetPassword(selectedId: any) {
        return this.postaction({ Input: "{ FormId:" + this.ResetPwdFrmId + ",Id:" + selectedId + "}" }, this.editDataUrl);
    }

    passwordChangePossible(selUserId?: number) {
        selUserId = selUserId == undefined ? 0 : selUserId;
        return this.postaction({ selUserId: selUserId}, this.isPwdChangePossible);

    }
    resetPasswordthroghMail(selectedID: any) {
        return this.postaction({ "selectedUserId": selectedID.toString()}, this.resetPwdandMail);
        
    }
    getPasswordPolicy() {
        return this.postaction({}, this.getPswdPolicy);
    }
    resetPassword(selectedId, fieldObj) {
      
        return this.postaction({ Input: "{FormId:" + this.ResetPwdFrmId + ",Id:" + selectedId + ",ListReportFieldIdValues:" + fieldObj + "}"}, this.reserPswd);
    }
    
    getUserModuleAccess(selectedIds) {
        return this.postaction({ Input: "{ FormId:" + this.UserModAccessFrmId + ",Id:" + selectedIds[0] + ",ListLookupReportFieldIdValues:[{ \"FieldId\":324,\"ReportFieldId\": 443, \"Value\":"+  selectedIds[0] +" }]}" }, this.editDataUrl);
    }

    updateUserModuleAccess(userIds: string[], moduleIds: string[]) {
        return this.postaction({ Input: "{ FormId:" + this.UserModAccessFrmId + ",UserIds:[" + userIds + "],selectedIds:[" + moduleIds + "]}" }, this.updateModulacces);

    }

    getSessionData() {
        return this.postaction({ }, this.getSessionValues);
    }


    getUserDivisionsAccess(selectUserId, pageIndex?: number, sortCol?: string, sortDir?: string) {
       // return this.postaction({ Input: "{ FormId:" + this.UserDvsnAccessFrmId + ",ListLookupReportFieldIdValues: [{ \"FieldId\":339,\"ReportFieldId\" :300, \"Value\": " + selectedUserid + "}]}" }, this.listDataListUrl);
        var param = "{ FormId: " + this.UserDvsnAccessFrmId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',ListReportFieldIdValues:[{\"ReportFieldId\":300,\"Value\":\"" + selectUserId + "\"}]}";
        return this.postaction({ Input: param }, this.listDataListUrl);
    }
    getUserDivisionsAccesssFields() {
        return this.postaction({ Input: "{ FormId:" + this.UserDvsnAccessFrmId + " }" }, this.listFieldObjUrl);
    }
    updateUserDivisionsAccess(updatedRptFldValues: string, selectedUserId: number,isDivisionAdmin) {
        return this.postaction({ Input: "{Id:" + selectedUserId + ",ListReportFieldIdValues:[" + updatedRptFldValues + "]}", IsDivisionAdmin:isDivisionAdmin }, this.updateDivacces);
        //return this.postaction({ Input: "{ FormId:" + this.UserDvsnAccessFrmId + ",UserIds:[" + userIds + "],selectedIds:[" + divisionIds + "]}" }, this.updateDivacces);
    }
    getModuleAdminSettings(selectedUserid) {
        return this.postaction({ Input: "{ FormId:" + this.UserModAdminSettFmId + ",Id: " + selectedUserid+",ListLookupReportFieldIdValues: [{ \"FieldId\":2036,\"ReportFieldId\" :333, \"Value\": " + selectedUserid + "}]}" }, this.editDataUrl);
     //   return this.postaction({ Input: "{ FormId:" + this.UserModAdminSettFmId + ",  Id: " + selectedIds[0] + " }" }, this.editDataUrl);
       // return this.postaction({ Input: "{ FormId:" + this.ResetPwdFrmId + ",Id:" + selectedId + "}" }, this.editDataUrl);
    }

    isModuleAdmin(userIds: any[]) {
        return true;
    }

    isDivisionAdmin(userIds: any[]) {
        return true;
    }

    updateModuleAdminSettings(userIds,  ModuleAdminInput) {
        return this.postaction({ Input: "{ FormId:" + this.UserModAdminSettFmId + ",UserIds:[" + userIds + "],ModuleAdminInput:" + JSON.stringify( ModuleAdminInput )+ "}" }, this.updateModulAdminacces);
    }

    getDivisionAccessData() {

        return this.getaction<Observable<any>>(this.divisionaccessdata_url);
    }

    updateDivisionAccess(formObject: IField[]) {
        console.log('Division Access updated');
    }


    getDivisionAdminSettings(selectUserId, pageIndex?: number, sortCol?: string, sortDir?: string) {
        var param = "{ FormId: " + this.UserDivisionAdminSetFrmId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',ListReportFieldIdValues:[{\"ReportFieldId\":300,\"Value\":\"" + selectUserId + "\"}]}";
        return this.postaction({ Input: param }, this.getOrganizationalUnitListForaSelectedUserUrl );// this.listDataListUrl
    }

    getDivisionAdminSettingsFields() {
        return this.postaction({ Input: "{ FormId:" + this.UserDivisionAdminSetFrmId + " }" }, this.listFieldObjUrl);
    }

    updateDivisionAdminSettings(updatedRptFldValues: string, selectedUserId: number) {
        return this.postaction({ Input: "{Id:" + selectedUserId + ",ListReportFieldIdValues:[" + updatedRptFldValues + "]}" }, this.updateDivisionAdminacces);
       // return this.postaction({ Input: "{ FormId:" + this.UserDivisionAdminSetFrmId + ",UserIds:[" + userIds + "],divisionAdminInput:" + divAdminInpt + "}" }, this.updateDivisionAdminacces);
    }

    getUserDrawingAccessModuleddl(selectedIds) {
        return this.postaction({ Input: "{ FormId: " + this.UserDrwgAccess + ",ListLookupReportFieldIdValues:[{ \"FieldId\":333,\"ReportFieldId\": 443, \"Value\":" + selectedIds[0] +  "}]}" }, this.listFieldObjUrl);
    }



    getUserDrawingAccessModules() {
        return this.getaction<Observable<any>>(this.userDrawingAccessModules_url);
    }

    //getUserDrawingFloorAccessList() {
    //    return this.getaction<Observable<any>>(this.userDrawingFloorAccess_url);
    //}

    //getUserDrawingFloorAccessFieldsList() {
    //    return this.getaction<Observable<any>>(this.userDrawingFloorAccessFields_url);
    //}

    //updateUserDrawingAccess(formObject: IField[]) {
    //    console.log('User drawing access updated');
    //}

    getUserReportsAccessList() {
        return this.postaction({ Input: "{ FormId:" + this.userReportsAccessListFrmId + " }" }, this.listFieldObjUrl);
    }

    getUserReportsAccessFieldsList() {
        return this.getaction<Observable<any>>(this.userReportsAccessFields_url);
    }

    updateUserReportsAccess(formObject: IField[]) {
        console.log('User reports access updated');
    }



    getSearchKeyWordLookup() {
        return ["Patrick, John", "Admin, Sys", "User1, SAG", "John, Marcus", "Mathew, Philip", "John, Hayden",
            "Jessica, Brown", "Stephany, White", "James, Sarah", "Davis, Eric"];
    }

    getAccessTemplatesData() {
        return this.getaction<Observable<any>>(this.accesstemplatedata_url);
    }

    getAccessTemplatesFields() {
        return this.getaction<Observable<any>>(this.accesstemplatefields_url);
    }
    deleteAccessTemplate(selectedIds: any) {
        console.log("Template deleted");
    }
    ///User data

    ///Access Templates
    getModuleAccessData() {
        return this.getaction<Observable<any>>(this.moduleaccess_url);
    }
    updateModuleAccess(formObject: IField[]) {
        console.log('Module Access updated');
    }
    getFloorAccessData() {
        return this.getaction<Observable<any>>(this.flooraccessdata_url);
    }
    getFloorAccessFields() {
        return this.getaction<Observable<any>>(this.flooraccessfields_url);
    }
    updateFloorAccess(formObject: IField[]) {
        console.log('Floor Access updated');
    }

    updateDrawingAccess(isDrawingAccessEnabled: string) {
        console.log('Drawing Access updated');
    }
    getTemplateUserAccess() {
        return this.getaction<Observable<any>>(this.useraccess_url);
    }
    updateTemplateUserAccess(formObject: IField[]) {
        console.log('User Access updated');
    }

    /* plotStyle list */

    getPlotStyleData(pageIndex?: number, sortCol?: string, sortDir?: string) {
        var param = "{ FormId: " + this.plotStyleListFrmId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}"
        return this.postaction({ Input: param }, this.listDataListUrl);
    }

    getPlotStyleColumns() {
        return this.postaction({ Input: "{ FormId:" + this.plotStyleListFrmId + " }" }, this.listFieldObjUrl);
    }

    loadPlotStyleAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.plotStyleAddEditFrmId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.plotStyleAddEditFrmId + ",ParentFormId:" + this.plotStyleListFrmId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }

    AddUpdatePlotStyle(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.plotStyleAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.plotStyleListFrmId + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.plotStyleAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.plotStyleListFrmId + "}" }, this.submitEditUrl);
        }

    }
    InlineAddUpdatePlotStyle(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.plotStyleListFrmId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.plotStyleListFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    }
    deletePlotStyle(selectedID: any) {
        return this.postaction({ Input: "{FormId:" + this.plotStyleListFrmId + ",Id:" + selectedID + "}" }, this.deleteUrl)
    }

     /* End plotStyle list */
    


    getMainMenu(selectedID: any) {
        if (selectedID == 1) {
            return this.postaction<Observable<any>>(null, this.adminMainMenu)
        }
        else {
            return this.getaction<Observable<any>>(this.spaceMainMenu);
        }
    }
    getSpaceStandard() {

        return this.getaction<Observable<any>>(this._drawingLayersDataUrl)

    }
    getAreaOptionFieldDetails() {
        return this.getaction<Observable<any>>(this.areaOptionFieldDetails)
    }

    updateAreaOptionFieldDetails() {
        return this.getaction<Observable<any>>(this.areaOptionFieldDetails)
    }

    /* AdditionalDataField*/
    getDdlAddtlDataFieldCategory() {
        // return this.getaction<Observable<any>>(this.ddlAddlDatafieldCategory);
        return this.postaction({ Input: "{ FormId: " + this.addlDataFieldListFormId + " }" }, this.listFieldObjUrl);
    }

    getAddtlDataFieldField() {
        //return this.getaction<Observable<any>>(this.addlDatafield_Fields);
        return this.postaction({ Input: "{ FormId: " + this.addlDataFieldListFormId + " }" }, this.listFieldObjUrl);
    }
    getAddtlDataFieldData(categoryid: any, index: number, direction: any, column: any) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldListFormId + ",ListReportFieldIdValues:[" + JSON.stringify(categoryid[0]) + "],SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}" }, this.listDataListUrl)
    }
    sortAdditionalDataField(index: number, direction: any, column: any, catid: any) {
        return this.postaction({ Input: "{ FormId: " + this.addlDataFieldListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[" + JSON.stringify(catid[0]) + "]}" }, this.listDataListUrl);

    }
    pagingAdditionalDataField(index: any, direction: any, column: any, catid: any) {
        return this.postaction({ Input: "{ FormId: " + this.addlDataFieldListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[" + JSON.stringify(catid[0]) + "]}" }, this.listDataListUrl);
    }
    getSiteAddtlDataFieldData() {
        return this.getaction<Observable<any>>(this.site_AddlDatafieldData);
    }

    getBuildingAddtlDataFieldData() {
        return this.getaction<Observable<any>>(this.building_AddlDatafieldData);
    }

    getFloorAddtlDataFieldData() {
        return this.getaction<Observable<any>>(this.floor_AddlDatafieldData);
    }

    getSpaceAddtlDataFieldData() {
        return this.getaction<Observable<any>>(this.space_AddlDatafieldData);
    }

    getEmpMoveProjectsAddtlDataFieldData() {
        return this.getaction<Observable<any>>(this.space_AddlDatafieldData);
    }

    loadAddlDataFieldAddEdit(selectedId: number, addEdit: string, categoryid: any) {
        if (addEdit == "add") { //code for loading add
            if (categoryid == 5) 
                return this.postaction({ Input: "{ FormId: " + this.addlDataFieldAddEditFormId + ",ListLookupReportFieldIdValues:[{\"FieldId\":2367,\"ReportFieldId\": 12097, \"Value\":\"3391\"}]}" }, this.addDataUrl);
            else
                return this.postaction({ Input: "{ FormId: " + this.addlDataFieldAddEditFormId + " }" }, this.addDataUrl);

        }
        else if (addEdit == "edit") { //code for loading edit
            if (categoryid[0].Value == 5) 
                return this.postaction({ Input: "{ FormId: " + this.addlDataFieldAddEditFormId + ",Id:" + selectedId[0] + ",ParentFormId:" + this.addlDataFieldListFormId + ", ListLookupReportFieldIdValues:[{\"FieldId\":2367,\"ReportFieldId\": 12097, \"Value\":\"3391\"}], ListReportFieldIdValues:[" + JSON.stringify(categoryid[0]) + "] }" }, this.editDataUrl);

            else
                return this.postaction({ Input: "{ FormId: " + this.addlDataFieldAddEditFormId + ",Id:" + selectedId[0] + ",ParentFormId:" + this.addlDataFieldListFormId + ",ListReportFieldIdValues:[" + JSON.stringify(categoryid[0]) + "] }" }, this.editDataUrl);
        }
    }
    AdditionalDataFieldHaveLookUp(Id) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + ",Id:" + Id + "}" }, this.CheckFieldValueExist);
    }
    CheckisinUse(fieldobj, id) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + ",Id:" + id + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.checkIsInUse);

    }

    CheckAdditionalDataFieldLookUpValueInUse(id) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + ",Id:" + id + "}" }, this.CheckAdditionalDataFieldLookUpValueInUseurl);
    }

    getMaxCharUsed(addFieldId) {
        return this.postaction({ Input: "{ListReportFieldIdValues: " + JSON.stringify(addFieldId) + "}" }, this.getAdditionalFieldDetails);

    }
    addAddlDataField(formObject: IField[]) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + " ,ListReportFieldIdValues: " + formObject + ",ParentFormId:" + this.addlDataFieldListFormId + "}" }, this.submitAddUrl);
    }

    updateAddlDataField(formObject: IField[], id: any) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + " ,ListReportFieldIdValues: " + formObject + ",Id:" + id + ",ParentFormId:" + this.addlDataFieldListFormId + "}" }, this.submitEditUrl);
    }

    deleteAddtlDataField(selectedID: any) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldListFormId + ",Id:" + selectedID[0] + "}" }, this.deleteUrl)

    }

    /* Field Values*/
    getFieldValuesFields() {
        //return this.getaction<Observable<any>>(this.fieldValues_Fields)
        return this.postaction({ Input: "{ FormId: " + this.fieldValueListFormId + " }" }, this.listFieldObjUrl);
    }
    getFieldValuesData(additionalDataFieldId: any) {
        //return this.getaction<Observable<any>>(this.fieldValues_Data)
        return this.postaction({ Input: "{FormId:" + this.fieldValueListFormId + ",ListReportFieldIdValues:[" + JSON.stringify(additionalDataFieldId[0]) + "]}" }, this.listDataListUrl)

    }
    insertFieldValue(pageDetails: any) {
        return this.postaction({ Input: "{FormId:" + this.fieldValueListFormId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.submitAddUrl);
    }
    updateFieldValue(pageDetails: any, id: any) {
        return this.postaction({ Input: "{FormId:" + this.fieldValueListFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + "}" }, this.submitEditUrl);
    }
    sortFieldValue(additionalDataFieldId: any, index?: number, direction?: any, column?: any, filter?: any) {
        return this.postaction({ Input: "{ FormId: " + this.fieldValueListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[" + JSON.stringify(additionalDataFieldId[0]) + "]}" }, this.listDataListUrl);
    }
    pagingFieldValue(additionalDataFieldId: any, index?: number, direction?: any, column?: any) {
        return this.postaction({ Input: "{ FormId: " + this.fieldValueListFormId + ",PageIndex:" + index + ",SortColumn:'" + column + "',SortDirection:'" + direction + ",ListReportFieldIdValues:[" + JSON.stringify(additionalDataFieldId[0]) + "]}" }, this.listDataListUrl);

    }

    postDataFieldValueDelete(id: any, pageDetails: any) {
        // return this.getaction<Observable<any>>(this.fieldValues_Fields);
        return this.postaction({ applnInput: "{FormId:" + this.fieldValueListFormId + ",Id:" + id[0] + ",ListReportFieldIdValues:" + JSON.stringify(pageDetails) + "}" }, this.deleteFieldValue)
    }
    getWhitelistDetails(Id) {
        return this.postaction({ Input: "{Id:" + Id + "}" }, this.getWhitelistUrl)
    }
    getFieldFormatDetails(Id) {
        return this.postaction({ Input: "{Id:" + Id + "}" }, this.getFieldFormatListUrl)
    }
    getLayerMappingFunctionFields() {
        return this.postaction({ Input: "{FormId:55,ListLookupReportFieldIdValues:[{ \"FieldId\":240,\"ReportFieldId\": 4404, \"Value\":\"0\" }],}" }, this.listFieldObjUrl);
    }
    getLayerMappingFunction() {
        return this.postaction({ Input: "{FormId:55}" }, this.listDataListUrl);
    }

    postSubmitEditayerMapping(pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:55,ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }
    postSubmitAdddrawinglayerMapping(pageDetails) {
        return this.postaction({ Input: "{FormId:55,ListReportFieldIdValues:" + pageDetails + ",Id:0}" }, this.submitAddUrl);
    }

    postLayerMappingFunctionDelete(id: any) {
        return this.postaction({ Input: "{FormId:55,Id:" + id + "}" }, this.deleteUrl)
    }

    /* User Groups */
    getUserGroupsFields() {
        //return this.getaction<Observable<any>>(this.userGroupsFields);
        return this.postaction({ Input: "{FormId: " + this.UserGroupFormId +" }" }, this.listFieldObjUrl);
    }

    getUserGroupsData(index: number, column: any, direction: any, filter?: any) {
        //return this.getaction<Observable<any>>(this.userGroupsData);
        return this.postaction({ Input: "{FormId:" + this.UserGroupFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    }
    loadUserGroupAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.UserGroupFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.UserGroupFormId + ",ParentFormId:" + this.UserGroupFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }
    AddUpdateUserGroup(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.UserGroupFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.UserGroupFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }

    }
    checkUserGroupInUse(id: any) {
        return this.postaction({Input: "{FormId:" + this.UserGroupFormId + ",Id:" + id + ",ListReportFieldIdValues: [{\"ReportFieldId\":2807,\"Value\":\""+id+"\"}]}"}, this.CheckUserGroupInUse);
        
    }
    DeleteUserGroup(id) {
        return this.postaction({ Input: "{FormId:" + this.UserGroupFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    }
    addUserGroups(userDetails: IField[]) {
        console.log('User Group added ');
    }

    updateUserGroups(fieldData: IField[]) {
        console.log('User Group updated')
    }

    deleteUserGroups(selectedID: any) {
        console.log(selectedID, "User Group Deleted");
    }

    getiDrawingsUsersFields() {
        //return this.getaction<Observable<any>>(this.iDrawingsUsersFields);
        return this.postaction({ Input: "{FormId: " + this.UserGroupUserListFormId + " }" }, this.listFieldObjUrl);
    }

    getiDrawingsUsersData(UserGroupId:any,UserCategoryId:any,SiteId:any,index: number, column: any, direction: any, filter?: any) {
        //return this.getaction<Observable<any>>(this.iDrawingsUsersData);
        return this.postaction({ Input: "{FormId:" + this.UserGroupUserListFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "',ListReportFieldIdValues: [{\"ReportFieldId\":406,\"Value\":\"" + UserCategoryId + "\"},{\"ReportFieldId\":2807,\"Value\":\"" + UserGroupId + "\"},{\"ReportFieldId\":6349,\"Value\":\"" + SiteId +"\"}]}" }, this.listDataListUrl);
    }

    getUserGroupNewUserFields() {
        return this.postaction({ Input: "{FormId: " + this.UserGroupNewUserFormId + "}" }, this.listFieldObjUrl);
    }
    getUserGroupNewUserData(UserCategoryId: any, UserGroupId: any, index: number, column: any, direction: any, filter?: any) {
        return this.postaction({ Input: "{FormId:" + this.UserGroupNewUserFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "',ListReportFieldIdValues: [{\"ReportFieldId\":406,\"Value\":\"" + UserCategoryId + "\"},{\"ReportFieldId\":2807,\"Value\":\"" + UserGroupId + "\"}]}" }, this.listDataListUrl);
    }
    UpdateUserGroupUsers(arrayList:any) {
        return this.postaction({ Input: "{ FormId:" + this.UserGroupUpdateUserFormId + ",ListReportFieldIdValues: " + arrayList + "}" }, this.submitEditUrl);
    }
    DeleteUserGroupUsers(fieldobj:any) {
        return this.postaction({ Input: "{FormId:" + this.UserGroupUserListFormId + ",ListReportFieldIdValues:" + fieldobj + ",Id:0}" }, this.deleteUrl);
    }
    updateiDrawingsUsers(formObject: IField[]) {
        console.log('iDrawings Users updated');
    }

    getEmployeesUsersFields() {
        return this.getaction<Observable<any>>(this.employeesUsersFields);
    }

    getEmployeesUsersData() {
        return this.getaction<Observable<any>>(this.employeesUsersData);
    }

    updateEmployeesUsers(formObject: IField[]) {
        console.log('Employees Users updated');
    }

    getTechniciansUsersFields() {
        return this.getaction<Observable<any>>(this.techniciansUsersFields);
    }

    getTechniciansUsersData() {
        return this.getaction<Observable<any>>(this.techniciansUsersData);
    }

    updateTechniciansUsers(formObject: IField[]) {
        console.log('Technicians Users updated');
    }

    getContractorsUsersFields() {
        return this.getaction<Observable<any>>(this.contractorsUsersFields);
    }

    gettContractorsUsersData() {
        return this.getaction<Observable<any>>(this.contractorsUsersData);
    }

    updatetContractorsUsers(formObject: IField[]) {
        console.log('Contractors Users updated');
    }

    /*Assign Styles for Drawing Layers BEGIN*/

    getAssignStyleColumns() {
        return this.postaction({ Input: "{FormId:" + this.AssignStylesDrawingLyrFrmId + "}" }, this.listFieldObjUrl);
    }

    getAssignStyleData(pageDetails?: string, pageIndex?: number, sortCol?: string, sortDir?: string) {
        if (pageDetails == "") {
            var param = "{ FormId: " + this.AssignStylesDrawingLyrFrmId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}"
        }
        else {
            var param = "{ FormId: " + this.AssignStylesDrawingLyrFrmId + ",ListReportFieldIdValues:" + pageDetails + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}"
        }
        return this.postaction({ Input: param }, this.listDataListUrl);
    }

    /*updateAssignStyleData(plotStyleId?: number, layerIds?: string, moduleIds?: string) {
        var param = "{ FormId: " + this.AssignStylesDrawingLyrFrmId + ",PlotStyleId:" + plotStyleId + ",LayerIds:'" + layerIds + "',moduleIds:'" + moduleIds + "'}";
        return this.postaction({ Input: param }, this.submitEditUrl);
    }*/

    updateAssignStyleData(selectId, pageDetails?: string) {
        /*var param = "{ FormId: " + this.AssignStylesDrawingLyrFrmId + ",ListReportFieldIdValues:" + pageDetails + ", Id:" + selectId + "}";
         return this.postaction({ Input: param }, this.submitEditUrl);*/
        return this.postaction({ Input: "{FormId:" + this.AssignStylesDrawingLyrFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }

    /*Assign Styles for Drawing Layers END*/

    /* Attachments */
    getDdlAttachmentCategory() {
        return this.getaction<Observable<any>>(this.ddlAttachmentCategory);
    }

    getAttachmentField() {
        //  return this.getaction<Observable<any>>(this.attachment_Fields);
        return this.postaction({ Input: "{ FormId: " + this.attachmentDetailsFormId + " }" }, this.listFieldObjUrl);
    }


    getSiteAttachmentData(attachmentCategoryId: string, baseEntityId: string) {
        debugger
        return this.postaction({ Input: "{FormId:" + this.attachmentDetailsFormId + "}", attachmentCategoryId, baseEntityId }, this.attachmentDetails);
    }

    getAttachmentDataGrid(pageDetails , attachmentCategoryId: string, baseEntityId: string, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {       
        return this.postaction({ Input: "{ FormId: " + this.attachmentDetailsFormId + ",ListReportFieldIdValues: " + pageDetails + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}", attachmentCategoryId, baseEntityId }, this.attachmentDetails);
    }

    postSubmitEditAttachmentList(pageDetails, fileData, selectId, attachmentCategoryId: string, oldcustomerAttachmentCategoryId: string, baseEntityId: string, oldFileName: string) {
        if (fileData != undefined)
            return this.postaction({ applnInput: "{FormId: " + this.attachmentDetailsFormId + ",ListReportFieldIdValues: " + pageDetails + ",BaseEntityId: " + baseEntityId + ",Id: " + selectId + " }", FileInput: fileData, attachmentCategoryId: attachmentCategoryId.toString(), baseEntityId }, this.editAttachment);
        else
            return this.postaction({ applnInput: "{FormId: " + this.attachmentDetailsFormId + ",ListReportFieldIdValues: " + pageDetails + ",BaseEntityId: " + baseEntityId + ",Id: " + selectId + " }", FileInput: "{\"ReportFieldId\" :53, \"OldFileName\": \"" + oldFileName + "\", \"OldCustAtchmtCategoryId\": \"" + oldcustomerAttachmentCategoryId + "\"}", attachmentCategoryId, baseEntityId }, this.editAttachment);
    }

    loadAttachmentAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.attachmentDetailsAddEditFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.attachmentDetailsAddEditFormId + ",ParentFormId:" + this.attachmentDetailsFormId + ",Id:" + selectedId + "}" }, this.getAttachmentEditContent);
        }
    }

    getAttachmentDataGridLoad(attachmentCategoryId: string, baseEntityId: string, attachmentId: string) {
        return this.postaction({ Input: "{ FormId:" + this.attachmentDetailsAddEditFormId + ",Id: " + attachmentId + "}", attachmentCategoryId, baseEntityId }, this.getAttachmentEditContent);
    }

    getAttachmentDataGridLoadLease(pageDetails, attachmentCategoryId: string, baseEntityId: string, attachmentId: string) {
        return this.postaction({ Input: "{ FormId:" + this.attachmentDetailsAddEditFormId + ",ListReportFieldIdValues: " + pageDetails + ",Id: " + attachmentId + "}", attachmentCategoryId, baseEntityId }, this.getAttachmentEditContent);
    }

    AddUpdateAttachment(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.attachmentDetailsAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.attachmentDetailsFormId + "}" }, this.insertAttachment);
        } else {
            return this.postaction({ Input: "{FormId:" + this.attachmentDetailsAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.attachmentDetailsFormId + "}" }, this.editAttachment);
        }
    }

    postAttachmentDelete(id: any, attachmentCategoryId: string, baseEntityId: string, customerAttachmentCategoryId: string, filename) {
        return this.postaction({ applnInput: "{FormId:128, ListReportFieldIdValues: [{ \"ReportFieldId\" :51, \"Value\": " + attachmentCategoryId + "},{ \"ReportFieldId\" :53, \"Value\": \"" + filename + "\"},{ \"ReportFieldId\" :55, \"Value\": " + customerAttachmentCategoryId + "}],Id: " + id + ",BaseEntityId: " + baseEntityId + " }" }, this.deleteAttachment);
    }

    sortAttachmentData(direction: any, column: any, attachmentCategoryId: string, baseEntityId: string) {
        console.log("entered sort");
        return this.postaction({ Input: "{FormId:" + this.attachmentDetailsFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "'}", attachmentCategoryId, baseEntityId }, this.attachmentDetails);
    }

    downloadAttachment(attachmentCategoryId: string, attachmentId: string, baseEntityId: string, fileName: string, objectClassId: string,custAtachmntCategryId: string) {
        return this.downloadaction({ Input: "{FormId:" + this.attachmentDetailsFormId + ",ListReportFieldIdValues: [{ \"ReportFieldId\" :55, \"Value\": " + custAtachmntCategryId + "}],EntityId:'" + attachmentCategoryId + "',BaseEntityId:'" + baseEntityId + "',ObjectClassId:'" + objectClassId + "'}", FileInput: "{FileName:'" + fileName + "',ReferenceId:'" + attachmentId + "'}" }, this.downloadUrl);

        
     //   return this.postaction({ Input: "{FormId:" + this.attachmentDetailsFormId + ",AttachmentCategoryId:'" + attachmentCategoryId + "',FileName:'" + fileName + "',ReferenceId:'" + attachmentId  + "',BaseEntityId:'" + baseEntityId +  "'}" }, this.downloadUrl);

    }

    postSubmitAddtAttachmentList(pageDetails, fileData, attachmentCategoryId: string, baseEntityId: string) {
        return this.postaction({ applnInput: "{FormId: " + this.attachmentDetailsFormId + ",ListReportFieldIdValues: " + pageDetails + ",BaseEntityId: " + baseEntityId + " }", FileInput: fileData, attachmentCategoryId }, this.insertAttachment);
    }

    attachmentAssetClassorNot(attachmentCategoryId: string) {
        return this.postaction({ applnInput: "{EntityId: " + attachmentCategoryId + " }" }, this.attachmentAssetClassorNotUrl);
    }

    getSiteAttachmentKeyWordLookup() {
        return ["Miami.jpg", "sitedetails.xml", "bill.pdf", "JellyFish.jpg", "FileName", "Grid.doc"];
    }

    getBuildingAttachmentData() {
        return this.getaction<Observable<any>>(this.building_AttachmentData);
    }

    getBuildingAttachmentKeyWordLookup() {
        return ["Miami.jpg", "buildingdetails.xml", "equipment.pdf", "desert.jpg"];
    }

    getFloorAttachmentData() {
        return this.getaction<Observable<any>>(this.floor_AttachmentData);
    }

    getFloorAttachmentKeyWordLookup() {
        return ["lighthouse.jpg", "floordetails.xml", "floor.pdf"];
    }

    getAttachmentDate() {
        return this.postaction({},this.attachmentDate);

    }

    getOrganizationalUnitsData() {
        return this.postaction({ Input: "{FormId:144}" }, this.GetOrganizationUnitsUrl );
    }

    getEditOrganizationalUnitsData(level?: any) {
        return this.postaction({ Input: "{FormId:212,Id:" + level + "}" }, this.listDataListUrl);
    }

    getOrganizationalUnitsFields() {
        return this.getaction<Observable<any>>(this.organizationalUnitsFieldsUrl);
    }

    getOrganizationNamesForMenu() {
        return this.postaction({ applnInput: "{FormId:0}" }, this.GetOrganizationMenu);
    }

    getOrganizationNames() {
        return this.postaction({ applnInput: "{FormId:0}" }, this.GetOrganizationurl);
    }

    addOrganizationalUnitsFields(pageDetails: any)
    {
        return this.postaction({ Input: "{ FormId:144,ListReportFieldIdValues:" + pageDetails + "}", }, this.submitAddUrl);
    }

    updateOrganizationalUnitsFields(selectedId: number, pageDetails: any)
    {
        return this.postaction({ Input: "{ FormId:144,Id:" + selectedId + ",ListReportFieldIdValues:" + pageDetails + "}", }, this.submitEditUrl);
    }

    loadOrganizationalUnitAddEdit(selectedId: number, addEdit: string) {
        return this.postaction({ Input: "{FormId:" + selectedId + "}" }, this.listFieldObjUrl);
    }

    loadOrganizationUnitsLookUpValue(levelId: any,unitId:any) {
        return this.postaction({ applnInput: "{FormId:0,ListReportFieldIdValues: [{ \"ReportFieldId\" :289, \"Value\": " + levelId + "},{ \"ReportFieldId\" :288, \"Value\": " + unitId + "}]}" }, this.listLookUpOrgFieldObjUrl);
    }


    deleteOrganizationalUnits(selectedID: any) {
        return this.postaction({ Input: "{FormId:144, Id:" + selectedID + "}" }, this.deleteUrl);
    }

    getDataFieldValue(selectedID: any) {
        return this.getaction<Observable<any>>(this.fieldValues_Data);
    }

    GetAdditionalDataFieldLookupValues(value: any) {
        return this.getaction<Observable<any>>(this.fieldValues_Data)
    }

    getChildFieldValuesData(value: any) {
        return this.getaction<Observable<any>>(this.userModulesAccess_url)
    }

    getValidatedFieldValues(Value: any) {
        return this.getaction<Observable<any>>(this.addlDatafieldValidatedValues)
    }

    DeleteAdditionalFieldRelation(Value: any, Value2: any) {
        console.log(Value, "Delete Additional Field Relation");
    }

    SetDataDFieldRelation(Value: any, Value2: any) {
        console.log(Value, "Set DataDField Relation ");
    }
    UpdateAdditionalDataFieldRelation(Value: any, Value2: any) {
        console.log(Value, "Set DataDField Relation ");
    }

    GetPossibleChildFields(Value: any) {
        console.log(Value, "get possible child Fields ");
    }
    IsRelationExists(Value: any, Value2: any) {
        return this.getaction<Observable<any>>(this.addlDatafieldValidatedValues)
    }
    GetAdditionalDataFieldValuesMapping(Value: any, Value2: any, Value3: any) {
        return this.getaction<Observable<any>>(this.userModulesAccess_url)

    }

    logout() {
         return this.postaction({}, this.logoutUrl);       
    }
    getAccessibleModuleForUser() {
        return this.postaction({ applnInput: "{FormId:0}" }, this.accessibleModuleForUserUrl);
    }


    CheckSiteInUseWorkorder(selectedID: any) {
        console.log('entered delete service')
        //return this.postaction({ Input: "{FormId:" + this.floorListFormId + ",Id:" + selectedID[0] + "}" }, this.deleteUrl)
        return this.postaction({ Input: "{FormId:" + this.floorListFormId + ",Id:" + selectedID + "}" }, this.CheckSiteInUseWorkorderUrl)
    }

    getGLAccountsListFields() {
        return this.postaction({ Input: "{FormId:" + this.GLAccountsFrmId + "}" }, this.listFieldObjUrl);
    }
    getGLAccountsListData(pageIndex: number, sortCol: string, sortDir: string, Id: any) {
        return this.postaction({ Input: "{FormId:" + this.GLAccountsFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",Id:" + Id + "}" }, this.listDataListUrl);

    }
    getGLAccountsAddEdit(target: number, selectedId: number) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.GLAccountsFrmId + "}" }, this.addDataUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.GLAccountsFrmId + ",ParentFormId:" + this.GLAccountsFrmId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }

    GLAccountsSubmit(strRptFields: string, target: string, selectedId: number) {

        if (target == "add") {
            return this.postaction({ Input: "{ FormId:" + this.GLAccountsFrmId + ",ParentFormId:" + this.GLAccountsFrmId + ",ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        }
        else if (target == "edit") {
            return this.postaction({ Input: "{ FormId:" + this.GLAccountsFrmId + ",ParentFormId:" + this.GLAccountsFrmId + ",Id:" + selectedId + ",ListReportFieldIdValues: " + strRptFields + "}" }, this.submitEditUrl);
        }
    }
       GLAccountsdelete(Id: number) {
           return this.postaction({ Input: "{FormId:" + this.GLAccountsFrmId + ",ParentFormId:" + this.GLAccountsFrmId + ",Id:" + Id + "}" }, this.deleteUrl);
    }

       getCustomerSubscribedFeaturesGL(feaureIds: string) {
           return this.postaction({ input: "{Id:0}", FeatureCategoryIds: feaureIds }, this.customerFeatures);
       }

       loadDataImportControls(modId:number)
       {
           if (modId == 0) {
               return this.postaction({ Input: "{FormId:" + this.dataImport + ",ListLookupReportFieldIdValues: [{\"FieldId\":1791,\"ReportFieldId\": 271, \"Value\":" + modId+"},{ \"FieldId\":1654,\"ReportFieldId\": 12097, \"Value\":\"2285\" },{ \"FieldId\":1678,\"ReportFieldId\": 12097, \"Value\":\"2317\" },{ \"FieldId\":1792,\"ReportFieldId\": 12097, \"Value\":\"2476\" },{ \"FieldId\":1794,\"ReportFieldId\": 12097, \"Value\":\"2478\" }]}" }, this.listFieldObjUrl);
           } else {
               return this.postaction({ Input: "{FormId:" + this.dataImport + ",ListLookupReportFieldIdValues: [{\"FieldId\":1791,\"ReportFieldId\": 271, \"Value\":" + modId + "},{ \"FieldId\":1654,\"ReportFieldId\": 12097, \"Value\":\"2285\" },{ \"FieldId\":1678,\"ReportFieldId\": 12097, \"Value\":\"2317\" },{ \"FieldId\":1792,\"ReportFieldId\": 12097, \"Value\":\"2476\" },{ \"FieldId\":1794,\"ReportFieldId\": 12097, \"Value\":\"2478\" }]}" }, this.listFieldObjUrl);
           }
       }

       readExcel(value: any, sheetName:any)
       {
           return this.postaction({ Input: "{FormId:0}", FileInput: value.fileObj.FileData, FileName: value.fileObj.FileName, FileSize: value.fileObj.FileSize, SheetName: sheetName}, this.readExcelUrl);
       }

       loadConfigureFieldObjects()
       {
           return this.postaction({ Input: "{FormId:307}" }, this.listFieldObjUrl);
       }

       GetSavedImportColumns(excelColumnName: any, importCategoryId: any, classId: any)
       {
           return this.postaction({ Input: "{FormId:0}", ExcelCols: excelColumnName, ImportCategoryId: importCategoryId, Classid: classId }, this.SavedImportColumnsUrl);
       }
       GetImportColumns(impId: any, adlId: any, classId?: string, objCategoryId?: any) {
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
       }
       GetImportTepmlate(impId: any, moduleId: any, name: any)
       {
           return this.postaction({ Input: "{FormId:0 , ListReportFieldIdValues: [{ \"ReportFieldId\" :3411, \"Value\": " + impId + "},{ \"ReportFieldId\" :3412, \"Value\": " + moduleId + "},{ \"ReportFieldId\" :3413, \"Value\": \"" + name + "\"}]}" }, this.GetImportTepmlateIdUrl);
       }
       //getExportData(formId, ParentFormId, index: any, sortDirection: any, sortColumn: any, keywordSearch?: string, advancedSearchValue?: any) {
       //    if (keywordSearch)
       //        return this.postaction({ Input: "{FormId:" + formId + ",ParentFormId:" + ParentFormId + ",Filter:'" + keywordSearch + "',PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',IsKeywordSearch:1,IsAdvancedSearch:0,IsExport:1}" }, this.listDataListUrl)
       //    else if (advancedSearchValue && advancedSearchValue != "[]")
       //        return this.postaction({ Input: "{ FormId:" + formId + ",ParentFormId:" + ParentFormId + ", ListFilterIdValues: " + advancedSearchValue + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1,IsExport:1}" }, this.listDataListUrl);
       //    else
       //        return this.postaction({ Input: "{ FormId:" + formId + ",ParentFormId:" + ParentFormId + ",PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',IsExport:1}" }, this.listDataListUrl);

       //}
       getExportData(formId, ParentFormId, index: any, sortDirection: any, sortColumn: any, fieldObjects: any, fileName, keywordSearch?: string, advancedSearchValue?: any) {
           var fields = fieldObjects;

           let filterArray = [];
           var singlecheck = fieldObjects.filter(function (item) {
               if (item.IsVisible == true) {
                   filterArray.push(item.FieldLabel)
                   return true;
               }
               else return false;

           });

           if (keywordSearch)
               return { Input: "{FormId:" + formId + ",ParentFormId:" + ParentFormId + ",Filter:'" + keywordSearch + "',PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',IsKeywordSearch:1,IsAdvancedSearch:0}", fileName: "Sites", fields: filterArray };
           else if (advancedSearchValue && advancedSearchValue != "[]")
               return { Input: "{ FormId:" + formId + ",ParentFormId:" + ParentFormId + ", ListFilterIdValues: " + advancedSearchValue + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}", fileName: "Sites", fields: filterArray };
           else
               return { Input: "{ FormId:" + formId + ",ParentFormId:" + ParentFormId + ",PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "'}", fileName: "Sites", fields: filterArray };

       }
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
       getBuildingExportData(formId, ParentFormId, index: any, sortDirection: any, sortColumn: any, fieldObjects: any, fileName, keywordSearch?: string, advancedSearchValue?: any, siteId?: any) {

           var fields = fieldObjects;

           let filterArray = [];
           var singlecheck = fieldObjects.filter(function (item) {
               if (item.IsVisible == true) {
                   filterArray.push(item.FieldLabel)
                   return true;
               }
               else return false;

           });

           if (keywordSearch)
               if (siteId != undefined)
                   return { Input: "{FormId:" + formId + ",ParentFormId:" + ParentFormId + ",ListReportFieldIdValues:[" + JSON.stringify(siteId[0]) + "],Filter:'" + keywordSearch + "',PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',IsKeywordSearch:1,IsAdvancedSearch:0,IsExport:1}", fileName: "Sites", fields: filterArray  }
               else
                   return { Input: "{FormId:" + formId + ",ParentFormId:" + ParentFormId + ",Filter:'" + keywordSearch + "',PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',IsKeywordSearch:1,IsAdvancedSearch:0,IsExport:1}", fileName: "Sites", fields: filterArray  }
           else if (advancedSearchValue && advancedSearchValue != "[]")
               if (siteId != undefined)
                   return { Input: "{ FormId:" + formId + ",ParentFormId:" + ParentFormId + ",ListReportFieldIdValues:[" + JSON.stringify(siteId[0]) + "], ListFilterIdValues: " + advancedSearchValue + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1,IsExport:1}", fileName: "Sites", fields: filterArray };
               else
                   return { Input: "{ FormId:" + formId + ",ParentFormId:" + ParentFormId + ", ListFilterIdValues: " + advancedSearchValue + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1,IsExport:1}", fileName: "Sites", fields: filterArray  };
           else
               if (siteId != undefined)
                   return { Input: "{ FormId:" + formId + ",ParentFormId:" + ParentFormId + ",ListReportFieldIdValues:[" + JSON.stringify(siteId[0]) + "],PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',IsExport:1}", fileName: "Sites", fields: filterArray };
               else
                   return { Input: "{ FormId:" + formId + ",ParentFormId:" + ParentFormId + ",PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',IsExport:1}", fileName: "Sites", fields: filterArray  };

       }

       updateSpaceImport(mappedClmns: any, excelData: any, importColumnsList: any, relationId: any, value: any, sheetName: any) {
           return this.postaction({ Input: "{FormId:0}", ColumnMapInput: JSON.stringify(mappedClmns), ValidationInput: JSON.stringify(importColumnsList), RowData: JSON.stringify(excelData), RelationId: relationId, FileInput: value.fileObj.FileData, FileName: value.fileObj.FileName, FileSize: value.fileObj.FileSize, SheetName: sheetName }, this.updateSpaceImportTemplateFieldsUrl);
       }


       updateEmployeeImport(mappedClmns: any, excelData: any, importColumnsList: any, relationId: any, optionValue: any, value: any, sheetName: any) {
           return this.postaction({ Input: "{FormId:0}", ColumnMapInput: JSON.stringify(mappedClmns), ValidationInput: JSON.stringify(importColumnsList), RowData: JSON.stringify(excelData), RelationId: relationId, IsInsert: optionValue, FileInput: value.fileObj.FileData, FileName: value.fileObj.FileName, FileSize: value.fileObj.FileSize, SheetName: sheetName}, this.ImportEmployeeDetailsUrl);
       }

       updateAssetImport(mappedClmns: any, excelData: any, importColumnsList: any, importFields: any, value: any, sheetName: any) {
           return this.postaction({ Input: "{FormId:0}", ColumnMapInput: JSON.stringify(mappedClmns), ValidationInput: JSON.stringify(importColumnsList), RowData: JSON.stringify(excelData), ImportInput: JSON.stringify(importFields[0]), FileInput: value.fileObj.FileData, FileName: value.fileObj.FileName, FileSize: value.fileObj.FileSize, SheetName: sheetName }, this.ImportAssetDetailsUrl);
       }
       updateUserImport(mappedClmns: any, excelData: any, importColumnsList: any, value: any, sheetName: any) {
           return this.postaction({ Input: "{FormId:0}", ColumnMapInput: JSON.stringify(mappedClmns), ValidationInput: JSON.stringify(importColumnsList), RowData: JSON.stringify(excelData), FileInput: value.fileObj.FileData, FileName: value.fileObj.FileName, FileSize: value.fileObj.FileSize, SheetName: sheetName }, this.ImportUserDetailsUrl);
       }

       updateDocumentImport(mappedClmns: any, excelData: any, importColumnsList: any, documentFolder: any, optionValue: any, value: any, sheetName: any) {
           return this.postaction({ Input: "{FormId:0}", ColumnMapInput: JSON.stringify(mappedClmns), ValidationInput: JSON.stringify(importColumnsList), RowData: JSON.stringify(excelData), DocumentFolder: documentFolder, IsInsert: optionValue, FileInput: value.fileObj.FileData, FileName: value.fileObj.FileName, FileSize: value.fileObj.FileSize, SheetName: sheetName }, this.ImportDocumentDetailsUrl);
       }

       InsertImportTemplateFields(strRptFields: any, selectedId: any)
       {
           return this.postaction({ Input: "{FormId:0 ,ListReportFieldIdValues: " + JSON.stringify(strRptFields) + ",Id:" + selectedId + "}" }, this. insertImportTemplateFieldsUrl);
       }
      
     //Change Customer
       ChangeCrossSessionValue(selectedId, value) {
           return this.postaction({ Input: "{FormId:96 ,Id: " + selectedId + ",ListReportFieldIdValues: [{ \"ReportFieldId\" :84, \"Value\": " + value + "}]}" }, this.submitEditUrl);


       }

       getIsModuleAdmin(moduleId: number) {
           return this.postaction({
               input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"}]}"
           }, this.getIsModuleAdminUrl);
       }

       getFloorExportData(index: number, direction: any, column: any, buildingId: any, fieldObjects: any, fileName, keywordSearch?: string, advancedSearchValue?: any, isExport?: any) {
          // debugger
           var fields = fieldObjects;

           let filterArray = [];
           var singlecheck = fieldObjects.filter(function (item) {
               if (item.IsVisible == true) {
                   filterArray.push(item.FieldLabel)
                   return true;
               }
               else return false;

           });
           if (advancedSearchValue && advancedSearchValue != "[]")
              { if (buildingId == undefined) { //code to call complete building list SP
                   if (isExport == true)
                       return { Input: "{ FormId:71,ParentFormId:125,isExport:1,ListFilterIdValues: " + advancedSearchValue + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}", fileName: fileName, fields: filterArray };
                   else
                       return { Input: "{ FormId:71,ParentFormId:125,ListFilterIdValues: " + advancedSearchValue + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}", fileName: fileName, fields: filterArray  };
               }
               else {//code to call connected building list
                   if (isExport == true)
                       return { Input: "{ FormId:71,ParentFormId:125,isExport:1,ListFilterIdValues: " + advancedSearchValue + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1,ListReportFieldIdValues:[" + JSON.stringify(buildingId[0]) + "]}", fileName: fileName, fields: filterArray  };
                   else
                       return { Input: "{ FormId:71,ParentFormId:125,ListFilterIdValues: " + advancedSearchValue + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1,ListReportFieldIdValues:[" + JSON.stringify(buildingId[0]) + "]}", fileName: fileName, fields: filterArray };
               }
           }

           else if (keywordSearch) {
               if (buildingId == undefined) { //code to call complete building list SP
                   if (isExport == true)
                       return { Input: "{ FormId:71,Filter:'" + keywordSearch + "',isExport:1,IsKeywordSearch:1,IsAdvancedSearch:0}", fileName: "Floors", fields: filterArray  };
                   else
                       return { Input: "{ FormId:71,Filter:'" + keywordSearch + "',IsKeywordSearch:1,IsAdvancedSearch:0}", fileName: "Floors", fields: filterArray  };
               }
               else {//code to call connected building list
                   if (isExport == true) return { Input: "{ FormId:71,Filter:'" + keywordSearch + "',IsKeywordSearch:1,IsAdvancedSearch:0,ListReportFieldIdValues:[" + JSON.stringify(buildingId[0]) + "]}", fileName: "Floors", fields: filterArray  };
               }
           }
           //return this.getaction<Observable<any>>(this._FloorDataUrl);
           else {
               if (buildingId == undefined) { //code to call complete building list SP
                   if (isExport == true)
                       return { Input: "{FormId:" + this.floorListFormId + ",isExport:1,PageIndex:" + index + ",SortDirection:'" + direction + "'}", fileName: "Floors", fields: filterArray  }
                   else
                       return { Input: "{FormId:" + this.floorListFormId + ",PageIndex:" + index + ",SortDirection:'" + direction + "'}", fileName: "Floors", fields: filterArray  }
               }
               else {//code to call connected building list
                   if (isExport == true)
                       return { Input: "{FormId:" + this.floorListFormId + ",isExport:1,ListReportFieldIdValues:[" + JSON.stringify(buildingId[0]) + "],PageIndex:" + index + ",SortDirection:'" + direction + "'}", fileName: "Floors", fields: filterArray }
                   else
                       return { Input: "{FormId:" + this.floorListFormId + ",ListReportFieldIdValues:[" + JSON.stringify(buildingId[0]) + "],PageIndex:" + index + ",SortDirection:'" + direction + "'}", fileName: "Floors", fields: filterArray  }
               }
           }
       }
       
       getBarCodeData(event: any) {
           //return this.postaction({ fileInput: event }, this.getBarCodeDataUrl);
           return this.postaction({ fileInput: event }, this.getBarCodeDataUrl);
       }

       getSSOEnabled()
       {
           return this.postaction( {}, this.getSSOEnabledUrl);
       }
       getWorkFlowEditableFields(selectedUserid) {
           return this.postaction({ Input: "{ FormId:90,ListLookupReportFieldIdValues: [{ \"FieldId\":339,\"ReportFieldId\" :300, \"Value\": " + selectedUserid + "}]}" }, this.listFieldObjUrl);
       }

       GetUserCountForDashBoard() {
           return this.postaction({}, this.getUserCountForDashBoard);
       }

       checkSubscribedFeature(featureCategoryIds: string) {
           return this.postaction({ Input: "{FormId:353}", FeatureCategoryIds: featureCategoryIds }, this.subscribedFeatureUrl);
       }

       GetSpaceBarChartDetailsForDashboard() {
           return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":571, \"Value\":0 }]}" }, this.getDashboardDetailsForSpaceBarChart);
       }

       GetDrawingDistributionForDashBoard() { //getDrawingDistributionForDashBoard
           return this.postaction({}, this.getDrawingDistributionForDashBoard);
       }

       GetExpiredUserFields() {
           return this.postaction({ Input: "{FormId:374}" }, this.listFieldObjUrl);
       }

       GetExpiredUserData(column, direction) {
           return this.postaction({ Input: "{FormId:374, SortColumn: '" + column + "', SortDirection: '" + direction + "'}" }, this.listDataListUrl);
       }
       getReportsAccessibleByUser(selectedUserId) {
           return this.postaction({ Input: "{Id:" + selectedUserId+",ListReportFieldIdValues:[{\"ReportFieldId\":3917, \"Value\":0 }]}"  }, this.getReportsAccessibleByUserUrl);
       }
       updateReportAccessToUser(updatedRptFldValues: string, selectedUserId: number) {
           return this.postaction({ Input: "{ListReportFieldIdValues:[" + updatedRptFldValues + "{\"ReportFieldId\":3915, \"Value\":" + selectedUserId + "}]}"}, this.updateReportAccessToUserUrl);
       }
       getPersonalSettingsFieldWithData(userId: any) {
           return this.postaction({ Input: "{ FormId: 388,Id:" + userId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":2303,\"ReportFieldId\": 12097, \"Value\":\"3289\" }]}" }, this.editDataUrl);
       }
       updatePersonalSettingsData(strRptFields: string) {
               return this.postaction({ Input: "{FormId: 388 ,ListReportFieldIdValues: " + strRptFields +  "}" }, this.submitEditUrl);
       }
       getChangePasswordlist() {
           return this.postaction({ Input: "{FormId: 389 }" }, this.listFieldObjUrl);
       }
       getChangePasswordKey() {
           return this.postaction({}, this.getkey);
       }
       updatePassword(currentPass, pass, confirmPass) {
           return this.postaction({ Input: "{CurrentPassword:'" + currentPass + "',Password:'" + pass + "',ConfirmPassword:'" + confirmPass + "'}" }, this.updatePasswordUrl);
       }
       getUserAccessibleSiteslist(selectedUserId) {
           return this.postaction({ Input: "{FormId: 390,ListLookupReportFieldIdValues:[{ \"FieldId\":2096,\"ReportFieldId\": 6350, \"Value\":" + selectedUserId + " }] }" }, this.listFieldObjUrl);
       } 
       getUserAccessibleSiteIds(selectedUserId) {
           return this.postaction({ Input: "{UserId: " + selectedUserId+" }" }, this.getUserAccessibleSites);
       }

       CheckIsSiteLevelAdmin(moduleId) {
           return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278, \"Value\":" + moduleId +" }]}" }, this.checkIsSiteLevelAdmin);
       }

       CheckIsSiteLevelUser() {
           return this.postaction({}, this.checkIsSiteLevelUser);
       }

       getAdminstnCustomerSettingsFormFields(Formid) {
           let lookupRptField = "[{\"FieldId\":2080,\"ReportFieldId\": 187, \"Value\":\"2080\" },{\"FieldId\":2128,\"ReportFieldId\": 187, \"Value\":\"2128\" }"
               + ", {\"FieldId\":2130,\"ReportFieldId\": 187, \"Value\":\"2130\" }, {\"FieldId\":2134,\"ReportFieldId\": 187, \"Value\":\"2134\" }" +
               ", {\"FieldId\":2135,\"ReportFieldId\": 187, \"Value\":\"2135\" }, {\"FieldId\":2136,\"ReportFieldId\": 187, \"Value\":\"2136\" }" +
               ", {\"FieldId\":2162,\"ReportFieldId\": 187, \"Value\":\"2162\" }, {\"FieldId\":2158,\"ReportFieldId\": 187, \"Value\":\"2158\" }" +
               ", {\"FieldId\":2161,\"ReportFieldId\": 187, \"Value\":\"2161\" }, {\"FieldId\":2225,\"ReportFieldId\": 187, \"Value\":\"2225\" }]";
           return this.postaction({ Input: "{ FormId:" + Formid + ",ParentFormId:" + 0 + ",Id:" + 0 + ",ListLookupReportFieldIdValues:" + lookupRptField + "}" }, this.editDataUrl);
       }

       getAdminstnCustomerSettingsFormFieldsForObjects(Formid, ModuleId) {
           let lookupRptField = "[{\"FieldId\":2210,\"ReportFieldId\": 187, \"Value\":\"2210\"  }"+
                                ",{\"FieldId\":2210,\"ReportFieldId\": 271, \"Value\":\"" + ModuleId + "\" }]";
           return this.postaction({ Input: "{ FormId:" + Formid + ",ParentFormId:" + 0 + ",Id:" + 0 + ",ListLookupReportFieldIdValues:" + lookupRptField + "}" }, this.editDataUrl);
       }

       getSubscribedFeaturesWithFields(Formid,ModuleId) {
           return this.postaction({ Input: "{ FormId:" + Formid + ",ListReportFieldIdValues:[{\"ReportFieldId\":271, \"Value\":" + ModuleId+" }]}"}, this.GetSubscribedFeaturesWithFieldsUrl);
       }

       UpdateCustomerSettings(ModuleId, FeatureDetails, IsModuleEnabled) {
           return this.postaction({
               Input: "{ ModuleId:" + ModuleId + ",ListCustomerFeatureInput:" + FeatureDetails + ", IsModuleEnabled:" + IsModuleEnabled+"}" }, this.UpdateCustomerSettingsUrl);
       }
       CheckAutoNumbering(Formid, ObjectCategoryId) {
           return this.postaction({ Input: "{ FormId:" + Formid + ",ListReportFieldIdValues:[{\"ReportFieldId\":649, \"Value\":" + ObjectCategoryId + " }]}" }, this.CheckAutoNumberingStatusUrl);
       }
       GetUniqueRoomNo(Formid) {
           return this.postaction({ Input: "{ FormId:" + Formid + "}" }, this.GetUniqueRoomNoUrl);
       }
       GetWorkorderCount() {
           return this.postaction({},this.GetWorkOrderUsersCountUrl);
       }
       getHelpMenuUrl() {
           return this.postaction({}, this.helpsMenuUrl);
       }
       getSpaceFunctionCustomizedName() {
           return this.postaction({}, this.SpaceFunctionCustomizedName);
       }

       getDivisionAccesUsersList(unitId, pageIndex?: number, sortCol?: string, sortDir?: string) {
           var param = "{ FormId: 419,PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',ListReportFieldIdValues:[{\"ReportFieldId\":301, \"Value\":" + unitId + " }]}"
           return this.postaction({ Input: param }, this.listDataListUrl);
       }
       getKeywordField(FormId) {
           return this.postaction({ Input: "{FormId:" + FormId+"}" }, this.keywordLookUpUrl)
       }
       getFields(FormId) {
           return this.postaction({ Input: "{ FormId:" + FormId+ " }" }, this.listFieldObjUrl);
       }
       getListSearch(formid,parentFormId,unitId, pageIndex?: number, sortCol?: string, sortDir?: string, rptFieldValues?: string, keywordvalue?: string, IsKeyword?: any, IsAdvance?: any, advancedSearchvalue?: string) {
          // var rptFieldValues = "[{\"ReportFieldId\":8795,\"Value\":\"" + selSpaceId + "\"}]";
           if (IsKeyword == "1") {
               return this.postaction({ Input: "{ FormId: " + formid + ",ListReportFieldIdValues:" + rptFieldValues +  ",ParentFormId:" + parentFormId+",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",Filter:'" + keywordvalue + "',ListFilterIdValues: " + advancedSearchvalue + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
           }
           else {
               return this.postaction({ Input: "{ FormId: " + formid + ",ListReportFieldIdValues:" + rptFieldValues +  ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex +  "}" }, this.listDataListUrl);
             

           }
       }
       GetBaseOrganizationUsers(orgid) {
           return this.postaction({ OrganizationalUnitId: orgid }, this.GetBaseOrganizationUsersUrl);
       }
       updateDivisionAccessToManyUsers(updatedRptFldValues: string, unitId) {
           return this.postaction({ Input: "{Id:" + unitId + ",ListReportFieldIdValues:[" + updatedRptFldValues + "]}" }, this.UpdateDivisionAccessToManyUserUrl);
           // return this.postaction({ Input: "{ FormId:" + this.UserDivisionAdminSetFrmId + ",UserIds:[" + userIds + "],divisionAdminInput:" + divAdminInpt + "}" }, this.updateDivisionAdminacces);
       }
       getReportMenusbyModelwise(moduleId: any) {
           return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":149, \"Value\":" + moduleId + "}]}" }, this.getReportMenusbyModelWise);
       }

       getFeedbackFields() {
           return this.postaction({ Input: "{FormId: 426}" }, this.listFieldObjUrl);
       }

       submitFeedback(strRptFields: any, userId) {
           return this.postaction({ Input: "{FormId:426 ,ListReportFieldIdValues: " + strRptFields + ",Id:" + userId + "}" }, this.feedbackSubmiturl);
       }

       getUserGridDataExportInput(formId, pageIndex: any, sortDirection: any, sortColumn: any, fieldObjects: any, fileName, keyworsearch?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
           var fields = fieldObjects;

           let filterArray = [];
           fieldObjects.filter(function (item) {
               if (item.IsVisible == true) {
                   filterArray.push(item.FieldLabel)
                   return true;
               }
               else return false;

           });
           return { Input: "{ FormId:" + formId + ",IsExport:1,PageIndex:" + pageIndex + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "', Filter: '" + keyworsearch + "', ListFilterIdValues: " + value + ", IsKeywordSearch: " + IsKeyword + ", IsAdvancedSearch:" + IsAdvance + "}", fileName: fileName, fields: filterArray };

       }
       getCommonAdvnceSearchLookup(formId) {
           return this.postaction({ Input: "{FormId:" + formId + "}" }, this.AdvanceSearchLookUpUrl)
       }
       getCommonKeywordField(formId) {
           return this.postaction({ Input: "{FormId:" + formId + "}" }, this.keywordLookUpUrl)
       }
       downloadRevision(ReferenceId: any, fileName: any, RevisionNo: any) {
           return this.downloadaction({Input: "{FormId:464,EntityId:22}", FileInput: "{ReferenceId:" + ReferenceId + ",FileName:'" + fileName + "',RevisionNo:'" + RevisionNo + "'}"}, this.downloadUrl);
       }
       getkeywordFields(FormId) {
           return this.postaction({ Input: "{FormId:" + FormId + "}" }, this.keywordLookUpUrl)
       }
       getAllAdvanceSearchLookup(FormId) {
           return this.postaction({ Input: "{FormId:" + FormId + "}" }, this.AdvanceSearchLookUpUrl)
       }
       getStatusofXref(floorId: any, drawingId: any, revisionNumber: any, drawingNames: any) {
           return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":539, \"Value\":" + floorId + "},{\"ReportFieldId\":586, \"Value\":" + drawingId + "},{\"ReportFieldId\":512, \"Value\":" + revisionNumber + "},{\"ReportFieldId\":510, \"Value\":\"" + drawingNames + "\"}]}" }, this.StatusXref);
       }
       getSchedulingReportFieldObject() {
           return this.postaction({ Input: "{FormId:513}" }, this.listFieldObjUrl);
       }
       getSchedulingReportData(pageDetails: any) {
           return this.postaction({ Input: "{FormId:513,ListReportFieldIdValues:" + JSON.stringify(pageDetails) + "}" }, this.ListDataForSchedulingReportUrl);
       }
       updateSchedulingReportData(pageDetails: any) {
           return this.postaction({ Input: "{FormId:513,ListReportFieldIdValues:" + pageDetails + "}" }, this.updateSchedulingReportDataUrl);
       }
       getManageReportFieldObject() {
           return this.postaction({ Input: "{FormId:519}" }, this.listFieldObjUrl);
       }
       getManageReportData(ModuleId: number, target: number, nameDisplayFormatId: number, scheduledReportId: number, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
           return this.postaction({ Input: "{ FormId:519,SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}", Moduleid: ModuleId, Target: target, NameDisplayFormatId: nameDisplayFormatId, ScheduledReportId: scheduledReportId}, this.getManageReportDataUrl);
       }
       manageReportDataDelete(id: any) {
           return this.postaction({ Input: "{FormId:519,Id:" + id + "}" }, this.deleteUrl);
       }
       manageReportDataStatus(pageDetails, selectId) {
           return this.postaction({ Input: "{FormId:519,ListReportFieldIdValues:" + pageDetails + ", Id: " + selectId + " }" }, this.updateManageReportStatusDataUrl);
       }
       getInputExportHighlighted(selectedIds, fileName, pagingTarget, fieldObjects: any, sortCol?: string, sortDir?: string, pageDetails?, logParameterConditions?, logSelectedUserIds?, logSelectedEntityIds?) {
           var returnInput;
           var rptIds = '';
           let filterArray = [];
           fieldObjects.filter(function (item) {
               if (item.IsVisible == true) {
                   filterArray.push(item.FieldLabel)
                   return true;
               }
               else return false;

           });
           if (selectedIds.length > 1) {
               rptIds += "{\"ReportFieldId\":1697,\"Value\":\"" + selectedIds.toString() + "\"}";
           }
           if (pagingTarget == 1) {
               var param;
               if (rptIds == '')
                   param = "{ FormId: " + this.LogApplicationListFrmId + ",IsExport:1" + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}"
               else
                   param = "{ FormId: " + this.LogApplicationListFrmId + ",ListReportFieldIdValues:[" + rptIds + "],IsExport:1" + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}"
               returnInput = { Target: 1, fileName: fileName, Input: param, fields: filterArray };
           } else if (pagingTarget == 2) {
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
               } else {
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
       }

       GetCustomReportDetailsforSelectedAdditionalField(fieldobj, id) {
           return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + ",Id:" + id + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.getCustomReportDetailsforSelectedAdditionalField);

       }

       getMessageTemplateFields() {
           return this.postaction({ Input: "{ FormId:" + this.MessageTemplatesListFormId + " }" }, this.listFieldObjUrl);
       }

       getMessageTemplatesData(reportfieldIdValues, index: number, column: any, direction: any) {
           return this.postaction({ Input: "{FormId:" + this.MessageTemplatesListFormId + ",ListReportFieldIdValues:" + JSON.stringify(reportfieldIdValues) + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.listDataListUrl);
       }

       loadMessageTemplateAddEditFields(selectedId: number, target: number, reportfieldIdValues) {
           if (target == 1) {
               return this.postaction({ Input: "{ FormId:" + this.MessageTemplatesAddEditFormId + "}" }, this.addDataUrl);
           }
           else {
               return this.postaction({ Input: "{ FormId:" + this.MessageTemplatesAddEditFormId + ",ParentFormId:" + this.MessageTemplatesListFormId + ",Id:" + selectedId + " ,ListReportFieldIdValues: " + reportfieldIdValues + "}" }, this.editDataUrl);
           }
       }

       checkMessageTemplateInUse(id: any) {
           return this.postaction({ Input: "{FormId:" + this.MessageTemplatesListFormId + ",Id:" + id + "}" }, this.CheckMessageTemplateInUse);
       }

       deleteMessageTemplate(selectedId: any) {
           return this.postaction({ Input: "{FormId:" + this.MessageTemplatesListFormId + ",Id:" + selectedId + "}" }, this.deleteUrl)
       }

       postSubmitMessageTemplate(strRptFields: string, selectedId: number, target: number) {
           if (target == 1)//add 
           {
               return this.postaction({ Input: "{FormId:" + this.MessageTemplatesAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.MessageTemplatesListFormId + "}" }, this.submitAddUrl);
           } else {
               return this.postaction({ Input: "{FormId:" + this.MessageTemplatesAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.MessageTemplatesListFormId + "}" }, this.submitEditUrl);
           }
       }

       getCustomerListFields() {
           return this.postaction({ Input: "{ FormId:" + this.customerListFormId + " }" }, this.listFieldObjUrl);
       }

       getCustomerData(index: number, column: any, direction: any) {
           return this.postaction({ Input: "{FormId:" + this.customerListFormId + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.listDataListUrl);
       }

       loadCustomerAddEditFields(selectedId: number, target: number) {
           if (target == 1) {
               return this.postaction({ Input: "{ FormId:" + this.customerAddEditFormId + "}" }, this.addDataUrl);
           }
           else {
               return this.postaction({ Input: "{ FormId:" + this.customerAddEditFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
           }
       }

       Insertinvoiceifnotexists(categoryName: string) {
           return this.postaction({ CategoryName: categoryName }, this.InsertAttachmentCategoryurl)
       }

       postsubmitCustomerDetails(strRptFields: string, selectedId: number, target: number) {
           if (target == 1)//add 
           {
               return this.postaction({ Input: "{FormId:" + this.customerAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.customerListFormId + "}" }, this.insertUpdateCustomerUrl);
           } else {
               return this.postaction({ Input: "{FormId:" + this.customerAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.customerListFormId + "}" }, this.insertUpdateCustomerUrl);
           }
       }

       getAssignDrawingCategoryFields() {
           return this.postaction({ Input: "{ FormId:" + this.assignDwgCategoryFormId + " }" }, this.listFieldObjUrl);
       }
       getUserDetails(selectedId: number, field) {
           return this.postaction({ Input: "{ EntityId:" + selectedId + ",ListLookupReportFieldIdValues:" + field + "}" }, this.UserDetails);
       }

       getDrawingCategoryData(reportfieldIdValues, index: number, column: any, direction: any) {
           return this.postaction({ Input: "{FormId:" + this.assignDwgCategoryFormId + ",ListReportFieldIdValues:" + JSON.stringify(reportfieldIdValues) + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.getCustomerDrawingCategoriesUrl);
       }

       postsubmitCustomerDwgCategory(strRptFields: string) {
           return this.postaction({ Input: "{FormId:" + this.assignDwgCategoryFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.insertCustomerDrawingCategoriesUrl);
       }

       getAllowedFileTypesFields() {
           return this.postaction({ Input: "{ FormId:" + this.allowedFileTypesFormId + " }" }, this.listFieldObjUrl);
       }

       getAllowedFileTypesData(reportfieldIdValues, index: number, column: any, direction: any) {
           return this.postaction({ Input: "{FormId:" + this.allowedFileTypesFormId + ",ListReportFieldIdValues:" + JSON.stringify(reportfieldIdValues) + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.listDataListUrl);
       }

       postsubmitAllowedFileTypes(strRptFields: string) {
           return this.postaction({ Input: "{FormId:" + this.allowedFileTypesFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.insertCustomerPermitedFilesUrl);
       }

       loadUserLicenseSetupFields() {
           return this.postaction({ Input: "{ FormId:" + this.userLicenseSetupFormId + " }" }, this.listFieldObjUrl);
       }

       getUserLicenceSetupData(selectedId, deviceTypeId) {
           return this.postaction({ Input: "{FormId:" + this.userLicenseSetupFormId + ",Id:" + selectedId + "}", DeviceTypeId: deviceTypeId }, this.GetUserLicenseSetupUrl);
       }

       getUserLicenceSetupDataForCustomers(selectedId, deviceTypeId, licenseAccountLevel) {
           return this.postaction({ Input: "{FormId:" + this.userLicenseSetupFormId + ",Id:" + selectedId + "}", DeviceTypeId: deviceTypeId, LicenseAccountLevel: licenseAccountLevel }, this.GetUserLicenseSetupForCustomersUrl);
       }

       postsubmitUserLicenseSetupUrl(selectedId, strRptFields) {
           return this.postaction({ Input: "{FormId:" + this.userLicenseSetupFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id: " + selectedId + " }" }, this.UpdateUserLicenseSetupForCustomersUrl);
       }

       postsubmitRolewiseUserLicenseSetupUrl(selectedId, strRptFields: string, lienseSetupData) {
           return this.postaction({ Input: "{FormId:" + this.userLicenseSetupFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id: " + selectedId + " }", SetupData: lienseSetupData }, this.UpdaterolewiseUserLicenseSetupForCustomersUrl);
       }
       getCalendarFields() {
           return this.postaction({ Input: "{ FormId:" + this.CalendarFormId + " }" }, this.listFieldObjUrl);
       }
       getCreateNewCalendarFields() {
           return this.postaction({ Input: "{ FormId:" + this.CreateNewCalendarFormId + " }" }, this.listFieldObjUrl);
       }
       getWorkingTimeFields() {
           return this.postaction({ Input: "{ FormId:" + this.SetWorkingTimeFormId + " }" }, this.listFieldObjUrl);
       }
       getWorkingTimeData() {
           return this.postaction({ Input: "{FormId:" + this.SetWorkingTimeFormId + "}" }, this.listDataListUrl);
       }
       postSubmitCalendar(strRptFields: string, lstCalendar: any) {
           return this.postaction({ Input: "{ FormId:" + this.CreateNewCalendarFormId + ",ListReportFieldIdValues:" + strRptFields +"}", CalendarInput: lstCalendar}, this.InsertCalendar);
       }
       getWorkingTimeDataList(strRptFields) {
           return this.postaction({ Input: "{FormId:" + this.SetWorkingTimeFormId + ",ListReportFieldIdValues: " + strRptFields + "}" }, this.listDataListUrl);
       }
       getCalendarDetails(calendarId) {
           return this.postaction({ Input: "{ FormId:" + this.CreateNewCalendarFormId + ",Id:" + calendarId +"}"}, this.GetCalendarDetails);
       }
       getWorkingTimeBasedOnDateList(strRptFields) {
           return this.postaction({ Input: "{FormId:" + this.WorkingTimeBasedOnDateFormId + ",ListReportFieldIdValues: " + strRptFields + "}" }, this.listDataListUrl);
       }
       getCalendarExceptionFields() {
           return this.postaction({ Input: "{ FormId:" + this.CalendarExceptionFormId + " }" }, this.listFieldObjUrl);
       }
       getCalendarExceptionDataList(calendarId) {
           return this.postaction({ Input: "{FormId:" + this.CalendarExceptionFormId + ",Id:" + calendarId +"}" }, this.listDataListUrl);
       }
       loadCalendarExceptionAddEditFields(selectedId: number, excepId:any, target: number) {
           let rptlookupFieldValues = "[{\"FieldId\":2888,\"ReportFieldId\":12097,\"Value\":\"4089\"},{\"FieldId\":2905,\"ReportFieldId\":12097,\"Value\":\"4102\"},{\"FieldId\":2889,\"ReportFieldId\":6439,\"Value\":" + excepId + "}]";
           if (target == 1) {
               return this.postaction({ Input: "{ FormId:" + this.CalendarExceptionAddEditFormId + ",ListLookupReportFieldIdValues:" + rptlookupFieldValues +"}" }, this.addDataUrl);
           }
           else {
               return this.postaction({ Input: "{ FormId:" + this.CalendarExceptionAddEditFormId + ",ParentFormId:" + this.CalendarExceptionFormId + ",Id:" + selectedId + ",ListLookupReportFieldIdValues:" + rptlookupFieldValues +"}" }, this.editDataUrl);
           }
       }
       postSubmitCalendarException(strsubmitField: string, lstCalendarWorkTime: any,Id:any, target: any) {
           if (target == 'add') {
               return this.postaction({ Input: "{FormId:" + this.CalendarExceptionAddEditFormId + ",ListReportFieldIdValues: " + strsubmitField + "}", CalendarInput: lstCalendarWorkTime }, this.InsertUpdateCalendarException);
           }
           else if (target == 'edit'){
               return this.postaction({ Input: "{EntityId:" + Id + ",ListReportFieldIdValues: " + strsubmitField + "}", CalendarInput: lstCalendarWorkTime }, this.InsertUpdateCalendarException);
           }
           
       }
       postCalendarExceptionDelete(selectId: number) {
           return this.postaction({ Input: "{FormId:" + this.CalendarExceptionFormId + ",Id:" + selectId + "}" }, this.deleteUrl);
       }
       getCalendarExceptionDays(CalendarId,StartDate,EndDate) {
           return this.postaction({ Input: "{Id:" + CalendarId + ",EntityId:" + CalendarId +"}", StartDate: StartDate, EndDate: EndDate }, this.GetCalendarExceptionDays);
       }
       getBuildingConditionGridFields() {
           return this.postaction({ Input: "{ FormId:" + this.BuildingConditionListFormId + " }" }, this.listFieldObjUrl);
       }
       getBuildingConditionGridData(index: number, column: any, direction: any) {
           return this.postaction({ Input: "{FormId:" + this.BuildingConditionListFormId + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.listDataListUrl);
       }
       getBuildingConditionAddEditFields(selId:number) {

           if (selId == 0) {
               return this.postaction({ Input: "{ FormId:" + this.BuildingConditionAddEditFormId + " }" }, this.addDataUrl);
           }
           else {
               return this.postaction({ Input: "{ FormId:" + this.BuildingConditionAddEditFormId + ",Id:" + selId + ",ParentFormId:" + this.BuildingConditionListFormId+" }" }, this.editDataUrl);
           }
       }
       postBuildingConditionInsert(pageDetails) {
           return this.postaction({ Input: "{ FormId:" + this.BuildingConditionAddEditFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id: 0 ,ParentFormId:" + this.BuildingConditionListFormId + "}", }, this.submitAddUrl);
       }

       postBuildingConditionUpdate(pageDetails, selectId) {
           return this.postaction({ Input: "{ FormId:" + this.BuildingConditionAddEditFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + ",ParentFormId:" + this.BuildingConditionListFormId +"}" }, this.submitEditUrl);
       }

       postBuildingConditioDelete(selectId: number) {
           return this.postaction({ Input: "{FormId:" + this.BuildingConditionAddEditFormId + ",Id:" + selectId + ",ParentFormId:" + this.BuildingConditionListFormId +"}" }, this.deleteUrl);
       }

       getDrawingLayerColms() {
           return this.postaction({ Input: "{FormId: 558}" }, this.listFieldObjUrl);
       }

       getDrawingLayerListData(pageIndex?: number, sortCol?: string, sortDir?: string) {
           return this.postaction({ Input: "{ FormId: 558,SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
       }

       loadDrawingLayerAddEdit(selectedId: number, target: number) {
           if (target == 1) {
               return this.postaction({ Input: "{ FormId: 558}" }, this.addDataUrl);
           }
           else {
               return this.postaction({ Input: "{ FormId: 558,ParentFormId: 558,Id:" + selectedId + "}" }, this.editDataUrl);
           }
       }

       UpdateDrawingLayer(strRptFields: string, selectedId: number) {
            return this.postaction({ Input: "{FormId: 558 ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId: 558}" }, this.submitEditUrl);
       }

       AddDrawingLayer(strRptFields: string, selectedId: number) {
            return this.postaction({ Input: "{FormId: 558,ListReportFieldIdValues: " + strRptFields + ",ParentFormId: 558}" }, this.submitAddUrl);
       }

       deleteDrawingLayer(seleId: number) {
           return this.postaction({ Input: "{FormId: 558,ParentFormId: 558,Id:" + seleId + "}" }, this.deleteUrl);
       }

       checkDrawingLayerInUse(seleId: number) {
           return this.postaction({ Input: "{FormId: 558,ParentFormId: 558,Id:" + seleId + "}" }, this.checkDrawingLayerInUseUrl);
       }

       getLayerFunctionMappingColms() {
           return this.postaction({ Input: "{FormId: 560}" }, this.listFieldObjUrl);
       }

       getLayerFunctionMappingListData(pageIndex?: number, sortCol?: string, sortDir?: string) {
           return this.postaction({ Input: "{ FormId: 560,SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
       }

       loadLayerFunctionMappingAddEdit(selectedId: number, target: number) {
           if (target == 1) {
               return this.postaction({
                   Input: "{ FormId: 560 ,ListLookupReportFieldIdValues:[{ \"FieldId\":2850,\"ReportFieldId\": 4404, \"Value\":\"3\" }]}" }, this.addDataUrl);
           }
           else {
               return this.postaction({ Input: "{ FormId: 560,ParentFormId: 560,Id:" + selectedId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":2850,\"ReportFieldId\": 4404, \"Value\":\"3\" }]}" }, this.editDataUrl);
           }
       }

       UpdateLayerFunctionMapping(strRptFields: string, selectedId: number) {
           return this.postaction({ Input: "{FormId: 560 ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId: 560}" }, this.submitEditUrl);
       }

       AddLayerFunctionMapping(strRptFields: string, selectedId: number) {
           return this.postaction({ Input: "{FormId: 560,ListReportFieldIdValues: " + strRptFields + ",ParentFormId: 560}" }, this.submitAddUrl);
       }

       deleteLayerFunctionMapping(seleId: number) {
           return this.postaction({ Input: "{FormId: 560,ParentFormId: 560,Id:" + seleId + "}" }, this.deleteUrl);
       }
       getSeasonsGridFields() {
           return this.postaction({ Input: "{ FormId:" + this.seasonsListFormId + " }" }, this.listFieldObjUrl);
       }
       getSeasonsGridData(index: number, column: any, direction: any) {
           return this.postaction({ Input: "{FormId:" + this.seasonsListFormId + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.listDataListUrl);
       }
       getSeasonsAddEditFields(selId: number) {

           if (selId == 0) {
               return this.postaction({ Input: "{ FormId:" + this.seasonsAddEditFormId + " }" }, this.addDataUrl);
           }
           else {
               return this.postaction({ Input: "{ FormId:" + this.seasonsAddEditFormId + ",Id:" + selId + ",ParentFormId:" + this.seasonsListFormId + " }" }, this.editDataUrl);
           }
       }
       postSeasonsInsert(pageDetails) {
           return this.postaction({ Input: "{ FormId:" + this.seasonsAddEditFormId + ",ListReportFieldIdValues:" + pageDetails + ",ParentFormId:" + this.seasonsListFormId + "}", }, this.submitAddUrl);
       }

       postSeasonUpdate(pageDetails, selectId) {
           return this.postaction({ Input: "{ FormId:" + this.seasonsAddEditFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + ",ParentFormId:" + this.seasonsListFormId +"}" }, this.submitEditUrl);
       }
       postSeasonDelete(selectId: number) {
           return this.postaction({ Input: "{FormId:" + this.seasonsListFormId + ",Id:" + selectId + ",ParentFormId:" + this.seasonsListFormId +"}" }, this.deleteUrl);
       }
       checkSeasonInUse(selectId: number) {

           return this.postaction({ Input: "{FormId:" + this.seasonsListFormId + ",Id:" + selectId + ",ParentFormId:" + this.seasonsListFormId + "}" }, this.CheckSeasonInUseUrl);
       }

       //LogOff() {
       //    return this.postaction({}, this.LogOutUrl);
       //}       
       LogOff() {
           return this.postaction({}, this.updateLogOutCountUrl);
       }

       getPlotSettingsAppSetingsKey() {
           return this.postaction({}, this.GetPlotSettingsAppConfigKey);
       }

       getRevit3DDrawingAppSetingsKey()
       {
           return this.postaction({}, this.GetRevit3DDrawingAppConfigKey);
       }
    //Update Email
       getChangeEmailForUser() {
           return this.postaction({ Input: "{FormId: 575 }" }, this.editDataUrl);
       }
       UpdateEmailForUser(pageDetails) {
           return this.postaction({ Input: "{ FormId:575,ListReportFieldIdValues:" + pageDetails + "}", }, this.submitEditUrl);
       }
       getClientColumns() {
           return this.postaction({ Input: "{ FormId:" + this.ClientListFormId + " }" }, this.listFieldObjUrl);
       }
       getClienttData(moduleId: string, categorytype: string, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
           return this.postaction({ Input: "{ FormId: " + this.ClientListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\": " + moduleId + " }, {\"ReportFieldId\":6140,\"Value\":\"" + categorytype +"\"}]}" }, this.listDataListUrl);
       }
       loadClientAddEdit(selectedId: number, target: number, categorytype: string) {
           if (target == 1) {
               return this.postaction({ Input: "{ FormId:" + this.ClientListFormId + "}" }, this.addDataUrl);
           }
           else {
               return this.postaction({ Input: "{ FormId:" + this.ClientListFormId + ",ParentFormId:" + this.ClientListFormId + ",Id:" + selectedId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":6140,\"Value\":\"" + categorytype + "\"}]}" }, this.editDataUrl);
           }
       }
       AddUpdateClient(strRptFields: string, selectedId: number, target: number) {
           if (target == 1)//add 
           {
               return this.postaction({ Input: "{FormId:" + this.ClientListFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.ClientListFormId + "}" }, this.submitAddUrl);
           } else {
               return this.postaction({ Input: "{FormId:" + this.ClientListFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.ClientListFormId + "}" }, this.submitEditUrl);
           }

       }
       deleteClient(selectedId: any, moduleId: string) {
           return this.postaction({ Input: "{FormId:" + this.ClientListFormId + ",Id:" + selectedId + ", ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\": " + moduleId + " }]}" }, this.deleteUrl)
       }
       checkActionPointUsersAndUserGroup(selectedId, target) { /* submit update point users */
           return this.postaction({ input: "{ FormId: 007,Id:" + selectedId + "}", target: target }, this.checkActionPointUsersAndUserGroupUrl);
       }
       getSymbolLibrary() {
           return this.postaction({ Input: "{ FormId: " + this.AddSymbolformid + " }" }, this.listFieldObjUrl);
       }
       viewDWGdata(fileData) {
          return this.postaction({ Input: "{ FormId:" + this.AddSymbolformid + " }", FileInput: JSON.stringify(fileData) }, this.ViewDWGfile);
       }
       AddSymbolFields() {
           return this.postaction({ Input: "{ FormId: " + this.AddSymbolfeilds + " }" }, this.listFieldObjUrl);
       }
       AddingSymbol(strRptFields: string) {
           debugger
           return this.postaction({ Input: "{FormId:" + this.AddSymbolfeilds + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.InsertSymbolToLibrary);
       }
       AssignSymbolFeilds() {
           return this.postaction({ Input: "{FormId:" + this.AssignSymbolFormId + "}" }, this.listFieldObjUrl);
       }
       loadModuleddl(parentFieldId: number, parentId: number) {
           return this.postaction({ Input: "{FormId:" + this.AssignSymbolFormId + ",Id:" + parentId + ",ParentFieldId:" + parentFieldId + ", ListReportFieldIdValues: [{ \"ReportFieldId\":112,\"Value\": " + parentId + " }]}" }, this.lookupUrl);
       }

       UpdateAssignSymbol(strRptFields: string) {
           return this.postaction({ Input: "{FormId:" + this.AssignSymbolFormId + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.submitAddUrl);
       
       }
       loadCheckBoxDataSort(strRptFields: string, pageIndex?: number, sortCol?: string, sortDir?: string) {
           return this.postaction({ Input: "{FormId:" + this.AssignSymbolFormId + ",ListReportFieldIdValues:" + strRptFields + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex +"}" }, this.listDataListUrl);
       }
}