import { createContext } from 'react';
import { AppContextState, AppState } from 'types/app.types';

const initialState: AppContextState = {
  state: { expression: null, inputRef: { current: null } },
  dispatch: () => {},
};

const AppContext = createContext(initialState);

export default AppContext;