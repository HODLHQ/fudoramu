import {
  ActionType,
  AppActions,
  Reset,
  SetAddress,
  SetConnection,
  SetENS,
  StartConnecting
} from '@/app/actions'
import { AppContext } from '@/app/context'
import {
  appReducer,
  reset,
  setAddress,
  setConnection,
  setENS,
  startConnecting
} from '@/app/reducers'
import { AppState, initialAppState } from '@/app/state'
import { ReactNode, useContext, useMemo, useReducer } from 'react'

export type {
  AppState,
  StartConnecting,
  SetConnection,
  SetAddress,
  SetENS,
  AppActions,
  Reset
}
export {
  AppContext,
  initialAppState,
  ActionType,
  appReducer,
  startConnecting,
  setConnection,
  setAddress,
  setENS,
  reset
}

export const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState)
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider.')
  }
  return context
}
