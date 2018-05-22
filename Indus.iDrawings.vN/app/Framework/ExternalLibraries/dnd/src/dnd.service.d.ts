import { EventEmitter } from '@angular/core';
import { DragDropConfig } from './dnd.config';
export interface DragDropData {
    dragData: any;
    mouseEvent: MouseEvent;
}
export declare class DragDropService {
    allowedDropZones: Array<string>;
    onDragSuccessCallback: EventEmitter<DragDropData>;
    dragData: any;
    isDragged: boolean;
}
export declare class DragDropSortableService {
    private _config;
    index: number;
    sortableData: Array<any>;
    isDragged: boolean;
    private _elem;
    elem: HTMLElement;
    constructor(_config: DragDropConfig);
    markSortable(elem: HTMLElement): void;
}
