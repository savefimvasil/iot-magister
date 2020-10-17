<template>
  <div class="base-menu-card">
    <div class="base-menu-card__image">
      <img :src="image">
      <div class="base-menu-card__image-blur" :class="[ `base-menu-card__image-blur--${item.color}` ]" />
      <h2 class="base-menu-card__title">
        {{ item.title }}
      </h2>
      <div v-if="item.icon" class="base-menu-card__icon">
        <component :is="item.icon" />
      </div>
    </div>
    <div class="base-menu-card__info">
      <div class="base-menu-card__temperature">
        <p class="label">
          {{ item.temperature.label }}
        </p>
        <p class="value">
          {{ item.temperature.value }} &#8451;
        </p>
      </div>
      <div class="base-menu-card__humidity">
        <p class="label">
          {{ item.humidity.label }}
        </p>
        <p class="value">
          {{ item.humidity.value }} <span>%</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import bedroom from '~/static/icons/bedroom.svg'
  export default {
    name: 'BaseMenuCar',
    components: {
      bedroom
    },
    props: {
      item: Object
    },
    data () {
      return {
        image: require(`~/static/${this.item.image}`)
      }
    }
  }
</script>

<style lang="scss">
.base-menu-card {
  position: relative;
  margin-bottom: 32px;
  border-radius: 5px;
  border: 1px solid $c-grey-800;
  overflow: hidden;
  background: $c-white;
  cursor: pointer;

  @include respDown(md) {
    margin-bottom: 0;
    margin-right: 32px;
  }

  @include respDown(sm) {
    margin-right: 16px;
  }

  &__info {
    display: flex;
    padding: 20px 0;
  }

  &__temperature {
    border-right: 1px solid $c-grey-800;
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

  &__icon {
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: $c-white;
    border-radius: 50%;

    svg {
      width: 32px;
      height: 32px;
      fill: $c-grey-1000;
      color: $c-grey-1000;
    }
  }

  &__title {
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: $c-white;
  }

  &__image {
    width: 100%;

    @include aspect-ratio(551/252);

    img {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;

      @include object-fit();
    }
  }

  &__image-blur {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6;

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
  }
}
</style>
