import React, { useState } from 'react';
import blogService from '../services/blogs';

const CreateBlog = ({ setNotification, setBlogs, setNotificationType }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createNotification = (type, error) => {
    setNotificationType(type);
    setNotification(error);

    setTimeout(() => {
      setNotification(null);
      setNotificationType(null);
    }, 5000);
  };

  const clearform = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const submithandeler = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({ title, author, url });
      const updatedBlogs = await blogService.getAll();

      createNotification(
        'success',
        `A new blog ${newBlog.title} by ${newBlog.author} is added`
      );

      setBlogs(updatedBlogs);
      clearform();
    } catch (error) {
      if (error.response) {
        createNotification('error', error.response.data);
      } else {
        createNotification('error', 'something went wrong');
      }
    }
  };

  return (
    <div>
      <h2> Create new </h2>
      <form onSubmit={submithandeler}>
        <div>
          <label htmlFor='title'> Title</label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='author'> Author</label>
          <input
            id='author'
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='url'> Url</label>
          <input
            id='url'
            type='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <button type='submit'> Create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
