import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import BlogList from './components/Blog';
import axios from 'axios';
import getAll from './services/blogs';
import NewBlogForm from './components/newBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Toggleable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [loggedUser, setLoggedUser] = useState('');
  const [notificationText, setNotificationText] = useState('Harbana');
  const [showNotification, setShowNotification] = useState(false);
  // const [cookie, userCookie] = useState()
  const [shouldBlogsUpdate, setShouldBlogsUpdate] = useState(true);

  function handleLogOut() {
    setNotificationText('User logged out successfully');

    setLoggedUser('');
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
  }

  async function handleLoginClick(username, password) {
    try {
      const response = await axios.post('/api/users/login', {
        userName: username,
        password,
      });
      if (response.status === 200) {
        setLoggedUser(username);
        setNotificationText('User logged in!!!');
        setShouldBlogsUpdate(true);
      } else {
        setNotificationText('LogIn Failed!');
        console.log(response.status, response.data, 'Login failed!');
      }
    } catch (error) {
      console.log('Login failed!');
    }
  }

  useEffect(() => {
    if (shouldBlogsUpdate) {
      const cookies = document.cookie.substring(4);
      if (cookies) {
        getAll().then((response) => {
          if (response instanceof Error) {
            handleLogOut();
          } else {
            const sorted = response.sort(
              (blogA, blogB) => blogB.likes - blogA.likes
            );
            setBlogs(sorted);
          }
        });
      }
      setShouldBlogsUpdate(false);
    }
  }, [showNotification, shouldBlogsUpdate]);

  useEffect(() => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  }, [notificationText, shouldBlogsUpdate]);

  // if (showNotification) {
  //   // setTimeout(() => setShowNotification(false), 3000);
  // }

  return loggedUser ? (
    <>
      {showNotification ? (
        <Notification key={notificationText} text={notificationText} />
      ) : (
        ''
      )}
      <BlogList
        loggedUser={loggedUser}
        blogs={blogs}
        handleLogOut={handleLogOut}
        setShouldBlogsUpdate={setShouldBlogsUpdate}
        setNotificationText={setNotificationText}
      />
      <Togglable btnLabel="Create New Blog">
        <NewBlogForm
          setNotificationText={setNotificationText}
          setShouldBlogsUpdate={setShouldBlogsUpdate}
        />{' '}
      </Togglable>
    </>
  ) : (
    <>
      {showNotification ? (
        <Notification key={notificationText} text={notificationText} />
      ) : (
        ''
      )}
      <LoginForm
        handleLoginClick={handleLoginClick}
        setNotificationText={setNotificationText}
      />
    </>
  );
};

export default App;
