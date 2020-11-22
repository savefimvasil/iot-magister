import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options', 'color'],
  data () {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler (val) {
        this.$data._chart.update()
      }
    }
  },
  mounted () {
    this.renderChartMethod()
  },
  methods: {
    renderChartMethod () {
      this.renderChart({
        labels: this.chartData.labels,
        datasets: [
          {
            pointBackgroundColor: this.color === 'red' ? 'rgba(255,126,0,1)' : this.color === 'blue' ? 'rgba(19,139,163,1)' : 'rgba(35,163,57,1)',
            pointBorderColor: this.color === 'red' ? 'rgba(255,126,0,1)' : this.color === 'blue' ? 'rgba(19,139,163,1)' : 'rgba(35,163,57,1)',
            borderWidth: 1,
            responsve: false,
            borderColor: this.color === 'red' ? 'rgba(255,126,0,1)' : this.color === 'blue' ? 'rgba(19,139,163,1)' : 'rgba(35,163,57,1)',
            fontSize: 18,
            backgroundColor: this.color === 'red' ? 'rgba(255,126,0,0.4)' : this.color === 'blue' ? 'rgba(19,139,163,0.4)' : 'rgba(35,163,57,0.4)',
            data: this.chartData.values
          }
        ]
      }, {
        legend: {
          display: false
        },
        responsive: false,
        animation: {
          tension: {
            duration: 100,
            easing: 'linear',
            from: 0.1,
            to: 0,
            loop: true
          }
        }
      })
    }
  }
}
