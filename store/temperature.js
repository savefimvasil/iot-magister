import axios from 'axios'
import moment from 'moment'

export const state = () => ({
  graphInfo: {
    tempChart: {
      values: [],
      labels: []
    },
    humidityChart: {
      values: [],
      labels: []
    }
  }
})

export const getters = {
  getGraphInfo: state => state.graphInfo
}

export const actions = {
  async GET_SETTINGS ({ state, commit }, payload) {
    const url = window.location.href.includes('localhost') ? 'http://localhost:3002/get-settings' : '/get-settings'
    try {
      const { data } = await axios.post(url)
      commit('SET_SETTINGS', data)
      return data
    } catch (e) {
      console.log(e)
    }
  },
  setGraphInfo ({ commit, state }, val) {
    const date = moment(val.date).format('DD.MM HH:mm')
    commit('MUTATE_TEMP', { ...val, date })
    commit('MUTATE_HUMIDITY', { ...val, date })
  }
}

export const mutations = {
  MUTATE_TEMP (state, payload) {
    if (state.graphInfo.tempChart.values.length < 10) {
      state.graphInfo.tempChart.values.push(payload.temperature)
      state.graphInfo.tempChart.labels.push(payload.date)
    } else {
      state.graphInfo.tempChart.values.splice(0, 1)
      state.graphInfo.tempChart.values.push(payload.temperature)
      state.graphInfo.tempChart.labels.splice(0, 1)
      state.graphInfo.tempChart.labels.push(payload.date)
    }
  },
  MUTATE_HUMIDITY (state, payload) {
    if (state.graphInfo.humidityChart.values.length < 10) {
      state.graphInfo.humidityChart.values.push(payload.humidity)
      state.graphInfo.humidityChart.labels.push(payload.date)
    } else {
      state.graphInfo.humidityChart.values.splice(0, 1)
      state.graphInfo.humidityChart.values.push(payload.humidity)
      state.graphInfo.humidityChart.labels.splice(0, 1)
      state.graphInfo.humidityChart.labels.push(payload.date)
    }
  }
}
