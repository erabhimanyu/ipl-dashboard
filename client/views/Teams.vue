<template>
	<div class="main-wrapper">
	<ForkGithub></ForkGithub>
	  <HeaderElement></HeaderElement>
	  <div class="content-wrapper">
	  	<p>Disover Teams</p>
	  	<TeamListing></TeamListing>
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