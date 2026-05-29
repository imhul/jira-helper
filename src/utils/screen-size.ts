import { LogicalSize, getCurrentWindow } from "@tauri-apps/api/window"

export type DeviceScreenSize = {
    width: number
    height: number
}

function getAppWindow() {
    try {
        return getCurrentWindow()
    } catch {
        return null
    }
}

export function getDeviceScreenSize(): DeviceScreenSize {
    if (typeof window === "undefined" || typeof window.screen === "undefined") {
        throw new Error(
            "Device screen API is not available in this environment."
        )
    }

    return {
        width: window.screen.width,
        height: window.screen.height,
    }
}

export function getDeviceWidth(): number {
    return getDeviceScreenSize().width
}

export function getDeviceHeight(): number {
    return getDeviceScreenSize().height
}

export async function setDefaultAppSize(): Promise<void> {
    const appWindow = getAppWindow()
    if (!appWindow) {
        return
    }

    const { width, height } = getDeviceScreenSize()

    await appWindow.setSize(
        new LogicalSize(
            Math.floor((width / 100) * 80),
            Math.floor((height / 100) * 80)
        )
    )
}

export async function centerAppWindow(): Promise<void> {
    const appWindow = getAppWindow()
    if (!appWindow) {
        return
    }

    await appWindow.center()
}

export async function setAppWindowTitle(title: string): Promise<void> {
    if (typeof document !== "undefined") {
        document.title = title
    }

    const appWindow = getAppWindow()
    if (!appWindow) {
        return
    }

    await appWindow.setTitle(title)
}
