import { useState } from "react";
import { Select, type SelectOption } from "./components/Select";
import { Switch } from "./components/Switch";
import "./App.scss";

function App() {
  // Select demo state
  const [selectValue, setSelectValue] = useState("option1");
  const [selectDisabled, setSelectDisabled] = useState(false);
  const [customOptions, setCustomOptions] = useState<SelectOption[]>([
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ]);
  const [newOptionValue, setNewOptionValue] = useState("");
  const [newOptionLabel, setNewOptionLabel] = useState("");

  // Switch demo state
  const [switchChecked, setSwitchChecked] = useState(false);
  const [switchDisabled, setSwitchDisabled] = useState(false);
  const [switchWithLabel, setSwitchWithLabel] = useState(true);
  const [eventLog, setEventLog] = useState<string[]>([]);

  // Select handlers
  const handleSelectChange = (value: string) => {
    setSelectValue(value);
    logEvent(`Select changed to: ${value}`);
  };

  const addOption = () => {
    if (newOptionValue && newOptionLabel) {
      setCustomOptions([
        ...customOptions,
        { value: newOptionValue, label: newOptionLabel },
      ]);
      setNewOptionValue("");
      setNewOptionLabel("");
      logEvent(`Added new option: ${newOptionLabel} (${newOptionValue})`);
    }
  };

  const removeOption = (valueToRemove: string) => {
    setCustomOptions(
      customOptions.filter((opt) => opt.value !== valueToRemove)
    );
    if (selectValue === valueToRemove) {
      setSelectValue(customOptions[0]?.value || "");
    }
    logEvent(`Removed option: ${valueToRemove}`);
  };

  // Switch handlers
  const handleSwitchChange = (checked: boolean) => {
    setSwitchChecked(checked);
    logEvent(`Switch changed to: ${checked}`);
  };

  // Event logging
  const logEvent = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEventLog((prev) => [`[${timestamp}] ${message}`, ...prev.slice(0, 9)]);
  };

  const clearLog = () => setEventLog([]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Component Showcase</h1>
        <p>Interactive demonstration of Select and Switch components</p>
      </header>

      <div className="demo-container">
        {/* Select Component Demo */}
        <section className="demo-section">
          <h2>Select Component</h2>

          <div className="component-demo">
            <div className="component-preview">
              <h3>Preview</h3>
              <Select
                options={customOptions}
                value={selectValue}
                onChange={handleSelectChange}
                disabled={selectDisabled}
                placeholder="Choose an option"
              />
              <p className="selected-value">
                Selected Value: <code>{selectValue || "none"}</code>
              </p>
            </div>

            <div className="component-controls">
              <h3>Controls</h3>

              <div className="control-group">
                <label>
                  <Switch
                    checked={selectDisabled}
                    onChange={setSelectDisabled}
                  />
                  <span>Disabled</span>
                </label>
              </div>

              <div className="control-group">
                <h4>Manage Options</h4>
                <div className="options-list">
                  {customOptions.map((opt) => (
                    <div key={opt.value} className="option-item">
                      <span>
                        {opt.label} ({opt.value})
                      </span>
                      {customOptions.length > 1 && (
                        <button
                          onClick={() => removeOption(opt.value)}
                          className="btn-remove"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="control-group">
                <h4>Add New Option</h4>
                <input
                  type="text"
                  placeholder="Value"
                  value={newOptionValue}
                  onChange={(e) => setNewOptionValue(e.target.value)}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Label"
                  value={newOptionLabel}
                  onChange={(e) => setNewOptionLabel(e.target.value)}
                  className="input-field"
                />
                <button
                  onClick={addOption}
                  disabled={!newOptionValue || !newOptionLabel}
                  className="btn-primary"
                >
                  Add Option
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Switch Component Demo */}
        <section className="demo-section">
          <h2>Switch Component</h2>

          <div className="component-demo">
            <div className="component-preview">
              <h3>Preview</h3>
              <Switch
                checked={switchChecked}
                onChange={handleSwitchChange}
                disabled={switchDisabled}
                label={switchWithLabel ? "Toggle me!" : undefined}
              />
              <p className="selected-value">
                Current Value: <code>{switchChecked.toString()}</code>
              </p>
            </div>

            <div className="component-controls">
              <h3>Controls</h3>

              <div className="control-group">
                <label>
                  <Switch
                    checked={switchDisabled}
                    onChange={setSwitchDisabled}
                  />
                  <span>Disabled</span>
                </label>
              </div>

              <div className="control-group">
                <label>
                  <Switch
                    checked={switchWithLabel}
                    onChange={setSwitchWithLabel}
                  />
                  <span>Show Label</span>
                </label>
              </div>

              <div className="control-group">
                <button
                  onClick={() => handleSwitchChange(!switchChecked)}
                  disabled={switchDisabled}
                  className="btn-primary"
                >
                  Toggle Programmatically
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Event Log */}
        <section className="demo-section event-log-section">
          <div className="event-log-header">
            <h2>Event Log</h2>
            <button onClick={clearLog} className="btn-secondary">
              Clear Log
            </button>
          </div>
          <div className="event-log">
            {eventLog.length === 0 ? (
              <p className="log-empty">
                No events yet. Interact with the components above.
              </p>
            ) : (
              eventLog.map((log, index) => (
                <div key={index} className="log-entry">
                  {log}
                </div>
              ))
            )}
          </div>
        </section>

        {/* Component Documentation */}
        <section className="demo-section docs-section">
          <h2>Component Documentation</h2>

          <div className="docs-grid">
            <div className="doc-card">
              <h3>Select Component</h3>
              <h4>Props:</h4>
              <ul>
                <li>
                  <code>options: SelectOption[]</code> - Array of options
                </li>
                <li>
                  <code>value?: string</code> - Controlled value
                </li>
                <li>
                  <code>onChange?: (value: string) =&gt; void</code> - Change
                  handler
                </li>
                <li>
                  <code>disabled?: boolean</code> - Disable the select
                </li>
                <li>
                  <code>placeholder?: string</code> - Placeholder text
                </li>
              </ul>
              <h4>SelectOption Interface:</h4>
              <pre>
                <code>{`{
                  value: string;
                  label: string;
                }`}</code>
              </pre>
            </div>

            <div className="doc-card">
              <h3>Switch Component</h3>
              <h4>Props:</h4>
              <ul>
                <li>
                  <code>checked?: boolean</code> - Controlled checked state
                </li>
                <li>
                  <code>onChange?: (checked: boolean) =&gt; void</code> - Change
                  handler
                </li>
                <li>
                  <code>disabled?: boolean</code> - Disable the switch
                </li>
                <li>
                  <code>label?: string</code> - Optional label text
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
