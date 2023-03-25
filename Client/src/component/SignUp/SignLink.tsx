import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface SignLink {
    link: string;
    linkText: string;
    message: string;
}

const SignLink = (props: SignLink) => {
    const {link, linkText, message} = props; 

    return (
        <MainContainer>
            {message}{' '}
            <Link to={link}>
                <SpanStyled>{linkText}</SpanStyled>
            </Link>
        </MainContainer>
    )
}

const MainContainer = styled.div`
    text-align: center;
    margin: 1.5rem;
`
const SpanStyled = styled.span`
    font-weight: bold;
    color: #486AC2;
`



export default SignLink;