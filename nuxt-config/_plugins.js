module.exports = [
  // only on client
  {
    src: '~/plugins/client',
    mode: 'client'
  },

  // both on server and client
  {
    src: '~/plugins/universal'
  },
  {
    src: '~/plugins/with-context/axios-interseptors'
  }
]
