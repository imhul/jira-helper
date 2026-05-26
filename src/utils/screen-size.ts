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

export async function setDefaultAppSize(): Promise<void> {
	const { width, height } = getDeviceScreenSize()
    
	await getCurrentWindow().setSize(
		new LogicalSize(
            Math.floor(width / 100 * 80),
            Math.floor(height / 100 * 80)
        ),
	)
}

export async function centerAppWindow(): Promise<void> {
    await getCurrentWindow().center()
}
