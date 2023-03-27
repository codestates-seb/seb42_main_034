import { ReturnData } from 'api/data';
import { StyledCategoryBtn } from 'pages/question/BoardList';
import React from 'react';
import { Button, IButtonProps } from './ui/Button';

export default function Page({ pages, onPage }: { pages: Partial<ReturnData>; onPage: React.Dispatch<string> }) {
  const { page, totalElements, totalPages } = pages;
  const handleLeftPage = () => {
    if (page === 1) return;
    onPage({ ...page, page: page - 1 });
  };
  const handleRightPage = () => {
    if (page === totalPages) return;
    onPage({ ...page, page: page + 1 });
  };
  return (
    <div>
      <Button children="<" onClick={handleLeftPage} />
      <div>
        <ul>
          {Array(totalPages)
            .fill('d')
            .map((page, idx) => (
              <li key={idx} className="list-none" onClick={() => onPage({ ...page, page: idx + 1 })}>
                <Button children={idx + 1} />
              </li>
            ))}
        </ul>
      </div>
      <Button children=">" onClick={handleRightPage} />
    </div>
  );
}
