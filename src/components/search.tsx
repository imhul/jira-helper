import { memo, useEffect, useState } from "react"
// components
import { Input } from "antd"
// types
import type { FC, Ticket } from "../types"
// utils + config
import Fuse from "fuse.js"
import { searchKeys as keys } from "../config"

const SearchInput = Input.Search

interface SearchProps {
    tickets: Ticket[]
    updateList: (result: Ticket[]) => void
}

const Search: FC<SearchProps> = ({ tickets, updateList }) => {
    const [request, setRequest] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const search = (text: string) => {
        setRequest(text)
    }

    useEffect(() => {
        const normalizedRequest = request.trim()

        if (normalizedRequest.length < 3) {
            setIsLoading(false)
            updateList([])
            return
        }

        setIsLoading(true)

        const fuse = new Fuse(tickets, {
            includeScore: true,
            threshold: 0.35,
            ignoreLocation: true,
            keys,
        })

        const result = fuse.search(normalizedRequest).map(({ item }) => item)

        updateList(result)
        setIsLoading(false)
    }, [request, tickets, updateList])

    return (
        <SearchInput
            placeholder="Search..."
            enterButton
            size="large"
            style={{ maxWidth: 300 }}
            loading={isLoading}
            onSearch={search}
            onChange={(e) => {
                const value = e.target.value
                search(value)
            }}
        />
    )
}

export default memo(Search)
