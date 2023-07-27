import React, {useEffect, useState} from 'react';
import './pop-up.css'
import {Button, Modal} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import Task from '../task/Task';
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface PopUpProps {
    type?: 'task'
}

const PopUp: React.FC<PopUpProps> = ({type}) => {
    const [modal2Open, setModal2Open] = useState(false);

    const closePopUp = () => {
        setModal2Open(false);
    }



    return (
        <>
            <button onClick={() => setModal2Open(true)} className="add-button"><PlusOutlined/></button>

            <Modal
                title="Vertically centered modal dialog"
                centered
                open={modal2Open}
            >
                {type === 'task' &&
                    <Task popUp={true} onChange={closePopUp} type='default'></Task>
                }


            </Modal>
        </>
    );
};

export default PopUp;
