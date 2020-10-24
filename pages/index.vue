<template>
  <div class="wrapper">
    <BaseLeftBar class="wrapper__left-bar" :menu="coloredMenu" @set-active-card="setInfo" />
    <BaseRightBar class="wrapper__right-bar" :activeRoom="menu[activeRoom]" />
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        activeRoom: 0,
        menu: [
          {
            title: 'Main Bedroom',
            image: 'bedroom.webp',
            icon: 'bedroom',
            temperature: {
              label: 'temperature',
              value: '29'
            },
            humidity: {
              label: 'humidity',
              value: '16'
            }
          }
        ]
      }
    },
    computed: {
      coloredMenu () {
        const menu = [...this.menu]
        let index = 0
        const colors = ['purple', 'green', 'orange', 'blue']
        menu.forEach((item) => {
          item.color = colors[index]
          index++
          if (index > colors.length - 1) index = 0
        })
        return menu
      }
    },

    async mounted () {
      setInterval(() => {
        this.firebase.firestore().collection('room-conditions').add({
          humidity: 51,
          motion: false,
          temperature: Math.random(),
          date: this.firebase.firestore.FieldValue.serverTimestamp()
        })
      }, 500000)

      const _self = this
      this.firebase.firestore().collection('room-conditions').orderBy('date', 'desc').limit(1).onSnapshot(function (docs) {
        docs.forEach(doc => {
          if (doc.data().temperature) {
            _self.menu[0].temperature.value = doc.data().temperature.toFixed(2)
          }
        })
      })
    },
    methods: {
      setInfo (index) {
        this.activeRoom = index
      },

      async changeSettings () {
        const url = window.location.href.includes('localhost') ? 'http://localhost:3002/settings' : '/settings'
        try {
          await axios.post(url, { timeout: 1 })
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    flex: 1;
    overflow: hidden;

    @include respDown(md) {
      flex-direction: column;
    }

    &__left-bar,
    &__right-bar {
      height: calc(100vh - 80px);
      padding: 32px;
      overflow-y: scroll;

      @include custom-scroll(true);

      @include respDown(md) {
        overflow-y: hidden;
        overflow-x: scroll;
        height: auto;
      }

      @include respDown(sm) {
        padding: 16px;
      }
    }

    &__left-bar {
      width: 30%;

      @include respDown(md) {
        width: 100%;
        display: flex;
        flex-direction: row;
      }
    }

    &__right-bar {
      width: 70%;

      @include respDown(md) {
        width: 100%;
      }
    }
  }
</style>
