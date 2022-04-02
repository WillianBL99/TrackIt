import UserContext from '../../providers/UserContext';
import TasksStateContext from '../../providers/TasksStateContext';
import APIUrlContext from '../../providers/APIUrlContext';

import { useState, useContext, useEffect } from 'react';

import styled from 'styled-components';
import axios from 'axios';

import Footer from "./Footer";
import TodayTask from './TodayTask';
import Header from "./Header";

function Today() {
    const [tasks, setTasks] = useState([]);
    const { user } = useContext(UserContext);
    const { url } = useContext(APIUrlContext);
    const { config } = user;

    const { tasksState, setTasksState } = useContext(TasksStateContext);
    const { qtdCompleted, qtdTotal } = tasksState;

    useEffect(() => {
        update();
    }, []);

    function update() {
        const promise = axios.get(`${url}/today`, config);
        promise.then(response => {
            updateTaskState(response.data);
            setTasks(response.data);
        });
        promise.catch(error => console.error(error.response.data));
    }

    function updateTaskState(tasks) {
        const completed = tasks.filter(task => task.done).length;
        const total = tasks.length;
        setTasksState({ qtdCompleted: completed, qtdTotal: total });
        localStorage.setItem('tasksState',
            JSON.stringify({ qtdCompleted: completed, qtdTotal: total }));
    }

    function currentDay() {
        const daysOfWeek = new Map(
            [[0, 'Domingo'], [1, 'Segunda'],
            [2, 'Terça'], [3, 'Quarta'],
            [4, 'Quinta'], [5, 'Sexta'],
            [6, 'Sábado']]
        )
        const dayjs = require('dayjs');
        const day = dayjs().format('DD/MM');
        const weekDay = daysOfWeek.get(dayjs().day());

        return <h2>{weekDay}, {day}</h2>;
    }


    function currentState() {
        if (qtdCompleted === 0) {
            return <p>Nenhum hábito concluido ainda</p>
        } else {
            return <p className='completed'>
                {(qtdCompleted * 100 / qtdTotal).toFixed(0)}% dos hábitos concluídos
            </p>
        }
    }

    function assembleTasks() {
        return tasks.map(task => {
            return <TodayTask key={task.id} task={task} update={update} />
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

    .completed {
        color: var(--color-green);
    }
`