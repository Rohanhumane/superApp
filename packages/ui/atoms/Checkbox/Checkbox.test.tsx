import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Checkbox } from './Checkbox';
describe('Checkbox', () => {
  it('calls onToggle on press', () => {
    const fn = jest.fn();
    const { getByText } = render(<Checkbox checked={false} onToggle={fn} label="Agree" />);
    fireEvent.press(getByText('Agree'));
    expect(fn).toHaveBeenCalledTimes(1);
  });
  it('shows checkmark when checked', () => {
    const { getByText } = render(<Checkbox checked={true} onToggle={() => {}} label="Checked" />);
    expect(getByText('✓')).toBeTruthy();
  });
});
