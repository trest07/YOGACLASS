import React from "react";

/**
 * Filters
 * - categories: array of { id, name }
 * - levels: array of strings
 * - selectedCategory, selectedLevel, onChangeCategory, onChangeLevel
 */
export function Filters({
  tiers = [],
  levels = [],
  selectedTier,
  selectedLevel,
  onChangeTier,
  onChangeLevel,
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Levels</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onChangeLevel(null)}
            className={`px-3 py-1 rounded-full text-sm ${
              !selectedLevel
                ? "bg-leaf text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            All Levels
          </button>
          {levels.map((l) => (
            <button
              key={l}
              onClick={() => onChangeLevel(l)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedLevel === l
                  ? "bg-leaf text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Tiers</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onChangeTier(null)}
            className={`px-3 py-1 rounded-full text-sm ${
              !selectedTier ? "bg-leaf text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            All
          </button>
          {tiers.map((c) => (
            <button
              key={c.id}
              onClick={() => onChangeTier(c.id)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTier === c.id
                  ? "bg-leaf text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
