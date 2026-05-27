import type { FC, MouseEvent, CSSProperties } from 'react'
import type { TableProps } from 'antd'
import { ticketStatuses, defaultJson } from './config'

// Interfaces
export interface StatusData {
    status: 'processing' | 'success' | 'error' | 'default',
    name: string,
    icon: React.ReactNode,
}

export interface Ticket {
    order: number;
    ticketId: string;
    ticketTitle: string;
    branchName: string;
    pushCommand: string;
    commitMessage: string;
    ticketStatus: TicketStatus;
    ticketLink: string;
    gitLink: string;
    prLink: string;
    gameName: string;
    additionalInfo: string;
}

export interface JsonData {
    tickets: Ticket[];
}

export interface TicketColumnActions {
    onEdit: (ticket: Ticket) => void;
    onDelete: (ticket: Ticket) => void;
}

export interface JiraTableProps {
    setDirty: (status: string) => void;
    data: JsonData;
    onEdit?: (ticket: Ticket) => void;
    onDelete?: (ticket: Ticket) => void;
    setText: (text: string) => void;
}

export interface JiraGridProps {
    setDirty: (status: string) => void;
    data: typeof defaultJson;
    onEdit?: (ticket: Ticket) => void;
    onDelete?: (ticket: Ticket) => void;
    setText: (text: string) => void;
}

export interface EditModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    edit: (ticket: Ticket) => void;
    add: (ticket: Ticket) => void;
    ticket: Ticket;
    order: number;
    isAdding: boolean;
}

export interface FormValues {
    additionalInfo: string | undefined;
    branchName: string | undefined;
    commitMessage: string | undefined;
    gameName: string | undefined;
    gitLink: string | undefined;
    prLink: string | undefined;
    pushCommand: string | undefined;
    ticketLink: string | undefined;
    ticketStatus: keyof typeof ticketStatuses | undefined;
    ticketTitle: string | undefined;
}

// types
export type CellMouseEvent = MouseEvent<HTMLTableRowElement, MouseEvent>
export type TicketStatus = 'progress' | 'done' | 'review' | 'qa' | 'pending deploy'
export type CreatedColumns = TableProps<JsonData['tickets'][number]>['columns']
export type {
    FC,
    MouseEvent,
    TableProps,
    CSSProperties
}
