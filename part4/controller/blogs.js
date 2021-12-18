const Blog = require('../model/model');
const jwt = require('jsonwebtoken');
const JWTSECRET = 'shhhhh';

exports.getBlogs = (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
};

exports.createBlog = (request, response) => {
  if (!request.body.title || !request.body.url) {
    response.status(400).send();
    return;
  }
  if (!request.body.likes) {
    request.body.likes = 0;
  }
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
};
exports.deleteBlogById = async (req, res) => {
  const blogId = req.params.id;
  if (!blogId) {
    res.status(400).send('missing ID');
    return;
  }
  try {
    await Blog.findOneAndDelete({ _id: blogId });
    res.send('Post Deleted');
  } catch (error) {
    res.status(404).send('Post Not Found');
  }
};

exports.LikeById = async (req, res) => {
  const blogId = req.params.id;
  if (!blogId) {
    res.status(400).send('missing ID');
    return;
  }
  try {
    await Blog.updateOne({ _id: blogId }, { $inc: { likes: +1 } });
    res.send('Post Updated');
  } catch (error) {
    res.status(404).send('Post Not Found');
  }
};

exports.authBlog = (request, response) => {
  try {
    const cookieUserObj = jwt.verify(request.token, JWTSECRET);
    if (typeof cookieUserObj === 'string') {
      throw cookieUserObj;
    }
    if (!request.body.title || !request.body.url) {
      response.status(400).send();
      return;
    }
    if (!request.body.likes) {
      request.body.likes = 0;
    }
    const blog = new Blog(request.body);

    blog.save().then((result) => {
      response.status(201).json(result);
    });
  } catch (err) {
    response.status(400).send('inValid');
    return;
  }
};

exports.deletAuth = async (request, response) => {
  try {
    const cookieUserObj = jwt.verify(request.token, JWTSECRET);
    if (typeof cookieUserObj === 'string') {
      throw cookieUserObj;
    }
    const { title } = request.body;
    const deleteCount = await Blog.deleteOne({
      title: title,
      author: cookieUserObj.userName,
    });
    console.log(deleteCount, 'delete count');
    if (deleteCount.deleteCount !== 0) {
      throw title;
    }
    response.send();
  } catch (err) {
    response.status(400).send('invalid');
  }
};
