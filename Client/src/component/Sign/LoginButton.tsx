import React from 'react';
import styled from 'styled-components';
import { Colors } from '../style/const';

interface ButtonInterface {
    fontSize?: string;
    backgroundColor?: string;
    padding?: string;
    width?: number;
    newLine?: boolean;
}

const Button = styled.button<ButtonInterface>`
    font-size: ${props => (props.fontSize === 'small' ? 0.7 : 1.2)}rem;
    color: ${props => (props.backgroundColor === 'grey' ? 'black' : 'white')};
    background-color: ${props =>
        props.backgroundColor === 'grey'
            ? props => Colors.button_01
            : props => Colors.button_clicked};
    border-radius: 4px;
    border: none;
    padding: ${props => props.padding || '7px 15px'};
    width: ${props => props.newLine && 3.1}rem;
    cursor: ${props =>
        props.backgroundColor === 'grey' ? 'default' : 'pointer'};
    :hover {
        background-color: ${props =>
            props.backgroundColor === 'grey'
                ? props => Colors.button_01
                : Colors.button_clicked};
    }
`;

export default Button;
