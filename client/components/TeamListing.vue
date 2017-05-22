<template>
  <div class="team-listing-wrapper">
    <div class="team-list">
      <span><img src="/images/teams/kkr.jpg"></span>
      <span><img src="/images/teams/chennai_super_king.png"></span>
      <span><img src="/images/teams/delhi_daredevils.png"></span>
      <span><img src="/images/teams/hyderabad_sunrisers.png"></span>
      <span><img src="/images/teams/rajasthan_royals.png"></span>
      <span><img src="/images/teams/royal_challengers.png"></span>
      <span><img src="/images/teams/mumbai_indians.jpg"></span>
    </div>
    <div class="team-list">
        <span><img src="/images/teams/kings_11_punjab.png"></span>
        <span><img src="/images/teams/deccan_chargers.png"></span>
        <span><img src="/images/teams/pune_warriors_india.png"></span>
        <div class="ipl-image">
            <img src="/images/ipl.jpg">
        </div>
        <span><img src="/images/teams/rising_pune.png"></span>
        <span><img src="/images/teams/Gujarat_Lions.png"></span>
        <span><img src="/images/teams/kochi_tuskers.png"></span>
    </div>
  </div>
</template>
<style>
  .team-listing-wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .team-list {
    display: flex;
    flex-direction: row;
    span {
      padding: 20px;
      width: 160px;
      height: 150px;
      cursor: pointer;
      &:hover {
        background: #dee5ea;
        border-radius: 8px;
      }
    }
    img {
      max-width: 170px;
      max-height: 150px;
    }

  .ipl-image {
    cursor: auto !important;
    padding: 20px;
    width: 160px;
    height: 150px;
    &:hover {
      border-radius: 0px;
    }
  }

  }

</style>