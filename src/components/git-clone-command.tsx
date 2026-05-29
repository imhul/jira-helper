import { memo, useState } from "react"
// types
import { FC } from "../types"
// components
import { Card, Flex, Input } from "antd"
import Copy from "./copy"

const GitCloneCommand: FC = () => {
    const [sshUrl, setSshUrl] = useState("")

    return (
        <Card style={{ width: "100%" }}>
            <div style={{ textAlign: "left" }}>Git Clone Command</div>
            <Flex gap="small" align="center" justify="space-between">
                <Flex align="center" flex="1 0 45%">
                    <Input
                        type="text"
                        allowClear
                        value={sshUrl}
                        onChange={(e) => setSshUrl(e.target.value)}
                    />
                </Flex>

                <Flex gap="small" align="center" justify="end" flex="1 0 45%">
                    <Input
                        type="text"
                        value={`git clone --branch develop ${sshUrl}`}
                        readOnly
                    />
                    <Copy text={`git clone --branch develop ${sshUrl}`} />
                </Flex>
            </Flex>
        </Card>
    )
}

export default memo(GitCloneCommand)
