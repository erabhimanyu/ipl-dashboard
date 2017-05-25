<template>
	<div class="bat-visualization-wrapper">
    <img src="/images/batsman.png">
    <div id="chart">
    </div>
  </div>
</template>
<script>
	import seasonData from '../../data/seasons.json'
	//import D3
	const d3 = require("d3")

	export default {

	data: function () {
		let margin = {top: 10, bottom: 10, right: 10, left: 10}
		return {
			//Later I can add this to props and use as reusable component
			margin: margin,
			width: 700 - margin.right,
			height: 500 - margin.top - margin.bottom,
			ballWidth: 50,
			extraPadding: 130,
			xMin: 150,
			xMax: 400,
			yMin: 1000,
			yMax: 3500,
			xTicks: 12,
			seasonMin: 2008,
			seasonMax: 2016
		}
	},
	methods: {
		getDataTeamWise(year) {
			let data
			data = Object.keys(seasonData[year].teams).map(function(k) {
				let temp = seasonData[year].teams[k]
				temp.name = k
				return temp
			})
			return data
		},
		calculateTotalBoundaries(data) {
			let total = Number(data.firstInnings.boundaries.no_of_six) 
								+ Number(data.firstInnings.boundaries.no_of_four) 
								+ Number(data.secondInnings.boundaries.no_of_six) 
								+ Number(data.secondInnings.boundaries.no_of_four)
			return total
		},
		calculateTotalRuns(data) {
			let total = data.firstInnings.runs 
								+ data.secondInnings.runs
			return total
		},
		positionBalls(ball, xScale, yScale) {	 		
	 			return ball.attr('x', (d, i) => xScale(this.calculateTotalBoundaries(d)))
						.attr('y', d => yScale(this.calculateTotalRuns(d)))
  	},
  	styleBall(ball,ballWidth){
  		return ball.attr('height', ballWidth)
  				.attr('width', ballWidth)
  	},
  	showToolTip(tip,d){
			return tip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px")
					.style("opacity", 0.9)
					.text(d.name)
  	},
  	hideToolTip(tip,d){
  		return tip.style('opacity', 0)
  	},
  	enableInteraction(ball,label,box,svg,overlay,xScale,yScale) {
  		let vueInstance = this
    	let yearScale = d3.scaleLinear()
		    .domain([this.seasonMin, this.seasonMax])
		    .range([box.x + 10, box.x + box.width - 10])
		    .clamp(true)

	    // Cancel the current transition, if any.
	    svg.transition().duration(0)

	    overlay
				.on("mouseover", mouseover)
				.on("mouseout", mouseout)
				.on("mousemove", mousemove)
				.on("touchmove", mousemove)

		    function mouseover() {
			label.classed("active", true)
		    }

		    function mouseout() {
			label.classed("active", false)
		    }

		    function mousemove() {
		    let currentYear = Math.round(yearScale.invert(d3.mouse(this)[0]));
				label.text(Math.round(currentYear))
				ball.data(vueInstance.getDataTeamWise(currentYear))
    		//vueInstance.styleBall(ball, ballWidth)
    		vueInstance.positionBalls(ball,xScale,yScale)

		    }
			}
	},
	mounted: function () {
    // `this` points to the vm instance
    let vueInstance = this,
    		margin = this.margin,
    		height = this.height,
    		width = this.width,
    		ballWidth = this.ballWidth,
    		marginLeft = this.margin.left,
    		marginRight = this.margin.right,
    		marginTop = this.margin.top,
    		marginBottom = this.margin.bottom,
    		extraPadding = this.extraPadding,
    		xTicks = this.xTicks,
    		xMin = this.xMin,
    		xMax = this.xMax,
    		yMin = this.yMin,
   			yMax = this.yMax,
   			seasonMin = this.seasonMin,
   			seasonMax = this.seasonMax

   	//Define SVG element
    let svg = d3.select(this.$el).append('svg')
    						.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    						.attr('width', width + marginRight + marginLeft + extraPadding)
      					.attr('height', height + marginTop + marginBottom + extraPadding)

  	//Define Scale
  	let xScale = d3.scaleLinear().domain([xMin, xMax]).range([0, width+ marginRight]),
				yScale = d3.scaleLinear().domain([yMin, yMax]).range([height, marginTop+marginBottom])

		//Axis
		let xAxis = d3.axisBottom().scale(xScale).ticks(xTicks, d3.format(",d"))
    let yAxis = d3.axisLeft().scale(yScale)

    //Add x-axis
  	svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(40," + height + ")")
			.call(xAxis);

		//Add y-axis
		 svg.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate("+40+")")
			.call(yAxis);
    	

  	//Add ball
 		let ball = svg.append("g")
 			.attr("transform", "translate("+40+")")
 			.selectAll('image')
 			.data(this.getDataTeamWise(2008))
 			.enter().append('image')
 			.attr("xlink:href",(d) => "/images/ball.png")

 		//Style Ball
 		this.styleBall(ball,ballWidth)

  	//Position the ball
  	this.positionBalls(ball,xScale,yScale)

    // Define the div for the tooltip
		let tip = d3.select("#chart").append("div")
								.attr('class', 'tooltip')
								.style('opacity', 0)

  	//Ball hover - show tooltip
  	ball.on('mouseover', (d,i) => {vueInstance.showToolTip(tip,d)})
  	//Ball mouseout - hide tooltip
  	ball.on('mouseout', (d,i) => {vueInstance.hideToolTip(tip,d)})


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
			.text("Total runs scored")

		//Year Label
		let label = svg.append("text")
				    .attr("class", "year label")
				    .attr("text-anchor", "end")
				    .attr("y", height + 100)
				    .attr("x", width)
				    .text(seasonMin);

    //Year Label Text to show year info
		let labelText = svg.append("text")
									    .attr("class", "year label-text")
									    .attr("text-anchor", "end")
									    .attr("y", height + 130)
									    .attr("x", width)
									    .text("IPL Season")

		//Get the box outside Label
    let box = label.node().getBBox()

    //Add overlay over the label
		let overlay = svg.append("rect")
										.attr("class", "overlay")
										.attr("x", box.x)
										.attr("y", box.y)
										.attr("width", box.width)
										.attr("height", box.height)
										.on("mouseover", ()=>this.enableInteraction(ball,label, box,svg,overlay,xScale,yScale));

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