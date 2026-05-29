import { memo, useState, useEffect } from "react"
// types
import { FC } from "../types"
// components
import { Card, Flex, Input, InputNumber, } from "antd"
import Copy from "./copy"
// utils + config
import { qaTextPrefix, qaTextSuffix } from "../config"


const QAText: FC = () => {
    const [qaText, setQAText] = useState("")
    const [numbers, setNumbers] = useState([0,0,0])

    useEffect(() => {
        setQAText(numbers.join("."))
    }, [numbers])

    return (
        <Card style={{ width: "100%" }}>
            
            <Flex gap="small" align="center" justify="space-between">
                <div style={{ textAlign: "left" }}>QA Text</div>
                <Flex gap="small" align="center" justify="end" flex="1 0 auto">
                    {[0, 1, 2].map((index) => (
                        <InputNumber
                            key={index}
                            value={numbers[index]}
                            onChange={(value) => {
                                if (value === null) return
                                const newNumbers = [...numbers]
                                newNumbers[index] = value || 0
                                setNumbers(newNumbers)
                            }}
                        />
                    ))}
                </Flex>

                <Flex gap="small" align="center" justify="end" flex="1 0 50%">
                    <Input
                        type="text"
                        value={qaTextPrefix + qaText + qaTextSuffix}
                        readOnly
                    />
                    <Copy
                        text={qaTextPrefix + qaText + qaTextSuffix}
                        inTable={false}
                    />
                </Flex>
            </Flex>
        </Card>
    )
}

export default memo(QAText)
