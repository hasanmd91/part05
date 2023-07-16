const Blog = ({ blog }) => (
  <ul style={{ listStyle: 'none' }}>
    <li>
      <strong>Title:</strong> {blog.title}{' '}
    </li>
    <li>
      <strong> Author:</strong> {blog.author}{' '}
    </li>
    <li>Likes: {blog.likes}</li>
  </ul>
);

export default Blog;
