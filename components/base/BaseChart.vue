<template>
  <div>
    <h3>{{ label }}</h3>
    <ChartComponent :color="color" :chartData="chartData" />
  </div>
</template>

<script>
  import ChartComponent from './Chart'

  export default {
    name: 'Chart',
    components: {
      ChartComponent
    },
    props: {
      chartData: {
        type: Object,
        default: () => ({})
      },
      color: {
        type: String,
        default: 'red'
      },
      label: String
    }
  }
</script>

<style lang="scss">
  h3 {
    color: $c-grey-1500;
    margin-left: 50px;
    margin-bottom: 20px;
  }
</style>
