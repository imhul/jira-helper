import { memo, useState, useCallback } from "react"
import { Flex, Button, Popover } from "antd"
import { CopyOutlined } from "@ant-design/icons"
// types
import type { FC, CopyProps } from "../types"

const Copy: FC<CopyProps> = ({ text, x = 0, y = 0, inTable = true }) => {
    const [open, setOpen] = useState(true)

    const onCopy = useCallback(() => {
        if (!open) return
        navigator.clipboard.writeText(text)
        setOpen(false)
        const timer = setTimeout(() => setOpen(true), 2000)
        return () => clearTimeout(timer)
    }, [open, text])

    return (
        <Flex style={{
            position: inTable ? "fixed" : "relative",
            zIndex: 10,
            left: inTable ? x - 20 : x,
            top: inTable ? y - 15 : y,
        }}>
            <Popover
                open={!open}
                content="Copied!"
            >
                <Button
                    onClick={onCopy}
                    size="large"
                    type="primary"
                    shape="circle"
                    icon={<CopyOutlined />}
                />
            </Popover>
        </Flex>
    )
}

export default memo(Copy)
