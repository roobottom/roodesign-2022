const slugify = require('../../lib/filters/slugify.js')
const date = require('../../lib/filters/date.js')
const og = require('../data/og');

module.exports = {
  layout: 'article.njk',
  section_id: 'articles',
  permalink: data => `/articles/${date(data.date, 'YYYY-MM-DD')}-${slugify(data.title)}/`,
  eleventyComputed: {
    og: data => {
      return {
        type: 'article',
        url: `http://roodesign.co.uk/articles/${date(data.date, 'YYYY-MM-DD')}-${slugify(data.title)}/`,
        image: {
          url: data.cover === undefined ? og.image.url : `http://roodesign.co.uk${data.cover}`,
          alt: data.coverAlt === undefined ? og.image.alt : data.coverAlt
        },
        date: date(data.date, 'YYYY-MM-DD[T]hh:mm:ss.SSS[Z]')
      }
    }
  }
}