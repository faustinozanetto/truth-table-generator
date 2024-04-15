export type ActionMap<M extends Record<string, unknown>> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

/* ======================== App State ======================== */
export interface AppState {
  expression: string;
}

export interface AppContextState {
  state: AppState;
  dispatch: React.Dispatch<AppActions>;
}

export enum AppActionType {
  SET_EXPRESSION,
  CLEAR_EXPRESSION,
  APPEND_CHARACTER,
  SET_INPUT_REF,
}

type AppPayload = {
  [AppActionType.SET_EXPRESSION]: {
    expression: string;
  };
  [AppActionType.CLEAR_EXPRESSION]: {};
  [AppActionType.APPEND_CHARACTER]: {
    character: CharacterData;
  };
};

export type AppActions = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];

/* ======================== Characters ======================== */
export interface CharacterData {
  name: string;
  value: string;
}

export type ExpresionTokenType = 'variable' | 'operator' | 'parenthesis';
export interface ExpressionToken {
  type: ExpresionTokenType;
  value: string;
}

export interface ExpressionNode {
  leftNode: ExpressionNode | null;
  rightNode: ExpressionNode | null;
  data: {
    expression: string;
    type: ExpresionTokenType;
    value: boolean;
  };
}

export type TruthTable = Record<string, boolean>[];
