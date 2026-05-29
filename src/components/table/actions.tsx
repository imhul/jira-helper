import { memo } from "react"
// components
import { Button, Popconfirm, Flex } from "antd"
// icons
import {
    LockOutlined,
    EditOutlined,
    DeleteOutlined,
    UnlockOutlined,
} from "@ant-design/icons"
// types
import type { ActionsProps } from "../../types"
// utils + config
import { colorBlue, colorDanger } from "../../config"

const Actions = ({ onEdit, onDelete, onToggleLock, record }: ActionsProps) => {
    return (
        <Flex gap="small" align="center" justify="center">
            <Button
                type="text"
                icon={record.locked ? <UnlockOutlined /> : <LockOutlined />}
                onClick={() => onToggleLock(record)}
            />
            {!record.locked && (
                <>
                    <Button
                        type="text"
                        icon={
                            <EditOutlined
                                style={{
                                    color: colorBlue,
                                }}
                            />
                        }
                        onClick={() => onEdit(record)}
                    />
                    <Popconfirm
                        title="Delete the ticket"
                        description="Are you sure to delete this ticket?"
                        onConfirm={() => onDelete(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="text"
                            icon={
                                <DeleteOutlined
                                    style={{ color: colorDanger }}
                                />
                            }
                        />
                    </Popconfirm>
                </>
            )}
        </Flex>
    )
}

export default memo(Actions)
