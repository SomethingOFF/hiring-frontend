import { API_URL } from "@/API";
import { Job } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserStateForJobs {
    job: Job[]
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string;
}

interface UserStateForJob {
    job: Job | null
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string;
}



export const createJob = createAsyncThunk<Job, { name: string; description: string; }>(
    'job/jobposting',
    async (jobData, thunkAPI) => {
        try {
            const config = { headers: { "Content-Type": "application/json" } };
            const response = await axios.post(`${API_URL}/jobposting`, jobData, config);
            return response.data.job;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)


export const getALlJobs = createAsyncThunk<Job[], void>("job/getAllJobs", async (_data, thunkAPI) => {
    try {
        const response = await axios.get(`${API_URL}/jobs`);
        return response.data.jobs;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
export const getALlmyJobs = createAsyncThunk<Job[], void>("job/getAllmyJobs", async (_data, thunkAPI) => {
    try {
        const response = await axios.get(`${API_URL}/hr/jobs`);
        console.log(response.data)
        return response.data.jobs
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})




const initialStateForJobs: UserStateForJobs = {
    job: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};
const initialStateForJob: UserStateForJob = {
    job: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

export const jobsSlice = createSlice({
    name: "jobs",
    initialState: initialStateForJobs,
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
            .addCase(getALlJobs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getALlJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
                state.isLoading = false
                state.isSuccess = true
                state.job = action.payload
            })
            .addCase(getALlJobs.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false
                state.isSuccess = true
                state.job = action.payload
            })
            .addCase(getALlmyJobs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getALlmyJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
                state.isLoading = false
                state.isSuccess = true
                state.job = action.payload
            })
            .addCase(getALlmyJobs.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false
                state.isSuccess = true
                state.job = action.payload
            })
    }
})


export const getJob = createAsyncThunk<Job, { id: string }>("job/getAllmyJobs", async (data, thunkAPI) => {
    try {
        const response = await axios.get(`${API_URL}/hr/job/${data.id}`);
        return response.data.job
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})


export const jobSlice = createSlice({
    name: "job",
    initialState: initialStateForJob,
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
            .addCase(getJob.pending, (state) => {
                state.isLoading = true
            }).
            addCase(getJob.fulfilled, (state, action: PayloadAction<Job>) => {
                state.isLoading = false
                state.isSuccess = true
                state.job = action.payload
            }).
            addCase(getJob.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false
                state.isSuccess = true
                state.job = action.payload
            })
    }
})

export const { reset: ResetJobs } = jobsSlice.actions
export const { reset: ResetJob } = jobsSlice.actions