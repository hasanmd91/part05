import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewBlog from './Newblog';

describe('<Newblog>', () => {
  test('calls the event handler with the right details when a blog is created', async () => {
    const createBlogMock = jest.fn();

    render(<NewBlog createBlog={createBlogMock} />);

    const titleInput = screen.getByLabelText('Title');
    const authorInput = screen.getByLabelText('Author');
    const urlInput = screen.getByLabelText('Url');

    const user = userEvent.setup();

    await user.type(titleInput, 'Test Blog Title');
    await user.type(authorInput, 'Test Author');
    await user.type(urlInput, 'http://testblog.com');

    expect(titleInput).toHaveValue('Test Blog Title');
    expect(authorInput).toHaveValue('Test Author');
    expect(urlInput).toHaveValue('http://testblog.com');

    const button = screen.getByRole('button', { name: 'Create' });
    await user.click(button);

    expect(createBlogMock).toHaveBeenCalledTimes(1);
    expect(createBlogMock).toHaveBeenCalledWith({
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'http://testblog.com',
    });
  });
});
