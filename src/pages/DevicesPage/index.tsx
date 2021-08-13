// global imports
import React from 'react'
import {
  Box,
  Button,
  Center,
  HStack,
  Text,
} from "@chakra-ui/react"
// project imports
import { useFetchDevicesQuery } from '../../hooks'
import { useAuthStore } from "../../stores"
// local imports
import styles from "./DevicesPage.module.scss";
import LogoutConfirmationDialog from '../../components/LogoutConfirmationDialog';

export default function DevicesPage() {
  const [showDialog, setShowDialog] = React.useState(false)
  const [size, setSize] = React.useState(0)

  const fetchDevicesQuery = useFetchDevicesQuery()
  const setToken = useAuthStore((state) => state.setToken)

  const circleSize = 100
  let angle = 360 - 90
  let sizeBasedAdjustment = 360 / size
  let containerSize = 250

  /**
   * Render circle based on number of devices
   */
  function renderCircles() {
    angle += sizeBasedAdjustment
    return (
      <div
        className={styles.orbit__circle}
        style={{
          height: `${circleSize}px`,
          width: `${circleSize}px`,
          margin: `calc(-${circleSize}px/2)`,
          transform: `rotate(${angle}deg) translate(0, -${containerSize}px) rotate(-${angle}deg)`,
        }}
      ></div>
    )
  }

  /**
   * Handles dialog button actions
   * 
   * @param action Action from dialog button: confirm or close
   */
  function handleButtonClick(action: string) {
    if (action === "confirm") {
      setToken(undefined)
    }

    if (action === "close") {
      setShowDialog(false)
    }
  }

  React.useEffect(() => {
    if (!fetchDevicesQuery.isLoading) {
      const { devices } = fetchDevicesQuery.data?.data
      setSize(devices?.length)
    }
  }, [fetchDevicesQuery])

  return (
    <div className={styles.wrapper}>
      <div className={styles.orbit__container}>
        {!fetchDevicesQuery.isLoading && [...Array.from({ length: size })].map(renderCircles)}
      </div>

      {!fetchDevicesQuery.isLoading && (
        <div className={styles.centerContainer}>
          <Text fontSize={72} color="white">
            {fetchDevicesQuery.data?.data?.devices?.length}
          </Text>
          <Text color="white" fontWeight="bold">
            DEVICES
            <br />
            ONLINE
          </Text>
        </div>
      )}
      <LogoutConfirmationDialog isOpen={showDialog} onButtonClick={handleButtonClick} />
      <Box bottom={0} position="absolute" w="100%" bgColor="#D76845">
        <Center>
          <HStack p="1.5rem">
            <Button size="lg" w={200} mx="auto" bgColor="white">
              NOTIFY
            </Button>
            <Button
              size="lg"
              w={200}
              mx="auto"
              bgColor="gray.800"
              textColor="white"
              onClick={() => setShowDialog(true)}
            >
              LOG OUT
            </Button>
          </HStack>
        </Center>
      </Box>
    </div>
  )
}