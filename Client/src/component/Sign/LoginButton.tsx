import styled from 'styled-components';


interface ButtonInterface {
  fontSize?: string;
  backgroundColor?: string;
  padding?: string;
  width?: number;
  newLine?: boolean;
}

const LoginButton = styled.button<ButtonInterface>`
  font-size: ${(props) => (props.fontSize === 'small' ? 0.7 : 1.2)}rem;
  color: black;
  background-color: #FDFFEC;
  border-radius: 4px;
  border: none;
  font-size: 16px;
  padding: ${(props) => props.padding || '7px 15px'};
  width: ${(props) => props.newLine && 3.1}rem;
  cursor: ${(props) => (props.backgroundColor === 'grey' ? 'default' : 'pointer')};
`;

export default LoginButton;
