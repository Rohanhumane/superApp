/**
 * Asset Registry — Single source of truth for ALL images
 *
 * NEVER use require('../../assets/xxx.png') directly in screens.
 * ALWAYS import from here: import { Brand } from '@/assets'
 * When designer provides new assets, update ONLY this file.
 */

export const Brand = {
  logo: require('./logo.png'),
  // logoWhite: require('./brand/logo-white.png'),
  // splashBg: require('./brand/splash-bg.png'),
};

export const Illustrations: Record<string, any> = {
  // vehicleLoan: require('./illustrations/vehicle-loan.png'),
  // successCheck: require('./illustrations/success.png'),
  // emptyState: require('./illustrations/empty-state.png'),
};

export const BankLogos: Record<string, any> = {
  // hdfc: require('./banks/hdfc.png'),
  // sbi: require('./banks/sbi.png'),
};

export const getAsset = (registry: Record<string, any>, key: string): any | null =>
  registry[key] ?? null;
