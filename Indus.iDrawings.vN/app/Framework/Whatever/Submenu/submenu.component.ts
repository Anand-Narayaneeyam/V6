import {Component, SimpleChange, OnChanges, Input, EventEmitter, Output, OnInit} from '@angular/core'

@Component({
    selector: 'sub-menu',
    templateUrl: 'app/Framework/Views/Submenu/submenu.html',
    styleUrls:['app/Framework/Views/Submenu/SubMenu.css'],
    inputs: ['source', 'count', 'menuIds','selectedId']
})


export class SubMenu implements OnChanges {
    @Input() count: any;
    @Input() menuIds: string[];
    @Input() menuCard: any;
    @Input() selectedId: string[];
    @Input() isVertical: boolean;
    @Input() source: any;
    @Input() textOnRightSide: string;
    @Output() onSubMenuChange = new EventEmitter();
    status: boolean = false;
    focused: boolean = false;
    imagePath(path: string) {
        if (path == "Add") {
            return "Content/Icons/data_addN.png";
        }
        else if (path == "Edit") {
            return "Content/Icons/data_editN.png";
        }
        else if (path == "Edit In Drawing") {
            return "Content/Icons/edit_drawinG.png";
        }
        else if (path == "Attachment") {
            return "Content/Icons/attachmentN.png";
        }
        else if (path == "View") {
            return "Content/Icons/view-drawingN.png"
        }
        else if (path == "Download") {
            return "Content/Layout/download_icon.png"
        }
        else if (path == "Print") {
            return "Content/Icons/printN.png";
        }
        else if (path == "Report") {
            return "Content/Icons/data_reportN.png";
        }
        else if (path == "Delete") {
            return "Content/Icons/data_deleteN.png";
        }
        else if (path == "Access") {
            return "Content/Icons/data_accessN.png";
        }
        else if (path == "Assign Space Standard") {
            return "Content/Icons/assign_spacE.png";
        }
        else if (path == "Users") {
            return "Content/Icons/data_userN.png";
        }
        else if (path == "DisplaySettings") {
            return "Content/Icons/data_display-settingsN.png"
        }
        else if (path == "FieldValues") {
            return "Content/Icons/field-valueN.png";
        }
        else if (path == "UnblockDrawing") {
            return "Content/Icons/unblock_drawing.png";
        }
        else if (path == "Revise") {
            return "Content/Icons/reviseN.png";
        }
        else if (path == "Replace") {
            return "Content/Icons/replaceN.png";
        }
        else if (path == "Revisions") {
            return "Content/Icons/revisionN.png";
        }
        else if (path == "Markups") {
            return "Content/Icons/markupN.png";
        }
        else if (path == "Show Drawing") {
            return "Content/Images/Drawings/show_drawigs.png";
        }
        else if (path == "Show Zoomed") {
            return "Content/Images/Drawings/show_zoomed1.png";
        }
        else if (path == "Reset Password") {
            return "Content/Icons/reset_password1.png";
        }
        else if (path == "Restore") {
            return "Content/Icons/restorE.png";
        }
        else if (path == "Attachments") {
            return "Content/Icons/attachmentN.png";
        }
        else if (path == "Totalize") {
            return "Content/Icons/totalize.png";
        }
        else if (path == "Assign Space") {
            return "Content/Images/Drawings/assign_employee.png";
        }
        else if (path == "Resources") {
            return "Content/Icons/resourcesN.png";
        }
        else if (path == "Outcomes") {
            return "Content/Icons/outcome.png";
        }
        else if (path == "Workflow Settings") {
            return "Content/Icons/workflow_settings.png";
        }
        else if (path == "View") {
            return "Content/Icons/data_editN.png";
        }
        else if (path == "Assign Locations") {
            return "Content/Icons/assign_locatioN.png";
        }
        else if (path == "Show Details") {
            return "Content/Icons/show_detailS.png";
        }
        else if (path == "Drawings") {
            return "Content/Icons/DrawingS.png";
        }
        else if (path == "Procedures") {
            return "Content/Icons/procedureS.png";
        }
        else if (path == "Job Steps") {
            return "Content/Icons/job_stepS.png";
        }
        else if (path == "Safety Steps") {
            return "Content/Icons/safety_stepS.png";
        }
        else if (path == "Associated Equipment Classes") {
            return "Content/Icons/ae_clasS.png";
        }
        else if (path == "WFCategoryAP") {
            return "Content/Icons/set_wf_aP.png";
        }
        else if (path == "RestoreSPP") {
            return "Content/Icons/restorE.png";
        }
        else if (path == "Discard") {
            return "Content/Icons/discarD.png";
        }
        else if (path == "Floor") {
            return "Content/Icons/flooR.png";
        }
        else if (path == "Stack Plans") {
            return "Content/Icons/stack_plaN.png";
        }
        else if (path == "Execute") {
            return "Content/Icons/executE.png";
        }
        else if (path == "SetWFCategoryAP") {
            return "Content/Icons/set-workflow-action-point.png";
        }
        else if (path == "Equipment") {
            return "Content/Icons/equipmentS.png";
        }
        else if (path == "Generate") {
            return "Content/Icons/generate_work_ordeR.png";
        }
        else if (path == "Settings") {
            return "Content/Icons/settingS.png";
        }
        else if (path == "View Stack") {
            return "Content/Icons/view_stacK.png";
        }
        else if (path == "Execute All") {
            return "Content/Icons/execute_alL.png";
        }
        else if (path == "View Details") {
            return "Content/Icons/view_detailS.png";
        }
        else if (path == "Approve") {
            return "Content/Icons/approvE.png";
        }
        else if (path == "Set Workflow Entity Data Fields") {
            return "Content/Icons/set_workflow_entity_data_fieldS.png";
        }
        else if (path == "Export") {
            return "Content/Icons/exportN.png";
        }
        else if (path == "View Report") {
            return "Content/Icons/view_reporT.png";
        }
        else if (path == "Create a Scenario") {
            return "Content/Icons/scenariO.png";
        }
        else if (path == "Renovations") {
            return "Content/Icons/rennovatioN.png";
        }
        else if (path == "Lease Renewal") {
            return "Content/Icons/reneW.png";
        }
        else if (path == "Lease Items") {
            return "Content/Icons/lease_itemS.png";
        }
        else if (path == "Clauses") {
            return "Content/Icons/ClauseS.png";
        }
        else if (path == "Show Data")
        {
            return "Content/Icons/show_datA.png";
        }
        else if (path == "Assign Work Type") {
            return "Content/Icons/Assign_work_TypE.png";
        }
        else if (path == "Review") {
            return "Content/Icons/Review.png";
        }
        else if (path == "Convert to Move Project") {
            return "Content/Icons/convert_to_moveprojecT.png";
        }
        else if (path == "Filter") {
            return "Content/Icons/filteR.png";
        }
        else if (path == "View Stack") {
            return "Content/Icons/View_StacK.png";
        }
        else if (path == "More") {
            return "Content/Icons/moreIconVertical.png";
        }
        else if (path == "Space Planning") {
            return "Content/Icons/moreIconVertical.png";
        }
        else if (path == "Lease Documents") {
            return "Content/Icons/lease_documentS.png";
        }
        else if (path == "Rank Order") {
            return "Content/Icons/rank_ordeR.png";
        }
        else if (path == "Show Report") {
            return "Content/Icons/NeXt.png";
        }
        else if (path == "Save") {
            return "Content/Icons/save.png";
        }
        else if (path == "Save As") {
            return "Content/Icons/saveas.png";
        }
        else if (path == "ActionPoint") {
            return "Content/Images/Drawings/Rectangle.png";
        }
        else if (path == "Outcome") {
            return "Content/Images/Drawings/line.png";
        }
        else if (path == "Pan") {
            return "Content/Icons/show-zoomed.png";
        }
        else if (path == "Select") {
            return "Content/Icons/Select-Space-window.png";
        }
        //else if (path == "Undo") {
        //    return "Content/Images/Drawings/undo.png";
        //}
        //else if (path == "Redo") {
        //    return "Content/Images/Drawings/redo.png";
        //}
        else if (path == "Export to External App") {
            return "Content/Icons/export-to_ext-apP.png";
        }
        else if (path == "Reminder") {
            return "Content/Icons/remindeR.png";
        }
        else if (path == "Copy Request") {
            return "Content/Icons/copy_requestS.png";
        }
        else if (path == "Cancel Request") {
            return "Content/Icons/cancel_RequestS.png";
        }
        else if (path == "Invitee Status") {
            return "Content/Icons/invitee_statuS.png";
        }
        else if (path == "Check In") {
            return "Content/Icons/check-iN.png";
        }
        else if (path == "Check Out") {
            return "Content/Icons/check_ouT.png";
        }
        else if (path == "Create a Scenario") {
            return "Content/Icons/create_scenariO.png";
        }
        else if (path == "Cost Category Rates") {
            return "Content/Icons/cost_category_ratE.png";
        }
        else if (path == "Warranty") {
            return "Content/Icons/warrantY.png";
        }
        else if (path == "Alert") {
            return "Content/Icons/alerT.png";
        }
        else if (path == "Close") {
            return "Content/Icons/closE.png";
        }
        else if (path == "Import from External App") {
            return "Content/Icons/import_from_ext_apP.png";
        }
        else if (path == "Show Workflow") {
            return "Content/Images/Drawings/view_work_floW.png";
        }
        else if (path == "Move Rollback") {
            return "Content/Icons/rollback.png";
        }
        else if (path == "History") {
            return "Content/Icons/history.png";
        }
        else if (path == "Show Trend") {
            return "Content/Icons/showTrend.png";
        }
        else if (path == "Show Forecast") {
            return "Content/Icons/showForecast.png";
        }
        else if (path == "Update") {
            return "Content/Icons/updatE.png";
        }
        else if (path == "Change Password") {
            return "Content/Icons/change_passworD.png";
        }
        else if (path == "Documents") {
            return "Content/Icons/documents_grouP.png";
        }
        else if (path == "AccesstoManyUsers") {
            return "Content/Icons/access_doc_many_userS.png";
        }
        else if (path == "Activate") {
            return "Content/Icons/activatE.png";
        }
        else if (path == "Block") {
            return "Content/Icons/blocK.png";
        }
        else if (path == "Maximize") {
            return "Content/Images/Drawings/Maximize.png";
        }
        else if (path == "Minimize") {
            return "Content/Images/Drawings/Minimize.png";
        }
        else if (path == "lockdrawings") {
            return "Content/Icons/lockDrawing.png";
        }
        else if (path == "Copy Workflow") {
            return "Content/Icons/copy_wF.png";
        }
        else if (path == "Notifications") {
            return "Content/Icons/notificatioN.png";
        }
        else if (path == "Workflow Escalation Notifications") {
            return "Content/Icons/wf_esca_notcaN.png";
        }
        else if (path == "Change Order") {
            return "Content/Icons/change_ordeR.png";
        }
        else if (path == "CreateSymbolSheet") {
            return "Content/Icons/CreateSymbolSheet.png";
        }
        else if (path == "ClearSymbolSheet") {
            return "Content/Icons/clear-symbol-sheet.png";
        }
        else if (path == "SymbolGridOn") {
            return "Content/Icons/create-symbol-grid.png";
        }
        else if (path == "SymbolGridOff") {
            return "Content/Icons/clear-symbol-grid.png";
        }
        else if (path == "CloseSymbolLine") {
            return "Content/Icons/close-symbol-line.png";
        }
        else if (path == "SymbolSnapOn") {
            return "Content/Icons/snap-symbol-grid.png";
        }
        else if (path == "SymbolSnapOff") {
            return "Content/Icons/unsnap-symbol-grid.png";
        }
        else if (path == "UndoSymbolLine") {
            return "Content/Icons/undo-symbol-line.png";
        }
        else if (path == "CreateSymbolText") {
            return "Content/Icons/create-symbol-text.png";
        }
        else if (path == "SaveSymbolFile") {
            return "Content/Icons/save-file.png";
        }
        else if (path == "Milestone") {
            return "Content/Icons/mile_stonE.png";
        }
        else if (path == "Move Employee") {
            return "Content/Images/Drawings/moveemp.png";
        }
      }

    menuClick(obj: any, value: string, name: string) {
        obj.preventDefault();
        this.onSubMenuChange.emit({
            value: value,
            name: name
        })
    /*  if (value.toString().indexOf('_') > -1) {
            this.onSubMenuChange.emit({
                value: parseInt(value.split('_')[1]),
                name: name
            })
        }
        else {
            this.onSubMenuChange.emit({
                value: value,
                name: name
            })
        }*/

    }
    ngOnInit() {
        if (this.isVertical == undefined || this.isVertical == null)
            this.isVertical == false;       
        if (this.textOnRightSide == undefined || this.textOnRightSide == null)
            this.textOnRightSide = undefined;
    }
    ngAfterViewInit() {
        if (this.textOnRightSide != undefined)
            $("#rightSideli").append(this.textOnRightSide);
    }
    checkDisable(menuId: string, image: string) {
      /*  if (menuId != undefined && menuId != null && menuId != "" && menuId != "null") {
            if (menuId.toString().indexOf('_') > -1) {
                menuId = menuId.split('_')[1];
            }
        }*/

        if (this.count == 0 || this.menuCard == true) {
           /* var levelId = (<any>window).SubmenuLevel;
            for (var item of this.menuIds) {
                item = ((1000 + levelId) + "_" + ((item).toString()));
            }
            for (let i = 0; i < this.menuIds.length; i++) {
                this.menuIds[i] = ((1000 + levelId) + "_" + ((this.menuIds[i]).toString()));
            }*/
            this.status = true;
            var enableIds = this.menuIds;
            for (var item in enableIds) {
                if (enableIds[item] == menuId && this.status == true) {
                    this.status = false;
                }
            }
            if (this.selectedId != undefined) {
                if ((image == "Delete" || image == "View" || image == "Download") && this.selectedId.length > 0 && Number(this.selectedId[0]) > 0) {
                    this.status = false;
                }
            }
            return this.status;
        }      
    }

    focusDisable(menuId: string, image: string) {
        if (this.count == 0 || this.menuCard == true) {
            this.status = true;
            var enableIds = this.menuIds;
            for (var item in enableIds) {
                if (enableIds[item] == menuId && this.status == true) {
                    this.status = false;
                }
            }
            if (this.selectedId != undefined) {
                if ((image == "Delete" || image == "View" || image == "Download") && this.selectedId.length > 0 && Number(this.selectedId[0]) > 0) {
                    this.status = false;
                }
            }
            if (this.status == true)
                return -1;
            else (this.status == false)
                return 0;
        }
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        this.source = this.source;
    }   

    showDropDown(e) {
        if (/msie|Trident/.test(navigator.userAgent)) {
            var parent = e.srcElement.parentElement.parentElement;

        }
        else if (/Firefox/.test(navigator.userAgent)) {
            var parent = e.target.closest("ul");

        }
        else {
            var parent = e.srcElement.closest("ul");
        }

        if (parent) {
            if (parent.style.display == "block") {
                parent.style.display = "none";
            }
        }
    }

    HideDropDown(e) {
        if (/msie|Trident/.test(navigator.userAgent)) {
            var parent = e.srcElement.parentElement.parentElement;

        }
        else if (/Firefox/.test(navigator.userAgent)) {
            var parent = e.target.closest("ul");

        }
        else {
            var parent = e.srcElement.closest("ul");
        }

        if (parent) {
            if (parent.style.display == "block") {
                parent.style.display = "none";
            }
        }
    }

    onfocusout(a, b, e) {
        setTimeout(function () {
        if (a == 0) {
            
                e.srcElement.parentElement.parentElement.previousElementSibling.tabIndex = "0";
                if (!e.srcElement.parentElement.parentElement.contains(document.activeElement))
                    e.srcElement.parentElement.parentElement.style.display = "none";
          
        }
        //if (a == b) {
            if (/msie|Trident/.test(navigator.userAgent)) {
                var parent = e.srcElement.parentElement.parentElement;

            }
            else if (/Firefox/.test(navigator.userAgent)) {
                var parent = e.target.closest("ul");

            }
            else {
                var parent = e.srcElement.closest("ul");
            }
            if (!e.srcElement.parentElement.parentElement.contains(document.activeElement))
                if (parent) {
                    if (parent.style.display == "block") {
                        parent.style.display = "none";
                    }
                }

        //}
        }, 100)
    }

    onfocus(e) {
        var RootClass: any = document.activeElement;
            if (RootClass != null) {    
                    RootClass.nextElementSibling.style.display = "block";
                setTimeout(function () {
                    e.srcElement.nextElementSibling.firstElementChild.firstElementChild.focus();
                    /*e.srcElement.parentElement.parentElement.previousElementSibling.tabIndex = "-1";*/
                }, 100);
        } 

        
    }

    onfocusin(a, e) {
        if (a == 0) 
             e.srcElement.parentElement.parentElement.previousElementSibling.tabIndex = "-1";
    }

    onSubmenukeypress(obj: any, value: string, name: string) {
        this.menuClick(obj, value, name);
    }
}