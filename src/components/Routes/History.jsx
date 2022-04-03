import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

import '../../css/calendar.css';

import { useState } from 'react'
import Calendar from 'react-calendar';

function History() {
    const [value, onChange] = useState(new Date());

    return (
        <>
            <Header />
            <Conteiner>
                <h2>Histórico</h2>
                {/* <p>Em breve você poderar ver o histórico dos seus hábitos aqui!</p> */}
                <div className='calendar'>
                    <Calendar
                        value={value}
                        onChange={onChange}
                        view='month'
                    />
                </div>
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