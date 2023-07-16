import Notification from './components/Notification';
import Blog from './components/Blog';
import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import CreateBlog from './components/CreateBlog';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('BlogUser');

    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
      setErrorMessage('wrong crdential');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  return (
    <div>
      <Notification error={errorMessage} />
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.username} is Logged in
            <button
              onClick={() => {
                setUser(null);
                localStorage.removeItem('BlogUser');
              }}
            >
              LogOut
            </button>
          </p>

          <CreateBlog setErrorMessage={setErrorMessage} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
