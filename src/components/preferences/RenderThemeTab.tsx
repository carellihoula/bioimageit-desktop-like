import { useState } from "react";

const fontFamilies = [
  { label: "Sans-serif", value: "sans-serif" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "monospace" },
  { label: "Inter", value: "'Inter', sans-serif" },
  { label: "Courier New", value: "'Courier New', monospace" },
];

export const RenderThemeTab = () => {
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [fontSize, setFontSize] = useState(14);

  return (
    <div className="space-y-4">
      {/* Font Family */}
      <div>
        <label className="block font-semibold mb-1">Police</label>
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="border p-2 rounded w-full"
        >
          {fontFamilies.map((font) => (
            <option value={font.value} key={font.value}>
              {font.label}
            </option>
          ))}
        </select>
      </div>

      {/* Font Size */}
      <div>
        <label className="block font-semibold mb-1">
          Taille de police ({fontSize}px)
        </label>
        <input
          type="range"
          min={10}
          max={24}
          step={1}
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Preview */}
      <div
        className="border rounded p-4 mt-4"
        style={{
          fontFamily,
          fontSize: `${fontSize}px`,
        }}
      >
        Preview : The quick brown fox jumps over the lazy dog.
      </div>
    </div>
  );
};
