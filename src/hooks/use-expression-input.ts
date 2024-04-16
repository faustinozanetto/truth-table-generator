import { AppActionType, AppState } from 'types/app.types';
import useAppState from './use-app-state';

interface UseExpressionInputReturn {
  /**
   * The boolean expression.
   */
  expression: AppState['expression'];
  /**
   * Function for deleting the expresion from the input.
   */
  deleteExpression: () => void;
  /**
   * Function for copying the expression to clipboard.
   */
  copyExpression: () => void;
  /**
   * Callback function for handling the input change event.
   * @param value Input value.
   */
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
