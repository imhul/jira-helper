// components
import { Tag } from 'antd'
// types
import type { TagProps, SatusTagProps } from '../types'
// utils + config
import { colorPrimary, colorDanger } from '../config'



export const SatusTag = ({ data, lastTimeSaved }: SatusTagProps) => {
    const { status, name, icon } = data
    console.info(data)

    const styles: TagProps['styles'] = {
        root: {
            gap: 16,
            padding: '8px 12px',
            backgroundColor: status === 'error' ? colorDanger : colorPrimary,
            borderColor: status === 'error' ? colorDanger : colorPrimary,
        }
    }

    const text = (name === 'saved' && status === 'success')
        ? `JSON ${name} at: ${new Date(lastTimeSaved).toLocaleString()}`
        : `JSON ${name}`

    return (
        <Tag color={status} icon={icon} variant="solid" styles={styles}>
            {text}
        </Tag>
    )
}
