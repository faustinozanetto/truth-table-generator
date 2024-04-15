import { AppActionType, AppState } from 'types/app.types';
import useAppState from './use-app-state';

interface UseExpressionInputReturn {
  expression: AppState['expression'];
  deleteExpression: () => void;
  copyExpression: () => void;
  handleInputChange: (value: string) => void;
}

const useExpressionInput = (): UseExpressionInputReturn => {
  const { dispatch, state } = useAppState();

  const deleteExpression = () => {
    dispatch({ type: AppActionType.CLEAR_EXPRESSION, payload: {} });
  };

  const copyExpression = async () => {
    try {
      await navigator.clipboard.writeText(state.expression);
    } catch (err) {}
  };

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
