"use client"

import React from 'react';

// Tooltip component for visualizations
export function Tooltip({ data, position, visible }) {
  if (!visible || !data) return null;
  
  return (
    <div 
      className="absolute z-50 bg-white p-3 rounded-md shadow-lg border border-gray-200 text-sm"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%)',
        marginTop: '-10px',
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s'
      }}
    >
      {data.title && <div className="font-bold mb-1">{data.title}</div>}
      {data.items && data.items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          {item.color && (
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
          )}
          <div>{item.label}: <span className="font-semibold">{item.value}</span></div>
        </div>
      ))}
    </div>
  );
}

// Year slider component
export function YearSlider({ years, selectedYear, onChange }) {
  const min = 0;
  const max = years.length - 1;
  const currentIndex = years.indexOf(selectedYear);
  
  const handleChange = (e) => {
    const index = parseInt(e.target.value, 10);
    onChange(years[index]);
  };
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{years[0]}</span>
        <span>{years[years.length - 1]}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={currentIndex}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="text-center font-semibold mt-2">{selectedYear}</div>
    </div>
  );
}

// Filter panel component
export function FilterPanel({ children, title }) {
  const [expanded, setExpanded] = React.useState(true);
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
      <div 
        className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="font-semibold">{title}</h3>
        <button className="text-gray-500">
          {expanded ? '−' : '+'}
        </button>
      </div>
      {expanded && (
        <div className="p-4 border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
}

// Checkbox group for filter options
export function CheckboxGroup({ options, selected, onChange, name }) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name={name}
            value={option.value}
            checked={selected.includes(option.value)}
            onChange={() => onChange(option.value)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
}

// Interactive legend component
export function InteractiveLegend({ items, onToggle, activeItems }) {
  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onToggle(item.id)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors ${
            activeItems.includes(item.id)
              ? 'bg-gray-200 text-gray-800'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: item.color }}
          />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

// Comparison selector component
export function ComparisonSelector({ options, selectedOptions, onChange, maxSelections = 3 }) {
  const handleToggle = (value) => {
    if (selectedOptions.includes(value)) {
      onChange(selectedOptions.filter(v => v !== value));
    } else if (selectedOptions.length < maxSelections) {
      onChange([...selectedOptions, value]);
    }
  };
  
  return (
    <div>
      <div className="text-sm text-gray-500 mb-2">
        Select up to {maxSelections} items to compare:
      </div>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleToggle(option.value)}
            disabled={!selectedOptions.includes(option.value) && selectedOptions.length >= maxSelections}
            className={`px-3 py-2 text-sm rounded border ${
              selectedOptions.includes(option.value)
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
            } ${
              !selectedOptions.includes(option.value) && selectedOptions.length >= maxSelections
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Animation control component
export function AnimationControl({ playing, onPlay, onPause, onReset }) {
  return (
    <div className="flex items-center gap-2">
      {playing ? (
        <button
          onClick={onPause}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
          aria-label="Pause animation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        </button>
      ) : (
        <button
          onClick={onPlay}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
          aria-label="Play animation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>
      )}
      <button
        onClick={onReset}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
        aria-label="Reset animation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 2v6h6"></path>
          <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
          <path d="M21 22v-6h-6"></path>
          <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
        </svg>
      </button>
    </div>
  );
}
