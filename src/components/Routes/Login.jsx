import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'
import styled from "styled-components";
import axios from "axios";

import LogoImg from '../../assets/logo.svg'
import UserContext from "../../providers/UserContext";

function Login() {
    console.log('Login');
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { state } = useLocation();
    const [userData, setUserData] = useState(persistLogin);

    autoLogin();

    function autoLogin(){
        const { email, password} = JSON.parse(
            localStorage.getItem('userInfo')
        )
        if (email && password) {
            handleLogin({ email, password });
        } else {
            localStorage.removeItem('userInfo');
        }
    }

    function persistLogin() {
        const { email, password } = JSON.parse(localStorage.getItem('userInfo'));
        return { email, password };
    }

    function storeLogin(info) {
        if (userData.password) {
            const { token, image, name, email } = info;
            const userInfo = {
                config: { headers: { Authorization: `Bearer ${token}` } },
                image,
                name,
                email,
                password: userData.password
            }
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            setUser(userInfo)
        }
    }

    function submitLogin(event) {
        event.preventDefault();
        setIsLoading(true);
        handleLogin(userData);
    }

    function handleLogin(userInfo) {
        const { email, password } = userInfo;
        const url = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login';
        const promise = axios.post(url, userInfo);

        promise.then(response => {
            setIsLoading(false);
            storeLogin(response.data);
            navigate('/hoje');
        });
        promise.catch(() => {
            alert('Usuário ou senha inválidos');
            setIsLoading(false);
        });
    }

    function buttonLogin() {
        if (isLoading) {
            return <button disabled><ThreeDots color="#fff" height={'1.8rem'} width={'100%'} /></button>
        }
        return <button type='submit'>Entrar</button>
    }

    useEffect(() => {
        if (state) {
            setUserData({ email: state.email, password: state.password });
        }
    }, [state]);

    return (
        <Conteiner disabled={isLoading} >
            <Logo src={LogoImg} />
            <form onSubmit={submitLogin} >
                <input
                    onChange={e => { setUserData({ ...userData, email: e.target.value }) }}
                    value={userData.email} type="email"
                    placeholder="email"
                    required
                    disabled={isLoading}
                />
                <input
                    onChange={e => { setUserData({ ...userData, password: e.target.value }) }}
                    value={userData.password}
                    type="password"
                    placeholder="senha"
                    required
                    disabled={isLoading}
                    background="green"
                />
                {buttonLogin()}
            </form>
            <Link className="link" to={isLoading ? '' : '/cadastro'}>
                Não tem uma conta? Cadastre-se!
            </Link>
        </Conteiner>
    );
}

export default Login;



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
        height: 3.5rem;

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

    input:-webkit-autofill {
        font-size: var(--font-size-login);
        background: var(--input-background);
        color: var(--input-color);
    }

    input:-webkit-autofill {
        font-size: var(--font-size-login);
        background: var(--input-background);
        color: var(--input-color);
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
        cursor: ${props => props.disabled ? 'progress' : 'pointer'};
        text-align: center;
        font-size: 1.05rem;
        text-decoration: underline;
        color: var(--color-main);
    }
`