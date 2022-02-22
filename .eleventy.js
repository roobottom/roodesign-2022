module.exports = function(eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
      files: './_site/css/**/*.css'
  })

  //watch changes in library
  eleventyConfig.addWatchTarget("./lib/**/*.js")

  // copy static files
  eleventyConfig.addPassthroughCopy("./source/assets/fonts/**/*")
  eleventyConfig.addPassthroughCopy("./source/assets/images/**/*")

  //filters
  eleventyConfig.addFilter("date", require('./lib/filters/date.js'))

  //shortcodes (AKA components)
  eleventyConfig.addShortcode("gallery", require('./lib/shortcodes/gallery.js'))
  eleventyConfig.addShortcode("outcomes", require('./lib/shortcodes/outcomes.js'))
  eleventyConfig.addShortcode("card", require('./lib/shortcodes/card.js'))

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "./source",
      includes: "includes",
      layouts: "layouts",
      data: "data"
    }
  }
}