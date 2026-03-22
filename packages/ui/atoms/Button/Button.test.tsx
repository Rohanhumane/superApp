import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button', () => {
  it('renders title correctly', () => {
    const { getByText } = render(<Button title="Get OTP" onPress={() => {}} />);
    expect(getByText('Get OTP')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const mockFn = jest.fn();
    const { getByText } = render(<Button title="Submit" onPress={mockFn} testID="submit-btn" />);
    fireEvent.press(getByText('Submit'));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const mockFn = jest.fn();
    const { getByText } = render(<Button title="Disabled" onPress={mockFn} disabled />);
    fireEvent.press(getByText('Disabled'));
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('shows loading indicator', () => {
    const { queryByText, getByTestId } = render(
      <Button title="Loading" onPress={() => {}} loading testID="load-btn" />
    );
    expect(queryByText('Loading')).toBeNull();
    expect(getByTestId('load-btn-loader')).toBeTruthy();
  });

  it('renders all variants without crashing', () => {
    const variants = ['primary', 'secondary', 'outline', 'link', 'orange'] as const;
    variants.forEach(v => {
      const { getByText } = render(<Button title={v} onPress={() => {}} variant={v} />);
      expect(getByText(v)).toBeTruthy();
    });
  });
});
