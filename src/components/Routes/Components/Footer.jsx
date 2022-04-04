import "react-circular-progressbar/dist/styles.css";

import {useContext} from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Link } from "react-router-dom";

import TasksStateContext from "../../../providers/TasksStateContext";
import styled from "styled-components"

function Footer() {
    const { tasksState } = useContext(TasksStateContext);
    const { qtdCompleted, qtdTotal } = tasksState;

    const CircularProgressbarStyle = buildStyles({
        textColor: '#fff',
        pathColor: '#dfdfdf',
        trailColor: '#52ace0',
        textSize: '1.5rem',
    });

    return (
        <Conteiner completed={qtdCompleted ===  qtdTotal && qtdTotal !== 0} >
            <div>
                <Link to={'/habitos'}>Hábitos</Link>
                <Link to={'/historico'}>Histórico</Link>
            </div>
            <div className="circular">
                <Link to={'/hoje'}> 
                    <CircularProgressbar
                        value={qtdCompleted}
                        maxValue={qtdTotal?qtdTotal:100}
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
        font-size: var(--font-size-strong);
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
    // tradução de incompleto  em ingluês:  
    --border-completed: #507a19;
    --border-incompleted: #2270a8;
    --bacground-shadow-completed: 
                0 0.3rem 1.2rem -5px #000000,
                0 -0.25rem 1.5rem #618a2c inset,
                0 0.75rem 0.5rem #8FC549 inset,
                0 0.25rem 0.5rem 0 #638d2c inset;
    --bacground-shadow-incompleted: 
                0 0.3rem 1.2rem -5px #000000,
                0 -0.25rem 1.5rem #2270a8 inset,
                0 0.75rem 0.5rem #2883c4 inset,
                0 0.25rem 0.5rem 0 #2883c4 inset;
    --bacground-image-completed: linear-gradient(-180deg, #a9df62 0%, #5c8527 100%);
    --bacground-image-incompleted: linear-gradient(-180deg, #52B6FF 0%, #2883c4 100%);

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
        border: ${
            props => props.completed ?
                `1px solid var(--border-completed)` :
                `1px solid var(--border-incompleted)`
        };
        background-image: ${
            props => props.completed ?
                `var(--bacground-image-completed)` :
                `var(--bacground-image-incompleted)`
        };
        box-shadow: ${
            props => props.completed ? 
                'var(--bacground-shadow-completed)' :
                'var(--bacground-shadow-incompleted)'
        };
    }

    
`

