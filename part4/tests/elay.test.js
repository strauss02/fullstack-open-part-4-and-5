const {dummy , totalLikes, favoriteBlog , mostBlogs , mostLikes} = require('../utils/list_helper');
const mockData =require('./mockData')
test('testing dummy', ()=>{
    const array =[];
    expect(dummy(array)).toBe(1);
})
describe('Blog Tests', ()=>{

  test('getting total likes', ()=>{
    expect(totalLikes(mockData)).toBe(43);
  })
  
  it('should return the blog with most likes', ()=>{
    expect(favoriteBlog(mockData)).toEqual(mockData[2]);
  })
  
  it('should return the author with most blog posts', ()=>{
    expect(mostBlogs(mockData)).toEqual({author: "Robert C. Martin",
    blogs: 3})
  })
  it('should return the author with most likes', ()=>{
    expect(mostLikes(mockData)).toEqual({"author": "Edsger W. Dijkstra", "likes": 17})
  })
})