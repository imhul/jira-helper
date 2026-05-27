import { memo, useEffect, useState } from 'react'
// types
import type {
    FC,
    Ticket,
    JsonData,
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
    const [selectedCellKey, setSelectedCellKey] = useState<string | null>(null)

    useEffect(() => {
        if (!selectedCellKey) {
            return
        }

        const clearSelectedCell = (event: globalThis.MouseEvent) => {
            const target = event.target as HTMLElement | null
            if (target?.closest('[data-jira-cell-key]')) {
                return
            }

            setSelectedCellKey(null)
        }

        document.addEventListener('click', clearSelectedCell, true)

        return () => {
            document.removeEventListener('click', clearSelectedCell, true)
        }
    }, [selectedCellKey])

    const editTicket = (ticket: Ticket) => {
        setDirty('dirty')
        onEdit?.(ticket)
    }

    const deleteTicket = (ticket: Ticket) => {
        setDirty('dirty')
        onDelete?.(ticket)
    }

    const selectCell = (cellKey: string, text: string) => {
        setSelectedCellKey(cellKey)
        setText(text)
    }

    const columns = createColumns({
        onEdit: editTicket,
        onDelete: deleteTicket,
        onSelectCell: selectCell,
        selectedCellKey,
    })

    return (
        <Table<JsonData['tickets'][number]>
            columns={columns}
            dataSource={data.tickets}
            rowKey={(record) => record.ticketId}
            tableLayout="auto"
        />
    )
})
