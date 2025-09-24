import { Modal, ModalContent, ModalProps, useDisclosure } from "@heroui/react";
import { ProModalProvider } from "./provider";

interface Props extends Omit<ModalProps, 'children'> {
    trigger: (onOpen: () => void) => React.ReactNode
    children?: React.ReactNode
}

export const ProModal = (props: Props) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const { children, trigger, ...restPros } = props;
    return (
        <>
            {props.trigger(onOpen)}
            <ProModalProvider onClose={onClose}>
                <Modal
                    isOpen={isOpen}
                    placement="top-center"
                    onOpenChange={onOpenChange}
                    size="2xl"
                    hideCloseButton
                    isDismissable={false}
                    {...restPros}
                >
                    <ModalContent>
                        {children}
                    </ModalContent>
                </Modal>
            </ProModalProvider>

        </>
    )
}