import { createSlice } from "@reduxjs/toolkit";

const initialState={
    onFilterNews:'',
}
export const sliceNews=createSlice({
    name:'news',
    initialState,
    reducers:{
        setFilterNews(state,action){
            return{...state,onFilterNews:action.payload}
        }
    }
})

export const {setFilterNews}=sliceNews.actions

export const newsReducer=sliceNews.reducer