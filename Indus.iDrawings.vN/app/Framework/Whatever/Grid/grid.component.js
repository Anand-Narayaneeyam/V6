/// <reference path="../contextmenu/gridcontextmenu.component.ts" />
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
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var wijGrid = require('wijmo/wijmo.angular2.grid');
var wjNg2Core = require('wijmo/wijmo.angular2.core');
var validation_service_1 = require('../../Models/Validation/validation.service');
var stringtextbox_component_1 = require('../../Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var checkboxcomponent_component_1 = require('../../Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var dropdownlistcomponent_component_1 = require('../../Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var datecomponent_component_1 = require('../../Whatever/DynamicControls/DynamicFields/datecomponent.component');
var datetimecomponent_component_1 = require('../../Whatever/DynamicControls/DynamicFields/datetimecomponent.component');
var listboxcomponent_component_1 = require('../../Whatever/DynamicControls/DynamicFields/listboxcomponent.component');
var textareacomponent_component_1 = require('../../Whatever/DynamicControls/DynamicFields/textareacomponent.component');
var General_1 = require('../../../Models/Common/General');
var general_service_1 = require('../../../models/common/general.service');
var gridcontextmenu_component_1 = require('../contextmenu/gridcontextmenu.component');
var GridComponent = (function () {
    function GridComponent(validate, genFun, genSerFun) {
        this.validate = validate;
        this.genFun = genFun;
        this.genSerFun = genSerFun;
        this.refreshgrid = [];
        this.validationMessageArray = []; /* for validation in edit*/
        this.currentSelectedId = null; /* for identify current Id for edit mode*/
        this.secondItem = ""; /* for checking mutiple delete scenario*/
        this.newRowAddCkeck = false; /* for  checking new row added */
        this.onSorting = new core_1.EventEmitter();
        this.onRowUpdate = new core_1.EventEmitter();
        this.onRowDelete = new core_1.EventEmitter();
        this.onRowAdd = new core_1.EventEmitter();
        this.onSelectionChanging = new core_1.EventEmitter();
        this.onColValClick = new core_1.EventEmitter();
        this.ddlChangeFrmGrid = new core_1.EventEmitter();
        this.onCellEdit = new core_1.EventEmitter();
        this.isCellValidationError = new core_1.EventEmitter();
        this.onCellBeginEdit = new core_1.EventEmitter();
        this.onContextMenuOnClick = new core_1.EventEmitter();
        this.istabkey = false;
        this.isanykey = false;
        this.contextMenuVisibility = false;
        this.contextMenuData = [];
        this.gridCURDEvents = function (event, sender, funTarget) {
            this._gridEdit.gridEditEvents(event, sender, funTarget);
        };
        this.validationData = validate.initializeService(undefined);
    }
    GridComponent.prototype.ngOnChanges = function (changes) {
        if (changes["arrHighlightRowIds"] && changes["arrHighlightRowIds"]["currentValue"]) {
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
    };
    GridComponent.prototype.ngAfterViewInit = function () {
        var contextobj = this;
        var whichkey;
        if (this.flex) {
            this.setTooltip();
            this.setcheckBoxState();
            if (contextobj.flex.hostElement) {
                //contextobj.flex.select(1, 1);
                contextobj.flex.hostElement.addEventListener('keydown', function (event) {
                    contextobj.isanykey = true;
                    if (event.which == 9) {
                        //event.preventDefault();
                        contextobj.istabkey = true;
                        if (contextobj.CurrentSelection)
                            contextobj.flex.select(contextobj.CurrentSelection, true);
                        var RootClass = document.getElementsByClassName("focusgrid");
                        if (RootClass && RootClass.length > 0) {
                            setTimeout(function () {
                                contextobj.flex.hostElement.removeAttribute("tabIndex");
                                RootClass[(RootClass.length - 1)].tabIndex = 0;
                                RootClass[(RootClass.length - 1)].focus();
                            }, 200);
                        }
                    }
                    else if (event.which == 13) {
                        event.preventDefault();
                        if (contextobj.CurrentSelection)
                            contextobj.flex.select(contextobj.CurrentSelection, true);
                        if (contextobj.columns[contextobj.flex.selection.col] && contextobj.columns[contextobj.flex.selection.col].isContentHtml == 'hyperlink') {
                            contextobj.colValClick(contextobj.columns[contextobj.flex.selection.col].FieldLabel, contextobj.flex.rows[contextobj.flex.selection.row]._data);
                        }
                    }
                });
            }
        }
        if (this.properties.showContextMenu == undefined || this.properties.showContextMenu == null)
            this.properties.showContextMenu == false;
        this.contextMenuData.push({ menuId: 1, menuName: "Row Count" }, { menuId: 2, menuName: "Selected Row Count" }, { menuId: 3, menuName: "Show Unique" }, { menuId: 4, menuName: "Show Duplicate" }, { menuId: 5, menuName: "Show Aggregate" });
        if (this.properties.hideContextMenuIds != undefined && this.properties.hideContextMenuIds != null && this.properties.hideContextMenuIds.length > 0) {
            var index;
            for (var _i = 0, _a = this.properties.hideContextMenuIds; _i < _a.length; _i++) {
                var item = _a[_i];
                index = this.contextMenuData.findIndex(function (el) { return el.menuId == item; });
                if (index != -1)
                    this.arrHighlightRowIds.splice(index, 1);
            }
        }
        this.gridElement = document.getElementById("gridmainDiv");
    };
    GridComponent.prototype.gridfocusout = function (event) {
        var ParentElement;
        var RootClass;
        var contextobj = this;
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
    };
    GridComponent.prototype.ChangeCellLabel = function () {
        var contextobj = this;
        var RootClass;
        var FocusClass = $("[wj-part='focus']");
        if (FocusClass && FocusClass.length > 0)
            FocusClass[(FocusClass.length - 1)].removeAttribute("tabIndex");
        RootClass = contextobj.flex.hostElement.getElementsByClassName("wj-cell");
        if (RootClass && contextobj.columns && RootClass.length > 0) {
            length = RootClass.length;
            for (var i = 0; i < length; i++) {
                RootClass[i].removeAttribute("tabIndex");
            }
        }
    };
    GridComponent.prototype.ChangeFocusLabel = function (e) {
        if (this.flex && this.flex.hostElement) {
            var ParentElement;
            var RootClass;
            ParentElement = this.flex.hostElement.parentElement;
            this.flex.hostElement.setAttribute('aria-label', ' ');
            if (ParentElement)
                RootClass = ParentElement.getElementsByClassName("endgrid");
            //var RootClass: any = document.getElementsByClassName("endgrid");
            var currentfocus = this.flex.hostElement;
            var label;
            if (RootClass && RootClass.length > 0) {
                var length = RootClass.length;
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
    };
    GridComponent.prototype.validateMessage = function (event) {
    };
    GridComponent.prototype.onBlur = function (cell) {
    };
    GridComponent.prototype.itemsSourceChangedHandler = function () {
        var flex = this.flex;
        if (!flex) {
            return;
        }
        flex.rows.defaultSize = 22;
        this.setColumResizeonLoad();
        this.isCheckAllcheck();
        this.getSelectedIds(1);
        this.setGroups();
    };
    GridComponent.prototype.onSelectionChanged = function (e) {
        if (this.flex) {
            this.getSelectedIds(2);
            if (e.panel.grid._alAddNew == false) {
                this.onSelectionChanging.emit({ "rowdata": this.dataSource[e.row], "keyvalue": this.properties.selectedIds });
            }
            if (!this.istabkey && this.columns) {
                var contextobj = this;
                setTimeout(function () {
                    if (contextobj.isanykey) {
                        contextobj.ChangeFocusLabel(e);
                        contextobj.isanykey = false;
                    }
                }, 200);
            }
        }
    };
    GridComponent.prototype.onSelnChanging = function (e, fieldObject) {
        this.CurrentSelection = this.flex.selection;
        if (fieldObject) {
            if (fieldObject[e.col] && fieldObject[e.col].isContentHtml && fieldObject[e.col].isContentHtml != 'hyperlink') {
                this.colValClick(fieldObject[e.col].FieldLabel, e.panel.rows[e.row]._data);
            }
        }
    };
    GridComponent.prototype.onUpdatedLayout = function (e) {
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
    };
    GridComponent.prototype.sortingColumn = function (event) {
        if (this.properties.isClientSort != true) {
            event.cancel = true;
            var sortCol = this.properties.sortCol;
            var sorDir = "ASC";
            var colName = event.panel.columns[event.col].binding;
            if (sortCol == ("[" + colName + "]")) {
                sorDir = this.properties.sortDir;
                this.properties.sortDir = (sorDir == "ASC") ? "DESC" : "ASC";
            }
            else {
                this.properties.sortDir = sorDir;
                this.properties.sortCol = "[" + colName + "]";
            }
            var hdrlen = event.panel._e.children.length;
            var hdrColms = event.panel._e.children;
            for (var i = 0; i < hdrlen; i++) {
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
    };
    GridComponent.prototype.setColumResizeonLoad = function () {
        if (this.flex) {
            if (this.properties.isautosizecolms != false) {
                this.flex.columnHeaders.columns.minSize = 150;
                this.flex.autoSizeColumns();
            }
        }
    };
    GridComponent.prototype.getSelectedIds = function (target) {
        var dataKey = this.properties.dataKey;
        var selRows = this.flex.selectedRows;
        var selecIds = new Array();
        var arrselRowData = new Array();
        var selCount = this.flex.selectedItems.length;
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
    };
    GridComponent.prototype.mapDataType = function (dataType) {
        var mapType = 1; /*string*/
        switch (dataType) {
            case 5: /*Integer*/
            case 4:
                mapType = 1; /* mapType = 2;*/
                break;
            case 2: /*date*/
            case 3: /*datetime*/
            case 8:
                mapType = 1;
                break;
            case 1:
                mapType = 3;
                break;
            case 7:
                break;
        }
        return mapType;
    };
    GridComponent.prototype.mapFormat = function (dataType) {
        var format = ""; //string
        switch (dataType) {
            case 4:
                format = "n2"; //"n2"
                break;
        }
        return format;
    };
    GridComponent.prototype.mapClassBasedType = function (dataType) {
        var className = ""; //string
        switch (dataType) {
            case 5: //integer                
            case 4:
                className = "numeric-col";
                break;
        }
        return className;
    };
    GridComponent.prototype.setGroups = function () {
        var groupBy = this.properties.groupBy;
        if ((groupBy != undefined) && (groupBy.length > 0)) {
            var length = groupBy.length;
            for (var i = 0; i < length; i++) {
                var gd = new wijmo.collections.PropertyGroupDescription(groupBy[i], function (item, prop) {
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
    };
    GridComponent.prototype.setTooltip = function () {
        var flex = this.flex;
        var tip = new wijmo.Tooltip(), rng = null;
        var gridComponent = this;
        // monitor the mouse over the grid
        flex.hostElement.addEventListener('mousemove', function (evt) {
            var ht = flex.hitTest(evt);
            if (!ht.range.equals(rng)) {
                // new cell selected, show tooltip
                if (ht.cellType == wijmo.grid.CellType.Cell) {
                    rng = ht.range;
                    var cellElement = document.elementFromPoint(evt.clientX, evt.clientY), cellBounds = flex.getCellBoundingRect(ht.row, ht.col), 
                    // data = flex.getCellData(rng.row, rng.col, true);
                    tipContent = cellElement.textContent;
                    var tooltipElement = document.getElementsByClassName("wj-tooltip")[0];
                    if (cellElement.style.border != "") {
                        //  document.getElementsByClassName();
                        var rowExists = gridComponent.validationMessageArray.some(function (el) { return el.RowNum === ht.row; });
                        var colExists = gridComponent.validationMessageArray.some(function (el) { return el.ColumnNum === ht.col; });
                        if (rowExists == true && colExists == true) {
                            var index = gridComponent.validationMessageArray.findIndex(function (el) { return el.RowNum === ht.row && el.ColumnNum === ht.col; });
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
                    }
                    else {
                        tip.hide(); // cell must be behind scroll bar...
                    }
                }
            }
        });
        flex.hostElement.addEventListener('mouseout', function () {
            tip.hide();
            rng = null;
        });
    };
    GridComponent.prototype.gridMousedown = function (evt) {
        if (evt.button == 2 && this.properties.showContextMenu == true && this.dataSource.length > 0) {
            if (this.gridElement == null || this.gridElement == undefined)
                this.gridElement = document.getElementById("gridmainDiv");
            this.contextMenuXPosition = evt.clientX;
            this.contextMenuYPosition = evt.clientY;
            this.contextMenuVisibility = true;
            var event = document.createEvent("CustomEvent");
            event.initCustomEvent('GridContextMenuEvent', true, true, { 'xPos': this.contextMenuXPosition, 'yPos': this.contextMenuYPosition });
            document.dispatchEvent(event);
        }
    };
    GridComponent.prototype.onContextMenu = function (event, item) {
        event.preventDefault();
    };
    GridComponent.prototype.disableContextMenu = function () {
        this.contextMenuVisibility = false;
        var event = document.createEvent("CustomEvent");
        event.initCustomEvent('GridContextMenuEvent', true, true, { 'xPos': 0, 'yPos': 0 });
        document.dispatchEvent(event);
    };
    GridComponent.prototype.gridOnClick = function (event) {
        if (this.contextMenuVisibility)
            this.disableContextMenu();
    };
    GridComponent.prototype.colValClick = function (colName, rowData) {
        // this.onColValClick.emit({ "linkColName": colName, "linkColValue": colVal[colName], "selRowData": colVal })
        var selectedKeyVal = [];
        if (this.properties.selectedIds.length == 1) {
            this.properties.selectedIds.pop();
        }
        this.properties.selectedIds.push(rowData[this.properties.dataKey]);
        var colVal = rowData[colName];
        this.onColValClick.emit({ colName: colName, colVal: colVal, "selRowData": rowData });
    };
    GridComponent.prototype.checkAllClick = function (sender, flexgrid, col) {
        var dataKey = this.properties.dataKey;
        this.properties.selectedIds = [];
        this.isChecked = sender.currentTarget.checked;
        var items = flexgrid._items;
        flexgrid.beginUpdate();
        for (var i = 0; i < items.length; i++) {
            items[i][col.FieldLabel] = this.isChecked;
            if (sender.checked) {
                this.properties.selectedIds.push(items[i][dataKey]);
            }
        }
        flexgrid.endUpdate();
        this.onCellEdit.emit({ "isHeaderClicked": this.isChecked, "dataSource": this.dataSource });
    };
    GridComponent.prototype.ddlRelationChange = function (event) {
        var context = this;
        context.ddlChangeFrmGrid.emit({
            ddlRelationShipEvent: event
        });
    };
    ;
    GridComponent.prototype.updateFieldValue = function (col, value) {
        if (value) {
            if (col.DataEntryControlId == 4 && col.LookupDetails.LookupValues != null) {
                var selectedlookupValue = col.LookupDetails.LookupValues.find(function (el) { return el.Value === value.trim(); });
                if (selectedlookupValue != null) {
                    col.FieldValue = String(selectedlookupValue.Id);
                }
                else {
                    col.FieldValue = "-1";
                }
            }
            else {
                col.FieldValue = value;
            }
        }
        else {
            if (col.DataEntryControlId == 4) {
                col.FieldValue = "-1";
            }
            else {
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
    };
    GridComponent.prototype.onChangestrInput = function (event, fldObj) {
        fldObj.FieldValue = event.target.value;
    };
    GridComponent.prototype.onBeginEdit = function (e, sender, fieldObjectArray) {
        var _loop_1 = function(colFieldObject) {
            colFieldObject.IsHiddenLabel = true;
            if (colFieldObject.DataEntryControlId == 4) {
                if (colFieldObject.LookupDetails.LookupValues == null) {
                    if (colFieldObject.ParentId > 0) {
                        parentField = fieldObjectArray.find(function (item) { return item.FieldId === colFieldObject.ParentId; });
                        test = this_1.genSerFun.populateHasRelationddl(3, parentField.FormFieldId);
                    }
                }
            }
        };
        var this_1 = this;
        var parentField, test;
        for (var _i = 0, fieldObjectArray_1 = fieldObjectArray; _i < fieldObjectArray_1.length; _i++) {
            var colFieldObject = fieldObjectArray_1[_i];
            _loop_1(colFieldObject);
        }
        this.onCellBeginEdit.emit({ "colfieldObj": fieldObjectArray[e.col], "dataKeyValue": this.currentSelectedId, "dataSource": this.dataSource, "rowData": e.row });
    };
    GridComponent.prototype.onPrepareCellForEdit = function (e, sender, fieldObjectArray) {
        var currentId = this.properties.selectedIds[0];
        if (this.currentSelectedId != currentId) {
            for (var _i = 0, fieldObjectArray_2 = fieldObjectArray; _i < fieldObjectArray_2.length; _i++) {
                var colFieldObject = fieldObjectArray_2[_i];
                if (colFieldObject.FieldValue != "" || colFieldObject.FieldValue != undefined) {
                    colFieldObject.FieldValue = "";
                }
            }
            this.currentSelectedId = currentId;
        }
    };
    GridComponent.prototype.onCellEditEnding = function (e, sender) {
    };
    GridComponent.prototype.onCellEditEnded = function (event, sender, fieldObjectArray) {
        var context = this;
        var message = "";
        var validate = this.validate;
        var gridComponent = this;
        var currentIschecked = false;
        if (this.properties.isHeaderCheckBx == true && fieldObjectArray[event.col].DataEntryControlId == 6) {
            //&& fieldObjectArray[event.col].FieldLabel == "Select All"
            if (sender.getCellData(event.row, event.col) == false) {
                this.isChecked = false;
            }
            else {
                var datasrclen = this.dataSource.length;
                var singlecheck = this.dataSource.filter(function (item) {
                    if (context.currentSelectedId == item["Id"]) {
                        currentIschecked = true;
                    }
                    return item[fieldObjectArray[event.col].FieldLabel] == true;
                });
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
                if (this.fieldObject.IsVisible == true && this.fieldObject.IsEnabled == true) {
                    message = validate.validate(this.fieldObject);
                    if (message != "" && message != undefined) {
                        if (cell.className.indexOf("wj-header") < 0) {
                            cell.style.border = '1px solid red';
                            gridComponent.validationMessageArray.push({ RowNum: r, ColumnNum: c, ValidationMessage: message });
                            gridComponent.isCellValidationError.emit({ "fieldObj": this.fieldObject, "errorMessage": message });
                        }
                    }
                }
            }
        };
        //if (valid) {
        if (fieldObjectArray[event.col].DataEntryControlId == 4) {
            var currentFieldValue = fieldObjectArray[event.col].FieldValue;
            if (currentFieldValue == "-1")
                sender.setCellData(event.row, event.col, "", true);
            else
                sender.setCellData(event.row, event.col, fieldObjectArray[event.col].LookupDetails.LookupValues.find(function (el) { return el.Id === +currentFieldValue; }).Value, true);
        }
        else {
            switch (fieldObjectArray[event.col].GenericDataTypeId) {
                case 5: //Integer
                case 4: //Float 
                case 6:
                    sender.setCellData(event.row, event.col, fieldObjectArray[event.col].FieldValue, true);
                    break;
            }
        }
        //}
        this.onCellEdit.emit({ "colfieldObj": fieldObjectArray[event.col], "dataKeyValue": this.currentSelectedId, "validationMsg": message, "dataSource": this.dataSource, "rowData": event.row, "isChecked": currentIschecked });
    };
    GridComponent.prototype.onRowEditEnding = function (e, sender) {
    };
    GridComponent.prototype.onRowEditEnded = function (event, sender, fieldObjectArray) {
        var validate = this.validate;
        var updateRowDataObjects = [];
        var error = false;
        var index = 0;
        for (var _i = 0, fieldObjectArray_3 = fieldObjectArray; _i < fieldObjectArray_3.length; _i++) {
            var colFieldObject = fieldObjectArray_3[_i];
            /*&& colFieldObject.FieldValue != ""
           if ((colFieldObject.FieldValue != undefined) || (colFieldObject.DataEntryControlId == 5 && colFieldObject.FieldValue == "")) {*/
            if (this.fieldObject)
                this.fieldObject = null;
            /*var index = gridComponent.validationMessageArray.fin dIndex(function (el) { return el.RowNum === ht.row && el.ColumnNum === ht.col });*/
            var fieldvalue = event.panel.getCellData(event.row, index);
            if (colFieldObject.DataEntryControlId == 4) {
                if (fieldvalue && colFieldObject.LookupDetails.LookupValues != null) {
                    colFieldObject.FieldValue = colFieldObject.LookupDetails.LookupValues.find(function (el) { return el.Value === fieldvalue.trim(); }).Id;
                }
                else {
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
            index++;
        }
        if (error == false) {
            if (this.newRowAddCkeck == true) {
                if (updateRowDataObjects.length > 0) {
                    var strRetObj = this.genFun.getFieldValuesAsReportFieldArray(updateRowDataObjects);
                    this.onRowAdd.emit(strRetObj);
                }
                this.newRowAddCkeck = false;
            }
            else {
                this.currentSelectedId = sender.selectedItems[0][this.properties.dataKey];
                if (updateRowDataObjects.length > 0) {
                    var strRetObj = this.genFun.getFieldValuesAsReportFieldArray(updateRowDataObjects);
                    this.onRowUpdate.emit(strRetObj);
                }
            }
        }
    };
    GridComponent.prototype.onRowAdded = function (e, sender) {
        this.newRowAddCkeck = true;
    };
    GridComponent.prototype.onDeletingRow = function (e, sender) {
        e.cancel = true;
        if (this.secondItem == "" || this.secondItem != this.properties.selectedIds[1]) {
            if (this.properties.selectedIds.length > 1)
                this.secondItem = this.properties.selectedIds[1];
            this.onRowDelete.emit(this.properties.selectedIds);
        }
    };
    GridComponent.prototype.manualSelectRow = function () {
        var rowIdsForSelect = this.arrHighlightRowIds;
        var selectedIds = this.properties.selectedIds;
        var dataKey = this.properties.dataKey;
        var dataSrc = this.dataSource;
        //this.flex.select(-1,-1);
        if (rowIdsForSelect != undefined) {
            // if (rowIdsForSelect.length > 0) {                                
            if (dataSrc && this.flex.rows[0] && (dataSrc.length == this.flex.rows.length)) {
                this.flex.rows[0].isSelected = false;
                for (var r = 0; r < dataSrc.length; r++) {
                    if (rowIdsForSelect.indexOf(dataSrc[r][dataKey]) > -1) {
                        this.flex.rows[r].isSelected = true;
                    }
                    else {
                        this.flex.rows[r].isSelected = false;
                    }
                }
                this.getSelectedIds(2);
            }
        }
    };
    GridComponent.prototype.isCheckAllcheck = function () {
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
            }
            else {
                this.isChecked = false;
            }
        }
    };
    GridComponent.prototype.setcheckBoxState = function () {
        this.flex.itemFormatter = function (panel, r, c, cell) {
            if (panel.cellType == wijmo.grid.CellType.Cell) {
                if (panel.columns[c].dataType == 3) {
                    if (cell.children[0]) {
                        cell.children[0].indeterminate = false;
                    }
                }
            }
        };
    };
    GridComponent.prototype.getGridCell = function (r, c, fieldObj) {
        var message = "";
        var isvalid = true;
        // find the cell from its bounding rectangle
        var rc = this.flex.getCellBoundingRect(r, c);
        var cell = document.elementFromPoint(rc.left + rc.width / 2, rc.top + rc.height / 2);
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
    };
    GridComponent.prototype.setSelectioMode = function () {
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
    };
    GridComponent.prototype.contextMenuOnClick = function (event) {
        this.disableContextMenu();
        if (event != false) {
            this.onContextMenuOnClick.emit(event);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GridComponent.prototype, "onSorting", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GridComponent.prototype, "onRowUpdate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GridComponent.prototype, "onRowDelete", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GridComponent.prototype, "onRowAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GridComponent.prototype, "onSelectionChanging", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GridComponent.prototype, "onColValClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GridComponent.prototype, "ddlChangeFrmGrid", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GridComponent.prototype, "onCellEdit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GridComponent.prototype, "isCellValidationError", void 0);
    __decorate([
        core_1.ViewChild('flexgrid'), 
        __metadata('design:type', wijmo.grid.FlexGrid)
    ], GridComponent.prototype, "flex", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GridComponent.prototype, "onCellBeginEdit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GridComponent.prototype, "onContextMenuOnClick", void 0);
    GridComponent = __decorate([
        core_1.Component({
            selector: 'gridView',
            templateUrl: './app/Framework/Views/Grid/grid.html',
            directives: [common_1.CORE_DIRECTIVES,
                wijGrid.WjFlexGrid, wijGrid.WjFlexGridColumn, wijGrid.WjFlexGridCellTemplate, wjNg2Core.WjComponentLoader,
                stringtextbox_component_1.StringTextBoxComponent, dropdownlistcomponent_component_1.DropDownListComponent, checkboxcomponent_component_1.CustomCheckBoxComponent,
                datecomponent_component_1.DateComponent, datetimecomponent_component_1.DateTimeComponent, listboxcomponent_component_1.ListBoxComponent, textareacomponent_component_1.TextAreaComponent, gridcontextmenu_component_1.GridContextMenu
            ],
            providers: [http_1.HTTP_PROVIDERS, validation_service_1.ValidateService, General_1.GeneralFunctions, general_service_1.GeneralService],
            inputs: ['dataSource', 'columns', 'properties', 'arrHighlightRowIds', 'refreshgrid'] /*,
            styleUrls: ['./app/Framework/Views/Grid/wijmo.min.css','./app/Framework/Views/Grid/grid.css']*/
        }), 
        __metadata('design:paramtypes', [validation_service_1.ValidateService, General_1.GeneralFunctions, general_service_1.GeneralService])
    ], GridComponent);
    return GridComponent;
}());
exports.GridComponent = GridComponent;
//# sourceMappingURL=grid.component.js.map