import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonWrapper } from './Button';

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 45rem;
  margin-top: 30px;
  border: 1px solid var(--border-003);
  border-radius: 10px;
  background: var(--main-001);
  /* margin 나중에 수정 */
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

const ButtonContainer = styled.button`
  width: 50%;
  margin-bottom: 10px;
`;

export default function SearchFilter() {
  const [filter, setFilter] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<number>();

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

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(e, '눌리나?');
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
            </CustomList>
          </FilterContainer>
          <ButtonContainer onClick={clickHandler}>Click</ButtonContainer>
        </FilterWrapper>
      ) : null}
    </>
  );
}
