<template>
  <div class="item-card">
    <div class="item-card__image">
      <component :is="card.icon" />
      <h5 class="item-card__title">
        {{ card.name }}
      </h5>
    </div>
    <div class="item-card__wrapper">
      <span>{{ card.enabled ? 'ON': 'OFF' }}</span>
      <BaseToggle :defaultValue="isChecked" @setIsActive="changeActive" />
    </div>
  </div>
</template>

<script>
  import light from '~/static/icons/light.svg'

  export default {
    name: 'BaseItemCard',
    components: {
      light
    },
    props: {
      card: Object
    },
    data () {
      return {
        check: null,
        isChecked: !!this.card.enabled,
        isLoaded: false,
        ref: null
      }
    },
    watch: {
      isChecked (val) {
        console.log(val)
      }
    },
    mounted () {
      this.ref = this.firebase.database().ref('LED_STATUS')
      this.ref.once('value').then(snapshot => {
        this.isChecked = snapshot.val() !== 'OFF'
      })

      this.ref.on('value', this.firebaseCallback)
    },

    beforeDestroy () {
      // clearInterval(this.interval)
      this.ref.off('value', this.firebaseCallback)
    },

    methods: {
      changeActive (val) {
        const ref = this.firebase.database().ref('LED_STATUS')
        ref.once('value').then(snapshot => {
          this.check = val
          if (snapshot.val() === 'OFF') {
            ref.set('ON')
          } else {
            ref.set('OFF')
          }
        })
      },

      firebaseCallback (snapshot) {
        this.isChecked = snapshot.val() !== 'OFF'
      }
    }
  }
</script>

<style lang="scss">
.item-card {
  border: 1px solid $c-grey-800;
  border-radius: 5px;

  &__image {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: $c-grey;
    padding: 20px;

    svg {
      margin: 0 auto;
      height: 80px;
    }
  }

  &__title {
    text-align: center;
    margin-top: 10px;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }
}
</style>
