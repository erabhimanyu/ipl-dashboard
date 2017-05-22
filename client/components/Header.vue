<template>
	<div class="header">
    			<div class="menu">
    				<span>Home</span>
    				<span>Whose Paradise?</span>
    				<span>Teams</span>
    				<span>About</span>
    			</div>
    	</div>
</template>


<style>
	.header {
		display: flex;
	}
	.header .menu {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		margin-top: 20px;
		span {
			padding: 30px;
			font-family: MarkerFelt;
			margin-right: 100px;
			color: #616161;
			cursor: pointer;
		}
		span:hover {
			background-image: url(/images/patch.png);
   		background-size: contain;
   		background-repeat: no-repeat;
   		background-position: center;
		}
	}
</style>