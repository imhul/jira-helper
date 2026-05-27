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

const createColumns = ({ onEdit, onDelete, onSelectCell, selectedCellKey }: TicketColumnActions): CreatedColumns => {
    const createSelectableCell = (columnKey: string) => (record: ActionsProps['record']) => ({
        'data-jira-cell-key': `${record.ticketId}:${columnKey}`,
        className: selectedCellKey === `${record.ticketId}:${columnKey}` ? 'jira-table-selected-cell' : '',
        onClick: (event: React.MouseEvent<HTMLElement>) => {
            const cell = event.currentTarget as HTMLElement
            if (cell.innerText.length > 0) {
                onSelectCell(`${record.ticketId}:${columnKey}`, cell.innerText)
            }
        },
    })

    return [
        {
            title: '#',
            dataIndex: 'order',
            key: 'order',
            onCell: createSelectableCell('order'),
        },
        {
            title: 'ID',
            dataIndex: 'ticketId',
            key: 'ticketId',
            onCell: createSelectableCell('ticketId'),
        },
        {
            title: 'Title',
            dataIndex: 'ticketTitle',
            key: 'ticketTitle',
            onCell: createSelectableCell('ticketTitle'),
        },
        {
            title: 'Branch',
            dataIndex: 'branchName',
            key: 'branchName',
            onCell: createSelectableCell('branchName'),
        },
        {
            title: 'Push',
            dataIndex: 'pushCommand',
            key: 'pushCommand',
            onCell: createSelectableCell('pushCommand'),
        },
        {
            title: 'Commit',
            dataIndex: 'commitMessage',
            key: 'commitMessage',
            onCell: createSelectableCell('commitMessage'),
        },
        {
            title: 'Status',
            dataIndex: 'ticketStatus',
            key: 'ticketStatus',
            onCell: createSelectableCell('ticketStatus'),
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
            onCell: createSelectableCell('ticketLink'),
        },
        {
            title: 'Git',
            dataIndex: 'gitLink',
            key: 'gitLink',
            onCell: createSelectableCell('gitLink'),
        },
        {
            title: 'PR',
            dataIndex: 'prLink',
            key: 'prLink',
            onCell: createSelectableCell('prLink'),
        },
        {
            title: 'Game',
            dataIndex: 'gameName',
            key: 'gameName',
            onCell: createSelectableCell('gameName'),
        },
        {
            title: 'Additional Info',
            dataIndex: 'additionalInfo',
            key: 'additionalInfo',
            onCell: createSelectableCell('additionalInfo'),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => {
                return (<Actions onEdit={onEdit} onDelete={onDelete} record={record} />)
            },
        }
    ]
}

export default createColumns
