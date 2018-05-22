
iWhizAPI = function () {
    this.m_DwgId = 0,
    this.m_Viewer = null,
    this.m_Entity = null,
    this.m_Zoom = null,
    this.m_Layer = null,
    this.m_WebApp = null,
    this.m_Grip = null,
	this.m_Flow = null,

    this.m_csrfToken = $("input[name='__RequestVerificationToken']").val(),

    this.m_BaseURL = "",//"/" + window.location.pathname.split('/')[1], // "/" + window.location.href.split('/')[3],
    // this.m_isFirst = false,

    this.m_UpdateHub = null,
    this.m_CacheCount = 0,
    this.m_Cache = "",
    this.m_OpenComplete = 0,
    this.m_IsSplitted = false,
    this.m_CallbackAfterUpdate = null,
    this.m_OpenReturnCode = 0,
    this.m_MovingTrails = false,
    this.opentime = 0,
    this.openParsetime = 0,
    this.dataParsetime = 0,
    this.dataUpdatetime = 0,
    this.initViewerTime = 0,
    //this.m_backupTLib = null,
    //this.m_backupViewer = null,
    //this.m_backupWebApp = null,
    //***************************************************Server Side APIs***************************************************************
    //this.UploadDrawing = function (filePath, resCallback) {
    //    try {
    //        $.ajax({

    //            url:  this.m_BaseURL + '/api/iWhiz/UploadDrawing?Destination=' + filePath,
    //            type: "GET",
    //            success: function (returnCode) {
    //                resCallback(returnCode)
    //            },
    //            error: function (xhr) {
    //                resCallback(9);
    //            }
    //        });
    //    }
    //    catch (e) {
    //        return 9;
    //    }
    //},  
    this.findBaseURL = function () {
        var baseUrl = "";
        var isIE11 = /msie|Trident/.test(navigator.userAgent);
        if (isIE11 == false) {
            baseUrl = window.document.baseURI;

            var baseUrlArr = baseUrl.split('/');
            baseUrl = "";
            for (var i = 0; i < baseUrlArr.length; i++) {
                if ((i > 2) && (baseUrlArr[i] != ""))
                    baseUrl = baseUrl + '/' + baseUrlArr[i];
            }
        }
        else {
            baseUrl = window.location.origin + '/' + window.location.pathname.split('/')[1];
        }
        if (baseUrl.includes("undefined")) {
            baseUrl = baseUrl.replace("undefined", "");
        }
        this.m_BaseURL = baseUrl;
    },
    this.checkWebglSupport = function () {
         var canvas = document.createElement('canvas');
         try {
             var res = ((canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) == null) ? false : true;
         } catch (x) {
             console.log(x);
             res = false;
         }
         return res;
    },
    this.openDrawingwithoutRender = function (drawingId, revisionNumber, drawingType, resCallback) {
        try {
            if(this.m_Viewer == null)
               this.m_Viewer = new Viewer(this);

            this.findBaseURL();

            var that = this;
            $.ajax({
                url: that.m_BaseURL + '/api/iWhiz/OpenDrawing',
                type: "POST",
                dataType: "json",
                headers: { "__RequestVerificationToken": that.m_csrfToken },
                data: JSON.stringify([drawingId, revisionNumber, drawingType, false, false]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    if (returnObject.returnCode != 0 && returnObject.returnCode != 74)
                        resCallback(returnObject.returnCode);
                    else {
                        that.m_DwgId = drawingId;
                        that.m_Viewer.m_OpenFlag = true;
                        resCallback(0);
                    }
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        } catch (x) {
            console.log(x);
        }
    },
    // drawingType - 1-Floor, 2-Building, 3- Site Drawing
    this.openDrawing = function (drawingId, revisionNumber, drawingType, isVisible, isFreeze,archivedId ,resCallback) {
        try {
            debugger
            //var polylinehandle = "8EA72";//"E9B";
            //this.openDrawingPartial(drawingId, revisionNumber, drawingType, polylinehandle, isVisible, resCallback);
            //return;
            if (drawingType == 6)
            {
                this.m_DwgId = "000"; // added for Add symbol in Symbol library(drawing open from client)
            }
            var opentime = new Date();
            console.log("Current time in open : h: " + opentime.getHours().toString() + ", m: " + opentime.getMinutes().toString() + ", s: " + opentime.getSeconds().toString());

            if (!drawingId) {
                resCallback(9);
                return;
            }               
            var time = new Date();

            this.m_Viewer.m_DisplayFlag = isVisible;
            var that = this;
            this.m_CallbackAfterUpdate = resCallback;
            this.m_UpdateHub = $.connection.updateHub;
            var first = true;
            this.m_UpdateHub.client.updateCache = function (cache, count, isFirst) {
                var t = new Date();
                console.log("Current time in updateCache : h: " + t.getHours().toString() + ", m: " + t.getMinutes().toString() + ", s: " + t.getSeconds().toString());

                if (count != 0) {
                    that.m_CacheCount = count;
                    that.m_Cache = new Uint8Array(0);
                }
                else if (that.m_CacheCount <= 0)
                    that.m_Cache = cache;
                if (that.m_CacheCount > 0) {
                    that.m_IsSplitted = true;
                    if (cache != "") {
                        that.m_Cache = that.m_Cache + Tools._base64ToByteString(cache); //;Tools._appendBuffer(that.m_Cache, Tools._base64ToArrayBuffer(cache)); //that.m_Cache + Tools._base64ToByteString(cache);//
                        that.m_CacheCount = that.m_CacheCount - 1;
                    }
                }
                if (that.m_CacheCount == 0) {
                    var cacheData;
                    if (!that.m_IsSplitted) {
                        cacheData = Tools._base64ToArrayBufferDeCompress(that.m_Cache); //Tools._base64ToArrayBuffer(that.m_Cache);  //Tools._base64ToArrayBufferDeCompress(that.m_Cache); //
                    }
                    else {
                        cacheData = Tools.byteStringToArrayBufferDeCompress(that.m_Cache);//that.m_Cache;//
                        that.m_IsSplitted = false;
                    }

                    //var updatetime = new Date();
                    //console.log("Current time in updatecache : h: " + updatetime.getHours().toString() + ", m: " + updatetime.getMinutes().toString() + ", s: " + updatetime.getSeconds().toString());

                    if (isFirst) {
                        //that.setDisplay(true);
                        console.log("cache length: " + cache.length);
                        that.m_Viewer.m_DisplayFlag = true;
                        that.opentime = new Date() - time;
                        that.m_Viewer.openDrawing(cacheData, that.m_Viewer.m_DisplayFlag);
                        that.m_isFirst = false;
                        if (drawingType != 6)
                            that.m_DwgId = drawingId;
                        that.OpenCallback(that.m_CallbackAfterUpdate, true);
                    }
                    else {
                        that.m_Viewer.updateDrawing(cacheData, that.m_Viewer.m_DisplayFlag);                        
                    }
                }
            };
            if ($.connection.hub)
                    $.connection.hub.stop();
            $.connection.hub.disconnected(function () {
               
                setTimeout(function () {
                    if (that.m_Viewer) {
                        if (that.m_Viewer.m_OpenFlag) {
                            $.connection.hub.start();
                        }
                    }
                }, 5000); // Re-start connection after 5 seconds
            });
            $.connection.hub.logging = true;
            // Start Hub
            $.connection.hub.start().done(function () {
                var canvasRect = that.m_Viewer.m_DomElement.getBoundingClientRect();
              
                $.ajax({
                    url: that.m_BaseURL + '/api/iWhiz/OpenDrawing',
                    type: "POST",
                    dataType: "json",
                    headers: { "__RequestVerificationToken": that.m_csrfToken },
                    data: JSON.stringify([drawingId, revisionNumber, drawingType, isFreeze, true, canvasRect.width, canvasRect.height,archivedId]),
                    contentType: 'application/json; charset=utf-8',
                    success: function (returnObject) {
                        var time = new Date();
                        console.log("Current time in open callback : h: " + time.getHours().toString() + ", m: " + time.getMinutes().toString() + ", s: " + time.getSeconds().toString());

                        if (returnObject.returnCode == 0 || returnObject.returnCode == 74 || returnObject.returnCode == 75) {
                            if (drawingType != 6)
                                that.m_DwgId = drawingId;
                            that.m_OpenReturnCode = returnObject.returnCode;
                            //var cacheData = Tools._base64ToArrayBuffer(returnObject.Cache);
                           // that.m_Viewer.openDrawing(cacheData, that.m_Viewer.m_DisplayFlag);
                            that.OpenCallback(resCallback, true);
                        }
                        else {
                            resCallback(returnObject.returnCode);
                        }
                    },
                    error: function (xhr) {
                        resCallback(9);
                    }
                });
            });
        }
        catch (e) {
            resCallback(9);

        }
    },
    this.openDrawingPartial = function (drawingId, revisionNumber, drawingType, polylineHandles, layerNames, isVisible, resCallback) {
        try {
            var opentime = new Date();
            console.log("Current time in open : h: " + opentime.getHours().toString() + ", m: " + opentime.getMinutes().toString() + ", s: " + opentime.getSeconds().toString());

            if (!drawingId) {
                resCallback(9);
                return;
            }
            var time = new Date();

            this.m_Viewer.m_DisplayFlag = isVisible;
            var that = this;
            this.m_CallbackAfterUpdate = resCallback;
            this.m_UpdateHub = $.connection.updateHub;
            var first = true;
            this.m_UpdateHub.client.updateCache = function (cache, count, isFirst) {
                if (count != 0) {
                    that.m_CacheCount = count;
                    that.m_Cache = new Uint8Array(0);
                }
                else if (that.m_CacheCount <= 0)
                    that.m_Cache = cache;
                if (that.m_CacheCount > 0) {
                    that.m_IsSplitted = true;
                    if (cache != "") {
                        that.m_Cache = that.m_Cache + Tools._base64ToByteString(cache); //;Tools._appendBuffer(that.m_Cache, Tools._base64ToArrayBuffer(cache)); //that.m_Cache + Tools._base64ToByteString(cache);//
                        that.m_CacheCount = that.m_CacheCount - 1;
                    }
                }
                if (that.m_CacheCount == 0) {
                    var cacheData;
                    if (!that.m_IsSplitted) {
                        cacheData = Tools._base64ToArrayBufferDeCompress(that.m_Cache); //Tools._base64ToArrayBuffer(that.m_Cache);  //Tools._base64ToArrayBufferDeCompress(that.m_Cache); //
                    }
                    else {
                        cacheData = Tools.byteStringToArrayBufferDeCompress(that.m_Cache);//that.m_Cache;//
                        that.m_IsSplitted = false;
                    }

                    //var updatetime = new Date();
                    //console.log("Current time in updatecache : h: " + updatetime.getHours().toString() + ", m: " + updatetime.getMinutes().toString() + ", s: " + updatetime.getSeconds().toString());

                    if (isFirst) {
                        //that.setDisplay(true);
                        //that.m_Viewer.m_DisplayFlag = true;
                        that.opentime = new Date() - time;
                        that.m_Viewer.openDrawing(cacheData, that.m_Viewer.m_DisplayFlag);
                        that.m_isFirst = false;
                        that.m_DwgId = drawingId;
                        that.OpenCallback(that.m_CallbackAfterUpdate, true);
                    }
                    else {
                        that.m_Viewer.updateDrawing(cacheData, that.m_Viewer.m_DisplayFlag);
                    }
                }
            };
            if ($.connection.hub)
                $.connection.hub.stop();
            $.connection.hub.disconnected(function () {

                setTimeout(function () {
                    if (that.m_Viewer) {
                        if (that.m_Viewer.m_OpenFlag) {
                            $.connection.hub.start();
                        }
                    }
                }, 5000); // Re-start connection after 5 seconds
            });
            $.connection.hub.logging = true;
            // Start Hub
            $.connection.hub.start().done(function () {
                var canvasRect = that.m_Viewer.m_DomElement.getBoundingClientRect();

                $.ajax({
                    url: that.m_BaseURL + '/api/iWhiz/OpenDrawingPartial',
                    type: "POST",
                    dataType: "json",
                    headers: { "__RequestVerificationToken": that.m_csrfToken },
                    data: JSON.stringify([drawingId, revisionNumber, drawingType, polylineHandles, layerNames, true, canvasRect.width, canvasRect.height]),
                    contentType: 'application/json; charset=utf-8',
                    success: function (returnObject) {
                        var time = new Date();
                        console.log("Current time in open callback : h: " + time.getHours().toString() + ", m: " + time.getMinutes().toString() + ", s: " + time.getSeconds().toString());

                        if (returnObject.returnCode == 0 || returnObject.returnCode == 74 || returnObject.returnCode == 75) {
                            that.m_DwgId = drawingId;
                            that.m_OpenReturnCode = returnObject.returnCode;
                            //var cacheData = Tools._base64ToArrayBuffer(returnObject.Cache);
                            // that.m_Viewer.openDrawing(cacheData, that.m_Viewer.m_DisplayFlag);
                            that.OpenCallback(resCallback, true);
                        }
                        else {
                            resCallback(returnObject.returnCode);
                        }
                    },
                    error: function (xhr) {
                        resCallback(9);
                    }
                });
            });
        }
        catch (e) {
            resCallback(9);

        }
    },
    this.createDrawing = function (Measurement, resCallback) {
        try {
            var that = this;
            this.close(function () {
                that.m_CallbackAfterUpdate = resCallback;
                that.m_UpdateHub = $.connection.updateHub;
                that.m_UpdateHub.client.updateCache = function (cache, count, isFirst) {
                    if (count != 0) {
                        that.m_CacheCount = count;
                        that.m_Cache = new Uint8Array(0);
                    }
                    else if (that.m_CacheCount <= 0)
                        that.m_Cache = cache;
                    if (that.m_CacheCount > 0) {
                        that.m_IsSplitted = true;
                        if (cache != "") {
                            that.m_Cache = that.m_Cache + Tools._base64ToByteString(cache); //;Tools._appendBuffer(that.m_Cache, Tools._base64ToArrayBuffer(cache)); //that.m_Cache + Tools._base64ToByteString(cache);//
                            that.m_CacheCount = that.m_CacheCount - 1;
                        }
                    }
                    if (that.m_CacheCount == 0) {
                        var cacheData;
                        if (!that.m_IsSplitted) {
                            cacheData = Tools._base64ToArrayBufferDeCompress(that.m_Cache); //Tools._base64ToArrayBuffer(that.m_Cache);  //Tools._base64ToArrayBufferDeCompress(that.m_Cache); //
                        }
                        else {
                            cacheData = Tools.byteStringToArrayBufferDeCompress(that.m_Cache);//that.m_Cache;//
                            that.m_IsSplitted = false;
                        }

                        if (isFirst) {
                            //that.setDisplay(true);
                            that.m_Viewer.m_DisplayFlag = true;
                            that.m_Viewer.openDrawing(cacheData, that.m_Viewer.m_DisplayFlag);
                            that.m_isFirst = false;
                            that.m_DwgId = -1;//drawingId;
                            that.OpenCallback(that.m_CallbackAfterUpdate, true);
                        }
                        else {
                            that.m_Viewer.updateDrawing(cacheData, that.m_Viewer.m_DisplayFlag);
                        }
                    }
                };
                $.connection.hub.disconnected(function () {
                    setTimeout(function () {
                        $.connection.hub.start();
                    }, 5000); // Re-start connection after 5 seconds
                });
                $.connection.hub.logging = true;
                // Start Hub
                $.connection.hub.start().done(function () {
                    $.ajax({
                        url: that.m_BaseURL + '/api/iWhiz/CreateDrawing',
                        type: "POST",
                        headers: { "__RequestVerificationToken": that.m_csrfToken },
                        data: JSON.stringify([-1, Measurement, that.m_Viewer.m_DomElement.width, that.m_Viewer.m_DomElement.height]),
                        contentType: 'application/json; charset=utf-8',
                        success: function (returnObject) {
                            that.m_DwgId = -1;
                            that.m_Viewer.m_OpenFlag = true;
                            that.m_OpenReturnCode = returnObject.returnCode;
                           // var cacheData = Tools._base64ToArrayBuffer(returnObject.Cache);
                           // that.m_Viewer.openDrawing(cacheData, that.m_Viewer.m_DisplayFlag);
                            that.OpenCallback(resCallback, true);
                        },
                        error: function (xhr) {
                            //this.m_Viewer.m_OpenFlag = false;
                            resCallback(9);
                        }
                    });
                });
            });


        }
        catch (e) {
            resCallback(9);
        }
    },
    this.OpenCallback = function (resCallback, isOpen) {
        this.m_OpenComplete = this.m_OpenComplete + 1;

         if (this.m_OpenComplete == 2) {
        var that = this;
        if (isOpen) {
            this.getLayerData(function (returnCode, LayerInfo) {

                that.m_Layer.setLayerInfo(LayerInfo);
                that.setAreaRatio(resCallback)
            });
        }
        else
            resCallback(iWhizError.SUCCESS);
        this.m_OpenComplete = 0;
         }

    },
    this.regenerateDevice = function (red, green, blue, resCallback) {
        var that = this;
        if (!this.m_Viewer.m_OpenFlag) {
            resCallback(iWhizError.NOT_OPEND);
            return;
        }
        $.ajax({
            url: this.m_BaseURL + '/api/iWhiz/RegenerateDevice',
            type: "POST",
            headers: { "__RequestVerificationToken": this.m_csrfToken },
            data: JSON.stringify([this.m_DwgId, red, green, blue, that.m_Viewer.m_DomElement.width, that.m_Viewer.m_DomElement.height]),
            contentType: 'application/json; charset=utf-8',
            success: function (returnObject) {
                if (resCallback)
                    resCallback(returnObject.returnCode, returnObject.Cache);
            },
            error: function (xhr) {
                return 9;
            }
        });
    },
    this.close = function (resCallback) {
        if (this.m_Viewer) {
            if (!this.m_Viewer.m_OpenFlag) {
                if ($.connection.hub)
                    $.connection.hub.stop();
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
        }
        else {
            if ($.connection.hub)
                $.connection.hub.stop();
            resCallback(iWhizError.NOT_OPEND);
            return;
        }
     
        var that = this;
        $.ajax({
            url: this.m_BaseURL + '/api/iWhiz/Close',
            type: "POST",
            headers: { "__RequestVerificationToken": this.m_csrfToken },
            data: JSON.stringify([this.m_DwgId]),
            contentType: 'application/json; charset=utf-8',
            success: function (returnObject) {
                $.connection.hub.stop();
                resCallback(returnObject.returnCode)
            },
            error: function (xhr) {
                resCallback(9);
            }
        });
        if (this.m_Layer != null)
            this.m_Layer.m_layerinfo = "";
        if (this.m_Viewer != null)
        this.m_Viewer.close();
        this.m_WebApp = null;
    },
    this.regenerate = function () {
        var that = this;
        if (!this.m_Viewer.m_OpenFlag) {
            //resCallback(iWhizError.NOT_OPEND);
            return WhizError.NOT_OPEND;
        }
        //$.ajax({
        //    url: this.m_BaseURL + '/api/iWhiz/Regenerate',
        //    type: "POST",
        //    headers: { "__RequestVerificationToken": this.m_csrfToken },
        //    data: JSON.stringify([this.m_DwgId]),
        //    contentType: 'application/json; charset=utf-8',
        //    success: function (returnObject) {
        //        if (resCallback)
        //            resCallback(returnObject.returnCode);
        //        that.m_Viewer.regenerate();
        //    },
        //    error: function (xhr) {
        //        return 9;
        //    }
        //});

        return this.m_Viewer.regenerate();
    },
    this.setBackgroundColor = function (red, green, blue, resCallback) {
        var fieldWidth = [0], fieldHeight = [0], viewPosition = [0];
        var result = this.m_Viewer.setBackgroundColor(red, green, blue);
        if (result == 0) {
            var that = this;
            this.m_Viewer.backupCurrentView(fieldWidth, fieldHeight, viewPosition);
            that.m_CallbackAfterUpdate = resCallback;
            this.regenerateDevice(red, green, blue, function (retCode, cache) {
                var cacheData = Tools._base64ToArrayBuffer(cache);
                that.m_Viewer.openDrawing(cacheData, that.m_Viewer.m_DisplayFlag);
                that.m_Viewer.restoreCurrentView(fieldWidth, fieldHeight, viewPosition);
                that.OpenCallback(resCallback, false);
            });
        }
        else
            resCallback(result);
    },
    this.viewLayout = function (layoutName, resCallback) {
        try {
            var that = this;
            this.setLayout(layoutName, function () {
                that.m_CallbackAfterUpdate = resCallback;
                $.ajax({
                    url: that.m_BaseURL + '/api/iWhiz/ViewLayout',
                    type: "POST",
                    headers: { "__RequestVerificationToken": that.m_csrfToken },
                    data: JSON.stringify([that.m_DwgId, layoutName, that.m_Viewer.m_DomElement.width, that.m_Viewer.m_DomElement.height]),
                    contentType: 'application/json; charset=utf-8',
                    success: function (returnObject) {
                        var cacheData = Tools._base64ToArrayBuffer(returnObject.Cache);
                        that.m_Viewer.openDrawing(cacheData, that.m_Viewer.m_DisplayFlag);
                        that.OpenCallback(resCallback, true);
                    },
                    error: function (xhr) {
                        resCallback(9);
                    }
                });
            });

            return;
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setAreaRatio = function (resCallback) {
        try {
            var that = this;

            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetAreaRatio',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, that.m_Viewer.m_AreaRatio]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    if (that.m_OpenReturnCode == 0)
                        resCallback(returnObject.returnCode);
                    else {
                        resCallback(that.m_OpenReturnCode);
                        that.m_OpenReturnCode = 0;
                    }
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
            return;

        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setDelimiter = function (rowDelimiter, columnDelimiter, resCallback) {
        try {

            var retCode = this.m_Viewer.setDelimiter(rowDelimiter, columnDelimiter);
            if (retCode == 0) {
                $.ajax({

                    url: this.m_BaseURL + '/api/iWhiz/SetDelimiter',
                    type: "POST",
                    headers: { "__RequestVerificationToken": this.m_csrfToken },
                    data: JSON.stringify([this.m_DwgId, rowDelimiter, columnDelimiter]),
                    contentType: 'application/json; charset=utf-8',
                    success: function (returnObject) {
                        resCallback(returnObject.returnCode)
                    },
                    error: function (xhr) {
                        resCallback(9);
                    }
                });
                return;
            }
            else
                resCallback(retCode);
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setLayout = function (layoutName, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/SetLayout',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layoutName]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }

    },
    this.getAllXrefs = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }

            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/GetAllXrefs',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.XrefFileNames)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getAllLayouts = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/GetAllLayouts',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.Layouts)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getODAlibVersion = function (resCallback) {
        try {

            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetODAlibVersion',
                type: "GET",
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.ODALibVersion)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getDWGVersion = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/GetDWGVersion',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.DWGVersion)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getAllTextStyles = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/GetAllTextStyles',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.StyleNames)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getAllLineTypes = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/GetAllLineTypes',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.Count, returnObject.LineTypes)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getXRefHandles = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetXRefHandles',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.XrefHandles)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.isTextStyleExists = function (TextStyle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/IsTextStyleExists',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, TextStyle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.IsExists)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setXRefPath = function (fileName, newPath, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetXRefPath',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, fileName, newPath]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.attachXref = function (filePath, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/AttachXref',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, filePath]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.detachFailedXRefs = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/DetachFailedXRefs',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getFailedXrefs = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetFailedXrefs',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.FileNames);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },

    this.isLayerFrozen = function (LayerName, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/IsLayerFrozen',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, LayerName]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.IsFrozen)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getLayerColor = function (layerName, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetLayerColor',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.AutocadColor)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getLayerInfo = function (layerName, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetLayerInfo',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.IsVisible, returnObject.AutocadColor, returnObject.LayerId);

                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setLayerVisibility = function (layerName, isvisible, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var layerId = [0];
            var res = this.getLayerId(layerName, layerId);
            if (res != 0) {
                resCallback(res);
                return;
            }
            res = this.m_Layer.setLayerVisibility(layerId[0], layerName, isvisible, this.m_Viewer);
            //// resCallback(res);
            if (res == 0) {
                $.ajax({
                    url: this.m_BaseURL + '/api/iWhiz/SetLayerVisibility',
                    type: "POST",
                    headers: { "__RequestVerificationToken": this.m_csrfToken },
                    data: JSON.stringify([this.m_DwgId, layerName, isvisible]),
                    contentType: 'application/json; charset=utf-8',
                    success: function (returnObject) {
                        resCallback(returnObject.returnCode)
                    },
                    error: function (xhr) {
                        resCallback(9);
                    }
                });
            }
            else
                resCallback(res);
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setLayersVisibility = function (layerNames, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var layerAndVisibility = layerNames.split(this.m_Viewer.m_RowDelimiter);
            var res = 0;
            for (var index = 0; index < layerAndVisibility.length - 1; index++) {
                var layerName = layerAndVisibility[index].split(this.m_Viewer.m_ColumnDelimiter)[0];
                var isvisible = layerAndVisibility[index].split(this.m_Viewer.m_ColumnDelimiter)[1];

                var layerId = [0];
                res = this.getLayerId(layerName, layerId);
                if (res != 0) {
                    resCallback(res);
                    return;
                }
                res = this.m_Layer.setLayerVisibility(layerId[0], layerName, isvisible == "true" ? true : false, this.m_Viewer);
            }
            // resCallback(res);
            if (res == 0) {
                $.ajax({
                    url: this.m_BaseURL + '/api/iWhiz/SetLayersVisibility',
                    type: "POST",
                    headers: {
                        "__RequestVerificationToken": this.m_csrfToken
                    },
                    data: JSON.stringify([this.m_DwgId, layerNames]),
                    contentType: 'application/json; charset=utf-8',
                    success: function (returnObject) {
                        resCallback(returnObject.returnCode)
                    },
                    error: function (xhr) {
                        resCallback(9);
                    }
                });
            }
            else
                resCallback(res);
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getAllLayers = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var that = this;
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetAllLayers',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var finalLayers = "";
                    if (returnObject.Layers != "") {
                        //////to return idrawings layers first///////
                        var iDrawingslayerNames = [0];
                        that.getAlliDrawingsLayers(iDrawingslayerNames);
                        for (var item in iDrawingslayerNames) {
                            layerName = iDrawingslayerNames[item];
                            if (layerName != "") {
                                var isExist = [0];
                                that.m_Layer.layerExists(layerName, isExist);
                                if (isExist[0]) {
                                    finalLayers = finalLayers + layerName + that.m_Viewer.m_RowDelimiter;
                                }
                            }
                        }
                        //////to return idrawings layers first///////
                        var tempLayers = returnObject.Layers;
                        tempLayers = returnObject.Layers.split(that.m_Viewer.m_RowDelimiter);
                        for (var item in tempLayers) {
                            layerName = tempLayers[item];
                            if (layerName != "") {
                                if (($.inArray(layerName, that.m_Layer.m_Applicaton) == -1)) {
                                    if (($.inArray(layerName, iDrawingslayerNames) == -1)) {
                                        finalLayers = finalLayers + layerName + that.m_Viewer.m_RowDelimiter;
                                    }
                                }
                            }                           
                        }
                    }
                    resCallback(returnObject.returnCode, finalLayers);

                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getLayerData = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/GetLayerData',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    if (returnObject.returnCode == 0)
                        resCallback(returnObject.returnCode, JSON.parse(returnObject.LayerInfo));
                    else
                        resCallback(returnObject.returnCode, "");
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.createLayer = function (layerName, autoCadColor, isVisible, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/CreateLayer',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, autoCadColor, isVisible]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(layerName, isExist);
                    if (!isExist[0]) {
                        that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                            that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                            resCallback(returnObject.returnCode);
                        });
                    }
                    else
                        resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.renameLayer = function (layerName, newLayerName, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/RenameLayer',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, newLayerName]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    that.m_Layer.renameLayer(layerName, newLayerName);
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.deleteLayer = function (layerName, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/DeleteLayer',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    if (returnObject.returnCode == 0)
                        that.m_Layer.deleteLayer(layerName);
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.thawAllFrozenLayers = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/ThawAllFrozenLayers',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.checkForNonPlottableLayers = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/CheckForNonPlottableLayers',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.IsNonPlottable);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    // this.getLayerName = function (layerId, name) {
    //     if (!this.m_Viewer.m_OpenFlag)
    //         return iWhizError.NOT_OPEND;
    //     $.ajax({
    //         url:  this.m_BaseURL + '/api/iWhiz/GetLayerName?DrawingId=' + this.m_DwgId + '&LayerId=' + layerId,
    //         type: "GET",
    //         success: function (returnObject) {
    //             resCallback(returnObject.returnCode, returnObject.LayerName)
    //         },
    //         error: function (xhr) {
    //             resCallback(9);
    //         }
    //     });
    //},
    this.exportToPNG = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var that = this;
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/ExportToPNG',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    if (returnObject.returnCode == 0) {
                        var exportedData = Tools._base64ToArrayBuffer(returnObject.ExportedData);
                        Tools.saveTextAsFile(exportedData, returnObject.FileName + ".png");
                    }
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.exportToJPEG = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var that = this;
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/ExportToJPEG',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    if (returnObject.returnCode == 0) {
                        var exportedData = Tools._base64ToArrayBuffer(returnObject.ExportedData);
                        Tools.saveTextAsFile(exportedData, returnObject.FileName + ".jpg");
                    }
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.exportToBMP = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var that = this;
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/ExportToBMP',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    if (returnObject.returnCode == 0) {
                        var exportedData = Tools._base64ToArrayBuffer(returnObject.ExportedData);
                        Tools.saveTextAsFile(exportedData, returnObject.FileName + ".bmp");
                    }
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.exportToDWF = function (fileCode, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }

            ////////////to backup and restore current view//////////////////////
            var fieldWidth = [0], fieldHeight = [0], viewPosition = [0];
            this.m_Viewer.backupCurrentView(fieldWidth, fieldHeight, viewPosition);
            this.setDisplay(false);
            ////////////to backup and restore current view//////////////////////

            var that = this;
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/ExportToDWF',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId, fileCode]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    ////////////to backup and restore current view//////////////////////
                    that.m_Viewer.restoreCurrentView(fieldWidth, fieldHeight, viewPosition);
                    that.setDisplay(true);
                    ////////////to backup and restore current view//////////////////////
                    if (returnObject.returnCode == 0) {
                        var exportedData = Tools._base64ToArrayBuffer(returnObject.ExportedData);
                        Tools.saveTextAsFile(exportedData, returnObject.FileName + ".dwf");
                    }
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    ////////////to backup and restore current view//////////////////////
                    that.m_Viewer.restoreCurrentView(fieldWidth, fieldHeight, viewPosition);
                    that.setDisplay(true);
                    ////////////to backup and restore current view//////////////////////
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.exportToSVG = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            ////////////to backup and restore current view//////////////////////
            var fieldWidth = [0], fieldHeight = [0], viewPosition = [0];
            this.m_Viewer.backupCurrentView(fieldWidth, fieldHeight, viewPosition);
            this.m_Viewer.m_DisplayFlag = false;
            ////////////to backup and restore current view//////////////////////

            var that = this;
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/ExportToSVG',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    ////////////to backup and restore current view//////////////////////
                    that.m_Viewer.restoreCurrentView(fieldWidth, fieldHeight, viewPosition);
                    that.setDisplay(true);
                    ////////////to backup and restore current view//////////////////////
                    if (returnObject.returnCode == 0) {
                        var exportedData = Tools._base64ToArrayBuffer(returnObject.ExportedData);
                        Tools.saveTextAsFile(exportedData, returnObject.FileName + ".svg");
                    }
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    ////////////to backup and restore current view//////////////////////
                    that.m_Viewer.restoreCurrentView(fieldWidth, fieldHeight, viewPosition);
                    that.setDisplay(true);
                    ////////////to backup and restore current view//////////////////////
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.exportToDXF = function (fileCode, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }

            ////////////to backup and restore current view//////////////////////
            var fieldWidth = [0], fieldHeight = [0], viewPosition = [0];
            this.m_Viewer.backupCurrentView(fieldWidth, fieldHeight, viewPosition);
            this.m_Viewer.m_DisplayFlag = false;
            ////////////to backup and restore current view//////////////////////
            var that = this;
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/ExportToDXF',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId, fileCode]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    ////////////to backup and restore current view//////////////////////
                    that.m_Viewer.restoreCurrentView(fieldWidth, fieldHeight, viewPosition);
                    that.setDisplay(true);
                    ////////////to backup and restore current view//////////////////////
                    if (returnObject.returnCode == 0) {
                        var exportedData = Tools._base64ToArrayBuffer(returnObject.ExportedData);
                        Tools.saveTextAsFile(exportedData, returnObject.FileName + ".dxf");
                    }
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    ////////////to backup and restore current view//////////////////////
                    that.m_Viewer.restoreCurrentView(fieldWidth, fieldHeight, viewPosition);
                    that.setDisplay(true);
                    ////////////to backup and restore current view//////////////////////
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.exportToDXB = function (fileCode, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            ////////////to backup and restore current view//////////////////////
            var fieldWidth = [0], fieldHeight = [0], viewPosition = [0];
            this.m_Viewer.backupCurrentView(fieldWidth, fieldHeight, viewPosition);
            this.m_Viewer.m_DisplayFlag = false;
            ////////////to backup and restore current view//////////////////////
            var that = this;
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/ExportToDXB',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId, fileCode]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    ////////////to backup and restore current view//////////////////////
                    that.m_Viewer.restoreCurrentView(fieldWidth, fieldHeight, viewPosition);
                    that.setDisplay(true);
                    ////////////to backup and restore current view//////////////////////
                    if (returnObject.returnCode == 0) {
                        var exportedData = Tools._base64ToArrayBuffer(returnObject.ExportedData);
                        Tools.saveTextAsFile(exportedData, returnObject.FileName + ".dxb");
                    }
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    ////////////to backup and restore current view//////////////////////
                    that.m_Viewer.restoreCurrentView(fieldWidth, fieldHeight, viewPosition);
                    that.setDisplay(true);
                    ////////////to backup and restore current view//////////////////////
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.exportToPDF = function (usePlotstyle, layoutName, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            ////////////to backup and restore current view//////////////////////
            var fieldWidth = [0], fieldHeight = [0], viewPosition = [0];
            this.m_Viewer.backupCurrentView(fieldWidth, fieldHeight, viewPosition);
            this.m_Viewer.m_DisplayFlag = false;
            ////////////to backup and restore current view//////////////////////
            var that = this;
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/ExportToPDF',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId, usePlotstyle, layoutName]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    ////////////to backup and restore current view//////////////////////
                    that.m_Viewer.restoreCurrentView(fieldWidth, fieldHeight, viewPosition);
                    that.setDisplay(true);
                    ////////////to backup and restore current view//////////////////////
                    if (returnObject.returnCode == 0) {
                        var exportedData = Tools._base64ToArrayBuffer(returnObject.ExportedData);
                        Tools.saveTextAsFile(exportedData, returnObject.FileName + ".pdf");
                    }
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    ////////////to backup and restore current view//////////////////////
                    that.m_Viewer.restoreCurrentView(fieldWidth, fieldHeight, viewPosition);
                    that.setDisplay(true);
                    ////////////to backup and restore current view//////////////////////
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.exportToXML = function (isFile, layerName, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var that = this;
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/ExportToXML',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId, isFile, layerName]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    if (returnObject.returnCode == 0) {
                        var exportedData = Tools._base64ToArrayBuffer(returnObject.ExportedData);
                        if (isFile) {
                            Tools.saveTextAsFile(exportedData, returnObject.FileName + ".xml");
                            resCallback(returnObject.returnCode);
                        }
                        else
                            resCallback(returnObject.returnCode, returnObject.ExportedXml);
                    }
                    else
                        resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.exportTo3DDWF = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            ////////////to backup and restore current view//////////////////////
            var fieldWidth = [0], fieldHeight = [0], viewPosition = [0];
            this.m_Viewer.backupCurrentView(fieldWidth, fieldHeight, viewPosition);
            this.m_Viewer.m_DisplayFlag = false;
            ////////////to backup and restore current view//////////////////////
            var that = this;
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/ExportTo3DDWF',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    ////////////to backup and restore current view//////////////////////
                    that.m_Viewer.restoreCurrentView(fieldWidth, fieldHeight, viewPosition);
                    that.setDisplay(true);
                    ////////////to backup and restore current view//////////////////////
                    if (returnObject.returnCode == 0) {
                        var exportedData = Tools._base64ToArrayBuffer(returnObject.ExportedData);
                        Tools.saveTextAsFile(exportedData, returnObject.FileName + ".dwf");
                    }
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    ////////////to backup and restore current view//////////////////////
                    that.m_Viewer.restoreCurrentView(fieldWidth, fieldHeight, viewPosition);
                    that.setDisplay(true);
                    ////////////to backup and restore current view//////////////////////
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
     this.saveAs = function (showPreview, fileCode, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }

             //////////////to backup and restore current view//////////////////////
             var fieldWidth = [0], fieldHeight = [0], viewPosition = [0];
             this.m_Viewer.backupCurrentView(fieldWidth, fieldHeight, viewPosition);
             this.m_Viewer.m_DisplayFlag = false;
             ////////////to backup and restore current view//////////////////////
             var that = this;
             $.ajax({
                 url: this.m_BaseURL + '/api/iWhiz/SaveAs',
                 type: "POST",
                 headers: {
                     "__RequestVerificationToken": this.m_csrfToken
                 },
                 data: JSON.stringify([this.m_DwgId, showPreview, fileCode]),
                 contentType: 'application/json; charset=utf-8',
                 success: function (returnObject) {
                     ////////////to backup and restore current view//////////////////////
                     that.m_Viewer.restoreCurrentView(fieldWidth, fieldHeight, viewPosition);
                     that.setDisplay(true);
                     ////////////to backup and restore current view//////////////////////
                     if (returnObject.returnCode == 0) {
                         var exportedData = Tools._base64ToArrayBuffer(returnObject.ExportedData);
                         Tools.saveTextAsFile(exportedData, returnObject.FileName + ".dwg");
                     }
                     resCallback(returnObject.returnCode);
                 },
                 error: function (xhr) {
                     ////////////to backup and restore current view//////////////////////
                     that.m_Viewer.restoreCurrentView(fieldWidth, fieldHeight, viewPosition);
                     that.setDisplay(true);
                     ////////////to backup and restore current view//////////////////////
                     resCallback(9);
                 }
             });
         }
         catch (e) {
             resCallback(9);
         }
     },
     this.saveForPlot = function (showPreview, fileCode, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }

             ////////////to backup and restore current view//////////////////////
             var fieldWidth = [0], fieldHeight = [0], viewPosition = [0];
             this.m_Viewer.backupCurrentView(fieldWidth, fieldHeight, viewPosition);
             this.m_Viewer.m_DisplayFlag = false;
             ////////////to backup and restore current view//////////////////////
             var that = this;
             $.ajax({
                 url: this.m_BaseURL + '/api/iWhiz/SaveAs',
                 type: "POST",
                 headers: {
                     "__RequestVerificationToken": this.m_csrfToken
                 },
                 data: JSON.stringify([this.m_DwgId, showPreview, fileCode]),
                 contentType: 'application/json; charset=utf-8',
                 success: function (returnObject) {
                     ////////////to backup and restore current view//////////////////////
                     that.m_Viewer.restoreCurrentView(fieldWidth, fieldHeight, viewPosition);
                     that.setDisplay(true);
                     ////////////to backup and restore current view//////////////////////
                     resCallback(returnObject.returnCode, returnObject.FilePath);
                 },
                 error: function (xhr) {
                     ////////////to backup and restore current view//////////////////////
                     that.m_Viewer.restoreCurrentView(fieldWidth, fieldHeight, viewPosition);
                     that.setDisplay(true);
                     ////////////to backup and restore current view//////////////////////
                     resCallback(9);
                 }
             });
         }
         catch (e) {
             resCallback(9);
         }
     },
    //***********************Entity****************
    this.getAllTexts = function (layerName, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/GetAllTexts',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.EntitiesText)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getEntityExtents = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/GetEntityExtents',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.MinX, returnObject.MinY, returnObject.MaxX, returnObject.MaxY)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getEntityMidpoint = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/GetEntityMidPoint',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.MidX, returnObject.MidY)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getEntityMidpointMultiple = function (entityHandle, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             $.ajax({

                 url: this.m_BaseURL + '/api/iWhiz/GetEntityMidPointMultiple',
                 type: "POST",
                 headers: { "__RequestVerificationToken": this.m_csrfToken },
                 data: JSON.stringify([this.m_DwgId, entityHandle]),
                 contentType: 'application/json; charset=utf-8',
                 success: function (returnObject) {
                     resCallback(returnObject.returnCode, returnObject.MidX, returnObject.MidY)
                 },
                 error: function (xhr) {
                     resCallback(9);
                 }
             });
         }
         catch (e) {
             resCallback(9);
         }
    },    
    this.scaleSymbolMultiple = function (entityHandles, scaleFactor, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var that = this;
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/ScaleSymbolMultiple',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandles, scaleFactor]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    if (returnObject.returnCode == 0)
                    {
                        var objXML = new XMLParser();
                        objXML.loadXML(returnObject.XMLData);
                        var pNodeList = objXML.getNodeList("ITEM");
                        var resultArray = [];
                        for (i = 0; i < pNodeList.length; i++)
                        {
                            var handle = pNodeList[i].getElementsByTagName("HANDLE")[0].childNodes[0].nodeValue;
                            var coordinate = pNodeList[i].getElementsByTagName("COORD")[0].childNodes[0].nodeValue;
                            var extents = pNodeList[i].getElementsByTagName("EXTENTS")[0].childNodes[0].nodeValue.split(that.m_Viewer.m_RowDelimiter);
                            var extentsArray = [];
                            extentsArray.push(extents[0].split(that.m_Viewer.m_ColumnDelimiter));
                            extentsArray.push(extents[1].split(that.m_Viewer.m_ColumnDelimiter));
                            resultArray.push([handle, coordinate, extentsArray]);
                        }
                        resCallback(returnObject.returnCode, resultArray);
                    }
                    else
                        resCallback(returnObject.returnCode, []);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.moveEntityMultiple = function (dataArray, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
           var dataXml = "<MOVE_DATA>";
           for (var item in dataArray) {
               dataXml += "<ITEM>";
               var moveData = dataArray[item];
               dataXml += "<HANDLE>";
               dataXml += moveData[0];
               dataXml += "</HANDLE>";
               dataXml += "<POINT>";
               dataXml +=  "<X>" + moveData[1][0] + "</X>";
               dataXml += "<Y>" + moveData[1][1] + "</Y>";
               dataXml += "</POINT>";
               dataXml += "</ITEM>";
           }
           dataXml += "</MOVE_DATA>";
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/MoveEntityMultiple',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, dataXml]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {                                     
                        resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.getXdStringMultiple = function (entityHandles, appData, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetXdStringMultiple',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandles, appData]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    if (returnObject.returnCode == 0) {
                        var objXML = new XMLParser();
                        objXML.loadXML(returnObject.XData);
                        var pNodeList = objXML.getNodeList("ITEM");
                        var resultArray = [];
                        for (i = 0; i < pNodeList.length; i++) {
                            var handle = pNodeList[i].getElementsByTagName("HANDLE")[0].childNodes[0].nodeValue;
                            var xdata = pNodeList[i].getElementsByTagName("XDATA")[0].childNodes[0].nodeValue;
                            resultArray.push([handle, xdata]);
                        }
                        resCallback(returnObject.returnCode, resultArray);
                    }
                    else
                    {
                        resCallback(returnObject.returnCode, returnObject.XData);
                    }
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setTextMultiple = function (textHandleArray, resCallback) {
        var that = this;
        var dataXml = "<TEXT_DATA>";
        for (var item in textHandleArray) {
            dataXml += "<TEXT_ITEM>";
            var textData = textHandleArray[item];
            dataXml += "<TEXT_HANDLE>";
            dataXml += textData[0];
            dataXml += "</TEXT_HANDLE>";
            dataXml += "<TEXT_STRING>";
            dataXml += textData[1];
            dataXml += "</TEXT_STRING>";
            dataXml += "</TEXT_ITEM>";
        }
        dataXml += "</TEXT_DATA>";
        $.ajax({
            url: this.m_BaseURL + '/api/iWhiz/SetTextMultiple',
            type: "POST",
            headers: { "__RequestVerificationToken": this.m_csrfToken },
            data: JSON.stringify([this.m_DwgId, dataXml]),
            contentType: 'application/json; charset=utf-8',
            success: function (returnObject) {
               resCallback(returnObject.returnCode);
            },
            error: function (xhr) {
                resCallback(9);
            }
        });
    },
    this.getEntityType = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/GetEntityType',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.TypeId)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getEntityArea = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var that = this;
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/GetEntityArea',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var area = returnObject.Area;
                    if (returnObject.Area.indexOf(that.m_Viewer.m_RowDelimiter) == -1) {
                        area = parseFloat(returnObject.Area);
                    }
                    resCallback(returnObject.returnCode, area);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getEntityPerimeter = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var that = this;
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetEntityPerimeter',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var perimeter = returnObject.Perimeter;
                    if (returnObject.Perimeter.indexOf(that.m_Viewer.m_RowDelimiter) == -1)
                    {
                        perimeter = parseFloat(returnObject.Perimeter);
                    }
                    resCallback(returnObject.returnCode, perimeter);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getEntityProperties = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetEntityProperties',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.TypeId, returnObject.Properties)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getTextStyle = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/GetTextStyle',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.TextStyle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getXdString = function (entityHandle, appData, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetXdString',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, appData]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.XData)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setXdString = function (entityHandle, appName, xData, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetXdString',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, appName, xData]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getEntityLayer = function (entityHandle, resCallback) {
         if (!this.m_Viewer.m_OpenFlag)
             return iWhizError.NOT_OPEND;
         var that = this;
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             $.ajax({
                 url: this.m_BaseURL + '/api/iWhiz/GetEntityLayer',
                 type: "POST",
                 headers: { "__RequestVerificationToken": this.m_csrfToken },
                 data: JSON.stringify([this.m_DwgId, entityHandle]),
                 contentType: 'application/json; charset=utf-8',
                 success: function (returnObject) {
                     resCallback(returnObject.returnCode, returnObject.LayerName);
                 },
                 error: function (xhr) {
                     resCallback(9);
                 }
             });
         }
         catch (e) {
             resCallback(9);
         }
     },
    this.setEntityLayer = function (entityHandle, layerName, resCallback) {
        var that = this;
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetEntityLayer',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, layerName]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setEntitiesVisibility = function (entityHandles, visibility, resCallback) {
        var that = this;
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetEntitiesVisibility',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandles, visibility]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    that.m_Entity.setEntitiesVisibility(entityHandles, visibility);
                    that.updateViewport(function (retCode) {
                        resCallback(returnObject.returnCode);
                    });
                    //resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setEntityColor = function (entityHandle, autocadColor, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var that = this;
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetEntityColor',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, autocadColor]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    // resCallback(returnObject.returnCode);
                    that.updateViewport(function (retCode) {
                        resCallback(returnObject.returnCode);
                    });
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setEntitiesColor = function (layerName, autocadColor, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetEntitiesColor',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, autocadColor]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getInsidePoint = function (curHandle, cursorIndex, xCoord, yCoord, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetInsidePoint',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, curHandle, cursorIndex, xCoord, yCoord]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.XCoord, returnObject.YCoord);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getMLeaderArrowSize = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetMLeaderArrowSize',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.ArrowSize)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getTextInsertionPoint = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetTextInsertionPoint',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.InsertionPointX, returnObject.InsertionPointY)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getAllEntities = function (layerName, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/GetAllEntities',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName]),
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
            resCallback(9);
        }
    },
    this.getAllContentTexts = function (layerName, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/GetAllContentTexts',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.ContentText)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getContentText = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/GetContentText',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.TextContent)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.get3DEntities = function (layerName, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/Get3DEntities',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName]),
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
            resCallback(9);
        }
    },
    this.getPolylineInfo = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetPolylineInfo',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.IsClosed, returnObject.HasBulges, returnObject.IsOnlyLines, returnObject.VertexCheck)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getAllPolylines = function (layerName, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetAllPolylines',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.ClosedEntityHandles, returnObject.OpenEntityHandles, returnObject.OtherEntityHandles)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getPolylineCoordinates = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetPolylineCoordinates',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.XCoords, returnObject.YCoords)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.searchForText = function (text, isExact, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SearchForText',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, text, isExact]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.TextHandles)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getTextSize = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetTextSize',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.TextSize)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getEntityText = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetEntityText',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.EntityText, returnObject.IsMultiLineText)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getTextProperties = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetTextProperties',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.IsBold, returnObject.IsItalic, returnObject.IsUnderline,
                          returnObject.TextAngle, returnObject.FontName);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getEntityColor = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({

                url: this.m_BaseURL + '/api/iWhiz/GetEntityColor',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.AutocadColor)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setEntityVisibility = function (entityHandle, visibility, resCallback) {
        // if (!this.m_Viewer.m_OpenFlag)
        //     return iWhizError.NOT_OPEND;
        // return this.m_Entity.setEntityVisibility(entityHandle, visibility);
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var that = this;
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetEntityVisibility',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, visibility]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    //resCallback(returnObject.returnCode);
                    that.updateViewport(function (retCode) {
                        resCallback(returnObject.returnCode);
                    });
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setTextUnderline = function (entityHandle, isUnderline, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetTextUnderline',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, isUnderline]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setTextSize = function (entityHandle, size, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetTextSize',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, size]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setText = function (entityHandle, text, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetText',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, text]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setTextStyle = function (entityHandle, textStyle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetTextStyle',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, textStyle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setLineType = function (entityHandle, lineType, lineTypeScale, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetLineType',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, lineType, lineTypeScale]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setMLeaderArrowSize = function (entityHandle, arrowSize, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetMLeaderArrowSize',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, arrowSize]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setLayerColor = function (layerName, autoCadColor, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetLayerColor',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, autoCadColor]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setTransparentBackground = function (entityHandle, autoCadColor, alphaVal, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetTransparentBackground',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId, entityHandle, autoCadColor, alphaVal]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },

    this.getAllBlocks = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetAllBlocks',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.BlockInfo)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getAllBlockRef = function (layerName, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetAllBlockRef',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.BlockRefHandles)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getBlockInfo = function (blockHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetBlockInfo',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, blockHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.BlockName, returnObject.Attributes, returnObject.Comment)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getBlockRefInfo = function (blockrefHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetBlockRefInfo',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, blockrefHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.BlockHandle, returnObject.BlockName, returnObject.Values)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getAllBlockRefOfBlockHandle = function (layerName, blockHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetAllBlockRefOfBlockHandle',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, blockHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.BlockRefHandles)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getAllBlockRefOfBlockName = function (layerName, blockName, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetAllBlockRefOfBlockName',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, blockName]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.BlockRefHandles)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.blockExplode = function (blockrefHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/BlockExplode',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, blockrefHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.TypeId, returnObject.EntityData)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.blockExplodeToEntities = function (blockrefHandle, targetLayer, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/BlockExplodeToEntities',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, blockrefHandle, targetLayer]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(targetLayer, isExist);
                    if (!isExist[0]) {
                        that.getLayerInfo(targetLayer, function (returnCode, isVisible, autocadColor, layerId) {
                            that.m_Layer.addNewLayer(targetLayer, layerId, isVisible);
                            resCallback(returnObject.returnCode, returnObject.NewEntityHandles)
                        });
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.NewEntityHandles)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getPolylinesWithDWGPoint = function (layerName, xCoord, yCoord, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetPolylinesWithPointInEntity',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, xCoord, yCoord]),
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
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createLine = function (layerName, autocadColor, startX, startY, endX, endY, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/CreateLine',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, autocadColor, startX, startY, endX, endY]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(layerName, isExist);
                    if (!isExist[0]) {
                        that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                            that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                            resCallback(returnObject.returnCode, returnObject.EntityHandle)
                        });
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.EntityHandle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createText = function (layerName, autocadColor, startX, startY, angle, height, widthFactor, text, textStyle, styleId, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/CreateText',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, autocadColor, startX, startY, angle, height, widthFactor, text, textStyle, styleId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(layerName, isExist);
                    if (!isExist[0]) {
                        that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                            that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                            resCallback(returnObject.returnCode, returnObject.EntityHandle)
                        });
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.EntityHandle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createMultilineText = function (layerName, autocadColor, startX, startY, angle, height, wrapWidth, lineSpace, text,
        textStyle, styleId, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/CreateMultilineText',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, autocadColor, startX, startY, angle, height,
                    wrapWidth, lineSpace, text, textStyle, styleId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(layerName, isExist);
                    if (!isExist[0]) {
                        that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                            that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                            resCallback(returnObject.returnCode, returnObject.EntityHandle)
                        });
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.EntityHandle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },

    this.createRectangle = function (layerName, autocadColor, centerX, centerY, width, height, lineWidth, lineType, lineTypeScale,
        resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/CreateRectangle',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, autocadColor, centerX, centerY, width, height,
                    lineWidth, lineType, lineTypeScale]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(layerName, isExist);
                    if (!isExist[0]) {
                        that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                            that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                            resCallback(returnObject.returnCode, returnObject.EntityHandle)
                        });
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.EntityHandle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.drawRectangle = function (layerName, autocadColor, lineWidth, lineType, lineTypeScale, resCallback) {
        try {            
            var that = this;
            this.m_Viewer.getRectangle(function (returnCode, leftTop, bottomRight) {
                if (returnCode != 0)
                    resCallback(returnCode, "");
                else {
                    var x0, y0, x1, y1;
                    var avp = that.m_WebApp.viewer.activeViewport;

                    x0 = leftTop.x; y0 = leftTop.y;
                    x1 = bottomRight.x; y1 = bottomRight.y;

                    var centerX, centerY, width, height;
                    centerX = (x0 + x1) / 2;
                    centerY = (y0 + y1) / 2;
                    height = Math.abs(y1 - y0);
                    width = Math.abs(x1 - x0);

                    that.createRectangle(layerName, autocadColor, centerX, centerY, width, height, lineWidth, lineType, lineTypeScale, resCallback);
                }
            });
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.createArc = function (layerName, autocadColor, centerX, centerY, startAngle, endAngle, radious, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/CreateArc',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, autocadColor, centerX, centerY, startAngle, endAngle, radious]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(layerName, isExist);
                    if (!isExist[0]) {
                        that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                            that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                            resCallback(returnObject.returnCode, returnObject.EntityHandle)
                        });
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.EntityHandle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createCircle = function (layerName, autocadColor, centerX, centerY, radius, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/CreateCircle',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, autocadColor, centerX, centerY, radius]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(layerName, isExist);
                    if (!isExist[0]) {
                        that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                            that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                            resCallback(returnObject.returnCode, returnObject.EntityHandle)
                        });
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.EntityHandle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createEllipse = function (layerName, autocadColor, centerX, centerY, vectorX, vectorY, radiusRatio, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/CreateEllipse',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, autocadColor, centerX, centerY, vectorX, vectorY, radiusRatio]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(layerName, isExist);
                    if (!isExist[0]) {
                        that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                            that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                            resCallback(returnObject.returnCode, returnObject.EntityHandle)
                        });
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.EntityHandle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createLeader = function (layerName, autocadColor, points, size, scale, lineType, lineTypeScale, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/CreateLeader',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, autocadColor, points, size, scale, lineType, lineTypeScale, false]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(layerName, isExist);
                    if (!isExist[0]) {
                        that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                            that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                            resCallback(returnObject.returnCode, returnObject.EntityHandle)
                        });
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.EntityHandle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createPolyline = function (layerName, autocadColor, points, lineWidth, lineType, lineTypeScale, isClosed, resCallback) {
        try {

            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/CreatePolyline',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, autocadColor, points, lineWidth, lineType, lineTypeScale, isClosed]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(layerName, isExist);
                    if (!isExist[0]) {
                        that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                            that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                            resCallback(returnObject.returnCode, returnObject.EntityHandle)
                        });
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.EntityHandle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createMultiLeader = function (layerName, autocadColor, startX, startY, endX, endY, arrowSize, dogLength,
                                        landingGap, textHandle, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/CreateMultiLeader',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, autocadColor, startX, startY, endX, endY, arrowSize, dogLength, landingGap, textHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(layerName, isExist);
                    if (!isExist[0]) {
                        that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                            that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                            resCallback(returnObject.returnCode, returnObject.EntityHandle)
                        });
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.EntityHandle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createBlockRef = function (layerName, blockHandle, autocadColor, xCoord, yCoord, angle, scale, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/CreateBlockRef',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, blockHandle, autocadColor, xCoord, yCoord, angle, scale]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(layerName, isExist);
                    if (!isExist[0]) {
                        that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                            that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                            resCallback(returnObject.returnCode, returnObject.EntityHandle)
                        });
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.EntityHandle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },

    //this.createBlock = function (blockName, entityHandles, originX, originY, resCallback) {
    //    try {
    //        $.ajax({
    //            url: this.m_BaseURL + '/api/iWhiz/CreateBlock',
    //            type: "POST",
    //            headers: { "__RequestVerificationToken": this.m_csrfToken },
    //            data: JSON.stringify([this.m_DwgId, blockName, entityHandles, originX, originY]),
    //            contentType: 'application/json; charset=utf-8',
    //            success: function (returnObject) {
    //                resCallback(returnObject.returnCode, returnObject.BlockHandle, returnObject.BlockRefHandle)
    //            },
    //            error: function (xhr) {
    //                resCallback(9);
    //            }
    //        });

    //    }
    //    catch (e) {
    //        return iWhizError.UNEXPECTED_ERROR;
    //    }
    //},

    this.drawEllipseMarkup = function (layerName, autocadColor, centerX, centerY, endX, endY, lineWidth, lineType,
                                        lineTypeScale, isCircle, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/DrawEllipseMarkup',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, autocadColor, centerX, centerY, endX, endY,
                                    lineWidth, lineType, lineTypeScale, isCircle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(layerName, isExist);
                    if (!isExist[0]) {
                        that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                            that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                            resCallback(returnObject.returnCode, returnObject.EntityHandle)
                        });
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.EntityHandle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },

    this.drawCloudMarkup = function (layerName, autocadColor, bulgeSpace, points, lineWidth, lineType,
                                    lineTypeScale, isClosed, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/DrawCloudMarkup',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, autocadColor, bulgeSpace, points, lineWidth,
                                                    lineType, lineTypeScale, isClosed]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(layerName, isExist);
                    if (!isExist[0]) {
                        that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                            that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                            resCallback(returnObject.returnCode, returnObject.EntityHandle)
                        });
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.EntityHandle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createDimension = function (layerName, dimensionType, startX, startY, endX, endY, insertionX, insertionY, textHeight, arrowHeight, autoCadColor, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/CreateDimension',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, dimensionType, startX, startY, endX, endY, insertionX, insertionY, textHeight, arrowHeight, autoCadColor]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(layerName, isExist);
                    if (!isExist[0]) {
                        that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                            that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                            resCallback(returnObject.returnCode, returnObject.EntityHandle)
                        });
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.EntityHandle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.deHighlightEntities = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/DeHighlightEntities',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.deHighlightEntity = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/DeHighlightEntity',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.highlightEntity = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/HighlightEntities',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.highlightPolyline = function (entityHandle, lineWidth, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/HighlightPolyline',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, lineWidth]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.highlightPolylines = function (layerName, lineWidth, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/HighlightPolylines',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, lineWidth]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.highlightEdge = function (entityHandle, autoCadColor, xCoord, yCoord, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/HighlightEdge',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, autoCadColor, xCoord, yCoord]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.HighlightHandle)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },

    this.highlightVertex = function (entityHandle, autoCadColor, xCoord, yCoord, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/HighlightVertex',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, autoCadColor, xCoord, yCoord]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.HighlightHandles)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },

    this.deleteEntities = function (layerName, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/DeleteEntities',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },

    this.mirrorPolyline = function (polylineHandle, pointX, pointY, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/MirrorPolyline',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, polylineHandle, pointX, pointY]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.ActualPoints)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.flipPolyline = function (polylineHandle, pointX, pointY, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/FlipPolyline',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, polylineHandle, pointX, pointY]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.ActualPoints)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },

    this.morphPolyline = function (polylineHandles, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/MorphPolyline',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, polylineHandles]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },

    this.addLineType = function (styleName, dashes, dashLength, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/AddLineType',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, styleName, dashes, dashLength]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.addTextStyle = function (styleName, faceName, bold, italic, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/AddTextStyle',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, styleName, faceName, bold, italic]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.enableSolidFill = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/EnableSolidFill',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.solidFillEnabled = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SolidFillEnabled',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.IsEnabled)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.setLineWeightDisplay = function (lineWeight, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetLineWeightDisplay',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, lineWeight]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.moveEntity = function (entityHandle, xCoord, yCoord, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/MoveEntity',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId, entityHandle, xCoord, yCoord]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
     this.startSvgTrails = function (entityHandle, xCoord, yCoord, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Viewer.m_ArrTrailsPolyline = [];
             var that = this;
             this.getPolylineCoordinates(entityHandle, function (retCode, xCoordinates, yCoordinates) {
                 if (retCode != 0) {
                     resCallBack(retCode);
                 }
                 else {
                     var xCoordArray = xCoordinates.split(that.m_Viewer.m_RowDelimiter);
                     var yCoordArray = yCoordinates.split(that.m_Viewer.m_RowDelimiter);
                     var polygon = [];
                     var X = [0], Y = [0], Z = [0];
                     for (var i = 0 ; i < xCoordArray.length; i++) {
                         if (xCoordArray[i] != "" && yCoordArray[i] != "") {
                             X[0] = parseFloat(xCoordArray[i]);
                             Y[0] = parseFloat(yCoordArray[i]);
                             //that.dwgToClient(X, Y, Z)
                             that.m_Viewer.m_ArrTrailsPolyline.push({ x: X[0], y: Y[0] });
                         }
                     }
                     X[0] = parseFloat(xCoordArray[0]);
                     Y[0] = parseFloat(yCoordArray[0]);
                    // that.dwgToClient(X, Y, Z)
                     that.m_Viewer.m_ArrTrailsPolyline.push({ x: X[0], y: Y[0] });

                     that.m_MovingTrails = true;
                     that.getEntityMidpoint(entityHandle, function (retCode, midX, midY) {
                         X[0] = midX;
                         Y[0] = midY;
                        // that.dwgToClient(X, Y, Z);

                         that.m_Viewer.m_TrailsX = X[0];
                         that.m_Viewer.m_TrailsY = Y[0];
                         resCallback(retCode);
                     });
                 }
             });
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
    this.stopSvgTrails = function () {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                return iWhizError.NOT_OPEND;
            }
            var that = this;
            if (that.m_MovingTrails) {
                that.m_MovingTrails = false;
                if (this.m_Viewer.m_svg != null) {
                    this.m_Viewer.m_DomElement.parentElement.removeChild(this.m_Viewer.m_svg);
                }
                this.m_Viewer.m_svg = null;
                this.m_Viewer.m_TrailsDom = null;
                return 0;
            }
            else {
                return 0;       // added because this function called multiple times
            }
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.startMovingTrails = function (entityHandle, xCoord, yCoord, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var that = this;
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/StartMovingTrails',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId, entityHandle, xCoord, yCoord, true]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    that.m_MovingTrails = true;
                    that.m_Viewer.startMoveTimer();
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.moveWithMovingTrails = function (xCoord, yCoord, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/MoveWithMovingTrails',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId, xCoord, yCoord]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.stopMovingTrails = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var that = this;
            if (that.m_MovingTrails) {
                $.ajax({
                    url: this.m_BaseURL + '/api/iWhiz/StopMovingTrails',
                    type: "POST",
                    headers: {
                        "__RequestVerificationToken": this.m_csrfToken
                    },
                    data: JSON.stringify([this.m_DwgId]),
                    contentType: 'application/json; charset=utf-8',
                    success: function (returnObject) {
                        that.m_MovingTrails = false;
                        clearTimeout(that.m_Viewer.m_MoveTimer);
                        that.m_Viewer.m_MoveTimer = null;
                        resCallback(returnObject.returnCode);
                    },
                    error: function (xhr) {
                        resCallback(9);
                    }
                });
            }
            else {
                resCallback(0);        // added because this function called multiple times
            }
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
     this.getOrderedSymbolPosition = function (polylineHandle, symbolCoordinates, symbolCount, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             var that = this;
             $.ajax({
                 url: this.m_BaseURL + '/api/iWhiz/GetOrderedSymbolPosition',
                 type: "POST",
                 headers: {
                     "__RequestVerificationToken": this.m_csrfToken
                 },
                 data: JSON.stringify([this.m_DwgId, polylineHandle, symbolCoordinates, symbolCount]),
                 contentType: 'application/json; charset=utf-8',
                 success: function (returnObject) {
                     resCallback(returnObject.returnCode, returnObject.InsertPositions, returnObject.ScaleFactor)
                 },
                 error: function (xhr) {
                     resCallback(9);
                 }
             });

         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
    this.insertMultipleSymbol = function (symbolParamArray, resCallback) {
     try {
         var that = this;

         var splitCount = 20;
         if (symbolParamArray.length < splitCount) {
             that.insertMultipleSymbolFromArray(symbolParamArray, resCallback);
         }
         else {
               var finalSymbolHandles = "";
               that.insertMultipleSymbolHandler(symbolParamArray, splitCount, finalSymbolHandles, resCallback);
         }

     }
     catch (e) {
         resCallback(iWhizError.UNEXPECTED_ERROR);
     }
 },
    this.insertMultipleSymbolHandler = function (symbolParamArray, splitCount, finalSymbolHandles, resCallback) {
        var that = this;
        var tempArray = symbolParamArray.slice(0, splitCount);
      
        if (symbolParamArray.length <= splitCount) {
            that.insertMultipleSymbolFromArray(symbolParamArray, function (retCode, symbolHandles) {
                finalSymbolHandles += symbolHandles;
                resCallback(retCode, finalSymbolHandles);
                return;
            });
        }
        else {
            //textArray.splice(0, splitCount);
            symbolParamArray = symbolParamArray.slice(splitCount, symbolParamArray.length);
            that.insertMultipleSymbolFromArray(tempArray, function (retCode, symbolHandles) {
                finalSymbolHandles += symbolHandles;
                that.insertMultipleSymbolHandler(symbolParamArray, splitCount, finalSymbolHandles, resCallback);
            });
        }
    },
    this.insertMultipleSymbolFromArray = function (symbolParamArray, resCallback) {
        var that = this;
        var dataXml = "<INSERTSYMBOL>";
        for (var item in symbolParamArray) {
            dataXml += "<ITEM>";
            var symbolData = symbolParamArray[item];
            dataXml += "<LAYER>";
            dataXml += symbolData[0];
            dataXml += "</LAYER>";
            dataXml += "<COLOR>";
            dataXml += symbolData[1];
            dataXml += "</COLOR>";
            dataXml += "<XCOORD>";
            dataXml += symbolData[2];
            dataXml += "</XCOORD>";
            dataXml += "<YCOORD>";
            dataXml += symbolData[3];
            dataXml += "</YCOORD>";
            dataXml += "<POINTS>";
            dataXml += symbolData[4];
            dataXml += "</POINTS>";
            dataXml += "<LINEWIDTH>";
            dataXml += symbolData[5];
            dataXml += "</LINEWIDTH>";
            dataXml += "<LINETYPE>";
            dataXml += symbolData[6];
            dataXml += "</LINETYPE>";
            dataXml += "<LINETYPESCALE>";
            dataXml += symbolData[7];
            dataXml += "</LINETYPESCALE>";
            dataXml += "</ITEM>";
        }
        dataXml += "</INSERTSYMBOL>";
        $.ajax({
            url: this.m_BaseURL + '/api/iWhiz/InsertMultipleSymbol',
            type: "POST",
            headers: { "__RequestVerificationToken": this.m_csrfToken },
            data: JSON.stringify([this.m_DwgId, dataXml]),
            contentType: 'application/json; charset=utf-8',
            success: function (returnObject) {
                resCallback(returnObject.returnCode, returnObject.EntityHandles);
            },
            error: function (xhr) {
                resCallback(9);
            }
        });
    },
    this.insertSymbol = function (layerName, autoCadColor, xCoord, yCoord, relativePoints, lineWidth, lineType, lineTypeScale, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/InsertSymbol',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, autoCadColor, xCoord, yCoord, relativePoints,
                                                lineWidth, lineType, lineTypeScale]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(layerName, isExist);
                    if (!isExist[0]) {
                        that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                            that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                            resCallback(returnObject.returnCode, returnObject.EntityHandle, returnObject.ActualPoints)
                        });
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.EntityHandle, returnObject.ActualPoints);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.insertSymbolPlus = function (layerName, autoCadColor, xCoord, yCoord, relativePoints, lineWidth, lineType,
                                    lineTypeScale, scaleFactor, rotationAngle, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/InsertSymbolPlus',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, autoCadColor, xCoord, yCoord, relativePoints,
                                                lineWidth, lineType, lineTypeScale, scaleFactor, rotationAngle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(layerName, isExist);
                    if (!isExist[0]) {
                        that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                            that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                            resCallback(returnObject.returnCode, returnObject.EntityHandle, returnObject.ActualPoints)
                        });
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.EntityHandle, returnObject.ActualPoints);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createSymbol = function (layerName, autoCadColor, actualPoints, lineWidth, lineType, lineTypeScale, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/CreateSymbol',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, autoCadColor, actualPoints,
                                                lineWidth, lineType, lineTypeScale]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(layerName, isExist);
                    if (!isExist[0]) {
                        that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                            that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                            resCallback(returnObject.returnCode, returnObject.EntityHandle)
                        });
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.EntityHandle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.moveSymbol = function (entityHandle, xCoord, yCoord, targetX, targetY, midPoint, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/MoveSymbol',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, xCoord, yCoord, targetX, targetY, midPoint]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.ActualPoints, returnObject.MidPoint)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.rotateSymbol = function (entityHandle, baseX, baseY, rotationAngle, midPoint, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var that = this;
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/RotateSymbol',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, baseX, baseY, rotationAngle, midPoint]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    that.updateViewport(function (retCode) {
                        that.m_WebApp.update();
                        resCallback(returnObject.returnCode, returnObject.FinalAngle, returnObject.ActualPoints, returnObject.MidPoint)

                        //resCallback(returnObject.returnCode);
                    });
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.scaleSymbol = function (entityHandle, scaleFactor, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/ScaleSymbol',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, scaleFactor]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.ActualPoints)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createLink = function (layerName, startx, starty, points, scale, angle, autoCadColor, lineWidth, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/CreateLink',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerName, startx, starty,
                                    points, scale, angle, autoCadColor, lineWidth]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(layerName, isExist);
                    if (!isExist[0]) {
                        that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                            that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                            resCallback(returnObject.returnCode, returnObject.Handle)
                        });
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.Handle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.moveLink = function (entityHandle, xCoord, yCoord, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/MoveLink',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, xCoord, yCoord]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR0);
        }
    },
    this.rotateLink = function (entityHandle, xCoord, yCoord, angle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/RotateLink',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, xCoord, yCoord, angle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.rotateBlockRef = function (entityHandle, angle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/RotateBlockRef',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, angle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.scaleBlockRef = function (entityHandle, scale, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/ScaleBlockRef',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId, entityHandle, scale]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.rotateText = function (entityHandle, angle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/RotateText',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, angle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
     this.importEntities = function (fileName, layers, isXref, resCallback) {
         try {
             var that = this;
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             $.ajax({
                 url: this.m_BaseURL + '/api/iWhiz/ImportEntities',
                 type: "POST",
                 headers: {
                     "__RequestVerificationToken": this.m_csrfToken
                 },
                 data: JSON.stringify([this.m_DwgId, fileName, layers, isXref]),
                 contentType: 'application/json; charset=utf-8',
                 success: function (returnObject) {
                     if (returnObject.returnCode == 0 || returnObject.returnCode == 102) {
                         var layerDet = returnObject.LayerData.split(that.m_Viewer.m_RowDelimiter);
                         for (var i = 0; i < layerDet.length - 1; i++) {
                             if (layerDet[i] != "")
                             {
                                 var layerInfo = layerDet[i].split(that.m_Viewer.m_ColumnDelimiter);
                                 var isExist = [0];
                                 that.m_Layer.layerExists(layerInfo[0], isExist);
                                 if (!isExist[0]) {
                                     that.m_Layer.addNewLayer(layerInfo[0], layerInfo[1], layerInfo[2]);
                                 }
                             }
                         }
                     }
                     resCallback(returnObject.returnCode);
                 },
                 error: function (xhr) {
                     resCallback(9);
                 }
             });
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
    this.loadXMLFile = function (fileName, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/LoadXMLFile',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId, fileName]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(returnObject.LayerName, isExist);
                    if (!isExist[0]) {
                        that.m_Layer.addNewLayer(returnObject.LayerName, returnObject.LayerId, returnObject.Visible);
                    }
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.loadXMLString = function (XmlString, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/LoadXMLString',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId, XmlString]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(returnObject.LayerName, isExist);
                    if (!isExist[0]) {
                        that.m_Layer.addNewLayer(returnObject.LayerName, returnObject.LayerId, returnObject.Visible);
                    }
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.hatchEntity = function (layerName, entityHandle, autoCadColor, angle, scale, patternId, isExtents, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            if (patternId == 11)
            {
                var handleArray = [];
                var colorArray = [];
                var mapHandles = [];
                handleArray = entityHandle.split(that.m_Viewer.m_RowDelimiter);
                
                that.colorIndexToRGB(autoCadColor, function (result, r, g, b)
                {
                    if (handleArray.length > 0) {
                        for (var item in handleArray) {
                            if (handleArray[item] != "") {
                                colorArray.push([r, g, b]);
                                mapHandles.push(handleArray[item]);
                            }
                        }
                    }                    
                    that.createMap(mapHandles, colorArray, function (result) {
                        resCallback(result);
                    });
                });
                //scale = 0.1;
               // patternId = 5;
            }
            else
            {
                $.ajax({
                    url: this.m_BaseURL + '/api/iWhiz/HatchEntity',
                    type: "POST",
                    headers: { "__RequestVerificationToken": this.m_csrfToken },
                    data: JSON.stringify([this.m_DwgId, layerName, entityHandle, autoCadColor, angle, scale, patternId, isExtents]),
                    contentType: 'application/json; charset=utf-8',
                    success: function (returnObject) {
                        var isExist = [0];
                        that.m_Layer.layerExists(layerName, isExist);
                        if (!isExist[0]) {
                            that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                                that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                                resCallback(returnObject.returnCode, returnObject.HatchHandle)
                            });
                        }
                        else
                            resCallback(returnObject.returnCode, returnObject.HatchHandle)
                    },
                    error: function (xhr) {
                        resCallback(9);
                    }
                });
            }        
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
   
    this.bringToFront = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/BringToFront',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR0)
        }
    },
    this.pushToBack = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/PushToBack',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.rectify3DEntities = function (entityHandles, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/Rectify3DEntities',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandles]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.closePolyline = function (entityHandle, isclosed, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/ClosePolyline',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, isclosed]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.removeSameTerminalVertex = function (entityHandles, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/RemoveSameTerminalVertex',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandles]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.removeTinyEdges = function (entityHandles, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/RemoveTinyEdges',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandles]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.removeIntermediateVertices = function (entityHandles, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/RemoveIntermediateVertices',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandles]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.deleteEntity = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/DeleteEntity',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.highlightMLeader = function (entityHandle, lineWidth, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/HighlightMLeader',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, lineWidth]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.HighlightHandle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.alignPolylines = function (handlesToAlign, baseHandle, side, offset, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/AlignPolylines',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, handlesToAlign, baseHandle, side, offset]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.distributePolylines = function (handles, distributionType, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/DistributePolylines',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, handles, distributionType]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.distributePolylinesWithOffset = function (handles, distributionType, distributionDirection, offset, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/DistributePolylinesWithOffset',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, handles, distributionType, distributionDirection, offset]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.splitPolyline = function (handle, xCoord1, yCoord1, xCoord2, yCoord2, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SplitPolyline',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, handle, xCoord1, yCoord1, xCoord2, yCoord2]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.NewHandle1, returnObject.NewHandle2);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    //***********************Snap****************
    this.snapSymbol = function (entityHandle, netHandle, startX, startY, targetX, targetY, tolerance, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SnapSymbol',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, netHandle, startX, startY, targetX, targetY, tolerance]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.SnappedAngle, returnObject.MidPoint, returnObject.ActualPoints, returnObject.IsOverlapping);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.snapPolylineEdge = function (entityHandle, targetHandle, startX, startY, targetX, targetY, snapDistance, inOrOut, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SnapPolylineEdge',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, targetHandle, startX, startY, targetX, targetY, snapDistance, inOrOut]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.ActualPoints, returnObject.IsOverlapping, returnObject.SnappedAngle, returnObject.MidPoint);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.snapPolylineEdgeToLine = function (polylineHandle, lineHandle, polylineX, polylineY, lineX, lineY, snapDistance, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SnapPolylineEdgeToLine',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, polylineHandle, lineHandle, polylineX, polylineY, lineX, lineY, snapDistance]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.IfOverlap, returnObject.ActualPoints, returnObject.MidPoint, returnObject.SnappedAngle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.snapEntityToBlock = function (entityHandle, blockHandle, startX, startY, targetX, targetY, accuracy, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SnapEntityToBlock',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, blockHandle, startX, startY, targetX, targetY, accuracy]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.ActualPoints, returnObject.MidPoint);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.snapPolylineVertexToEdge = function (startHandle, targetHandle, startX, startY, targetX, targetY, snapDistance,
                                                ifSnapToMidPoint, inOrOut, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SnapPolylineVertexToEdge',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId, startHandle, targetHandle, startX, startY, targetX,
                                            targetY, snapDistance, ifSnapToMidPoint, inOrOut]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.IfOverlap, returnObject.SnappedAngle,
                                        returnObject.ActualPoints, returnObject.MidPoint);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.snapPolylineVertex = function (entityHandle, targetHandle, xCoord, yCoord, targetX, targetY, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SnapPolylineVertex',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId, entityHandle, targetHandle, xCoord, yCoord, targetX, targetY]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.ActualPoints, returnObject.IsOverlapping, returnObject.MidPoint);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    //***********************Utility****************
    this.rgbToColorIndex = function (red, green, blue, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/RGBToColorIndex',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([red, green, blue]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.ColorIndex)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.colorIndexToRGB = function (index, resCallback) {
        try {
            //if (!this.m_Viewer.m_OpenFlag) {
            //    resCallback(iWhizError.NOT_OPEND);
            //    return;
            //}
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/ColorIndexToRGB',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([index]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.Red, returnObject.Green, returnObject.Blue)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getClosestVertexOnPolyline = function (polylineHandle, xCoord, yCoord, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetClosestVertexOnPolyline',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, polylineHandle, xCoord, yCoord]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.XCoord, returnObject.YCoord)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getClosestPointOnPolyline = function (polylineHandle, xCoord, yCoord, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetClosestPointOnPolyline',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, polylineHandle, xCoord, yCoord]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.XCoord, returnObject.YCoord)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.pointInEntity = function (polylineHandle, xCoord, yCoord, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/PointInEntity',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, polylineHandle, xCoord, yCoord]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.IsInside)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.pointInEntityWithTolerance = function (polylineHandle, xCoord, yCoord, tolerance, pointsToCheck, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/PointInEntityWithTolerance',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, polylineHandle, xCoord, yCoord, tolerance, pointsToCheck]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.IsInside)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.pointInBlockRef = function (entityHandle, xCoord, yCoord, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/PointInBlockRef',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, xCoord, yCoord]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.IsInside)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },

    //***********************Validation****************
    this.setPerformanceIndex = function (index, resCallback) {
        if (!this.m_Viewer.m_OpenFlag) {
            resCallback(iWhizError.NOT_OPEND);
            return;
        }
        try {
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetPerformanceIndex',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, index]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.loadSpaceHandles = function (resCallback) {
        if (!this.m_Viewer.m_OpenFlag) {
            resCallback(iWhizError.NOT_OPEND);
            return;
        }
        try {
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/LoadSpaceHandles',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.loadNetHandles = function (resCallback) {
        if (!this.m_Viewer.m_OpenFlag) {
            resCallback(iWhizError.NOT_OPEND);
            return;
        }
        try {
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/LoadNetHandles',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setHandle = function (entityHandle, isSpace, resCallback) {
        if (!this.m_Viewer.m_OpenFlag) {
            resCallback(iWhizError.NOT_OPEND);
            return;
        }
        try {
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetHandle',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, isSpace]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.releaseHandle = function (entityHandle, isSpace, resCallback) {
        if (!this.m_Viewer.m_OpenFlag) {
            resCallback(iWhizError.NOT_OPEND);
            return;
        }
        try {
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/ReleaseHandle',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle, isSpace]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setSymbol = function (entityHandle, resCallback) {
        if (!this.m_Viewer.m_OpenFlag) {
            resCallback(iWhizError.NOT_OPEND);
            return;
        }
        try {
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetSymbol',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.releaseSymbol = function (entityHandle, resCallback) {
        if (!this.m_Viewer.m_OpenFlag) {
            resCallback(iWhizError.NOT_OPEND);
            return;
        }
        try {
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/ReleaseSymbol',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    }
    this.setLinkHandle = function (entityHandle, resCallback) {
        if (!this.m_Viewer.m_OpenFlag) {
            resCallback(iWhizError.NOT_OPEND);
            return;
        }
        try {
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetLinkHandle',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.releaseLinkHandle = function (entityHandle, resCallback) {
        if (!this.m_Viewer.m_OpenFlag) {
            resCallback(iWhizError.NOT_OPEND);
            return;
        }
        try {
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/ReleaseLinkHandle',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setBlockRefHandle = function (entityHandle, resCallback) {
        if (!this.m_Viewer.m_OpenFlag) {
            resCallback(iWhizError.NOT_OPEND);
            return;
        }
        try {
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetBlockRefHandle',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.InvalidHandles);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.releaseBlockRefHandle = function (entityHandle, resCallback) {
        if (!this.m_Viewer.m_OpenFlag) {
            resCallback(iWhizError.NOT_OPEND);
            return;
        }
        try {
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/ReleaseBlockRefHandle',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.checkNTAndSPOverlapCN = function (tolerance, resCallback) {
        if (!this.m_Viewer.m_OpenFlag) {
            resCallback(iWhizError.NOT_OPEND);
            return;
        }
        try {
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/CheckNTAndSPOverlapCN',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, tolerance]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.InvalidNTHandles, returnObject.InvalidSPHandles);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.verifyNetLayer = function (tolerance, resCallback) {
        if (!this.m_Viewer.m_OpenFlag) {
            resCallback(iWhizError.NOT_OPEND);
            return;
        }
        try {
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/VerifyNetLayer',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, tolerance]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.ValidNTHandles, returnObject.OverlappedNTHandles, returnObject.InvalidNT_GROverlap,
                    returnObject.InvalidNT_IntermediateVertices, returnObject.InvalidNT_UnwantedVertices, returnObject.InvalidNT_TinyEdges,
                    returnObject.OpenNTHandles, returnObject.OtherEntities);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.verifySpaceLayer = function (tolerance, resCallback) {
        if (!this.m_Viewer.m_OpenFlag) {
            resCallback(iWhizError.NOT_OPEND);
            return;
        }
        try {
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/VerifySpaceLayer',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, tolerance]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.ValidSPHandles, returnObject.OverlappedSPHandles, returnObject.InvalidSP_GROverlap,
                    returnObject.InvalidSP_IntermediateVertices, returnObject.InvalidSP_UnwantedVertices, returnObject.InvalidSP_TinyEdges,
                    returnObject.OpenSPHandles, returnObject.OtherEntities);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.validateNetLayer = function (SPOverlapTolerance, NTOverlapTolerance, NTSPOverlapTolerance, areaTolerance, resCallback) {
        if (!this.m_Viewer.m_OpenFlag) {
            resCallback(iWhizError.NOT_OPEND);
            return;
        }
        try {
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/ValidateNetLayer',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, SPOverlapTolerance, NTOverlapTolerance, NTSPOverlapTolerance, areaTolerance]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.ValidSPHandles, returnObject.OverlappedSPHandles,
                                returnObject.InvalidSP_GROverlap, returnObject.InvalidSP_IntermediateVertices,
                                returnObject.InvalidSP_UnwantedVertices, returnObject.InvalidSP_TinyEdges,
                                returnObject.OpenSPHandles_SPLayer, returnObject.OtherEntities_SPLayer,
                                returnObject.ValidNTHandles, returnObject.OverlappedNTHandles, returnObject.InvalidNT_GROverlap,
                                returnObject.InvalidNT_IntermediateVertices, returnObject.InvalidNT_UnwantedVertices,
                                returnObject.InvalidNT_TinyEdges, returnObject.OpenNTHandles_NTLayer, returnObject.OtherEntities_NTLayer,
                                returnObject.ValidNTSPCombination, returnObject.LessAreaNTSPCombination, returnObject.MoreAreaNTSPCombination,
                                returnObject.MultipleNTInSP, returnObject.NTWithMultipleSP, returnObject.NTWithoutSP,
                                returnObject.SPWithoutNT, returnObject.InvalidNT);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.verifyPolylineOverlap = function (firstHandle, secondHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/VerifyPolylineOverlap',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, firstHandle, secondHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.IsOverlapped)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.verifyPolylineAreaOverlap = function (firstHandle, secondHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/VerifyPolylineAreaOverlap',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, firstHandle, secondHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.IsOverlapped)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getGrossCNHandles = function (grossLayer, constructionLayer, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetGrossCNHandles',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, grossLayer, constructionLayer]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.GrossHandle, returnObject.ConstructionHandle)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setiDrawingsLayer = function (layerIndex, layerName, resCallback) {
        try {
            //if (!this.m_Viewer.m_OpenFlag)
            //   resCallback(iWhizError.NOT_OPEND);
            var res = this.m_Layer.setiDrawingsLayer(layerIndex, layerName);
            if (res == 0) {
                $.ajax({
                    url: this.m_BaseURL + '/api/iWhiz/SetIDrawingsLayer',
                    type: "POST",
                    headers: { "__RequestVerificationToken": this.m_csrfToken },
                    data: JSON.stringify([this.m_DwgId, layerIndex, layerName]),
                    contentType: 'application/json; charset=utf-8',
                    success: function (returnObject) {
                        resCallback(returnObject.returnCode);
                    },
                    error: function (xhr) {
                        resCallback(9);
                    }
                });
            }
            else
                return res;
        }
        catch (e) {
            resCallback(9);
        }
    },
   
    this.getHandleWithDWGPoint = function (xcoord, ycoord, isspace, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetHandleWithDWGPoint',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, xcoord, ycoord, isspace]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.EntityHandle)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getSymbolWithDWGPoint = function (xcoord, ycoord, isHighlight, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetSymbolWithDWGPoint',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, xcoord, ycoord, isHighlight]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.EntityHandle)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getLinkHandleWithDWGPoint = function (xcoord, ycoord, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetLinkHandleWithDWGPoint',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, xcoord, ycoord]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.EntityHandle)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getBlockRefWithDWGPoint = function (xcoord, ycoord, ismultiple, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetBlockRefWithDWGPoint',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, xcoord, ycoord, ismultiple]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.EntityHandle)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getHandleWithClientPoint = function (xcoord, ycoord, isspace, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var X = [0], Y = [0], Z = [0];
            X[0] = xcoord; Y[0] = ycoord; Z[0] = 0;
            this.clientToDWG(X, Y, Z);
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetHandleWithDWGPoint',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, X[0], Y[0], isspace]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.EntityHandle)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getSymbolWithClientPoint = function (xcoord, ycoord, isHighlight, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var X = [0], Y = [0], Z = [0];
            X[0] = xcoord; Y[0] = ycoord; Z[0] = 0;
            this.clientToDWG(X, Y, Z);
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetSymbolWithDWGPoint',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, X[0], Y[0], isHighlight]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.EntityHandle)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getLinkHandleWithClientPoint = function (xcoord, ycoord, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var X = [0], Y = [0], Z = [0];
            X[0] = xcoord; Y[0] = ycoord; Z[0] = 0;
            this.clientToDWG(X, Y, Z);
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetLinkHandleWithDWGPoint',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, X[0], Y[0]]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.EntityHandle)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getBlockRefWithClientPoint = function (xcoord, ycoord, ismultiple, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var X = [0], Y = [0], Z = [0];
            X[0] = xcoord; Y[0] = ycoord; Z[0] = 0;
            this.clientToDWG(X, Y, Z);
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetBlockRefWithDWGPoint',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, X[0], Y[0], ismultiple]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.EntityHandle)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getHandleForTooltip = function (xcoord, ycoord, priority, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var X = [0], Y = [0], Z = [0];
            X[0] = xcoord; Y[0] = ycoord; Z[0] = 0;
            this.clientToDWG(X, Y, Z);
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetHandleForTooltip',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, X[0], Y[0], priority]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.EntityHandle, returnObject.HandleType, returnObject.Id, returnObject.IsActionPoint)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getHandleOnPoint = function (xcoord, ycoord, priority, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var X = [0], Y = [0], Z = [0];
            X[0] = xcoord; Y[0] = ycoord; Z[0] = 0;
            this.clientToDWG(X, Y, Z);
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetHandleOnPoint',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, X[0], Y[0], priority]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.EntityHandle, returnObject.HandleType, returnObject.Id, returnObject.IsActionPoint)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.getNetHandlesForSpaceHandle = function (spaceHandle, tolerance, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetNetHandlesForSpaceHandle',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, spaceHandle, tolerance]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.NetHandles)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.getNetAreaPerimeterForSpaceHandles = function (spaceHandle, tolerance, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetNetAreaPerimeterForSpaceHandles',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, spaceHandle, tolerance]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.NetHandles, returnObject.Areas, returnObject.Perimeters)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },

    //***************************************************Client Side APIs***************************************************************
    //***********************Viewer****************
    this.addEvent = function (eventName, handler) {
        return this.m_Viewer.m_EventManager.addEventListener(eventName, handler);
    },
    this.setDWGFileName = function (fileName) {
        return this.m_Viewer.setDWGFileName(fileName);
    },
    this.resize = function (width, height) {
        if (this.m_Viewer)
            return this.m_Viewer.resize(width, height);
    },
    //this.backupViewer = function()
    //{
    //    var that = this;
    //    if (!this.m_Viewer.m_OpenFlag) {
    //        resCallback(iWhizError.NOT_OPEND);
    //        return;
    //    }
    //   // this.m_WebApp.backupLib();
    //    //this.m_backupTLib = Object.assign({}, LibLoader.tlib);
    //    //this.m_backupTLib = jQuery.extend({},  LibLoader.tlib)
    //    //this.m_backupViewer = Object.assign({}, this.m_WebApp); 
    //},
    //this.restoreViewer = function () {
    //    var that = this;
    //    if (!this.m_Viewer.m_OpenFlag) {
    //        resCallback(iWhizError.NOT_OPEND);
    //        return;
    //    }
    //   // this.m_WebApp.restoreLib();
    //    //if (this.m_backupTLib)
    //    //    LibLoader.tlib = this.m_backupTLib;
    //    //if (this.m_backupViewer)
    //    //    this.m_WebApp = this.m_backupViewer;
    //},
    this.initWebViewer = function (canvasName, width, height, topOffset, callback) {
        var that = this;
        var time1 = new Date();
        if (this.checkWebglSupport()) {
            try {
                LibLoader.loadLib(function (tlib) {
                    that.m_WebApp = new WebApp(that, tlib);

                        that.m_Entity = new Entity(that);
                        that.m_Viewer = new Viewer(that);
                        that.m_Zoom = new Zoom(that);
                        
                        that.m_Layer = new Layer(that);
                        that.initViewerTime = new Date() - time1;
                        that.findBaseURL();
                        return that.m_Viewer.initWebViewer(canvasName, width, height, topOffset, callback);
                });
                
            }
            catch (e) {
                if (e.message == "Array buffer allocation failed") {
                    callback(iWhizError.OPENDESIGN_ERROR);
                    return;
                }
                var that = this;
                if (that.m_WebApp != null) {
                    if (that.m_WebApp.tlib == null) {
                        setTimeout(function () {
                            that.initWebViewer(canvasName, width, height, topOffset, callback);
                        }, 500);
                    }
                     else
                       callback(iWhizError.UNEXPECTED_ERROR);
                }
                else {
                    setTimeout(function () {
                        that.initWebViewer(canvasName, width, height, topOffset, callback);
                    }, 500);
                }
                    //callback(iWhizError.WEBAPP_NULL);
            }
        }
        else {
            console.log('This browser does not support WebGL!');
            callback(iWhizError.UNSUPPORTED_BROWSER);
        }

    },
    this.getClientPoint = function (callback) {
        return this.m_Viewer.getClientPoint(callback);
    },
    this.getDWGPoint = function (callback) {
        return this.m_Viewer.getDWGPoint(callback);
    },
    this.getSelectedEntity = function (handle) {
        return this.m_Viewer.getSelectedEntity(handle);
    },
    this.setRenderMode = function (renderMode) {
        return this.m_Viewer.setRenderMode(renderMode);
    },
    this.clearSelection = function () {
        return this.m_Viewer.clearSelection();
    },
    this.getRenderMode = function (renderMode) {
        return this.m_Viewer.getRenderMode(renderMode);
    },
    this.getRenderingModes = function () {
        return this.m_Viewer.getRenderingModes();
    },
    this.setDisplay = function (status) {
        return this.m_Viewer.setDisplay(status);
    },
    this.display = function (resCallback) {
       return this.m_Viewer.display(resCallback);
    },
    this.clientToDWG = function (x, y, z) {
        return this.m_Viewer.clientToDWG(x, y, z);
    },
    this.dwgToClient = function (x, y, z) {
        return this.m_Viewer.dwgToClient(x, y, z);
    },
    this.clientDWGAreaRatio = function (areaRatio) {
        return this.m_Viewer.clientDWGAreaRatio(areaRatio);
    },
    this.getCurrentClientDWGRatio = function (areaRatio) {
        return this.m_Viewer.getCurrentClientDWGRatio(areaRatio);
    },
    this.getBackgroundColor = function (red, green, blue) {
        return this.m_Viewer.getBackgroundColor(red, green, blue);
    },
    this.pan = function () {
        return this.m_Viewer.pan();
    },
    this.setCursor = function (cursorIndex) {
        return this.m_Viewer.setCursor(cursorIndex, true);
    },
    this.setApplicationMode = function (applicationMode) {
        return this.m_Viewer.setApplicationMode(applicationMode);
    },
    this.blinkEntities = function (positions, red, green, blue, size, delay, handles) {
        return this.m_Viewer.blinkEntities(positions, red, green, blue, size, delay, handles);
    },
    this.blinkEntitiesByHandles = function (handles, red, green, blue, size, delay, callBack) {
        return this.m_Viewer.blinkEntitiesByHandles(handles, red, green, blue, size, delay, callBack);
    },
    this.removeBlinkers = function () {
        return this.m_Viewer.removeBlinkers();
    },
    this.removeBlinksByHandle = function (handles) {
        return this.m_Viewer.removeBlinksByHandle(handles);
    },
    this.enableRubberband = function (xCoord, yCoord, zCoord, isEnable) {
        return this.m_Viewer.enableRubberband(xCoord, yCoord, zCoord, isEnable);
    },
    this.exitWaitMode = function () {
        return this.m_Viewer.exitWaitMode();
    },
    this.isWaitMode = function (status) {
        return this.m_Viewer.isWaitMode(status);
    },
    this.getRectangle = function (callback) {
        return this.m_Viewer.getRectangle(callback);
    },
    this.addMarkup = function (layerName, angle, lineWidth, lineType, lineTypeScale, autoCADColor, resCallback) {
        return this.m_Viewer.addMarkup(layerName, angle, lineWidth, lineType, lineTypeScale, autoCADColor, resCallback);
    },
    this.getDWGExtents = function (points) {
        return this.m_Viewer.getDWGExtents(points);
    },
    this.enableOrbit = function (isEnable) {
        return this.m_Viewer.enableOrbit(isEnable);
    },
    this.enableMeasureToolTip = function () {
        return this.m_Viewer.enableMeasureToolTip();
    },
    this.enableTooltip = function (isEnable) {
        return this.m_Viewer.enableTooltip(isEnable);
    },
    this.showTooltip = function (tooltipText) {
        return this.m_Viewer.showTooltip(tooltipText);
    },
    this.setTooltipPriority = function (priority) {
        return this.m_Viewer.setTooltipPriority(priority);
    },
    this.getSaveFileTypes = function (fileTypes) {

        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;

        try {
            fileTypes[0] = "AutoCAD 2013";
            fileTypes[1] = "AutoCAD 2010";
            fileTypes[2] = "AutoCAD 2007";
            fileTypes[3] = "AutoCAD 2004";
            fileTypes[4] = "AutoCAD 2000";
            fileTypes[5] = "Release 14";
            fileTypes[6] = "Release 13";
            fileTypes[7] = "Release 12";
            return 0;
        }
        catch (e) {
            return 9;
        }
    },

    //***********************Layer****************   
    this.setLayerInfo = function (data) {
        return this.m_Layer.setLayerInfo(data);
    },
    this.getLayerName = function (layerId, name) {
        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;

        return this.m_Layer.getLayerName(layerId, name);
    },
    this.getLayerId = function (layerName, layerId) {
        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        return this.m_Layer.getLayerId(layerName, layerId);
    },
    this.layerExists = function (layerName, isExist) {
        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        return this.m_Layer.layerExists(layerName, isExist);
    },
    this.getLayerVisibility = function (layerName, isVisible) {
        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        return this.m_Layer.getLayerVisibility(layerName, isVisible);
    },
    this.getLayerCount = function (layerCount) {
        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        return this.m_Layer.getLayerCount(layerCount);
    },
    this.hideAllLayers = function (resCallBack) {
        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        return this.m_Layer.hideAllLayers(this.m_Viewer, resCallBack);
    },
    this.showAllLayers = function (resCallBack) {
        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        return this.m_Layer.showAllLayers(this.m_Viewer, resCallBack);
    },
    this.setMandatoryLayer = function (layerName) {
        return this.m_Layer.setMandatoryLayer(layerName);

    },
    this.releaseMandatoryLayer = function (layerName) {
        return this.m_Layer.releaseMandatoryLayer(layerName);

    },
    this.setApplicationLayer = function (layerName) {
        return this.m_Layer.setApplicationLayer(layerName);
    },
    this.releaseApplicationLayer = function (layerName) {
        return this.m_Layer.releaseApplicationLayer(layerName);
    },
    this.setDefaultLayer = function (layerName) {
        return this.m_Layer.setDefaultLayer(layerName);
    },
    this.releaseDefaultLayer = function (layerName) {
        return this.m_Layer.releaseDefaultLayer(layerName);
    },
    this.showDefaultLayer = function () {
        return this.m_Layer.showDefaultLayer(this.m_Viewer);
    },
    this.getiDrawingsLayer = function (layerIndex, layerName) {
        return this.m_Layer.getiDrawingsLayer(layerIndex, layerName);
        //return this.m_Layer.showDefaultLayer();
    },
    this.getAlliDrawingsLayers = function (layerNames) {
        return this.m_Layer.getAlliDrawingsLayers(layerNames);
    },
    this.getiDrawingsPolylineType = function (layerName, type) {
        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        return this.m_Layer.getiDrawingsPolylineType(layerName, type);
    },
    this.getMissingMandatoryLayer = function (missingLayers) {
        return this.m_Layer.getMissingMandatoryLayer(missingLayers);
    },

    //***********************Zoom****************
    this.zoomExtents = function (resCallback) {
        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;

        var that = this;
        $.ajax({
            url: this.m_BaseURL + '/api/iWhiz/ZoomExtents',
            type: "POST",
            headers: { "__RequestVerificationToken": this.m_csrfToken },
            data: JSON.stringify([this.m_DwgId, this.m_WebApp.getFieldWidth(), this.m_WebApp.getFieldHeight(), this.m_WebApp.getViewPosition()[0], this.m_WebApp.getViewPosition()[1]]),
            contentType: 'application/json; charset=utf-8',
            success: function (returnObject) {
                that.updateViewport(function (retCode) {
                    resCallback(returnObject.returnCode);
                });
            },
            error: function (xhr) {
                resCallback(9);
            }
        });
        // return this.m_Zoom.zoomExtents();
    },
    this.updateViewport = function (resCallback) {
         if (!this.m_Viewer.m_OpenFlag)
             return iWhizError.NOT_OPEND;
         var viewParams = this.m_WebApp.viewer.getViewString();
         var canvasRect = this.m_Viewer.m_DomElement.getBoundingClientRect();
         console.log("updateviewport");
         var that = this;
         $.ajax({
             url: this.m_BaseURL + '/api/iWhiz/UpdateViewport',
             type: "POST",
             headers: { "__RequestVerificationToken": this.m_csrfToken },
             data: JSON.stringify([this.m_DwgId, viewParams, this.m_Viewer.m_DomElement.width, this.m_Viewer.m_DomElement.height]),
             contentType: 'application/json; charset=utf-8',
             success: function (returnObject) {
                 resCallback(returnObject.returnCode)
             },
             error: function (xhr) {
                 resCallback(9);
             }
         });
         // return this.m_Zoom.zoomExtents();
     },
      this.zoomIn = function () {
          if (!this.m_Viewer.m_OpenFlag)
              return iWhizError.NOT_OPEND;
          var retCode = this.m_Zoom.zoomIn();
          this.updateViewport(function () { });
          return retCode;
      },
    this.zoomOut = function () {
        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        var retCode = this.m_Zoom.zoomOut();
        this.updateViewport(function () { });
        return retCode;
    },
    this.zoomByFactor = function (zoomFactor) {
        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        return this.m_Zoom.zoomByFactor(zoomFactor);
    },
    this.zoomEntity = function (entityHandle, resCallBack) {
        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        this.m_Zoom.zoomEntity(entityHandle, resCallBack);
    },
    this.zoomEntityByOffset = function (entityHandle, offset, resCallBack) {
        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        this.m_Zoom.zoomEntityByOffset(entityHandle, offset, resCallBack);
    },
    this.zoomRectArea = function (minX, minY, maxX, maxY) {
        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        return this.m_Zoom.zoomRectArea(minX, minY, maxX, maxY, 0.1);
    },
    this.zoomWindow = function () {
        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        return this.m_Zoom.zoomWindow();
    },
    this.disableZoom = function()
    {
        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        this.m_Viewer.m_ZoomFlag = false;
    },
    //***********************Entity****************
    //this.getEntityExtents = function (entityHandle, points) {
    //    if (!this.m_Viewer.m_OpenFlag)
    //        return iWhizError.NOT_OPEND;
    //    return this.m_Entity.getEntityExtents(entityHandle, points);
    //},
    //this.getEntityMidpoint = function (entityHandle, points) {
    //    if (!this.m_Viewer.m_OpenFlag)
    //        return iWhizError.NOT_OPEND;
    //    return this.m_Entity.getEntityMidpoint(entityHandle, points);
    //},
    //this.getEntityLayer = function (entityHandle, layer) {
    //    if (!this.m_Viewer.m_OpenFlag)
    //        return iWhizError.NOT_OPEND;
    //    return this.m_Entity.getEntityLayer(entityHandle, layer, this.m_Layer);
    //},
    this.getEntityVisibility = function (entityHandle, visibility) {
        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        return this.m_Entity.getEntityVisibility(entityHandle, visibility)
    },
    //this.getEntityLayerId = function (entityHandle, layer) {
    //    if (!this.m_Viewer.m_OpenFlag)
    //        return iWhizError.NOT_OPEND;
    //    return this.m_Entity.getEntityLayerId(entityHandle, layer)
    //},
    //this.setEntitiesVisibility = function (entityHandles, visibility) {
    //    if (!this.m_Viewer.m_OpenFlag)
    //        return iWhizError.NOT_OPEND;
    //    return this.m_Entity.setEntitiesVisibility(entityHandles, visibility);
    //},
    //this.setEntityLayer = function (entityHandle, layerName) {
    //    if (!this.m_Viewer.m_OpenFlag)
    //        return iWhizError.NOT_OPEND;
    //    return this.m_Entity.setEntityLayer(entityHandle, layerName, this.m_Layer);
    //},
    //this.moveEntity = function (entityHandle, xCoord, yCoord) {
    //    if (!this.m_Viewer.m_OpenFlag)
    //        return iWhizError.NOT_OPEND;
    //    return this.m_Entity.moveEntity(entityHandle, xCoord, yCoord, this.m_Viewer);
    //},
    //this.highlightEntity = function (entityHandle, isHighlight) {
    //    return this.m_Entity.highlightEntity(entityHandle, isHighlight);
    //},
    this.getEntityWithClientPoint = function (layerName, typeId, xCoord, yCoord, cursorIndex, callback) {
        this.clearSelection();
        return this.m_Viewer.getEntityWithClientPoint(layerName, typeId, xCoord, yCoord, cursorIndex, callback);
    },
    this.getEntityWithDWGPoint = function (layerName, typeId, xCoord, yCoord, cursorIndex, callback) {
        this.clearSelection();
        var X = [0], Y = [0], Z = [0];
        X[0] = xCoord; Y[0] = yCoord; Z[0] = 0;
        this.dwgToClient(X, Y, Z);
        return this.m_Viewer.getEntityWithClientPoint(layerName, typeId, X[0], Y[0], cursorIndex, callback);
    },
    this.getPolylinesWithClientPoint = function (layerName, xCoord, yCoord, callback) {
        this.clearSelection();
        var X = [0], Y = [0], Z = [0];
        X[0] = xCoord; Y[0] = yCoord; Z[0] = 0;
        this.clientToDWG(X, Y, Z);
        return this.getPolylinesWithDWGPoint(layerName, X[0], Y[0], callback);
    },
    this.selectPolylines = function (layername, cursorindex, iswindow, callback) {
        this.clearSelection();
        this.m_Viewer.m_SelHandleArray = [];
        return this.m_Viewer.selectEntities(layername, 9, cursorindex, iswindow, true, callback);
    },
    this.selectPolylinesByWindow = function (layername, callback) {
        this.clearSelection();
        return this.m_Viewer.selectPolylinesByWindow(layername, callback);
    },
    this.selectEntity = function (layername, typeid, cursorindex, callback) {
        this.clearSelection();
        return this.m_Viewer.selectEntity(layername, typeid, cursorindex, callback);
    },
    this.selectEntitiesByWindow = function (layername, typeid, callback) {
        this.clearSelection();
        return this.m_Viewer.selectEntitiesByWindow(layername, typeid, callback);
    },
    this.selectEntities = function (layername, typeid, cursorindex, iswindow, callback) {
        this.clearSelection();
        this.m_Viewer.m_SelHandleArray = [];
        return this.m_Viewer.selectEntities(layername, typeid, cursorindex, iswindow, true, callback);
    },
    this.selectEntitiesByTypes = function (layername, typeid, cursorindex, iswindow, callback) {
        this.clearSelection();
        this.m_Viewer.m_SelHandleArray = [];
        return this.m_Viewer.selectEntitiesByTypes(layername, typeid, cursorindex, iswindow, true, callback);
    },
    this.getEntitiesWithRegion = function (layername, leftTop, bottomRight, typeid, callback) {
        this.clearSelection();
        return this.m_Viewer.getEntitiesWithRegion(layername, leftTop, bottomRight, typeid, callback);
    },
    this.selectSymbols = function (iswindow, hatchlayername, color, angle, scale, patternid, callback) {
        this.clearSelection();
        this.m_Viewer.m_SelHandleArray = [];
        return this.m_Viewer.selectSymbols(iswindow, true, hatchlayername, color, angle, scale, patternid, callback);
    },
    this.selectSymbolsByWindow = function (callback) {
        this.clearSelection();
        return this.m_Viewer.selectSymbolsByWindow(callback);
    },
    this.selectHandles = function (isspace, iswindow, hatchlayername, color, angle, scale, patternid, callback) {
        this.clearSelection();
        this.m_Viewer.m_SelHandleArray = [];
        return this.m_Viewer.selectHandles(isspace, iswindow, true, hatchlayername, color, angle, scale, patternid, callback);
    },
    this.selectHandle = function (isspace, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }

            this.clearSelection();
            var isVisible = [0]
            if (isspace)
                this.getLayerVisibility(this.m_Layer.m_SpaceLayer, isVisible);
            else
                this.getLayerVisibility(this.m_Layer.m_NetLayer, isVisible);

            if (isVisible[0]) {
                var result = this.getDWGPoint(function (retCode, x, y) {
                    if (retCode == 0) {
                        result = objiWhiz.getHandleWithDWGPoint(x, y, isspace, function (retCode, EntityHandle) {
                            resCallback(retCode, EntityHandle)
                        });
                        //if (result != 0)
                        //    resCallback(result,"")
                    }
                    else
                        resCallback(retCode, "");
                });
                if (result != 0) resCallback(result);
            }
            else
                resCallback(45);
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.selectSymbol = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var that = this;
            this.clearSelection();
            var result = this.getDWGPoint(function (retCode, x, y) {
                if (retCode == 0) {
                    that.getSymbolWithDWGPoint(x, y, false, function (retCode, EntityHandle) {
                        resCallback(retCode, EntityHandle);
                    });
                }
                else
                    resCallback(retCode, "");
                if (result != 0) resCallback(result);
            });
            if (result != 0) resCallback(result);

        }
        catch (e) {
            resCallback(9);
        }
    },
    this.selectLinkHandle = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.clearSelection();
            var result = this.getDWGPoint(function (retCode, x, y) {
                if (retCode == 0) {
                    objiWhiz.getLinkHandleWithDWGPoint(x, y, function (retCode, EntityHandle) {
                        resCallback(retCode, EntityHandle)
                    });
                }
                else
                    resCallback(retCode, "");
                if (result != 0) resCallback(result);
            });
            if (result != 0) resCallback(result);

        }
        catch (e) {
            resCallback(9);
        }
    },
    this.selectHandlesByWindow = function (isspace, callback) {
        this.clearSelection();
        return this.m_Viewer.selectHandlesByWindow(isspace, callback);
    },

    //***********************Tools****************
    this.getMaximumRectangle = function (polylineHandle, resCallBack) {
        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        var that = this;
        this.getPolylineCoordinates(polylineHandle, function (retCode, xCoordinates, yCoordinates) {
            if (retCode != 0) {
                resCallBack(retCode);
            }
            else {
                var xCoordArray = xCoordinates.split(that.m_Viewer.m_RowDelimiter);
                var yCoordArray = yCoordinates.split(that.m_Viewer.m_RowDelimiter);
                var polygon = [];
                for (var i = 0 ; i < xCoordArray.length; i++) {
                    if (xCoordArray[i] != "" && yCoordArray[i] != "")
                        polygon.push([parseFloat(xCoordArray[i]), parseFloat(yCoordArray[i])]);
                }
                var resultObject = Tools.findLargestRect(polygon, null);

                var rectWidth = resultObject[0].width / 2;
                var rectHeight = resultObject[0].height / 2;
                var rectCoords = [];
                rectCoords.push([resultObject[0].cx - rectWidth, (resultObject[0].cy - rectHeight)]);
                rectCoords.push([resultObject[0].cx + rectWidth, (resultObject[0].cy - rectHeight)]);
                rectCoords.push([resultObject[0].cx + rectWidth, (resultObject[0].cy + rectHeight)]);
                rectCoords.push([resultObject[0].cx - rectWidth, (resultObject[0].cy + rectHeight)]);

                var centerX = resultObject[0].cx;
                var centerY = resultObject[0].cy;
                resCallBack(0, rectCoords, centerX, centerY);
            }
        });
    },
    this.getMaximumRectangleMultiple = function (polylineHandles, resCallBack) {
        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        var that = this;
        this.getPolylineCoordsMultiple(polylineHandles, function (retCode, xCoordinates, yCoordinates) {
            var xCoords, yCoords;
            xCoords = xCoordinates.split(that.m_Viewer.m_RowDelimiter);
            yCoords = yCoordinates.split(that.m_Viewer.m_RowDelimiter);
            var centerX = "", centerY = "";
            var rectCoords = [];
            var centerPoints = [];
            for (var index = 0; index < xCoords.length; index++) {
                if (xCoords[index] != "" && yCoords[index] != "") {
                    if (retCode != 0) {
                        resCallBack(retCode);
                    }
                    else {
                        var xCoordArray = xCoords[index].split(that.m_Viewer.m_ColumnDelimiter);
                        var yCoordArray = yCoords[index].split(that.m_Viewer.m_ColumnDelimiter);
                        var polygon = [];
                        for (var i = 0 ; i < xCoordArray.length; i++) {
                            if (xCoordArray[i] != "" && yCoordArray[i] != "")
                                polygon.push([parseFloat(xCoordArray[i]), parseFloat(yCoordArray[i])]);
                        }

                        var resultObject = Tools.findLargestRect(polygon, null);

                        var rectWidth = resultObject[0].width / 2;
                        var rectHeight = resultObject[0].height / 2;
                        rectCoords.push([[resultObject[0].cx - rectWidth, (resultObject[0].cy - rectHeight)], [resultObject[0].cx + rectWidth, (resultObject[0].cy - rectHeight)], [resultObject[0].cx + rectWidth, (resultObject[0].cy + rectHeight)], [resultObject[0].cx - rectWidth, (resultObject[0].cy + rectHeight)]]);

                        centerPoints.push({ x: resultObject[0].cx, y: resultObject[0].cy });
                    }
                }
            }
            resCallBack(0, rectCoords, centerPoints);
        });
    },
    this.getDistance = function (x1, y1, x2, y2, normalDistance, horizontalDistance, verticalDistance) {
        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        return Tools.getDistance(x1, y1, x2, y2, normalDistance, horizontalDistance, verticalDistance);

    },
    this.measureDistance = function (measureMode, x1, y1, x2, y2, distance) {
        if (!this.m_Viewer.m_OpenFlag)
            return iWhizError.NOT_OPEND;
        return Tools.measureDistance(measureMode, x1, y1, x2, y2, distance);
    },
    //this.getClosestPointOnPolyline = function (entityHandle, xCoord, yCoord, resCallBack) {
    //    if (!this.m_Viewer.m_OpenFlag) {
    //        resCallback(iWhizError.NOT_OPEND);
    //        return;
    //    }

    //    var that = this;
    //    if (entityHandle == "") {
    //        resCallBack(iWhizError.HANDLE_INVALID);
    //        return;
    //    }

    //    var coordinates = [0];
    //    this.getPolylineCoordinates(entityHandle, function (retCode, xCoordinates, yCoordinates) {
    //        if (retCode != 0) {
    //            resCallBack(retCode, 0, 0);
    //        }
    //        else {
    //            var xCoordArray = xCoordinates.split(that.m_Viewer.m_RowDelimiter);
    //            var yCoordArray = yCoordinates.split(that.m_Viewer.m_RowDelimiter);
    //            var x = [xCoord], y = [yCoord];
    //            var result = Tools.getClosestPointOnPolyline(xCoordArray, yCoordArray, x, y);
    //            resCallBack(result, x[0], y[0]);
    //        }
    //    });
    //},


    //***********************Context Menu****************
    //this.setContextMenuItems = function (parent, child, apend) {
    //    return this.context1.setContextMenuItems(parent, child, apend);
    //},
    //this.removeMenuItems = function (parent, child) {
    //    return this.context1.removeMenuItems(parent, child);
    //}

    //***********************iDrawing Support wrappers****************
    this.getEntityLayerMultiple = function (entityHandles, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetEntityLayerMultiple',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandles]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.LayerNames);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.setiDrawingsLayers = function (layerArray, resCallback) {
        try {
            //if (!this.m_Viewer.m_OpenFlag)
            //   resCallback(iWhizError.NOT_OPEND);
            var layerInput = "";
            for (var item in layerArray) {
                if (layerArray[item] != "") {
                    layerInput += layerArray[item][0] + this.m_Viewer.m_ColumnDelimiter + layerArray[item][1] + this.m_Viewer.m_RowDelimiter;
                    this.m_Layer.setiDrawingsLayer(layerArray[item][0], layerArray[item][1]);
                }
            }
            //resCallback(0);
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/SetIDrawingsLayers',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, layerInput]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.initialLoadSettings = function (index, isSpace, resCallback) {
       if (!this.m_Viewer.m_OpenFlag) {
           resCallback(iWhizError.NOT_OPEND);
           return;
       }
       try {
           $.ajax({
               url: this.m_BaseURL + '/api/iWhiz/InitialLoadSettings',
               type: "POST",
               headers: { "__RequestVerificationToken": this.m_csrfToken },
               data: JSON.stringify([this.m_DwgId, index, isSpace]),
               contentType: 'application/json; charset=utf-8',
               success: function (returnObject) {
                   resCallback(returnObject.returnCode);
               },
               error: function (xhr) {
                   resCallback(9);
               }
           });
       }
       catch (e) {
           resCallback(9);
       }
   },

    this.createDataText = function (textArray, layerName, autocadColor, angle, height,
                   wrapWidth, lineSpace, textStyle, styleId, resCallback) {
       try {
           var that = this;
           if (!this.m_Viewer.m_OpenFlag) {
               resCallback(iWhizError.NOT_OPEND);
               return;
           }
           var splitCount = 20;
           if (textArray.length < splitCount) {
               that.createDataFromArray(textArray, layerName, autocadColor, angle, height,
                   wrapWidth, lineSpace, textStyle, styleId, resCallback);
           }
           else {
               var finalTextHandles = "";
               that.createDataHandler(textArray, layerName, autocadColor, angle, height,
                  wrapWidth, lineSpace, textStyle, styleId, splitCount, finalTextHandles, resCallback);
           }
           //var that = this;
           //debugger
           //if (!this.m_Viewer.m_OpenFlag) {
           //    resCallback(iWhizError.NOT_OPEND);
           //    return;
           //}
           //var tempColumnDelimiter = this.m_Viewer.m_ColumnDelimiter;
           //var spaceInput = "{ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"3\"},{\"ReportFieldId\":781,\"Value\":\"742\"}]}";
           //var displayStngInput = "{ListReportFieldIdValues:[{\"ReportFieldId\":182,\"Value\":\"1\"},{\"ReportFieldId\":24,\"Value\":\"7\"}]}"
           //$.ajax({
           //    url: this.m_BaseURL + '/api/iWhiz/createDataTextOnServer',
           //    type: "POST",
           //    headers: { "__RequestVerificationToken": this.m_csrfToken },
           //    data: JSON.stringify([tempColumnDelimiter, 742, 3, spaceInput, displayStngInput, 2.894355625942751]),
           //    contentType: 'application/json; charset=utf-8',
           //    success: function (returnObject) {
           //        var isExist = [0];
           //        that.m_Layer.layerExists(layerName, isExist);
           //        if (!isExist[0]) {
           //            that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
           //                that.m_Layer.addNewLayer(layerName, layerId, isVisible);
           //                resCallback(returnObject.returnCode, returnObject.EntityHandles)
           //            });
           //        }
           //        else
           //            resCallback(returnObject.returnCode, returnObject.EntityHandles);
           //    },
           //    error: function (xhr) {
           //        resCallback(9);
           //    }
           //});

       }
       catch (e) {
           resCallback(iWhizError.UNEXPECTED_ERROR);
       }
   },
    this.createDataHandler = function (textArray, layerName, autocadColor, angle, height,
                   wrapWidth, lineSpace, textStyle, styleId, splitCount, finalTextHandles, resCallback) {
       var that = this;
       var tempArray = textArray.slice(0, splitCount);

       if (textArray.length <= splitCount) {
           that.createDataFromArray(textArray, layerName, autocadColor, angle, height,
                   wrapWidth, lineSpace, textStyle, styleId, function (retCode, textHandles) {
                       finalTextHandles += textHandles;
                       resCallback(retCode, finalTextHandles);
                       return;
                   });
       }
       else {
           //textArray.splice(0, splitCount);
           textArray = textArray.slice(splitCount, textArray.length);
           that.createDataFromArray(tempArray, layerName, autocadColor, angle, height,
                   wrapWidth, lineSpace, textStyle, styleId, function (retCode, textHandles) {
                       finalTextHandles += textHandles;
                       that.createDataHandler(textArray, layerName, autocadColor, angle, height,
                               wrapWidth, lineSpace, textStyle, styleId, splitCount, finalTextHandles, resCallback);
                   });
       }
   },
    this.createDataFromArray = function (textArray, layerName, autocadColor, angle, height,
                   wrapWidth, lineSpace, textStyle, styleId, resCallback) {
       var that = this;
       var dataXml = "<TEXT_DATA>";
       for (var item in textArray) {
           dataXml += "<TEXT_ITEM>";
           var textData = textArray[item];
           dataXml += "<TEXT_STRING>";
           dataXml += textData[0];
           dataXml += "</TEXT_STRING>";
           dataXml += "<TEXT_POSITION>";
           dataXml += textData[1] + that.m_Viewer.m_ColumnDelimiter + textData[2];
           dataXml += "</TEXT_POSITION>";
           dataXml += "</TEXT_ITEM>";
       }
       dataXml += "</TEXT_DATA>";
       $.ajax({
           url: this.m_BaseURL + '/api/iWhiz/CreateDataText',
           type: "POST",
           headers: { "__RequestVerificationToken": this.m_csrfToken },
           data: JSON.stringify([this.m_DwgId, layerName, autocadColor, angle, height,
               wrapWidth, lineSpace, textStyle, styleId, dataXml]),
           contentType: 'application/json; charset=utf-8',
           success: function (returnObject) {
               var isExist = [0];
               that.m_Layer.layerExists(layerName, isExist);
               if (!isExist[0]) {
                   that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                       that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                       resCallback(returnObject.returnCode, returnObject.EntityHandles)
                   });
               }
               else
                   resCallback(returnObject.returnCode, returnObject.EntityHandles);
           },
           error: function (xhr) {
               resCallback(9);
           }
        });
    },
    
    this.createCommonSymbolwithData = function (dataArray, textLayerName, textColor, textAngle, textHeight,
                   textWrapWidth, textLineSpace, textStyle, textStyleId, symbolLayer, symbolColor, 
                   symbolCords, symbolLineWidth, symbolLineType, symbolScale, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var splitCount = 20;
            if (dataArray.length < splitCount) {
                that.createCommonSymbolDataFromArray(dataArray, textLayerName, textColor, textAngle, textHeight,
                   textWrapWidth, textLineSpace, textStyle, textStyleId, symbolLayer, symbolColor,
                   symbolCords, symbolLineWidth, symbolLineType, symbolScale, resCallback);
            }
            else {
                var finalTextHandles = "";
                var finalSymbolHandles = "";
                that.createCommonSymbolDataHandler(dataArray, textLayerName, textColor, textAngle, textHeight,
                   textWrapWidth, textLineSpace, textStyle, textStyleId, symbolLayer, symbolColor,
                   symbolCords, symbolLineWidth, symbolLineType, symbolScale, splitCount, finalTextHandles, finalSymbolHandles, resCallback);
            }

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createCommonSymbolDataHandler = function (dataArray, textLayerName, textColor, textAngle, textHeight,
                   textWrapWidth, textLineSpace, textStyle, textStyleId, symbolLayer, symbolColor,
                   symbolCords, symbolLineWidth, symbolLineType, symbolScale, splitCount, finalTextHandles, finalSymbolHandles, resCallback) {
        var that = this;
        var tempArray = dataArray.slice(0, splitCount);

        if (dataArray.length <= splitCount) {
            that.createCommonSymbolDataFromArray(dataArray, textLayerName, textColor, textAngle, textHeight,
                   textWrapWidth, textLineSpace, textStyle, textStyleId, symbolLayer, symbolColor,
                   symbolCords, symbolLineWidth, symbolLineType, symbolScale, function (retCode, textHandles, symbolHandles) {
                       finalTextHandles += textHandles;
                       finalSymbolHandles += symbolHandles;
                       resCallback(retCode, finalTextHandles, finalSymbolHandles);
                        return;
                    });
        }
        else {
            dataArray = dataArray.slice(splitCount, dataArray.length);
            //dataArray.splice(0, splitCount);
            that.createCommonSymbolDataFromArray(tempArray, textLayerName, textColor, textAngle, textHeight,
                   textWrapWidth, textLineSpace, textStyle, textStyleId, symbolLayer, symbolColor,
                   symbolCords, symbolLineWidth, symbolLineType, symbolScale, function (retCode, textHandles, symbolHandles) {
                       finalTextHandles += textHandles;
                       finalSymbolHandles += symbolHandles;
                        that.createCommonSymbolDataHandler(dataArray, textLayerName, textColor, textAngle, textHeight,
                   textWrapWidth, textLineSpace, textStyle, textStyleId, symbolLayer, symbolColor,
                   symbolCords, symbolLineWidth, symbolLineType, symbolScale, splitCount, finalTextHandles, finalSymbolHandles, resCallback);
                    });
        }
    },
    this.createCommonSymbolDataFromArray = function (dataArray, textLayerName, textColor, textAngle, textHeight,
                   textWrapWidth, textLineSpace, textStyle, textStyleId, symbolLayer, symbolColor,
                   symbolCords, symbolLineWidth, symbolLineType, symbolScale, resCallback) {
        var that = this;
        var dataXml = "<TEXT_DATA>";
        for (var item in dataArray) {
            dataXml += "<TEXT_ITEM>";
            var textData = dataArray[item];
            dataXml += "<TEXT_STRING>";
            dataXml += textData[0];
            dataXml += "</TEXT_STRING>";
            dataXml += "<TEXT_POSITION>";
            dataXml += textData[1] + that.m_Viewer.m_ColumnDelimiter + textData[2];
            dataXml += "</TEXT_POSITION>";
            dataXml += "</TEXT_ITEM>";
        }
        dataXml += "</TEXT_DATA>";
        $.ajax({
            url: this.m_BaseURL + '/api/iWhiz/CreateCommonSymbolDataText',
            type: "POST",
            headers: { "__RequestVerificationToken": this.m_csrfToken },
            data: JSON.stringify([this.m_DwgId, textLayerName, textColor, textAngle, textHeight,
                   textWrapWidth, textLineSpace, textStyle, textStyleId, symbolLayer, symbolColor,
                   symbolCords, symbolLineWidth, symbolLineType, symbolScale, dataXml]),
            contentType: 'application/json; charset=utf-8',
            success: function (returnObject) {
                var isExist = [0];
                that.m_Layer.layerExists(textLayerName, isExist);
                if (!isExist[0]) {
                    that.getLayerInfo(textLayerName, function (returnCode, isVisible, autocadColor, layerId) {
                        that.m_Layer.addNewLayer(textLayerName, layerId, isVisible);
                        that.m_Layer.layerExists(symbolLayer, isExist);
                        if (!isExist[0]) {
                            that.getLayerInfo(symbolLayer, function (returnCode, isVisible, autocadColor, layerId) {
                                that.m_Layer.addNewLayer(symbolLayer, layerId, isVisible);
                                resCallback(returnObject.returnCode, returnObject.SymbolHandles, returnObject.TextHandles)
                            });
                        }
                        else
                          resCallback(returnObject.returnCode, returnObject.SymbolHandles, returnObject.TextHandles)
                    });
                    
                }
                else
                    resCallback(returnObject.returnCode, returnObject.SymbolHandles, returnObject.TextHandles);
            },
            error: function (xhr) {
                resCallback(9);
            }
        });
    },

    this.createSymbolwithData = function (dataArray, textLayerName, textColor, textAngle, textHeight,
                   textWrapWidth, textLineSpace, textStyle, textStyleId, symbolProperties, symbolTextProperties, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            console.log("createSymbolwithData: dataArray.length: " + dataArray.length);
            var splitCount = 20;
            if (dataArray.length < splitCount) {
                that.createSymbolDataFromArray(dataArray, textLayerName, textColor, textAngle, textHeight,
                   textWrapWidth, textLineSpace, textStyle, textStyleId, symbolProperties, symbolTextProperties, resCallback);
            }
            else {
                var finalTextHandles = "";
                var finalSymbolHandles = "";
                var finalSymbolTextHandles = "";
                that.createSymbolDataHandler(dataArray, textLayerName, textColor, textAngle, textHeight,
                   textWrapWidth, textLineSpace, textStyle, textStyleId, symbolProperties, symbolTextProperties,
                   splitCount, finalTextHandles, finalSymbolHandles, finalSymbolTextHandles, resCallback);
            }

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
     this.createSymbolDataHandler = function (dataArray, textLayerName, textColor, textAngle, textHeight,
                   textWrapWidth, textLineSpace, textStyle, textStyleId, symbolProperties, symbolTextProperties,
                    splitCount, finalTextHandles, finalSymbolHandles, finalSymbolTextHandles, resCallback) {
         var that = this;
         var tempArray = dataArray.slice(0, splitCount);
         var tempsymbolProperties = symbolProperties.slice(0, splitCount);
         var tempsymbolTextProperties = symbolTextProperties.slice(0, splitCount);
         if (dataArray.length <= splitCount) {
             that.createSymbolDataFromArray(dataArray, textLayerName, textColor, textAngle, textHeight,
                    textWrapWidth, textLineSpace, textStyle, textStyleId, symbolProperties, symbolTextProperties, function (retCode, textHandles, symbolHandles, symbolTextHandles) {
                        finalTextHandles += textHandles;
                        finalSymbolHandles += symbolHandles;
                        finalSymbolTextHandles += symbolTextHandles;
                        console.log("createSymbolwithData: finalTextHandles: " + finalTextHandles + " finalSymbolHandles: " + finalSymbolHandles + " finalSymbolTextHandles: " + finalSymbolTextHandles);
                        resCallback(retCode, finalTextHandles, finalSymbolHandles, finalSymbolTextHandles);
                        return;
                    });
         }
         else {
             dataArray = dataArray.slice(splitCount, dataArray.length);
             symbolProperties = symbolProperties.slice(splitCount, symbolProperties.length);
             symbolTextProperties = symbolTextProperties.slice(splitCount, symbolTextProperties.length);
             //dataArray.splice(0, splitCount);
             //symbolProperties.splice(0, splitCount);
             //symbolTextProperties.splice(0, splitCount);
             that.createSymbolDataFromArray(tempArray, textLayerName, textColor, textAngle, textHeight,
                    textWrapWidth, textLineSpace, textStyle, textStyleId, tempsymbolProperties, tempsymbolTextProperties,

                    function (retCode, textHandles, symbolHandles, symbolTextHandles) {
                        finalTextHandles += textHandles;
                        finalSymbolHandles += symbolHandles;
                        finalSymbolTextHandles += symbolTextHandles;
                        that.createSymbolDataHandler(dataArray, textLayerName, textColor, textAngle, textHeight,
                        textWrapWidth, textLineSpace, textStyle, textStyleId, symbolProperties, symbolTextProperties,
                       splitCount, finalTextHandles, finalSymbolHandles, finalSymbolTextHandles, resCallback);
                    });
         }
     },

    this.createSymbolDataFromArray = function (dataArray, textLayerName, textColor, textAngle, textHeight,
                   textWrapWidth, textLineSpace, textStyle, textStyleId, symbolProperties, symbolTextProperties, resCallback) {
        var that = this;
        var dataXml = "<TEXT_DATA>";
        
        var i = 0;
        for (var item in dataArray) {
            dataXml += "<TEXT_ITEM>";
            var textData = dataArray[item];
            dataXml += "<TEXT_STRING>";
            dataXml += textData[0];
            dataXml += "</TEXT_STRING>";
            dataXml += "<TEXT_POSITION>";
            dataXml += textData[1] + that.m_Viewer.m_ColumnDelimiter + textData[2];
            dataXml += "</TEXT_POSITION>";            
            var symbolData = symbolProperties[i];
            dataXml += "<SYMBOL>";
            //symbolLayer, symbolColor,symbolCords, symbolLineWidth, symbolLineType, symbolScale,
            dataXml += "<LAYER>" + symbolData[0] + "</LAYER>";
            dataXml += "<COLOR>" + symbolData[1] + "</COLOR>";
            dataXml += "<COORDS>" + symbolData[2] + "</COORDS>";
            dataXml += "<LINEWIDTH>" + symbolData[3] + "</LINEWIDTH>";
            dataXml += "<LINETYPE>" + symbolData[4] + "</LINETYPE>";
            dataXml += "<SCALE>" + symbolData[5] + "</SCALE>";
            dataXml += "<ANGLE>" + symbolData[6] + "</ANGLE>";
            dataXml += "</SYMBOL>";
            var symbolTextData = symbolTextProperties[i];
            if (symbolTextData.length != 0) {
                dataXml += "<SYMBOL_TEXT>";
                //textLayerName, textColor, textAngle, textHeight,
                //textWrapWidth, textLineSpace, textStyle, textStyleId,
                dataXml += "<LAYER>" + symbolTextData[0] + "</LAYER>";
                dataXml += "<COLOR>" + symbolTextData[1] + "</COLOR>";
                dataXml += "<TEXT>" + symbolTextData[2] + "</TEXT>";
                dataXml += "<ANGLE>" + symbolTextData[3] + "</ANGLE>";
                dataXml += "<HEIGHT>" + symbolTextData[4] + "</HEIGHT>";
                dataXml += "<WRAP_WIDTH>" + symbolTextData[5] + "</WRAP_WIDTH>";
                dataXml += "<STYLE>" + symbolTextData[6] + "</STYLE>";
                dataXml += "<STYLEID>" + symbolTextData[7] + "</STYLEID>";
                dataXml += "</SYMBOL_TEXT>";
               
            }
             dataXml += "</TEXT_ITEM>";
            ++i;
        }
        dataXml += "</TEXT_DATA>";
        $.ajax({
            url: this.m_BaseURL + '/api/iWhiz/CreateSymbolDataText',
            type: "POST",
            headers: { "__RequestVerificationToken": this.m_csrfToken },
            data: JSON.stringify([this.m_DwgId, textLayerName, textColor, textAngle, textHeight,
                   textWrapWidth, textLineSpace, textStyle, textStyleId, dataXml]),
            contentType: 'application/json; charset=utf-8',
            success: function (returnObject) {
                var layerDetails = returnObject.LayerDetails.split(that.m_Viewer.m_RowDelimiter);
                for (var item in layerDetails) {
                    if (layerDetails[item] != "") {
                        var tempArray = layerDetails[item].split(that.m_Viewer.m_ColumnDelimiter);
                        var isExist = [0];
                        that.m_Layer.layerExists(tempArray[0], isExist);
                        if (!isExist[0]) {
                            that.m_Layer.addNewLayer(tempArray[0], tempArray[3], tempArray[2]);
                        }
                    }
                }
                console.log("createSymbolwithData: returnObject.SymbolHandles: " + returnObject.SymbolHandles + " returnObject.TextHandles: " + returnObject.TextHandles + " returnObject.SymbolTextHandles: " + returnObject.SymbolTextHandles);

                resCallback(returnObject.returnCode, returnObject.SymbolHandles, returnObject.TextHandles, returnObject.SymbolTextHandles);
                //var isExist =[0];
                //that.m_Layer.layerExists(textLayerName, isExist);
                //if (!isExist[0]) {
                //    that.getLayerInfo(textLayerName, function (returnCode, isVisible, autocadColor, layerId) {
                //        that.m_Layer.addNewLayer(textLayerName, layerId, isVisible);
                //        resCallback(returnObject.returnCode, returnObject.SymbolHandles, returnObject.TextHandles, returnObject.SymbolTextHandles)
                //});
                //}
                //else
                //    resCallback(returnObject.returnCode, returnObject.SymbolHandles, returnObject.TextHandles, returnObject.SymbolTextHandles);
            },
            error: function (xhr) {
                resCallback(9);
            }
        });
    },


    this.createBlockDataText = function (textArray, autocadColor, angle, height,
                   wrapWidth, lineSpace, textStyle, styleId, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var splitCount = 20;
            if (textArray.length < splitCount) {
                that.createBlockDataFromArray(textArray, autocadColor, angle, height,
                    wrapWidth, lineSpace, textStyle, styleId, resCallback);
            }
            else {
                var finalTextHandles = "";
                that.createBlockDataHandler(textArray, autocadColor, angle, height,
                   wrapWidth, lineSpace, textStyle, styleId, splitCount, finalTextHandles, resCallback);
            }

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createBlockDataHandler = function (textArray, autocadColor, angle, height,
                   wrapWidth, lineSpace, textStyle, styleId, splitCount, finalTextHandles, resCallback) {
        var that = this;
        var tempArray = textArray.slice(0, splitCount);

        if (textArray.length <= splitCount) {
            that.createBlockDataFromArray(textArray, autocadColor, angle, height,
                    wrapWidth, lineSpace, textStyle, styleId, function (retCode, textHandles) {
                        finalTextHandles += textHandles;
                        resCallback(retCode, finalTextHandles);
                        return;
                    });
        }
        else {
            textArray = textArray.slice(splitCount, textArray.length);
            //textArray.splice(0, splitCount);
            that.createBlockDataFromArray(tempArray, autocadColor, angle, height,
                    wrapWidth, lineSpace, textStyle, styleId, function (retCode, textHandles) {
                        finalTextHandles += textHandles;
                        that.createBlockDataHandler(textArray, autocadColor, angle, height,
                                wrapWidth, lineSpace, textStyle, styleId, splitCount, finalTextHandles, resCallback);
                    });
        }
    },
    this.createBlockDataFromArray = function (textArray, autocadColor, angle, height,
                   wrapWidth, lineSpace, textStyle, styleId, resCallback) {
        var that = this;
        var dataXml = "<TEXT_DATA>";
        for (var item in textArray) {
            dataXml += "<TEXT_ITEM>";
            var textData = textArray[item];
            dataXml += "<TEXT_STRING>";
            dataXml += textData[0];
            dataXml += "</TEXT_STRING>";
            dataXml += "<BLOCKREF_HANDLE>";
            dataXml += textData[1];
            dataXml += "</BLOCKREF_HANDLE>";
            dataXml += "<LAYER>";
            dataXml += textData[2];
            dataXml += "</LAYER>";
            dataXml += "</TEXT_ITEM>";
        }
        dataXml += "</TEXT_DATA>";
        $.ajax({
            url: this.m_BaseURL + '/api/iWhiz/CreateBlockDataText',
            type: "POST",
            headers: { "__RequestVerificationToken": this.m_csrfToken },
            data: JSON.stringify([this.m_DwgId, autocadColor, angle, height,
                wrapWidth, lineSpace, textStyle, styleId, dataXml]),
            contentType: 'application/json; charset=utf-8',
            success: function (returnObject) {
                var layerDetails = returnObject.LayerDetails.split(that.m_Viewer.m_RowDelimiter);
                for (var item in layerDetails) {
                    if (layerDetails[item] != "") {
                        var tempArray = layerDetails[item].split(that.m_Viewer.m_ColumnDelimiter);
                        var isExist = [0];
                        that.m_Layer.layerExists(tempArray[0], isExist);
                        if (!isExist[0]) {
                            that.m_Layer.addNewLayer(tempArray[0], tempArray[3], tempArray[2]);
                        }
                    }
                }
                resCallback(returnObject.returnCode, returnObject.EntityHandles, returnObject.LayerDetails);
            },
            error: function (xhr) {
                resCallback(9);
            }
        });
    },
    this.getPolylineCoordsMultiple = function (entityHandles, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetPolylineCoordinatesMultiple',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, entityHandles]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.XCoords, returnObject.YCoords)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.createMap = function (entityHandles, colors, resCallback) {
         try {
             var that = this;
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
            if (entityHandles.length > 0)
                 this.m_Viewer.hatchEntitiesByHandles(entityHandles, colors, resCallback);
            else {
                 resCallback(iWhizError.HANDLE_INVALID);
                 return;
             }
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
    this.createMapWithCoords = function (coords, colors, hatchIdArray) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                return iWhizError.NOT_OPEND;
            }
            if (coords.length > 0)
                return this.m_Viewer.hatchEntitiesByCoords(coords, colors, hatchIdArray);
            else {
                return iWhizError.HANDLE_INVALID;
            }
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.drawLineWithCoords = function (coords, colors, lineIdArray) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                return iWhizError.NOT_OPEND;
            }
            if (coords.length > 0)
                return this.m_Viewer.drawLinesByCoords(coords, colors, lineIdArray);
            else {
                return iWhizError.HANDLE_INVALID;
            }
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.getExtentsOfCoords = function (coords, minX, minY, maxX, maxY) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                return iWhizError.NOT_OPEND;
            }
            return this.m_Viewer.getExtentsOfCoords(coords, minX, minY, maxX, maxY);
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.removeMaps = function () {
        return this.m_Viewer.removeHatches();
    },
    this.removeMapsByHandle = function (handles) {
        return this.m_Viewer.removeHatchesByHandle(handles);
    },
    this.removeLines = function () {
        return this.m_Viewer.removeLines();
    },
    this.removeLinesByHandle = function (handles) {
        return this.m_Viewer.removeLinesByHandle(handles);
    },
    this.createDistributionMap = function (drawingId,moduleNo, orgLevel, orgLevelNo, orgLevelName, isNetCustomer, areaUnit, siteName, buildingName, floorName, isHatch, x, y, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var areaRatio = [0];
            this.clientDWGAreaRatio(areaRatio);
            var grossLayerName = [0];
            this.getiDrawingsLayer(0, grossLayerName);
            var that = this;

            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/CreateDistributionMap',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, moduleNo, orgLevel, orgLevelNo, orgLevelName, isNetCustomer, areaRatio[0], areaUnit, siteName, buildingName, floorName, this.m_WebApp.getFieldWidth(), this.m_WebApp.getFieldHeight(), this.m_WebApp.getViewPosition()[0], this.m_WebApp.getViewPosition()[1], grossLayerName[0], isHatch, x, y, drawingId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    if (returnObject.returnCode == 0) {
                        var isExist = [0];
                        that.m_Layer.layerExists("$LEGEND", isExist);
                        if (!isExist[0]) {
                            var spaceHandles = returnObject.SpaceHandles;
                            var legendHandle = returnObject.LegendHandle;
                            var legendblockhandle = returnObject.LegendBlockHandle;

                            that.getLayerInfo("$LEGEND", function (returnCode, isVisible, autocadColor, layerId) {
                                that.m_Layer.addNewLayer("$LEGEND", layerId, isVisible);
                                that.m_Layer.layerExists("$Hatch", isExist);
                                if (!isExist[0]) {
                                    that.getLayerInfo("$Hatch", function (returnCode, isVisible, autocadColor, layerId) {
                                        that.m_Layer.addNewLayer("$Hatch", layerId, isVisible);
                                        resCallback(returnObject.returnCode, spaceHandles, legendHandle, legendblockhandle);
                                    });
                                }
                                else
                                    resCallback(returnObject.returnCode, spaceHandles, legendHandle, legendblockhandle);
                            });
                        }
                        else
                            resCallback(returnObject.returnCode, returnObject.SpaceHandles, returnObject.LegendHandle, returnObject.LegendBlockHandle);
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.SpaceHandles, returnObject.LegendHandle, returnObject.LegendBlockHandle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },
    this.createDistributionMapForValidatedFields = function (archiveId,drawingId,moduleNo, fieldId, validatedFieldName, isNetCustomer, areaUnit, siteName, buildingName, floorName, isHatch, x, y, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             var areaRatio = [0];
             this.clientDWGAreaRatio(areaRatio);
             var grossLayerName = [0];
             this.getiDrawingsLayer(0, grossLayerName);
             var that = this;

             $.ajax({
                 url: this.m_BaseURL + '/api/iWhiz/CreateDistributionMapForValidatedFields',
                 type: "POST",
                 headers: { "__RequestVerificationToken": this.m_csrfToken },
                 data: JSON.stringify([this.m_DwgId, moduleNo, fieldId, validatedFieldName, isNetCustomer, areaRatio[0], areaUnit, siteName, buildingName, floorName, this.m_WebApp.getFieldWidth(), this.m_WebApp.getFieldHeight(), this.m_WebApp.getViewPosition()[0], this.m_WebApp.getViewPosition()[1], grossLayerName[0], isHatch, x, y, drawingId, archiveId]),
                 contentType: 'application/json; charset=utf-8',
                 success: function (returnObject) {
                     if (returnObject.returnCode == 0) {
                         var isExist = [0];
                         that.m_Layer.layerExists("$LEGEND", isExist);
                         if (!isExist[0]) {
                             var spaceHandles = returnObject.SpaceHandles;
                             var legendHandle = returnObject.LegendHandle;
                             var legendblockhandle = returnObject.LegendBlockHandle;

                             that.getLayerInfo("$LEGEND", function (returnCode, isVisible, autocadColor, layerId) {
                                 that.m_Layer.addNewLayer("$LEGEND", layerId, isVisible);
                                 that.m_Layer.layerExists("$Hatch", isExist);
                                 if (!isExist[0]) {
                                     that.getLayerInfo("$Hatch", function (returnCode, isVisible, autocadColor, layerId) {
                                         that.m_Layer.addNewLayer("$Hatch", layerId, isVisible);
                                         resCallback(returnObject.returnCode, spaceHandles, legendHandle, legendblockhandle);
                                     });
                                 }
                                 else
                                     resCallback(returnObject.returnCode, spaceHandles, legendHandle, legendblockhandle);
                             });
                         }
                         else
                            resCallback(returnObject.returnCode, returnObject.SpaceHandles, returnObject.LegendHandle, returnObject.LegendBlockHandle);
                     }
                     else
                        resCallback(returnObject.returnCode, returnObject.SpaceHandles, returnObject.LegendHandle, returnObject.LegendBlockHandle);
                 },
                 error: function (xhr) {
                     resCallback(9);
                 }
             });
         }
         catch (e) {
             resCallback(9);
         }
    },
    this.createDistributionMapOccupancy = function (moduleNo, target, isNetCustomer, areaUnit, siteName, buildingName, floorName, isHatch, x, y, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var areaRatio = [0];
            this.clientDWGAreaRatio(areaRatio);
            var grossLayerName = [0];
            this.getiDrawingsLayer(0, grossLayerName);
            var that = this;

            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/CreateDistributionMapOccupancy',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, moduleNo, target, isNetCustomer, areaRatio[0], areaUnit, siteName, buildingName, floorName, this.m_WebApp.getFieldWidth(), this.m_WebApp.getFieldHeight(), this.m_WebApp.getViewPosition()[0], this.m_WebApp.getViewPosition()[1], grossLayerName[0], isHatch, x, y]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    if (returnObject.returnCode == 0) {
                        var isExist = [0];
                        that.m_Layer.layerExists("$LEGEND", isExist);
                        if (!isExist[0]) {
                            var hatchHandles = returnObject.HatchedHandles;
                            var legendHandle = returnObject.LegendHandle;
                            var legendblockhandle = returnObject.LegendBlockHandle;

                            that.getLayerInfo("$LEGEND", function (returnCode, isVisible, autocadColor, layerId) {
                                that.m_Layer.addNewLayer("$LEGEND", layerId, isVisible);
                                that.m_Layer.layerExists("$Hatch", isExist);
                                if (!isExist[0]) {
                                    that.getLayerInfo("$Hatch", function (returnCode, isVisible, autocadColor, layerId) {
                                        that.m_Layer.addNewLayer("$Hatch", layerId, isVisible);
                                        resCallback(returnObject.returnCode, hatchHandles, legendHandle, legendblockhandle);
                                    });
                                }
                                else
                                    resCallback(returnObject.returnCode, hatchHandles, legendHandle, legendblockhandle);
                            });
                        }
                        else
                            resCallback(returnObject.returnCode, returnObject.HatchedHandles, returnObject.LegendHandle, returnObject.LegendBlockHandle);
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.HatchedHandles, returnObject.LegendHandle, returnObject.LegendBlockHandle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(9);
        }
    },

    this.createLeaderMultiple = function (coordinateArray, layerName, autocadColor, size, scale,
                                         lineType, lineTypeScale, resCallback) {
        try {
            var that = this;
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var splitCount = 20;
            if (coordinateArray.length < splitCount) {
                that.createLeaderFromArray(coordinateArray, layerName, autocadColor, size, scale,
                                           lineType, lineTypeScale, resCallback);
            }
            else {
                var finalLeaderHandles = "";
                that.createLeaderHandler(coordinateArray, layerName, autocadColor, size, scale,
                                           lineType, lineTypeScale, splitCount, finalLeaderHandles, resCallback);
            }

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createLeaderHandler = function (coordinateArray, layerName, autocadColor, size, scale,
                                         lineType, lineTypeScale, splitCount, finalLeaderHandles, resCallback) {
       var that = this;
       var tempArray = coordinateArray.slice(0, splitCount);

       if (coordinateArray.length <= splitCount) {
           that.createLeaderFromArray(coordinateArray, layerName, autocadColor, size, scale,
                                          lineType, lineTypeScale, function (retCode, leaderHandles) {
                                              finalLeaderHandles += leaderHandles;
                                              resCallback(retCode, finalLeaderHandles);
                                              return;
                                          });
       }
       else {
           coordinateArray = coordinateArray.slice(splitCount, coordinateArray.length);
           that.createLeaderFromArray(tempArray, layerName, autocadColor, size, scale,
                                          lineType, lineTypeScale, function (retCode, leaderHandles) {
                                              finalLeaderHandles += leaderHandles;
                                              that.createLeaderHandler(coordinateArray, layerName, autocadColor, size, scale,
                                                                 lineType, lineTypeScale, splitCount, finalLeaderHandles, resCallback);
                                          });
       }
   },
    this.createLeaderFromArray = function (coordinateArray, layerName, autocadColor, size, scale,
                                         lineType, lineTypeScale, resCallback) {
       var that = this;
       var dataXml = "<LEADER_DATA>";
       for (var item in coordinateArray) {
           dataXml += "<LEADER_ITEM>";
           dataXml += "<LEADER_COORDS>";
           dataXml += coordinateArray[item];
           dataXml += "</LEADER_COORDS>";
           dataXml += "</LEADER_ITEM>";
       }
       dataXml += "</LEADER_DATA>";
       $.ajax({
           url: this.m_BaseURL + '/api/iWhiz/CreateLeaderMultiple',
           type: "POST",
           headers: { "__RequestVerificationToken": this.m_csrfToken },
           data: JSON.stringify([this.m_DwgId, layerName, autocadColor, size, scale,
                                          lineType, lineTypeScale, dataXml]),
           contentType: 'application/json; charset=utf-8',
           success: function (returnObject) {
               var isExist = [0];
               that.m_Layer.layerExists(layerName, isExist);
               if (!isExist[0]) {
                   that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                       that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                       resCallback(returnObject.returnCode, returnObject.LeaderHandles)
                   });
               }
               else
                   resCallback(returnObject.returnCode, returnObject.LeaderHandles);
           },
           error: function (xhr) {
               resCallback(9);
           }
       });
   },


    //***********************Grip****************
    this.showGrips = function (entityHandle, resCallBack) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Grip.showGrips(entityHandle, resCallBack);
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.hideGrips = function () {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                return iWhizError.NOT_OPEND;
            }
            return this.m_Grip.hideGrips();
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },

    this.getGripPointsOfGivenEntity = function (entityHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/GetGripPointsOfGivenEntity',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId, entityHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.Points);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.cloneEntity = function (entityHandle, gripIndex, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/CloneEntity',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId, entityHandle, gripIndex]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },

    this.cloneEntityAtPoint = function (moveX, moveY, gripIndex, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/CloneEntityAtPoint',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId, moveX, moveY, gripIndex]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.PreviousHandle, returnObject.CursorIndex);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },

    this.moveEntityGrip = function (moveX, moveY, gripIndex, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/MoveEntityGrip',
                type: "POST",
                headers: {
                    "__RequestVerificationToken": this.m_csrfToken
                },
                data: JSON.stringify([this.m_DwgId, moveX, moveY, gripIndex]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.IsConnectorChanged, returnObject.OutcomeId, returnObject.FromId, returnObject.ToId, returnObject.GripPoints);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    //**************************************Flowchart***************************************
    this.createWorkFlow = function (fileName, resCallback) {
        try {
            var that = this;
            this.close(function () {

                that.m_Grip = new GripData(that);
                that.m_Flow = new Flowchart(that);

                that.m_CallbackAfterUpdate = resCallback;
                that.m_UpdateHub = $.connection.updateHub;
                that.m_UpdateHub.client.updateCache = function (cache, count, isFirst) {
                    if (count != 0) {
                        that.m_CacheCount = count;
                        that.m_Cache = new Uint8Array(0);
                    }
                    else if (that.m_CacheCount <= 0)
                        that.m_Cache = cache;
                    if (that.m_CacheCount > 0) {
                        that.m_IsSplitted = true;
                        if (cache != "") {
                            that.m_Cache = that.m_Cache + Tools._base64ToByteString(cache); //;Tools._appendBuffer(that.m_Cache, Tools._base64ToArrayBuffer(cache)); //that.m_Cache + Tools._base64ToByteString(cache);//
                            that.m_CacheCount = that.m_CacheCount - 1;
                        }
                    }
                    if (that.m_CacheCount == 0) {
                        var cacheData;
                        if (!that.m_IsSplitted) {
                            cacheData = Tools._base64ToArrayBufferDeCompress(that.m_Cache); //Tools._base64ToArrayBuffer(that.m_Cache);  //Tools._base64ToArrayBufferDeCompress(that.m_Cache); //
                        }
                        else {
                            cacheData = Tools.byteStringToArrayBufferDeCompress(that.m_Cache);//that.m_Cache;//
                            that.m_IsSplitted = false;
                        }

                        if (isFirst) {
                            //that.setDisplay(true);
                            that.m_Viewer.m_DisplayFlag = true;
                            that.m_Viewer.openDrawing(cacheData, that.m_Viewer.m_DisplayFlag);
                            that.m_isFirst = false;
                            that.m_DwgId = -1;//drawingId;
                            that.OpenCallback(that.m_CallbackAfterUpdate, true);
                        }
                        else {
                            that.m_Viewer.updateDrawing(cacheData, that.m_Viewer.m_DisplayFlag);
                        }
                    }
                };
                 if ($.connection.hub)
                    $.connection.hub.stop();
                $.connection.hub.disconnected(function () {
                    setTimeout(function () {
                        $.connection.hub.start();
                    }, 5000); // Re-start connection after 5 seconds
                });
                $.connection.hub.logging = true;
                // Start Hub
                $.connection.hub.start().done(function () {
                    $.ajax({
                        url: that.m_BaseURL + '/api/iWhiz/CreateWorkFlow',
                        type: "POST",
                        headers: { "__RequestVerificationToken": that.m_csrfToken },
                        data: JSON.stringify([-1, that.m_Viewer.m_DomElement.width, that.m_Viewer.m_DomElement.height,fileName]),
                        contentType: 'application/json; charset=utf-8',
                        success: function (returnObject) {
                            that.m_DwgId = -1;
                            that.m_Viewer.m_OpenFlag = true;
                            that.m_OpenReturnCode = returnObject.returnCode;
                           // var cacheData = Tools._base64ToArrayBuffer(returnObject.Cache);
                            //that.m_Viewer.openDrawing(cacheData, that.m_Viewer.m_DisplayFlag);
                            that.OpenCallback(resCallback, true);
                        },
                        error: function (xhr) {
                            //this.m_Viewer.m_OpenFlag = false;
                            resCallback(9);
                        }
                    });
                });
            });


        }
        catch (e) {
            resCallback(9);
        }
    },
    this.createProcessBox = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.createProcessBox(resCallback);
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createBoxTextOnFlowchart = function (boxHandle, boxText, actionId, actionNo, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.createBoxTextOnFlowchart(boxHandle, boxText, actionId, actionNo, resCallback);

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.cancelBox = function (boxHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.cancelBox(boxHandle, resCallback);
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
     this.getNearestSnapPoint = function (entityHandle, xVal, yVal, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.getNearestSnapPoint(entityHandle, xVal, yVal, resCallback);
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
      this.getNearestSnapPointWithAllSnapPoints = function (entityHandle, xVal, yVal, resCallback) {
          try {
              if (!this.m_Viewer.m_OpenFlag) {
                  resCallback(iWhizError.NOT_OPEND);
                  return;
              }
              this.m_Flow.getNearestSnapPointWithAllSnapPoints(entityHandle, xVal, yVal, resCallback);
          }
          catch (e) {
              resCallback(iWhizError.UNEXPECTED_ERROR);
          }
      },
     this.setSnapStatus = function (status) {
         this.m_Grip.setSnapStatus(status);
     },
     this.createConnector = function (resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.createConnector(resCallback);
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.cancelConnector = function (connectorHandle, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.cancelConnector(connectorHandle, resCallback);
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.createNextAction = function (connectorHandle, type, id, actionText, actionNo, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.createNextAction(connectorHandle, type, id, actionText, actionNo, resCallback);
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.createConnectorTextOnFlowchart = function (connectorHandle, connectorText, outcomeId, connectorType, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.createConnectorTextOnFlowchart(connectorHandle, connectorText, outcomeId, connectorType, resCallback);
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.selectShape = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.selectShape(resCallback);
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    }
    this.setActionParams = function (autoCadBoxFillColor, lineWidth, lineType, lineTypeScale, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.setActionParams(autoCadBoxFillColor, lineWidth, lineType, lineTypeScale, resCallback);

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
     this.setActionTextParams = function (autoCadColor, angle, height, wrapWidth, lineSpace, textStyle, styleId, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.setActionTextParams(autoCadColor, angle, height, wrapWidth, lineSpace, textStyle, styleId, resCallback);

         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.setOutcomeParams = function (autoCadColor, arrowsize, scale, lineType, lineTypeScale, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.setOutcomeParams(autoCadColor, arrowsize, scale, lineType, lineTypeScale, resCallback);

         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.setOutcomeTextParams = function (autoCadColor, angle, height, wrapWidth, lineSpace, textStyle, styleId, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.setOutcomeTextParams(autoCadColor, angle, height, wrapWidth, lineSpace, textStyle, styleId, resCallback);

         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.setCircleOfFlowchartParams = function (autoCadCircleColor, autoCadCircleFillColor, radius, textHeight, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.setCircleOfFlowchartParams(autoCadCircleColor, autoCadCircleFillColor, radius, textHeight, resCallback);

         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.setEndRectangleParams = function (autoCadBoxColor, autoCadBoxFillColor, lineWidth, lineType,
                                    lineTypeScale, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.setEndRectangleParams(autoCadBoxColor, autoCadBoxFillColor, lineWidth, lineType,
                                    lineTypeScale, resCallback);

         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.setEndRectangleTextParams = function (autoCadColor, angle, height, wrapWidth, lineSpace,
                                    textStyle, styleId, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.setEndRectangleTextParams(autoCadColor, angle, height, wrapWidth, lineSpace,
                                    textStyle, styleId, resCallback);

         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.updateTextOnFlowchart = function (isActionPoint, id, text, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.updateTextOnFlowchart(isActionPoint, id, text, resCallback);

         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
    this.updateTextsOnFlowchart = function (inputArray, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.updateTextsOnFlowchart(inputArray, resCallback);

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
     this.showHideCirclesInFlowchart = function (isShow, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.showHideCirclesInFlowchart(isShow, resCallback);

         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.showHideActionPointsInFlowchart = function (actionPointIds, isShow, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.showHideActionPointsInFlowchart(actionPointIds, isShow, resCallback);

         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.showHideOutcomesInFlowchart = function (outcomeIds, isShow, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.showHideOutcomesInFlowchart(outcomeIds, isShow, resCallback);

         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.showHideEndPointsInFlowchart = function (endPointIds, isShow, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.showHideEndPointsInFlowchart(endPointIds, isShow, resCallback);

         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.deleteActionPoint = function (actionId, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.deleteActionPoint(actionId, resCallback);

         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.deleteOutcome = function (outcomeId, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.deleteOutcome(outcomeId, resCallback);

         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.deleteEndRectangle = function (endrectId, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.deleteEndRectangle(endrectId, resCallback);

         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.arrangeFlowchart = function (arrangeType, isByActionPointNumber, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.arrangeFlowchart(arrangeType, isByActionPointNumber, resCallback);

         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
    this.setBoxCount = function (count, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.setBoxCount(count, resCallback);

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createActionPoints = function (actionPointArray, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.createActionPoints(actionPointArray, resCallback);

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createEndPoints = function (endPointArray, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.createEndPoints(endPointArray, resCallback);

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createOutcomes = function (outcomeArray, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.createOutcomes(outcomeArray, resCallback);

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createActionPoint = function (actionId, text, actionNumber, coordinates, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.createActionPoint(actionId, text, actionNumber, coordinates, resCallback);

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createEndPoint = function (endId, text, coordinates, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.createEndPoint(endId, text, coordinates, resCallback);

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createOutcome = function (outcomeId, text, fromActionId, toActionId, endActionType, endActionText, connectorType, coordinates, hidetimeout, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.createOutcome(outcomeId, text, fromActionId, toActionId, endActionType, endActionText, connectorType, coordinates, hidetimeout, resCallback);

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.setFlowchartDefaultParams = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.setFlowchartDefaultParams(resCallback);

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
     this.saveFlowchartView = function (resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.saveFlowchartView(resCallback);

         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.openFlowchartView = function (xmlString, resCallback) {
         try {
             if (!this.m_Viewer.m_OpenFlag) {
                 resCallback(iWhizError.NOT_OPEND);
                 return;
             }
             this.m_Flow.openFlowchartView(xmlString, resCallback);

         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
    this.downloadFile = function (exportedData, fileName) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                return iWhizError.NOT_OPEND;
            }
            Tools.saveTextAsFile(exportedData, fileName);
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.getBoxHandle = function (actionId, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.getBoxHandle(actionId, resCallback);

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.getBoxId = function (boxHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.getBoxId(boxHandle, resCallback);

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.getConnectorHandle = function (outcomeId, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.getConnectorHandle(outcomeId, resCallback);

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
         }
    },
    this.getConnectorId = function (connectorHandle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.getConnectorId(connectorHandle, resCallback);

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.getItemId = function (Handle, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.getItemId(Handle, resCallback);

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.getAllIdsInFlowchart = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.getAllIdsInFlowchart(resCallback);

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.isItemExistsOnFlowchart = function (itemType, id, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.isItemExistsOnFlowchart(itemType, id, resCallback);

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.getOutcomeDetails = function (outcomeId, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Flow.getOutcomeDetails(outcomeId, resCallback);

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.exitGripMode = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            this.m_Viewer.m_State = this.m_Viewer.STATE.NONE;
            this.hideGrips();
            this.setCursor(1, false);
            this.m_Flow.exitGripMode(resCallback);

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.isGripWaitMode = function (isGripWait) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                return iWhizError.NOT_OPEND;
            }
            if (this.m_Grip.m_IsDragging)
                isGripWait[0] = true;
            else
                isGripWait[0] = false;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.getSelectedFlowchartId = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                return iWhizError.NOT_OPEND;
            }
            this.m_Flow.getSelectedFlowchartId(this.m_Grip.m_GripHandle, resCallback);
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.initiateWorkFlow = function(resCallback)
    {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                return iWhizError.NOT_OPEND;
            }
            this.m_Flow.initiateWorkFlow(resCallback);
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.getEntityAndSnapPoints = function (currentMoveX, currentMoveY, resCallback)
    {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                return iWhizError.NOT_OPEND;
            }
            this.m_Flow.getEntityAndSnapPoints(currentMoveX, currentMoveY, resCallback);
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.startUndoRecording = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                return iWhizError.NOT_OPEND;
            }
            this.m_Flow.startUndoRecording(resCallback);
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.disableUndoRecording = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                return iWhizError.NOT_OPEND;
            }
            this.m_Flow.disableUndoRecording(resCallback);
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.undo = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                return iWhizError.NOT_OPEND;
            }
            this.m_Flow.undo(resCallback);
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.redo = function (resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                return iWhizError.NOT_OPEND;
            }
            this.m_Flow.redo(resCallback);
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createDataTextOnServer = function (drawingId, moduleId, spaceInput, displayStngInput, ratio, resCallback) {
        try {
            var that = this;
            debugger
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            var tempColumnDelimiter = this.m_Viewer.m_ColumnDelimiter;
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/createDataTextOnServer',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([tempColumnDelimiter, drawingId, moduleId, spaceInput, displayStngInput, ratio]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    var isExist = [0];
                    that.m_Layer.layerExists(layerName, isExist);
                    if (!isExist[0]) {
                        that.getLayerInfo(layerName, function (returnCode, isVisible, autocadColor, layerId) {
                            that.m_Layer.addNewLayer(layerName, layerId, isVisible);
                            resCallback(returnObject.returnCode, returnObject.EntityHandles)
                        });
                    }
                    else
                        resCallback(returnObject.returnCode, returnObject.EntityHandles);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.moveSymbolTest = function (symbolRectHandle, textHandle, symbolTextHandle, xCoord, yCoord, targetX, targetY, midPoint, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/MoveSymbolTest',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, symbolRectHandle, textHandle,symbolTextHandle, xCoord, yCoord, targetX, targetY, midPoint]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.ActualPoints, returnObject.MidPoint)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.highlightAndDehighligtEntity = function (connectorHandle, lineWidth, isHightLight, color, resCallback) {
        try {
            if (!this.m_Viewer.m_OpenFlag) {
                resCallback(iWhizError.NOT_OPEND);
                return;
            }
            $.ajax({
                url: this.m_BaseURL + '/api/iWhiz/HighlightAndDehighligtEntity',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_csrfToken },
                data: JSON.stringify([this.m_DwgId, connectorHandle, lineWidth, isHightLight, color]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    }
};
