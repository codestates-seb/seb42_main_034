import React from 'react';
import styled from 'styled-components';
import { Props } from '../header/Logo';

export const Icon: React.FC<Props> = ({ svg, className }: Props): React.ReactElement => {
  return <div className={className}>{svg};</div>;
};
