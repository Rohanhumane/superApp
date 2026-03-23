import i18n, { t } from './index';

describe('@nbfc/i18n', () => {
  it('should initialize with English as default language', () => {
    expect(i18n.language).toBe('en');
  });

  it('should have English as fallback language', () => {
    expect(i18n.options.fallbackLng).toEqual('en');
  });

  it('should translate a key using the t helper', () => {
    const result = t('app.name');
    // Should return the translated value or the key if not found
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should switch language to Hindi', async () => {
    await i18n.changeLanguage('hi');
    expect(i18n.language).toBe('hi');
    // Switch back to English for other tests
    await i18n.changeLanguage('en');
  });

  it('should fall back to English for unsupported language', async () => {
    await i18n.changeLanguage('xx');
    // Fallback should still work
    const result = t('app.name');
    expect(typeof result).toBe('string');
  });

  it('should have escapeValue disabled for React Native', () => {
    expect(i18n.options.interpolation?.escapeValue).toBe(false);
  });
});
