import { memo, useState, useEffect } from "react"
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
import type { FC, Ticket } from "../types"
// utils + config
import {
    notify,
    readJson,
    saveJson,
    getErrorText,
    centerAppWindow,
    setDefaultAppSize,
} from "../utils"
import {
    minute,
    layoutStyle,
    headerStyle,
    footerStyle,
    defaultJson,
    contentStyle,
    dataStatuses,
    colorPrimary,
} from "../config"

const { Header, Footer, Content } = Layout
const { version } = packageJson

const Wrapper: FC = () => {
    const [api, contextHolder] = notification.useNotification()
    const [jsonObj, setJsonObj] = useState(defaultJson)
    const [status, setStatus] = useState("absent")
    const [isList, setIsList] = useState(true)
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedTicket, setSelectedTicket] = useState<Ticket>(
        defaultJson.tickets[0]
    )
    const [selectedCellText, setSelectedCellText] = useState<string>("")

    const getStatusData = () => {
        return status.length
            ? dataStatuses[status]
            : { status: "default", name: "", icon: null }
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
            setJsonObj({
                ...savedJson,
                autosave: savedJson.autosave ?? false,
                tickets: savedJson.tickets.map((ticket) => ({
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

    const setEditModalOpen = (value: boolean) => {
        setModalOpen(value)
        if (!value) {
            setAddModalOpen(false)
        }
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

    // initialize app
    useEffect(() => {
        async function init() {
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
                    <h1 style={{ margin: 0, color: colorPrimary }}>
                        Jira Helper{" "}
                        <small style={{ fontSize: "0.5em" }}>v{version}</small>
                    </h1>
                    <Flex gap="middle" justify="flex-end" align="center">
                        {selectedCellText.length > 0 && (
                            <Copy text={selectedCellText} />
                        )}
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
                            data={jsonObj}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onToggleLock={onToggleLock}
                            setText={setSelectedCellText}
                        />
                    ) : (
                        <Grid
                            setDirty={setStatus}
                            data={jsonObj}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            setText={setSelectedCellText}
                        />
                    )}
                </Content>
                <Footer style={footerStyle}>
                    <GitCloneCommand />
                </Footer>
            </Layout>
        </main>
    )
}

export default memo(Wrapper)
