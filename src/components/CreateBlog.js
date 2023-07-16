import React, { useState } from 'react';
import blogService from '../services/blogs';

const CreateBlog = ({ setNotification, setBlogs, setNotificationType }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const submithandeler = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({ title, author, url });
      const updatedBlogs = await blogService.getAll();
      setNotificationType('success ');
      setNotification(
        `A new blog ${newBlog.title} by ${newBlog.author} is added`
      );
      setTimeout(() => {
        setNotification(null);
        setNotificationType(null);
      }, 5000);

      setBlogs(updatedBlogs);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      setNotificationType('error');

      if (error.response) {
        setNotification(error.response.data.error);
      } else if (error.request) {
        setNotification('something went wrong');
      } else {
        setNotification(error.message);
      }

      setTimeout(() => {
        setNotification(null);
        setNotificationType(null);
      }, 5000);
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
