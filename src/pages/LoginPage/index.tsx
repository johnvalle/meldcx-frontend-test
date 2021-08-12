// third-party imports
import React from 'react'
import { Button, Container, VStack, Text } from "@chakra-ui/react"
import { Controller, useForm, } from "react-hook-form"
import { EmailIcon, LockIcon } from "@chakra-ui/icons"
// project imports
import { useLoginMutation } from '../../hooks';
import { LoginCredentials } from "../../constants"
import { CustomInput } from "../../components"
// local imports
import styles from "./LoginPage.module.scss";

export default function LoginPage() {

  const [apiErrors, setApiErrors] = React.useState<string>("");
  const { control, handleSubmit } = useForm<LoginCredentials>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const loginMutation = useLoginMutation();

  /**
   * Login function
   * 
   * Accepts validated email and password from react hook form and sends to API using custom hook (useLoginMutation).
   * 
   * @param {LoginCredentials} data Validated email and password from react-hook-form's handleSubmit function.
   */
  async function login(data: LoginCredentials) {
    try {
      const response = await loginMutation.mutateAsync(data)
      console.log(response.data)
    } catch (error) {
      setApiErrors("Invalid email or password.");
    }
  }

  return (
    <div className={styles.wrapper}>
      <Container
        bgColor="white"
        p="16"
        borderRadius="8"
        boxShadow="lg"
        minHeight="400"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Text fontSize="5xl" textAlign="center">
          Login
        </Text>
        <VStack my="2rem" spacing="0.5rem">
          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Email is required",
              },
            }}
            render={(renderProps) => (
              <CustomInput<LoginCredentials>
                {...renderProps}
                leftIcon={<EmailIcon color="gray.700" />}
                placeholder="Email Address"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Password is required",
              },
            }}
            render={(renderProps) => (
              <CustomInput<LoginCredentials>
                {...renderProps}
                inputType="password"
                leftIcon={<LockIcon color="gray.700" />}
                placeholder="Password"
              />
            )}
          />
          {apiErrors && (
            <Text fontSize="xs" color="red">
              {apiErrors}
            </Text>
          )}
        </VStack>
        <Button
          size="lg"
          w={200}
          mx="auto"
          colorScheme="blue"
          isLoading={loginMutation.isLoading}
          onClick={handleSubmit(login)}
        >
          Login
        </Button>
      </Container>
    </div>
  )
}