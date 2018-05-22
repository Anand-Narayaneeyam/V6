import {Component, OnInit} from '@angular/core';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'feedback-component";',
    templateUrl: './app/Views/Administration/Feedback/feedback-component.html',
    directives: [PageComponent, FieldComponent],
    providers: [AdministrationService, NotificationService],

})
export class FeedbackComponent implements OnInit {

    pageTitle: string = "FeedBack"
    pagePath: string;
    fieldDetails: IField[];
    btnName: string;
    userName: string = "";
    userId: string = "";

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService) {

    }
    ngOnInit(): void {

        var objContext = this;
        objContext.btnName = "Submit";
        objContext.pagePath = "Administration / Feedback";
        objContext.administrationService.getSessionData().subscribe(function (data) {
            
            objContext.userId = data["Data"].UserId;
            objContext.userName = data["Data"].UserName;
        });

        objContext.administrationService.getFeedbackFields().subscribe(function (rt) {
            
            objContext.fieldDetails = rt["Data"];
            objContext.fieldDetails[0].FieldValue = objContext.userName;
        });
    }

    onSubmitData(event) {
        var contextObj = this;
        
        contextObj.administrationService.submitFeedback(event.fieldobject, this.userId).subscribe(function (resultData) {
            
            if (resultData == "Feedback Sent") {
                contextObj.notificationService.ShowToaster("Feedback sent", 3);
            }
            else if (resultData == "Feedback Sending failed")
                contextObj.notificationService.ShowToaster("Feedback Sending failed.", 5);
            else
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command",5);
        });
    }

}