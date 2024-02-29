import {createSlice} from '@reduxjs/toolkit'


export const FilesSlice= createSlice({
    name:'Upload-Files',
    initialState: {
        images: []
      },
    reducers:{
        uploadFile:(state,action)=>{
            state.images.push({id:state.images.length,...action.payload})
        },
        removeFile:(state,action)=>{
            state.images=state.images.filter((item)=> item.id !== action.payload.id)
        },
        reset:(state,action)=>{
            state.images=[]
        }
    },
})

export const {uploadFile , removeFile , reset} = FilesSlice.actions;
export default FilesSlice.reducer;