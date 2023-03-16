import styled from 'styled-components';
interface ButtonProps {
  text: string;
  fontSize?: string;
  backgroundColor?: string;
  padding?: string;
  width?: number;
}

const Button = styled.button<ButtonProps>`
  font-size: ${(props) => props.theme.font.base};
  width: ${(props) => props.width};
  height: 2.5rem;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  background-color: ${(props) => props.color};
  &:hover {
    background-color: ${(props) => props.theme.colors.buttonHover};
    transition: all 0.5s;
  }
  &:disabled {
    background-color: ${(props) => props.theme.colors.grey};
  }
`;

export default Button;
