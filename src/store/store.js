import { configureStore } from '@reduxjs/toolkit'
import selectSlice from './slices/selectSlice'
import gamesSlice from './slices/gamesSlice'

export default configureStore({
  reducer: {
    selectSlice,
    gamesSlice
  }
})