import { Tag } from 'antd'
// types
import type { TagProps } from 'antd'
// utils + config
import { colorPrimary } from '../config'

interface SatusTagProps {
    data: {
        status: string;
        name: string;
        icon: React.ReactNode;
    }
}

const styles: TagProps['styles'] = {
  root: {
    gap: 16,
    padding: '8px 12px',
    backgroundColor: colorPrimary,
    borderColor: colorPrimary,
  }
}


export const SatusTag = ({ data }: SatusTagProps) => {
    const { status, name, icon } = data

    return (
        <Tag color={status} icon={icon} variant="solid" styles={styles}>
            {`JSON ${name}`}
        </Tag>
    )
}
