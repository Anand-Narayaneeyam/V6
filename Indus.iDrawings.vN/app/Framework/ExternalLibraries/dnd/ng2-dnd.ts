// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

'use strict';

import {DragDropConfig} from './src/dnd.config';
import {DragDropService, DragDropSortableService} from './src/dnd.service';
import {DraggableComponent} from './src/dnd.draggable';
import {DroppableComponent} from './src/dnd.droppable';
import {SortableContainer, SortableComponent} from './src/dnd.sortable';

export * from './src/dnd.component';
export * from './src/dnd.config';
export * from './src/dnd.service';
export * from './src/dnd.draggable';
export * from './src/dnd.droppable';
export * from './src/dnd.sortable';

export const DND_PROVIDERS: any[] = [DragDropConfig, DragDropService, DragDropSortableService];
export const DND_DIRECTIVES: any[] = [DraggableComponent, DroppableComponent, SortableContainer, SortableComponent];