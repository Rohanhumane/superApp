import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AuthTemplate } from '../../index';

describe('AuthTemplate', () => {
  it('renders title', () => {
    const { getByText } = render(
      <AuthTemplate title="Welcome Back"><></></AuthTemplate>
    );
    expect(getByText('Welcome Back')).toBeTruthy();
  });

  it('renders subtitle when provided', () => {
    const { getByText } = render(
      <AuthTemplate title="Enter OTP" subtitle="OTP sent to your mobile">
        <></>
      </AuthTemplate>
    );
    expect(getByText('Enter OTP')).toBeTruthy();
    expect(getByText('OTP sent to your mobile')).toBeTruthy();
  });

  it('renders children content', () => {
    const { getByText } = render(
      <AuthTemplate title="Title">
        <React.Fragment>
          {React.createElement('Text' as any, null, 'Child Content')}
        </React.Fragment>
      </AuthTemplate>
    );
    expect(getByText('Child Content')).toBeTruthy();
  });

  it('shows back arrow (←) when onBack is provided', () => {
    const onBack = jest.fn();
    const { getByText } = render(
      <AuthTemplate title="Title" onBack={onBack}><></></AuthTemplate>
    );
    expect(getByText('←')).toBeTruthy();
  });

  it('shows close (✕) when onClose is provided', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <AuthTemplate title="Title" onClose={onClose}><></></AuthTemplate>
    );
    expect(getByText('✕')).toBeTruthy();
  });

  it('calls onBack when back button is pressed', () => {
    const onBack = jest.fn();
    const { getByText } = render(
      <AuthTemplate title="Title" onBack={onBack}><></></AuthTemplate>
    );
    fireEvent.press(getByText('←'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is pressed', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <AuthTemplate title="Title" onClose={onClose}><></></AuthTemplate>
    );
    fireEvent.press(getByText('✕'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders Terms and Conditions text when showTerms is true', () => {
    const { getByText } = render(
      <AuthTemplate title="Title" showTerms><></></AuthTemplate>
    );
    expect(getByText('Terms and conditions')).toBeTruthy();
    expect(getByText('Privacy Policy')).toBeTruthy();
  });

  it('does not render T&C when showTerms is false', () => {
    const { queryByText } = render(
      <AuthTemplate title="Title"><></></AuthTemplate>
    );
    expect(queryByText('Terms and conditions')).toBeNull();
  });

  it('renders bottomContent when provided', () => {
    const { getByText } = render(
      <AuthTemplate
        title="Title"
        bottomContent={React.createElement('Text' as any, null, 'Bottom CTA')}
      >
        <></>
      </AuthTemplate>
    );
    expect(getByText('Bottom CTA')).toBeTruthy();
  });
});
