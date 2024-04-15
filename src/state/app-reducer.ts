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
        expression: '',
      };
    }
    case AppActionType.APPEND_CHARACTER: {
      const expression = `${state.expression ?? ''}${action.payload.character.value}`;
      return {
        ...state,
        expression,
      };
    }
    default:
      throw new Error('The action you requested does not exists!');
  }
};
