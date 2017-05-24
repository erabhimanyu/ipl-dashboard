<template>
	<div class="main-wrapper">
		<ForkGithub></ForkGithub>
	  <HeaderElement></HeaderElement>
	  <div class="content-wrapper">
	  <!-- Page content Goes here -->
	  </div>
	  <FooterElement></FooterElement>
	</div>
</template>
<script>
import HeaderElement from 'components/Header'
import ForkGithub from 'components/ForkGithub'
import FooterElement from 'components/Footer'

export default {
  components: {
    HeaderElement,
    ForkGithub,
    FooterElement
  }
}
</script>