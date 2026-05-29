import { memo, useEffect, useState } from "react"
import packageJson from "../../package.json"
// components
import {
    Flex,
    Checkbox,
    Layout,
    Segmented,
    Button,
    notification,
    Card,
} from "antd"
import { JiraTable as Table } from "./table/table"
import GitCloneCommand from "./git-clone-command"
import { JiraGrid as Grid } from "./grid"
import { EditModal } from "./edit-modal"
import { SatusTag as Tag } from "./tag"
import Counter from "./counter"
import QAText from "./qa-text"
import Search from "./search"
import Copy from "./copy"
import {
    SaveOutlined,
    CloudDownloadOutlined,
    SyncOutlined,
    AppstoreOutlined,
    BarsOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons"
// types
import type { CopyProps, FC, Ticket } from "../types"
// utils + config
import {
    notify,
    readJson,
    saveJson,
    getErrorText,
    centerAppWindow,
    setAppWindowTitle,
    setDefaultAppSize,
    sortTicketsByOrder,
} from "../utils"
import {
    minute,
    layoutStyle,
    headerStyle,
    footerStyle,
    defaultJson,
    contentStyle,
    dataStatuses,
} from "../config"


const { Header, Footer, Content } = Layout
const { version } = packageJson

const Wrapper: FC = () => {
    const [api, contextHolder] = notification.useNotification()
    const [jsonObj, setJsonObj] = useState(defaultJson)
    const [searchResults, setSearchResults] = useState<Ticket[]>([])
    const [status, setStatus] = useState("absent")
    const [isList, setIsList] = useState(true)
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedTicket, setSelectedTicket] = useState<Ticket>(
        defaultJson.tickets[0]
    )
    const [selectedCell, setSelectedCell] = useState<CopyProps>({
        text: "",
        x: 0,
        y: 0,
    })

    const getStatusData = () => {
        return status.length
            ? dataStatuses[status]
            : { status: "default", name: "", icon: null }
    }

    const sortedTickets = sortTicketsByOrder(jsonObj.tickets)
    const matchedTicketIds = new Set(searchResults.map((ticket) => ticket.ticketId))
    const displayedTickets = searchResults.length
        ? [
              ...searchResults,
              ...sortedTickets.filter(
                  (ticket) => !matchedTicketIds.has(ticket.ticketId)
              ),
          ]
        : sortedTickets

    const setEditModalOpen = (value: boolean) => {
        setModalOpen(value)
        if (!value) {
            setAddModalOpen(false)
        }
    }

    const saveData = async (dataToSave = jsonObj) => {
        setStatus("saving")
        const nextData = {
            ...dataToSave,
            lastTimeSaved: Date.now(),
        }
        try {
            setJsonObj(nextData)
            await saveJson(nextData)
            setStatus("saved")
            // notify('success', 'Success!', 'Data is successfully saved!', api)
        } catch (error) {
            setStatus("savingError")
            notify(
                "error",
                "Error: JSON is not saved!",
                getErrorText(error),
                api
            )
        }
    }

    const readData = async () => {
        setStatus("reading")
        try {
            const savedJson = await readJson<typeof defaultJson>()
            const sortedTickets = sortTicketsByOrder(savedJson.tickets)

            setJsonObj({
                ...savedJson,
                autosave: savedJson.autosave ?? false,
                tickets: sortedTickets.map((ticket) => ({
                    ...ticket,
                    locked: ticket.locked ?? false,
                })),
            })
            setStatus("readed")
            // notify('success', 'Success!', 'Data is successfully loaded!', api)
        } catch (error) {
            setStatus("readingError")
            notify(
                "error",
                "Error: JSON is not readed!",
                getErrorText(error),
                api
            )
        }
    }

    const reloadApp = () => {
        window.location.reload()
    }

    const add = (ticket: Ticket) => {
        const nextData = {
            ...jsonObj,
            tickets: [...jsonObj.tickets, ticket],
        }

        setJsonObj(nextData)
        saveData(nextData)
        setAddModalOpen(false)
    }

    const edit = (ticket: Ticket) => {
        const nextData = {
            ...jsonObj,
            tickets: jsonObj.tickets.map((t) =>
                t.ticketId === ticket.ticketId ? ticket : t
            ),
        }

        setJsonObj(nextData)
        saveData(nextData)
        setModalOpen(false)
    }

    const onAdd = () => {
        setAddModalOpen(true)
        setModalOpen(true)
    }

    const onEdit = (ticket: Ticket) => {
        setAddModalOpen(false)
        setSelectedTicket(ticket)
        setModalOpen(true)
    }

    const onDelete = (ticketToDelete: Ticket) => {
        const nextData = {
            ...jsonObj,
            tickets: jsonObj.tickets.filter(
                (ticket) => ticket.ticketId !== ticketToDelete.ticketId
            ),
        }

        setJsonObj(nextData)
        saveData(nextData)
    }

    const onToggleLock = (ticketToToggle: Ticket) => {
        const nextData = {
            ...jsonObj,
            tickets: jsonObj.tickets.map((ticket) =>
                ticket.ticketId === ticketToToggle.ticketId
                    ? { ...ticket, locked: !ticket.locked }
                    : ticket
            ),
        }

        setJsonObj(nextData)
        saveData(nextData)
    }

    const onToggleAutosave = (enabled: boolean) => {
        const nextData = {
            ...jsonObj,
            autosave: enabled,
        }

        setJsonObj(nextData)
        saveData(nextData)
    }

    const updateList = (result: Ticket[]) => {
        setSearchResults(result)
    }

    // initialize app
    useEffect(() => {
        async function init() {
            await setAppWindowTitle(`Jira Helper v. ${version}`)
            await setDefaultAppSize()
            await centerAppWindow()
            await readData()
        }

        init()
    }, [])

    // Autosave
    useEffect(() => {
        if (jsonObj.autosave) {
            const timeout = setInterval(() => saveData(), minute)
            return () => clearInterval(timeout)
        }
    }, [jsonObj.autosave])

    useEffect(() => {
        if (addModalOpen) {
            setModalOpen(true)
        }
    }, [addModalOpen])

    return (
        <main className="container">
            {contextHolder}
            {selectedCell.text?.length > 0 && (
                <Copy text={selectedCell.text} x={selectedCell.x} y={selectedCell.y} />
            )}
            <EditModal
                add={add}
                edit={edit}
                order={jsonObj.tickets.length + 1}
                isModalOpen={modalOpen}
                setIsModalOpen={setEditModalOpen}
                ticket={selectedTicket}
                isAdding={addModalOpen}
            />
            <Layout style={layoutStyle}>
                <Header style={headerStyle}>
                    <Flex gap="middle" justify="space-between" align="center">
                        <Button
                            size="large"
                            type="primary"
                            shape="circle"
                            onClick={reloadApp}
                            icon={<SyncOutlined />}
                        />
                        <Button
                            size="large"
                            type="primary"
                            shape="circle"
                            onClick={() => saveData()}
                            icon={<SaveOutlined />}
                        />
                        <Button
                            size="large"
                            type="primary"
                            shape="circle"
                            onClick={readData}
                            icon={<CloudDownloadOutlined />}
                        />
                        <Card>
                            <Checkbox
                                checked={jsonObj.autosave}
                                onChange={(e) =>
                                    onToggleAutosave(e.target.checked)
                                }
                            >
                                Autosave
                            </Checkbox>
                        </Card>
                    </Flex>
                    <Search tickets={sortedTickets} updateList={updateList} />
                    <Flex gap="middle" justify="flex-end" align="center">
                        <Button
                            size="large"
                            type="primary"
                            shape="circle"
                            onClick={onAdd}
                            icon={<PlusCircleOutlined />}
                        />
                        <Segmented
                            size="large"
                            onChange={(value) => setIsList(value === "List")}
                            options={[
                                { value: "List", icon: <BarsOutlined /> },
                                { value: "Grid", icon: <AppstoreOutlined /> },
                            ]}
                        />
                        <Counter num={jsonObj.tickets.length} />
                        <Tag
                            data={getStatusData()}
                            lastTimeSaved={jsonObj.lastTimeSaved}
                        />
                    </Flex>
                </Header>
                <Content style={contentStyle}>
                    {isList ? (
                        <Table
                            setDirty={setStatus}
                            data={{ ...jsonObj, tickets: displayedTickets }}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onToggleLock={onToggleLock}
                            setSelectedCell={setSelectedCell}
                        />
                    ) : (
                        <Grid
                            setDirty={setStatus}
                            data={{ ...jsonObj, tickets: displayedTickets }}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            setSelectedCell={setSelectedCell}
                        />
                    )}
                </Content>
                <Footer style={footerStyle}>
                    <QAText />
                    <GitCloneCommand />
                </Footer>
            </Layout>
        </main>
    )
}

export default memo(Wrapper)
