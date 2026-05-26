import { memo } from 'react'
// types
import type { FC } from 'react'
// components
import { Table } from 'antd'
// utils + config
import type { JsonData, Ticket } from '../config'
import { createColumns, defaultJson } from '../config'

interface JiraTableProps {
    setDirty: (status: string) => void;
    data: JsonData;
    onEditTicket?: (ticket: Ticket) => void;
    onDeleteTicket?: (ticket: Ticket) => void;
}

export const JiraTable: FC<JiraTableProps> = memo(({ setDirty, data = defaultJson, onEditTicket, onDeleteTicket }) => {
    console.info('Rendering JiraTable with data: ', data)

    const editTicket = (ticket: Ticket) => {
        setDirty('dirty')
        onEditTicket?.(ticket)
    }

    const deleteTicket = (ticket: Ticket) => {
        setDirty('dirty')
        onDeleteTicket?.(ticket)
    }

    const columns = createColumns({
        onEdit: editTicket,
        onDelete: deleteTicket,
    })

    return (
        <Table<JsonData['tickets'][number]>
            columns={columns}
            dataSource={data.tickets}
            rowKey={(record) => record.ticketId}
        />
    )
})
