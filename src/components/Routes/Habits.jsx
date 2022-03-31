import styled from "styled-components";
import { useState, useEffect } from 'react';
import axios from "axios";

function Habits() {

    const [habits, setHabits] = useState([]);
    const [habit, setHabit] = useState({ name: 'Programar', days: [1] });
    const [showInput, setShowInput] = useState(false);

    function storyNewHabit() {
        const url = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';
        const { token } = JSON.parse(localStorage.getItem('userInfo'));

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const { name, days } = habit;
        const body = { name, days };

        console.log(body);
        const promise = axios.post(url, body, config);

        promise.then(response => {
            console.log(response.data);
            setHabits(response.data);
            setHabit({name: '', days: []});
            setShowInput(false);
        });
        promise.catch(error => console.log(error.response));
    };

    function cancel() {
        setHabit({ name: '', days: [] });
        setShowInput(false);
    }

    function createHabit() {
        if (showInput) {
            return (
                <article>
                    <input
                        onChange={({target}) => setHabit({ ...habit, name: target.value }) }
                        value={habit.name}
                        type="text"
                        placeholder="nome do hábito"
                    />
                    <div className="weekdays">
                        <Days setDays={(days) => setHabit({...habit, days: days })} days={habit.days} />
                    </div>
                    <div className="options">
                        <button onClick={cancel} >Cancelar</button>
                        <button onClick={storyNewHabit} >Salvar</button>
                    </div>
                </article>
            );
        } else { return <></> }
    }

    return (
        <Conteiner>
            <AddHabit>
                <h2>Meus hábitos</h2>
                <ion-icon onClick={() => setShowInput(!showInput)} name="add-sharp"></ion-icon>
            </AddHabit>
            {createHabit()}
            <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
        </Conteiner>
    );
}

export default Habits;


function Days({ setDays, days }) {
    const daysOfWeek = new Map();
    daysOfWeek.set(1, 'S');
    daysOfWeek.set(2, 'T');
    daysOfWeek.set(3, 'Q');
    daysOfWeek.set(4, 'Q');
    daysOfWeek.set(5, 'S');
    daysOfWeek.set(6, 'S');
    daysOfWeek.set(7, 'D');

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

    width: 100%;
    height: 100%;

    padding-top: var(--height-header);
    padding-inline: var(--padding-inline);
    background-color: var(--backgroud-main);

    p {
        margin-top: 2.8rem;
        font-size: var(--font-size-p);
        color: var(--color-text-gray);
    }

    article {
        display: flex;
        flex-direction: column;
        
        margin-top: 2.2rem;
        padding: 18px;
        border-radius: 10px;

        background-color: #fff;
    }

    article input {
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

    article .weekdays {
        display: flex;
    }

    article .weekdays span {
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

    article .weekdays span.checked {
        background-color: var(--color-gray-desabled);
        color: #fff;
    }
    
    span:hover{
        cursor: pointer;    
        border-color: var(--color-gray-desabled);
    }

    article .options {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        margin-top: 30px;
    }

    article button {
        height: 3.2rem;

        padding-inline: 22px;
        font-size: var(--font-size-p);

        border-radius: 10px;

        background: var(--color-main);
        color: #fff;
    }

    article button:first-child {
        background: none;
        color: var(--color-main);
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