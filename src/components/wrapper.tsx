import { useState, useEffect } from "react"
// components
import { Tag, Flex, Layout, Button, notification } from 'antd';
import { JiraTable as Table } from "../components/table"
import {
    CloudUploadOutlined,
    CloudDownloadOutlined,
    SyncOutlined,
} from '@ant-design/icons';
// utils + config
import { readJson, saveJson, notify, getErrorText } from "../utils"
import { statuses, layoutStyle, headerStyle, contentStyle } from "../config"

const { Header, Content } = Layout

const Wrapper: React.FC = () => {
    const [api, contextHolder] = notification.useNotification()
    const [jsonText, setJsonText] = useState('{\n  "jiraUrl": "https://your-domain.atlassian.net",\n  "projectKey": "HELP"\n}')
    const [status, setStatus] = useState('')

    const getStatusData = () => {
        return status.length ? statuses[status] : { status: 'default', name: '', icon: null }
    }

    async function save() {
        setStatus('saving')
        try {
            const parsedJson = JSON.parse(jsonText)
            await saveJson(parsedJson)
            setStatus('saved')
            // notify('success', 'Success!', 'Data is successfully saved!', api)
        } catch (error) {
            setStatus('savingError')
            notify('error', "Error: JSON is not saved!", getErrorText(error), api)
        }
    }

    async function read() {
        setStatus('reading')
        try {
            const savedJson = await readJson()
            setJsonText(JSON.stringify(savedJson, null, 2))
            setStatus('readed')
            // notify('success', 'Success!', 'Data is successfully loaded!', api)
        } catch (error) {
            setStatus('readingError')
            notify('error', "Error: JSON is not loaded!", getErrorText(error), api)
        }
    }

    const reload = () => {
        window.location.reload()
    }

    useEffect(() => {
        read()
    }, [])

    return (
        <main className="container">
            {contextHolder}
            <Layout style={layoutStyle}>
                <Header style={headerStyle}>
                    <Flex gap={8} justify="space-between" align="center">
                        <Button type="primary" shape="circle" onClick={reload} icon={<SyncOutlined />} />
                        <Button type="primary" shape="circle" onClick={save} icon={<CloudUploadOutlined />} />
                        <Button type="primary" shape="circle" onClick={read} icon={<CloudDownloadOutlined />} />
                    </Flex>
                    <Flex gap={8} justify="flex-end" align="center">
                        <Tag color={getStatusData().status} icon={getStatusData().icon} variant="solid">
                            {`JSON ${getStatusData().name}`}
                        </Tag>
                    </Flex>
                </Header>
                <Content style={contentStyle}>
                    <section className="card">
                        <Table />
                    </section>
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

export default Wrapper