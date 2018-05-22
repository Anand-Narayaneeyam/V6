import {Component} from '@angular/core';
import {NgControl} from '@angular/common';
import {PageComponent} from '../../Framework/Whatever/Page/page.component';
import {SubMenu} from '../../Framework/Whatever/Submenu/submenu.component'

@Component({
    selector: 'test',
    templateUrl: './app/Views/test/test.component.html',
    directives: [PageComponent, SubMenu]
   
})
export class TestComponent {
    enableMenu = [];
    testMenu = [
        {
            "id": 0,
            "title": "Add",
            "image": "Home",
            "path": null
        },
        {
            "id": 1,
            "title": "Edit",
            "image": "Home",
            "path": null,
        },
        {
            "id": 2,
            "title": "Delete",
            "image": "Home",
            "path": null,
        },
        {
            "id": 3,
            "title": "Close",
            "image": "Home",
            "path": null,
        },
        {
            "id": 4,
            "title": "Reopen",
            "image": "Home",
            "path": null,
        }
    ];
    pageTitle: string="test";
}