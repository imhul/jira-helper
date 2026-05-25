import { CSSProperties } from 'react';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';


export const headerStyle: CSSProperties = {
    width: '100%',
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};

export const siderStyle: CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};

export const footerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

export const layoutStyle: CSSProperties = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
};

export enum ticketStatuses {
    progress = "In Progress",
    done = "Done",
    review = "In Review",
    qa = "QA",
}

export interface StatusData {
    status: 'processing' | 'success' | 'error' | 'default',
    name: string,
    icon: React.ReactNode,
}

export const statuses: Record<string, StatusData> = {
    saving: { status: 'processing', name: 'saving', icon: <SyncOutlined spin /> },
    saved: { status: 'success', name: 'saved', icon: <CheckCircleOutlined /> },
    savingError: { status: 'error', name: 'saving error', icon: <CloseCircleOutlined /> },
    reading: { status: 'processing', name: 'reading', icon: <SyncOutlined spin /> },
    readed: { status: 'success', name: 'readed', icon: <CheckCircleOutlined /> },
    readingError: { status: 'error', name: 'reading error', icon: <CloseCircleOutlined /> },
}
