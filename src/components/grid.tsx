import { memo } from 'react'
// types
import type { FC } from 'react'
import type { JsonData, Ticket } from '../config'
// components

// utils + config
import { getFormattedData } from "../utils"
import { defaultJson } from '../config'

interface JiraGridProps {
    setDirty: (status: string) => void;
    data: typeof defaultJson;
    onEdit?: (ticket: Ticket) => void;
    onDelete?: (ticket: Ticket) => void;
}

export const JiraGrid: FC<JiraGridProps> = memo(({ setDirty, data }) => {
    console.info('Rendering JiraGrid with data:', data)
    return (
        <div className="grid-container" onClick={() => setDirty('dirty')}>
            <div className="grid-item">1</div>
            <div className="grid-item">2</div>
            <div className="grid-item">3</div>
            <div className="grid-item">4</div>
            <div className="grid-item">5</div>
            <div className="grid-item">6</div>
        </div>
    )
})
