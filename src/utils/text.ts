const pushPrefix = "git push -u origin "
const dash = " - "
const divider = "-"
const longDivider = "---"
const ticketLinkPrefix = "https://playags-interactive.atlassian.net/browse/"

export const addIdAsPrefix = (id: string, text: string): string => {
    return `${id}${text}`
}

export const formatToGit = (text: string): string => {
    const formatted = text
        .replace(/ /g, divider)
        .replace(dash, longDivider)
        .replace(/'/g, "")
        .trim()

    let result = formatted

    if (!formatted.startsWith(longDivider)) {
        result = longDivider + formatted
    }

    return result
}

export const getPushCommand = (text: string): string => {
    return `${pushPrefix}${text}`
}

export const getBranchName = (
    ticketTitle: string,
    ticketId: string
): string => {
    const formattedTitle = formatToGit(ticketTitle)
    return addIdAsPrefix(ticketId, formattedTitle)
}

export const getTicketLink = (ticketId: string): string => {
    return `${ticketLinkPrefix}${ticketId}`
}

export const getCommitMessage = (
    ticketTitle: string,
    ticketId: string
): string => {
    return `${ticketId} ${ticketTitle}`
}

export const getFormattedData = (ticketTitle: string, ticketId: string) => {
    return {
        ticketId,
        ticketTitle,
        branchName: getBranchName(ticketTitle, ticketId),
        pushCommand: getPushCommand(getBranchName(ticketTitle, ticketId)),
        ticketLink: getTicketLink(ticketId),
        commitMessage: getCommitMessage(ticketTitle, ticketId),
    }
}
