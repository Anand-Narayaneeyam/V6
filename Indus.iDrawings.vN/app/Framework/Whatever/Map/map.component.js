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
require('../../../../Scripts/leaflet-0.7.3.js');
require('../../../../Scripts/leaflet.markercluster-src.js');
var MapComponent = (function () {
    function MapComponent() {
        this.outIds = new core_1.EventEmitter();
        this.outDraggable = new core_1.EventEmitter();
        this.outLeftClick = new core_1.EventEmitter();
        this.offlinemode = false;
        this.maptarget = true;
        this.CurrentId = 0;
    }
    MapComponent.prototype.ngAfterViewInit = function () {
        debugger;
        var L = window["L"];
        var MapLayer;
        var Option = {
            center: [0, 0, 2],
            zoom: 2,
            minZoom: 2,
            //maxZoom: 5,
            maxBounds: [[-85.0, -180.0], [85.0, 180.0]]
        };
        var contextObj = this;
        contextObj.MarkersCluster = new L.MarkerClusterGroup({
            maxClusterRadius: 120,
            iconCreateFunction: function (cluster) {
                return new L.DivIcon({ html: cluster.getChildCount(), className: 'greencluster', iconSize: new L.Point(40, 40) });
            }, showCoverageOnHover: false
        });
        var MapId = "";
        if (contextObj.properties && contextObj.properties.length > 0 && contextObj.properties[0].Id == 0) {
            setTimeout(function () {
                contextObj.maptarget = false;
            }, 50);
            setTimeout(function () {
                MapId = "submapid";
                contextObj.IdrawingsMap = L.map(MapId, Option);
                MapLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(contextObj.IdrawingsMap);
                contextObj.addmarker(contextObj.IdrawingsMap, contextObj.properties);
                MapLayer.on('tileerror', function (error, tile) {
                    if (!contextObj.offlinemode) {
                        contextObj.IdrawingsMap.removeLayer(contextObj.MarkersCluster);
                        contextObj.IdrawingsMap.remove();
                        contextObj.IdrawingsMap = L.map(MapId, Option);
                        MapLayer = new L.tileLayer("Content/Images/MapTiles/{z}/{x}/{y}.png").addTo(contextObj.IdrawingsMap);
                        MapLayer.options.maxZoom = 7;
                        contextObj.IdrawingsMap.addLayer(contextObj.MarkersCluster);
                    }
                });
            }, 100);
        }
        else {
            MapId = "mapid";
            contextObj.maptarget = true;
            contextObj.IdrawingsMap = L.map(MapId, Option);
            MapLayer = new L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(contextObj.IdrawingsMap);
            contextObj.addmarker(contextObj.IdrawingsMap, contextObj.properties);
            MapLayer.on('tileerror', function (error, tile) {
                if (!contextObj.offlinemode) {
                    contextObj.IdrawingsMap.removeLayer(contextObj.MarkersCluster);
                    contextObj.IdrawingsMap.remove();
                    contextObj.IdrawingsMap = L.map(MapId, Option);
                    MapLayer = new L.tileLayer("Content/Images/MapTiles/{z}/{x}/{y}.png").addTo(contextObj.IdrawingsMap);
                    MapLayer.options.maxZoom = 7;
                    contextObj.IdrawingsMap.addLayer(contextObj.MarkersCluster);
                }
            });
        }
    };
    MapComponent.prototype.addmarker = function (IdrawingsMap, properties) {
        var url = 'Content/Images/';
        var contextObj = this;
        var BlueIcon = L.icon({
            iconUrl: url + 'marker-icon.png',
            iconRetinaUrl: url + 'marker-icon-2x.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -25],
            shadowSize: [41, 41],
        });
        var RedIcon = L.icon({
            iconUrl: url + 'red-marker-icon.png',
            iconRetinaUrl: url + 'red-marker-icon-2x.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -25],
            shadowSize: [41, 41],
        });
        var _loop_1 = function(Item) {
            debugger;
            if (Item.Color == "Red")
                marker = new L.marker([Item.Latitude, Item.Longitude], { icon: RedIcon, draggable: Item.Draggable }); //.addTo(IdrawingsMap);
            else
                marker = new L.marker([Item.Latitude, Item.Longitude], { icon: BlueIcon, draggable: Item.Draggable }); //.addTo(IdrawingsMap);
            popup = marker.bindPopup(Item.Popup, { maxWidth: 195 });
            contextObj.MarkersCluster.addLayer(marker);
            marker.on('mouseover', function (event) {
                var Latitude = event.target.getLatLng().lat + 200;
                var Longitude = event.target.getLatLng().lng + 200;
                if (!IdrawingsMap.getBounds().contains([Latitude, Longitude])) {
                    IdrawingsMap.setMaxBounds(null);
                }
                event.target.openPopup();
                //marker.off(event)
            });
            marker.on('mouseout', function (event) {
                var Latitude = event.target.getLatLng().lat + 200;
                var Longitude = event.target.getLatLng().lng + 200;
                event.target.closePopup();
                if (!IdrawingsMap.getBounds().contains([Latitude, Longitude])) {
                    setTimeout(function () {
                        IdrawingsMap.setMaxBounds([[-85.0, -180.0], [85.0, 180.0]]);
                    }, 2000);
                }
                //marker.on('mouseover', function (event) {
                //    event.target.openPopup();
                //    marker.off(event)
                //});
            });
            marker.on('contextmenu', function (event) {
                contextObj.CurrentMarker = event.target;
                contextObj.CurrentId = Item.Id;
                contextObj.outIds.emit({ Item: Item });
            });
            //marker.on('click', function (event) {
            //    contextObj.outLeftClick.emit({ Item });
            //});
            if (Item.Draggable == true) {
                marker.on("dragend", function (event) {
                    var DraggedItem;
                    DraggedItem = Item;
                    DraggedItem.Latitude = event.target.getLatLng().lat;
                    DraggedItem.Longitude = event.target.getLatLng().lng;
                    contextObj.outDraggable.emit({ DraggedItem: DraggedItem });
                });
            }
        };
        var marker, popup;
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var Item = properties_1[_i];
            _loop_1(Item);
        }
        IdrawingsMap.addLayer(contextObj.MarkersCluster);
    };
    MapComponent.prototype.ngOnChanges = function (changes) {
        debugger;
        var contextObj = this;
        var Updatedproperties = [], temp;
        if (contextObj.CurrentId > 0) {
            var index = changes["properties"]["currentValue"].findIndex(function (c) { return c.Id == contextObj.CurrentId; });
            //contextObj.inputItems.splice(index, 1, UpdatedImap);
            contextObj.IdrawingsMap.removeLayer(contextObj.MarkersCluster);
            contextObj.MarkersCluster.removeLayer(contextObj.CurrentMarker);
            temp = changes["properties"]["currentValue"][index];
            //changes["properties"]["currentValue"][0]
            if (temp.Latitude && temp.Longitude) {
                Updatedproperties.push(temp);
                contextObj.addmarker(contextObj.IdrawingsMap, Updatedproperties);
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MapComponent.prototype, "properties", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MapComponent.prototype, "outIds", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MapComponent.prototype, "outDraggable", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MapComponent.prototype, "outLeftClick", void 0);
    MapComponent = __decorate([
        core_1.Component({
            selector: 'indus-map',
            templateUrl: './app/Framework/Views/map/map.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map