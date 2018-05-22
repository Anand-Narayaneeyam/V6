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
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var dynamiclist_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dynamiclist.component');
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var CustomServiceAdd_component_1 = require('./CustomServiceAdd.component');
var Services = (function () {
    function Services() {
        this.Servicevalueforinsert = "";
        this.ServiceList = new core_1.EventEmitter();
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    }
    Services.prototype.ngOnInit = function () {
    };
    Services.prototype.listbuttonadd = function (event) {
        var ContextObj = this;
        ContextObj.list = event["List"];
        ContextObj.splitviewInput.showSecondaryView = !ContextObj.splitviewInput.showSecondaryView;
    };
    Services.prototype.listbuttondelete = function (event) {
        var ContextObj = this;
        var tempServiceList = "";
        ContextObj.Servicevalueforinsert = "";
        document.getElementById(ContextObj.list.lastElementChild.id).remove();
        ContextObj.Service.pop();
        for (var i = 0; i < ContextObj.Service.length; i++) {
            tempServiceList = ContextObj.Service[i]["InsertValue"];
            ContextObj.Servicevalueforinsert = ContextObj.Servicevalueforinsert + tempServiceList;
        }
        ContextObj.ServiceList.emit({ "ServiceList": ContextObj.Servicevalueforinsert });
    };
    Services.prototype.Remove = function () {
        var ContextObj = this;
        var temp = ContextObj;
    };
    Services.prototype.OnSuccessfulSubmit = function (event) {
        var ContextObj = this;
        var tempInviteesList = "";
        ContextObj.Servicevalueforinsert = event["Servicevalue"];
        ContextObj.Service = event["arrayList"];
        for (var i_1 = 0; i_1 < ContextObj.Service.length; i_1++) {
            ContextObj.ShowinListItem = ContextObj.Service[i_1]["Value"];
            var entry = document.createElement('li');
            entry.id = i_1.toString();
            entry.innerHTML = ContextObj.ShowinListItem;
            ContextObj.list.appendChild(entry);
        }
        var lis = document.getElementById("dlist").getElementsByTagName('li');
        for (var i = 0; i < lis.length; i++) {
            lis[i].addEventListener('click', this.Remove, false);
        }
        ContextObj.ServiceList.emit({ "ServiceList": ContextObj.Servicevalueforinsert });
        ContextObj.splitviewInput.showSecondaryView = !ContextObj.splitviewInput.showSecondaryView;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Services.prototype, "ServiceList", void 0);
    Services = __decorate([
        core_1.Component({
            selector: 'Services-listforresrvation',
            templateUrl: './app/Views/Scheduling/Room Booking/Services-listforresrvation.component.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, dynamiclist_component_1.DynamicListComponent, split_view_component_1.SplitViewComponent, CustomServiceAdd_component_1.ServicesCustomadd],
            providers: [scheduling_service_1.SchedulingService, notify_service_1.NotificationService],
            inputs: ['ServiceField']
        }), 
        __metadata('design:paramtypes', [])
    ], Services);
    return Services;
}());
exports.Services = Services;
//# sourceMappingURL=Services-listforresrvation.component.js.map