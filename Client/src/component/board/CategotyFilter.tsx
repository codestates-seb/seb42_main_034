import { Relative } from 'component/style/cssTemplete';
import { CategoryFilter, Section, StyledCategoryBtn } from 'pages/QuestionBoardList';
import React, { useState } from 'react';
import { AiOutlineBulb } from 'react-icons/ai';
import { FaMicroblog } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
export const section: string[] = ['questions', 'blogs'];
export default function CategotyFilter({ onClick, filter }: { onClick: (section: string) => void; filter: string }) {
  const navigate = useNavigate();
  const { category } = useParams();

  return (
    <Section>
      {section.map((ft, idx) => (
        <StyledCategoryBtn
          selected={ft === filter && true}
          key={idx}
          children={
            ft === 'blogs' ? (
              <CategoryFilter>
                블로그
                <AiOutlineBulb />
              </CategoryFilter>
            ) : (
              <CategoryFilter>
                질문하기 <FaMicroblog />
              </CategoryFilter>
            )
          }
          onClick={() => {
            onClick(ft);
          }}
        />
      ))}
    </Section>
  );
}
