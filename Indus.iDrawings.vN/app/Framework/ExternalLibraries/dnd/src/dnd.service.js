// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd
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
var dnd_config_1 = require('./dnd.config');
var dnd_utils_1 = require('./dnd.utils');
var DragDropService = (function () {
    function DragDropService() {
        this.allowedDropZones = [];
    }
    DragDropService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DragDropService);
    return DragDropService;
}());
exports.DragDropService = DragDropService;
var DragDropSortableService = (function () {
    function DragDropSortableService(_config) {
        this._config = _config;
    }
    Object.defineProperty(DragDropSortableService.prototype, "elem", {
        get: function () {
            return this._elem;
        },
        enumerable: true,
        configurable: true
    });
    DragDropSortableService.prototype.markSortable = function (elem) {
        if (dnd_utils_1.isPresent(this._elem)) {
            this._elem.classList.remove(this._config.onSortableDragClass);
        }
        if (dnd_utils_1.isPresent(elem)) {
            this._elem = elem;
            this._elem.classList.add(this._config.onSortableDragClass);
        }
    };
    DragDropSortableService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [dnd_config_1.DragDropConfig])
    ], DragDropSortableService);
    return DragDropSortableService;
}());
exports.DragDropSortableService = DragDropSortableService;
//# sourceMappingURL=dnd.service.js.map