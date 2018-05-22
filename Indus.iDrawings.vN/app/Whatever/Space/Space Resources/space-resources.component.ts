import {Component, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {ResouceTypesComponent} from './resource-types.component';
import {Space_ResourcesComponent} from './space_resources.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component'

@Component({
    selector: 'space-resources',
    templateUrl: './app/Views/Space/Space Resources/space-resources.component.html',
    directives: [PageComponent, SectionComponent, ResouceTypesComponent, Space_ResourcesComponent]
})
export class SpaceResourcesComponent implements OnInit{

    pageTitle: string = "Space Resources";
    pagePath: string;

    ngOnInit(): void {
        this.pagePath = "Space / Space Resources";
    }
}
