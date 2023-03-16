import { css } from 'styled-components';
export const HoverAction = css`
  cursor: pointer;
  transition: all ease-in 200ms;
  &:hover {
    transform: scale(1.1);
  }
`;
