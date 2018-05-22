var EntityType = { Block_Ref: 1, Arc: 2, Text: 3, Leader: 4, Line: 5, MultilineText: 6, Circle: 7, Ellipse: 8, Polyline: 9, Hatch: 10, Unknown: 11, MLeader: 12 };
var LAYER = "FLOWCHART-LAYER";
GripData = function (objiWhizApi) {
    this.m_pointsArray = [];
    this.m_snapPointsArray = [];
    this.m_GripFrame = '';
    this.m_GripColor = [0, 0, 255];
    this.m_GripSize = 6;
    this.m_GripHandle = "";
    this.m_iWhizApi = objiWhizApi;
    this.m_IsVisible = false;
    this.m_CurrentGrip = -1;
    this.m_HotGripColor = [255, 0, 0];
    this.m_IsDragging = false;
    this.m_SnapFrame = '';
    this.m_ShowSnap = false;
    this.m_SnapColor = [255, 255, 0];
    this.m_SnapPoint = { x: 0, y: 0 };

    this.m_SnapHandle = "";
    this.m_CloneTimer = null;
    this.m_CurrentMoveX = 0;
    this.m_CurrentMoveY = 0;
    this.m_IsBusy = false;
	this.m_SnapTimer = null;
	this.m_IsSanpBusy = false;
	this.m_PrevMoveX = 0;
	this.m_PrevMoveY = 0;
	this.m_FirstClone = false;

    this.showGrips = function (entityHandle, resCallBack) {
        var that = this;
        this.m_GripHandle = entityHandle;
        this.m_IsVisible = true;
        this.m_iWhizApi.getGripPointsOfGivenEntity(entityHandle, function (retCode, points) {
            that.m_pointsArray = points.split(that.m_iWhizApi.m_Viewer.m_RowDelimiter);
            that.m_iWhizApi.regenerate();
            //that.m_iWhizApi.updateViewport(function () {
            resCallBack(0);
            // });       
        });
    },
    this.updateGrips = function (resCallBack) {
        var that = this;
        this.m_iWhizApi.getGripPointsOfGivenEntity(this.m_GripHandle, function (retCode, points) {
            that.m_pointsArray = points.split(that.m_iWhizApi.m_Viewer.m_RowDelimiter);
            that.m_iWhizApi.regenerate();
            // that.m_iWhizApi.updateViewport(function () {
            resCallBack(0);
            // });
        });
    },
    this.updateGripsWithPoints = function(points)
    {
        this.m_pointsArray = points.split(this.m_iWhizApi.m_Viewer.m_RowDelimiter);
        this.m_iWhizApi.regenerate();
    },
    this.drawSnapPoint = function () {
        if (this.m_ShowSnap) {
            var that = this;
            var viewport = this.m_iWhizApi.m_WebApp.viewer.activeViewport;
            if (this.m_iWhizApi.m_Viewer.m_State != this.m_iWhizApi.m_Viewer.STATE.PAN && this.m_iWhizApi.m_Viewer.m_State != this.m_iWhizApi.m_Viewer.STATE.ROTATE && this.m_iWhizApi.m_Viewer.m_State != this.m_iWhizApi.m_Viewer.STATE.ZOOM) {
                this.m_SnapFrame = viewport.drawMetafile(this.m_SnapFrame, function (draw) {
                    if (that.m_SnapHandle != "")//!(that.m_SnapPoint.x == 0 && that.m_SnapPoint.y == 0 &&
                    {
                        if (!that.m_IsDragging) 
                        {
                            var x = [0], y = [0], z = [0];
                            x[0] = that.m_SnapPoint.x; y[0] = that.m_SnapPoint.y;
                            that.m_iWhizApi.dwgToClient(x, y, z);

                            var x0, y0, x1, y1;
                            x0 = x[0] - (that.m_GripSize);
                            y0 = y[0] + that.m_GripSize;
                            x1 = x[0] + (that.m_GripSize);
                            y1 = y[0] - that.m_GripSize;

                            draw.pushTransform(viewport.screenToWorld());
                            draw.setColor(that.m_SnapColor);
                            draw.polyline([x0, y0, 0, x1, y0, 0, x1, y1, 0, x0, y1, 0, x0, y0, 0]);
                            draw.popTransform();
                            console.log("that.m_iWhizApi.m_Viewer.m_State " + that.m_iWhizApi.m_Viewer.m_State);
                        }
                        else
                        {
                            for (var i = 0; i < that.m_snapPointsArray.length - 1 ; i++) {//
                                var point = that.m_snapPointsArray[i].split(that.m_iWhizApi.m_Viewer.m_ColumnDelimiter);

                                var x = [0], y = [0], z = [0];
                                x[0] = parseFloat(point[0]); y[0] = parseFloat(point[1]); z[0] = 0;
                                that.m_iWhizApi.dwgToClient(x, y, z);

                                /////////////////////////////////////////////////////////////////////////////
                                var x0, y0, x1, y1;
                                x0 = x[0] - (that.m_GripSize);
                                y0 = y[0] + that.m_GripSize;
                                x1 = x[0] + (that.m_GripSize);
                                y1 = y[0] - that.m_GripSize;

                                draw.pushTransform(viewport.screenToWorld());
                                draw.setColor(that.m_SnapColor);
                                draw.polyline([x0, y0, 0, x1, y0, 0, x1, y1, 0, x0, y1, 0, x0, y0, 0]);
                                draw.popTransform();
                            }
                        }
                    }

                });
            }
        }
    },
    this.drawGrips = function () {
        if (this.m_IsVisible) {
            var that = this;
            var viewport = this.m_iWhizApi.m_WebApp.viewer.activeViewport;
            this.m_GripFrame = viewport.drawMetafile(this.m_GripFrame, function (draw) {
                for (var i = 0; i < that.m_pointsArray.length - 1 ; i++) {//
                    var point = that.m_pointsArray[i].split(that.m_iWhizApi.m_Viewer.m_ColumnDelimiter);

                    var x = [0], y = [0], z = [0];
                    x[0] = parseFloat(point[0]); y[0] = parseFloat(point[1]); z[0] = 0;
                    that.m_iWhizApi.dwgToClient(x, y, z);

                    /////////////////////////////////////////////////////////////////////////////
                    var x0, y0, x1, y1;
                    x0 = x[0] - (that.m_GripSize);
                    y0 = y[0] + that.m_GripSize;
                    x1 = x[0] + (that.m_GripSize);
                    y1 = y[0] - that.m_GripSize;

                    draw.pushTransform(viewport.screenToWorld());
                    if (that.m_CurrentGrip == i)
                        draw.setColor(that.m_HotGripColor);
                    else
                        draw.setColor(that.m_GripColor);
                    draw.fill([x0, y0, 0, x1, y0, 0, x1, y1, 0, x0, y1, 0, x0, y0, 0]);
                    draw.polygon([x0, y0, 0, x1, y0, 0, x1, y1, 0, x0, y1, 0, x0, y0, 0]);
                    draw.popTransform();
                }
            });
            // this.m_iWhizApi.updateViewport(function () { });
        }
    },
    this.hideGrips = function () {
        var that = this;
       if (this.m_IsVisible)
        {
            this.m_CurrentGrip = -1;
            this.m_GripHandle = "";
            this.m_IsVisible = false;
            this.m_GripFrame = this.m_iWhizApi.m_WebApp.viewer.activeViewport.drawMetafile(this.m_GripFrame, null);
            //this.m_iWhizApi.updateViewport(function () { });
            this.m_iWhizApi.regenerate();
        }
        return iWhizError.SUCCESS;
    },

    this.onMouseDown = function (clientX, clientY, button) {
        if (this.m_IsVisible) {
            if (button == 0) {
                this.m_CurrentGrip = this.getCurrentGrip(clientX, clientY);
                if (this.m_CurrentGrip != -1) {
                    this.m_IsDragging = true;
                    var that = this;
                                            
                   // that.m_iWhizApi.startUndoRecording(function () { });
                    this.m_iWhizApi.cloneEntity(this.m_GripHandle, this.m_CurrentGrip, function (retCode) {

                        that.m_CurrentMoveX = clientX;
                        that.m_CurrentMoveY = clientY;
                        that.m_FirstClone = true;
                        if (that.m_GripEntityType == EntityType.Leader) {
                            that.setSnapStatus(true);
                        }
                        that.startCloneTimer();
                        // that.m_iWhizApi.updateViewport(function () { });
                    });
                }
            }
        }
    },

    this.onMouseUp = function (clientX, clientY, button) {
        if (this.m_IsVisible) {
            if (button == 0) {
                if (this.m_IsDragging) {
                    this.clearCloneTimer();
                    this.m_IsDragging = false;
                    var that = this;
                    var X = [0], Y = [0], Z = [0];
                    X[0] = clientX;
                    Y[0] = clientY;
                    Z[0] = 0;
                    that.m_iWhizApi.clientToDWG(X, Y, Z);

                    //////////
                    //enable undo, disable redo                    
                   // that.m_iWhizApi.m_Viewer.m_EventManager.callEvent("flowchartUndoRedoChange", [true, false]);
                    //////////
                    if (this.m_GripEntityType == EntityType.Leader) {
                        if (this.m_SnapHandle != "") {
                            that.moveObjets(this.m_SnapPoint.x, this.m_SnapPoint.y, clientX, clientY);
                        }
                        else {
                            that.moveObjets(X[0], Y[0], clientX, clientY);
                        }
                    }
                    else {
                        that.moveObjets(X[0], Y[0], clientX, clientY);
                    }
                }
            }
        }
    },

    this.moveObjets = function (x, y, clientX, clientY) {
        var that = this;
        this.m_iWhizApi.moveEntityGrip(x, y, this.m_CurrentGrip, function (retCode, isConnectorChanged, outcomeId, fromId, toId, gripPoints) {
            that.updateGripsWithPoints(gripPoints);
            that.setCursorAfterGripCheck(clientX, clientY);
            if (isConnectorChanged) {
                that.m_iWhizApi.m_Viewer.m_EventManager.callEvent("flowchartConnectorChange", [outcomeId, fromId, toId]);
            }
            if (retCode == 138) {
                that.m_iWhizApi.m_Viewer.m_EventManager.callEvent("flowChartInvalidConnector", []);
            }
            //that.updateGrips(function () {
            //    that.setCursorAfterGripCheck(clientX, clientY);
            //    if (isConnectorChanged) {
            //        that.m_iWhizApi.m_Viewer.m_EventManager.callEvent("flowchartConnectorChange", [outcomeId, fromId, toId]);
            //    }
            //    if (retCode == 138) {
            //        that.m_iWhizApi.m_Viewer.m_EventManager.callEvent("flowChartInvalidConnector", []);
            //    }
            //});
        });
    },
    this.clearCloneTimer = function () {
        var that = this;
        clearTimeout(that.m_CloneTimer);
        that.m_CloneTimer = null;
        //////////////////to change the cursor index //////////////////
        //if (that.m_iWhizApi.m_Viewer.m_ApplicationMode == 3)
        //    that.m_iWhizApi.setCursor(14);
        //else
        //    that.m_iWhizApi.setCursor(1);
        //////////////////to change the cursor index //////////////////
        if (that.m_GripEntityType == EntityType.Leader) {
            that.setSnapStatus(false);
        }
    },
	this.clearSnapTimer = function () {
        var that = this;
        clearTimeout(that.m_SnapTimer);
        that.m_SnapTimer = null;
    },
    this.onMouseMove = function (clientX, clientY, button) {
        if (this.m_IsVisible) {
            if (button == 0) {
                if (!this.m_IsDragging) {                 
                    this.setCursorAfterGripCheck(clientX, clientY);
                }
            }
        }
        this.m_PrevMoveX = this.m_CurrentMoveX;
        this.m_PrevMoveY = this.m_CurrentMoveY;
		this.m_CurrentMoveX = clientX;
        this.m_CurrentMoveY = clientY;
		
        // if (this.m_ShowSnap) {
            // var that = this;
            // this.m_iWhizApi.getEntityWithClientPoint(LAYER, EntityType.Polyline, clientX, clientY, 12, function (retCode, selectedHandles) {
                // if (retCode == 0) {
                    // var dx = [0], dy = [0], dz = [0];
                    // dx[0] = clientX; dy[0] = clientY;
                    // that.m_iWhizApi.clientToDWG(dx, dy, dz);

                    // var snapHandle = selectedHandles.split(that.m_iWhizApi.m_Viewer.m_RowDelimiter)[0];

                    // that.m_iWhizApi.getNearestSnapPoint(snapHandle, dx[0], dy[0], function (retCode, XValue, YValue, IsNear) {
                        // if (retCode == 0) {
                            // that.m_SnapPoint = { x: XValue, y: YValue };
                            // that.m_SnapHandle = snapHandle;
                        // }
                    // });
                // }
                // else {
                    // that.m_SnapHandle = "";
                    // that.m_SnapPoint = { x: 0, y: 0 };
                // }
            // });
        // }
    },
	this.startSnapTimer = function () {
	    var that = this;
	    this.m_SnapTimer = setInterval(function () {	            
	        if ((that.m_CurrentMoveX) != 0 && (that.m_CurrentMoveY != 0)) {
	  
				if ((that.m_CurrentMoveX != that.m_PrevMoveX) && (that.m_CurrentMoveY != that.m_PrevMoveY)) {
					if (!that.m_IsSanpBusy) {
						if (that.m_ShowSnap) {
							
							that.m_IsSanpBusy = true;
							if (!that.m_IsDragging)
							{
							    that.m_iWhizApi.getEntityWithClientPoint(LAYER, EntityType.Polyline, that.m_CurrentMoveX, that.m_CurrentMoveY, 12, function (retCode, selectedHandles) {
							        if (retCode == 0) {
							            var dx = [0], dy = [0], dz = [0];
							            dx[0] = that.m_CurrentMoveX; dy[0] = that.m_CurrentMoveY;
							            that.m_iWhizApi.clientToDWG(dx, dy, dz);

							            var snapHandle = selectedHandles.split(that.m_iWhizApi.m_Viewer.m_RowDelimiter)[0];

							            that.m_iWhizApi.getNearestSnapPoint(snapHandle, dx[0], dy[0], function (retCode, XValue, YValue, IsNear) {
							                if (retCode == 0) {
							                    that.m_SnapPoint = { x: XValue, y: YValue };
							                    that.m_SnapHandle = snapHandle;
                                                that.m_IsSanpBusy = false;
							                }
							                //else
							                //{
							                //    that.m_SnapHandle = "";
							                //    that.m_SnapPoint = { x: 0, y: 0 };
							                //    that.m_IsSanpBusy = false;
							                //}
							            });
							        }
							        else {
							            that.m_SnapHandle = "";
							            that.m_SnapPoint = { x: 0, y: 0 };
							            that.m_IsSanpBusy = false;
							        }
							        
							    });
							}
							else
							{
                                var dx = [0], dy = [0], dz = [0];
							    dx[0] = that.m_CurrentMoveX; dy[0] = that.m_CurrentMoveY;
							    that.m_iWhizApi.clientToDWG(dx, dy, dz);

							    that.m_iWhizApi.getEntityAndSnapPoints(dx[0], dy[0], function (retCode, snapHandle, xValue, yValue, snapPoints) {
							        if (retCode == 0) {
							            that.m_SnapPoint = { x: xValue, y: yValue };
							            that.m_SnapHandle = snapHandle;
							            that.m_snapPointsArray = snapPoints.split(that.m_iWhizApi.m_Viewer.m_RowDelimiter);
							            that.m_IsSanpBusy = false;
							        }
							        else
							        {
							            that.m_SnapHandle = "";
							            that.m_SnapPoint = { x: 0, y: 0 };
							            that.m_IsSanpBusy = false;
							        }
							    });
							   
							}							
						}											
					  }
				    }
	            }
	        }, 50);
	    
	},
	this.startCloneTimer = function () {
	    var that = this;
	    if ((that.m_CurrentMoveX) != 0 && (that.m_CurrentMoveY != 0)) {
	        if (that.m_FirstClone)
	        {
	            that.cloneEntityHandler();
	            that.m_FirstClone = false;
	            that.startCloneTimer();
	        }
	        else
	        {
	            this.m_CloneTimer = setInterval(function () {
	                if (that.m_IsDragging) {
	                    if ((that.m_CurrentMoveX != that.m_PrevMoveX) && (that.m_CurrentMoveY != that.m_PrevMoveY)) {

	                        if (!that.m_IsBusy) {
	                            that.cloneEntityHandler();
	                            //var X = [0], Y = [0], Z = [0];
	                            //X[0] = that.m_CurrentMoveX;
	                            //Y[0] = that.m_CurrentMoveY;
	                            //Z[0] = 0;
	                            //that.m_iWhizApi.clientToDWG(X, Y, Z);

	                            //that.m_IsBusy = true;
	                            //that.m_iWhizApi.cloneEntityAtPoint(X[0], Y[0], that.m_CurrentGrip, function (retCode, PreviousHandle, CursorIndex) {

	                            //    that.m_IsBusy = false;
	                            //});
	                        }
	                    }
	                }
	            }, 50);
            }
	    }
	},
    this.cloneEntityHandler = function()
    {
        var that = this;
        var X = [0], Y = [0], Z = [0];
        X[0] = that.m_CurrentMoveX;
        Y[0] = that.m_CurrentMoveY;
        Z[0] = 0;
        that.m_iWhizApi.clientToDWG(X, Y, Z);

        that.m_IsBusy = true;
        that.m_iWhizApi.cloneEntityAtPoint(X[0], Y[0], that.m_CurrentGrip, function (retCode, PreviousHandle, CursorIndex) {

            that.m_IsBusy = false;
        });
    },
    this.setSnapStatus = function (status) {
        this.m_ShowSnap = status;
        this.m_SnapPoint = { x: 0, y: 0 };
        this.m_SnapHandle = "";
        if (!status) {
            this.m_SnapFrame = this.m_iWhizApi.m_WebApp.viewer.activeViewport.drawMetafile(this.m_SnapFrame, null);
           // this.m_iWhizApi.updateViewport(function () { });
			this.clearSnapTimer();
        }
		else
			this.startSnapTimer();
        return iWhizError.SUCCESS;
    },
	this.getCurrentGrip = function (clientX, clientY) {
	    var gripVal = -1;
	    for (var i = 0; i < this.m_pointsArray.length - 1 ; i++) {
	        var point = this.m_pointsArray[i].split(this.m_iWhizApi.m_Viewer.m_ColumnDelimiter);

	        var dX, dY;
	        dX = parseFloat(point[0]); dY = parseFloat(point[1]);

	        var x = [0], y = [0], z = [0];
	        x[0] = dX; y[0] = dY; z[0] = 0;

	        this.m_iWhizApi.dwgToClient(x, y, z);

	        var dDeltaX = Math.abs(clientX - x[0]);
	        var dDeltaY = Math.abs(clientY - y[0]);
	        var bOk = (dDeltaX <= this.m_GripSize) && (dDeltaY <= this.m_GripSize);
	        if (bOk) {
	            gripVal = i;
	        }
	    }
	    return gripVal;
	},
    this.getCursorOfRectangleWithIndex = function (index) {
        var cursorIndex = 1;
        if (index == 8)
            cursorIndex = 4;
        else if (index == 0 || index == 4)
            cursorIndex = 5;
        else if (index == 2 || index == 6)
            cursorIndex = 7;
        else if (index == 1 || index == 5)
            cursorIndex = 6;
        else if (index == 3 || index == 7)
            cursorIndex = 8;

        return cursorIndex;
    },
    this.setCursorAfterGripCheck = function (clientX, clientY)
    {
        this.m_CurrentGrip = this.getCurrentGrip(clientX, clientY);
        if (this.m_CurrentGrip != -1) {
            if (this.m_GripEntityType == EntityType.Polyline)
                this.m_iWhizApi.setCursor(this.getCursorOfRectangleWithIndex(this.m_CurrentGrip));
            else if (this.m_GripEntityType == EntityType.Leader)
                this.m_iWhizApi.setCursor(4);
            else if (this.m_GripEntityType == EntityType.Circle)
                this.m_iWhizApi.setCursor(4);
        }
        else {
            this.m_iWhizApi.setCursor(14);
        }
        this.m_iWhizApi.m_WebApp.update();
    }
};