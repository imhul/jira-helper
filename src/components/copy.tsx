import { memo, useState, useCallback } from "react"
import { Flex, Button, Popover } from "antd"
import { CopyOutlined, LinkOutlined } from "@ant-design/icons"
// types
import type { FC, CopyProps } from "../types"

const links = ['ticketLink', 'gitLink', 'prLink']

const Copy: FC<CopyProps> = ({ text, x = 0, y = 0, inTable = true, isLink = false }) => {
    const [open, setOpen] = useState(true)

    const onCopy = useCallback(() => {
        if (!open) return
        navigator.clipboard.writeText(text)
        setOpen(false)
        const timer = setTimeout(() => setOpen(true), 2000)
        return () => clearTimeout(timer)
    }, [open, text])

    return (
        <Flex
            data-copy-button
            align="center"
            justify="center"
            gap="small"
            style={{
                position: inTable ? "fixed" : "relative",
                zIndex: 10,
                left: inTable ? (isLink ? (x - 70) : (x - 20)) : x,
                top: inTable ? (y - 20) : y,
            }}
        >
            {inTable && isLink && (
                <Button
                    href={text}
                    target="_blank"
                    size="large"
                    type="primary"
                    shape="circle"
                    icon={<LinkOutlined />}
                />
            )}
            <Popover
                open={!open}
                content="Copied!"
                placement="top"
                arrow={{ pointAtCenter: true }}
            >
                <Button
                    data-copy-button
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
