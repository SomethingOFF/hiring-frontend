import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import { jobsSlice, jobSlice } from "./slices/jobSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        jobs: jobsSlice.reducer,
        job: jobSlice.reducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch