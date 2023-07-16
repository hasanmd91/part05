import React, { useState } from 'react';
import blogService from '../services/blogs';

const CreateBlog = ({ setErrorMessage }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const submithandeler = async (event) => {
    event.preventDefault();
    try {
      await blogService.create({ title, author, url });
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      setErrorMessage(error.message);
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
