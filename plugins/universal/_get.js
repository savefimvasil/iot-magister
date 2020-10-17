import Vue from 'vue'

Vue.use({
  install (Vue) {
    // eslint-disable-next-line no-prototype-builtins
    if (Vue.prototype.hasOwnProperty('_get')) return

    Object.defineProperty(Vue.prototype, '_get', {
      get () {
        return _get
      }
    })
  }
})
