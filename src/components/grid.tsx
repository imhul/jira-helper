

interface JiraGridProps {
    setDirty: (status: string) => void;
}

export const JiraGrid: React.FC<JiraGridProps> = ({ setDirty }) => {
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
}
