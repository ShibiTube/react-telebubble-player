import {
  createContext,
  useContext,
  Context as ReactContext,
} from 'react'
import type { ProgressRingInputContext } from './types'

const Context: ReactContext<ProgressRingInputContext> = createContext(
  {} as ProgressRingInputContext
)

export const ProgressRingInputProvider = Context.Provider

export function useProgressRingInputContext(): ProgressRingInputContext {
  const context = useContext(Context)
  if (!context) {
    throw new Error(
      `ProgressRingInput components cannot be rendered outside the ProgressRingInput component`
    )
  }
  return context as ProgressRingInputContext
}