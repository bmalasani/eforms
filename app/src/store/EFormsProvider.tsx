import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { ReactParent } from '../types';
import { ACTION, AppStore, reducer } from './store';

const EFORMS = createContext<[AppStore, React.Dispatch<ACTION>]>([] as any);

export function useEformsContext(): [AppStore, React.Dispatch<ACTION>] {
  const context = useContext(EFORMS);

  if (!context) {
    throw new Error('useEformsContext should be used inside the EFormsProvider.!');
  }
  return context;
}

export function EFormsProvider({ children }: ReactParent) {
  const getColorSchema = () =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches
      ? 'dark'
      : 'light';

  const initialState: AppStore = {
    theme: 'light',
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo<[AppStore, React.Dispatch<ACTION>]>(
    () => [state, dispatch],
    [state, dispatch]
  );

  return <EFORMS.Provider value={value}>{children}</EFORMS.Provider>;
}
