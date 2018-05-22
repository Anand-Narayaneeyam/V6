import {Component, AfterViewInit, Input, Output, OnChanges, EventEmitter, SimpleChange} from '@angular/core';
import {NgControl} from '@angular/common';
import '../../../../Scripts/leaflet-0.7.3.js';
import '../../../../Scripts/leaflet.markercluster-src.js'; 
import {IMap} from '../../../Framework/Models/Interface/IMap'

declare var L: any;
@Component({
    selector: 'indus-map',
    templateUrl: './app/Framework/Views/map/map.component.html'   
})

export class MapComponent implements AfterViewInit, OnChanges{

    @Input() properties: IMap[];
    @Output() outIds = new EventEmitter();
    @Output() outDraggable = new EventEmitter();
    @Output() outLeftClick = new EventEmitter();
    offlinemode: boolean = false;
    maptarget: boolean = true;
    MarkersCluster: any;
    CurrentId: number = 0;
    CurrentMarker: any;
    IdrawingsMap: any;
    ngAfterViewInit() {
        debugger
        var L = window["L"];
        var MapLayer
        var Option = {
            center: [0, 0,2],
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
        var MapId: any = ""
        if (contextObj.properties && contextObj.properties.length > 0 && contextObj.properties[0].Id == 0) {
            setTimeout(function () {
                contextObj.maptarget = false;
            }, 50); 
            setTimeout(function () {
                MapId = "submapid"
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
                        //contextObj.addmarker(contextObj.IdrawingsMap, contextObj.properties);
                    }
                }); 

            }, 100); 

        }
        else {
            MapId = "mapid"
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
                    //contextObj.addmarker(contextObj.IdrawingsMap, contextObj.properties);
                }
            });     
                
        } 

    }

    addmarker(IdrawingsMap: any,properties:any) {
        var url = 'Content/Images/'
        var contextObj = this;
        var BlueIcon = L.icon({
            iconUrl: url +'marker-icon.png',
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
                      
        for (let Item of properties) {
            debugger
            var marker, popup;
            if (Item.Color == "Red")
                marker = new L.marker([Item.Latitude, Item.Longitude], { icon: RedIcon, draggable: Item.Draggable });//.addTo(IdrawingsMap);
            else
                marker = new L.marker([Item.Latitude, Item.Longitude], { icon: BlueIcon, draggable: Item.Draggable });//.addTo(IdrawingsMap);
            
            popup = marker.bindPopup(Item.Popup, { maxWidth: 195 })       
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

                var Latitude = event.target.getLatLng().lat+200;
                var Longitude = event.target.getLatLng().lng+200;                            
                event.target.closePopup();
                if(!IdrawingsMap.getBounds().contains([Latitude, Longitude])){
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
                contextObj.CurrentMarker = event.target
                contextObj.CurrentId = Item.Id
                contextObj.outIds.emit({Item});                
            });
            //marker.on('click', function (event) {
            //    contextObj.outLeftClick.emit({ Item });
            //});
            if (Item.Draggable == true) {
                marker.on("dragend", function (event) {
                    var DraggedItem: IMap;
                    DraggedItem = Item;
                    DraggedItem.Latitude = event.target.getLatLng().lat;
                    DraggedItem.Longitude = event.target.getLatLng().lng;
                    contextObj.outDraggable.emit({ DraggedItem })
                });
            }            
        }
        IdrawingsMap.addLayer(contextObj.MarkersCluster);
    }    
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        debugger
        var contextObj = this;
        var Updatedproperties: IMap[] = [],
            temp:IMap;
        if (contextObj.CurrentId > 0) {
            var index: number = changes["properties"]["currentValue"].findIndex(c => c.Id == contextObj.CurrentId);
            //contextObj.inputItems.splice(index, 1, UpdatedImap);
            contextObj.IdrawingsMap.removeLayer(contextObj.MarkersCluster);
            contextObj.MarkersCluster.removeLayer(contextObj.CurrentMarker);
            temp=changes["properties"]["currentValue"][index]          
            //changes["properties"]["currentValue"][0]
            if (temp.Latitude && temp.Longitude) {
                Updatedproperties.push(temp) 
                contextObj.addmarker(contextObj.IdrawingsMap, Updatedproperties)
            }
        }
    }
}
