//define(['jquery', 'd3', 'legend', 'lodash'], function (jquery, d3, legend, _) {


    function showChart(data, datetype, minInDate, maxInDate, minCount, maxCount) {

        //minInDate = JSON.parse(minInDate);
        //maxInDate = JSON.parse(maxInDate);
        debugger;
        var margin = { top: 10, right: 5, bottom: 5, left: 5 },
            width = 900 - margin.left - margin.right,
            height = 675 - margin.top - margin.bottom;

        $("#lineChart").empty();

        var vis = d3.select("#lineChart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);


        var colors = [
            'steelblue',
            'green',
            'red',
            'purple'
        ];


        /*
         * SET the Y and X scale
         */
        //min to max date
        var xScale = d3.time.scale().domain([new Date(minInDate), new Date(maxInDate)]).rangeRound([0, width]);
        //min to max counts

        var yScale = d3.scale.linear().domain([parseInt(minCount.toString()), parseInt(maxCount.toString())]).range([height, 0]);


        var ticksX = data[1].data.length;
        ticksX = ticksX > 12 ? 12 : ticksX;

        debugger;
        //Create X Axis
        var xAxis;
        /*
         * Determine format based on the selected aggregation (day/week/month)
         */
        switch (datetype) {
            case "day":
                {
                    xAxis = d3.svg.axis()
                        .scale(xScale)
                        .ticks(ticksX)
                        .tickFormat(d3.time.format("%m/%d"))
                        .tickSize(-height)
                        .tickPadding(8)
                        .tickSubdivide(1)
                        .orient("bottom");
                    break;
                }
            
            case "month":
                {
                    xAxis = d3.svg.axis()
                        .scale(xScale)
                        .ticks(ticksX)
                        .tickFormat(d3.time.format("%m/%Y"))
                        .tickSize(-height)
                        .tickPadding(8)
                        .tickSubdivide(1)
                        .orient("bottom");
                }
        }


        //Create yAxis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .ticks(12)
            .orient("left");

        // create right yAxis
        var yAxisRight = d3.svg.axis().scale(yScale).ticks(12).orient("right");
        // add the tooltip area to the webpage
        var tooltip = d3.select("#lineChart").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);



        /*
         * X and Y sizing and Ticks
         */
        var svg = vis.append("svg")
            .attr("class", "line")
            .attr("width", width)
            .attr("height", height)
            .append("g");
           // .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height) + ")")
            .call(xAxis);
        /*
         * give y axis on both left and right
         */
        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (margin.left) + ",0)")
            .call(yAxis);

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (width + 10) + ",0)")
            .call(yAxisRight);


        /*
         * LINE DRAW
         * 
         */
        var line = d3.svg.line()
            .x(function (d) { return xScale(new Date(d.key)); })
            .y(function (d) { return yScale(d.value); })
            .interpolate("linear");

        //not stroke hard coded could be put in the incoming class...
        svg.append("path")
            .datum(data[0].data)
            .attr("class", "line")
            .attr("d", line)
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("fill", "none");

        //other data element
        svg.append("path")
            .datum(data[1].data)
            .attr("class", "line")
            .attr("d", line)
            .attr("stroke", "green")
            .attr("stroke-width", 3)
            .attr("fill", "none");


        //************************************************************
        // Draw points on SVG object based on the data given
        //************************************************************
        var points = svg.selectAll('.dots')
            .data(data)
            .enter()
            .append("g")
            .attr("class", "dots")
            .attr("clip-path", "url(#clip)");

        points.selectAll('.dot')
            .data(function (d, index) {
                var a = [];
                d.data.forEach(function (point, i) {
                    a.push({ 'index': index, 'point': point });
                });
                return a;
            })
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr("r", 2.5)
            .attr('fill', function (d, i) {
                return colors[d.index % colors.length];
            })
            .attr("transform", function (d) {
                return "translate(" + xScale(new Date(d.point.key)) + "," + yScale(d.point.value) + ")";
            })
            // Tooltip stuff after this
            .on("mouseover", function (d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 1);
                tooltip.html(
                        "<span>(" + d.point.key + "," + Math.round(d.point.value) + ")")
                    .style("left", (d3.event.x + 5) + "px")
                    .style("top", (d3.event.y - 28) + "px");
            })
        .on("mouseout", function (d) {
            tooltip.transition()
                 .duration(500)
                 .style("opacity", 0);
        });

        /*
         * LEGEND
         */

        // draw legend
        var legend = svg.selectAll(".legend")
            .data([data[0].label, data[1].label])
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

        // draw legend colored rectangles
        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function (d) { return d === "Ins" ? "black" : "green" });

        // draw legend text
        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .style("color", function (d) { return d === "Ins" ? "black" : "green" })
            .text(function (d) {
                return d;
            });


   

        // Add the text label for the X axis
        svg.append("text")
            .attr("transform",
                "translate(" + (width / 2) + " ," +
                (height + margin.bottom + 10) + ")")
            .style("text-anchor", "middle")
            .text("Date");


        // Add the text label for the Y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -10)
            .attr("x", margin.top - (height / 2))
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Counts");

    }
//});