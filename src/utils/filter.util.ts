import {TaskType} from "../type/task-item.type";


export function filterUtil(defaultArray: TaskType[], tagsArr: string[]): TaskType[] {
    let newArray: TaskType[] = [];
    defaultArray.forEach(task => {
        tagsArr.forEach(tag => {
            task.tags.forEach(taskTag => {
                if(tag === taskTag) {
                    newArray.push(task)
                }
            })
        })
    })
    return newArray;
}
