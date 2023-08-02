import { useState } from 'react';

const Blog = ({ blog }) => {
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    minHeight: 50,
  };

  const [show, setShow] = useState(false);

  return (
    <div style={blogStyle}>
      {blog.title} <strong>{blog.author}</strong>
      <button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button>
      {show && (
        <div style={{ listStyle: 'none', lineHeight: 1 }}>
          <li>
            <a href={blog.url} target='blank'>
              {blog.url}
            </a>
          </li>
          <li>
            likes {blog.likes} <button> Like</button>
          </li>
          <li>{blog.user.name}</li>
        </div>
      )}
    </div>
  );
};

export default Blog;
