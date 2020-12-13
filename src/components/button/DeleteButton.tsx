import { DeleteIcon } from "@chakra-ui/icons";
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, toast } from "@chakra-ui/react";
import React, { useState } from "react";

interface DeleteAlertDialogProps {
  onConfirm: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const DeleteAlertDialog: React.FC<DeleteAlertDialogProps> = ({isOpen, setIsOpen, onConfirm}) => {
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef<any>()
  return (
    <>
      <AlertDialog
      motionPreset="slideInBottom"
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              删除
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              确认删除? 此操作无法撤销
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                取消
              </Button>
              <Button colorScheme="red" onClick={() => {
                onClose();
                onConfirm();
              }} ml={3}>
                删除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

interface DeleteButtonProps {
  onConfirm: () => void;
  isLoading: boolean;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({onConfirm, isLoading}) => {
  const [isOpen, setIsOpen ] = useState(false);
  return (
    <>
      <Button
        _focus={{
          boxShadow: "none",
        }}
        onClick={() => {
          setIsOpen(true);
        }}
        isLoading={isLoading}
        border="none"
        outline="none"
        variant="ghost"
        size="sm"
      >
        <DeleteIcon color="red.500" />
      </Button>
      <DeleteAlertDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={onConfirm}
      />
    </>
  );
};
