<template>
  <div class="wrapper">
    <BaseLeftBar class="wrapper__left-bar" :menu="coloredMenu" @set-active-card="setInfo" />
    <BaseRightBar class="wrapper__right-bar" :activeRoom="menu[activeRoom]" />
  </div>
</template>

<script>
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
              value: '27'
            },
            humidity: {
              label: 'humidity',
              value: '13'
            }
          },
          {
            title: 'Main Bedroom',
            image: 'bedroom.webp',
            icon: 'bedroom',
            temperature: {
              label: 'temperature',
              value: '28'
            },
            humidity: {
              label: 'humidity',
              value: '14'
            }
          },
          {
            title: 'Main Bedroom',
            image: 'bedroom.webp',
            icon: 'bedroom',
            temperature: {
              label: 'temperature',
              value: '28'
            },
            humidity: {
              label: 'humidity',
              value: '15'
            }
          },
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

    mounted () {
      this.firebase.database().ref('room-conditions').push({
        humidity: 51,
        motion: false,
        temperature: 27.2,
        date: Date.now()
      })
    },
    methods: {
      setInfo (index) {
        this.activeRoom = index
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
