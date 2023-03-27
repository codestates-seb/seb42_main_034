import { Props } from 'component/header/Logo';
import React from 'react';

export const IconPng: React.FC<Props> = ({ className, src }: Props): React.ReactElement => {
  return <img className={className} src={src} />;
};
