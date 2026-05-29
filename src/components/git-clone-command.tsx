import { memo, useState } from "react"
// types
import { FC } from "../types"
// components
import { Card, Flex, Input } from "antd"
import Copy from "./copy"
// utils + config
import { gitCloneCommand } from "../config"

const GitCloneCommand: FC = () => {
    const [sshUrl, setSshUrl] = useState("")

    return (
        <Card style={{ width: "100%" }}>
            <Flex gap="small" align="center" justify="space-between">
                <div style={{ textAlign: "left" }}>Git Clone Command</div>
                <Flex align="center" flex="1 0 auto">
                    <Input
                        type="text"
                        allowClear
                        value={sshUrl}
                        onChange={(e) => setSshUrl(e.target.value)}
                        placeholder="Enter SSH URL"
                    />
                </Flex>

                <Flex gap="small" align="center" justify="end" flex="1 0 50%">
                    <Input
                        type="text"
                        value={`${gitCloneCommand} ${sshUrl}`}
                        readOnly
                    />
                    <Copy
                        text={`${gitCloneCommand} ${sshUrl}`}
                        inTable={false}
                    />
                </Flex>
            </Flex>
        </Card>
    )
}

export default memo(GitCloneCommand)
