exports.dummy = (blogs)=>{
    return 1;
}

exports.totalLikes = (blogs)=>{
    let likes = 0;
    for (const blog of blogs) {
       likes += blog.likes
    }
    return likes;
}

exports.favoriteBlog = (blogs)=>{
    let maxBlog={likes:0};
    for(let blog of blogs){
        if(blog.likes>maxBlog.likes){
            maxBlog=blog
        }
    }
    return maxBlog
}


exports.mostBlogs = (blogs) => {
    const objectOfAuthor = {}
    for (const blog of blogs) {
      objectOfAuthor[blog.author] = ++objectOfAuthor[blog.author] || 1
    }
    selectedObj = { blogs: 0 }
    for (const author in objectOfAuthor) {
      if (objectOfAuthor[author] > selectedObj.blogs) {
        selectedObj.author = author
        selectedObj.blogs = objectOfAuthor[author]
      }
    }
    return selectedObj
  }

  exports.mostLikes = (blogs)=>{
    const objectOfAuthor = {}
    for (const blog of blogs) {
      objectOfAuthor[blog.author] =  objectOfAuthor[blog.author] + blog.likes || blog.likes 
    }
    selectedObj = { likes: 0 }
    for (const author in objectOfAuthor) {
      if (objectOfAuthor[author] > selectedObj.likes) {
        selectedObj.author = author
        selectedObj.likes = objectOfAuthor[author]
      }
    }
    return selectedObj
  }
  