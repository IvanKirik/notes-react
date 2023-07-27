import {TasksActions} from "./task-actions.type";

export interface IDeleteTask {
    type: TasksActions.DELETE_TASK,
    payload: number
}

export interface IDeleteTaskSuccess {
    type: TasksActions.DELETE_TASK_SUCCESS,
    payload: number
}

export interface IDeleteTaskFailure {
    type: TasksActions.DELETE_TASK_FAILURE,
    payload: string
}

export type DeleteTaskType = IDeleteTask | IDeleteTaskSuccess | IDeleteTaskFailure;
