import { css } from 'styled-components';
export const HoverAction = css`
  cursor: pointer;
  transition: all ease-in 200ms;
  &:hover {
    transform: scale(1.1);
  }
`;
export const BoxShadow = css`
  box-shadow: 11px 10px 27px -2px rgba(0, 0, 0, 0.29);
  -webkit-box-shadow: 11px 10px 27px -2px rgba(0, 0, 0, 0.29);
  -moz-box-shadow: 11px 10px 27px -2px rgba(0, 0, 0, 0.29);
`;
