import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import LikeButton from './LikeButton';

describe('<LikeButton/>', () => {
  let component;

  test('Button is rendered', () => {
    component = render(<LikeButton />);
    expect(component.container).toHaveTextContent('😍');
  });

  test('clicking the like button calls Like handler once', () => {
    const mockHandler = jest.fn();

    component = render(<LikeButton mockHandler={mockHandler} />);

    const button = component.getByText('😍');

    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
