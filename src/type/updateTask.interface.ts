import {TaskType} from "./task-item.type";
import {TasksActions} from "./task-actions.type";

export interface IUpdateTask {
    type: TasksActions.UPDATE_TASK
}

export interface IUpdateTaskSuccess {
    type: TasksActions.UPDATE_TASK_SUCCESS,
    payload: TaskType
}

export interface IUpdateTaskFailure {
    type: TasksActions.UPDATE_TASK_FAILURE,
    payload: string
}

export type UpdateTaskType = IUpdateTask | IUpdateTaskSuccess | IUpdateTaskFailure;
