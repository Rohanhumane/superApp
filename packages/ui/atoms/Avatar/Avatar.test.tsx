import React from 'react';
import { render } from '@testing-library/react-native';
import { Avatar } from './Avatar';
describe('Avatar', () => {
  it('shows initials when no uri', () => {
    const { getByText } = render(<Avatar name="Rahul Kumar" />);
    expect(getByText('RK')).toBeTruthy();
  });
  it('shows ? when no name', () => {
    const { getByText } = render(<Avatar />);
    expect(getByText('?')).toBeTruthy();
  });
});
