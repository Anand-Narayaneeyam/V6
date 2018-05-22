import {Component, OnInit,ChangeDetectorRef} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import {PageComponent} from '../../../Framework/Whatever/Page/page.component'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { UserModulesAccessComponent } from './usermodulesaccess.component';
import { UserDivisionsAccessComponent } from './userdivisionsaccess.component';
import { UserDrawingsAccessComponent } from '../../Common/DrawingDetails/userdrawingsaccess.component';
import { UserReportsAccessComponent} from './userreportsaccess.component';
import { ModuleAdminSettingsComponent } from './moduleadminsettings.component';
import { DivisionAdminSettingsComponent } from './divisionadminsettings.component';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {UserAddEditComponent} from './useraddedit.component';
import {UserResetPwdComponent} from './resetpassword.component';
import {DrawingManagementComponent } from '../../Common/DrawingManagement/drawingmanagement.component';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {ExportToExcel} from '../../../Framework/Models/Export/exporttoexcel.service';
import {MultipleEdit, IMultipleSubmitOutput } from '../../../framework/whatever/multipleedit/multiple-edit.component'
import { CommonService } from '../../../models/common/common.service';
import { Analytics} from '../../common/analytics/analytics.component';
import { IAnalytics} from '../../../models/common/analytics/ianalytics';




@Component({
    selector: 'users',
    templateUrl: './app/Views/Administration/Users/users.component.html',
    directives: [PageComponent, SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        Notification, UserModulesAccessComponent, UserDivisionsAccessComponent, MultipleEdit, DivisionAdminSettingsComponent, searchBox,
        UserDrawingsAccessComponent, UserReportsAccessComponent, ModuleAdminSettingsComponent, ConfirmationComponent, SlideComponent, UserAddEditComponent, UserResetPwdComponent, DrawingManagementComponent, DropDownListComponent, Analytics],
    providers: [CommonService,AdministrationService, HTTP_PROVIDERS, NotificationService, ConfirmationService, GeneralFunctions, ExportToExcel]
})

export class UsersComponent {
    pagePath = "Administration / Users";
    errorMessage: string;
    fieldObject: IField[];    
    fieldDetailsAddEdit: IField[];
    fieldDetailsResetPwd: IField[];
    accessModulesList: IField[];    
    accessDivisionsList: IField[];
    pageTitle: string;
    teamid: number;
    ddlModule: IField;
    isModuleAdmin: boolean;
    isDivisionAdmin: boolean;
    isReportAccesAdmin: boolean;
    chkCountSection: number = 0;
    splitViewTarget: number;
    isModuleAccessPrivilege: boolean;
    isDivisionAccessPrivilege: boolean;
    isDrwgAccessPrivilege: boolean;
    selectedUserIds: any[];
    selectedModuleId: number = -1;
    itemsSource: any[];
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;  
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], sortCol: "[User Name]", sortDir: "ASC", allowAdd: false, allowEdit: false, showContextMenu: true};
    private slideMsg: string = "";
    private slideAction: number = 0;
    selectedUserRoleId: number;
   // loadSearch: any = [{ Id: "", Value: "--Select--" }, { Id: "1", Value: "first" }, { Id: "2", Value: "second" }]

    exportDataSource: any;
    public keyWordLookup: any[];
    advancelookup: IField[];
    advancelookupDefault: IField[];
    KeywordFieldObject: any;
    loadSearch: any;
    filter = "";
    advanceValue = "[]";
    IsKeyWordSearch = 0;
    IsAdvanceSearch = 0;
    showSearchFilter: any;
    isSiteAdmin = false;

    menuData;
    menumock = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": 29
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 30
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
        "privilegeId": 26
        },
        {
            "id": 4,
            "title": "Restore",
            "image": "Restore",
            "path": "Restore",
            "privilegeId": 27
        },
        {
            "id": 5,
            "title": "Reset Password",
            "image": "Reset Password",
            "path": "Reset Password",
            "privilegeId": 29
        },

        {
            "id": 6,
            "title": "Access",
            "image": "Access",
            "path": "Access",
            "privilegeId": 31
        },
        {
            "id": 7,
            "title": "Export",
            "image": "Export",
            "path": "Export",
            "privilegeId": 30
        }
    ];
    position = "top-right";
    showSlide = false;
    slidewidth = 250;   
    enableMenu = [];
    action: string;
    btnName: string;
    featureIds:string = "121,101,214";
    isActiveDirSupptSubscribed: boolean = false;
    isEmailDomainValidation: boolean = false;
    WOUserEnabled: boolean = false;    
    selectedUserRole = 0;
    sessionUserCatId = 0; 
    sessionUserRoleId =0;
    sessionUserId = 0;  
    sectionAccessExpansionStatus = [{ "title": "Module Access", "isExpanded": false }, { "title": "Drawing Access", "isExpanded": false }, { "title": "Division Access", "isExpanded": false }, { "title": "Module Administrator Settings", "isExpanded": false }, { "title": "Division Administrator Settings", "isExpanded": false }, { "title": "Report Access", "isExpanded": false }];
    refreshgrid;

    fieldobj: any = new Array<ReportFieldArray>();
    multipleEditFieldDetails: any;
    expirydate = [];
    activatedate = [];
    status = [];
    roleid = [];
    baseteamenable: boolean = false;
    analyticsInput: IAnalytics = { menuId: 0 };
    showAnalytics: boolean = false;

    constructor(private cdr: ChangeDetectorRef, private exportObject: ExportToExcel,  private administrationService: AdministrationService, private notificationService: NotificationService, private confirmationService: ConfirmationService, private generFun: GeneralFunctions, private commonService: CommonService) {
        var callBack = function (data) {
            contextObj.menuData = data;
        };

        this.fieldobj.push({ //for loading drop down for team
            FieldId: 2559,
            ReportFieldId: 289,
            Value: "1"
        })
        var contextObj = this;
        let rptField = [447, 455, 454];
        let count = rptField.length;
        administrationService.getUsersFieldList().subscribe(function (result) {
           // debugger
            //result["Data"].find(function (item) {
            //    if (rptField.indexOf(item.ReportFieldId) >= 0) {
            //        item.Width = "*";
            //        count--;
            //        if (count == 0) {
            //            return true;
            //        } else {
            //            return false;
            //        }
            //    } else {
            //        return false;
            //    }
            //});

            contextObj.fieldObject = result["Data"];
            //contextObj.loadKeywordSearch(contextObj);
            contextObj.administrationService.getCustomerSubscribedFeatures("189").subscribe(function (customerSettingsData) {
                if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                    contextObj.administrationService.CheckIsSiteLevelUser().subscribe(function (result) {
                        var useracess = contextObj.fieldObject.find(function (item) {
                        return item.ReportFieldId === 8321;
                        });
                        if (result == 1) {
                            useracess.IsVisible = false;
                        }
                        else {
                            useracess.IsVisible = true;
                        }
                    });
                }
                else {
                    var userAcessLvl = contextObj.fieldObject.find(function (item) {
                        return item.ReportFieldId === 8321;

                    });
                    userAcessLvl.IsVisible = false;
                }
            });
            contextObj.administrationService.getCustomerSubscribedFeatures("277").subscribe(function (customerSettingsData) {
                var team = contextObj.fieldObject.find(function (item) { return item.ReportFieldId === 12446 })
                if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                    contextObj.baseteamenable = true;
                    team.IsVisible = true;
                }
                else {
                    contextObj.baseteamenable = false;
                    team.IsVisible = false;
                }

            })
                       
        });
        this.dataLoad(1, contextObj); 
        this.loadKeywordSearch(contextObj);
        this.getCusSubscribedFeatures(contextObj); 
        this.getSessionUserData(contextObj);
        this.administrationService.CheckIsSiteLevelAdmin(0).subscribe(function (result) {
            contextObj.isSiteAdmin = result == 1 ? true : false;

        });
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menumock, callBack, 14, contextObj.administrationService, contextObj.menumock.length)
     
    }

    private getSessionUserData(contextObj) {
        contextObj.administrationService.getSessionData().subscribe(function (data) {           
            var retData = data["Data"];
            contextObj.sessionUserId = retData["UserId"];
            contextObj.sessionUserCatId = retData["UserCategoryId"];  
            contextObj.sessionUserRoleId = retData["UserRoleId"];       

        });
        

    }

    private getCusSubscribedFeatures(contextObj) {

        contextObj.administrationService.getCustomerSubscribedFeatures(contextObj.featureIds).subscribe(function (rt) {
            if (contextObj.generFun.checkForUnhandledErrors(rt)) {
                var customerFeatureobj = rt["Data"];
                for (let i = 0; i < customerFeatureobj.length; i++) {
                    switch (customerFeatureobj[i]["Id"]) {
                        case 121:
                            contextObj.isActiveDirSupptSubscribed = customerFeatureobj[i]["IsSubscribed"];
                            break;
                        case 101:
                            contextObj.WOUserEnabled = customerFeatureobj[i]["IsSubscribed"];
                          
                            break;
                        case 214:
                            contextObj.isEmailDomainValidation = customerFeatureobj[i]["IsSubscribed"];
                            break;
                    }
                }
            }
        });
    }

    public onPageChanged(event: any) {
        var contextObj = this;
        contextObj.pageIndex = event.pageEvent.page;
        contextObj.dataLoad(0, contextObj);
    };
    public onSort(objGrid: any) {
        var contextObj = this;
        contextObj.dataLoad(0, contextObj);
    }
    private dataLoad(target?: number, context?: any) {
        debugger
        context.administrationService.getUsersList(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir, context.filter, context.advanceValue, context.IsKeyWordSearch, context.IsAdvanceSearch).subscribe(function (result) {
            if (target == 1) {
                context.itemsPerPage = result["Data"].RowsPerPage;
                context.totalItems = result["Data"].DataCount;
            }           
            if (context.totalItems > 0) {               
                context.itemsSource = JSON.parse(result["Data"].FieldBinderData);
              
            } else {
                context.notificationService.ShowToaster("No Users exist", 2);
                context.enableMenu = [1];
            }
        });
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.addClick();             
                this.splitViewTarget = 1;
                break;
            case 2:
                if (this.inputItems.selectedIds.length > 1) {
                    this.multipleedit();
                }
                else
                    this.editClick();
                break;
            case 3:
                if (this.inputItems.selectedIds.length > 1)
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                else
                    this.deleteClick();
                break;
            case 4:
                if (this.inputItems.selectedIds.length > 1)
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                else
                    this.restoreClick();
                break;
            case 5:
                if (this.inputItems.selectedIds.length > 1)
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                else {
                    this.splitViewTarget = 2;
                    this.resetPwdClick();
                }
                break;
            case 6:               
             
                if (this.inputItems.selectedIds.length > 1)
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                else {
                    this.pageTitle = undefined;
                    this.splitViewTarget = 3;
                    this.isModuleAdmin = false;
                    this.isDivisionAdmin = false;
                    this.chkCountSection = 0;
                    this.isModuleAccessPrivilege = false;
                    this.isDivisionAccessPrivilege = false;
                    this.isDrwgAccessPrivilege = false;

                    this.userAccessSettings();
                }
                break;
            case 7:
                this.ExportGridData();
                break;
        }
    }
    onSplitViewClose() {
        this.splitViewTarget = -1;
        for (var i = 0; i < this.sectionAccessExpansionStatus.length; i++) {
                this.sectionAccessExpansionStatus[i].isExpanded = false;
        }
    }
    public addClick() {
        this.action = "add";
        this.btnName = "Save";
        var contextObj = this;
        var maxUsersCreated = "";
        var strMaxWorkOrderUser = "";
        this.pageTitle = "New User";
        var showadd = true;;
        this.administrationService.GetMaxUsrCreated().subscribe(function (resultData) {
            maxUsersCreated = resultData["Data"];
            contextObj.administrationService.GetMaxWOUserCreated().subscribe(function (resul) {
                strMaxWorkOrderUser = resul["Data"];

                if (maxUsersCreated == "0") {
                    if (contextObj.sessionUserCatId == 1) {
                        if (strMaxWorkOrderUser == "1") {
                            contextObj.notificationService.ShowToaster("Maximum allowed users for the customer already created, you can add Indus Administrator, Indus User or Work Order User", 2);
                        } else {
                            contextObj.notificationService.ShowToaster("Maximum allowed users for the customer already created, you can add Indus Administrator or Indus User", 2);
                        }
                    } else {
                        if (strMaxWorkOrderUser == "1")
                            contextObj.notificationService.ShowToaster("Maximum allowed users for the customer already created, you can add only Work Order User", 2);
                        else {
                            contextObj.notificationService.ShowToaster("Maximum allowed users already created", 2);
                            showadd = false;
                        }
                    }
                }
                if (strMaxWorkOrderUser == "0") {
                    if (contextObj.sessionUserCatId == 1)
                        contextObj.notificationService.ShowToaster("Maximum allowed Work Order users for the customer already created", 2);
                    else
                        contextObj.notificationService.ShowToaster("Maximum allowed Work Order users already created", 2)
                }
                if (showadd) {
                    contextObj.administrationService.loadUserAddEdit(contextObj.inputItems.selectedIds[0], JSON.stringify(contextObj.fieldobj), 1).subscribe(function (resultData) {

                        contextObj.addEditDataSettings(contextObj, resultData, maxUsersCreated, strMaxWorkOrderUser, "add");
                        contextObj.fieldDetailsAddEdit = resultData["Data"];
                        var team = contextObj.fieldDetailsAddEdit.find(function (item) { return item.ReportFieldId === 12446 })
                        if (contextObj.baseteamenable)
                            team.IsVisible = true
                        else
                            team.IsVisible = false;
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    });
                }
            });
    });
                               
    }

    

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit User";
        var maxUsersCreated = "";
        var strMaxWorkOrderUser = "";
        var contextObj = this;
        var showaddedit = true;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            let selectedRowObj = contextObj.itemsSource.find(function (item) { return item["Id"] === contextObj.inputItems.selectedIds[0] });

            if (contextObj.sessionUserId == contextObj.inputItems.selectedIds[0] && contextObj.isSiteAdmin == true && selectedRowObj["UserRoleId"]<=3) {
                contextObj.notificationService.ShowToaster("Logged-in user cannot be edited", 5);
            } else {
                if (selectedRowObj["StatusId"] == 4) {
                    this.notificationService.ShowToaster("Deleted user cannot be edited", 5);
                }
                else if ((selectedRowObj["StatusId"] == 1) || (selectedRowObj["StatusId"] == 6)) {
                    this.selectedUserRole = selectedRowObj["UserRoleId"];

                    //this.administrationService.GetMaxUserandWO().subscribe(function (resultData) {
                    //    maxUsersCreated = resultData["maxUser"];
                    //    strMaxWorkOrderUser = resultData["maxWOUSer"];
                    contextObj.administrationService.loadUserAddEdit(contextObj.inputItems.selectedIds[0], JSON.stringify(contextObj.fieldobj), 2).subscribe(function (result) {
                        contextObj.addEditDataSettings(contextObj, result, maxUsersCreated, strMaxWorkOrderUser, "edit");
                        contextObj.fieldDetailsAddEdit = result["Data"];
                        var cnt = 2;
                        var rptIdArr = [12446, 8321];
                        contextObj.fieldDetailsAddEdit.find(function (item) {
                            if (rptIdArr.indexOf(item.ReportFieldId) > -1) {
                                cnt--;
                                if (item.ReportFieldId == 12446) {
                                    if (contextObj.baseteamenable)
                                        item.IsVisible = true;
                                    else
                                        item.IsVisible = false;
                                }
                                if (contextObj.selectedUserRole == 1 && item.ReportFieldId == 8321) {
                                    item.FieldValue = "0";
                                    item.IsEnabled = false;
                                }
                              
                            }
                            if (cnt == 0)
                                return true;
                            else
                                return false;
                        })                       
                        if (contextObj.sessionUserId == contextObj.inputItems.selectedIds[0]) {
                            contextObj.fieldDetailsAddEdit.find(function (item) {
                                if (item.ReportFieldId == 452) {
                                    item.IsVisible = false;
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            })
                        }
                        contextObj.splitViewTarget = 1;
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    });
                    // });
                }
                else {
                    this.selectedUserRole = selectedRowObj["UserRoleId"];
                    this.administrationService.GetMaxUserandWO().subscribe(function (resultData) {
                        maxUsersCreated = resultData["maxUser"];
                        strMaxWorkOrderUser = resultData["maxWOUSer"];
                        if (maxUsersCreated == "0") {
                            if (contextObj.selectedUserRole >= 3) {
                                if (strMaxWorkOrderUser == "1") {
                                    if (contextObj.selectedUserRole != 8) {
                                        contextObj.notificationService.ShowToaster("Maximum number of users already exist. You can only change the User Role to Work Order User", 5);
                                    }
                                } else {
                                    contextObj.notificationService.ShowToaster("Maximum number of users already exist. Selected user cannot be edited", 5);
                                    showaddedit = false;

                                }
                            }
                        }
                        //wo user           
                        if (contextObj.selectedUserRole > 3 && strMaxWorkOrderUser == "0" && contextObj.selectedUserRole == 8) {
                            contextObj.notificationService.ShowToaster("Maximum number of Work Order users already exist. Selected user cannot be edited", 5);
                            showaddedit = false;
                        }
                        if (showaddedit) {
                            contextObj.administrationService.loadUserAddEdit(contextObj.inputItems.selectedIds[0], JSON.stringify(contextObj.fieldobj), 2).subscribe(function (result) {
                                contextObj.addEditDataSettings(contextObj, result, maxUsersCreated, strMaxWorkOrderUser, "edit");
                                contextObj.fieldDetailsAddEdit = result["Data"];
                                if (contextObj.sessionUserId == contextObj.inputItems.selectedIds[0]) {
                                    var count = 0;
                                    contextObj.fieldDetailsAddEdit.find(function (item) {
                                         if (item.ReportFieldId == 8321) {
                                             item.IsEnabled = false;
                                             count++;
                                        }
                                        if (item.ReportFieldId == 452) {
                                            item.IsVisible = false;
                                            count++;
                                           
                                        }
                                        if (count == 2)
                                        { return true; }
                                        else {
                                            return false;
                                        }
                                    })
                                }
                                contextObj.splitViewTarget = 1;
                                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                            });
                        }

                    });
                }



            }
        }

    }
    multipleedit() {
        var context = this;
        this.expirydate = [];
        this.activatedate = [];
        this.status = [];
        this.roleid = [];
        var check = 0;
        for (let i = 0; i < context.inputItems.selectedIds.length; i++) {
            let selectedRowObj = context.itemsSource.find(function (item) { return item["Id"] === context.inputItems.selectedIds[i] });
            this.expirydate.push(selectedRowObj["Account Expiry Date"]);
            this.activatedate.push(selectedRowObj["Account Activation Date"]);
            this.status.push(selectedRowObj["StatusId"]);
            this.roleid.push(selectedRowObj["UserRoleId"]);
            if (selectedRowObj["StatusId"] == 4) {
                this.notificationService.ShowToaster("Deleted Users cannot be edited", 5);
                check += 1;
                break;
            }
            //else if (new Date(selectedRowObj["Account Activation Date"]) > new Date(selectedRowObj["Account Expiry Date"])){
            //    this.notificationService.ShowToaster("'Account Activates On' must be earlier than 'Account Expires On'", 5);
            //    check += 1;
            //    break;
            //}

        }
        if (check == 0) {
            this.commonService.getFieldsForMultipleEdit(54).subscribe(function (resultData) {
                context.multipleEditFieldDetails = JSON.parse(resultData);
            })
            this.splitViewTarget = 4;
            context.pageTitle = "Multiple Update";
            context.splitviewInput.showSecondaryView = true;
        }
    }
    onMultipleEditUpdate(event: IMultipleSubmitOutput) {
        // date-1
        //user number-2
        //work order user-3
        var check = 0;
        var maxUsersCreated = "";
        var strMaxWorkOrderUser = "";
        console.log('multiple edit submit', event)
        var context = this;
        for (var item of this.inputItems.selectedIds) {
            event.ReportFieldIdValuesArray.push({ ReportFieldId: 443, Value: item });
        }
        context.administrationService.GetMaxUsrCreated().subscribe(function (resultData) {
            maxUsersCreated = resultData["Data"];
            context.administrationService.GetMaxWOUserCreated().subscribe(function (resul) {
                strMaxWorkOrderUser = resul["Data"]
                if (event["ReportFieldId"] == 455 && new Date(event["NewValue"]) < new Date()) {
                    context.notificationService.ShowToaster("'Account Expires On' must be a future date", 5)
                    check = 1;
                }
                else if (context.expirydate.length > 0 && context.activatedate.length > 0) {
                    for (let i = 0; i < context.expirydate.length; i++) {
                        if (check == 0) {
                            if ((event.ReportFieldId == 455 && new Date(event.NewValue) < new Date(context.activatedate[i])) || (event.ReportFieldId == 454 && new Date(event.NewValue) > new Date(context.expirydate[i]))) {
                                context.notificationService.ShowToaster("'Account Activates On' must be earlier than 'Account Expires On'", 5);
                                check = 1;
                            }
                            else if (event.ReportFieldId == 452 && event.NewValue == "1") {
                                if (maxUsersCreated == "0") {
                                    if (context.roleid[i] > 2 && context.roleid[i] < 8) {
                                        //context.notificationService.ShowToaster("Maximum number of users reached, Users cannot be edited", 5);
                                        check = 2;
                                        break;
                                    }
                                }
                                if (strMaxWorkOrderUser == "0") {
                                    if (context.roleid[i] != 8) {
                                        //context.notificationService.ShowToaster("Maximum number of Work Order users reached, Users cannot be edited", 5);
                                        check = 3;
                                        break;
                                    }
                                }
                                if (new Date(context.expirydate[i]) < new Date()) {
                                    context.notificationService.ShowToaster("'Account Expires On' must be a future date", 5)
                                    check = 1;
                                    break;
                                }

                            }
                            else if (event.ReportFieldId == 452 && event.NewValue != "1") {
                                if (event.ReportFieldIdValuesArray[i + 1].Value == context.sessionUserId) {
                                    context.notificationService.ShowToaster("Status of the logged in User cannot be edited", 5)
                                    check = 4;
                                }
                            }
                        }
                        else
                            break;
                    }
                }
                switch (check) {
                    case 0:
                        context.administrationService.updateMultipleUserData(JSON.stringify(event.ReportFieldIdValuesArray), event.ReportFieldId, event.NewValue).subscribe(function (resultData) {
                            switch (resultData.StatusId) {
                                case 0:
                                    context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                    break;
                                case 1:
                                    context.notificationService.ShowToaster("User details updated", 2);
                                    context.splitviewInput.showSecondaryView = false;
                                    context.dataLoad(1, context);
                                    break;
                                default:
                                    break;

                            }
                        })
                        break;
                    case 2: context.notificationService.ShowToaster("Maximum number of users reached, Users cannot be edited", 5);
                        break;
                    case 3: context.notificationService.ShowToaster("Maximum number of Work Order users reached, Users cannot be edited", 5);
                        break;
                }
            })
        })
    }
   
    private addEditDataSettings(contextObj, resultData, maxUsersCreated, strMaxWorkOrderUser, target) {
        let rptField = [460, 436, 459, 452, 445, 266, 455];
        let count = rptField.length;
        let userRoleId = contextObj.sessionUserRoleId;
        let userCatId = contextObj.sessionUserCatId;
        resultData["Data"].find(function (item) {
            switch (item.ReportFieldId) {
                case 460: //"Change Password on next Login " chkBx
                    if (target == "add") {
                        item.FieldValue = true;
                    } else {
                        item.IsEnabled = true;
                        item.FieldValue = false;
                    }
                    count--;
                    break;
                case 436:  //access privilege rdbtn default checked
                    item.FieldValue = "3";
                    count--;
                    break;
                case 452:  //userstatus
                    if (target == "edit") {
                        item.IsVisible = true;
                    }
                    count--;
                    break;
                case 455: //account expires on
                    if (target == "add") {
                        var d = new Date();
                        d.setFullYear(d.getFullYear() + 1);
                        item.FieldValue = d.toDateString();
                    }
                    count--;
                    break;
                case 445:  //loginname
                    if (target == "edit") {
                        item.IsEnabled = false;
                    }
                    count--;
                    break;
                case 266:  //availability button
                    if (target == "edit") {
                        item.IsVisible = false;
                    }
                    count--;
                    break;

                case 459: //
                    count--

                    if (target == "edit") {
                        maxUsersCreated = "";
                    }

                    if (maxUsersCreated == "0") //allowed no. of users created  Id=10--->Region Administrator
                    {
                        if (userCatId == 1) //Indus Admin
                        {
                            if (contextObj.WOUserEnabled) {
                                if (strMaxWorkOrderUser == "0") {
                                    item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                        return el["Id"] <= 2;
                                    });
                                } else {
                                    var roleid = [1, 2, 8];
                                    item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                        return roleid.indexOf(el["Id"]) > -1;
                                    });
                                }
                            } else {
                                var roleid = [1, 2];
                                item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                    return roleid.indexOf(el["Id"]) > -1;
                                });
                            }
                        } else {
                            if (userRoleId == 3 && contextObj.WOUserEnabled && strMaxWorkOrderUser != "0") {
                                var roleid = [8];
                                item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                    return roleid.indexOf(el["Id"]) > -1;
                                });
                            }

                        }
                    } else {
                        if (userRoleId == 3) {
                            if (contextObj.WOUserEnabled) {
                                if (strMaxWorkOrderUser == "0") {
                                    var roleid = [1, 2, 8];
                                    item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                        return roleid.indexOf(el["Id"]) < 0;
                                    });
                                } else {
                                    var roleid = [1, 2];
                                    item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                        return roleid.indexOf(el["Id"]) < 0;
                                    });
                                }
                            } else {
                                var roleid = [1, 2, 8];
                                item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                    return roleid.indexOf(el["Id"]) < 0;
                                });
                            }

                        } else if (userRoleId == 2) {
                            if (target == "add") {
                                var roleid = [1, 2, 8];
                                item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                    return roleid.indexOf(el["Id"]) < 0;
                                });
                            } else {
                                var roleid = [1, 8];
                                item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                    return roleid.indexOf(el["Id"]) < 0;
                                });
                            }

                        } else {
                            if (contextObj.WOUserEnabled) {
                                if (strMaxWorkOrderUser == "0") {
                                    item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                        return el["Id"] != 8;
                                    });
                                }
                            } else {
                                if (strMaxWorkOrderUser == "0") {
                                    item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                        return el["Id"] != 8;
                                    });
                                }
                            }
                        }
                        if (contextObj.selectedUserRole > 2) {
                            if (contextObj.WOUserEnabled) {
                                if (strMaxWorkOrderUser == "0") {
                                    var roleid = [1, 2, 8];
                                    item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                        return roleid.indexOf(el["Id"]) < 0;
                                    });
                                } else {
                                    var roleid = [1, 2];
                                    item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                        return roleid.indexOf(el["Id"]) < 0;
                                    });
                                }
                            } else {
                                var roleid = [1, 2, 8];
                                item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                    return roleid.indexOf(el["Id"]) < 0;
                                });
                            }

                        } else {
                            if (target != "add") {
                                var roleid = [1, 2];
                                item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                    return roleid.indexOf(el["Id"]) > -1;
                                });
                            }
                        }
                        break;
                    }
            }
            if (count == 0) {
                return true;
            } else
                return false;
        });
    }
 
    public deleteClick() {
        var contextObj = this; 
        let findSrcObj = contextObj.itemsSource.find(function (item) { return item["Id"] === contextObj.inputItems.selectedIds[0] });
        switch (findSrcObj["StatusId"]) {
            case 4:
                contextObj.notificationService.ShowToaster("User already deleted", 2);
                break;
            case 5:
                contextObj.notificationService.ShowToaster("Selected user account has been expired and cannot be deleted", 2);
                break;
            case 6:
                contextObj.notificationService.ShowToaster("Selected user is not activated and cannot be deleted", 2);
                break;
            default:
                if (contextObj.sessionUserId == findSrcObj["Id"]) {
                    contextObj.notificationService.ShowToaster("Logged-in user cannot be deleted", 2);
                } else {
                    contextObj.slideAction = 1;
                    contextObj.slideMsg = "Are you sure you want to delete the selected User? ";
                    contextObj.showSlide = !contextObj.showSlide;
                } 
                break;
        }
                       
    }

    submitReturn(event) {
        let retUpdatedSrc;
        this.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            this.itemsSource = retUpdatedSrc["itemSrc"];
        } else {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.refreshgrid = this.refreshgrid.concat([true]);
        }
        //this.itemsSource = retUpdatedSrc["itemSrc"];
        //this.refreshgrid = this.refreshgrid.concat([true]);
        this.splitViewTarget = -1;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    public restoreClick() {
        var contextObj = this;     
        let findSrcObj = contextObj.itemsSource.find(function (item) { return item["Id"] === contextObj.inputItems.selectedIds[0] });
        switch (findSrcObj["StatusId"]) {
            case 1:
                contextObj.notificationService.ShowToaster("Selected user is active", 2);                
                break;
            case 2:
                contextObj.notificationService.ShowToaster("Selected user is blocked and cannot be restored", 2);                   
                break;         
            case 5:
                contextObj.notificationService.ShowToaster("Selected user account has expired and cannot be restored", 2);
                break;
            case 6:
                contextObj.notificationService.ShowToaster("Selected user is not activated and cannot be restored", 2);
                break;
            case 7:
                contextObj.notificationService.ShowToaster("Selected user is locked and cannot be restored", 2);
                break;
            case 4://deleted
                let maxUsersCreated = ""; 
                let maxWorkOrderUser = "";
                let userRoleId = findSrcObj["UserRoleId"];
                let isWorkOrderUserEnabled = true; //to be check
                let passRestore = true;
                contextObj.administrationService.GetMaxUsrCreated().subscribe(function (resultData) {
                    maxUsersCreated = resultData["Data"];
                    contextObj.administrationService.GetMaxWOUserCreated().subscribe(function (resul) {
                        maxWorkOrderUser = resul["Data"];

                        if (maxUsersCreated == "0") {
                            if (userRoleId > 2 && userRoleId < 8) {
                                contextObj.notificationService.ShowToaster("Maximum number of users already exist. Selected user cannot be restored", 5);
                                passRestore = false;
                            }
                        }
                        if (userRoleId == 8) {
                            if (isWorkOrderUserEnabled) {
                                if (maxWorkOrderUser == "0") {
                                    contextObj.notificationService.ShowToaster("Maximum number of Work Order users already exist.Selected user cannot be restored", 5);
                                    passRestore = false;
                                }
                            }
                            else {
                                contextObj.notificationService.ShowToaster("User can't be restored as WO user-role is disabled", 2);
                                passRestore = false;
                            }
                        }
                        if (passRestore) {
                            contextObj.slideAction = 2;
                            contextObj.slideMsg = "Are you sure you want to restore the selected User? ";
                            contextObj.showSlide = !contextObj.showSlide;
                        }
                    });
                });
                break;
        }     
    }

    public resetPwdClick() {
        var context = this;
        let findSrcObj = context.itemsSource.find(function (item) { return item["Id"] === context.inputItems.selectedIds[0] });
        if (findSrcObj["StatusId"] == 1) {
          //if (this.isEmailDomainValidation) {
                this.administrationService.resetPasswordthroghMail(this.inputItems.selectedIds[0]).subscribe(function (rst) {
                    if (rst["Data"].Message == "Success") {
                        context.notificationService.ShowToaster("Password has been reset and sent to the email address provided", 3);
                    } else
                        context.notificationService.ShowToaster("iDrawings encountered an error while executing your command", 5);
                });
          //} else {
          //      this.administrationService.passwordChangePossible().subscribe(function (rst) {
          //          if (rst["Data"] > 0) {
          //              var retTime = context.GetStringFromMinutes(rst["Data"]);
          //              context.notificationService.ShowToaster("Your password was changed recently. Next change is possible only after " + retTime, 5);
          //          } else {
          //              context.pageTitle = "Reset Password";
          //              context.administrationService.loadResetPassword(context.inputItems.selectedIds).subscribe(function (rstObj) {
                         
          //                  context.fieldDetailsResetPwd = rstObj["Data"];
          //                  context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
          //              });
          //          }
          //      });

          //  }
        } else {
            context.notificationService.ShowToaster("Selected user is not Active, Password cannot be reset", 5);
        }

    }
    private resetPasswordOut(event) {
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }
    private GetStringFromMinutes(min) {
        var retVal = "";
        if( min < 60 ){
            if (min == 1) 
                retVal = min + " minute";
                else
                retVal = min + " minutes";
        }
        else{
            if((min % 60) > 0 ){
                    if((min % 60) < 10 )
                        retVal = Math.floor(min / 60)+ ":0" + (min % 60) + " hours"
                    else
                        retVal = Math.floor(min / 60) + ":" + (min % 60) + " hours"
                }
                else{
                    if ((min / 60) == 1) 
                        retVal = Math.floor(min / 60) + " hour"
                    else
                        retVal  = Math.floor(min / 60) + " hours"
                }
        }
        return retVal;         
    }

    public userAccessSettings() {
        var contextObj = this;
        this.pageTitle = "User Access";
        let findSrcObj = contextObj.itemsSource.find(function (item) { return item["Id"] === contextObj.inputItems.selectedIds[0] });
        let userRoleId = findSrcObj["UserRoleId"];
        this.selectedUserRoleId = userRoleId;
        let statusId = findSrcObj["StatusId"];
        this.teamid = findSrcObj["OrganizationalUnitId"]
        let msgCount = 0;
        //module Access related
        if (userRoleId <= 3 || userRoleId == 9 || userRoleId == 10) {
            msgCount = 1;
            contextObj.notificationService.ShowToaster("Access Privilege settings are not allowed for users having admin privilege", 2);
        } else if (userRoleId == 8) {
            contextObj.notificationService.ShowToaster("Access Privilege settings are not allowed for Work Order Users", 2);
            msgCount = 1;
        } else {
            switch (statusId) {
                case 1:
                    let SASubscribed = true;
                    let isSiteAdmin = true;
                    let isUserUnderSiteAdmin = true;
                    this.chkCountSection++;  //IsUserUnderSiteAdministrator(intUserId)
                    if (SASubscribed && isSiteAdmin) {
                        if (isUserUnderSiteAdmin == false) {
                            contextObj.notificationService.ShowToaster("You do not have privilege for Module Access Settings", 2);
                            msgCount = 1;
                        } else {
                            this.isModuleAccessPrivilege = true;
                        }
                    } else {
                        this.isModuleAccessPrivilege = true;
                    }
                    if (userRoleId == 6)
                    {
                    contextObj.isModuleAdmin = true;
                    }
                    
                   else if (userRoleId == 7) {
                        contextObj.isDivisionAdmin = true;
                    }
                    break;
                case 2:
                    contextObj.notificationService.ShowToaster("Module Access settings are not allowed for blocked users", 2);
                    msgCount = 1;
                break;
                case 4:
                    contextObj.notificationService.ShowToaster("Module Access settings are not allowed for deleted users", 2);
                    msgCount = 1;
                    break;
                case 5: 
                    contextObj.notificationService.ShowToaster("Module Access settings are not allowed for expired users", 2);                  
                    msgCount = 1;
                    break;
                case 6:
                    contextObj.notificationService.ShowToaster("Module Access settings are allowed only for active users", 2);              
                    msgCount = 1;
                    break;
                case 7:
                    contextObj.notificationService.ShowToaster("Module Access settings are not allowed for locked users", 2);                
                    msgCount = 1;
                    break;
               
            }
        }
        //Drwing Access Related
         if (statusId == 1) {
            if (userRoleId == 4 || userRoleId == 6 || userRoleId == 7) {
                this.isDrwgAccessPrivilege = true;
                this.isDivisionAccessPrivilege = true;
                this.chkCountSection++;
                var context = this;
                this.getDrwgAccessddlObj();             
            } else {
                if (msgCount == 0) {
                    contextObj.notificationService.ShowToaster("Drawing Access settings are not allowed  for selected user", 2);
                }
            }
         } else {
             if (msgCount == 0) 
            contextObj.notificationService.ShowToaster("Drawing Access settings are allowed only for active users", 2);        
        }



        //Division Access related 
        //if (statusId == 1) {
        //    if (userRoleId == 4 || userRoleId == 6 || userRoleId == 7) {
        //        this.isDivisionAccessPrivilege = true;
        //    } else {
        //        contextObj.notificationService.ShowToaster("Division Access settings are not allowed  for selected user", 2);      
        //    }
        //} else {
        //    contextObj.notificationService.ShowToaster("Division Access settings are allowed only for active users", 2);        
        //}

      //Module Admin Settings
        //if (statusId == 1){
        //    if (userRoleId >= 3) {
        //        this.isModuleAdmin = true;
        //    } else {
        //        this.isModuleAdmin = false;
        //        contextObj.notificationService.ShowToaster("Module Admin Settings are not allowed  for selected user", 2);
        //    }
        //} else {
        //    this.isModuleAdmin = false;
        //    contextObj.notificationService.ShowToaster("Module Admin Settings are allowed only for active users", 2);
        //}

        //division admin settings
        //if (statusId == 1) {
        //    if (userRoleId == 7) {
        //        this.isDivisionAdmin = true;
        //    } else {
        //        contextObj.notificationService.ShowToaster("Selected User is not a Division Administrator", 2);
        //    }
        //} else {
        //    contextObj.notificationService.ShowToaster("Division Admin Settings is allowed only for active users", 2);
         //}
         if (this.isDrwgAccessPrivilege == true || this.isModuleAccessPrivilege == true || this.isDivisionAccessPrivilege == true)
             this.splitviewInput.showSecondaryView = true;
         else
             this.splitviewInput.showSecondaryView = false;

    }

    private isAnyModuleSelected(event) {
        this.isDrwgAccessPrivilege = event["isModuleAccess"];
        this.isDivisionAccessPrivilege = event["isModuleAccess"];
        if (this.isDrwgAccessPrivilege) {
            this.selectedModuleId = -1;
            this.getDrwgAccessddlObj();
        }
        if (this.isDivisionAccessPrivilege) {
               this.selectedModuleId = -1;
          
        }
    }
    private getDrwgAccessddlObj() {
        var context = this;
        context.administrationService.getUserDrawingAccessModuleddl(context.inputItems.selectedIds).subscribe(function (rst) {
            var remModlArray = [2, 4, 13, 30, 9, 29];            
            rst["Data"][0].LookupDetails.LookupValues = rst["Data"][0].LookupDetails.LookupValues.filter(function (item) { return (item.IsChecked == 1 && remModlArray.indexOf(item.Id) == -1) });
            rst["Data"][0].LookupDetails.LookupValues.find(function (item) {
                if (item.Id == 1 && item.IsChecked == 1) {
                    item.Value = "As Builts";
                    return true;
                } else
                    return false;
            });
            rst["Data"][0].FieldValue = rst["Data"][0].FieldValue == null ? -1 : rst["Data"][0].FieldValue;
            context.ddlModule = rst["Data"][0]; //module ddl

        });

    }

    private drwgAccessModuleChange(event) {

        this.selectedModuleId = event.ChildFieldObject.FieldValue;
    }
    private onSectionExpandChange(obj) {
        for (var i = 0; i < this.sectionAccessExpansionStatus.length; i++) {
            if (this.sectionAccessExpansionStatus[i].title !== obj[1].title) {
                this.sectionAccessExpansionStatus[i].isExpanded = false;
               
            } else {
                this.sectionAccessExpansionStatus[i].isExpanded = true;
            }
        }
    }
    //slide events/////

    okDeleteRestore(event: Event,slideTarget:number) {
        var contextObj = this;     
        contextObj.administrationService.deleteRestoreUser(contextObj.inputItems.selectedIds[0], slideTarget).subscribe(function (resultData) {
            let returnId = resultData["Data"]["ServerId"];
            if (returnId> 0) {
                if (slideTarget == 1) {
                    contextObj.notificationService.ShowToaster("User deleted", 3);
                    contextObj.updateStatus(slideTarget, contextObj, returnId);                 
                } else {
                    contextObj.notificationService.ShowToaster("User restored", 3);
                    contextObj.updateStatus(slideTarget, contextObj, returnId);               
                }
            } else
                contextObj.notificationService.ShowToaster("Failure action", 5);
        });
        
        this.showSlide = !this.showSlide;
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
    ///////end

    public updateStatus(slideTarget, contextObj, returnId) {    
        contextObj.itemsSource.find(function (item) {
            if (item["Id"] == returnId) {
                if (slideTarget == 1) {
                    item["StatusId"] = 4;
                    item["Status"] = "Deleted";
                }
                else {
                    item["StatusId"] = 1;
                    item["Status"] = "Active";
                }             
                return true;
            } else
                return false;
        });
       
        var updatedData = new Array();
        updatedData = updatedData.concat(contextObj.itemsSource); 
        contextObj.itemsSource = updatedData;
    }

    /**************Export ******************/

    private ExportGridData() {
        var context = this;
        var fieldObjectsCopy = context.fieldObject.slice();/*copy of field object  */
        var fileName = "Users";



        if (context.inputItems.selectedIds.length > 1) {
            context.exportDataSource = JSON.stringify(context.inputItems.rowData.slice());
            context.exportObject.ExportData(context.exportDataSource, fieldObjectsCopy, fileName, function (retCode) {
                if (retCode == 0) {
                    context.notificationService.ShowToaster("User data exported", 3);
                }
                else { context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3); }
            });
        }
        else {
            var input = context.administrationService.getUserGridDataExportInput(53, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, fieldObjectsCopy, fileName, context.filter, context.advanceValue, context.IsKeyWordSearch, context.IsAdvanceSearch);
            context.exportObject.ExportDataFromServer(input, 1, fileName, function (retCode) {
                if (retCode == 0)
                    context.notificationService.ShowToaster("User data exported", 3);
                else
                    context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
            });
        }

    }

    /*************************/

    /*Search related */
    private loadKeywordSearch(contextObj) {
        contextObj.administrationService.getCommonKeywordField(430).subscribe(function (resultData) {
            contextObj.KeywordFieldObject = resultData["FieldBinderList"];
            contextObj.keyWordLookup = resultData["FieldBinderList"]
           // contextObj.keyWordLookup = resultData["FieldBinderList"][0].LookupDetails.LookupValues;
        });
    }
    advanceSearch() {
        var contextObj = this;
        if (contextObj.advancelookup == undefined)
            this.administrationService.getCommonAdvnceSearchLookup(431).subscribe(function (resultData) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
                contextObj.administrationService.getCustomerSubscribedFeatures("189").subscribe(function (customerSettingsData) {
                    var newadvance = contextObj.advancelookup;
                    if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                        contextObj.administrationService.CheckIsSiteLevelUser().subscribe(function (result) {
                            if (result == 1) {
                                newadvance = contextObj.advancelookup.filter(function (item) { return item.ReportFieldId != 8321 })
                                contextObj.advancelookup = newadvance;
                            }
                        });
                    }
                    else {
                        newadvance = contextObj.advancelookup.filter(function (item) { return item.ReportFieldId != 8321 })
                        contextObj.advancelookup = newadvance;
                    }
                    contextObj.advancelookup = newadvance;
                    console.log('advance look up fields', contextObj.advancelookup)
                    if (contextObj.advancelookup)
                        contextObj.advancelookupDefault = JSON.parse(JSON.stringify(contextObj.advancelookup));
                    else
                        contextObj.advancelookupDefault = JSON.parse(JSON.stringify(newadvance));
                });
            });
    }

    onloadSearch(event: any) {
        this.filter = event.value;
        this.IsKeyWordSearch = 1;
        this.IsAdvanceSearch = 0;
        this.advanceValue = "[]";
        this.itemsSource = [];
        this.pageIndex = 0;
        var contextObj = this;
        this.dataLoad(1, contextObj);
    }
    Clear(event: any) {
        this.filter = "";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        var contextObj = this;
        contextObj.advancelookup = JSON.parse(JSON.stringify(contextObj.advancelookupDefault));
        this.dataLoad(1, contextObj);
    }
    Submit(event: any) {
        this.filter = "";
        this.advanceValue = event.fieldobject;
        this.showSearchFilter = [];
        if (this.IsSearchSubmit(event)) {
            this.IsKeyWordSearch = 0;
            this.IsAdvanceSearch = 1;
            this.itemsSource = [];
            var contextObj = this;
            this.pageIndex = 0;
            this.dataLoad(1, contextObj);
        } else {
            this.showSearchFilter = this.showSearchFilter.concat(true);
        }
    }
    private IsSearchSubmit(event) {
        var eventObj = JSON.parse(event.fieldobject);
        /*Account Expiry /Account Activation Date field Comparison for between*/
        var isSubmit = true;
        var activaDateObjVal = undefined;
        var expiryDateObjVal = undefined;
        var cnt = 2;
        eventObj.find(function (el) {
            switch (el.ReportFieldId) {
                case 454: //activation date
                    if (el.Value.indexOf('æ') > -1) {
                        activaDateObjVal = el.Value;
                    }
                    cnt--;
                    break;
                case 455: //expiry date
                    if (el.Value.indexOf('æ') > -1) {
                        expiryDateObjVal = el.Value;
                    }
                    cnt--;
                    break;
            }
            if (cnt == 0) {
                return true
            }
            else
                return false
        });
        if (expiryDateObjVal != undefined) {
            var splittedVal = expiryDateObjVal.split('ô')
            if (new Date(splittedVal[1]) > new Date(splittedVal[3])) {
                this.notificationService.ShowToaster("Account expiry To date must be greater than From date", 2);
                isSubmit = false;
            } else {
                if (activaDateObjVal != undefined) {
                    var splittedVal = activaDateObjVal.split('ô')
                    if (new Date(splittedVal[1]) > new Date(splittedVal[3])) {
                        this.notificationService.ShowToaster("Account activation To date must be greater than From date", 2);
                        isSubmit = false;
                    } else {
                        isSubmit = true;
                    }
                } else isSubmit = true;
            }
        } else if (activaDateObjVal != undefined) {
            var splittedVal = activaDateObjVal.split('ô')
            if (new Date(splittedVal[1]) > new Date(splittedVal[3])) {
                this.notificationService.ShowToaster("Account activation To date must be greater than From date", 2);
                isSubmit = false;
            } else {
                isSubmit = true;
            }

        } else
            isSubmit = true;
        return isSubmit;
    }
    /*******************************/


   
    public onUserAdd(event: any) {
        this.administrationService.addUser(event);
        console.log(event, "add");
        this.notificationService.ShowToaster("User added and the password has been sent to the email address", 2);
    }

    public onEdit(event:any)
    {
        console.log("asd", event[0]);
       // this.administrationService.updateUserDetails(event[0]);
        this.notificationService.ShowToaster("User details updated", 3);               
    }

    /*
    SaveAs(event: any) {
        console.log('Entered Save As');
    }
    Delete(event: any) {
        console.log('Entered Delete');
    }
    onSearchSubmit(event: any) {
        console.log('Enetered On Load Search');
    }
    public onAdvancedSearchSubmit(value: any) {
        console.log("search.,..");
    }
    */
    onContextMenuOnClick(event: any) {
        var temp: any = "";
        if (event != undefined && event != null) {
            var rowCount = this.inputItems.selectedIds.length;
            this.analyticsInput.selectedRowCount = rowCount;
            this.analyticsInput.menuId = event['menuId'];
            this.analyticsInput.fieldObject = this.fieldObject;
            this.analyticsInput.selectedIds = temp;
            this.analyticsInput.moduleId = 0;
            this.analyticsInput.pageTarget = 1;
            this.analyticsInput.IsAdvanceSearch = this.IsAdvanceSearch;
            this.analyticsInput.IsKeywordSearch = this.IsKeyWordSearch
            this.analyticsInput.KeywordFilterValue = this.filter;
            this.analyticsInput.AdvanceFilterValue = this.advanceValue;
            this.analyticsInput.FormId = 53;
            this.analyticsInput.ParentFormId = 431;
            this.showAnalytics = true;
        }
    }
    closeAnalytics() {
        this.showAnalytics = false;
    }
}
export interface ReportFieldArray {
    FieldId: number,
    ReportFieldId: number;
    Value: string;
}