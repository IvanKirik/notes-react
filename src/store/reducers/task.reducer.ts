import {checkTagsUtil} from "../../utils/checkTags.util";
import {filterUtil} from "../../utils/filter.util";
import {ITasksState, TaskActionsType} from "../index";
import {TasksActions} from "../../type/task-actions.type";
import {TaskType} from "../../type/task-item.type";

export const initialState: ITasksState = {
    tasks: [],
    filteredTask: [],
    loading: false,
    error: null,
    tags: [],
    checkTags: [],
    message: ''
}

export const tasksReducer = (state: ITasksState = initialState, action: TaskActionsType): ITasksState => {
    switch (action.type) {
        case TasksActions.FETCH_TASKS:
            return {
                ...state,
                loading: true,
                error: null,
                tasks: []
            };
        case TasksActions.FETCH_TASKS_SUCCESS:
            let tagsItems: string[] = [];
            (action.payload as TaskType[]).forEach(task => {
                task.tags.forEach(tag => {
                    tagsItems.push(tag);
                })
            })
            tagsItems = Array.from(new Set(tagsItems));
            return {
                ...state,
                loading: false,
                error: null,
                tasks: action.payload,
                filteredTask: action.payload,
                tags: tagsItems
            };
        case TasksActions.FETCH_TASKS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                tasks: [],
                tags: state.tags
            };
        case TasksActions.SET_TASK:
            return {
                ...state,
                loading: true,
                error: null,
                tasks: state.tasks,
                tags: state.tags
            };
        case TasksActions.SET_TASK_SUCCESS:
            let setTags = Array.from(new Set([...action.payload.tags, ...state.tags]));
            let setTasks = [...state.tasks];
            setTasks.push(action.payload)
            return {
                ...state,
                loading: false,
                error: null,
                tasks: setTasks ,
                filteredTask: setTasks,
                tags: setTags,
                message: 'Заметка добавлена'
            };
        case TasksActions.SET_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                tasks: state.tasks,
                tags: state.tags
            };
        case TasksActions.DELETE_TASK:
            return {
                ...state,
                loading: true,
                error: null,
                tasks: state.tasks,
                tags: state.tags
            };
        case TasksActions.DELETE_TASK_SUCCESS:
            let id = action.payload;
            let tasks = state.filteredTask.filter(item => item.id !== id);
            return {
                ...state,
                loading: false,
                error: null,
                tasks: tasks,
                filteredTask: tasks,
                message: 'Заметка удалена'
            };
        case TasksActions.DELETE_TASK_FAILURE:
            return {
                ...state,
                loading:
                    false, error: (action.payload as string),
                tasks: state.tasks,
                tags: state.tags
            };
        case TasksActions.UPDATE_TASK:
            return {
                ...state,
                loading: true,
                error: null,
                tasks: state.tasks,
                tags: state.tags
            };
        case TasksActions.UPDATE_TASK_SUCCESS:
            const updateTasks = state.tasks.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        id: item.id,
                        text: action.payload.text,
                        date: action.payload.date,
                        tags: [...item.tags, ...action.payload.tags],
                    }
                }
                return item;
            });
            let updateTags = Array.from(new Set([...action.payload.tags, ...state.tags]));
            return {
                ...state,
                loading: false,
                error: null,
                tasks: updateTasks,
                filteredTask: updateTasks,
                tags: updateTags,
                message: 'Заметка обновлена'
            };
        case TasksActions.UPDATE_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: (action.payload as string),
                tasks: state.tasks,
                tags: state.tags
            };
        case TasksActions.CHECK_TAGS:
            let tagsArr = checkTagsUtil(state.checkTags, action.payload);
            let filteredTasks = filterUtil(state.tasks, tagsArr);
            if(filteredTasks.length === 0) {
                filteredTasks = state.tasks;
            }
            return {
                ...state,
                checkTags: tagsArr,
                filteredTask: filteredTasks,
            }
        default:
            return state;
    }
}
