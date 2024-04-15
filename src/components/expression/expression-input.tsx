import useAppState from '@hooks/use-app-state';
import useDebounce from '@hooks/use-debounce';
import React, { useEffect, useState } from 'react';
import { AppActionType } from 'types/app.types';
import { Input } from 'ui/components/input';

const ExpressionInput: React.FC = () => {
  const { dispatch } = useAppState();
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedInputValue = useDebounce<string>(inputValue, 100);

  useEffect(() => {
    dispatch({ type: AppActionType.SET_EXPRESSION, payload: { expression: debouncedInputValue } });
  }, [debouncedInputValue]);

  return (
    <Input
      className="h-12 text-base md:h-16 md:text-lg font-medium"
      placeholder="Enter expression..."
      spellCheck={false}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};

export default ExpressionInput;
