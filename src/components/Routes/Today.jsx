import { useState, useContext, useEffect } from 'react';
import UserContext from '../../providers/UserContext';
import APIUrlContext from '../../providers/APIUrlContext';
import styled from 'styled-components';

import Footer from "./Footer";
import Header from "./Header";
import axios from 'axios';
import dayjs from 'dayjs';

function Today() {
    const [tasksState, setTasksState] = useState({ qtdCompleted: 0, qtdTotal: 0 });
    const [tasks, setTasks] = useState([]);
    const { user } = useContext(UserContext);
    const { url } = useContext(APIUrlContext);
    const { config } = user;

    useEffect(() => {
        const promise = axios.get(`${url}/today`, config);
        promise.then(response => setTasks(response.data));
        promise.catch(error => console.log(error.response.data));

    }, []);

    useEffect(() => {
        setTasksState({
            qtdCompleted: tasks.filter(task => task.done).length,
            qtdTotal: tasks.length
        });
    }, [tasks]);

    function currentDay() {
        /* require('dayjs/locale/pt-br');
        dayjs.locale('pt-br');
        const day = dayjs().format('dddd, DD/MM'); */
        const daysOfWeek = new Map(
            [[0, 'Domingo'], [1, 'Segunda-feira'],
            [2, 'Terça-feira'], [3, 'Quarta-feira'],
            [4, 'Quinta-feira'], [5, 'Sexta-feira'],
            [6, 'Sábado']]
        )
        const dayjs = require('dayjs');
        const day = dayjs().format('DD/MM');
        const weekDay = daysOfWeek.get(dayjs().day());

        return <h2>{weekDay}, {day}</h2>;
    }

    function currentState() {        
        const { qtdCompleted, qtdTotal } = tasksState;
        if(qtdTotal === 0) {
            return <p>Nenhum hábito concluido ainda</p>
        } else {
            return <p className='completed'>
                {qtdCompleted*100/qtdTotal}% dos hábitos concluídos
            </p>
        }
    }

    function assembleTasks() {
        return tasks.map(task => {
            console.log(task);
            return <TodayTaskST key={task.id} task={task} />
        });
    }

    return (
        <>
            <Header />
            <Conteiner >
                {currentDay()}
                {currentState()}
                {assembleTasks()}
            </Conteiner>
            <Footer />
        </>
    )
}

export default Today;

function TodayTaskST({ task }) {
    const { id, name, done, currentSequence, highestSequence } = task;
    return (
        <TodayTask>
            <div>
                <strong>{name}</strong>
                <small>Sequência atual: {currentSequence} dias</small>
                <small>Seu recorde: {highestSequence} dias</small>
            </div>
            <ion-icon
                className={done ? 'done' : ''}
                name="checkmark-outline">

            </ion-icon>
        </TodayTask>
    )
}

const Conteiner = styled.main`  
    display: flex;
    flex-direction: column;

    overflow-y: scroll;

    width: 100%;
    height: 100%;

    padding-top: var(--height-header);
    padding-bottom: calc(var(--height-header) + 100px);
    padding-inline: var(--padding-inline);
    background-color: var(--backgroud-main);

    h2 {
        margin-top: 2.8rem;
        font-size: var(--font-size-h2);
        color: var(--color-header);
    }

    >p {
        margin-top: 0.8rem;
        margin-bottom: 2.8rem;
        font-size: var(--font-size-p);
        color: var(--color-text-blurred);
    }
`

const TodayTask = styled.article`
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

    ion-icon {
        width: 4.2rem;
        height: 4.2rem;

        margin-block: auto;
        border-radius: 10px;
        background-color: var(--color-gray-desabled);
        color: #fff;
    }

    .done {
        background-color: var(--color-green);
    }
`