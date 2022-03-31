const { src, dest, watch, series } = require('gulp')
const less = require('gulp-less')
const babel = require('gulp-babel')

const css = () => {
  return src('./source/assets/less/roodesign.less')
    .pipe(less())
    .pipe(dest('./_site/css'))
}


const js = (callback) => {
  return src('./source/assets/js/app.js')
  .pipe(babel())
  .pipe(dest('./_site/js'))
}

exports.default = function(callback) {
  watch(['./source/assets/less/**/*.less', './source/assets/js/**/*.js'], 
    { ignoreInitial: false }, 
    series(css, js))
  callback()
}
exports.build = series(css, js)