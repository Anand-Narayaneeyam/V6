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
var SortableContainer = (function (_super) {
    __extends(SortableContainer, _super);
    function SortableContainer(elemRef, dragDropService, config, cdr, _sortableDataService) {
        _super.call(this, elemRef, dragDropService, config, cdr);
        this._sortableDataService = _sortableDataService;
        this._sortableData = [];
        this.dragEnabled = false;
    }
    Object.defineProperty(SortableContainer.prototype, "draggable", {
        set: function (value) {
            this.dragEnabled = !!value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SortableContainer.prototype, "sortableData", {
        get: function () {
            return this._sortableData;
        },
        set: function (sortableData) {
            this._sortableData = sortableData;
            //
            this.dropEnabled = this._sortableData.length === 0;
            // console.log("collection is changed, drop enabled: " + this.dropEnabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SortableContainer.prototype, "dropzones", {
        set: function (value) {
            this.dropZones = value;
        },
        enumerable: true,
        configurable: true
    });
    SortableContainer.prototype._onDragEnterCallback = function (event) {
        if (this._sortableDataService.isDragged) {
            var item = this._sortableDataService.sortableData[this._sortableDataService.index];
            // Check does element exist in sortableData of this Container
            if (this._sortableData.indexOf(item) === -1) {
                // Let's add it
                // console.log('Container._onDragEnterCallback. drag node [' + this._sortableDataService.index.toString() + '] over parent node');
                // Remove item from previouse list
                this._sortableDataService.sortableData.splice(this._sortableDataService.index, 1);
                // Add item to new list
                this._sortableData.unshift(item);
                this._sortableDataService.sortableData = this._sortableData;
                this._sortableDataService.index = 0;
            }
            // Refresh changes in properties of container component
            this.detectChanges();
        }
    };
    __decorate([
        core_2.Input("dragEnabled"), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], SortableContainer.prototype, "draggable", null);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], SortableContainer.prototype, "sortableData", null);
    __decorate([
        core_2.Input("dropZones"), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], SortableContainer.prototype, "dropzones", null);
    SortableContainer = __decorate([
        core_2.Directive({ selector: '[dnd-sortable-container]' }), 
        __metadata('design:paramtypes', [core_2.ElementRef, dnd_service_1.DragDropService, dnd_config_1.DragDropConfig, core_1.ChangeDetectorRef, dnd_service_1.DragDropSortableService])
    ], SortableContainer);
    return SortableContainer;
}(dnd_component_1.AbstractComponent));
exports.SortableContainer = SortableContainer;
var SortableComponent = (function (_super) {
    __extends(SortableComponent, _super);
    function SortableComponent(elemRef, dragDropService, config, _sortableContainer, _sortableDataService, cdr) {
        _super.call(this, elemRef, dragDropService, config, cdr);
        this._sortableContainer = _sortableContainer;
        this._sortableDataService = _sortableDataService;
        /**
         * Callback function called when the drag action ends with a valid drop action.
         * It is activated after the on-drop-success callback
         */
        this.onDragSuccessCallback = new core_2.EventEmitter();
        this.onDragStartCallback = new core_2.EventEmitter();
        this.onDragOverCallback = new core_2.EventEmitter();
        this.onDragEndCallback = new core_2.EventEmitter();
        this.onDropSuccessCallback = new core_2.EventEmitter();
        this.dropZones = this._sortableContainer.dropZones;
        this.dragEnabled = true;
        this.dropEnabled = true;
    }
    Object.defineProperty(SortableComponent.prototype, "draggable", {
        set: function (value) {
            this.dragEnabled = !!value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SortableComponent.prototype, "droppable", {
        set: function (value) {
            this.dropEnabled = !!value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SortableComponent.prototype, "effectallowed", {
        /**
         * Drag allowed effect
         */
        set: function (value) {
            this.effectAllowed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SortableComponent.prototype, "effectcursor", {
        /**
         * Drag effect cursor
         */
        set: function (value) {
            this.effectCursor = value;
        },
        enumerable: true,
        configurable: true
    });
    SortableComponent.prototype._onDragStartCallback = function (event) {
        // console.log('_onDragStartCallback. dragging elem with index ' + this.index);
        this._sortableDataService.isDragged = true;
        this._sortableDataService.sortableData = this._sortableContainer.sortableData;
        this._sortableDataService.index = this.index;
        this._sortableDataService.markSortable(this._elem);
        // Add dragData
        this._dragDropService.isDragged = true;
        this._dragDropService.dragData = this.dragData;
        this._dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
        //
        this.onDragStartCallback.emit(this._dragDropService.dragData);
    };
    SortableComponent.prototype._onDragOverCallback = function (event) {
        if (this._sortableDataService.isDragged && this._elem != this._sortableDataService.elem) {
            // console.log('_onDragOverCallback. dragging elem with index ' + this.index);
            this._sortableDataService.sortableData = this._sortableContainer.sortableData;
            this._sortableDataService.index = this.index;
            this._sortableDataService.markSortable(this._elem);
            this.onDragOverCallback.emit(this._dragDropService.dragData);
        }
    };
    SortableComponent.prototype._onDragEndCallback = function (event) {
        // console.log('_onDragEndCallback. end dragging elem with index ' + this.index);
        this._sortableDataService.isDragged = false;
        this._sortableDataService.sortableData = null;
        this._sortableDataService.index = null;
        this._sortableDataService.markSortable(null);
        // Add dragGata
        this._dragDropService.isDragged = false;
        this._dragDropService.dragData = null;
        this._dragDropService.onDragSuccessCallback = null;
        //
        this.onDragEndCallback.emit(this._dragDropService.dragData);
    };
    SortableComponent.prototype._onDragEnterCallback = function (event) {
        if (this._sortableDataService.isDragged) {
            this._sortableDataService.markSortable(this._elem);
            if ((this.index !== this._sortableDataService.index) ||
                (this._sortableDataService.sortableData != this._sortableContainer.sortableData)) {
                // console.log('Component._onDragEnterCallback. drag node [' + this.index + '] over node [' + this._sortableDataService.index + ']');
                // Get item
                var item = this._sortableDataService.sortableData[this._sortableDataService.index];
                // Remove item from previouse list
                this._sortableDataService.sortableData.splice(this._sortableDataService.index, 1);
                // Add item to new list
                this._sortableContainer.sortableData.splice(this.index, 0, item);
                this._sortableDataService.sortableData = this._sortableContainer.sortableData;
                this._sortableDataService.index = this.index;
            }
        }
    };
    SortableComponent.prototype._onDropCallback = function (event) {
        if (this._sortableDataService.isDragged) {
            // console.log('onDropCallback.onDropSuccessCallback.dragData', this._dragDropService.dragData);
            this.onDropSuccessCallback.emit(this._dragDropService.dragData);
            if (this._dragDropService.onDragSuccessCallback) {
                // console.log('onDropCallback.onDragSuccessCallback.dragData', this._dragDropService.dragData);
                this._dragDropService.onDragSuccessCallback.emit(this._dragDropService.dragData);
            }
            // Refresh changes in properties of container component
            this._sortableContainer.detectChanges();
        }
    };
    __decorate([
        core_2.Input('sortableIndex'), 
        __metadata('design:type', Number)
    ], SortableComponent.prototype, "index", void 0);
    __decorate([
        core_2.Input("dragEnabled"), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], SortableComponent.prototype, "draggable", null);
    __decorate([
        core_2.Input("dropEnabled"), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], SortableComponent.prototype, "droppable", null);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Object)
    ], SortableComponent.prototype, "dragData", void 0);
    __decorate([
        core_2.Input("effectAllowed"), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SortableComponent.prototype, "effectallowed", null);
    __decorate([
        core_2.Input("effectCursor"), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SortableComponent.prototype, "effectcursor", null);
    __decorate([
        core_2.Output("onDragSuccess"), 
        __metadata('design:type', core_2.EventEmitter)
    ], SortableComponent.prototype, "onDragSuccessCallback", void 0);
    __decorate([
        core_2.Output("onDragStart"), 
        __metadata('design:type', core_2.EventEmitter)
    ], SortableComponent.prototype, "onDragStartCallback", void 0);
    __decorate([
        core_2.Output("onDragOver"), 
        __metadata('design:type', core_2.EventEmitter)
    ], SortableComponent.prototype, "onDragOverCallback", void 0);
    __decorate([
        core_2.Output("onDragEnd"), 
        __metadata('design:type', core_2.EventEmitter)
    ], SortableComponent.prototype, "onDragEndCallback", void 0);
    __decorate([
        core_2.Output("onDropSuccess"), 
        __metadata('design:type', core_2.EventEmitter)
    ], SortableComponent.prototype, "onDropSuccessCallback", void 0);
    SortableComponent = __decorate([
        core_2.Directive({ selector: '[dnd-sortable]' }), 
        __metadata('design:paramtypes', [core_2.ElementRef, dnd_service_1.DragDropService, dnd_config_1.DragDropConfig, SortableContainer, dnd_service_1.DragDropSortableService, core_1.ChangeDetectorRef])
    ], SortableComponent);
    return SortableComponent;
}(dnd_component_1.AbstractComponent));
exports.SortableComponent = SortableComponent;
//# sourceMappingURL=dnd.sortable.js.map