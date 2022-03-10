const _ = require('lodash')

module.exports = collectionsApi => {
  const tags = []
  const ignoreList = ['articles','work']

  collectionsApi.getFilteredByGlob(["./source/articles/*.md", "./source/work/*.md"]).forEach(post => {
    if('tags' in post.data) {
      
      //loop through all tags and build an object for each
      for(const tag of post.data.tags) {
        tags.push({
          title: _.lowerCase(tag)
        })
      }
    }
  })

  //Group the tags object by name
  let groups = _.groupBy(tags, 'title')

  //split groups out into their own unique objects
  let flatList = []
  _.forEach(groups, group => {
    if (!ignoreList.includes(group[0].title)) {
      flatList.push({
        title: group[0].title, 
        count: group.length
      })
    }
  })

  //return sorted by count in reverse order
  return _.sortBy(flatList, 'count').reverse()

}