import { createSlice } from '@reduxjs/toolkit'

export const selectSlice = createSlice({
  name: 'select',
  initialState: {
    providers: [],
    currencies: [],
    selectedProvider: "",
    selectedCurrency: "",
  },
  reducers: {
    setProvider: (state, action) => {
      state.selectedProvider = action.payload;
    },
    setCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
    setCurrencies: (state, action) => {
      state.currencies = action.payload;
    },
    setProviders: (state, action) => {
      state.providers = action.payload;
    },
  }
})

export const { setProvider, setCurrency, setCurrencies, setProviders } = selectSlice.actions

export default selectSlice.reducer