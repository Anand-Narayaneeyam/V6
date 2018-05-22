import {Component, OnChanges, SimpleChange, Output, AfterViewChecked, EventEmitter, ElementRef,Input} from '@angular/core'
import {TabComponent} from './tab.component'



@Component({
    selector: 'tabs',
    templateUrl: 'app/Framework/Views/Tab/tabs.component.html',
    directives: [],
    inputs: ["selectedTab", "deleteIndex"],
    styleUrls: ['app/Framework/Views/Tab/tab.style.css']
})
export class TabsComponent implements OnChanges, AfterViewChecked {

    tabs: TabComponent[];
    selectedTab: number;
    @Input() verticalTab: boolean;
    globalTabClick: boolean;
    @Output() getSelectedTab = new EventEmitter();
    @Output() onTabClose = new EventEmitter();
    @Output() onTabBeforeClose = new EventEmitter();
    currentfocuses: any = [];
    currentfocus: any = [];
    isfocuschange: boolean = true;
    isclosebutton: boolean = false;
    constructor(private el: ElementRef) {
        this.tabs = [];
        this.selectedTab = 0;

    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes["selectedTab"] && (Number(changes["selectedTab"]["currentValue"])) != (Number(changes["selectedTab"]["previousValue"])))
            this.selectTab(this.tabs[Number(changes["selectedTab"]["currentValue"])], false);
        if (changes["deleteIndex"] && changes["deleteIndex"]["currentValue"] > 0) {
            this.closeTab(this.tabs[Number(changes["deleteIndex"]["currentValue"])], this,"out")
        }
    }

    ngAfterViewChecked() {
        if (this.isclosebutton && this.currentfocus) {
            var contextObj: any = this;
            contextObj.currentfocus.focus();
            this.isclosebutton = false;
            this.isfocuschange = false;
        }
        else if (this.isfocuschange) {
            this.tabfocus();
        }
    }

    tabfocus() {
        var contextObj: any = this;
        if (contextObj.el.nativeElement.children && contextObj.el.nativeElement.children.length > 0) {
            var tabclass: any = contextObj.el.nativeElement.children[0].getElementsByClassName("active");
            if (tabclass && tabclass.length > 0) {
                tabclass = tabclass[0].getElementsByTagName("a");
                if (tabclass && tabclass.length > 0) {
                    tabclass[0].focus();
                    this.isfocuschange = false;
                }
            }
        }
    }

    onkeytabPress(Keyevent: any,tab: any, isTabclick: boolean) {
        if (Keyevent.keyCode == 13 || Keyevent.keyCode == 32) {
            this.selectTab(tab, true);
        }
    }

    closeonkeypress(tab: any, Keyevent) {
        var key = Keyevent.keyCode || Keyevent.which;
        if (Keyevent.keyCode == 13 || Keyevent.keyCode == 32) {
            this.Onclick(tab, Keyevent);            
        }
    }

    selectTab(selectedTab: TabComponent, isTabclick: boolean) {
        var index = this.tabs.indexOf(selectedTab)
        console.log("selectTab", this.el);
        if (index > -1) {
            if (this.el.nativeElement.children[0].children.length != 0) {
                this.el.nativeElement.children[0].children[index].style.display = 'block'
                if (index != 0)
                    this.el.nativeElement.children[index].children[0].style.display = 'none'
                this.el.nativeElement.children[index + 1].children[0].style.display = 'block'
            }
        }
        this.tabs.forEach((tab, index) => {
            tab.vertical = this.verticalTab;
            if (selectedTab == tab) {
                selectedTab.active = true
                this.selectedTab = index;
            } else {
                tab.active = false;
            }
        });
        for (var i = 0; i <= this.tabs.length - 1; i++) {
            if (i != this.selectedTab)
                this.el.nativeElement.children[i + 1].children[0].style.display = 'none'
        }
        this.globalTabClick = isTabclick;
        this.getSelectedTab.emit([this.selectedTab, isTabclick, this.el.nativeElement]);
        this.isfocuschange = true;
    }

    addTab(tab: TabComponent) {
        this.currentfocuses.push(document.activeElement);
        if (this.tabs.length === 0) {
            tab.vertical = this.verticalTab;
            tab.active = true;
        }
        this.tabs.push(tab);


    }
    closeTab(tab: TabComponent, contextObj,action) {
        console.log("onTabClose", contextObj);
        var index = contextObj.tabs.indexOf(tab);
        if (index > -1) {
            contextObj.el.nativeElement.children[0].children[index].style.display = 'none'
            if (contextObj.el.nativeElement.children[index + 1])
                contextObj.el.nativeElement.children[index + 1].children[0].style.display = 'none'
            if (tab.active) {
                if (index != contextObj.tabs.length - 1) {
                    contextObj.selectTab(contextObj.tabs[index + 1], contextObj.globalTabClick)
                }
                else {
                    contextObj.el.nativeElement.children[index + 1].children[0].style.display = 'none'
                    contextObj.selectTab(contextObj.tabs[index - 1], contextObj.globalTabClick)
                }
            }
        }
        if (action == "out") {
            contextObj.tabs.splice(index, 1);
            contextObj.onTabClose.emit([contextObj.selectedTab]);
        }
    }
    Onclick(tab: TabComponent, event) {
        if (this.onTabBeforeClose.observers.length > 0) {
            this.onTabBeforeClose.emit([this.selectedTab, this.closeTab, tab, this]);
            /*Closing tab should be handled inside the tabbeforeclose event manually using the params provided */
        } else {
            this.closeTab(tab, this,"out");
        }
        event.stopPropagation();
        this.currentfocus = this.currentfocuses.pop();
        this.isclosebutton = true;
        //if (this.currentfocus) {
        //    setTimeout(function () {
        //        this.currentfocus.focus();
        //    }, 2500);
        //}
    }
}