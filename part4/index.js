const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./router/userRouter');
const blogRouter = require('./router/blogRouter');
const { tokenExtractor } = require('./middleware/tokenExtractor');
const PORT = 3003;
const cookieParser = require('cookie-parser');
const tokenValidator = require('./middleware/tokenValidator');
const mongoose = require('mongoose');

const mongoUrl =
  'mongodb+srv://omer:omer12345@cluster0.chke2.mongodb.net/part4?retryWrites=true&w=majority';
mongoose.connect(mongoUrl).then(() => console.log('db connected...'));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use(tokenExtractor);
app.use(tokenValidator);
app.use('/api/blogs', blogRouter);

const listener = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.killServer = () => {
  listener.close();
};
module.exports = app;
