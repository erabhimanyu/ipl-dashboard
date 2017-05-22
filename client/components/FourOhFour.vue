<template>
  <div class="four-four-wrapper">
    <div class="content">
      <h3>404</h3>
      <p>You have missed this one</p>
    </div>
  </div>
</template>

<script>
</script>

<style>
.four-four-wrapper {
  background-image: url('/images/404.png');
  background-repeat:no-repeat;
  background-size:initial;
  background-position-y: -100px; 
  min-height: 100vh;
  width: 100vw;
  color: dimgrey;
  display: flex;
}

.four-four-wrapper .content {
    margin-left: 100px;

    p {
      font-family: monospace;
      margin-top: -30px;
      text-align: center;
      font-size: 3rem;
    }
    h3 {
      font-size: 15rem;
      margin: 10px;
      color: brown;
    }
  }

</style>
