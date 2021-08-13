import React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react"

type LogoutConfirmationDialogProps = {
  isOpen: boolean;
  onButtonClick: (action: string) => void;
}

export default function LogoutConfirmationDialog({ isOpen, onButtonClick }: LogoutConfirmationDialogProps) {
  const cancelRef: React.RefObject<any> = React.useRef()

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={() => onButtonClick("close")}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Log Out
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure you want to log out?</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => onButtonClick("close")}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={() => onButtonClick("confirm")} ml={3}>
              Log Out
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}