<template>
	<div class="main-wrapper">
		<ForkGithub></ForkGithub>
	  <HeaderElement></HeaderElement>
	  <div class="content-wrapper about-page">
	  <!-- Page content Goes here -->
	  		<p>The Indian Premier League (IPL, officially Vivo Indian Premier League for sponsorship reasons) is a professional Twenty20 cricket league in India contested during April and May of every year by teams representing Indian cities. The league was founded by the Board of Control for Cricket in India (BCCI), however Lalit Modi, the founder and former Commissioner, was the brainchild behind the birth of this league in 2007, which has now become a mammoth, money-spinning cricket venture. Vivo, the Chinese based smartphone multinational company, is serving as the title sponsor since the ninth season of the league. The current IPL title holder is the Mumbai Indians, who won by one run in a final against the Rising Pune Supergiants.
	  		<br>
	  		<br>
			The IPL is the most-attended cricket league in the world and ranks sixth among all sports leagues. In 2010, the IPL became the first sporting event in the world to be broadcast live on YouTube. The brand value of IPL was estimated to be US$4.5 billion in 2015 by American Appraisal, A Division of Duff & Phelps. According to BCCI, the 2015 IPL season contributed ₹11.5 billion (US$182 million) to the GDP of the Indian economy. Duff & Phelps added that the value of brand IPL has jumped to $4.16 billion after the 2016 edition, against $3.54 billion in 2015. The 19% jump is despite the fact that the US dollar to Indian rupee currency has depreciated by nearly 10%.
			</p>
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

<style>
	.about-page {
		width: 1000px !important;
		margin-top: 50px;
		display: flex;
		p {
			font-size: 1.5rem !important;
			text-align: left !important;
		}
	}
</style>