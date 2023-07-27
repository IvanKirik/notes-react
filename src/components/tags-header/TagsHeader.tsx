import React, {useEffect} from 'react';
import './TagsHeader.css'
import {CloseOutlined} from "@ant-design/icons";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {TasksActions} from "../../type/task-actions.type";

const TagsHeader: React.FC = () => {

    const {checkTags} = useTypedSelector(state => state.tasks);
    const dispatch = useDispatch();

    useEffect(() => {

    }, [checkTags])

    const closeTags = (tag: string) => {
        dispatch({type: TasksActions.CHECK_TAGS, payload: tag})
    }

    return (
        <>
            <div className="header-tags">
                {checkTags.map((tag, index) =>
                    <div className="tag" key={index}>
                        <span>{tag}</span>
                        <button onClick={() => closeTags(tag)}><CloseOutlined/></button>
                    </div>
                )}
            </div>
        </>
    );
};

export default TagsHeader;
