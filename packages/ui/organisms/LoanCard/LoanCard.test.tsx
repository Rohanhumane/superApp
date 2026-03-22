import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { LoanCard, StatusBanner, SectionHeader, QuickLinkCard,
  ProductTile, TransactionRow, DocumentRow, ProgressBar } from '../index';

describe('LoanCard', () => {
  const baseProps = {
    type: 'Car Loan',
    number: 'SK101010',
    status: 'active' as const,
    amount: 500000,
    emi: 11634,
    onView: jest.fn(),
    onPay: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it('renders loan type in uppercase and account number', () => {
    const { getByText } = render(<LoanCard {...baseProps} />);
    expect(getByText('CAR LOAN')).toBeTruthy();
    expect(getByText('SK101010')).toBeTruthy();
  });

  it('renders Active badge for active status', () => {
    const { getByText } = render(<LoanCard {...baseProps} />);
    expect(getByText('Active')).toBeTruthy();
  });

  it('renders Closed badge for closed status', () => {
    const { getByText } = render(<LoanCard {...baseProps} status="closed" />);
    expect(getByText('Closed')).toBeTruthy();
  });

  it('renders Pay EMI button', () => {
    const { getByText } = render(<LoanCard {...baseProps} />);
    expect(getByText('Pay EMI')).toBeTruthy();
  });

  it('calls onPay when Pay EMI is pressed', () => {
    const { getByText } = render(<LoanCard {...baseProps} />);
    fireEvent.press(getByText('Pay EMI'));
    expect(baseProps.onPay).toHaveBeenCalledTimes(1);
  });

  it('calls onView when View More is pressed', () => {
    const { getByText } = render(<LoanCard {...baseProps} />);
    fireEvent.press(getByText('View More'));
    expect(baseProps.onView).toHaveBeenCalledTimes(1);
  });

  it('displays Loan Amount and EMI Amount labels', () => {
    const { getByText } = render(<LoanCard {...baseProps} />);
    expect(getByText('Loan Amount')).toBeTruthy();
    expect(getByText('EMI Amount')).toBeTruthy();
  });
});

describe('StatusBanner', () => {
  it('renders message and subtitle', () => {
    const { getByText } = render(
      <StatusBanner msg="Application in Progress" sub="We will update you shortly" />
    );
    expect(getByText('Application in Progress')).toBeTruthy();
    expect(getByText('We will update you shortly')).toBeTruthy();
  });

  it('renders action button when onAction and actionLabel provided', () => {
    const onAction = jest.fn();
    const { getByText } = render(
      <StatusBanner msg="Status" sub="Sub" onAction={onAction} actionLabel="Track Now" />
    );
    expect(getByText('Track Now')).toBeTruthy();
    fireEvent.press(getByText('Track Now'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('does not render action button when actionLabel is missing', () => {
    const { queryByText } = render(
      <StatusBanner msg="Status" sub="Sub" onAction={jest.fn()} />
    );
    expect(queryByText('Track Now')).toBeNull();
  });
});

describe('SectionHeader', () => {
  it('renders title', () => {
    const { getByText } = render(<SectionHeader title="Quick Links" />);
    expect(getByText('Quick Links')).toBeTruthy();
  });

  it('renders action and calls onAction on press', () => {
    const onAction = jest.fn();
    const { getByText } = render(
      <SectionHeader title="Transactions" action="View All" onAction={onAction} />
    );
    fireEvent.press(getByText('View All'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});

describe('QuickLinkCard', () => {
  it('renders label', () => {
    const { getByText } = render(<QuickLinkCard label="Pay EMI" icon="payment" onPress={jest.fn()} />);
    expect(getByText('Pay EMI')).toBeTruthy();
  });

  it('renders mapped icon from iconMap', () => {
    const { getByText } = render(<QuickLinkCard label="Pay" icon="payment" onPress={jest.fn()} />);
    expect(getByText('💳')).toBeTruthy();
  });

  it('falls back to 📎 for unknown icon key', () => {
    const { getByText } = render(<QuickLinkCard label="Other" icon="unknown_key" onPress={jest.fn()} />);
    expect(getByText('📎')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByText } = render(<QuickLinkCard label="Mandate" icon="mandate" onPress={onPress} />);
    fireEvent.press(getByText('Mandate'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('ProductTile', () => {
  it('renders label', () => {
    const { getByText } = render(<ProductTile label="Car Loan" icon="car" onPress={jest.fn()} />);
    expect(getByText('Car Loan')).toBeTruthy();
  });

  it('renders mapped icon from prodIcons', () => {
    const { getByText } = render(<ProductTile label="Car Loan" icon="car" onPress={jest.fn()} />);
    expect(getByText('🚗')).toBeTruthy();
  });

  it('falls back to 📦 for unknown icon key', () => {
    const { getByText } = render(<ProductTile label="Other" icon="unknown" onPress={jest.fn()} />);
    expect(getByText('📦')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByText } = render(<ProductTile label="Tractor Loan" icon="tractor" onPress={onPress} />);
    fireEvent.press(getByText('Tractor Loan'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('TransactionRow', () => {
  it('renders description', () => {
    const { getByText } = render(
      <TransactionRow date="2026-03-05" desc="Due for Installment 12" amount={15300} status="received" />
    );
    expect(getByText('Due for Installment 12')).toBeTruthy();
  });

  it('shows Received for received status', () => {
    const { getByText } = render(
      <TransactionRow date="2026-03-05" desc="Installment 12" amount={15300} status="received" />
    );
    expect(getByText('Received')).toBeTruthy();
  });

  it('shows Failed for failed status', () => {
    const { getByText } = render(
      <TransactionRow date="2026-01-05" desc="Installment 10" amount={15300} status="failed" />
    );
    expect(getByText('Failed')).toBeTruthy();
  });

  it('shows Pending for pending status', () => {
    const { getByText } = render(
      <TransactionRow date="2026-04-05" desc="Installment 13" amount={15300} status="pending" />
    );
    expect(getByText('Pending')).toBeTruthy();
  });
});

describe('DocumentRow', () => {
  it('renders title and download icon', () => {
    const { getByText } = render(
      <DocumentRow title="Loan Agreement" onDownload={jest.fn()} />
    );
    expect(getByText('Loan Agreement')).toBeTruthy();
    expect(getByText('⬇')).toBeTruthy();
  });

  it('calls onDownload when row is pressed', () => {
    const onDownload = jest.fn();
    const { getByText } = render(
      <DocumentRow title="Repayment Schedule" onDownload={onDownload} />
    );
    fireEvent.press(getByText('Repayment Schedule'));
    expect(onDownload).toHaveBeenCalledTimes(1);
  });
});

describe('ProgressBar', () => {
  it('renders with label', () => {
    const { getByText } = render(<ProgressBar current={12} total={36} label="12 of 36 EMIs paid" />);
    expect(getByText('12 of 36 EMIs paid')).toBeTruthy();
  });

  it('renders without label', () => {
    const { toJSON } = render(<ProgressBar current={5} total={10} />);
    expect(toJSON()).toBeTruthy();
  });
});
