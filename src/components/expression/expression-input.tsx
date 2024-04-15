import React, { useEffect } from 'react';
import useExpressionInput from '@hooks/use-expression-input';
import { Button } from 'ui/components/button';
import { CopyIcon } from 'ui/components/icons/copy-icon';
import { DeleteIcon } from 'ui/components/icons/delete-icon';
import { Input } from 'ui/components/input';

const ExpressionInput: React.FC = () => {
  const { expression, copyExpression, deleteExpression, handleInputChange } = useExpressionInput();

  return (
    <div className="flex h-16 w-full">
      <div className="relative h-full flex-1">
        <Input
          className="h-14 text-lg font-medium absolute inset-0"
          placeholder="Enter expression..."
          spellCheck={false}
          value={expression}
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
