<template>
  <div class="base-left-bar">
    <div class="base-left-bar__wrapper">
      <BaseMenuCard
        v-for="(item, index) in menu"
        :key="index"
        class="base-left-bar__card"
        :item="item"
        @click.native="setActiveCard(index)"
      />
    </div>
  </div>
</template>

<script>
  import BaseMenuCard from './BaseMenuCard'
  export default {
    name: 'BaseLeftBar',
    components: { BaseMenuCard },
    props: {
      menu: Array
    },
    methods: {
      setActiveCard (index) {
        this.$emit('set-active-card', index)
      }
    }
  }
</script>

<style lang="scss">
.base-left-bar {
  &__wrapper {
    display: flex;
    flex-direction: column;

    @include respDown(md) {
      flex-direction: row;
    }
  }

  &__card {
    @include respDown(md) {
      min-width: 400px;
      width: 400px;
    }

    @include respDown(sm) {
      min-width: 300px;
      width: 300px;
    }
  }
}
</style>
