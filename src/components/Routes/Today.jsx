import { useState, useContext, useEffect } from 'react';
import UserContext from '../../providers/UserContext';
import APIUrlContext from '../../providers/APIUrlContext';
import styled from 'styled-components';

import Footer from "./Footer";
import Header from "./Header";

function Today() {
    return (
        <>
            <Header />
            <Conteiner >
                <h2>Segunda, 31/03</h2>
                <p>Nenhum hábito concluido ainda</p>

                <TodayTask>
                    <div>
                        <strong>Ler 1 capítulo de livro</strong>
                        <small>Seu recorde: 5 dias</small>
                        <small>Seu recorde: 5 dias</small>
                    </div>
                    <ion-icon name="checkmark-outline"></ion-icon>
                </TodayTask>
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
`

const TodayTask = styled.article`
    display: flex;
    justify-content: space-between;

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

    .selected {
        background-color: var(--color-green);
`