import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';


function Menu({ image, email, name }) {
    const navigate = useNavigate();

    function logout() {
        if (window.confirm('Deseja realmente sair?')) {
            localStorage.clear();
            navigate('/');
        }
    }

    return (
        <Conteiner>
            <header className='menu' >
                <img src={image} alt='imagem do usuário' />
                <div>
                    <strong>{name}</strong>
                    <p>{email}</p>
                </div>
            </header>
            <ul>
                <li onClick={logout} >Logout</li>
            </ul>
        </Conteiner>
    );
}

export default Menu;

const Conteiner = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;

    position: fixed;
    top: calc(var(--height-header) + 2px);
    left: 2px;

    z-index: 5;

    width: auto;
    height: auto;

    border-radius: 10px;
    box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    
    header.menu {
        width: auto;
        display: flex;
        padding: 0.8rem;
        border-bottom: 1px solid var(--color-gray-desabled);
    }

    header.menu img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
    }

    header.menu div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-inline-start: 0.5rem;
    }

    header.menu div strong {
        font-size: var(--font-size-h2);
        color: var(--color-header);
    }

    header.menu div p {
        font-size: var(--font-size-p);
        color: var(--color-text-gray);
        margin-right: 0.5rem;
    }

    ul {
        width: auto;
        display: flex;
        flex-direction: column;
        margin-top: 0.2rem;
        padding: 0.8rem;
    }

    ul li {
        display: flex;
        margin-bottom: 1rem;
        cursor: pointer;
    }

    ul li:hover {
        color: var(--color-main);
    }
    `