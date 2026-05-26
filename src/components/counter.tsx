// components
import { Tag } from 'antd'
// types
import type { TagProps } from 'antd'
// utils + config
import { colorPrimary } from '../config'

const Counter = ({ num }: { num: number }) => {
    const styles: TagProps['styles'] = {
        root: {
            padding: '8px 12px',
            // backgroundColor: colorPrimary,
            // borderColor: colorPrimary,
        }
    }

    return (
        <Tag color={colorPrimary} variant="solid" styles={styles}>
            {num}
        </Tag>
    )
}

export default Counter
