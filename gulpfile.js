require('dotenv').config({ path: 'secrets/variables.env' })
const { series, parallel } = require('gulp')
const clean = require('./gulp/clean')
const eleventy = require('./gulp/eleventy')
const sass = require('./gulp/sass')
const { jsDevelopment, jsProduction } = require('./gulp/rollup')
const imagemin = require('./gulp/imagemin')
const pdfs = require('./gulp/pdfs')
const watch = require('./gulp/watch')
const { browserSync } = require('./gulp/browser-sync')
const rev = require('./gulp/rev')
const copyFonts = require('./gulp/fonts')

exports.clean = clean
exports.eleventy = eleventy
exports.sass = sass
exports.jsdev = jsDevelopment
exports.jsprod = jsProduction
exports.imagemin = imagemin
exports.pdfs = pdfs
exports.serve = browserSync
exports.rev = rev

exports.default = series(
  clean,
  parallel(sass, eleventy, imagemin, copyFonts),
  parallel(jsDevelopment, browserSync, watch)
)

exports.build = series(
  clean,
  parallel(sass, imagemin, jsProduction, pdfs, copyFonts),
  rev,
  eleventy,
  pdfs
)
