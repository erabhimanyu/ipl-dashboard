<template>
  <div class="page">
    <div class="home-wrapper">
    	<ForkGithub></ForkGithub>
    	<Header></Header>
    	<img src="/images/stadium.png">
    	<div class="footer"></div>
    </div>
  </div>
</template>

<script>
import Counter from 'components/Counter'
import Header from 'components/Header'
import ForkGithub from 'components/ForkGithub'

export default {
  components: {
    Counter,
    Header,
    ForkGithub
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
</style>
