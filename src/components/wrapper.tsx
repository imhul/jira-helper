import { memo, useState, useEffect } from "react"
// components
import { Flex, Checkbox, Layout, Segmented, Button, notification } from 'antd'
import { JiraTable as Table } from "./table"
import { JiraGrid as Grid } from "./grid"
import { AddModal as Modal } from "./add-modal"
import { SatusTag as Tag } from "./tag"
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
import { readJson, saveJson, notify, getErrorText, setAppSize } from "../utils"
import { statuses, layoutStyle, headerStyle, contentStyle, defaultJson, minute } from "../config"

const { Header, Content } = Layout

const Wrapper: React.FC = () => {
    const [api, contextHolder] = notification.useNotification()
    const [jsonObj, setJsonObj] = useState(defaultJson)
    const [status, setStatus] = useState('absent')
    const [isAutosave, setIsAutosave] = useState(false)
    const [isList, setIsList] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const getStatusData = () => {
        return status.length ? statuses[status] : { status: 'default', name: '', icon: null }
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
        setIsModalOpen(false)
    }

    const onAdd = () => {
        setIsModalOpen(true)
    }

    useEffect(() => {
        read()
        setAppSize()
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
            <Modal add={add} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
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
                        <Tag data={getStatusData()} />
                    </Flex>
                </Header>
                <Content style={contentStyle}>
                    {isList
                        ? <Table setDirty={setStatus} data={jsonObj} />
                        : <Grid setDirty={setStatus} data={jsonObj} />
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
