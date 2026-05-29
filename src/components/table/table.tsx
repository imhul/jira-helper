import { memo, useMemo, useEffect, useState } from "react"
// types
import type { FC, Ticket, JsonData, JiraTableProps } from "../../types"
// components
import { Table } from "antd"
// utils + config
import { defaultJson } from "../../config"
import createColumns from "./columns"

export const JiraTable: FC<JiraTableProps> = memo(
    ({
        setDirty,
        data = defaultJson,
        setSelectedCell,
        onEdit,
        onDelete,
        onToggleLock,
    }) => {
        const [selectedCellKey, setSelectedCellKey] = useState<string | null>(
            null
        )

        useEffect(() => {
            if (!selectedCellKey) {
                return
            }

            const clearSelectedCell = (event: globalThis.MouseEvent) => {
                const target = event.target as HTMLElement | null
                if (target?.closest("[data-jira-cell-key]")) {
                    return
                }

                setSelectedCellKey(null)
                setSelectedCell({ text: "", x: 0, y: 0 })
            }

            document.addEventListener("click", clearSelectedCell, true)

            return () => {
                document.removeEventListener("click", clearSelectedCell, true)
            }
        }, [selectedCellKey])

        const editTicket = (ticket: Ticket) => {
            setDirty("dirty")
            onEdit?.(ticket)
        }

        const deleteTicket = (ticket: Ticket) => {
            setDirty("dirty")
            onDelete?.(ticket)
        }

        const toggleLockTicket = (ticket: Ticket) => {
            setDirty("dirty")
            onToggleLock?.(ticket)
        }

        const selectCell = (cellKey: string, text: string, x: number, y: number) => {
            setSelectedCellKey(cellKey)
            setSelectedCell({ text, x, y })
        }

        const columnsFactory = createColumns({
            onEdit: editTicket,
            onDelete: deleteTicket,
            onToggleLock: toggleLockTicket,
            onSelectCell: selectCell,
            selectedCellKey,
        })

        const columns = useMemo(() => columnsFactory, [columnsFactory])

        return (
            <div className="jira-table-shell">
                <Table<JsonData["tickets"][number]>
                    columns={columns}
                    dataSource={data.tickets}
                    rowKey={(record) => record.ticketId}
                    tableLayout="fixed"
                    scroll={{ y: "calc(100vh - 250px)" }}
                />
            </div>
        )
    }
)
