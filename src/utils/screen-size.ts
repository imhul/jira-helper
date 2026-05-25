import { LogicalSize, getCurrentWindow } from "@tauri-apps/api/window"

export type DeviceScreenSize = {
	width: number;
	height: number;
}

const minAppWidth = 1200
const minAppHeight = 800

export function getDeviceScreenSize(): DeviceScreenSize {
	if (typeof window === "undefined" || typeof window.screen === "undefined") {
		throw new Error("Device screen API is not available in this environment.")
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

export async function setAppSize(): Promise<void> {
	const { width, height } = getDeviceScreenSize()
    const halfWidth = width / 2
    const halfHeight = height / 2
	const appWidth = (halfWidth < minAppWidth && width < minAppWidth) ? halfWidth : minAppWidth
	const appHeight = (halfHeight < minAppHeight && height < minAppHeight) ? halfHeight : minAppHeight
    console.info('Setting app size to: ', { appWidth, appHeight })

	await getCurrentWindow().setSize(
		new LogicalSize(appWidth, appHeight),
	)
}
