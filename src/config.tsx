import { CSSProperties } from 'react'
import { Button, Flex, Tag } from 'antd'
import type { TableProps } from 'antd'
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    SyncOutlined,
    EditOutlined,
} from '@ant-design/icons'

export const minute = 60 * 1000

export const headerStyle: CSSProperties = {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}

export const contentStyle: CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0)',
}

export const siderStyle: CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0)',
}

export const footerStyle: CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0)',
}

export const layoutStyle: CSSProperties = {
    borderRadius: 0,
    overflow: 'hidden',
    width: '100%',
}

export enum ticketStatuses {
    progress = "In Progress",
    done = "Done",
    review = "In Review",
    qa = "QA",
}

export interface StatusData {
    status: 'processing' | 'success' | 'error' | 'default',
    name: string,
    icon: React.ReactNode,
}

export const statuses: Record<string, StatusData> = {
    absent: { status: 'default', name: '', icon: null },
    dirty: { status: 'processing', name: 'edited', icon: <EditOutlined /> },
    saving: { status: 'processing', name: 'saving', icon: <SyncOutlined spin /> },
    saved: { status: 'success', name: 'saved', icon: <CheckCircleOutlined /> },
    savingError: { status: 'error', name: 'saving error', icon: <CloseCircleOutlined /> },
    reading: { status: 'processing', name: 'reading', icon: <SyncOutlined spin /> },
    readed: { status: 'success', name: 'readed', icon: <CheckCircleOutlined /> },
    readingError: { status: 'error', name: 'reading error', icon: <CloseCircleOutlined /> },
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

export type TicketStatus = 'progress' | 'done' | 'review' | 'qa' | 'pending deploy'

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

export const columns: TableProps<JsonData['tickets'][number]>['columns'] = [
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
            const statusData = statuses[status] || statuses['absent']
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
                <Button type="text" icon={<EditOutlined />} />
                <Button type="text" icon={<DeleteOutlined />} />
            </Flex>
        )
        },
    }
]
