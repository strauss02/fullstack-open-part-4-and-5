import React from 'react';
import Togglable from './Toggleable';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const BlogList = ({
  loggedUser,
  handleLogOut,
  blogs,
  setShouldBlogsUpdate,
  setNotificationText,
}) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>{loggedUser} is logged in</p>
      <button onClick={handleLogOut}>Log out nigga</button>
      {/* //fsdgdgsh */}
      <div className="blogs-container">
        {blogs.map(({ title, author, likes, url, _id }, i) => (
          <div key={`${title}${i}`} style={blogStyle} className="blog">
            <h4>{title}</h4>
            {author}
            <Togglable btnLabel="View">
              <div className="collapsed">
                <span className="likes">{likes}</span>{' '}
                <LikeButton
                  setNotificationText={setNotificationText}
                  setShouldBlogsUpdate={setShouldBlogsUpdate}
                  blogId={_id.toString()}
                />
                <br />
                {url} <br />
                <DeleteButton
                  title={title}
                  setShouldBlogsUpdate={setShouldBlogsUpdate}
                  blogId={_id.toString()}
                  setNotificationText={setNotificationText}
                />
              </div>
            </Togglable>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
