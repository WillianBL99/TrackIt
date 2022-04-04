import axios from "axios";
import styled from "styled-components";

import { useContext } from "react";
import APIUrlContext from "../../providers/APIUrlContext";
import UserContext from "../../providers/UserContext";
import TasksStateContext from "../../providers/TasksStateContext";


function Task({ id, name, days, fetchTasks }) {
    const { tasksState, setTasksState } = useContext(TasksStateContext);
    const { url } = useContext(APIUrlContext);
    const { user } = useContext(UserContext);
    const { config } = user;

    function deleteTask() {
        if (window.confirm('Deseja realmente excluir essa tarefa?')) {

            const promise = axios.delete(`${url}/${id}`, config);
            promise.then(() => {
                setTasksState({ ...tasksState, qtdTotal: tasksState.qtdTotal - 2 });
                fetchTasks()
            });
            promise.catch(error => console.error(error.response));
        }
    }


    return (
        <Conteiner>
            <div >
                <p>{name}</p>
                <ion-icon onClick={deleteTask} name="trash-outline"></ion-icon>
            </div>
            <div className="weekdays">
                <Days days={days} />
            </div>
        </Conteiner>
    )
}

export default Task;

function Days({ days }) {
    const daysOfWeek = new Map(
        [
            [0, 'D'],
            [1, 'S'],
            [2, 'T'],
            [3, 'Q'],
            [4, 'Q'],
            [5, 'S'],
            [6, 'S'],
        ]
    );

    return Array.from(daysOfWeek.keys()).map(day => {
        return (
            <span
                key={day}
                className={days.includes(day) ? 'checked' : ''}
            >
                {daysOfWeek.get(day)}
            </span>
        );
    });
}

const Conteiner = styled.article`
    display: flex;
    flex-direction: column;

    position: relative;
        
    margin-top: 2.2rem;
    padding: 18px;
    border-radius: 10px;

    background-color: #fff;

    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 18px;
        width: 100%;
    }

    ion-icon {
        min-width: 1.6rem;
        margin: 0px;
        margin-bottom: auto;
        font-size: 1.6rem;
        color: var(--color-text-gray);
    }

    ion-icon:hover {
        color: red;
    }

    p {
        margin: 0;
        line-height: calc(var(--font-size-p) * 1.2);
        text-align: left;
        font-size: var(--font-size-p);
        color: var(--color-text-gray);
    }

    div.weekdays {
        display: flex;
        justify-content: flex-start
    }

    .weekdays span {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 2.8rem;
        height: 2.8rem;
        margin-inline-end: 4px;

        font-size: var(--font-size-p);
        color: var(--color-text-gray);

        border: 1px solid var(--color-gray-desabled);
        border-radius: 10px;
        color: var(--color-gray-desabled);
    } 

    .weekdays span.checked {
        background-color: var(--color-gray-desabled);
        color: #fff;
    }
`