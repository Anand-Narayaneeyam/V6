
import { Component, Input, Output, SimpleChanges, forwardRef, EventEmitter, Inject, SimpleChange, OnChanges, ViewChild, DoCheck, OnInit, ElementRef} from '@angular/core';
import {Directory} from './directory.component';
@Component({
    selector: 'tree-viewforlease',
    templateUrl: './app/Framework/Views/TreeView/treeviewforlease.component.html',
    directives: [TreeViewForLease],
    inputs: ['FieldTable', 'FieldColumn', 'DataKey', 'checkedIds', 'selectionCriteria', 'HideButton', 'isChanged'],
})
export class TreeViewForLease {
    @Input() directories: any;
    @Input() FieldTable;
    @Input() FieldColumn;
    @Input() Fields;
    @Input() checkedIds;
    @Input() DataKey;
    @Input() HideButton: boolean = false;
    @Output() UpdateValues = new EventEmitter();
    @Output() onselection = new EventEmitter();
    @Output() onselectionChild = new EventEmitter();
    isChanged: boolean;
    el: any;
    changeVariable = false;
    selectedIds: any;
    selectedIds2: any;
    @ViewChild('input') inputs;
    selectionCriteria: number = 0;
    showDivBuilding: string = "block";
    showDivFloor: string = "block";

    constructor(elemRef: ElementRef) {
        this.el = elemRef;
    }

    ngOnInit() {
        this.FieldTable;
        this.FieldColumn = this.FieldColumn;
        if (this.selectionCriteria == 1) {
            this.showDivBuilding = "none";
            this.showDivFloor = "none";
        }
        else if (this.selectionCriteria == 2) {
            this.showDivFloor = "none";
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        this.FieldColumn = this.FieldColumn;
        this.FieldTable = this.FieldTable;
        this.checkedIds = this.checkedIds;
        this.DataKey = this.DataKey;
        this.directories = this.directories;
        if (changes["isChanged"] != undefined && changes["isChanged"]["currentValue"] != undefined && changes["isChanged"]["currentValue"] != changes["isChanged"]["previousValue"]) {
            this.onSubmit();
        }
    }

    filterTable(Value: any, clmnName: any, clmId: any) {
        return Value.filter(function (el) {
            if (el[clmnName] == clmId)
                return true;
            else
                return false;
        });
    }

    isChecked(Value: any) {
        var chk;
        var datakeyName = this.DataKey;
        var columnName = this.FieldColumn.clmn3[0];
        if (this.checkedIds == undefined)
            return false;
        else {
            chk = this.checkedIds.filter(function (el) {
                if (el[datakeyName] == Value[columnName])
                    return true;
                else
                    return false;
            });
            if (chk.length > 0)
                return true;
            else
                return false
        }
    }

    isCheckedBuilding(Value: any) {
        var chk;
        var datakeyName = this.DataKey;
        var columnName = this.FieldColumn.clmn2[0];
        if (this.checkedIds == undefined)
            return false;
        else {

            if (Value == 0) {
                return false;
            }
            else {
                return true;
            }
            //chk = this.checkedIds.filter(function (el) {
            //    if (el[datakeyName] == Value[columnName])
            //        return true;
            //    else
            //        return false;
            //});
            //if (chk.length > 0)
            //    return true;
            //else
            //    return false
        }
    }

    checkSelectAllstate() {
        var context = this;
        var state = true;
        var lengthsidenavselectAll = context.el.nativeElement.getElementsByClassName("Level1Chk").length;
        if (context.FieldTable[0].Table1.length == 0)
            state = false;
        for (var count = 0; count < lengthsidenavselectAll; count++) {
            if (context.el.nativeElement.getElementsByClassName("Level1Chk")[count].checked != true) {
                state = false;
                break;
            }
        }
        return state;
    }

    checkSelectAll(value: string, level: any) {
        var check = false;
        if (this.FieldTable == undefined || this.FieldTable == null) {
            check = false;
            return check;
        }
        if (this.FieldTable[0].Table1.length == 0) {
            check = false;
            return check;
        }
        if (level == 1)
            value = "2nd-" + value;
        else if (level == 0)
            value = "Level1Chk";
        else
            value = "3rd-" + value;
        var lengthsidenav = this.el.nativeElement.getElementsByClassName(value).length
        for (var count = 0; count < lengthsidenav; count++)
            if (this.el.nativeElement.getElementsByClassName(value)[count].checked != true) {
                check = false;
            }
        this.changeVariable = !this.changeVariable;
        return check;
    }

    oncheck(value: any, event: any, level: any) {
        var newValue = true;
        if (event.currentTarget.checked == false)
            newValue = false;
        var newid = "";
        if (level == 1)
            newid = "2nd-" + value;
        else if (level == 0)
            newid = "Level1Chk";
        else
            newid = "3rd-" + value;
        if (level != 3) {
            var lengthsidenav = this.el.nativeElement.getElementsByClassName(newid).length
            for (var count = 0; count < lengthsidenav; count++) {
                this.el.nativeElement.getElementsByClassName(newid)[count].checked = newValue;
            }
        }
        if (level == 0) {
            for (var k = 0; k < this.FieldTable[0].Table2.length; k++) {
                lengthsidenav = this.el.nativeElement.getElementsByClassName("3rd-" + this.FieldTable[0].Table2[k][this.FieldColumn.clmn2[0]]).length
                for (var count = 0; count < lengthsidenav; count++) {
                    this.el.nativeElement.getElementsByClassName("3rd-" + this.FieldTable[0].Table2[k][this.FieldColumn.clmn2[0]])[count].checked = newValue;
                }
            }
        }
        if (level == 1) {
            var Id = this.FieldColumn.clmn1[0];
            var native = this.el.nativeElement;
            var filterData = this.FieldTable[0].Table2.filter(function (el) {
                if (el[Id] == value)
                    return true;
                else
                    return false;
            });
            for (var k = 0; k < filterData.length; k++) {
                lengthsidenav = this.el.nativeElement.getElementsByClassName("3rd-" + filterData[k][this.FieldColumn.clmn2[0]]).length
                for (var count = 0; count < lengthsidenav; count++) {
                    this.el.nativeElement.getElementsByClassName("3rd-" + filterData[k][this.FieldColumn.clmn2[0]])[count].checked = newValue;
                }
            }
        }
    }

    toggle(value: any, event: any) {
        var lengthsidenav = this.el.nativeElement.getElementsByClassName("Div-" + value).length
        for (var count = 0; count < lengthsidenav; count++) {
            if (this.el.nativeElement.getElementsByClassName("Div-" + value)[count].style.display == "block")
                this.el.nativeElement.getElementsByClassName("Div-" + value)[count].style.display = "none";
            else
                this.el.nativeElement.getElementsByClassName("Div-" + value)[count].style.display = "block";
        }
    }

    selected(dir: any, lvl: any) {
        this.onselection.emit({
            Id: dir,
            lvl: lvl
        });
    }

    onSelectedIds(dir: any) {
        this.onselection.emit({
            Id: dir.Id,
            lvl: dir.lvl
        });

    }

    onSelectedChildIds(dir: any, lvl: any) {
        this.onselection.emit({
            Id: dir,
            lvl: lvl
        });
    }

    onSubmit() {
        switch (this.selectionCriteria) {

            case 1:
                this.Fields;
                var outputIdsList = new Array<IdsArray>();
                var elementRef = this.el;
                var columnName = this.FieldColumn.clmn1[0];
                var forStatus = true;
                this.FieldTable[0].Table2.find((e) => {
                    if (forStatus == true) {
                        var clmn = "Level1Chk";
                        var lengthsidenav = this.el.nativeElement.getElementsByClassName(clmn).length;
                        for (var count = 0; count < lengthsidenav; count++) {
                            if (elementRef.nativeElement.getElementsByClassName(clmn)[count].checked == true && elementRef.nativeElement.getElementsByClassName(clmn)[0].name != undefined) {
                                outputIdsList.push({
                                    ValueId: elementRef.nativeElement.getElementsByClassName(clmn)[count].name,
                                    Area: elementRef.nativeElement.getElementsByClassName(clmn)[count].value
                                });
                            }
                        }
                        forStatus = false;
                    }
                });
                this.UpdateValues.emit({

                    FieldIdValues: JSON.stringify(outputIdsList)
                });
                break;
            case 2:
                this.Fields;
                var outputIdsList = new Array<IdsArray>();
                var elementRef = this.el;
                var columnName = this.FieldColumn.clmn1[0];
                this.FieldTable[0].Table2.find((e) => {
                    var clmn = "2nd-" + e[columnName];
                    var lengthsidenav = this.el.nativeElement.getElementsByClassName(clmn).length;
                    for (var count = 0; count < lengthsidenav; count++) {
                        if (elementRef.nativeElement.getElementsByClassName(clmn)[count].checked == true && elementRef.nativeElement.getElementsByClassName(clmn)[0].name != undefined) {
                            outputIdsList.push({
                                ValueId: elementRef.nativeElement.getElementsByClassName(clmn)[count].name,
                                Area: elementRef.nativeElement.getElementsByClassName(clmn)[count].value
                            });
                        }
                    }
                });
                this.UpdateValues.emit({

                    FieldIdValues: JSON.stringify(outputIdsList)
                });
                break;
            case 3:
                this.Fields;
                var outputIdsList = new Array<IdsArray>();
                var elementRef = this.el;
                var columnName = this.FieldColumn.clmn2[0];
                this.FieldTable[0].Table2.find((e) => {
                    var clmn = "3rd-" + e[columnName];
                    var lengthsidenav = this.el.nativeElement.getElementsByClassName(clmn).length;
                    for (var count = 0; count < lengthsidenav; count++) {
                        if (elementRef.nativeElement.getElementsByClassName(clmn)[count].checked == true && elementRef.nativeElement.getElementsByClassName(clmn)[0].name != undefined) {
                            outputIdsList.push({
                                ValueId: elementRef.nativeElement.getElementsByClassName(clmn)[count].name,
                                Area: elementRef.nativeElement.getElementsByClassName(clmn)[count].value
                            });
                        }
                    }
                });
                this.UpdateValues.emit({

                    FieldIdValues: JSON.stringify(outputIdsList)
                });
                break;
            default:

                this.Fields;
                var outputList = new Array<ReportFieldArray>();
                var elementRef = this.el;
                var datakeyName = this.DataKey;
                var columnName = this.FieldColumn.clmn2[0];
                this.FieldTable[0].Table2.find((e) => {
                    var clmn = "3rd-" + e[columnName];
                    var lengthsidenav = this.el.nativeElement.getElementsByClassName(clmn).length;
                    for (var count = 0; count < lengthsidenav; count++) {
                        if (elementRef.nativeElement.getElementsByClassName(clmn)[count].checked == true && elementRef.nativeElement.getElementsByClassName(clmn)[0].name != undefined) {
                            outputList.push({
                                Value: elementRef.nativeElement.getElementsByClassName(clmn)[count].name,
                                ReportFieldId: this.Fields[0].ReportFieldId
                            });
                        }
                    }
                });
                this.UpdateValues.emit({
                    ReportFieldIdValues: JSON.stringify(outputList)
                });
        }

    }

}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: any;
}

export interface IdsArray {

    ValueId: any;
    Area: any;
}