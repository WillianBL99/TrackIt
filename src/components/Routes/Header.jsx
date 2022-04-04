import styled from "styled-components";

import { useContext, useState } from "react";
import Menu from "./Components/Menu";
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