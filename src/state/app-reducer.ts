import { AppActionType, AppActions, AppState } from 'types/app.types';

export const appReducer = (state: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case AppActionType.SET_EXPRESSION: {
      return {
        ...state,
        expression: action.payload.expression,
      };
    }
    case AppActionType.CLEAR_EXPRESSION: {
      return {
        ...state,
        expression: null,
      };
    }
    case AppActionType.APPEND_CHARACTER: {
      const expression = `${state.expression ?? ''}${action.payload.character.value}`;
      if (state.inputRef.current) {
        const inputValue = state.inputRef.current.value;
        state.inputRef.current.value = `${inputValue}${action.payload.character.value}`;
      }
      return {
        ...state,
        expression,
      };
    }
    case AppActionType.SET_INPUT_REF: {
      return {
        ...state,
        inputRef: action.payload.inputRef,
      };
    }
    default:
      throw new Error('The action you requested does not exists!');
  }
};
