/* eslint-disable react/prop-types */
import { Flex, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
    
function NotificationModal({ isOpen, onClose, modalTitle, modalBody }) {
    
    useEffect(() => {
        let timeout;
        if (isOpen) {
            timeout = setTimeout(() => {
                onClose();
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            }, 3000);
        }

        return () => clearTimeout(timeout);
    }, [isOpen, onClose]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent m="300px auto" p={5}>
            <ModalHeader>{modalTitle}</ModalHeader>
            <ModalBody m="0 auto">
            <Flex flexDirection={'column'} fontSize={'100px'} color="green.500" justifyContent={'center'} gap={3} alignItems={'center'}>
                <FaCheckCircle  />
                <Text fontSize={'18px'} color="black" fontWeight={'bold'}>Berhasil</Text>
                <Text fontSize={'18px'} color="black">{modalBody}</Text>
            </Flex>
            </ModalBody>
        </ModalContent>
        </Modal>
    );
    }

    export default NotificationModal;
