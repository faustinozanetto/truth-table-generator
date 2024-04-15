import { createContext } from 'react';
import { AppContextState } from 'types/app.types';

const initialState: AppContextState = {
  state: { expression: '' },
  dispatch: () => {},
};

const AppContext = createContext(initialState);

export default AppContext;
