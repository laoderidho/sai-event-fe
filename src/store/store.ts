import { configureStore } from '@reduxjs/toolkit'
import { registerReducer } from './registerStore'
import { authReducer } from './authStore'

export const store = configureStore({
  reducer: { 
    register: registerReducer,
    auth: authReducer
  },
})

// Tipe untuk TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
