import { invoke } from "@tauri-apps/api/core"
// config
import { defaultJson } from "../config"
// types
import type { JsonData, Ticket } from "../types"

export async function saveJson(data: JsonData): Promise<void> {
    await invoke("save_file_json", { data })
}

export async function readJson<T = JsonData>(): Promise<T> {
    return invoke<T>("read_file_json")
}

export const getDefaultJson = (createdAt = Date.now()) => {
    return {
        ...defaultJson,
        tickets: defaultJson.tickets.map((ticket) => ({
            ...ticket,
            order: 1,
            createdAt,
        })),
    }
}

export const normalizeTickets = (tickets: Ticket[]) => {
    return tickets.map((ticket, index) => ({
        ...ticket,
        order: ticket.order ?? ticket.createdAt ?? index + 1,
        createdAt: ticket.createdAt ?? ticket.order ?? tickets.length - index,
    }))
}

export const sortTicketsByOrder = (tickets: Ticket[]) => {
    return [...normalizeTickets(tickets)].sort((left, right) => {
        if (left.order === right.order) {
            return right.createdAt - left.createdAt
        }

        return left.order - right.order
    })
}
