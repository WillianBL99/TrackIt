import styled from "styled-components";

import UserIcon from '../../assets/bob.svg'

function Header() {
    return (
        <HeaderST>
            <Logo>TrackIt</Logo>
            <img src={UserIcon} alt="Usuário" />
        </HeaderST>
    );
}

export default Header;

const HeaderST = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 3.5rem;

    background-color: var(--color-header);

    img {
        height: 70%;
        margin-right: 15px;
    }
`;

const Logo = styled.h1`
    margin-left: 20px;

    font-family: var(--font-family-logo);
    font-size: 2.2rem;

    color: #fff;
`