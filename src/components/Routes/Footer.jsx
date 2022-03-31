import styled from "styled-components"

import { CircularProgressbar, buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Footer() {

    const percentage = 80;

    const CircularProgressbarStyle = buildStyles({
        textColor: '#fff',
        pathColor: '#fff',
        trailColor: 'none',
        textSize: '1.5rem',
    });

    return (
        <Conteiner>
            <div>
                <p>Hábitos</p>
                <p>Histórico</p>
            </div>
            <div className="circular">
                <CircularProgressbar
                    value={percentage}
                    text={`Hoje`}
                    strokeWidth={9}
                    styles={CircularProgressbarStyle}
                />
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
    }
`

