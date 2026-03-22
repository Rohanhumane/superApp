import React from 'react';
import { render } from '@testing-library/react-native';
import { ServiceTicketCard } from '../index';

const baseProps = {
  title: 'Address Change',
  refId: 'IPR-8997',
  desc: 'Update residential address in loan documents',
  status: 'in_progress',
  created: '2026-03-12',
  updated: '2026-03-14',
};

describe('ServiceTicketCard', () => {
  it('renders ticket title and reference ID', () => {
    const { getByText } = render(<ServiceTicketCard {...baseProps} />);
    expect(getByText('Address Change')).toBeTruthy();
    expect(getByText('IPR-8997')).toBeTruthy();
  });

  it('renders ticket description', () => {
    const { getByText } = render(<ServiceTicketCard {...baseProps} />);
    expect(getByText('Update residential address in loan documents')).toBeTruthy();
  });

  it('renders In Progress status badge', () => {
    const { getByText } = render(<ServiceTicketCard {...baseProps} status="in_progress" />);
    expect(getByText('In Progress')).toBeTruthy();
  });

  it('renders Pending status badge', () => {
    const { getByText } = render(
      <ServiceTicketCard {...baseProps} status="pending" />
    );
    expect(getByText('Pending')).toBeTruthy();
  });

  it('renders Resolved status badge', () => {
    const { getByText } = render(
      <ServiceTicketCard {...baseProps} status="resolved" />
    );
    expect(getByText('Resolved')).toBeTruthy();
  });

  it('renders Created and Last Update date labels', () => {
    const { getByText } = render(<ServiceTicketCard {...baseProps} />);
    expect(getByText('Created')).toBeTruthy();
    expect(getByText('Last Update')).toBeTruthy();
  });

  it('renders different ticket titles', () => {
    const { getByText } = render(
      <ServiceTicketCard {...baseProps} title="NOC Request" refId="IPR-8721" />
    );
    expect(getByText('NOC Request')).toBeTruthy();
    expect(getByText('IPR-8721')).toBeTruthy();
  });
});
