import React, { useReducer } from 'react';
import AppContext from 'state/app-context';
import { appReducer } from 'state/app-reducer';

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(appReducer, {
    expression: null,
  });

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export default AppProvider;
