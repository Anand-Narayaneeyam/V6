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
var Subject_1 = require('rxjs/Subject');
var merge_1 = require('rxjs/observable/merge');
require('rxjs/add/operator/map');
require('rxjs/add/operator/mergeMap');
require('rxjs/add/operator/takeUntil');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/pairwise');
require('rxjs/add/operator/take');
/**
 * @private
 */
var isNumberCloseTo = function (value1, value2, precision) {
    if (precision === void 0) { precision = 15; }
    var diff = Math.abs(value1 - value2);
    return diff < precision;
};
/**
 * @private
 */
var getNewBoundingRectangle = function (startingRect, edges, mouseX, mouseY) {
    var newBoundingRect = {
        top: startingRect.top,
        bottom: startingRect.bottom,
        left: startingRect.left,
        right: startingRect.right
    };
    if (edges.top) {
        newBoundingRect.top += mouseY;
    }
    if (edges.bottom) {
        newBoundingRect.bottom += mouseY;
    }
    if (edges.left) {
        newBoundingRect.left += mouseX;
    }
    if (edges.right) {
        newBoundingRect.right += mouseX;
    }
    newBoundingRect.height = newBoundingRect.bottom - newBoundingRect.top;
    newBoundingRect.width = newBoundingRect.right - newBoundingRect.left;
    return newBoundingRect;
};
var isWithinBoundingY = function (_a) {
    var mouseY = _a.mouseY, rect = _a.rect;
    return mouseY >= rect.top && mouseY <= rect.bottom;
};
var isWithinBoundingX = function (_a) {
    var mouseX = _a.mouseX, rect = _a.rect;
    return mouseX >= rect.left && mouseX <= rect.right;
};
/**
 * @private
 */
var getResizeEdges = function (_a) {
    var mouseX = _a.mouseX, mouseY = _a.mouseY, elm = _a.elm, allowedEdges = _a.allowedEdges;
    var elmPosition = elm.nativeElement.getBoundingClientRect();
    var edges = {};
    if (allowedEdges.left && isNumberCloseTo(mouseX, elmPosition.left) && isWithinBoundingY({ mouseY: mouseY, rect: elmPosition })) {
        edges.left = true;
    }
    if (allowedEdges.right && isNumberCloseTo(mouseX, elmPosition.right) && isWithinBoundingY({ mouseY: mouseY, rect: elmPosition })) {
        edges.right = true;
    }
    if (allowedEdges.top && isNumberCloseTo(mouseY, elmPosition.top) && isWithinBoundingX({ mouseX: mouseX, rect: elmPosition })) {
        edges.top = true;
    }
    if (allowedEdges.bottom && isNumberCloseTo(mouseY, elmPosition.bottom) && isWithinBoundingX({ mouseX: mouseX, rect: elmPosition })) {
        edges.bottom = true;
    }
    return edges;
};
/**
 * @private
 */
var getResizeCursor = function (edges) {
    if (edges.left && edges.top) {
        return 'nw-resize';
    }
    else if (edges.right && edges.top) {
        return 'ne-resize';
    }
    else if (edges.left && edges.bottom) {
        return 'sw-resize';
    }
    else if (edges.right && edges.bottom) {
        return 'se-resize';
    }
    else if (edges.left || edges.right) {
        return 'ew-resize';
    }
    else if (edges.top || edges.bottom) {
        return 'ns-resize';
    }
    else {
        return 'auto';
    }
};
/**
 * @private
 */
var getEdgesDiff = function (_a) {
    var edges = _a.edges, initialRectangle = _a.initialRectangle, newRectangle = _a.newRectangle;
    var edgesDiff = {};
    Object.keys(edges).forEach(function (edge) {
        edgesDiff[edge] = newRectangle[edge] - initialRectangle[edge];
    });
    return edgesDiff;
};
/**
 * An element placed inside a `mwl-resizable` directive to be used as a drag and resize handle
 *
 * For example
 *
 * ```
 * <div mwl-resizable>
 *   <div mwl-resize-handle [resizeEdges]="{bottom: true, right: true}"></div>
 * </div>
 * ```
 */
var ResizeHandle = (function () {
    function ResizeHandle() {
        /**
         * The `Edges` object that contains the edges of the parent element that dragging the handle will trigger a resize on
         */
        this.resizeEdges = {};
    }
    /**
     * @private
     */
    ResizeHandle.prototype.onMouseup = function (mouseX, mouseY) {
        this.resizable.mouseup.next({ mouseX: mouseX, mouseY: mouseY, edges: this.resizeEdges });
    };
    /**
     * @private
     */
    ResizeHandle.prototype.onMousedown = function (mouseX, mouseY) {
        this.resizable.mousedown.next({ mouseX: mouseX, mouseY: mouseY, edges: this.resizeEdges });
    };
    /**
     * @private
     */
    ResizeHandle.prototype.onMousemove = function (mouseX, mouseY) {
        this.resizable.mousemove.next({ mouseX: mouseX, mouseY: mouseY, edges: this.resizeEdges });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ResizeHandle.prototype, "resizeEdges", void 0);
    __decorate([
        // set by the parent mwl-resizable directive
        core_1.HostListener('mouseup', ['$event.clientX', '$event.clientY']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Number, Number]), 
        __metadata('design:returntype', void 0)
    ], ResizeHandle.prototype, "onMouseup", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event.clientX', '$event.clientY']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Number, Number]), 
        __metadata('design:returntype', void 0)
    ], ResizeHandle.prototype, "onMousedown", null);
    __decorate([
        core_1.HostListener('mousemove', ['$event.clientX', '$event.clientY']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Number, Number]), 
        __metadata('design:returntype', void 0)
    ], ResizeHandle.prototype, "onMousemove", null);
    ResizeHandle = __decorate([
        core_1.Directive({
            selector: '[mwl-resize-handle]'
        }), 
        __metadata('design:paramtypes', [])
    ], ResizeHandle);
    return ResizeHandle;
}());
exports.ResizeHandle = ResizeHandle;
/**
 * Place this on an element to make it resizable
 *
 * For example
 *
 * ```
 * <div mwl-resizable [resizeEdges]="{bottom: true, right: true, top: true, left: true}" [enableGhostResize]="true"></div>
 * ```
 */
var Resizable = (function () {
    /**
     * @private
     */
    function Resizable(renderer, elm) {
        this.renderer = renderer;
        this.elm = elm;
        /**
         * The edges that an element can be resized from. Pass an object like `{top: true, bottom: false}`. By default no edges can be resized.
         */
        this.resizeEdges = {};
        /**
         * Set to `true` to enable a temporary resizing effect of the element in between the `onResizeStart` and `onResizeEnd` events.
         */
        this.enableGhostResize = false;
        /**
         * A snap grid that resize events will be locked to.
         *
         * e.g. to only allow the element to be resized every 10px set it to `{left: 10, right: 10}`
         */
        this.resizeSnapGrid = {};
        /**
         * Called when the mouse is pressed and a resize event is about to begin. `$event` is a `ResizeEvent` object.
         */
        this.onResizeStart = new core_1.EventEmitter(false);
        /**
         * Called as the mouse is dragged after a resize event has begun. `$event` is a `ResizeEvent` object.
         */
        this.onResize = new core_1.EventEmitter(false);
        /**
         * Called after the mouse is released after a resize event. `$event` is a `ResizeEvent` object.
         */
        this.onResizeEnd = new core_1.EventEmitter(false);
        /**
         * @private
         */
        this.mouseup = new Subject_1.Subject();
        /**
         * @private
         */
        this.mousedown = new Subject_1.Subject();
        this.mousedownStatus = false;
        /**
         * @private
         */
        this.mousemove = new Subject_1.Subject();
    }
    /**
     * @private
     */
    Resizable.prototype.ngOnInit = function () {
        var _this = this;
        var currentResize;
        var removeGhostElement = function () {
            if (currentResize.clonedNode) {
                _this.elm.nativeElement.parentElement.removeChild(currentResize.clonedNode);
                _this.renderer.setElementStyle(_this.elm.nativeElement, 'visibility', 'inherit');
            }
        };
        this.mousemove.subscribe(function (_a) {
            var mouseX = _a.mouseX, mouseY = _a.mouseY;
            var resizeEdges = getResizeEdges({ mouseX: mouseX, mouseY: mouseY, elm: _this.elm, allowedEdges: _this.resizeEdges });
            var cursor = getResizeCursor(resizeEdges);
            _this.renderer.setElementStyle(_this.elm.nativeElement, 'cursor', cursor);
        });
        var mousedrag = this.mousedown.flatMap(function (startCoords) {
            var getDiff = function (moveCoords) {
                return {
                    mouseX: moveCoords.mouseX - startCoords.mouseX,
                    mouseY: moveCoords.mouseY - startCoords.mouseY
                };
            };
            var getSnapGrid = function () {
                var snapGrid = { x: 1, y: 1 };
                if (currentResize) {
                    if (_this.resizeSnapGrid.left && currentResize.edges.left) {
                        snapGrid.x = +_this.resizeSnapGrid.left;
                    }
                    else if (_this.resizeSnapGrid.right && currentResize.edges.right) {
                        snapGrid.x = +_this.resizeSnapGrid.right;
                    }
                    if (_this.resizeSnapGrid.top && currentResize.edges.top) {
                        snapGrid.y = +_this.resizeSnapGrid.top;
                    }
                    else if (_this.resizeSnapGrid.bottom && currentResize.edges.bottom) {
                        snapGrid.y = +_this.resizeSnapGrid.bottom;
                    }
                }
                return snapGrid;
            };
            var getGrid = function (coords, snapGrid) {
                return {
                    x: Math.ceil(coords.mouseX / snapGrid.x),
                    y: Math.ceil(coords.mouseY / snapGrid.y)
                };
            };
            return merge_1.merge(_this.mousemove.take(1).map(function (coords) { return [, coords]; }), _this.mousemove.pairwise()).map(function (_a) {
                var previousCoords = _a[0], newCoords = _a[1];
                return [previousCoords ? getDiff(previousCoords) : previousCoords, getDiff(newCoords)];
            }).filter(function (_a) {
                var previousCoords = _a[0], newCoords = _a[1];
                if (!previousCoords) {
                    return true;
                }
                var snapGrid = getSnapGrid();
                var previousGrid = getGrid(previousCoords, snapGrid);
                var newGrid = getGrid(newCoords, snapGrid);
                return (previousGrid.x !== newGrid.x || previousGrid.y !== newGrid.y);
            }).map(function (_a) {
                var newCoords = _a[1];
                var snapGrid = getSnapGrid();
                return {
                    mouseX: Math.round(newCoords.mouseX / snapGrid.x) * snapGrid.x,
                    mouseY: Math.round(newCoords.mouseY / snapGrid.y) * snapGrid.y
                };
            }).takeUntil(merge_1.merge(_this.mouseup, _this.mousedown));
        }).filter(function () { return !!currentResize; });
        mousedrag.map(function (_a) {
            var mouseX = _a.mouseX, mouseY = _a.mouseY;
            return getNewBoundingRectangle(currentResize.startingRect, currentResize.edges, mouseX, mouseY);
        }).filter(function (newBoundingRect) {
            return newBoundingRect.height > 0 && newBoundingRect.width > 0;
        }).filter(function (newBoundingRect) {
            return _this.validateResize ? _this.validateResize({
                rectangle: newBoundingRect,
                edges: getEdgesDiff({
                    edges: currentResize.edges,
                    initialRectangle: currentResize.startingRect,
                    newRectangle: newBoundingRect
                })
            }) : true;
        }).subscribe(function (newBoundingRect) {
            if (currentResize.clonedNode) {
                _this.renderer.setElementStyle(currentResize.clonedNode, 'height', newBoundingRect.height + "px");
                _this.renderer.setElementStyle(currentResize.clonedNode, 'width', newBoundingRect.width + "px");
                _this.renderer.setElementStyle(currentResize.clonedNode, 'top', newBoundingRect.top + "px");
                _this.renderer.setElementStyle(currentResize.clonedNode, 'left', newBoundingRect.left + "px");
            }
            _this.onResize.emit({
                edges: getEdgesDiff({
                    edges: currentResize.edges,
                    initialRectangle: currentResize.startingRect,
                    newRectangle: newBoundingRect
                }),
                rectangle: newBoundingRect
            });
            currentResize.currentRect = newBoundingRect;
        });
        this.mousedown.map(function (_a) {
            var mouseX = _a.mouseX, mouseY = _a.mouseY, edges = _a.edges;
            return edges || getResizeEdges({ mouseX: mouseX, mouseY: mouseY, elm: _this.elm, allowedEdges: _this.resizeEdges });
        }).filter(function (edges) {
            return Object.keys(edges).length > 0;
        }).subscribe(function (edges) {
            if (currentResize) {
                removeGhostElement();
            }
            var startingRect = _this.elm.nativeElement.getBoundingClientRect();
            currentResize = {
                edges: edges,
                startingRect: startingRect,
                currentRect: startingRect
            };
            if (_this.enableGhostResize) {
                currentResize.clonedNode = _this.elm.nativeElement.cloneNode(true);
                _this.elm.nativeElement.parentElement.appendChild(currentResize.clonedNode);
                _this.renderer.setElementStyle(_this.elm.nativeElement, 'visibility', 'hidden');
                _this.renderer.setElementStyle(currentResize.clonedNode, 'position', 'fixed');
                _this.renderer.setElementStyle(currentResize.clonedNode, 'left', currentResize.startingRect.left + "px");
                _this.renderer.setElementStyle(currentResize.clonedNode, 'top', currentResize.startingRect.top + "px");
                _this.renderer.setElementStyle(currentResize.clonedNode, 'user-drag', 'none');
                _this.renderer.setElementStyle(currentResize.clonedNode, '-webkit-user-drag', 'none');
            }
            _this.onResizeStart.emit({
                edges: getEdgesDiff({ edges: edges, initialRectangle: startingRect, newRectangle: startingRect }),
                rectangle: getNewBoundingRectangle(startingRect, {}, 0, 0)
            });
        });
        this.mouseup.subscribe(function () {
            if (currentResize) {
                _this.onResizeEnd.emit({
                    edges: getEdgesDiff({
                        edges: currentResize.edges,
                        initialRectangle: currentResize.startingRect,
                        newRectangle: currentResize.currentRect
                    }),
                    rectangle: currentResize.currentRect
                });
                removeGhostElement();
                currentResize = null;
            }
        });
    };
    /**
     * @private
     */
    Resizable.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.resizeHandles.forEach(function (handle) {
            handle.resizable = _this;
        });
    };
    /**
     * @private
     */
    Resizable.prototype.onMouseup = function (mouseX, mouseY) {
        /*if (event.target["hasAttribute"]("mwl-resizable")) {*/
        this.mousedownStatus = false;
        this.mouseup.next({ mouseX: mouseX, mouseY: mouseY });
        /*}*/
    };
    /**
     * @private
     */
    Resizable.prototype.onMousedown = function (mouseX, mouseY) {
        if (event.target["hasAttribute"]("mwl-resizable")) {
            this.mousedownStatus = true;
            this.mousedown.next({ mouseX: mouseX, mouseY: mouseY });
        }
    };
    /**
     * @private
     */
    Resizable.prototype.onMousemove = function (mouseX, mouseY) {
        if (event.target["hasAttribute"]("mwl-resizable") || this.mousedownStatus == true) {
            this.mousemove.next({ mouseX: mouseX, mouseY: mouseY });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], Resizable.prototype, "validateResize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Resizable.prototype, "resizeEdges", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Resizable.prototype, "enableGhostResize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Resizable.prototype, "resizeSnapGrid", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Resizable.prototype, "onResizeStart", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Resizable.prototype, "onResize", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Resizable.prototype, "onResizeEnd", void 0);
    __decorate([
        core_1.ContentChildren(ResizeHandle), 
        __metadata('design:type', core_1.QueryList)
    ], Resizable.prototype, "resizeHandles", void 0);
    __decorate([
        core_1.HostListener('document:mouseup', ['$event.clientX', '$event.clientY']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Number, Number]), 
        __metadata('design:returntype', void 0)
    ], Resizable.prototype, "onMouseup", null);
    __decorate([
        core_1.HostListener('document:mousedown', ['$event.clientX', '$event.clientY']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Number, Number]), 
        __metadata('design:returntype', void 0)
    ], Resizable.prototype, "onMousedown", null);
    __decorate([
        core_1.HostListener('document:mousemove', ['$event.clientX', '$event.clientY']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Number, Number]), 
        __metadata('design:returntype', void 0)
    ], Resizable.prototype, "onMousemove", null);
    Resizable = __decorate([
        core_1.Directive({
            selector: '[mwl-resizable]'
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], Resizable);
    return Resizable;
}());
exports.Resizable = Resizable;
//# sourceMappingURL=resizable.directive.js.map