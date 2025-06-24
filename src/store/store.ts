import { configureStore } from '@reduxjs/toolkit'
import { registerReducer } from './registerStore'

export const store = configureStore({
  reducer: { register: registerReducer },
})

// Tipe untuk TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
