import React from 'react';
import useExpressionInput from '@hooks/use-expression-input';
import { Button } from 'ui/components/button';
import { CopyIcon } from 'ui/components/icons/copy-icon';
import { DeleteIcon } from 'ui/components/icons/delete-icon';
import { Input } from 'ui/components/input';

const ExpressionInput: React.FC = () => {
  const { expression, inputRef, copyExpression, deleteExpression, handleInputChange } = useExpressionInput();

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        className="h-14 text-lg font-medium absolute inset-0"
        placeholder="Enter expression..."
        spellCheck={false}
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
  );
};

export default ExpressionInput;
