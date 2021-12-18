const app = require('../index');
const request = require ('supertest');
const mockData =require('./mockData')
const Blog = require('../model/model')
const User = require("../model/User")
const mongoose = require('mongoose');
let ServerSentJWT;
const api = request(app);
const mockNewBlog = {
  title: "String",
  author: "test",
  url: "String",
  likes: 5
}
const mockNewBlogNoLike = {
  title: "String",
  author: "String",
  url: "String",
}

const mockDataUpdate = {
  title: "TDD harms architecture",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  likes: 10,
}
const mockUser = {
    userName: "test",
    name: "test test",
    password: "123456"
  }
beforeEach(async()=>{
    await Blog.deleteMany({})
    await Blog.insertMany(mockData);
})

describe('testing Api requests', ()=>{
    it('should return all blog posts', async()=>{
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(mockData.length)
    })
    it('should validate a post has an id', async()=>{
        const response = await api.get('/api/blogs')
        expect(response.body[0]._id).toBeDefined()
    })
    it('should validate a new post was created', async()=>{
        const add = await api.post('/api/blogs').send({
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7
          })
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(mockData.length+1)
    })
    it('should validate a new post created without passing likes arg sets to 0', async()=>{
        const add = await api.post('/api/blogs').send({
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/"
          })
        const response = await api.get('/api/blogs')
        expect(response.body[response.body.length-1].likes).toBe(0)
    })
    it('should validate a new post created without passing url or title to return status 400', async()=>{
        const response = await api.post('/api/blogs').send({
            author: "Michael Chan",
          })
        expect(response.status).toBe(400)
    })
    it('should validate a post was deleted', async()=>{
        const response = await api.delete('/api/blogs').send({
            title: "React patterns",
          })
        expect(response.status).toBe(200)
        const allBlogs = await api.get('/api/blogs')
        expect(allBlogs.body).toHaveLength(mockData.length-1)
    })
    
    it('should validate a post was updated', async()=>{
        const response = await api.put('/api/blogs').send({
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 10,
          })
        expect(response.status).toBe(200)
        const allBlogs = await api.get('/api/blogs')
        const changedPost = allBlogs.body.find(post=>post.title = 'React patterns')
        expect(changedPost.likes).toBe(10)
    })
})
describe('testing User Api',()=>{
    it('should create User',async()=>{
        await request(app).post("/api/users").send(mockUser)
        const userArray = await User.find({})
        expect(userArray[0]["userName"]).toBe("test")
    })
    it('should not create user with existing userName or missing params',async()=>{
        const response = await api.post('/api/users').send({name:'omer'});
        expect(response.status).toBe(400);
    })
    test('should get cookie after login', async () => {
        const response = await request(app).post("/api/users/login").send(mockUser)
        expect(response.headers["set-cookie"][0]).toBeDefined()
        ServerSentJWT = response.headers["set-cookie"][0].match(/\w+\.\w+\..+?(?=;)/)[0];
      });
      test('should not can post blog without auth', async () => {
        const response = await request(app).post("/api/blogs/auth").send(mockNewBlog)
        expect(response.statusCode).toBe(400)
      });
      test('should can post blog with auth', async () => {
        const response = await request(app).post("/api/blogs/auth")
          .set("Authorization", `Bearer ${ServerSentJWT}`).send(mockNewBlog)
        expect(response.statusCode).toBe(201)
      });
      test('should not can delete blog without auth', async () => {
        const response = await request(app).delete("/api/blogs/auth").send(mockNewBlog)
        expect(response.statusCode).toBe(400)
      });
      test('should delete blog with right username', async () => {
        await request(app).delete("/api/blogs/auth")
          .set("Authorization", `Bearer ${ServerSentJWT}`).send({
            title: "just the test check",
            author: "test",
          })
        const getResponse = await request(app).get("/api/blogs");
        expect(getResponse.body.length).toBe(mockData.length - 1)
      });
})
afterAll(()=>{
    mongoose.connection.close();
    app.killServer();
})

