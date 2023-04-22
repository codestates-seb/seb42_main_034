import React, { DOMAttributes, SetStateAction, useCallback, useMemo } from 'react';
import { Dispatch } from 'react';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

export interface InputProps {
  className?: string;
  placeholder?: string;
  setState: Dispatch<SetStateAction<string>>;
  value?: string;
  disabled?: boolean;
  type: string;
}

function TextInput({ type, className, placeholder, setState, value = '', disabled = false }: InputProps) {
  const [text, setText] = useState(value);
  const input = useCallback((e: React.SetStateAction<string>) => setText(e), []);
  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    input(value);
    setState?.(value);
  };

  return (
    <input
      type={type}
      value={text}
      className={className}
      placeholder={placeholder}
      onChange={handleChange}
      disabled={disabled}
    />
  );
}

export default TextInput;
