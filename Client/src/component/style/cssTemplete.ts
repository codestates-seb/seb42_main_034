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
export const ButtonTheme = css`
  width: 110px;
  height: 105px;
  font-size: var(--font-size-md);
  border: none;
  border-radius: 10px;
  background-color: var(--button-001);
  color: var(--button-text);
  &:active {
    background-color: var(--button-clicked);
  }
`;
export const Flex = css`
  display: flex;
  flex-direction: column;
`;
export const Relative = css`
  position: relative;
`;
export const Absolute = css`
  position: absolute;
`;
