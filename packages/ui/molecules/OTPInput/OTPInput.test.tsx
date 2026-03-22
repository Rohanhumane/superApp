import React from 'react';
import { render } from '@testing-library/react-native';
import { OTPInput } from './OTPInput';
describe('OTPInput', () => {
  it('renders correct number of boxes', () => {
    const { getAllByDisplayValue } = render(<OTPInput length={5} onComplete={() => {}} />);
    expect(getAllByDisplayValue('')).toHaveLength(5);
  });
  it('renders 6 boxes for verify mode', () => {
    const { getAllByDisplayValue } = render(<OTPInput length={6} onComplete={() => {}} />);
    expect(getAllByDisplayValue('')).toHaveLength(6);
  });
});
