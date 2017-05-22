<template>
	<div class="header">
    			<div class="menu">
    				<router-link to="/" tag="span" exact>Home</router-link>
    				<router-link to="/paradise" tag="span">Whose Paradise?</router-link>
    				<router-link to="/team" tag="span">Teams</router-link>
    				<router-link to="/about" tag="span">About</router-link>
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
			margin-right: 50px;
			color: #616161;
			text-decoration: none;
			cursor: pointer;
			&:hover {
				background-image: url(/images/patch.png);
	   		background-size: contain;
	   		background-repeat: no-repeat;
	   		background-position: center;
			}
		}
		.router-link-active {
				background-image: url(/images/patch.png);
   			background-size: contain;
   			background-repeat: no-repeat;
   			background-position: center;
			}
	}
</style>