var Tools = {
    Vector2 : function (a, b) {
        this.x = a || 0, this.y = b || 0
    },    
    Vector3 : function (a, b, c) {
        this.x = a || 0, this.y = b || 0, this.z = c || 0
    },
    Vector4 : function (a, b, c, d) {
        this.x = a, this.y = b, this.z = c, this.w = d
    },
    Matrix4 : function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
        this.elements = new Float32Array(16), this.set(void 0 !== a ? a : 1, b || 0, c || 0, d || 0, e || 0, void 0 !== f ? f : 1, g || 0, h || 0, i || 0, j || 0, void 0 !== k ? k : 1, l || 0, m || 0, n || 0, o || 0, void 0 !== p ? p : 1)
    },
    getDistance: function (x1,y1,x2,y2,normalDistance,horizontalDistance,verticalDistance)
    {        
        try
        {
            normalDistance[0] = Math.sqrt((Math.pow((x2 - x1), 2)) + (Math.pow((y2 - y1), 2)));
            horizontalDistance[0] = Math.abs(x1 - x2);
            verticalDistance[0] = Math.abs(y1 - y2);
            return iWhizError.SUCCESS;
        }
        catch (e)
        {
            return iWhizError.UNEXPECTED_ERROR;
        }      
    },
    measureDistance:function(measureMode,x1, y1, x2, y2, distance)
    {       
        try
        {
            switch(measureMode)
            {
                case 0: distance[0] = Math.sqrt((Math.pow((x2 - x1), 2)) + (Math.pow((y2 - y1), 2)));
                    break;
                case 1: distance[0] = Math.abs(x1 - x2);
                    break;
                case 2: distance[0] = Math.abs(y1 - y2);
                    break;
                default: distance[0] = Math.sqrt((Math.pow((x2 - x1), 2)) + (Math.pow((y2 - y1), 2)));
                    break;
            }
            distance[0] = Math.abs(distance[0]);
            return iWhizError.SUCCESS;
        }
        catch (e)
        {
            return iWhizError.UNEXPECTED_ERROR;
        }       
    },
   
    getClosestPointOnPolyline: function(polyXCoords, polyYCoords, xCoord, yCoord)
    {
        try
        {
            var Dist = 1.7 * Math.pow(10.0, 308.0);
            var tempDist;
            var clickedPoint = { x: parseFloat(xCoord[0]), y: parseFloat(yCoord[0]) };
            for (var index = 0; index < polyXCoords.length; index++) {
                var startPoint;
                var endPoint;

                startPoint = { x: parseFloat(polyXCoords[index]), y: parseFloat(polyYCoords[index]) };

                if (index != polyXCoords.length - 1)
                    endPoint = { x: parseFloat(polyXCoords[index + 1]), y: parseFloat(polyYCoords[index + 1]) };
                else
                    endPoint = { x: parseFloat(polyXCoords[0]), y: parseFloat(polyYCoords[0]) };

                var A = clickedPoint.x - startPoint.x;
                var B = clickedPoint.y - startPoint.y;
                var C = endPoint.x - startPoint.x;
                var D = endPoint.y - startPoint.y;
					 
                var dot = A * C + B * D;
                var len_sq = C * C + D * D;
                var param = dot / len_sq;
					 
                var xx, yy;

                if(param < 0)
                {
                    xx = startPoint.x;
                    yy = startPoint.y;
                }
                else if(param > 1)
                {
                    xx = endPoint.x;
                    yy = endPoint.y;
                }
                else
                {
                    xx = startPoint.x + param * C;
                    yy = startPoint.y + param * D;
                }
                tempDist = Math.sqrt( (clickedPoint.x-xx)*(clickedPoint.x-xx) + (clickedPoint.y-yy)*(clickedPoint.y-yy) );
                if( tempDist < Dist )
                {
                    xCoord[0] = xx;
                    yCoord[0] = yy;
                    Dist= tempDist;
                }
            }
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
   
    saveTextAsFile: function (textToWrite, fileNameToSaveAs) {
          /* Saves a text string as a blob file*/  
          var ie = navigator.userAgent.match(/MSIE\s([\d.]+)/),
              ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/),
              ieEDGE = navigator.userAgent.match(/Edge/g),
              ieVer=(ie ? ie[1] : (ie11 ? 11 : (ieEDGE ? 12 : -1)));

          if (ie && ieVer<10) {
            console.log("No blobs on IE ver<10");
            return;
          }

          var textFileAsBlob = new Blob([textToWrite], {
            type: 'text/plain'
          });

          if (ieVer>-1) {
            window.navigator.msSaveBlob(textFileAsBlob, fileNameToSaveAs);

          } else {
            var downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = function(e) { document.body.removeChild(e.target); };
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
            downloadLink.click();
          }
    },

    _base64ToArrayBuffer: function (base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    },
    _base64ToByteString : function(base64)
    {
        var binary_string = window.atob(base64);
        return binary_string;
    },
    _base64ToArrayBufferDeCompress: function (base64) {
        var binary_string = window.atob(base64);
        binary_string = binary_string.split('').map(function (e) {
            return e.charCodeAt(0);
        });
        var inflate = new Zlib.Inflate(binary_string);
        binary_string = inflate.decompress();
         
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string[i];
        }

        return bytes.buffer;
    },
    byteStringToArrayBufferDeCompress: function (binary_string) {
        binary_string = binary_string.split('').map(function (e) {
            return e.charCodeAt(0);
        });
        var inflate = new Zlib.Inflate(binary_string);
        binary_string = inflate.decompress();

        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string[i];
        }

        return bytes.buffer;
    },
    _appendBuffer : function(buffer1, buffer2) {
    var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
    tmp.set(new Uint8Array(buffer1), 0);
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
    return tmp.buffer;
    },
    ////////////MAXIMUM RECTANGLE//////////////////////////////////////
    /**
     Return the largest rectangle in the given polygon.

     Extracted from d3plus (https://github.com/alexandersimoes/d3plus)

     Built on d3 and simplify-js.
     */
    squaredDist: function (a, b) {
        var deltax, deltay;
        deltax = b[0] - a[0];
        deltay = b[1] - a[1];
        return deltax * deltax + deltay * deltay;
    },

    rayIntersectsSegment: function (p, p1, p2) {
        var a, b, mAB, mAP, ref;
        ref = (p1[1] < p2[1]) ? [p1, p2] : [p2, p1];
        a = ref[0];
        b = ref[1];
        if (p[1] === b[1] || p[1] === a[1]) {
            p[1] += Number.MIN_VALUE;
        }
        if (p[1] > b[1] || p[1] < a[1]) {
            return false;
        } else if (p[0] > a[0] && p[0] > b[0]) {
            return false;
        } else if (p[0] < a[0] && p[0] < b[0]) {
            return true;
        } else {
            mAB = (b[1] - a[1]) / (b[0] - a[0]);
            mAP = (p[1] - a[1]) / (p[0] - a[0]);
            return mAP > mAB;
        }
    },

    pointInPoly: function (p, poly) {
        var a, b, c, i, n;
        i = -1;
        n = poly.length;
        b = poly[n - 1];
        c = 0;
        while (++i < n) {
            a = b;
            b = poly[i];
            if (this.rayIntersectsSegment(p, a, b)) {
                c++;
            }
        }
        return c % 2 !== 0;
    },

    pointInSegmentBox: function (p, p1, q1) {
        var eps, px, py;
        eps = 1e-9;
        px = p[0];
        py = p[1];
        if (px < Math.min(p1[0], q1[0]) - eps || px > Math.max(p1[0], q1[0]) + eps || py < Math.min(p1[1], q1[1]) - eps || py > Math.max(p1[1], q1[1]) + eps) {
            return false;
        }
        return true;
    },
    lineIntersection: function (p1, q1, p2, q2) {
        var cross1, cross2, denom, dx1, dx2, dy1, dy2, eps, px, py;
        eps = 1e-9;
        dx1 = p1[0] - q1[0];
        dy1 = p1[1] - q1[1];
        dx2 = p2[0] - q2[0];
        dy2 = p2[1] - q2[1];
        denom = dx1 * dy2 - dy1 * dx2;
        if (Math.abs(denom) < eps) {
            return null;
        }
        cross1 = p1[0] * q1[1] - p1[1] * q1[0];
        cross2 = p2[0] * q2[1] - p2[1] * q2[0];
        px = (cross1 * dx2 - cross2 * dx1) / denom;
        py = (cross1 * dy2 - cross2 * dy1) / denom;
        return [px, py];
    },

    segmentsIntersect: function (p1, q1, p2, q2) {
        var p;
        p = this.lineIntersection(p1, q1, p2, q2);
        if (p == null) {
            return false;
        }
        return this.pointInSegmentBox(p, p1, q1) && this.pointInSegmentBox(p, p2, q2);
    },

    polyInsidePoly: function (polyA, polyB) {
        var aA, aB, bA, bB, iA, iB, nA, nB;
        iA = -1;
        nA = polyA.length;
        nB = polyB.length;
        bA = polyA[nA - 1];
        while (++iA < nA) {
            aA = bA;
            bA = polyA[iA];
            iB = -1;
            bB = polyB[nB - 1];
            while (++iB < nB) {
                aB = bB;
                bB = polyB[iB];
                if (this.segmentsIntersect(aA, bA, aB, bB)) {
                    return false;
                }
            }
        }
        return this.pointInPoly(polyA[0], polyB);
    },

    rotatePoint: function (p, alpha, origin) {
        var cosAlpha, sinAlpha, xshifted, yshifted;
        if (origin == null) {
            origin = [0, 0];
        }
        xshifted = p[0] - origin[0];
        yshifted = p[1] - origin[1];
        cosAlpha = Math.cos(alpha);
        sinAlpha = Math.sin(alpha);
        return [cosAlpha * xshifted - sinAlpha * yshifted + origin[0], sinAlpha * xshifted + cosAlpha * yshifted + origin[1]];
    },

    rotatePoly: function (poly, alpha, origin) {
        var j, len, point, results;
        results = [];
        for (j = 0, len = poly.length; j < len; j++) {
            point = poly[j];
            results.push(this.rotatePoint(point, alpha, origin));
        }
        return results;
    },

    intersectPoints: function (poly, origin, alpha) {
        var a, b, closestPointLeft, closestPointRight, eps, i, idx, minSqDistLeft, minSqDistRight, n, p, shiftedOrigin, sqDist, x0, y0;
        eps = 1e-9;
        origin = [origin[0] + eps * Math.cos(alpha), origin[1] + eps * Math.sin(alpha)];
        x0 = origin[0];
        y0 = origin[1];
        shiftedOrigin = [x0 + Math.cos(alpha), y0 + Math.sin(alpha)];
        idx = 0;
        if (Math.abs(shiftedOrigin[0] - x0) < eps) {
            idx = 1;
        }
        i = -1;
        n = poly.length;
        b = poly[n - 1];
        minSqDistLeft = Number.MAX_VALUE;
        minSqDistRight = Number.MAX_VALUE;
        closestPointLeft = null;
        closestPointRight = null;
        while (++i < n) {
            a = b;
            b = poly[i];
            p = this.lineIntersection(origin, shiftedOrigin, a, b);
            if ((p != null) && this.pointInSegmentBox(p, a, b)) {
                sqDist = this.squaredDist(origin, p);
                if (p[idx] < origin[idx]) {
                    if (sqDist < minSqDistLeft) {
                        minSqDistLeft = sqDist;
                        closestPointLeft = p;
                    }
                } else if (p[idx] > origin[idx]) {
                    if (sqDist < minSqDistRight) {
                        minSqDistRight = sqDist;
                        closestPointRight = p;
                    }
                }
            }
        }
        return [closestPointLeft, closestPointRight];
    },

    /**
     Return the largest rectangle inside the given polygon.

     @param poly Array of x, y coordinates describing a polygon, in the order in which those points should be drawn.
     @param options Object describing options, including:
     angle Specifies the rotation of the polygon. An angle of zero means that
     the longer side of the polygon (the width) will be aligned with the x axis.
     An angle of +90 and/or -90 means that the longer side of the polygon (the width)
     will be aligned with the y axis. The parameter angle can be
     - a number between -90 and +90 specifying the angle of rotation of the polygon.
     - a string which is parsed to a number
     - an array of numbers, specifying the possible rotations of the polygon
     - unspecified, which means the polygon can have any possible angle

     aspectRatio The ratio between the width and the height of the rectangle,
     i.e. width/height. The parameter aspectRatio can be
     - a number
     - a string which is parsed to a number
     - an array of numbers, specifying the possible aspectRatios of the polygon

     maxAspectRatio Maximum aspect ratio (width/height). Default is 15.
     This should be used if the aspectRatio is not provided.

     nTries The number of randomly drawn points inside the polygon which
     the algorithm explores as possible center points of the maximal rectangle.
     Default value is 20.

     minWidth The minimum width of the rectangle. Default is 0.

     minHeight The minimum height of the rectangle. Default is 0.

     tolerance The simplification tolerance factor. Should be between 0 and 1.
     Default is 0.02. Larger tolerance corresponds to more extensive simplification.

     origin The center point of the rectangle. If specified, the rectangle is
     fixed at that point, otherwise the algorithm optimizes across all possible points.
     The parameter origin can be
     - a two dimensional array specifying the x and y coordinate of the origin
     - an array of two dimensional arrays specifying the the possible center points
     of the maximal rectangle.

     @return [rect, area, events] Array of result data, including:
     rect Object describing the result rectangle, including:
     cx Center X coordinate of the result rectangle
     cy Center Y coordinate of the result rectangle
     width Width of the result rectangle
     height Height of the result rectangle
     angle Angle of the rectangle's axis, in degrees
     area Total area of the result rectangle
     events Array of events that occurred while finding the rectangle
     */
    findLargestRect: function (poly, options) {
        var aRatio, aRatios, angle, angleRad, angleStep, angles, area, aspectRatioStep, aspectRatios, bBox, boxHeight, boxWidth, centroid, events, height, i, insidePoly, j, k, l, left, len, len1, len2, len3, m, maxArea, maxAspectRatio, maxHeight, maxRect, maxWidth, maxx, maxy, minAspectRatio, minSqDistH, minSqDistW, minx, miny, modifOrigins, origOrigin, origin, origins, p, p1H, p1W, p2H, p2W, rectPoly, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, right, rndPoint, rndX, rndY, tempPoly, tolerance, width, widthStep, x0, y0;
        if (poly.length < 3) {
            return null;
        }
        // Copy polygon and add initial point to the end of it

        events = [];
        aspectRatioStep = 0.5;
        angleStep = 5;
        if (options == null) {
            options = {};
        }

        if (options.maxAspectRatio == null) {
            options.maxAspectRatio = 15;
        }
        if (options.minWidth == null) {
            options.minWidth = 0;
        }
        if (options.minHeight == null) {
            options.minHeight = 0;
        }
        if (options.tolerance == null) {
            options.tolerance = 0.02;
        }
        if (options.nTries == null) {
            options.nTries = 20;
        }
        if (options.angle != null) {
            if (options.angle instanceof Array) {
                angles = options.angle;
            } else if (typeof options.angle === 'number') {
                angles = [options.angle];
            } else if (typeof options.angle === 'string' && !isNaN(options.angle)) {
                angles = [Number(options.angle)];
            }
        }
        if (angles == null) {
            angles = d3.range(-90, 90 + angleStep, angleStep);
        }
        if (options.aspectRatio != null) {
            if (options.aspectRatio instanceof Array) {
                aspectRatios = options.aspectRatio;
            } else if (typeof options.aspectRatio === 'number') {
                aspectRatios = [options.aspectRatio];
            } else if (typeof options.aspectRatio === 'string' && !isNaN(options.aspectRatio)) {
                aspectRatios = [Number(options.aspectRatio)];
            }
        }
        if (options.origin != null) {
            if (options.origin instanceof Array) {
                if (options.origin[0] instanceof Array) {
                    origins = options.origin;
                } else {
                    origins = [options.origin];
                }
            }
        }
        area = Math.abs(d3.geom.polygon(poly).area());
        if (area === 0) {
            return null;
        }
        ref = d3.extent(poly, function (d) {
            return d[0];
        }), minx = ref[0], maxx = ref[1];
        ref1 = d3.extent(poly, function (d) {
            return d[1];
        }), miny = ref1[0], maxy = ref1[1];
        tolerance = Math.min(maxx - minx, maxy - miny) * options.tolerance;
        tempPoly = (function () {
            var j, len, results;
            results = [];
            for (j = 0, len = poly.length; j < len; j++) {
                p = poly[j];
                results.push({
                    x: p[0],
                    y: p[1]
                });
            }
            return results;
        })();
        if (tolerance > 0) {
            tempPoly = simplify(tempPoly, tolerance);
            poly = (function () {
                var j, len, results;
                results = [];
                for (j = 0, len = tempPoly.length; j < len; j++) {
                    p = tempPoly[j];
                    results.push([p.x, p.y]);
                }
                return results;
            })();
        }
        if (options.vdebug) {
            events.push({
                type: 'simplify',
                poly: poly
            });
        }
        ref2 = d3.extent(poly, function (d) {
            return d[0];
        }), minx = ref2[0], maxx = ref2[1];
        ref3 = d3.extent(poly, function (d) {
            return d[1];
        }), miny = ref3[0], maxy = ref3[1];
        bBox = [[minx, miny], [maxx, miny], [maxx, maxy], [minx, maxy]];
        ref4 = [maxx - minx, maxy - miny], boxWidth = ref4[0], boxHeight = ref4[1];
        widthStep = Math.min(boxWidth, boxHeight) / 50;
        if (origins == null) {
            origins = [];
            centroid = d3.geom.polygon(poly).centroid();
            if (this.pointInPoly(centroid, poly)) {
                origins.push(centroid);
            }
            while (origins.length < options.nTries) {
                rndX = Math.random() * boxWidth + minx;
                rndY = Math.random() * boxHeight + miny;
                rndPoint = [rndX, rndY];
                if (this.pointInPoly(rndPoint, poly)) {
                    origins.push(rndPoint);
                }
            }
        }
        if (options.vdebug) {
            events.push({
                type: 'origins',
                points: origins
            });
        }
        maxArea = 0;
        maxRect = null;
        for (j = 0, len = angles.length; j < len; j++) {
            angle = angles[j];
            angleRad = -angle * Math.PI / 180;
            if (options.vdebug) {
                events.push({
                    type: 'angle',
                    angle: angle
                });
            }
            for (i = k = 0, len1 = origins.length; k < len1; i = ++k) {
                origOrigin = origins[i];
                ref5 = this.intersectPoints(poly, origOrigin, angleRad), p1W = ref5[0], p2W = ref5[1];
                ref6 = this.intersectPoints(poly, origOrigin, angleRad + Math.PI / 2), p1H = ref6[0], p2H = ref6[1];
                modifOrigins = [];
                if ((p1W != null) && (p2W != null)) {
                    modifOrigins.push([(p1W[0] + p2W[0]) / 2, (p1W[1] + p2W[1]) / 2]);
                }
                if ((p1H != null) && (p2H != null)) {
                    modifOrigins.push([(p1H[0] + p2H[0]) / 2, (p1H[1] + p2H[1]) / 2]);
                }
                if (options.vdebug) {
                    events.push({
                        type: 'modifOrigin',
                        idx: i,
                        p1W: p1W,
                        p2W: p2W,
                        p1H: p1H,
                        p2H: p2H,
                        modifOrigins: modifOrigins
                    });
                }
                for (l = 0, len2 = modifOrigins.length; l < len2; l++) {
                    origin = modifOrigins[l];
                    if (options.vdebug) {
                        events.push({
                            type: 'origin',
                            cx: origin[0],
                            cy: origin[1]
                        });
                    }
                    ref7 = this.intersectPoints(poly, origin, angleRad), p1W = ref7[0], p2W = ref7[1];
                    if (p1W === null || p2W === null) {
                        continue;
                    }
                    minSqDistW = Math.min(this.squaredDist(origin, p1W), this.squaredDist(origin, p2W));
                    maxWidth = 2 * Math.sqrt(minSqDistW);
                    ref8 = this.intersectPoints(poly, origin, angleRad + Math.PI / 2), p1H = ref8[0], p2H = ref8[1];
                    if (p1H === null || p2H === null) {
                        continue;
                    }
                    minSqDistH = Math.min(this.squaredDist(origin, p1H), this.squaredDist(origin, p2H));
                    maxHeight = 2 * Math.sqrt(minSqDistH);
                    if (maxWidth * maxHeight < maxArea) {
                        continue;
                    }
                    if (aspectRatios != null) {
                        aRatios = aspectRatios;
                    } else {
                        minAspectRatio = Math.max(1, options.minWidth / maxHeight, maxArea / (maxHeight * maxHeight));
                        maxAspectRatio = Math.min(options.maxAspectRatio, maxWidth / options.minHeight, (maxWidth * maxWidth) / maxArea);
                        aRatios = d3.range(minAspectRatio, maxAspectRatio + aspectRatioStep, aspectRatioStep);
                    }
                    for (m = 0, len3 = aRatios.length; m < len3; m++) {
                        aRatio = aRatios[m];
                        left = Math.max(options.minWidth, Math.sqrt(maxArea * aRatio));
                        right = Math.min(maxWidth, maxHeight * aRatio);
                        if (right * maxHeight < maxArea) {
                            continue;
                        }
                        if ((right - left) >= widthStep) {
                            if (options.vdebug) {
                                events.push({
                                    type: 'aRatio',
                                    aRatio: aRatio
                                });
                            }
                        }
                        while ((right - left) >= widthStep) {
                            width = (left + right) / 2;
                            height = width / aRatio;
                            x0 = origin[0], y0 = origin[1];
                            rectPoly = [[x0 - width / 2, y0 - height / 2], [x0 + width / 2, y0 - height / 2], [x0 + width / 2, y0 + height / 2], [x0 - width / 2, y0 + height / 2]];
                            rectPoly = this.rotatePoly(rectPoly, angleRad, origin);
                            if (this.polyInsidePoly(rectPoly, poly)) {
                                insidePoly = true;
                                maxArea = width * height;
                                maxRect = {
                                    cx: x0,
                                    cy: y0,
                                    width: width,
                                    height: height,
                                    angle: angle
                                };
                                left = width;
                            } else {
                                insidePoly = false;
                                right = width;
                            }
                            //if (options.vdebug) 
                            if (insidePoly) {
                                events.push({
                                    type: 'rectangle',
                                    cx: x0,
                                    cy: y0,
                                    width: width,
                                    height: height,
                                    areaFraction: (width * height) / area,
                                    angle: angle,
                                    insidePoly: insidePoly
                                });
                            }
                        }
                    }
                }
            }
        }
        return [maxRect, maxArea, events];
    }
}

Tools.Vector2.prototype = {
    constructor: Tools.Vector2,
    set: function (a, b) {
        return this.x = a, this.y = b, this
    },
    copy: function (a) {
        return this.x = a.x, this.y = a.y, this
    },
    addScalar: function (a) {
        return this.x += a, this.y += a, this
    },
    add: function (a, b) {
        return this.x = a.x + b.x, this.y = a.y + b.y, this
    },
    addSelf: function (a) {
        return this.x += a.x, this.y += a.y, this
    },
    sub: function (a, b) {
        return this.x = a.x - b.x, this.y = a.y - b.y, this
    },
    subSelf: function (a) {
        return this.x -= a.x, this.y -= a.y, this
    },
    multiplyScalar: function (a) {
        return this.x *= a, this.y *= a, this
    },
    divideScalar: function (a) {
        return 0 !== a ? (this.x /= a, this.y /= a) : this.set(0, 0), this
    },
    minSelf: function (a) {
        return this.x > a.x && (this.x = a.x), this.y > a.y && (this.y = a.y), this
    },
    maxSelf: function (a) {
        return this.x < a.x && (this.x = a.x), this.y < a.y && (this.y = a.y), this
    },
    negate: function () {
        return this.multiplyScalar(-1)
    },
    dot: function (a) {
        return this.x * a.x + this.y * a.y
    },
    length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    },
    normalize: function () {
        return this.divideScalar(this.length())
    },
    distanceTo: function (a) {
        return Math.sqrt(this.distanceToSquared(a))
    },
    setLength: function (a) {
        var b = this.length();
        return 0 !== b && a !== b && this.multiplyScalar(a / b), this
    },
    lerpSelf: function (a, b) {
        return this.x += (a.x - this.x) * b, this.y += (a.y - this.y) * b, this
    },
    equals: function (a) {
        return a.x === this.x && a.y === this.y
    },
    clone: function () {
        return new this.Vector2(this.x, this.y)
    }
};

Tools.Vector3.prototype = {
    constructor: this.Vector3,
    set: function (a, b, c) {
        return this.x = a, this.y = b, this.z = c, this
    },
    copy: function (a) {
        return this.x = a.x, this.y = a.y, this.z = a.z, this
    },
    add: function (a, b) {
        return this.x = a.x + b.x, this.y = a.y + b.y, this.z = a.z + b.z, this
    },
    addSelf: function (a) {
        return this.x += a.x, this.y += a.y, this.z += a.z, this
    },
    addScalar: function (a) {
        return this.x += a, this.y += a, this.z += a, this
    },
    sub: function (a, b) {
        return this.x = a.x - b.x, this.y = a.y - b.y, this.z = a.z - b.z, this
    },
    subSelf: function (a) {
        return this.x -= a.x, this.y -= a.y, this.z -= a.z, this
    },
    multiply: function (a, b) {
        return this.x = a.x * b.x, this.y = a.y * b.y, this.z = a.z * b.z, this
    },
    multiplySelf: function (a) {
        return this.x *= a.x, this.y *= a.y, this.z *= a.z, this
    },
    multiplyScalar: function (a) {
        return this.x *= a, this.y *= a, this.z *= a, this
    },
    divideSelf: function (a) {
        return this.x /= a.x, this.y /= a.y, this.z /= a.z, this
    },
    divideScalar: function (a) {
        return 0 !== a ? (this.x /= a, this.y /= a, this.z /= a) : (this.x = 0, this.y = 0, this.z = 0), this
    },
    minSelf: function (a) {
        return this.x > a.x && (this.x = a.x), this.y > a.y && (this.y = a.y), this.z > a.z && (this.z = a.z), this
    },
    maxSelf: function (a) {
        return this.x < a.x && (this.x = a.x), this.y < a.y && (this.y = a.y), this.z < a.z && (this.z = a.z), this
    },
    clampSelf: function (a, b) {
        return this.x < a.x ? this.x = a.x : this.x > b.x && (this.x = b.x), this.y < a.y ? this.y = a.y : this.y > b.y && (this.y = b.y), this.z < a.z ? this.z = a.z : this.z > b.z && (this.z = b.z), this
    },
    negate: function () {
        return this.multiplyScalar(-1)
    },
    dot: function (a) {
        return this.x * a.x + this.y * a.y + this.z * a.z
    },
    length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    },
    normalize: function () {
        return this.divideScalar(this.length())
    },
    setLength: function (a) {
        var b = this.length();
        return 0 !== b && a !== b && this.multiplyScalar(a / b), this
    },
    lerpSelf: function (a, b) {
        return this.x += (a.x - this.x) * b, this.y += (a.y - this.y) * b, this.z += (a.z - this.z) * b, this
    },
    cross: function (a, b) {
        return this.x = a.y * b.z - a.z * b.y, this.y = a.z * b.x - a.x * b.z, this.z = a.x * b.y - a.y * b.x, this
    },
    crossSelf: function (a) {
        var b = this.x,
            c = this.y,
            d = this.z;
        return this.x = c * a.z - d * a.y, this.y = d * a.x - b * a.z, this.z = b * a.y - c * a.x, this
    },
    angleTo: function (a) {
        return Math.acos(this.dot(a) / this.length() / a.length())
    },
    distanceTo: function (a) {
        return Math.sqrt(this.distanceToSquared(a))
    },
    getPositionFromMatrix: function (a) {
        return this.x = a.elements[12], this.y = a.elements[13], this.z = a.elements[14], this
    },
    getScaleFromMatrix: function (a) {
        var b = this.set(a.elements[0], a.elements[1], a.elements[2]).length(),
            c = this.set(a.elements[4], a.elements[5], a.elements[6]).length(),
            d = this.set(a.elements[8], a.elements[9], a.elements[10]).length();
        return this.x = b, this.y = c, this.z = d, this
    },
    equals: function (a) {
        return a.x === this.x && a.y === this.y && a.z === this.z
    },
    clone: function () {
        return new this.Vector3(this.x, this.y, this.z)
    }
};

Tools.Matrix4.prototype = {
    constructor: this.Matrix4,
    set: function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
        var q = this.elements;
        q[0] = a, q[4] = b, q[8] = c, q[12] = d, q[1] = e, q[5] = f, q[9] = g, q[13] = h, q[2] = i, q[6] = j, q[10] = k, q[14] = l, q[3] = m, q[7] = n, q[11] = o, q[15] = p
    },
    add: function (a) {
        for (var b = 0; 16 > b; b++) this.elements[b] += a.elements[b]
    },
    multiplyScalar: function (a) {
        var b = this.elements;
        return b[0] *= a, b[4] *= a, b[8] *= a, b[12] *= a, b[1] *= a, b[5] *= a, b[9] *= a, b[13] *= a, b[2] *= a, b[6] *= a, b[10] *= a, b[14] *= a, b[3] *= a, b[7] *= a, b[11] *= a, b[15] *= a, this
    },
    multiply: function (a, b) {
        var c = a.elements,
            d = b.elements,
            e = this.elements,
            f = c[0],
            g = c[4],
            h = c[8],
            i = c[12],
            j = c[1],
            k = c[5],
            l = c[9],
            m = c[13],
            n = c[2],
            o = c[6],
            p = c[10],
            q = c[14],
            r = c[3],
            s = c[7],
            t = c[11],
            u = c[15],
            v = d[0],
            w = d[4],
            x = d[8],
            y = d[12],
            z = d[1],
            A = d[5],
            B = d[9],
            C = d[13],
            D = d[2],
            E = d[6],
            F = d[10],
            G = d[14],
            H = d[3],
            I = d[7],
            J = d[11],
            K = d[15];
        e[0] = f * v + g * z + h * D + i * H, e[4] = f * w + g * A + h * E + i * I, e[8] = f * x + g * B + h * F + i * J, e[12] = f * y + g * C + h * G + i * K, e[1] = j * v + k * z + l * D + m * H, e[5] = j * w + k * A + l * E + m * I, e[9] = j * x + k * B + l * F + m * J, e[13] = j * y + k * C + l * G + m * K, e[2] = n * v + o * z + p * D + q * H, e[6] = n * w + o * A + p * E + q * I, e[10] = n * x + o * B + p * F + q * J, e[14] = n * y + o * C + p * G + q * K, e[3] = r * v + s * z + t * D + u * H, e[7] = r * w + s * A + t * E + u * I, e[11] = r * x + s * B + t * F + u * J, e[15] = r * y + s * C + t * G + u * K
    },
    multiplySelf: function (a) {
        this.multiply(this, a)
    },
    multiplyVector3: function (a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            e = a.z,
            f = 1 / (b[3] * c + b[7] * d + b[11] * e + b[15]);
        return a.x = (b[0] * c + b[4] * d + b[8] * e + b[12]) * f, a.y = (b[1] * c + b[5] * d + b[9] * e + b[13]) * f, a.z = (b[2] * c + b[6] * d + b[10] * e + b[14]) * f, a
    },
    getInverse: function (a) {
        var b = this.elements,
            c = a.elements,
            d = c[0],
            e = c[4],
            f = c[8],
            g = c[12],
            h = c[1],
            i = c[5],
            j = c[9],
            k = c[13],
            l = c[2],
            m = c[6],
            n = c[10],
            o = c[14],
            p = c[3],
            q = c[7],
            r = c[11],
            s = c[15];
        return b[0] = j * o * q - k * n * q + k * m * r - i * o * r - j * m * s + i * n * s, b[4] = g * n * q - f * o * q - g * m * r + e * o * r + f * m * s - e * n * s, b[8] = f * k * q - g * j * q + g * i * r - e * k * r - f * i * s + e * j * s, b[12] = g * j * m - f * k * m - g * i * n + e * k * n + f * i * o - e * j * o, b[1] = k * n * p - j * o * p - k * l * r + h * o * r + j * l * s - h * n * s, b[5] = f * o * p - g * n * p + g * l * r - d * o * r - f * l * s + d * n * s, b[9] = g * j * p - f * k * p - g * h * r + d * k * r + f * h * s - d * j * s, b[13] = f * k * l - g * j * l + g * h * n - d * k * n - f * h * o + d * j * o, b[2] = i * o * p - k * m * p + k * l * q - h * o * q - i * l * s + h * m * s, b[6] = g * m * p - e * o * p - g * l * q + d * o * q + e * l * s - d * m * s, b[10] = e * k * p - g * i * p + g * h * q - d * k * q - e * h * s + d * i * s, b[14] = g * i * l - e * k * l - g * h * m + d * k * m + e * h * o - d * i * o, b[3] = j * m * p - i * n * p - j * l * q + h * n * q + i * l * r - h * m * r, b[7] = e * n * p - f * m * p + f * l * q - d * n * q - e * l * r + d * m * r, b[11] = f * i * p - e * j * p - f * h * q + d * j * q + e * h * r - d * i * r, b[15] = e * j * l - f * i * l + f * h * m - d * j * m - e * h * n + d * i * n, this.multiplyScalar(1 / a.determinant()), this
    },
    determinant: function () {
        var a = this.elements,
            b = a[0],
            c = a[4],
            d = a[8],
            e = a[12],
            f = a[1],
            g = a[5],
            h = a[9],
            i = a[13],
            j = a[2],
            k = a[6],
            l = a[10],
            m = a[14],
            n = a[3],
            o = a[7],
            p = a[11],
            q = a[15];
        return e * h * k * n - d * i * k * n - e * g * l * n + c * i * l * n + d * g * m * n - c * h * m * n - e * h * j * o + d * i * j * o + e * f * l * o - b * i * l * o - d * f * m * o + b * h * m * o + e * g * j * p - c * i * j * p - e * f * k * p + b * i * k * p + c * f * m * p - b * g * m * p - d * g * j * q + c * h * j * q + d * f * k * q - b * h * k * q - c * f * l * q + b * g * l * q
    },
    translate: function (a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            e = a.z;
        return b[12] = b[0] * c + b[4] * d + b[8] * e + b[12], b[13] = b[1] * c + b[5] * d + b[9] * e + b[13], b[14] = b[2] * c + b[6] * d + b[10] * e + b[14], b[15] = b[3] * c + b[7] * d + b[11] * e + b[15], this
    },
    setPosition: function (a, b, c) {
        var d = this.elements;
        d[12] = a, d[13] = b, d[14] = c
    },
    getPosition: function () {
        var a = new this.Vector3;
        return a.x = this.elements[12], a.y = this.elements[13], a.z = this.elements[14], a
    },
    extractRotation: function (a) {
        var b = this.elements,
            c = a.elements,
            d = new this.Vector3,
            e = 1 / d.set(c[0], c[1], c[2]).length(),
            f = 1 / d.set(c[4], c[5], c[6]).length(),
            g = 1 / d.set(c[8], c[9], c[10]).length();
        return b[0] = c[0] * e, b[1] = c[1] * e, b[2] = c[2] * e, b[4] = c[4] * f, b[5] = c[5] * f, b[6] = c[6] * f, b[8] = c[8] * g, b[9] = c[9] * g, b[10] = c[10] * g, this
    },
    lookAt: function (a, b, c) {
        var d = this.elements,
            e = new WebViewerJS.Vector3,
            f = new WebViewerJS.Vector3,
            g = new WebViewerJS.Vector3;
        return g.sub(b, a).normalize(), 0 === g.length() && (g.z = 1), e.cross(c, g).normalize(), 0 === e.length() && (g.x += 1e-4, e.cross(c, g).normalize()), f.cross(g, e), d[0] = e.x, d[4] = f.x, d[8] = g.x, d[1] = e.y, d[5] = f.y, d[9] = g.y, d[2] = e.z, d[6] = f.z, d[10] = g.z, this
    },
    scale: function (a) {
        var b = this.elements;
        b[0] *= a, b[4] *= a, b[8] *= a, b[1] *= a, b[5] *= a, b[9] *= a, b[2] *= a, b[6] *= a, b[10] *= a, b[3] *= a, b[7] *= a, b[11] *= a
    },
    setRotationFromQuaternion: function (a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            e = a.z,
            f = a.w,
            g = c + c,
            h = d + d,
            i = e + e,
            j = c * g,
            k = c * h,
            l = c * i,
            m = d * h,
            n = d * i,
            o = e * i,
            p = f * g,
            q = f * h,
            r = f * i;
        return b[0] = 1 - (m + o), b[4] = k - r, b[8] = l + q, b[1] = k + r, b[5] = 1 - (j + o), b[9] = n - p, b[2] = l - q, b[6] = n + p, b[10] = 1 - (j + m), this
    },
    transpose : function ()
    {       
        var  result = result || new Tools.Matrix4();
        var m = this.elements, r = result.elements;
        r[0] = m[0]; r[1] = m[4]; r[2] = m[8]; r[3] = m[12];
        r[4] = m[1]; r[5] = m[5]; r[6] = m[9]; r[7] = m[13];
        r[8] = m[2]; r[9] = m[6]; r[10] = m[10]; r[11] = m[14];
        r[12] = m[3]; r[13] = m[7]; r[14] = m[11]; r[15] = m[15];

        this.elements = r;
        return;
    },
    multiplyVector4 : function(a) 
    {
        var b = this.elements;
        var c = a.x;
        var d = a.y;
        var e = a.z;
        var f = a.w;
        a.x = b[0]*c + b[4]*d + b[8]*e + b[12]*f;
        a.y = b[1]*c + b[5]*d + b[9]*e + b[13]*f;
        a.z = b[2]*c + b[6]*d + b[10]*e + b[14]*f;
        return a;
    }
};

Tools.Vector4.prototype = {

    constructor: this.Vector4,

    set: function (x, y, z, w) {

        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

        return this;

    },

    copy: function (v) {

        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        this.w = (v.w !== undefined) ? v.w : 1;

    },

    clone: function () {

        return new THREE.Vector4(this.x, this.y, this.z, this.w);

    },


    add: function (v1, v2) {

        this.x = v1.x + v2.x;
        this.y = v1.y + v2.y;
        this.z = v1.z + v2.z;
        this.w = v1.w + v2.w;

        return this;

    },

    addSelf: function (v) {

        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;

        return this;

    },

    sub: function (v1, v2) {

        this.x = v1.x - v2.x;
        this.y = v1.y - v2.y;
        this.z = v1.z - v2.z;
        this.w = v1.w - v2.w;

        return this;

    },

    subSelf: function (v) {

        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        this.w -= v.w;

        return this;

    },

    multiplyScalar: function (s) {

        this.x *= s;
        this.y *= s;
        this.z *= s;
        this.w *= s;

        return this;

    },

    divideScalar: function (s) {

        if (s) {

            this.x /= s;
            this.y /= s;
            this.z /= s;
            this.w /= s;

        } else {

            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 1;

        }

        return this;

    },


    negate: function () {

        return this.multiplyScalar(-1);

    },

    dot: function (v) {

        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;

    },

    lengthSq: function () {

        return this.dot(this);

    },

    length: function () {

        return Math.sqrt(this.lengthSq());

    },

    normalize: function () {

        return this.divideScalar(this.length());

    },

    setLength: function (l) {

        return this.normalize().multiplyScalar(l);

    },


    lerpSelf: function (v, alpha) {

        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;
        this.w += (v.w - this.w) * alpha;

        return this;

    }
};