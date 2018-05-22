import {Component, Output, EventEmitter, DoCheck, KeyValueDiffers } from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {SpaceService} from '../../../Models/Space/space.service'
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import {DrawingDetailsComponent} from "../../common/drawingdetails/drawingdetails.component";
import {UnlockDrawing} from '../../space/drawings/unlockdrawing.space';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { CommonDrawings} from '../../common/drawings/drawings-services';
import {SpaceOpenDrawing} from '../drawings/spaceopendrawing.services';
import {SplitViewComponent} from '../../../Framework/Whatever/Split-View/split-view.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import {SpaceDataGridComponent} from '../space data/spacedata-grid.component'
import {IGrid} from '../../../Framework/Models/Interface/IGrid';
import {RelinkSpace } from './relink-space.component';
@Component({
    selector: 'unlock-drawing',
    templateUrl: './app/Views/Space/Tools/unlockdrawing.component.html',
    directives: [searchBox, PageComponent, DrawingDetailsComponent, SlideComponent, Notification, SplitViewComponent, SpaceDataGridComponent, RelinkSpace],
    providers: [SpaceService, HTTP_PROVIDERS, NotificationService]

})

export class UnlockDrawingComponent {
    rowDelimiter: string = "§";
    columnDelimeter: string = "µ";
    moduleId: number;
    pageTarget: number;
    selectedTab: number = 0;
    pagePath = "Settings / Space / Unlock Drawings ";
    itemsSource: any[];
    differ: any;
    public totalItems: number = 1000;
    public itemsPerPage: number = 200;
    @Output() getSelectedFloorDrawing = new EventEmitter();
    public keyWordLookup: any[];
    viewDrawing: boolean = false;
    drawingId: number;
    openDrawingobject: any;
    unlockDrawingObj: UnlockDrawing;
    position = "top-right";
    showSlide = false;
    positionNotification = "top-right";
    showNotification = false;
    changeSlideDialog: boolean = true;
    showSuccess = false;
    // check unlock
    isDrawingUnlocked: boolean = false;
    iDrawingsLayersPassed: boolean = true;
    mandatoryLayersPassed: boolean = true;
    areaVerificationPassed: boolean = true;
    polyLineVerificationPassed: boolean = true;
    netPolyLineVerificationpassed: boolean = true;
    spacePolyLineVerificationpassed: boolean = true;
    isOrphanRecordsVeficationDone: boolean = false;
    isDatapopulated: boolean = false;
    notificationMessageArray: unlockNotifications[] = [];
    splitviewUnlock: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
    inputItems = { dataKey: "DrawingId", selectedIds: [] };
    spaceDetails: any;
    // notificationMessages: HTMLTableElement;
    iDrawinsLayers: any;
    iDrawinsLayersArray: idrawlngLayers[] = [];
    mandatoryLayers: any;
    // customerDefaultLayers: any;
    spacelayerName: string;

    constructionLayerName: string;
    netLayername: string;
    grossLayername: string;
    abortCheck: boolean = false; // for unlock abort checking
    isNetCustomer: boolean; // for netcustomers (customer settings in admin)
    customerSettings: any; // for customer settings values
    //dialogmessages = [{ "message": "Going to perform layer verification check. Proceed?" },
    //    { "message": "Layer verification Passed. Going to perform Gross Area verification check. Proceed?" },
    //    { "message": "Gross Area verification Passed. Going to do Polyline Verification. Proceed?" },
    //    { "message": "Polyline verification Passed. Do you wish to unlock the drawing for space data entry?" }
    //]
    dialogmessages = { "key": 0, "message": "" };
    drawingDetails: { key: string, value: string } = { key: "", value: "" };
    commonDrawingServices: CommonDrawings;
    isNetAreaAllowed: boolean = true;
    idrawingLayerVerificationSuccess: boolean = false;
    spaceObj: SpaceOpenDrawing;
    yesClicked: boolean = false;
    orphanRecordItemSource: any;
    spaceDetailsRelinkInput: any;
    secondaryPageTitle: string = '';
    handlesNotInDB: any;
    innerwidth: number = 0;
    isOrphanrecordsExists: boolean = false;
    notificationHeight: number = 0;
    //  customerSubscribedFeature: ICustomerSubscribedFeature[];
    getSelectedTab(event: any) {
        this.selectedTab = event[0];
    }
    constructor(private _spaceService: SpaceService, private differs: KeyValueDiffers, private _notificationService: NotificationService, private http: Http) {
        this.differ = differs.find({}).create(null);
        this.innerwidth = window.innerWidth - 100;
        this.notificationHeight = window.innerHeight - 200;
    }
    ngOnInit() {
        var contextObj = this;
        contextObj.moduleId = 3;
        contextObj.pageTarget = 2;
        contextObj.isDrawingUnlocked = false;
    }
    getDrawingObject(event: any) {

        var contextObj = this;
        contextObj.isDrawingUnlocked = false;
        var handler: any;
        contextObj.openDrawingobject = event.dwgObj;
        contextObj.commonDrawingServices = new CommonDrawings(contextObj.openDrawingobject, contextObj.http, contextObj.moduleId, event.dwgId, false);
        contextObj.commonDrawingServices.initilizeObjects(function (retCode) { });
        ////getting space details
        //        contextObj._spaceService.getAllSpaceDetails(contextObj.moduleId, contextObj.drawingId).subscribe(function (resultData) {
        //            var spaceData = JSON.parse(resultData["Data"].FieldBinderData);
        //        });
    }
    onSpacedataClicked(event: any) {
        var contextObj = this;
        contextObj.inputItems.selectedIds = [];

        // if (contextObj.isDrawingUnlocked) {
        contextObj.drawingId = event.drawingId;
        contextObj.inputItems.selectedIds.push(contextObj.drawingId);
        //contextObj.splitviewUnlock.showSecondaryView = true;
        // }
        //  else {
        //      contextObj._notificationService.ShowToaster("Drawing is not unlocked", 5);
        // }
    }
    unlockDrawinOnClick(event: any) {

        var contextObj = this;
        contextObj.yesClicked = false;
        contextObj.drawingId = event.drawingId;

        if (contextObj.isDrawingUnlocked != true) {
            //  contextObj.showSlide =true;
            //Get Drawing Layers
            if (this.isOrphanrecordsExists == true) {
                this.splitviewUnlock.showSecondaryView = true;
            } else {
                contextObj.notificationMessageArray = [];
                contextObj.spacelayerName = contextObj.commonDrawingServices.spacelayerName;
                contextObj.constructionLayerName = contextObj.commonDrawingServices.constructionLayerName;
                contextObj.netLayername = contextObj.commonDrawingServices.netLayername;
                contextObj.grossLayername = contextObj.commonDrawingServices.grossLayername;

                contextObj.customerSettings = contextObj.commonDrawingServices.customerSettings;
                contextObj.iDrawinsLayers = contextObj.commonDrawingServices.iDrawinsLayers;
                contextObj.mandatoryLayers = contextObj.commonDrawingServices.mandatoryLayers;



                contextObj.isNetCustomer = contextObj.commonDrawingServices.g_IsNetCustomer;
                contextObj.isNetAreaAllowed = contextObj.commonDrawingServices.isNetAreaAllowed;
                let obj = new UnlockDrawing(contextObj.openDrawingobject, contextObj.customerSettings, contextObj.iDrawinsLayers);

                contextObj.unlockDrawingObj = obj;
                contextObj.dialogmessages.key = 1;
                //  contextObj.dialogmessages.message = "Going to perform layer verification check. Proceed?";
                contextObj.unlockDrawing();
            }
        }
        else
            contextObj._notificationService.ShowToaster("Drawing is already unlocked", 5);
    }
    closeSlideDialog(value: any) {
        var contextObj = this;
        contextObj.showNotification = value.value;

    }
    closeSlideDialognotify(value: any) {
        var contextObj = this;
        contextObj.showSlide = value.value;

    }
    unlockDrawing() {

        var contextObj = this;
        contextObj.yesClicked = true;
        //  alert(contextObj.dialogmessages.key )
        if (contextObj.dialogmessages.key == 1) {
            contextObj.showSlide = false;
            contextObj.showNotification = true;
            contextObj.notificationMessageArray.push({ NotificationMessage: "Check for iDrawings layers", Status: "In Progress", root: true });
            contextObj.verifyiDrawingsLayers();
            if (contextObj.iDrawingsLayersPassed) {
                contextObj.notificationMessageArray.push({ NotificationMessage: "Check for customer mandatory layers", Status: "In Progress", root: true });
                contextObj.verifyMandatoryLayers();
            }
            if (contextObj.mandatoryLayersPassed && contextObj.iDrawingsLayersPassed) {
                contextObj.dialogmessages.key = 2;
                //    contextObj.dialogmessages.message = "Layer verification Passed. Going to perform Gross Area verification check. Proceed?";
                contextObj.yesClicked = false;
                //  contextObj.showSlide = true;
                contextObj.changeSlideDialog = false;
            }
        }
        if (contextObj.dialogmessages.key == 2) {
            //  alert(contextObj.dialogmessages.key)
            contextObj.verifyArea(function (returncode) {

                if (returncode == 0) {
                    if (contextObj.areaVerificationPassed) {
                        if (!contextObj.isOrphanRecordsVeficationDone) {
                            contextObj.checkForOrphanRecordExists();
                        }
                        contextObj.dialogmessages.key = 3;
                        //  contextObj.dialogmessages.message = "Gross Area verification Passed. Going to do Polyline Verification. Proceed?";
                        contextObj.yesClicked = false;
                    }


                    //  }
                    if (contextObj.dialogmessages.key == 3) {
                        contextObj.verifyPolyline(function (returncode) {
                            if (returncode == 0) {
                                if (contextObj.iDrawingsLayersPassed && contextObj.mandatoryLayersPassed && contextObj.areaVerificationPassed && contextObj.polyLineVerificationPassed) {
                                    contextObj.dialogmessages.key = 4;
                                    //  contextObj.dialogmessages.message = "Polyline verification Passed. Do you wish to unlock the drawing for space data entry?";
                                    contextObj.yesClicked = false;
                                }

                                //  }
                                if (contextObj.dialogmessages.key == 4) {
                                    contextObj.orphanRecordItemSource = undefined
                                    contextObj.spaceDetailsRelinkInput = undefined
                                    contextObj.secondaryPageTitle = '';
                                    contextObj.handlesNotInDB = undefined;
                                    contextObj.checkForOrphanSpaceExists(function (isExists) {
                                        if (isExists) {
                                            contextObj.isOrphanrecordsExists = true;
                                            contextObj.orphanRecordHandling();
                                        } else {
                                            contextObj.isOrphanrecordsExists = false;
                                            contextObj.dialogmessages.message = "Do you wish to unlock the drawing for space data entry?";
                                            contextObj.showSlide = true;
                                        }
                                    });
                                } else
                                    contextObj.notificationMessageArray.push({ NotificationMessage: "Unlock drawing failed", Status: "", root: true });

                            }
                        });
                    }
                }
            });
        }
    }
    orphanRecordHandling() {
        var contextObj = this;
        contextObj.notificationMessageArray.push({ NotificationMessage: "Check for orphan records verification", Status: "In Progress", root: true });
        contextObj.spaceObj = new SpaceOpenDrawing(contextObj.openDrawingobject, contextObj.drawingId, contextObj.moduleId, contextObj.http, false);
        contextObj.spaceObj.isFromUnlock = true;
        contextObj.spaceObj.initilizeObjects(function (retCode) {
            contextObj.openDrawingobject.setDisplay(false);
            contextObj.showDataInDrawing();
        });
    }
    showDataInDrawing() {
        var contextObj = this;
        if (!contextObj.spaceObj.spaceData) {
            setTimeout(function () {
                contextObj.showDataInDrawing();

            }, 50);
        }
        else {

            contextObj.spaceObj.spaceData = contextObj.unlockDrawingObj.getSpaceDataForTextInDrawing(contextObj.spaceObj.spaceData);
            contextObj.spaceObj.showDataInDrawing(function (retCode) {
                if (retCode == 0) {
                    contextObj.openDrawingobject.setCursor(1);
                    contextObj.openDrawingobject.setDisplay(true);
                    contextObj.unlockDrawingObj.buildSpaceDataForUnlockDrawingNew(contextObj.drawingId, function (spaceDetails) {
                        debugger
                        contextObj.spaceDetailsRelinkInput = contextObj.unlockDrawingObj.getModifiedSpaceDataForOrphan(contextObj.handlesNotInDB, spaceDetails);
                        contextObj.showNotification = false;
                        contextObj.secondaryPageTitle = 'Orphan Data';
                        contextObj.splitviewUnlock.showSecondaryView = true;
                    });
                }
            });
        }
    }
    yesOnClick(value: any, event: any) {
        // debugger         
        var contextObj = this;
        contextObj.showSlide = false;
        // alert("saving");
        contextObj.notificationMessageArray.push({ NotificationMessage: "Saving space data", Status: "In Progress", root: true });
        if (this.isOrphanrecordsExists == false) {
            contextObj.unlockDrawingObj.buildSpaceDataForUnlockDrawingNew( contextObj.drawingId, function (spacedtails) {
                debugger
                contextObj.unlockDrawingObj.createGrossAndConstructionHandles(contextObj.drawingId, function (retCode) {
                    contextObj.spaceDetails = contextObj.unlockDrawingObj.spaceDetails;
                    if (contextObj.spaceDetails.length > 0) {
                    var index = contextObj.notificationMessageArray.length - 1
                    contextObj.notificationMessageArray[index].Status = "Passed";
                    contextObj.notificationMessageArray.push({ NotificationMessage: "Saving....... ", Status: "In Progress" });
                    contextObj.openDrawingobject.setCursor(0);
                    contextObj.saveSpaceDetails();
                }
                else
                    contextObj.notificationMessageArray.push({ NotificationMessage: "Unlock drawing aborted" });

                });
            });
        } else {
            this.saveSpaceDetails();
        }

    }
    saveSpaceDetails() {
        var contextObj = this;
        contextObj._spaceService.SaveSpaceData(JSON.stringify(contextObj.spaceDetails)).subscribe(function (result) {

            var status = result["Data"];
            if (status["StatusId"] == 1) {
                contextObj.isDrawingUnlocked = true;
                contextObj._spaceService.UpdateDrawingLockAsUnlocked(contextObj.drawingId, contextObj.moduleId).subscribe(function (resultData) {
                    contextObj.notificationMessageArray.push({ NotificationMessage: "Drawing unlocked successfully.", Status: "", root: true });
                    var status = result["Data"];
                    if (status.Message == "Success") {
                        contextObj.updateUnlockedDrawingStatus();

                        contextObj.spaceObj = new SpaceOpenDrawing(contextObj.openDrawingobject, contextObj.drawingId, contextObj.moduleId, contextObj.http, false);
                        contextObj.spaceObj.isFromUnlock = true;
                        contextObj.spaceObj.initilizeObjects(function (retCode) {
                            contextObj.openDrawingobject.setDisplay(false);
                            contextObj.spaceObj.showDataInDrawing(function (retCode) {
                                if (retCode == 0) {
                                    contextObj.openDrawingobject.setCursor(1);
                                    contextObj.openDrawingobject.setDisplay(true);
                                }
                            });
                        });
                    }
                });
            }
            else if (status["StatusId"] == 0) {
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                contextObj.notificationMessageArray.push({ NotificationMessage: "Unlock drawing aborted" });
            }
            else if (status["StatusId"] == 3) {
                if (status["ServerId"] == -1) {
                    contextObj.updateUnlockedDrawingFailedStatus();
                    contextObj.notificationMessageArray.push({ NotificationMessage: "Unlock drawing aborted" });
                }
            }
        });
    }
    noOnClick(value: any) {

        var contextObj = this;
        contextObj.notificationMessageArray.push({ NotificationMessage: "Unlock drawing aborted" });
        contextObj.showSlide = value.value;
    }
    verifyiDrawingsLayers() {
        let checkFailed: boolean = false;
        var contextObj = this;
        var index = contextObj.notificationMessageArray.length - 1;
        contextObj.checkiDrawingLayers(contextObj.grossLayername, index);
        if (!contextObj.isNetCustomer) {
            contextObj.checkiDrawingLayers(contextObj.constructionLayerName, index);
            contextObj.checkiDrawingLayers(contextObj.spacelayerName, index);
        }
        else if (contextObj.isNetCustomer || contextObj.isNetAreaAllowed) {
            contextObj.checkiDrawingLayers(contextObj.netLayername, index);
        }
        if (contextObj.iDrawingsLayersPassed == true) {
            contextObj.notificationMessageArray[index].Status = "Passed";
            contextObj.idrawingLayerVerificationSuccess = true;
        }
    }
    checkiDrawingLayers(layername, index) {

        var contextObj = this;
        contextObj.iDrawingsLayersPassed = true;
        contextObj.idrawingLayerVerificationSuccess = true;
        var customerDefaultLayer = layername;
        contextObj.notificationMessageArray.push({ NotificationMessage: customerDefaultLayer + " verification in progress", Status: "" });
        if (contextObj.unlockDrawingObj.verifyLayers(customerDefaultLayer)) {
            contextObj.notificationMessageArray[contextObj.notificationMessageArray.length - 1].Status = "Passed";

        }
        else {

            contextObj.notificationMessageArray[contextObj.notificationMessageArray.length - 1].Status = "Failed";
            contextObj.notificationMessageArray.push({ NotificationMessage: "There is no " + customerDefaultLayer + " layer", Status: "" });
            contextObj.notificationMessageArray[index].Status = "Failed";
            contextObj.notificationMessageArray.push({ NotificationMessage: "Unlock drawing aborted", Status: "" });
            contextObj.iDrawingsLayersPassed = false;
            contextObj.idrawingLayerVerificationSuccess = false;
        }

    }
    //private layerCheckFailed(layerName) {
    //    this.notificationMessageArray[this.notificationMessageArray.length - 1].Status = "Failed";
    //    this.notificationMessageArray[0].Status = "Failed";
    //    this.notificationMessageArray.push({ NotificationMessage: "There is no " + layerName + " layer", Status: "" });
    //    this.notificationMessageArray.push({NotificationMessage: "Unlock drawing aborted", Status: "" });

    //}
    verifyMandatoryLayers() {
        var contextObj = this;
        let checkFailed: boolean = false;
        contextObj.mandatoryLayersPassed = true;
        var index = contextObj.notificationMessageArray.length - 1;
        debugger
        var jsonObject = JSON.parse(contextObj.mandatoryLayers.Data)
        if (jsonObject) {
            for (let i = 0; i < jsonObject.length; i++) {
                var layer = jsonObject[i].LayerName;
                if (contextObj.isNetCustomer == true)
                    if (layer == "$POLYLINE_SP" || layer == "$POLYLINE_CN")
                        continue;
                if (!checkFailed) {
                    var mandatoryLayers = jsonObject[i].LayerName;
                    contextObj.notificationMessageArray.push({ NotificationMessage: mandatoryLayers + " verification in progress", Status: "" });
                    if (contextObj.unlockDrawingObj.verifyLayers(mandatoryLayers)) {


                        contextObj.notificationMessageArray[contextObj.notificationMessageArray.length - 1].Status = "Passed";
                    }
                    else {
                        checkFailed = true;
                        contextObj.notificationMessageArray[contextObj.notificationMessageArray.length - 1].Status = "Failed";
                        contextObj.notificationMessageArray.push({ NotificationMessage: "There is no " + mandatoryLayers + " layer", Status: "" });
                        contextObj.notificationMessageArray[index].Status = "Failed";
                        contextObj.notificationMessageArray.push({ NotificationMessage: "Unlock drawing aborted", Status: "" });
                        contextObj.mandatoryLayersPassed = false;
                    }
                }
            }
            contextObj.notificationMessageArray[index].Status = "Passed";
        }
    }
    private verifyArea = function (resCallback) {
        ////debugger
        var contextObj = this;
        if (contextObj.isNetCustomer == true) {
            contextObj.verifyNetArea(function (returncode) {
                if (returncode == 0) {
                    resCallback(0);
                }
            });
        }
        else {
            contextObj.verifySpaceArea(function (returncode) {
                if (returncode == 0) {
                    resCallback(0);
                }
            });
        }

    }
    private verifyNetArea = function (resCallback) {
        var areaVerification = [];
        var contextObj = this;
        contextObj.notificationMessageArray.push({ NotificationMessage: "Check for gross area verification", Status: "In Progress", root: true });
        var index = contextObj.notificationMessageArray.length - 1;
        contextObj.unlockDrawingObj.verifyNetArea(function (grossLayer, netLayer, arrlayerEntities, areaVerification) {

            var length = arrlayerEntities.length - 1;//Getting Gross Layer Handles and length
            console.log("length", length, "grossLayer", grossLayer, "netLayer", netLayer, "arrlayerEntities", arrlayerEntities, "areaVerification", areaVerification);
            if (length == 1) {
                // debugger
                contextObj.notificationMessageArray.push({ NotificationMessage: "Gross = " + areaVerification[0] + "" });
                contextObj.notificationMessageArray.push({ NotificationMessage: "Total Carpet Area = " + areaVerification[1] + "" });
                if (areaVerification[2] == 0.00) // AreaDiffPerentage
                {
                    contextObj.notificationMessageArray.push({ NotificationMessage: "Total Carpet Area is equal to gross area" });
                }
                else if (areaVerification[2] > 0) {
                    contextObj.notificationMessageArray.push({ NotificationMessage: "Total Carpet Area is " + Math.abs(areaVerification[2]) + "% greater than gross area" });
                }
                else {
                    contextObj.notificationMessageArray.push({ NotificationMessage: "Total Carpet Area is " + areaVerification[2] + "% less than gross area" });
                }
                if (areaVerification[1] > areaVerification[0]) {
                    contextObj.areaVerificationPassed = false;
                }
            }
            else {
                if (length <= 0) {
                    contextObj.notificationMessageArray.push({ NotificationMessage: "There is no gross polyline in drawing" });
                }
                else {
                    contextObj.notificationMessageArray.push({ NotificationMessage: "There is multiple gross polyline in drawing" });
                    contextObj.areaVerificationPassed = false;
                }
            }
            if (netLayer == false) {
                contextObj.notificationMessageArray.push({ NotificationMessage: "There is no net layer in drawing" });
                contextObj.areaVerificationPassed = false;
            }
            if (grossLayer == false) {
                contextObj.notificationMessageArray.push({ NotificationMessage: "There is no gross layer in drawing" });
                contextObj.areaVerificationPassed = false;
            }

            if (contextObj.areaVerificationPassed) {
                contextObj.notificationMessageArray[index].Status = "Passed";
            }
            else {
                contextObj.notificationMessageArray[index].Status = "Failed";
            }
            resCallback(0);
        });


    }
    private verifySpaceArea = function (resCallback) {
        ////debugger
        var areaVerification = [];
        var contextObj = this;
        contextObj.notificationMessageArray.push({ NotificationMessage: "Check for gross area verification", Status: "In Progress", root: true });
        var index = contextObj.notificationMessageArray.length - 1;
        contextObj.unlockDrawingObj.verifySpaceArea(function (grossLayer, constructionLayer, spaceLayer, constructionlayerHandles, grosslayerHandles, areaVerification, areaTolerance) {

            contextObj.g_strAlliDrawingsLayerEnities = grosslayerHandles;
            var arrGrossHandlelength = grosslayerHandles.length - 1;
            if (grossLayer) {
                if (constructionLayer) {
                    if (spaceLayer) {
                        if (arrGrossHandlelength == 1) {
                            var arrConstructionHandlelength = constructionlayerHandles.length - 1;
                            if (arrConstructionHandlelength == 1) {

                                console.log("grossArea ", areaVerification[0], "ConstructionArea", areaVerification[1], "TotalSpaceArea", areaVerification[2], "areaDiff", areaVerification[3]);
                                contextObj.notificationMessageArray.push({ NotificationMessage: "Floor Gross = " + Math.round(areaVerification[0]) + "" });
                                contextObj.notificationMessageArray.push({ NotificationMessage: "Construction + Space =" + Math.round(areaVerification[1]) + "+" + Math.round(areaVerification[2]) + "=" + Math.round(areaVerification[1] + areaVerification[2]) });// " + +Math.round(areaVerification[1]) + "+" + +Math.round( areaVerification[2]+ + " = " + Math.round(areaVerification[1] + areaVerification[2]) )});
                                contextObj.notificationMessageArray.push({ NotificationMessage: "Difference = " + areaVerification[3] + "" });

                                if (areaVerification[3] >= (areaTolerance)) // areaDifference>=Tolerance
                                {
                                    contextObj.areaVerificationPassed = false;
                                }
                            }
                            else {
                                if (arrConstructionHandlelength <= 0) {
                                    contextObj.notificationMessageArray.push({ NotificationMessage: "There is no construction polyline in drawing" });
                                    contextObj.areaVerificationPassed = false;
                                }
                                else {
                                    contextObj.notificationMessageArray.push({ NotificationMessage: "There is multiple construction polyline in drawing" });
                                    contextObj.areaVerificationPassed = false;
                                }
                            }
                        }
                        else {
                            if (arrGrossHandlelength <= 0) {
                                contextObj.notificationMessageArray.push({ NotificationMessage: "There is no gross polyline in drawing" });
                                contextObj.areaVerificationPassed = false;
                            }
                            else {
                                contextObj.notificationMessageArray.push({ NotificationMessage: "There is multiple gross polyline in drawing" });
                                contextObj.areaVerificationPassed = false;
                            }
                        }
                    }
                    else {
                        contextObj.notificationMessageArray.push({ NotificationMessage: "There is no space layer in drawing" });
                        contextObj.areaVerificationPassed = false;
                    }
                }
                else {
                    contextObj.notificationMessageArray.push({ NotificationMessage: "There is no construction layer in drawing" });
                    contextObj.areaVerificationPassed = false;
                }
            }
            else {
                contextObj.notificationMessageArray.push({ NotificationMessage: "There is no gross layer in drawing" });
                contextObj.areaVerificationPassed = false;
            }
            if (contextObj.areaVerificationPassed) {
                contextObj.notificationMessageArray[index].Status = "Passed";
            }
            else {
                contextObj.notificationMessageArray[index].Status = "Failed";
            }
            resCallback(0);
        });

    }
    private checkForOrphanRecordExists() {
        var contextObj = this;
        if (!contextObj.isDatapopulated) {
            contextObj.populateNonSynchronisedDataset();
            contextObj.isDatapopulated = true;
        }
    }
    private populateNonSynchronisedDataset() {


    }
    verifyPolyline = function (resCallback) {
        var contextObj = this;
        contextObj.notificationMessageArray.push({ NotificationMessage: "Check for polyline verification", Status: "In Progress", root: 1 });
        var index = contextObj.notificationMessageArray.length - 1;
        if (contextObj.isNetCustomer == true) {
            contextObj.verifyNetPolyLine(function (returncode) {
                if (returncode == 0) {
                    resCallback(0);

                }
            });
        }
        else
            contextObj.verifySpacePolyline(function (returncode) {
                if (returncode == 0) {

                    resCallback(0);
                }
            });
    }
    private verifyNetPolyLine = function (resCallback) {

        var contextObj = this;
        var netLayerHandles = [];
        var arrValidNTHandles = [];
        var arrOpenNTHandles = [];
        var arrOverlappedNTHandles = [];
        var arrOtherEntities = [];
        contextObj.notificationMessageArray.push({ NotificationMessage: "Verifying net polyline ", Status: "In Progress" });
        var index = contextObj.notificationMessageArray.length - 1;
        contextObj.unlockDrawingObj.verifyNetPolyline(function (netLayer, netLayerHandles, arrValidNTHandles, arrOpenNTHandles, arrOverlappedNTHandles, arrOtherEntities, isPolyLineVerificationPassed, getAllEntitiesCheck, verifyNetLayerCheck) {


            if (netLayer) {
                if (getAllEntitiesCheck && verifyNetLayerCheck) {

                    var lenValidNThandles = arrValidNTHandles.length;
                    var lenNetlayerhandles = netLayerHandles.length;

                    contextObj.notificationMessageArray.push({ NotificationMessage: "Total Spaces: " + (lenNetlayerhandles - 1) + ";" });
                    contextObj.notificationMessageArray.push({ NotificationMessage: "Valid Spaces: " + (lenValidNThandles - 1) + "(" + +(((lenValidNThandles - 1) / (lenNetlayerhandles - 1)) * 100).toFixed(2) + "%) ;" }); //Math.round(((lenValidNThandles - 1) / (lenNetlayerhandles - 1)) * 100) + "%) ;" });
                    if (arrValidNTHandles.length - 1 > 0) {

                    }
                    if (arrOpenNTHandles.length - 1 > 0) {
                        contextObj.notificationMessageArray.push({ NotificationMessage: "Opened Space Handles: " + arrOpenNTHandles.join(";") + "" });
                    }
                    if (arrOverlappedNTHandles.length - 1 > 0) {
                        contextObj.notificationMessageArray.push({ NotificationMessage: "Overlapped Space Handles: " + arrOverlappedNTHandles.join(";") + "" });
                    }
                    if (arrOtherEntities.length - 1 > 0) {
                        contextObj.notificationMessageArray.push({ NotificationMessage: "Invalid Entities in NT Layer: " + arrOtherEntities.join(";") + "" });
                    }
                    if (isPolyLineVerificationPassed) {

                        contextObj.notificationMessageArray.push({ NotificationMessage: "Unlinked (No Data) Spaces: " + (lenValidNThandles - 1) + "(" + +(((lenValidNThandles - 1) / (lenNetlayerhandles - 1)) * 100).toFixed(2) + "%) ;" });
                    }
                    else {
                        contextObj.notificationMessageArray[index].Status = "Failed";

                    }
                    contextObj.polyLineVerificationPassed = isPolyLineVerificationPassed;
                    //strResultText = "Unlinked (No Data) Spaces : " & intUnlinkedSpaces & " (" & Round(((intUnlinkedSpaces/UBound(arrAllEntities))*100),2) & " %) ;" 

                }
                else {
                    contextObj.notificationMessageArray.push({ NotificationMessage: "Could not retrive data from drawing" });
                    contextObj.notificationMessageArray[index].Status = "Failed";
                    contextObj.polyLineVerificationPassed = false;
                }

            }
            else {
                contextObj.notificationMessageArray.push({ NotificationMessage: "There is no net layer in drawing", Status: "" });
                contextObj.polyLineVerificationPassed = false;
                isPolyLineVerificationPassed = false;
            }
            if (contextObj.polyLineVerificationPassed)
                contextObj.notificationMessageArray[index].Status = "Passed";
            else
                contextObj.notificationMessageArray[index].Status = "Failed";

            resCallback(0);
        });

    }
    private verifySpacePolyline = function (resCallback) {

        var spaceEntityhandles = [];
        var arrValidSPHandles = [];
        var arrOpenSPHandles = [];
        var arrOverlappedSPHandles = [];

        var arrInvalidNT = [];
        var arrValidOpenSPEntities = [];
        var arrOtherValidNTEntities = [];
        var arrMultipleNTInSP = [];
        var arrNTWithMultipleSP = [];
        var arrOtherValidSPEntities = [];
        var arrValidSPEntities = [];
        var ValidSpacesWithNTPolylines = 0;
        var contextObj = this;
        contextObj.notificationMessageArray.push({ NotificationMessage: "Verifying space polyline ", Status: "In Progress" });
        var index = contextObj.notificationMessageArray.length - 1;
        contextObj.unlockDrawingObj.verifySpacePolyline(function (netLayer, spaceLayer, getAllEntitiesCheck, verifySpaceLayerCheck, validateNetLayerCheck, spaceEntityhandles, isNetAreaAllowed, arrValidSPHandles, arrOpenSPHandles, arrOverlappedSPHandles, arrOtherValidSPEntities, arrInvalidNT, arrValidOpenSPEntities, arrOtherValidNTEntities, arrMultipleNTInSP, arrNTWithMultipleSP, arrValidSPEntities, isPolyLineVerificationPassed, arrLessAreaEntities, arrValidNTHandles) {
            ////debugger
            if (spaceLayer) {
                if (netLayer) {
                    if (getAllEntitiesCheck && verifySpaceLayerCheck) {

                        var lenSpaceEntityHandles = spaceEntityhandles.length;
                        var lenValidSPHandles = arrValidSPHandles.length;
                        var lenOpenSPHandles = arrOpenSPHandles.length;
                        var lenOverlappedSPHandles = arrOverlappedSPHandles.length;
                        var lenOtherValidSPEntities = arrOtherValidSPEntities.length;
                        var lenValidSPEntities = arrValidSPEntities.length;
                        var lenarrValidNTHandles = arrValidNTHandles.length;
                        //    contextObj.unlockDrawingObj.buildSpaceData(true, contextObj.drawingId, function (spacedtails) {
                        //if (spacedtails.length > 0) {


                        contextObj.notificationMessageArray.push({ NotificationMessage: "Total Spaces: " + (lenSpaceEntityHandles - 1) + ";" });
                        contextObj.notificationMessageArray.push({ NotificationMessage: "Valid Space polylines: " + (lenValidSPHandles - 1) + " (" + Math.round(((lenValidSPHandles - 1) / (lenSpaceEntityHandles - 1)) * 100) + " %) ;" });

                        if (lenOpenSPHandles - 1 > 0) {
                            contextObj.spacePolyLineVerificationpassed = false
                            contextObj.notificationMessageArray.push({ NotificationMessage: "Opened Space Handles: " + arrOpenSPHandles.join(";") });
                        }
                        if (lenOverlappedSPHandles - 1 > 0) {
                            contextObj.spacePolyLineVerificationpassed = false
                            contextObj.notificationMessageArray.push({ NotificationMessage: "Overlapped Space Handles: " + arrOverlappedSPHandles.join(";") });
                        }
                        if (lenOtherValidSPEntities - 1 > 0) {
                            contextObj.spacePolyLineVerificationpassed = false;
                            contextObj.notificationMessageArray.push({ NotificationMessage: "Invalid Entities in SP Layer: " + arrOtherValidSPEntities.join(";") });
                        }
                        if (contextObj.isNetAreaAllowed) {

                            if (arrInvalidNT.length - 1 > 0) {
                                contextObj.spacePolyLineVerificationpassed = false;
                                contextObj.notificationMessageArray.push({ NotificationMessage: "Invalid Net Handles: " + arrInvalidNT.join(";") });

                            }
                            if (arrValidOpenSPEntities.length - 1 > 0) {
                                contextObj.spacePolyLineVerificationpassed = false;
                                contextObj.notificationMessageArray.push({ NotificationMessage: "Opened Net Handles: " + arrValidOpenSPEntities.join(";") });

                            }
                            //if (arrOtherValidNTEntities.length - 1 > 0) {
                            //    contextObj.spacePolyLineVerificationpassed = false;
                            //    contextObj.notificationMessageArray.push({ NotificationMessage: "Invalid Entities in NT Layer:" + arrOtherValidNTEntities.join(";") });

                            //}//avaoided as per discussion
                            if (arrMultipleNTInSP.length - 1 > 0) {
                                contextObj.spacePolyLineVerificationpassed = false;
                                contextObj.notificationMessageArray.push({ NotificationMessage: "Space Handles with Multiple Net Handles: " + arrMultipleNTInSP.join(";") });

                            }
                            if (arrNTWithMultipleSP.length - 1 > 0) {
                                contextObj.spacePolyLineVerificationpassed = false;
                                contextObj.notificationMessageArray.push({ NotificationMessage: "Net Handles with Multiple Space Handles: " + arrNTWithMultipleSP.join(";") });

                            }
                            //updated
                            if (lenValidSPEntities - 1 >= 0) {
                                //  strResultText = "Spaces with valid Net Polylines : " & UBound(arrEntities) & " (" & Round((UBound(arrEntities) / UBound(arrAllEntities)) * 100, 2) & " %) "

                                contextObj.notificationMessageArray.push({ NotificationMessage: "Spaces with valid Net Polylines: " + (lenarrValidNTHandles - 1) + " (" + Math.round(((lenarrValidNTHandles - 1) / (lenSpaceEntityHandles - 1)) * 100) + " %) " });
                                contextObj.notificationMessageArray.push({ NotificationMessage: "Spaces without valid Net Polylines: " + ((lenSpaceEntityHandles - 1) - (lenarrValidNTHandles - 1)) + " (" + Math.round((((lenSpaceEntityHandles - 1) - (lenarrValidNTHandles - 1)) / (lenSpaceEntityHandles - 1)) * 100) + " %) " });
                            }
                            else {
                                contextObj.notificationMessageArray.push({
                                    NotificationMessage: "Spaces without valid Net Polylines: 0 (0%) "
                                });
                            }
                            // //debugger
                            ValidSpacesWithNTPolylines = arrLessAreaEntities.length - 1;
                            // var unlinkedpercentage = +((Math.abs(lenSpaceEntityHandles / (lenSpaceEntityHandles - 1)) * 100).toFixed(2))
                            contextObj.notificationMessageArray.push({ NotificationMessage: "Unlinked (No Data) Spaces with valid Net polylines: 0 (0 %)" });
                            //  var linkedpercentage = +((Math.abs(ValidSpacesWithNTPolylines / (lenSpaceEntityHandles - 1)) * 100).toFixed(2))
                            contextObj.notificationMessageArray.push({ NotificationMessage: "Linked Spaces with Net Area less than 80% of the Gross Area: 0 (0 %)" });

                            var percentage = +((Math.abs(ValidSpacesWithNTPolylines / (lenSpaceEntityHandles - 1)) * 100).toFixed(2))//(ValidSpacesWithNTPolylines / UBound(arrAllEntities)) * 100, 2)
                            contextObj.notificationMessageArray.push({ NotificationMessage: "Unlinked (No Data) Spaces with Net Area less than 80% of the Gross Area: " + ValidSpacesWithNTPolylines + " (" + percentage + " %)" });


                        }
                        else {
                            contextObj.notificationMessageArray.push({ NotificationMessage: "Unlinked (No Data) Spaces:0 " });
                        }

                        //added                              
                        if (isPolyLineVerificationPassed) {
                            if (!contextObj.isNetAreaAllowed) {
                                contextObj.notificationMessageArray.push({
                                    NotificationMessage: "Space polylines with minor drafting errors but ignored:"
                                });
                            }
                        }
                        //  }
                        //});
                        ///contextObj.notificationMessageArray.push({ NotificationMessage: "Linked Spaces with Net Area less than 80% of the Gross Area  : " });
                    }
                    else {
                        contextObj.notificationMessageArray.push({ NotificationMessage: "Could not retrive data from drawing" });
                        contextObj.notificationMessageArray[index].Status = "Failed";
                        contextObj.spacePolyLineVerificationpassed = false;
                        contextObj.polyLineVerificationPassed = false;//add
                    }

                }
                else {
                    contextObj.notificationMessageArray.push({ NotificationMessage: "There is no net layer in drawing", Status: "" });
                    contextObj.spacePolyLineVerificationpassed = false;
                    contextObj.polyLineVerificationPassed = false;//add

                }
            }
            else {
                contextObj.notificationMessageArray.push({ NotificationMessage: "There is no space layer in drawing", Status: "" });
                contextObj.spacePolyLineVerificationpassed = false;
                contextObj.polyLineVerificationPassed = false;//add
            }
            // //debugger
            if (contextObj.spacePolyLineVerificationpassed)
                contextObj.notificationMessageArray[index - 1].Status = "Passed";
            else
                contextObj.notificationMessageArray[index - 1].Status = "Failed";

            if (contextObj.polyLineVerificationPassed)
                contextObj.notificationMessageArray[index].Status = "Passed";
            else
                contextObj.notificationMessageArray[index].Status = "Failed";



            resCallback(0);
        });

    }
    //private saveSpaceDataAndUnlockDrawing() {
    //    ////debugger
    //    if (this.g_strAlliDrawingsLayerEnities)
    //    {
    //        var handles = this.g_strAlliDrawingsLayerEnities.split(this.rowDelimiter);
    //        for (let item of handles) {

    //        }
    //    }
    //  //  this.spaceDetails.push({});
    //}
    private updateUnlockedDrawingStatus() {
        // this.showSuccess = true;
        var contextObj = this;
        contextObj._notificationService.ShowToaster("Drawing unlocked and is available for space data entry", 2);

    }
    private updateUnlockedDrawingFailedStatus() {
        // this.showSuccess = true;
        var contextObj = this;
        contextObj._notificationService.ShowToaster("Drawing already exists", 5, "toast-top-left");
    }
    spShowInDrawingOnClick(event: any) {

        this.spaceObj.showSelectedSpaceInDrawing(event["selectedIds"], function (retcode) {

        });
    }
    spShowZoomOnClick(event: any) {

        this.spaceObj.showSelectedSpaceZoomDrawing(event["selectedIds"], function (retcode) {

        });
    }
    checkForOrphanSpaceExists = function (resCallback) {
        var handles = this.unlockDrawingObj.g_strAlliDrawingsLayerEnities.split(this.rowDelimiter);
        var contextObj = this;
        handles.pop();
        this._spaceService.checkOrphanSpaceDetails(this.drawingId, handles).subscribe(function (result) {
            contextObj.orphanRecordItemSource = JSON.parse(result.Table2);
            if (contextObj.orphanRecordItemSource != null && contextObj.orphanRecordItemSource != undefined && contextObj.orphanRecordItemSource.length > 0) {
                var index;
                index = contextObj.orphanRecordItemSource.findIndex(function (el) { return el['Space Key'] == 9000 });
                if (index != -1)
                    contextObj.orphanRecordItemSource.splice(index, 1);
                index = contextObj.orphanRecordItemSource.findIndex(function (el) { return el['Space Key'] == 8000 });
                if (index != -1)
                    contextObj.orphanRecordItemSource.splice(index, 1);
                contextObj.handlesNotInDB = JSON.parse(result.Table1);
                if (contextObj.handlesNotInDB != null && contextObj.handlesNotInDB != undefined && contextObj.orphanRecordItemSource.length > 0)
                    resCallback(true);
                else
                    resCallback(false);
            }
            else
                resCallback(false);
        });
    }
    hatchSpace(spaceDetails: any) {
        var contextObj = this;
        var handle;
        if (this.isNetCustomer)
            handle = spaceDetails.CarpetHandle;
        else
            handle = spaceDetails.BomaHandle;
        contextObj.spaceObj.deleteLayerAlredyExists("$HatchSingleEntity", function (returnCode) {
            contextObj.spaceObj.hatchSingleEntity(handle, function (retCode) {

            });
        });
    }
    onRelinkClick(isShowRelinkdata: boolean) {
        this.splitviewUnlock.showSecondaryView = isShowRelinkdata;
    }
    relinkSubmitSuccess(data: any) {
        var contextObj = this;
        var ratio = [0];
        contextObj.openDrawingobject.clientDWGAreaRatio(ratio);
        let spaceEditReturnData = JSON.parse(data.returnData);
        contextObj.spaceObj.getFormatedText(spaceEditReturnData, contextObj.spaceObj.displaySettingData, "", ratio, function (retCode) {
            if (data.totlaItems != 0)
                contextObj.splitviewUnlock.showSecondaryView = true;
        });
    }
    afterAllOrphansUpdated(event: any) {
        var contextObj = this;
        var newSpaces = event['newSpaces'];
        this.splitviewUnlock.showSecondaryView = false;
        this.showNotification = true;
        var index;
        index = this.notificationMessageArray.length - 1
        if (this.notificationMessageArray[index].Status == '')
            index = this.notificationMessageArray.length - 2;
        this.notificationMessageArray[index].Status = "Passed";
        var notificationMsg = event['notificationMsg'];
        if (notificationMsg.length > 0) {
            for (var item of notificationMsg)
                this.notificationMessageArray.push(item);
        }
        this.showNotification = true;
        contextObj.spaceObj.deleteLayerAlredyExists("$HatchSingleEntity", function (returnCode) {
            if (newSpaces.length > 0) {
                contextObj.spaceDetails = newSpaces;
                contextObj.dialogmessages.message = "Do you wish to unlock the drawing for space data entry?";
                contextObj.showSlide = true;
            }
            else {
                contextObj._spaceService.UpdateDrawingLockAsUnlocked(contextObj.drawingId, contextObj.moduleId).subscribe(function (resultData) {
                    contextObj.isDrawingUnlocked = true;
                    contextObj.notificationMessageArray.push({ NotificationMessage: "Drawing unlocked successfully.", Status: "", root: true });
                    contextObj.updateUnlockedDrawingStatus();
                });
            }
        });

    }
    onSplitViewClose() {
        var contextObj = this;
        var index = this.notificationMessageArray.length - 1
        this.notificationMessageArray[index].Status = "Failed";
        this.notificationMessageArray.push({ NotificationMessage: "Unlock drawing aborted", Status: '' });
        contextObj.spaceObj.deleteLayerAlredyExists("$HatchSingleEntity", function (returnCode) {
            contextObj.showNotification = true;
        });
    }
    onDrawingTabClose() {
        this.clearAllVariables();
    }
    clearAllVariables() {
    this.itemsSource;
    this.viewDrawing= false;
    this.drawingId;
    this.openDrawingobject;
    this.unlockDrawingObj;
    this. showSlide = false;
    this.showNotification = false;
    this.changeSlideDialog = true;
    this.showSuccess = false;
    this.isDrawingUnlocked = false;
    this.iDrawingsLayersPassed= true;
    this.mandatoryLayersPassed= true;
    this.areaVerificationPassed = true;
    this.polyLineVerificationPassed = true;
    this.netPolyLineVerificationpassed = true;
    this.spacePolyLineVerificationpassed= true;
    this.isOrphanRecordsVeficationDone=false;
    this.isDatapopulated = false;
    this.notificationMessageArray= [];
    this.iDrawinsLayers;
    this.iDrawinsLayersArray = [];
    this.mandatoryLayers;
    this.spacelayerName;

    this.constructionLayerName;
    this.netLayername;
    this.grossLayername;
    this.abortCheck= false; // for unlock abort checking
    this.dialogmessages = { "key": 0, "message": "" };
    this.drawingDetails= { key: "", value: "" };
    this.commonDrawingServices;
    this.isNetAreaAllowed= true;
    this.idrawingLayerVerificationSuccess= false;
    this.spaceObj ;
    this.yesClicked= false;
    this.orphanRecordItemSource;
    this.spaceDetailsRelinkInput;
    this.secondaryPageTitle= '';
    this.handlesNotInDB;
    this.isOrphanrecordsExists= false;
    }
    //public pageChanged(event: any) {
    //    this._spaceService.unlockDrawingPaging(event.pageEvent.page)
    //}

    //onViewDrawingClick(tab: number) {
    //    this.viewDrawing = true;
    //    var contextObj = this;
    //    setTimeout(function () {
    //        contextObj.selectedTab = tab;
    //    }, 1);
    //}
    //public showDrawingDetails(items) {
    //   
    //    if (items.keyvalue.length > 0) {
    //        //console.log("selectedId", items);
    //        //this.splitviewInput.showSecondaryView = true;
    //        this.drawingDetails = items.rowdata;
    //        this.drawingId = items.keyvalue;
    //    }
    //}

    //SaveAs(event: any) {
    //    console.log('Entered Save As');
    //}
    //Delete(event: any) {
    //    console.log('Entered Delete');
    //}
    //onloadSearch(event: any) {
    //    console.log('Enetered On Load Search');
    //}
    //Clear(event: any) {
    //    console.log('Entered Clear');
    //}
    //Submit(event: any) {
    //    console.log('Entered Search')
    //}
}
export interface unlockNotifications {
    //RowIndex: number;
    NotificationMessage?: string;
    Status?: string;
    root?: boolean;
}
export interface idrawlngLayers {
    //RowIndex: number;
    layer?: string;
    id?: string;
}
