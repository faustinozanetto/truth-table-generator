import React from 'react';

const Table: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="font-bold text-xl">Generated Table</h2>
      <div className="rounded-lg border shadow mt-2">
        <table>
          <thead className="font-bold uppercase">
            <tr>
              <th className="px-6 py-3 text-lg tracking-widest">A</th>
              <th className="px-6 py-3 text-lg tracking-widest">B</th>
              <th className="px-6 py-3 text-lg tracking-widest border-l-[1px]">A∧B</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="whitespace-nowrap px-6 py-3 text-center font-medium">F</td>
              <td className="whitespace-nowrap px-6 py-3 text-center font-medium">F</td>
              <td className="whitespace-nowrap px-6 py-3 text-center font-medium border-l-[1px]">T</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
