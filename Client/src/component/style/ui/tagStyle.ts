import styled from 'styled-components';
import { Colors, FontSize } from '../variables';

export const StyledTag = styled.div`
  color: ${Colors.main_02};
  font-weight: bold;
  font-size: ${FontSize.sm};
  box-shadow: 3px 3px 3px -2px rgba(0, 0, 0, 0.29);
  border-radius: 0.2rem;
  padding: 0.4rem;
  width: fit-content;
  text-align: center;
`;
