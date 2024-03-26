import { configureStore } from "@reduxjs/toolkit";
import FilesReducer from "./FilesSlice";

export const store= configureStore({
    reducer : FilesReducer
})