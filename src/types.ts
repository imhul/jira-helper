import type { FC, MouseEvent, CSSProperties } from "react"
import type { TableProps, TagProps } from "antd"
import { ticketStatuses, defaultJson } from "./config"

// Interfaces
export interface SatusTagProps {
    data: {
        status: string
        name: string
        icon: React.ReactNode
    }
    lastTimeSaved: number
}

export interface StatusData {
    status: "processing" | "success" | "error" | "default"
    name: string
    icon: React.ReactNode
}

export interface Ticket {
    order: number
    createdAt: number
    ticketId: string
    ticketTitle: string
    branchName: string
    pushCommand: string
    commitMessage: string
    ticketStatus: TicketStatus
    ticketLink: string
    gitLink: string
    prLink: string
    gameName: string
    additionalInfo: string
    locked: boolean
}

export interface JsonData {
    tickets: Ticket[]
    lastTimeSaved: number
    autosave: boolean
}

export interface TicketColumnActions {
    onEdit: (ticket: Ticket) => void
    onDelete: (ticket: Ticket) => void
    onToggleLock: (ticket: Ticket) => void
    onSelectCell: (cellKey: string, text: string, x: number, y: number, isLink: boolean) => void
    selectedCellKey: string | null
}

export interface JiraTableProps {
    setDirty: (status: string) => void
    data: JsonData
    onEdit?: (ticket: Ticket) => void
    onDelete?: (ticket: Ticket) => void
    onToggleLock?: (ticket: Ticket) => void
    setSelectedCell: (cell: CopyProps) => void
}

export interface JiraGridProps {
    setDirty: (status: string) => void
    data: typeof defaultJson
    onEdit?: (ticket: Ticket) => void
    onDelete?: (ticket: Ticket) => void
    setSelectedCell: (cell: CopyProps) => void
}

export interface EditModalProps {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    edit: (ticket: Ticket) => void
    add: (ticket: Ticket) => void
    ticket: Ticket
    isAdding: boolean
}

export interface CopyProps {
    inTable?: boolean
    isLink?: boolean
    text: string
    x?: number
    y?: number
}

export interface ActionsProps {
    onEdit: (ticket: Ticket) => void
    onDelete: (ticket: Ticket) => void
    onToggleLock: (ticket: Ticket) => void
    record: Ticket
}

export interface FormValues {
    additionalInfo: string | undefined
    branchName: string | undefined
    commitMessage: string | undefined
    gameName: string | undefined
    gitLink: string | undefined
    prLink: string | undefined
    pushCommand: string | undefined
    ticketId: string | undefined
    ticketLink: string | undefined
    ticketStatus: keyof typeof ticketStatuses | undefined
    ticketTitle: string | undefined
}

// types
export type CellMouseEvent = MouseEvent<HTMLTableRowElement, MouseEvent>
export type TicketStatus = "progress" | "done" | "review" | "qa" | "deploy"
export type CreatedColumns = TableProps<JsonData["tickets"][number]>["columns"]
export type { FC, TagProps, MouseEvent, TableProps, CSSProperties }
