<template>
  <div class="team-listing-wrapper">
    <div class="team-list">
      <span @click="goto('/team/KKR')"><img v-bind:src="KKR.imageSrc"></span>
      <span @click="goto('/team/CSK')"><img v-bind:src="CSK.imageSrc"></span>
      <span @click="goto('/team/DDD')"><img v-bind:src="DDD.imageSrc"></span>
      <span @click="goto('/team/HSR')"><img v-bind:src="HSR.imageSrc"></span>
      <span @click="goto('/team/RR')"><img v-bind:src="RR.imageSrc"></span>
      <span @click="goto('/team/RC')"><img v-bind:src="RC.imageSrc"></span>
      <span @click="goto('/team/MI')"><img v-bind:src="MI.imageSrc"></span>
    </div>
    <div class="team-list">
      <span @click="goto('/team/KEP')"><img src="/images/teams/KEP.png"></span>
      <span @click="goto('/team/DC')"><img src="/images/teams/DC.png"></span>
      <span @click="goto('/team/PWI')"><img src="/images/teams/PWI.png"></span>
      <div class="ipl-image">
        <img src="/images/ipl.jpg">
      </div>
      <span @click="goto('/team/RP')"><img src="/images/teams/RP.png"></span>
      <span @click="goto('/team/GL')"><img src="/images/teams/GL.png"></span>
      <span @click="goto('/team/KT')"><img src="/images/teams/KT.png"></span>
    </div>
  </div>
</template>

<script>
  import { teams } from '../Config.js'
  export default {
    data: function() {
      return {...teams}
    },
    methods: {
      goto: function(m){
        this.$router.push(m)
      }
    },
    computed: {
      imgLink: function(teamName) {
        return teams['KKR']
      }
    } 
  }
</script>

<style>
  .team-listing-wrapper {
    flex-direction: column;
    flex-wrap: wrap;
  }
  .team-list {
    display: flex;
    flex-direction: row;
    span {
      padding: 20px;
      width: 110px;
      height: 100px;
      cursor: pointer;
      text-align: center;
      &:hover {
        background: #dee5ea;
        border-radius: 8px;
      }
    }
    img {
      max-width: 100px;
      max-height: 100px;
    }

  .ipl-image {
    cursor: auto !important;
    padding: 20px;
    width: 100px;
    height: 100px;
    &:hover {
      border-radius: 0px;
    }
  }

  }

</style>