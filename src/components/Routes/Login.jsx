import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';

import LogoImg from '../../assets/logo.svg'

function Login() {
    const { state } = useLocation();
    const [userData, setUserData] = useState({ email: '', password: '' });
    console.log(userData);
    console.log(state);

    useEffect(() => {
        if (state) {
            setUserData({ email: state.email, password: state.password });
        }
    }, [state]);

    return (
        <Conteiner>
            <Logo src={LogoImg} />
            <form>
                <input
                    onChange={e => { setUserData({ ...userData, email: e.target.value }) }}
                    value={userData.email} type="email"
                    placeholder="email"
                    required
                />
                <input 
                    onChange={e => { setUserData({ ...userData, password: e.target.value }) }}
                    value={userData.password} 
                    type="password" 
                    placeholder="senha" 
                    required 
                />
                <button type="submit">Entrar</button>
            </form>
            <Link to={'/cadastro'}>Não tem uma conta? Cadastre-se!</Link>
        </Conteiner>
    );
}

export default Login;

const Logo = styled.img`
    width: 10rem;
    height: 10rem;
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