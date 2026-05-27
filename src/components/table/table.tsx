import { memo } from 'react'
// types
import type {
    FC,
    Ticket,
    JsonData,
    MouseEvent,
    JiraTableProps,
} from '../../types'
// components
import { Table } from 'antd'
// utils + config
import { defaultJson } from '../../config'
import createColumns from './columns'


export const JiraTable: FC<JiraTableProps> = memo(({
    setDirty,
    data = defaultJson,
    setText,
    onEdit,
    onDelete,
}) => {
    const editTicket = (ticket: Ticket) => {
        setDirty('dirty')
        onEdit?.(ticket)
    }

    const deleteTicket = (ticket: Ticket) => {
        setDirty('dirty')
        onDelete?.(ticket)
    }

    const columns = createColumns({
        onEdit: editTicket,
        onDelete: deleteTicket,
    })

    const onRow = () => ({
        onClick: (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (target.classList.contains('ant-table-cell') && target.innerText.length > 0) {
                setText(target.innerText)
                // TODO: replace it to header in button form with tooltip
            }
        }
    })

    return (
        <Table<JsonData['tickets'][number]>
            columns={columns}
            dataSource={data.tickets}
            rowKey={(record) => record.ticketId}
            tableLayout="auto"
            onRow={onRow}
        />
    )
})
