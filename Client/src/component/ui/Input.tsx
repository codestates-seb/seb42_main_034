import React, { DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import classNames from 'classnames';

export interface IInputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  name?: string;
  type?: string;
  error?: string;
  value: string;
  onChange: any;
}

export const Input = forwardRef(
  //...rest마우스커서올려보면 그 외 인자도 받음
  ({ className, name, type, error, ...rest }: IInputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    return (
      <>
        <input
          className={classNames(className, 'Input', { Input__error: error })}
          name={name}
          type={type}
          ref={ref}
          {...rest}
        />
      </>
    );
  },
);
