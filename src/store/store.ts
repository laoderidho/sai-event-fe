import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { registerReducer } from './registerStore'
import { authReducer } from './authStore'
import { persistReducer, persistStore } from 'redux-persist'
import { AuthPercistConfig } from '@/lib/config/authPersist'

const persistedAuthReducer = persistReducer(AuthPercistConfig, authReducer)

// Gabungkan reducer
const rootReducer = combineReducers({
  register: registerReducer,
  auth: persistedAuthReducer
})

// Konfigurasi store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 🚨 Matikan serializable check
    }),
})

// Untuk PersistGate di index.tsx
export const persistor = persistStore(store)


// Tipe untuk TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
