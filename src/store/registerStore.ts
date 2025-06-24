import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    email: "",
    password: "",
    name: "",
    no_telp: "",
    congregation_id: 0
}

const registerStore = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setData: (state, action) =>{
            return {...state, ...action.payload}
        }
    }
})

export const {setData} = registerStore.actions
export const registerReducer = registerStore.reducer