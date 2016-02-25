D3gauge = function (selection, opts) {
    //var margin = {top: 20, right: 20, bottom: 40, left: 40},
    //    width = 500,
    //    height = 500,
    //    gap = 0,
    //    ease = 'cubic-in-out';
    //var svg, duration = 500;
    //this.opts = opts;
    //this.sel = selection;
    var defaultOpt = {
        size :  40
        , min  :  0
        , max  :  500
        , transitionDuration : 500
        , bandSpan: 180
        , label   :  ''
        , zones: [
            { clazz: 'green-zone', from: 0, to: 300 },
            { clazz: 'yellow-zone', from: 300, to: 400 },
            { clazz: 'red-zone', from: 400, to: 500 }
        ]
    };

    var dispatch = d3.dispatch('customHover');
    //function exports(_selection, _opts) {
    //if (!(this instanceof Gauge)) return new Gauge(_selection, opts);

    this ._el = selection;
    this._gauge = {};

    //this._opts = xtend(defaultOpts, opts);
    this._opts = opts?opts : defaultOpt;

    this._size = this._opts.size;
    this._radius = this._size * 0.9 / 2;

    this._needleLength = this._radius*1.1;
    this._needleWidth = this._needleLength/18;

    this._cx = this._size / 2;
    this._cy = this._cx;

    this._x = 0;
    this._y = 0;

    this._preserveAspectRatio = this._opts.preserveAspectRatio;

    this._min = this._opts.min;
    this._max = this._opts.max;
    this._range = this._max - this._min;

    this._transitionDuration = this._opts.transitionDuration;
    this._label = this._opts.label || '';

    this._zones = this._opts.zones || defaultOpt.zones;

    this._clazz = this._opts.clazz;

    //this._initZones = function () {
    //    var self = this;
    //
    //    function percentToVal(percent) {
    //        return self._min + self._range * percent;
    //    }
    //
    //    function initZone(zone) {
    //        return {
    //            clazz: zone.clazz
    //            , from: percentToVal(zone.from)
    //            , to: percentToVal(zone.to)
    //        }
    //    }
    //
    //    // create new zones to not mess with the passed in args
    //    this._zones = this._zones.map(initZone);
    //}

    this._render = function () {
        this._initGauge();
        this._drawLabel();
    }

    this._initGauge = function () {
        //this._gauge = d3.select(this._el)
        this._gauge = this._el
            .append('svg:svg')
            .attr('class', 'd3-gauge' + (this._clazz ? ' ' + this._clazz : ''))
            .attr('x', this._x)
            .attr('y', this._y)
            .attr('width', this._size)
            .attr('height', this._size)
            .attr('viewBox', '0 0 ' + this._size + ' ' + this._size)
            .attr('preserveAspectRatio', this._preserveAspectRatio || 'xMinYMin meet')
        this._drawBand(this._gauge, this._min, this._max, 'band-background')
        this._init();
    }

    this._drawLabel = function (value) {
        var me = this;
        if (typeof this._label === undefined) return;

        var fontSize = Math.round(this._size / 5);

        this._gauge.select('.moving')
            .append('svg:text')
            .attr('class', 'label')
            .attr('x', this._cx)
            .attr('y', this._cy + 2* fontSize)
            //.attr('dy', fontSize)
            .attr('text-anchor', 'middle')
            .style("font-size", fontSize+'px')
            .text(this._label + ' ' + value)
    }

    //this._fontSize = function() {
    //    var box = this.parentNode.getBBox();
    //    var x = ~~(Math.min(box.height, box.width)/5)
    //    return x + 'px';
    //};

    this._drawBand = function (el, start, end, clazz) {
        var self = this;

        function transform() {
            return 'translate(' + self._cx + ', ' + self._cy + ') rotate(270)';
        }

        var arc = d3.svg.arc()
                .startAngle(this._toRadians(start))
                .endAngle(this._toRadians(end))
                //.startAngle(0)
                //.endAngle(Math.PI)
                .innerRadius(0.5 * this._radius)
                .outerRadius( this._radius)
            ;

        el.append('svg:path')
            .attr('class', clazz)
            .attr('d', arc)
            .attr('transform', transform)
    }

    this._init = function() {
        this._gauge.append('circle').attr('class','needle-center')
            .attr('cx',this._cx)
            .attr('cy',this._cy)
            .attr('r',this._needleWidth);
        this._gauge.append('g').attr('class','moving').append('path').attr('class', 'needle').attr('d', this._buildNeedlePath(0));
    };

    this._moveNeedle = function(value) {
        this._gauge.selectAll('.moving path').remove();
        this._gauge.selectAll('.moving text').remove();

        var klass;
        for(var i=0;i<this._zones.length;i++) {
            if(value<this._zones[i].to && value>=this._zones[i].from) {
                klass = this._zones[i].clazz
            }
        }
        this._drawBand(this._gauge.select('.moving'), this._min, value, klass);
        this._drawNeedle(this._gauge.select('.moving'), value)
        //this._gauge.select('.moving').append('path').attr('class', 'needle').attr('d', this._buildNeedlePath(value));
        this._drawLabel(value)
    };

    this._drawNeedle = function(el, value) {
        el.append('path').attr('class', 'needle').attr('d', this._buildNeedlePath(value));
    };

    this._buildNeedlePath = function(value) {
        var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY, perc;
        perc = value/this._max;
        thetaRad = perc *Math.PI;
        //thetaRad = ((perc / 2)*360)*Math.PI/180;
        centerX = 0;
        centerY = 0;
        topX = centerX - this._needleLength * Math.cos(thetaRad) + this._cx;
        topY = centerY - this._needleLength * Math.sin(thetaRad) + this._cy;
        leftX = centerX - this._needleWidth * Math.cos(thetaRad - Math.PI / 2) + this._cx;
        leftY = centerY - this._needleWidth * Math.sin(thetaRad - Math.PI / 2) + this._cy;
        rightX = centerX - this._needleWidth * Math.cos(thetaRad + Math.PI / 2) + this._cx;
        rightY = centerY - this._needleWidth * Math.sin(thetaRad + Math.PI / 2) + this._cy;
        return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
    };

    this._write = function(value) {
        this._moveNeedle(value);
    };

    this._toDegrees = function(value) {
        return value / this._range * 180 - (this._min / this._range * 180);
    };

    this._toRadians = function (value) {
        return this._toDegrees(value) * Math.PI / 180;
    };

    this._toPoint = function (value, factor) {
        var len = this._radius * factor;
        var inRadians = this._toRadians(value);
        return {
            x: this._cx - len * Math.cos(inRadians),
            y: this._cy - len * Math.sin(inRadians)
        };
    };

    //this._initZones();
    this._render();
    //return this;

    var exports = {}
    exports.host = this;

    exports.label = function(l) {
        this.host._label = l;

    };

    exports.watch = function(source, callback) {
        source.addSubscriber(this);

    };

    exports.x = function(value) {
        this.host._x = value;
    };

    exports.y = function(v) {
        this.host._y = v;
    };

    exports.height = function(v) {
        this.host._height = v;
    };

    exports.width = function(v) {
        this.host._width = v;
    };

    exports.equipment = function() {
        this.host._el.node().parentNode.parentNode;
    };

    exports.write = function (value) {
        this.host._write(value)

        //this._write(value)
        //console.log('move to ' + value)
    };

    d3.rebind(exports, dispatch, 'on');
    return exports;
}
;

/**
 * Created by eric on 4/30/2015.
 */
