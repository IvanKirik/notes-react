import {TaskType} from "./task-item.type";
import {TasksActions} from "./task-actions.type";

export interface ISetTask {
    type: TasksActions.SET_TASK,
    payload: TaskType
}

export interface ISetTaskSuccess {
    type: TasksActions.SET_TASK_SUCCESS,
    payload: TaskType
}

export interface ISetTaskFailure {
    type: TasksActions.SET_TASK_FAILURE,
    payload: string
}

export type SetTaskType = ISetTask | ISetTaskSuccess | ISetTaskFailure
