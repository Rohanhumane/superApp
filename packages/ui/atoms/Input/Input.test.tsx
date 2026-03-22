import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from './Input';

describe('Input', () => {
  it('renders label', () => {
    const { getByText } = render(<Input label="Full Name" value="" onChangeText={() => {}} />);
    expect(getByText('Full Name')).toBeTruthy();
  });

  it('shows required asterisk', () => {
    const { getByText } = render(<Input label="Email" required value="" onChangeText={() => {}} />);
    expect(getByText('*')).toBeTruthy();
  });

  it('shows error message', () => {
    const { getByText } = render(<Input error="Field is required" value="" onChangeText={() => {}} />);
    expect(getByText('Field is required')).toBeTruthy();
  });

  it('calls onChangeText', () => {
    const mockFn = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter name" value="" onChangeText={mockFn} />
    );
    fireEvent.changeText(getByPlaceholderText('Enter name'), 'Rahul');
    expect(mockFn).toHaveBeenCalledWith('Rahul');
  });

  it('is not editable when disabled', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Disabled" value="test" onChangeText={() => {}} disabled />
    );
    expect(getByPlaceholderText('Disabled').props.editable).toBe(false);
  });
});
