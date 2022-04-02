import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';

import styled from "styled-components";
import axios from 'axios';

import LogoImg from '../../assets/logo.svg'

function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        name: "",
        image: "",
        password: ""
    });

    function register(event) {
        event.preventDefault();        
        setIsLoading(true);
        const url = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up';

        const promise = axios.post(url, userData);
        promise.then(() => {
            setIsLoading(false);
            navigate('/', {state: {password: userData.password, email: userData.email }});
        });
        promise.catch(error => {
            alert(error.response.data.message + '\nTente novamente');
            setIsLoading(false);
        });
    }

    function buttonLogin() {
        if (isLoading) {
            return <button disabled><ThreeDots color="#fff" height={'1.8rem'} width={'100%'} /></button>
        }
        return <button type='submit'>Cadastrar</button>
    }

    return (
        <Conteiner>
            <Logo src={LogoImg} />
            <form onSubmit={register} >
                <input
                    onChange={e => { setUserData({ ...userData, name: e.target.value }) }}
                    value={userData.name}
                    type="name"
                    placeholder="nome"
                    required
                />
                <input
                    onChange={e => { setUserData({ ...userData, email: e.target.value }) }}
                    value={userData.email}
                    type="email"
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
                <input
                    onChange={e => { setUserData({ ...userData, image: e.target.value }) }}
                    value={userData.image}
                    type="text"
                    placeholder="foto"
                    required>

                </input>
                {buttonLogin()}
            </form>
            <Link className="link" to={isLoading ? '' : '/'}>
                Já tem uma conta? Faça login!
            </Link>
        </Conteiner>
    );
}

export default Register;

const Logo = styled.img`
    width: 10rem;
    height: 10rem;
`

const Conteiner = styled.main`
    --input-background: #fff;
    --input-color: var(--color-text-gray);
    --input-background-disabled: var(--color-text-blurred);
    --input-color-disabled: var(--color-text-gray);
    
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
        height: 3.8rem;

        margin-bottom: 10px;
        padding-left: 20px;

        font-size: var(--font-size-login);
        border: 1px solid #D5D5D5;
        border-radius: 10px;
        background: var(--input-background);
        color: var(--input-color);
    }
    

    input:hover {
        border: 1px solid #808080;
    }

    input:disabled{
        background: var(--input-background-disabled);
        color: var(--input-color-disabled);
        cursor: progress;
    }

    form button {
        height: 3.5rem;

        font-size: 1.6rem;

        background: var(--color-main);
        color: #fff;
        border-radius: 10px;
    }

    button:hover{
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    }

    button:disabled{
        cursor: progress;
    }

a {
    cursor: ${props => props.isLoading ? 'progress' : 'pointer'};
    text-align: center;
    font-size: 1.05rem;
    text-decoration: underline;
    color: var(--color-main);
}
`