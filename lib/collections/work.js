module.exports = collectionApi => {
  return collectionApi.getFilteredByGlob("./source/work/*.md")
    .sort((a, b) => {
      return b.date - a.date
    })
}