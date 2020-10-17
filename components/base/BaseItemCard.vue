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
      <BaseToggle :defaultValue="isChecked" />
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
        isChecked: !!this.card.enabled,
        isLoaded: false
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
