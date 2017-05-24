<template>
	<div class="bat-visualization-wrapper">
    <img src="/images/batsman.png">
    <div id="chart">

    </div>
  </div>
</template>
<script>
	const d3 = require("d3");
	const data = [0, 10, 10, 10, 20,90, 20, 40, 50];

	export default {
	mounted: function () {
    // `this` points to the vm instance
    var margin = {top: 10, right: 10, bottom: 10, left: 10};
    var props = {
	    width: 600 - margin.right,
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
    	var xScale = d3.scaleLinear().domain([0, 1000]).range([0, width+ marginRight]),
			yScale = d3.scaleLinear().domain([0, 100]).range([height, marginTop+marginBottom])

			//Axis
			var xAxis = d3.axisBottom().scale(xScale).ticks(12, d3.format(",d"))
    	var yAxis = d3.axisLeft().scale(yScale)

    	svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(20," + height + ")")
				.call(xAxis);

			 svg.append("g")
				.attr("class", "y axis")
				.attr("transform", "translate("+20+")")
				.call(yAxis);
    	

    	//Add ball
   		var ball = svg.append("g")
   			.selectAll('image')
   			.data(data)
   			.enter().append('image')
   			.attr("xlink:href","/images/ball.png")
    		.attr('x', (d, i) => (i+1) * 60 -(props.ballWidth/2) + 20)
    		.attr('y', d => height - (d*4.6) - (props.ballWidth/2))
    		.attr('height', props.ballWidth)
    		.attr('width', props.ballWidth)

    	ball.on('click', function(d,i){ console.log('you have clicked me') })


    	svg.append("text")
				.attr("class", "x label")
				.attr("text-anchor", "end")
				.attr("x", width)
				.attr("y", height - 6)
				.text("Runs scored through boundaries")

			svg.append("text")
				.attr("class", "y label")
				.attr("text-anchor", "end")
				.attr("y", 25)
				.attr("dy", ".75em")
				.attr("transform", "rotate(-90)")
				.text("Total runs scored");

			var label = svg.append("text")
	    .attr("class", "year label")
	    .attr("text-anchor", "end")
	    .attr("y", height + 100)
	    .attr("x", width-200)
	    .text(2008);


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
    	
    	img {
    		zoom: 0.7;
    		padding-top: 200px;
    		padding-left: 50px;
    	}
	}

	.label {
    fill: #777;
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
    fill: #ddd;
	}

	.year.label.active {
    fill: #616161;
	}

</style>