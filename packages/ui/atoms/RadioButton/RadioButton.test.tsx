import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { RadioButton } from './RadioButton';
describe('RadioButton', () => {
  it('calls onPress', () => {
    const fn = jest.fn();
    const { getByText } = render(<RadioButton selected={false} onPress={fn} label="Savings" />);
    fireEvent.press(getByText('Savings'));
    expect(fn).toHaveBeenCalled();
  });
});
