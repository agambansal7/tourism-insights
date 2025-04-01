"use client"

import { useState, useEffect } from 'react';
import { YearSlider, FilterPanel, CheckboxGroup, InteractiveLegend, Tooltip } from '@/components/interactive';
import { useYearSelection, useRegionSelection, useTransportModeSelection } from '@/hooks/useInteractiveElements';

// Sample data for tourism by transport mode
const transportModeData = [
  { year: "2015", Air: 1200, Land: 500, Water: 300 },
  { year: "2016", Air: 1300, Land: 520, Water: 320 },
  { year: "2017", Air: 1400, Land: 540, Water: 340 },
  { year: "2018", Air: 1500, Land: 560, Water: 360 },
  { year: "2019", Air: 1600, Land: 580, Water: 380 },
  { year: "2020", Air: 500, Land: 200, Water: 100 },
  { year: "2021", Air: 700, Land: 300, Water: 150 },
  { year: "2022", Air: 1100, Land: 450, Water: 250 },
];

// Sample data for regions
const regions = [
  { value: 'all', label: 'All Regions' },
  { value: 'europe', label: 'Europe' },
  { value: 'asia', label: 'Asia' },
  { value: 'northAmerica', label: 'North America' },
  { value: 'southAmerica', label: 'South America' },
  { value: 'africa', label: 'Africa' },
  { value: 'oceania', label: 'Oceania' },
];

// Sample data for transport modes
const transportModes = [
  { value: 'air', label: 'Air' },
  { value: 'land', label: 'Land' },
  { value: 'water', label: 'Water' },
];

// Legend items for transport modes
const legendItems = [
  { id: 'air', label: 'Air', color: '#3182CE' },
  { id: 'land', label: 'Land', color: '#E53E3E' },
  { id: 'water', label: 'Water', color: '#38A169' },
];

export default function InteractiveDashboard() {
  // Use custom hooks for interactive elements
  const { selectedYear, setSelectedYear, availableYears } = useYearSelection('2019');
  const { selectedRegion, setSelectedRegion, availableRegions } = useRegionSelection();
  const { selectedModes, toggleMode } = useTransportModeSelection();
  
  // State for tooltip
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  
  // State for active legend items
  const [activeLegendItems, setActiveLegendItems] = useState(['air', 'land', 'water']);
  
  // Handle legend item toggle
  const handleLegendToggle = (itemId) => {
    if (activeLegendItems.includes(itemId)) {
      // Don't allow deselecting all items
      if (activeLegendItems.length > 1) {
        setActiveLegendItems(activeLegendItems.filter(id => id !== itemId));
      }
    } else {
      setActiveLegendItems([...activeLegendItems, itemId]);
    }
  };
  
  // Filter data based on selected year
  const filteredData = transportModeData.find(item => item.year === selectedYear) || {};
  
  // Handle tooltip display
  const showTooltip = (mode, value, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipData({
      title: `${mode} Travel (${selectedYear})`,
      items: [{ label: 'Arrivals', value: `${value}k` }]
    });
    setTooltipPosition({ x: rect.left + rect.width / 2, y: rect.top });
    setTooltipVisible(true);
  };
  
  const hideTooltip = () => {
    setTooltipVisible(false);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Interactive Tourism Dashboard</h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Filters Panel */}
        <div className="md:col-span-1">
          <FilterPanel title="Filters">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year:</label>
                <YearSlider 
                  years={availableYears}
                  selectedYear={selectedYear}
                  onChange={setSelectedYear}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Region:</label>
                <select 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {regions.map(region => (
                    <option key={region.value} value={region.value}>{region.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transport Modes:</label>
                <CheckboxGroup 
                  options={transportModes}
                  selected={Object.entries(selectedModes)
                    .filter(([_, isSelected]) => isSelected)
                    .map(([mode]) => mode)}
                  onChange={(mode) => toggleMode(mode)}
                  name="transportModes"
                />
              </div>
            </div>
          </FilterPanel>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Selected Filters:</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><span className="font-medium">Year:</span> {selectedYear}</p>
              <p><span className="font-medium">Region:</span> {selectedRegion}</p>
              <p><span className="font-medium">Transport Modes:</span> {
                Object.entries(selectedModes)
                  .filter(([_, isSelected]) => isSelected)
                  .map(([mode]) => mode.charAt(0).toUpperCase() + mode.slice(1))
                  .join(', ')
              }</p>
            </div>
          </div>
        </div>
        
        {/* Visualization Panel */}
        <div className="md:col-span-2">
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">Tourism by Transport Mode ({selectedYear})</h3>
            
            {/* Simple bar chart visualization */}
            <div className="relative h-64">
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around h-56">
                {activeLegendItems.includes('air') && (
                  <div 
                    className="w-20 bg-blue-500 hover:bg-blue-600 transition-all cursor-pointer relative"
                    style={{ height: `${(filteredData.Air / 2000) * 100}%` }}
                    onMouseEnter={(e) => showTooltip('Air', filteredData.Air, e)}
                    onMouseLeave={hideTooltip}
                  >
                    <div className="absolute top-0 left-0 right-0 -translate-y-6 text-center text-sm font-medium">
                      {filteredData.Air}k
                    </div>
                  </div>
                )}
                
                {activeLegendItems.includes('land') && (
                  <div 
                    className="w-20 bg-red-500 hover:bg-red-600 transition-all cursor-pointer relative"
                    style={{ height: `${(filteredData.Land / 2000) * 100}%` }}
                    onMouseEnter={(e) => showTooltip('Land', filteredData.Land, e)}
                    onMouseLeave={hideTooltip}
                  >
                    <div className="absolute top-0 left-0 right-0 -translate-y-6 text-center text-sm font-medium">
                      {filteredData.Land}k
                    </div>
                  </div>
                )}
                
                {activeLegendItems.includes('water') && (
                  <div 
                    className="w-20 bg-green-500 hover:bg-green-600 transition-all cursor-pointer relative"
                    style={{ height: `${(filteredData.Water / 2000) * 100}%` }}
                    onMouseEnter={(e) => showTooltip('Water', filteredData.Water, e)}
                    onMouseLeave={hideTooltip}
                  >
                    <div className="absolute top-0 left-0 right-0 -translate-y-6 text-center text-sm font-medium">
                      {filteredData.Water}k
                    </div>
                  </div>
                )}
              </div>
              
              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-around pt-2 border-t border-gray-300">
                {activeLegendItems.includes('air') && <div className="w-20 text-center text-sm">Air</div>}
                {activeLegendItems.includes('land') && <div className="w-20 text-center text-sm">Land</div>}
                {activeLegendItems.includes('water') && <div className="w-20 text-center text-sm">Water</div>}
              </div>
            </div>
            
            {/* Interactive legend */}
            <InteractiveLegend 
              items={legendItems}
              activeItems={activeLegendItems}
              onToggle={handleLegendToggle}
            />
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
            <ul className="space-y-2 text-sm">
              <li>Air travel consistently accounts for the largest share of tourist arrivals.</li>
              <li>The COVID-19 pandemic in 2020 caused a significant drop in all transport modes.</li>
              <li>Recovery has been strongest in air travel, which has rebounded faster than land or water transport.</li>
              <li>Regional variations exist, with some areas more dependent on specific transport modes.</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Tooltip */}
      <Tooltip 
        data={tooltipData}
        position={tooltipPosition}
        visible={tooltipVisible}
      />
    </div>
  );
}
