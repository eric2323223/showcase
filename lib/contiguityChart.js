
D3contiguityChart = function (selection, opts) {
    //var margin = {top: 20, right: 20, bottom: 40, left: 40},
    //    width = 500,
    //    height = 500,
    //    gap = 0,
    //    ease = 'cubic-in-out';
    //var svg, duration = 500;
    //this.opts = opts;
    //this.sel = selection;
    var defaultOpt = {
        width :  600,
        height: 270
        , min  :  0
        , max  :  500
        , transitionDuration : 500
        , bandSpan: 180
        , label   :  ''
    };

    this.opts = {};

    this.opts.width = opts.width || defaultOpt.width;
    this.opts.height = opts.height || defaultOpt.height;


    this._render = function (data) {
        //this._initGauge();
        //this._drawLabel();

        var	margin = {top: 30, right: 20, bottom: 30, left: 50},
            width = this.opts.width - margin.left - margin.right,
            height = this.opts.height - margin.top - margin.bottom;

// Parse the date / time
        var	parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0],.1);

        var arrayUnique = function(a) {
            return a.reduce(function(p, c) {
                if (p.indexOf(c) < 0) p.push(c);
                return p;
            }, []);
        };

        var color = d3.scale.category10().domain(d3.range(0, arrayUnique(data).length));


        x.domain(d3.range(0, data.length));
        y.domain(d3.range(0, arrayUnique(data).length));

// Define the axes
        var	xAxis = d3.svg.axis().scale(x)
            .orient("bottom").ticks(5);

        var	yAxis = d3.svg.axis().scale(y)
            .orient("left").ticks(5);

// Define the line
        var	rects = d3.svg.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.close); });

// Adds the svg canvas
        var	svg = selection
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
            var states = [];

        for(var i=0; i<data.length; i++) {
            states.push({'state':data[i], 'index':i});
        }

            // Scale the range of the data
            //x.domain(d3.extent(data, function(d) { return d.date; }));
            //y.domain([0, d3.max(data, function(d) { return d.close; })]);

            // Add the valueline path.
            svg.selectAll('rect').data(data).enter().
                append("rect")
                .attr("x", function(d, i) { return x(i); })
                .attr("width", x.rangeBand())
                .attr("y", function(d) { return y(d); })
                .attr("height", y.rangeBand())
                .attr('style', function(d) {
                    return "fill:" + color(d);
                });

            // Add the X Axis
            //svg.append("g")
            //    .attr("class", "x axis")
            //    .attr("transform", "translate(0," + height + ")")
            //    .call(xAxis);
            //
            //// Add the Y Axis
            //svg.append("g")
            //    .attr("class", "y axis")
            //    .call(yAxis);



    }

    var exports = {}
    var me = this;

    exports.render = function (value) {
        me._render(value)

        //this._write(value)
        //console.log('move to ' + value)
    };

    //d3.rebind(exports, dispatch, 'on');
    return exports;
}
;
