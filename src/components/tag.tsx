// components
import { Tag } from 'antd'
// types
import type { TagProps } from 'antd'
// utils + config
import { colorPrimary, colorDanger } from '../config'

interface SatusTagProps {
    data: {
        status: string;
        name: string;
        icon: React.ReactNode;
    }
}

export const SatusTag = ({ data }: SatusTagProps) => {
    const { status, name, icon } = data

    const styles: TagProps['styles'] = {
        root: {
            gap: 16,
            padding: '8px 12px',
            backgroundColor: status === 'error' ? colorDanger : colorPrimary,
            borderColor: status === 'error' ? colorDanger : colorPrimary,
        }
    }

    return (
        <Tag color={status} icon={icon} variant="solid" styles={styles}>
            {`JSON ${name}`}
        </Tag>
    )
}
