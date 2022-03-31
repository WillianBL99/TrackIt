import styled from "styled-components";

import {useContext} from "react";
import UserContext from "../../providers/UserContext";
function Header() {
    const {user} = useContext(UserContext);
    
    return (
        <HeaderST>
            <Logo>TrackIt</Logo>
            <img src={user.image} alt="Usuário" />
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