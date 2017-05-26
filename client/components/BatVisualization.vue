<template>
	<div class="bat-visualization-wrapper">
    <img src="/images/batsman.png">
    <div id="chart">
    <div class="tooltip" :class="{ hide: !tip.visible }" :style="{top: tip.top + 'px', left: tip.left + 'px'} ">
    		<p>{{tip.data}}</p>
    </div>
    	<svg :height="height+extraPadding" :width="width+extraPadding" ref="containerSvg">
	    	<g class="x axis" id="" ref="xAxis" :transform="translate(40,height)"></g>
	    	<g class="y axis" ref="yAxis" :transform="translate(40,0)"></g>
	    	<g class="balls" ref="balls" v-bind:transform="translate(40,0)">
	    		<image 	v-for="d in curretBallsData" 
	    						:href="d.src" :x="d.x" :y="d.y" 
	    						:height="ballWidth" 
	    						:width="ballWidth"
	    						@mouseover="showToolTip(d.name, $event)"
	    						@mouseout="hideToolTip"
	    						>
	    		</image>
	    	</g>
	    	<text class="x axis label" text-anchor="end" :x="width" :y="height-6">Runs scored in boundaries</text>
	    	<text class="y axis label" text-anchor="end" y="25" dy=".75em" transform="translate(20) rotate(-90)">Total runs scored</text>
	    	<text class="year label"
	    				ref="label"
	    				text-anchor="end" 
	    				:y="height+100" 
	    				:x="width">
	    				{{ displayYear }}
	    	</text>
	    	<text class="year label-text" text-anchor="end" :y="height+130" :x="width">IPL Season</text>
	    	<rect @mouseover="enableInteraction" 
	    				class="overlay" 
	    				:x="overlay.x" 
	    				:y="overlay.y" 
	    				:width="overlay.width"
	    				ref="overlay"
	    				:height="overlay.height"
	    				>
	    	</rect>
    	</svg>
    </div>
  </div>
</template>
<script>
	import seasonData from '../../data/seasons.json'
	//import D3
	import * as d3 from 'd3'

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
			xMin: 200,
			xMax: 1800,
			yMin: 1000,
			yMax: 3500,
			xTicks: 12,
			seasonMin: 2008,
			seasonMax: 2016,
			overlay: {
				height: 0,
				width: 0,
				x: 0,
				y: 0
			},
			xScale: null,
			yScale: null,
			curretBallsData: [],
			displayYear: 2008,
			tip: {
				visible: false,
				data: null,
				top: 0,
				left: 0
			}
		}
	},
	methods: {
		addBalls(year) {			
			let data = [];
			this.getDataTeamWise(year).map((d)=> {
				data.push({
					x: this.xScale(this.calculateTotalBoundaries(d)), 
					y: this.yScale(this.calculateTotalRuns(d)), 
					src:'/images/ball.png',
					name: d.name
				})
				}
			)
			this.curretBallsData = data;
		},
		translate(x,y){
			return 'translate('+x+','+y+')'
		},
		interpolateData(event){
			let currentYear = 2015;
			//console.log(Math.round(this.yearScale.invert(d3.mouse(d3.select(this.$el).node()))))
		    //vueInstance.displayYear(currentYear,label,ball,xScale,yScale);
		   this.addBalls(currentYear);
		},
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
			let total = Number(data.firstInnings.boundaries.total_runs) 
							
			return total
		},
		calculateTotalRuns(data) {
			let total = data.firstInnings.runs 
								+ data.secondInnings.runs
			return total
		},
  	showToolTip(d,event){
			this.tip.data = d
			//this.
			this.tip.visible = true
			this.tip.top = event.pageY+15
			this.tip.left = event.pageX+15
  	},
  	hideToolTip(tip,d){
  		this.tip.visible = false
  		this.tip.data = null
  	},
  	enableInteraction(ball,label,box,svg,overlay,xScale,yScale) {

  		let vueInstance = this
    	let yearScale = d3.scaleLinear()
		    .domain([this.seasonMin, this.seasonMax])
		    .range([this.overlay.x+ 10, this.overlay.x + this.overlay.width - 10])
		    .clamp(true)
	    // Cancel the current transition, if any.
	    //svg.transition().duration(0)

	    d3.select(this.$refs.overlay)
				.on("mouseover", mouseover)
				.on("mouseout", mouseout)
				.on("mousemove", mousemove)
				.on("touchmove", mousemove)

		    function mouseover() {
					//Make label active
		    }

		    function mouseout() {
					//Make label deactive
		    }

		    function mousemove() {
		    let currentYear = Math.round(yearScale.invert(d3.mouse(this)[0]))
		    //vueInstance.displayYear(currentYear,label,ball,xScale,yScale);
		    	vueInstance.addBalls(currentYear);
		    	vueInstance.displayYearChange(currentYear);
		    }
			},
			displayYearChange(currentYear){
				this.displayYear = currentYear;
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


  	//Define Scale
  	let xScale = d3.scaleLinear().domain([xMin, xMax]).range([0, width+ marginRight]),
				yScale = d3.scaleLinear().domain([yMin, yMax]).range([height, marginTop+marginBottom])
		//Save it to the state
		this.xScale = xScale;
		this.yScale = yScale;
		//Axis
		let xAxis = d3.axisBottom().scale(xScale).ticks(xTicks, d3.format(",d"))
    let yAxis = d3.axisLeft().scale(yScale)
		//New start
		//Set the scale
		xAxis(d3.select(this.$refs.xAxis));
		yAxis(d3.select(this.$refs.yAxis));
		//add the initial balls
		this.addBalls(2008);
		//Set the overlay
    this.overlay = d3.select(this.$refs.label).node().getBBox()
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
	.hide {
		display: none
	}
</style>