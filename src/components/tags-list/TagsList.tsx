import React, {useEffect} from 'react';
import "./TagsList.css";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {TasksActions} from "../../type/task-actions.type";

const TagsList: React.FC = () => {

    const {tags, checkTags} = useTypedSelector(state => state.tasks);
    const dispatch = useDispatch();

    const onCheckTags = (tag: string) => {
        dispatch({type: TasksActions.CHECK_TAGS, payload: tag})
    }

    useEffect(() => {

    }, [checkTags])

    return (
        <div className="tags-list">
            <h2>Теги</h2>
            <div className="tags-items">
                {tags.map((tag, index) =>
                    <button
                        onClick={() => onCheckTags(tag)}
                        className={checkTags.includes(tag) ? 'tags-item active' : 'tags-item'} key={index}>{tag}</button>
                )}
            </div>
        </div>
    );
};

export default TagsList;
