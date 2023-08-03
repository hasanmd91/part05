import '@testing-library/jest-dom/extend-expect';
import { render, within } from '@testing-library/react';
import React from 'react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

const mockDeleteBlog = jest.fn();

jest.mock('../../services/serviceBlogs', () => ({
  upDate: jest.fn(),
}));

describe('Blog component', () => {
  const sampleBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://example.com',
    likes: 10,
    user: {
      id: 123,
      name: 'Test User',
    },
  };

  let container;

  beforeEach(() => {
    container = render(
      <Blog
        blogs={sampleBlog}
        deleteBlog={mockDeleteBlog}
        user={{ id: 123 }}
        testId={'blogs'}
      />
    );
  });

  test('renders blog title and author only by default', () => {
    const div = container.queryByTestId('blogs');
    expect(div).toHaveTextContent('Test Blog');
    expect(div).toHaveTextContent('Test Author');
  });

  test('renders blogs URL and number of likes ', async () => {
    const div = container.queryByTestId('blogs');
    const showButton = within(div).getByRole('button', { name: /Show/i });
    const user = userEvent.setup();
    await user.click(showButton);

    expect(div).toHaveTextContent('https://example.com');
    expect(div).toHaveTextContent('10');
  });

  test('Clicking the like button invoke onClick function', async () => {
    const div = container.queryByTestId('blogs');
    const showButton = within(div).getByRole('button', { name: /Show/i });
    const user = userEvent.setup();
    await user.click(showButton);
    const mockFunction = jest.fn();

    const likeButton = within(div).getByRole('button', { name: /Like/i });
    likeButton.onclick = mockFunction;
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockFunction).toHaveBeenCalledTimes(2);
  });
});
