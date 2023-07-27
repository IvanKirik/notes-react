import {combineReducers} from "redux";
import {tasksReducer} from "./task.reducer";

export const rootReducer = combineReducers({
    tasks: tasksReducer
})

export type RootState = ReturnType<typeof rootReducer>;
