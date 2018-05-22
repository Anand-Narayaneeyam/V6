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
var Catering_listCustomadd_component_1 = require('./Catering-listCustomadd.component');
var Catering = (function () {
    function Catering() {
        this.Cateringvalueforinsert = "";
        this.CateringList = new core_1.EventEmitter();
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    }
    Catering.prototype.ngOnInit = function () {
    };
    Catering.prototype.listbuttonadd = function (event) {
        var ContextObj = this;
        ContextObj.list = event["List"];
        ContextObj.splitviewInput.showSecondaryView = !ContextObj.splitviewInput.showSecondaryView;
    };
    Catering.prototype.listbuttondelete = function (event) {
        var ContextObj = this;
        var tempCateringList = "";
        ContextObj.Cateringvalueforinsert = "";
        document.getElementById(ContextObj.list.lastElementChild.id).remove();
        ContextObj.Catering.pop();
        for (var i = 0; i < ContextObj.Catering.length; i++) {
            tempCateringList = ContextObj.Catering[i]["InsertValue"];
            ContextObj.Cateringvalueforinsert = ContextObj.Cateringvalueforinsert + tempCateringList;
        }
        ContextObj.CateringList.emit({ "CateringList": ContextObj.Cateringvalueforinsert });
    };
    Catering.prototype.Remove = function () {
        var ContextObj = this;
        var temp = ContextObj;
    };
    Catering.prototype.OnSuccessfulSubmit = function (event) {
        var ContextObj = this;
        var tempCateringList = "";
        ContextObj.Cateringvalueforinsert = event["Cateringvalue"];
        ContextObj.Catering = event["arrayList"];
        for (var i_1 = 0; i_1 < ContextObj.Catering.length; i_1++) {
            ContextObj.ShowinListItem = ContextObj.Catering[i_1]["Value"];
            var entry = document.createElement('li');
            entry.id = i_1.toString();
            entry.innerHTML = ContextObj.ShowinListItem;
            ContextObj.list.appendChild(entry);
        }
        var lis = document.getElementById("dlist").getElementsByTagName('li');
        for (var i = 0; i < lis.length; i++) {
            lis[i].addEventListener('click', this.Remove, false);
        }
        ContextObj.CateringList.emit({ "CateringList": ContextObj.Cateringvalueforinsert });
        ContextObj.splitviewInput.showSecondaryView = !ContextObj.splitviewInput.showSecondaryView;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Catering.prototype, "CateringList", void 0);
    Catering = __decorate([
        core_1.Component({
            selector: 'Catering-listforreservation',
            templateUrl: './app/Views/Scheduling/Room Booking/Catering-listforreservation.component.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, dynamiclist_component_1.DynamicListComponent, split_view_component_1.SplitViewComponent, Catering_listCustomadd_component_1.CateringCustomadd],
            providers: [scheduling_service_1.SchedulingService, notify_service_1.NotificationService],
            inputs: ['CateringField']
        }), 
        __metadata('design:paramtypes', [])
    ], Catering);
    return Catering;
}());
exports.Catering = Catering;
//# sourceMappingURL=Catering-listforreservation.component.js.map