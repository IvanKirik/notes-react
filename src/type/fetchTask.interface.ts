import {TasksActions} from "./task-actions.type";
import {TaskType} from "./task-item.type";


export interface IActionsInterface {
    type: TasksActions.FETCH_TASKS,
    payload?: TaskType[]
}

export interface IActionsSuccessInterface {
    type: TasksActions.FETCH_TASKS_SUCCESS,
    payload: any[]
}

export interface IActionsErrorInterface {
    type: TasksActions.FETCH_TASKS_FAILURE,
    payload: string
}
