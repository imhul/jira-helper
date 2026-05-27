import { useState, useCallback } from "react"
import { Button, Popover } from "antd"
import { CopyOutlined } from '@ant-design/icons'

const Copy = ({ text }: { text: string }) => {
    const [open, setOpen] = useState(true)

    const onCopy = useCallback(() => {
        if (!open) return
        navigator.clipboard.writeText(text)
        setOpen(false)
        const timer = setTimeout(() => setOpen(true), 2000)
        return () => clearTimeout(timer)
    }, [open, text])

    return (
        <Popover open={!open} content="Copied!">
            <Button
                onClick={onCopy}
                size="large"
                type="text"
                icon={<CopyOutlined />}
            />
        </Popover>
    )
}

export default Copy
