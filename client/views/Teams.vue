<template>
	<div class="main-wrapper">
	<ForkGithub></ForkGithub>
	  <HeaderElement></HeaderElement>
	  <div class="content-wrapper">
	  	<p>Disover Teams</p>
	  	<div class="team-page-list-wrapper">
	  		<TeamListing></TeamListing>
	  	</div>
	  </div>
	  <FooterElement></FooterElement>
	</div>
</template>
<script>
import HeaderElement from 'components/Header'
import ForkGithub from 'components/ForkGithub'
import TeamListing from 'components/TeamListing'
import FooterElement from 'components/Footer'

export default {
  components: {
    HeaderElement,
    ForkGithub,
    TeamListing,
    FooterElement
  }
}
</script>

<style>
	.team-page-list-wrapper {
		display: flex;
		align-items: center;
		flex-direction: column;
	}
</style>