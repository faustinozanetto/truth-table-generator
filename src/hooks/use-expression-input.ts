import React, { useEffect, useRef, useState } from 'react';
import { AppActionType, AppState } from 'types/app.types';
import useAppState from './use-app-state';
import useDebounce from './use-debounce';

interface UseExpressionInputReturn {
  expression: AppState['expression'];
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  deleteExpression: () => void;
  copyExpression: () => void;
  handleInputChange: (value: string) => void;
}

const useExpressionInput = (): UseExpressionInputReturn => {
  const { dispatch, state } = useAppState();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedInputValue = useDebounce<string>(inputValue, 100);

  useEffect(() => {
    dispatch({ type: AppActionType.SET_EXPRESSION, payload: { expression: debouncedInputValue } });
  }, [debouncedInputValue]);

  const deleteExpression = () => {
    if (inputRef.current) inputRef.current.value = '';
    setInputValue('');
  };

  const copyExpression = () => {};

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  return {
    expression: state.expression,
    inputRef,
    deleteExpression,
    copyExpression,
    handleInputChange,
  };
};

export default useExpressionInput;
