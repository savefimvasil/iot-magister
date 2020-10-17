const path = require('path')
const head = require('./nuxt-config/_head')
const css = require('./nuxt-config/_css')
const plugins = require('./nuxt-config/_plugins')
const options = require('./nuxt-config/_options')

module.exports = {
  head,
  ...options,
  css,
  plugins,
  modules: ['@nuxtjs/axios', '@nuxtjs/style-resources'],
  axios: {
    baseURL: 'http://httpbin.org'
  },
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      config.module.rules.forEach((rule) => {
        if (/scss/.test(rule.test.toString())) {
          rule.oneOf.forEach((key) => {
            if (key.use) {
              key.use.push({
                loader: '@epegzz/sass-vars-loader',
                options: {
                  syntax: 'sсss',
                  files: [
                    path.resolve(__dirname, './assets/variables/index.js')
                  ]
                }
              })
            }
          })
        }
      })
    }
  }
}
