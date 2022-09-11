import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ALL_GAMES_URL } from '../../constants';

const initialState = {
  games: [],
  loading: false,
  error: '',
  offset: 12
}

export const fetchGames = createAsyncThunk('/games/fetchGames', () => {
  return fetch(ALL_GAMES_URL).then(response => response.json()).then(parse => parse);
})

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    addOffset: (state) => {
      state.offset += 12;
    },
    resetOffset: (state) => {
      state.offset = 12;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGames.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchGames.fulfilled, (state, action) => {
      state.loading = false;
      state.games = action.payload;
      state.error = '';
    })
    builder.addCase(fetchGames.rejected, (state, action) => {
      state.loading = false;
      state.games = [];
      state.error = action.error.message;
    })
  }
})

export const { addOffset, resetOffset } = gamesSlice.actions

export default gamesSlice.reducer