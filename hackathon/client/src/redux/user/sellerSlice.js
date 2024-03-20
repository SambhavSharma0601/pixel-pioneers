import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSeller: null,
  loading: false,
  error: null,
  listings: [],
};

const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentSeller = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signOutUserSuccess: (state) => {
      state.currentSeller = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addListing: (state, action) => {
      state.listings.push(action.payload);
    },
    removeListing: (state, action) => {
      state.listings = state.listings.filter(listing => listing.id !== action.payload);
    },
    clearListings: (state) => {
      state.listings = [];
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
  addListing,
  removeListing,
  clearListings,
} = sellerSlice.actions;

export default sellerSlice.reducer;
