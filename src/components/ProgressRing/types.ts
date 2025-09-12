import { Coordinates } from '@/utils/progressRing'

export type ProgressRingInputContext = {
  value: number
  radius: number
  center: Coordinates
  isFocused: boolean
  setFocused: React.Dispatch<React.SetStateAction<boolean>>
  onChange: (value: number) => void
  getPointFromValue: (v?: number) => Coordinates | null
  getValueFromPointerEvent: (e: Event) => number
  clickTolerance: number
  hasStarted: boolean
}