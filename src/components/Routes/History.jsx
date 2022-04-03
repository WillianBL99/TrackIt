import CalendarStyle from './CalendarStyled';
import 'react-calendar/dist/Calendar.css';

import { useEffect, useState, useContext } from 'react';

import APIUrlContext from '../../providers/APIUrlContext';
import UserContext from '../../providers/UserContext';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Calendar from 'react-calendar';
import axios from 'axios';

function History() {
    const { url } = useContext(APIUrlContext);
    const { user } = useContext(UserContext);
    const { config } = user;

    const [value, onChange] = useState(new Date());
    const [dailyHabits, setDailyHabits] = useState(null);

    useEffect(() => {
        console.log('chamou useEffect');
        const promise = axios.get(`${url}/history/daily`, config);

        promise.then(response => {
            console.log(response.data);
            const habitsMap = new Map(
                response.data.map(habit => [
                    habit.day,
                    habit.habits])
            )
            console.log(habitsMap);
            console.log(typeof (habitsMap));
            setDailyHabits(habitsMap);
        });
        promise.catch(error => console.log(error.response));
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
        return new Date(dateJoined).toLocaleDateString();
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
                        onClickDay={(e) => { console.log(e.getDate()) }}
                        formatDay={(locale, date) => dailyHabit(date)}
                    />
                </CalendarStyle>
            </Conteiner>
            <Footer />
        </>
    );
}

export default History;

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
        margin-top: 2.8rem;
        margin-bottom: 2.8rem;
        font-size: var(--font-size-p);
        color: var(--color-text-grey);
    }

    div.calendar {
        width: 85vw;
        display: flex;
        justify-content: center;
    }
`