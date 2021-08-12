// third-party imports
import React from 'react'
import { Button, Container, VStack, Text } from "@chakra-ui/react"
import { Controller, useForm, } from "react-hook-form"
import { EmailIcon, LockIcon } from "@chakra-ui/icons"
import { useHistory } from 'react-router-dom';
// project imports
import { useLoginMutation } from '../../hooks';
import { AuthStore, LoginCredentials } from "../../constants"
import { CustomInput } from "../../components"
import { useAuthStore } from "../../stores"
// local imports
import styles from "./LoginPage.module.scss";

export default function LoginPage() {

  const loginMutation = useLoginMutation()
  const [token, setToken] = useAuthStore((state: AuthStore) => [state.token, state.setToken])

  const [apiErrors, setApiErrors] = React.useState<string>("");

  const history = useHistory();
  const { control, handleSubmit } = useForm<LoginCredentials>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  /**
   * Login function
   * 
   * Accepts validated email and password from react hook form and sends to API using custom hook (useLoginMutation).
   * 
   * @param {LoginCredentials} data Validated email and password from react-hook-form's handleSubmit function.
   */
  async function login(data: LoginCredentials) {
    setApiErrors(""); // clear any errors from previous API call
    try {
      const response = await loginMutation.mutateAsync(data)
      const token = response.data;
      setToken(token);
      history.push("/devices")
    } catch (error) {
      console.error(error)
      setApiErrors("Invalid email or password.");
    }
  }

  // if token is persisted in local storage, redirect to devices
  React.useEffect(() => {
    if (token) history.push("/devices")
  }, [token, history])

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