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
var TabsComponent = (function () {
    function TabsComponent(el) {
        this.el = el;
        this.getSelectedTab = new core_1.EventEmitter();
        this.onTabClose = new core_1.EventEmitter();
        this.onTabBeforeClose = new core_1.EventEmitter();
        this.currentfocuses = [];
        this.currentfocus = [];
        this.isfocuschange = true;
        this.isclosebutton = false;
        this.tabs = [];
        this.selectedTab = 0;
    }
    TabsComponent.prototype.ngOnChanges = function (changes) {
        if (changes["selectedTab"] && (Number(changes["selectedTab"]["currentValue"])) != (Number(changes["selectedTab"]["previousValue"])))
            this.selectTab(this.tabs[Number(changes["selectedTab"]["currentValue"])], false);
        if (changes["deleteIndex"] && changes["deleteIndex"]["currentValue"] > 0) {
            this.closeTab(this.tabs[Number(changes["deleteIndex"]["currentValue"])], this, "out");
        }
    };
    TabsComponent.prototype.ngAfterViewChecked = function () {
        if (this.isclosebutton && this.currentfocus) {
            var contextObj = this;
            contextObj.currentfocus.focus();
            this.isclosebutton = false;
            this.isfocuschange = false;
        }
        else if (this.isfocuschange) {
            this.tabfocus();
        }
    };
    TabsComponent.prototype.tabfocus = function () {
        var contextObj = this;
        if (contextObj.el.nativeElement.children && contextObj.el.nativeElement.children.length > 0) {
            var tabclass = contextObj.el.nativeElement.children[0].getElementsByClassName("active");
            if (tabclass && tabclass.length > 0) {
                tabclass = tabclass[0].getElementsByTagName("a");
                if (tabclass && tabclass.length > 0) {
                    tabclass[0].focus();
                    this.isfocuschange = false;
                }
            }
        }
    };
    TabsComponent.prototype.onkeytabPress = function (Keyevent, tab, isTabclick) {
        if (Keyevent.keyCode == 13 || Keyevent.keyCode == 32) {
            this.selectTab(tab, true);
        }
    };
    TabsComponent.prototype.closeonkeypress = function (tab, Keyevent) {
        var key = Keyevent.keyCode || Keyevent.which;
        if (Keyevent.keyCode == 13 || Keyevent.keyCode == 32) {
            this.Onclick(tab, Keyevent);
        }
    };
    TabsComponent.prototype.selectTab = function (selectedTab, isTabclick) {
        var _this = this;
        var index = this.tabs.indexOf(selectedTab);
        console.log("selectTab", this.el);
        if (index > -1) {
            if (this.el.nativeElement.children[0].children.length != 0) {
                this.el.nativeElement.children[0].children[index].style.display = 'block';
                if (index != 0)
                    this.el.nativeElement.children[index].children[0].style.display = 'none';
                this.el.nativeElement.children[index + 1].children[0].style.display = 'block';
            }
        }
        this.tabs.forEach(function (tab, index) {
            tab.vertical = _this.verticalTab;
            if (selectedTab == tab) {
                selectedTab.active = true;
                _this.selectedTab = index;
            }
            else {
                tab.active = false;
            }
        });
        for (var i = 0; i <= this.tabs.length - 1; i++) {
            if (i != this.selectedTab)
                this.el.nativeElement.children[i + 1].children[0].style.display = 'none';
        }
        this.globalTabClick = isTabclick;
        this.getSelectedTab.emit([this.selectedTab, isTabclick, this.el.nativeElement]);
        this.isfocuschange = true;
    };
    TabsComponent.prototype.addTab = function (tab) {
        this.currentfocuses.push(document.activeElement);
        if (this.tabs.length === 0) {
            tab.vertical = this.verticalTab;
            tab.active = true;
        }
        this.tabs.push(tab);
    };
    TabsComponent.prototype.closeTab = function (tab, contextObj, action) {
        console.log("onTabClose", contextObj);
        var index = contextObj.tabs.indexOf(tab);
        if (index > -1) {
            contextObj.el.nativeElement.children[0].children[index].style.display = 'none';
            if (contextObj.el.nativeElement.children[index + 1])
                contextObj.el.nativeElement.children[index + 1].children[0].style.display = 'none';
            if (tab.active) {
                if (index != contextObj.tabs.length - 1) {
                    contextObj.selectTab(contextObj.tabs[index + 1], contextObj.globalTabClick);
                }
                else {
                    contextObj.el.nativeElement.children[index + 1].children[0].style.display = 'none';
                    contextObj.selectTab(contextObj.tabs[index - 1], contextObj.globalTabClick);
                }
            }
        }
        if (action == "out") {
            contextObj.tabs.splice(index, 1);
            contextObj.onTabClose.emit([contextObj.selectedTab]);
        }
    };
    TabsComponent.prototype.Onclick = function (tab, event) {
        if (this.onTabBeforeClose.observers.length > 0) {
            this.onTabBeforeClose.emit([this.selectedTab, this.closeTab, tab, this]);
        }
        else {
            this.closeTab(tab, this, "out");
        }
        event.stopPropagation();
        this.currentfocus = this.currentfocuses.pop();
        this.isclosebutton = true;
        //if (this.currentfocus) {
        //    setTimeout(function () {
        //        this.currentfocus.focus();
        //    }, 2500);
        //}
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TabsComponent.prototype, "verticalTab", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TabsComponent.prototype, "getSelectedTab", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TabsComponent.prototype, "onTabClose", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TabsComponent.prototype, "onTabBeforeClose", void 0);
    TabsComponent = __decorate([
        core_1.Component({
            selector: 'tabs',
            templateUrl: 'app/Framework/Views/Tab/tabs.component.html',
            directives: [],
            inputs: ["selectedTab", "deleteIndex"],
            styleUrls: ['app/Framework/Views/Tab/tab.style.css']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], TabsComponent);
    return TabsComponent;
}());
exports.TabsComponent = TabsComponent;
//# sourceMappingURL=tabs.component.js.map