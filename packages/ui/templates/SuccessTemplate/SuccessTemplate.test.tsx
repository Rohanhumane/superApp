import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SuccessTemplate } from '../../index';

const baseProps = {
  title: 'Payment Successful',
  primaryBtn: { title: 'Go to Home', onPress: jest.fn() },
};

describe('SuccessTemplate', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders title', () => {
    const { getByText } = render(<SuccessTemplate {...baseProps} />);
    expect(getByText('Payment Successful')).toBeTruthy();
  });

  it('renders subtitle when provided', () => {
    const { getByText } = render(
      <SuccessTemplate {...baseProps} subtitle="Your EMI has been paid" />
    );
    expect(getByText('Your EMI has been paid')).toBeTruthy();
  });

  it('renders primary button', () => {
    const { getByText } = render(<SuccessTemplate {...baseProps} />);
    expect(getByText('Go to Home')).toBeTruthy();
  });

  it('calls primary button onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <SuccessTemplate title="Success" primaryBtn={{ title: 'Done', onPress }} />
    );
    fireEvent.press(getByText('Done'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders secondary button when provided', () => {
    const { getByText } = render(
      <SuccessTemplate
        {...baseProps}
        secondaryBtn={{ title: 'Download Receipt', onPress: jest.fn() }}
      />
    );
    expect(getByText('Download Receipt')).toBeTruthy();
  });

  it('calls secondary button onPress when pressed', () => {
    const onSecondary = jest.fn();
    const { getByText } = render(
      <SuccessTemplate
        {...baseProps}
        secondaryBtn={{ title: 'Download', onPress: onSecondary }}
      />
    );
    fireEvent.press(getByText('Download'));
    expect(onSecondary).toHaveBeenCalledTimes(1);
  });

  it('renders detail rows when details provided', () => {
    const { getByText } = render(
      <SuccessTemplate
        {...baseProps}
        details={[
          { label: 'Amount Paid', value: '₹11,634' },
          { label: 'Reference ID', value: 'SK123456' },
        ]}
      />
    );
    expect(getByText('Amount Paid')).toBeTruthy();
    expect(getByText('₹11,634')).toBeTruthy();
    expect(getByText('Reference ID')).toBeTruthy();
    expect(getByText('SK123456')).toBeTruthy();
  });

  it('renders Confirm Details header when showDownload and details are provided', () => {
    const { getByText } = render(
      <SuccessTemplate
        {...baseProps}
        showDownload
        details={[{ label: 'Amount', value: '₹11,634' }]}
      />
    );
    expect(getByText('Confirm Details')).toBeTruthy();
    expect(getByText('⬇')).toBeTruthy();
  });

  it('does not render secondary button when not provided', () => {
    const { queryByText } = render(<SuccessTemplate {...baseProps} />);
    expect(queryByText('Download')).toBeNull();
  });
});
