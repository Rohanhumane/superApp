import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MenuItem } from './MenuItem';
describe('MenuItem', () => {
  it('renders and calls onPress', () => {
    const fn = jest.fn();
    const { getByText } = render(<MenuItem icon="👤" label="Personal Info" onPress={fn} />);
    expect(getByText('Personal Info')).toBeTruthy();
    fireEvent.press(getByText('Personal Info'));
    expect(fn).toHaveBeenCalled();
  });
});
