
import type { NotificationInstance } from 'antd/es/notification/interface'
import { InfoCircleOutlined } from '@ant-design/icons';

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export function notify(
    type: NotificationType = 'info',
    message = 'Information',
    description = '',
    api: NotificationInstance,
    icon: React.ReactNode = <InfoCircleOutlined />,
): void {
    api[type]({
        title: type.charAt(0).toUpperCase() + type.slice(1),
        message,
        description,
        placement: 'topRight',
        duration: 4,
        showProgress: true,
        pauseOnHover: true,
        closable: true,
        role: 'status',
        className: "notify",
        key: crypto.randomUUID(),
        icon: icon,
    })
}
