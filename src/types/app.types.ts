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
  expression: string | null;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
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
  [AppActionType.SET_INPUT_REF]: {
    inputRef: React.MutableRefObject<HTMLInputElement | null>;
  };
};

export type AppActions = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];

/* ======================== Characters ======================== */
export interface CharacterData {
  name: string;
  value: string;
}
