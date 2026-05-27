import { useState } from 'react'
// components
import { Button, Popconfirm, Flex, Tag } from 'antd'
// icons
import {
    LockOutlined,
    EditOutlined,
    DeleteOutlined,
    UnlockOutlined,
} from '@ant-design/icons'
// types
import type {
    TicketStatus,
    ActionsProps,
    CreatedColumns,
    TicketColumnActions,
} from '../../types'
// utils + config
import { dataStatuses } from '../../config'

const Actions = ({ onEdit, onDelete, record }: ActionsProps) => {
    const [locked, setLocked] = useState(false)

    return (
        <Flex gap="small" align="center" justify="center">
            <Button
                type="text"
                icon={locked ? <UnlockOutlined /> : <LockOutlined />}
                onClick={() => setLocked((prev) => !prev)}
            />
            {!locked && (<>
                <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(record)} />
                <Popconfirm
                    title="Delete the ticket"
                    description="Are you sure to delete this ticket?"
                    onConfirm={() => onDelete(record)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="text" icon={<DeleteOutlined />} />
                </Popconfirm>
            </>)}
        </Flex>
    )
}

const createColumns = ({ onEdit, onDelete }: TicketColumnActions): CreatedColumns => {
    return [
        {
            title: '#',
            dataIndex: 'order',
            key: 'order',
        },
        {
            title: 'ID',
            dataIndex: 'ticketId',
            key: 'ticketId',
        },
        {
            title: 'Title',
            dataIndex: 'ticketTitle',
            key: 'ticketTitle',
        },
        {
            title: 'Branch',
            dataIndex: 'branchName',
            key: 'branchName',
        },
        {
            title: 'Push',
            dataIndex: 'pushCommand',
            key: 'pushCommand',
        },
        {
            title: 'Commit',
            dataIndex: 'commitMessage',
            key: 'commitMessage',
        },
        {
            title: 'Status',
            dataIndex: 'ticketStatus',
            key: 'ticketStatus',
            render: (status: TicketStatus) => {
                const statusData = dataStatuses[status] || dataStatuses['absent']
                return (
                    <Tag icon={statusData.icon} color={statusData.status}>
                        {statusData.name}
                    </Tag>
                )
            }
        },
        {
            title: 'Ticket',
            dataIndex: 'ticketLink',
            key: 'ticketLink',
        },
        {
            title: 'Git',
            dataIndex: 'gitLink',
            key: 'gitLink',
        },
        {
            title: 'PR',
            dataIndex: 'prLink',
            key: 'prLink',
        },
        {
            title: 'Game',
            dataIndex: 'gameName',
            key: 'gameName',
        },
        {
            title: 'Additional Info',
            dataIndex: 'additionalInfo',
            key: 'additionalInfo',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (value, record, index) => {
                console.info('Rendering actions for record:', {
                    value,
                    record,
                    index,
                })
                return (<Actions onEdit={onEdit} onDelete={onDelete} record={record} />)
            },
        }
    ]
}

export default createColumns
