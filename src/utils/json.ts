import { invoke } from "@tauri-apps/api/core";

export async function saveFileJson(data: unknown): Promise<void> {
  await invoke("save_file_json", { data });
}

export async function readFileJson<T = unknown>(): Promise<T> {
  return invoke<T>("read_file_json");
}
