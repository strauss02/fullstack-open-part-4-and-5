const express = require('express');
const { tokenExtractor } = require('../middleware/tokenExtractor');
const router = express.Router();
const {
  getBlogs,
  createBlog,
  deleteBlogById,
  LikeById,
  authBlog,
  deletAuth,
} = require('../controller/blogs');

router.use(tokenExtractor);
router.get('/', getBlogs);

router.post('/', createBlog);

router.post('/auth', authBlog);

router.delete('/auth', deletAuth);

router.put('/like/:id', LikeById);

router.delete('/delete/:id', deleteBlogById);

module.exports = router;
