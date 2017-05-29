<template>
	<div class="tooltip" :class="{ hide: !visible }" :style="{top: top + 'px', left: left + 'px'} "> 
        <slot name="content"></slot>
   </div>
</template>
<script>
  export default {
    props: ['top','left','visible'],
    mounted() {
      console.log(this.top)
    }
  }
</script>
<style>
	.tooltip {
    position: absolute;		
    text-align: center;
    z-index: 20;			
    width: 200px;					
    min-height: 100px;					
    padding: 2px;				
    font: 12px sans-serif;		
    background: white;	
    border: 0px;		
    border-radius: 8px;			
    pointer-events: none;		
    box-shadow: 5px 5px 2px #888888;
    padding: 10px;

    p {
    	color: #616161;
    	font-weight: 600;
    	font-size: 0.8rem;
    	font-style: MarkerFelt;
    	text-align: left;
    }
	}
	.tooltip span:before {
		content:' '; /* Must have content to display */
    position:absolute;
    top:20%;
    left:-16px; /* 2 x border width */
    width:0;
    height:0;
    margin-top:-8px; /* - border width */
    border:8px solid transparent;
    border-right-color:white;
	}
	.hide {
		display: none
	}
</style>
