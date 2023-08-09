import React, { useState } from 'react';

const Newblog = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const clearform = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const submithandeler = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
    clearform();
  };

  return (
    <div>
      <h2> Create new </h2>
      <form onSubmit={submithandeler}>
        <div>
          <label htmlFor='title'> Title</label>
          <input
            name='title'
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

        <button type='submit' id='createButton'>
          {' '}
          Create
        </button>
      </form>
    </div>
  );
};

export default Newblog;
