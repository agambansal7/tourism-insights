"use client"

import { useState, useEffect } from 'react';

// Custom hook for year selection
export function useYearSelection(initialYear = '2019', availableYears = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022']) {
  const [selectedYear, setSelectedYear] = useState(initialYear);
  
  const handleYearChange = (year) => {
    setSelectedYear(year);
  };
  
  return {
    selectedYear,
    setSelectedYear: handleYearChange,
    availableYears
  };
}

// Custom hook for region selection
export function useRegionSelection(initialRegion = 'All Regions') {
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const availableRegions = [
    'All Regions',
    'Europe',
    'Asia',
    'North America',
    'South America',
    'Africa',
    'Oceania'
  ];
  
  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };
  
  return {
    selectedRegion,
    setSelectedRegion: handleRegionChange,
    availableRegions
  };
}

// Custom hook for transport mode selection
export function useTransportModeSelection() {
  const [selectedModes, setSelectedModes] = useState({
    air: true,
    land: true,
    water: true
  });
  
  const toggleMode = (mode) => {
    setSelectedModes(prev => ({
      ...prev,
      [mode]: !prev[mode]
    }));
  };
  
  return {
    selectedModes,
    toggleMode
  };
}

// Custom hook for data filtering based on selections
export function useFilteredData(data, filters) {
  const [filteredData, setFilteredData] = useState(data);
  
  useEffect(() => {
    // Apply filters to data
    let result = [...data];
    
    if (filters.year) {
      result = result.filter(item => item.year === filters.year);
    }
    
    if (filters.region && filters.region !== 'All Regions') {
      result = result.filter(item => item.region === filters.region);
    }
    
    if (filters.transportModes) {
      // Filter by selected transport modes
      // Implementation depends on data structure
    }
    
    setFilteredData(result);
  }, [data, filters]);
  
  return filteredData;
}

// Custom hook for chart animations
export function useChartAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };
  
  return {
    isAnimating,
    triggerAnimation
  };
}

// Custom hook for tooltip handling
export function useTooltip() {
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  const showTooltip = (data, position) => {
    setTooltipData(data);
    setTooltipPosition(position);
  };
  
  const hideTooltip = () => {
    setTooltipData(null);
  };
  
  return {
    tooltipData,
    tooltipPosition,
    showTooltip,
    hideTooltip
  };
}
