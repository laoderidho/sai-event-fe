import storage from 'redux-persist/lib/storage' // localStorage

export const AuthPercistConfig = {
    key: 'auth',
    storage,
    whitelist: ['name', 'role'], // Only persist these fields
}