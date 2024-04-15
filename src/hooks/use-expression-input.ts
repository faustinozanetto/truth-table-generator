import { AppActionType, AppState } from 'types/app.types';
import useAppState from './use-app-state';
import useDebounce from './use-debounce';

interface UseExpressionInputReturn {
  expression: AppState['expression'];
  deleteExpression: () => void;
  copyExpression: () => void;
  handleInputChange: (value: string) => void;
}

const useExpressionInput = (): UseExpressionInputReturn => {
  const { dispatch, state } = useAppState();

  // const debouncedInputValue = useDebounce<string>(inputValue, 100);

  const deleteExpression = () => {
    if (state.inputRef.current) state.inputRef.current.value = '';
    dispatch({ type: AppActionType.CLEAR_EXPRESSION, payload: {} });
  };

  const copyExpression = () => {};

  const handleInputChange = (value: string) => {
    dispatch({ type: AppActionType.SET_EXPRESSION, payload: { expression: value } });
  };

  return {
    expression: state.expression,
    deleteExpression,
    copyExpression,
    handleInputChange,
  };
};

export default useExpressionInput;
