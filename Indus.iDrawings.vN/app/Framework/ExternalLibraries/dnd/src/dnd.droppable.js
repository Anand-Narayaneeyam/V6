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
var DroppableComponent = (function (_super) {
    __extends(DroppableComponent, _super);
    function DroppableComponent(elemRef, dragDropService, config, cdr) {
        _super.call(this, elemRef, dragDropService, config, cdr);
        /**
         * Callback function called when the drop action completes correctly.
         * It is activated before the on-drag-success callback.
         */
        this.onDropSuccess = new core_2.EventEmitter();
        this.onDragEnter = new core_2.EventEmitter();
        this.onDragOver = new core_2.EventEmitter();
        this.onDragLeave = new core_2.EventEmitter();
        this.dropEnabled = true;
    }
    Object.defineProperty(DroppableComponent.prototype, "droppable", {
        set: function (value) {
            this.dropEnabled = !!value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DroppableComponent.prototype, "allowdrop", {
        set: function (value) {
            this.allowDrop = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DroppableComponent.prototype, "dropzones", {
        set: function (value) {
            this.dropZones = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DroppableComponent.prototype, "effectallowed", {
        /**
         * Drag allowed effect
         */
        set: function (value) {
            this.effectAllowed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DroppableComponent.prototype, "effectcursor", {
        /**
         * Drag effect cursor
         */
        set: function (value) {
            this.effectCursor = value;
        },
        enumerable: true,
        configurable: true
    });
    DroppableComponent.prototype._onDragEnterCallback = function (event) {
        if (this._dragDropService.isDragged) {
            this._elem.classList.add(this._config.onDragEnterClass);
            this.onDragEnter.emit({ dragData: this._dragDropService.dragData, mouseEvent: event });
        }
    };
    DroppableComponent.prototype._onDragOverCallback = function (event) {
        if (this._dragDropService.isDragged) {
            this._elem.classList.add(this._config.onDragOverClass);
            this.onDragOver.emit({ dragData: this._dragDropService.dragData, mouseEvent: event });
        }
    };
    ;
    DroppableComponent.prototype._onDragLeaveCallback = function (event) {
        if (this._dragDropService.isDragged) {
            this._elem.classList.remove(this._config.onDragOverClass);
            this._elem.classList.remove(this._config.onDragEnterClass);
            this.onDragLeave.emit({ dragData: this._dragDropService.dragData, mouseEvent: event });
        }
    };
    ;
    DroppableComponent.prototype._onDropCallback = function (event) {
        if (this._dragDropService.isDragged) {
            this.onDropSuccess.emit({ dragData: this._dragDropService.dragData, mouseEvent: event });
            if (this._dragDropService.onDragSuccessCallback) {
                this._dragDropService.onDragSuccessCallback.emit({ dragData: this._dragDropService.dragData, mouseEvent: event });
            }
            this._elem.classList.remove(this._config.onDragOverClass);
            this._elem.classList.remove(this._config.onDragEnterClass);
        }
    };
    __decorate([
        core_2.Input("dropEnabled"), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], DroppableComponent.prototype, "droppable", null);
    __decorate([
        core_2.Output(), 
        __metadata('design:type', core_2.EventEmitter)
    ], DroppableComponent.prototype, "onDropSuccess", void 0);
    __decorate([
        core_2.Output(), 
        __metadata('design:type', core_2.EventEmitter)
    ], DroppableComponent.prototype, "onDragEnter", void 0);
    __decorate([
        core_2.Output(), 
        __metadata('design:type', core_2.EventEmitter)
    ], DroppableComponent.prototype, "onDragOver", void 0);
    __decorate([
        core_2.Output(), 
        __metadata('design:type', core_2.EventEmitter)
    ], DroppableComponent.prototype, "onDragLeave", void 0);
    __decorate([
        core_2.Input("allowDrop"), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Function])
    ], DroppableComponent.prototype, "allowdrop", null);
    __decorate([
        core_2.Input("dropZones"), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], DroppableComponent.prototype, "dropzones", null);
    __decorate([
        core_2.Input("effectAllowed"), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], DroppableComponent.prototype, "effectallowed", null);
    __decorate([
        core_2.Input("effectCursor"), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], DroppableComponent.prototype, "effectcursor", null);
    DroppableComponent = __decorate([
        core_2.Directive({ selector: '[dnd-droppable]' }), 
        __metadata('design:paramtypes', [core_2.ElementRef, dnd_service_1.DragDropService, dnd_config_1.DragDropConfig, core_1.ChangeDetectorRef])
    ], DroppableComponent);
    return DroppableComponent;
}(dnd_component_1.AbstractComponent));
exports.DroppableComponent = DroppableComponent;
//# sourceMappingURL=dnd.droppable.js.map