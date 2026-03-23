export const colors = {
  // Base — Neutrals
  white: '#FFFFFF',
  gray: { 50: '#FAFAFA', 200: '#E0E0E0', 500: '#757575', 900: '#212121' },
  // Primary — Brand Blue
  primary: { dark: '#1A1C4D', base: '#2E3192', light: '#EDEFFB' },
  // Secondary — Brand Green
  secondary: { dark: '#0C8749', base: '#1EA862', light: '#C9EEDC' },
  // Semantic mappings
  bg: { primary: '#FFFFFF', secondary: '#FAFAFA', dark: '#1A1C4D' },
  text: { primary: '#212121', secondary: '#757575', white: '#FFFFFF', link: '#2E3192', error: '#D32F2F', success: '#0C8749', warning: '#E65100' },
  border: { light: '#E0E0E0', focus: '#2E3192', error: '#D32F2F', success: '#1EA862', disabled: '#EEEEEE' },
  status: {
    active: { bg: '#C9EEDC', text: '#0C8749', border: '#0C8749' },
    pending: { bg: '#FFF3E0', text: '#E65100', border: '#E65100' },
    inProgress: { bg: '#EDEFFB', text: '#1A1C4D', border: '#1A1C4D' },
    resolved: { bg: '#C9EEDC', text: '#0C8749', border: '#0C8749' },
    failed: { bg: '#FFEBEE', text: '#C62828', border: '#C62828' },
  },
  btn: { primary: '#1EA862', primaryPressed: '#0C8749', primaryText: '#FFFFFF', outline: '#2E3192', outlinePressed: '#EDEFFB', disabled: '#E0E0E0', disabledText: '#9E9E9E' },
  overlay: 'rgba(0,0,0,0.5)',
} as const;
