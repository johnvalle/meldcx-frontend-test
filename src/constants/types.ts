import { ControllerFieldState, UseControllerProps, UseFormStateReturn } from "react-hook-form"

export type LoginCredentials = {
  email: string
  password: string
}

export type ControllerRenderProps<T> = {
  field: UseControllerProps<T>
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<T>
}
