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
var TreeView = (function () {
    function TreeView(elemRef) {
        this.HideButton = false;
        this.UpdateValues = new core_1.EventEmitter();
        this.onselection = new core_1.EventEmitter();
        this.onselectionChild = new core_1.EventEmitter();
        this.changeVariable = false;
        this.selectionCriteria = 0;
        this.showDivBuilding = "block";
        this.showDivFloor = "block";
        this.level1Label = "Site:"; //Change for both CFPB and GAO
        this.level2Label = "Building:"; //Change for both CFPB and GAO
        this.btneventset = false;
        this.el = elemRef;
    }
    TreeView.prototype.ngOnInit = function () {
        this.FieldTable;
        this.FieldColumn = this.FieldColumn;
        if (this.isShowSelectAll == undefined || this.isShowSelectAll == null)
            this.isShowSelectAll = true;
        if (this.selectionCriteria == 1) {
            this.showDivBuilding = "none";
            this.showDivFloor = "none";
        }
        if (this.dsbleSaveBtn == undefined) {
            this.dsbleSaveBtn = false;
        }
        else if (this.selectionCriteria == 2) {
            this.showDivFloor = "none";
        }
        if (this.labelData != undefined && this.labelData != null) {
            this.level1Label = this.labelData[0];
            this.level2Label = this.labelData[1];
        }
    };
    TreeView.prototype.ngOnChanges = function (changes) {
        this.FieldColumn = this.FieldColumn;
        this.FieldTable = this.FieldTable;
        this.checkedIds = this.checkedIds;
        this.DataKey = this.DataKey;
        this.directories = this.directories;
        if (changes["isChanged"] != undefined && changes["isChanged"]["currentValue"] != undefined && changes["isChanged"]["currentValue"] != changes["isChanged"]["previousValue"]) {
            this.onSubmit();
        }
    };
    TreeView.prototype.filterTable = function (Value, clmnName, clmId) {
        return Value.filter(function (el) {
            if (el[clmnName] == clmId)
                return true;
            else
                return false;
        });
    };
    TreeView.prototype.isChecked = function (Value) {
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
                return false;
        }
    };
    TreeView.prototype.checkSelectAllstate = function () {
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
    };
    TreeView.prototype.checkSelectAll = function (value, level) {
        var check = true;
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
        var lengthsidenav = this.el.nativeElement.getElementsByClassName(value).length;
        for (var count = 0; count < lengthsidenav; count++)
            if (this.el.nativeElement.getElementsByClassName(value)[count].checked != true) {
                check = false;
            }
        this.changeVariable = !this.changeVariable;
        return check;
    };
    TreeView.prototype.oncheckboxchange = function (Checkevent) {
        if (Checkevent.target.checked != false) {
            var Selectallclass = this.el.nativeElement.getElementsByClassName("selectAllChk");
            if (Selectallclass && Selectallclass.length > 0) {
                Selectallclass.checked = false;
            }
        }
    };
    TreeView.prototype.oncheck = function (value, event, level) {
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
            var lengthsidenav = this.el.nativeElement.getElementsByClassName(newid).length;
            for (var count = 0; count < lengthsidenav; count++) {
                this.el.nativeElement.getElementsByClassName(newid)[count].checked = newValue;
            }
        }
        if (level == 0) {
            for (var k = 0; k < this.FieldTable[0].Table2.length; k++) {
                lengthsidenav = this.el.nativeElement.getElementsByClassName("3rd-" + this.FieldTable[0].Table2[k][this.FieldColumn.clmn2[0]]).length;
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
                lengthsidenav = this.el.nativeElement.getElementsByClassName("3rd-" + filterData[k][this.FieldColumn.clmn2[0]]).length;
                for (var count = 0; count < lengthsidenav; count++) {
                    this.el.nativeElement.getElementsByClassName("3rd-" + filterData[k][this.FieldColumn.clmn2[0]])[count].checked = newValue;
                }
            }
        }
    };
    TreeView.prototype.toggle = function (value, event) {
        var lengthsidenav = this.el.nativeElement.getElementsByClassName("Div-" + value).length;
        for (var count = 0; count < lengthsidenav; count++) {
            if (this.el.nativeElement.getElementsByClassName("Div-" + value)[count].style.display == "block")
                this.el.nativeElement.getElementsByClassName("Div-" + value)[count].style.display = "none";
            else
                this.el.nativeElement.getElementsByClassName("Div-" + value)[count].style.display = "block";
        }
    };
    TreeView.prototype.selected = function (dir, lvl) {
        this.onselection.emit({
            Id: dir,
            lvl: lvl
        });
    };
    TreeView.prototype.onSelectedIds = function (dir) {
        this.onselection.emit({
            Id: dir.Id,
            lvl: dir.lvl
        });
    };
    TreeView.prototype.onSelectedChildIds = function (dir, lvl) {
        this.onselection.emit({
            Id: dir,
            lvl: lvl
        });
    };
    TreeView.prototype.onSubmit = function () {
        var _this = this;
        switch (this.selectionCriteria) {
            case 1:
                this.Fields;
                var outputIdsList = new Array();
                var elementRef = this.el;
                var columnName = this.FieldColumn.clmn1[0];
                var forStatus = true;
                this.FieldTable[0].Table2.find(function (e) {
                    if (forStatus == true) {
                        var clmn = "Level1Chk";
                        var lengthsidenav = _this.el.nativeElement.getElementsByClassName(clmn).length;
                        for (var count = 0; count < lengthsidenav; count++) {
                            if (elementRef.nativeElement.getElementsByClassName(clmn)[count].checked == true && elementRef.nativeElement.getElementsByClassName(clmn)[0].name != undefined) {
                                outputIdsList.push({
                                    ValueId: elementRef.nativeElement.getElementsByClassName(clmn)[count].name,
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
                var outputIdsList = new Array();
                var elementRef = this.el;
                var columnName = this.FieldColumn.clmn1[0];
                this.FieldTable[0].Table2.find(function (e) {
                    var clmn = "2nd-" + e[columnName];
                    var lengthsidenav = _this.el.nativeElement.getElementsByClassName(clmn).length;
                    for (var count = 0; count < lengthsidenav; count++) {
                        if (elementRef.nativeElement.getElementsByClassName(clmn)[count].checked == true && elementRef.nativeElement.getElementsByClassName(clmn)[0].name != undefined) {
                            outputIdsList.push({
                                ValueId: elementRef.nativeElement.getElementsByClassName(clmn)[count].name,
                            });
                        }
                    }
                });
                this.UpdateValues.emit({
                    FieldIdValues: JSON.stringify(outputIdsList)
                });
                break;
            case 3:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
                this.Fields;
                var outputIdsList = new Array();
                var elementRef = this.el;
                var columnName = this.FieldColumn.clmn2[0];
                this.FieldTable[0].Table2.find(function (e) {
                    var clmn = "3rd-" + e[columnName];
                    var lengthsidenav = _this.el.nativeElement.getElementsByClassName(clmn).length;
                    for (var count = 0; count < lengthsidenav; count++) {
                        if (elementRef.nativeElement.getElementsByClassName(clmn)[count].checked == true && elementRef.nativeElement.getElementsByClassName(clmn)[0].name != undefined) {
                            outputIdsList.push({
                                ValueId: elementRef.nativeElement.getElementsByClassName(clmn)[count].name,
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
                var outputList = new Array();
                var elementRef = this.el;
                var datakeyName = this.DataKey;
                var columnName = this.FieldColumn.clmn2[0];
                this.FieldTable[0].Table2.find(function (e) {
                    var clmn = "3rd-" + e[columnName];
                    var lengthsidenav = _this.el.nativeElement.getElementsByClassName(clmn).length;
                    for (var count = 0; count < lengthsidenav; count++) {
                        if (elementRef.nativeElement.getElementsByClassName(clmn)[count].checked == true && elementRef.nativeElement.getElementsByClassName(clmn)[0].name != undefined) {
                            outputList.push({
                                Value: elementRef.nativeElement.getElementsByClassName(clmn)[count].name,
                                ReportFieldId: _this.Fields[0].ReportFieldId
                            });
                        }
                    }
                });
                this.UpdateValues.emit({
                    ReportFieldIdValues: JSON.stringify(outputList)
                });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeView.prototype, "directories", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeView.prototype, "FieldTable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeView.prototype, "FieldColumn", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeView.prototype, "Fields", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeView.prototype, "checkedIds", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeView.prototype, "DataKey", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeView.prototype, "dsbleSaveBtn", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TreeView.prototype, "labelData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TreeView.prototype, "isShowSelectAll", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TreeView.prototype, "HideButton", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TreeView.prototype, "CustomButtonNameForTreeView", void 0);
    __decorate([
        /*Change the button name in tree view*/ core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeView.prototype, "UpdateValues", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeView.prototype, "onselection", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeView.prototype, "onselectionChild", void 0);
    __decorate([
        core_1.ViewChild('input'), 
        __metadata('design:type', Object)
    ], TreeView.prototype, "inputs", void 0);
    TreeView = __decorate([
        core_1.Component({
            selector: 'tree-view',
            templateUrl: './app/Framework/Views/TreeView/treeview.component.html',
            directives: [TreeView],
            inputs: ['FieldTable', 'FieldColumn', 'DataKey', 'checkedIds', 'selectionCriteria', 'HideButton', 'isChanged'],
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], TreeView);
    return TreeView;
}());
exports.TreeView = TreeView;
//# sourceMappingURL=treeview.component.js.map