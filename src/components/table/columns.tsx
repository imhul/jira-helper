// components
import { Tooltip } from "antd"
// types
import type { ReactNode } from "react"
import type {
    TicketStatus,
    CreatedColumns,
    TicketColumnActions,
} from "../../types"
// utils + config
import { ticketStatusIcons } from "../../config"
import Actions from "./actions"

const renderTextCell = (value: string | number | null | undefined): ReactNode => {
    if (typeof value !== "string" && typeof value !== "number") {
        return null
    }

    const text = String(value)

    return (
        <Tooltip title={text}>
            <span className="jira-table-cell-text">{text}</span>
        </Tooltip>
    )
}

const createColumns = ({
    onEdit,
    onDelete,
    onToggleLock,
    onSelectCell,
    selectedCellKey,
}: TicketColumnActions): CreatedColumns => {
    const isLinkColumn = (columnKey: string) =>
        ["ticketLink", "gitLink", "prLink"].includes(columnKey)

    const createSelectableCell =
        (columnKey: string) => (record: Parameters<typeof onEdit>[0]) => ({
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
                        cell.innerText,
                        event.currentTarget.getBoundingClientRect().right,
                        event.currentTarget.getBoundingClientRect().top,
                        isLinkColumn(columnKey)
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
            render: (_value, _record, index) => renderTextCell(index + 1),
            width: 40,
        },
        {
            title: "ID",
            dataIndex: "ticketId",
            key: "ticketId",
            onCell: createSelectableCell("ticketId"),
            render: renderTextCell,
            width: 130,
        },
        {
            title: "Title",
            dataIndex: "ticketTitle",
            key: "ticketTitle",
            onCell: createSelectableCell("ticketTitle"),
            render: renderTextCell,
            width: 130,
        },
        {
            title: "Branch",
            dataIndex: "branchName",
            key: "branchName",
            onCell: createSelectableCell("branchName"),
            render: renderTextCell,
            width: 130,
        },
        {
            title: "Push",
            dataIndex: "pushCommand",
            key: "pushCommand",
            onCell: createSelectableCell("pushCommand"),
            render: renderTextCell,
            width: 130,
        },
        {
            title: "Commit",
            dataIndex: "commitMessage",
            key: "commitMessage",
            onCell: createSelectableCell("commitMessage"),
            render: renderTextCell,
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
            render: renderTextCell,
        },
        {
            title: "Git",
            dataIndex: "gitLink",
            key: "gitLink",
            onCell: createSelectableCell("gitLink"),
            render: renderTextCell,
        },
        {
            title: "PR",
            dataIndex: "prLink",
            key: "prLink",
            onCell: createSelectableCell("prLink"),
            render: renderTextCell,
        },
        {
            title: "Game",
            dataIndex: "gameName",
            key: "gameName",
            onCell: createSelectableCell("gameName"),
            render: renderTextCell,
        },
        {
            title: "Notes",
            dataIndex: "additionalInfo",
            key: "additionalInfo",
            onCell: createSelectableCell("additionalInfo"),
            render: renderTextCell,
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
