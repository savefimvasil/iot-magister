import axios from 'axios'

export const state = () => ({
  settings: {}
})

export const getters = {
  getSettings: state => state.settings
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
  }
}

export const mutations = {
  SET_SETTINGS (state, data) {
    state.settings = { ...data, timeout: +data.timeout * 1000 }
  }
}
