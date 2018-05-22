import { Component, Input, forwardRef, Inject, OnChanges, SimpleChanges} from '@angular/core';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {AppComponent } from '../../../app.component';

@Component({
    selector: 'page',
    templateUrl: 'app/Framework/Views/Page/page.component.html',
    styleUrls:['app/Framework/Views/Page/Page.css'],
    directives: [ Notification],
    providers: [NotificationService],
    inputs: ['pagetitle', 'withoutSubmenu','isEnableNotification'],
})

export class PageComponent implements OnChanges {
    @Input() pagetitle;
    @Input() isEnableNotification: boolean;
    App: AppComponent;
    page: any;
    lastPath: string;

    ngOnInit() {
        if (this.pagetitle != undefined) {
            this.lastPath = this.pagetitle;
            this.App.lastpagepath = this.lastPath.substring(this.lastPath.lastIndexOf("/") + 1, this.lastPath.length);
            if (this.App.lastpagepath != undefined) {
                this.App.pagepath = this.lastPath.substring(0, this.lastPath.lastIndexOf("/") + 1);
            }
            else {
                this.App.pagepath = this.pagetitle;
            }
        }
        if (this.isEnableNotification == true || this.isEnableNotification == undefined)
            this.isEnableNotification = true;
        else
            this.isEnableNotification = false;

        var activeClass: any = document.getElementsByClassName("content-General-view");

        if (activeClass && activeClass.length > 0) {
            var initialfocus: any = document.getElementsByClassName("pageContent");
            if (initialfocus && initialfocus.length > 1) {
                var selectedclass: any = activeClass[0].getElementsByClassName("selected");
                var selectedtag: any;
                if (selectedclass && selectedclass.length > 0) {
                    selectedtag = selectedclass[0].getElementsByTagName("a");
                    if (selectedtag && selectedtag.length>0)
                        var activeclassname: string = selectedtag[0].innerHTML + ' Page';
                }
                if (activeclassname && activeclassname.length>0)
                    initialfocus[1].setAttribute('aria-label', activeclassname);
                else
                    initialfocus[1].setAttribute('aria-label', ' ');
                initialfocus[1].setAttribute('role', 'none');
                initialfocus[1].tabIndex = 0;
                initialfocus[1].focus();
                initialfocus[1].addEventListener('keydown', function (event) {
                    //check for 'Shift + Tab' key 
                    if (event.which == 9 && event.shiftKey && document.activeElement == initialfocus[1]) {
                        event.preventDefault();
                        if (selectedtag && selectedtag.length > 0) {
                            //var selectedclass: any = activeClass[0].getElementsByClassName("selected")[0].getElementsByTagName("a");
                            //selectedclass[0].tabIndex = 0;
                            selectedtag[0].focus();
                        }
                    }                    
                });
            }
        }
    }
    ngOnChanges(changes: SimpleChanges) {
        if (this.pagetitle != undefined) {
            this.lastPath = this.pagetitle;
            this.App.lastpagepath = this.lastPath.substring(this.lastPath.lastIndexOf("/") + 1, this.lastPath.length);
            if (this.App.lastpagepath != undefined) {
                this.App.pagepath = this.lastPath.substring(0,this.lastPath.lastIndexOf("/")+1);
            }
            else {
                this.App.pagepath = this.pagetitle;
            }
        }
    }

    constructor( @Inject(forwardRef(() => AppComponent)) card: AppComponent) {
        this.App = card;
        this.App.pagepath = this.pagetitle;
    }; 

}
