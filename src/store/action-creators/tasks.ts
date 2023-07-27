import {Dispatch} from "redux";

import {DB} from "../../index";
import {TaskActionsType} from "../index";
import {TasksActions} from "../../type/task-actions.type";
import {TaskType} from "../../type/task-item.type";
import {SetTaskType} from "../../type/setTask.interface";
import {UpdateTaskType} from "../../type/updateTask.interface";
import {DeleteTaskType} from "../../type/deletedTask.interface";


export const fetchTasks = () => {
    return async (dispatch: Dispatch<TaskActionsType>) => {
        try {
            dispatch({type: TasksActions.FETCH_TASKS})
            const db = await DB;
            const transaction = await (db as IDBDatabase).transaction('tasks', 'readonly');
            const store = await transaction.objectStore('tasks');
            const getAllUsersRequest = await store.getAll();

            getAllUsersRequest.onsuccess = (event: any) => {
                dispatch({type: TasksActions.FETCH_TASKS_SUCCESS, payload: event.target.result})
            };

        } catch (e) {
            dispatch({type: TasksActions.FETCH_TASKS_FAILURE, payload: 'Произошла ошибка при загрузке задач из БД'})
        }
    }
}

export const setTasks = (task: TaskType) => {
    return async (dispatch: Dispatch<SetTaskType>) => {
        try {
            dispatch({type: TasksActions.SET_TASK, payload: task})
            const db = await DB;
            const transaction = await (db as IDBDatabase).transaction('tasks', 'readwrite');
            const store = transaction.objectStore('tasks');
            const addUserRequest = store.add(task);
            addUserRequest.onsuccess = (event: any) => {
                dispatch({type: TasksActions.SET_TASK_SUCCESS, payload: task})
            };
        } catch (e) {
            dispatch({type: TasksActions.SET_TASK_FAILURE, payload: 'Ошибка при добавлении новой задачи'})
        }
    }
}

export const updateTasks = (task: TaskType) => {
    return async (dispatch: Dispatch<UpdateTaskType>) => {
        try {
            dispatch({type: TasksActions.UPDATE_TASK})
            const db = await DB;
            const transaction = await (db as IDBDatabase).transaction('tasks', 'readwrite');
            const store = transaction.objectStore('tasks');
            const getRequest = store.get(task.id!);

            getRequest.onsuccess = async function(event: any) {
                const data = event.target.result;
                if (data) {
                    data.text = task.text;
                    data.date = task.date;
                    data.tags = task.tags
                }

                const transaction = await (db as IDBDatabase).transaction('tasks', 'readwrite');
                const store = transaction.objectStore('tasks');
                const updateRequest = store.put(data);

                updateRequest.onsuccess = function(event) {
                    dispatch({type: TasksActions.UPDATE_TASK_SUCCESS, payload: task})
                };

                updateRequest.onerror = function(event: any) {
                    dispatch({type: TasksActions.UPDATE_TASK_FAILURE, payload: 'Ошибка при обновлении задачи'})
                };
            };
        } catch (e) {
            dispatch({type: TasksActions.UPDATE_TASK_FAILURE, payload: 'Ошибка при обновлении задачи'})
        }
    }
}

export const deleteTasks = (id: number) => {

    return async (dispatch: Dispatch<DeleteTaskType>) => {
        try {
            dispatch({type: TasksActions.DELETE_TASK, payload: id})
            const db = await DB;
            const transaction = await (db as IDBDatabase).transaction('tasks', 'readwrite');
            const store = transaction.objectStore('tasks');
            const deleteRequest = store.delete(id);

            transaction.oncomplete = (event: Event) => {
               console.log('Задача удалена' + id)
                    dispatch({type: TasksActions.DELETE_TASK_SUCCESS, payload: id})

            };

        } catch (e) {
            dispatch({type: TasksActions.DELETE_TASK_FAILURE, payload: 'Ошибка при удалении задачи'})
        }
    }
}
