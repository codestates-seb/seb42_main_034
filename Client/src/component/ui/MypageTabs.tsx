import styled from 'styled-components';
import React from 'react';

interface TabListsProps {
    tabs: {
        id: number;
        name: string;
        selected: boolean 
    }[];
    handleChange: (id: number) => void;
}
interface TabProps {
    selected: boolean;
}

const TabLists = (props: TabListsProps) => {
    
    const { tabs, handleChange } = props;
    return (
        <Container>
      {tabs.map((tab) => {
        const { id, name, selected } = tab;
        return (
          <Tab
            key={id}
            selected={selected}
            onClick={() => {
              handleChange(id);
            }}
          >
            <span>{name}</span>
          </Tab>
        );
      })}
        </Container>
    );
};

export default TabLists;

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    margin: 1rem 0;
    max-width: 800px;
`

const Tab = styled.button<{ selected: boolean }>`
    width: 45%;
    max-width: 380px;
    height: 2.5rem;
    background-color: skyblue;
    border: none;
    cursor: pointer;
    font-size: 10px;

    :hover {
        background-color: blue;
    }
    .span {
        width: 100%;
    }
    @media (min-width:800px) {
        width: 450px;
        justify-content: center;
    }
`