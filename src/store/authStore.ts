import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    name: '',
    role: ''
}

const authStore = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setDataAuth: (state, action) =>{
            return {...state, ...action.payload}
        },
        reset: () => initialState
    }
})


export const {setDataAuth, reset} = authStore.actions
export const authReducer = authStore.reducer