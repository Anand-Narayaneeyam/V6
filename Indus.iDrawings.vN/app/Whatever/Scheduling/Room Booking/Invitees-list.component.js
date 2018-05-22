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
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var dynamiclist_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dynamiclist.component');
var Invitees_checkboxgrid_component_1 = require('./Invitees-checkboxgrid.component');
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var Invitees = (function () {
    function Invitees() {
        this.pageTitle = "Invitees";
        this.InviteesListForInsert = "";
        this.InviteesList = new core_1.EventEmitter();
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    }
    Invitees.prototype.ngOnInit = function () {
    };
    Invitees.prototype.onSubmitData = function (event) {
    };
    Invitees.prototype.listbuttonadd = function (event) {
        var ContextObj = this;
        ContextObj.list = event["List"];
        ContextObj.splitviewInput.showSecondaryView = !ContextObj.splitviewInput.showSecondaryView;
    };
    Invitees.prototype.listbuttondelete = function (event) {
        var ContextObj = this;
        var tempInviteesList = "";
        document.getElementById(ContextObj.list.lastElementChild.id).remove();
        ContextObj.Checkboxvalues.pop();
        for (var i = 0; i < ContextObj.Checkboxvalues.length; i++) {
            tempInviteesList = ContextObj.Checkboxvalues[i]["Value"].split("µ")[0] + "µ" + ContextObj.Checkboxvalues[i]["Value"].split("µ")[1];
            ContextObj.ShowinListItem = ContextObj.Checkboxvalues[i]["Value"].split("µ")[2];
            ContextObj.InviteesListForInsert = ContextObj.InviteesListForInsert + tempInviteesList + "µ1µ§";
        }
        ContextObj.InviteesList.emit({ "InviteesList": ContextObj.InviteesListForInsert });
    };
    Invitees.prototype.Remove = function () {
        var ContextObj = this;
        var temp = ContextObj;
        //ContextObj.Selectedhtml = temp;
        //ContextObj.SelectedLiId = ContextObj.Selectedhtml.id;         
    };
    Invitees.prototype.OnSuccessfulSubmit = function (event) {
        var ContextObj = this;
        var tempInviteesList = "";
        ContextObj.Checkboxvalues = [];
        ContextObj.Checkboxvalues = event["arrayList"];
        for (var i_1 = 0; i_1 < ContextObj.Checkboxvalues.length; i_1++) {
            tempInviteesList = ContextObj.Checkboxvalues[i_1]["Value"].split("µ")[0] + "µ" + ContextObj.Checkboxvalues[i_1]["Value"].split("µ")[1];
            ContextObj.ShowinListItem = ContextObj.Checkboxvalues[i_1]["Value"].split("µ")[2];
            ContextObj.InviteesListForInsert = ContextObj.InviteesListForInsert + tempInviteesList + "µ1µ§";
            var entry = document.createElement('li');
            entry.id = i_1.toString();
            entry.innerHTML = ContextObj.ShowinListItem;
            ContextObj.list.appendChild(entry);
        }
        var lis = document.getElementById("dlist").getElementsByTagName('li');
        for (var i = 0; i < lis.length; i++) {
            lis[i].addEventListener('click', this.Remove, false);
        }
        ContextObj.InviteesList.emit({ "InviteesList": ContextObj.InviteesListForInsert });
        ContextObj.splitviewInput.showSecondaryView = !ContextObj.splitviewInput.showSecondaryView;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Invitees.prototype, "InviteesList", void 0);
    Invitees = __decorate([
        core_1.Component({
            selector: 'Invitees-list',
            templateUrl: './app/Views/Scheduling/Room Booking/Invitees-list.component.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, dynamiclist_component_1.DynamicListComponent, split_view_component_1.SplitViewComponent, Invitees_checkboxgrid_component_1.Inviteescheckboxgrid],
            providers: [scheduling_service_1.SchedulingService, notify_service_1.NotificationService],
            inputs: ['InviteesField']
        }), 
        __metadata('design:paramtypes', [])
    ], Invitees);
    return Invitees;
}());
exports.Invitees = Invitees;
//# sourceMappingURL=Invitees-list.component.js.map