import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  profile: { fullName: string; dob: string; pan: string; maskedPAN: string; mobile: string; maskedMobile: string; email: string; photo: string | null; fatherName: string; age: number; };
  addresses: { type: string; full: string }[];
  language: string;
}

const init: UserState = {
  profile: { fullName: 'Rahul Kumar', dob: '28 March 1996', pan: 'ABCDE1234F', maskedPAN: 'xxxxxx234F', mobile: '9876543210', maskedMobile: 'xxxxxx3210', email: '', photo: null, fatherName: 'Srinivas Srivastav', age: 30 },
  addresses: [
    { type: 'communication', full: '25, Opposite Ganga Bhavan, Darpan City, 86, Palligantredu, Guntur, Andhra Pradesh, Pincode-545309' },
    { type: 'permanent', full: '25, Opposite Ganga Bhavan, Darpan City, 86, Palligantredu, Guntur, Andhra Pradesh, Pincode-545309' },
  ],
  language: 'en',
};

const slice = createSlice({
  name: 'user', initialState: init,
  reducers: {
    setProfile(s, a: PayloadAction<Partial<UserState['profile']>>) { s.profile = { ...s.profile, ...a.payload }; },
    updateEmail(s, a: PayloadAction<string>) { s.profile.email = a.payload; },
    updateMobile(s, a: PayloadAction<string>) { s.profile.mobile = a.payload; s.profile.maskedMobile = `xxxxxx${a.payload.slice(-4)}`; },
    setLanguage(s, a: PayloadAction<string>) { s.language = a.payload; },
  },
});
export const { setProfile, updateEmail, updateMobile, setLanguage } = slice.actions;
export default slice.reducer;
