import { memo } from 'react'
// types
import type { FC } from 'react'
// components
import { Table } from 'antd'
// utils + config
import type { JsonData } from '../config'
import { defaultJson, columns } from '../config'

interface JiraTableProps {
    setDirty: (status: string) => void;
    data: JsonData;
}

export const JiraTable: FC<JiraTableProps> = memo(({ setDirty, data = defaultJson }) => {
    void setDirty
    console.info('Rendering JiraTable with data: ', data)

    return (
        <Table<JsonData['tickets'][number]>
            columns={columns}
            dataSource={data.tickets}
            rowKey={(record) => record.ticketId}
        />
    )
})
