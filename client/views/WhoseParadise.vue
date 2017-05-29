<template>
	<div class="main-wrapper">
		<ForkGithub></ForkGithub>
	  <HeaderElement></HeaderElement>
	  <div id="test" class="content-wrapper">
	  <!-- Page content goes here -->
	  	<Tooltip :top='tip.top' :left='tip.left' :visible='tip.visible'>
	    	<span slot="content">    		
	    		<p>This represents stadium. Dynamic content yet to be added</p>
	    	</span>
	    </Tooltip>
	  	<div class="map-container">
	  		<p>This feature yet to be build.This maps the balling/batting friendly picthes.</p>
	  		<India></India>
	  	</div>
	  </div>
	  <FooterElement></FooterElement>
	</div>
</template>
<script>
import HeaderElement from 'components/Header'
import ForkGithub from 'components/ForkGithub'
import FooterElement from 'components/Footer'
import India from 'components/Map'
import Tooltip from 'components/Tooltip'
import * as d3 from 'd3'

export default {
  components: {
    HeaderElement,
    ForkGithub,
    FooterElement,
    India,
    Tooltip
  },
  data: function() {
  	return {
	  	tip: {
	  		visible: false,
	  		top: 0,
	  		left: 0,
	  		data: null
  		}
  	}
  },
  methods: {
  	ballForState(stateId,type) {
  		let link
  		if(type === 'bat') {
  			link = '/images/bat.png'
  		} else {
  			link = '/images/ball.png'
  		}
  		let b = d3.select('#'+stateId).node().getBBox()
  		let ball = d3.select('#map').append('image')
  		ball.attr("transform", "translate("+((b.x + b.width/2)-25)+ "," + (b.y+ b.height/2)+ ")")
  		ball.attr("xlink:href", link)
  		ball.attr("height", '50')
  		ball.attr('width', '50')
  		ball.on('mouseover', this.showTooltip)
  		ball.on('mouseout', this.hideTooltip)
  	},
  	showTooltip() {
  		//console.log(d3.mouse(this))
  		this.tip.visible = true
		this.tip.top = event.pageY+15
		this.tip.left = event.pageX+15
  	},
  	hideTooltip() {
  		this.tip.visible = false
  	}
  },
  mounted() {
  	//Todo
  	//Add all stadiums
  	//Break into components
  	//Make it vueish way
  	//Add dynamic data
  	this.ballForState('IN-MH','ball')
  	this.ballForState('IN-DL', 'bat')
  }
}
</script>
<style>
	.map-container {
		display: flex;
		align-items: center;
		flex-direction: column;
		svg {
			height: 1000px;
			width: 600px;
		}
		path:hover {
			fill: black;
		}
		p {
			font-size: 1rem !important;
		}
	}
	.land
		{
			fill: #CCCCCC;
			fill-opacity: 1;
			stroke:white;
			stroke-opacity: 1;
			stroke-width:0.5;
		}
	
</style>