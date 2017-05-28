<template>
	<div class="player-container">
    <p>Top players</p>
    <div class="players-listing">
      <span>
        <img src="http://images.indiatvnews.com/sportscricket/2016/1454749821Watson.jpg">
        <p>
        Shane Watson
        </p>
        <p>
          Total Runs: 2000
           <br>
          Total Boundaries: 678
        </p>
      </span>
      <span>
        <img src="http://st3.cricketcountry.com/wp-content/uploads/cricket/20140522035852.jpeg">
          <p>
        Lasith Malinga
        </p>
        <p>
          Total Runs: 2000
           <br>
          Total Boundaries: 678
        </p>
      </span>
      <span>
         <img src="http://i.cricketcb.com/stats/img/faceImages/413.jpg">
           <p>
        Suresh Raina
        </p>
        <p>
          Total Runs: 2000
           <br>
          Total Boundaries: 678
        </p>
      </span>
      <span>
        <img src="http://starsunfolded.1ygkv60km.netdna-cdn.com/wp-content/uploads/2015/04/Chris-Gayle.jpg">
          <p>
       Chris Gayle
        </p>
        <p>
          Total Runs: 2000
           <br>
          Total Boundaries: 678
        </p>
      </span>
    </div>
   </div>
</template>
<style>
	 .player-container {
    display: flex;
    flex-direction: column;
    font-style: inherit;

    p:nth-child(1) {
      font-size: 1.5em;
      color: #616161
    }

    .players-listing {
      display: flex;
      flex-direction: row;
      
      span {
        height: 300px;
        width: 220px;
        background-color: ghostwhite;
        margin: 25px;
        border-radius: 8px;

        img {
          padding: 20px;
          height: 150px;
          width: 150px;
          border-radius: 30%;
          opacity: 0.6;
        }
        p {
          font-size: 1.2rem;
          margin-top:-15px;
          font-family: MarkerFelt;
          color: gray;
        }
        p:nth-child(3) {
          text-align: left;
          margin-left: 30px;
          margin-top: 10px;
          font-size: 1rem;
          font-family: monospace;
        }
      }
      span:hover {
          background-color: #C4D7E4;
          box-shadow: 0 1px 2px #fff, 0 -1px 1px #666, inset 0 -1px 1px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.8);
        
        img{
          opacity: 1;
        }
        p:nth-child(2) {
          color: goldenrod;
        }
      }
    }
  }
</style>