<template>
  <div class="app">
    <header>
      <div class="container">
        <div>
          <button v-if="$route.path !== '/'" class="mr-2" @click="$router.push('/')">
            Home
          </button>
          <button v-if="$route.path !== '/settings'" class="mr-2" @click="$router.push('/settings')">
            Settings
          </button>
          <button v-if="$route.path !== '/learn'" class="mr-2" @click="$router.push('/learn')">
            Learn
          </button>
        </div>
        <h1>Smart Home</h1>
      </div>
    </header>
    <nuxt />
  </div>
</template>


<script>
  import { mapActions } from 'vuex'
  export default {
    async mounted () {
      try {
        await this.GET_SETTINGS()
      } catch (e) {
        console.log(e)
      }
    },
    methods: {
      ...mapActions({ GET_SETTINGS: 'settings/GET_SETTINGS' })
    }
  }
</script>

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

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 0 !important;
      padding-bottom: 0 !important;

      button {
        color: $c-white;
        font-size: 18px;
        outline: none;
        cursor: pointer;
      }
    }
  }

  .app {
    display: flex;
    flex-direction: column;
    padding-top: 88px;
    background: $c-grey;

    @include respUp(lg) {
      min-height: 100vh;
      max-height: 100vh;
    }
  }

  .mr-2 {
    margin-right: 20px;
  }
</style>
