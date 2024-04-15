import React from 'react';
import ThemeToggler from '@components/theme/theme-toggler';
import ExpressionInput from '@components/expression/expression-input';
import Characters from '@components/characters/characters';
import Table from '@components/table/table';
import Footer from '@components/footer/footer';

const App: React.FC = () => {
  return (
    <div className="flex flex-col justify-between grow px-4 my-4">
      <div>
        <div className="container max-w-3xl flex justify-between items-center mt-4 mb-6 md:mb-12">
          <h1 className="text-2xl font-extrabold sm:text-3xl md:text-4xl grow text-primary">Truth Table Generator</h1>
          <ThemeToggler />
        </div>
        <div className="container max-w-3xl space-y-2 md:space-y-4">
          <ExpressionInput />
          <Characters />
          <Table />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
