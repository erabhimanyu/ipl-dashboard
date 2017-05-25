<template>
	<div class="bat-visualization-wrapper">
    <img src="/images/batsman.png">
    <div id="chart">

    </div>
  </div>
</template>
<script>
	import seasonData from '../../data/seasons.json';
	const d3 = require("d3");

	var arr = Object.keys(seasonData[2008].teams).map(function(k) { 
		let data = seasonData[2008].teams[k] 
		data.name = k;
		return data;
	});
	console.log(arr);
	export default {
	mounted: function () {
    // `this` points to the vm instance
    var margin = {top: 10, right: 10, bottom: 10, left: 10};
    var props = {
	    width: 700 - margin.right,
	    height: 500 - margin.top - margin.bottom,
	    marginTop: margin.top,
	    marginBottom: margin.bottom,
	    marginRight: margin.right,
	    marginLeft: margin.left,
	    ballWidth: 50
    }

    var height = props.height;
    var width = props.width;

    var marginLeft = props.marginLeft;
    var marginRight = props.marginRight;
    var marginTop = props.marginTop;
    var marginBottom = props.marginBottom;

    var svg = d3.select(this.$el).append('svg')
    						.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    						.attr('width', width + marginRight + marginLeft + 130)
      					.attr('height', height + marginTop + marginBottom + 130)

    	//Define Scale
    	var xScale = d3.scaleLinear().domain([150, 400]).range([0, width+ marginRight]),
			yScale = d3.scaleLinear().domain([1000, 3500]).range([height, marginTop+marginBottom])

		//Axis
		var xAxis = d3.axisBottom().scale(xScale).ticks(12, d3.format(",d"))
    	var yAxis = d3.axisLeft().scale(yScale)

    	svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(40," + height + ")")
				.call(xAxis);

			 svg.append("g")
				.attr("class", "y axis")
				.attr("transform", "translate("+40+")")
				.call(yAxis);
    	

    	//Add ball
   		var ball = svg.append("g")
   			.attr("transform", "translate("+40+")")
   			.selectAll('image')
   			.data(arr)
   			.enter().append('image')
   			.attr("xlink:href",(d) => {
   				return "/images/ball.png"
   			})
    		.attr('x', (d, i) => { 
    			return xScale(Number(d.firstInnings.boundaries.no_of_six) + Number(d.firstInnings.boundaries.no_of_four) + Number(d.secondInnings.boundaries.no_of_six) + Number(d.secondInnings.boundaries.no_of_four))
    		})
    		.attr('y', d => yScale(d.firstInnings.runs + d.secondInnings.runs))
    		.attr('height', props.ballWidth)
    		.attr('width', props.ballWidth)


    	// Define the div for the tooltip
		var tip = d3.select("#chart").append("div")
					.attr('class', 'tooltip')
					.style('opacity', 0)
    	//Ball Click
    	ball.on('mouseover', function(d,i){ 
    		return tip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px")
    					.style("opacity", 0.9)
    					.text(d.name)
    	 })
    	ball.on('mouseout', function(d,i) {
    		return tip.style('opacity', 0)
    	})


    	//Label Text X-axis
 	   	svg.append("text")
				.attr("class", "x axis label")
				.attr("text-anchor", "end")
				.attr("x", width)
				.attr("y", height - 6)
				.text("No. of boundaries")

			//Label text Y-axis
			svg.append("text")
				.attr("class", "y axis label")
				.attr("text-anchor", "end")
				.attr("y", 25)
				.attr("dy", ".75em")
				.attr("transform", "translate(20) rotate(-90)")
				.text("Total runs scored");

			//Year Label
			var label = svg.append("text")
					    .attr("class", "year label")
					    .attr("text-anchor", "end")
					    .attr("y", height + 100)
					    .attr("x", width)
					    .text(2008);

	    //Year Label Text
			var labelText = svg.append("text")
	    .attr("class", "year label-text")
	    .attr("text-anchor", "end")
	    .attr("y", height + 130)
	    .attr("x", width)
	    .text("IPL Season");


	    var box = label.node().getBBox();

			var overlay = svg.append("rect")
				.attr("class", "overlay")
				.attr("x", box.x)
				.attr("y", box.y)
				.attr("width", box.width)
				.attr("height", box.height)
				.on("mouseover", enableInteraction);


			function enableInteraction() {

	    	var yearScale = d3.scaleLinear()
			    .domain([2008, 2016])
			    .range([box.x + 10, box.x + box.width - 10])
			    .clamp(true);

		    // Cancel the current transition, if any.
		    svg.transition().duration(0);

		    overlay
					.on("mouseover", mouseover)
					.on("mouseout", mouseout)
					.on("mousemove", mousemove)
					.on("touchmove", mousemove);

			    function mouseover() {
				label.classed("active", true);
			    }

			    function mouseout() {
				label.classed("active", false);
			    }

			    function mousemove() {
			    let currentYear = Math.round(yearScale.invert(d3.mouse(this)[0]));
				label.text(Math.round(currentYear));
				arr = Object.keys(seasonData[currentYear].teams).map(function(k) { 
					let data = seasonData[currentYear].teams[k] 
						data.name = k;
						return data;
				});
				ball.data(arr)
				.attr('x', (d, i) => { 
    			return xScale(Number(d.firstInnings.boundaries.no_of_six) + Number(d.firstInnings.boundaries.no_of_four) + Number(d.secondInnings.boundaries.no_of_six) + Number(d.secondInnings.boundaries.no_of_four))
    		})
    		.attr('y', d => yScale(d.firstInnings.runs + d.secondInnings.runs))
    		.attr('height', props.ballWidth)
    		.attr('width', props.ballWidth)

			    }
			}




  	}
	}
</script>
<style>
	.bat-visualization-wrapper {
		background-image: url('/images/patch.png');
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		min-width: 100%;
		min-height: 500px;
		display: flex;
		flex-direction: row;
    	align-items: flex-start;
    	margin-bottom: 30px;
    	margin-top: 20px;
    	
    	img {
    		zoom: 0.7;
    		padding-top: 200px;
    		padding-left: 50px;
    	}
	}

	.label {
    fill: #777;
	}

	.axis {
		font-size: 1.2rem !important;
	}

	.axis path, .axis line {
    fill: none;
    stroke: #616161;
    stroke-dasharray: 5;
    shape-rendering: crispEdges;
	}

	text {
    font: 10px sans-serif;
	}

	.year.label {
    font: 500 5rem "Helvetica Neue";
    fill: #bfbbbb;
	}

	.year.label-text {
    font: 500 2rem "Helvetica Neue";
    fill: #616161;
	}

	.year.label.active {
    fill: #616161;
	}

	.overlay {
    fill: none;
    pointer-events: all;
    cursor: ew-resize;
	}

	.tooltip {
    position: absolute;		
    text-align: center;
    z-index: 20;			
    width: 100px;					
    max-height: 50px;					
    padding: 2px;				
    font: 12px sans-serif;		
    background: lightsteelblue;	
    border: 0px;		
    border-radius: 8px;			
    pointer-events: none;			
	}

</style>