import React from 'react';
import { render } from '@testing-library/react-native';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders label', () => {
    const { getByText } = render(<Badge label="Active" variant="active" />);
    expect(getByText('Active')).toBeTruthy();
  });
  it('renders all variants', () => {
    (['active','pending','inProgress','resolved','failed'] as const).forEach(v => {
      const { getByText } = render(<Badge label={v} variant={v} />);
      expect(getByText(v)).toBeTruthy();
    });
  });
});
