import styled from "styled-components";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../providers/UserContext";

function Header() {
    const [openMenu, setOpenMenu] = useState(false);    
    const { user } = useContext(UserContext)
    const { image, email, name } = user;

    function toggleMenu() {
        setOpenMenu(!openMenu);
    }

    function showMenu(){
        if(openMenu){
            return <Menu image={image} name={name} email={email} />;
        }
        return <></>;
    }

    return (
        <HeaderST>
            <div>
                <ion-icon onClick={toggleMenu} name="ellipsis-vertical-sharp"></ion-icon>
                <Logo>TrackIt</Logo>
            </div>
            <img src={image} alt="Usuário" />
            {showMenu()}
        </HeaderST>
    );
}

export default Header;


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

const HeaderST = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: var(--height-header);

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;

    background-color: var(--color-header);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

    ion-icon {
        cursor: pointer;
        font-size: var(--font-size-h2);
        color: #fff;
    }

    ion-icon:hover {
        color: var(--color-text-gray);
    }

    div {
        display: flex;
        align-items: center;
    }

    img {
        width: 3.5rem;
        height: 3.5rem;
        object-fit: cover;
        object-position: center;

        margin-right: 15px;
        border-radius: 50%;
    }
`;

const Logo = styled.h1`
    margin-left: 20px;

    font-family: var(--font-family-logo);
    font-size: 2.2rem;

    color: #fff;
`

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
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    
    header.menu {
        width: auto;
        display: flex;
        padding: 0.8rem;
        border-bottom: 1px solid var(--color-gray-desabled);
    }

    header.menu img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
    }

    header.menu div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-inline-start: 1rem;
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