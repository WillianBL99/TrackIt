import { useContext } from "react";
import styled from "styled-components";
import { useState} from "react";
import axios from "axios";

import TasksStateContext from "../../providers/TasksStateContext";
import APIUrlContext from "../../providers/APIUrlContext";
import UserContext from "../../providers/UserContext";


function TodayTask({ task, update }) {

    const { id, name, done, currentSequence, highestSequence } = task;

    const {tasksState, setTasksState} = useContext(TasksStateContext);
    const {qtdCompleted, qtdTotal} = tasksState;

    const { url } = useContext(APIUrlContext);
    const { user } = useContext(UserContext);
    const { config } = user;

    const [checked, setChecked] = useState(done);

    function handleChecked() {
        let qtd = 0;
        let promise;
        if (checked) {
            promise = axios.post(`${url}/${id}/uncheck`, {}, config);
            qtd -= 1;
        } else {
            promise = axios.post(`${url}/${id}/check`, {}, config);
            qtd += 1;
        }
        promise.then(() => {
            console.log(qtdCompleted, qtdTotal, qtdCompleted+qtd);
            setTasksState({qtdCompleted: qtdCompleted + qtd, qtdTotal});
            setChecked(!checked);
            update();
        });
        promise.catch(error => console.log(error.response.data));
    }

    return (
        <Conteiner checked={checked} isRecord={currentSequence >= highestSequence} >
            <div>
                <strong>{name}</strong>
                <small className="first">Sequência atual: {currentSequence} dias</small>
                <small>Seu recorde: {highestSequence} dias</small>
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

    margin-bottom: 2.2rem;
    padding: 18px;
    border-radius: 10px;
    background-color: #fff;

    div {
        display: flex;
        flex-direction: column;
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

    div small.first {
        color: ${props => props.isRecord ? 'var(--color-green)' : 'var(--color-text-blurred)'};
    }

    ion-icon {
        width: 4.2rem;
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