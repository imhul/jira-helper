// components
import { Modal } from 'antd'
// types
import type { FC } from 'react'
import type { Ticket } from '../config'

interface AddModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    add: (ticket: Ticket) => void;
}

export const AddModal: FC<AddModalProps> = ({ isModalOpen, setIsModalOpen, add }) => {
    const handleOk = () => {
        add({} as Ticket)
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <Modal
            title="Basic Modal"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}
