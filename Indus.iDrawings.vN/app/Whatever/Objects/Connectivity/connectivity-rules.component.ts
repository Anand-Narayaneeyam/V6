import { Component, Input, AfterViewInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { IField } from '../../../Framework/Models/Interface/IField'
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component'
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent } from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { ObjectsService } from '../../../Models/Objects/objects.service'
import { ConnectivityRuleAddEdit } from './connectivity-rule-addedit.component';

@Component({
    selector: 'connectivity-rules',
    templateUrl: './app/Views/Objects/Connectivity/connectivity-rules.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        SlideComponent, ConnectivityRuleAddEdit],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService, ObjectsService],
    inputs: ["objectCategoryId"]
})

export class ConnectivityRules implements AfterViewInit {
    action: string;
    btnName: string;
    pageTitle: string;
    fieldDetailsAddEdit: IField[];
    
    enableMenu = [];
    pageIndex: number = 0;
   
    totalItems: number = 0;
    itemsPerPage: number = 0;
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    fieldObject: IField[];
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    refreshgrid;
    pagePath = "";
    showSlide: boolean = false;
    objectCategoryId: any;
    position = "top-right";
    slidewidth = 250;
    slideMessage: string;
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": 5150
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 5150
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "privilegeId": 5150
        }];

    constructor(private objService: ObjectsService, private AdministrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngAfterViewInit() {
        var contextObj = this;
        this.objService.getConnectivityRulesListFields(contextObj.objectCategoryId).subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad(1);
        });
    }

    public dataLoad(target?: number) {
        var contextObj = this;
        contextObj.objService.getConnectivityRulesList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.objectCategoryId).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Connectivity Rules exist", 2);
                contextObj.enableMenu = [1];
            }
        });
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 735, contextObj.AdministrationService, contextObj.menuData.length);
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    }

    public onSort(objGrid: any) {
        this.dataLoad(0);
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.pageTitle = "New Connectivity Rule";
                this.action = "add";
                this.btnName = "Save";
                this.addClick();              
                break;
            case 2:
                this.pageTitle = "Edit Connectivity Rule";
                this.action = "edit";
                this.btnName = "Save Changes";                      
                this.editClick();
                break;
            case 3:
                this.action = "delete";
                this.deleteClick();
                break;
        }
    }
    public addClick() {
        var contextObj = this;         
        contextObj.objService.loadConectivityRulesFieldsAddEditForRelationship(0, 1, contextObj.objectCategoryId).subscribe(function (result) {
            contextObj.getLookupForComponnetType(result["Data"], contextObj);
            //contextObj.objService.getLookupsForFirstSecondComponentType(contextObj.objectCategoryId, 1, 0).subscribe(function (resultData) {
            //    result["Data"].filter(function (el) {
            //        if (el.FieldId == 2605) {
            //            el.LookupDetails.LookupValues = JSON.parse(resultData["Data"]["FieldBinderData"]);
            //            el.FieldValue = "-1";
            //            return true
            //        }
            //        else if (el.FieldId == 2607) {
            //            el.LookupDetails.LookupValues = JSON.parse(resultData["Data"]["FieldBinderData"]);
            //            el.FieldValue = "-1";
            //            return true
            //        } else {

            //            return false;
            //        }
            //    });
            //    contextObj.fieldDetailsAddEdit = (result["Data"]);
            //});
            //contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    }
    public editClick() {
        var contextObj = this;
     
        contextObj.objService.CheckRelationshipRuleInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {            
            if (resultData == 1) {                
                contextObj.notificationService.ShowToaster("Selected Connectivity Rule in use, cannot be updated.", 2);
            }
            else if (resultData == 0) {
               
                if (contextObj.inputItems.selectedIds.length == 0) {
                    contextObj.notificationService.ShowToaster("Select a Connectivity Rule", 2);
                } else if (contextObj.inputItems.selectedIds.length > 1) {
                    contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                } else if (contextObj.inputItems.selectedIds.length == 1)
                {
                    
                    if (contextObj.inputItems.selectedIds[0] != null) {
                        contextObj.objService.loadConectivityRulesFieldsAddEditForRelationship(contextObj.inputItems.selectedIds[0], 2, contextObj.objectCategoryId).subscribe(function (result) {
                            contextObj.getLookupForComponnetType(result["Data"], contextObj);                                                 
                            //contextObj.objService.getLookupsForFirstSecondComponentType(contextObj.objectCategoryId, 1, 0).subscribe(function (resultData) {
                               
                            //    result["Data"].filter(function (el)
                            //    {
                            //        if (el.FieldId == 2605) {                                       
                            //            el.LookupDetails.LookupValues = JSON.parse(resultData["Data"]["FieldBinderData"]);
                                      
                            //            return true
                            //        }
                            //        else if (el.FieldId == 2607) {                                        
                            //            el.LookupDetails.LookupValues = JSON.parse(resultData["Data"]["FieldBinderData"]);
                                       
                            //            return true
                            //        }
                                    
                            //        else {

                            //            return false;
                            //        }

                                    
                                   
                            //    }); 
                                                      
                            //    contextObj.fieldDetailsAddEdit = result["Data"];          
                            //});
                           
                        });
                    }
                }
            }
        });        
    }
    private getLookupForComponnetType(data, contextObj) {
        contextObj.objService.getLookupsForFirstSecondComponentType(contextObj.objectCategoryId, 1, 0).subscribe(function (resultData) {
            var compTypeData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            data.filter(function (el) {
                if (el.FieldId == 2605 || el.FieldId == 2607 ) {
                    el.LookupDetails.LookupValues = compTypeData;
                    if (contextObj.action == "add")
                        el.FieldValue = "-1";    
                    return true
                } else {
                    return false;
                }                           
            });

            contextObj.fieldDetailsAddEdit = data;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    }

    public deleteClick() {
        var contextObj = this;
        contextObj.objService.CheckRelationshipRuleInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {            
            if (resultData == 1) {
                contextObj.showSlide = true;
                contextObj.slideMessage = "Selected Connectivity Rule in use. Are you sure you want to delete the selected Connectivity Rule?";
            }
            else if (resultData == 0) {
                contextObj.showSlide = true;
                contextObj.slideMessage = "Are you sure you want to delete the selected Connectivity Rule?";
            }
        });
    }


    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    public onSplitViewClose(event) {
        if (this.action == "multipleedit") {
            this.dataLoad();
        }
        this.action = '';
        this.splitviewInput.showSecondaryView = false;
    }

    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteConnectivityRule();
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    deleteConnectivityRule() {
        var contextObj = this;
        contextObj.objService.DeleteConnectivityRule(contextObj.inputItems.selectedIds[0], contextObj.objectCategoryId).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems > 0) {
                    contextObj.enableMenu = [1];
                }
                else {
                    contextObj.notificationService.ShowToaster("No Connectivity Rules exist", 2);
                    contextObj.enableMenu = [1];
                }

                contextObj.notificationService.ShowToaster("Selected Connectivity Rule deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Connectivity Rule in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });

    }
    submitReturn(event) {        
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];

        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        } else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }

}