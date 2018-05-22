Zoom = function (objiWhizAPI) {
    this.m_iWhizApi = objiWhizAPI,
    this.ZOOM_IN_LIMIT = 0.000009,

    this.zoomExtents = function () {
        try {
            ////////////////////////
            var points = [0];
            this.m_iWhizApi.m_Viewer.getDWGExtents(points);
            var pointX = (points[0] + points[2]) / 2;
            var pointY = (points[1] + points[3]) / 2;

            var offsetVal = 4 * this.m_iWhizApi.m_Viewer.m_AreaRatio;
            var width = (points[2] + offsetVal) - (points[0] - offsetVal);
            var height = (points[3] + offsetVal) - (points[1] - offsetVal);
            ////////////////////////

            this.m_iWhizApi.m_WebApp.setFieldWidth(width);
            this.m_iWhizApi.m_WebApp.setFieldHeight(height);

            this.m_iWhizApi.m_WebApp.setViewPosition(pointX, pointY, 1);
            this.m_iWhizApi.m_WebApp.update();
            return 0;
        }
        catch (e) {
            return 9;
        }
    },
    this.zoomIn = function () {
        try {
            var boundingRect = this.m_iWhizApi.m_Viewer.m_DomElement.getBoundingClientRect()
            var viewportRect = [boundingRect.left, boundingRect.top, boundingRect.right, boundingRect.bottom];

            var isZoomNeeded = false;
            var StartX = [0], StartY = [0], StartZ = [0], EndX = [0], EndY = [0], EndZ = [0];
            StartX[0] = 0, StartY[0] = 0, StartZ[0] = 0, EndX[0] = 1.0, EndY[0] = 0, EndZ[0] = 0;
            this.m_iWhizApi.m_Viewer.clientToDWG(StartX, StartY, StartZ);
            this.m_iWhizApi.m_Viewer.clientToDWG(EndX, EndY, EndZ);

            var areaRatio = Math.sqrt(((StartX[0] - EndX[0]) * (StartX[0] - EndX[0])) + ((StartY[0] - EndY[0]) * (StartY[0] - EndY[0])));
            if (areaRatio > this.ZOOM_IN_LIMIT)
                isZoomNeeded = true;

            if (isZoomNeeded) {
                this.m_iWhizApi.m_WebApp.zoom(1.9, (viewportRect[2] + viewportRect[0]) / 2, (viewportRect[3] + viewportRect[1]) / 2);
            }
            return 0;
        }
        catch (e) {
            return 9;
        }
    },
    this.zoomOut = function () {
        try {
            var boundingRect = this.m_iWhizApi.m_Viewer.m_DomElement.getBoundingClientRect()
            var viewportRect = [boundingRect.left, boundingRect.top, boundingRect.right, boundingRect.bottom];
            this.m_iWhizApi.m_WebApp.zoom(0.5, (viewportRect[2] + viewportRect[0]) / 2, (viewportRect[3] + viewportRect[1]) / 2);

            return 0;
        }
        catch (e) {
            return 9;
        }
    },
    this.zoomByFactor = function (zoomFactor) {
        try {
            var boundingRect = this.m_iWhizApi.m_Viewer.m_DomElement.getBoundingClientRect()
            var viewportRect = [boundingRect.left, boundingRect.top, boundingRect.right, boundingRect.bottom];

            this.m_iWhizApi.m_WebApp.zoom(zoomFactor, (viewportRect[2] + viewportRect[0]) / 2, (viewportRect[3] + viewportRect[1]) / 2);

            return 0;
        }
        catch (e) {
            return 9;
        }
    },

    this.zoomRectArea = function (minX, minY, maxX, maxY, zoomFactor) {
        try {

            var x = [0], y = [0], z = [0];
            x[0] = minX; y[0] = minY; z[0] = 0;
            this.m_iWhizApi.m_Viewer.dwgToClient(x, y, z);
            minX = x[0]; minY = y[0];
            x[0] = maxX; y[0] = maxY; z[0] = 0;
            this.m_iWhizApi.m_Viewer.dwgToClient(x, y, z);
            maxX = x[0]; maxY = y[0];

            var pt0 = [minX, minY];
            var pt1 = [maxX, maxY];
            this.m_iWhizApi.m_WebApp.zoomWindow(pt0, pt1);
            return 0;
        }
        catch (e) {
            return 9;
        }
    },
    this.zoomEntity = function (entityHandle, resCallBack) {
        try {
            if (entityHandle == "") return iWhizError.HANDLE_INVALID;
            ////setting viewport to entity's midpoint//////////
            var that = this;           
            that.m_iWhizApi.m_Viewer.m_iWhizApi.getEntityExtents(entityHandle, function (result, MinX, MinY, MaxX, MaxY) {
                if (result == 0) {
                    var areaRatio = [];
                    that.m_iWhizApi.m_Viewer.clientDWGAreaRatio(areaRatio);
                    var offset = 5 * areaRatio[0];
                    result = that.zoomRectArea(MinX - offset, MinY - offset, MaxX + offset, MaxY + offset, 0.9);
                    return resCallBack(result);
                }
                else
                    return resCallBack(result);
            });
               
        }
        catch (e) {
            resCallBack(9);
        }
    },
    this.zoomEntityByOffset = function (entityHandle, offset, resCallBack)
    {
        try {
            if (entityHandle == "") return iWhizError.HANDLE_INVALID;
            ////setting viewport to entity's midpoint//////////
            var that = this;
            that.m_iWhizApi.m_Viewer.m_iWhizApi.getEntityExtents(entityHandle, function (result, MinX, MinY, MaxX, MaxY) {
                if (result == 0) {
                    var areaRatio = [];
                    that.m_iWhizApi.m_Viewer.clientDWGAreaRatio(areaRatio);
                    offset = offset * areaRatio[0];
                    result = that.zoomRectArea(MinX - offset, MinY - offset, MaxX + offset, MaxY + offset, 0.9);
                    return resCallBack(result);
                }
                else
                    return resCallBack(result);
            });

        }
        catch (e) {
            resCallBack(9);
        }
    },
    this.zoomWindow = function () {
        try {
            var that = this;
            this.m_iWhizApi.m_Viewer.getRectangle(function (returnCode, leftTop, bottomRight) {
                if (returnCode == 0) {
                    var x = [0], y = [0], z = [0];
                    x[0] = leftTop.x; y[0] = leftTop.y; z[0] = 0;
                    that.m_iWhizApi.m_Viewer.dwgToClient(x, y, z);
                    leftTop.x = x[0]; leftTop.y = y[0];
                    x[0] = bottomRight.x; y[0] = bottomRight.y; z[0] = 0;
                    that.m_iWhizApi.m_Viewer.dwgToClient(x, y, z);
                    bottomRight.x = x[0]; bottomRight.y = y[0];

                    var pt0 = [leftTop.x, leftTop.y];
                    var pt1 = [bottomRight.x, bottomRight.y];
                    that.m_iWhizApi.m_WebApp.zoomWindow(pt0, pt1);
                    return 0;
                }
                else
                    return returnCode;
            });
        }
        catch (e) {
            return 9;
        }
    }

};