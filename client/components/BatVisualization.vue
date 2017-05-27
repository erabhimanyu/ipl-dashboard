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
	    		<transition-group name="list" tag="g">
	    		<image 	v-for="(value, key, index) in curretBallsData" 
	    						:xlink:href="value.src" :x="value.x" :y="value.y" 
	    						:height="ballWidth" 
	    						:width="ballWidth"
	    						:key="key"
	    						@mouseover="showToolTip(key, $event)"
	    						@mouseout="hideToolTip"
	    						>
	    		</image>
	    		</transition-group>
	    	</g>
	    	<text class="x axis label" text-anchor="end" :x="width" :y="height-6">Runs scored in boundaries</text>
	    	<text class="y axis label" text-anchor="end" y="25" dy=".75em" transform="translate(20) rotate(-90)">Total runs scored</text>
    	</svg>
    	<div class="display-year-container">
    		<div class="section">
    			<button type="button" :class="currentSelection === 'total' ? 'selected' : ''" @click="changeSelection('total')">
    			Total
    			</button>
    			<button type="button" :class="currentSelection === 'first' ? 'selected' : ''" @click="changeSelection('first')">
    			Bat First
    			</button>
    			<button type="button" :class="currentSelection === 'second' ? 'selected' : ''" @click="changeSelection('second')">
    			Chase
    			</button>
    		</div>
    		<span class="display-arrow" @click="changeYear('left')" :class="displayYear === 2008 ? 'disabled' : ''">
    			<i class="fa fa-angle-left" aria-hidden="true"></i>
    		</span>
    		<div class="display-year">
    			<span class="text">{{ displayYear }}</span>
    			<span class="sub-label">Select IPL Season</span>
    		</div>
    		<span class="display-arrow" @click="changeYear('right')" :class="displayYear === 2016 ? 'disabled' : ''">
    			<i class="fa fa-angle-right" aria-hidden="true" ></i>
    		</span>
    	</div>
    </div>
  </div>
</template>
<script>
	import seasonData from '../../data/seasons.json'
	//import D3
	import * as d3 from 'd3'
	import TWEEN from 'tween.js'
	import {teams} from '../Teams.js' 

	export default {

	data: function () {
		let margin = {top: 10, bottom: 10, right: 10, left: 10}
		let height = 500 - margin.top - margin.bottom;
		let ballWidth = 50
		let ballDefaultY= height - ballWidth/2
		let curretBallsData = this.makeDefaultBallData(0,ballDefaultY)
		return {
			//Later I can add this to props and use as reusable component
			margin: margin,
			width: 700 - margin.right,
			height: height,
			ballWidth: ballWidth,
			extraPadding: 50,
			xMin: 200,
			xMax: 2000,
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
			curretBallsData: curretBallsData,
			displayYear: 2008,
			tip: {
				visible: false,
				data: null,
				top: 0,
				left: 0
			},
			currentSelection: 'total',
			scale: {
				total: {
					xMin: 200,
					xMax: 2000,
					yMin: 1000,
					yMax: 3500
				},
				first: {
					xMin: 100,
					xMax: 1800,
					yMin: 500,
					yMax: 2000
				},
				second: {
					xMin: 200,
					xMax: 1800,
					yMin: 500,
					yMax: 2000
				}
			}
		}
	},
	methods: {
		makeDefaultBallData(x,y){
			let data = {};
			Object.keys(teams).forEach((key)=>{
				data[teams[key].fullName] = {
					x: x,
					y: y,
					src : teams[key].ballImageSrc
				}
			})
			return data
		},
		tween(newValue, oldValue) {
			var vm = this
      var animationFrame
      //stop previous tweens
      TWEEN.removeAll()
      function animate (time) {
        TWEEN.update(time)
        animationFrame = requestAnimationFrame(animate)
      }	

    	function createTween(key) {
	      	return new TWEEN.Tween({x: oldValue[key].x, y: oldValue[key].y})
	        								.easing(TWEEN.Easing.Cubic.Out)
	        								.to({x: newValue[key].x, y: newValue[key].y }, 500)
	        								.onUpdate(function () {
	         										 vm.curretBallsData[key].x = this.x
	          										vm.curretBallsData[key].y = this.y
	        								})
	        								.onComplete(function () {
	          									cancelAnimationFrame(animationFrame)
	        								})
    	}
    	//Create an array of tweens that needs to be started together
    	let tweens = [];
    	Object.keys(teams).forEach((key)=>{
    		let tempTween
    		tempTween = createTween(teams[key].fullName)
    		tweens.push(tempTween)
    	})
    	//Create an constructor tween to chain the rest
    	let TweenA = new TWEEN.Tween({x: 1})
    			.to({x:1},0)
    	//Chaining the tweens
    	TweenA.chain(...tweens)
    	//Start
    	TweenA.start()
      	
      animationFrame = requestAnimationFrame(animate)
    },
		addBalls(year, curretBallsData) {	
   			let vm = this
   			let data = JSON.parse(JSON.stringify(curretBallsData));
   			Object.keys(curretBallsData).forEach(function (key) {
				  // do something with obj
				  if(seasonData[year].teams[key]){
				  	data[key].x = vm.xScale(vm.calculateTotalBoundaries(seasonData[year].teams[key]));
				  	data[key].y = vm.yScale(vm.calculateTotalRuns(seasonData[year].teams[key]))-vm.ballWidth/2
				  } else {
				  	data[key].x = 0
				  	data[key].y = vm.height - vm.ballWidth/2
				  }
				});
				this.tween(data, this.curretBallsData)
		},
		translate(x,y){
			return 'translate('+x+','+y+')'
		},
		calculateTotalBoundaries(data) {
			let total;
			if(this.currentSelection === 'total') {
				total = Number(data.firstInnings.boundaries.total_runs) + Number(data.secondInnings.boundaries.total_runs)
			} else if (this.currentSelection === 'first') {
					total = Number(data.firstInnings.boundaries.total_runs) 
			} else if (this.currentSelection === 'second') {
					total = Number(data.secondInnings.boundaries.total_runs) 
			}

			return total
		},
		calculateTotalRuns(data) {
		let total;
			if(this.currentSelection === 'total') {
				total = Number(data.firstInnings.runs) + Number(data.secondInnings.runs)
			} else if (this.currentSelection === 'first') {
					total = Number(data.firstInnings.runs) 
			} else if (this.currentSelection === 'second') {
					total = Number(data.secondInnings.runs) 
			}
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
  	changeYear(type){
  		if(type === 'left' && this.displayYear > 2008) {
  			this.displayYear--
  		} else if(type== 'right' && this.displayYear < 2016){
  			this.displayYear ++
  		}
  		this.addBalls(this.displayYear, this.curretBallsData)
  	},
		displayYearChange(currentYear){
			this.displayYear = currentYear
		},
		changeSelection(type) {
			this.currentSelection = type
			this.xMin = this.scale[type].xMin
			this.yMin = this.scale[type].yMin
			this.xMax = this.scale[type].xMax
			this.yMax = this.scale[type].yMax
			this.defineScale()
			this.addBalls(this.displayYear, this.curretBallsData)
		},
		defineScale() {
			 let vueInstance = this,
    		margin = this.margin,
    		height = this.height,
    		width = this.width,
    		marginLeft = this.margin.left,
    		marginRight = this.margin.right,
    		marginTop = this.margin.top,
    		marginBottom = this.margin.bottom,
    		xTicks = this.xTicks,
    		xMin = this.xMin,
    		xMax = this.xMax,
    		yMin = this.yMin,
   			yMax = this.yMax,
   			seasonMin = this.seasonMin
			//Define Scale
	  	let xScale = d3.scaleLinear().domain([xMin, xMax]).range([0, width+ marginRight]),
					yScale = d3.scaleLinear().domain([yMin, yMax]).range([height, marginTop+marginBottom])
			//Save it to the state
			this.xScale = xScale;
			this.yScale = yScale;
			//Axis
			let xAxis = d3.axisBottom().scale(xScale).ticks(xTicks, d3.format(",d"))
	    let yAxis = d3.axisLeft().scale(yScale)

			//Set the axis
			xAxis(d3.select(this.$refs.xAxis));
			yAxis(d3.select(this.$refs.yAxis));
		}
	},
	mounted: function () {
  	//Call to define the scale
  	this.defineScale()
		//add the initial balls
		this.addBalls(this.seasonMin, this.curretBallsData)
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
	.list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
	}
	.display-year-container {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		font-style: MarkerFelt;
		margin-bottom: 50px;
			.display-year {
				width: 180px;
				height: 70px;
			}
			.display-year .text {
				color: #616161;
				padding: 10px;
				cursor: auto;
				font-size: 2em;
			}

			.display-year .sub-label {
				font-size: 0.6em;
			}

			.display-arrow {
				background-color: burlywood;
				width: 50px;
				height: 50px;
				font-size: 1.5em;
				text-align: center;
				border-radius: 35px;
				justify-content: center;
				cursor: pointer;
				margin-top: 15px;
					i {
						vertical-align: top;
						color: white;
					}
			}
			.disabled {
						background-color: gray !important;

					}
			.section {
				display: flex;
				flex-direction: row;
			}
			.section button {
			  margin: 20px;
			  cursor: pointer;
			  font-style: MarkereFelt;
			  font-size: 1.0rem;
			  padding: 10px;
			  min-width: 100px; 
			  display: block;
			  background-color: #009ac9;
			  border: 1px solid transparent;
			  color: #ffffff;
			  font-weight: 300;
			  -webkit-border-radius: 3px;
			  border-radius: 6px;
			  -webkit-transition: all 0.3s ease-in-out;
			  -moz-transition: all 0.3s ease-in-out;
			  transition: all 0.3s ease-in-out;
			}

			.section .selected {
				background-color: grey;
			}

	}
</style>