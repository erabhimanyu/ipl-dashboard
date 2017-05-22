<template>
  <div class="page">
    <div class="home-wrapper">
    	<ForkGithub></ForkGithub>
    	<HeaderElement></HeaderElement>
    	<BatVisualization></BatVisualization>
    	<TeamListing></TeamListing>
    	<div class="stadium"></div>
    	<div class="footer"></div>
    </div>
  </div>
</template>

<script>
import HeaderElement from 'components/Header'
import ForkGithub from 'components/ForkGithub'
import BatVisualization from 'components/BatVisualization'
import TeamListing from 'components/TeamListing'

export default {
  components: {
    HeaderElement,
    ForkGithub,
    BatVisualization,
    TeamListing
  }
}
</script>
<style>
	.home-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
	.stadium {
		background-image: url('/images/stadium.png');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		width: 100%;
		min-height: 600px;
	}
</style>
