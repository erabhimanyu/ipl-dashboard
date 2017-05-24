<template>
	<div class="main-wrapper">
		<ForkGithub></ForkGithub>
	  <HeaderElement></HeaderElement>
	  <div class="content-wrapper">
	  	<p>{{ data.fullName }}</p>
	  	<div class="team-info-wrapper">
	  		<span>
	  			<img v-bind:src="imgLink">
	  		</span>
	  		<p>
	  			Team content to be added soon
	  		</p>
	  	</div>
	  </div>
	  <FooterElement></FooterElement>
	</div>
</template>
<script>
import HeaderElement from 'components/Header'
import ForkGithub from 'components/ForkGithub'
import FooterElement from 'components/Footer'
import {teams} from '../Config.js'

export default {
  components: {
    HeaderElement,
    ForkGithub,
    FooterElement
  },
  data: function() {
  	return {data: teams[this.$route.params.teamName]}
  },
  computed: {
  	imgLink: function() {
  		return this.data.imageSrc
  	},
  	teamName: function() {
  		return this.data.name
  	}
  }
}
</script>

<style>
	.team-info-wrapper {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		margin-left: 300px;
		span {
			width: 160px;
			height: 110px;
			background-color: rgba(128, 128, 128, 0.28);
			text-align: center;
			padding-top: 10px; 
			border-radius: 8px;
		}
		img {
			max-width: 150px;
			max-height: 100px;
		}
		p {
			padding: 10px;
			font-size: 1.5rem !important;
		}
	}
</style>