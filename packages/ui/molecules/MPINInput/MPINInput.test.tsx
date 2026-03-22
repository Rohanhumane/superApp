import React from 'react';
import { render } from '@testing-library/react-native';
import { MPINInput } from './MPINInput';
describe('MPINInput', () => {
  it('renders 4 boxes by default', () => {
    const { getAllByDisplayValue } = render(<MPINInput onComplete={() => {}} />);
    expect(getAllByDisplayValue('')).toHaveLength(4);
  });
  it('renders label', () => {
    const { getByText } = render(<MPINInput onComplete={() => {}} label="Enter MPIN" />);
    expect(getByText('Enter MPIN')).toBeTruthy();
  });
});
