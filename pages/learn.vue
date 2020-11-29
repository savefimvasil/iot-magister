<template>
  <div>
    <client-only>
      <div id="myScatterPlot" style="width: 640px; height: 520px;" />
    </client-only>
    <button @click="nextStep">
      learn
    </button>
  </div>
</template>

<script>
  import axios from 'axios'
  import kmeans from '~/api/kmeans/kmeans.js'

  export default {
    name: 'Learn',
    data () {
      return {
        values: [],
        data: null,
        cluster: null,
        Plotly: null
      }
    },
    async mounted () {
      try {
        this.Plotly = require('plotly.js')
        await this.getLast()
        this.refresh()
      } catch (e) {
        console.log(e)
      }
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
      },
      getData () {
        // generate focal points
        const min = 10
        const max = 30
        const hMin = 30
        const hMax = 80
        const nPoints = 2
        const points = []

        for (let i = 0; i < nPoints; i++) {
          points[i] = []
          points[i][0] = Math.random() * (max - min) + min
          points[i][1] = Math.random() * (hMax - hMin) + hMin
        }

        // generate sample data
        const nSamples = 100
        const samplesX = []
        const samplesY = []

        for (let j = 0; j < points.length; j++) {
          for (let i = 0; i < nSamples; i++) {
            samplesX[i + j * nSamples] = gaussian(points[j][0])
            samplesY[i + j * nSamples] = gaussian(points[j][1])
            if (isNaN(samplesX[i + j * nSamples]) || isNaN(samplesY[i + j * nSamples])) i--
          }
        }

        function gaussian (mean, stdev) {
          let u1, u2, v1, v2, s
          if (mean === undefined) {
            mean = 0.0
          }
          if (stdev === undefined) {
            stdev = 1.0
          }
          if (gaussian.v2 === null) {
            do {
              u1 = Math.random()
              u2 = Math.random()

              v1 = 2 * u1 - 1
              v2 = 2 * u2 - 1
              s = v1 * v1 + v2 * v2
            } while (s === 0 || s >= 1)

            gaussian.v2 = v2 * Math.sqrt(-2 * Math.log(s) / s)
            return stdev * v1 * Math.sqrt(-2 * Math.log(s) / s) + mean
          }

          v2 = gaussian.v2
          gaussian.v2 = null
          return stdev * v2 + mean
        }

        return [samplesX, samplesY]
      },

      drawPlot (data) {
        const series = []
        for (let i = 0; i < data.length; i++) {
          series[i] = {
            x: data[i][0],
            y: data[i][1],
            mode: 'markers',
            name: 'cluster ' + (i + 1)
          }
        }

        const layout = {
          title: 'K-Means Clusters',
          height: 520,
          width: 640
        }

        this.Plotly.newPlot('myScatterPlot', series, layout, { staticPlot: true })
      },

      refresh () {
        // this.data = this.getData()
        this.data = [[], []]
        this.values.forEach(item => {
          this.data[0].push(item.temperature)
          this.data[1].push(item.humidity)
        })
        this.cluster = kmeans(this.data)
        this.drawPlot([this.data])
      },

      nextStep () {
        const series = []
        const clusterData = this.cluster.step()

        for (let c = 0; c < clusterData.centroids.length; c++) {
          series[c] = [[], []]
        }

        // populate series
        for (let s = 0; s < clusterData.labels.length; s++) {
          series[clusterData.labels[s]][0].push(this.data[0][s])
          series[clusterData.labels[s]][1].push(this.data[1][s])
        }

        this.drawPlot(series)
      }
    }
  }
</script>

<style lang="scss">

</style>
