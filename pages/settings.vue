<template>
  <section class="settings-page">
    <div class="container">
      <div class="input">
        <span>Как часто обноовлять данные?(секунд)</span><input
          v-model="params.timeout"
          v-mask="'##'"
          min="1"
          max="99"
          type="number"
          placeholder="интервал, секунд"
        >
      </div>
      <button class="submit-button" @click="updateSettings">
        Сохранить
      </button>
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
          timeout: 5
        },
        successMessage: '',
        errorMessage: ''
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

      setSettingsParam (data) {
        Object.keys({ ...this.params }).forEach(key => {
          if (data[key]) {
            if (key === 'timeout') {
              this.params[key] = JSON.parse(JSON.stringify(data[key] / 1000))
            }
          }
        })
      },

      async updateSettings () {
        if (this.params.timeout < 5 || this.params.timeout > 99) {
          this.errorMessage = 'Timeout должен быть больше 5 и меньше 99 секунд'
          setTimeout(() => {
            this.errorMessage = ''
          }, 3000)
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

    input {
      margin-left: 20px;
      padding: 6px;
      min-width: 100px;
    }

    .submit-button {
      margin-top: 20px;
      margin-bottom: 10px;
      background-color: rgba(19,139,163,1);
      color: $c-white;
      padding: 12px 15px;
      border-radius: 4px;
      outline: none;
      cursor: pointer;
    }
  }
</style>
