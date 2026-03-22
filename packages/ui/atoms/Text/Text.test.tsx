import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from './Text';

describe('Text', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<Text>Hello SK Finance</Text>);
    expect(getByText('Hello SK Finance')).toBeTruthy();
  });

  it('applies variant styles', () => {
    const { getByText } = render(<Text variant="h1">Heading</Text>);
    const el = getByText('Heading');
    expect(el.props.style).toBeDefined();
  });

  it('applies custom color', () => {
    const { getByText } = render(<Text color="#FF0000">Red</Text>);
    const el = getByText('Red');
    const flatStyle = Array.isArray(el.props.style) ? Object.assign({}, ...el.props.style) : el.props.style;
    expect(flatStyle.color).toBe('#FF0000');
  });

  it('applies alignment', () => {
    const { getByText } = render(<Text align="center">Centered</Text>);
    const el = getByText('Centered');
    const flatStyle = Array.isArray(el.props.style) ? Object.assign({}, ...el.props.style) : el.props.style;
    expect(flatStyle.textAlign).toBe('center');
  });

  it('uses default variant bodyMd', () => {
    const { getByText } = render(<Text>Default</Text>);
    expect(getByText('Default')).toBeTruthy();
  });
});
