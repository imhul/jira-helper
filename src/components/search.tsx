import { useState, useEffect } from "react";
// components
import { Input } from 'antd';
// types
import type { FC, Ticket } from "../types"
// utils + config
import Fuse from 'fuse.js'

const SearchInput = Input.Search

interface SearchProps {
    updateList: (result: Ticket[]) => void
}

// TODO: updateList must resort tickets list:
// first tickets - its search results, then - the rest of tickets sorted by order

const Search: FC<SearchProps> = ({ updateList }) => {
    const [request, setRequest] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const search = (text: string) => {
        console.info("Searching for: ", text)
        setRequest(text)
        setIsLoading(true)

        const result = [] as Ticket[]

        if (result.length === 0) {
            updateList(result)
        }
    }

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
                if (value.length < 3 && value.length > 0) return
                search(value)
            }}
        />
    )
}

export default Search
