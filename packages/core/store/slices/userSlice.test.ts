import userReducer, {
  setProfile,
  updateEmail,
  updateMobile,
  setLanguage,
} from './userSlice';

describe('userSlice', () => {
  const initial = userReducer(undefined, { type: '' });

  describe('initial state', () => {
    it('has correct default profile', () => {
      expect(initial.profile.fullName).toBe('Rahul Kumar');
      expect(initial.profile.pan).toBe('ABCDE1234F');
      expect(initial.profile.maskedPAN).toBe('xxxxxx234F');
      expect(initial.profile.mobile).toBe('9876543210');
      expect(initial.profile.maskedMobile).toBe('xxx3210');
      expect(initial.profile.email).toBe('');
      expect(initial.profile.photo).toBeNull();
      expect(initial.profile.age).toBe(30);
    });

    it('has two default addresses', () => {
      expect(initial.addresses).toHaveLength(2);
      expect(initial.addresses[0].type).toBe('communication');
      expect(initial.addresses[1].type).toBe('permanent');
    });

    it('has english as default language', () => {
      expect(initial.language).toBe('en');
    });
  });

  describe('setProfile', () => {
    it('updates a single field without affecting others', () => {
      const state = userReducer(initial, setProfile({ fullName: 'Priya Sharma' }));
      expect(state.profile.fullName).toBe('Priya Sharma');
      expect(state.profile.pan).toBe('ABCDE1234F');
      expect(state.profile.mobile).toBe('9876543210');
    });

    it('updates multiple fields at once', () => {
      const state = userReducer(initial, setProfile({ fullName: 'Amit Verma', age: 35, email: 'amit@test.com' }));
      expect(state.profile.fullName).toBe('Amit Verma');
      expect(state.profile.age).toBe(35);
      expect(state.profile.email).toBe('amit@test.com');
    });

    it('updates photo field', () => {
      const state = userReducer(initial, setProfile({ photo: 'https://example.com/photo.jpg' }));
      expect(state.profile.photo).toBe('https://example.com/photo.jpg');
    });
  });

  describe('updateEmail', () => {
    it('sets email on profile', () => {
      const state = userReducer(initial, updateEmail('rahul@skfinance.com'));
      expect(state.profile.email).toBe('rahul@skfinance.com');
    });

    it('can update email multiple times', () => {
      let state = userReducer(initial, updateEmail('first@test.com'));
      state = userReducer(state, updateEmail('second@test.com'));
      expect(state.profile.email).toBe('second@test.com');
    });
  });

  describe('updateMobile', () => {
    it('updates mobile and recalculates mask (last 4 digits)', () => {
      const state = userReducer(initial, updateMobile('8123456789'));
      expect(state.profile.mobile).toBe('8123456789');
      expect(state.profile.maskedMobile).toBe('xxx6789');
    });

    it('mask always shows last 4 digits', () => {
      const state = userReducer(initial, updateMobile('7000001234'));
      expect(state.profile.maskedMobile).toBe('xxx1234');
    });
  });

  describe('setLanguage', () => {
    it('sets language to Hindi', () => {
      const state = userReducer(initial, setLanguage('hi'));
      expect(state.language).toBe('hi');
    });

    it('sets language to any supported code', () => {
      const languages = ['en', 'hi', 'bn', 'ta', 'kn', 'mr', 'gu'];
      languages.forEach(lang => {
        const state = userReducer(initial, setLanguage(lang));
        expect(state.language).toBe(lang);
      });
    });
  });
});
