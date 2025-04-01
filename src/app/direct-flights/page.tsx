"use client"

import { useState } from 'react';
import { useYearSelection, useRegionSelection } from '@/hooks/useInteractiveElements';
import { YearSlider, FilterPanel, Tooltip } from '@/components/interactive';
import InteractiveDashboard from '@/components/dashboard/InteractiveDashboard';
import Link from 'next/link';
import Image from 'next/image';

export default function DirectFlightsPage() {
  const { selectedYear, setSelectedYear, availableYears } = useYearSelection('2019');
  const { selectedRegion, setSelectedRegion, availableRegions } = useRegionSelection();
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">Global Tourism Insights</Link>
            <nav className="flex gap-6">
              <Link href="/tourism-trends" className="font-semibold">Tourism Trends</Link>
              <Link href="/direct-flights" className="font-semibold underline">Direct Flights Impact</Link>
              <Link href="/currency-impact" className="font-semibold">Currency Strength Impact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Section Header */}
        <section className="bg-blue-50 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Direct Flights Influence on Tourism</h1>
            <p className="text-xl text-gray-700">
              Discover how the availability of direct flights correlates with tourism growth across different regions.
            </p>
          </div>
        </section>

        {/* Filters Panel */}
        <section className="py-6 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-6 items-end">
              <div className="w-full max-w-xs">
                <label className="block text-sm font-medium text-gray-700 mb-2">Year:</label>
                <YearSlider 
                  years={availableYears}
                  selectedYear={selectedYear}
                  onChange={setSelectedYear}
                />
              </div>
              
              <div className="w-full max-w-xs">
                <label className="block text-sm font-medium text-gray-700 mb-2">Region:</label>
                <select 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
                >
                  {availableRegions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Tourism Growth Map */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Tourism Growth Map ({selectedYear})</h2>
              <div className="h-[500px] relative bg-white border border-gray-200 rounded-lg p-4">
                <Image 
                  src="/images/slide_11_image_1.png"
                  alt="Tourism Growth Map"
                  fill
                  style={{objectFit: 'contain'}}
                  priority
                />
                <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                    <span className="text-gray-800 font-medium">High flight growth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-400 rounded-sm"></div>
                    <span className="text-gray-800 font-medium">Low flight growth</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-gray-700">
                <p className="text-lg">This map shows countries with high vs. low direct flight increases. Countries in blue have experienced significant growth in direct flight connections, while countries in orange have seen more modest growth.</p>
                <p className="mt-2 text-lg">The data is filtered to show information for {selectedYear} in the {selectedRegion} region.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Dashboard */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Tourism by Transport Mode ({selectedYear})</h2>
              <div className="h-[400px] relative bg-white border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 h-full">
                  <div className="flex flex-col items-center justify-center bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="text-5xl font-bold text-blue-600 mb-2">68%</div>
                    <div className="text-xl font-semibold text-gray-800">Air Travel</div>
                    <div className="text-sm text-gray-600 mt-2">Primary mode for international tourism</div>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-green-50 rounded-lg p-4 border border-green-100">
                    <div className="text-5xl font-bold text-green-600 mb-2">24%</div>
                    <div className="text-xl font-semibold text-gray-800">Land Travel</div>
                    <div className="text-sm text-gray-600 mt-2">Road and rail transportation</div>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-cyan-50 rounded-lg p-4 border border-cyan-100">
                    <div className="text-5xl font-bold text-cyan-600 mb-2">8%</div>
                    <div className="text-xl font-semibold text-gray-800">Water Travel</div>
                    <div className="text-sm text-gray-600 mt-2">Cruise ships and ferries</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-gray-700">
                <p className="text-lg">This breakdown shows the distribution of international tourist arrivals by transport mode. Air travel dominates as the primary mode of transportation for international tourism, particularly for long-haul destinations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Flight Impact on Growth */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Flight Impact on Tourism Growth ({selectedYear})</h2>
              <div className="h-[500px] relative bg-white border border-gray-200 rounded-lg p-4">
                <Image 
                  src="/images/slide_13_image_1.png"
                  alt="Flight Impact on Tourism Growth"
                  fill
                  style={{objectFit: 'contain'}}
                />
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Correlation: 0.78</h3>
                  <p className="text-sm text-gray-600">Strong positive relationship</p>
                </div>
              </div>
              <div className="mt-4 text-gray-700">
                <p className="text-lg">This scatter plot shows the correlation between direct flights and tourism growth for {selectedYear}. Each point represents a country, with the x-axis showing the number of direct flights and the y-axis showing tourism growth rate.</p>
                <p className="mt-2 text-lg">The upward trend suggests that countries with more direct flights tend to experience higher tourism growth, particularly in the {selectedRegion} region.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Destination Showcase */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Destinations with Strong Flight Growth</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <div className="relative h-64">
                  <Image 
                    src="/images/destinations/desert_camels.jpg"
                    alt="Desert Tourism"
                    fill
                    style={{objectFit: 'cover'}}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Middle East</h3>
                  <p className="text-gray-700">
                    Countries like UAE and Qatar have seen significant tourism growth following major investments in airline hubs and direct flight connections.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <div className="relative h-64">
                  <Image 
                    src="/images/destinations/green_mountains.jpg"
                    alt="Mountain Tourism"
                    fill
                    style={{objectFit: 'cover'}}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Central Asia</h3>
                  <p className="text-gray-700">
                    Countries like Georgia and Kazakhstan have experienced tourism booms following the introduction of more direct flights from Europe and Asia.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <div className="relative h-64">
                  <Image 
                    src="/images/destinations/mountain_roadtrip.jpg"
                    alt="Road Trip Tourism"
                    fill
                    style={{objectFit: 'cover'}}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">South America</h3>
                  <p className="text-gray-700">
                    Countries like Colombia and Peru have seen tourism growth correlate with increased direct flight connections from North America and Europe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Insights */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Key Insights for {selectedYear}</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Direct Flight Correlation</h3>
                <p className="text-gray-700 text-lg">
                  Countries with higher growth in direct flight connections tend to experience greater increases in tourism arrivals. This suggests that expanding air connectivity can be an effective strategy for boosting tourism.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Transport Mode Impact</h3>
                <p className="text-gray-700 text-lg">
                  Air travel consistently accounts for the largest share of international tourist arrivals, highlighting the importance of aviation infrastructure for tourism development. However, land and water transport remain significant for certain regions.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Regional Variations</h3>
                <p className="text-gray-700 text-lg">
                  The impact of direct flights on tourism varies by region. Some regions show stronger correlations between flight connectivity and tourism growth, suggesting that other factors (such as visa policies, attractions, or marketing) may play more significant roles in certain areas.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Policy Implications</h3>
                <p className="text-gray-700 text-lg">
                  For tourism boards and policymakers, these findings suggest that investing in aviation infrastructure and attracting more direct flights could be an effective strategy for increasing tourism. Collaboration between tourism authorities and airlines may yield significant benefits.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>© 2025 Global Tourism Insights</p>
            </div>
            <div className="flex gap-8">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/tourism-trends" className="hover:underline">Tourism Trends</Link>
              <Link href="/direct-flights" className="hover:underline">Direct Flights Impact</Link>
              <Link href="/currency-impact" className="hover:underline">Currency Strength Impact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
