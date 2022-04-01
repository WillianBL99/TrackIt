import { useState, useEffect, useContext } from 'react';
import UserContext from "../../providers/UserContext";
import APIUrlContext from "../../providers/APIUrlContext";
import TasksStateContext from '../../providers/TasksStateContext';
import styled from "styled-components";
import axios from "axios";
import Task from "./Task";

import Header from "./Header";
import Footer from "./Footer";

function Habits() {
    const [habits, setHabits] = useState([]);
    const [habit, setHabit] = useState({ name: '', days: [] });
    const [showInput, setShowInput] = useState(false);
    const {tasksState, setTasksState} = useContext(TasksStateContext);
    const { url } = useContext(APIUrlContext);
    const { user } = useContext(UserContext);
    const { config } = user;

    useEffect(() => {
        fetchTasks();
    }, []);

    function fetchTasks() {
        const promise = axios.get(url, config);
        promise.then(response => setHabits(response.data));
        promise.catch(error => console.log(error.response.data));
    }

    function storyNewHabit() {
        const promise = axios.post(url, habit, config);

        promise.then(() => {
            fetchTasks();
            setShowInput(false);
            setTasksState({...tasksState, qtdTotal: tasksState.qtdTotal + 1});
        });
        promise.catch(error => console.log(error.response));
    };

    function cancel() {
        setShowInput(false);
    }

    function createHabit() {
        if (showInput) {
            return (
                <CreatTask>
                    <input
                        onChange={({ target }) => setHabit({ ...habit, name: target.value })}
                        value={habit.name}
                        type="text"
                        placeholder="nome do hábito"
                    />
                    <div className="weekdays">
                        <Days setDays={(days) => setHabit({ ...habit, days: days })} days={habit.days} />
                    </div>
                    <div className="options">
                        <button onClick={cancel} >Cancelar</button>
                        <button onClick={storyNewHabit} >Salvar</button>
                    </div>
                </CreatTask>
            );
        } else { return <></> }
    }

    function makeHabits() {
        if (habits.length !== 0) {
            return (
                habits.map(({ id, name, days }) => <Task key={id} id={id} name={name} days={days} fetchTasks={fetchTasks} />));
        } else {
            return <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
        }
    }

    return (
        <>
            <Header />
            <Conteiner>
                <AddHabit>
                    <h2>Meus hábitos</h2>
                    <ion-icon onClick={() => setShowInput(!showInput)} name="add-sharp"></ion-icon>
                </AddHabit>
                {createHabit()}
                {makeHabits()}
            </Conteiner>
            <Footer />
        </>
    );
}

export default Habits;


function Days({ setDays = () => { }, days }) {
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

    function handleCheck(day) {
        setDays(days.includes(day) ? days.filter(d => d !== day) : [...days, day]);
    }

    return Array.from(daysOfWeek.keys()).map(day => {
        return (
            <span
                key={day}
                className={days.includes(day) ? 'checked' : ''}
                onClick={() => handleCheck(day)}
            >
                {daysOfWeek.get(day)}
            </span>
        );
    });
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

    >p {
        margin-top: 2.8rem;
        font-size: var(--font-size-p);
        color: var(--color-text-gray);
    }

    
`

const AddHabit = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 2.8rem;

    font-size: var(--font-size-h2);
    color: var(--color-header);

    ion-icon {

        padding: 0 3px;
        font-size: 2.8rem;

        border-radius: 7px;

        background-color: var(--color-main);
        color: #fff;
    }
`

const CreatTask = styled.article`

    display: flex;
    flex-direction: column;
    
    margin-top: 2.2rem;
    padding: 18px;
    border-radius: 10px;

    background-color: #fff;

    input {
        height: 3.5rem;        

        margin-bottom: 10px;
        padding-left: 20px;

        font-size: var(--font-size-login);
        
        border: 1px solid #D5D5D5;
        border-radius: 10px;
        color: var(--color-text-gray);
    }

    input::placeholder {
        color: var(--color-gray-desabled);
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
    
    span:hover{
        cursor: pointer;    
        border-color: var(--color-gray-desabled);
    }

    .options {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        margin-top: 30px;
    }

    button {
        height: 3.2rem;

        padding-inline: 22px;
        font-size: var(--font-size-p);

        border-radius: 10px;

        background: var(--color-main);
        color: #fff;
    }

    button:first-child {
        background: none;
        color: var(--color-main);
    }
`