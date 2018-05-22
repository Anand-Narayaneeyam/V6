/////////////////////////////////////////////////////////////////////////////// 
// Copyright (C) 2002-2015, Open Design Alliance (the "Alliance"). 
// All rights reserved. 
// 
// This software and its documentation and related materials are owned by 
// the Alliance. The software may only be incorporated into application 
// programs owned by members of the Alliance, subject to a signed 
// Membership Agreement and Supplemental Software License Agreement with the
// Alliance. The structure and organization of this software are the valuable  
// trade secrets of the Alliance and its suppliers. The software is also 
// protected by copyright law and international treaty provisions. Application  
// programs incorporating this software must include the following statement 
// with their copyright notices:
//   
//   This application incorporates Teigha(R) software pursuant to a license 
//   agreement with Open Design Alliance.
//   Teigha(R) Copyright (C) 2002-2015 by Open Design Alliance. 
//   All rights reserved.
//
// By use of this software, its documentation or related materials, you 
// acknowledge and accept the above terms.
///////////////////////////////////////////////////////////////////////////////
WebApp = function (iWhizApi, tlib) {
    this.VS_2DWIREFRAME = 0;
    this.VS_3DWIREFRAME = 1;
    this.VS_HIDDENLINE = 2;
    this.VS_FLATSHADED = 3;
    this.VS_GOURAUDSHADED = 4;
    this.VS_SHADEDWITHWIREFRAME = 5;

    this.self = this;
    this.tlib = null;
    //this.self.tlib = this.tlib;
    this.tlib = tlib;
    this.self._lastAnimRequestId = null;

    this.m_Controller = null;
    this.m_StartPoint = null;
    this.stateStore = null;
    this.statets = [];
    this._needUpdate = false;
    this.m_iWhizApi = iWhizApi;

    this.init = function (canvas, w, h, controller) {
        this._exit = false;
        this.tlib.canvas = canvas;
        this.tlib.canvas.width = w || window.innerWidth;
        this.tlib.canvas.height = h || window.innerHeight;
        this.tlib.Viewer.initRender(canvas.width, canvas.height);//, false, true, true, false);
        this.activeViewId = 0;
        this.setController(controller);
        this.m_Controller.setNone();
        this._render();
    },
    this.clearViewer = function () {
        this.viewer = this.tlib.Viewer.create();
        this.highlightViewport(this.viewer.activeViewport);
        this.selFrame = '';
        this.frame = '';
        this.frameCoords = [0, 0, 0, 0];

        var canvasRect = this.tlib.canvas.getBoundingClientRect();
        this.resize(this.m_iWhizApi.m_Viewer.m_DomElement.width, this.m_iWhizApi.m_Viewer.m_DomElement.height);
        this.update();
    },
    this.addDrawing = function (data, isUpdate) {
        // if(!this.viewer)
        // this.viewer = this.tlib.Viewer.create();
        var time = new Date();
        this.addGsData(data, isUpdate);
        this.m_iWhizApi.openParsetime = new Date() - time;
    },
    this.addGsData = function (data, isUpdate) {
        var time1 = new Date();

        if (!this.viewer)
            this.clearViewer();
        //   this.viewer = this.tlib.Viewer.create();
        //console.log('Added drawing GS cache');

        data = new Uint8Array(data);
        var time = new Date();

        var err = this.viewer.parseBinary(data);

        var time = new Date() - time;
        var state = this.viewer.getStreamState();

       // if (data.length > 100000)
       //     console.log('Parsed ' + data.length + ' b in ' + time + ' ms');

        if (err != null) {

            err = 'Loading error: ' + err + '\nTry load another drawing';
            console.error(err);
            alert(err);
        }

        var updt = new Date();
        if (isUpdate) {
            this.update();
        }
        updt = new Date() - updt;
        switch (state) {
            case this.tlib.StreamState.Begin: {
                this.stateStore = {
                    tparse: time,
                    size: data.byteLength,
                    tupdate: updt
                }
            } break;

            case this.tlib.StreamState.None: {
                if (this.stateStore) {
                    this.stateStore.tparse += time;
                    this.stateStore.size += data.byteLength;
                    this.stateStore.tupdate += updt;
                }
            } break;

            case this.tlib.StreamState.End: {
                if (this.stateStore) {
                    this.stateStore.tparse += time;
                    this.stateStore.size += data.byteLength;
                    this.stateStore.tupdate += updt;
                  //  console.log("STATE:", this.stateStore);
                    this.statets.push(this.stateStore);
                }
            } break;
        }

        this.m_iWhizApi.dataParsetime = this.m_iWhizApi.dataParsetime + (new Date() - time1);
        // if (isUpdate)
        //   this.update();
    },
    this.dolly = function (dx, dy) {
        this.viewer.pan(dx, dy);
        this.update();
        this.m_iWhizApi.updateViewport(function () { });
    },

    this.orbit = function (dX, dY) {
        if (!this.viewer.activeViewport.overall) {
            this.viewer.orbit(dY, dX, 0);
            this.update();
            this.m_iWhizApi.updateViewport(function () { });
        }
    },

    this.zoom = function (factor, x, y) {
        this.viewer.zoomAt(factor, x, y);
        this.update();
        this.m_iWhizApi.updateViewport(function () { });
    },

    this.resize = function (w, h, isUpdate) {
        this.tlib.canvas.width = w;
        this.tlib.canvas.height = h;
        if (this.viewer)
            this.viewer.resize(0, w, h, 0);
        if (isUpdate)
            this.update();
        this.m_iWhizApi.updateViewport(function () { });
    },

    this.startSelection = function (x, y) {
        
        this.m_StartPoint = [x, y];
    },

    this.endSelection = function (x1, y1) {
        var viewer = this.viewer;
        var avp = viewer.activeViewport;
        avp.drawMetafile(this.selFrame, null);

        var x0 = this.m_StartPoint[0];
        var y0 = this.m_StartPoint[1];
        var flags = this.tlib.Select.Highlight;

        if (x0 == x1 && y0 == y1) {
            flags |= this.tlib.Select.PickOne;
            x0 -= 2; y0 -= 2;
            x1 += 2; y1 += 2;
        }
        else if (x0 > x1)
            flags |= this.tlib.Select.Crossing;

        delete (this.selected);
        avp.select(flags, [x0, y0, x1, y1], null);
        this.update();

    },

    this.updateSelection = function (x1, y1) {
        var x0 = this.m_StartPoint[0];
        var y0 = this.m_StartPoint[1];
        this.selFrame = this.viewer.activeViewport.drawMetafile(this.selFrame, function (draw) {
            var screen = draw.screen();
            screen.setColor(x0 > x1 ? [255, 0, 0] : [0, 255, 0]);
            screen.polyline([x0, y0, 0, x1, y0, 0, x1, y1, 0, x0, y1, 0, x0, y0, 0]);
        });
        this.update();
    },
    this.zoomWindow = function (pt0, pt1) {
        this.viewer.zoomWindow(pt0[0], pt0[1], pt1[0], pt1[1]);
        this.update();
        this.m_iWhizApi.updateViewport(function () { });
    },

    this.getSelectedHandles = function () {
        if (this.selected)
            return this.selected;
        var selected = [];
        this.viewer.activeViewport.select(
          this.tlib.Select.SkipUnhighlighted | this.tlib.Select.DbHandle, null,
          function (h) { selected.push(h) }
        );
        return this.selected = selected;
    },

    this.clearSelection = function () {
        // delete (this.selected);
        var viewer = this.viewer;
        var avp = viewer.activeViewport;
        var selected = avp.getSelected();
        for (var i = 0; i < selected.length; i++) {
            var met = this.viewer.getMetafile(selected[i]);
            if(met)
            met.highlighted = false;
        }
        avp.unselect();
        this.update();
    },

    this.update = function () {
        this._needUpdate = true;
    },

    this.setStatisticElement = function (name, style) {
        var elem = document.querySelector(name);
        if (elem) {
            var stats = new Stats();
            Object.keys(style).forEach(function (name) {
                stats.domElement.style[name] = style[name];
            })
            this.stats = stats;
            elem.appendChild(this.stats.domElement);
        }
        else
            console.warn('Cant find element:', name);
    },

    this.setController = function (controller) {
        this.m_Controller = controller;
    },

    this.controller = function () {
        return this.m_Controller;
    },

    this.setMetafileVisibilityByLayer = function (layerId, visible, isUpdate) {
        //if (this.viewer.isLlg)
        //    this.viewer.showLayer(layerId, visible);
        //else
        //    this.viewer.invertLayer(layerId);
        this.viewer.showLayer(layerId, visible);
        if (isUpdate)
            this.update();
    },
    this.getVersion = function () {
        return this.tlib.TghVersion;
    },

    this.getLayers = function () {
        return this.viewer.getLayers();
    },

    this.isLayerOn = function (handle) {
        return this._isLayerOn(handle);
    },

    this.setRenderMode = function (mode) {
        if (!this.viewer.activeViewport.overall) {
            this.viewer.activeViewport.renderMode = mode;
            this.update();
        }
    },

    this.renderMode = function () {
        return this.viewer.activeViewport.renderMode;
    },

    this.pickViewportId = function (x, y) {
        var v = this.viewer;
        v.activeViewport.borderWidth = 0;
        v.selectVport(x, y);
        this.highlightViewport(v.activeViewport);
    },

    this.highlightViewport = function (viewport) {
        if (!viewport.overall && this.viewer.viewports.lenght > 1)
            viewport.borderWidth = 3;
    },

    this.destroy = function () {
        this._exit = true; 
        //this.tlib.canvas = null;
        //this.tlib.Viewer.destroy();        
        //this.self = null;
    },
    this._render = function () {
        var time1 = new Date();
        if (!this._exit)
            this._lastAnimRequestId = requestAnimationFrame(this._render.bind(this));

        if (this.stats)
            this.stats.begin();
        //&& this.m_iWhizApi.m_iWhizApi.m_Viewer.m_DisplayFlag == true
        if (this._needUpdate || (this.viewer && this.viewer.isRuningAnimation())) {
            if (this.m_iWhizApi.m_Viewer.m_DisplayFlag == true) {
                this._needUpdate = false;

                this.m_Controller.render();

                //if (this.viewer && this.m_iWhizApi.m_Viewer.m_bIsDisplayTimer)   
                if (this.viewer)
                    this.viewer.update();
            }
        }
        if (this.stats)
            this.stats.end();
        this.m_iWhizApi.dataUpdatetime = this.m_iWhizApi.dataUpdatetime + (new Date() - time1);
    },   
    this.getFieldWidth = function () {
        return this.viewer.activeViewport.viewFieldWidth;
    },
    this.getFieldHeight = function () {
        return this.viewer.activeViewport.viewFieldHeight;
    },
    this.setFieldWidth = function (width) {
        this.viewer.activeViewport.viewFieldWidth = width;
    },
    this.setFieldHeight = function (height) {
        this.viewer.activeViewport.viewFieldHeight = height;
    },
    this.getViewPosition = function () {
        return this.viewer.activeViewport.viewPosition;
    },
    this.setViewPosition = function (a, b, c) {
        this.viewer.activeViewport.viewPosition = [a, b, c];
        this.viewer.activeViewport.viewTarget = [a, b, 0];
        return 0;
    },
    this.getViewportRect = function () {
        return this.viewer.activeViewport.vportRect;
    }

   // getTeighaLibInst();
};