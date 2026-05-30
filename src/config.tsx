// icons
import {
    EyeTwoTone,
    EditTwoTone,
    SyncOutlined,
    EditOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    CheckCircleTwoTone,
} from "@ant-design/icons"
// types
import type {
    Ticket,
    JsonData,
    StatusData,
    TicketStatus,
    CSSProperties,
} from "./types"

// enums
export enum ticketStatuses {
    progress = "In Progress",
    done = "Done",
    review = "In Review",
    qa = "QA",
    deploy = "Pending Deployment",
}

// constants
export const colorPrimary = "#7cb342"
export const colorDanger = "#ff3d00"
export const colorBlue = "#1890ff"
export const colorSuccess = "#22cc00"
export const transparent = "rgba(0, 0, 0, 0)"
export const minute = 60 * 1000
export const pushPrefix = "git push -u origin "
export const dash = " - "
export const divider = "-"
export const longDivider = "---"
export const qaTextPrefix = "The game has been deployed to TEST env. (v. "
export const qaTextSuffix = ")"
export const ticketLinkPrefix = "https://playags-interactive.atlassian.net/browse/"
export const gitCloneCommand = "git clone --branch develop"
export const statusOptions = Object.entries(ticketStatuses).map(
    ([value, label]) => ({ value, label })
)

// styles
export const headerStyle: CSSProperties = {
    width: "100%",
    textAlign: "center",
    color: "#fff",
    height: 64,
    minHeight: 64,
    flexShrink: 0,
    paddingInline: 48,
    lineHeight: "64px",
    backgroundColor: transparent,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
}

export const contentStyle: CSSProperties = {
    textAlign: "center",
    minHeight: 0,
    flex: 1,
    overflow: "hidden",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: transparent,
}

export const siderStyle: CSSProperties = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: transparent,
}

export const footerStyle: CSSProperties = {
    textAlign: "center",
    color: "#fff",
    flexShrink: 0,
    backgroundColor: transparent,
}

export const layoutStyle: CSSProperties = {
    borderRadius: 0,
    overflow: "hidden",
    width: "100%",
    height: "100%",
}

export const ticketStatusIcons: Record<TicketStatus, React.ReactNode> = {
    progress: <EditTwoTone style={{ fontSize: 20 }} />,
    done: <CheckCircleTwoTone style={{ fontSize: 20 }} twoToneColor={colorSuccess} />,
    review: <EyeTwoTone style={{ fontSize: 20 }} />,
    qa: <EyeTwoTone style={{ fontSize: 20 }} twoToneColor={colorSuccess} />,
    deploy: <SyncOutlined style={{ fontSize: 20, color: colorBlue }} />,
}

export const dataStatuses: Record<string, StatusData> = {
    absent: {
        status: "default",
        name: "",
        icon: <SyncOutlined style={{ fontSize: 24 }} />,
    },
    dirty: {
        status: "processing",
        name: "edited",
        icon: <EditOutlined style={{ fontSize: 24 }} />,
    },
    saving: {
        status: "processing",
        name: "saving",
        icon: <SyncOutlined style={{ fontSize: 24 }} spin />,
    },
    saved: {
        status: "success",
        name: "saved",
        icon: <CheckCircleOutlined style={{ fontSize: 24 }} />,
    },
    savingError: {
        status: "error",
        name: "saving error",
        icon: <CloseCircleOutlined style={{ fontSize: 24 }} />,
    },
    reading: {
        status: "processing",
        name: "reading",
        icon: <SyncOutlined style={{ fontSize: 24 }} spin />,
    },
    readed: {
        status: "success",
        name: "readed",
        icon: <CheckCircleOutlined style={{ fontSize: 24 }} />,
    },
    readingError: {
        status: "error",
        name: "reading error",
        icon: <CloseCircleOutlined style={{ fontSize: 24 }} />,
    },
}

export const standartRules = {
    min: 3,
    max: 250,
    required: false,
    message: "This string too short or too long!",
}

export const searchKeys: (keyof Ticket)[] = [
    "ticketId",
    "ticketTitle",
    "branchName",
    "pushCommand",
    "commitMessage",
    "ticketLink",
    "gitLink",
    "prLink",
    "gameName",
    "additionalInfo",
]

export const defaultJson: JsonData = {
    tickets: [
        {
            order: 1,
            createdAt: 0,
            ticketId: "Enter ticket ID",
            ticketTitle: "Enter ticket title",
            branchName: "---",
            pushCommand: "---",
            commitMessage: "---",
            ticketStatus: "progress",
            ticketLink: "---",
            gitLink: "Enter Git repository link",
            prLink: "Enter PR link",
            gameName: "Enter game name",
            additionalInfo: "Enter additional info",
            locked: false,
        },
    ],
    lastTimeSaved: 0,
    autosave: false,
}

export const formItems = [
    {
        autosave: false,
        label: "Ticket Title",
        name: "ticketTitle",
        rules: [
            standartRules,
            { required: true, message: "Ticket Title is required!" },
        ],
        readonly: false,
    },
    {
        label: "Branch",
        name: "branchName",
        rules: [standartRules],
        readonly: true,
    },
    {
        label: "Push Command",
        name: "pushCommand",
        rules: [standartRules],
        readonly: true,
    },
    {
        label: "Commit",
        name: "commitMessage",
        rules: [standartRules],
        readonly: true,
    },
    {
        label: "Status",
        name: "ticketStatus",
        rules: [],
        readonly: true,
    },
    {
        label: "Ticket Link",
        name: "ticketLink",
        rules: [standartRules],
        readonly: true,
    },
    {
        label: "Repository",
        name: "gitLink",
        rules: [standartRules],
        readonly: false,
    },
    {
        label: "PR",
        name: "prLink",
        rules: [standartRules],
        readonly: false,
    },
    {
        label: "Game",
        name: "gameName",
        rules: [standartRules],
        readonly: false,
    },
    {
        label: "Notes",
        name: "additionalInfo",
        rules: [standartRules],
        readonly: false,
    },
]

export const addFormItems = [
    {
        label: "Ticket ID",
        name: "ticketId",
        readonly: false,
        rules: [
            {
                min: 9,
                max: 11,
                message: "Ticket ID must be between 9 and 11 characters long!",
            },
            {
                pattern: /^GMDEV-\d{3,5}$/,
                message: "Ticket ID must be in format: GMDEV-12345",
            },
            {
                required: true,
                message: "Ticket ID is required!",
            },
        ],
    },
    ...formItems,
]
