import { Link } from "react-router-dom";
import styled from "styled-components";

import LogoImg from '../../assets/logo.svg'

function Login() {
    return (
        <Conteiner>
            <Logo src={LogoImg} />
            <form>
                <input type="email" placeholder="email" required />
                <input type="password" placeholder="senha" required />
                <button type="submit">Entrar</button>
            </form>
            <Link to={'/cadastro'}>Não tem uma conta? Cadastre-se!</Link>
        </Conteiner>
    );
}

export default Login;

const Logo = styled.img`
    width: 15rem;
    height: 15rem;
`

const Conteiner = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    padding-inline: var(--padding-inline);
    
    form {
        display: flex;
        flex-direction: column;
        
        width: 100%;
        
        padding-top: 50px;
        padding-bottom: 40px;
    }

    form input {
        height: 3.8rem;

        margin-bottom: 10px;
        padding-left: 20px;

        font-size: var(--font-size-login);
        
        border: 1px solid #D5D5D5;
        border-radius: 5px;
    }

    form button {
        height: 3.8rem;

        font-size: 1.8rem;

        background: var(--color-main);
        color: #fff;
        border-radius: 4.63636px;
    }

    a {
        font-size: 1.3rem;
        color: var(--color-main);
    }
`