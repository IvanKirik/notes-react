import React, {useEffect, useState} from 'react';
import "./Task.css"
import {
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    SaveOutlined
} from "@ant-design/icons";
import {useActions} from "../../hooks/useActions";
import PopUp from "../pop-up/pop-up";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import { HighlightWithinTextarea } from 'react-highlight-within-textarea';
import {getDateUtil} from "../../utils/getDate.util";
import {TaskType} from "../../type/task-item.type";

interface TaskProps {
    type?: 'light' | 'default';
    popUp?: boolean;
    task?: TaskType;
    onChange?: () => void;
}

const Task: React.FC<TaskProps> = ({type, task, popUp, onChange}) => {
    const [readonly, setReadonly] = useState(true);
    const [formValue, setFormValue] = useState(task?.text);
    const [tags, setTags] = useState(task?.tags);

    const {filteredTask} = useTypedSelector(state => state.tasks)
    const {updateTasks, setTasks, deleteTasks} = useActions();

    const typeComponentClass = type === 'light' ? 'task light' : 'task';

    const handleInputChange = (value: string) => {
        setFormValue(value);

        const newTags = value.match(/#[\wа-яА-ЯёЁ]+/g);
        setTags(newTags || []);
    }

    useEffect(() => {
        if (popUp) {
            setReadonly(false);
            if (onChange) {
                onChange();
            }
        }
    }, [readonly])



    const update = () => {
        updateTasks({
            id: task!.id,
            text: formValue!,
            date: new Date,
            tags: tags!
        })
        setReadonly(true)
    }

    const createTask = () => {
        const id = Math.random() + (filteredTask!.length);
        setTasks({
            id: id,
            text: formValue!,
            date: new Date,
            tags: tags!
        })
        setReadonly(true);
    }

    const removeTask = () => {
        deleteTasks(task!.id!)
    }

    const setDate = () => {
        return getDateUtil(task?.date!)
    }

    return (
        <>
            <div className={typeComponentClass}>
                <div className="date">{setDate()}</div>
                <div className="task-text">
                    {type === 'light' && <PopUp type='task'></PopUp>}
                    {type === 'default' && <HighlightWithinTextarea
                        readOnly={readonly}
                        value={formValue ? formValue : ''}
                        onChange={handleInputChange}
                    />
                    }
                </div>
                <div className="tags">
                    {tags?.map((tag) => (
                        <span
                            key={tag}
                            style={{ cursor: 'pointer', textDecoration: 'underline' }}
                        >
                        {tag}
                        </span>
                    ))}
                </div>
                {type === 'default' && <div className="task-actions">

                    {readonly && <button
                        onClick={() => setReadonly(!readonly)}
                        className="task-button">
                        <EditOutlined/>
                    </button>}

                    {!readonly && !popUp && <button
                        onClick={() => update()}
                        className="task-button">
                        <SaveOutlined/>
                    </button>}

                    {!readonly && popUp && <button
                        onClick={() => createTask()}
                        className="task-button">
                        <CheckOutlined/>
                    </button>}

                    {!popUp &&
                        <button className="task-button"
                                onClick={() => removeTask()}
                        >
                            <DeleteOutlined/>
                        </button>}
                    {popUp &&
                        <button className="task-button"
                                onClick={onChange}
                        >
                            <CloseOutlined/>
                        </button>
                    }

                </div>}
            </div>
        </>
    );
};

export default Task;
