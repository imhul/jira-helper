// types
import type { FC } from "../types"
import { Card, Typography } from 'antd';

const { Text } = Typography;

const Help: FC = () => (
  <Card title="How to use">
    <Text type="secondary">
        Jira Helper - is a simple tool designed to help you manage your Jira tickets more efficiently.
    </Text>
    <Text strong>
      All changes are saved automatically every time you update any field, so there is no separate save button to worry about.
    </Text>
    <Text type="secondary">
      When you add a new ticket, the most important step is filling in the Ticket ID and Ticket Title in the form.
    </Text>
    <Text>
      The remaining fields are secondary and can be completed later if you do not have all the details yet.
    </Text>
    <Text mark>
        you can see the open source code of this app here:
    </Text>
    <Text>
        Made with ❤️ by [Tkachuk Zakhar](https://github.com/imhul)
    </Text>
  </Card>
)

export default Help
