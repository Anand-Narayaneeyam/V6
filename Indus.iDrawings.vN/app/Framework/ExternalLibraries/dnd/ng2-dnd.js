// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var dnd_config_1 = require('./src/dnd.config');
var dnd_service_1 = require('./src/dnd.service');
var dnd_draggable_1 = require('./src/dnd.draggable');
var dnd_droppable_1 = require('./src/dnd.droppable');
var dnd_sortable_1 = require('./src/dnd.sortable');
__export(require('./src/dnd.component'));
__export(require('./src/dnd.config'));
__export(require('./src/dnd.service'));
__export(require('./src/dnd.draggable'));
__export(require('./src/dnd.droppable'));
__export(require('./src/dnd.sortable'));
exports.DND_PROVIDERS = [dnd_config_1.DragDropConfig, dnd_service_1.DragDropService, dnd_service_1.DragDropSortableService];
exports.DND_DIRECTIVES = [dnd_draggable_1.DraggableComponent, dnd_droppable_1.DroppableComponent, dnd_sortable_1.SortableContainer, dnd_sortable_1.SortableComponent];
//# sourceMappingURL=ng2-dnd.js.map