import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  ModalCloseButton,
  Icon,
  HStack,
  ModalOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { SiZcash } from "react-icons/si";
import "@fontsource/inter";

interface IConfrimModal {
  isOpen: boolean;
  p_points_value: number;
  onClose: () => void;
  obtainPokemon: () => void;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  p_points_value,
  obtainPokemon,
}: IConfrimModal) => {
  return (
    <Modal
      motionPreset="slideInBottom"
      isCentered
      isOpen={isOpen}
      size="xl"
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack>
            <Text fontFamily="Inter">
              Are you sure you want to obtain this pokemon with Points:
            </Text>
            <Text fontWeight="bold" fontFamily="Inter">
              {p_points_value} <Icon as={SiZcash} w={4} h={4} /> {"?"}
            </Text>
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            color="green"
            background="transparent"
            border="1px"
            borderColor="green"
            _hover={{
              background: "green",
              color: "white",
            }}
            onClick={() => {
              obtainPokemon();
              onClose();
            }}
          >
            Yes
          </Button>
          <Button
            color="red"
            background="transparent"
            border="1px"
            borderColor="red"
            _hover={{
              background: "red",
              color: "white",
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
