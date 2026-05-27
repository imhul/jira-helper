import type { FC } from 'react'


const Cell: FC<{ value: any; column: any; record: any }> = ({ value, column, record }) => {
    console.info('Rendering Cell with value: ', value, ' column: ', column, ' record: ', record)
    return <div>{value}</div>
}

export default Cell
