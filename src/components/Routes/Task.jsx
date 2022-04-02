import axios from "axios";
import styled from "styled-components";

import { useContext } from "react";
import APIUrlContext from "../../providers/APIUrlContext";
import UserContext from "../../providers/UserContext";
import TasksStateContext from "../../providers/TasksStateContext";


function Task({ id, name, days, fetchTasks }) {
    const {tasksState, setTasksState} = useContext(TasksStateContext);
    const {url} = useContext(APIUrlContext);
    const {user} = useContext(UserContext);
    const {config} = user;

    function deleteTask() {
        if (window.confirm('Deseja realmente excluir essa tarefa?')) {
            
            const promise = axios.delete(`${url}/${id}`, config);
            promise.then(() => {                
                setTasksState({...tasksState, qtdTotal: tasksState.qtdTotal -2});
                fetchTasks()
            });
            promise.catch(error => console.error(error.response));
        }
    }


    return (
        <Conteiner>
            <div onClick={deleteTask}><ion-icon name="trash-outline"></ion-icon></div>
            <p>{name}</p>
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
            [1, 'S'],
            [2, 'T'],
            [3, 'Q'],
            [4, 'Q'],
            [5, 'S'],
            [6, 'S'],
            [7, 'D']
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

    ion-icon {
        position: absolute;
        top: 0;
        right: 0;

        margin: 10px;
        font-size: 1.6rem;
        color: var(--color-text-gray);
    }

    ion-icon:hover {
        color: red;
    }

    p {
        margin: 0;
        margin-bottom: 18px;
        font-size: var(--font-size-p);
        color: var(--color-text-gray);
    }

    .weekdays {
        display: flex;
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