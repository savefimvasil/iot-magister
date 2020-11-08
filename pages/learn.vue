<template>
  <div />
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Learn',
    data () {
      return {
        values: []
      }
    },
    async mounted () {
      await this.getLast()
    },
    methods: {
      async getLast () {
        const url = window.location.href.includes('localhost') ? 'http://localhost:3002/get-last' : '/get-last'
        try {
          const { data } = await axios.post(url)
          Object.keys(data).forEach(item => {
            this.values.push({ temperature: data[item].temperature, humidity: data[item].humidity })
          })
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style lang="scss">

</style>
