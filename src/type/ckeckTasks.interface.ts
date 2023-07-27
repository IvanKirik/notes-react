import {TasksActions} from "./task-actions.type";

export interface ICheckTask {
    type: TasksActions.CHECK_TAGS,
    payload: string
}
