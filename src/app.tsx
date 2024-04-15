import React from 'react';
import ThemeToggler from '@components/theme/theme-toggler';
import ExpressionInput from '@components/expression/expression-input';

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center px-4 my-4 bg-background font-sans subpixel-antialiased scroll-smooth">
      <div className="flex w-full items-center mt-4 mb-6 md:mb-12 max-w-5xl">
        <h1 className="text-2xl font-extrabold text-center sm:text-3xl md:text-4xl grow">Truth Table Generator</h1>
        <ThemeToggler />
      </div>
      <div className="container max-w-3xl">
        <ExpressionInput />
      </div>
    </div>
  );
};

export default App;
