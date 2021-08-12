import React from 'react'
import { FormControl, Input, Text, InputGroup, InputLeftElement } from "@chakra-ui/react"

import { ControllerRenderProps } from "../constants"

type CustomInputProps = {
  leftIcon?: React.ReactNode
  placeholder?: string
  inputType?: string
}

export default function CustomInput<T>({
  leftIcon,
  placeholder,
  inputType,
  field,
  fieldState,
  formState,
}: CustomInputProps & ControllerRenderProps<T>) {
  return (
    <>
      <FormControl bgColor="gray.100" isInvalid={fieldState.invalid} isRequired>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={leftIcon ?? null} />
          <Input type={inputType ?? "text"} placeholder={placeholder} {...field} />
        </InputGroup>
      </FormControl>
      {fieldState.invalid && (
        <Text fontSize="xs" alignSelf="flex-start" color="red">
          {fieldState.error?.message}
        </Text>
      )}
    </>
  )
}