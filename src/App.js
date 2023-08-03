import { useState, useEffect, useRef } from 'react';
import Notification from './components/Notification';
import Blog from './components/Blog';
import blogService from './services/serviceBlogs';
import loginService from './/services/serviceLogin';
import LoginForm from './components/LoginForm';
import Newblog from './components/Newblog';
import Togglable from './components/Togglable';

const App = () => {
  const [notification, setNotification] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const newBlogRef = useRef();

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('BlogUser');

    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort();
      setBlogs(sortedBlogs);
    });
  }, []);

  const clearNotification = () => {
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  //Login Funtion

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem('BlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (error) {
      setNotification({ text: 'wrong username or password', error: true });
    } finally {
      clearNotification();
    }
  };

  // New blog adding fucntion

  const addBlog = async (newObject) => {
    try {
      const newBlog = await blogService.create(newObject);
      newBlog.user = user;
      setBlogs(blogs.concat(newBlog));
      setNotification({
        text: `A new blog ${newBlog.title} by ${newBlog.author} is added`,
        error: false,
      });
      newBlogRef.current.toggleVisibility();
    } catch (error) {
      if (error?.response?.data) {
        setNotification({ text: error.response.data, error: true });
      } else {
        setNotification({ text: 'something went wrong', error: true });
      }
    } finally {
      clearNotification();
    }
  };

  const deleteBlog = async (id) => {
    const filteredBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(filteredBlogs);

    await blogService.deleteBlog(id);
  };

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? (
        <Togglable buttonLabel={'login'}>
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} is Logged in
            <button
              onClick={() => {
                setUser(null);
                localStorage.removeItem('BlogUser');
              }}
            >
              LogOut
            </button>
          </p>

          <Togglable buttonLabel={'Create New'} ref={newBlogRef}>
            <Newblog createBlog={addBlog} />
          </Togglable>
          {blogs
            .sort((a1, a2) => a2.likes - a1.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blogs={blog}
                user={user}
                deleteBlog={deleteBlog}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
