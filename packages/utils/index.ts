export const validators = {
  isValidMobile: (n: string) => /^[6-9]\d{9}$/.test(n.replace(/\D/g, '')),
  isValidPAN: (p: string) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(p.toUpperCase()),
  isValidEmail: (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),
  isValidIFSC: (i: string) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(i.toUpperCase()),
  isValidPincode: (p: string) => /^[1-9][0-9]{5}$/.test(p),
  isValidMPIN: (m: string) => /^\d{4}$/.test(m),
  isValidAccountNumber: (a: string) => /^\d{9,18}$/.test(a),
};

export const formatCurrency = (amount: number, symbol = true): string => {
  const f = amount.toLocaleString('en-IN');
  return symbol ? `₹${f}` : f;
};

export const formatCurrencyCompact = (amount: number): string => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount}`;
};

export const maskMobile = (n: string) => n.length < 4 ? n : 'x'.repeat(n.length - 4) + n.slice(-4);
export const maskPAN = (p: string) => p.length < 4 ? p : 'x'.repeat(p.length - 4) + p.slice(-4);
export const maskAccount = (a: string) => a.length < 4 ? a : `XXXX XXXX ${a.slice(-4)}`;

export const formatDate = (date: Date | string, fmt: 'short' | 'long' | 'full' = 'short'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const day = d.getDate().toString().padStart(2, '0');
  if (fmt === 'full') return `${day} ${months[d.getMonth()]} ${d.getFullYear()}, ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')} ${d.getHours() >= 12 ? 'pm' : 'am'}`;
  return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

export const calculateEMI = (principal: number, annualRate: number, months: number): number => {
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / months;
  return Math.round((principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1));
};

export const calculateEligibility = (income: number, otherEMIs: number, rate: number, months: number): number => {
  const maxEMI = (income * 0.5) - otherEMIs;
  if (maxEMI <= 0) return 0;
  const r = rate / 12 / 100;
  if (r === 0) return maxEMI * months;
  return Math.round((maxEMI * (Math.pow(1 + r, months) - 1)) / (r * Math.pow(1 + r, months)) / 100000) * 100000;
};

export const formatTimer = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
export const generateRefId = () => `SK${Math.floor(100000 + Math.random() * 900000)}`;
export const generateTicketId = () => `IPR-${Math.floor(1000 + Math.random() * 9000)}`;
