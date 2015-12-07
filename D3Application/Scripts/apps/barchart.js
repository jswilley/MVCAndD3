//define(['jquery', 'd3', 'legend', 'lodash'], function (jquery, d3, legend, _) {

    function showBarChart(data, datetype, minCount, maxCount) {

        var margin = { top: 10, right: 5, bottom: 5, left: 5 },
            width = 1000 - margin.left - margin.right,
            height = 650 - margin.top - margin.bottom;
        var numberWidth = 7;
        var labels = [];
        var spaceforXlabel = 20;
        $("#lineChart").empty();

        var vis = d3.select("#lineChart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);


        /*
             * SET the Y and X scale
             */
        //min to max date
        var xScale = d3.scale.ordinal()
            .domain(d3.range(data.length))
            .rangeRoundBands([0, width], 0.035);
        //min to max counts

        var yScale = d3.scale.linear().domain([parseInt(minCount.toString()), parseInt(maxCount.toString())]).range([height, 0]);


        var ticksX = data.length;
        if (ticksX <= 14) {
            _.forIn(data, function (value) {
                /////*
                //// * Determine format based on the selected aggregation (week/month)
                //// */
                if (datetype === "month")
                    labels.push(new moment(value.key).format('M/YY'));
                else {
                    labels.push(new moment(value.key).format('W/YY'));
                }
            });
        }


        ticksX = ticksX > 14 ? 14 : ticksX;

        ////Create X Axis
        var xAxis;

        xAxis = d3.svg.axis()
               .scale(xScale)
               .ticks(ticksX)
               .tickFormat(function (d) {
                   return labels[d];
               })
               .tickSize(0)
               .tickPadding(5)
               .orient("bottom");
            

        /*
             * X and Y sizing and Ticks
             */
        var svg = vis.append("svg")
            .attr("class", "chart")
            .attr("width", width)
            .attr("height", height + spaceforXlabel)
            .append("g");
            //.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


        // Graph Bars
        var sets = svg.selectAll(".set")
            .data(data)
            .enter().append("g")
            .attr("class", "set")
            .attr("transform", function (d, i) {
                return "translate(" + xScale(i) + ",0)";
            });
        //.on("mouseover", function(d, i) {
        //    //Get this bar's x/y values, then augment for the tooltip
        //    var xPosition = parseFloat(xScale(i) + xScale.rangeBand() / 6);
        //    var yPosition = 0;
        //    //Update Tooltip Position & value
        //    d3.select("#tooltip")
        //        .style("left", xPosition + "px")
        //        .style("top", yPosition + "px")
        //        .select("#In")
        //        .text(d.cpc);
        //    d3.select("#tooltip").classed("hidden", false);
        //})
        //.on("mouseout", function() {
        //    //Remove the tooltip
        //    d3.select("#tooltip").classed("hidden", true);
        //});
        sets.append("rect")
            .attr("class", "in")
            .attr("width", xScale.rangeBand() / 2)
            .attr("y", function (d) {
                return yScale(d.In);
            })
            .attr("height", function (d) {
                return height - yScale(d.In);
            })
            .attr("fill", "green");

        sets.append("rect")
            .attr("class", "out")
            .attr("width", xScale.rangeBand() / 2)
            .attr("y", function (d) {
                return yScale(d.out);
            })
            .attr("x", xScale.rangeBand() / 2)
            .attr("height", function (d) {
                return height - yScale(d.out);
            })
            .attr("fill", "black");


        sets.append("text")
            .attr("class", "in bar-text")
            .attr("y", function (d) {
                return yScale(d.In) + 15;
            })
            .attr("dy", 5)
            .attr("dx", (xScale.rangeBand() / 4) - numberWidth)
            .text(function (d) { return Math.round(d.In) });


        sets.append("text")
            .attr("class", "out bar-text")
            .attr("y", function (d) {
                return yScale(d.out) + 15; // +15
            })
             .attr("dy", 5)
            .attr("dx", xScale.rangeBand() - (xScale.rangeBand() / 4) - numberWidth)
            .text(function (d) { return Math.round(d.out) });



        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height) + ")")
        .call(xAxis)
        .selectAll("text")
    .attr("y", 6)
    .attr("x", 6);


        ///*
        // * LEGEND
        // */

        //// draw legend
        var legend = svg.selectAll(".legend")
            .data(["Ins", "Outs"])
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(0," + i * 7 + ")"; });

        //// draw legend colored rectangles
        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function (d) { return d === "Ins" ? "black" : "green" });

        //// draw legend text
        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .style("color", function (d) { return d === "Ins" ? "black" : "green" })
            .text(function (d) {
                return d;
            });




     
    }
//});