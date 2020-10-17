<template>
  <div class="right-bar" style="background: red">
    <div class="right-bar__header">
      <div class="right-bar__title">
        <div v-if="activeRoom.icon" class="right-bar__icon" :class="[`right-bar__icon--${activeRoom.color}`]">
          <component :is="activeRoom.icon" />
        </div>
        <h2 class="right-bar__title">
          {{ activeRoom.title }}
        </h2>
      </div>
      <div class="right-bar__info">
        <div class="right-bar__temperature">
          <p class="label">
            {{ activeRoom.temperature.label }}
          </p>
          <p class="value">
            {{ activeRoom.temperature.value }} &#8451;
          </p>
        </div>
        <div class="right-bar__humidity">
          <p class="label">
            {{ activeRoom.humidity.label }}
          </p>
          <p class="value">
            {{ activeRoom.humidity.value }} <span>%</span>
          </p>
        </div>
      </div>
    </div>
    <div class="right-bar__cards-wrapper">
      <BaseItemCard
        v-for="(card, index) in cards"
        :key="index"
        class="right-bar__card"
        :card="card"
      />
    </div>
  </div>
</template>

<script>
  import bedroom from '~/static/icons/bedroom.svg'

  export default {
    name: 'BaseRightBar',
    components: {
      bedroom
    },
    props: {
      activeRoom: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        cards: [
          { icon: 'light', enabled: false, name: 'light', status: '100%' },
          { icon: 'light', enabled: true, name: 'light', status: '100%' },
          { icon: 'light', enabled: true, name: 'light', status: '100%' },
          { icon: 'light', enabled: true, name: 'light', status: '100%' },
          { icon: 'light', enabled: true, name: 'light', status: '100%' },
          { icon: 'light', enabled: false, name: 'light', status: '100%' },
          { icon: 'light', enabled: false, name: 'light', status: '100%' },
          { icon: 'light', enabled: false, name: 'light', status: '100%' },
          { icon: 'light', enabled: false, name: 'light', status: '100%' },
          { icon: 'light', enabled: false, name: 'light', status: '100%' },
          { icon: 'light', enabled: false, name: 'light', status: '100%' },
          { icon: 'light', enabled: false, name: 'light', status: '100%' }
        ]
      }
    }
  }
</script>

<style lang="scss">
.right-bar {
  background: $c-white;

  &__header {
    display: flex;
    justify-content: space-between;
    padding: 0 0 20px 0;
    border-bottom: 1px solid $c-grey-800;

    @include respDown(sm) {
      flex-direction: column;
    }
  }

  &__title {
    color: $c-grey-1500;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: $c-white;
    border-radius: 50%;
    opacity: 0.7;
    margin-bottom: 15px;

    &--green {
      background: rgb(2,0,36);
      background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(19,163,37,1) 0%, rgba(204,249,0,1) 100%);
    }

    &--purple {
      background: rgb(2,0,36);
      background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(100,19,163,1) 0%, rgba(198,0,249,1) 100%);
    }

    &--blue {
      background: rgb(2, 0, 36);
      background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(19,139,163,1) 0%, rgba(0,207,249,1) 100%);
    }

    &--orange {
      background: rgb(2,0,36);
      background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,126,0,1) 0%, rgba(249,64,0,1) 100%);
    }

    svg {
      width: 32px;
      height: 32px;
      color: $c-white;
    }
  }

  &__info {
    display: flex;
    padding: 20px 0;
  }

  &__temperature,
  &__humidity {
    flex: 1;
    padding: 0 20px;

    .label {
      font-size: 20px;
      color: $c-grey-1500;
      margin-bottom: 20px;
    }

    .value {
      font-size: 30px;
      color: $c-grey-1500;

      span {
        font-size: 15px;
        vertical-align: top;
      }
    }
  }

  &__temperature {
    border-right: 1px solid $c-grey-800;

    @include respDown(sm) {
      padding-left: 0;
    }
  }

  &__humidity {
    @include respDown(sm) {
      padding-right: 0;
    }
  }

  &__cards-wrapper {
    display: flex;
    flex-wrap: wrap;
    padding-top: 32px;
  }

  &__card {
    width: calc((100%/3) - (64px/3));
    margin-right: 32px;
    margin-bottom: 32px;

    &:nth-child(3n) {
      margin-right: 0;
    }

    @include respDown(sm) {
      width: 100%;
      margin-right: 0;
    }
  }
}
</style>
