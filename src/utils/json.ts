import { invoke } from "@tauri-apps/api/core";
// config
import { defaultJson } from "../config";
// types
import type { JsonData } from "../types";


export async function saveJson(data: JsonData): Promise<void> {
  await invoke("save_file_json", { data });
}

export async function readJson<T = JsonData>(): Promise<T> {
  return invoke<T>("read_file_json");
}

export const getDefaultJson = (order: number) => {
    return { ...defaultJson, tickets: defaultJson.tickets.map((ticket) => ({ ...ticket, order })) };
}
