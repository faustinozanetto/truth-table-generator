import useAppState from '@hooks/use-app-state';
import { generateTruthTableFromExpression } from '@lib/expressions.lib';
import React, { useEffect, useState } from 'react';
import { TruthTable } from 'types/app.types';
import { cn } from 'ui/lib/ui.lib';

const Table: React.FC = () => {
  const { state } = useAppState();
  const [truthTable, setTruthTable] = useState<TruthTable>([]);
  const [variables, setVariables] = useState<string[]>([]);

  useEffect(() => {
    try {
      const { truthTable, variables } = generateTruthTableFromExpression(state.expression);
      setTruthTable(truthTable);
      setVariables(variables);
    } catch (err) {}
  }, [state.expression]);

  if (truthTable.length === 0) return null;

  return (
    <div className="flex flex-col items-center justify-center animate-in fade-in slide-in-from-top-4">
      <h2 className="font-bold text-xl">Generated Table</h2>
      <div className="rounded-lg border shadow mt-2">
        <table>
          <thead className="font-bold uppercase">
            <tr>
              {variables.map((variable) => (
                <th key={variable} className="px-6 py-3 text-lg tracking-widest">
                  {variable}
                </th>
              ))}
              <th className="px-6 py-3 text-lg tracking-widest border-l-[1px]">{state.expression}</th>
            </tr>
          </thead>
          <tbody>
            {truthTable.map((row, i) => (
              <tr key={`row-${i}`} className="border-t">
                {Object.values(row).map((value, j) => (
                  <td
                    key={`value-${i},${j}`}
                    className={cn(
                      'whitespace-nowrap px-6 py-3 text-center font-medium',
                      j === variables.length ? 'border-l' : ''
                    )}
                  >
                    {value ? 'T' : 'F'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
