import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, AlertDialogProps, AlertDialogCloseButton } from '@chakra-ui/react';
import React from 'react';

interface DeleteAlertDialogProps {
  onConfirm: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

export const DeleteAlertDialog: React.FC<DeleteAlertDialogProps> = ({isOpen, setIsOpen, onConfirm}) => {
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
              删除期刊
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