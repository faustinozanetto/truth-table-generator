import { useContext } from 'react';
import AppContext from 'state/app-context';

const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('Tried to use AppContext outside its provider!');

  return context;
};

export default useAppState;
