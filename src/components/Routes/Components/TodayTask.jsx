import TasksStateContext from "../../../providers/TasksStateContext";
import APIUrlContext from "../../../providers/APIUrlContext";
import UserContext from "../../../providers/UserContext";

import { useContext } from "react";
import { useState } from "react";

import styled from "styled-components";
import axios from "axios";



function TodayTask({ task, update }) {
    const { url } = useContext(APIUrlContext);
    const { user } = useContext(UserContext);
    const { config } = user;

    const { id, name, done, currentSequence, highestSequence } = task;
    const { tasksState, setTasksState } = useContext(TasksStateContext);
    const { qtdCompleted, qtdTotal } = tasksState;

    const [checked, setChecked] = useState(done);

    function handleChecked() {
        let promise;
        if (checked)
            promise = axios.post(`${url}/${id}/uncheck`, {}, config);
        else
            promise = axios.post(`${url}/${id}/check`, {}, config);

        promise.then(() => {
            setTasksState({ qtdCompleted: qtdCompleted, qtdTotal });
            setChecked(!checked);
            update();
        });
        promise.catch(error => console.error(error.response.data));
    }

    const highlighted = currentSequence === highestSequence || checked;

    return (
        <Conteiner checked={checked} isHighlighted={highlighted} >
            <div>
                <strong>{name}</strong>
                <small>Sequência atual: <span>{currentSequence} dias</span></small>
                <small>Seu recorde: <span>{highestSequence} dias</span></small>
            </div>
            <ion-icon
                name="checkmark-outline"
                onClick={handleChecked}
            >
            </ion-icon>
        </Conteiner>
    )
}

export default TodayTask;

const Conteiner = styled.article`
    display: flex;
    justify-content: space-between;

    margin-bottom: 1.2rem;
    padding: 18px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

    div {
        display: flex;
        flex-direction: column;
        margin-right: 8px;
    }

    div strong {
        margin-bottom: 8px;
        font-size: var(--font-size-strong);
        color: var(--color-text-gray);
    }
    
    div small {
        margin-top: 4px;
        font-size: var(--font-size-small);
        color: var(--color-text-blurred);
    }

    div small span {
        color: ${props => props.isHighlighted ? 'var(--color-green)' : 'var(--color-text-blurred)'};
    }

    ion-icon {
        width: 4.2rem;
        min-width: 4.2rem;
        height: 4.2rem;

        margin-block: auto;
        border-radius: 10px;
        background-color: ${props => props.checked ? 'var(--color-green)' : 'var(--color-text-blurred)'};
        color: #fff;
    }

    ion-icon.done {
        background-color: var(--color-green);
    }

    ion-icon:hover {
        box-shadow: 0px 0px 10px 0px ${props => props.checked ? 'var(--color-green)' : 'var(--color-text-blurred)'};
    }
`