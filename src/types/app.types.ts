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

/* App State */
export interface AppState {
  expression: string | null;
}

export interface AppContextState {
  state: AppState;
  dispatch: React.Dispatch<AppActions>;
}

export enum AppActionType {
  SET_EXPRESSION,
  CLEAR_EXPRESSION,
}

type AppPayload = {
  [AppActionType.SET_EXPRESSION]: {
    expression: string;
  };
  [AppActionType.CLEAR_EXPRESSION]: {};
};

export type AppActions = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];
