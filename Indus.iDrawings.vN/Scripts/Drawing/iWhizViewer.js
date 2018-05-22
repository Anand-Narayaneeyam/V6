var iWhizBlink = function () {
    m_Color: 0
    m_Size: 1
    m_Handle: null
    m_Xpos: 0
    m_Ypos: 0
};
var iWhizHatch = function () {
    m_Handle: null
    m_Coords: 0
};
Viewer = function (objiWhizApi) {
    //m_iWhizApi.m_WebApp = objWebApp;
    /////////////////////From ODA /////////////////////////
    this.m_DomElement = null;
    this.STATE = { NONE: -1, PAN: 0, ZOOM: 1, ROTATE: 2, POINT_SELECTION: 3, RECT_SELECTION: 4, MARKUP_MODE: 5, GRIP_MODE: 6 };
    this.m_State = this.STATE.NONE;
    this.m_State_toggled = false; // via buttons if true
    this.m_PrevState = this.STATE.NONE;
    this.m_MouseCursor = 1;
    this.m_PrevCursor = 1;
    this.m_MidPanPrevCursor = 1;
    this.m_Mx;
    this.m_My;
    this.m_Timer = null;
    this.m_CurrKey;
    this.m_Enabled = true;
    //////////////////////////// /////////////////////////

    this.m_SelHandleArray = [];
    this.m_WaitMode = false;
    this.m_iWhizApi = objiWhizApi;
    this.m_DisplayFlag = false,
    this.m_UserExit = false;
    this.m_AreaRatio = 0,
    this.m_EventManager = null,
    this.m_OpenFlag = false,
    this.m_ExtfieldWidth = 0,
    this.m_ExtfieldHeight = 0,
    this.m_ApplicationMode = 0,
    this.m_RowDelimiter = ';',
    this.m_ColumnDelimiter = ',',

    this.m_BlinkCount = 0,
    //this.m_BlinkColor = { red: 0, green: 0, blue: 0 },
    this.m_BlinkSize = 1,
    this.m_ObjBlinkArray = [],
    this.m_IsBlinking = false,
    this.m_BlinkDelay = 0,
    this.m_BlinkTimer = null,
    this.m_LongTouchDelay = 1000,
    this.m_LongTouchTimer = null,
    this.m_DisplayTimer = null,
    this.m_MoveTimer = null,
    this.m_UpdateTimer = null,
    this.m_CurrentMoveX = 0,
    this.m_CurrentMoveY = 0,
    // this.m_PrevMoveX = 0,
    //  this.m_PrevMoveY = 0,

    this.m_RootNode = null,

    this.m_Rubberband = false,
    this.m_RubberbandPoint = null;
    this.m_MouseDown = { x: 0, y: 0 },
    this.m_DwgXmin = 0,
    this.m_DwgYmin = 0,
    this.m_DwgXmax = 0,
    this.m_DwgYmax = 0,
    this.m_Distance = 0,
    this.m_MeasuretoolTipFlag = 0,
    this.m_OrbitFlag = false;

    this.m_Height = 0;
    this.m_Width = 0;
    this.m_DWGFileName = "";
    this.m_ViewPos = null;
   // this.m_BlinkFrame = '',
    this.m_HatchFrame = '',
    this.m_LineFrame = '',
   // this.m_SelFrame = '',
    this.m_GridFrame = '',
    this.m_GridSize = 1;
    this.m_ShowSnap = false;
    this.m_TopOffset = 0,
    this.m_MouseMoveX = 0,
    this.m_MouseMoveY = 0,
    this.m_TooltipTimer = null,
    this.m_TooltipX = 0,
    this.m_TooltipY = 0,
    this.m_PriorityString = "1023",
    this.m_TooltipStatus = true,
    this.m_TooltipShow = true,
    this.m_clientptHandler = null,
    this.m_rectHandler = null,
    this.m_LButtonDown = false,
    this.m_MButtonDown = false,
    this.m_freeHandHandler = null,
    this.m_ArrMarkupPolyline = [],
    this.m_BlinkHandles = "",
    //this.m_BlinkHandleCount = 0,
    //this.m_BlinkCurrentIndex = 0,
    this.m_BlinkPoints = "",
    this.m_HatchCount = 0,
    this.m_ObjHatchArray = [],
    this.m_IsHatching = false,
    this.m_LineCount = 0,
    this.m_ObjLineArray = [],
    this.m_IsLineOn = false,

    this.m_HatchHandles = [],
    this.m_HatchHandleCount = 0,
    this.m_HatchCurrentIndex = 0,
    this.m_HatchPoints = [],
    this.m_LineHandles = [],
    this.m_LineHandleCount = 0,
    this.m_LineCurrentIndex = 0,
    this.m_LinePoints = [],
    this.mStartZoomDist = 0,
    this.mIsSingleTouch = false,
    this.mPanTolerance = 16.0,
    this.m_HatchMap = new Object();
    this.CallbackAfterDisplay = null;
    this.m_RectDom = null;
    this.m_bIsDisplayTimer = false;
    this.m_LineDom = null;
    this.m_svg = null;
    this.m_bIslongTouch = false;
    this.m_MouseClickTimer = null;
    this.m_PolyDom = null;
    this.m_TrailsDom = null;
    this.m_ArrTrailsPolyline = [];
    this.m_TrailsX = 0;
    this.m_TrailsY = 0;
    this.m_ZoomFlag = true;
    this.m_CurBkgColor = [0, 0, 0];

    this.EventManager = function () {
        var a = {
        };
        this.addEventListener = function (b, c) {
            "function" == typeof c && (a[b] || (a[b] = []), a[b].push(c))
        },
        this.removeEvent = function (b, c) {
            var d = a[b];
            if (d)
                for (var e in d) d[e] === c && d.splice(e, 1)
        },
        this.callEvent = function (b, c) {
            a[b] && a[b].forEach(function (a) {
                a.call(this, c)
            })
        }
    },

    /////////////////////From ODA /////////////////////////
    this.keyUp = function (event) {
        // if (event.target.tagName == "BODY")
        {
            if (!this.m_DisplayFlag)
                return;
            if (this.m_CurrKey === 27) {
                if (this.m_State == this.STATE.POINT_SELECTION || this.m_State == this.STATE.RECT_SELECTION)
                    this.m_UserExit = true;
            }

            this.m_CurrKey = null;

            clearInterval(this.m_Timer);
            this.m_Timer = null;

            this.m_EventManager.callEvent("keyUp", [this.m_CurrKey, event.ctrlKey, event.shiftKey]);
        }
    },
    this.keyDown = function (event) {
        //    event.preventDefault();
        //  if (event.target.tagName == "BODY")
        {
            if (!this.m_DisplayFlag)
                return;
            this.m_CurrKey = event.keyCode;

            if (this.m_CurrKey === 27) {
                //clear selection
            }
            else if (this.m_CurrKey === 27) //space key
            {
                this.hideTooltip();
            }
            else if (this.m_CurrKey === 46) {//delete key
                if (this.m_ApplicationMode == 3) {
                    if (this.m_State == this.STATE.GRIP_MODE) {
                        {
                            if (!this.m_iWhizApi.m_Grip.m_IsDragging) {
                                var Id = "";
                                var that = this;
                                if (this.m_iWhizApi.m_Grip.m_GripEntityType == EntityType.Polyline) {
                                    this.m_iWhizApi.m_Flow.getBoxId(this.m_iWhizApi.m_Grip.m_GripHandle, function (retCode, actionId) {
                                        if (retCode == 0 && actionId != "") {
                                            ////////////for undo-redo//////////
                                            //disable undo, disable redo
                                           // that.m_EventManager.callEvent("flowchartUndoRedoChange", [false, false]);
                                            ////////////for undo-redo//////////
                                            that.m_EventManager.callEvent("flowchartActionPointDeleteClick", [actionId]);
                                        }
                                    });
                                }
                                else if (this.m_iWhizApi.m_Grip.m_GripEntityType == EntityType.Leader) {
                                    this.m_iWhizApi.m_Flow.getConnectorId(this.m_iWhizApi.m_Grip.m_GripHandle, function (retCode, outcomeId) {
                                        if (retCode == 0 && outcomeId != "") {
                                            ////////////for undo-redo//////////
                                            //disable undo, disable redo
                                           // that.m_EventManager.callEvent("flowchartUndoRedoChange", [false, false]);
                                            ////////////for undo-redo//////////
                                            that.m_EventManager.callEvent("flowchartOutcomeDeleteClick", [outcomeId]);
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            }
            else if (this.m_CurrKey === 38) { //UP
                if (this.m_ApplicationMode == 3)
                {
                    this.m_iWhizApi.m_Flow.moveActionPoint(1, function (retCode) {
                    });
                }
            }
            else if (this.m_CurrKey === 40) { //DOWN
                if (this.m_ApplicationMode == 3)
                {
                    this.m_iWhizApi.m_Flow.moveActionPoint(2, function (retCode) {
                    });
                }
            }
            else if (this.m_CurrKey === 37) { //LEFT
                if (this.m_ApplicationMode == 3)
                {
                    this.m_iWhizApi.m_Flow.moveActionPoint(3, function (retCode) {
                    });
                }
            }
            else if (this.m_CurrKey === 39) //RIGHT
            {
                if (this.m_ApplicationMode == 3)
                {
                    this.m_iWhizApi.m_Flow.moveActionPoint(4, function (retCode) {
                    });
                }
            }
            if (!this.m_Timer)
                this.m_Timer = setInterval(this.onTimerEnd, 5);

            this.m_EventManager.callEvent("keyDown", [this.m_CurrKey, event.ctrlKey, event.shiftKey]);
        }
    },
    this.onTimerEnd = function () {
        switch (this.m_CurrKey) {
            case 37:
                this.m_Mx = 0; this.m_My = 0;
                this.move(-3, 0, 0); break;
            case 39:
                this.m_Mx = 0; this.m_My = 0;
                this.move(3, 0, 0); break;
            case 38:
                this.m_Mx = 0; this.m_My = 0;
                this.move(0, -3, 0); break;
            case 40:
                this.m_Mx = 0; this.m_My = 0;
                this.move(0, 3, 0); break;
        }
    },
    this.mousewheel = function (event) {
        if (this.m_ZoomFlag) {
            event.preventDefault();
            var canvasRect = this.m_DomElement.getBoundingClientRect();
            var clientX = event.clientX - canvasRect.left;
            var clientY = event.clientY - canvasRect.top;

            if (!this.m_Enabled)
                return;
            // FF compability
            if (!this.m_DisplayFlag)
                return;

            var delta = -event.deltaY || event.wheelDelta || - event.detail;
            // var delta = event.wheelDelta ? event.wheelDelta : -120 * event.detail;
            if (Math.abs(delta) != 0) {
                var factor = delta > 0 ? 1. / .9 : .9;

                var x = clientX;
                var y = clientY;

                this.m_iWhizApi.m_WebApp.zoom(factor, x, y);
            }
            if (this.m_LineDom) {
                var x = [0], y = [0], z = [0];
                x[0] = this.m_RubberbandPoint.x; y[0] = this.m_RubberbandPoint.y; z[0] = 0;
                this.dwgToClient(x, y, z);
                this.setLine(x[0], y[0], clientX, clientY);
            }
            if (this.m_iWhizApi.m_MovingTrails) {
                if (this.m_TrailsDom)
                    this.setTrails(clientX, clientY);
            }
        }
    },
    this.mousedblclick = function (event) {
        event.preventDefault();
        clearTimeout(this.m_MouseClickTimer);
        this.m_MouseClickTimer = null;
        var canvasRect = this.m_DomElement.getBoundingClientRect();
        var clientX = event.clientX - canvasRect.left;
        var clientY = event.clientY - canvasRect.top;

        if (!this.m_DisplayFlag)
            return;
        var id = this.m_iWhizApi.m_WebApp.pickViewportId(clientX, clientY);
        this.m_iWhizApi.m_WebApp.activeViewId = id;
        console.log(id);
        this.m_EventManager.callEvent("mouseDoubleClick", [clientX, clientY, event.button]);
        if (this.m_ApplicationMode == 3) {
            var X = [0], Y = [0], Z = [0];
            X[0] = clientX;
            Y[0] = clientY;
            this.clientToDWG(X, Y, Z);

            var that = this;
            if (that.m_State != that.STATE.GRIP_MODE) {
                ///double click event fires only if select mode is not enabled/////
                this.m_iWhizApi.m_Flow.selectTextOfShape(X[0], Y[0], function (returnCode, isBox, id) {
                    if (returnCode == 0) {
                        if (isBox)
                            that.m_EventManager.callEvent("flowchartActionPointDoubleClick", [id]);
                        else
                            that.m_EventManager.callEvent("flowchartConnectorDoubleClick", [id]);
                    }
                });
            }
        }
    },
    this.mouseclick = function (event) {
        event.preventDefault();
        clearTimeout(this.m_MouseClickTimer);
        this.m_MouseClickTimer = null;
        var canvasRect = this.m_DomElement.getBoundingClientRect();
        var clientX = event.clientX - canvasRect.left;
        var clientY = event.clientY - canvasRect.top;

        if (!this.m_DisplayFlag)
            return;
        var that = this;
        this.m_MouseClickTimer = setTimeout(function () {
            if (that.m_State == that.STATE.NONE || that.m_State == that.STATE.PAN)
                that.m_EventManager.callEvent("mouseClick", [clientX, clientY, event.button]);
        },300);
       
    },
    this.move = function (x, y, which) {
        var dX = (this.m_Mx - x);
        var dY = (this.m_My - y);

        switch (this.m_State) {
            case this.STATE.PAN:
                if (this.m_LButtonDown && which == 1) {
                    this.m_iWhizApi.m_WebApp.dolly(-dX, -dY);
                }
                break;
            case this.STATE.ROTATE:
                if (this.m_OrbitFlag && this.m_LButtonDown && which == 1)
                    this.m_iWhizApi.m_WebApp.orbit(dX * 0.01, dY * 0.01);
                break;
            case this.STATE.ZOOM:
                this.m_iWhizApi.m_WebApp.zoom(dY * 0.01, x, y);
                break;
        }

        this.m_Mx = x;
        this.m_My = y;
    },
    this.setRotate = function () {
        this.m_State = this.STATE.ROTATE;
    },
    this.setZoom = function () {
        this.m_State = this.STATE.ZOOM;
    },
    this.setNone = function () {
        this.m_State = this.STATE.NONE;
    },
    this.enable = function (state) {
        this.m_Enabled = state;
    },
    this.onMouseDown = function (event) {
        event.preventDefault();
        var canvasRect = this.m_DomElement.getBoundingClientRect();
        var clientX = event.clientX - canvasRect.left;
        var clientY = event.clientY - canvasRect.top;
        if (!this.m_Enabled)
            return;
        if (!this.m_DisplayFlag)
            return;
        this.m_Mx = clientX;
        this.m_My = clientY;
        if (!this.m__State_toggled) {
            switch (event.button) {
                case 1: //middle button
                    this.m_MButtonDown = true;
                    this.hideTooltip();
                    this.m_MidPanPrevCursor = this.m_MouseCursor;
                    this.setCursor(11, false);
                    break;
                case 2:  //right button
                    this.hideTooltip();
                    if (this.m_ApplicationMode == 3 && this.m_iWhizApi.m_Grip.m_IsDragging == false)    //for flowchart
                    {
                        if (this.m_State == this.STATE.GRIP_MODE && event.button == 2) {
                            this.m_State = this.STATE.NONE;
                            this.m_iWhizApi.m_Grip.hideGrips();
                            ////////////for undo-redo//////////
                            //this.m_iWhizApi.disableUndoRecording(function () { });
                            //this.m_EventManager.callEvent("flowchartUndoRedoChange", [false, false]);
                            //disable undo, disable redo buttons
                            ////////////for undo-redo//////////
                        }
                        else if (this.m_State == this.STATE.PAN) {
                            this.pan();
                        }
                        this.setCursor(1, false);
                    }
                    break;
                case 0:  //left button
                    this.m_LButtonDown = true;
                    this.hideTooltip();

                    this.m_CurrentMoveX = clientX;
                    this.m_CurrentMoveY = clientY;

                    if (this.m_State == this.STATE.PAN) {
                        this.setCursor(11, false);
                    }

                    var that = this;
                    this.m_iWhizApi.getLinkHandleWithClientPoint(clientX, clientY, function (retCode, entityHandle) {
                        if(retCode == 0)
                        {
                            that.m_EventManager.callEvent("linkClick", entityHandle, clientX, clientY);
                        }
                    });

                    if (this.m_State != this.STATE.PAN && this.m_State != this.STATE.ROTATE && this.m_State != this.STATE.ZOOM) {
                        if (this.m_State != this.STATE.POINT_SELECTION) {
                        }
                        this.m_iWhizApi.m_WebApp.startSelection(clientX, clientY);
                        if (this.m_OpenFlag) {
                            var X = [0], Y = [0], Z = [0];
                            this.m_MouseDown.x = clientX;
                            this.m_MouseDown.y = clientY;
                            X[0] = this.m_MouseDown.x;
                            Y[0] = this.m_MouseDown.y;
                            this.clientToDWG(X, Y, Z)
                            this.m_DwgXmin = X[0];
                            this.m_DwgYmin = Y[0];
                            if (this.m_Rubberband) {
                                $("#rubberTip").hide();
                            }
                            if (this.m_State == this.STATE.RECT_SELECTION && this.m_MeasuretoolTipFlag == 1) {

                                $("#rubberTip").show();
                            }

                            if (this.m_State == this.STATE.MARKUP_MODE) {
                                this.m_ArrMarkupPolyline.push({ x: this.m_MouseDown.x, y: this.m_MouseDown.y });
                            }

                            if (!this.m_WaitMode) {
                                // if (event.buttons == 2) {
                                //     cos = new Custom();
                                //     cos.contextMenuShow(a, canvasRect, this.m_EventManager);
                                //  }
                            }
                        }
                    }

                    break;
            }
        }

        if (this.m_iWhizApi.m_Grip)
            this.m_iWhizApi.m_Grip.onMouseDown(clientX, clientY, event.button);

        if (this.m_State == this.STATE.NONE || this.m_State == this.STATE.PAN)
            this.m_EventManager.callEvent("mouseDown", [clientX, clientY, event.button]);
    },

    //////////////tooltip functions////////////////////////////
    this.initiateTooltip = function (clientX, clientY) {

        if (this.m_MouseMoveX != clientX || this.m_MouseMoveY != clientY) {
            this.hideTooltip();
        }

        if (this.STATE.NONE == this.m_State || this.STATE.PAN == this.m_State || this.STATE.POINT_SELECTION == this.m_State) // should check remaining conditions in iwhiz
        {
            // var canvasRect = this.m_DomElement.getBoundingClientRect();
            var canvasLeft = this.m_DomElement.clientLeft;
            var canvasTop = this.m_DomElement.clientTop;
            var canvasRight = this.m_DomElement.clientWidth;
            var canvasBottom = this.m_DomElement.clientHeight;

            if ((((canvasTop >= clientY) || (clientY >= canvasBottom)) || ((canvasRight <= clientX) || (clientX <= canvasLeft)))) {
                this.hideTooltip();
            }
            else {
                if (this.m_MouseMoveX != clientX || this.m_MouseMoveY != clientY) {

                    if (this.m_TooltipTimer) {
                        clearTimeout(this.m_TooltipTimer);
                        this.m_TooltipTimer = null;
                    }

                    this.m_MouseMoveX = clientX;
                    this.m_MouseMoveY = clientY;
                    this.m_TooltipX = clientX;
                    this.m_TooltipY = clientY;

                    if (this.m_TooltipShow) {
                        {
                            this.hideTooltip();
                            this.m_TooltipStatus = true;
                            var that = this;
                            this.m_TooltipTimer = setTimeout(function () {
                                if (that.STATE.NONE == that.m_State || that.STATE.PAN == that.m_State || that.STATE.POINT_SELECTION == that.m_State)
                                    that.handleTooltip();
                            }, 500);
                        }
                    }
                }
            }
        }
    },

    this.handleTooltip = function () {
        console.log("handle tooltip");
        if (this.m_TooltipStatus == false)
            return;
        else
            this.m_TooltipStatus = false;

        var that = this;
        this.m_iWhizApi.getHandleForTooltip(this.m_TooltipX, this.m_TooltipY, this.m_PriorityString, function (returnCode, selectedHandle, handleType, id, isActionPoint) {
            if (selectedHandle != "") {
                that.m_iWhizApi.highlightAndDehighligtEntity(selectedHandle, 30, true, 250, function (returnCode) {
                    if (returnCode == 0) {
                        setTimeout(function () {
                            {
                                that.m_iWhizApi.highlightAndDehighligtEntity(selectedHandle, 0, false, 250, function (returnCode) {
                                    
                                });
                            }
                        }, 2000);
                    }
                });
                that.m_EventManager.callEvent("tooltipHandler", [selectedHandle, that.m_TooltipX, that.m_TooltipY, id, isActionPoint]);
            }
        });
    },

    this.enableTooltip = function (isEnable) {
        this.m_TooltipShow = isEnable;
        this.m_TooltipStatus = isEnable;
    },

    this.hideTooltip = function () {
        this.m_TooltipStatus = false;
        $("#toolTipId").hide();
        if (this.m_TooltipTimer) {
            clearTimeout(this.m_TooltipTimer);
            this.m_TooltipTimer = null;
        }
    },
    this.showTooltip = function (tooltipText) {

        $("#toolTipId").show();
        $('#toolTipId').css({
            "margin-left": this.m_TooltipX,
            "margin-top": this.m_TooltipY,
            "margin-right": 0,
            "margin-bottom": 0,
        });

        $("#toolTipId p").empty();
        $("#toolTipId p").append(tooltipText);

        $('#toolTipId').css({
            "top": $('#toolTipId').height() + 10,
            "right": "auto",
            "bottom": "auto",
        });

        var viewrect = this.m_DomElement.getBoundingClientRect();
        if ((this.m_TooltipX + $('#toolTipId').width() + 10) >= viewrect.right) {
            $('#toolTipId').css({
                "top": 0,
                "right": (viewrect.right - this.m_TooltipX) + 10,
                "margin-left": 0,
            });
        }
        if ((this.m_TooltipY + $('#toolTipId').height() + 10) >= viewrect.height) {
            $('#toolTipId').css({
                "bottom": (viewrect.height - this.m_TooltipY) + 10,
                "top": "auto",
            });
        }
    },
    this.setTooltipPriority = function (priority) {
        if (this.m_ApplicationMode == 3) {
            if (2 != priority.length)
                return iWhizError.PRIORITY_STRING_NOT_CORRECT;
        }
        else {
            if (4 != priority.length)
                return iWhizError.PRIORITY_STRING_NOT_CORRECT;
        }

        this.m_PriorityString = priority;
        return iWhizError.SUCCESS;
    },
    this.setRectStyle = function (dom, top, left, right, bottom, isCrs) {
        dom.style.top = top;
        dom.style.left = left;
        dom.style.bottom = bottom;
        dom.style.right = right;
        dom.style.zIndex = 99999;
        if (this.m_CurBkgColor[0] == 255 && this.m_CurBkgColor[1] == 255 && this.m_CurBkgColor[2] == 255) {
            dom.style.border = "2px solid rgba(0, 0, 0, 1)";
            dom.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        }
        else {
            dom.style.border = "2px solid rgba(255, 255, 255, 1)";
            dom.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        }       
    },
    //////////////tooltip functions////////////////////////////
    this.setRect = function (dom, x, y, w, h) {
        if (w > -10 && h > -10 && w < 10 &&
            h < 10 && w != 0 && h != 0)
            return;

        if (w < 0 && h < 0) {
            w = -w; h = -h;
            this.setRectStyle(dom, "", "", (window.innerWidth - x - 2) + "px", (window.innerHeight - y - 2) + "px", true);
        } else if (w > 0 && h < 0) {
            h = -h;
            this.setRectStyle(dom, "", x + "px", "", (window.innerHeight - y) + "px", false);
        } else if (w < 0 && h > 0) {
            w = -w;
            this.setRectStyle(dom, y + "px", "", (window.innerWidth - x) + "px", "", true);
        } else {
            this.setRectStyle(dom, y + "px", x + "px", "", "", false);
        }
        dom.style.width = w + "px";
        dom.style.height = h + "px";
    },
     this.setLine = function (x1, y1, x2, y2) {
         if (this.m_Rubberband) {
             x1 = this.m_DomElement.offsetLeft + x1;
             x2 = this.m_DomElement.offsetLeft + x2;
             y1 = this.m_DomElement.offsetTop + y1;
             y2 = this.m_DomElement.offsetTop + y2;

             if (this.m_svg && this.m_LineDom) {
                 var width = Math.abs(x2 - x1);
                 var height = Math.abs(y2 - y1);

                 this.m_svg.setAttribute('width', width);
                 this.m_svg.setAttribute('height', height);

                 var xpos = 'left:' + x1 + 'px;';
                 var ypos = 'top:' + y1 + 'px;'
                 var startX = 0;
                 var startY = 0;
                 var endX = width;
                 var endY = height;

                 if (x2 - x1 < 0) {
                     xpos = 'left:' + x2 + 'px;';
                     startX = width;
                     endX = 0;
                 }
                 if (y2 - y1 < 0) {
                     ypos = 'top:' + y2 + 'px;';
                     startY = height;
                     endY = 0;
                 }
                 
                 this.m_svg.setAttribute('style', 'cursor:default;pointer-events:none;position:absolute;' + xpos + ypos);//backgroundColor:"rgba(255, 255, 255, 0.1);
                 this.m_LineDom.setAttributeNS(null, "x1",  startX);
                 this.m_LineDom.setAttributeNS(null, "y1", startY);
                 this.m_LineDom.setAttributeNS(null, "x2", endX);
                 this.m_LineDom.setAttributeNS(null, "y2", endY);
                 if (this.m_CurBkgColor[0] == 255 && this.m_CurBkgColor[1] == 255 && this.m_CurBkgColor[2] == 255)
                     this.m_LineDom.setAttributeNS(null, "stroke", "rgb(0,0,0)");
                 else
                     this.m_LineDom.setAttributeNS(null, "stroke", "rgb(255,255,255)");
                 this.m_LineDom.setAttributeNS(null, "stroke-width", "2");
             }
         }
     },
    this.setPolyLine = function () {
        var points = "";
        for (var i = 0; i < this.m_ArrMarkupPolyline.length; i++) {
            var x = this.m_ArrMarkupPolyline[i].x;
            var y = this.m_ArrMarkupPolyline[i].y;
            points += x + ",";
            points += y + " ";
        }

        if (this.m_svg && this.m_PolyDom) {
            var width = this.m_DomElement.width;
            var height = this.m_DomElement.height;
            this.m_svg.setAttribute('width', width);
            this.m_svg.setAttribute('height', height);

            var xpos = 'left:' + this.m_DomElement.offsetLeft + 'px;';
            var ypos = 'top:' + this.m_DomElement.offsetTop + 'px;'

            this.m_svg.setAttribute('style', 'cursor:default;pointer-events:none;position:absolute;' + xpos + ypos);// background:rgba(0,0,255,0.3);
            this.m_PolyDom.setAttributeNS(null, "points", points);
            if (this.m_CurBkgColor[0] == 255 && this.m_CurBkgColor[1] == 255 && this.m_CurBkgColor[2] == 255)
                this.m_PolyDom.setAttributeNS(null, "stroke", "rgb(0,0,0)");
            else
                this.m_PolyDom.setAttributeNS(null, "stroke", "rgb(255,255,255)");

            this.m_PolyDom.setAttributeNS(null, "stroke-width", "2");
            this.m_PolyDom.setAttributeNS(null, "fill", "none");
        }
    },
    this.setBlink = function (objNode, points, r, g, b) {

        if (this.m_svg) {
            var width = this.m_DomElement.width;
            var height = this.m_DomElement.height;
            this.m_svg.setAttribute('width', width);
            this.m_svg.setAttribute('height', height);

            var xpos = 'left:' + this.m_DomElement.offsetLeft + 'px;';
            var ypos = 'top:' + this.m_DomElement.offsetTop + 'px;'

            this.m_svg.setAttribute('style', 'cursor:default;pointer-events:none;position:absolute;' + xpos + ypos);// background:rgba(0,0,255,0.3);
            objNode.setAttributeNS(null, "points", points);
            objNode.setAttributeNS(null, "stroke", "rgb(" + r + "," + g + "," + b + ")");
            objNode.setAttributeNS(null, "stroke-width", "2");
            objNode.setAttributeNS(null, "fill", "rgb(" + r + "," + g + "," + b + ")");
        }
    },

    this.setTrails = function (curX, curY) {
        var X = [0], Y = [0], Z = [0];
        X[0] = this.m_TrailsX;
        Y[0] = this.m_TrailsY;
        this.dwgToClient(X, Y, Z);

        var tempX = curX - X[0];
        var tempY = curY - Y[0];
        var points = "";
        for (var i = 0; i < this.m_ArrTrailsPolyline.length; i++) {
            X[0] = this.m_ArrTrailsPolyline[i].x;
            Y[0] = this.m_ArrTrailsPolyline[i].y;
            this.dwgToClient(X, Y, Z);

            var x = tempX + X[0];
            var y = tempY + Y[0];
            points += x + ",";
            points += y + " ";
        }


        if (this.m_svg && this.m_TrailsDom) {
            var width = this.m_DomElement.width;
            var height = this.m_DomElement.height;
            this.m_svg.setAttribute('width', width);
            this.m_svg.setAttribute('height', height);

            var xpos = 'left:' + this.m_DomElement.offsetLeft + 'px;';
            var ypos = 'top:' + this.m_DomElement.offsetTop + 'px;'

            this.m_svg.setAttribute('style', 'cursor:default;pointer-events:none;position:absolute;' + xpos + ypos);// background:rgba(0,0,255,0.3);
            this.m_TrailsDom.setAttributeNS(null, "points", points);
            this.m_TrailsDom.setAttributeNS(null, "stroke", "rgb(255,255,255)");
            if (this.m_CurBkgColor[0] == 255 && this.m_CurBkgColor[1] == 255 && this.m_CurBkgColor[2] == 255)
                this.m_TrailsDom.setAttributeNS(null, "stroke", "rgb(0,0,0)");
            else
                this.m_TrailsDom.setAttributeNS(null, "stroke", "rgb(255,255,255)");
            this.m_TrailsDom.setAttributeNS(null, "fill", "none");
        }
    },
    this.onMouseMove = function (event) {
        event.preventDefault();
        var canvasRect = this.m_DomElement.getBoundingClientRect();
        var clientX = event.clientX - canvasRect.left;
        var clientY = event.clientY - canvasRect.top;
        if (!this.m_Enabled)
            return;
        if (!this.m_DisplayFlag)
            return;

        if (this.m_OpenFlag && this.m_DisplayFlag) {

            ////////////////for tooltip////////////////////////
            this.initiateTooltip(clientX, clientY);
            ////////////////for tooltip////////////////////////

            ////////////////for middle button pan(to avoid mouse mode and cursor reset issues)/////////////
            var dX = (this.m_Mx - clientX);
            var dY = (this.m_My - clientY);

            if (this.m_MButtonDown) {
                if (event.buttons == 4) {
                    this.m_iWhizApi.m_WebApp.dolly(-dX, -dY);
                    if (this.m_LineDom) {
                        var x = [0], y = [0], z = [0];
                        x[0] = this.m_RubberbandPoint.x; y[0] = this.m_RubberbandPoint.y; z[0] = 0;
                        this.dwgToClient(x, y, z);
                        this.setLine(x[0], y[0], clientX, clientY);
                    }
                }
                else {
                    this.m_MButtonDown = false;
                    this.setCursor(this.m_MidPanPrevCursor, false);
                }
            }
            ////////////////for middle button pan/////////////

            this.move.call(this, clientX, clientY, event.buttons);

            if (this.m_Rubberband && this.m_MButtonDown != true) {
                var X = [0], Y = [0], Z = [0], distance = [0];

                var currentX = clientX;
                var currentY = clientY;
                ////////////////////////////////////////////////////////////////////////////////
                var that = this;
                var viewport = this.m_iWhizApi.m_WebApp.viewer.activeViewport;
                //this.m_SelFrame = viewport.drawMetafile(this.m_SelFrame, function (draw) {
                //    draw.pushTransform(viewport.screenToWorld());
                //    draw.setColor([255, 255, 255]);
                //    var x = [0], y = [0], z = [0];
                //    x[0] = that.m_RubberbandPoint.x; y[0] = that.m_RubberbandPoint.y; z[0] = 0;
                //    that.dwgToClient(x, y, z);
                //    draw.polyline([x[0], y[0], 0, currentX, currentY, 0]);
                //    draw.popTransform();
                //});
                //this.m_iWhizApi.updateViewport(function () { });
                var x = [0], y = [0], z = [0];
                x[0] = that.m_RubberbandPoint.x; y[0] = that.m_RubberbandPoint.y; z[0] = 0;
                that.dwgToClient(x, y, z);

                var svgNs = document.getElementById("svgrubberband");
                if (!svgNs) {
                    var svgNs = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
                    svgNs.id = "svgrubberband";
                    this.m_svg = svgNs;
                    this.m_DomElement.parentElement.appendChild(svgNs);
                }
                var line = document.getElementById("linerubberband");
                if (!line)
                {
                    line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
                    line.setAttributeNS(null, "id", "linerubberband");
                    line.setAttributeNS(null, "stroke", "rgb(255,0,0)");
                    line.setAttributeNS(null, "stroke-width", "2");
                    svgNs.appendChild(line);
                    this.m_LineDom = line;
                }
                this.setLine(x[0], y[0], currentX, currentY);

                ////////////////////////////////////////////////////////////////////////////////
                if (this.m_MeasuretoolTipFlag) {
                    X[0] = clientX;
                    Y[0] = clientY;
                    this.clientToDWG(X, Y, Z);
                    this.m_DwgXmax = X[0];
                    this.m_DwgYmax = Y[0];
                    $("#rubberTip p").empty();
                    Tools.measureDistance(0, this.m_DwgXmin, this.m_DwgYmin, this.m_DwgXmax, this.m_DwgYmax, distance);
                    this.m_Distance = distance[0].toFixed(4);

                    $("#rubberTip").show();
                    $('#rubberTip').css({
                        "margin-left": clientX,
                        "margin-top": clientY
                    });

                    $("#rubberTip p").append(this.m_Distance);
                }
            }
            if (this.m_iWhizApi.m_MovingTrails) {
                this.m_CurrentMoveX = clientX;
                this.m_CurrentMoveY = clientY;
                var svgNs = document.getElementById("svgrubberband");
                if (!svgNs) {
                    var svgNs = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
                    svgNs.id = "svgrubberband";
                    this.m_svg = svgNs;
                    this.m_DomElement.parentElement.appendChild(svgNs);
                }
                var trails = document.getElementById("trailsrubberband");
                if (!trails) {
                    trails = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
                    trails.setAttributeNS(null, "id", "trailsrubberband");
                    trails.setAttributeNS(null, "stroke", "rgb(255,0,0)");
                    trails.setAttributeNS(null, "stroke-width", "2");
                    svgNs.appendChild(trails);
                    this.m_TrailsDom = trails;
                }
                this.setTrails(this.m_CurrentMoveX, this.m_CurrentMoveY);
                //var X =[0], Y =[0], Z =[0];
                //X[0]= clientX;
                //Y[0] = clientY;
                //Z[0] = 0;
                //this.clientToDWG(X, Y, Z);
                //this.m_iWhizApi.moveWithMovingTrails(X[0], Y[0], function () {
                //});
                //this.m_iWhizApi.updateViewport(function () {
                //});
            }
            if (this.m_State == this.STATE.RECT_SELECTION && this.m_MButtonDown != true) {
                if (this.m_iWhizApi.m_WebApp.m_StartPoint) {
                    var X = [0], Y = [0], Z = [0], distance = [0];
                    X[0] = clientX;
                    Y[0] = clientY;
                    ////////////////////////////////////////////////////////////////////////////////
                    var that = this;
                    var viewport = this.m_iWhizApi.m_WebApp.viewer.activeViewport;
                    //if (this.m_SelFrame)
                    //    this.m_SelFrame = this.m_iWhizApi.m_WebApp.viewer.activeViewport.drawMetafile(this.m_SelFrame, null);
                    //this.m_SelFrame = viewport.drawMetafile(this.m_SelFrame, function (draw) {
                    //    draw.pushTransform(viewport.screenToWorld());
                    //    draw.setColor([255, 255, 255]);
                    //    draw.polyline([that.m_iWhizApi.m_WebApp.m_StartPoint[0], that.m_iWhizApi.m_WebApp.m_StartPoint[1], 0, X[0], that.m_iWhizApi.m_WebApp.m_StartPoint[1], 0, X[0], Y[0], 0, that.m_iWhizApi.m_WebApp.m_StartPoint[0], Y[0], 0, that.m_iWhizApi.m_WebApp.m_StartPoint[0], that.m_iWhizApi.m_WebApp.m_StartPoint[1], 0]);
                    //    draw.popTransform();
                    //});
                    //this.m_iWhizApi.updateViewport(function () { });

                    var dom = document.getElementById("rectrubberband");
                    if (!dom) {
                        dom = document.createElement("div");
                        this.m_RectDom = dom;
                        dom.id = "rectrubberband";
                        document.body.appendChild(dom);
                        dom.style.position = "absolute";
                        dom.style.cursor = "default";
                        dom.style.pointerEvents = 'none';
                        dom.style.right = "px";
                        dom.style.bottom = "px";
                    }
                    this.setRect(dom, this.m_iWhizApi.m_WebApp.m_StartPoint[0] + canvasRect.left, this.m_iWhizApi.m_WebApp.m_StartPoint[1] + canvasRect.top, (event.clientX) - (this.m_iWhizApi.m_WebApp.m_StartPoint[0] + canvasRect.left), (event.clientY) - (this.m_iWhizApi.m_WebApp.m_StartPoint[1] + canvasRect.top));

                    ////////////////////////////////////////////////////////////////////////////////
                    if (this.m_MeasuretoolTipFlag) {
                        this.clientToDWG(X, Y, Z);
                        this.m_DwgXmax = X[0];
                        this.m_DwgYmax = Y[0];
                        $("#rubberTip p").empty();
                        Tools.measureDistance(2, this.m_DwgXmin, this.m_DwgYmin, this.m_DwgXmax, this.m_DwgYmax, distance);
                        this.m_Height = distance[0].toFixed(4);
                        Tools.measureDistance(1, this.m_DwgXmin, this.m_DwgYmin, this.m_DwgXmax, this.m_DwgYmax, distance);
                        this.m_Width = distance[0].toFixed(4);

                        $('#rubberTip').css({
                            "margin-left": clientX,
                            "margin-top": clientY
                        });

                        $("#rubberTip p").append("Height : " + this.m_Height + ",");
                        $("#rubberTip p").append("Width : " + this.m_Width + "");
                    }
                }
            }

            //if (this.m_State == this.STATE.MARKUP_MODE && this.m_MButtonDown != true) {
            //    if (event.buttons == 1) {
            //        var X = [0], Y = [0], Z = [0];
            //        X[0] = clientX;
            //        Y[0] = clientY;
            //        this.m_ArrMarkupPolyline.push({ x: X[0], y: Y[0] });
            //        var viewport = this.m_iWhizApi.m_WebApp.viewer.activeViewport;
            //        var that = this;
            //        this.m_SelFrame = viewport.drawMetafile(this.m_SelFrame, function (draw) {
            //            var points = [];
            //            for (var i = 0, j = 0; i < that.m_ArrMarkupPolyline.length; i++) {
            //                points[j++] = that.m_ArrMarkupPolyline[i].x;
            //                points[j++] = that.m_ArrMarkupPolyline[i].y;
            //                points[j++] = 0;
            //            }
            //            draw.pushTransform(viewport.screenToWorld());
            //            draw.setColor([255, 255, 255]);
            //            draw.polyline(points);
            //            draw.popTransform();
            //        });
            //        //m_iWhizApi.m_WebApp.update();
            //        this.m_iWhizApi.updateViewport(function () { });
            //        this.m_iWhizApi.m_WebApp.startSelection(this.m_Mx, this.m_My);
            //    }
            //}

             if (this.m_State == this.STATE.MARKUP_MODE && this.m_MButtonDown != true) {
                if (event.buttons == 1) {
                    var X = [0], Y = [0], Z = [0];
                    X[0] = clientX;
                    Y[0] = clientY;
                    this.m_ArrMarkupPolyline.push({ x: X[0], y: Y[0] });
                    var viewport = this.m_iWhizApi.m_WebApp.viewer.activeViewport;
                    var that = this;
                    var svgNs = document.getElementById("svgrubberband");
                    if (!svgNs) {
                        var svgNs = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
                        svgNs.id = "svgrubberband";
                        this.m_svg = svgNs;
                        this.m_DomElement.parentElement.appendChild(svgNs);
                    }
                    var polyline = document.getElementById("polylinerubberband");
                    if (!polyline) {
                        polyline = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
                        polyline.setAttributeNS(null, "id", "polylinerubberband");
                        polyline.setAttributeNS(null, "stroke", "rgb(255,0,0)");
                        polyline.setAttributeNS(null, "stroke-width", "2");
                        svgNs.appendChild(polyline);
                        this.m_PolyDom = polyline;
                    }
                    this.setPolyLine();
                    this.m_iWhizApi.m_WebApp.startSelection(this.m_Mx, this.m_My);
                }
            }
        }
        if (this.m_State == this.STATE.NONE)
            this.m_EventManager.callEvent("mouseMove", [clientX, clientY]);
        if (this.m_iWhizApi.m_Grip)
            this.m_iWhizApi.m_Grip.onMouseMove(clientX, clientY, event.button);
    },
    this.getEvent = function (e) {
        if (e.touches && e.touches.length) {
            return e.touches[0];
        } else if (e.changedTouches && e.changedTouches.length) {
            return e.changedTouches[0];
        }
        return e;
    },

    this.onTouchStart = function (event) {
        if (event.touches.length === 1)
            this.mIsSingleTouch = true;
        else
        {
             if (this.m_LongTouchTimer != null) {
                 clearTimeout(this.m_LongTouchTimer);
                 this.m_LongTouchTimer = null;
             }
        }

        event = this.getEvent(event);

        var canvasRect = this.m_DomElement.getBoundingClientRect();
        var clientX = event.pageX - canvasRect.left;
        var clientY = event.pageY - canvasRect.top;

        this.mStartZoomDist = 0;

        this.m_TouchStartX = clientX;
        this.m_TouchStartY = clientY;

        if (!this.m_Enabled)
            return;
        if (!this.m_DisplayFlag)
            return;
        this.m_Mx = clientX;
        this.m_My = clientY;
        if (!this.m__State_toggled) {

            this.m_LButtonDown = true;
            if (this.m_State == this.STATE.NONE && this.mIsSingleTouch) {
                this.startLongTouchTimer();
            }
            if (this.m_State != this.STATE.PAN && this.m_State != this.STATE.ROTATE && this.m_State != this.STATE.ZOOM) {
                //if (this.m_State != this.STATE.POINT_SELECTION) {
                //    ////////////////for tooltip////////////////////////
                //    if (bIsSingleTouch)
                //        this.initiateTooltip(clientX, clientY);
                //    ////////////////for tooltip////////////////////////
                //}
                this.m_iWhizApi.m_WebApp.startSelection(clientX, clientY);
                if (this.m_OpenFlag) {
                    var X = [0], Y = [0], Z = [0];
                    this.m_MouseDown.x = clientX;
                    this.m_MouseDown.y = clientY;
                    X[0] = this.m_MouseDown.x;
                    Y[0] = this.m_MouseDown.y;
                    this.clientToDWG(X, Y, Z)
                    this.m_DwgXmin = X[0];
                    this.m_DwgYmin = Y[0];
                    if (this.m_Rubberband) {
                        $("#rubberTip").hide();
                    }
                    if (this.m_State == this.STATE.RECT_SELECTION && this.m_MeasuretoolTipFlag == 1) {

                        $("#rubberTip").show();
                    }
                    if (this.m_State == this.STATE.MARKUP_MODE) {
                        this.m_ArrMarkupPolyline.push({ x: this.m_MouseDown.x, y: this.m_MouseDown.y });
                    }
                }
            }
        }
        if (this.m_State == this.STATE.NONE || this.m_State == this.STATE.PAN)
            this.m_EventManager.callEvent("touchDown", [clientX, clientY]);
    },
     this.onTouchMove = function (event) {
         var eventZoom = event;
         event.preventDefault();
         event = this.getEvent(event);
         var canvasRect = this.m_DomElement.getBoundingClientRect();
         var clientX = event.pageX - canvasRect.left;
         var clientY = event.pageY - canvasRect.top;

         if (!this.m_Enabled)
             return;
         if (!this.m_DisplayFlag)
             return;

         if (this.m_OpenFlag && this.m_DisplayFlag) {
             if (this.m_LongTouchTimer != null) {
                 clearTimeout(this.m_LongTouchTimer);
                 this.m_LongTouchTimer = null;
             }
             ////for pinch zoom//////
             if (eventZoom.touches.length === 2) {
                 var midX = (eventZoom.touches[0].pageX + eventZoom.touches[1].pageX) / 2;
                 var midY = (eventZoom.touches[0].pageY + eventZoom.touches[1].pageY) / 2;

                 console.log("x0: " + eventZoom.touches[0].pageX + " , y0: " + eventZoom.touches[0].pageY + " , x1: " + eventZoom.touches[1].pageX + " , y1: " + eventZoom.touches[1].pageY + " , midX: " + midX + " , midY: " + midY + " , mStartZoomDist: " + this.mStartZoomDist);

                 var CurrentZoomDist = Math.sqrt((eventZoom.touches[1].pageX - eventZoom.touches[0].pageX) * (eventZoom.touches[1].pageX - eventZoom.touches[0].pageX) + (eventZoom.touches[1].pageY - eventZoom.touches[0].pageY) * (eventZoom.touches[1].pageY - eventZoom.touches[0].pageY));
                 var zoom = 1;
                 if (this.mStartZoomDist != 0 && CurrentZoomDist != 0)
                     zoom = CurrentZoomDist / this.mStartZoomDist;

                 if (0.998 > zoom || zoom > 1.002) {
                     this.m_iWhizApi.m_WebApp.zoom(zoom, midX, midY);
                 }

                 this.mStartZoomDist = CurrentZoomDist;
             } ////for pinch zoom//////
             else if (eventZoom.touches.length === 1) {
                 if (this.m_State != this.STATE.POINT_SELECTION && this.m_State != this.STATE.RECT_SELECTION && this.m_State != this.STATE.MARKUP_MODE) {
                     var dXVal = (this.m_Mx - clientX);
                     var dYVal = (this.m_My - clientY);
                     this.m_iWhizApi.m_WebApp.dolly(-dXVal, -dYVal);
                 }
             }

             ////////////////for tooltip////////////////////////
             //this.initiateTooltip(clientX, clientY);
             ////////////////for tooltip////////////////////////

             ////////////////for middle button pan(to avoid mouse mode and cursor reset issues)/////////////
             var dX = (this.m_Mx - clientX);
             var dY = (this.m_My - clientY);

             this.move.call(this, clientX, clientY, event.buttons);

             if (this.m_State == this.STATE.RECT_SELECTION && this.m_MButtonDown != true) {
                 if (this.m_iWhizApi.m_WebApp.m_StartPoint) {
                     var X = [0], Y = [0], Z = [0], distance = [0];
                     X[0] = clientX;
                     Y[0] = clientY;
                     ////////////////////////////////////////////////////////////////////////////////
                     var that = this;
                     var viewport = this.m_iWhizApi.m_WebApp.viewer.activeViewport;
                     //this.m_SelFrame = viewport.drawMetafile(this.m_SelFrame, function (draw) {
                     //    draw.pushTransform(viewport.screenToWorld());
                     //    draw.setColor([255, 255, 255]);
                     //    draw.polyline([that.m_iWhizApi.m_WebApp.m_StartPoint[0], that.m_iWhizApi.m_WebApp.m_StartPoint[1], 0, X[0], that.m_iWhizApi.m_WebApp.m_StartPoint[1], 0, X[0], Y[0], 0, that.m_iWhizApi.m_WebApp.m_StartPoint[0], Y[0], 0, that.m_iWhizApi.m_WebApp.m_StartPoint[0], that.m_iWhizApi.m_WebApp.m_StartPoint[1], 0]);
                     //    draw.popTransform();
                     //});
                     //this.m_iWhizApi.m_WebApp.update();

                     var dom = document.getElementById("rectrubberband");
                     if (!dom) {
                         dom = document.createElement("div");
                         // dom = document.createElement("svg");
                         this.m_RectDom = dom;
                         dom.id = "rectrubberband";
                         document.body.appendChild(dom);
                         dom.style.position = "absolute";
                         dom.style.cursor = "default";
                         dom.style.pointerEvents = 'none';
                         dom.style.right = "px";
                         dom.style.bottom = "px";
                     }
                     this.setRect(dom, this.m_iWhizApi.m_WebApp.m_StartPoint[0] + canvasRect.left, this.m_iWhizApi.m_WebApp.m_StartPoint[1] + canvasRect.top, (event.clientX) - (this.m_iWhizApi.m_WebApp.m_StartPoint[0] + canvasRect.left), (event.clientY) - (this.m_iWhizApi.m_WebApp.m_StartPoint[1] + canvasRect.top));
                 }
             }

             //if (this.m_State == this.STATE.MARKUP_MODE && this.m_MButtonDown != true) {
             //    //if (event.buttons == 1) {
             //    var X = [0], Y = [0], Z = [0];
             //    X[0] = clientX;
             //    Y[0] = clientY;
             //    this.m_ArrMarkupPolyline.push({ x: X[0], y: Y[0] });
             //    var viewport = this.m_iWhizApi.m_WebApp.viewer.activeViewport;
             //    var that = this;
             //    this.m_SelFrame = viewport.drawMetafile(this.m_SelFrame, function (draw) {
             //        var points = [];
             //        for (var i = 0, j = 0; i < that.m_ArrMarkupPolyline.length; i++) {
             //            points[j++] = that.m_ArrMarkupPolyline[i].x;
             //            points[j++] = that.m_ArrMarkupPolyline[i].y;
             //            points[j++] = 0;
             //        }
             //        draw.pushTransform(viewport.screenToWorld());
             //        draw.setColor([255, 255, 255]);
             //        draw.polyline(points);
             //        draw.popTransform();
             //    });
             //    this.m_iWhizApi.m_WebApp.update();
             //    this.m_iWhizApi.m_WebApp.startSelection(this.m_Mx, this.m_My);
             //    // }
             //}
             if (this.m_State == this.STATE.MARKUP_MODE && this.m_MButtonDown != true) {
                 //if (event.buttons == 1) {
                 var X = [0], Y = [0], Z = [0];
                 X[0] = clientX;
                 Y[0] = clientY;
                 this.m_ArrMarkupPolyline.push({ x: X[0], y: Y[0] });
                 var viewport = this.m_iWhizApi.m_WebApp.viewer.activeViewport;
                 var that = this;
                 var svgNs = document.getElementById("svgrubberband");
                 if (!svgNs) {
                     var svgNs = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
                     svgNs.id = "svgrubberband";
                     this.m_svg = svgNs;
                     this.m_DomElement.parentElement.appendChild(svgNs);
                 }
                 var polyline = document.getElementById("polylinerubberband");
                 if (!polyline) {
                     polyline = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
                     polyline.setAttributeNS(null, "id", "polylinerubberband");
                     polyline.setAttributeNS(null, "stroke", "rgb(255,0,0)");
                     polyline.setAttributeNS(null, "stroke-width", "2");
                     svgNs.appendChild(polyline);
                     this.m_PolyDom = polyline;
                 }
                 this.setPolyLine();
                 this.m_iWhizApi.m_WebApp.startSelection(this.m_Mx, this.m_My);
                 // }
             }
         }
         if (this.m_State == this.STATE.NONE || this.m_State == this.STATE.PAN)
             this.m_EventManager.callEvent("touchMove", [clientX, clientY]);
     },
    this.onTouchEnd = function (event) {

        event = this.getEvent(event);

        var canvasRect = this.m_DomElement.getBoundingClientRect();
        var clientX = event.pageX - canvasRect.left;
        var clientY = event.pageY - canvasRect.top;

        console.log("onTouchEnd not returned: X: " + clientX + " ,Y: " + clientY);

        if (!this.m_Enabled)
            return;
        if (!this.m_DisplayFlag)
            return;
        //if (this.m_WaitMode) {
        //    this.m_WaitMode = false;
        //}

        if (this.m_LongTouchTimer != null) {
            clearTimeout(this.m_LongTouchTimer);
            this.m_LongTouchTimer = null;            
        }
        if (!this.m_bIslongTouch)
        {
            if (this.m_State != this.STATE.PAN && this.m_State != this.STATE.ROTATE && this.m_State != this.STATE.ZOOM) {
                if (this.m_State != this.STATE.POINT_SELECTION) {
                    ////////////////for tooltip////////////////////////
                    if (this.mIsSingleTouch) {
                        if (this.m_TouchStartX >= clientX - this.mPanTolerance && this.m_TouchStartX <= clientX + this.mPanTolerance
                                                    && this.m_TouchStartY >= clientY - this.mPanTolerance && this.m_TouchStartY <= clientY + this.mPanTolerance) {
                            this.initiateTooltip(clientX, clientY);
                        }
                    }
                    ////////////////for tooltip////////////////////////
                }
            }
        }
        
        if (this.m_OpenFlag && this.m_MButtonDown != true) {
            switch (this.m_State) {
                case this.STATE.POINT_SELECTION:
                    this.m_EventManager.callEvent("clientPoint", [clientX, clientY]);
                    if ($("#rubberTip").is(":visible"))
                        $("#rubberTip").hide();
                    break;
                case this.STATE.RECT_SELECTION:
                    var selectionRect = {
                        topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }
                    };

                    selectionRect.topLeft = {
                        x: this.m_MouseDown.x, y: this.m_MouseDown.y
                    };
                    selectionRect.bottomRight = {
                        x: clientX, y: clientY
                    };
                    this.m_EventManager.callEvent("rectPoints", [selectionRect.topLeft, selectionRect.bottomRight]);
                    if ($("#rubberTip").is(":visible"))
                        $("#rubberTip").hide();

                    //this.m_SelFrame = this.m_iWhizApi.m_WebApp.viewer.activeViewport.drawMetafile(this.m_SelFrame, null);
                    if (this.m_RectDom != null)
                        document.body.removeChild(this.m_RectDom);
                    this.m_RectDom = null;
                    this.m_iWhizApi.m_WebApp.update();
                    this.m_iWhizApi.m_WebApp.m_StartPoint = null;
                    break;
                case this.STATE.MARKUP_MODE:
                    //this.m_SelFrame = this.m_iWhizApi.m_WebApp.viewer.activeViewport.drawMetafile(this.m_SelFrame, null);
                    this.m_iWhizApi.m_WebApp.update();
                    this.m_EventManager.callEvent("freehand");
                    break;
            }
        }
        if (this.m_State == this.STATE.NONE || this.m_State == this.STATE.PAN)
            this.m_EventManager.callEvent("touchUp", [clientX, clientY]);
    },
    this.onMouseUp = function (event) {
        var canvasRect = this.m_DomElement.getBoundingClientRect();
        var clientX = event.clientX - canvasRect.left;
        var clientY = event.clientY - canvasRect.top;
        if (!this.m_Enabled)
            return;
        if (!this.m_DisplayFlag)
            return;
        if (event.button == 0)
            this.m_LButtonDown = false;

        if (this.m_WaitMode) {
            if (event.button == 2) {
                this.m_WaitMode = false;
                if ((this.m_State == this.STATE.POINT_SELECTION || this.m_State == this.STATE.RECT_SELECTION || this.m_State == this.STATE.MARKUP_MODE) && this.m_MButtonDown != true)
                    this.m_UserExit = true;
            }
        }

        if (this.m_OpenFlag && this.m_MButtonDown != true) {
            switch (this.m_State) {
                case this.STATE.POINT_SELECTION:
                    this.m_EventManager.callEvent("clientPoint", [clientX, clientY]);
                    if ($("#rubberTip").is(":visible"))
                        $("#rubberTip").hide();
                    if (this.m_Rubberband)
                    {
                        if (this.m_svg != null) {
                            this.m_DomElement.parentElement.removeChild(this.m_svg);
                        }
                        this.m_svg = null;
                        this.m_LineDom = null;
                    }
                    break;
                case this.STATE.RECT_SELECTION:
                    var selectionRect = {
                        topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }
                    };
                    selectionRect.topLeft = {
                        x: this.m_MouseDown.x, y: this.m_MouseDown.y
                    };
                    selectionRect.bottomRight = {
                        x: clientX, y: clientY
                    };
                    this.m_EventManager.callEvent("rectPoints", [selectionRect.topLeft, selectionRect.bottomRight]);
                    if ($("#rubberTip").is(":visible"))
                        $("#rubberTip").hide();

                   // this.m_SelFrame = this.m_iWhizApi.m_WebApp.viewer.activeViewport.drawMetafile(this.m_SelFrame, null);
                    if (this.m_RectDom != null)
                        document.body.removeChild(this.m_RectDom);
                    this.m_RectDom = null;
                    this.m_iWhizApi.m_WebApp.update();
                    this.m_iWhizApi.m_WebApp.m_StartPoint = null;
                    break;
                case this.STATE.MARKUP_MODE:
                   // this.m_SelFrame = this.m_iWhizApi.m_WebApp.viewer.activeViewport.drawMetafile(this.m_SelFrame, null);
                    if (this.m_svg != null) {
                        this.m_DomElement.parentElement.removeChild(this.m_svg);
                    }
                    this.m_svg = null;
                    this.m_PolyDom = null;
                    this.m_iWhizApi.m_WebApp.update();
                    this.m_EventManager.callEvent("freehand");
                    break;
                case this.STATE.GRIP_MODE:
                    if (!this.m_iWhizApi.m_Grip.m_IsDragging) {
                        var that = this;
                        this.m_iWhizApi.m_Flow.selectShapeOnPoint(clientX, clientY, function (retCode) {
                            //if (retCode != 0) {
                            //    that.m_State = that.STATE.NONE;
                            //    that.m_iWhizApi.m_Grip.hideGrips();
                            //}
                        });
                    }
                    else {
                        if (this.m_iWhizApi.m_Grip)
                            this.m_iWhizApi.m_Grip.onMouseUp(clientX, clientY, event.button);
                    }
                    break;
            }
        }
        if (event.button == 1) {
            if (this.m_MButtonDown)
                this.m_MButtonDown = false;
            this.setCursor(this.m_MidPanPrevCursor, false);
        }
        if (event.button == 0 && this.m_State == this.STATE.PAN) {
            this.setCursor(10, false);
        }
        if (this.m_State == this.STATE.NONE)
            this.m_EventManager.callEvent("mouseUp", [clientX, clientY, event.button]);

    },
    this.startLongTouchTimer = function () {
        var that = this;
        this.m_bIslongTouch = false;
        this.m_LongTouchTimer = setTimeout(function () {
            //console.log("startLongTouchTimer");
            that.m_bIslongTouch = true;
            that.m_EventManager.callEvent("longtouchHandler", [that.m_TouchStartX, that.m_TouchStartY]);
        }, that.m_LongTouchDelay);
    },

    this.resize = function (width, height) {
        try {
            if (this.m_RectDom != null) {
                document.body.removeChild(this.m_RectDom);
                this.m_RectDom = null;
            }
            if (this.m_iWhizApi.m_WebApp) {
                this.m_iWhizApi.m_WebApp.resize(width, height, this.m_DisplayFlag);
                this.m_DomElement.width = width;
                this.m_DomElement.height = height;
            }
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }

    },
    this.initWebViewer = function (canvasname, width, height, topOffset, callback) {
        try {
            this.m_DomElement = document.querySelector(canvasname);
            var that = this;
            that.m_EventManager = new that.EventManager;
            try {
                that.m_TopOffset = topOffset;
                that.m_iWhizApi.m_WebApp.init(that.m_DomElement, width, height, that);
                that.m_DomElement.width = width;//this.m_iWhizCanvas.offsetWidth;
                that.m_DomElement.height = height;//window.innerHeight - 64;

                that.m_State = that.STATE.NONE;

                // that.m_DomElement.addEventListener("resize", function () { that.onResize() });
                window.addEventListener("resize", function () { that.onResize() });
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    that.m_DomElement.addEventListener('touchstart', function (a) { that.onTouchStart(a) }, false);
                    that.m_DomElement.addEventListener('touchend', function (a) { that.onTouchEnd(a) }, false);
                    that.m_DomElement.addEventListener('touchmove', function (a) { that.onTouchMove(a) }, false);
                    console.log("entered touch events");
                }
                else {
                    that.m_DomElement.addEventListener("mousedown", function (a) { that.onMouseDown(a) });
                    that.m_DomElement.addEventListener("mouseup", function (a) { that.onMouseUp(a) });
                    that.m_DomElement.addEventListener("mousemove", function (a) { that.onMouseMove(a) });
                    console.log("entered mouse events");
                }
                // that.m_DomElement.addEventListener('touchend', function (a) { that.onMouseUp(a) }, false);
                that.m_DomElement.addEventListener('mousewheel', function (a) { that.mousewheel.bind(that)(a) }, false);
                that.m_DomElement.addEventListener('wheel', function (a) { that.mousewheel.bind(that)(a) }, false);
                that.m_DomElement.addEventListener('DOMMouseScroll', function (a) { that.mousewheel.bind(that)(a) }, false);
                that.m_DomElement.addEventListener('dblclick', function (a) { that.mousedblclick.bind(that)(a) }, false);
                that.m_DomElement.addEventListener('click', function (a) { that.mouseclick.bind(that)(a) }, false);

                document.onkeydown = that.keyDown.bind(that);
                document.onkeyup = that.keyUp.bind(that);

                $(document.body).append('<div style="position:absolute;background-color: rgba(255, 255, 204, 1);display: none;margin-left :5%;border-radius: 2px;z-index: 1000;width: auto;height: auto;" id="toolTipId"><p id="tooltipData" style="margin: 8px 8px 8px;align-items:center;color:black;"></p> </div>');

                $(document.body).append('<div style="position:absolute;background-color: rgba(50, 41, 41, 0.82);box-shadow: 2px 2px 2px #888888;display: none;margin-left :15%;border-radius: 20px;top: 80px;width: auto;height: auto;" id="rubberTip"><p id="measure" style=" margin: 11px 31px 10px;align-items: center;text-align: justify;color:white;"></p> </div>');

                callback(iWhizError.SUCCESS)
            }
            catch (e) {
                callback(iWhizError.UNEXPECTED_ERROR);
            }
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.setDWGFileName = function (fileName) {
        try {
            this.m_DWGFileName = fileName
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.onResize = function () {
        if (this.m_RectDom != null) {
            document.body.removeChild(this.m_RectDom);
            this.m_RectDom = null;
        }
        if (this.m_iWhizApi.m_WebApp)
            this.m_iWhizApi.m_WebApp.resize(this.m_DomElement.width, this.m_DomElement.height, this.m_DisplayFlag)
    },
    this.render = function () {
        if (this.m_ApplicationMode == 3) {
            this.m_iWhizApi.m_Grip.drawGrips();
            this.m_iWhizApi.m_Grip.drawSnapPoint();
        }


        if (this.m_IsBlinking) {
            this.createBlinks();
        }
        else
        {
            //this.m_BlinkFrame = this.m_iWhizApi.m_WebApp.viewer.activeViewport.drawMetafile(this.m_BlinkFrame, null);
            var svgNs = document.getElementById("svgblink");
            if (svgNs) {
                while (svgNs.firstChild) {
                    svgNs.removeChild(svgNs.firstChild);
                }
            }
        }
           
        if (this.m_IsHatching) {
            this.createHatches();
        }
        else
            this.m_HatchFrame = this.m_iWhizApi.m_WebApp.viewer.activeViewport.drawMetafile(this.m_HatchFrame, null);

        if (this.m_IsLineOn) {
            this.createLines();
        }
        else
            this.m_LineFrame = this.m_iWhizApi.m_WebApp.viewer.activeViewport.drawMetafile(this.m_LineFrame, null);

    },
    this.getClientPoint = function (callback) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            if (this.m_State == this.STATE.POINT_SELECTION || this.m_State == this.STATE.RECT_SELECTION || this.m_State == this.STATE.MARKUP_MODE) {
                this.m_State = this.STATE.NONE;
                this.m_EventManager.removeEvent("clientPoint", this.m_clientptHandler);
                this.m_EventManager.removeEvent("rectPoints", this.m_rectHandler);
                this.m_EventManager.removeEvent("freehand", this.m_freeHandHandler);
                this.m_WaitMode = false;
                callback(iWhizError.INTERRUPTED_FUNCTION_CALL);
            }
            else {
                this.resetMouseModeAndCursor(this.STATE.POINT_SELECTION, 1);
                this.m_WaitMode = true;
                this.m_State = this.STATE.POINT_SELECTION;
                this.m_EventManager.addEventListener("clientPoint", this.m_clientptHandler = function (points) {
                    this.m_EventManager.removeEvent("clientPoint", this.m_clientptHandler);
                    this.m_State = this.STATE.NONE;
                    if (this.m_UserExit == true) {
                        this.m_UserExit = false;
                        this.restoreMouseModeAndCursor(false);
                        callback(iWhizError.CANCEL_OPERATION, 0, 0);
                    }
                    else {
                        this.restoreMouseModeAndCursor(false);
                        callback(iWhizError.SUCCESS, points[0], points[1]);
                    }


                }.bind(this));
            }
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.getDWGPoint = function (callback) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            var that = this;
            this.getClientPoint(function (retCode, x, y) {
                var X = [0], Y = [0], Z = [0];
                X[0] = x; Y[0] = y; Z[0] = 0;
                that.clientToDWG(X, Y, Z);
                callback(retCode, X[0], Y[0]);
            });
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.getSelectedEntity = function (selectedHandles) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            selectedHandles[0] = this.m_iWhizApi.m_WebApp.getSelectedHandles().split(this.m_RowDelimiter);
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.setRenderMode = function (renderMode) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            this.m_iWhizApi.m_WebApp.setRenderMode(renderMode);
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.clearSelection = function () {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            this.m_iWhizApi.m_WebApp.clearSelection();
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.openDrawing = function (cacheData, isUpdate) {
        try {
            // this.close();
            this.m_DisplayFlag = isUpdate;
            this.m_iWhizApi.m_WebApp.addDrawing(cacheData, isUpdate);
            this.m_OpenFlag = true;

            this.m_ViewPos = this.m_iWhizApi.m_WebApp.getViewPosition();
            this.m_ExtfieldWidth = this.m_iWhizApi.m_WebApp.getFieldWidth();
            this.m_ExtfieldHeight = this.m_iWhizApi.m_WebApp.getFieldHeight();

            ///////////to find dwg area ratio/////////////////
            var StartX = [0], StartY = [0], StartZ = [0], EndX = [0], EndY = [0], EndZ = [0];
            StartX[0] = 0, StartY[0] = 0, StartZ[0] = 0, EndX[0] = 1.0, EndY[0] = 0, EndZ[0] = 0;
            this.clientToDWG(StartX, StartY, StartZ);
            this.clientToDWG(EndX, EndY, EndZ);

            this.m_AreaRatio = Math.sqrt(((StartX[0] - EndX[0]) * (StartX[0] - EndX[0])) + ((StartY[0] - EndY[0]) * (StartY[0] - EndY[0])));
            //////////////////////////
            //var time1 = new Date();
            //if (this.m_iWhizApi.m_WebApp.viewer)
            //    this.m_iWhizApi.m_WebApp.viewer.update();
            //console.log("initial update: " + (new Date() - time1).toString());
            //////////////////////////
            return 0;
        }
        catch (e) {
            this.m_OpenFlag = false;
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.updateDrawing = function (cacheData, isUpdate) {
        if (this.m_DisplayTimer) {
            clearTimeout(this.m_DisplayTimer);
            this.m_DisplayTimer = null;
            this.startDisplayTimer();
        }
        if(this.m_iWhizApi.m_WebApp)
            this.m_iWhizApi.m_WebApp.addGsData(cacheData, isUpdate);
    },
    this.getRenderMode = function (renderMode) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {

            renderMode[0] = this.m_iWhizApi.m_WebApp._renderMode();
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.getRenderingModes = function () {
        return [
         this.m_iWhizApi.m_WebApp.VS_2DWIREFRAME,
         this.m_iWhizApi.m_WebApp.VS_3DWIREFRAME,
         this.m_iWhizApi.m_WebApp.VS_HIDDENLINE,
         this.m_iWhizApi.m_WebApp.VS_FLATSHADED,
         this.m_iWhizApi.m_WebApp.VS_GOURAUDSHADED,
         this.m_iWhizApi.m_WebApp.VS_SHADEDWITHWIREFRAME]
    },
    this.regenerate = function () {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            this.m_iWhizApi.m_WebApp.update();
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.display = function (resCallback) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            this.CallbackAfterDisplay = resCallback;

            //var time1 = new Date();
            //if (this.m_iWhizApi.m_WebApp.viewer)
            //    this.m_iWhizApi.m_WebApp.viewer.update();
            //console.log("first update: " + (new Date() - time1).toString());

            this.startDisplayTimer();

            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.startDisplayTimer = function () {
        var that = this;
        this.m_DisplayTimer = setTimeout(function () {
            that.m_DisplayFlag = true;
            if (that.m_iWhizApi.m_WebApp != null)
                that.m_iWhizApi.m_WebApp.update();
            clearTimeout(that.m_DisplayTimer);
            that.m_DisplayTimer = null;
            if (that.CallbackAfterDisplay != null)
                that.CallbackAfterDisplay();
            //var time1 = new Date();

            //if (that.m_iWhizApi.m_WebApp.viewer)
            //    that.m_iWhizApi.m_WebApp.viewer.update();

            that.m_bIsDisplayTimer = true;
            console.log("Display.............Cache reached: " + that.m_iWhizApi.opentime + " ms, Parse binary: " + that.m_iWhizApi.openParsetime + " ms, initViewerTime: " + that.m_iWhizApi.initViewerTime + " ms");
            console.log("parseDrawing: " + that.m_iWhizApi.dataParsetime + " ms, updateDrawing: " + that.m_iWhizApi.dataUpdatetime + " ms");
            // console.log("new update: " + (new Date() - time1).toString());
            var time = new Date();
            console.log("Current time : h: " + time.getHours().toString() + ", m: " + time.getMinutes().toString() + ", s: " + time.getSeconds().toString());

        }, 800);
    },
    this.startMoveTimer = function () {
        var that = this;
        if (this.m_iWhizApi.m_MovingTrails) {
            if ((that.m_CurrentMoveX) != 0 && (that.m_CurrentMoveY != 0)) {
                this.m_MoveTimer = setTimeout(function () {
                    // if ((that.m_CurrentMoveX != that.m_PrevMoveX) || (that.m_CurrentMoveY != that.m_PrevMoveY))
                    {
                        var X = [0], Y = [0], Z = [0];
                        X[0] = that.m_CurrentMoveX;
                        Y[0] = that.m_CurrentMoveY;
                        Z[0] = 0;
                        that.clientToDWG(X, Y, Z);
                        that.m_iWhizApi.moveWithMovingTrails(X[0], Y[0], function () {
                            clearTimeout(that.m_MoveTimer);
                            that.m_MoveTimer = null;
                            // that.m_PrevMoveX = that.m_CurrentMoveX;
                            //  that.m_PrevMoveY = that.m_CurrentMoveY;
                            that.startMoveTimer();
                        });
                    }
                }, 500);

            }
        }
    },
    this.startUpdateTimer = function () {
        var that = this;
        if (this.m_Rubberband) {
            this.m_UpdateTimer = setTimeout(function () {
                that.m_iWhizApi.updateViewport(function () {
                    clearTimeout(that.m_UpdateTimer);
                    that.m_UpdateTimer = null;
                    that.startUpdateTimer();
                });
            }, 500);
        }
    },
    this.setDisplay = function (status) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {

            if (status == true) {
                this.CallbackAfterDisplay = null;
                this.startDisplayTimer();
            }
            else {
                this.m_iWhizApi.m_WebApp.update();
                this.m_DisplayFlag = status;
            }

            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.toEyeToWorld = function (X, Y, Z) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            var coords = new Tools.Vector4(X[0], Y[0], 0, 1);
            var convMatrix = new Tools.Matrix4();
            convMatrix.elements = this.m_iWhizApi.m_WebApp.viewer.activeViewport.getTransform(this.m_iWhizApi.m_WebApp.tlib.CoordSys.Eye, this.m_iWhizApi.m_WebApp.tlib.CoordSys.World);
            convMatrix.transpose();
            coords = convMatrix.multiplyVector4(coords);
            X[0] = coords.x;
            Y[0] = coords.y;
            Z[0] = 0;

            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.clientToDWG = function (X, Y, Z) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            var scrPoint = [X[0], Y[0], 0];
            var worldPoint = this.m_iWhizApi.m_WebApp.viewer.activeViewport.transformPoints(this.m_iWhizApi.m_WebApp.tlib.CoordSys.Screen, this.m_iWhizApi.m_WebApp.tlib.CoordSys.World, scrPoint)
            X[0] = worldPoint[0];
            Y[0] = worldPoint[1];
            Z[0] = 0;
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.dwgToClient = function (X, Y, Z) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            var scrPoint = [X[0], Y[0], 0];
            var worldPoint = this.m_iWhizApi.m_WebApp.viewer.activeViewport.transformPoints(this.m_iWhizApi.m_WebApp.tlib.CoordSys.World, this.m_iWhizApi.m_WebApp.tlib.CoordSys.Screen, scrPoint)
            X[0] = worldPoint[0];
            Y[0] = worldPoint[1];
            Z[0] = 0;
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.clientDWGAreaRatio = function (areaRatio) {
        try {
            areaRatio[0] = this.m_AreaRatio;
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.getCurrentClientDWGRatio = function (areaRatio) {
        try {
            var StartX = [0], StartY = [0], StartZ = [0], EndX = [0], EndY = [0], EndZ = [0];
            StartX[0] = 0, StartY[0] = 0, StartZ[0] = 0, EndX[0] = 1.0, EndY[0] = 0, EndZ[0] = 0;
            this.clientToDWG(StartX, StartY, StartZ);
            this.clientToDWG(EndX, EndY, EndZ);

            areaRatio[0] = Math.sqrt(((StartX[0] - EndX[0]) * (StartX[0] - EndX[0])) + ((StartY[0] - EndY[0]) * (StartY[0] - EndY[0])));
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.getDWGExtents = function (points) {
        if (this.m_OpenFlag) {

            try {
                var viewPort = this.m_iWhizApi.m_WebApp.viewer.activeViewport;;
                points[0] = viewPort.sceneExtents[0][0];
                points[1] = viewPort.sceneExtents[0][1];
                points[2] = viewPort.sceneExtents[1][0];
                points[3] = viewPort.sceneExtents[1][1];
                return iWhizError.SUCCESS;
            }
            catch (e) {
                return iWhizError.UNEXPECTED_ERROR;
            }
        }
        else {
            iWhizError.NOT_OPEND;
        }
    },
    this.setBackgroundColor = function (red, green, blue) {
        try {
            if (this.m_OpenFlag) {
                this.m_iWhizApi.m_WebApp.viewer.backgroundColor = [red, green, blue];
                this.m_CurBkgColor = [red, green, blue];
                return iWhizError.SUCCESS;
            }
            else
                return iWhizError.NOT_OPEND;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.getBackgroundColor = function (red, green, blue) {
        try {
            if (this.m_OpenFlag) {
                red[0] = this.m_iWhizApi.m_WebApp.viewer.backgroundColor[0];
                green[0] = this.m_iWhizApi.m_WebApp.viewer.backgroundColor[1];
                blue[0] = this.m_iWhizApi.m_WebApp.viewer.backgroundColor[2];
                return iWhizError.SUCCESS;
            }
            else
                return iWhizError.NOT_OPEND;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.resetMouseModeAndCursor = function (state, cursor) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            if (state != this.m_State) {
                if (state != 99) {
                    this.m_PrevState = this.m_State;
                    this.m_State = state;
                }
            }
            // if (cursor != this.m_MouseCursor)
            //     this.m_PrevCursor = this.m_MouseCursor;

        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.restoreMouseModeAndCursor = function (isCursorOnly) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            if (!isCursorOnly) {
                this.m_State = this.m_PrevState;
                this.m_PrevState = this.STATE.NONE;
            }

            if (this.m_PrevCursor == -1) {
                this.setCursor(1, true);
            }
            else {
                this.setCursor(this.m_PrevCursor, true);
            }

            this.m_PrevCursor = -1;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.pan = function () {
        if (!this.m_DisplayFlag)
            return iWhizError.NOT_OPEND;
        try {
            if (this.m_State != this.STATE.PAN) {
                this.resetMouseModeAndCursor(this.STATE.PAN, 10);
                this.setCursor(10, true);
            }
            else {
                this.m_PrevCursor = -1;  // to solve the cursor resetting issue after pan and busy cursor 
                this.restoreMouseModeAndCursor(false);
            }
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.setCursor = function (cursorIndex, isPrevCursorSave) {
        try {

            if (this.m_State == this.STATE.PAN && cursorIndex == 1)
                cursorIndex = 10;   // to solve the issue of cursor reset in case of pan enabled

            if (cursorIndex != this.m_MouseCursor) {
                if (isPrevCursorSave)
                    this.m_PrevCursor = this.m_MouseCursor;
                this.m_MouseCursor = cursorIndex;
                var baseURL = this.m_iWhizApi.m_BaseURL; //window.location.href.split('/');
                switch (cursorIndex) {
                    case 0:
                        this.m_DomElement.style.cursor = "wait";
                        break;
                    case 1:
                        this.m_DomElement.style.cursor = "default";
                        break;
                    case 2:
                        //this.m_DomElement.style.cursor = "crosshair";
                        // break;
                        var imgurl;
                        if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true) || (/Edge\/\d./i.test(navigator.userAgent))) {
                            imgurl = baseURL  + "/Content/Drawing/iWhizCross.cur";
                            this.m_DomElement.style.cursor = 'url(' + imgurl + '), auto';
                        }
                        else {
                            imgurl = baseURL + "/Content/Drawing/iWhizCross.png";
                            this.m_DomElement.style.cursor = 'url(' + imgurl + ') 12.5 12.5, auto';
                        }
                        break;
                    case 3:
                        this.m_DomElement.style.cursor = "text";
                        break;
                    case 4:
                        this.m_DomElement.style.cursor = "all-scroll";
                        break;
                    case 5:
                        this.m_DomElement.style.cursor = "ne-resize";
                        break;
                    case 6:
                        this.m_DomElement.style.cursor = "n-resize";
                        break;
                    case 7:
                        this.m_DomElement.style.cursor = "nw-resize";
                        break;
                    case 8:
                        this.m_DomElement.style.cursor = "e-resize";
                        break;
                    case 9:
                        this.m_DomElement.style.cursor = "pointer";
                        break;
                    case 10:
                        var imgurl;
                        if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true) || (/Edge\/\d./i.test(navigator.userAgent))) {
                            imgurl = baseURL + "/Content/Drawing/iWhizHand.cur";
                        }
                        else {
                            imgurl = baseURL + "/Content/Drawing/iWhizHand.png";
                        }
                        this.m_DomElement.style.cursor = 'url(' + imgurl + '), auto';
                        break;
                    case 11:
                        var imgurl;
                        if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true) || (/Edge\/\d./i.test(navigator.userAgent))) {
                            imgurl = baseURL + "/Content/Drawing/iWhizHold.cur";
                        }
                        else {
                            imgurl = baseURL + "/Content/Drawing/iWhizHold.png";
                        }
                        this.m_DomElement.style.cursor = 'url(' + imgurl + '), auto';
                        break;
                    case 12:
                        var imgurl;
                        if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true) || (/Edge\/\d./i.test(navigator.userAgent))) {
                            imgurl = baseURL + "/Content/Drawing/iWhizWBox.cur";
                            this.m_DomElement.style.cursor = 'url(' + imgurl + '), auto';
                        }
                        else {
                            imgurl = baseURL + "/Content/Drawing/iWhizWBox.png";
                            this.m_DomElement.style.cursor = 'url(' + imgurl + ') 7.5 7.5, auto';
                        }

                        // this.m_DomElement.style.cursor.x = '7.5px';
                        // this.m_DomElement.style.cursor.y = '7.5px';
                        break;
                    case 13:
                        var imgurl;
                        if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true) || (/Edge\/\d./i.test(navigator.userAgent))) {
                            imgurl = baseURL + "/Content/Drawing/iWhizPen.cur";
                        }
                        else {
                            imgurl = baseURL + "/Content/Drawing/iWhizPen.png";
                        }
                        this.m_DomElement.style.cursor = 'url(' + imgurl + '), auto';
                        break;
                    case 14:    //flowchart select
                        var imgurl;
                        if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true) || (/Edge\/\d./i.test(navigator.userAgent))) {
                            imgurl = baseURL + "/Content/Drawing/iWhizSelect.cur";
                            this.m_DomElement.style.cursor = 'url(' + imgurl + '), auto';
                        }
                        else {
                            imgurl = baseURL + "/Content/Drawing/iWhizSelect.png";
                            this.m_DomElement.style.cursor = 'url(' + imgurl + ') 7.5 7.5, auto';
                        }
                        break;
                }
            }

            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.isExistsInHatchArray = function (handle, hatchIndex) {
        if (handle == "") return false;
        for (var i = 0; i < this.m_ObjHatchArray.length; i++) {
            var objHatch = this.m_ObjHatchArray[i];
            if (objHatch.m_Handle == handle) {
                hatchIndex[0] = i;
                return true;
            }
        }
        return false;
    },
    this.getExtentsOfCoords = function (coords, minX, minY, maxX, maxY) {
        var that = this;
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            if ((coords.indexOf(that.m_RowDelimiter) == -1) || (coords.indexOf(that.m_ColumnDelimiter) == -1))
                return iWhizError.INPUT_STRING_NOT_GIVEN;
            var xyCoords = coords.split(that.m_RowDelimiter);
            var xCoords = [];
            var yCoords = [];
            for (var item in xyCoords) {
                if (xyCoords[item] != "") {
                    var temp = xyCoords[item].split(that.m_ColumnDelimiter);
                    xCoords.push(temp[0]);
                    yCoords.push(temp[1]);
                }
            }
            minX[0] = Math.min.apply(null, xCoords);
            minY[0] = Math.min.apply(null, yCoords);
            maxX[0] = Math.max.apply(null, xCoords);
            maxY[0] = Math.max.apply(null, yCoords);

            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.hatchEntitiesByCoords = function (coordsArray, colors, hatchIds) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            if (coordsArray.length > 0) {
                if (coordsArray[coordsArray.length - 1] == "")
                    this.m_HatchHandleCount = coordsArray.length - 1;
                else
                    this.m_HatchHandleCount = coordsArray.length;

                this.m_HatchCurrentIndex = 0;
                this.hatchHandleCoordsHandler(coordsArray, colors, hatchIds);
            }
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.hatchHandleCoordsHandler = function (coordsArray, colors, hatchIds) {
        var that = this;
        var returnCode = 0;
        if (that.m_HatchCurrentIndex < that.m_HatchHandleCount) {
            if (this.m_HatchHandles[this.m_HatchCurrentIndex] != "") {
                var tempCoords = [];
                for (var item in coordsArray) {
                    if (coordsArray[item] != "") {
                        var xyCoords = coordsArray[item].split(that.m_RowDelimiter);
                        for (var ind in xyCoords) {
                            if (xyCoords[ind] != "") {
                                var temp = xyCoords[ind].split(that.m_ColumnDelimiter);
                                tempCoords.push(parseFloat(temp[0]));
                                tempCoords.push(parseFloat(temp[1]));
                                tempCoords.push(0);
                            }
                        }
                    }
                    that.m_HatchPoints[that.m_HatchCurrentIndex] = tempCoords;
                    that.m_HatchCurrentIndex++;
                }
                that.hatchHandleCoordsHandler(coordsArray, colors, hatchIds);
            }
        }
        else {
            var hatchIdReturn = [0];
            returnCode = that.hatchEntitiesWithCoords(that.m_HatchPoints, colors, hatchIdReturn);
            hatchIds[0] = hatchIdReturn[0];
            that.m_HatchHandleCount = 0;
            that.m_HatchCurrentIndex = 0;
            that.m_HatchPoints = [];
        }

    },
    this.hatchEntitiesWithCoords = function (positionsArr, colors, hatchIdReturn) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            var count = positionsArr.length;
            var hatchIds = "";
            if (0 < count) {
                for (var ixnIndex = 0; ixnIndex < count ; ixnIndex++) {
                    var hatchId = "hatchId" + this.m_HatchCount;
                    var index = [0];
                    var objHatch;
                    objHatch = new iWhizHatch();
                    objHatch.m_Handle = hatchId;
                    hatchIds += hatchId + this.m_RowDelimiter;
                    objHatch.m_Coords = positionsArr[ixnIndex];
                    if (colors[ixnIndex]) {
                        objHatch.red = colors[ixnIndex][0];
                        objHatch.green = colors[ixnIndex][1];
                        objHatch.blue = colors[ixnIndex][2];
                    }
                    else {
                        objHatch.red = 255;
                        objHatch.green = 0;
                        objHatch.blue = 0;
                    }
                    this.m_ObjHatchArray[parseInt(this.m_HatchCount)] = objHatch;
                    this.m_HatchCount++;
                }

                hatchIdReturn[0] = hatchIds;
            }
            this.m_IsHatching = true;
            this.m_iWhizApi.m_WebApp.update();
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.hatchEntitiesByHandles = function (handles, colors, callBack) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            if (handles.length > 0) {
                this.m_HatchHandles = handles;
                if (handles[handles.length - 1] == "")
                    this.m_HatchHandleCount = handles.length - 1;
                else
                    this.m_HatchHandleCount = handles.length;

                this.m_HatchCurrentIndex = 0;

                // var splitCount = 25;
                var hatchHandles = handles;
                this.hatchHandleHandler(colors, hatchHandles, callBack);
            }
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.hatchHandleHandler = function (colors, hatchHandles, callBack) {
        var that = this;
        var handles = "";
        for (var item in hatchHandles) {
            if (hatchHandles[item] != "") {
                handles += hatchHandles[item] + that.m_RowDelimiter;
            }
        }

        var returnCode = 0;
        this.m_iWhizApi.getPolylineCoordsMultiple(handles, function (retCode, xCoordinates, yCoordinates) {
            if (retCode != 0) {
                callBack(retCode);
                return;
            }
            else {
                var xValsArray = xCoordinates.split(that.m_RowDelimiter);
                var yValsArray = yCoordinates.split(that.m_RowDelimiter);
                var tempCoords = [];
                for (var ind in xValsArray) {
                    if (xValsArray[ind] != "") {
                        var xCoordArray = xValsArray[ind].split(that.m_ColumnDelimiter);
                        var yCoordArray = yValsArray[ind].split(that.m_ColumnDelimiter);
                        for (var item in xCoordArray) {
                            if (xCoordArray[item] != "") {
                                tempCoords.push(parseFloat(xCoordArray[item]));
                                tempCoords.push(parseFloat(yCoordArray[item]));
                                tempCoords.push(0);
                            }
                        }

                        that.m_HatchPoints[that.m_HatchCurrentIndex] = tempCoords;
                        that.m_HatchCurrentIndex++;
                        tempCoords = [];
                    }
                }


                returnCode = that.hatchEntities(that.m_HatchPoints, colors, that.m_HatchHandles);

                that.m_HatchHandles = [];
                that.m_HatchHandleCount = 0;
                that.m_HatchCurrentIndex = 0;
                that.m_HatchPoints = [];
                callBack(returnCode);
            }
        });
    },
    //this.hatchHandleHandler = function (colors, hatchHandles, splitCount, callBack) {
    //    var that = this;
    //    var returnCode = 0;
    //    if (that.m_HatchCurrentIndex < that.m_HatchHandleCount) {
    //        var tempArray = hatchHandles;
    //        if (hatchHandles.length > splitCount) {
    //            tempArray = hatchHandles.slice(0, splitCount);
    //        }
    //        var handles = "";
    //        for (item in tempArray)
    //        {
    //            if(tempArray[item] != "")
    //            {
    //                handles += tempArray[item] + that.m_RowDelimiter;
    //            }
    //        }
    //        this.m_iWhizApi.getPolylineCoordsMultiple(handles, function (retCode, xCoordinates, yCoordinates) {
    //            if (retCode != 0) {
    //                callBack(retCode);
    //                return;
    //            }
    //            else {
    //                var xValsArray = xCoordinates.split(that.m_RowDelimiter);
    //                var yValsArray = yCoordinates.split(that.m_RowDelimiter);
    //                var tempCoords = [];
    //                for (ind in xValsArray)
    //                {
    //                    if (xValsArray[ind] != "") {
    //                        var xCoordArray = xValsArray[ind].split(that.m_ColumnDelimiter);
    //                        var yCoordArray = yValsArray[ind].split(that.m_ColumnDelimiter);
    //                        for (item in xCoordArray) {
    //                            if (xCoordArray[item] != "") {
    //                                tempCoords.push(parseFloat(xCoordArray[item]));
    //                                tempCoords.push(parseFloat(yCoordArray[item]));
    //                                tempCoords.push(0);
    //                            }
    //                        }

    //                        that.m_HatchPoints[that.m_HatchCurrentIndex] = tempCoords;
    //                        that.m_HatchCurrentIndex++;
    //                        tempCoords = [];
    //                    }
    //                }
    //                //  hatchHandles.splice(0, splitCount);
    //                hatchHandles = hatchHandles.slice(splitCount, hatchHandles.length);
    //                that.hatchHandleHandler(colors, hatchHandles, splitCount, callBack);
    //            }
    //        });
    //    }
    //    else {
    //        returnCode = that.hatchEntities(that.m_HatchPoints, colors, that.m_HatchHandles);

    //        that.m_HatchHandles = [];
    //        that.m_HatchHandleCount = 0;
    //        that.m_HatchCurrentIndex = 0;
    //        that.m_HatchPoints = [];
    //        callBack(returnCode);
    //    }

    //},
    this.hatchEntities = function (positionsArr, colors, handles) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            var count = handles.length;
            if (0 < count) {
                for (var ixnIndex = 0; ixnIndex < count ; ixnIndex++) {
                    var entityHandle = "";
                    //Get Entity Handle
                    if (handles.length > 0)
                        entityHandle = handles[ixnIndex];

                    var index = [0];
                    var objHatch;

                    if (this.isExistsInHatchArray(entityHandle, index)) {

                        objHatch = this.m_ObjHatchArray[index];
                        objHatch.m_Coords = positionsArr[ixnIndex];
                        if (colors[ixnIndex]) {
                            objHatch.red = colors[ixnIndex][0];
                            objHatch.green = colors[ixnIndex][1];
                            objHatch.blue = colors[ixnIndex][2];
                        }
                        else {
                            objHatch.red = 255;
                            objHatch.green = 0;
                            objHatch.blue = 0;
                        }
                        this.m_ObjHatchArray[index] = objHatch;
                    }
                    else {

                        objHatch = new iWhizHatch();
                        objHatch.m_Handle = entityHandle;
                        objHatch.m_Coords = positionsArr[ixnIndex];
                        if (colors[ixnIndex]) {
                            objHatch.red = colors[ixnIndex][0];
                            objHatch.green = colors[ixnIndex][1];
                            objHatch.blue = colors[ixnIndex][2];
                        }
                        else {
                            objHatch.red = 255;
                            objHatch.green = 0;
                            objHatch.blue = 0;
                        }
                        this.m_ObjHatchArray[parseInt(this.m_HatchCount)] = objHatch;
                        this.m_HatchCount++;
                    }

                }
            }
            this.m_IsHatching = true;
            this.m_iWhizApi.m_WebApp.update();
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.createHatches = function () {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            var that = this;
            var viewport = this.m_iWhizApi.m_WebApp.viewer.activeViewport;
            this.m_HatchFrame = viewport.drawMetafile(this.m_HatchFrame, function (draw) {
                that.m_IsHatching = false;
                for (var i = 0; i < that.m_ObjHatchArray.length; i++) {
                    var objHatch = that.m_ObjHatchArray[i];

                    var drawCoords = [];
                    var coords = objHatch.m_Coords;
                    var numCoords = coords.length / 3;
                    var index = 0;
                    for (var ind = 0; ind < numCoords; ind++) {
                        var x = [0], y = [0], z = [0];
                        x[0] = coords[index];
                        y[0] = coords[index + 1];
                        z[0] = coords[index + 2];
                        index = index + 3;
                        that.dwgToClient(x, y, z);
                        drawCoords.push(x[0]);
                        drawCoords.push(y[0]);
                        drawCoords.push(z[0]);
                    }
                    drawCoords.push(drawCoords[0]);
                    drawCoords.push(drawCoords[1]);
                    drawCoords.push(drawCoords[2]);

                    draw.pushTransform(viewport.screenToWorld());
                    draw.setColor([objHatch.red, objHatch.green, objHatch.blue, 140]);
                    draw.fill(drawCoords);
                    draw.polygon(drawCoords);

                    draw.popTransform();
                    /////////////////////////////////////////////////////////////////////////////

                    that.m_ObjHatchArray[i] = objHatch;
                }
                that.m_IsHatching = true;
            });
            // m_iWhizApi.m_WebApp.update();
            //  this.m_iWhizApi.updateViewport(function () { });
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.drawLinesByCoords = function (coordsArray, colors, lineIds) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            if (coordsArray.length > 0) {
                if (coordsArray[coordsArray.length - 1] == "")
                    this.m_LineHandleCount = coordsArray.length - 1;
                else
                    this.m_LineHandleCount = coordsArray.length;

                this.m_LineCurrentIndex = 0;
                this.lineHandler(coordsArray, colors, lineIds);
            }
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.lineHandler = function (coordsArray, colors, lineIds) {
        var that = this;
        var returnCode = 0;
        if (that.m_LineCurrentIndex < that.m_LineHandleCount) {
            if (this.m_LineHandles[this.m_LineCurrentIndex] != "") {
                var tempCoords = [];
                for (var item in coordsArray) {
                    if (coordsArray[item] != "") {
                        var xyCoords = coordsArray[item].split(that.m_RowDelimiter);
                        for (var ind in xyCoords) {
                            if (xyCoords[ind] != "") {
                                var temp = xyCoords[ind].split(that.m_ColumnDelimiter);
                                tempCoords.push(parseFloat(temp[0]));
                                tempCoords.push(parseFloat(temp[1]));
                                tempCoords.push(0);
                            }
                        }
                    }
                    that.m_LinePoints[that.m_LineCurrentIndex] = tempCoords;
                    that.m_LineCurrentIndex++;
                }
                that.lineHandler(coordsArray, colors, lineIds);
            }
        }
        else {
            var lineIdReturn = [0];
            returnCode = that.drawLines(that.m_LinePoints, colors, lineIdReturn);
            lineIds[0] = lineIdReturn[0];
            that.m_LineHandleCount = 0;
            that.m_LineCurrentIndex = 0;
            that.m_LinePoints = [];
        }

    },
     this.drawLines = function (positionsArr, colors, lineIdReturn) {
         if (!this.m_OpenFlag)
             return iWhizError.NOT_OPEND;
         try {
             var count = positionsArr.length;
             var lineIds = "";
             if (0 < count) {
                 for (var ixnIndex = 0; ixnIndex < count ; ixnIndex++) {
                     var lineId = "lineId" + this.m_LineCount;
                     var index = [0];
                     var objLine;
                     objLine = new iWhizHatch();
                     objLine.m_Handle = lineId;
                     lineIds += lineId + this.m_RowDelimiter;
                     objLine.m_Coords = positionsArr[ixnIndex];
                     if (colors[ixnIndex]) {
                         objLine.red = colors[ixnIndex][0];
                         objLine.green = colors[ixnIndex][1];
                         objLine.blue = colors[ixnIndex][2];
                     }
                     else {
                         objLine.red = 255;
                         objLine.green = 0;
                         objLine.blue = 0;
                     }
                     this.m_ObjLineArray[parseInt(this.m_LineCount)] = objLine;
                     this.m_LineCount++;
                 }

                 lineIdReturn[0] = lineIds;
             }
             this.m_IsLineOn = true;
             this.m_iWhizApi.m_WebApp.update();
             return iWhizError.SUCCESS;
         }
         catch (e) {
             return iWhizError.UNEXPECTED_ERROR;
         }
     },
    this.createLines = function () {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            var that = this;
            var viewport = this.m_iWhizApi.m_WebApp.viewer.activeViewport;
            this.m_LineFrame = viewport.drawMetafile(this.m_LineFrame, function (draw) {
                that.m_IsLineOn = false;
                for (var i = 0; i < that.m_ObjLineArray.length; i++) {
                    var objLine = that.m_ObjLineArray[i];

                    var drawCoords = [];
                    var coords = objLine.m_Coords;
                    var numCoords = coords.length / 3;
                    var index = 0;
                    for (var ind = 0; ind < numCoords; ind++) {
                        var x = [0], y = [0], z = [0];
                        x[0] = coords[index];
                        y[0] = coords[index + 1];
                        z[0] = coords[index + 2];
                        index = index + 3;
                        that.dwgToClient(x, y, z);
                        drawCoords.push(x[0]);
                        drawCoords.push(y[0]);
                        drawCoords.push(z[0]);
                    }

                    draw.pushTransform(viewport.screenToWorld());
                    draw.setColor([objLine.red, objLine.green, objLine.blue]);
                    draw.polygon(drawCoords);

                    draw.popTransform();
                    /////////////////////////////////////////////////////////////////////////////

                    that.m_ObjLineArray[i] = objLine;
                }
                that.m_IsLineOn = true;
            });
            // m_iWhizApi.m_WebApp.update();
            //  this.m_iWhizApi.updateViewport(function () { });
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
     this.removeHatches = function () {
         if (!this.m_OpenFlag)
             return iWhizError.NOT_OPEND;
         try {
             if (this.m_IsHatching) {
                 this.m_IsHatching = false;

                 /////////////////////////////////////////////////////////////////////////////
                 this.m_HatchFrame = this.m_iWhizApi.m_WebApp.viewer.activeViewport.drawMetafile(this.m_HatchFrame, null);
                 /////////////////////////////////////////////////////////////////////////////

                 this.m_ObjHatchArray = [];
                 this.m_HatchCount = 0;
                 this.m_iWhizApi.m_WebApp.update();

             }
             return iWhizError.SUCCESS;
         }
         catch (e) {
             return iWhizError.UNEXPECTED_ERROR;
         }
     },
    this.removeHatchesByHandle = function (handles) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            handles = handles.split(this.m_RowDelimiter);
            for (var ixnIndex = 0; ixnIndex < handles.length - 1; ixnIndex++) {
                var handle = handles[ixnIndex];
                for (var i = 0; i < this.m_ObjHatchArray.length; i++) {
                    if (this.m_ObjHatchArray[i].m_Handle == handle) {
                        this.m_ObjHatchArray.splice(i, 1);
                        --this.m_HatchCount;
                    }
                }
            }
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
     this.removeLines = function () {
         if (!this.m_OpenFlag)
             return iWhizError.NOT_OPEND;
         try {
             if (this.m_IsLineOn) {
                 this.m_IsLineOn = false;

                 /////////////////////////////////////////////////////////////////////////////
                 this.m_LineFrame = this.m_iWhizApi.m_WebApp.viewer.activeViewport.drawMetafile(this.m_LineFrame, null);
                 /////////////////////////////////////////////////////////////////////////////

                 this.m_ObjLineArray = [];
                 this.m_LineCount = 0;
                 this.m_iWhizApi.m_WebApp.update();

             }
             return iWhizError.SUCCESS;
         }
         catch (e) {
             return iWhizError.UNEXPECTED_ERROR;
         }
     },
    this.removeLinesByHandle = function (handles) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            handles = handles.split(this.m_RowDelimiter);
            for (var ixnIndex = 0; ixnIndex < handles.length - 1; ixnIndex++) {
                var handle = handles[ixnIndex];
                for (var i = 0; i < this.m_ObjLineArray.length; i++) {
                    if (this.m_ObjLineArray[i].m_Handle == handle) {
                        this.m_ObjLineArray.splice(i, 1);
                        --this.m_LineCount;
                    }
                }
            }
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.isExistsInBlinkArray = function (handle, blinkIndex) {
        if (handle == "") return false;
        for (var i = 0; i < this.m_ObjBlinkArray.length; i++) {
            var objBlink = this.m_ObjBlinkArray[i];
            if (objBlink.m_Handle == handle) {
                blinkIndex[0] = i;
                return true;
            }
        }
        return false;
    },
   this.blinkEntitiesByHandles = function (handles, red, green, blue, size, delay, callBack) {
       if (!this.m_OpenFlag)
           return iWhizError.NOT_OPEND;
       try {
           if (handles.length > 0) {
               this.m_BlinkHandles = handles;
               //if (handles[handles.length - 1] == "")
               //    this.m_BlinkHandleCount = handles.length - 1;
               //else
               //    this.m_BlinkHandleCount = handles.length;

               //this.m_BlinkCurrentIndex = 0;
               this.blinkHandleHandler(red, green, blue, size, delay, callBack);
           }
       }
       catch (e) {
           return iWhizError.UNEXPECTED_ERROR;
       }
   },
   this.blinkHandleHandler = function (red, green, blue, size, delay, callBack) {
       var that = this;
       var returnCode = 0;
       var entityHandles = "";
       for (var item in that.m_BlinkHandles) {
           if (that.m_BlinkHandles[item] != "") {
               entityHandles += that.m_BlinkHandles[item] + that.m_RowDelimiter;
           }
       }
       if (entityHandles == "")
           callBack();
       else {
           this.m_iWhizApi.getEntityMidpointMultiple(entityHandles, function (result, midX, midY) {
               if (result != 0) {
                   callBack(result);
                   return;
               }
               var midXArray = midX.split(that.m_RowDelimiter);
               var midYArray = midY.split(that.m_RowDelimiter);
               for (var item in midXArray) {
                   if (midXArray[item] != "") {
                       that.m_BlinkPoints += midXArray[item] + that.m_ColumnDelimiter + midYArray[item] + that.m_RowDelimiter;
                   }
               }
               returnCode = that.blinkEntities(that.m_BlinkPoints, red, green, blue, size, delay, that.m_BlinkHandles);
               that.m_BlinkHandles = "";
               that.m_BlinkPoints = "";
               callBack(0);
           });
       }
   },
    this.blinkEntities = function (positions, red, green, blue, size, delay, handles) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            if (this.m_BlinkTimer) {
                clearInterval(this.m_BlinkTimer);
            }
            var posArray = positions.split(this.m_RowDelimiter);
            var count = posArray.length - 1;
            if (0 < count) {
                for (var ixnIndex = 0; ixnIndex < count ; ixnIndex++) {
                    var entityHandle = "";
                    //Get Entity Handle
                    if (handles.length > 0)
                        entityHandle = handles[ixnIndex];

                    var pos = posArray[ixnIndex];

                    //get x and Y position of each vertex
                    var coord = pos.split(this.m_ColumnDelimiter);

                    var xCoord = parseFloat(coord[0]);
                    var yCoord = parseFloat(coord[1]);

                    var index = [0];
                    var objBlink;

                    if (this.isExistsInBlinkArray(entityHandle, index)) {
                        //Get Blink Object
                        objBlink = this.m_ObjBlinkArray[index];
                        objBlink.m_Xpos = xCoord;
                        objBlink.m_Ypos = yCoord;
                        objBlink.red = red;
                        objBlink.green = green;
                        objBlink.blue = blue;
                        objBlink.m_Size = size;
                        this.m_ObjBlinkArray[index] = objBlink;
                    }
                    else {
                        //Create Blink Object
                        objBlink = new iWhizBlink();
                        objBlink.m_Handle = entityHandle;
                        objBlink.m_Xpos = xCoord;
                        objBlink.m_Ypos = yCoord;
                        objBlink.red = red;
                        objBlink.green = green;
                        objBlink.blue = blue;
                        objBlink.m_Size = size;
                        this.m_ObjBlinkArray[parseInt(this.m_BlinkCount)] = objBlink;
                        this.m_BlinkCount++;
                    }

                }
            }

            // this.m_BlinkCount = this.m_BlinkCount + count;
            // this.m_BlinkColor.red = red;
            // this.m_BlinkColor.green = green;
            //  this.m_BlinkColor.blue = blue;
            this.m_BlinkSize = size;
            this.m_BlinkDelay = delay;

            // this.createBlinks();
            var that = this;
            this.m_BlinkTimer = setInterval(function () {
                that.m_IsBlinking = !that.m_IsBlinking;
                that.m_iWhizApi.m_WebApp.update();
            }, this.m_BlinkDelay)
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
     //this.createBlinks = function () {
     //    if (!this.m_OpenFlag)
     //        return iWhizError.NOT_OPEND;
     //    try {
     //        var that = this;
     //        var viewport = this.m_iWhizApi.m_WebApp.viewer.activeViewport;
     //        this.m_BlinkFrame = viewport.drawMetafile(this.m_BlinkFrame, function (draw) {
     //            that.m_IsBlinking = false;
     //            for (var i = 0; i < that.m_ObjBlinkArray.length; i++) {
     //                var objBlink = that.m_ObjBlinkArray[i];

     //                var x = [0], y = [0], z = [0];
     //                x[0] = objBlink.m_Xpos; y[0] = objBlink.m_Ypos; z[0] = 0;
     //                that.dwgToClient(x, y, z);

     //                /////////////////////////////////////////////////////////////////////////////
     //                var x0, y0, x1, y1;
     //                x0 = x[0] - (that.m_BlinkSize);
     //                y0 = y[0] + that.m_BlinkSize;
     //                x1 = x[0] + (that.m_BlinkSize);
     //                y1 = y[0] - that.m_BlinkSize;

     //                draw.pushTransform(viewport.screenToWorld());
     //                draw.setColor([objBlink.red, objBlink.green, objBlink.blue]);
     //                draw.fill([x0, y0, 0, x1, y0, 0, x1, y1, 0, x0, y1, 0, x0, y0, 0]);
     //                draw.polygon([x0, y0, 0, x1, y0, 0, x1, y1, 0, x0, y1, 0, x0, y0, 0]);

     //                draw.popTransform();
     //                /////////////////////////////////////////////////////////////////////////////

     //                that.m_ObjBlinkArray[i] = objBlink;
     //            }
     //            that.m_IsBlinking = true;
     //        });
     //        this.m_iWhizApi.updateViewport(function () { });
     //        return iWhizError.SUCCESS;
     //    }
     //    catch (e) {
     //        return iWhizError.UNEXPECTED_ERROR;
     //    }
    //},
    this.createBlinks = function () {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            var that = this;
            var viewport = this.m_iWhizApi.m_WebApp.viewer.activeViewport;
            //this.m_BlinkFrame = viewport.drawMetafile(this.m_BlinkFrame, function (draw) {
            that.m_IsBlinking = false;
            that.m_IsBlinking = false;
            var svgNs = document.getElementById("svgblink");
            if (!svgNs) {
                var svgNs = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
                svgNs.id = "svgblink";
                this.m_svg = svgNs;
                this.m_DomElement.parentElement.appendChild(svgNs);
            }
            else {
                while (svgNs.firstChild) {
                    svgNs.removeChild(svgNs.firstChild);
                }
            }
            for (var i = 0; i < that.m_ObjBlinkArray.length; i++) {
                var objBlink = that.m_ObjBlinkArray[i];

                var x = [0], y = [0], z = [0];
                x[0] = objBlink.m_Xpos; y[0] = objBlink.m_Ypos; z[0] = 0;
                that.dwgToClient(x, y, z);

                /////////////////////////////////////////////////////////////////////////////
                var x0, y0, x1, y1;
                x0 = x[0] - (that.m_BlinkSize);
                y0 = y[0] + that.m_BlinkSize;
                x1 = x[0] + (that.m_BlinkSize);
                y1 = y[0] - that.m_BlinkSize;

                /////////////////////////////////////////////////////////////////////////////
                var polyline = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
                polyline.setAttributeNS(null, "id", "polylineblink" + i);
                polyline.setAttributeNS(null, "stroke", "rgb(255,0,0)");
                polyline.setAttributeNS(null, "stroke-width", "2");
                svgNs.appendChild(polyline);
                var points = x0 + "," + y0 + " " + x1 + "," + y0 + " " + x1 + "," + y1 + " " + x0 + "," + y1 + " " + x0 + "," + y0;
                this.setBlink(polyline, points, objBlink.red, objBlink.green, objBlink.blue);
                that.m_ObjBlinkArray[i] = objBlink;
            }
            that.m_IsBlinking = true;
            // });
            this.m_iWhizApi.updateViewport(function () { });
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.setDelimiter = function (rowDelimiter, columnDelimiter) {
        try {
            if (rowDelimiter == "" || columnDelimiter == "")
                return EMPTY_DELIMITER;

            if (rowDelimiter == columnDelimiter)
                return SAME_DELIMITER;

            this.m_RowDelimiter = rowDelimiter;
            this.m_ColumnDelimiter = columnDelimiter;

            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.removeBlinkers = function () {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            this.m_IsBlinking = false;

            if (this.m_BlinkTimer) {
                clearInterval(this.m_BlinkTimer);
            }
            /////////////////////////////////////////////////////////////////////////////
           // this.m_BlinkFrame = this.m_iWhizApi.m_WebApp.viewer.activeViewport.drawMetafile(this.m_BlinkFrame, null);
            /////////////////////////////////////////////////////////////////////////////
            if (this.m_svg != null) {
                this.m_DomElement.parentElement.removeChild(this.m_svg);
            }
            this.m_svg = null;

            this.m_ObjBlinkArray = [];
            this.m_BlinkHandles = "";
            this.m_BlinkPoints = "";
            this.m_BlinkCount = 0;
            this.m_iWhizApi.m_WebApp.update();
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.removeBlinksByHandle = function (handles) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            handles = handles.split(this.m_RowDelimiter);
            for (var ixnIndex = 0; ixnIndex < handles.length - 1; ixnIndex++) {
                var handle = handles[ixnIndex];
                for (var i = 0; i < this.m_ObjBlinkArray.length; i++) {
                    if (this.m_ObjBlinkArray[i].m_Handle == handle) {
                        this.m_ObjBlinkArray.splice(i, 1);
                        --this.m_BlinkCount;
                    }
                }
            }
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.setApplicationMode = function (applicationMode) {
        this.m_ApplicationMode = applicationMode;
        //this.close();
        return iWhizError.SUCCESS;
    },
    this.exitWaitMode = function () {
        this.m_WaitMode = false;
        if ((this.m_State == this.STATE.POINT_SELECTION || this.m_State == this.STATE.RECT_SELECTION || this.m_State == this.STATE.MARKUP_MODE) && this.m_MButtonDown != true) {
            this.m_UserExit = true;
            if (this.m_State == this.STATE.POINT_SELECTION)
                this.m_EventManager.callEvent("clientPoint", [0, 0]);
            else if (this.m_State == this.STATE.RECT_SELECTION)
                this.m_EventManager.callEvent("rectPoints", [0, 0]);
            else if (this.m_State == this.STATE.MARKUP_MODE)
                this.m_EventManager.callEvent("freehand");


            this.m_State = this.STATE.NONE;
            this.m_EventManager.removeEvent("clientPoint", this.m_clientptHandler);
            this.m_EventManager.removeEvent("rectPoints", this.m_rectHandler);
            this.m_EventManager.removeEvent("freehand", this.m_freeHandHandler);
            return iWhizError.SUCCESS;
        }
    },
    this.isWaitMode = function (status) {
        status[0] = false;
        if ((this.m_State == this.STATE.POINT_SELECTION || this.m_State == this.STATE.RECT_SELECTION || this.m_State == this.STATE.MARKUP_MODE) && this.m_MButtonDown != true) {
            status[0] = true;
        }
        return iWhizError.SUCCESS;;
    },
    this.enableRubberband = function (xCoord, yCoord, zCoord, isEnable) {
        if (this.m_OpenFlag) {
            /////////////////////////////////////////////////////////////////////////////
            this.m_Rubberband = isEnable;
            if (isEnable) {
                var X = [], Y = [], Z = [];
                X[0] = xCoord; Y[0] = yCoord; Z[0] = 0;
                this.clientToDWG(X, Y, Z);
                xCoord = X[0]; yCoord = Y[0];

                this.m_RubberbandPoint = {
                    x: xCoord, y: yCoord, z: zCoord
                };
                //this.startUpdateTimer();
            }
            else {
                if (this.m_svg != null) {
                    this.m_DomElement.parentElement.removeChild(this.m_svg);
                }
                this.m_svg = null;
                this.m_LineDom = null;
                //clearTimeout(this.m_UpdateTimer);
                //this.m_UpdateTimer = null;
                //this.m_SelFrame = this.m_iWhizApi.m_WebApp.viewer.activeViewport.drawMetafile(this.m_SelFrame, null);
            }
            /////////////////////////////////////////////////////////////////////////////

            return 0;
        }
        else
            return 3;
    },
    this.getRectangle = function (callback) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            if (this.m_State == this.STATE.POINT_SELECTION || this.m_State == this.STATE.RECT_SELECTION || this.m_State == this.STATE.MARKUP_MODE) {
                this.restoreMouseModeAndCursor(false);
                this.m_EventManager.removeEvent("rectPoints", this.m_rectHandler);
                this.m_EventManager.removeEvent("clientPoint", this.m_clientptHandler);
                this.m_EventManager.removeEvent("freehand", this.m_freeHandHandler);
                callback(iWhizError.INTERRUPTED_FUNCTION_CALL)
            }
            else {
                this.resetMouseModeAndCursor(this.STATE.RECT_SELECTION, 2);   // to save previous cursor (zoom window or other functions)
                this.setCursor(2, true);
                this.m_WaitMode = true;
                this.m_iWhizApi.m_WebApp.m_StartPoint = null;
                this.m_EventManager.addEventListener("rectPoints", this.m_rectHandler = function (points) {
                    this.m_EventManager.removeEvent("rectPoints", this.m_rectHandler);
                    this.restoreMouseModeAndCursor(false);

                    if (this.m_UserExit == true) {
                        this.m_UserExit = false;
                        callback(iWhizError.CANCEL_OPERATION, 0, 0);
                    }
                    else {
                        var X = [], Y = [], Z = [];
                        X[0] = points[0].x; Y[0] = points[0].y; Z[0] = 0;
                        this.clientToDWG(X, Y, Z);
                        points[0].x = X[0]; points[0].y = Y[0];
                        X[0] = points[1].x; Y[0] = points[1].y; Z[0] = 0;
                        this.clientToDWG(X, Y, Z);
                        points[1].x = X[0]; points[1].y = Y[0];

                        var returnCode = 0;
                        var width = points[1].x - points[0].x;
                        var height = points[1].y - points[0].y;

                        if (width == 0 || height == 0) {
                            returnCode = iWhizError.INAPPROPRIATE_WIN_SELECTION;
                        }

                        callback(returnCode, points[0], points[1]); //topLeft, bottomRight
                    }


                }.bind(this));
            }

            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.addMarkup = function (layerName, angle, lineWidth, lineType, lineTypeScale, autoCADColor, resCallback) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            if (this.m_State == this.STATE.POINT_SELECTION || this.m_State == this.STATE.RECT_SELECTION || this.m_State == this.STATE.MARKUP_MODE) {
                this.restoreMouseModeAndCursor(false);
                this.m_EventManager.removeEvent("rectPoints", this.m_rectHandler);
                this.m_EventManager.removeEvent("clientPoint", this.m_clientptHandler);
                this.m_EventManager.removeEvent("freehand", this.m_freeHandHandler);
                this.m_WaitMode = false;
                resCallback(iWhizError.INTERRUPTED_FUNCTION_CALL)
            }
            else {
                this.m_ArrMarkupPolyline = [];
                this.resetMouseModeAndCursor(this.STATE.MARKUP_MODE, 13);   // to save previous cursor (zoom window or other functions)
                this.setCursor(13, true);
                this.m_WaitMode = true;
                this.m_iWhizApi.m_WebApp.m_StartPoint = null;
                this.m_EventManager.addEventListener("freehand", this.m_freeHandHandler = function () {
                    this.m_EventManager.removeEvent("freehand", this.m_freeHandHandler);
                    this.m_WaitMode = false;
                    this.restoreMouseModeAndCursor(false);
                    if (this.m_UserExit == true) {
                        this.m_UserExit = false;
                        resCallback(iWhizError.CANCEL_OPERATION, 0, 0);
                    }
                    else {
                        if (2 > this.m_ArrMarkupPolyline.length) {
                            resCallback(iWhizError.NO_MARKUP_CREATED);
                            return;
                        }
                        for (var ixnIndex = 0; ixnIndex < (this.m_ArrMarkupPolyline.length) ; ixnIndex++) {
                            var X = [0], Y = [0], Z = [0];
                            X[0] = this.m_ArrMarkupPolyline[ixnIndex].x;
                            Y[0] = this.m_ArrMarkupPolyline[ixnIndex].y;
                            this.clientToDWG(X, Y, Z);
                            this.m_ArrMarkupPolyline[ixnIndex].x = X[0];
                            this.m_ArrMarkupPolyline[ixnIndex].y = Y[0];
                        }

                        if (this.m_ArrMarkupPolyline.length > 2) {
                            for (var ixnIndex = 0; ixnIndex < (this.m_ArrMarkupPolyline.length - 2) ; ixnIndex++) {
                                ObjOne = this.m_ArrMarkupPolyline[ixnIndex];
                                ObjTwo = this.m_ArrMarkupPolyline[ixnIndex + 1];
                                ObjThree = this.m_ArrMarkupPolyline[ixnIndex + 2];
                                if (angle >= this.calculateMarkupAngle(ObjOne, ObjTwo, ObjThree)) {
                                    this.m_ArrMarkupPolyline.splice(ixnIndex + 1, 1);
                                    ixnIndex = ixnIndex - 1;
                                }
                            }
                        }

                        var actualPoints = "";
                        for (var i = 0; i < this.m_ArrMarkupPolyline.length; i++)
                            actualPoints += this.m_ArrMarkupPolyline[i].x + this.m_ColumnDelimiter + this.m_ArrMarkupPolyline[i].y + this.m_RowDelimiter;
                        this.m_iWhizApi.createPolyline(layerName, autoCADColor, actualPoints, lineWidth, lineType, lineTypeScale, false, function (retCode, entityHandle) {
                            if (retCode == 0)
                                resCallback(retCode, entityHandle, actualPoints);
                            else
                                resCallback(retCode);
                        });
                    }
                }.bind(this));
            }
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.calculateMarkupAngle = function (ObjOne, ObjTwo, ObjThree) {
        var Angle;
        var FirstPart = (ObjTwo.y - ObjThree.y) * (ObjTwo.x - ObjOne.x) - (ObjOne.y - ObjTwo.y) * (ObjThree.x - ObjTwo.x);
        var SecondPart = (ObjTwo.y - ObjThree.y) * (ObjOne.y - ObjTwo.y) + (ObjThree.x - ObjTwo.x) * (ObjTwo.x - ObjOne.x);

        if (0 != SecondPart && 0 == FirstPart) Angle = 0;
        else if (0 == SecondPart && 0 != FirstPart) Angle = 90;
        else if (0 == SecondPart && 0 == FirstPart) Angle = 0;
        else {   //finding the slope
            Angle = Math.atan(FirstPart / SecondPart);
            Angle = Angle / 0.017453292519943295769236907684886;  // degree to radians conversion   (dAngle /(pi/180))          
            Angle = Math.abs(Angle);
        }
        return Angle;
    },
    this.enableOrbit = function (isEnabled) {
        if (!this.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        try {
            if (isEnabled && this.m_State != this.STATE.ROTATE) {
                this.setRotate();
                this.resetMouseModeAndCursor(this.STATE.ROTATE, 9);
                this.setCursor(9, true);
                this.m_OrbitFlag = true;
            }
            else {
                this.setNone();
                this.resetMouseModeAndCursor(this.STATE.NONE, 1);
                this.setCursor(1, true);
                this.m_OrbitFlag = false;
            }
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.enableMeasureToolTip = function () {
        if (this.m_MeasuretoolTipFlag == 0) {
            this.m_MeasuretoolTipFlag = 1;
        }
        else {
            this.m_MeasuretoolTipFlag = 0;
            $("#rubberTip").hide();
        }
    },
    this.close = function () {
        try {

            var that = this;
            this.m_DomElement.removeEventListener("mousedown", function (a) { that.onMouseDown(a) });
            this.m_DomElement.removeEventListener("mouseup", function (a) { that.onMouseUp(a) });
            this.m_DomElement.removeEventListener("mousemove", function (a) { that.onMouseMove(a) });
            this.m_DomElement.removeEventListener('mousewheel', function (a) { that.mousewheel.bind(that)(a) }, false);
            this.m_DomElement.removeEventListener('wheel', function (a) { that.mousewheel.bind(that)(a) }, false);
            this.m_DomElement.removeEventListener('DOMMouseScroll', function (a) { that.mousewheel.bind(that)(a) }, false);
            this.m_DomElement.removeEventListener('dblclick', function (a) { that.mousedblclick.bind(that)(a) }, false);
            this.m_DomElement.removeEventListener('click', function (a) { that.mouseclick.bind(that)(a) }, false);

            this.hideTooltip();
            this.removeBlinkers();
            this.m_iWhizApi.m_WebApp.destroy();
            this.m_OpenFlag = false;
            this.m_DisplayFlag = false;
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },

    this.selectEntity = function (layername, typeid, cursorindex, callback) {
        if (!this.m_OpenFlag) {
            callback(iWhizError.NOT_OPEND);
            return;
        }
        var that = this;
        // this.resetMouseModeAndCursor(99, cursorindex);   // to save previous cursor (zoom window or other functions)
        this.setCursor(cursorindex, true);
        this.getClientPoint(function (retCode, x, y) {
            if (retCode == 0) {
                //single selection
                var avp = that.m_iWhizApi.m_WebApp.viewer.activeViewport;
                var x0, y0, x1, y1;

                if (cursorindex == 12) {
                    x0 = x - 5; y0 = y - 5;
                    x1 = x + 5; y1 = y + 5;
                }
                else {
                    x0 = x - 2; y0 = y - 2;
                    x1 = x + 2; y1 = y + 2;
                }

                var x = [0], y = [0], z = [0];
                x[0] = x0; y[0] = y0; z[0] = 0;
                that.clientToDWG(x, y);
                x0 = x[0]; y0 = y[0];
                x[0] = x1; y[0] = y1; z[0] = 0;
                that.clientToDWG(x, y);
                x1 = x[0]; y1 = y[0];
                var selected = "";
                //var selectMode;               
                //selectMode = that.m_WebApp.tlib.Select.Crossing;

                //var selectedArray = [];
                //avp.select([x0, y0, x1, y1], selectMode);
                //// that.m_WebApp.update();

                //var selectedArray = avp.getSelected();

                //selectedArray = selectedArray.filter(function (elem, index, self) {
                //    return (index == self.indexOf(elem)) && (elem != 0);
                //});

                //for (i = 0; i < selectedArray.length; i++)
                //    selected += selectedArray[i] + that.m_RowDelimiter;

                //that.m_WebApp.selected = selected;
                //if (selected == "") {
                //    // that.restoreMouseModeAndCursor(true);
                //    callback(37, "");
                //}
                //else 

                {
                    selected = x0 + that.m_ColumnDelimiter + y0 + that.m_RowDelimiter;
                    selected += x1 + that.m_ColumnDelimiter + y1 + that.m_RowDelimiter;

                    //function to get filtered handles with layer and type id
                    that.getEntities(layername, selected, typeid, false, function (retCode, entityHandles) {

                        if (retCode != 0) {
                            //    that.restoreMouseModeAndCursor(true);
                            callback(retCode, "");
                        }
                        else {
                            // that.restoreMouseModeAndCursor(true);
                            callback(retCode, entityHandles);   //returns selected handles
                        }
                    });
                }
            }
            else {
                // that.restoreMouseModeAndCursor(true);
                callback(retCode, "");
            }
        });
    },
    this.selectEntitiesByWindow = function (layername, typeid, callback) {
        if (!this.m_OpenFlag) {
            callback(iWhizError.NOT_OPEND);
            return;
        }
        var that = this;
        this.getRectangle(function (returnCode, leftTop, bottomRight) {
            if (returnCode != 0)
                callback(returnCode, "");
            else {
                var x = [0], y = [0], z = [0];
                var avp = that.m_iWhizApi.m_WebApp.viewer.activeViewport;

                x[0] = leftTop.x; y[0] = leftTop.y; z[0] = 0;
                // that.dwgToClient(x, y, z);
                x0 = x[0]; y0 = y[0];
                x[0] = bottomRight.x; y[0] = bottomRight.y; z[0] = 0;
                // that.dwgToClient(x, y, z);
                x1 = x[0]; y1 = y[0];

                var selected = "";
                //var selectMode;            
                //selectMode = that.m_WebApp.tlib.Select.Crossing;

                //if (x0 == x1 && y0 == y1) {
                //    selectMode = that.m_WebApp.tlib.Select.Point;
                //    coord = [x1, y1];
                //} else {
                //    coord = [x0, y0, x1, y1];
                //    if (x1 < x0) {
                //        selectMode = that.m_WebApp.tlib.Select.Crossing;
                //    }
                //}

                // var selectedArray = [];
                // avp.select([x0, y0, x1, y1], selectMode);
                //// that.m_WebApp.update();
                // var selectedArray = avp.getSelected();

                // selectedArray = selectedArray.filter(function (elem, index, self) {
                //     return (index == self.indexOf(elem)) && (elem != 0);
                // });


                // for (i = 0; i < selectedArray.length; i++)
                //     selected += selectedArray[i] + that.m_RowDelimiter;

                // that.m_WebApp.selected = selected;

                // if (selected == "") {
                //     callback(37, "");
                // }
                // else 
                {
                    selected = x0 + that.m_ColumnDelimiter + y0 + that.m_RowDelimiter;
                    selected += x1 + that.m_ColumnDelimiter + y1 + that.m_RowDelimiter;
                    //function to get filtered handles with layer and type id
                    that.getEntities(layername, selected, typeid, false, function (retCode, entityHandles) {

                        if (retCode != 0)
                            callback(retCode, "");
                        else {
                            callback(retCode, entityHandles);   //returns selected handles
                        }
                    });
                }
            }
        });
    },
    this.getEntitiesWithRegion = function (layername, leftTop, bottomRight, typeid, callback) {
        if (!this.m_OpenFlag) {
            callback(iWhizError.NOT_OPEND);
            return;
        }
        var x = [0], y = [0], z = [0];
        var avp = this.m_iWhizApi.m_WebApp.viewer.activeViewport;

        x[0] = leftTop.x; y[0] = leftTop.y; z[0] = 0;
        // this.dwgToClient(x, y, z);
        x0 = x[0]; y0 = y[0];
        x[0] = bottomRight.x; y[0] = bottomRight.y; z[0] = 0;
        //  this.dwgToClient(x, y, z);
        x1 = x[0]; y1 = y[0];

        var selected = "";
        //var selectMode;
        //selectMode = that.m_WebApp.tlib.Select.Crossing;

        //var selectedArray = [];
        //avp.select([x0, y0, x1, y1], selectMode);
        //var selectedArray = avp.getSelected();
        //selectedArray = selectedArray.filter(function (elem, index, self) {
        //    return (index == self.indexOf(elem)) && (elem != 0);
        //});

        //for (i = 0; i < selectedArray.length; i++)
        //    selected += selectedArray[i] + that.m_RowDelimiter;

        //that.m_WebApp.selected = selected;
        //if (selected == "") {
        //    callback(37, "");
        //}
        //else 
        {
            selected = x0 + that.m_ColumnDelimiter + y0 + that.m_RowDelimiter;
            selected += x1 + that.m_ColumnDelimiter + y1 + that.m_RowDelimiter;
            //function to get filtered handles with layer and type id
            this.getEntitiesWithMultipleTypes(layername, selected, typeid, false, function (retCode, entityHandles) {

                if (retCode != 0)
                    callback(retCode, "");
                else {
                    callback(retCode, entityHandles);   //returns selected handles
                }
            });
        }

    },
    this.selectPolylinesByWindow = function (layername, callback) {
        if (!this.m_OpenFlag) {
            callback(iWhizError.NOT_OPEND);
            return;
        }
        var that = this;
        this.getRectangle(function (returnCode, leftTop, bottomRight) {
            if (returnCode != 0)
                callback(returnCode, "");
            else {
                var x = [0], y = [0], z = [0];
                var avp = that.m_iWhizApi.m_WebApp.viewer.activeViewport;

                x[0] = leftTop.x; y[0] = leftTop.y; z[0] = 0;
                //  that.dwgToClient(x, y, z);
                x0 = x[0]; y0 = y[0];
                x[0] = bottomRight.x; y[0] = bottomRight.y; z[0] = 0;
                //  that.dwgToClient(x, y, z);
                x1 = x[0]; y1 = y[0];

                var selected = "";
                //var selectMode;
                //selectMode = that.m_WebApp.tlib.Select.Crossing;

                //var selectedArray = [];
                //avp.select([x0, y0, x1, y1], selectMode);
                //var selectedArray = avp.getSelected();
                //selectedArray = selectedArray.filter(function (elem, index, self) {
                //    return (index == self.indexOf(elem)) && (elem != 0);
                //});

                //for (i = 0; i < selectedArray.length; i++)
                //    selected += selectedArray[i] + that.m_RowDelimiter;

                //that.m_WebApp.selected = selected;

                //if (selected == "") {
                //    callback(37, "");
                //}
                //else 
                {
                    selected = x0 + that.m_ColumnDelimiter + y0 + that.m_RowDelimiter;
                    selected += x1 + that.m_ColumnDelimiter + y1 + that.m_RowDelimiter;
                    //function to get filtered handles with layer and type id
                    that.getEntities(layername, selected, 9, false, function (retCode, entityHandles) {

                        if (retCode != 0)
                            callback(retCode, "");
                        else {
                            callback(retCode, entityHandles);   //returns selected handles
                        }
                    });
                }
            }
        });
    },
    //selectEntities,callback---------                      --------
    //                                                             -
    //                               -                             -
    //                               --------  getSelection,callback---------                       --------
    //                                                                      -                              -
    //                                                                      -                              -
    //                                                                      -------- selectEntities,callback---------          ----
    //                                                                                                              -             -
    //                                                                                                              ---------------
    this.selectEntities = function (layername, typeid, cursorindex, iswindow, isstart, callback) {
        if (!this.m_OpenFlag) {
            callback(iWhizError.NOT_OPEND);
            return;
        }

        //this.resetMouseModeAndCursor(99, cursorindex);   // to save previous cursor (zoom window or other functions)
        this.setCursor(cursorindex, true);

        var that = this;
        this.m_WaitMode = true;
        //function to select handles from client
        this.getSelection(iswindow, function (returnCode, entityhandles, singleClick) {
            if (returnCode == 12 || returnCode == 8) {
                callback(returnCode);
                return;
            }
            if (entityhandles != "") {
                //function to get filtered handles with layer and type id
                that.getEntities(layername, entityhandles, typeid, true, function (retCode, selentityHandles) {

                    var selectedArray = selentityHandles.split(that.m_RowDelimiter);
                    selentityHandles = "";
                    for (var i = 0; i < selectedArray.length; i++) {
                        if (selectedArray[i] != "") {
                            var curindex = that.m_SelHandleArray.indexOf(selectedArray[i])
                            if (curindex != -1 && singleClick)  //removes already selected handles on single click
                            {
                                //that.m_iWhizApi.deHighlightEntity(selectedArray[i], function (res) { });
                                that.m_iWhizApi.m_Entity.highlightEntity(selectedArray[i], false);
                                that.m_SelHandleArray.splice(curindex, 1);
                            }
                            else {
                                selentityHandles += selectedArray[i] + that.m_RowDelimiter;
                            }
                        }
                    }
                    if (retCode == 0 || retCode == 37) {
                        that.repeatSelection(that, selentityHandles, layername, typeid, cursorindex, iswindow, isstart, callback);
                    }
                    else {
                        //   that.restoreMouseModeAndCursor(true);
                        callback(retCode);
                    }
                });
            }
            else//continue selection
                that.repeatSelection(that, "", layername, typeid, cursorindex, iswindow, isstart, callback);
        });
    },
    this.repeatSelection = function (that, selentityHandles, layername, typeid, cursorindex, iswindow, isstart, callback) {
        //if handles selected append to selected handles and highlight
        if (selentityHandles != "" && selentityHandles != null) {
            var handleArray = selentityHandles.split(that.m_RowDelimiter);

            for (var i = 0 ; i < handleArray.length - 1 ; i++) {
                if (that.m_WaitMode) {
                    if (that.m_SelHandleArray.indexOf(handleArray[i]) == -1) {
                        that.m_SelHandleArray.push(handleArray[i]);
                        that.m_Entity.highlightEntity(handleArray[i], true);
                    }
                }
            }
            that.regenerate();
        }
        if (that.m_WaitMode) //check wait mode for repeating selection in recursive mode
            that.selectEntities(layername, typeid, cursorindex, iswindow, false, function (retCode) {
                if (isstart) {//return results back on reaching the first call back
                    //that.m_WebApp.clearSelection();

                    // that.m_iWhizApi.deHighlightEntities(function (res) {
                    var handles = "";
                    for (var i = 0; i < that.m_SelHandleArray.length; i++) {
                        handles += that.m_SelHandleArray[i] + that.m_RowDelimiter;
                        that.m_iWhizApi.m_Entity.highlightEntity(that.m_SelHandleArray[i], false);
                    }
                    that.m_SelHandleArray = [0];
                    if (handles == "") {
                        //that.restoreMouseModeAndCursor(true);
                        callback(37, handles);
                    }
                    else {
                        // that.restoreMouseModeAndCursor(true);
                        callback(0, handles);
                    }
                    // });
                }
                else {
                    //that.restoreMouseModeAndCursor(true);
                    callback(retCode);
                }
            });
        else {
            if (that.m_SelHandleArray.length == 0) {
                // that.restoreMouseModeAndCursor(true);
                callback(37);
            }
            else {
                //  that.restoreMouseModeAndCursor(true);
                callback(0);
            }
        }
    },
    this.selectEntitiesByTypes = function (layername, typeid, cursorindex, iswindow, isstart, callback) {
        if (!this.m_OpenFlag) {
            callback(iWhizError.NOT_OPEND);
            return;
        }

        //this.resetMouseModeAndCursor(99, cursorindex);   // to save previous cursor (zoom window or other functions)
        this.setCursor(cursorindex, true);

        var that = this;
        this.m_WaitMode = true;
        //function to select handles from client
        this.getSelection(iswindow, function (returnCode, entityhandles) {
            if (returnCode == 12 || returnCode == 8) {
                callback(returnCode);
                return;
            }
            if (entityhandles != "") {
                //function to get filtered handles with layer and type id
                that.getEntitiesWithMultipleTypes(layername, entityhandles, typeid, true, function (retCode, selentityHandles) {
                    if (retCode == 0 || retCode == 37) {
                        that.repeatSelectionWithMultipleTypes(that, selentityHandles, layername, typeid, cursorindex, iswindow, isstart, callback);
                    }
                    else {
                        // that.restoreMouseModeAndCursor(true);
                        callback(retCode);
                    }
                });
            }
            else//continue selection
                that.repeatSelectionWithMultipleTypes(that, "", layername, typeid, cursorindex, iswindow, isstart, callback);
        });
    },
    this.repeatSelectionWithMultipleTypes = function (that, selentityHandles, layername, typeid, cursorindex, iswindow, isstart, callback) {
        //if handles selected append to selected handles and highlight
        if (selentityHandles != "" && selentityHandles != null) {
            var handleArray = selentityHandles.split(that.m_RowDelimiter);

            for (var i = 0; i < handleArray.length - 1; i++) {
                if (that.m_WaitMode) {
                    if (that.m_SelHandleArray.indexOf(handleArray[i]) == -1) {
                        that.m_SelHandleArray.push(handleArray[i]);
                        that.m_iWhizApi.m_Entity.highlightEntity(handleArray[i], true);
                    }
                }
            }
            that.regenerate();
        }
        if (that.m_WaitMode) //check wait mode for repeating selection in recursive mode
            that.selectEntitiesByTypes(layername, typeid, cursorindex, iswindow, false, function (retCode) {
                if (isstart) {//return results back on reaching the first call back
                    // that.m_WebApp.clearSelection();
                    //  that.m_iWhizApi.deHighlightEntities(function (res) {
                    var handles = "";
                    for (var i = 0; i < that.m_SelHandleArray.length; i++) {
                        handles += that.m_SelHandleArray[i] + that.m_RowDelimiter;
                        that.m_iWhizApi.m_Entity.highlightEntity(that.m_SelHandleArray[i], false);
                    }
                    that.m_SelHandleArray = [0];
                    if (handles == "") {
                        //that.restoreMouseModeAndCursor(true);
                        callback(37, handles);
                    }
                    else {
                        //  that.restoreMouseModeAndCursor(true);
                        callback(0, handles);
                    }
                    //   });
                }
                else {
                    //  that.restoreMouseModeAndCursor(true);
                    callback(retCode);
                }
            });
        else {
            if (that.m_SelHandleArray.length == 0) {
                //that.restoreMouseModeAndCursor(true);
                callback(37);
            }
            else {
                // that.restoreMouseModeAndCursor(true);
                callback(0);
            }
        }
    },
    this.selectSymbols = function (iswindow, isstart, hatchlayername, color, angle, scale, patternid, callback) {
        if (!this.m_OpenFlag) {
            callback(iWhizError.NOT_OPEND);
            return;
        }

        var that = this;
        this.m_WaitMode = true;
        //function to select handles from client
        this.getSymbolSelection(iswindow, function (retCode, entityhandles) {
            if (retCode == 12 || retCode == 8) {
                callback(retCode);
                return;
            }
            if (entityhandles != "" && retCode == 0) {
                //function to get filtered handles with layer and type id
                that.repeatSymbolSelection(that, entityhandles, iswindow, isstart, hatchlayername, color, angle, scale, patternid, callback);
            }
            else//continue selection
                that.repeatSymbolSelection(that, "", iswindow, isstart, hatchlayername, color, angle, scale, patternid, callback);
        });
    },
    this.selectSymbolsByWindow = function (callback) {
        if (!this.m_OpenFlag) {
            callback(iWhizError.NOT_OPEND);
            return;
        }
        var that = this;
        this.getRectangle(function (retCode, leftTop, bottomRight) {
            if (retCode != 0) {
                callback(retCode, "");
                return;
            }
            var x = [0], y = [0], z = [0];
            var avp = that.m_iWhizApi.m_WebApp.viewer.activeViewport;

            x[0] = leftTop.x; y[0] = leftTop.y; z[0] = 0;
            //that.dwgToClient(x, y, z);
            x0 = x[0]; y0 = y[0];
            x[0] = bottomRight.x; y[0] = bottomRight.y; z[0] = 0;
            // that.dwgToClient(x, y, z);
            x1 = x[0]; y1 = y[0];

            var selected = "";
            //var selectMode;
            //selectMode = that.m_WebApp.tlib.Select.Crossing;

            //var selectedArray = [];
            //avp.select([x0, y0, x1, y1], selectMode);
            //// that.m_WebApp.update();
            //var selectedArray = avp.getSelected();
            //selectedArray = selectedArray.filter(function (elem, index, self) {
            //    return (index == self.indexOf(elem)) && (elem != 0);
            //});

            //for (i = 0; i < selectedArray.length; i++)
            //    selected += selectedArray[i] + that.m_RowDelimiter;

            //that.m_WebApp.selected = selected;

            selected = x0 + that.m_ColumnDelimiter + y0 + that.m_RowDelimiter;
            selected += x1 + that.m_ColumnDelimiter + y1 + that.m_RowDelimiter;

            //function to get filtered handles with layer and type id
            that.getSymbols(selected, false, function (retCode, entityHandles) {
                var result = that.m_iWhizApi.getSymbolWithDWGPoint(leftTop.x, leftTop.y, true, function (retCode, selectedHandle) {
                    if (retCode == 0) {
                        entityHandles += selectedHandle + that.m_RowDelimiter;
                        callback(retCode, entityHandles);
                    }
                    else {
                        if (entityHandles == "")
                            callback(retCode, "");
                        else
                            callback(0, entityHandles);
                    }

                });
            });

        });
    },

    this.selectHandles = function (isspace, iswindow, isstart, hatchlayername, color, angle, scale, patternid, callback) {
        if (!this.m_OpenFlag) {
            callback(iWhizError.NOT_OPEND);
            return;
        }

        var that = this;
        this.m_WaitMode = true;
        //function to select handles from client
        this.getHandleSelection(isspace, iswindow, function (retCode, entityhandles) {
            if (entityhandles != "" && retCode == 0) {
                //function to get filtered handles with layer and type id
                that.repeatHandleSelection(that, entityhandles, isspace, iswindow, isstart, hatchlayername, color, angle, scale, patternid, callback);
            }
            else//continue selection
                that.repeatHandleSelection(that, "", isspace, iswindow, isstart, hatchlayername, color, angle, scale, patternid, callback);
        });
    },
    this.selectHandlesByWindow = function (isspace, callback) {
        if (!this.m_OpenFlag) {
            callback(iWhizError.NOT_OPEND);
            return;
        }
        var that = this;
        this.getRectangle(function (retCode, leftTop, bottomRight) {
            if (retCode != 0) {
                callback(retCode, "");
                return;
            }

            var x = [0], y = [0], z = [0];
            var avp = that.m_iWhizApi.m_WebApp.viewer.activeViewport;

            x[0] = leftTop.x; y[0] = leftTop.y; z[0] = 0;
            //that.dwgToClient(x, y, z);
            x0 = x[0]; y0 = y[0];
            x[0] = bottomRight.x; y[0] = bottomRight.y; z[0] = 0;
            //  that.dwgToClient(x, y, z);
            x1 = x[0]; y1 = y[0];

            var selected = "";
            //var selectMode;
            //selectMode = that.m_WebApp.tlib.Select.Crossing;

            //var selectedArray = [];
            //avp.select([x0, y0, x1, y1], selectMode);
            //var selectedArray = avp.getSelected();
            //selectedArray = selectedArray.filter(function (elem, index, self) {
            //    return (index == self.indexOf(elem)) && (elem != 0);
            //});

            //selectedArray = selectedArray.filter(function (elem, index, self) {
            //    return index == self.indexOf(elem);
            //});

            //for (i = 0; i < selectedArray.length; i++)
            //    selected += selectedArray[i] + that.m_RowDelimiter;

            //that.m_WebApp.selected = selected;

            selected = x0 + that.m_ColumnDelimiter + y0 + that.m_RowDelimiter;
            selected += x1 + that.m_ColumnDelimiter + y1 + that.m_RowDelimiter;
            //function to get filtered handles with layer and type id
            that.getHandles(selected, isspace, function (retCode, entityHandles) {
                var result = that.m_iWhizApi.getHandleWithDWGPoint(leftTop.x, leftTop.y, isspace, function (retCode, selectedHandle) {
                    if (retCode == 0) {
                        entityHandles += selectedHandle + that.m_RowDelimiter;
                        callback(retCode, entityHandles);
                    }
                    else {
                        if (entityHandles == "")
                            callback(retCode, "");
                        else
                            callback(0, entityHandles);
                    }

                });
            });

        });
    },

    this.hatchEntitites = function (hatchlayername, autoCadColor, angle, scale, patternid, selectntityHandlesArray, index, callback) {
        var that = this;
        var entityHandles = "";
        for (var item in selectntityHandlesArray) {
            if (selectntityHandlesArray[item] != "") {
                entityHandles += selectntityHandlesArray[item] + that.m_RowDelimiter;
                that.m_HatchMap[selectntityHandlesArray[item]] = 0;
            }
        }
        if (entityHandles == "")
            callback();
        else {
            this.m_iWhizApi.hatchEntity(hatchlayername, entityHandles, autoCadColor, angle, scale, patternid, false, function (retCode, hatchHandles) {
                if (hatchHandles)
                {
                    var hatchHandleArray = hatchHandles.split(that.m_RowDelimiter);
                    for (var item in hatchHandleArray) {
                        if (hatchHandleArray[item] != "") {
                            that.m_HatchMap[selectntityHandlesArray[item]] = hatchHandleArray[item];
                        }
                    }
                    callback();
                }
                else
                {
                   // that.m_HatchMap[selectntityHandlesArray[item]] = 0;
                    callback();
                }
            });

        }
        //if (selectntityHandlesArray[index] != "") {
        //    var that = this;
        //    this.m_iWhizApi.hatchEntity(hatchlayername, selectntityHandlesArray[index], autoCadColor, angle, scale, patternid, false, function (retCode, hatchHandle) {
        //        that.m_HatchMap[selectntityHandlesArray[index]] = hatchHandle;
        //        ++index;
        //        if (index == selectntityHandlesArray.length)
        //            callback();
        //        else {
        //            that.hatchEntitites(hatchlayername, autoCadColor, angle, scale, patternid, selectntityHandlesArray, index, callback);
        //        }
        //    });
        //}
        //else
        //    callback();
    },
    //this.hatchEntitiesHandler = function (hatchlayername, autoCadColor, angle, scale, patternid, handleArray, splitCount, callback)
    //{
    //    var that = this;
    //    var tempArray = handleArray;
    //    if (handleArray.length > splitCount)
    //        tempArray = handleArray.slice(0, splitCount);

    //    var entityHandles = "";
    //    for (item in tempArray) {
    //        if (tempArray[item] != "") {
    //            entityHandles += tempArray[item] + that.m_RowDelimiter;
    //        }
    //    }
    //    this.m_iWhizApi.hatchEntity(hatchlayername, entityHandles, autoCadColor, angle, scale, patternid, false, function (retCode, hatchHandles) {
    //        var hatchHandleArray = hatchHandles.split(that.m_RowDelimiter);
    //        for (item in hatchHandleArray) {
    //            if (hatchHandleArray[item] != "") {
    //                that.m_HatchMap[handleArray[item]] = hatchHandleArray[item];
    //            }
    //        }
    //        handleArray = handleArray.slice(splitCount, handleArray.length);
    //        if (handleArray.length > 0)
    //            that.hatchEntitiesHandler(hatchlayername, autoCadColor, angle, scale, patternid, handleArray, splitCount, callback);
    //        else
    //            callback();
    //    });
    //},
    this.repeatHandleSelection = function (that, selentityHandles, isspace, iswindow, isstart, hatchlayername, autoCadColor, angle, scale, patternid, callback) {
        var that = this;
        this.hatchEntitites(hatchlayername, autoCadColor, angle, scale, patternid, selentityHandles.split(that.m_RowDelimiter), 0, function () {
            //if handles selected append to selected handles and highlight      
            if (selentityHandles != "" && selentityHandles != null) {
                var handleArray = selentityHandles.split(that.m_RowDelimiter);

                for (var i = 0 ; i < handleArray.length ; i++) {
                    if (that.m_WaitMode && handleArray[i] != "") {
                        if (that.m_SelHandleArray.indexOf(handleArray[i]) == -1) {
                            that.m_SelHandleArray.push(handleArray[i]);
                            // that.m_Entity.highlightEntity(handleArray[i], true);

                        }
                    }
                }
                that.regenerate();
            }
            if (that.m_WaitMode) //check wait mode for repeating selection in recursive mode
                that.selectHandles(isspace, iswindow, false, hatchlayername, autoCadColor, angle, scale, patternid, function (retCode) {
                    if (isstart) {//return results back on reaching the first call back
                        // that.m_WebApp.clearSelection();
                        var handles = "";
                        for (var i = 0; i < that.m_SelHandleArray.length; i++)
                            handles += that.m_SelHandleArray[i] + that.m_RowDelimiter;
                        that.m_SelHandleArray = [0];
                        that.m_HatchMap = [0];
                        if (handles == "")
                            callback(37, handles);
                        else
                            callback(0, handles);
                    }
                    else {
                        callback(retCode);
                    }
                });
            else {
                if (that.m_SelHandleArray.length == 0)
                    callback(37);
                else
                    callback(0);
            }
        });
    },
    this.getHandleSelection = function (isspace, iswindow, callback) {
        var avp = this.m_iWhizApi.m_WebApp.viewer.activeViewport;
        var x0, y0, x1, y1;
        var that = this;
        if (!iswindow) {//single selection
            this.getClientPoint(function (retCode, x, y) {
                if (retCode == 0) {
                    var result = that.m_iWhizApi.getHandleWithClientPoint(x, y, isspace, function (retCode, selectedHandle) {
                        var curindex = that.m_SelHandleArray.indexOf(selectedHandle)
                        if (curindex != -1 && that.m_SelHandleArray.length != 0)  //removes already selected handles on single click
                        {
                            //that.m_Entity.highlightEntity(selectedHandle, false);
                            if (that.m_HatchMap[selectedHandle] != 0)
                            {
                                that.m_iWhizApi.deleteEntity(that.m_HatchMap[selectedHandle], function (retcode) {
                                    that.m_HatchMap[selectedHandle] = null;
                                    that.regenerate();
                                    that.m_SelHandleArray.splice(curindex, 1);                                   
                                });
                            }
                            else
                            {
                                that.m_iWhizApi.removeMapsByHandle(selectedHandle + that.m_RowDelimiter);
                                that.m_HatchMap[selectedHandle] = null;
                                that.m_SelHandleArray.splice(curindex, 1);
                                that.regenerate();
                            }
                            callback(37, "");
                        }
                        else
                            callback(retCode, selectedHandle);
                    });
                }
                else
                    callback(retCode, "");
            });
        }
        else {//multiple selection
            this.getRectangle(function (retCode, leftTop, bottomRight) {
                if (retCode == 8) {
                    callback(retCode, "");
                }
                else {
                    var singleclick = false;
                    if (leftTop.x == bottomRight.x && leftTop.y == bottomRight.y)//single click
                    {
                        var result = that.m_iWhizApi.getHandleWithDWGPoint(leftTop.x, leftTop.y, isspace, function (retCode, selectedHandle) {
                            var curindex = that.m_SelHandleArray.indexOf(selectedHandle)
                            if (curindex != -1 && that.m_SelHandleArray.length != 0)  //removes already selected handles on single click
                            {
                                if (that.m_HatchMap[selectedHandle] != 0) {
                                    that.m_iWhizApi.deleteEntity(that.m_HatchMap[selectedHandle], function (retcode) {
                                        that.m_HatchMap[selectedHandle] = null;
                                        that.regenerate();
                                        that.m_SelHandleArray.splice(curindex, 1);                                        
                                    });
                                }
                                else {
                                    that.m_iWhizApi.removeMapsByHandle(selectedHandle + that.m_RowDelimiter);
                                    that.m_HatchMap[selectedHandle] = null;
                                    that.m_SelHandleArray.splice(curindex, 1);
                                    that.regenerate();
                                }
                                callback(37, "");
                            }
                            else
                                callback(retCode, selectedHandle);
                        });
                    }
                    else {
                        var selected = "";
                        var x = [0], y = [0], z = [0];
                        x[0] = leftTop.x; y[0] = leftTop.y; z[0] = 0;
                        //that.dwgToClient(x, y, z);
                        x0 = x[0]; y0 = y[0];
                        x[0] = bottomRight.x; y[0] = bottomRight.y; z[0] = 0;
                        // that.dwgToClient(x, y, z);
                        x1 = x[0]; y1 = y[0];

                        //var selectMode;
                        //selectMode = that.m_WebApp.tlib.Select.Crossing;

                        //var selectedArray = [];
                        //avp.select([x0, y0, x1, y1], selectMode);
                        //var selectedArray = avp.getSelected();
                        //selectedArray = selectedArray.filter(function (elem, index, self) {
                        //    return (index == self.indexOf(elem)) && (elem != 0);
                        //});


                        //for (i = 0; i < selectedArray.length; i++)
                        //    selected += selectedArray[i] + that.m_RowDelimiter;

                        selected = x0 + that.m_ColumnDelimiter + y0 + that.m_RowDelimiter;
                        selected += x1 + that.m_ColumnDelimiter + y1 + that.m_RowDelimiter;

                        that.getHandles(selected, isspace, function (retCode, selentityHandles) {
                            var tempArray = selentityHandles.split(that.m_RowDelimiter);
                            var selectedHandles = "";
                            for (var item in tempArray) {
                                if (tempArray[item] != "") {
                                    if (that.m_SelHandleArray.indexOf(tempArray[item]) == -1) {
                                        selectedHandles += tempArray[item] + that.m_RowDelimiter;
                                    }
                                }
                            }
                            callback(retCode, selectedHandles);
                        });
                    }
                }
            });
        }
    },
    this.repeatSymbolSelection = function (that, selentityHandles, iswindow, isstart, hatchlayername, autoCadColor, angle, scale, patternid, callback) {
        var that = this;
        this.hatchEntitites(hatchlayername, autoCadColor, angle, scale, patternid, selentityHandles.split(that.m_RowDelimiter), 0, function () {
            //if handles selected append to selected handles and highlight
            if (selentityHandles != "" && selentityHandles != null) {
                var handleArray = selentityHandles.split(that.m_RowDelimiter);

                for (var i = 0 ; i < handleArray.length ; i++) {
                    if (that.m_WaitMode && handleArray[i] != "") {
                        if (that.m_SelHandleArray.indexOf(handleArray[i]) == -1) {
                            that.m_SelHandleArray.push(handleArray[i]);
                            //that.m_Entity.highlightEntity(handleArray[i], true);
                        }
                    }
                }
                that.regenerate();
            }
            if (that.m_WaitMode) //check wait mode for repeating selection in recursive mode
                that.selectSymbols(iswindow, false, hatchlayername, autoCadColor, angle, scale, patternid, function (retCode) {
                    if (isstart) {//return results back on reaching the first call back
                        that.m_iWhizApi.m_WebApp.clearSelection();
                        //that.m_iWhizApi.deHighlightEntities(function (res) {
                        var handles = "";
                        for (var i = 0; i < that.m_SelHandleArray.length; i++) {
                            handles += that.m_SelHandleArray[i] + that.m_RowDelimiter;
                            //that.m_Entity.highlightEntity(that.m_SelHandleArray[i], false);
                        }
                        that.m_SelHandleArray = [0];
                        that.m_HatchMap = [0];
                        if (handles == "")
                            callback(37, handles);
                        else
                            callback(0, handles);
                        // });
                    }
                    else {
                        callback(retCode);
                    }
                });
            else {
                if (that.m_SelHandleArray.length == 0)
                    callback(37);
                else
                    callback(0);
            }
        });
    },
    this.getSymbolSelection = function (iswindow, callback) {
        var avp = this.m_iWhizApi.m_WebApp.viewer.activeViewport;
        var x0, y0, x1, y1;
        var that = this;
        if (!iswindow) {//single selection
            this.getClientPoint(function (retCode, x, y) {
                if (retCode == 0) {
                    var result = that.m_iWhizApi.getSymbolWithClientPoint(x, y, true, function (retCode, selectedHandle) {
                        var curindex = that.m_SelHandleArray.indexOf(selectedHandle)
                        if (curindex != -1 && that.m_SelHandleArray.length != 0)  //removes already selected handles on single click
                        {
                            // that.m_Entity.highlightEntity(selectedHandle, false);                           
                            if (that.m_HatchMap[selectedHandle] != 0) {
                                that.m_iWhizApi.deleteEntity(that.m_HatchMap[selectedHandle], function (retcode) {
                                    that.m_HatchMap[selectedHandle] = null;
                                    // that.m_iWhizApi.deHighlightEntity(selectedHandle, function (res) {
                                    that.m_SelHandleArray.splice(curindex, 1);
                                    that.regenerate();
                                });
                            }
                            else {
                                that.m_iWhizApi.removeMapsByHandle(selectedHandle + that.m_RowDelimiter);
                                that.m_HatchMap[selectedHandle] = null;
                                that.m_SelHandleArray.splice(curindex, 1);
                                that.regenerate();
                            }
                            callback(37, "");
                        }
                        else
                            callback(retCode, selectedHandle);
                    });
                }
                else
                    callback(retCode, "");
            });
        }
        else {//multiple selection
            this.getRectangle(function (returnCode, leftTop, bottomRight) {

                if (returnCode == 0 || returnCode == 61) {
                    var singleclick = false;
                    if (leftTop.x == bottomRight.x && leftTop.y == bottomRight.y)//single click
                    {
                        var result = that.m_iWhizApi.getSymbolWithDWGPoint(leftTop.x, leftTop.y, true, function (retCode, selectedHandle) {
                            var curindex = that.m_SelHandleArray.indexOf(selectedHandle)
                            if (curindex != -1 && that.m_SelHandleArray.length != 0)  //removes already selected handles on single click
                            {
                                // that.m_Entity.highlightEntity(selectedHandle, false);                               
                                if (that.m_HatchMap[selectedHandle] != 0) {
                                    that.m_iWhizApi.deleteEntity(that.m_HatchMap[selectedHandle], function (retcode) {
                                        that.m_HatchMap[selectedHandle] = null;
                                        // that.m_iWhizApi.deHighlightEntity(selectedHandle, function (res) {
                                        that.m_SelHandleArray.splice(curindex, 1);
                                        that.regenerate();
                                    });
                                }
                                else {
                                    that.m_iWhizApi.removeMapsByHandle(selectedHandle + that.m_RowDelimiter);
                                    that.m_HatchMap[selectedHandle] = null;
                                    that.m_SelHandleArray.splice(curindex, 1);
                                    that.regenerate();
                                }
                                callback(37, "");
                            }
                            else
                                callback(retCode, selectedHandle);
                        });
                    }
                    else {
                        var selected = "";
                        var x = [0], y = [0], z = [0];
                        x[0] = leftTop.x; y[0] = leftTop.y; z[0] = 0;
                        //that.dwgToClient(x, y, z);
                        x0 = x[0]; y0 = y[0];
                        x[0] = bottomRight.x; y[0] = bottomRight.y; z[0] = 0;
                        //that.dwgToClient(x, y, z);
                        x1 = x[0]; y1 = y[0];

                        //var selectMode;
                        //selectMode = that.m_WebApp.tlib.Select.Crossing;

                        //var selectedArray = [];
                        //avp.select([x0, y0, x1, y1], selectMode);
                        //var selectedArray = avp.getSelected();
                        //selectedArray = selectedArray.filter(function (elem, index, self) {
                        //    return (index == self.indexOf(elem)) && (elem != 0);
                        //});

                        //for (i = 0; i < selectedArray.length; i++)
                        //    selected += selectedArray[i] + that.m_RowDelimiter;


                        selected = x0 + that.m_ColumnDelimiter + y0 + that.m_RowDelimiter;
                        selected += x1 + that.m_ColumnDelimiter + y1 + that.m_RowDelimiter;
                        that.getSymbols(selected, true, function (retCode, selentityHandles) {
                            var tempArray = selentityHandles.split(that.m_RowDelimiter);
                            var selectedHandles = "";
                            for (var item in tempArray) {
                                if (tempArray[item] != "") {
                                    if (that.m_SelHandleArray.indexOf(tempArray[item]) == -1) {
                                        selectedHandles += tempArray[item] + that.m_RowDelimiter;
                                    }
                                }
                            }
                            callback(retCode, selectedHandles);
                        });
                    }
                }
                else
                    callback(returnCode, "");
            });
        }
    },
    this.getSelection = function (iswindow, callback) {
        var avp = this.m_iWhizApi.m_WebApp.viewer.activeViewport;
        var x0, y0, x1, y1;
        var that = this;
        if (!iswindow) {//single selection
            this.getClientPoint(function (retCode, x, y) {
                var selected = "";
                if (retCode == 0) {
                    x0 = x - 2; y0 = y - 2;
                    x1 = x + 2; y1 = y + 2;
                    var x = [0], y = [0]; z = [0];
                    x[0] = x0; y[0] = y0; z[0] = 0;
                    that.clientToDWG(x, y);
                    x0 = x[0]; y0 = y[0];
                    x[0] = x1; y[0] = y1;
                    that.clientToDWG(x, y);
                    x1 = x[0]; y1 = y[0];
                    //var selectMode;
                    //selectMode = that.m_WebApp.tlib.Select.Crossing;
                    //var selectedArray = [];

                    //avp.select([x0, y0, x1, y1], selectMode);
                    //// that.m_WebApp.update();
                    //var selectedArray = avp.getSelected();
                    //selectedArray = selectedArray.filter(function (elem, index, self) {
                    //    return (index == self.indexOf(elem)) && (elem != 0);
                    //});

                    //for (i = 0; i < selectedArray.length; i++)
                    //    selected += selectedArray[i] + that.m_RowDelimiter;

                    selected = x0 + that.m_ColumnDelimiter + y0 + that.m_RowDelimiter;
                    selected += x1 + that.m_ColumnDelimiter + y1 + that.m_RowDelimiter;
                    //that.m_WebApp.selected = selected;
                }
                callback(retCode, selected);
            });
        }
        else {//multiple selection
            this.getRectangle(function (returnCode, leftTop, bottomRight) {
                if (returnCode == 0 || returnCode == 61) {

                    var x = [0], y = [0], z = [0];

                    x[0] = leftTop.x; y[0] = leftTop.y; z[0] = 0;
                    // that.dwgToClient(x, y, z);
                    x0 = x[0]; y0 = y[0];

                    x[0] = bottomRight.x; y[0] = bottomRight.y; z[0] = 0;
                    //  that.dwgToClient(x, y, z);
                    x1 = x[0]; y1 = y[0];

                    var singleclick = false;
                    var selected = "";
                    if (x0 == x1 && y0 == y1)//single click
                    {
                        x[0] = x0; y[0] = y0;
                        that.dwgToClient(x, y, z);
                        x0 = x[0] - 2; y0 = y[0] - 2;
                        x[0] = x0; y[0] = y0;
                        that.clientToDWG(x, y, z);
                        x0 = x[0]; y0 = y[0];

                        x[0] = x1; y[0] = y1;
                        that.dwgToClient(x, y, z);
                        x1 = x[0] + 2; y1 = y[0] + 2;
                        x[0] = x1; y[0] = y1;
                        that.clientToDWG(x, y, z);
                        x1 = x[0]; y1 = y[0];

                        singleclick = true;
                    }

                    //var selectMode;
                    //selectMode = that.m_WebApp.tlib.Select.Crossing;

                    //var selectedArray = [];
                    //avp.select([x0, y0, x1, y1], selectMode);
                    // that.m_WebApp.update();
                    //var selectedArray = avp.getSelected();
                    //selectedArray = selectedArray.filter(function (elem, index, self) {
                    //    return (index == self.indexOf(elem)) && (elem != 0);
                    //});

                    //for (i = 0; i < selectedArray.length; i++)
                    //{
                    //    var curindex = that.m_SelHandleArray.indexOf(selectedArray[i])
                    //    if (curindex != -1 && singleclick)  //removes already selected handles on single click
                    //    {
                    //        //that.m_iWhizApi.deHighlightEntity(selectedArray[i], function (res) { });
                    //        that.m_Entity.highlightEntity(selectedArray[i], false);
                    //        that.m_SelHandleArray.splice(curindex, 1);
                    //    }
                    //    else
                    //    {
                    //        selected += selectedArray[i] + that.m_RowDelimiter;                            
                    //    }                            
                    //}                     
                    selected = x0 + that.m_ColumnDelimiter + y0 + that.m_RowDelimiter;
                    selected += x1 + that.m_ColumnDelimiter + y1 + that.m_RowDelimiter;
                    //  that.m_WebApp.selected = selected;

                }
                callback(returnCode, selected, singleclick);

            });
        }
    },
    this.getEntityWithClientPoint = function (layerName, typeId, xCoord, yCoord, cursorIndex, resCallback) {
        try {

            var x0, y0, x1, y1;
            if (cursorIndex == 12) {
                x0 = xCoord - 5; y0 = yCoord - 5;
                x1 = xCoord + 5; y1 = yCoord + 5;
            }
            else {
                x0 = xCoord - 2; y0 = yCoord - 2;
                x1 = xCoord + 2; y1 = yCoord + 2;
            }

            var avp = this.m_iWhizApi.m_WebApp.viewer.activeViewport;

            var selected = "";
            var x = [0], y = [0], z = [0];
            x[0] = x0; y[0] = y0; z[0] = 0;
            this.clientToDWG(x, y);
            x0 = x[0]; y0 = y[0];
            x[0] = x1; y[0] = y1; z[0] = 0;
            this.clientToDWG(x, y);
            x1 = x[0]; y1 = y[0];

            // var selectMode;
            // selectMode = m_iWhizApi.m_WebApp.tlib.Select.Crossing;

            //    var selectedArray = [];
            //    avp.select([x0, y0, x1, y1], selectMode);
            //    m_iWhizApi.m_WebApp.update();
            //    var selectedArray = avp.getSelected();
            //    selectedArray = selectedArray.filter(function (elem, index, self) {
            //        return (index == self.indexOf(elem)) && (elem != 0);
            //    });

            //    for (i = 0; i < selectedArray.length; i++)
            //        selected += selectedArray[i] + this.m_RowDelimiter;


            //if (selected == "")
            //    resCallback(37, "");
            //else 
            {
                selected = x0 + this.m_ColumnDelimiter + y0 + this.m_RowDelimiter;
                selected += x1 + this.m_ColumnDelimiter + y1 + this.m_RowDelimiter;

                this.getEntities(layerName, selected, typeId, false, function (retCode, entityHandles) {

                    if (retCode != 0)
                        resCallback(retCode, "");
                    else {
                        resCallback(retCode, entityHandles);   //returns selected handles
                    }
                });

            }
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },

    this.backupCurrentView = function (fieldWidth, fieldHeight, viewPosition) {
        try {
            fieldWidth[0] = this.m_iWhizApi.m_WebApp.getFieldWidth();
            fieldHeight[0] = this.m_iWhizApi.m_WebApp.getFieldHeight();
            viewPosition[0] = this.m_iWhizApi.m_WebApp.getViewPosition();
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.restoreCurrentView = function (fieldWidth, fieldHeight, viewPosition) {
        try {
            this.m_iWhizApi.m_WebApp.setFieldWidth(fieldWidth[0]);
            this.m_iWhizApi.m_WebApp.setFieldHeight(fieldHeight[0]);
            this.m_iWhizApi.m_WebApp.setViewPosition(viewPosition[0][0], viewPosition[0][1], viewPosition[0][2]);
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },

    /////////////////////////////////Post//////////////////////////////////////////////////
    this.getEntities = function (layername, entityHandles, typeid, isHighlight, resCallback) {
        try {
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + "/api/iWhiz/GetEntities",
                type: "Post",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, layername, entityHandles, typeid, isHighlight]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.EntityHandles)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            return 9;
        }
    },
    this.getEntitiesWithMultipleTypes = function (layername, entityHandles, typeid, isHighlight, resCallback) {
        try {
            $.ajax({

                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/GetEntitiesWithMultipleTypes',
                type: "Post",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, layername, entityHandles, typeid, isHighlight]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.EntityHandles)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            return 9;
        }
    },
    this.getSymbols = function (entityHandles, isHighlight, resCallback) {
        try {
            $.ajax({

                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/GetSymbols',
                type: "Post",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, entityHandles, isHighlight]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.EntityHandles)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            return 9;
        }
    },
    this.getHandles = function (entityHandles, isspace, resCallback) {
        try {
            $.ajax({

                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/GetHandles',
                type: "Post",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, entityHandles, isspace]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.EntityHandles)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            return 9;
        }
    }
};




