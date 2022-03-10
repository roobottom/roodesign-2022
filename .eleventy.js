const markdownIt = require("markdown-it")
const markdownItAttrs = require("markdown-it-attrs")
const markdownItAnchor = require("markdown-it-anchor")

module.exports = function(eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
      files: './_site/css/**/*.css'
  })

  let mdOptions = {
    typographer: true,
    quotes: '“”‘’',
    html: true
  }
  let md =  markdownIt(mdOptions)
            .use(markdownItAttrs)
            .use(markdownItAnchor)

  //11ty md eleventyConfig
  eleventyConfig.setLibrary("md", md)

  //watch changes in library
  eleventyConfig.addWatchTarget("./lib/**/*.js")

  // copy static files
  eleventyConfig.addPassthroughCopy("./source/assets/fonts/**/*")
  eleventyConfig.addPassthroughCopy("./source/assets/images/**/*")
  eleventyConfig.addPassthroughCopy("./source/assets/js/**/*")

  //filters
  eleventyConfig.addFilter("date", require('./lib/filters/date.js'))
  eleventyConfig.addFilter("slugify", require('./lib/filters/slugify.js'))
  eleventyConfig.addFilter("plural", require('./lib/filters/plural.js'))

  //shortcodes (AKA components)
  eleventyConfig.addShortcode("gallery", require('./lib/shortcodes/gallery.js'))
  eleventyConfig.addShortcode("outcomes", require('./lib/shortcodes/outcomes.js'))
  eleventyConfig.addShortcode("card", require('./lib/shortcodes/card.js'))
  eleventyConfig.addShortcode("quote", require('./lib/shortcodes/quote.js'))
  eleventyConfig.addShortcode("summary", require('./lib/shortcodes/summary.js'))

  //collections
  eleventyConfig.addCollection("tags", require('./lib/collections/tags.js'))
  eleventyConfig.addCollection("work", require('./lib/collections/work.js'))
  eleventyConfig.addCollection("articles", require('./lib/collections/articles.js'))

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