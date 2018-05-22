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
var ng2_dnd_1 = require('../../../FrameWork/ExternalLibraries/dnd/ng2-dnd');
var documents_service_1 = require('../../../Models/Documents/documents.service');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var TreeViewFieldsComponent = (function () {
    function TreeViewFieldsComponent(_notificationService, _objDocumentService) {
        this._notificationService = _notificationService;
        this._objDocumentService = _objDocumentService;
        this.AllContainerName = 'Field Names';
        this.selectedContainerName = 'Tree View Fields (Max. 5 fields)';
        this.AllWidget = [];
        this.SelectedWidget = [];
        this.pageId = 2793;
        this.Previlages = 11543;
        this.FormId = 436;
        this.showSlide = false;
        this.Position = "bottom-right";
    }
    TreeViewFieldsComponent.prototype.ngOnInit = function () {
        var contextObj = this;
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
    };
    TreeViewFieldsComponent.prototype.addTo = function (dragevent) {
        var contextObj = this;
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
    };
    TreeViewFieldsComponent.prototype.onAllFieldcontainerkey = function (Keyevent, index) {
        var contextObj = this;
        var key = Keyevent.keyCode || Keyevent.which;
        if (contextObj.SelectedWidget && contextObj.SelectedWidget.length < 5) {
            if (key == 39) {
                Keyevent.preventDefault();
                var AllContainerclass = document.getElementsByClassName("AllFieldContainer");
                if (AllContainerclass && AllContainerclass.length > 0)
                    AllContainerclass[0].focus();
                if (contextObj.SelectedWidget && contextObj.SelectedWidget.length <= 5) {
                    contextObj.SelectedWidget.push(contextObj.AllWidget[index]);
                    contextObj.AllWidget.splice(index, 1);
                }
            }
            else if (key == 38 && index > 0) {
                Keyevent.preventDefault();
                var AllContainerclass = document.getElementsByClassName("AllFieldContainer");
                if (AllContainerclass && AllContainerclass.length > 0)
                    AllContainerclass[0].focus();
                var swap;
                swap = contextObj.AllWidget[index];
                contextObj.AllWidget[index] = contextObj.AllWidget[index - 1];
                contextObj.AllWidget[index - 1] = swap;
            }
            else if (key == 40 && contextObj.AllWidget && index < (contextObj.AllWidget.length - 1)) {
                Keyevent.preventDefault();
                var AllContainerclass = document.getElementsByClassName("AllFieldContainer");
                if (AllContainerclass && AllContainerclass.length > 0)
                    AllContainerclass[0].focus();
                var swap;
                swap = contextObj.AllWidget[index];
                contextObj.AllWidget[index] = contextObj.AllWidget[index + 1];
                contextObj.AllWidget[index + 1] = swap;
            }
            if (contextObj.AllWidget && contextObj.AllWidget.length == 0) {
                contextObj.AllWidget = [];
            }
        }
    };
    TreeViewFieldsComponent.prototype.onTreeFieldcontainerkey = function (Keyevent, index) {
        var contextObj = this;
        var key = Keyevent.keyCode || Keyevent.which;
        if (key == 37) {
            Keyevent.preventDefault();
            var SelectedContainerclass = document.getElementsByClassName("TreeFieldContainer");
            if (SelectedContainerclass && SelectedContainerclass.length > 0)
                SelectedContainerclass[0].focus();
            contextObj.AllWidget.push(contextObj.SelectedWidget[index]);
            contextObj.SelectedWidget.splice(index, 1);
        }
        else if (key == 38 && index > 0) {
            Keyevent.preventDefault();
            var SelectedContainerclass = document.getElementsByClassName("TreeFieldContainer");
            if (SelectedContainerclass && SelectedContainerclass.length > 0)
                SelectedContainerclass[0].focus();
            var swap;
            swap = contextObj.SelectedWidget[index];
            contextObj.SelectedWidget[index] = contextObj.SelectedWidget[index - 1];
            contextObj.SelectedWidget[index - 1] = swap;
        }
        else if (key == 40 && contextObj.SelectedWidget && index < (contextObj.SelectedWidget.length - 1)) {
            Keyevent.preventDefault();
            var SelectedContainerclass = document.getElementsByClassName("TreeFieldContainer");
            if (SelectedContainerclass && SelectedContainerclass.length > 0)
                SelectedContainerclass[0].focus();
            var swap;
            swap = contextObj.SelectedWidget[index];
            contextObj.SelectedWidget[index] = contextObj.SelectedWidget[index + 1];
            contextObj.SelectedWidget[index + 1] = swap;
        }
        if (contextObj.SelectedWidget && contextObj.SelectedWidget.length == 0) {
            contextObj.SelectedWidget = [];
        }
    };
    TreeViewFieldsComponent.prototype.changecursorstyle = function (MouseEvent) {
        var MouseElement = MouseEvent.srcElement;
        if (MouseElement)
            MouseElement.style.cursor = "pointer";
    };
    TreeViewFieldsComponent.prototype.updatetreeviewfieldsettings = function (dragevent) {
        var contextObj = this;
        var ids = [];
        var length = contextObj.SelectedWidget.length;
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
                }
                else {
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                }
            });
        }
    };
    TreeViewFieldsComponent.prototype.DefaultSetting = function (event) {
        var contextObj = this;
        var ids = [];
        var length = contextObj.SelectedWidget.length;
        this.showSlide = !this.showSlide;
        //this.spaceService.updateCAIDistributionMapSettingsData(this.savedData.ReportFieldIdValues, 1, 1).subscribe(function (resultData) {
        if (length > 5)
            contextObj._notificationService.ShowToaster("Only 5 Tree View Fields are allowed", 5);
        else {
            for (var i = 0; i < length; i++)
                ids.push(contextObj.SelectedWidget[i].Id);
            contextObj._objDocumentService.updateDocumentTreeviewListFields(ids, 1).subscribe(function (resultData) {
                if (resultData["Message"] == "Success") {
                    contextObj._notificationService.ShowToaster("Tree View Field Settings updated", 3);
                }
                else
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            });
        }
    };
    TreeViewFieldsComponent.prototype.cancelClick = function (value) {
        this.showSlide = value.value;
    };
    TreeViewFieldsComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    TreeViewFieldsComponent = __decorate([
        core_1.Component({
            selector: 'tree-view-fields',
            templateUrl: './app/Views/Documents/General Settings/treeviewfields.component.html',
            directives: [ng2_dnd_1.DND_DIRECTIVES, slide_component_1.SlideComponent],
            providers: [ng2_dnd_1.DND_PROVIDERS, documents_service_1.DocumentService, notify_service_1.NotificationService],
            host: {
                '(dragstart)': 'addTo($event)'
            }
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, documents_service_1.DocumentService])
    ], TreeViewFieldsComponent);
    return TreeViewFieldsComponent;
}());
exports.TreeViewFieldsComponent = TreeViewFieldsComponent;
//# sourceMappingURL=treeviewfields.component.js.map