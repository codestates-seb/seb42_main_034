import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonWrapper } from './Button';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 45rem;
  border-radius: 10px;
  background: skyblue;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
  border: 1px solid var(--border-003);
  border-radius: 10px;
  background: var(--main-001);
`;
const FilterContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomList = styled.fieldset`
  font-size: var(--font-size-lg);
  display: flex;
  flex-direction: column;
  border: none;
`;

const ButtonContainer = styled(ButtonWrapper)``;

export default function SearchFilter() {
  const [filter, setFilter] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<number>(0);

  const filterHandler = () => {
    setFilter(!filter);
  };

  const handleFilterType = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.target.value string 으로 들어와서 => number 으로 바꿈
    if (filtered === Number(e.target.value)) {
    } else {
      setFiltered(Number(e.target.value));
    }
  };

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setFilter(false);
    }
  };

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(filtered, '눌리나?');
    setFilter(!filter);
  };

  const options = [
    { id: 'created', value: '1', label: 'Created', name: 'option' },
    { id: 'answered', value: '2', label: 'Answered', name: 'option' },
    { id: 'comment', value: '3', label: 'Comment', name: 'option' },
  ];

  return (
    <>
      <ButtonWrapper onClick={filterHandler}>Filter</ButtonWrapper>
      {filter ? (
        <ModalWrapper onClick={closeModal}>
          <ModalContent>
            <FilterWrapper>
              <FilterContainer>
                <CustomList>
                  <h2>sorted</h2>
                  {options.map((el) => (
                    <div key={el.id}>
                      <label htmlFor={el.id}>{el.label}</label>
                      <input type="radio" id={el.id} value={el.value} name={el.name} onChange={handleFilterType} />
                    </div>
                  ))}
                  <ButtonContainer onClick={clickHandler}>Click</ButtonContainer>
                </CustomList>
              </FilterContainer>
            </FilterWrapper>
          </ModalContent>
        </ModalWrapper>
      ) : null}
    </>
  );
}
