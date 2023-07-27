import React, {useEffect} from 'react';
import "./ListTasks.css"
import Task from "../task/Task";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import TagsHeader from "../tags-header/TagsHeader";
import {Button, notification} from "antd";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const ListTasks: React.FC = () => {

    const [api, contextHolder] = notification.useNotification();
    const {filteredTask, message} = useTypedSelector(state => state.tasks);
    const {fetchTasks} = useActions();

    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: message,
        });
    };

    useEffect(() => {
        fetchTasks();
        if(message) {
            openNotificationWithIcon('success');
        }
    }, [message])


    return (
        <>
            {contextHolder}
            <div className="tasks">
                <div className="header-task">
                    <h2>Заметки</h2>
                    <TagsHeader></TagsHeader>
                </div>
                <div className="list-tasks">
                    {filteredTask.map((task) =>
                        <Task type='default' task={task} key={task.id}></Task>
                    )}
                    <Task type='light'/>
                </div>
            </div>
        </>

    );
};

export default ListTasks;
