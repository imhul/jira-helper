import { invoke } from "@tauri-apps/api/core";

export async function saveJson(data: unknown): Promise<void> {
  await invoke("save_file_json", { data });
}

export async function readJson<T = unknown>(): Promise<T> {
  return invoke<T>("read_file_json");
}
