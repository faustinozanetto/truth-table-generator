import React, { useEffect, useRef } from 'react';
import useExpressionInput from '@hooks/use-expression-input';
import { Button } from 'ui/components/button';
import { CopyIcon } from 'ui/components/icons/copy-icon';
import { DeleteIcon } from 'ui/components/icons/delete-icon';
import { Input } from 'ui/components/input';
import useAppState from '@hooks/use-app-state';
import { AppActionType } from 'types/app.types';

const ExpressionInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { expression, copyExpression, deleteExpression, handleInputChange } = useExpressionInput();
  const { dispatch } = useAppState();

  useEffect(() => {
    dispatch({ type: AppActionType.SET_INPUT_REF, payload: { inputRef } });
  }, [inputRef]);

  return (
    <div className="flex h-16 w-full">
      <div className="relative h-full flex-1">
        <Input
          ref={inputRef}
          className="h-14 text-lg font-medium absolute inset-0"
          placeholder="Enter expression..."
          spellCheck={false}
          value={expression ?? undefined}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        {expression && (
          <div className="space-x-1 absolute right-2 top-2 place-items-center">
            <Button variant="ghost" size="icon" onClick={deleteExpression}>
              <DeleteIcon className="stroke-current" />
            </Button>
            <Button variant="ghost" size="icon" onClick={copyExpression}>
              <CopyIcon />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpressionInput;
