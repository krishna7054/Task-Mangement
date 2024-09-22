import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from 'process';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate?: Date;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log("to:", token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Async Thunks for CRUD operations
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  
  const response = await api.get('/tasks/');
  return response.data;
});

export const createTask = createAsyncThunk('tasks/createTask', async (taskData: Task) => {
  const response = await api.post('/tasks/', taskData);
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (taskData: Task) => {
  try {
    console.log("taskData._id:", taskData._id);
    // if(taskData._id!=="undefined")?taskData._id=taskData.id:taskData._id;
    const response = await api.put(`/tasks/${taskData._id}`, taskData);
    // const response = await api.put(`/tasks/${taskData.id}`, taskData);
    console.log("API response:", response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error("Update task error:", error);
    throw error; // Propagate the error to the action
  }
});

export const updatekanbanTask = createAsyncThunk('tasks/updatekanbanTask', async (taskData: Task) => {
  try {
    console.log("taskData._id:", taskData._id);
    // if(taskData._id!=="undefined")?taskData._id=taskData.id:taskData._id;
    const response = await api.put(`/tasks/${taskData.id}`, taskData);
    // const response = await api.put(`/tasks/${taskData.id}`, taskData);
    console.log("API response:", response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error("Update task error:", error);
    throw error; // Propagate the error to the action
  }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId: string) => {
  await api.delete(`/tasks/${taskId}`);
  return taskId;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load tasks. Please create Tasks OR After register you not able to create task than you refresh and logout and goto login page and login, after these steps you can create Tasks.';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })

      .addCase(updatekanbanTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
