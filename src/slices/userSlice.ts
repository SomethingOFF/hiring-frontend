import { API_URL } from "@/API";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


interface UserState {
    user: User | null;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    role: string
    // Add other user fields here
}
interface UserCredentials {
    email: string;
    password: string;
}

interface RegisterData extends UserCredentials {
    name: string;
}


export const registerUser = createAsyncThunk<User, RegisterData>(
    'user/register',
    async (userData, thunkAPI) => {
        try {
            console.log(userData)
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            };
            const response = await axios.post(`${API_URL}/register`, userData, config);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const loginUser = createAsyncThunk<User, UserCredentials>(
    'user/login',
    async (userData, thunkAPI) => {
        try {
            const config = { headers: { "Content-Type": "application/json" }, withCredentials: true, };
            const response = await axios.post(`${API_URL}/login`, userData, config);
            console.log(response)
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getmyUser = createAsyncThunk<any, void>("/user/me", async (_data, thunkAPI) => {
    try {
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true, };
        const response = await axios.get(`${API_URL}/me`, config);
        return response.data.user;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})



const initialState: UserState = {
    user: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};



const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset(state) {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            //login user
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            //get my user
            .addCase(getmyUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getmyUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload
            })
            .addCase(getmyUser.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = userSlice.actions
export default userSlice.reducer