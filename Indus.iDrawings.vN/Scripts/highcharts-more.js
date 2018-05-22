//// ==ClosureCompiler==
//// @compilation_level SIMPLE_OPTIMIZATIONS

///**
// * @license Highcharts JS v4.2.7 (2016-09-21)
// *
// * (c) 2009-2016 Torstein Honsi
// *
// * License: www.highcharts.com/license
// */

//(function (factory) {
//    if (typeof module === 'object' && module.exports) {
//        module.exports = factory;
//    } else {
//        factory(Highcharts);
//    }
//}(function (Highcharts) {
//    var arrayMin = Highcharts.arrayMin,
//            arrayMax = Highcharts.arrayMax,
//            each = Highcharts.each,
//            extend = Highcharts.extend,
//            isNumber = Highcharts.isNumber,
//            merge = Highcharts.merge,
//            map = Highcharts.map,
//            pick = Highcharts.pick,
//            pInt = Highcharts.pInt,
//            correctFloat = Highcharts.correctFloat,
//            defaultPlotOptions = Highcharts.getOptions().plotOptions,
//            seriesTypes = Highcharts.seriesTypes,
//            extendClass = Highcharts.extendClass,
//            splat = Highcharts.splat,
//            wrap = Highcharts.wrap,
//            Axis = Highcharts.Axis,
//            Tick = Highcharts.Tick,
//            Point = Highcharts.Point,
//            Pointer = Highcharts.Pointer,
//            CenteredSeriesMixin = Highcharts.CenteredSeriesMixin,
//            TrackerMixin = Highcharts.TrackerMixin,
//            Series = Highcharts.Series,
//            math = Math,
//            mathRound = math.round,
//            mathFloor = math.floor,
//            mathMax = math.max,
//            Color = Highcharts.Color,
//            noop = function () { },
//            UNDEFINED;/**
//     * The Pane object allows options that are common to a set of X and Y axes.
//     *
//     * In the future, this can be extended to basic Highcharts and Highstock.
//     */
//    function Pane(options, chart, firstAxis) {
//        this.init(options, chart, firstAxis);
//    }

//    // Extend the Pane prototype
//    extend(Pane.prototype, {

//        /**
//         * Initiate the Pane object
//         */
//        init: function (options, chart, firstAxis) {
//            var pane = this,
//                backgroundOption,
//                defaultOptions = pane.defaultOptions;

//            pane.chart = chart;

//            // Set options. Angular charts have a default background (#3318)
//            pane.options = options = merge(defaultOptions, chart.angular ? { background: {} } : undefined, options);

//            backgroundOption = options.background;

//            // To avoid having weighty logic to place, update and remove the backgrounds,
//            // push them to the first axis' plot bands and borrow the existing logic there.
//            if (backgroundOption) {
//                each([].concat(splat(backgroundOption)).reverse(), function (config) {
//                    var backgroundColor = config.backgroundColor,  // if defined, replace the old one (specific for gradients)
//                        axisUserOptions = firstAxis.userOptions;
//                    config = merge(pane.defaultBackgroundOptions, config);
//                    if (backgroundColor) {
//                        config.backgroundColor = backgroundColor;
//                    }
//                    config.color = config.backgroundColor; // due to naming in plotBands
//                    firstAxis.options.plotBands.unshift(config);
//                    axisUserOptions.plotBands = axisUserOptions.plotBands || []; // #3176
//                    if (axisUserOptions.plotBands !== firstAxis.options.plotBands) {
//                        axisUserOptions.plotBands.unshift(config);
//                    }
//                });
//            }
//        },

//        /**
//         * The default options object
//         */
//        defaultOptions: {
//            // background: {conditional},
//            center: ['50%', '50%'],
//            size: '85%',
//            startAngle: 0
//            //endAngle: startAngle + 360
//        },

//        /**
//         * The default background options
//         */
//        defaultBackgroundOptions: {
//            shape: 'circle',
//            borderWidth: 1,
//            borderColor: 'silver',
//            backgroundColor: {
//                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
//                stops: [
//                    [0, '#FFF'],
//                    [1, '#DDD']
//                ]
//            },
//            from: -Number.MAX_VALUE, // corrected to axis min
//            innerRadius: 0,
//            to: Number.MAX_VALUE, // corrected to axis max
//            outerRadius: '105%'
//        }
//    });

//    var axisProto = Axis.prototype,
//        tickProto = Tick.prototype;

//    /**
//     * Augmented methods for the x axis in order to hide it completely, used for the X axis in gauges
//     */
//    var hiddenAxisMixin = {
//        getOffset: noop,
//        redraw: function () {
//            this.isDirty = false; // prevent setting Y axis dirty
//        },
//        render: function () {
//            this.isDirty = false; // prevent setting Y axis dirty
//        },
//        setScale: noop,
//        setCategories: noop,
//        setTitle: noop
//    };

//    /**
//     * Augmented methods for the value axis
//     */
//    var radialAxisMixin = {
//        isRadial: true,

//        /**
//         * The default options extend defaultYAxisOptions
//         */
//        defaultRadialGaugeOptions: {
//            labels: {
//                align: 'center',
//                x: 0,
//                y: null // auto
//            },
//            minorGridLineWidth: 0,
//            minorTickInterval: 'auto',
//            minorTickLength: 10,
//            minorTickPosition: 'inside',
//            minorTickWidth: 1,
//            tickLength: 10,
//            tickPosition: 'inside',
//            tickWidth: 2,
//            title: {
//                rotation: 0
//            },
//            zIndex: 2 // behind dials, points in the series group
//        },

//        // Circular axis around the perimeter of a polar chart
//        defaultRadialXOptions: {
//            gridLineWidth: 1, // spokes
//            labels: {
//                align: null, // auto
//                distance: 15,
//                x: 0,
//                y: null // auto
//            },
//            maxPadding: 0,
//            minPadding: 0,
//            showLastLabel: false,
//            tickLength: 0
//        },

//        // Radial axis, like a spoke in a polar chart
//        defaultRadialYOptions: {
//            gridLineInterpolation: 'circle',
//            labels: {
//                align: 'right',
//                x: -3,
//                y: -2
//            },
//            showLastLabel: false,
//            title: {
//                x: 4,
//                text: null,
//                rotation: 90
//            }
//        },

//        /**
//         * Merge and set options
//         */
//        setOptions: function (userOptions) {

//            var options = this.options = merge(
//                this.defaultOptions,
//                this.defaultRadialOptions,
//                userOptions
//            );

//            // Make sure the plotBands array is instanciated for each Axis (#2649)
//            if (!options.plotBands) {
//                options.plotBands = [];
//            }

//        },

//        /**
//         * Wrap the getOffset method to return zero offset for title or labels in a radial
//         * axis
//         */
//        getOffset: function () {
//            // Call the Axis prototype method (the method we're in now is on the instance)
//            axisProto.getOffset.call(this);

//            // Title or label offsets are not counted
//            this.chart.axisOffset[this.side] = 0;

//            // Set the center array
//            this.center = this.pane.center = CenteredSeriesMixin.getCenter.call(this.pane);
//        },


//        /**
//         * Get the path for the axis line. This method is also referenced in the getPlotLinePath
//         * method.
//         */
//        getLinePath: function (lineWidth, radius) {
//            var center = this.center,
//                end,
//                chart = this.chart,
//                r = pick(radius, center[2] / 2 - this.offset),
//                path;

//            if (this.isCircular || radius !== undefined) {
//                path = this.chart.renderer.symbols.arc(
//                    this.left + center[0],
//                    this.top + center[1],
//                    r,
//                    r,
//                    {
//                        start: this.startAngleRad,
//                        end: this.endAngleRad,
//                        open: true,
//                        innerR: 0
//                    }
//                );
//            } else {
//                end = this.postTranslate(this.angleRad, r);
//                path = ['M', center[0] + chart.plotLeft, center[1] + chart.plotTop, 'L', end.x, end.y];
//            }
//            return path;
//        },

//        /**
//         * Override setAxisTranslation by setting the translation to the difference
//         * in rotation. This allows the translate method to return angle for
//         * any given value.
//         */
//        setAxisTranslation: function () {

//            // Call uber method
//            axisProto.setAxisTranslation.call(this);

//            // Set transA and minPixelPadding
//            if (this.center) { // it's not defined the first time
//                if (this.isCircular) {

//                    this.transA = (this.endAngleRad - this.startAngleRad) /
//                        ((this.max - this.min) || 1);


//                } else {
//                    this.transA = (this.center[2] / 2) / ((this.max - this.min) || 1);
//                }

//                if (this.isXAxis) {
//                    this.minPixelPadding = this.transA * this.minPointOffset;
//                } else {
//                    // This is a workaround for regression #2593, but categories still don't position correctly.
//                    this.minPixelPadding = 0;
//                }
//            }
//        },

//        /**
//         * In case of auto connect, add one closestPointRange to the max value right before
//         * tickPositions are computed, so that ticks will extend passed the real max.
//         */
//        beforeSetTickPositions: function () {
//            // If autoConnect is true, polygonal grid lines are connected, and one closestPointRange
//            // is added to the X axis to prevent the last point from overlapping the first.
//            this.autoConnect = this.isCircular && pick(this.userMax, this.options.max) === undefined &&
//                this.endAngleRad - this.startAngleRad === 2 * Math.PI;

//            if (this.autoConnect) {
//                this.max += (this.categories && 1) || this.pointRange || this.closestPointRange || 0; // #1197, #2260
//            }
//        },

//        /**
//         * Override the setAxisSize method to use the arc's circumference as length. This
//         * allows tickPixelInterval to apply to pixel lengths along the perimeter
//         */
//        setAxisSize: function () {

//            axisProto.setAxisSize.call(this);

//            if (this.isRadial) {

//                // Set the center array
//                this.center = this.pane.center = Highcharts.CenteredSeriesMixin.getCenter.call(this.pane);

//                // The sector is used in Axis.translate to compute the translation of reversed axis points (#2570)
//                if (this.isCircular) {
//                    this.sector = this.endAngleRad - this.startAngleRad;
//                }

//                // Axis len is used to lay out the ticks
//                this.len = this.width = this.height = this.center[2] * pick(this.sector, 1) / 2;


//            }
//        },

//        /**
//         * Returns the x, y coordinate of a point given by a value and a pixel distance
//         * from center
//         */
//        getPosition: function (value, length) {
//            return this.postTranslate(
//                this.isCircular ? this.translate(value) : this.angleRad, // #2848
//                pick(this.isCircular ? length : this.translate(value), this.center[2] / 2) - this.offset
//            );
//        },

//        /**
//         * Translate from intermediate plotX (angle), plotY (axis.len - radius) to final chart coordinates.
//         */
//        postTranslate: function (angle, radius) {

//            var chart = this.chart,
//                center = this.center;

//            angle = this.startAngleRad + angle;

//            return {
//                x: chart.plotLeft + center[0] + Math.cos(angle) * radius,
//                y: chart.plotTop + center[1] + Math.sin(angle) * radius
//            };

//        },

//        /**
//         * Find the path for plot bands along the radial axis
//         */
//        getPlotBandPath: function (from, to, options) {
//            var center = this.center,
//                startAngleRad = this.startAngleRad,
//                fullRadius = center[2] / 2,
//                radii = [
//                    pick(options.outerRadius, '100%'),
//                    options.innerRadius,
//                    pick(options.thickness, 10)
//                ],
//                offset = Math.min(this.offset, 0),
//                percentRegex = /%$/,
//                start,
//                end,
//                open,
//                isCircular = this.isCircular, // X axis in a polar chart
//                ret;

//            // Polygonal plot bands
//            if (this.options.gridLineInterpolation === 'polygon') {
//                ret = this.getPlotLinePath(from).concat(this.getPlotLinePath(to, true));

//                // Circular grid bands
//            } else {

//                // Keep within bounds
//                from = Math.max(from, this.min);
//                to = Math.min(to, this.max);

//                // Plot bands on Y axis (radial axis) - inner and outer radius depend on to and from
//                if (!isCircular) {
//                    radii[0] = this.translate(from);
//                    radii[1] = this.translate(to);
//                }

//                // Convert percentages to pixel values
//                radii = map(radii, function (radius) {
//                    if (percentRegex.test(radius)) {
//                        radius = (pInt(radius, 10) * fullRadius) / 100;
//                    }
//                    return radius;
//                });

//                // Handle full circle
//                if (options.shape === 'circle' || !isCircular) {
//                    start = -Math.PI / 2;
//                    end = Math.PI * 1.5;
//                    open = true;
//                } else {
//                    start = startAngleRad + this.translate(from);
//                    end = startAngleRad + this.translate(to);
//                }

//                radii[0] -= offset; // #5283
//                radii[2] -= offset; // #5283

//                ret = this.chart.renderer.symbols.arc(
//                    this.left + center[0],
//                    this.top + center[1],
//                    radii[0],
//                    radii[0],
//                    {
//                        start: Math.min(start, end), // Math is for reversed yAxis (#3606)
//                        end: Math.max(start, end),
//                        innerR: pick(radii[1], radii[0] - radii[2]),
//                        open: open
//                    }
//                );
//            }

//            return ret;
//        },

//        /**
//         * Find the path for plot lines perpendicular to the radial axis.
//         */
//        getPlotLinePath: function (value, reverse) {
//            var axis = this,
//                center = axis.center,
//                chart = axis.chart,
//                end = axis.getPosition(value),
//                xAxis,
//                xy,
//                tickPositions,
//                ret;

//            // Spokes
//            if (axis.isCircular) {
//                ret = ['M', center[0] + chart.plotLeft, center[1] + chart.plotTop, 'L', end.x, end.y];

//                // Concentric circles
//            } else if (axis.options.gridLineInterpolation === 'circle') {
//                value = axis.translate(value);
//                if (value) { // a value of 0 is in the center
//                    ret = axis.getLinePath(0, value);
//                }
//                // Concentric polygons
//            } else {
//                // Find the X axis in the same pane
//                each(chart.xAxis, function (a) {
//                    if (a.pane === axis.pane) {
//                        xAxis = a;
//                    }
//                });
//                ret = [];
//                value = axis.translate(value);
//                tickPositions = xAxis.tickPositions;
//                if (xAxis.autoConnect) {
//                    tickPositions = tickPositions.concat([tickPositions[0]]);
//                }
//                // Reverse the positions for concatenation of polygonal plot bands
//                if (reverse) {
//                    tickPositions = [].concat(tickPositions).reverse();
//                }

//                each(tickPositions, function (pos, i) {
//                    xy = xAxis.getPosition(pos, value);
//                    ret.push(i ? 'L' : 'M', xy.x, xy.y);
//                });

//            }
//            return ret;
//        },

//        /**
//         * Find the position for the axis title, by default inside the gauge
//         */
//        getTitlePosition: function () {
//            var center = this.center,
//                chart = this.chart,
//                titleOptions = this.options.title;

//            return {
//                x: chart.plotLeft + center[0] + (titleOptions.x || 0),
//                y: chart.plotTop + center[1] - ({ high: 0.5, middle: 0.25, low: 0 }[titleOptions.align] *
//                    center[2]) + (titleOptions.y || 0)
//            };
//        }

//    };

//    /**
//     * Override axisProto.init to mix in special axis instance functions and function overrides
//     */
//    wrap(axisProto, 'init', function (proceed, chart, userOptions) {
//        var axis = this,
//            angular = chart.angular,
//            polar = chart.polar,
//            isX = userOptions.isX,
//            isHidden = angular && isX,
//            isCircular,
//            options,
//            chartOptions = chart.options,
//            paneIndex = userOptions.pane || 0,
//            pane,
//            paneOptions;

//        // Before prototype.init
//        if (angular) {
//            extend(this, isHidden ? hiddenAxisMixin : radialAxisMixin);
//            isCircular = !isX;
//            if (isCircular) {
//                this.defaultRadialOptions = this.defaultRadialGaugeOptions;
//            }

//        } else if (polar) {
//            //extend(this, userOptions.isX ? radialAxisMixin : radialAxisMixin);
//            extend(this, radialAxisMixin);
//            isCircular = isX;
//            this.defaultRadialOptions = isX ? this.defaultRadialXOptions : merge(this.defaultYAxisOptions, this.defaultRadialYOptions);

//        }

//        // Disable certain features on angular and polar axes
//        if (angular || polar) {
//            chart.inverted = false;
//            chartOptions.chart.zoomType = null;
//        }

//        // Run prototype.init
//        proceed.call(this, chart, userOptions);

//        if (!isHidden && (angular || polar)) {
//            options = this.options;

//            // Create the pane and set the pane options.
//            if (!chart.panes) {
//                chart.panes = [];
//            }
//            this.pane = pane = chart.panes[paneIndex] = chart.panes[paneIndex] || new Pane(
//                splat(chartOptions.pane)[paneIndex],
//                chart,
//                axis
//            );
//            paneOptions = pane.options;

//            // Start and end angle options are
//            // given in degrees relative to top, while internal computations are
//            // in radians relative to right (like SVG).
//            this.angleRad = (options.angle || 0) * Math.PI / 180; // Y axis in polar charts
//            this.startAngleRad = (paneOptions.startAngle - 90) * Math.PI / 180; // Gauges
//            this.endAngleRad = (pick(paneOptions.endAngle, paneOptions.startAngle + 360) - 90) * Math.PI / 180; // Gauges
//            this.offset = options.offset || 0;

//            this.isCircular = isCircular;

//        }

//    });

//    /**
//     * Wrap auto label align to avoid setting axis-wide rotation on radial axes (#4920)
//     * @param   {Function} proceed
//     * @returns {String} Alignment
//     */
//    wrap(axisProto, 'autoLabelAlign', function (proceed) {
//        if (!this.isRadial) {
//            return proceed.apply(this, [].slice.call(arguments, 1));
//        } // else return undefined
//    });

//    /**
//     * Add special cases within the Tick class' methods for radial axes.
//     */
//    wrap(tickProto, 'getPosition', function (proceed, horiz, pos, tickmarkOffset, old) {
//        var axis = this.axis;

//        return axis.getPosition ?
//            axis.getPosition(pos) :
//            proceed.call(this, horiz, pos, tickmarkOffset, old);
//    });

//    /**
//     * Wrap the getLabelPosition function to find the center position of the label
//     * based on the distance option
//     */
//    wrap(tickProto, 'getLabelPosition', function (proceed, x, y, label, horiz, labelOptions, tickmarkOffset, index, step) {
//        var axis = this.axis,
//            optionsY = labelOptions.y,
//            ret,
//            centerSlot = 20, // 20 degrees to each side at the top and bottom
//            align = labelOptions.align,
//            angle = ((axis.translate(this.pos) + axis.startAngleRad + Math.PI / 2) / Math.PI * 180) % 360;

//        if (axis.isRadial) { // Both X and Y axes in a polar chart
//            ret = axis.getPosition(this.pos, (axis.center[2] / 2) + pick(labelOptions.distance, -25));

//            // Automatically rotated
//            if (labelOptions.rotation === 'auto') {
//                label.attr({
//                    rotation: angle
//                });

//                // Vertically centered
//            } else if (optionsY === null) {
//                optionsY = axis.chart.renderer.fontMetrics(label.styles.fontSize).b - label.getBBox().height / 2;
//            }

//            // Automatic alignment
//            if (align === null) {
//                if (axis.isCircular) { // Y axis
//                    if (this.label.getBBox().width > axis.len * axis.tickInterval / (axis.max - axis.min)) { // #3506
//                        centerSlot = 0;
//                    }
//                    if (angle > centerSlot && angle < 180 - centerSlot) {
//                        align = 'left'; // right hemisphere
//                    } else if (angle > 180 + centerSlot && angle < 360 - centerSlot) {
//                        align = 'right'; // left hemisphere
//                    } else {
//                        align = 'center'; // top or bottom
//                    }
//                } else {
//                    align = 'center';
//                }
//                label.attr({
//                    align: align
//                });
//            }

//            ret.x += labelOptions.x;
//            ret.y += optionsY;

//        } else {
//            ret = proceed.call(this, x, y, label, horiz, labelOptions, tickmarkOffset, index, step);
//        }
//        return ret;
//    });

//    /**
//     * Wrap the getMarkPath function to return the path of the radial marker
//     */
//    wrap(tickProto, 'getMarkPath', function (proceed, x, y, tickLength, tickWidth, horiz, renderer) {
//        var axis = this.axis,
//            endPoint,
//            ret;

//        if (axis.isRadial) {
//            endPoint = axis.getPosition(this.pos, axis.center[2] / 2 + tickLength);
//            ret = [
//                'M',
//                x,
//                y,
//                'L',
//                endPoint.x,
//                endPoint.y
//            ];
//        } else {
//            ret = proceed.call(this, x, y, tickLength, tickWidth, horiz, renderer);
//        }
//        return ret;
//    });
//    /*
//     * The AreaRangeSeries class
//     *
//     */

//    /**
//     * Extend the default options with map options
//     */
//    defaultPlotOptions.arearange = merge(defaultPlotOptions.area, {
//        lineWidth: 1,
//        marker: null,
//        threshold: null,
//        tooltip: {
//            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
//        },
//        trackByArea: true,
//        dataLabels: {
//            align: null,
//            verticalAlign: null,
//            xLow: 0,
//            xHigh: 0,
//            yLow: 0,
//            yHigh: 0
//        },
//        states: {
//            hover: {
//                halo: false
//            }
//        }
//    });

//    /**
//     * Add the series type
//     */
//    seriesTypes.arearange = extendClass(seriesTypes.area, {
//        type: 'arearange',
//        pointArrayMap: ['low', 'high'],
//        dataLabelCollections: ['dataLabel', 'dataLabelUpper'],
//        toYData: function (point) {
//            return [point.low, point.high];
//        },
//        pointValKey: 'low',
//        deferTranslatePolar: true,

//        /**
//         * Translate a point's plotHigh from the internal angle and radius measures to
//         * true plotHigh coordinates. This is an addition of the toXY method found in
//         * Polar.js, because it runs too early for arearanges to be considered (#3419).
//         */
//        highToXY: function (point) {
//            // Find the polar plotX and plotY
//            var chart = this.chart,
//                xy = this.xAxis.postTranslate(point.rectPlotX, this.yAxis.len - point.plotHigh);
//            point.plotHighX = xy.x - chart.plotLeft;
//            point.plotHigh = xy.y - chart.plotTop;
//        },

//        /**
//         * Translate data points from raw values x and y to plotX and plotY
//         */
//        translate: function () {
//            var series = this,
//                yAxis = series.yAxis;

//            seriesTypes.area.prototype.translate.apply(series);

//            // Set plotLow and plotHigh
//            each(series.points, function (point) {

//                var low = point.low,
//                    high = point.high,
//                    plotY = point.plotY;

//                if (high === null || low === null) {
//                    point.isNull = true;
//                } else {
//                    point.plotLow = plotY;
//                    point.plotHigh = yAxis.translate(high, 0, 1, 0, 1);
//                }
//            });

//            // Postprocess plotHigh
//            if (this.chart.polar) {
//                each(this.points, function (point) {
//                    series.highToXY(point);
//                });
//            }
//        },

//        /**
//         * Extend the line series' getSegmentPath method by applying the segment
//         * path to both lower and higher values of the range
//         */
//        getGraphPath: function (points) {

//            var highPoints = [],
//                highAreaPoints = [],
//                i,
//                getGraphPath = seriesTypes.area.prototype.getGraphPath,
//                point,
//                pointShim,
//                linePath,
//                lowerPath,
//                options = this.options,
//                step = options.step,
//                higherPath,
//                higherAreaPath;

//            points = points || this.points;
//            i = points.length;

//            // Create the top line and the top part of the area fill. The area fill compensates for 
//            // null points by drawing down to the lower graph, moving across the null gap and 
//            // starting again at the lower graph.
//            i = points.length;
//            while (i--) {
//                point = points[i];

//                if (!point.isNull && !options.connectEnds && (!points[i + 1] || points[i + 1].isNull)) {
//                    highAreaPoints.push({
//                        plotX: point.plotX,
//                        plotY: point.plotY,
//                        doCurve: false // #5186, gaps in areasplinerange fill
//                    });
//                }

//                pointShim = {
//                    polarPlotY: point.polarPlotY,
//                    rectPlotX: point.rectPlotX,
//                    yBottom: point.yBottom,
//                    plotX: pick(point.plotHighX, point.plotX), // plotHighX is for polar charts
//                    plotY: point.plotHigh,
//                    isNull: point.isNull
//                };
//                highAreaPoints.push(pointShim);
//                highPoints.push(pointShim);
//                if (!point.isNull && !options.connectEnds && (!points[i - 1] || points[i - 1].isNull)) {
//                    highAreaPoints.push({
//                        plotX: point.plotX,
//                        plotY: point.plotY,
//                        doCurve: false // #5186, gaps in areasplinerange fill
//                    });
//                }
//            }

//            // Get the paths
//            lowerPath = getGraphPath.call(this, points);
//            if (step) {
//                if (step === true) {
//                    step = 'left';
//                }
//                options.step = { left: 'right', center: 'center', right: 'left' }[step]; // swap for reading in getGraphPath
//            }
//            higherPath = getGraphPath.call(this, highPoints);
//            higherAreaPath = getGraphPath.call(this, highAreaPoints);
//            options.step = step;

//            // Create a line on both top and bottom of the range
//            linePath = [].concat(lowerPath, higherPath);

//            // For the area path, we need to change the 'move' statement into 'lineTo' or 'curveTo'
//            if (!this.chart.polar && higherAreaPath[0] === 'M') {
//                higherAreaPath[0] = 'L'; // this probably doesn't work for spline        
//            }

//            this.graphPath = linePath;
//            this.areaPath = this.areaPath.concat(lowerPath, higherAreaPath);

//            // Prepare for sideways animation
//            linePath.isArea = true;
//            linePath.xMap = lowerPath.xMap;
//            this.areaPath.xMap = lowerPath.xMap;

//            return linePath;
//        },

//        /**
//         * Extend the basic drawDataLabels method by running it for both lower and higher
//         * values.
//         */
//        drawDataLabels: function () {

//            var data = this.data,
//                length = data.length,
//                i,
//                originalDataLabels = [],
//                seriesProto = Series.prototype,
//                dataLabelOptions = this.options.dataLabels,
//                align = dataLabelOptions.align,
//                verticalAlign = dataLabelOptions.verticalAlign,
//                inside = dataLabelOptions.inside,
//                point,
//                up,
//                inverted = this.chart.inverted;

//            if (dataLabelOptions.enabled || this._hasPointLabels) {

//                // Step 1: set preliminary values for plotY and dataLabel and draw the upper labels
//                i = length;
//                while (i--) {
//                    point = data[i];
//                    if (point) {
//                        up = inside ? point.plotHigh < point.plotLow : point.plotHigh > point.plotLow;

//                        // Set preliminary values
//                        point.y = point.high;
//                        point._plotY = point.plotY;
//                        point.plotY = point.plotHigh;

//                        // Store original data labels and set preliminary label objects to be picked up
//                        // in the uber method
//                        originalDataLabels[i] = point.dataLabel;
//                        point.dataLabel = point.dataLabelUpper;

//                        // Set the default offset
//                        point.below = up;
//                        if (inverted) {
//                            if (!align) {
//                                dataLabelOptions.align = up ? 'right' : 'left';
//                            }
//                        } else {
//                            if (!verticalAlign) {
//                                dataLabelOptions.verticalAlign = up ? 'top' : 'bottom';
//                            }
//                        }

//                        dataLabelOptions.x = dataLabelOptions.xHigh;
//                        dataLabelOptions.y = dataLabelOptions.yHigh;
//                    }
//                }

//                if (seriesProto.drawDataLabels) {
//                    seriesProto.drawDataLabels.apply(this, arguments); // #1209
//                }

//                // Step 2: reorganize and handle data labels for the lower values
//                i = length;
//                while (i--) {
//                    point = data[i];
//                    if (point) {
//                        up = inside ? point.plotHigh < point.plotLow : point.plotHigh > point.plotLow;

//                        // Move the generated labels from step 1, and reassign the original data labels
//                        point.dataLabelUpper = point.dataLabel;
//                        point.dataLabel = originalDataLabels[i];

//                        // Reset values
//                        point.y = point.low;
//                        point.plotY = point._plotY;

//                        // Set the default offset
//                        point.below = !up;
//                        if (inverted) {
//                            if (!align) {
//                                dataLabelOptions.align = up ? 'left' : 'right';
//                            }
//                        } else {
//                            if (!verticalAlign) {
//                                dataLabelOptions.verticalAlign = up ? 'bottom' : 'top';
//                            }

//                        }

//                        dataLabelOptions.x = dataLabelOptions.xLow;
//                        dataLabelOptions.y = dataLabelOptions.yLow;
//                    }
//                }
//                if (seriesProto.drawDataLabels) {
//                    seriesProto.drawDataLabels.apply(this, arguments);
//                }
//            }

//            dataLabelOptions.align = align;
//            dataLabelOptions.verticalAlign = verticalAlign;
//        },

//        alignDataLabel: function () {
//            seriesTypes.column.prototype.alignDataLabel.apply(this, arguments);
//        },

//        setStackedPoints: noop,

//        getSymbol: noop,

//        drawPoints: noop
//    });
//    /**
//     * The AreaSplineRangeSeries class
//     */

//    defaultPlotOptions.areasplinerange = merge(defaultPlotOptions.arearange);

//    /**
//     * AreaSplineRangeSeries object
//     */
//    seriesTypes.areasplinerange = extendClass(seriesTypes.arearange, {
//        type: 'areasplinerange',
//        getPointSpline: seriesTypes.spline.prototype.getPointSpline
//    });

//    (function () {

//        var colProto = seriesTypes.column.prototype;

//        /**
//         * The ColumnRangeSeries class
//         */
//        defaultPlotOptions.columnrange = merge(defaultPlotOptions.column, defaultPlotOptions.arearange, {
//            lineWidth: 1,
//            pointRange: null
//        });

//        /**
//         * ColumnRangeSeries object
//         */
//        seriesTypes.columnrange = extendClass(seriesTypes.arearange, {
//            type: 'columnrange',
//            /**
//             * Translate data points from raw values x and y to plotX and plotY
//             */
//            translate: function () {
//                var series = this,
//                    yAxis = series.yAxis,
//                    xAxis = series.xAxis,
//                    startAngleRad = xAxis.startAngleRad,
//                    start,
//                    chart = series.chart,
//                    isRadial = series.xAxis.isRadial,
//                    plotHigh;

//                colProto.translate.apply(series);

//                // Set plotLow and plotHigh
//                each(series.points, function (point) {
//                    var shapeArgs = point.shapeArgs,
//                        minPointLength = series.options.minPointLength,
//                        heightDifference,
//                        height,
//                        y;

//                    point.plotHigh = plotHigh = yAxis.translate(point.high, 0, 1, 0, 1);
//                    point.plotLow = point.plotY;

//                    // adjust shape
//                    y = plotHigh;
//                    height = pick(point.rectPlotY, point.plotY) - plotHigh;

//                    // Adjust for minPointLength
//                    if (Math.abs(height) < minPointLength) {
//                        heightDifference = (minPointLength - height);
//                        height += heightDifference;
//                        y -= heightDifference / 2;

//                        // Adjust for negative ranges or reversed Y axis (#1457)
//                    } else if (height < 0) {
//                        height *= -1;
//                        y -= height;
//                    }

//                    if (isRadial) {

//                        start = point.barX + startAngleRad;
//                        point.shapeType = 'path';
//                        point.shapeArgs = {
//                            d: series.polarArc(y + height, y, start, start + point.pointWidth)
//                        };
//                    } else {
//                        shapeArgs.height = height;
//                        shapeArgs.y = y;

//                        point.tooltipPos = chart.inverted ?
//                            [
//                                yAxis.len + yAxis.pos - chart.plotLeft - y - height / 2,
//                                xAxis.len + xAxis.pos - chart.plotTop - shapeArgs.x - shapeArgs.width / 2,
//                                height
//                            ] : [
//                                xAxis.left - chart.plotLeft + shapeArgs.x + shapeArgs.width / 2,
//                                yAxis.pos - chart.plotTop + y + height / 2,
//                                height
//                            ]; // don't inherit from column tooltip position - #3372
//                    }
//                });
//            },
//            directTouch: true,
//            trackerGroups: ['group', 'dataLabelsGroup'],
//            drawGraph: noop,
//            crispCol: colProto.crispCol,
//            pointAttrToOptions: colProto.pointAttrToOptions,
//            drawPoints: colProto.drawPoints,
//            drawTracker: colProto.drawTracker,
//            getColumnMetrics: colProto.getColumnMetrics,
//            animate: function () {
//                return colProto.animate.apply(this, arguments);
//            },
//            polarArc: function () {
//                return colProto.polarArc.apply(this, arguments);
//            }
//        });
//    }());

//    /*
//     * The GaugeSeries class
//     */



//    /**
//     * Extend the default options
//     */
//    defaultPlotOptions.gauge = merge(defaultPlotOptions.line, {
//        dataLabels: {
//            enabled: true,
//            defer: false,
//            y: 15,
//            borderWidth: 1,
//            borderColor: 'silver',
//            borderRadius: 3,
//            crop: false,
//            verticalAlign: 'top',
//            zIndex: 2
//        },
//        dial: {
//            // radius: '80%',
//            // backgroundColor: 'black',
//            // borderColor: 'silver',
//            // borderWidth: 0,
//            // baseWidth: 3,
//            // topWidth: 1,
//            // baseLength: '70%' // of radius
//            // rearLength: '10%'
//        },
//        pivot: {
//            //radius: 5,
//            //borderWidth: 0
//            //borderColor: 'silver',
//            //backgroundColor: 'black'
//        },
//        tooltip: {
//            headerFormat: ''
//        },
//        showInLegend: false
//    });

//    /**
//     * Extend the point object
//     */
//    var GaugePoint = extendClass(Point, {
//        /**
//         * Don't do any hover colors or anything
//         */
//        setState: function (state) {
//            this.state = state;
//        }
//    });


//    /**
//     * Add the series type
//     */
//    var GaugeSeries = {
//        type: 'gauge',
//        pointClass: GaugePoint,

//        // chart.angular will be set to true when a gauge series is present, and this will
//        // be used on the axes
//        angular: true,
//        directTouch: true, // #5063
//        drawGraph: noop,
//        fixedBox: true,
//        forceDL: true,
//        noSharedTooltip: true,
//        trackerGroups: ['group', 'dataLabelsGroup'],

//        /**
//         * Calculate paths etc
//         */
//        translate: function () {

//            var series = this,
//                yAxis = series.yAxis,
//                options = series.options,
//                center = yAxis.center;

//            series.generatePoints();

//            each(series.points, function (point) {

//                var dialOptions = merge(options.dial, point.dial),
//                    radius = (pInt(pick(dialOptions.radius, 80)) * center[2]) / 200,
//                    baseLength = (pInt(pick(dialOptions.baseLength, 70)) * radius) / 100,
//                    rearLength = (pInt(pick(dialOptions.rearLength, 10)) * radius) / 100,
//                    baseWidth = dialOptions.baseWidth || 3,
//                    topWidth = dialOptions.topWidth || 1,
//                    overshoot = options.overshoot,
//                    rotation = yAxis.startAngleRad + yAxis.translate(point.y, null, null, null, true);

//                // Handle the wrap and overshoot options
//                if (isNumber(overshoot)) {
//                    overshoot = overshoot / 180 * Math.PI;
//                    rotation = Math.max(yAxis.startAngleRad - overshoot, Math.min(yAxis.endAngleRad + overshoot, rotation));

//                } else if (options.wrap === false) {
//                    rotation = Math.max(yAxis.startAngleRad, Math.min(yAxis.endAngleRad, rotation));
//                }

//                rotation = rotation * 180 / Math.PI;

//                point.shapeType = 'path';
//                point.shapeArgs = {
//                    d: dialOptions.path || [
//                        'M',
//                        -rearLength, -baseWidth / 2,
//                        'L',
//                        baseLength, -baseWidth / 2,
//                        radius, -topWidth / 2,
//                        radius, topWidth / 2,
//                        baseLength, baseWidth / 2,
//                        -rearLength, baseWidth / 2,
//                        'z'
//                    ],
//                    translateX: center[0],
//                    translateY: center[1],
//                    rotation: rotation
//                };

//                // Positions for data label
//                point.plotX = center[0];
//                point.plotY = center[1];
//            });
//        },

//        /**
//         * Draw the points where each point is one needle
//         */
//        drawPoints: function () {

//            var series = this,
//                center = series.yAxis.center,
//                pivot = series.pivot,
//                options = series.options,
//                pivotOptions = options.pivot,
//                renderer = series.chart.renderer;

//            each(series.points, function (point) {

//                var graphic = point.graphic,
//                    shapeArgs = point.shapeArgs,
//                    d = shapeArgs.d,
//                    dialOptions = merge(options.dial, point.dial); // #1233

//                if (graphic) {
//                    graphic.animate(shapeArgs);
//                    shapeArgs.d = d; // animate alters it
//                } else {
//                    point.graphic = renderer[point.shapeType](shapeArgs)
//                        .attr({
//                            stroke: dialOptions.borderColor || 'none',
//                            'stroke-width': dialOptions.borderWidth || 0,
//                            fill: dialOptions.backgroundColor || 'black',
//                            rotation: shapeArgs.rotation, // required by VML when animation is false
//                            zIndex: 1
//                        })
//                        .add(series.group);
//                }
//            });

//            // Add or move the pivot
//            if (pivot) {
//                pivot.animate({ // #1235
//                    translateX: center[0],
//                    translateY: center[1]
//                });
//            } else {
//                series.pivot = renderer.circle(0, 0, pick(pivotOptions.radius, 5))
//                    .attr({
//                        'stroke-width': pivotOptions.borderWidth || 0,
//                        stroke: pivotOptions.borderColor || 'silver',
//                        fill: pivotOptions.backgroundColor || 'black',
//                        zIndex: 2
//                    })
//                    .translate(center[0], center[1])
//                    .add(series.group);
//            }
//        },

//        /**
//         * Animate the arrow up from startAngle
//         */
//        animate: function (init) {
//            var series = this;

//            if (!init) {
//                each(series.points, function (point) {
//                    var graphic = point.graphic;

//                    if (graphic) {
//                        // start value
//                        graphic.attr({
//                            rotation: series.yAxis.startAngleRad * 180 / Math.PI
//                        });

//                        // animate
//                        graphic.animate({
//                            rotation: point.shapeArgs.rotation
//                        }, series.options.animation);
//                    }
//                });

//                // delete this function to allow it only once
//                series.animate = null;
//            }
//        },

//        render: function () {
//            this.group = this.plotGroup(
//                'group',
//                'series',
//                this.visible ? 'visible' : 'hidden',
//                this.options.zIndex,
//                this.chart.seriesGroup
//            );
//            Series.prototype.render.call(this);
//            this.group.clip(this.chart.clipRect);
//        },

//        /**
//         * Extend the basic setData method by running processData and generatePoints immediately,
//         * in order to access the points from the legend.
//         */
//        setData: function (data, redraw) {
//            Series.prototype.setData.call(this, data, false);
//            this.processData();
//            this.generatePoints();
//            if (pick(redraw, true)) {
//                this.chart.redraw();
//            }
//        },

//        /**
//         * If the tracking module is loaded, add the point tracker
//         */
//        drawTracker: TrackerMixin && TrackerMixin.drawTrackerPoint
//    };
//    seriesTypes.gauge = extendClass(seriesTypes.line, GaugeSeries);

//    /* ****************************************************************************
//     * Start Box plot series code                                                  *
//     *****************************************************************************/

//    // Set default options
//    defaultPlotOptions.boxplot = merge(defaultPlotOptions.column, {
//        fillColor: '#FFFFFF',
//        lineWidth: 1,
//        //medianColor: null,
//        medianWidth: 2,
//        states: {
//            hover: {
//                brightness: -0.3
//            }
//        },
//        //stemColor: null,
//        //stemDashStyle: 'solid'
//        //stemWidth: null,
//        threshold: null,
//        tooltip: {
//            pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {series.name}</b><br/>' +
//                'Maximum: {point.high}<br/>' +
//                'Upper quartile: {point.q3}<br/>' +
//                'Median: {point.median}<br/>' +
//                'Lower quartile: {point.q1}<br/>' +
//                'Minimum: {point.low}<br/>'

//        },
//        //whiskerColor: null,
//        whiskerLength: '50%',
//        whiskerWidth: 2
//    });

//    // Create the series object
//    seriesTypes.boxplot = extendClass(seriesTypes.column, {
//        type: 'boxplot',
//        pointArrayMap: ['low', 'q1', 'median', 'q3', 'high'], // array point configs are mapped to this
//        toYData: function (point) { // return a plain array for speedy calculation
//            return [point.low, point.q1, point.median, point.q3, point.high];
//        },
//        pointValKey: 'high', // defines the top of the tracker

//        /**
//         * One-to-one mapping from options to SVG attributes
//         */
//        pointAttrToOptions: { // mapping between SVG attributes and the corresponding options
//            fill: 'fillColor',
//            stroke: 'color',
//            'stroke-width': 'lineWidth'
//        },

//        /**
//         * Disable data labels for box plot
//         */
//        drawDataLabels: noop,

//        /**
//         * Translate data points from raw values x and y to plotX and plotY
//         */
//        translate: function () {
//            var series = this,
//                yAxis = series.yAxis,
//                pointArrayMap = series.pointArrayMap;

//            seriesTypes.column.prototype.translate.apply(series);

//            // do the translation on each point dimension
//            each(series.points, function (point) {
//                each(pointArrayMap, function (key) {
//                    if (point[key] !== null) {
//                        point[key + 'Plot'] = yAxis.translate(point[key], 0, 1, 0, 1);
//                    }
//                });
//            });
//        },

//        /**
//         * Draw the data points
//         */
//        drawPoints: function () {
//            var series = this,  //state = series.state,
//                points = series.points,
//                options = series.options,
//                chart = series.chart,
//                renderer = chart.renderer,
//                pointAttr,
//                q1Plot,
//                q3Plot,
//                highPlot,
//                lowPlot,
//                medianPlot,
//                crispCorr,
//                crispX,
//                graphic,
//                stemPath,
//                stemAttr,
//                boxPath,
//                whiskersPath,
//                whiskersAttr,
//                medianPath,
//                medianAttr,
//                width,
//                left,
//                right,
//                halfWidth,
//                shapeArgs,
//                color,
//                doQuartiles = series.doQuartiles !== false, // error bar inherits this series type but doesn't do quartiles
//                pointWiskerLength,
//                whiskerLength = series.options.whiskerLength;


//            each(points, function (point) {

//                graphic = point.graphic;
//                shapeArgs = point.shapeArgs; // the box
//                stemAttr = {};
//                whiskersAttr = {};
//                medianAttr = {};
//                color = point.color || series.color;

//                if (point.plotY !== UNDEFINED) {

//                    pointAttr = point.pointAttr[point.selected ? 'selected' : ''];

//                    // crisp vector coordinates
//                    width = shapeArgs.width;
//                    left = mathFloor(shapeArgs.x);
//                    right = left + width;
//                    halfWidth = mathRound(width / 2);
//                    //crispX = mathRound(left + halfWidth) + crispCorr;
//                    q1Plot = mathFloor(doQuartiles ? point.q1Plot : point.lowPlot);// + crispCorr;
//                    q3Plot = mathFloor(doQuartiles ? point.q3Plot : point.lowPlot);// + crispCorr;
//                    highPlot = mathFloor(point.highPlot);// + crispCorr;
//                    lowPlot = mathFloor(point.lowPlot);// + crispCorr;

//                    // Stem attributes
//                    stemAttr.stroke = point.stemColor || options.stemColor || color;
//                    stemAttr['stroke-width'] = pick(point.stemWidth, options.stemWidth, options.lineWidth);
//                    stemAttr.dashstyle = point.stemDashStyle || options.stemDashStyle;

//                    // Whiskers attributes
//                    whiskersAttr.stroke = point.whiskerColor || options.whiskerColor || color;
//                    whiskersAttr['stroke-width'] = pick(point.whiskerWidth, options.whiskerWidth, options.lineWidth);

//                    // Median attributes
//                    medianAttr.stroke = point.medianColor || options.medianColor || color;
//                    medianAttr['stroke-width'] = pick(point.medianWidth, options.medianWidth, options.lineWidth);

//                    // The stem
//                    crispCorr = (stemAttr['stroke-width'] % 2) / 2;
//                    crispX = left + halfWidth + crispCorr;
//                    stemPath = [
//                        // stem up
//                        'M',
//                        crispX, q3Plot,
//                        'L',
//                        crispX, highPlot,

//                        // stem down
//                        'M',
//                        crispX, q1Plot,
//                        'L',
//                        crispX, lowPlot
//                    ];

//                    // The box
//                    if (doQuartiles) {
//                        crispCorr = (pointAttr['stroke-width'] % 2) / 2;
//                        crispX = mathFloor(crispX) + crispCorr;
//                        q1Plot = mathFloor(q1Plot) + crispCorr;
//                        q3Plot = mathFloor(q3Plot) + crispCorr;
//                        left += crispCorr;
//                        right += crispCorr;
//                        boxPath = [
//                            'M',
//                            left, q3Plot,
//                            'L',
//                            left, q1Plot,
//                            'L',
//                            right, q1Plot,
//                            'L',
//                            right, q3Plot,
//                            'L',
//                            left, q3Plot,
//                            'z'
//                        ];
//                    }

//                    // The whiskers
//                    if (whiskerLength) {
//                        crispCorr = (whiskersAttr['stroke-width'] % 2) / 2;
//                        highPlot = highPlot + crispCorr;
//                        lowPlot = lowPlot + crispCorr;
//                        pointWiskerLength = (/%$/).test(whiskerLength) ? halfWidth * parseFloat(whiskerLength) / 100 : whiskerLength / 2;
//                        whiskersPath = [
//                            // High whisker
//                            'M',
//                            crispX - pointWiskerLength,
//                            highPlot,
//                            'L',
//                            crispX + pointWiskerLength,
//                            highPlot,

//                            // Low whisker
//                            'M',
//                            crispX - pointWiskerLength,
//                            lowPlot,
//                            'L',
//                            crispX + pointWiskerLength,
//                            lowPlot
//                        ];
//                    }

//                    // The median
//                    crispCorr = (medianAttr['stroke-width'] % 2) / 2;
//                    medianPlot = mathRound(point.medianPlot) + crispCorr;
//                    medianPath = [
//                        'M',
//                        left,
//                        medianPlot,
//                        'L',
//                        right,
//                        medianPlot
//                    ];

//                    // Create or update the graphics
//                    if (graphic) { // update

//                        point.stem.animate({ d: stemPath });
//                        if (whiskerLength) {
//                            point.whiskers.animate({ d: whiskersPath });
//                        }
//                        if (doQuartiles) {
//                            point.box.animate({ d: boxPath });
//                        }
//                        point.medianShape.animate({ d: medianPath });

//                    } else { // create new
//                        point.graphic = graphic = renderer.g()
//                            .add(series.group);

//                        point.stem = renderer.path(stemPath)
//                            .attr(stemAttr)
//                            .add(graphic);

//                        if (whiskerLength) {
//                            point.whiskers = renderer.path(whiskersPath)
//                                .attr(whiskersAttr)
//                                .add(graphic);
//                        }
//                        if (doQuartiles) {
//                            point.box = renderer.path(boxPath)
//                                .attr(pointAttr)
//                                .add(graphic);
//                        }
//                        point.medianShape = renderer.path(medianPath)
//                            .attr(medianAttr)
//                            .add(graphic);
//                    }
//                }
//            });

//        },
//        setStackedPoints: noop // #3890


//    });

//    /* ****************************************************************************
//     * End Box plot series code                                                *
//     *****************************************************************************/
//    /* ****************************************************************************
//     * Start error bar series code                                                *
//     *****************************************************************************/

//    // 1 - set default options
//    defaultPlotOptions.errorbar = merge(defaultPlotOptions.boxplot, {
//        color: '#000000',
//        grouping: false,
//        linkedTo: ':previous',
//        tooltip: {
//            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
//        },
//        whiskerWidth: null
//    });

//    // 2 - Create the series object
//    seriesTypes.errorbar = extendClass(seriesTypes.boxplot, {
//        type: 'errorbar',
//        pointArrayMap: ['low', 'high'], // array point configs are mapped to this
//        toYData: function (point) { // return a plain array for speedy calculation
//            return [point.low, point.high];
//        },
//        pointValKey: 'high', // defines the top of the tracker
//        doQuartiles: false,
//        drawDataLabels: seriesTypes.arearange ? function () {
//            var valKey = this.pointValKey;
//            seriesTypes.arearange.prototype.drawDataLabels.call(this);
//            // Arearange drawDataLabels does not reset point.y to high, but to low after drawing. #4133 
//            each(this.data, function (point) {
//                point.y = point[valKey];
//            });
//        } : noop,

//        /**
//         * Get the width and X offset, either on top of the linked series column
//         * or standalone
//         */
//        getColumnMetrics: function () {
//            return (this.linkedParent && this.linkedParent.columnMetrics) ||
//                seriesTypes.column.prototype.getColumnMetrics.call(this);
//        }
//    });

//    /* ****************************************************************************
//     * End error bar series code                                                  *
//     *****************************************************************************/
//    /* ****************************************************************************
//     * Start Waterfall series code                                                *
//     *****************************************************************************/

//    // 1 - set default options
//    defaultPlotOptions.waterfall = merge(defaultPlotOptions.column, {
//        lineWidth: 1,
//        lineColor: '#333',
//        dashStyle: 'dot',
//        borderColor: '#333',
//        dataLabels: {
//            inside: true
//        },
//        states: {
//            hover: {
//                lineWidthPlus: 0 // #3126
//            }
//        }
//    });


//    // 2 - Create the series object
//    seriesTypes.waterfall = extendClass(seriesTypes.column, {
//        type: 'waterfall',

//        upColorProp: 'fill',

//        pointValKey: 'y',

//        /**
//         * Pass the null test in ColumnSeries.translate.
//         */
//        pointClass: extendClass(Point, {
//            isValid: function () {
//                return isNumber(this.y, true) || this.isSum || this.isIntermediateSum;
//            }
//        }),

//        /**
//         * Translate data points from raw values
//         */
//        translate: function () {
//            var series = this,
//                options = series.options,
//                yAxis = series.yAxis,
//                len,
//                i,
//                points,
//                point,
//                shapeArgs,
//                stack,
//                y,
//                yValue,
//                previousY,
//                previousIntermediate,
//                range,
//                minPointLength = pick(options.minPointLength, 5),
//                threshold = options.threshold,
//                stacking = options.stacking,
//                tooltipY;

//            // run column series translate
//            seriesTypes.column.prototype.translate.apply(this);
//            series.minPointLengthOffset = 0;

//            previousY = previousIntermediate = threshold;
//            points = series.points;

//            for (i = 0, len = points.length; i < len; i++) {
//                // cache current point object
//                point = points[i];
//                yValue = this.processedYData[i];
//                shapeArgs = point.shapeArgs;

//                // get current stack
//                stack = stacking && yAxis.stacks[(series.negStacks && yValue < threshold ? '-' : '') + series.stackKey];
//                range = stack ?
//                    stack[point.x].points[series.index + ',' + i] :
//                    [0, yValue];

//                // override point value for sums
//                // #3710 Update point does not propagate to sum
//                if (point.isSum) {
//                    point.y = correctFloat(yValue);
//                } else if (point.isIntermediateSum) {
//                    point.y = correctFloat(yValue - previousIntermediate); // #3840
//                }
//                // up points
//                y = mathMax(previousY, previousY + point.y) + range[0];
//                shapeArgs.y = yAxis.toPixels(y, true);


//                // sum points
//                if (point.isSum) {
//                    shapeArgs.y = yAxis.toPixels(range[1], true);
//                    shapeArgs.height = Math.min(yAxis.toPixels(range[0], true), yAxis.len) - shapeArgs.y + series.minPointLengthOffset; // #4256

//                } else if (point.isIntermediateSum) {
//                    shapeArgs.y = yAxis.toPixels(range[1], true);
//                    shapeArgs.height = Math.min(yAxis.toPixels(previousIntermediate, true), yAxis.len) - shapeArgs.y + series.minPointLengthOffset;
//                    previousIntermediate = range[1];

//                    // If it's not the sum point, update previous stack end position and get
//                    // shape height (#3886)
//                } else {
//                    shapeArgs.height = yValue > 0 ?
//                        yAxis.toPixels(previousY, true) - shapeArgs.y :
//                        yAxis.toPixels(previousY, true) - yAxis.toPixels(previousY - yValue, true);
//                    previousY += yValue;
//                }
//                // #3952 Negative sum or intermediate sum not rendered correctly
//                if (shapeArgs.height < 0) {
//                    shapeArgs.y += shapeArgs.height;
//                    shapeArgs.height *= -1;
//                }

//                point.plotY = shapeArgs.y = mathRound(shapeArgs.y) - (series.borderWidth % 2) / 2;
//                shapeArgs.height = mathMax(mathRound(shapeArgs.height), 0.001); // #3151
//                point.yBottom = shapeArgs.y + shapeArgs.height;

//                if (shapeArgs.height <= minPointLength) {
//                    shapeArgs.height = minPointLength;
//                    series.minPointLengthOffset += minPointLength;
//                }

//                shapeArgs.y -= series.minPointLengthOffset;

//                // Correct tooltip placement (#3014)
//                tooltipY = point.plotY + (point.negative ? shapeArgs.height : 0) - series.minPointLengthOffset;
//                if (series.chart.inverted) {
//                    point.tooltipPos[0] = yAxis.len - tooltipY;
//                } else {
//                    point.tooltipPos[1] = tooltipY;
//                }

//            }
//        },

//        /**
//         * Call default processData then override yData to reflect waterfall's extremes on yAxis
//         */
//        processData: function (force) {
//            var series = this,
//                options = series.options,
//                yData = series.yData,
//                points = series.options.data, // #3710 Update point does not propagate to sum
//                point,
//                dataLength = yData.length,
//                threshold = options.threshold || 0,
//                subSum,
//                sum,
//                dataMin,
//                dataMax,
//                y,
//                i;

//            sum = subSum = dataMin = dataMax = threshold;

//            for (i = 0; i < dataLength; i++) {
//                y = yData[i];
//                point = points && points[i] ? points[i] : {};

//                if (y === 'sum' || point.isSum) {
//                    yData[i] = correctFloat(sum);
//                } else if (y === 'intermediateSum' || point.isIntermediateSum) {
//                    yData[i] = correctFloat(subSum);
//                } else {
//                    sum += y;
//                    subSum += y;
//                }
//                dataMin = Math.min(sum, dataMin);
//                dataMax = Math.max(sum, dataMax);
//            }

//            Series.prototype.processData.call(this, force);

//            // Record extremes
//            series.dataMin = dataMin;
//            series.dataMax = dataMax;
//        },

//        /**
//         * Return y value or string if point is sum
//         */
//        toYData: function (pt) {
//            if (pt.isSum) {
//                return (pt.x === 0 ? null : 'sum'); //#3245 Error when first element is Sum or Intermediate Sum
//            }
//            if (pt.isIntermediateSum) {
//                return (pt.x === 0 ? null : 'intermediateSum'); //#3245
//            }
//            return pt.y;
//        },

//        /**
//         * Postprocess mapping between options and SVG attributes
//         */
//        getAttribs: function () {
//            seriesTypes.column.prototype.getAttribs.apply(this, arguments);

//            var series = this,
//                options = series.options,
//                stateOptions = options.states,
//                upColor = options.upColor || series.color,
//                hoverColor = Highcharts.Color(upColor).brighten(options.states.hover.brightness).get(),
//                seriesDownPointAttr = merge(series.pointAttr),
//                upColorProp = series.upColorProp;

//            seriesDownPointAttr[''][upColorProp] = upColor;
//            seriesDownPointAttr.hover[upColorProp] = stateOptions.hover.upColor || hoverColor;
//            seriesDownPointAttr.select[upColorProp] = stateOptions.select.upColor || upColor;

//            each(series.points, function (point) {
//                if (!point.options.color) {
//                    // Up color
//                    if (point.y > 0) {
//                        point.pointAttr = seriesDownPointAttr;
//                        point.color = upColor;

//                        // Down color (#3710, update to negative)
//                    } else {
//                        point.pointAttr = series.pointAttr;
//                    }
//                }
//            });
//        },

//        /**
//         * Draw columns' connector lines
//         */
//        getGraphPath: function () {

//            var data = this.data,
//                length = data.length,
//                lineWidth = this.options.lineWidth + this.borderWidth,
//                normalizer = mathRound(lineWidth) % 2 / 2,
//                path = [],
//                M = 'M',
//                L = 'L',
//                prevArgs,
//                pointArgs,
//                i,
//                d;

//            for (i = 1; i < length; i++) {
//                pointArgs = data[i].shapeArgs;
//                prevArgs = data[i - 1].shapeArgs;

//                d = [
//                    M,
//                    prevArgs.x + prevArgs.width, prevArgs.y + normalizer,
//                    L,
//                    pointArgs.x, prevArgs.y + normalizer
//                ];

//                if (data[i - 1].y < 0) {
//                    d[2] += prevArgs.height;
//                    d[5] += prevArgs.height;
//                }

//                path = path.concat(d);
//            }

//            return path;
//        },

//        /**
//         * Extremes are recorded in processData
//         */
//        getExtremes: noop,

//        drawGraph: Series.prototype.drawGraph
//    });

//    /* ****************************************************************************
//     * End Waterfall series code                                                  *
//     *****************************************************************************/
//    /**
//     * Set the default options for polygon
//     */
//    defaultPlotOptions.polygon = merge(defaultPlotOptions.scatter, {
//        marker: {
//            enabled: false,
//            states: {
//                hover: {
//                    enabled: false
//                }
//            }
//        },
//        stickyTracking: false,
//        tooltip: {
//            followPointer: true,
//            pointFormat: ''
//        },
//        trackByArea: true
//    });

//    /**
//     * The polygon series class
//     */
//    seriesTypes.polygon = extendClass(seriesTypes.scatter, {
//        type: 'polygon',
//        getGraphPath: function () {

//            var graphPath = Series.prototype.getGraphPath.call(this),
//                i = graphPath.length + 1;

//            // Close all segments
//            while (i--) {
//                if ((i === graphPath.length || graphPath[i] === 'M') && i > 0) {
//                    graphPath.splice(i, 0, 'z');
//                }
//            }
//            this.areaPath = graphPath;
//            return graphPath;
//        },
//        drawGraph: function () {
//            this.options.fillColor = this.color; // Hack into the fill logic in area.drawGraph
//            seriesTypes.area.prototype.drawGraph.call(this);
//        },
//        drawLegendSymbol: Highcharts.LegendSymbolMixin.drawRectangle,
//        drawTracker: Series.prototype.drawTracker,
//        setStackedPoints: noop // No stacking points on polygons (#5310)
//    });
//    /* ****************************************************************************
//     * Start Bubble series code                                                      *
//     *****************************************************************************/

//    // 1 - set default options
//    defaultPlotOptions.bubble = merge(defaultPlotOptions.scatter, {
//        dataLabels: {
//            formatter: function () { // #2945
//                return this.point.z;
//            },
//            inside: true,
//            verticalAlign: 'middle'
//        },
//        // displayNegative: true,
//        marker: {
//            // fillOpacity: 0.5,
//            lineColor: null, // inherit from series.color
//            lineWidth: 1
//        },
//        minSize: 8,
//        maxSize: '20%',
//        // negativeColor: null,
//        // sizeBy: 'area'
//        softThreshold: false,
//        states: {
//            hover: {
//                halo: {
//                    size: 5
//                }
//            }
//        },
//        tooltip: {
//            pointFormat: '({point.x}, {point.y}), Size: {point.z}'
//        },
//        turboThreshold: 0,
//        zThreshold: 0,
//        zoneAxis: 'z'
//    });

//    var BubblePoint = extendClass(Point, {
//        haloPath: function () {
//            return Point.prototype.haloPath.call(this, this.shapeArgs.r + this.series.options.states.hover.halo.size);
//        },
//        ttBelow: false
//    });

//    // 2 - Create the series object
//    seriesTypes.bubble = extendClass(seriesTypes.scatter, {
//        type: 'bubble',
//        pointClass: BubblePoint,
//        pointArrayMap: ['y', 'z'],
//        parallelArrays: ['x', 'y', 'z'],
//        trackerGroups: ['group', 'dataLabelsGroup'],
//        bubblePadding: true,
//        zoneAxis: 'z',

//        /**
//         * Mapping between SVG attributes and the corresponding options
//         */
//        pointAttrToOptions: {
//            stroke: 'lineColor',
//            'stroke-width': 'lineWidth',
//            fill: 'fillColor'
//        },

//        /**
//         * Apply the fillOpacity to all fill positions
//         */
//        applyOpacity: function (fill) {
//            var markerOptions = this.options.marker,
//                fillOpacity = pick(markerOptions.fillOpacity, 0.5);

//            // When called from Legend.colorizeItem, the fill isn't predefined
//            fill = fill || markerOptions.fillColor || this.color;

//            if (fillOpacity !== 1) {
//                fill = Color(fill).setOpacity(fillOpacity).get('rgba');
//            }
//            return fill;
//        },

//        /**
//         * Extend the convertAttribs method by applying opacity to the fill
//         */
//        convertAttribs: function () {
//            var obj = Series.prototype.convertAttribs.apply(this, arguments);

//            obj.fill = this.applyOpacity(obj.fill);

//            return obj;
//        },

//        /**
//         * Get the radius for each point based on the minSize, maxSize and each point's Z value. This
//         * must be done prior to Series.translate because the axis needs to add padding in
//         * accordance with the point sizes.
//         */
//        getRadii: function (zMin, zMax, minSize, maxSize) {
//            var len,
//                i,
//                pos,
//                zData = this.zData,
//                radii = [],
//                options = this.options,
//                sizeByArea = options.sizeBy !== 'width',
//                zThreshold = options.zThreshold,
//                zRange = zMax - zMin,
//                value,
//                radius;

//            // Set the shape type and arguments to be picked up in drawPoints
//            for (i = 0, len = zData.length; i < len; i++) {

//                value = zData[i];

//                // When sizing by threshold, the absolute value of z determines the size
//                // of the bubble.
//                if (options.sizeByAbsoluteValue && value !== null) {
//                    value = Math.abs(value - zThreshold);
//                    zMax = Math.max(zMax - zThreshold, Math.abs(zMin - zThreshold));
//                    zMin = 0;
//                }

//                if (value === null) {
//                    radius = null;
//                    // Issue #4419 - if value is less than zMin, push a radius that's always smaller than the minimum size
//                } else if (value < zMin) {
//                    radius = minSize / 2 - 1;
//                } else {
//                    // Relative size, a number between 0 and 1
//                    pos = zRange > 0 ? (value - zMin) / zRange : 0.5;

//                    if (sizeByArea && pos >= 0) {
//                        pos = Math.sqrt(pos);
//                    }
//                    radius = math.ceil(minSize + pos * (maxSize - minSize)) / 2;
//                }
//                radii.push(radius);
//            }
//            this.radii = radii;
//        },

//        /**
//         * Perform animation on the bubbles
//         */
//        animate: function (init) {
//            var animation = this.options.animation;

//            if (!init) { // run the animation
//                each(this.points, function (point) {
//                    var graphic = point.graphic,
//                        shapeArgs = point.shapeArgs;

//                    if (graphic && shapeArgs) {
//                        // start values
//                        graphic.attr('r', 1);

//                        // animate
//                        graphic.animate({
//                            r: shapeArgs.r
//                        }, animation);
//                    }
//                });

//                // delete this function to allow it only once
//                this.animate = null;
//            }
//        },

//        /**
//         * Extend the base translate method to handle bubble size
//         */
//        translate: function () {

//            var i,
//                data = this.data,
//                point,
//                radius,
//                radii = this.radii;

//            // Run the parent method
//            seriesTypes.scatter.prototype.translate.call(this);

//            // Set the shape type and arguments to be picked up in drawPoints
//            i = data.length;

//            while (i--) {
//                point = data[i];
//                radius = radii ? radii[i] : 0; // #1737

//                if (isNumber(radius) && radius >= this.minPxSize / 2) {
//                    // Shape arguments
//                    point.shapeType = 'circle';
//                    point.shapeArgs = {
//                        x: point.plotX,
//                        y: point.plotY,
//                        r: radius
//                    };

//                    // Alignment box for the data label
//                    point.dlBox = {
//                        x: point.plotX - radius,
//                        y: point.plotY - radius,
//                        width: 2 * radius,
//                        height: 2 * radius
//                    };
//                } else { // below zThreshold or z = null
//                    point.shapeArgs = point.plotY = point.dlBox = UNDEFINED; // #1691
//                }
//            }
//        },

//        /**
//         * Get the series' symbol in the legend
//         *
//         * @param {Object} legend The legend object
//         * @param {Object} item The series (this) or point
//         */
//        drawLegendSymbol: function (legend, item) {
//            var renderer = this.chart.renderer,
//                radius = renderer.fontMetrics(legend.itemStyle.fontSize).f / 2;

//            item.legendSymbol = renderer.circle(
//                radius,
//                legend.baseline - radius,
//                radius
//            ).attr({
//                zIndex: 3
//            }).add(item.legendGroup);
//            item.legendSymbol.isMarker = true;

//        },

//        drawPoints: seriesTypes.column.prototype.drawPoints,
//        alignDataLabel: seriesTypes.column.prototype.alignDataLabel,
//        buildKDTree: noop,
//        applyZones: noop
//    });

//    /**
//     * Add logic to pad each axis with the amount of pixels
//     * necessary to avoid the bubbles to overflow.
//     */
//    Axis.prototype.beforePadding = function () {
//        var axis = this,
//            axisLength = this.len,
//            chart = this.chart,
//            pxMin = 0,
//            pxMax = axisLength,
//            isXAxis = this.isXAxis,
//            dataKey = isXAxis ? 'xData' : 'yData',
//            min = this.min,
//            extremes = {},
//            smallestSize = math.min(chart.plotWidth, chart.plotHeight),
//            zMin = Number.MAX_VALUE,
//            zMax = -Number.MAX_VALUE,
//            range = this.max - min,
//            transA = axisLength / range,
//            activeSeries = [];

//        // Handle padding on the second pass, or on redraw
//        each(this.series, function (series) {

//            var seriesOptions = series.options,
//                zData;

//            if (series.bubblePadding && (series.visible || !chart.options.chart.ignoreHiddenSeries)) {

//                // Correction for #1673
//                axis.allowZoomOutside = true;

//                // Cache it
//                activeSeries.push(series);

//                if (isXAxis) { // because X axis is evaluated first

//                    // For each series, translate the size extremes to pixel values
//                    each(['minSize', 'maxSize'], function (prop) {
//                        var length = seriesOptions[prop],
//                            isPercent = /%$/.test(length);

//                        length = pInt(length);
//                        extremes[prop] = isPercent ?
//                            smallestSize * length / 100 :
//                            length;

//                    });
//                    series.minPxSize = extremes.minSize;
//                    series.maxPxSize = extremes.maxSize;

//                    // Find the min and max Z
//                    zData = series.zData;
//                    if (zData.length) { // #1735
//                        zMin = pick(seriesOptions.zMin, math.min(
//                            zMin,
//                            math.max(
//                                arrayMin(zData),
//                                seriesOptions.displayNegative === false ? seriesOptions.zThreshold : -Number.MAX_VALUE
//                            )
//                        ));
//                        zMax = pick(seriesOptions.zMax, math.max(zMax, arrayMax(zData)));
//                    }
//                }
//            }
//        });

//        each(activeSeries, function (series) {

//            var data = series[dataKey],
//                i = data.length,
//                radius;

//            if (isXAxis) {
//                series.getRadii(zMin, zMax, series.minPxSize, series.maxPxSize);
//            }

//            if (range > 0) {
//                while (i--) {
//                    if (isNumber(data[i]) && axis.dataMin <= data[i] && data[i] <= axis.dataMax) {
//                        radius = series.radii[i];
//                        pxMin = Math.min(((data[i] - min) * transA) - radius, pxMin);
//                        pxMax = Math.max(((data[i] - min) * transA) + radius, pxMax);
//                    }
//                }
//            }
//        });


//        if (activeSeries.length && range > 0 && !this.isLog) {
//            pxMax -= axisLength;
//            transA *= (axisLength + pxMin - pxMax) / axisLength;
//            each([['min', 'userMin', pxMin], ['max', 'userMax', pxMax]], function (keys) {
//                if (pick(axis.options[keys[0]], axis[keys[1]]) === UNDEFINED) {
//                    axis[keys[0]] += keys[2] / transA;
//                }
//            });
//        }
//    };

//    /* ****************************************************************************
//     * End Bubble series code                                                     *
//     *****************************************************************************/

//    (function () {

//        /**
//         * Extensions for polar charts. Additionally, much of the geometry required for polar charts is
//         * gathered in RadialAxes.js.
//         *
//         */

//        var seriesProto = Series.prototype,
//            pointerProto = Pointer.prototype,
//            colProto;

//        /**
//         * Search a k-d tree by the point angle, used for shared tooltips in polar charts
//         */
//        seriesProto.searchPointByAngle = function (e) {
//            var series = this,
//                chart = series.chart,
//                xAxis = series.xAxis,
//                center = xAxis.pane.center,
//                plotX = e.chartX - center[0] - chart.plotLeft,
//                plotY = e.chartY - center[1] - chart.plotTop;

//            return this.searchKDTree({
//                clientX: 180 + (Math.atan2(plotX, plotY) * (-180 / Math.PI))
//            });

//        };

//        /**
//         * Wrap the buildKDTree function so that it searches by angle (clientX) in case of shared tooltip,
//         * and by two dimensional distance in case of non-shared.
//         */
//        wrap(seriesProto, 'buildKDTree', function (proceed) {
//            if (this.chart.polar) {
//                if (this.kdByAngle) {
//                    this.searchPoint = this.searchPointByAngle;
//                } else {
//                    this.kdDimensions = 2;
//                }
//            }
//            proceed.apply(this);
//        });

//        /**
//         * Translate a point's plotX and plotY from the internal angle and radius measures to
//         * true plotX, plotY coordinates
//         */
//        seriesProto.toXY = function (point) {
//            var xy,
//                chart = this.chart,
//                plotX = point.plotX,
//                plotY = point.plotY,
//                clientX;

//            // Save rectangular plotX, plotY for later computation
//            point.rectPlotX = plotX;
//            point.rectPlotY = plotY;

//            // Find the polar plotX and plotY
//            xy = this.xAxis.postTranslate(point.plotX, this.yAxis.len - plotY);
//            point.plotX = point.polarPlotX = xy.x - chart.plotLeft;
//            point.plotY = point.polarPlotY = xy.y - chart.plotTop;

//            // If shared tooltip, record the angle in degrees in order to align X points. Otherwise,
//            // use a standard k-d tree to get the nearest point in two dimensions.
//            if (this.kdByAngle) {
//                clientX = ((plotX / Math.PI * 180) + this.xAxis.pane.options.startAngle) % 360;
//                if (clientX < 0) { // #2665
//                    clientX += 360;
//                }
//                point.clientX = clientX;
//            } else {
//                point.clientX = point.plotX;
//            }
//        };

//        if (seriesTypes.spline) {
//            /**
//             * Overridden method for calculating a spline from one point to the next
//             */
//            wrap(seriesTypes.spline.prototype, 'getPointSpline', function (proceed, segment, point, i) {

//                var ret,
//                    smoothing = 1.5, // 1 means control points midway between points, 2 means 1/3 from the point, 3 is 1/4 etc;
//                    denom = smoothing + 1,
//                    plotX,
//                    plotY,
//                    lastPoint,
//                    nextPoint,
//                    lastX,
//                    lastY,
//                    nextX,
//                    nextY,
//                    leftContX,
//                    leftContY,
//                    rightContX,
//                    rightContY,
//                    distanceLeftControlPoint,
//                    distanceRightControlPoint,
//                    leftContAngle,
//                    rightContAngle,
//                    jointAngle;


//                if (this.chart.polar) {

//                    plotX = point.plotX;
//                    plotY = point.plotY;
//                    lastPoint = segment[i - 1];
//                    nextPoint = segment[i + 1];

//                    // Connect ends
//                    if (this.connectEnds) {
//                        if (!lastPoint) {
//                            lastPoint = segment[segment.length - 2]; // not the last but the second last, because the segment is already connected
//                        }
//                        if (!nextPoint) {
//                            nextPoint = segment[1];
//                        }
//                    }

//                    // find control points
//                    if (lastPoint && nextPoint) {

//                        lastX = lastPoint.plotX;
//                        lastY = lastPoint.plotY;
//                        nextX = nextPoint.plotX;
//                        nextY = nextPoint.plotY;
//                        leftContX = (smoothing * plotX + lastX) / denom;
//                        leftContY = (smoothing * plotY + lastY) / denom;
//                        rightContX = (smoothing * plotX + nextX) / denom;
//                        rightContY = (smoothing * plotY + nextY) / denom;
//                        distanceLeftControlPoint = Math.sqrt(Math.pow(leftContX - plotX, 2) + Math.pow(leftContY - plotY, 2));
//                        distanceRightControlPoint = Math.sqrt(Math.pow(rightContX - plotX, 2) + Math.pow(rightContY - plotY, 2));
//                        leftContAngle = Math.atan2(leftContY - plotY, leftContX - plotX);
//                        rightContAngle = Math.atan2(rightContY - plotY, rightContX - plotX);
//                        jointAngle = (Math.PI / 2) + ((leftContAngle + rightContAngle) / 2);


//                        // Ensure the right direction, jointAngle should be in the same quadrant as leftContAngle
//                        if (Math.abs(leftContAngle - jointAngle) > Math.PI / 2) {
//                            jointAngle -= Math.PI;
//                        }

//                        // Find the corrected control points for a spline straight through the point
//                        leftContX = plotX + Math.cos(jointAngle) * distanceLeftControlPoint;
//                        leftContY = plotY + Math.sin(jointAngle) * distanceLeftControlPoint;
//                        rightContX = plotX + Math.cos(Math.PI + jointAngle) * distanceRightControlPoint;
//                        rightContY = plotY + Math.sin(Math.PI + jointAngle) * distanceRightControlPoint;

//                        // Record for drawing in next point
//                        point.rightContX = rightContX;
//                        point.rightContY = rightContY;

//                    }


//                    // moveTo or lineTo
//                    if (!i) {
//                        ret = ['M', plotX, plotY];
//                    } else { // curve from last point to this
//                        ret = [
//                            'C',
//                            lastPoint.rightContX || lastPoint.plotX,
//                            lastPoint.rightContY || lastPoint.plotY,
//                            leftContX || plotX,
//                            leftContY || plotY,
//                            plotX,
//                            plotY
//                        ];
//                        lastPoint.rightContX = lastPoint.rightContY = null; // reset for updating series later
//                    }


//                } else {
//                    ret = proceed.call(this, segment, point, i);
//                }
//                return ret;
//            });
//        }

//        /**
//         * Extend translate. The plotX and plotY values are computed as if the polar chart were a
//         * cartesian plane, where plotX denotes the angle in radians and (yAxis.len - plotY) is the pixel distance from
//         * center.
//         */
//        wrap(seriesProto, 'translate', function (proceed) {
//            var chart = this.chart,
//                points,
//                i;

//            // Run uber method
//            proceed.call(this);

//            // Postprocess plot coordinates
//            if (chart.polar) {
//                this.kdByAngle = chart.tooltip && chart.tooltip.shared;

//                if (!this.preventPostTranslate) {
//                    points = this.points;
//                    i = points.length;

//                    while (i--) {
//                        // Translate plotX, plotY from angle and radius to true plot coordinates
//                        this.toXY(points[i]);
//                    }
//                }
//            }
//        });

//        /**
//         * Extend getSegmentPath to allow connecting ends across 0 to provide a closed circle in
//         * line-like series.
//         */
//        wrap(seriesProto, 'getGraphPath', function (proceed, points) {
//            var series = this,
//                i,
//                firstValid;

//            // Connect the path
//            if (this.chart.polar) {
//                points = points || this.points;

//                // Append first valid point in order to connect the ends
//                for (i = 0; i < points.length; i++) {
//                    if (!points[i].isNull) {
//                        firstValid = i;
//                        break;
//                    }
//                }
//                if (this.options.connectEnds !== false && firstValid !== undefined) {
//                    this.connectEnds = true; // re-used in splines
//                    points.splice(points.length, 0, points[firstValid]);
//                }

//                // For area charts, pseudo points are added to the graph, now we need to translate these
//                each(points, function (point) {
//                    if (point.polarPlotY === undefined) {
//                        series.toXY(point);
//                    }
//                });
//            }

//            // Run uber method
//            return proceed.apply(this, [].slice.call(arguments, 1));

//        });


//        function polarAnimate(proceed, init) {
//            var chart = this.chart,
//                animation = this.options.animation,
//                group = this.group,
//                markerGroup = this.markerGroup,
//                center = this.xAxis.center,
//                plotLeft = chart.plotLeft,
//                plotTop = chart.plotTop,
//                attribs;

//            // Specific animation for polar charts
//            if (chart.polar) {

//                // Enable animation on polar charts only in SVG. In VML, the scaling is different, plus animation
//                // would be so slow it would't matter.
//                if (chart.renderer.isSVG) {

//                    if (animation === true) {
//                        animation = {};
//                    }

//                    // Initialize the animation
//                    if (init) {

//                        // Scale down the group and place it in the center
//                        attribs = {
//                            translateX: center[0] + plotLeft,
//                            translateY: center[1] + plotTop,
//                            scaleX: 0.001, // #1499
//                            scaleY: 0.001
//                        };

//                        group.attr(attribs);
//                        if (markerGroup) {
//                            //markerGroup.attrSetters = group.attrSetters;
//                            markerGroup.attr(attribs);
//                        }

//                        // Run the animation
//                    } else {
//                        attribs = {
//                            translateX: plotLeft,
//                            translateY: plotTop,
//                            scaleX: 1,
//                            scaleY: 1
//                        };
//                        group.animate(attribs, animation);
//                        if (markerGroup) {
//                            markerGroup.animate(attribs, animation);
//                        }

//                        // Delete this function to allow it only once
//                        this.animate = null;
//                    }
//                }

//                // For non-polar charts, revert to the basic animation
//            } else {
//                proceed.call(this, init);
//            }
//        }

//        // Define the animate method for regular series
//        wrap(seriesProto, 'animate', polarAnimate);


//        if (seriesTypes.column) {

//            colProto = seriesTypes.column.prototype;

//            colProto.polarArc = function (low, high, start, end) {
//                var center = this.xAxis.center,
//                    len = this.yAxis.len;

//                return this.chart.renderer.symbols.arc(
//                    center[0],
//                    center[1],
//                    len - high,
//                    null,
//                    {
//                        start: start,
//                        end: end,
//                        innerR: len - pick(low, len)
//                    }
//                );
//            };

//            /**
//            * Define the animate method for columnseries
//            */
//            wrap(colProto, 'animate', polarAnimate);


//            /**
//             * Extend the column prototype's translate method
//             */
//            wrap(colProto, 'translate', function (proceed) {

//                var xAxis = this.xAxis,
//                    startAngleRad = xAxis.startAngleRad,
//                    start,
//                    points,
//                    point,
//                    i;

//                this.preventPostTranslate = true;

//                // Run uber method
//                proceed.call(this);

//                // Postprocess plot coordinates
//                if (xAxis.isRadial) {
//                    points = this.points;
//                    i = points.length;
//                    while (i--) {
//                        point = points[i];
//                        start = point.barX + startAngleRad;
//                        point.shapeType = 'path';
//                        point.shapeArgs = {
//                            d: this.polarArc(point.yBottom, point.plotY, start, start + point.pointWidth)
//                        };
//                        // Provide correct plotX, plotY for tooltip
//                        this.toXY(point);
//                        point.tooltipPos = [point.plotX, point.plotY];
//                        point.ttBelow = point.plotY > xAxis.center[1];
//                    }
//                }
//            });


//            /**
//             * Align column data labels outside the columns. #1199.
//             */
//            wrap(colProto, 'alignDataLabel', function (proceed, point, dataLabel, options, alignTo, isNew) {

//                if (this.chart.polar) {
//                    var angle = point.rectPlotX / Math.PI * 180,
//                        align,
//                        verticalAlign;

//                    // Align nicely outside the perimeter of the columns
//                    if (options.align === null) {
//                        if (angle > 20 && angle < 160) {
//                            align = 'left'; // right hemisphere
//                        } else if (angle > 200 && angle < 340) {
//                            align = 'right'; // left hemisphere
//                        } else {
//                            align = 'center'; // top or bottom
//                        }
//                        options.align = align;
//                    }
//                    if (options.verticalAlign === null) {
//                        if (angle < 45 || angle > 315) {
//                            verticalAlign = 'bottom'; // top part
//                        } else if (angle > 135 && angle < 225) {
//                            verticalAlign = 'top'; // bottom part
//                        } else {
//                            verticalAlign = 'middle'; // left or right
//                        }
//                        options.verticalAlign = verticalAlign;
//                    }

//                    seriesProto.alignDataLabel.call(this, point, dataLabel, options, alignTo, isNew);
//                } else {
//                    proceed.call(this, point, dataLabel, options, alignTo, isNew);
//                }

//            });
//        }

//        /**
//         * Extend getCoordinates to prepare for polar axis values
//         */
//        wrap(pointerProto, 'getCoordinates', function (proceed, e) {
//            var chart = this.chart,
//                ret = {
//                    xAxis: [],
//                    yAxis: []
//                };

//            if (chart.polar) {

//                each(chart.axes, function (axis) {
//                    var isXAxis = axis.isXAxis,
//                        center = axis.center,
//                        x = e.chartX - center[0] - chart.plotLeft,
//                        y = e.chartY - center[1] - chart.plotTop;

//                    ret[isXAxis ? 'xAxis' : 'yAxis'].push({
//                        axis: axis,
//                        value: axis.translate(
//                            isXAxis ?
//                                Math.PI - Math.atan2(x, y) : // angle
//                                Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), // distance from center
//                            true
//                        )
//                    });
//                });

//            } else {
//                ret = proceed.call(this, e);
//            }

//            return ret;
//        });

//    }());

//}));







/*
 Highcharts JS v6.0.2 (2017-10-20)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (x) {
    debugger;
    "object" === typeof module && module.exports ? module.exports = x : x(Highcharts)
})
(function (x) {
    debugger;
    (function (a) {
       
        debugger;
        var t = a.deg2rad,
            v = a.isNumber,
            w = a.pick,
            n = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function () {
                var a = this.options,
                    e = this.chart,
                    k = 2 * (a.slicedOffset || 0),
                    b = e.plotWidth - 2 * k,
                    e = e.plotHeight - 2 * k,
                    c = a.center,
                    c = [w(c[0], "50%"), w(c[1], "50%"), a.size || "100%", a.innerSize || 0],
                    l = Math.min(b, e),
                    g, d;
                for (g = 0; 4 > g; ++g) d = c[g], a = 2 > g || 2 === g && /%$/.test(d), c[g] = n(d, [b, e, l, c[2]][g]) + (a ? k : 0);
                c[3] > c[2] && (c[3] = c[2]);
                return c
            },
            getStartAndEndRadians: function (a, e) {
                a = v(a) ? a : 0;
                e = v(e) && e > a && 360 > e - a ? e : a + 360;
                return {
                    start: t * (a + -90),
                    end: t * (e + -90)
                }
            }
        }
    })(x);
    (function (a) {
        function t(a, b) {
            this.init(a, b)
        }
        var v = a.CenteredSeriesMixin,
            w = a.each,
            n = a.extend,
            m = a.merge,
            e = a.splat;
        n(t.prototype, {
            coll: "pane",
            init: function (a, b) {
                this.chart = b;
                this.background = [];
                b.pane.push(this);
                this.setOptions(a)
            },
            setOptions: function (a) {
               // debugger;
                this.options = m(this.defaultOptions, this.chart.angular ? {
                    background: {}
                } : void 0, a)
            },
            render: function () {
                var a = this.options,
                    b =
                    this.options.background,
                    c = this.chart.renderer;
                this.group || (this.group = c.g("pane-group").attr({
                    zIndex: a.zIndex || 0
                }).add());
                this.updateCenter();
                if (b)
                    for (b = e(b), a = Math.max(b.length, this.background.length || 0), c = 0; c < a; c++) b[c] && this.axis ? this.renderBackground(m(this.defaultBackgroundOptions, b[c]), c) : this.background[c] && (this.background[c] = this.background[c].destroy(), this.background.splice(c, 1))
            },
            renderBackground: function (a, b) {
                var c = "animate";
                this.background[b] || (this.background[b] = this.chart.renderer.path().add(this.group),
                    c = "attr");
                this.background[b][c]({
                    d: this.axis.getPlotBandPath(a.from, a.to, a)
                }).attr({
                    fill: a.backgroundColor,
                    stroke: a.borderColor,
                    "stroke-width": a.borderWidth,
                    "class": "highcharts-pane " + (a.className || "")
                })
            },
            defaultOptions: {
                center: ["50%", "50%"],
                size: "85%",
                startAngle: 0
            },
            defaultBackgroundOptions: {
                shape: "circle",
                borderWidth: 1,
                borderColor: "#cccccc",
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, "#ffffff"],
                        [1, "#e6e6e6"]
                    ]
                },
                from: -Number.MAX_VALUE,
                innerRadius: 0,
                to: Number.MAX_VALUE,
                outerRadius: "105%"
            },
            updateCenter: function (a) {
                this.center = (a || this.axis || {}).center = v.getCenter.call(this)
            },
            update: function (a, b) {
                m(!0, this.options, a);
                this.setOptions(this.options);
                this.render();
                w(this.chart.axes, function (c) {
                    c.pane === this && (c.pane = null, c.update({}, b))
                }, this)
            }
        });
        a.Pane = t
    })(x);
    (function (a) {
        var t = a.each,
            v = a.extend,
            w = a.map,
            n = a.merge,
            m = a.noop,
            e = a.pick,
            k = a.pInt,
            b = a.wrap,
            c, l, g = a.Axis.prototype;
        a = a.Tick.prototype;
        c = {
            getOffset: m,
            redraw: function () {
                this.isDirty = !1
            },
            render: function () {
                this.isDirty = !1
            },
            setScale: m,
            setCategories: m,
            setTitle: m
        };
        l = {
            defaultRadialGaugeOptions: {
                labels: {
                    align: "center",
                    x: 0,
                    y: null
                },
                minorGridLineWidth: 0,
                minorTickInterval: "auto",
                minorTickLength: 10,
                minorTickPosition: "inside",
                minorTickWidth: 1,
                tickLength: 10,
                tickPosition: "inside",
                tickWidth: 2,
                title: {
                    rotation: 0
                },
                zIndex: 2
            },
            defaultRadialXOptions: {
                gridLineWidth: 1,
                labels: {
                    align: null,
                    distance: 15,
                    x: 0,
                    y: null
                },
                maxPadding: 0,
                minPadding: 0,
                showLastLabel: !1,
                tickLength: 0
            },
            defaultRadialYOptions: {
                gridLineInterpolation: "circle",
                labels: {
                    align: "right",
                    x: -3,
                    y: -2
                },
                showLastLabel: !1,
                title: {
                    x: 4,
                    text: null,
                    rotation: 90
                }
            },
            setOptions: function (b) {
                b = this.options = n(this.defaultOptions, this.defaultRadialOptions, b);
                b.plotBands || (b.plotBands = [])
            },
            getOffset: function () {
                g.getOffset.call(this);
                this.chart.axisOffset[this.side] = 0
            },
            getLinePath: function (b, c) {
                b = this.center;
                var d = this.chart,
                    f = e(c, b[2] / 2 - this.offset);
                this.isCircular || void 0 !== c ? (c = this.chart.renderer.symbols.arc(this.left + b[0], this.top + b[1], f, f, {
                    start: this.startAngleRad,
                    end: this.endAngleRad,
                    open: !0,
                    innerR: 0
                }), c.xBounds = [this.left +
                    b[0]
                ], c.yBounds = [this.top + b[1] - f]) : (c = this.postTranslate(this.angleRad, f), c = ["M", b[0] + d.plotLeft, b[1] + d.plotTop, "L", c.x, c.y]);
                return c
            },
            setAxisTranslation: function () {
                debugger;
                g.setAxisTranslation.call(this);
                this.center && (this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1) : this.center[2] / 2 / (this.max - this.min || 1), this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset : 0)
            },
            beforeSetTickPositions: function () {
                if (this.autoConnect = this.isCircular && void 0 === e(this.userMax,
                        this.options.max) && this.endAngleRad - this.startAngleRad === 2 * Math.PI) this.max += this.categories && 1 || this.pointRange || this.closestPointRange || 0
            },
            setAxisSize: function () {
                g.setAxisSize.call(this);
                this.isRadial && (this.pane.updateCenter(this), this.isCircular && (this.sector = this.endAngleRad - this.startAngleRad), this.len = this.width = this.height = this.center[2] * e(this.sector, 1) / 2)
            },
            getPosition: function (b, c) {
                return this.postTranslate(this.isCircular ? this.translate(b) : this.angleRad, e(this.isCircular ? c : this.translate(b),
                    this.center[2] / 2) - this.offset)
            },
            postTranslate: function (b, c) {
                var d = this.chart,
                    f = this.center;
                b = this.startAngleRad + b;
                return {
                    x: d.plotLeft + f[0] + Math.cos(b) * c,
                    y: d.plotTop + f[1] + Math.sin(b) * c
                }
            },
            getPlotBandPath: function (b, c, a) {
                var d = this.center,
                    f = this.startAngleRad,
                    l = d[2] / 2,
                    h = [e(a.outerRadius, "100%"), a.innerRadius, e(a.thickness, 10)],
                    g = Math.min(this.offset, 0),
                    u = /%$/,
                    m, n = this.isCircular;
                "polygon" === this.options.gridLineInterpolation ? d = this.getPlotLinePath(b).concat(this.getPlotLinePath(c, !0)) : (b = Math.max(b,
                    this.min), c = Math.min(c, this.max), n || (h[0] = this.translate(b), h[1] = this.translate(c)), h = w(h, function (b) {
                        u.test(b) && (b = k(b, 10) * l / 100);
                        return b
                    }), "circle" !== a.shape && n ? (b = f + this.translate(b), c = f + this.translate(c)) : (b = -Math.PI / 2, c = 1.5 * Math.PI, m = !0), h[0] -= g, h[2] -= g, d = this.chart.renderer.symbols.arc(this.left + d[0], this.top + d[1], h[0], h[0], {
                        start: Math.min(b, c),
                        end: Math.max(b, c),
                        innerR: e(h[1], h[0] - h[2]),
                        open: m
                    }));
                return d
            },
            getPlotLinePath: function (b, c) {
                var d = this,
                    f = d.center,
                    a = d.chart,
                    l = d.getPosition(b),
                    g, e,
                    u;
                d.isCircular ? u = ["M", f[0] + a.plotLeft, f[1] + a.plotTop, "L", l.x, l.y] : "circle" === d.options.gridLineInterpolation ? (b = d.translate(b)) && (u = d.getLinePath(0, b)) : (t(a.xAxis, function (b) {
                    b.pane === d.pane && (g = b)
                }), u = [], b = d.translate(b), f = g.tickPositions, g.autoConnect && (f = f.concat([f[0]])), c && (f = [].concat(f).reverse()), t(f, function (c, d) {
                    e = g.getPosition(c, b);
                    u.push(d ? "L" : "M", e.x, e.y)
                }));
                return u
            },
            getTitlePosition: function () {
                var b = this.center,
                    c = this.chart,
                    a = this.options.title;
                return {
                    x: c.plotLeft + b[0] + (a.x || 0),
                    y: c.plotTop +
                        b[1] - {
                            high: .5,
                            middle: .25,
                            low: 0
                        }[a.align] * b[2] + (a.y || 0)
                }
            }
        };
        b(g, "init", function (b, f, a) {
            var d = f.angular,
                h = f.polar,
                g = a.isX,
                y = d && g,
                m, u = f.options,
                k = a.pane || 0,
                t = this.pane = f.pane && f.pane[k],
                k = t && t.options;
            if (d) {
                if (v(this, y ? c : l), m = !g) this.defaultRadialOptions = this.defaultRadialGaugeOptions
            } else h && (v(this, l), this.defaultRadialOptions = (m = g) ? this.defaultRadialXOptions : n(this.defaultYAxisOptions, this.defaultRadialYOptions));
            d || h ? (this.isRadial = !0, f.inverted = !1, u.chart.zoomType = null) : this.isRadial = !1;
            t && m && (t.axis =
                this);
            b.call(this, f, a);
            !y && t && (d || h) && (b = this.options, this.angleRad = (b.angle || 0) * Math.PI / 180, this.startAngleRad = (k.startAngle - 90) * Math.PI / 180, this.endAngleRad = (e(k.endAngle, k.startAngle + 360) - 90) * Math.PI / 180, this.offset = b.offset || 0, this.isCircular = m)
        });
        b(g, "autoLabelAlign", function (b) {
            if (!this.isRadial) return b.apply(this, [].slice.call(arguments, 1))
        });
        b(a, "getPosition", function (b, c, a, l, g) {
            var d = this.axis;
            return d.getPosition ? d.getPosition(a) : b.call(this, c, a, l, g)
        });
        b(a, "getLabelPosition", function (b,
            c, a, l, g, r, y, m, u) {
            var d = this.axis,
                f = r.y,
                h = 20,
                p = r.align,
                q = (d.translate(this.pos) + d.startAngleRad + Math.PI / 2) / Math.PI * 180 % 360;
            d.isRadial ? (b = d.getPosition(this.pos, d.center[2] / 2 + e(r.distance, -25)), "auto" === r.rotation ? l.attr({
                rotation: q
            }) : null === f && (f = d.chart.renderer.fontMetrics(l.styles.fontSize).b - l.getBBox().height / 2), null === p && (d.isCircular ? (this.label.getBBox().width > d.len * d.tickInterval / (d.max - d.min) && (h = 0), p = q > h && q < 180 - h ? "left" : q > 180 + h && q < 360 - h ? "right" : "center") : p = "center", l.attr({
                align: p
            })), b.x +=
                r.x, b.y += f) : b = b.call(this, c, a, l, g, r, y, m, u);
            return b
        });
        b(a, "getMarkPath", function (b, c, a, l, g, r, e) {
            var d = this.axis;
            d.isRadial ? (b = d.getPosition(this.pos, d.center[2] / 2 + l), c = ["M", c, a, "L", b.x, b.y]) : c = b.call(this, c, a, l, g, r, e);
            return c
        })
    })(x);
    (function (a) {
        var t = a.each,
            v = a.pick,
            w = a.defined,
            n = a.seriesType,
            m = a.seriesTypes,
            e = a.Series.prototype,
            k = a.Point.prototype;
        n("arearange", "area", {
            lineWidth: 1,
            threshold: null,
            tooltip: {
                pointFormat: '\x3cspan style\x3d"color:{series.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'
            },
            trackByArea: !0,
            dataLabels: {
                align: null,
                verticalAlign: null,
                xLow: 0,
                xHigh: 0,
                yLow: 0,
                yHigh: 0
            }
        }, {
            pointArrayMap: ["low", "high"],
            dataLabelCollections: ["dataLabel", "dataLabelUpper"],
            toYData: function (b) {
                return [b.low, b.high]
            },
            pointValKey: "low",
            deferTranslatePolar: !0,
            highToXY: function (b) {
                var c = this.chart,
                    a = this.xAxis.postTranslate(b.rectPlotX, this.yAxis.len - b.plotHigh);
                b.plotHighX = a.x - c.plotLeft;
                b.plotHigh = a.y - c.plotTop;
                b.plotLowX = b.plotX
            },
            translate: function () {
                var b = this,
                    c = b.yAxis,
                    a = !!b.modifyValue;
                m.area.prototype.translate.apply(b);
                t(b.points, function (l) {
                    var d = l.low,
                        f = l.high,
                        h = l.plotY;
                    null === f || null === d ? (l.isNull = !0, l.plotY = null) : (l.plotLow = h, l.plotHigh = c.translate(a ? b.modifyValue(f, l) : f, 0, 1, 0, 1), a && (l.yBottom = l.plotHigh))
                });
                this.chart.polar && t(this.points, function (c) {
                    b.highToXY(c);
                    c.tooltipPos = [(c.plotHighX + c.plotLowX) / 2, (c.plotHigh + c.plotLow) / 2]
                })
            },
            getGraphPath: function (b) {
                var c = [],
                    a = [],
                    g, d = m.area.prototype.getGraphPath,
                    f, h, q;
                q = this.options;
                var p = this.chart.polar && !1 !== q.connectEnds,
                    r = q.connectNulls,
                    e = q.step;
                b = b || this.points;
                for (g = b.length; g--;) f = b[g], f.isNull || p || r || b[g + 1] && !b[g + 1].isNull || a.push({
                    plotX: f.plotX,
                    plotY: f.plotY,
                    doCurve: !1
                }), h = {
                    polarPlotY: f.polarPlotY,
                    rectPlotX: f.rectPlotX,
                    yBottom: f.yBottom,
                    plotX: v(f.plotHighX, f.plotX),
                    plotY: f.plotHigh,
                    isNull: f.isNull
                }, a.push(h), c.push(h), f.isNull || p || r || b[g - 1] && !b[g - 1].isNull || a.push({
                    plotX: f.plotX,
                    plotY: f.plotY,
                    doCurve: !1
                });
                b = d.call(this, b);
                e && (!0 === e && (e = "left"), q.step = {
                    left: "right",
                    center: "center",
                    right: "left"
                }[e]);
                c = d.call(this, c);
                a = d.call(this, a);
                q.step = e;
                q = [].concat(b,
                    c);
                this.chart.polar || "M" !== a[0] || (a[0] = "L");
                this.graphPath = q;
                this.areaPath = this.areaPath.concat(b, a);
                q.isArea = !0;
                q.xMap = b.xMap;
                this.areaPath.xMap = b.xMap;
                return q
            },
            drawDataLabels: function () {
                var b = this.data,
                    c = b.length,
                    a, g = [],
                    d = this.options.dataLabels,
                    f = d.align,
                    h = d.verticalAlign,
                    q = d.inside,
                    p, r, y = this.chart.inverted;
                if (d.enabled || this._hasPointLabels) {
                    for (a = c; a--;)
                        if (p = b[a]) r = q ? p.plotHigh < p.plotLow : p.plotHigh > p.plotLow, p.y = p.high, p._plotY = p.plotY, p.plotY = p.plotHigh, g[a] = p.dataLabel, p.dataLabel = p.dataLabelUpper,
                            p.below = r, y ? f || (d.align = r ? "right" : "left") : h || (d.verticalAlign = r ? "top" : "bottom"), d.x = d.xHigh, d.y = d.yHigh;
                    e.drawDataLabels && e.drawDataLabels.apply(this, arguments);
                    for (a = c; a--;)
                        if (p = b[a]) r = q ? p.plotHigh < p.plotLow : p.plotHigh > p.plotLow, p.dataLabelUpper = p.dataLabel, p.dataLabel = g[a], p.y = p.low, p.plotY = p._plotY, p.below = !r, y ? f || (d.align = r ? "left" : "right") : h || (d.verticalAlign = r ? "bottom" : "top"), d.x = d.xLow, d.y = d.yLow;
                    e.drawDataLabels && e.drawDataLabels.apply(this, arguments)
                }
                d.align = f;
                d.verticalAlign = h
            },
            alignDataLabel: function () {
                m.column.prototype.alignDataLabel.apply(this,
                    arguments)
            },
            drawPoints: function () {
                var b = this.points.length,
                    c, a;
                e.drawPoints.apply(this, arguments);
                for (a = 0; a < b;) c = this.points[a], c.lowerGraphic = c.graphic, c.graphic = c.upperGraphic, c._plotY = c.plotY, c._plotX = c.plotX, c.plotY = c.plotHigh, w(c.plotHighX) && (c.plotX = c.plotHighX), a++;
                e.drawPoints.apply(this, arguments);
                for (a = 0; a < b;) c = this.points[a], c.upperGraphic = c.graphic, c.graphic = c.lowerGraphic, c.plotY = c._plotY, c.plotX = c._plotX, a++
            },
            setStackedPoints: a.noop
        }, {
            setState: function () {
                var b = this.state,
                    c = this.series,
                    a = c.chart.polar;
                w(this.plotHigh) || (this.plotHigh = c.yAxis.toPixels(this.high, !0));
                w(this.plotLow) || (this.plotLow = this.plotY = c.yAxis.toPixels(this.low, !0));
                k.setState.apply(this, arguments);
                this.graphic = this.upperGraphic;
                this.plotY = this.plotHigh;
                a && (this.plotX = this.plotHighX);
                this.state = b;
                c.stateMarkerGraphic && (c.lowerStateMarkerGraphic = c.stateMarkerGraphic, c.stateMarkerGraphic = c.upperStateMarkerGraphic);
                k.setState.apply(this, arguments);
                this.plotY = this.plotLow;
                this.graphic = this.lowerGraphic;
                a && (this.plotX =
                    this.plotLowX);
                c.stateMarkerGraphic && (c.upperStateMarkerGraphic = c.stateMarkerGraphic, c.stateMarkerGraphic = c.lowerStateMarkerGraphic, c.lowerStateMarkerGraphic = void 0)
            },
            haloPath: function () {
                var b = this.series.chart.polar,
                    c;
                this.plotY = this.plotLow;
                b && (this.plotX = this.plotLowX);
                c = k.haloPath.apply(this, arguments);
                this.plotY = this.plotHigh;
                b && (this.plotX = this.plotHighX);
                return c = c.concat(k.haloPath.apply(this, arguments))
            },
            destroy: function () {
                this.upperGraphic && (this.upperGraphic = this.upperGraphic.destroy());
                return k.destroy.apply(this, arguments)
            }
        })
    })(x);
    (function (a) {
        var t = a.seriesType;
        t("areasplinerange", "arearange", null, {
            getPointSpline: a.seriesTypes.spline.prototype.getPointSpline
        })
    })(x);
    (function (a) {
        var t = a.defaultPlotOptions,
            v = a.each,
            w = a.merge,
            n = a.noop,
            m = a.pick,
            e = a.seriesType,
            k = a.seriesTypes.column.prototype;
        e("columnrange", "arearange", w(t.column, t.arearange, {
            pointRange: null,
            marker: null,
            states: {
                hover: {
                    halo: !1
                }
            }
        }), {
            translate: function () {
                var b = this,
                    c = b.yAxis,
                    a = b.xAxis,
                    g = a.startAngleRad,
                    d, f = b.chart,
                    h =
                    b.xAxis.isRadial,
                    q = Math.max(f.chartWidth, f.chartHeight) + 999,
                    p;
                k.translate.apply(b);
                v(b.points, function (l) {
                    var r = l.shapeArgs,
                        e = b.options.minPointLength,
                        u, k;
                    l.plotHigh = p = Math.min(Math.max(-q, c.translate(l.high, 0, 1, 0, 1)), q);
                    l.plotLow = Math.min(Math.max(-q, l.plotY), q);
                    k = p;
                    u = m(l.rectPlotY, l.plotY) - p;
                    Math.abs(u) < e ? (e -= u, u += e, k -= e / 2) : 0 > u && (u *= -1, k -= u);
                    h ? (d = l.barX + g, l.shapeType = "path", l.shapeArgs = {
                        d: b.polarArc(k + u, k, d, d + l.pointWidth)
                    }) : (r.height = u, r.y = k, l.tooltipPos = f.inverted ? [c.len + c.pos - f.plotLeft - k - u /
                        2, a.len + a.pos - f.plotTop - r.x - r.width / 2, u
                    ] : [a.left - f.plotLeft + r.x + r.width / 2, c.pos - f.plotTop + k + u / 2, u])
                })
            },
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            drawGraph: n,
            getSymbol: n,
            crispCol: k.crispCol,
            drawPoints: k.drawPoints,
            drawTracker: k.drawTracker,
            getColumnMetrics: k.getColumnMetrics,
            pointAttribs: k.pointAttribs,
            animate: function () {
                return k.animate.apply(this, arguments)
            },
            polarArc: function () {
                return k.polarArc.apply(this, arguments)
            },
            translate3dPoints: function () {
                return k.translate3dPoints.apply(this,
                    arguments)
            },
            translate3dShapes: function () {
                return k.translate3dShapes.apply(this, arguments)
            }
        }, {
            setState: k.pointClass.prototype.setState
        })
    })(x);
    (function (a) {
        var t = a.each,
            v = a.isNumber,
            w = a.merge,
            n = a.pick,
            m = a.pInt,
            e = a.Series,
            k = a.seriesType,
            b = a.TrackerMixin;
        k("gauge", "line", {
            dataLabels: {
                enabled: !0,
                defer: !1,
                y: 15,
                borderRadius: 3,
                crop: !1,
                verticalAlign: "top",
                zIndex: 2,
                borderWidth: 1,
                borderColor: "#cccccc"
            },
            dial: {},
            pivot: {},
            tooltip: {
                headerFormat: ""
            },
            showInLegend: !1
        }, {
            angular: !0,
            directTouch: !0,
            drawGraph: a.noop,
            fixedBox: !0,
            forceDL: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            translate: function () {

                var b = this.yAxis,
                    a = this.options,
                    g = b.center;
                this.generatePoints();
                t(this.points, function (c) {
                    var d = w(a.dial, c.dial),
                        l = m(n(d.radius, 80)) * g[2] / 200,
                        q = m(n(d.baseLength, 70)) * l / 100,
                        p = m(n(d.rearLength, 10)) * l / 100,
                        r = d.baseWidth || 3,
                        e = d.topWidth || 1,
                        k = a.overshoot,
                        u = b.startAngleRad + b.translate(c.y, null, null, null, !0);
                    v(k) ? (k = k / 180 * Math.PI, u = Math.max(b.startAngleRad - k, Math.min(b.endAngleRad + k, u))) : !1 === a.wrap && (u = Math.max(b.startAngleRad,
                        Math.min(b.endAngleRad, u)));
                    u = 180 * u / Math.PI;
                    c.shapeType = "path";
                    c.shapeArgs = {
                        d: d.path || ["M", -p, -r / 2, "L", q, -r / 2, l, -e / 2, l, e / 2, q, r / 2, -p, r / 2, "z"],
                        translateX: g[0],
                        translateY: g[1],
                        rotation: u
                    };
                    c.plotX = g[0];
                    c.plotY = g[1]
                })
            },
            drawPoints: function () {
                var b = this,
                    a = b.yAxis.center,
                    g = b.pivot,
                    d = b.options,
                    f = d.pivot,
                    h = b.chart.renderer;
                t(b.points, function (c) {
                    var a = c.graphic,
                        f = c.shapeArgs,
                        l = f.d,
                        g = w(d.dial, c.dial);
                    a ? (a.animate(f), f.d = l) : (c.graphic = h[c.shapeType](f).attr({
                        rotation: f.rotation,
                        zIndex: 1
                    }).addClass("highcharts-dial").add(b.group),
                        c.graphic.attr({
                            stroke: g.borderColor || "none",
                            "stroke-width": g.borderWidth || 0,
                            fill: g.backgroundColor || "#000000"
                        }))
                });
                g ? g.animate({
                    translateX: a[0],
                    translateY: a[1]
                }) : (b.pivot = h.circle(0, 0, n(f.radius, 5)).attr({
                    zIndex: 2
                }).addClass("highcharts-pivot").translate(a[0], a[1]).add(b.group), b.pivot.attr({
                    "stroke-width": f.borderWidth || 0,
                    stroke: f.borderColor || "#cccccc",
                    fill: f.backgroundColor || "#000000"
                }))
            },
            animate: function (b) {
                var c = this;
                b || (t(c.points, function (b) {
                    var a = b.graphic;
                    a && (a.attr({
                        rotation: 180 * c.yAxis.startAngleRad /
                            Math.PI
                    }), a.animate({
                        rotation: b.shapeArgs.rotation
                    }, c.options.animation))
                }), c.animate = null)
            },
            render: function () {
                this.group = this.plotGroup("group", "series", this.visible ? "visible" : "hidden", this.options.zIndex, this.chart.seriesGroup);
                e.prototype.render.call(this);
                this.group.clip(this.chart.clipRect)
            },
            setData: function (b, a) {
                e.prototype.setData.call(this, b, !1);
                this.processData();
                this.generatePoints();
                n(a, !0) && this.chart.redraw()
            },
            drawTracker: b && b.drawTrackerPoint
        }, {
            setState: function (b) {
                this.state = b
            }
        })
    })(x);
    (function (a) {
        var t = a.each,
            v = a.noop,
            w = a.pick,
            n = a.seriesType,
            m = a.seriesTypes;
        n("boxplot", "column", {
            threshold: null,
            tooltip: {
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eMaximum: {point.high}\x3cbr/\x3eUpper quartile: {point.q3}\x3cbr/\x3eMedian: {point.median}\x3cbr/\x3eLower quartile: {point.q1}\x3cbr/\x3eMinimum: {point.low}\x3cbr/\x3e'
            },
            whiskerLength: "50%",
            fillColor: "#ffffff",
            lineWidth: 1,
            medianWidth: 2,
            states: {
                hover: {
                    brightness: -.3
                }
            },
            whiskerWidth: 2
        }, {
            pointArrayMap: ["low", "q1", "median", "q3", "high"],
            toYData: function (a) {
                return [a.low, a.q1, a.median, a.q3, a.high]
            },
            pointValKey: "high",
            pointAttribs: function (a) {
                var e = this.options,
                    b = a && a.color || this.color;
                return {
                    fill: a.fillColor || e.fillColor || b,
                    stroke: e.lineColor || b,
                    "stroke-width": e.lineWidth || 0
                }
            },
            drawDataLabels: v,
            translate: function () {
                var a = this.yAxis,
                    k = this.pointArrayMap;
                m.column.prototype.translate.apply(this);
                t(this.points, function (b) {
                    t(k, function (c) {
                        null !== b[c] && (b[c + "Plot"] = a.translate(b[c],
                            0, 1, 0, 1))
                    })
                })
            },
            drawPoints: function () {
                var a = this,
                    k = a.options,
                    b = a.chart.renderer,
                    c, l, g, d, f, h, q = 0,
                    p, r, m, n, u = !1 !== a.doQuartiles,
                    v, A = a.options.whiskerLength;
                t(a.points, function (e) {
                    var y = e.graphic,
                        t = y ? "animate" : "attr",
                        J = e.shapeArgs,
                        x = {},
                        C = {},
                        H = {},
                        I = e.color || a.color;
                    void 0 !== e.plotY && (p = J.width, r = Math.floor(J.x), m = r + p, n = Math.round(p / 2), c = Math.floor(u ? e.q1Plot : e.lowPlot), l = Math.floor(u ? e.q3Plot : e.lowPlot), g = Math.floor(e.highPlot), d = Math.floor(e.lowPlot), y || (e.graphic = y = b.g("point").add(a.group), e.stem = b.path().addClass("highcharts-boxplot-stem").add(y),
                            A && (e.whiskers = b.path().addClass("highcharts-boxplot-whisker").add(y)), u && (e.box = b.path(void 0).addClass("highcharts-boxplot-box").add(y)), e.medianShape = b.path(void 0).addClass("highcharts-boxplot-median").add(y)), x.stroke = e.stemColor || k.stemColor || I, x["stroke-width"] = w(e.stemWidth, k.stemWidth, k.lineWidth), x.dashstyle = e.stemDashStyle || k.stemDashStyle, e.stem.attr(x), A && (C.stroke = e.whiskerColor || k.whiskerColor || I, C["stroke-width"] = w(e.whiskerWidth, k.whiskerWidth, k.lineWidth), e.whiskers.attr(C)), u &&
                        (y = a.pointAttribs(e), e.box.attr(y)), H.stroke = e.medianColor || k.medianColor || I, H["stroke-width"] = w(e.medianWidth, k.medianWidth, k.lineWidth), e.medianShape.attr(H), h = e.stem.strokeWidth() % 2 / 2, q = r + n + h, e.stem[t]({
                            d: ["M", q, l, "L", q, g, "M", q, c, "L", q, d]
                        }), u && (h = e.box.strokeWidth() % 2 / 2, c = Math.floor(c) + h, l = Math.floor(l) + h, r += h, m += h, e.box[t]({
                            d: ["M", r, l, "L", r, c, "L", m, c, "L", m, l, "L", r, l, "z"]
                        })), A && (h = e.whiskers.strokeWidth() % 2 / 2, g += h, d += h, v = /%$/.test(A) ? n * parseFloat(A) / 100 : A / 2, e.whiskers[t]({
                            d: ["M", q - v, g, "L", q + v,
                                g, "M", q - v, d, "L", q + v, d
                            ]
                        })), f = Math.round(e.medianPlot), h = e.medianShape.strokeWidth() % 2 / 2, f += h, e.medianShape[t]({
                            d: ["M", r, f, "L", m, f]
                        }))
                })
            },
            setStackedPoints: v
        })
    })(x);
    (function (a) {
        var t = a.each,
            v = a.noop,
            w = a.seriesType,
            n = a.seriesTypes;
        w("errorbar", "boxplot", {
            color: "#000000",
            grouping: !1,
            linkedTo: ":previous",
            tooltip: {
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'
            },
            whiskerWidth: null
        }, {
            type: "errorbar",
            pointArrayMap: ["low", "high"],
            toYData: function (a) {
                return [a.low, a.high]
            },
            pointValKey: "high",
            doQuartiles: !1,
            drawDataLabels: n.arearange ? function () {
                var a = this.pointValKey;
                n.arearange.prototype.drawDataLabels.call(this);
                t(this.data, function (e) {
                    e.y = e[a]
                })
            } : v,
            getColumnMetrics: function () {
                return this.linkedParent && this.linkedParent.columnMetrics || n.column.prototype.getColumnMetrics.call(this)
            }
        })
    })(x);
    (function (a) {
        var t = a.correctFloat,
            v = a.isNumber,
            w = a.pick,
            n = a.Point,
            m = a.Series,
            e = a.seriesType,
            k = a.seriesTypes;
        e("waterfall", "column", {
            dataLabels: {
                inside: !0
            },
            lineWidth: 1,
            lineColor: "#333333",
            dashStyle: "dot",
            borderColor: "#333333",
            states: {
                hover: {
                    lineWidthPlus: 0
                }
            }
        }, {
            pointValKey: "y",
            translate: function () {
                var b = this.options,
                    c = this.yAxis,
                    a, g, d, f, h, e, p, r, m, n, u = w(b.minPointLength, 5),
                    v = u / 2,
                    x = b.threshold,
                    D = b.stacking,
                    z;
                k.column.prototype.translate.apply(this);
                r = m = x;
                g = this.points;
                a = 0;
                for (b = g.length; a < b; a++) d = g[a], p = this.processedYData[a], f = d.shapeArgs, h = D && c.stacks[(this.negStacks && p < x ? "-" : "") + this.stackKey], z = this.getStackIndicator(z,
                    d.x, this.index), n = h ? h[d.x].points[z.key] : [0, p], d.isSum ? d.y = t(p) : d.isIntermediateSum && (d.y = t(p - m)), e = Math.max(r, r + d.y) + n[0], f.y = c.translate(e, 0, 1, 0, 1), d.isSum ? (f.y = c.translate(n[1], 0, 1, 0, 1), f.height = Math.min(c.translate(n[0], 0, 1, 0, 1), c.len) - f.y) : d.isIntermediateSum ? (f.y = c.translate(n[1], 0, 1, 0, 1), f.height = Math.min(c.translate(m, 0, 1, 0, 1), c.len) - f.y, m = n[1]) : (f.height = 0 < p ? c.translate(r, 0, 1, 0, 1) - f.y : c.translate(r, 0, 1, 0, 1) - c.translate(r - p, 0, 1, 0, 1), r += h && h[d.x] ? h[d.x].total : p), 0 > f.height && (f.y += f.height,
                    f.height *= -1), d.plotY = f.y = Math.round(f.y) - this.borderWidth % 2 / 2, f.height = Math.max(Math.round(f.height), .001), d.yBottom = f.y + f.height, f.height <= u && !d.isNull ? (f.height = u, f.y -= v, d.plotY = f.y, d.minPointLengthOffset = 0 > d.y ? -v : v) : d.minPointLengthOffset = 0, f = d.plotY + (d.negative ? f.height : 0), this.chart.inverted ? d.tooltipPos[0] = c.len - f : d.tooltipPos[1] = f
            },
            processData: function (b) {
                var c = this.yData,
                    a = this.options.data,
                    e, d = c.length,
                    f, h, q, p, r, k;
                h = f = q = p = this.options.threshold || 0;
                for (k = 0; k < d; k++) r = c[k], e = a && a[k] ? a[k] : {},
                    "sum" === r || e.isSum ? c[k] = t(h) : "intermediateSum" === r || e.isIntermediateSum ? c[k] = t(f) : (h += r, f += r), q = Math.min(h, q), p = Math.max(h, p);
                m.prototype.processData.call(this, b);
                this.options.stacking || (this.dataMin = q, this.dataMax = p)
            },
            toYData: function (b) {
                return b.isSum ? 0 === b.x ? null : "sum" : b.isIntermediateSum ? 0 === b.x ? null : "intermediateSum" : b.y
            },
            pointAttribs: function (b, a) {
                var c = this.options.upColor;
                c && !b.options.color && (b.color = 0 < b.y ? c : null);
                b = k.column.prototype.pointAttribs.call(this, b, a);
                delete b.dashstyle;
                return b
            },
            getGraphPath: function () {
                return ["M", 0, 0]
            },
            getCrispPath: function () {
                var b = this.data,
                    a = b.length,
                    e = this.graph.strokeWidth() + this.borderWidth,
                    e = Math.round(e) % 2 / 2,
                    g = this.yAxis.reversed,
                    d = [],
                    f, h, q;
                for (q = 1; q < a; q++) {
                    h = b[q].shapeArgs;
                    f = b[q - 1].shapeArgs;
                    h = ["M", f.x + f.width, f.y + b[q - 1].minPointLengthOffset + e, "L", h.x, f.y + b[q - 1].minPointLengthOffset + e];
                    if (0 > b[q - 1].y && !g || 0 < b[q - 1].y && g) h[2] += f.height, h[5] += f.height;
                    d = d.concat(h)
                }
                return d
            },
            drawGraph: function () {
                m.prototype.drawGraph.call(this);
                this.graph.attr({
                    d: this.getCrispPath()
                })
            },
            setStackedPoints: function () {
                var b = this.options,
                    a, e;
                m.prototype.setStackedPoints.apply(this, arguments);
                a = this.stackedYData ? this.stackedYData.length : 0;
                for (e = 1; e < a; e++) b.data[e].isSum || b.data[e].isIntermediateSum || (this.stackedYData[e] += this.stackedYData[e - 1])
            },
            getExtremes: function () {
                if (this.options.stacking) return m.prototype.getExtremes.apply(this, arguments)
            }
        }, {
            getClassName: function () {
                var b = n.prototype.getClassName.call(this);
                this.isSum ? b += " highcharts-sum" : this.isIntermediateSum && (b += " highcharts-intermediate-sum");
                return b
            },
            isValid: function () {
                return v(this.y, !0) || this.isSum || this.isIntermediateSum
            }
        })
    })(x);
    (function (a) {
        var t = a.Series,
            v = a.seriesType,
            w = a.seriesTypes;
        v("polygon", "scatter", {
            marker: {
                enabled: !1,
                states: {
                    hover: {
                        enabled: !1
                    }
                }
            },
            stickyTracking: !1,
            tooltip: {
                followPointer: !0,
                pointFormat: ""
            },
            trackByArea: !0
        }, {
            type: "polygon",
            getGraphPath: function () {
                for (var a = t.prototype.getGraphPath.call(this), m = a.length + 1; m--;) (m === a.length || "M" === a[m]) && 0 < m && a.splice(m, 0, "z");
                return this.areaPath = a
            },
            drawGraph: function () {
                this.options.fillColor =
                    this.color;
                w.area.prototype.drawGraph.call(this)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawTracker: t.prototype.drawTracker,
            setStackedPoints: a.noop
        })
    })(x);
    (function (a) {
        var t = a.arrayMax,
            v = a.arrayMin,
            w = a.Axis,
            n = a.color,
            m = a.each,
            e = a.isNumber,
            k = a.noop,
            b = a.pick,
            c = a.pInt,
            l = a.Point,
            g = a.Series,
            d = a.seriesType,
            f = a.seriesTypes;
        d("bubble", "scatter", {
            dataLabels: {
                formatter: function () {
                    return this.point.z
                },
                inside: !0,
                verticalAlign: "middle"
            },
            marker: {
                lineColor: null,
                lineWidth: 1,
                radius: null,
                states: {
                    hover: {
                        radiusPlus: 0
                    }
                },
                symbol: "circle"
            },
            minSize: 8,
            maxSize: "20%",
            softThreshold: !1,
            states: {
                hover: {
                    halo: {
                        size: 5
                    }
                }
            },
            tooltip: {
                pointFormat: "({point.x}, {point.y}), Size: {point.z}"
            },
            turboThreshold: 0,
            zThreshold: 0,
            zoneAxis: "z"
        }, {
            pointArrayMap: ["y", "z"],
            parallelArrays: ["x", "y", "z"],
            trackerGroups: ["group", "dataLabelsGroup"],
            specialGroup: "group",
            bubblePadding: !0,
            zoneAxis: "z",
            directTouch: !0,
            pointAttribs: function (a, c) {
                var d = b(this.options.marker.fillOpacity, .5);
                a = g.prototype.pointAttribs.call(this, a, c);
                1 !== d && (a.fill = n(a.fill).setOpacity(d).get("rgba"));
                return a
            },
            getRadii: function (b, a, c, d) {
                var f, e, h, g = this.zData,
                    l = [],
                    p = this.options,
                    r = "width" !== p.sizeBy,
                    q = p.zThreshold,
                    k = a - b;
                e = 0;
                for (f = g.length; e < f; e++) h = g[e], p.sizeByAbsoluteValue && null !== h && (h = Math.abs(h - q), a = Math.max(a - q, Math.abs(b - q)), b = 0), null === h ? h = null : h < b ? h = c / 2 - 1 : (h = 0 < k ? (h - b) / k : .5, r && 0 <= h && (h = Math.sqrt(h)), h = Math.ceil(c + h * (d - c)) / 2), l.push(h);
                this.radii = l
            },
            animate: function (b) {
                var a = this.options.animation;
                b || (m(this.points, function (b) {
                    var c = b.graphic,
                        d;
                    c && c.width && (d = {
                        x: c.x,
                        y: c.y,
                        width: c.width,
                        height: c.height
                    }, c.attr({
                        x: b.plotX,
                        y: b.plotY,
                        width: 1,
                        height: 1
                    }), c.animate(d, a))
                }), this.animate = null)
            },
            translate: function () {
                var b, c = this.data,
                    d, g, l = this.radii;
                f.scatter.prototype.translate.call(this);
                for (b = c.length; b--;) d = c[b], g = l ? l[b] : 0, e(g) && g >= this.minPxSize / 2 ? (d.marker = a.extend(d.marker, {
                    radius: g,
                    width: 2 * g,
                    height: 2 * g
                }), d.dlBox = {
                    x: d.plotX - g,
                    y: d.plotY - g,
                    width: 2 * g,
                    height: 2 * g
                }) : d.shapeArgs = d.plotY = d.dlBox = void 0
            },
            alignDataLabel: f.column.prototype.alignDataLabel,
            buildKDTree: k,
            applyZones: k
        }, {
            haloPath: function (b) {
                return l.prototype.haloPath.call(this,
                    0 === b ? 0 : (this.marker ? this.marker.radius || 0 : 0) + b)
            },
            ttBelow: !1
        });
        w.prototype.beforePadding = function () {
            var a = this,
                d = this.len,
                f = this.chart,
                g = 0,
                l = d,
                k = this.isXAxis,
                n = k ? "xData" : "yData",
                w = this.min,
                x = {},
                D = Math.min(f.plotWidth, f.plotHeight),
                z = Number.MAX_VALUE,
                E = -Number.MAX_VALUE,
                F = this.max - w,
                B = d / F,
                G = [];
            m(this.series, function (d) {
                var e = d.options;
                !d.bubblePadding || !d.visible && f.options.chart.ignoreHiddenSeries || (a.allowZoomOutside = !0, G.push(d), k && (m(["minSize", "maxSize"], function (b) {
                    var a = e[b],
                        d = /%$/.test(a),
                        a = c(a);
                    x[b] = d ? D * a / 100 : a
                }), d.minPxSize = x.minSize, d.maxPxSize = Math.max(x.maxSize, x.minSize), d = d.zData, d.length && (z = b(e.zMin, Math.min(z, Math.max(v(d), !1 === e.displayNegative ? e.zThreshold : -Number.MAX_VALUE))), E = b(e.zMax, Math.max(E, t(d))))))
            });
            m(G, function (b) {
                var c = b[n],
                    d = c.length,
                    f;
                k && b.getRadii(z, E, b.minPxSize, b.maxPxSize);
                if (0 < F)
                    for (; d--;) e(c[d]) && a.dataMin <= c[d] && c[d] <= a.dataMax && (f = b.radii[d], g = Math.min((c[d] - w) * B - f, g), l = Math.max((c[d] - w) * B + f, l))
            });
            G.length && 0 < F && !this.isLog && (l -= d, B *= (d + g - l) / d, m([
                ["min",
                    "userMin", g
                ],
                ["max", "userMax", l]
            ], function (c) {
                void 0 === b(a.options[c[0]], a[c[1]]) && (a[c[0]] += c[2] / B)
            }))
        }
    })(x);
    (function (a) {
        function t(b, a) {
            var c = this.chart,
                e = this.options.animation,
                d = this.group,
                f = this.markerGroup,
                h = this.xAxis.center,
                k = c.plotLeft,
                p = c.plotTop;
            c.polar ? c.renderer.isSVG && (!0 === e && (e = {}), a ? (b = {
                translateX: h[0] + k,
                translateY: h[1] + p,
                scaleX: .001,
                scaleY: .001
            }, d.attr(b), f && f.attr(b)) : (b = {
                translateX: k,
                translateY: p,
                scaleX: 1,
                scaleY: 1
            }, d.animate(b, e), f && f.animate(b, e), this.animate = null)) : b.call(this,
                a)
        }
        var v = a.each,
            w = a.pick,
            n = a.seriesTypes,
            m = a.wrap,
            e = a.Series.prototype,
            k = a.Pointer.prototype;
        e.searchPointByAngle = function (b) {
            var a = this.chart,
                e = this.xAxis.pane.center;
            return this.searchKDTree({
                clientX: 180 + -180 / Math.PI * Math.atan2(b.chartX - e[0] - a.plotLeft, b.chartY - e[1] - a.plotTop)
            })
        };
        e.getConnectors = function (b, a, e, g) {
            var c, f, h, l, k, m, n, t;
            f = g ? 1 : 0;
            c = 0 <= a && a <= b.length - 1 ? a : 0 > a ? b.length - 1 + a : 0;
            a = 0 > c - 1 ? b.length - (1 + f) : c - 1;
            f = c + 1 > b.length - 1 ? f : c + 1;
            h = b[a];
            f = b[f];
            l = h.plotX;
            h = h.plotY;
            k = f.plotX;
            m = f.plotY;
            f = b[c].plotX;
            c = b[c].plotY;
            l = (1.5 * f + l) / 2.5;
            h = (1.5 * c + h) / 2.5;
            k = (1.5 * f + k) / 2.5;
            n = (1.5 * c + m) / 2.5;
            m = Math.sqrt(Math.pow(l - f, 2) + Math.pow(h - c, 2));
            t = Math.sqrt(Math.pow(k - f, 2) + Math.pow(n - c, 2));
            l = Math.atan2(h - c, l - f);
            n = Math.PI / 2 + (l + Math.atan2(n - c, k - f)) / 2;
            Math.abs(l - n) > Math.PI / 2 && (n -= Math.PI);
            l = f + Math.cos(n) * m;
            h = c + Math.sin(n) * m;
            k = f + Math.cos(Math.PI + n) * t;
            n = c + Math.sin(Math.PI + n) * t;
            f = {
                rightContX: k,
                rightContY: n,
                leftContX: l,
                leftContY: h,
                plotX: f,
                plotY: c
            };
            e && (f.prevPointCont = this.getConnectors(b, a, !1, g));
            return f
        };
        m(e, "buildKDTree",
            function (b) {
                this.chart.polar && (this.kdByAngle ? this.searchPoint = this.searchPointByAngle : this.options.findNearestPointBy = "xy");
                b.apply(this)
            });
        e.toXY = function (b) {
            var a, e = this.chart,
                g = b.plotX;
            a = b.plotY;
            b.rectPlotX = g;
            b.rectPlotY = a;
            a = this.xAxis.postTranslate(b.plotX, this.yAxis.len - a);
            b.plotX = b.polarPlotX = a.x - e.plotLeft;
            b.plotY = b.polarPlotY = a.y - e.plotTop;
            this.kdByAngle ? (e = (g / Math.PI * 180 + this.xAxis.pane.options.startAngle) % 360, 0 > e && (e += 360), b.clientX = e) : b.clientX = b.plotX
        };
        n.spline && (m(n.spline.prototype,
            "getPointSpline",
            function (b, a, e, g) {
                this.chart.polar ? g ? (b = this.getConnectors(a, g, !0, this.connectEnds), b = ["C", b.prevPointCont.rightContX, b.prevPointCont.rightContY, b.leftContX, b.leftContY, b.plotX, b.plotY]) : b = ["M", e.plotX, e.plotY] : b = b.call(this, a, e, g);
                return b
            }), n.areasplinerange && (n.areasplinerange.prototype.getPointSpline = n.spline.prototype.getPointSpline));
        m(e, "translate", function (b) {
            var a = this.chart;
            b.call(this);
            if (a.polar && (this.kdByAngle = a.tooltip && a.tooltip.shared, !this.preventPostTranslate))
                for (b =
                    this.points, a = b.length; a--;) this.toXY(b[a])
        });
        m(e, "getGraphPath", function (b, a) {
            var c = this,
                e, d, f;
            if (this.chart.polar) {
                a = a || this.points;
                for (e = 0; e < a.length; e++)
                    if (!a[e].isNull) {
                        d = e;
                        break
                    } !1 !== this.options.connectEnds && void 0 !== d && (this.connectEnds = !0, a.splice(a.length, 0, a[d]), f = !0);
                v(a, function (b) {
                    void 0 === b.polarPlotY && c.toXY(b)
                })
            }
            e = b.apply(this, [].slice.call(arguments, 1));
            f && a.pop();
            return e
        });
        m(e, "animate", t);
        n.column && (n = n.column.prototype, n.polarArc = function (b, a, e, g) {
            var c = this.xAxis.center,
                f = this.yAxis.len;
            return this.chart.renderer.symbols.arc(c[0], c[1], f - a, null, {
                start: e,
                end: g,
                innerR: f - w(b, f)
            })
        }, m(n, "animate", t), m(n, "translate", function (b) {
            var a = this.xAxis,
                e = a.startAngleRad,
                g, d, f;
            this.preventPostTranslate = !0;
            b.call(this);
            if (a.isRadial)
                for (g = this.points, f = g.length; f--;) d = g[f], b = d.barX + e, d.shapeType = "path", d.shapeArgs = {
                    d: this.polarArc(d.yBottom, d.plotY, b, b + d.pointWidth)
                }, this.toXY(d), d.tooltipPos = [d.plotX, d.plotY], d.ttBelow = d.plotY > a.center[1]
        }), m(n, "alignDataLabel", function (a, c, l, g, d, f) {
            this.chart.polar ?
                (a = c.rectPlotX / Math.PI * 180, null === g.align && (g.align = 20 < a && 160 > a ? "left" : 200 < a && 340 > a ? "right" : "center"), null === g.verticalAlign && (g.verticalAlign = 45 > a || 315 < a ? "bottom" : 135 < a && 225 > a ? "top" : "middle"), e.alignDataLabel.call(this, c, l, g, d, f)) : a.call(this, c, l, g, d, f)
        }));
        m(k, "getCoordinates", function (a, c) {
            var b = this.chart,
                e = {
                    xAxis: [],
                    yAxis: []
                };
            b.polar ? v(b.axes, function (a) {
                var d = a.isXAxis,
                    g = a.center,
                    k = c.chartX - g[0] - b.plotLeft,
                    g = c.chartY - g[1] - b.plotTop;
                e[d ? "xAxis" : "yAxis"].push({
                    axis: a,
                    value: a.translate(d ? Math.PI -
                        Math.atan2(k, g) : Math.sqrt(Math.pow(k, 2) + Math.pow(g, 2)), !0)
                })
            }) : e = a.call(this, c);
            return e
        });
        m(a.Chart.prototype, "getAxes", function (b) {
            this.pane || (this.pane = []);
            v(a.splat(this.options.pane), function (b) {
                new a.Pane(b, this)
            }, this);
            b.call(this)
        });
        m(a.Chart.prototype, "drawChartBox", function (a) {
            a.call(this);
            v(this.pane, function (a) {
                a.render()
            })
        });
        m(a.Chart.prototype, "get", function (b, c) {
            return a.find(this.pane, function (a) {
                return a.options.id === c
            }) || b.call(this, c)
        })
    })(x)
    // window.Highcharts = a;
   
});