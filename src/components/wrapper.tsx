import { memo, useState, useEffect } from "react"
// components
import { Flex, Checkbox, Layout, Segmented, Button, notification } from 'antd'
import { JiraTable as Table } from "./table/table"
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
} from '@ant-design/icons'
// types
import type { FC, Ticket } from '../types'
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
} from "../config"

const { Header, Footer, Content } = Layout

const Wrapper: FC = () => {
    const [api, contextHolder] = notification.useNotification()
    const [jsonObj, setJsonObj] = useState(defaultJson)
    const [status, setStatus] = useState('absent')
    const [isAutosave, setIsAutosave] = useState(false)
    const [isList, setIsList] = useState(true)
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedTicket, setSelectedTicket] = useState<Ticket>(defaultJson.tickets[0])
    const [selectedCellText, setSelectedCellText] = useState<string>('')

    const getStatusData = () => {
        return status.length
            ? dataStatuses[status]
            : { status: 'default', name: '', icon: null }
    }

    const saveData = async () => {
        setStatus('saving')
        try {
            await saveJson(jsonObj)
            setStatus('saved')
            // notify('success', 'Success!', 'Data is successfully saved!', api)
        } catch (error) {
            setStatus('savingError')
            notify('error', "Error: JSON is not saved!", getErrorText(error), api)
        }
    }

    const readData = async () => {
        setStatus('reading')
        try {
            const savedJson = await readJson()
            console.info('Readed JSON:', savedJson)
            setJsonObj(savedJson as typeof defaultJson)
            setStatus('readed')
            // notify('success', 'Success!', 'Data is successfully loaded!', api)
        } catch (error) {
            setStatus('readingError')
            notify('error', "Error: JSON is not readed!", getErrorText(error), api)
        }
    }

    const reloadApp = () => {
        window.location.reload()
    }

    const add = (ticket: Ticket) => {
        console.info('Adding ticket: ', ticket)
        setJsonObj((prev) => ({
            ...prev,
            tickets: [...prev.tickets, ticket],
        }))
        saveData()
        setAddModalOpen(false)
    }

    const edit = (ticket: Ticket) => {
        console.info('Editing ticket: ', ticket)
        setJsonObj((prev) => ({
            ...prev,
            tickets: prev.tickets.map((t) => (t.ticketId === ticket.ticketId ? ticket : t)),
        }))
        saveData()
        setModalOpen(false)
    }

    const onAdd = () => {
        setAddModalOpen(true)
    }

    const onEdit = (ticket: Ticket) => {
        setSelectedTicket(ticket)
        setModalOpen(true)
    }

    const onDelete = (ticketToDelete: Ticket) => {
        setJsonObj((prev) => ({
            ...prev,
            tickets: prev.tickets.filter((ticket) => ticket.ticketId !== ticketToDelete.ticketId),
        }))
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
        if (isAutosave) {
            const timeout = setInterval(() => saveData(), minute)
            return () => clearInterval(timeout)
        }
    }, [isAutosave])

    return (
        <main className="container">
            {contextHolder}
            <EditModal
                add={add}
                edit={edit}
                order={jsonObj.tickets.length + 1}
                isModalOpen={modalOpen}
                setIsModalOpen={setModalOpen}
                ticket={selectedTicket}
                isAdding={addModalOpen}
            />
            <Layout style={layoutStyle}>
                <Header style={headerStyle}>
                    <Flex gap="small" justify="space-between" align="center">
                        <Button size="large" type="primary" shape="circle" onClick={reloadApp} icon={<SyncOutlined />} />
                        <Button size="large" type="primary" shape="circle" onClick={saveData} icon={<SaveOutlined />} />
                        <Button size="large" type="primary" shape="circle" onClick={readData} icon={<CloudDownloadOutlined />} />
                        <Checkbox onChange={(e) => setIsAutosave(e.target.checked)}>Autosave</Checkbox>
                    </Flex>
                    <Flex gap="small" justify="flex-end" align="center">
                        {selectedCellText.length > 0 && <Copy text={selectedCellText} />}
                        <Button size="large" type="primary" shape="circle" onClick={onAdd} icon={<PlusCircleOutlined />} />
                        <Segmented
                            size="large"
                            onChange={(value) => setIsList(value === 'List')}
                            options={[
                                { value: 'List', icon: <BarsOutlined /> },
                                { value: 'Grid', icon: <AppstoreOutlined /> },
                            ]}
                        />
                        <Counter num={jsonObj.tickets.length} />
                        <Tag data={getStatusData()} />
                    </Flex>
                </Header>
                <Content style={contentStyle}>
                    {isList
                        ? <Table
                            setDirty={setStatus}
                            data={jsonObj}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            setText={setSelectedCellText}
                        />
                        : <Grid
                            setDirty={setStatus}
                            data={jsonObj}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            setText={setSelectedCellText}
                        />
                    }
                </Content>
                <Footer style={footerStyle}>
                    footer
                </Footer>
            </Layout>
        </main>
    )
}

export default memo(Wrapper)
