import { useState } from 'react'
import blogService from '../services/serviceBlogs'

const Blog = ({ blogs, deleteBlog, user }) => {
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    minHeight: 50,
  }

  const buttonStyle = {
    backgroundColor: 'gray',
    margin: 3,
  }

  const [show, setShow] = useState(false)
  const [blog, setBlog] = useState(blogs)

  const updateLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    setBlog(updatedBlog)
    await blogService.upDate(blog.id, updatedBlog)
  }

  const deleteHandeler = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
    return
  }

  return (
    <div style={blogStyle}>
      {blog.title} <strong>{blog.author}</strong>
      <button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button>
      {blog.user.id === user.id && (
        <button onClick={deleteHandeler} style={buttonStyle}>
          Delete
        </button>
      )}
      {show && (
        <div style={{ listStyle: 'none', lineHeight: 1 }}>
          <li>
            <a href={blog.url} target="blank">
              {blog.url}
            </a>
          </li>
          <li>
            likes {blog.likes}
            <button onClick={updateLike}>Like</button>
          </li>
          <li>{blog.user.name}</li>
        </div>
      )}
    </div>
  )
}

export default Blog
