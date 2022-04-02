import "react-circular-progressbar/dist/styles.css";

import {useContext} from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Link } from "react-router-dom";

import TasksStateContext from "../../providers/TasksStateContext";
import styled from "styled-components"

function Footer() {
    const { tasksState } = useContext(TasksStateContext);
    const { qtdCompleted, qtdTotal } = tasksState;

    const CircularProgressbarStyle = buildStyles({
        textColor: '#fff',
        pathColor: '#fff',
        trailColor: '#88ccfd',
        textSize: '1.5rem',
    });

    return (
        <Conteiner>
            <div>
                <Link to={'/habitos'}>Hábitos</Link>
                <Link to={'/historico'}>Histórico</Link>
            </div>
            <div className="circular">
                <Link to={'/hoje'}> 
                    <CircularProgressbar
                        value={qtdCompleted}
                        maxValue={qtdTotal}
                        text={`Hoje`}
                        strokeWidth={9}
                        styles={CircularProgressbarStyle}
                    />
                </Link>
            </div>
        </Conteiner>
    )
}

export default Footer;

const Conteiner = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    position: relative;

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;

    box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.25);

    a {
        font-size: var(--font-size-p);
        color: var(--color-main);
    }

    div {
        display: flex;
        justify-content: space-between;
        align-items: center;

        height: var(--height-header);
        padding-inline: 2rem;

        font-size: var(--font-size-p);

        color: var(--color-main);    
        background-color: #fff;
    }

    .circular {
        display: flex;
        --dimension-circular: 6rem;
        position: absolute;
        bottom: 0;
        left: calc(50% - (var(--dimension-circular) / 2));

        width: var(--dimension-circular);
        height: var(--dimension-circular);

        border-radius: 50%;

        padding: 6px;
        margin-bottom: 10px;

        background-color: var(--color-main);
        border: 1px solid #2270a8;
        background-image: linear-gradient(-180deg, #52B6FF 0%, #2883c4 100%);
        box-shadow: 
                0 0.3rem 1.2rem -5px #000000,
                0 -0.25rem 1.5rem #2270a8 inset,
                0 0.75rem 0.5rem #2883c4 inset,
                0 0.25rem 0.5rem 0 #2883c4 inset;
    }

    
`

