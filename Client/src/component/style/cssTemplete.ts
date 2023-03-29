import styled, { css } from 'styled-components';
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
export const Flex = styled.div<{
  width?: string;
  height?: string;
  direction?: string;
  justify?: string;
  items?: string;
  gap?: string;
  position?: string;
}>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.items};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  gap: ${(props) => props.gap};
  position: ${(props) => props.position};
`;
export const Relative = styled.div<{ width?: string; height?: string; pb?: string }>`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding-bottom: ${(props) => props.pb};
`;
export const Absolute = styled.div<{ top?: number; left?: number; right?: number }>`
  position: absolute;
  top: ${(props) => props.top}rem;
  left: ${(props) => props.left}rem;
  right: ${(props) => props.right}rem;
`;
export const Border = css`
  border: 1px solid black;
`;
export const MaxWidthDiv = styled.div``;
