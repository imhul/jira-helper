import { CSSProperties } from 'react'
// components
import { Button, Popconfirm, Flex, Tag } from 'antd'
import Copy from './components/copy'
// icons
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    SyncOutlined,
    EditOutlined,
} from '@ant-design/icons'
// types
import type { TableProps } from 'antd'

// enums
export enum ticketStatuses {
    progress = "In Progress",
    done = "Done",
    review = "In Review",
    qa = "QA",
}

// constants
export const colorPrimary = "#9ccc65"
export const colorDanger = "#ff3d00"
export const transparent = 'rgba(0, 0, 0, 0)'
export const minute = 60 * 1000
export const statusOptions = Object.entries(ticketStatuses).map(([value, label]) => ({ value, label }))

// Interfaces
export interface StatusData {
    status: 'processing' | 'success' | 'error' | 'default',
    name: string,
    icon: React.ReactNode,
}

export interface Ticket {
    order: number;
    ticketId: string;
    ticketTitle: string;
    branchName: string;
    pushCommand: string;
    commitMessage: string;
    ticketStatus: TicketStatus;
    ticketLink: string;
    gitLink: string;
    prLink: string;
    gameName: string;
    additionalInfo: string;
}

export interface JsonData {
    tickets: Ticket[];
}

export interface TicketColumnActions {
    onEdit: (ticket: Ticket) => void;
    onDelete: (ticket: Ticket) => void;
}

// types
export type TicketStatus = 'progress' | 'done' | 'review' | 'qa' | 'pending deploy'
export type CreatedColumns = TableProps<JsonData['tickets'][number]>['columns']

// styles
export const headerStyle: CSSProperties = {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: transparent,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}

export const contentStyle: CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: transparent,
}

export const siderStyle: CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: transparent,
}

export const footerStyle: CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: transparent,
}

export const layoutStyle: CSSProperties = {
    borderRadius: 0,
    overflow: 'hidden',
    width: '100%',
}

export const dataStatuses: Record<string, StatusData> = {
    absent: { status: 'default', name: '', icon: <SyncOutlined size={24} /> },
    dirty: { status: 'processing', name: 'edited', icon: <EditOutlined size={24} /> },
    saving: { status: 'processing', name: 'saving', icon: <SyncOutlined size={24} spin /> },
    saved: { status: 'success', name: 'saved', icon: <CheckCircleOutlined size={24} /> },
    savingError: { status: 'error', name: 'saving error', icon: <CloseCircleOutlined size={24} /> },
    reading: { status: 'processing', name: 'reading', icon: <SyncOutlined size={24} spin /> },
    readed: { status: 'success', name: 'readed', icon: <CheckCircleOutlined size={24} /> },
    readingError: { status: 'error', name: 'reading error', icon: <CloseCircleOutlined size={24} /> },
}

export const standartRules = [{
    min: 3,
    max: 250,
    required: false,
    message: 'This string too short or too long!',
}]

export const defaultJson: JsonData = {
    tickets: [
        {
            order: 1,
            ticketId: 'ticketId',
            ticketTitle: 'ticketTitle',
            branchName: 'branchName',
            pushCommand: 'pushCommand',
            commitMessage: 'commitMessage',
            ticketStatus: 'progress',
            ticketLink: 'ticketLink',
            gitLink: 'gitLink',
            prLink: 'prLink',
            gameName: 'gameName',
            additionalInfo: 'additionalInfo',
        }
    ]
}

export const formItems = [
    {
        label: 'Ticket Title',
        name: 'ticketTitle',
        rules: standartRules,
    },
    {
        label: 'Branch',
        name: 'branchName',
        rules: standartRules,
    },
    {
        label: 'Push Command',
        name: 'pushCommand',
        rules: standartRules,
    },
    {
        label: 'Commit',
        name: 'commitMessage',
        rules: standartRules,
    },
    {
        label: 'Status',
        name: 'ticketStatus',
        rules: [],
    },
    {
        label: 'Ticket Link',
        name: 'ticketLink',
        rules: standartRules,
    },
    {
        label: 'Repository',
        name: 'gitLink',
        rules: standartRules,
    },
    {
        label: 'PR',
        name: 'prLink',
        rules: standartRules,
    },
    {
        label: 'Game',
        name: 'gameName',
        rules: standartRules,
    },
    {
        label: 'Notes',
        name: 'additionalInfo',
        rules: standartRules,
    }
]

export const addFormItems = [
    {
        label: 'Ticket ID',
        name: 'ticketId',
        rules: standartRules,
    },
    ...formItems,
]

// functions
export const createColumns = ({ onEdit, onDelete }: TicketColumnActions): CreatedColumns => [
    {
        title: '#',
        dataIndex: 'order',
        key: 'order',
    },
    {
        title: 'ID',
        dataIndex: 'ticketId',
        key: 'ticketId',
        render: (text: string) => (
            <Flex>{text} <Copy text={text} /></Flex>
        )
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
            return (
                <Flex gap="small">
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
                </Flex>
            )
        },
    }
]
