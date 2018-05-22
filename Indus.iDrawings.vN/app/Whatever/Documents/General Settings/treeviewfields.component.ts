import {Component} from '@angular/core';
import {DND_PROVIDERS, DND_DIRECTIVES} from '../../../FrameWork/ExternalLibraries/dnd/ng2-dnd';
import { DocumentService } from '../../../Models/Documents/documents.service';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';

@Component({
    selector: 'tree-view-fields',
    templateUrl: './app/Views/Documents/General Settings/treeviewfields.component.html',
    directives: [DND_DIRECTIVES, SlideComponent],
    providers: [DND_PROVIDERS, DocumentService, NotificationService],
    host: {
        '(dragstart)': 'addTo($event)'
    }
})
export class TreeViewFieldsComponent {

    AllContainerName: string ='Field Names'
    selectedContainerName: string = 'Tree View Fields (Max. 5 fields)'
    AllWidget: any = [];
    SelectedWidget: any = [];
    pageId: any = 2793;
    Previlages: any = 11543;
    FormId:any = 436;
    showSlide = false;
    Position = "bottom-right";
    constructor(private _notificationService: NotificationService, private _objDocumentService: DocumentService) {
        
    }

    ngOnInit() {        
        var contextObj:any = this;
        contextObj._objDocumentService.getDocumentTreeviewListFields().subscribe(function (resultData) {
            contextObj.AllWidget = JSON.parse(resultData["Table1"]);
            contextObj.SelectedWidget = JSON.parse(resultData["Table2"]);

            //var objItemSource = JSON.parse(resultData["Table1"].FieldBinderData);
            //debugger
            //objItemSource.find(function (item) {
            //    if (item.Id == 974) {
            //        item["Name"] = "Uploaded By";
            //        return true;
            //    }
            //    else {
            //        return false;
            //    }
            //})
            //contextObj.AllWidget = objItemSource;



        });
    }

    addTo(dragevent: any) {     
        var contextObj: any = this;   
        if (contextObj.AllWidget && contextObj.AllWidget.length == 0) {
            contextObj.AllWidget = [];
        }
        if (contextObj.SelectedWidget && contextObj.SelectedWidget.length == 0) {
            contextObj.SelectedWidget = [];
        } 
        if (dragevent.srcElement && dragevent.srcElement.className.search('AllItemDrag') >= 0) {
            if (contextObj.SelectedWidget && contextObj.SelectedWidget.length >= 5)
                dragevent.preventDefault();
        }
    }

    onAllFieldcontainerkey(Keyevent: any, index: any) {
        var contextObj: any = this;   
        var key = Keyevent.keyCode || Keyevent.which;
        if (contextObj.SelectedWidget && contextObj.SelectedWidget.length < 5) {
            if (key == 39) {
                Keyevent.preventDefault();
                var AllContainerclass: any = document.getElementsByClassName("AllFieldContainer");
                if (AllContainerclass && AllContainerclass.length > 0)
                    AllContainerclass[0].focus();
                if (contextObj.SelectedWidget && contextObj.SelectedWidget.length <= 5) {
                    contextObj.SelectedWidget.push(contextObj.AllWidget[index]);
                    contextObj.AllWidget.splice(index, 1);
                }
            } else if (key == 38 && index>0) {
                Keyevent.preventDefault();
                var AllContainerclass: any = document.getElementsByClassName("AllFieldContainer");
                if (AllContainerclass && AllContainerclass.length > 0)
                    AllContainerclass[0].focus();
                var swap: any;
                swap = contextObj.AllWidget[index];
                contextObj.AllWidget[index] = contextObj.AllWidget[index - 1];
                contextObj.AllWidget[index - 1] = swap;
            } else if (key == 40 && contextObj.AllWidget && index < (contextObj.AllWidget.length-1)) {
                Keyevent.preventDefault();
                var AllContainerclass: any = document.getElementsByClassName("AllFieldContainer");
                if (AllContainerclass && AllContainerclass.length > 0)
                    AllContainerclass[0].focus();
                var swap: any;
                swap = contextObj.AllWidget[index];
                contextObj.AllWidget[index] = contextObj.AllWidget[index + 1];
                contextObj.AllWidget[index + 1] = swap;
            }
            if (contextObj.AllWidget && contextObj.AllWidget.length == 0) {
                contextObj.AllWidget = [];
            }
        }
    }

    onTreeFieldcontainerkey(Keyevent: any, index: any) {
        var contextObj: any = this;
        var key = Keyevent.keyCode || Keyevent.which;
        if (key == 37) {
            Keyevent.preventDefault();
            var SelectedContainerclass: any = document.getElementsByClassName("TreeFieldContainer");
            if (SelectedContainerclass && SelectedContainerclass.length > 0)
                SelectedContainerclass[0].focus();            
            contextObj.AllWidget.push(contextObj.SelectedWidget[index]);
            contextObj.SelectedWidget.splice(index, 1);            
        } else if (key == 38 && index > 0) {
            Keyevent.preventDefault();
            var SelectedContainerclass: any = document.getElementsByClassName("TreeFieldContainer");
            if (SelectedContainerclass && SelectedContainerclass.length > 0)
                SelectedContainerclass[0].focus();          
            var swap: any;
            swap = contextObj.SelectedWidget[index];
            contextObj.SelectedWidget[index] = contextObj.SelectedWidget[index - 1];
            contextObj.SelectedWidget[index - 1] = swap;
        } else if (key == 40 && contextObj.SelectedWidget && index < (contextObj.SelectedWidget.length - 1)) {
            Keyevent.preventDefault();
            var SelectedContainerclass: any = document.getElementsByClassName("TreeFieldContainer");
            if (SelectedContainerclass && SelectedContainerclass.length > 0)
                SelectedContainerclass[0].focus();          
            var swap: any;
            swap = contextObj.SelectedWidget[index];
            contextObj.SelectedWidget[index] = contextObj.SelectedWidget[index + 1];
            contextObj.SelectedWidget[index + 1] = swap;
        }
        if (contextObj.SelectedWidget && contextObj.SelectedWidget.length == 0) {
            contextObj.SelectedWidget = [];
        }
    }

    changecursorstyle(MouseEvent) {
        var MouseElement: any = MouseEvent.srcElement;
        if (MouseElement)
            MouseElement.style.cursor = "pointer";
    }

    updatetreeviewfieldsettings(dragevent: any) {        
        var contextObj: any = this;
        var ids: string[] = [];
        var length: any = contextObj.SelectedWidget.length
        if (length > 5)
            contextObj._notificationService.ShowToaster("Only 5 Tree View Fields are allowed", 5);
        else {
            for (var i = 0; i < length; i++)
                ids.push(contextObj.SelectedWidget[i].Id);
            contextObj._objDocumentService.updateDocumentTreeviewListFields(ids, 0).subscribe(function (resultData) {
                debugger;
                    if (resultData["ServerId"] > 0) {
                        contextObj._objDocumentService.getUserPrivilegesofPage(contextObj.pageId, contextObj.Previlages, contextObj.FormId).subscribe(function (resultData) {
                            debugger;
                            if (resultData["Data"] == 1) {
                                contextObj.width = 300;
                                contextObj.change = !this.change;
                                contextObj.showSlide = !this.showSlide;
                            }
                            else {
                                contextObj._notificationService.ShowToaster("Tree View Field Settings updated", 3);
                            }
                        });
                       // contextObj._notificationService.ShowToaster("Tree View Field Settings updated", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    }
            });
        }
    }

    DefaultSetting(event: any) {
        var contextObj = this;
        var ids: string[] = [];
        var length: any = contextObj.SelectedWidget.length

        this.showSlide = !this.showSlide;
            //this.spaceService.updateCAIDistributionMapSettingsData(this.savedData.ReportFieldIdValues, 1, 1).subscribe(function (resultData) {
        if (length > 5)
            contextObj._notificationService.ShowToaster("Only 5 Tree View Fields are allowed", 5);
        else {
            for (var i = 0; i < length; i++)
                ids.push(contextObj.SelectedWidget[i].Id);
            contextObj._objDocumentService.updateDocumentTreeviewListFields(ids,1).subscribe(function (resultData) {
                if (resultData["Message"] == "Success") {
                    contextObj._notificationService.ShowToaster("Tree View Field Settings updated", 3);
                }
                else
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            })
        }
        
    }

    cancelClick(value: any) {
        this.showSlide = value.value;
    }
    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
}