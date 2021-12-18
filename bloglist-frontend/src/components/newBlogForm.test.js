import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewBlogForm from './newBlogForm';

test('NewBlogForm updates parent state and calls newBlogHandler', () => {
  const createBlog = jest.fn();

  const component = render(<NewBlogForm mockFunc={createBlog} />);

  const input = component.container.querySelectorAll('input');
  input[0].value = 'testing the form';

  const form = component.container.querySelector('form');

  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(
    createBlog.mock.calls[0][0].target.children.namedItem('title').value
  ).toBe('testing the form');
});
