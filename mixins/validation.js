export default {
  data () {
    return {
      timeoutRules: [
        v => !!v || 'timeout is required',
        v => (v && (+v >= 5 && +v <= 99)) || 'Timeout must be more than 5 and less then 99'
      ],
      fromTempRules: [
        v => !!v || 'Temperature is required',
        v => (v && (+v >= 0 && +v <= 99)) || 'Timeout must be more than 0 and less then 99'
      ],
      toTempRules: [
        v => !!v || 'Temperature is required',
        v => (v && (+v >= 0 && +v <= 99)) || 'Humidity must be more than 0 and less then 99',
        v => (v && +v > +this.params.temperature.from) || '"To" temperature should be grater then "from"'
      ],
      fromHumidityRules: [
        v => !!v || 'Humidity is required',
        v => (v && (+v >= 0 && +v <= 99)) || 'Humidity must be more than 0 and less then 99'
      ],
      toHumidityRules: [
        v => !!v || 'Humidity is required',
        v => (v && (+v >= 0 && +v <= 99)) || 'Timeout must be more than 0 and less then 99',
        v => (v && +v > +this.params.humidity.from) || '"To" humidity should be grater then "from"'
      ]
    }
  }
}
