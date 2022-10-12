export interface IUser {
  firstName: string;
  lastName: string;
}
export type ACTION = { type: string; payload: any };
export interface AppStore {
  theme: 'light' | 'dark';
  user?: IUser;
  form?: any;
  settings?: any;
}

export enum ACTION_TYPE {
  SET_THEME = 'SET_THEME',
  SET_USER = 'SET_USER',
  SET_FORM = 'SET_FORM',
  SET_SETTINGS = 'SET_SETTINGS',
}

export function reducer(state: AppStore, { type, payload }: ACTION): AppStore {
  switch (type) {
    case ACTION_TYPE.SET_FORM:
      return { ...state, form: payload };
    case ACTION_TYPE.SET_THEME:
      return { ...state, theme: payload };
    case ACTION_TYPE.SET_USER:
      return { ...state, user: payload };
    case ACTION_TYPE.SET_SETTINGS:
      return { ...state, settings: payload };
    default:
      return state;
  }
}
