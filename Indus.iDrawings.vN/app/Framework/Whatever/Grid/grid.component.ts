/// <reference path="../contextmenu/gridcontextmenu.component.ts" />

import { Component, EventEmitter, provide, Input, Inject, ViewChild, Output, AfterViewInit, OnChanges, SimpleChange} from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import {NgModel} from '@angular/forms'
import { Http, Response, HTTP_PROVIDERS} from '@angular/http';


import * as wijGrid from 'wijmo/wijmo.angular2.grid';
import * as wjNg2Core from 'wijmo/wijmo.angular2.core'; 
import {IField} from '../../Models/Interface/IField';
import {ValidateService} from '../../Models/Validation/validation.service';
import {StringTextBoxComponent} from  '../../Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import { CustomCheckBoxComponent } from '../../Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { DropDownListComponent } from '../../Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { DateComponent } from '../../Whatever/DynamicControls/DynamicFields/datecomponent.component';
import { DateTimeComponent } from '../../Whatever/DynamicControls/DynamicFields/datetimecomponent.component';
import { ListBoxComponent } from '../../Whatever/DynamicControls/DynamicFields/listboxcomponent.component';
import { TextAreaComponent } from '../../Whatever/DynamicControls/DynamicFields/textareacomponent.component'
import { IGrid } from '../../Models/Interface/IGrid';
import { GeneralFunctions } from '../../../Models/Common/General';
import { GeneralService } from '../../../models/common/general.service';
import {GridContextMenu } from '../contextmenu/gridcontextmenu.component';





@Component({
    selector: 'gridView',
    templateUrl: './app/Framework/Views/Grid/grid.html',
    directives: [CORE_DIRECTIVES,
        wijGrid.WjFlexGrid, wijGrid.WjFlexGridColumn, wijGrid.WjFlexGridCellTemplate, wjNg2Core.WjComponentLoader,
        StringTextBoxComponent,  DropDownListComponent, CustomCheckBoxComponent,
        DateComponent, DateTimeComponent, ListBoxComponent, TextAreaComponent, GridContextMenu 
    ],
    providers: [HTTP_PROVIDERS, ValidateService, GeneralFunctions, GeneralService],
    inputs: ['dataSource', 'columns', 'properties', 'arrHighlightRowIds', 'refreshgrid']/*,
    styleUrls: ['./app/Framework/Views/Grid/wijmo.min.css','./app/Framework/Views/Grid/grid.css']*/

})

export abstract class GridComponent implements AfterViewInit {
    isChecked: boolean;
   
    dataSource: any;  
    arrHighlightRowIds;
    refreshgrid = [];
    columns: IField[];
    properties: IGrid;
    fieldObject: IField;    
    validationMessageArray: ValidationMessage[] = [];/* for validation in edit*/
    currentSelectedId: number = null; /* for identify current Id for edit mode*/
    secondItem: string = "";/* for checking mutiple delete scenario*/
    newRowAddCkeck: boolean = false;/* for  checking new row added */
    private validationData: any;
    @Output() onSorting = new EventEmitter();
    @Output() onRowUpdate = new EventEmitter();
    @Output() onRowDelete = new EventEmitter();
    @Output() onRowAdd = new EventEmitter();
    @Output() onSelectionChanging = new EventEmitter();
    @Output() onColValClick = new EventEmitter();
    @Output() ddlChangeFrmGrid = new EventEmitter();
    @Output() onCellEdit = new EventEmitter();
    @Output() isCellValidationError = new EventEmitter();
    @ViewChild('flexgrid') flex: wijmo.grid.FlexGrid;
    @Output() onCellBeginEdit = new EventEmitter();
    @Output() onContextMenuOnClick = new EventEmitter();
    CurrentSelection: any;
    istabkey: boolean = false;
    isanykey: boolean = false;
    contextMenuXPosition: number;
    contextMenuYPosition: number;
    contextMenuVisibility: boolean = false;
    contextMenuData: IContextMenu[] = [];
    gridElement: any;
    constructor(private validate: ValidateService, private genFun: GeneralFunctions, private genSerFun: GeneralService) {
        this.validationData = validate.initializeService(undefined);
        

    }
   
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
   
        if (changes["arrHighlightRowIds"] && changes["arrHighlightRowIds"]["currentValue"])  {
            this.manualSelectRow();
          
        }    

        if (changes["refreshgrid"] && changes["refreshgrid"]["currentValue"] && changes["refreshgrid"]["currentValue"].length > 0) {

            if (this.flex) {
                if (this.flex.collectionView != undefined) {
                    this.flex.collectionView.refresh();
                    this.getSelectedIds(2);
                }
            }        
            this.refreshgrid = []; 
        }                       
    }
    
  
    ngAfterViewInit() {  
        var contextobj: any = this;
        var whichkey: any;       
        if (this.flex) {
            this.setTooltip();
            this.setcheckBoxState();  
            if (contextobj.flex.hostElement) { /* 508 Compliance */               
                //contextobj.flex.select(1, 1);
                contextobj.flex.hostElement.addEventListener('keydown', function (event) {   
                    contextobj.isanykey = true;
                    if (event.which == 9) { //|| event.which == 16
                        //event.preventDefault();
                        contextobj.istabkey = true;
                        if (contextobj.CurrentSelection)
                            contextobj.flex.select(contextobj.CurrentSelection, true)
                        var RootClass: any = document.getElementsByClassName("focusgrid");
                        if (RootClass && RootClass.length > 0) {
                            setTimeout(function () {
                                contextobj.flex.hostElement.removeAttribute("tabIndex");
                                RootClass[(RootClass.length - 1)].tabIndex = 0;
                                RootClass[(RootClass.length - 1)].focus();
                            }, 200);
                        }                  
                    }
                    else
                        if (event.which == 13) {
                            event.preventDefault();
                            if (contextobj.CurrentSelection)
                                contextobj.flex.select(contextobj.CurrentSelection, true)
                            if (contextobj.columns[contextobj.flex.selection.col] && contextobj.columns[contextobj.flex.selection.col].isContentHtml == 'hyperlink') {
                                contextobj.colValClick(contextobj.columns[contextobj.flex.selection.col].FieldLabel, contextobj.flex.rows[contextobj.flex.selection.row]._data);
                            }
                        }
                });
            }
        }
        if (this.properties.showContextMenu == undefined || this.properties.showContextMenu == null)
            this.properties.showContextMenu == false; 
        this.contextMenuData.push({ menuId: 1, menuName: "Row Count" }, { menuId: 2, menuName: "Selected Row Count" }, { menuId: 3, menuName: "Show Unique" }, { menuId: 4, menuName: "Show Duplicate" }, { menuId: 5, menuName: "Show Aggregate" })
        if (this.properties.hideContextMenuIds != undefined && this.properties.hideContextMenuIds != null && this.properties.hideContextMenuIds.length > 0) {
            var index;
            for (var item of this.properties.hideContextMenuIds) {
                index = this.contextMenuData.findIndex(function (el) { return el.menuId == item });
                if (index != -1)
                    this.arrHighlightRowIds.splice(index, 1);
            }
        }
        this.gridElement = <HTMLElement>document.getElementById("gridmainDiv");
        
    }
    gridfocusout(event) {/* 508 Compliance */
                
        var ParentElement: any;
        var RootClass: any;
        var contextobj: any = this;
        if (contextobj.flex && contextobj.flex.hostElement) {
            if (contextobj.flex.selectedRows[0] && contextobj.flex.selectedRows[0]._data)
                localStorage.setItem("focusReserv", contextobj.flex.selectedRows[0]._data.RowIndex);
            ParentElement = contextobj.flex.hostElement.parentElement;
            if (ParentElement)
                RootClass = ParentElement.getElementsByClassName("focusgrid");
            contextobj.istabkey = false;
            contextobj.flex.hostElement.tabIndex = 0;
            contextobj.flex.hostElement.setAttribute('aria-label', 'Use arrow keys to navigate through Data List');
            if (RootClass && RootClass.length > 0)
                RootClass[(RootClass.length - 1)].removeAttribute("tabIndex");
        }
    }
    ChangeCellLabel() { /* 508 Compliance */
        var contextobj: any = this;
        var RootClass: any; 
        var FocusClass: any = $("[wj-part='focus']");
        if (FocusClass && FocusClass.length > 0)
            FocusClass[(FocusClass.length - 1)].removeAttribute("tabIndex");
        RootClass = contextobj.flex.hostElement.getElementsByClassName("wj-cell");
        if (RootClass && contextobj.columns && RootClass.length > 0) {
            length = RootClass.length;
            for (var i = 0; i < length; i++) {
                RootClass[i].removeAttribute("tabIndex");
            }
        }        
    }

    ChangeFocusLabel(e) {/* 508 Compliance */
        if (this.flex && this.flex.hostElement) {
            var ParentElement: any;
            var RootClass: any;
            ParentElement = this.flex.hostElement.parentElement;
            this.flex.hostElement.setAttribute('aria-label', ' ');
            if (ParentElement)
                RootClass = ParentElement.getElementsByClassName("endgrid");
            //var RootClass: any = document.getElementsByClassName("endgrid");
            var currentfocus: any = this.flex.hostElement;
            var label: string;
            if (RootClass && RootClass.length > 0) {
                var length: any = RootClass.length;
                label = this.columns[e.col].FieldLabel;
                label = label + ' ' + e.panel.rows[e.row]._data[label];
                RootClass[length - 1].tabIndex = 0;
                RootClass[length - 1].setAttribute('aria-label', label);
                RootClass[length - 1].focus();
                setTimeout(function () {
                    currentfocus.focus();
                    RootClass[length - 1].removeAttribute("tabIndex");
                }, 200);
            }
        }
    }

    validateMessage(event: any) {
      
    }

    onBlur(cell: any) {
     
    }

    gridCURDEvents = function (event, sender, funTarget) { /*gor getting events for grid editing*/
        this._gridEdit.gridEditEvents(event, sender, funTarget)
       
    }



    itemsSourceChangedHandler() {
        var flex = this.flex;
        
        if (!flex) {
            return;
        }
      
        flex.rows.defaultSize = 22;       
        this.setColumResizeonLoad();      
        this.isCheckAllcheck();       
        this.getSelectedIds(1);
        this.setGroups();
      
      
    }
 
    onSelectionChanged(e): void {
        if (this.flex) {
            this.getSelectedIds(2);
            if (e.panel.grid._alAddNew == false) {
              
                this.onSelectionChanging.emit({ "rowdata": this.dataSource[e.row], "keyvalue": this.properties.selectedIds });
            }       
            if (!this.istabkey && this.columns)
            {
                var contextobj: any = this;
                setTimeout(function () {
                    if (contextobj.isanykey)
                    {
                        contextobj.ChangeFocusLabel(e);
                        contextobj.isanykey = false;
                    }
                } , 200);
            }
        }
    }

    onSelnChanging(e, fieldObject) {
        this.CurrentSelection = this.flex.selection;
        if (fieldObject) {
            if (fieldObject[e.col] && fieldObject[e.col].isContentHtml && fieldObject[e.col].isContentHtml != 'hyperlink' ) {             
                this.colValClick(fieldObject[e.col].FieldLabel, e.panel.rows[e.row]._data);
            }
        }        
    }
    onUpdatedLayout(e) { 
        this.ChangeCellLabel(); 
        if (this.dataSource) {
            if (this.properties.isHeaderCheckBx != true && this.dataSource.length > 0) {
                if (this.properties.allowEdit != true) {
                    if (wijmo.Control.getControl('flex')) {                      
                            this.flex.invalidate();
                            this.flex.columnHeaders.columns.minSize = 150;                       
                    }
                }
            }
        }
        
    }
   
    
    sortingColumn(event) {
        if (this.properties.isClientSort != true) {
            event.cancel = true;
            let sortCol = this.properties.sortCol;
            let sorDir = "ASC";
            let colName = event.panel.columns[event.col].binding;

            if (sortCol == ("[" + colName + "]")) {
                sorDir = this.properties.sortDir;
                this.properties.sortDir = (sorDir == "ASC") ? "DESC" : "ASC"
            } else {
                this.properties.sortDir = sorDir;
                this.properties.sortCol = "[" + colName + "]";
            }
            let hdrlen = event.panel._e.children.length
            let hdrColms = event.panel._e.children;
            for (let i = 0; i < hdrlen; i++) {
                if (hdrColms[i].innerText.trim() == colName) {
                    if (hdrColms[i].innerText.trim() != hdrColms[i].innerHTML) {
                        hdrColms[i].innerHTML = hdrColms[i].innerText.trim();
                    }
                    hdrColms[i].innerHTML = (this.properties.sortDir == "ASC") ? hdrColms[i].innerHTML + "&nbsp;<span class='wj-glyph-up' ></span>" :
                        hdrColms[i].innerHTML + "&nbsp;<span class='wj-glyph-down' ></span>";
                    this.onSorting.emit(this.properties);
                    return;
                }
            }
        }              
       
    }
   
    private setColumResizeonLoad() {
        if (this.flex) {
            if (this.properties.isautosizecolms != false) {
                this.flex.columnHeaders.columns.minSize = 150;
                this.flex.autoSizeColumns();  
                  
            }
        }
    }
    private getSelectedIds(target) {
        let dataKey = this.properties.dataKey;
      
        let selRows = this.flex.selectedRows;
        let selecIds = new Array();
        let arrselRowData = new Array();
   
        let selCount = this.flex.selectedItems.length;
        for (var i = 0; i < selCount; i++) {
            if (selRows[i].dataItem) {
                selecIds.push(selRows[i].dataItem[dataKey]);
                arrselRowData.push(selRows[i].dataItem);              
            }
        }
      
        if (selCount == 1)
            this.properties.rowData = selRows[0].dataItem;
        else
            this.properties.rowData = arrselRowData;    
        this.properties.selectedIds = selecIds;
       
    }

    private mapDataType(dataType: number) {
        var mapType =1;/*string*/
        switch (dataType) {
            case 5:/*Integer*/
            case 4:/*Float*/
                mapType = 1; /* mapType = 2;*/
                break;
            case 2:/*date*/
            case 3:/*datetime*/
            case 8:/*dateTimewithsec*/
                    mapType = 1;
                break;
            case 1: /*boolean*/
                mapType = 3;
                break;
            case 7:/*currency*/
                break;
        }
        return mapType;
    }

    private mapFormat(dataType: number) {
        var format = "";//string
        switch (dataType) {
         
            case 4://numeric
                format = "n2"; //"n2"
                break;
            //case 2://date
            //    format = "dd MMM yyyy";
            //case 3:
            //    format = "dd MMM yyyy hh:mm tt"
            //    break;
            //case 8://datetime
            //    format = "dd MMM yyyy hh:mm:ss tt";
            //    break;

        }
        return format;
    }

    private mapClassBasedType(dataType: number) {
        var className = "";//string
        switch (dataType) {
            case 5://integer                
            case 4://numeric
                className = "numeric-col";
                break;
          
        }
        return className;
    }
    private setGroups() {
        let groupBy = this.properties.groupBy;
        if ((groupBy != undefined) && (groupBy.length > 0)) {

            var length = groupBy.length;

            for (var i = 0; i < length; i++) {
                var gd = new wijmo.collections.PropertyGroupDescription(groupBy[i],
                    function (item, prop) {
                 
                    var value = item[prop];  
                    //var chk = document.createElement('input');
                    //chk.type = 'checkbox';
                    //chk.style.marginLeft = '6px';               
                    return value;
                });
                this.flex.collectionView.groupDescriptions.push(gd);
            }
        }

        //this.flex.formatItem.addHandler(function (s, e) {
        //    if (this.flex.rows[e.row] instanceof wijmo.grid.GroupRow) {
        //        wijmo.removeClass(e.cell, 'wj-wrap');
        //    }
        //});

    }

    private setTooltip() {
        var flex = this.flex;

        var tip = new wijmo.Tooltip(),
            rng = null;
        var gridComponent = this;
        // monitor the mouse over the grid
        flex.hostElement.addEventListener('mousemove', function (evt) {
            var ht = flex.hitTest(evt);
            if (!ht.range.equals(rng)) {

                // new cell selected, show tooltip
                if (ht.cellType == wijmo.grid.CellType.Cell) {
                    rng = ht.range;
                    var cellElement = <HTMLElement>document.elementFromPoint(evt.clientX, evt.clientY),
                        cellBounds = flex.getCellBoundingRect(ht.row, ht.col),
                        // data = flex.getCellData(rng.row, rng.col, true);
                        tipContent = cellElement.textContent;
                    var tooltipElement = (<HTMLScriptElement[]><any>document.getElementsByClassName("wj-tooltip"))[0];
                    if (cellElement.style.border != "") {
                        //  document.getElementsByClassName();
                        var rowExists = gridComponent.validationMessageArray.some(function (el) { return el.RowNum === ht.row; });
                        var colExists = gridComponent.validationMessageArray.some(function (el) { return el.ColumnNum === ht.col; });
                        if (rowExists == true && colExists == true) {
                            var index = gridComponent.validationMessageArray.findIndex(function (el) { return el.RowNum === ht.row && el.ColumnNum === ht.col });
                            tooltipElement.style.backgroundColor = "red";
                            tooltipElement.style.color = "white";
                            tipContent = gridComponent.validationMessageArray[index].ValidationMessage;
                        }

                    }
                    else {
                        if (tooltipElement != undefined) {
                            if (tooltipElement.style.backgroundColor == "red") {
                                tooltipElement.style.backgroundColor = "#ffffe5";
                                tooltipElement.style.color = "black";
                            }
                        }
                    }
                    if (cellElement.className.indexOf('wj-cell') > -1) {
                        tip.show(flex.hostElement, tipContent, cellBounds);
                    } else {
                        tip.hide(); // cell must be behind scroll bar...
                    }
                }
            }
        });
        flex.hostElement.addEventListener('mouseout', function () {
            tip.hide();
            rng = null;
        });


    }
    gridMousedown(evt: any) {
        if (evt.button == 2 && this.properties.showContextMenu == true && this.dataSource.length > 0) {
            if (this.gridElement == null || this.gridElement == undefined)
                this.gridElement = <HTMLElement>document.getElementById("gridmainDiv");
            this.contextMenuXPosition = evt.clientX;
            this.contextMenuYPosition = evt.clientY;
            this.contextMenuVisibility = true;
            var event = document.createEvent("CustomEvent");
            event.initCustomEvent('GridContextMenuEvent', true, true,
                { 'xPos': this.contextMenuXPosition, 'yPos': this.contextMenuYPosition });
            document.dispatchEvent(event);
        }
    }
    onContextMenu(event: any, item: any) {
        event.preventDefault();
    }
    disableContextMenu() {
        this.contextMenuVisibility = false;
        var event = document.createEvent("CustomEvent");
        event.initCustomEvent('GridContextMenuEvent', true, true,
            { 'xPos': 0, 'yPos': 0});
        document.dispatchEvent(event);
    }
    gridOnClick(event: any) {

        if (this.contextMenuVisibility)
            this.disableContextMenu();
    }
    private colValClick(colName, rowData) {
       // this.onColValClick.emit({ "linkColName": colName, "linkColValue": colVal[colName], "selRowData": colVal })
        let selectedKeyVal = [];
        if (this.properties.selectedIds.length == 1) {
            this.properties.selectedIds.pop();
        }
        this.properties.selectedIds.push(rowData[this.properties.dataKey]);         
        var colVal = rowData[colName];
        this.onColValClick.emit({ colName, colVal, "selRowData": rowData });
    }

    checkAllClick(sender, flexgrid, col) {   
        let dataKey = this.properties.dataKey;   
        this.properties.selectedIds = [];
        this.isChecked = sender.currentTarget.checked;      
        let items = flexgrid._items;
        flexgrid.beginUpdate(); 
        for (let i = 0; i < items.length; i++) {
            items[i][col.FieldLabel] = this.isChecked;    
            if (sender.checked) {
                this.properties.selectedIds.push(items[i][dataKey])
            }           
        }           
        flexgrid.endUpdate();
        this.onCellEdit.emit({ "isHeaderClicked": this.isChecked, "dataSource": this.dataSource});    
       
    }
    public ddlRelationChange(event: any): void {
        var context = this;
        context.ddlChangeFrmGrid.emit({
            ddlRelationShipEvent: event
        });
    };


   
    updateFieldValue(col: IField, value): IField {// for updating Fieldvalue in Edit mode      
      
        if (value) {
          
            if (col.DataEntryControlId == 4 && col.LookupDetails.LookupValues!=null) {
                var selectedlookupValue = col.LookupDetails.LookupValues.find(function (el) { return el.Value === value.trim(); });
                if (selectedlookupValue != null) {
                    col.FieldValue = String(selectedlookupValue.Id);
                } else {
                    col.FieldValue = "-1";
                }
            } else {
                col.FieldValue = value;
            }
        } else {
            if (col.DataEntryControlId == 4) {
                col.FieldValue = "-1";
            } else {
                col.FieldValue = "";
            }
        }
        col.IsHiddenLabel = true;
        return col;
        /*if (col.DataEntryControlId == 4 && value != "" && value != undefined)
            col.FieldValue = String(col.LookupDetails.LookupValues.find(function (el) { return el.Value === value.trim(); }).Id);
        else if (col.DataEntryControlId == 4 && (value == "" || value == undefined))
            col.FieldValue = "-1";
        else if (value == undefined)
            col.FieldValue = "";
        else
            col.FieldValue = value;*/
       
    }
    onChangestrInput(event, fldObj) {
        fldObj.FieldValue = event.target.value;
    }

  
    onBeginEdit(e, sender, fieldObjectArray: IField[]) {

        for (let colFieldObject of fieldObjectArray) {
            colFieldObject.IsHiddenLabel = true;
            if (colFieldObject.DataEntryControlId == 4) {
                if (colFieldObject.LookupDetails.LookupValues == null) {
                    if (colFieldObject.ParentId > 0) {
                       var  parentField = fieldObjectArray.find(function (item) { return item.FieldId === colFieldObject.ParentId});
                       var test = this.genSerFun.populateHasRelationddl(3, parentField.FormFieldId);
                     
                    }
                }
            }
        }
        this.onCellBeginEdit.emit({ "colfieldObj": fieldObjectArray[e.col], "dataKeyValue": this.currentSelectedId, "dataSource": this.dataSource, "rowData": e.row });    
    }
    onPrepareCellForEdit(e, sender, fieldObjectArray) {    
        var currentId = this.properties.selectedIds[0];
        if (this.currentSelectedId != currentId) {
            for (let colFieldObject of fieldObjectArray) {                       
                if (colFieldObject.FieldValue != "" || colFieldObject.FieldValue != undefined) {
                    colFieldObject.FieldValue = "";
                }
            }
            this.currentSelectedId = currentId;
        }


    }
    onCellEditEnding(e, sender) {
       
    }
    onCellEditEnded(event, sender, fieldObjectArray) {
       
        var context = this;
        var message = "";
        var validate = this.validate;
        var gridComponent = this;
        let currentIschecked = false;
        if (this.properties.isHeaderCheckBx == true && fieldObjectArray[event.col].DataEntryControlId == 6) {
            //&& fieldObjectArray[event.col].FieldLabel == "Select All"
             
            if (sender.getCellData(event.row, event.col)== false){
                this.isChecked = false;
            } else {
                var datasrclen = this.dataSource.length;
                var singlecheck = this.dataSource.filter(function (item) {
                    if (context.currentSelectedId == item["Id"]) {
                        currentIschecked = true;
                    }                                            
                    return item[fieldObjectArray[event.col].FieldLabel] == true; });
                if (datasrclen == singlecheck.length)
                    this.isChecked = true;
                else
                    this.isChecked = false;

            }
        }
      
    
        gridComponent.validationMessageArray = [];
        //var valid = this.getGridCell(event.row, event.col, fieldObjectArray[event.col]);

        this.flex.itemFormatter = function (panel, r, c, cell) {                  
            var tempFieldValue = String(panel.getCellData(r, c)); //to be change
            //var tempFieldValue = null;
            if (fieldObjectArray[c].GenericDataTypeId == 1) {
                if (panel.columns[c].dataType == 3 && cell.children[0]) {
                    cell.children[0].indeterminate = false;
                }
            }
            if (tempFieldValue != "undefined" && tempFieldValue != "null") {
                if (this.fieldObject)
                    this.fieldObject = null;
                this.fieldObject = JSON.parse(JSON.stringify(fieldObjectArray[c]));
                this.fieldObject.FieldValue = tempFieldValue;               
                if (this.fieldObject.IsVisible == true && this.fieldObject.IsEnabled==true ) {
                        message = validate.validate(this.fieldObject);
                        if (message != "" && message != undefined) {
                            if (cell.className.indexOf("wj-header") < 0) {
                                cell.style.border = '1px solid red';
                                gridComponent.validationMessageArray.push({ RowNum: r, ColumnNum: c, ValidationMessage: message });
                                
                                gridComponent.isCellValidationError.emit({ "fieldObj": this.fieldObject,"errorMessage":message});    
                            }
                        }
                    }             

            }
        }  
        //if (valid) {
            if (fieldObjectArray[event.col].DataEntryControlId == 4) {
                var currentFieldValue = fieldObjectArray[event.col].FieldValue;
                if (currentFieldValue == "-1")
                    sender.setCellData(event.row, event.col, "", true);
                else
                    sender.setCellData(event.row, event.col, fieldObjectArray[event.col].LookupDetails.LookupValues.find(function (el) { return el.Id === +currentFieldValue }).Value, true);

            } else {
                switch (fieldObjectArray[event.col].GenericDataTypeId) {

                    case 5://Integer
                    case 4://Float 
                    case 6:
                        sender.setCellData(event.row, event.col, fieldObjectArray[event.col].FieldValue, true);
                     
                        break;
                }
            }
        //}

            this.onCellEdit.emit({ "colfieldObj": fieldObjectArray[event.col], "dataKeyValue": this.currentSelectedId, "validationMsg": message, "dataSource": this.dataSource, "rowData": event.row, "isChecked": currentIschecked });    

    }
    onRowEditEnding(e, sender) {
      

    }
    onRowEditEnded(event, sender, fieldObjectArray) {
        var validate = this.validate;
        var updateRowDataObjects: IField[] = [];
        var error: boolean = false;
        var index = 0;
       
        for (let colFieldObject of fieldObjectArray) {
            /*&& colFieldObject.FieldValue != "" 
           if ((colFieldObject.FieldValue != undefined) || (colFieldObject.DataEntryControlId == 5 && colFieldObject.FieldValue == "")) {*/
                if (this.fieldObject)
                    this.fieldObject = null;                            
                    /*var index = gridComponent.validationMessageArray.fin dIndex(function (el) { return el.RowNum === ht.row && el.ColumnNum === ht.col });*/
                var fieldvalue = event.panel.getCellData(event.row, index);
                    if (colFieldObject.DataEntryControlId == 4 ) {
                        if (fieldvalue && colFieldObject.LookupDetails.LookupValues != null) {
                            colFieldObject.FieldValue = colFieldObject.LookupDetails.LookupValues.find(function (el) { return el.Value === fieldvalue.trim(); }).Id;
                        } else {
                            colFieldObject.FieldValue = "-1";
                        }
                    }
                    else {
                        colFieldObject.FieldValue = fieldvalue;
                    }
               // }
                this.fieldObject = JSON.parse(JSON.stringify(colFieldObject));
                var message = validate.validate(this.fieldObject);
                if (message == "" || message == undefined) {
                    updateRowDataObjects.push(colFieldObject);
                }
                else
                    error = true;
           // }
            index++
        }
        if (error == false) {

            if (this.newRowAddCkeck == true) {
                if (updateRowDataObjects.length > 0) {
                    let strRetObj = this.genFun.getFieldValuesAsReportFieldArray(updateRowDataObjects)
                    this.onRowAdd.emit(strRetObj);
                }
                this.newRowAddCkeck = false;

            }
            else {
                this.currentSelectedId = sender.selectedItems[0][this.properties.dataKey];
                if (updateRowDataObjects.length > 0) {
                    let strRetObj = this.genFun.getFieldValuesAsReportFieldArray(updateRowDataObjects)
                    this.onRowUpdate.emit(strRetObj);
                }
            }

        }
    }
    onRowAdded(e, sender) {
        this.newRowAddCkeck = true;
       
    }
    onDeletingRow(e, sender) {
        e.cancel = true;
        if (this.secondItem == "" || this.secondItem != this.properties.selectedIds[1]) {
            if (this.properties.selectedIds.length > 1)
                this.secondItem = this.properties.selectedIds[1];
            this.onRowDelete.emit(this.properties.selectedIds);
           
        }
    }
   

    manualSelectRow() {
        var rowIdsForSelect = this.arrHighlightRowIds;
        var selectedIds = this.properties.selectedIds;
        var dataKey = this.properties.dataKey
        var dataSrc = this.dataSource;
        //this.flex.select(-1,-1);
        if (rowIdsForSelect != undefined ) {
            // if (rowIdsForSelect.length > 0) {                                
            if (dataSrc && this.flex.rows[0] && (dataSrc.length == this.flex.rows.length)) {     
                    this.flex.rows[0].isSelected = false;                
                    for (var r = 0; r < dataSrc.length; r++) {
                        if (rowIdsForSelect.indexOf(dataSrc[r][dataKey]) > -1) {
                            this.flex.rows[r].isSelected = true;
                        } else {
                            this.flex.rows[r].isSelected = false;   
                        }
                    }
                    this.getSelectedIds(2);
                }
           //}
        }
    }

    isCheckAllcheck() {
     
        if (this.dataSource) {
            var datasrclen = this.dataSource.length;
            if (this.properties.isHeaderCheckBx == true && datasrclen > 0 && this.columns) {
                for (var j = 0; j < this.columns.length; j++) {
                    var colObj = this.columns[j];
                    if (colObj.DataEntryControlId == 6) {
                        var singlecheck = this.dataSource.filter(function (item) {
                            return item[colObj.FieldLabel] == true;
                        });
                        if (datasrclen == singlecheck.length)
                            this.isChecked = true;
                        else
                            this.isChecked = false;
                    }
                }
            } else {
                this.isChecked = false;
            }
        }
    }
    setcheckBoxState() {    
 
        this.flex.itemFormatter= function (panel, r, c, cell) {
            if (panel.cellType == wijmo.grid.CellType.Cell) {
                if (panel.columns[c].dataType == 3) {
                    if (cell.children[0]) {
                        cell.children[0].indeterminate = false;
                    }
                }
            }
        }
    }
    getGridCell(r, c, fieldObj) {
        var message = "";
        var isvalid = true;
        // find the cell from its bounding rectangle
        var rc = this.flex.getCellBoundingRect(r, c);
        var cell = <HTMLElement>document.elementFromPoint(rc.left + rc.width / 2, rc.top + rc.height / 2);

        // make sure this is a regular cell (not a header)
        if (wijmo.hasClass(cell, 'wj-header')) {
            cell = null;
        }



        if (fieldObj.IsVisible == true) {
            message = this.validate.validate(fieldObj);
            if (message != "" && message != undefined) {
                if (cell.className.indexOf("wj-header") < 0) {
                    cell.style.border = '1px solid red';
                    this.validationMessageArray.push({ RowNum: r, ColumnNum: c, ValidationMessage: message });
                    isvalid = false;
                }
            }
        }
        return isvalid;
        //$(cell).addClass("");
    }
    setSelectioMode() {
        var selMode = 5; /*multiple*/
        if (this.properties) {
            switch (this.properties.selectioMode) {
                case "single":
                    selMode = 3;
                    break;
                case "none":
                    selMode = 0;
                    break;
                default:
                    selMode = 5;
                    break;
            }
        }
        return selMode;

    }
    contextMenuOnClick(event: any) {
        this.disableContextMenu();
        if (event != false) {
            this.onContextMenuOnClick.emit(event);
        }
    }
   /* onUpdatedView(e) {

    }

    onResizingCol(e: Event) {


    }
    loadedRows(e) {

    }
    initgrid(flex, e) {

    }

    draggingColumn(event) {

    }
     (updatedView)="onUpdatedView($event)"
                  (resizingColumn)="onResizingCol($event)"
                  (loadedRows)="loadedRows($event)"
                   (initialized)="initgrid(flexgrid,$event)"
      if (changes["gridResize"]) {
            this.flex.initialize({
                itemsSource: this.dataSource
            });

        }*/

    //onKeyPresscolValClick(Keyevent,FieldLabel, item) {
    //    var key = Keyevent.keyCode || Keyevent.which;
    //    if (Keyevent.keyCode == 13 || Keyevent.keyCode == 32) {
            
    //        this.colValClick(FieldLabel, item);
    //    }
    //}
    
}
export interface ValidationMessage {
    RowNum: number;
    ColumnNum: number;
    ValidationMessage: string;
}
export interface IContextMenu {
    menuId: number;
    menuName: string;
}
