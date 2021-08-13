// global imports
import React from "react";
import { Box, Button, Center, Flex, Text, useBreakpointValue, useToast } from "@chakra-ui/react";
// project imports
import { useFetchDevicesQuery, useNotifyMutation } from "../../hooks";
import { LogoutConfirmationDialog } from "../../components";
import { useAuthStore } from "../../stores";
// local imports
import styles from "./DevicesPage.module.scss";

export default function DevicesPage() {
  const container: React.RefObject<any> = React.useRef(null);
  const [showDialog, setShowDialog] = React.useState(false);
  const [size, setSize] = React.useState(0);

  const toast = useToast();
  const notifyMutation = useNotifyMutation();
  const fetchDevicesQuery = useFetchDevicesQuery();
  const setToken = useAuthStore((state) => state.setToken);

  // Circle measurements
  const circleSize = useBreakpointValue({ base: "30px", sm: "40px", md: "90px" });
  let angle = 360 - 90;
  let sizeBasedAdjustment = 360 / size;

  /**
   * Render circle based on number of devices
   */
  function renderCircles() {
    angle += sizeBasedAdjustment;
    return (
      <Box
        key={angle}
        className={styles.orbit__circle}
        style={{
          height: circleSize,
          width: circleSize,
          margin: `calc(-${circleSize}/2)`,
          transform: `rotate(${angle}deg) translate(0, -${container?.current?.clientWidth / 2}px) rotate(-${angle}deg)`,
        }}
      ></Box>
    );
  }

  /**
   * Handles dialog button actions
   *
   * @param action Action from dialog button: confirm or close
   */
  function handleButtonClick(action: string) {
    if (action === "confirm") {
      setToken(undefined);
    }

    if (action === "close") {
      setShowDialog(false);
    }
  }

  async function notify() {
    try {
      const response = await notifyMutation.mutateAsync({
        name: "John Valle",
        email: "vallejohn.personal@gmail.com",
        repoUrl: "https://github.com/johnvalle/meldcx-frontend-test",
        message: "What a pun-tastic message!",
      });
      toast({
        title: "Success!",
        description: response.data,
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    } catch ({ response }) {
      toast({
        title: "Oh no!",
        description: response.data,
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  }

  React.useEffect(() => {
    if (!fetchDevicesQuery.isLoading) {
      const { devices } = fetchDevicesQuery.data?.data;
      setSize(devices?.length);
    }
  }, [fetchDevicesQuery.data, fetchDevicesQuery.isLoading]);

  return (
    <div className={styles.wrapper}>
      <Flex justifyContent="center" alignItems="center" w="100%" flexGrow={1}>
        <Box>
          <Box
            className={styles.orbit__container}
            ref={container}
            width={{ base: 200, sm: 250, md: 500 }}
            height={{ base: 200, sm: 250, md: 500 }}
            borderRadius="100%"
          >
            {!fetchDevicesQuery.isLoading && [...Array.from({ length: size })].map(renderCircles)}
          </Box>
          {!fetchDevicesQuery.isLoading && (
            <Box top={{ base: "-40px", md: "-100px" }} className={styles.centerContainer}>
              <Text fontSize={{ base: 36, sm: 48, md: 72 }} color="white">
                {fetchDevicesQuery.data?.data?.devices?.length}
              </Text>
              <Text fontSize={{ base: 12, sm: 24 }} fontWeight="bold" color="white">
                DEVICES
                <br />
                ONLINE
              </Text>
            </Box>
          )}
        </Box>
      </Flex>
      <LogoutConfirmationDialog isOpen={showDialog} onButtonClick={handleButtonClick} />
      <Box bottom={0} mt="auto" w="100%" bgColor="#D76845">
        <Center>
          <Flex
            height={100}
            spacing="2rem"
            flexDir={{ base: "column", md: "row" }}
            alignItems="center"
            justifyContent="center"
          >
            <Button
              width={{ base: 150, md: 200 }}
              size="lg"
              m="0.5rem"
              bgColor="white"
              _hover={{
                bgColor: "gray.300",
              }}
              onClick={notify}
            >
              NOTIFY
            </Button>
            <Button
              width={{ base: 150, md: 200 }}
              size="lg"
              m="0.5rem"
              bgColor="gray.800"
              textColor="white"
              _hover={{
                bgColor: "gray.500",
              }}
              onClick={() => setShowDialog(true)}
            >
              LOG OUT
            </Button>
          </Flex>
        </Center>
      </Box>
    </div>
  );
}
