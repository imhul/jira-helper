// types
import type { FC } from "../types"
import { Card, Typography } from 'antd'

const { Text, Link } = Typography

const Help: FC = () => (
    <Card style={{ textAlign: "left" }}>
        <Text>
            <Text strong>Jira Helper</Text> - is a simple tool designed to help you manage your Jira tickets more efficiently.
            All changes are saved <Text strong>automatically</Text> every time you update <Text strong>any field</Text>, so there is no separate save button to worry about.
            When you add a new ticket, the most important step is filling in the <Text mark>Ticket ID</Text> and <Text mark>Ticket Title</Text> in the form.
            The remaining fields are secondary and can be completed later if you do not have all the details yet.
            You can see the open source code of this app&nbsp;
            <Link href="https://github.com/imhul/jira-helper" target="_blank">
                here
            </Link>.
        </Text>
        <Text style={{ textAlign: "center", display: "block", marginTop: "10px" }}>
            Made with ❤️ by <Link href="https://github.com/imhul" target="_blank">
            Tkachuk Zakhar</Link>
        </Text>
    </Card>
)

export default Help
