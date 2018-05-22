// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var core_2 = require('@angular/core');
var dnd_component_1 = require('./dnd.component');
var dnd_config_1 = require('./dnd.config');
var dnd_service_1 = require('./dnd.service');
var DraggableComponent = (function (_super) {
    __extends(DraggableComponent, _super);
    function DraggableComponent(elemRef, dragDropService, config, cdr) {
        _super.call(this, elemRef, dragDropService, config, cdr);
        /**
         * Callback function called when the drag actions happened.
         */
        this.onDragStart = new core_2.EventEmitter();
        this.onDragEnd = new core_2.EventEmitter();
        /**
         * Callback function called when the drag action ends with a valid drop action.
         * It is activated after the on-drop-success callback
         */
        this.onDragSuccessCallback = new core_2.EventEmitter();
        this._defaultCursor = this._elem.style.cursor;
        this.dragEnabled = true;
    }
    Object.defineProperty(DraggableComponent.prototype, "draggable", {
        set: function (value) {
            this.dragEnabled = !!value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableComponent.prototype, "dropzones", {
        set: function (value) {
            this.dropZones = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableComponent.prototype, "effectallowed", {
        /**
         * Drag allowed effect
         */
        set: function (value) {
            this.effectAllowed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableComponent.prototype, "effectcursor", {
        /**
         * Drag effect cursor
         */
        set: function (value) {
            this.effectCursor = value;
        },
        enumerable: true,
        configurable: true
    });
    DraggableComponent.prototype._onDragStartCallback = function (event) {
        this._dragDropService.isDragged = true;
        this._dragDropService.dragData = this.dragData;
        this._dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
        this._elem.classList.add(this._config.onDragStartClass);
        //
        this.onDragStart.emit({ dragData: this.dragData, mouseEvent: event });
    };
    DraggableComponent.prototype._onDragEndCallback = function (event) {
        this._dragDropService.isDragged = false;
        this._dragDropService.dragData = null;
        this._dragDropService.onDragSuccessCallback = null;
        this._elem.classList.remove(this._config.onDragStartClass);
        //
        this.onDragEnd.emit({ dragData: this.dragData, mouseEvent: event });
    };
    __decorate([
        core_2.Input("dragEnabled"), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], DraggableComponent.prototype, "draggable", null);
    __decorate([
        core_2.Output(), 
        __metadata('design:type', core_2.EventEmitter)
    ], DraggableComponent.prototype, "onDragStart", void 0);
    __decorate([
        core_2.Output(), 
        __metadata('design:type', core_2.EventEmitter)
    ], DraggableComponent.prototype, "onDragEnd", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Object)
    ], DraggableComponent.prototype, "dragData", void 0);
    __decorate([
        core_2.Output("onDragSuccess"), 
        __metadata('design:type', core_2.EventEmitter)
    ], DraggableComponent.prototype, "onDragSuccessCallback", void 0);
    __decorate([
        core_2.Input("dropZones"), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], DraggableComponent.prototype, "dropzones", null);
    __decorate([
        core_2.Input("effectAllowed"), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], DraggableComponent.prototype, "effectallowed", null);
    __decorate([
        core_2.Input("effectCursor"), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], DraggableComponent.prototype, "effectcursor", null);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Object)
    ], DraggableComponent.prototype, "dragImage", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Boolean)
    ], DraggableComponent.prototype, "cloneItem", void 0);
    DraggableComponent = __decorate([
        core_2.Directive({ selector: '[dnd-draggable]' }), 
        __metadata('design:paramtypes', [core_2.ElementRef, dnd_service_1.DragDropService, dnd_config_1.DragDropConfig, core_1.ChangeDetectorRef])
    ], DraggableComponent);
    return DraggableComponent;
}(dnd_component_1.AbstractComponent));
exports.DraggableComponent = DraggableComponent;
//# sourceMappingURL=dnd.draggable.js.map