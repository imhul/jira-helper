import { memo } from 'react'
// types
import type {
    FC,
    Ticket,
    JsonData,
    JiraTableProps,
    OnSelectCellParams,
} from '../../types'
// components
import { Table } from 'antd'
// utils + config
import { createColumns, defaultJson } from '../../config'


export const JiraTable: FC<JiraTableProps> = memo(({ setDirty, data = defaultJson, onEdit, onDelete }) => {
    console.info('Rendering JiraTable with data: ', data)

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

    const onSelectCell = (params: OnSelectCellParams) => {
        console.info('Cell selected: ', params)
    }

    const onRow = (record: Ticket, rowIndex?: number) => {
        console.info('onRow called with record: ', {record, columns})
        return ({
            onClick: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
                const target = event.target as HTMLElement
                if (target.classList.contains('ant-table-cell') && columns && target.innerText.length > 0) {
                    onSelectCell({
                        rowIndex: rowIndex || 0,
                        value: target.innerText,
                        ticketId: record.ticketId,
                        // row: columns.find(col => col.onCell === target.getAttribute('data-column-key')),
                    })
                    // TODO: implement copy logic here!
                }
            }
        })
    }

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
