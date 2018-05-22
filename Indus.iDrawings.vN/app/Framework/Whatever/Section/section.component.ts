import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange}  from '@angular/core';

@Component({
    selector: 'section',
    templateUrl: './app/Framework/Views/Section/section.component.html',
    styleUrls: ['./app/Framework/Views/Section/section-view.css'],
    inputs: ["title", "isExpanded","isGrid"]
})

export class SectionComponent {
    @Input() isExpanded: boolean = false;
    @Input() title: string;
    @Input() type;
    @Input() height;
    isGrid: any;
    @Output() onSectionExpandChange = new EventEmitter();
    contentView: string;
    className = this.isExpanded == true ? 'title-view-active' : 'title-view';
    expandIcon: string = "Content/Images/arrows_down.png";
    hideIcon: string = "Content/Images/arrows_up.png";
    ngOnInit() {
        if (this.height != undefined) {
            this.height = this.height + "%";
        }
        else {
            if (this.type == "menu") {
                this.height = "auto";
            }
            else {
                this.height = "auto";
            }
        }

        if (this.isGrid == true)
        if (this.isGrid == false || this.isGrid == undefined)
            this.contentView = "content-view";
        else
            this.contentView = "content-Gridview";

        this.className = this.isExpanded == true ? 'title-view-active' : 'title-view';
        if (this.type == undefined || this.type == "page")
            this.className = this.isExpanded == true ? 'title-view-active' : 'title-view';
        else {
            this.className = this.isExpanded == true ? 'title-view-general-active' : 'title-general-view';
            if (this.isGrid == false || this.isGrid == undefined)
                this.contentView = "content-General-view";
            else
                this.contentView = "content-General-Gridview";
        }
    }    

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes["isExpanded"] !== undefined) {
            if ((Number(changes["isExpanded"]["currentValue"])) != (Number(changes["isExpanded"]["previousValue"]))) {
                if (this.type == undefined || this.type == "page") {
                    this.className = this.isExpanded == true ? 'title-view-active' : 'title-view';
                    if (this.isGrid == false || this.isGrid == undefined)
                        this.contentView = "content-view";
                    else
                        this.contentView = "content-Gridview";
                }
                else {
                    this.className = this.isExpanded == true ? 'title-view-general-active' : 'title-general-view';
                    if (this.isGrid == false || this.isGrid == undefined)
                        this.contentView = "content-General-view";
                    else
                        this.contentView = "content-General-Gridview";
                }
            }
        }
    }
    onExpandClick() {
        this.isExpanded = !this.isExpanded;
        if (this.type == undefined || this.type == "page")
            this.className = this.isExpanded == true ? 'title-view-active' : 'title-view';
        else {
            this.className = this.isExpanded == true ? 'title-view-general-active' : 'title-general-view';
            if (this.isGrid == false || this.isGrid == undefined)
                this.contentView = "content-General-view";
            else
                this.contentView = "content-General-Gridview";
        }
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'));            
        }, 10);        
        this.onSectionExpandChange.emit([this.isExpanded, this]);   
    }

    onExpandKeyPress(Keyevent: any) {
        if (Keyevent.keyCode == 13 || Keyevent.keyCode == 32) {
            this.onExpandClick();
        }
    }
        
}

