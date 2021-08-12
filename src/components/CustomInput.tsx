import React from 'react'
import { FormControl, Input, Text, InputGroup, InputLeftElement, InputRightElement, } from "@chakra-ui/react"
import { CheckIcon } from "@chakra-ui/icons"

import { ControllerRenderProps } from "../constants"

type CustomInputProps = {
  leftIcon?: React.ReactNode
  placeholder?: string
}

export default function CustomInput<T>({
  leftIcon,
  placeholder,
  field,
  fieldState,
  formState,
}: CustomInputProps & ControllerRenderProps<T>) {
  return (
    <>
      <FormControl bgColor="gray.100" isInvalid={fieldState.invalid} isRequired>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={leftIcon ?? null} />
          <Input placeholder={placeholder} {...field} />
          {!fieldState.invalid && fieldState.isDirty && (
            <InputRightElement children={<CheckIcon color="green.500" />} />
          )}
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