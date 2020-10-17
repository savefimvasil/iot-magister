<template>
  <div class="app">
    <header>Smart Home</header>
    <nuxt />
  </div>
</template>

<style lang="scss">
  header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 30px 0;
    text-align: center;
    background: rgb(2, 0, 36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(19,139,163,1) 0%, rgba(0,207,249,1) 100%);
    color: $c-white;
    text-transform: uppercase;
    font-size: 20px;
  }

  .app {
    display: flex;
    flex-direction: column;
    padding-top: 80px;
    background: $c-grey;

    @include respUp(lg) {
      min-height: 100vh;
      max-height: 100vh;
    }
  }
</style>
