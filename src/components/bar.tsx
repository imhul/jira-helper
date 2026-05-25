import { useState } from "react"
import { Button } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';

const Bar: React.FC = () => {
    const [isList, setIsList] = useState(false)
    return (
        <Button
            type="primary"
            shape="circle"
            icon={isList ? <BarsOutlined /> : <AppstoreOutlined />}
            onClick={() => setIsList(!isList)}
        />
    )
}

export default Bar