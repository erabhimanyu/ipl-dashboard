<template>
  <div class="page">
    <div class="main-wrapper">
    	<ForkGithub></ForkGithub>
    	<HeaderElement></HeaderElement>
    	<BatVisualization></BatVisualization>
      <Players></Players>
    	<TeamListing></TeamListing>
    	<div class="stadium"></div>
    	<FooterElement></FooterElement>
    </div>
  </div>
</template>

<script>
import HeaderElement from 'components/Header'
import ForkGithub from 'components/ForkGithub'
import BatVisualization from 'components/BatVisualization'
import TeamListing from 'components/TeamListing'
import FooterElement from 'components/Footer'
import Players from 'components/Players'


export default {
  components: {
    HeaderElement,
    ForkGithub,
    BatVisualization,
    Players,
    TeamListing,
    FooterElement
  }
}
</script>
<style>
	.stadium {
		background-image: url('/images/stadium.png');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		width: 100%;
		min-height: 600px;
	}
</style>
