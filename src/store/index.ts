import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers";
import {TaskType} from "../type/task-item.type";
import {IActionsErrorInterface, IActionsInterface, IActionsSuccessInterface} from "../type/fetchTask.interface";
import {ISetTask, ISetTaskFailure, ISetTaskSuccess} from "../type/setTask.interface";
import {IDeleteTask, IDeleteTaskFailure, IDeleteTaskSuccess} from "../type/deletedTask.interface";
import {IUpdateTask, IUpdateTaskFailure, IUpdateTaskSuccess} from "../type/updateTask.interface";
import {ICheckTask} from "../type/ckeckTasks.interface";

export interface ITasksState {
    tasks: TaskType[],
    filteredTask: TaskType[],
    loading: boolean,
    error: string | null,
    message: string,
    tags: string[],
    checkTags: string[]
}

export type TaskActionsType =
    IActionsInterface
    | IActionsSuccessInterface
    | IActionsErrorInterface
    | ISetTask
    | ISetTaskSuccess
    | ISetTaskFailure
    | IDeleteTask
    | IDeleteTaskSuccess
    | IDeleteTaskFailure
    | IUpdateTask
    | IUpdateTaskSuccess
    | IUpdateTaskFailure
    | ICheckTask

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));



