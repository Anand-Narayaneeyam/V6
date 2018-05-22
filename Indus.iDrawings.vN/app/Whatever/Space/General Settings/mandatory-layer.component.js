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
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var http_1 = require('@angular/http');
var list_component_1 = require('../../../Framework/Whatever/List/list.component');
var field_component_1 = require('../../../Framework/Whatever/Card/field.component');
var card_component_1 = require('../../../Framework/Whatever/Card/card.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var space_service_1 = require('../../../Models/Space/space.service');
var MandatoryLayerComponent = (function () {
    function MandatoryLayerComponent(spaceService, notificationService, confirmationService) {
        this.spaceService = spaceService;
        this.notificationService = notificationService;
        this.confirmationService = confirmationService;
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
            }
        ];
        this.gridcount = 20;
        this.enableMenu = [];
        this.selIds = new Array();
        this.totalItems = 30;
        this.itemsPerPage = 10;
    }
    MandatoryLayerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spaceService.getMandaoryLayer().subscribe(function (list) { return console.log(_this.sourceData = list["data"]); }, function (error) { return _this.errorMessage = error; });
        this.spaceService.getMandaoryLayerFields().subscribe(function (fields) { return _this.fields = fields["data"]; }, function (error) { return _this.errorMessage = error; }, function () { return console.log('fields', _this.fields); });
    };
    MandatoryLayerComponent.prototype.onCardSubmit = function () {
        // console.log("selectedids", this.selIds);
        if (this.selIds) {
            //this.spaceService.postSubmit(this.fieldDetails).subscribe(fieldDetails => this.fieldDetails = fieldDetails["data"],
            //    error => this.errorMessage = <any>error);
            this.notificationService.ShowToaster("Mandatory layer updated", 3);
        }
        else {
            //this.spaceService.postSubmit(this.fieldDetails).subscribe(fieldDetails => this.fieldDetails = fieldDetails["data"],
            //    error => this.errorMessage = <any>error);
            this.notificationService.ShowToaster("Mandatory layer added", 3);
        }
    };
    MandatoryLayerComponent.prototype.onSubMenuChange = function (event, id) {
        var editid = 0;
        var deleteid = this.sourceData.length - 1;
        if (event.value == 1) {
            this.addClick();
        }
        else if (event.value == 2) {
            this.editClick(editid);
        }
        else if (event.value == 3) {
            this.deleteClick();
        }
    };
    MandatoryLayerComponent.prototype.onSorting = function (event) {
        console.log("sort action");
    };
    MandatoryLayerComponent.prototype.pageChanged = function (event) {
        var _this = this;
        if (event.pageEvent.page == 2) {
            this.spaceService.getMandaoryLayer()
                .subscribe(function (itemsSource) { return _this.sourceData = itemsSource["paging"]; }, function (error) { return _this.errorMessage = error; });
        }
        else {
            this.spaceService.getMandaoryLayer()
                .subscribe(function (itemsSource) { return _this.sourceData = itemsSource["data"]; }, function (error) { return _this.errorMessage = error; });
        }
    };
    ;
    MandatoryLayerComponent.prototype.addClick = function () {
        var newDataSource;
        newDataSource = {
            "LayerName": ""
        };
        this.sourceData.push(newDataSource);
    };
    MandatoryLayerComponent.prototype.editClick = function (id) {
        var newDataSource;
        newDataSource = {
            "LayerName": ""
        };
        this.sourceData.splice(id, newDataSource);
    };
    MandatoryLayerComponent.prototype.ondelete = function (e) {
        this.deleteClick();
    };
    MandatoryLayerComponent.prototype.deleteClick = function () {
        //this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Mandatory layer?", "Yes");
        //let deleteid = this.sourceData.length - 1;
        var _this = this;
        //var index = this.sourceData.indexOf(this.sourceData[deleteid]);
        //if (index > -1) {
        //    this.sourceData.splice(index, 1);
        //}
        for (var j = 0; j < this.selIds.length; j++) {
            var index = this.sourceData.indexOf(this.sourceData.filter(function (x) { return x["Id"] == _this.selIds[j]; })[0]);
            if (index > -1)
                this.sourceData.splice(index, 1);
        }
        this.spaceService.postSpaceStandardDelete(this.selIds[0]);
        this.notificationService.ShowToaster("Mandatory layer deleted", 3);
    };
    MandatoryLayerComponent = __decorate([
        core_1.Component({
            selector: 'mandatory-layers',
            templateUrl: './app/Views/Space/General Settings/mandatory-layer.component.html',
            directives: [submenu_component_1.SubMenu, sort_component_1.Sorting, paging_component_1.PagingComponent, list_component_1.ListComponent, field_component_1.FieldComponent, card_component_1.CardComponent, notify_component_1.Notification, confirm_component_1.ConfirmationComponent],
            providers: [http_1.HTTP_PROVIDERS, space_service_1.SpaceService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService]
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService])
    ], MandatoryLayerComponent);
    return MandatoryLayerComponent;
}());
exports.MandatoryLayerComponent = MandatoryLayerComponent;
//# sourceMappingURL=mandatory-layer.component.js.map