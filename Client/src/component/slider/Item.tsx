import { BoxShadow } from 'component/style/cssTemplete';
import { Colors } from 'component/style/variables';

import React from 'react';
import styled from 'styled-components';
import Slick from './Slider';

interface itemsProps {
  item: string;
  name: string;
}

const StyledSlick = styled(Slick)``;
const items: itemsProps[] = [
  {
    item: 'https://images.unsplash.com/photo-1597552661064-af143a5f3bee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    name: 'Seoul',
  },
  {
    item: 'https://images.unsplash.com/photo-1575907794679-016b6bd90285?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80',
    name: 'Busan',
  },
  {
    item: 'https://images.unsplash.com/photo-1591688795017-4f31784362ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    name: 'Gangneung',
  },
  {
    item: 'https://images.unsplash.com/photo-1634131484642-887b96daac15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80',
    name: 'Incheon',
  },
  {
    item: 'https://images.unsplash.com/photo-1606739669974-ced280212a14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80',
    name: 'Jeonju',
  },
];

function Item() {
  return (
    <StyledSlick>
      {items.map((item, index) => (
        <ItemImg key={index} url={item.item}>
          {/* <StyledImg src={item.item} alt={item.name} /> */}
          <Font>{item.name}</Font>
        </ItemImg>
      ))}
    </StyledSlick>
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
