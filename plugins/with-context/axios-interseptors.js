/**
 * Plugin for extending axios: add headers on request. catch errors
 *
 */

/**
 * Codes that using for redirect to error page
 * @type {number[]}
 */
export default function ({ $axios, params: { lang }, store, app }) {
  /**
   * Add language param to request
   */
  $axios.onRequest(async (config) => {
    const langCode = lang || store.getters.getDefaultLocale.code

    if (langCode) {
      config.headers.common['Accept-Language'] = langCode
    }

    return config
  })

  /**
   * Handle all errors
   */
  $axios.onError(({ response }) => {
    console.error('Error caught in axios-interseptors.', response)
    return Promise.reject(response)
  })
}
