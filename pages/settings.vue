<template>
  <section class="settings-page">
    <div class="container">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <div class="input">
          <span>Как часто обноовлять данные?(секунд)</span>
          <v-text-field
            v-model="params.timeout"
            v-mask="'##'"
            class="text-field"
            label="Интервал"
            type="number"
            :rules="timeoutRules"
            required
            placeholder="интервал, секунд"
          />
        </div>

        <div class="input">
          <span>Диапазон температуры, от </span>
          <v-text-field
            v-model="params.temperature.from"
            v-mask="'##'"
            class="text-field"
            type="number"
            :rules="fromTempRules"
            required
            placeholder="от"
          />
          <span>, До </span>
          <v-text-field
            v-model="params.temperature.to"
            v-mask="'##'"
            class="text-field"
            type="number"
            :rules="toTempRules"
            required
            placeholder="До"
          />
          <span>&#8451;</span>
        </div>

        <div class="input">
          <span>Диапазон влажности, от </span>
          <v-text-field
            v-model="params.humidity.from"
            v-mask="'##'"
            class="text-field"
            type="number"
            :rules="fromHumidityRules"
            required
            placeholder="от"
          />
          <span>, До </span>
          <v-text-field
            v-model="params.humidity.to"
            v-mask="'##'"
            class="text-field"
            type="number"
            :rules="toHumidityRules"
            required
            placeholder="До"
          />
          <span>%</span>
        </div>

        <v-btn
          color="warning"
          @click="updateSettings"
        >
          Сохранить
        </v-btn>
      </v-form>
      <p v-if="successMessage">
        {{ successMessage }}
      </p>
      <p v-if="errorMessage" style="color: red">
        {{ errorMessage }}
      </p>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  import { mapActions } from 'vuex'

  export default {
    name: 'Settings',
    data () {
      return {
        params: {
          timeout: null,
          temperature: {
            from: null,
            to: null
          },
          humidity: {
            from: null,
            to: null
          }
        },
        valid: true,
        successMessage: '',
        errorMessage: '',
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
    },
    watch: {
      params: {
        deep: true,
        handler () {
          this.validate()
        }
      }
    },
    async mounted () {
      try {
        const data = await this.GET_SETTINGS()
        this.setSettingsParam(data)
      } catch (e) {
        console.log(e)
      }
    },
    methods: {
      ...mapActions({ GET_SETTINGS: 'settings/GET_SETTINGS' }),

      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },

      setSettingsParam (data) {
        Object.keys({ ...this.params }).forEach(key => {
          if (data[key]) {
            if (key === 'timeout') {
              this.params[key] = JSON.parse(JSON.stringify(data[key] / 1000))
            } else {
              this.params[key] = data[key]
            }
          }
        })
      },

      async updateSettings () {
        this.$refs.form.validate()
        if (!this.valid) {
          return
        }
        const url = window.location.href.includes('localhost') ? 'http://localhost:3002/settings' : '/settings'
        try {
          await axios.post(url, { ...this.params, timeout: this.params.timeout * 1000 })
          this.$store.commit('settings/SET_SETTINGS', this.params)
          this.successMessage = 'Успешно изменено'
          setTimeout(() => {
            this.successMessage = ''
          }, 3000)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style lang="scss">
  .settings-page {
    padding: 40px 0;
    min-height: calc(100vh - 88px);

    .input {
      display: flex;
      align-items: center;

      .v-label {
        left: -10px !important;
      }

      .v-messages__message {
        color: red !important;
      }
    }

    .text-field {
      margin-left: 10px;
      max-width: 300px;
    }

    button {
      margin-top: 20px;
      margin-bottom: 10px;
      background-color: rgba(19,139,163,1) !important;
      color: $c-white;
      padding: 12px 15px;
      border-radius: 4px;
      outline: none;
      cursor: pointer;
    }
  }
</style>
