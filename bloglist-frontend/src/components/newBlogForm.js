import React from 'react';
import axios from 'axios';

const NewBlogForm = ({
  setNotificationText,
  mockFunc,
  setShouldBlogsUpdate,
}) => {
  const newBlogHandler = async (e) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input');
    const newBlogEntry = {
      title: inputs[0].value,
      author: inputs[1].value,
      url: inputs[2].value,
    };
    try {
      await axios.post('/api/blogs/', newBlogEntry, '');
      setNotificationText('Blog posted');
      setShouldBlogsUpdate(true);
      return newBlogEntry;
    } catch (error) {
      setNotificationText('Faied To Post Blog');
      setShouldBlogsUpdate(true);
      console.log(error);
    }
  };
  return (
    <form onSubmit={mockFunc ? mockFunc : newBlogHandler}>
      <h2>new blog</h2>
      <label htmlFor="title">title:</label>
      <input id="title" name="title"></input> <br />
      <label htmlFor="author">author:</label>
      <input name="author" id="author"></input> <br />
      <label htmlFor="url">url:</label>
      <input id="url" name="url"></input>
      <button type="submit"> Submit </button>
    </form>
  );
};

export default NewBlogForm;
