import { Component, Input, Output, EventEmitter}  from '@angular/core';
import {IField} from '../../Models//Interface/IField';
import { VisibleFieldsPipe } from '../Common/visibleFields.pipe';

@Component({
    selector: 'sort',
    templateUrl: './app/Framework/Views/Sort/sort.component.html',
    inputs: ["fieldNames", "listItems", "disableSort"],
    pipes: [VisibleFieldsPipe]
})

export class Sorting {

    @Output() sortEvent = new EventEmitter<SortEvent>();
    public columnName: string = "";
    public sortDirection: string = 'ASC';
    public clickNum: number = 0;
    public sortIcon: string = "";
    public disableSort: boolean = false;

    sortMultipleField(selectedField) {
        if (!this.disableSort) {
            this.clickNum++;
            if (this.clickNum == 2) {
                this.sortOnChange(selectedField);
                this.clickNum = 0;
            }
        }
    }

    sortSingleField(selectedField) {
        if (!this.disableSort) {
            if (this.sortDirection == 'ASC') {
                this.sortDirection = 'DESC';
                this.sortIcon = "sort_Desc_1.png";
            }
            else {
                this.sortDirection = 'ASC';
                this.sortIcon = "sort_Asc_1.png";
            }
            if (!selectedField.includes("["))
                this.columnName = "[" + selectedField + "]";
            else
                this.columnName = selectedField;
            this.sortEvent.emit({
                selectedField: this.columnName,
                sortDirection: this.sortDirection
            });
        }
    }

    sortOnChange(selectedField) {
        if ((this.sortDirection == 'ASC') && (this.columnName == selectedField)) {
            this.sortDirection = 'DESC';
            this.sortIcon = "sort_Desc.png";
        }
        else {
            this.sortDirection = 'ASC';
            this.sortIcon = "sort_Asc.png";
        }
        if (!selectedField.includes("["))
            this.columnName = "[" + selectedField + "]";
        else
            this.columnName = selectedField;
        this.sortEvent.emit({
            selectedField: this.columnName,
            sortDirection: this.sortDirection
        });
    }
}

export interface SortEvent {
    selectedField: string;
    sortDirection: string;
}

