import { memo, useState, useEffect } from "react"
// components
import { Flex, Checkbox, Layout, Segmented, Button, notification } from 'antd'
import { JiraTable as Table } from "./table"
import { JiraGrid as Grid } from "./grid"
import { EditModal } from "./edit-modal"
import { SatusTag as Tag } from "./tag"
import Counter from "./counter"
import {
    SaveOutlined,
    CloudDownloadOutlined,
    SyncOutlined,
    AppstoreOutlined,
    BarsOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons'
// types
import type { Ticket } from '../config'
// utils + config
import { readJson, saveJson, notify, getErrorText, setDefaultAppSize, centerAppWindow } from "../utils"
import { dataStatuses, layoutStyle, headerStyle, contentStyle, defaultJson, minute } from "../config"

const { Header, Content } = Layout

const Wrapper: React.FC = () => {
    const [api, contextHolder] = notification.useNotification()
    const [jsonObj, setJsonObj] = useState(defaultJson)
    const [status, setStatus] = useState('absent')
    const [isAutosave, setIsAutosave] = useState(false)
    const [isList, setIsList] = useState(true)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedTicket, setSelectedTicket] = useState<Ticket>(defaultJson.tickets[0])

    const getStatusData = () => {
        return status.length ? dataStatuses[status] : { status: 'default', name: '', icon: null }
    }

    const save = async () => {
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

    const read = async () => {
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

    const reload = () => {
        window.location.reload()
    }

    const add = (ticket: Ticket) => {
        console.info('Adding ticket: ', ticket)
        setJsonObj((prev) => ({
            ...prev,
            tickets: [...prev.tickets, ticket],
        }))
        save()
        setIsAddModalOpen(false)
    }

    const onAdd = () => {
        setIsAddModalOpen(true)
    }

    const edit = (ticket: Ticket) => {
        console.info('Editing ticket: ', ticket)
        setJsonObj((prev) => ({
            ...prev,
            tickets: prev.tickets.map((t) => (t.ticketId === ticket.ticketId ? ticket : t)),
        }))
        save()
        setModalOpen(false)
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

    useEffect(() => {
        async function init() {
            await setDefaultAppSize()
            await centerAppWindow()
            await read()
        }

        init()
    }, [])

    useEffect(() => {
        if (isAutosave) {
            const timeout = setInterval(() => save(), minute)
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
                isAdding={isAddModalOpen}
            />
            <Layout style={layoutStyle}>
                <Header style={headerStyle}>
                    <Flex gap="small" justify="space-between" align="center">
                        <Button size="large" type="primary" shape="circle" onClick={reload} icon={<SyncOutlined />} />
                        <Button size="large" type="primary" shape="circle" onClick={save} icon={<SaveOutlined />} />
                        <Button size="large" type="primary" shape="circle" onClick={read} icon={<CloudDownloadOutlined />} />
                        <Checkbox onChange={(e) => setIsAutosave(e.target.checked)}>Autosave</Checkbox>
                    </Flex>
                    <Flex gap="small" justify="flex-end" align="center">
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
                        ? <Table setDirty={setStatus} data={jsonObj} onEdit={onEdit} onDelete={onDelete} />
                        : <Grid setDirty={setStatus} data={jsonObj} onEdit={onEdit} onDelete={onDelete} />
                    }
                    {/* <textarea
                        id="json-input"
                        className="json-input"
                        value={jsonText}
                        onChange={(event) => setJsonText(event.currentTarget.value)}
                    /> */}
                </Content>
            </Layout>
        </main>
    )
}

export default memo(Wrapper)
