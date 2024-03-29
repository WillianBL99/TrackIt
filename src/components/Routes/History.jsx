import CalendarStyle from '../../styled/CalendarStyled';
import 'react-calendar/dist/Calendar.css';

import { useEffect, useState, useContext } from 'react';

import APIUrlContext from '../../providers/APIUrlContext';
import UserContext from '../../providers/UserContext';
import styled from 'styled-components';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Calendar from 'react-calendar';
import axios from 'axios';

function History() {
    const { url } = useContext(APIUrlContext);
    const { user } = useContext(UserContext);
    const { config } = user;

    const [value, onChange] = useState(new Date());
    const [dailyHabits, setDailyHabits] = useState(null);
    const [habitList, setHabitList] = useState([]);

    useEffect(() => {
        const promise = axios.get(`${url}/history/daily`, config);

        promise.then(response => {
            const habitsMap = new Map(
                response.data.map(habit => [
                    habit.day,
                    habit.habits])
            );
            setDailyHabits(habitsMap);
        });
        promise.catch(error => alert(error.response.data.details));
    }, []);

    function dailyHabit(date) {
        if (dailyHabits) {
            const dateFormatted = formateDate(date);
            if (dailyHabits.has(dateFormatted)) {
                if (habitIsDoned(dailyHabits.get(dateFormatted)))
                    return <p className='habit habit-doned'>{date.getDate()}</p>
                else
                    return <p className='habit habit-not-doned'>{date.getDate()}</p>
            }
        }
        return date.getDate();
    }

    function habitIsDoned(habits) {
        return habits.every(habit => habit.done);
    }

    function formateDate(date) {
        const dateJoined = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        const dayjs = require('dayjs');
        const dateFormatted = dayjs(dateJoined).format('DD/MM/YYYY');
        return dateFormatted;
    }

    function fillHabitList(date) {
        if (dailyHabits) {
            const dateFormatted = formateDate(date);
            if (dailyHabits.has(dateFormatted)) {
                setHabitList(
                    dailyHabits.get(dateFormatted).map(habit => {
                        return <Habit key={habit.id} title={habit.name} done={habit.done} />
                    })
                );
            } else setHabitList([]);
        }
    }

    function showHabits() {
        if (habitList.length > 0)
            return (
                <>
                    <h3>Habitos do dia selecinado</h3>
                    {habitList}
                </>
            );
        else
            return <h3>Nenhum hábito selecinado</h3>
    }

    return (
        <>
            <Header />
            <Conteiner>
                <h2>Histórico </h2>
                {/* <p>Em breve você poderar ver o histórico dos seus hábitos aqui!</p> */}
                <CalendarStyle>
                    <Calendar
                        onChange={onChange}
                        locale="pt-BR"
                        value={value}
                        formatDay={(locale, date) => dailyHabit(date)}
                        onClickDay={(date) => { fillHabitList(date) }}
                    />
                </CalendarStyle>
                {showHabits()}
            </Conteiner>
            <Footer />
        </>
    );
}

export default History;

function Habit({ title, done }) {
    const icon = done ? 'checkmark' : 'close';
    return (
        <HabitContainer state={done} >
            <p>{title}</p>
            <ion-icon name={`${icon}-outline`}></ion-icon>
        </HabitContainer>
    )
}

const HabitContainer = styled.article`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border-radius: 5px;
    background-color: #fff;

    >p {
        font-size: var(--font-size-small);
        color: var(--color-text-gray);
    }

    >ion-icon {
        font-size: 100%;
        min-width: 1rem;
        margin-left: 0.5rem;
        color: ${props => props.state ? 'var(--color-green)' : 'var(--color-red)'};
    }
`

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

    h3{
        margin-block: 1rem;
        font-size: var(--font-size-strong);
        color: var(--color-text-gray);
    }

    >p {
        margin-top: 2.8rem;
        margin-bottom: 2.8rem;
        font-size: var(--font-size-p);
        color: var(--color-text-grey);
    }
`