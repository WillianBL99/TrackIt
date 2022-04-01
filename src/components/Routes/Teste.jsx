import { 
    Audio, Bars

 } from 'react-loader-spinner';

import styled from 'styled-components';
function Teste() {






    return (
        <Conteiner>
            <Bars color="#00BFFF" height={80} width={80} />
            <input type="text" placeholder="Digite o nome do hábito" />
            <button>Adicionar</button>
        </Conteiner>
    );
}

export default Teste;

const Logo = styled.img`
    width: 10rem;
    height: 10rem;
`

const Conteiner = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    z-index: 5;

    width: 100%;
    height: 100%;

    padding-inline: var(--padding-inline);
    
    form {
        display: flex;
        flex-direction: column;
        
        width: 100%;
        
        padding-top: 50px;
        padding-bottom: 25px;
    }

    form input {
        height: 3.5rem;

        margin-bottom: 10px;
        padding-left: 20px;

        font-size: var(--font-size-login);
        
        border: 1px solid #D5D5D5;
        border-radius: 10px;
    }

    form button {
        height: 3.5rem;

        font-size: 1.6rem;

        background: var(--color-main);
        color: #fff;
        border-radius: 10px;
    }

    a {
        text-align: center;
        font-size: 1.05rem;
        color: var(--color-main);
    }
`