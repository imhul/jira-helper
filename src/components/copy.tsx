import { useState, useCallback } from "react"
import { Button, Tooltip } from "antd"
import { CopyOutlined } from '@ant-design/icons'

const Copy = ({ text }: { text: string }) => {
    const [disabled, setDisabled] = useState(true)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text)
    }

    const onCopy = useCallback(() => {
        if (!disabled) return
        copyToClipboard()
        setDisabled(false)
        const timer = setTimeout(() => setDisabled(true), 2000)
        return () => clearTimeout(timer)
    }, [disabled, text])

    return (
        <Tooltip title={disabled ? null : 'prompt text'}>
            <Button
                onClick={onCopy}
                shape="circle"
                size="large"
                type="primary"
                icon={<CopyOutlined />}
            />
        </Tooltip>
    )
}

export default Copy
