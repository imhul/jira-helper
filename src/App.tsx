import { useState } from "react";
import { readFileJson, saveFileJson } from "./utils/json";
import "./App.css";

function App() {
  const [jsonText, setJsonText] = useState('{\n  "jiraUrl": "https://your-domain.atlassian.net",\n  "projectKey": "HELP"\n}');
  const [status, setStatus] = useState("");

  async function handleSave() {
    try {
      const parsedJson = JSON.parse(jsonText);
      await saveFileJson(parsedJson);
      setStatus("file.json успішно збережено локально.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Не вдалося зберегти JSON.");
    }
  }

  async function handleRead() {
    try {
      const savedJson = await readFileJson();
      setJsonText(JSON.stringify(savedJson, null, 2));
      setStatus("file.json успішно прочитано.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Не вдалося прочитати JSON.");
    }
  }

  return (
    <main className="container">
      <section className="card">
        <h1>Локальна робота з file.json</h1>
        <p className="subtitle">
          Утиліта зберігає JSON у локальну директорію застосунку та читає його назад.
        </p>

        <label className="field-label" htmlFor="json-input">
          JSON вміст
        </label>
        <textarea
          id="json-input"
          className="json-input"
          value={jsonText}
          onChange={(event) => setJsonText(event.currentTarget.value)}
        />

        <div className="actions">
          <button type="button" onClick={handleSave}>
            Зберегти file.json
          </button>
          <button type="button" onClick={handleRead}>
            Прочитати file.json
          </button>
        </div>

        <p className="status">{status}</p>
      </section>
    </main>
  );
}

export default App;
