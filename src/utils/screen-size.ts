import { LogicalSize, getCurrentWindow } from "@tauri-apps/api/window";

export type DeviceScreenSize = {
	width: number;
	height: number;
};

export function getDeviceScreenSize(): DeviceScreenSize {
	if (typeof window === "undefined" || typeof window.screen === "undefined") {
		throw new Error("Device screen API is not available in this environment.");
	}

	return {
		width: window.screen.width,
		height: window.screen.height,
	};
}

export function getDeviceWidth(): number {
	return getDeviceScreenSize().width;
}

export function getDeviceHeight(): number {
	return getDeviceScreenSize().height;
}

export async function setAppSize(): Promise<void> {
	const { width, height } = getDeviceScreenSize()

	await getCurrentWindow().setSize(
		new LogicalSize(width, height),
	)

}
