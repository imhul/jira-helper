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
import type {
    TicketStatus,
    ActionsProps,
    CreatedColumns,
    TicketColumnActions,
} from "../../types"
// utils + config
import { ticketStatusIcons, colorBlue, colorDanger } from "../../config"

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

const createColumns = ({
    onEdit,
    onDelete,
    onToggleLock,
    onSelectCell,
    selectedCellKey,
}: TicketColumnActions): CreatedColumns => {
    const createSelectableCell =
        (columnKey: string) => (record: ActionsProps["record"]) => ({
            "data-jira-cell-key": `${record.ticketId}:${columnKey}`,
            className:
                selectedCellKey === `${record.ticketId}:${columnKey}`
                    ? "jira-table-selected-cell"
                    : "",
            onClick: (event: React.MouseEvent<HTMLElement>) => {
                const cell = event.currentTarget as HTMLElement
                if (cell.innerText.length > 0) {
                    onSelectCell(
                        `${record.ticketId}:${columnKey}`,
                        cell.innerText
                    )
                }
            },
            style: {
                verticalAlign: "top",
            },
        })

    return [
        {
            title: "#",
            dataIndex: "order",
            key: "order",
            onCell: createSelectableCell("order"),
            width: 40,
        },
        {
            title: "ID",
            dataIndex: "ticketId",
            key: "ticketId",
            onCell: createSelectableCell("ticketId"),
            filterSearch: true,
            width: 130,
        },
        {
            title: "Title",
            dataIndex: "ticketTitle",
            key: "ticketTitle",
            onCell: createSelectableCell("ticketTitle"),
            filterSearch: true,
            width: 130,
        },
        {
            title: "Branch",
            dataIndex: "branchName",
            key: "branchName",
            onCell: createSelectableCell("branchName"),
            width: 130,
        },
        {
            title: "Push",
            dataIndex: "pushCommand",
            key: "pushCommand",
            onCell: createSelectableCell("pushCommand"),
            width: 130,
        },
        {
            title: "Commit",
            dataIndex: "commitMessage",
            key: "commitMessage",
            onCell: createSelectableCell("commitMessage"),
            width: 130,
        },
        {
            title: "S",
            dataIndex: "ticketStatus",
            key: "ticketStatus",
            onCell: () => ({ style: { verticalAlign: "top" } }),
            width: 40,
            render: (status: TicketStatus) => ticketStatusIcons[status],
        },
        {
            title: "Ticket",
            dataIndex: "ticketLink",
            key: "ticketLink",
            onCell: createSelectableCell("ticketLink"),
        },
        {
            title: "Git",
            dataIndex: "gitLink",
            key: "gitLink",
            onCell: createSelectableCell("gitLink"),
        },
        {
            title: "PR",
            dataIndex: "prLink",
            key: "prLink",
            onCell: createSelectableCell("prLink"),
        },
        {
            title: "Game",
            dataIndex: "gameName",
            key: "gameName",
            onCell: createSelectableCell("gameName"),
            filterSearch: true,
            filterMode: "menu",
        },
        {
            title: "Notes",
            dataIndex: "additionalInfo",
            key: "additionalInfo",
            onCell: createSelectableCell("additionalInfo"),
            filterSearch: true,
            filters: [],
        },
        {
            title: "Actions",
            key: "actions",
            onCell: () => ({ style: { verticalAlign: "top" } }),
            render: (_, record) => {
                return (
                    <Actions
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onToggleLock={onToggleLock}
                        record={record}
                    />
                )
            },
        },
    ]
}

export default createColumns
