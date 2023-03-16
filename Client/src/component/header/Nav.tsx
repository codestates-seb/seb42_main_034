import React, { FC } from 'react';
import { Logo } from './Logo';
import { Props } from '../header/Logo';
import UserTab from './UserTab';

export default function Nav({ className }: Props) {
  return (
    <div className={className}>
      <Logo />
      <UserTab />
    </div>
  );
}
