<template>
  <div class="wrapper">
    <BaseLeftBar class="wrapper__left-bar" :menu="coloredMenu" @set-active-card="setInfo" />
    <BaseRightBar class="wrapper__right-bar" :activeRoom="menu[activeRoom]" />
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
        activeRoom: 0,
        menu: [
          {
            title: 'SmartLab',
            image: 'smartlab.png',
            icon: 'experiment',
            temperature: {
              label: 'temperature',
              value: '29'
            },
            humidity: {
              label: 'humidity',
              value: '16'
            }
          }
        ],
        interval: null,
        humidity: 1,
        ref: null
      }
    },
    computed: {
      ...mapGetters({ getSettings: 'settings/getSettings' }),
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
    // watch: {
    //   getSettings: {
    //     deep: true,
    //     handler (val) {
    //       clearInterval(this.interval)
    //       if (val.hasOwnProperty('timeout') && val.timeout) {
    //         this.interval = setInterval(this.intervalMethod, val.timeout / 1000)
    //       }
    //     }
    //   }
    // },
    async mounted () {
      // const timeout = this.getSettings.timeout > 99 * 1000 ? this.getSettings.timeout / 1000 : this.getSettings.timeout
      // if (this.getSettings.hasOwnProperty('timeout') && this.getSettings.timeout) {
      //   this.interval = setInterval(this.intervalMethod, timeout)
      // }

      this.ref = this.firebase.database().ref('room-conditions').orderByKey().limitToLast(1)
      this.ref.on('value', this.firebaseCallback)
    },
    beforeDestroy () {
      // clearInterval(this.interval)
      this.ref.off('value', this.firebaseCallback)
    },
    methods: {
      ...mapActions({ setGraphInfo: 'temperature/setGraphInfo', clearGraphInfo: 'temperature/clearGraphInfo' }),
      firebaseCallback (snapshot) {
        snapshot.forEach(item => {
          this.menu[0].temperature.value = item.val().temperature.toFixed(1)
          this.menu[0].humidity.value = item.val().humidity.toFixed(1)

          this.setGraphInfo(item.val())
        })
      },
      setInfo (index) {
        this.activeRoom = index
      },

      // intervalMethod () {
      // this.firebase.database().ref('room-conditions').push({
      //   humidity: 45 + Math.random() / 2,
      //   motion: false,
      //   temperature: 22 + Math.random() / 2,
      //   date: Date.now()
      // })
      // this.firebase.firestore().collection('room-conditions').add({
      //   humidity: 51,
      //   motion: false,
      //   temperature: Math.random(),
      //   date: this.firebase.firestore.FieldValue.serverTimestamp()
      // })
      // },

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
