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
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var space_service_1 = require('../../../Models/Space/space.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var amenities_assignspacestd_component_1 = require('./amenities-assignspacestd.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var scheduling_service_1 = require('../../../models/scheduling/scheduling.service');
var seatlist_component_1 = require('../../Scheduling/Seat Booking/seatlist.component');
var General_1 = require('../../../Models/Common/General');
var AssignSpaceStd = (function () {
    function AssignSpaceStd(notificationService, spaceService, SchedulingService, generFun) {
        this.notificationService = notificationService;
        this.spaceService = spaceService;
        this.SchedulingService = SchedulingService;
        this.generFun = generFun;
        this.category = "";
        this.dataKey = "Id";
        this.blnShowAmenityList = false;
        this.blnShowSeatList = false;
        this.btnName = "Assign";
        this.pageTitle = "";
        this.strSelectedAmenities = "";
        this.assignDeassignSuccess = new core_1.EventEmitter();
        this.isSeatBookingFeature = false;
        this.roomSeats = 0;
        this.roomSeatcapacity = 0;
        this.splitview = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
        this.showDeassignSeats = false;
        this.showAssignSeats = false;
        this.teamRoomReqIds = [];
        this.workSpaceReqIds = [];
        this.multiplespacedrawingId = [];
        this.multiplespacerommnumber = [];
        this.reportFieldIdArraySpaceId = [];
        this.maxcount = 0;
        this.maxhotellingcount = 0;
        this.seatspacearray = null;
        this.enableAminity = false;
        var context = this;
        context.formHeight = window.innerHeight - 200;
        context.formHeight = context.formHeight + "px";
        this.spaceService.checkSubscribedFeature('187').subscribe(function (result) {
            context.isSeatBookingFeature = result["Data"][0]["IsSubscribed"];
        });
    }
    AssignSpaceStd.prototype.ngOnInit = function () {
        this.selectionManagement();
    };
    AssignSpaceStd.prototype.selectionManagement = function () {
        var contextObj = this;
        if (contextObj.multipledata) {
            contextObj.selectedId = [];
            for (var i = 0; i < contextObj.multipledata.length; i++) {
                contextObj.selectedId.push(contextObj.multipledata[i]["SpaceId"]);
                contextObj.multiplespacedrawingId.push({ SpaceId: contextObj.multipledata[i]["SpaceId"], DrawingId: contextObj.multipledata[i]["DrawingId"] });
                contextObj.multiplespacerommnumber.push({ SpaceId: contextObj.multipledata[i]["SpaceId"], RoomNo: contextObj.multipledata[i]["Room No."] });
                contextObj.reportFieldIdArraySpaceId.push({ ReportFieldId: 6712, Value: contextObj.multipledata[i]["SpaceId"].toString() });
            }
        }
        else {
            if (contextObj.selectedId && !(contextObj.selectedId.length)) {
                var tempselId = contextObj.selectedId;
                contextObj.selectedId = [];
                contextObj.selectedId.push(tempselId);
            }
        }
    };
    AssignSpaceStd.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        if (contextObj.fieldDetails != undefined) {
            contextObj.fieldDetailsold = contextObj.fieldDetails.slice();
            contextObj.fieldDetailsold.find(function (el) {
                if (el.ReportFieldId == 6729) {
                    contextObj.oldTypeId = el.FieldValue;
                    return true;
                }
            });
        }
        contextObj.SchedulingService.checkSubscribedFeature('282').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.enableAminity = result["Data"][0]["IsSubscribed"];
            }
        });
    };
    AssignSpaceStd.prototype.getAmenities = function (event) {
        this.strSelectedAmenities = event;
        this.splitview.showSecondaryView = false;
    };
    AssignSpaceStd.prototype.onSubmitAssignData = function (event) {
        this.selectionManagement();
        var contextObj = this;
        var assignmnttype;
        contextObj.workSpaceReqIds = [];
        contextObj.teamRoomReqIds = [];
        contextObj.addfields = event.fieldobject;
        contextObj.workSpaceReqIds = [];
        var row = contextObj.fieldDetails.find(function (el) {
            return el.FieldId === 701;
        });
        var count = 0;
        var capactiy;
        this.fieldDetails.find(function (el) {
            if (el.ReportFieldId == 6729) {
                assignmnttype = el.FieldValue;
                count++;
            }
            if (el.ReportFieldId == 6730) {
                capactiy = el;
                count++;
            }
            if (count == 2)
                return true;
            else
                return false;
        });
        /*
        Check whether seat capacity is less than the number of seat that already exists
         */
        var reportFieldIdArray = [];
        if (!contextObj.multipledata) {
            for (var i = 0; i < contextObj.selectedId.length; i++) {
                reportFieldIdArray.push({ ReportFieldId: 8795, Value: contextObj.selectedId[i].toString() });
            }
        }
        else {
            for (var i = 0; i < contextObj.multipledata.length; i++) {
                reportFieldIdArray.push({ ReportFieldId: 8795, Value: contextObj.multipledata[i]["SpaceId"].toString() });
            }
        }
        count = 0;
        this.SchedulingService.maxseatscount(JSON.stringify(reportFieldIdArray), 0, '', 'ASC').subscribe(function (resultData) {
            contextObj.maxcount = resultData;
            if (contextObj.maxcount > Number(capactiy.FieldValue) && (assignmnttype == "1" || assignmnttype == "4" || assignmnttype == "5" || assignmnttype == "6") && Number(capactiy.FieldValue >= 0)) {
                contextObj.notificationService.ShowToaster("Room Seating Capacity should be greater than the number of Seats", 2);
                contextObj.fieldDetails.find(function (el) {
                    if (el.ReportFieldId == 6730) {
                        if (el.HasValidationError == false) {
                            el.FieldValue = contextObj.maxcount.toString();
                        }
                        count++;
                        return true;
                    }
                    else {
                        count = 0;
                        return false;
                    }
                });
            }
            if (count == 0) {
                if (!(this.multipledata)) {
                    if (row.FieldValue != "1" && !(row.FieldValue == "5" && contextObj.oldTypeId == "1") && !(row.FieldValue == contextObj.oldTypeId)) {
                        contextObj.spaceService.checkActiveReservationSeat(contextObj.selectedId[0]).subscribe(function (resultData) {
                            if (resultData == "0") {
                                contextObj.assignSubmit(0);
                            }
                            else {
                                var Ids = resultData.split('µ');
                                for (var i = 0; i < Ids.length; i++) {
                                    var requestid = Ids[i].split('§');
                                    if (requestid[0] != "") {
                                        if (requestid[1] == "False") {
                                            contextObj.teamRoomReqIds.push(requestid[0]);
                                        }
                                        else {
                                            contextObj.workSpaceReqIds.push(requestid[0]);
                                        }
                                    }
                                }
                                contextObj.showAssignSeats = true;
                            }
                        });
                    }
                    else {
                        contextObj.assignSubmit(0);
                    }
                }
                else {
                    var needcheck = 0;
                    var reportFieldIdArray = [];
                    console.log('multipledata', this.multipledata);
                    for (var i = 0; i < this.multipledata.length; i++) {
                        if (row.FieldValue != "1" && !(row.FieldValue == "5" && contextObj.multipledata[i]["SeatingAssignmentTypeId"] == "1") && !(row.FieldValue == contextObj.multipledata[i]["SeatingAssignmentTypeId"])) {
                            reportFieldIdArray.push({ ReportFieldId: 6712, Value: contextObj.multipledata[i]["SpaceId"].toString() });
                            needcheck++;
                        }
                    }
                    if (needcheck > 0) {
                        contextObj.spaceService.checkActiveReservationSeatMultipleSpace(JSON.stringify(reportFieldIdArray)).subscribe(function (resultData) {
                            console.log("checkActiveReservationSeatMultipleSpace result", resultData);
                            if (resultData == "0")
                                contextObj.assignSubmit(0);
                            else {
                                var Ids = resultData.split('µ');
                                for (var i = 0; i < Ids.length; i++) {
                                    var requestid = Ids[i].split('§');
                                    if (requestid[0] != "") {
                                        if (requestid[1] == "False") {
                                            contextObj.teamRoomReqIds.push(requestid[0]);
                                        }
                                        else {
                                            contextObj.workSpaceReqIds.push(requestid[0]);
                                        }
                                    }
                                }
                                contextObj.showAssignSeats = true;
                            }
                        });
                    }
                    else {
                        contextObj.assignSubmit(0);
                    }
                }
            }
        });
        /*end of seat check */
    };
    AssignSpaceStd.prototype.assignSubmit = function (isCancellation) {
        var contextObj = this;
        var field1 = JSON.parse(contextObj.addfields);
        if (field1[5].Value == "4" || field1[5].Value == "5" || field1[5].Value == "6") {
            if (!this.multipledata) {
                if (field1[1].Value == "") {
                    switch (field1[5].Value) {
                        case "4":
                            contextObj.notificationService.ShowToaster("Room No. is mandatory for assigning Scheduling Space", 2);
                            break;
                        case "5":
                            contextObj.notificationService.ShowToaster("Room No. is mandatory for assigning Hoteling Seat(s)", 2);
                            break;
                        case "6":
                            contextObj.notificationService.ShowToaster("Room No. is mandatory for assigning Special Use Room", 2);
                            break;
                    }
                    return;
                }
            }
            else {
                for (var i = 0; i < this.multipledata.length; i++) {
                    if (this.multipledata[i]["Room No."] == "") {
                        switch (field1[5].Value) {
                            case "4":
                                contextObj.notificationService.ShowToaster("Room No. is mandatory for assigning Scheduling Space", 2);
                                break;
                            case "5":
                                contextObj.notificationService.ShowToaster("Room No. is mandatory for assigning Hoteling Seat(s)", 2);
                                break;
                            case "6":
                                contextObj.notificationService.ShowToaster("Room No. is mandatory for assigning Special Use Room", 2);
                                break;
                        }
                        return;
                    }
                }
            }
        }
        if (this.strSelectedAmenities != "") {
            if (!(this.multipledata)) {
                contextObj.spaceService.assignSpaceStdwithAmenity(contextObj.addfields, this.selectedId[0], this.strSelectedAmenities, this.seledrwgids.toString()).subscribe(function (resultData) {
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 1:
                            contextObj.notificationService.ShowToaster("Space Standard assigned", 3);
                            if (isCancellation == 1) {
                                if (contextObj.workSpaceReqIds.length > 0) {
                                    contextObj.SchedulingService.updateStatusOfRequest(0, 39, 1, contextObj.workSpaceReqIds).subscribe(function (result) {
                                    });
                                }
                                if (contextObj.teamRoomReqIds.length > 0) {
                                    contextObj.SchedulingService.cancelActiveRequests("0", 39, 1, contextObj.teamRoomReqIds).subscribe(function (result) {
                                    });
                                }
                            }
                            contextObj.assignDeassignSuccess.emit({ returnData: resultData["Data"].Data });
                            break;
                    }
                });
            }
            else {
                contextObj.spaceService.assignMultipleSpaceStdwithAmenity(contextObj.addfields, this.selectedId, this.strSelectedAmenities, this.multiplespacedrawingId).subscribe(function (resultData) {
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 1:
                            contextObj.notificationService.ShowToaster("Space Standard assigned", 3);
                            if (isCancellation == 1) {
                                if (contextObj.workSpaceReqIds.length > 0) {
                                    contextObj.SchedulingService.updateStatusOfRequest(0, 39, 1, contextObj.workSpaceReqIds).subscribe(function (result) {
                                    });
                                }
                                if (contextObj.teamRoomReqIds.length > 0) {
                                    contextObj.SchedulingService.cancelActiveRequests("0", 39, 1, contextObj.teamRoomReqIds).subscribe(function (result) {
                                    });
                                }
                            }
                            contextObj.assignDeassignSuccess.emit({ returnData: resultData["Data"].Data });
                            break;
                    }
                });
            }
        }
        else {
            contextObj.assign(1, contextObj, contextObj.addfields);
        }
    };
    AssignSpaceStd.prototype.assign = function (target, contextObj, fldObj) {
        var count = 0;
        var fldObj1 = JSON.parse(fldObj);
        var rowdata = fldObj1.filter(function (item) {
            return item.ReportFieldId == 6729;
        });
        fldObj1.filter(function (item) {
            if (item.ReportFieldId == 271) {
                item.Value = contextObj.moduleId;
            }
            if (item.ReportFieldId == 6730) {
                //if (Number(item.Value) == 0 && (rowdata.FieldValue == "1" && rowdata.FieldValue != "2")) {
                //    item.Value = contextObj.roomSeats == 0 ? 1 : contextObj.roomSeats;
                //}
                if (Number(item.Value) == 0 && (rowdata[0].Value == "5" || rowdata[0].Value == "6"))
                    item.Value = contextObj.roomSeats == 0 ? 1 : contextObj.roomSeats;
            }
            if (item.ReportFieldId == 6731) {
                if (rowdata[0].Value == "5" || rowdata[0].Value == "6")
                    item.Value = item.Value == "0" ? "1" : item.Value;
            }
            count++;
            if (count == fldObj1.length)
                return true;
        });
        if (!(contextObj.multipledata)) {
            contextObj.spaceService.assignSpaceStd(JSON.stringify(fldObj1), contextObj.selectedId[0], contextObj.seledrwgids.toString()).subscribe(function (resultData) {
                var resultspacestd = resultData;
                switch (resultData["Data"].StatusId) {
                    case 0:
                        if (target == 1) {
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        }
                        break;
                    case 1:
                        if (target == 1) {
                            var count = 0;
                            var assignementtype = "";
                            var hotelimgseat = "";
                            var roomcapacity = "0";
                            contextObj.fieldDetails.find(function (item) {
                                switch (item.ReportFieldId) {
                                    case 6730:
                                        roomcapacity = item.FieldValue == "0" ? "1" : item.FieldValue;
                                        break;
                                    case 6729:
                                        assignementtype = item.FieldValue;
                                        break;
                                }
                            });
                            hotelimgseat = roomcapacity;
                            if (contextObj.isSeatBookingFeature) {
                                var reportFieldIdArray = [];
                                for (var i = 0; i < contextObj.selectedId.length; i++) {
                                    reportFieldIdArray.push({ ReportFieldId: 8795, Value: contextObj.selectedId[i].toString() });
                                }
                                if (assignementtype == "5") {
                                    //Adding Hoteling Seats automatically
                                    contextObj.SchedulingService.seatsListData(JSON.stringify(reportFieldIdArray), 0, '', 'ASC').subscribe(function (resultData) {
                                        if (resultData["Data"].DataCount <= Number(roomcapacity)) {
                                            contextObj.spaceService.AssignHotellingSeatToSpace(contextObj.selectedId[0], roomcapacity, contextObj.DrawingId, contextObj.moduleId, false).subscribe(function (resultData1) {
                                                if (contextObj.workSpaceReqIds.length > 0) {
                                                    contextObj.SchedulingService.updateStatusOfRequest(0, 39, 1, contextObj.workSpaceReqIds).subscribe(function (result1) {
                                                    });
                                                }
                                                if (contextObj.teamRoomReqIds.length > 0) {
                                                    contextObj.SchedulingService.cancelActiveRequests(0, 39, 1, contextObj.teamRoomReqIds).subscribe(function (result2) {
                                                    });
                                                }
                                                contextObj.assignDeassignSuccess.emit({ returnData: resultData1["Data"], target: target, type: assignementtype });
                                                //room insertion
                                            });
                                        }
                                        else {
                                            if (contextObj.workSpaceReqIds.length > 0) {
                                                contextObj.SchedulingService.updateStatusOfRequest(0, 39, 1, contextObj.workSpaceReqIds).subscribe(function (result1) {
                                                });
                                            }
                                            if (contextObj.teamRoomReqIds.length > 0) {
                                                contextObj.SchedulingService.cancelActiveRequests(0, 39, 1, contextObj.teamRoomReqIds).subscribe(function (result2) {
                                                });
                                            }
                                            contextObj.assignDeassignSuccess.emit({ returnData: resultspacestd["Data"].Data, target: target, type: assignementtype });
                                        }
                                    });
                                }
                                else if (assignementtype == "6") {
                                    //Adding Hoteling Seats automatically
                                    contextObj.SchedulingService.seatsListData(JSON.stringify(reportFieldIdArray), 0, '', 'ASC').subscribe(function (resultData) {
                                        if (resultData["Data"].DataCount <= Number(roomcapacity)) {
                                            contextObj.spaceService.AssignSpecialRoomSeatToSpace(contextObj.selectedId[0], roomcapacity, "6", contextObj.DrawingId, contextObj.moduleId).subscribe(function (resultData1) {
                                                if (contextObj.workSpaceReqIds.length > 0) {
                                                    contextObj.SchedulingService.updateStatusOfRequest(0, 39, 1, contextObj.workSpaceReqIds).subscribe(function (result1) {
                                                    });
                                                }
                                                if (contextObj.teamRoomReqIds.length > 0) {
                                                    contextObj.SchedulingService.cancelActiveRequests(0, 39, 1, contextObj.teamRoomReqIds).subscribe(function (result2) {
                                                    });
                                                }
                                                contextObj.assignDeassignSuccess.emit({ returnData: resultData1["Data"].Data, target: target, type: assignementtype });
                                                //room insertion
                                            });
                                        }
                                        else {
                                            if (contextObj.workSpaceReqIds.length > 0) {
                                                contextObj.SchedulingService.updateStatusOfRequest(0, 39, 1, contextObj.workSpaceReqIds).subscribe(function (result1) {
                                                });
                                            }
                                            if (contextObj.teamRoomReqIds.length > 0) {
                                                contextObj.SchedulingService.cancelActiveRequests(0, 39, 1, contextObj.teamRoomReqIds).subscribe(function (result2) {
                                                });
                                            }
                                            contextObj.assignDeassignSuccess.emit({ returnData: resultspacestd["Data"].Data, target: target, type: assignementtype });
                                        }
                                    });
                                }
                                else {
                                    //cancellation of reserved seat
                                    //  if (assignementtype != "1") {
                                    if (contextObj.workSpaceReqIds.length > 0) {
                                        contextObj.SchedulingService.updateStatusOfRequest(0, 39, 1, contextObj.workSpaceReqIds).subscribe(function (result) {
                                        });
                                    }
                                    if (contextObj.teamRoomReqIds.length > 0) {
                                        contextObj.SchedulingService.cancelActiveRequests(0, 39, 1, contextObj.teamRoomReqIds).subscribe(function (result) {
                                        });
                                    }
                                    contextObj.assignDeassignSuccess.emit({ returnData: resultspacestd["Data"].Data, target: target, type: assignementtype });
                                }
                            }
                            else {
                                contextObj.assignDeassignSuccess.emit({ returnData: resultspacestd["Data"].Data, target: target, type: assignementtype });
                            }
                            contextObj.notificationService.ShowToaster("Space Standard assigned", 3);
                        }
                        break;
                }
            });
        }
        else {
            var maxvalueforseatlist = 0;
            contextObj.spaceService.assignMultipleSpaceStd(JSON.stringify(fldObj1), contextObj.selectedId, contextObj.multiplespacedrawingId, contextObj.seatspacearray).subscribe(function (resultData) {
                var resultspacestd = resultData;
                switch (resultData["Data"].StatusId) {
                    case 0:
                        if (target == 1) {
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        }
                        break;
                    case 1:
                        if (target == 1) {
                            var count = 0;
                            var assignementtype = "";
                            var hotelimgseat = "";
                            var roomcapacity = "0";
                            contextObj.fieldDetails.find(function (item) {
                                switch (item.ReportFieldId) {
                                    case 6730:
                                        roomcapacity = item.FieldValue == "0" ? "1" : item.FieldValue;
                                        break;
                                    case 6729:
                                        assignementtype = item.FieldValue;
                                        break;
                                }
                            });
                            hotelimgseat = roomcapacity;
                            if (contextObj.isSeatBookingFeature) {
                                var reportFieldIdArray = [];
                                for (var i = 0; i < contextObj.selectedId.length; i++) {
                                    reportFieldIdArray.push({ ReportFieldId: 8795, Value: contextObj.selectedId[i].toString() });
                                }
                                if (assignementtype == "5") {
                                    //Adding Hoteling Seats automatically
                                    contextObj.SchedulingService.maxseatscount(JSON.stringify(reportFieldIdArray), 0, '', 'ASC').subscribe(function (resultData) {
                                        contextObj.maxcount = resultData;
                                        if (contextObj.maxcount <= Number(roomcapacity)) {
                                            contextObj.spaceService.AssignHotellingSeatToMultipleSpace(contextObj.selectedId, roomcapacity, contextObj.multiplespacedrawingId, contextObj.moduleId, false).subscribe(function (resultData1) {
                                                if (contextObj.workSpaceReqIds.length > 0) {
                                                    contextObj.SchedulingService.updateStatusOfRequest(0, 39, 1, contextObj.workSpaceReqIds).subscribe(function (result1) {
                                                    });
                                                }
                                                if (contextObj.teamRoomReqIds.length > 0) {
                                                    contextObj.SchedulingService.cancelActiveRequests(0, 39, 1, contextObj.teamRoomReqIds).subscribe(function (result2) {
                                                    });
                                                }
                                                contextObj.assignDeassignSuccess.emit({ returnData: resultspacestd["Data"].Data, target: target, type: assignementtype });
                                                //room insertion
                                            });
                                        }
                                        else {
                                            if (contextObj.workSpaceReqIds.length > 0) {
                                                contextObj.SchedulingService.updateStatusOfRequest(0, 39, 1, contextObj.workSpaceReqIds).subscribe(function (result1) {
                                                });
                                            }
                                            if (contextObj.teamRoomReqIds.length > 0) {
                                                contextObj.SchedulingService.cancelActiveRequests(0, 39, 1, contextObj.teamRoomReqIds).subscribe(function (result2) {
                                                });
                                            }
                                            contextObj.notificationService.ShowToaster("Room Seating Capacity should be greater than the number of Seats", 2);
                                            contextObj.fieldDetails.find(function (el) {
                                                if (el.ReportFieldId == 6730) {
                                                    if (el.HasValidationError == false) {
                                                        el.FieldValue = contextObj.maxcount.toString();
                                                    }
                                                    return true;
                                                }
                                                else
                                                    return false;
                                            });
                                        }
                                    });
                                }
                                else if (assignementtype == "6") {
                                    //Adding Hoteling Seats automatically
                                    contextObj.SchedulingService.maxseatscount(JSON.stringify(reportFieldIdArray), 0, '', 'ASC').subscribe(function (resultData) {
                                        contextObj.maxcount = resultData;
                                        if (contextObj.maxcount <= Number(roomcapacity)) {
                                            contextObj.spaceService.AssignSpecialRoomSeatToMultipleSpace(contextObj.selectedId, roomcapacity, "6", contextObj.multiplespacedrawingId, contextObj.moduleId).subscribe(function (resultData1) {
                                                if (contextObj.workSpaceReqIds.length > 0) {
                                                    contextObj.SchedulingService.updateStatusOfRequest(0, 39, 1, contextObj.workSpaceReqIds).subscribe(function (result1) {
                                                    });
                                                }
                                                if (contextObj.teamRoomReqIds.length > 0) {
                                                    contextObj.SchedulingService.cancelActiveRequests(0, 39, 1, contextObj.teamRoomReqIds).subscribe(function (result2) {
                                                    });
                                                }
                                                contextObj.assignDeassignSuccess.emit({ returnData: resultspacestd["Data"].Data, target: target, type: assignementtype });
                                                //room insertion
                                            });
                                        }
                                        else {
                                            if (contextObj.workSpaceReqIds.length > 0) {
                                                contextObj.SchedulingService.updateStatusOfRequest(0, 39, 1, contextObj.workSpaceReqIds).subscribe(function (result1) {
                                                });
                                            }
                                            if (contextObj.teamRoomReqIds.length > 0) {
                                                contextObj.SchedulingService.cancelActiveRequests(0, 39, 1, contextObj.teamRoomReqIds).subscribe(function (result2) {
                                                });
                                            }
                                            contextObj.notificationService.ShowToaster("Room Seating Capacity should be greater than the number of Seats", 2);
                                            contextObj.fieldDetails.find(function (el) {
                                                if (el.ReportFieldId == 6730) {
                                                    if (el.HasValidationError == false) {
                                                        el.FieldValue = contextObj.maxcount.toString();
                                                    }
                                                    return true;
                                                }
                                                else
                                                    return false;
                                            });
                                        }
                                    });
                                }
                                else if (assignementtype == "1") {
                                    //Adding Hoteling Seats automatically
                                    contextObj.SchedulingService.maxseatscount(JSON.stringify(reportFieldIdArray), 0, '', 'ASC').subscribe(function (resultData) {
                                        contextObj.maxcount = resultData;
                                        if (contextObj.maxcount <= Number(roomcapacity)) {
                                            if (contextObj.workSpaceReqIds.length > 0) {
                                                contextObj.SchedulingService.updateStatusOfRequest(0, 39, 1, contextObj.workSpaceReqIds).subscribe(function (result1) {
                                                });
                                            }
                                            if (contextObj.teamRoomReqIds.length > 0) {
                                                contextObj.SchedulingService.cancelActiveRequests(0, 39, 1, contextObj.teamRoomReqIds).subscribe(function (result2) {
                                                });
                                            }
                                            contextObj.assignDeassignSuccess.emit({ returnData: resultspacestd["Data"].Data, target: target, type: assignementtype });
                                            contextObj.fieldDetails.find(function (el) {
                                                if (el.ReportFieldId == 6731) {
                                                    if (el.HasValidationError == false) {
                                                        el.FieldValue = contextObj.maxcount.toString();
                                                    }
                                                    return true;
                                                }
                                                else
                                                    return false;
                                            });
                                        }
                                        else {
                                            if (contextObj.workSpaceReqIds.length > 0) {
                                                contextObj.SchedulingService.updateStatusOfRequest(0, 39, 1, contextObj.workSpaceReqIds).subscribe(function (result1) {
                                                });
                                            }
                                            if (contextObj.teamRoomReqIds.length > 0) {
                                                contextObj.SchedulingService.cancelActiveRequests(0, 39, 1, contextObj.teamRoomReqIds).subscribe(function (result2) {
                                                });
                                            }
                                            contextObj.notificationService.ShowToaster("Room Seating Capacity should be greater than the number of Seats", 2);
                                            var count = 0;
                                            contextObj.fieldDetails.find(function (el) {
                                                if (el.ReportFieldId == 6730) {
                                                    count++;
                                                    if (el.HasValidationError == false) {
                                                        el.FieldValue = contextObj.maxcount.toString();
                                                    }
                                                }
                                                else if (el.ReportFieldId == 6731) {
                                                    count++;
                                                    if (el.HasValidationError == false) {
                                                        el.FieldValue = contextObj.maxcount.toString();
                                                    }
                                                }
                                                if (count == 2)
                                                    return true;
                                                else
                                                    return false;
                                            });
                                        }
                                    });
                                }
                                else {
                                    //cancellation of reserved seat
                                    //  if (assignementtype != "1") {
                                    if (contextObj.workSpaceReqIds.length > 0) {
                                        contextObj.SchedulingService.updateStatusOfRequest(0, 39, 1, contextObj.workSpaceReqIds).subscribe(function (result) {
                                        });
                                    }
                                    if (contextObj.teamRoomReqIds.length > 0) {
                                        contextObj.SchedulingService.cancelActiveRequests(0, 39, 1, contextObj.teamRoomReqIds).subscribe(function (result) {
                                        });
                                    }
                                    contextObj.assignDeassignSuccess.emit({ returnData: resultspacestd["Data"].Data, target: target, type: assignementtype });
                                }
                            }
                            else {
                                contextObj.assignDeassignSuccess.emit({ returnData: resultspacestd["Data"].Data, target: target, type: assignementtype });
                            }
                            contextObj.notificationService.ShowToaster("Space Standard assigned", 3);
                        }
                        break;
                }
            });
        }
    };
    AssignSpaceStd.prototype.DeAssignSpaceStd = function (event) {
        var contextObj = this;
        contextObj.workSpaceReqIds = [];
        if (!contextObj.multipledata) {
            contextObj.spaceService.checkActiveReservationSeat(contextObj.selectedId[0]).subscribe(function (resultData) {
                if (resultData != "0") {
                    var Ids = resultData.split('µ');
                    for (var i = 0; i < Ids.length; i++) {
                        var requestid = Ids[i].split('§');
                        if (requestid[0] != "") {
                            if (requestid[1] == "False") {
                                contextObj.teamRoomReqIds.push(requestid[0]);
                            }
                            else {
                                contextObj.workSpaceReqIds.push(requestid[0]);
                            }
                        }
                    }
                }
                if (resultData == "0") {
                    contextObj.spaceService.deAssignSpaceStd(contextObj.selectedId[0], contextObj.seledrwgids.toString()).subscribe(function (resultData) {
                        switch (resultData["StatusId"]) {
                            case 0:
                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                break;
                            case 1:
                                contextObj.notificationService.ShowToaster("Space Standard de-assigned", 3);
                                contextObj.assignDeassignSuccess.emit({ returnData: resultData["Data"] });
                                break;
                        }
                    });
                }
                else {
                    contextObj.showDeassignSeats = true;
                }
            });
        }
        else {
            console.log('deassign for multiple');
            this.selectionManagement();
            contextObj.spaceService.checkActiveReservationSeatMultipleSpace(JSON.stringify(contextObj.reportFieldIdArraySpaceId)).subscribe(function (resultData) {
                if (resultData != "0") {
                    var Ids = resultData.split('µ');
                    for (var i = 0; i < Ids.length; i++) {
                        var requestid = Ids[i].split('§');
                        if (requestid[0] != "") {
                            if (requestid[1] == "False") {
                                contextObj.teamRoomReqIds.push(requestid[0]);
                            }
                            else {
                                contextObj.workSpaceReqIds.push(requestid[0]);
                            }
                        }
                    }
                    contextObj.showDeassignSeats = true;
                }
                else {
                    contextObj.spaceService.deAssignMultipleSpaceStd(contextObj.selectedId, contextObj.multiplespacedrawingId).subscribe(function (resultData) {
                        switch (resultData["StatusId"]) {
                            case 0:
                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                break;
                            case 1:
                                contextObj.notificationService.ShowToaster("Space Standard de-assigned", 3);
                                contextObj.assignDeassignSuccess.emit({ returnData: resultData["Data"] });
                                break;
                        }
                    });
                }
            });
        }
    };
    AssignSpaceStd.prototype.ddlChange = function (arg) {
        //spacestandard  
        var contextObj = this;
        var ddlSpaceTypeValue = "";
        var rptFieldId = arg.ddlRelationShipEvent.ChildFieldObject;
        contextObj.category = rptFieldId.FieldValue;
        var count = 0;
        var roomcapacity = "";
        var hotelingseat = "";
        contextObj.fieldDetails.find(function (item) {
            switch (item.ReportFieldId) {
                case 6730:
                    roomcapacity = item.FieldValue;
                    count++;
                    break;
                case 6731:
                    hotelingseat = item.FieldValue;
                    count++;
                    break;
            }
            if (count == 2)
                return true;
        });
        if (rptFieldId.ReportFieldId == 790) {
            contextObj.spaceService.getSpaceStandardDescrpn(rptFieldId.FieldValue).subscribe(function (resultData) {
                contextObj.fieldDetails.find(function (item) {
                    if (item.ReportFieldId == 818) {
                        item.FieldValue = resultData;
                        return true;
                    }
                    else
                        return false;
                });
            });
        }
        //space assignmenttype
        if (rptFieldId.ReportFieldId == 6729) {
            var mandatory = false;
            var fldVal = "";
            var enable = false;
            var visible = false;
            if (rptFieldId.FieldValue == "1" || rptFieldId.FieldValue == "4" || rptFieldId.FieldValue == "5" || rptFieldId.FieldValue == "6") {
                mandatory = true;
                fldVal = (hotelingseat == "" || hotelingseat == "0" || hotelingseat == null) ? "1" : hotelingseat;
                enable = true;
            }
            var reportFieldIdArray = [];
            var seat = contextObj.fieldDetails.find(function (item) { return item.ReportFieldId === 6730; }).FieldValue;
            if (contextObj.multipledata) {
                for (var i = 0; i < contextObj.multipledata.length; i++) {
                    reportFieldIdArray.push({ ReportFieldId: 8795, Value: contextObj.multipledata[i]["SpaceId"].toString() });
                }
            }
            else
                reportFieldIdArray.push({ ReportFieldId: 8795, Value: contextObj.selectedId[0].toString() });
            if (rptFieldId.FieldValue == "1") {
                contextObj.SchedulingService.maxseatscount(JSON.stringify(reportFieldIdArray), 0, '', 'ASC').subscribe(function (resultData) {
                    contextObj.maxcount = resultData;
                    var count = 0;
                    contextObj.fieldDetails.find(function (item) {
                        switch (item.ReportFieldId) {
                            case 6730:
                                item.FieldValue = contextObj.maxcount.toString();
                                count++;
                                break;
                        }
                        if (count == 1)
                            return true;
                    });
                });
                reportFieldIdArray.push({ ReportFieldId: 8494, Value: "2" });
                contextObj.SchedulingService.maxseatscount(JSON.stringify(reportFieldIdArray), 0, '', 'ASC').subscribe(function (resultData) {
                    contextObj.maxhotellingcount = resultData;
                    var count = 0;
                    contextObj.fieldDetails.find(function (item) {
                        switch (item.ReportFieldId) {
                            case 6731:
                                item.FieldValue = contextObj.maxhotellingcount.toString();
                                count++;
                                break;
                        }
                        if (count == 1)
                            return true;
                    });
                });
            }
            else if (rptFieldId.FieldValue == "5") {
                contextObj.SchedulingService.maxseatscount(JSON.stringify(reportFieldIdArray), 0, '', 'ASC').subscribe(function (resultData) {
                    contextObj.maxcount = resultData;
                    var count = 0;
                    contextObj.fieldDetails.find(function (item) {
                        switch (item.ReportFieldId) {
                            case 6730:
                                item.FieldValue = contextObj.maxcount.toString() == "0" ? "1" : contextObj.maxcount.toString();
                                count++;
                                break;
                        }
                        if (count == 1)
                            return true;
                    });
                });
            }
            else if (rptFieldId.FieldValue == "6") {
                contextObj.SchedulingService.maxseatscount(JSON.stringify(reportFieldIdArray), 0, '', 'ASC').subscribe(function (resultData) {
                    contextObj.maxcount = resultData;
                    var count = 0;
                    contextObj.fieldDetails.find(function (item) {
                        switch (item.ReportFieldId) {
                            case 6730:
                                item.FieldValue = contextObj.maxcount.toString() == "0" ? "1" : contextObj.maxcount.toString();
                                count++;
                                break;
                        }
                        if (count == 1)
                            return true;
                    });
                });
            }
            else if (rptFieldId.FieldValue == "4") {
                contextObj.SchedulingService.maxseatscount(JSON.stringify(reportFieldIdArray), 0, '', 'ASC').subscribe(function (resultData) {
                    contextObj.maxcount = resultData;
                    var count = 0;
                    contextObj.fieldDetails.find(function (item) {
                        switch (item.ReportFieldId) {
                            case 6730:
                                item.FieldValue = contextObj.maxcount.toString() == "0" ? "1" : contextObj.maxcount.toString();
                                count++;
                                break;
                        }
                        if (count == 1)
                            return true;
                    });
                });
            }
            else if (rptFieldId.FieldValue == "2") {
                var count = 0;
                contextObj.fieldDetails.find(function (item) {
                    switch (item.ReportFieldId) {
                        case 6730:
                            item.FieldValue = "0";
                            count++;
                            break;
                    }
                    if (count == 2)
                        return true;
                });
            }
            rptFieldId.LookupDetails.PopupComponent = null;
            this.strPopupText = "";
            ddlSpaceTypeValue = rptFieldId.FieldValue;
            switch (rptFieldId.FieldValue) {
                case "1":
                    var reportFieldIdArray = [];
                    for (var i = 0; i < contextObj.selectedId.length; i++) {
                        reportFieldIdArray.push({ ReportFieldId: 8795, Value: contextObj.selectedId[i].toString() });
                    }
                    //contextObj.SchedulingService.seatsListData(JSON.stringify(reportFieldIdArray), 0, '', 'ASC').subscribe(function (resultData) {
                    //    if (resultData["Data"].DataCount > 0) {
                    //        contextObj.roomSeatcapacity = resultData["Data"].DataCount;
                    //    }
                    //    else
                    //        contextObj.roomSeatcapacity = 0;
                    //    contextObj.fieldDetails.find(function (el) {
                    //        if (el.ReportFieldId == 6730) {
                    //            el.FieldValue = contextObj.roomSeatcapacity.toString();
                    //            return true;
                    //        }
                    //    });
                    //});
                    contextObj.SchedulingService.maxseatscount(JSON.stringify(reportFieldIdArray), 0, '', 'ASC').subscribe(function (resultData) {
                        contextObj.roomSeatcapacity = resultData;
                        var count = 0;
                        contextObj.fieldDetails.find(function (item) {
                            switch (item.ReportFieldId) {
                                case 6730:
                                    item.FieldValue = contextObj.roomSeatcapacity.toString();
                                    count++;
                                    break;
                            }
                            if (count == 1)
                                return true;
                        });
                    });
                    break;
                case "4":
                    contextObj.SchedulingService.getAmenitiesData(0, "", "", '').subscribe(function (resultData) {
                        if (resultData["Data"].DataCount > 0 && contextObj.enableAminity == true) {
                            rptFieldId.LookupDetails.PopupComponent = { Name: "Amenities", showImage: false };
                            contextObj.strPopupText = "Amenities";
                        }
                    });
                    break;
            }
            /*room seating and HotellingSeating txtbox settings*/
            var fldDtls = contextObj.fieldDetails;
            for (var i = 0; i < fldDtls.length; i++) {
                if (fldDtls[i].ReportFieldId == 6730) {
                    fldDtls[i].IsMandatory = mandatory;
                    if (rptFieldId.FieldValue == "1" || rptFieldId.FieldValue == "4" || rptFieldId.FieldValue == "5" || rptFieldId.FieldValue == "6" || rptFieldId.FieldValue == "2") {
                        fldDtls[i].FieldValue = (fldDtls[i].FieldValue == null || fldDtls[i].FieldValue == "") ? fldVal : fldDtls[i].FieldValue;
                    }
                    else {
                        fldDtls[i].FieldValue = fldVal;
                    }
                    fldDtls[i].IsEnabled = enable;
                    if ((ddlSpaceTypeValue == "1" || rptFieldId.FieldValue == "5" || rptFieldId.FieldValue == "6") && contextObj.isSeatBookingFeature) {
                        fldDtls[i].LookupDetails.PopupComponent = { Name: "Seats", showImage: false };
                    }
                    else {
                        fldDtls[i].LookupDetails.PopupComponent = null;
                    }
                    if (rptFieldId.FieldValue == "5" || rptFieldId.FieldValue == "6") {
                        if (fldDtls[i].FieldValue == "" || fldDtls[i].FieldValue == null || fldDtls[i].FieldValue == "0") {
                            fldDtls[i].IsMandatory = true;
                            fldDtls[i].FieldValue = (hotelingseat == "" || hotelingseat == "0" || hotelingseat == null) ? "1" : hotelingseat;
                        }
                    }
                    // common :Bug 76403
                    if (rptFieldId.FieldValue == "5") {
                        fldDtls[i].FieldLabel = "Hoteling Seating Capacity";
                    }
                    else if (rptFieldId.FieldValue != 2) {
                        fldDtls[i].FieldLabel = "Room Seating Capacity";
                        fldDtls[i].FieldValue = contextObj.roomSeatcapacity.toString();
                    }
                }
                if (fldDtls[i].ReportFieldId == 6731) {
                    fldDtls[i].FieldValue = fldDtls[i].FieldValue == "" ? "0" : fldDtls[i].FieldValue;
                    if (ddlSpaceTypeValue == "1" && contextObj.isSeatBookingFeature) {
                        fldDtls[i].IsMandatory = true;
                        fldDtls[i].IsVisible = true;
                    }
                    else {
                        fldDtls[i].IsMandatory = false;
                        fldDtls[i].IsVisible = false;
                    }
                }
            }
        }
    };
    AssignSpaceStd.prototype.popupItemEmit = function (event) {
        this.blnShowSeatList = false;
        this.blnShowAmenityList = false;
        var context = this;
        var roomNo;
        var maxvalueforseatlist = 0;
        this.fieldDetails.find(function (el) {
            if (el.ReportFieldId == 6729) {
                context.category = el.FieldValue;
                /*roomNo,RoomSeatingCapacity*/
                var arrRptFld = [793, 6730];
                var cnt = arrRptFld.length;
                context.fieldDetails.find(function (el) {
                    switch (el.ReportFieldId) {
                        case 793:
                            roomNo = el.FieldValue;
                            context.roomNumber = roomNo;
                            cnt--;
                            break;
                        case 6730:
                            context.roomSeats = Number(el.FieldValue);
                            cnt--;
                            break;
                    }
                    if (cnt == 0)
                        return true;
                    else
                        return false;
                });
                context.selectionManagement();
                var length = 0;
                if (el.FieldValue == "1" || el.FieldValue == "5" || el.FieldValue == "6") {
                    context.pageTitle = "Seats";
                    if (context.multipledata) {
                        length = context.multipledata.length;
                        context.roomNumber = [];
                        for (var i = 0; i < context.multipledata.length; i++) {
                            if (context.multipledata[i]["Room No."] == "") {
                                context.notificationService.ShowToaster("Room No. is mandatory for assigning Hoteling Seat(s)", 2);
                                context.blnShowSeatList = false;
                                return;
                            }
                            else if (context.roomSeats <= 0 || isNaN(context.roomSeats) == true) {
                                context.notificationService.ShowToaster("Room Seating Capacity should be greater than zero", 2);
                                context.blnShowSeatList = false;
                                return;
                            }
                            else {
                                context.roomNumber.push(context.multipledata[i]["Room No."]);
                                context.blnShowSeatList = true;
                            }
                        }
                    }
                    else {
                        length = context.selectedId.length;
                        if (roomNo == "") {
                            context.notificationService.ShowToaster("Room No. is mandatory for assigning Hoteling Seat(s)", 2);
                            context.blnShowSeatList = false;
                        }
                        else {
                            if (context.roomSeats <= 0 || isNaN(context.roomSeats) == true) {
                                context.notificationService.ShowToaster("Room Seating Capacity should be greater than zero", 2);
                                context.blnShowSeatList = false;
                            }
                            else {
                                context.blnShowSeatList = true;
                            }
                        }
                    }
                    var reportFieldIdArray = [];
                    for (var i = 0; i < length; i++) {
                        reportFieldIdArray.push({ ReportFieldId: 8795, Value: context.selectedId[i].toString() });
                    }
                    //Adding Hoteling Seats automatically
                    if (!context.multipledata) {
                        if (el.FieldValue == "5" && context.isSeatBookingFeature == true) {
                            context.SchedulingService.seatsListData(JSON.stringify(reportFieldIdArray), 0, '', 'ASC').subscribe(function (resultData) {
                                if (resultData["Data"].DataCount <= Number(context.roomSeats)) {
                                    context.spaceService.AssignHotellingSeatToSpace(context.selectedId[0], context.roomSeats, context.DrawingId, context.moduleId, false).subscribe(function (resultData) {
                                        //room insertion
                                    });
                                }
                            });
                        }
                        if (el.FieldValue == "6" && context.isSeatBookingFeature == true) {
                            context.SchedulingService.seatsListData(JSON.stringify(reportFieldIdArray), 0, '', 'ASC').subscribe(function (resultData) {
                                if (resultData["Data"].DataCount <= Number(context.roomSeats)) {
                                    context.spaceService.AssignSpecialRoomSeatToSpace(context.selectedId[0], context.roomSeats, "6", context.DrawingId, context.moduleId).subscribe(function (resultData) {
                                        //room insertion
                                    });
                                }
                            });
                        }
                    }
                    else {
                        if (el.FieldValue == "1" && context.isSeatBookingFeature == true) {
                            context.SchedulingService.maxseatscount(JSON.stringify(reportFieldIdArray), 0, '', 'ASC').subscribe(function (resultData) {
                                context.maxcount = resultData;
                                if (resultData > context.roomSeats) {
                                    context.notificationService.ShowToaster("Room Seating Capacity should be greater than the number of Seats", 2);
                                    context.blnShowSeatList = false;
                                    context.splitview.showSecondaryView = false;
                                    context.fieldDetails.find(function (el) {
                                        if (el.ReportFieldId == 6730) {
                                            if (el.HasValidationError == false) {
                                                el.FieldValue = context.maxcount.toString();
                                            }
                                            return true;
                                        }
                                        else
                                            return false;
                                    });
                                }
                            });
                        }
                        if (el.FieldValue == "5" && context.isSeatBookingFeature == true) {
                            context.SchedulingService.maxseatscount(JSON.stringify(reportFieldIdArray), 0, '', 'ASC').subscribe(function (resultData) {
                                context.maxcount = resultData;
                                if (resultData <= Number(context.roomSeats)) {
                                    context.spaceService.AssignHotellingSeatToMultipleSpace(context.selectedId, context.roomSeats, context.multiplespacedrawingId, context.moduleId, false).subscribe(function (resultData) {
                                        console.log('resultData for multiple space', resultData); /*multiple data not bound bak to grid as in single update*/
                                    });
                                }
                                else {
                                    context.blnShowSeatList = false;
                                    context.splitview.showSecondaryView = false;
                                    context.notificationService.ShowToaster("Room Seating Capacity should be greater than the number of Seats", 2);
                                    context.fieldDetails.find(function (el) {
                                        if (el.ReportFieldId == 6730) {
                                            if (el.HasValidationError == false) {
                                                el.FieldValue = context.maxcount.toString();
                                            }
                                            return true;
                                        }
                                        else
                                            return false;
                                    });
                                }
                            });
                        }
                        else if (el.FieldValue == "6" && context.isSeatBookingFeature == true) {
                            context.SchedulingService.maxseatscount(JSON.stringify(reportFieldIdArray), 0, '', 'ASC').subscribe(function (resultData) {
                                context.maxcount = resultData;
                                if (context.maxcount <= Number(context.roomSeats)) {
                                    context.spaceService.AssignSpecialRoomSeatToMultipleSpace(context.selectedId, context.roomSeats, "6", context.multiplespacedrawingId, context.moduleId).subscribe(function (resultData) {
                                        console.log('resultData for multiple space', resultData); /*multiple data not bound bak to grid as in single update*/
                                    });
                                }
                                else {
                                    context.blnShowSeatList = false;
                                    context.splitview.showSecondaryView = false;
                                    context.notificationService.ShowToaster("Room Seating Capacity should be greater than the number of Seats", 2);
                                    context.fieldDetails.find(function (el) {
                                        if (el.ReportFieldId == 6730) {
                                            if (el.HasValidationError == false) {
                                                el.FieldValue = context.maxcount.toString();
                                            }
                                            return true;
                                        }
                                        else
                                            return false;
                                    });
                                }
                            });
                        }
                    }
                }
                else {
                    context.pageTitle = "Amenities";
                    if (!context.multipledata) {
                        if (roomNo == "") {
                            context.notificationService.ShowToaster("Room No. is required to assign Scheduling Space", 2);
                            context.blnShowAmenityList = false;
                        }
                        else {
                            context.blnShowAmenityList = true;
                        }
                    }
                    else {
                        for (var i = 0; i < context.multipledata.length; i++) {
                            if (context.multipledata[i]["Room No."] == "") {
                                context.notificationService.ShowToaster("Room No. is required to assign Scheduling Space", 2);
                                context.blnShowAmenityList = false;
                            }
                            else {
                                context.blnShowAmenityList = true;
                            }
                        }
                    }
                }
                if (context.blnShowAmenityList == true || context.blnShowSeatList == true) {
                    context.splitview.showSecondaryView = !context.splitview.showSecondaryView;
                }
                return true;
            }
            else
                return false;
        });
    };
    AssignSpaceStd.prototype.seatSuccessout = function (event) {
        var context = this;
        var rptFldArray;
        if (event["action"] == "UpdateSeat" || event["action"] == "DeleteSeat") {
            if (context.multipledata) {
                var reportFieldIdArray = [];
                for (var i = 0; i < context.multipledata.length; i++) {
                    reportFieldIdArray.push({ ReportFieldId: 8795, Value: context.multipledata[i]["SpaceId"].toString() });
                }
                context.SchedulingService.maxseatscount(JSON.stringify(reportFieldIdArray), 0, '', 'ASC').subscribe(function (resultData) {
                    context.maxcount = resultData;
                    reportFieldIdArray.push({ ReportFieldId: 8494, Value: "2" });
                    context.SchedulingService.maxseatscount(JSON.stringify(reportFieldIdArray), 0, '', 'ASC').subscribe(function (resultData) {
                        context.maxhotellingcount = resultData;
                        var count = 0;
                        context.fieldDetails.find(function (el) {
                            if (el.FieldId == 2020) {
                                el.FieldValue = context.maxhotellingcount.toString();
                                count++;
                            }
                            if (el.FieldId == 702) {
                                if (event.type) {
                                    if (event.type == "5" || event.type == "6") {
                                        el.FieldValue = context.maxcount.toString();
                                    }
                                }
                                count++;
                            }
                            if (count == 2)
                                return true;
                            else
                                return false;
                        });
                    });
                });
            }
            else {
                var count = 0;
                this.fieldDetails.find(function (el) {
                    if (el.FieldId == 2020) {
                        el.FieldValue = event["hotellingSeatCount"];
                        count++;
                    }
                    if (el.FieldId == 702) {
                        if (event.type) {
                            if (event.type == "5" || event.type == "6")
                                el.FieldValue = event["hotellingSeatCount"];
                        }
                        count++;
                    }
                    if (count == 2)
                        return true;
                    else
                        return false;
                });
            }
        }
        rptFldArray = context.generFun.getFieldValuesAsReportFieldArray(context.fieldDetails);
        this.seatspacearray = event["seatspacearray"];
        //context.assign(2, context, rptFldArray);
    };
    AssignSpaceStd.prototype.txtBoxChange = function (event) {
        var curFieldObj = event["txtChangeObject"]["fieldObject"];
        var context = this;
        var assignmnttype;
        if (curFieldObj.ReportFieldId == 6730 && this.isSeatBookingFeature) {
            var reportFieldIdArray = [];
            if (!context.multipledata) {
                for (var i = 0; i < context.selectedId.length; i++) {
                    reportFieldIdArray.push({ ReportFieldId: 8795, Value: context.selectedId[i].toString() });
                }
            }
            else {
                for (var i = 0; i < context.multipledata.length; i++) {
                    reportFieldIdArray.push({ ReportFieldId: 8795, Value: context.multipledata[i]["SpaceId"].toString() });
                }
            }
            this.fieldDetails.find(function (el) {
                if (el.ReportFieldId == 6729) {
                    assignmnttype = el.FieldValue;
                    return true;
                }
                else
                    return false;
            });
            this.SchedulingService.maxseatscount(JSON.stringify(reportFieldIdArray), 0, '', 'ASC').subscribe(function (resultData) {
                context.maxcount = resultData;
                if (context.maxcount > Number(curFieldObj.FieldValue) && (assignmnttype == "1" || assignmnttype == "5" || assignmnttype == "6") && Number(curFieldObj.FieldValue > 0)) {
                    context.notificationService.ShowToaster("Room Seating Capacity should be greater than the number of Seats", 2);
                    context.fieldDetails.find(function (el) {
                        if (el.ReportFieldId == 6730) {
                            if (el.HasValidationError == false) {
                                el.FieldValue = context.maxcount.toString();
                            }
                            return true;
                        }
                        else
                            return false;
                    });
                }
            });
        }
    };
    /*--------DEassign -Reservation Cancellation------------*/
    AssignSpaceStd.prototype.closeSlideDialog = function (value) {
        this.showDeassignSeats = value.value;
    };
    AssignSpaceStd.prototype.YesDeAssignSeats = function (event) {
        var contextObj = this;
        var statusId;
        contextObj.showDeassignSeats = false;
        if (!contextObj.multipledata) {
            contextObj.spaceService.deAssignSpaceStd(contextObj.selectedId[0], contextObj.seledrwgids.toString()).subscribe(function (resultData) {
                switch (resultData["StatusId"]) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        contextObj.notificationService.ShowToaster("Space Standard de-assigned", 3);
                        if (contextObj.workSpaceReqIds.length > 0) {
                            contextObj.SchedulingService.updateStatusOfRequest(0, 39, 1, contextObj.workSpaceReqIds).subscribe(function (result) {
                            });
                        }
                        if (contextObj.teamRoomReqIds.length > 0) {
                            contextObj.SchedulingService.cancelActiveRequests("0", 39, 1, contextObj.teamRoomReqIds).subscribe(function (result) {
                            });
                        }
                        contextObj.assignDeassignSuccess.emit({ returnData: resultData["Data"] });
                        break;
                }
            });
        }
        else {
            contextObj.spaceService.deAssignMultipleSpaceStd(contextObj.selectedId, contextObj.multiplespacedrawingId).subscribe(function (resultData) {
                switch (resultData["StatusId"]) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        contextObj.notificationService.ShowToaster("Space Standard de-assigned", 3);
                        if (contextObj.workSpaceReqIds.length > 0) {
                            contextObj.SchedulingService.updateStatusOfRequest(0, 39, 1, contextObj.workSpaceReqIds).subscribe(function (result) {
                            });
                        }
                        if (contextObj.teamRoomReqIds.length > 0) {
                            contextObj.SchedulingService.cancelActiveRequests("0", 39, 1, contextObj.teamRoomReqIds).subscribe(function (result) {
                            });
                        }
                        contextObj.assignDeassignSuccess.emit({ returnData: resultData["Data"] });
                        break;
                }
            });
        }
    };
    AssignSpaceStd.prototype.NoDeAssignSeats = function (event) {
        var contextObj = this;
        contextObj.showDeassignSeats = event.value;
    };
    AssignSpaceStd.prototype.onSecondaryClose = function (event) {
        this.splitview.showSecondaryView = false;
    };
    /*--------Assign -Reservation Cancellation------------*/
    AssignSpaceStd.prototype.closeAssignSeatsSlideDialog = function (value) {
        this.showAssignSeats = value.value;
    };
    AssignSpaceStd.prototype.YesAssignSeats = function (event) {
        var contextObj = this;
        var statusId;
        contextObj.showAssignSeats = false;
        contextObj.assignSubmit(1);
    };
    AssignSpaceStd.prototype.NoAssignSeats = function (event) {
        var contextObj = this;
        contextObj.showAssignSeats = event.value;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AssignSpaceStd.prototype, "moduleId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AssignSpaceStd.prototype, "DrawingId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssignSpaceStd.prototype, "assignDeassignSuccess", void 0);
    AssignSpaceStd = __decorate([
        core_1.Component({
            selector: 'assign-spacestd',
            templateUrl: 'app/Views/Space/Space Data/assignspacestd.html',
            providers: [notify_service_1.NotificationService, space_service_1.SpaceService, scheduling_service_1.SchedulingService],
            directives: [fieldGeneration_component_1.FieldComponent, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, amenities_assignspacestd_component_1.AmenityListComponent, seatlist_component_1.SeatsGridComponent],
            inputs: ['selectedId', 'fieldDetails', 'seledrwgids', 'showbtndeassign', 'strPopupText', 'moduleId', 'DrawingId', 'multipledata'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, space_service_1.SpaceService, scheduling_service_1.SchedulingService, General_1.GeneralFunctions])
    ], AssignSpaceStd);
    return AssignSpaceStd;
}());
exports.AssignSpaceStd = AssignSpaceStd;
//# sourceMappingURL=assignspacestd.component.js.map