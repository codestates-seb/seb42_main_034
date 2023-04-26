import { BoxShadow } from 'component/style/cssTemplete';
import { Colors } from 'component/style/variables';

import React from 'react';
import styled from 'styled-components';
import Slick from './Slider';

export interface itemsProps {
  items: string;
  name: string;
}
type SomeComponentProps = {
  item: itemsProps;
  // Change this to `items` if you want to use `items` instead of `item`
};
const StyledSlick = styled(Slick)``;

function Item({ item }: SomeComponentProps) {
  return (
    <ItemImg url={item.items}>
      {/* <StyledImg src={item.item} alt={item.name} /> */}
      <Font>{item.name}</Font>
    </ItemImg>
  );
}
const StyledImg = styled.img`
  border-radius: 1em;
  ${BoxShadow}
  margin: 3em;
  &:hover {
    opacity: 0.8;
  }
  @media (min-width: 1254px) {
    margin: 0.1em;
  }
`;
const ItemImg = styled.div<{ url: string }>`
  width: 100%;
  position: relative;
  background-image: ${(props) => props.url && `url(${props.url})`};
  background-size: cover;
  height: 20em;
  margin: 4em;
  border-radius: 3em;
  ${BoxShadow}
  text-align:center;

  max-width: 70%;
  &:hover {
    opacity: 0.8;
  }
`;
const Font = styled.div`
  color: white;
  margin-top: 1em;
`;
export default Item;
