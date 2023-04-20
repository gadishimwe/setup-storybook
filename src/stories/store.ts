
import { PayloadAction, configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { Task, TaskState } from './types';

const TaskBoxData: {tasks: Task[], status: string, error: string | null} = {
  tasks: [],
  status: 'idle',
  error: null,
};

export const fetchTasks = createAsyncThunk('todos/fetchTodos', async () => {
     const response = await fetch(
       'https://jsonplaceholder.typicode.com/todos?userId=1'
     );
     const data: {id: number, title: string,completed: boolean}[] = await response.json();
     const result: Task[] = data.map((task) => ({
       id: `${task.id}`,
       title: task.title,
       state: task.completed ? 'TASK_ARCHIVED' : 'TASK_INBOX',
     }));
     return result;
   });

const TasksSlice = createSlice({
  name: 'taskbox',
  initialState: TaskBoxData,
  reducers: {
    updateTaskState: (state, action:PayloadAction<{id: string, newTaskState: TaskState}>) => {
      const { id, newTaskState } = action.payload;
      const task = state.tasks.findIndex((task) => task.id === id);
      if (task >= 0) {
        state.tasks[task].state = newTaskState;
      }
    },
  },
  extraReducers(builder) {
        builder
        .addCase(fetchTasks.pending, (state) => {
          state.status = 'loading';
          state.error = null;
          state.tasks = [];
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.error = null;
          state.tasks = action.payload;
         })
        .addCase(fetchTasks.rejected, (state) => {
          state.status = 'failed';
          state.error = "Something went wrong";
          state.tasks = [];
        });
     },
});

export const { updateTaskState } = TasksSlice.actions;

export const selectTasks = (state: RootState) => {
    const tasksInOrder = [
        ...state.taskbox.tasks.filter((t) => t.state === "TASK_PINNED"),
        ...state.taskbox.tasks.filter((t) => t.state !== "TASK_PINNED"),
    ];
    const filteredTasks = tasksInOrder.filter(
        (t) => t.state === "TASK_INBOX" || t.state === "TASK_PINNED"
    );
    return filteredTasks;
}

export const selectStatus = (state: RootState) => state.taskbox.status
export const selectError = (state: RootState) => state.taskbox.error

const store = configureStore({
  reducer: {
    taskbox: TasksSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;