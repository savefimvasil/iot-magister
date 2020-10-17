// import all files from current directory with _example.js pattern
require('~/assets/js/utils/import-all.js').default(
  require.context('.', true, /_.+\.js$/)
)
