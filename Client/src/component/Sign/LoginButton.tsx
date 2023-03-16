// import React from 'react';
// import styled from 'styled-components';

// interface ButtonInterface {
//     fontSize?: string;
//     backgroundColor?: string;
//     padding?: string;
//     width?: number;
//     newLine?: boolean;
// }

// const Button = styled.button<ButtonInterface>`
//     font-size: ${props => (props.fontSize === 'small' ? 0.7 : 1.2)}rem;
//     color: ${props => (props.backgroundColor === 'grey' ? 'black' : 'white')};
//     background-color: ${props =>
//         props.backgroundColor === 'grey'
//             ? props => props.theme.colors.buttonGrey
//             : props => props.theme.colors.buttonBlue};
//     border-radius: 4px;
//     border: none;
//     padding: ${props => props.padding || '7px 15px'};
//     width: ${props => props.newLine && 3.1}rem;
//     cursor: ${props =>
//         props.backgroundColor === 'grey' ? 'default' : 'pointer'};
//     :hover {
//         background-color: ${props =>
//             props.backgroundColor === 'grey'
//                 ? props => props.theme.colors.buttonGrey
//                 : props.theme.colors.buttonHoverBlue};
//     }
// `;

// export default Button;
