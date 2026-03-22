export const colors = {
  primary: { navy: '#1B2B5E', navyDark: '#0F1B3D', green: '#2D8B57', greenDark: '#1E6B3F', greenLight: '#3DA86D' },
  bg: { primary: '#FFFFFF', secondary: '#F5F5F5', tertiary: '#FAFAFA', dark: '#1B2B5E', input: '#F8F8F8' },
  text: { primary: '#1A1A1A', secondary: '#666666', tertiary: '#999999', white: '#FFFFFF', link: '#1B2B5E', error: '#E53935', success: '#2D8B57', warning: '#F5A623' },
  border: { light: '#E8E8E8', medium: '#D0D0D0', focus: '#1B2B5E', error: '#E53935' },
  status: {
    active: { bg: '#E8F5E9', text: '#2D8B57', border: '#2D8B57' },
    pending: { bg: '#FFF3E0', text: '#F5A623', border: '#F5A623' },
    inProgress: { bg: '#E3F2FD', text: '#1565C0', border: '#1565C0' },
    resolved: { bg: '#E8F5E9', text: '#2D8B57', border: '#2D8B57' },
    failed: { bg: '#FFEBEE', text: '#E53935', border: '#E53935' },
  },
  btn: { primary: '#2D8B57', primaryText: '#FFFFFF', disabled: '#A5D6BA' },
  overlay: 'rgba(0,0,0,0.5)',
  white: '#FFFFFF',
} as const;
