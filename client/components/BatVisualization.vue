<template>
	<div class="bat-visualization-wrapper">
    <img src="/images/batsman.png">
   </div>
</template>
<style>
	.bat-visualization-wrapper {
		background-image: url('/images/patch.png');
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		min-width: 100%;
		min-height: 500px;
		display: flex;
		flex-direction: column;
    align-items: flex-start;
    	
    	img {
    		zoom: 0.7;
    		padding: 200px;
    	}
	}
</style>