"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveGeoMap } from '@nivo/geo';
import { YearSlider } from '@/components/interactive';

// Sample data for tourism trends visualization
const tourismTrendsData = [
  {
    id: "Global Tourism Arrivals",
    color: "#2563EB",
    data: [
      { x: "1995", y: 980 },
      { x: "1996", y: 1050 },
      { x: "1997", y: 1120 },
      { x: "1998", y: 1080 },
      { x: "1999", y: 1100 },
      { x: "2000", y: 1150 },
      { x: "2001", y: 1140 },
      { x: "2002", y: 1160 },
      { x: "2003", y: 1200 },
      { x: "2004", y: 1450 },
      { x: "2005", y: 1550 },
      { x: "2006", y: 1700 },
      { x: "2007", y: 1650 },
      { x: "2008", y: 1600 },
      { x: "2009", y: 1650 },
      { x: "2010", y: 1700 },
      { x: "2011", y: 1750 },
      { x: "2012", y: 1800 },
      { x: "2013", y: 1850 },
      { x: "2014", y: 1900 },
      { x: "2015", y: 1950 },
      { x: "2016", y: 2000 },
      { x: "2017", y: 2100 },
      { x: "2018", y: 2200 },
      { x: "2019", y: 2300 },
      { x: "2020", y: 700 },
      { x: "2021", y: 800 },
      { x: "2022", y: 1100 },
    ]
  }
]

export default function TourismTrends() {
  const [selectedYear, setSelectedYear] = useState("2019");
  const [tableauLoaded, setTableauLoaded] = useState(false);
  
  // Load Tableau visualization
  useEffect(() => {
    // Load Tableau JavaScript API
    const script = document.createElement('script');
    script.src = 'https://public.tableau.com/javascripts/api/tableau-2.min.js';
    script.async = true;
    script.onload = initTableau;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  // Initialize Tableau visualization
  const initTableau = () => {
    if (window.tableau && document.getElementById('tableauViz')) {
      const vizUrl = 'https://public.tableau.com/views/DATASCI209TouristArrivalsWorldMapv1/InternationalArrivalsin-2019';
      const options = {
        hideTabs: true,
        hideToolbar: true,
        width: '100%',
        height: '600px'
      };
      
      try {
        new window.tableau.Viz(document.getElementById('tableauViz'), vizUrl, options);
        setTableauLoaded(true);
      } catch (error) {
        console.error('Error initializing Tableau visualization:', error);
      }
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">Global Tourism Insights</Link>
            <nav className="flex gap-6">
              <Link href="/tourism-trends" className="font-semibold underline">Tourism Trends</Link>
              <Link href="/direct-flights" className="font-semibold">Direct Flights Impact</Link>
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
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Tourism Trends Over the Past Decade</h1>
            <p className="text-xl text-gray-700">
              Explore how global tourism has evolved from 1995 to 2022, including the significant impact of COVID-19.
            </p>
          </div>
        </section>

        {/* Tourism Arrivals Line Chart */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Global Tourism Arrivals (1995-2022)</h2>
              
              {/* Static Chart Image for Better Visibility */}
              <div className="mb-6">
                <div className="relative h-[400px] w-full">
                  <Image 
                    src="/images/charts/arrivals_by_year.jpg"
                    alt="Tourism Arrivals by Year"
                    fill
                    style={{objectFit: 'contain'}}
                  />
                </div>
              </div>
              
              {/* Interactive Chart with Enhanced Visibility */}
              <div className="h-[500px] bg-white border border-gray-200 rounded-lg">
                <ResponsiveLine
                  data={tourismTrendsData}
                  margin={{ top: 50, right: 110, bottom: 80, left: 80 }}
                  xScale={{ type: 'point' }}
                  yScale={{
                    type: 'linear',
                    min: 0,
                    max: 2500,
                    stacked: false,
                  }}
                  curve="monotoneX"
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -45,
                    legend: 'Year',
                    legendOffset: 60,
                    legendPosition: 'middle',
                    tickTextColor: '#374151',
                    legendTextColor: '#374151'
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Arrivals (thousands)',
                    legendOffset: -60,
                    legendPosition: 'middle',
                    tickTextColor: '#374151',
                    legendTextColor: '#374151'
                  }}
                  colors={['#2563EB']}
                  lineWidth={4}
                  pointSize={12}
                  pointColor={{ theme: 'background' }}
                  pointBorderWidth={3}
                  pointBorderColor={{ from: 'serieColor' }}
                  pointLabelYOffset={-12}
                  enableArea={true}
                  areaOpacity={0.15}
                  useMesh={true}
                  legends={[
                    {
                      anchor: 'bottom-right',
                      direction: 'column',
                      justify: false,
                      translateX: 100,
                      translateY: 0,
                      itemsSpacing: 0,
                      itemDirection: 'left-to-right',
                      itemWidth: 80,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: 'circle',
                      symbolBorderColor: 'rgba(0, 0, 0, .5)',
                      itemTextColor: '#374151',
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                          }
                        }
                      ]
                    }
                  ]}
                  theme={{
                    axis: {
                      ticks: {
                        text: {
                          fill: '#374151',
                          fontSize: 14,
                          fontWeight: 600
                        }
                      },
                      legend: {
                        text: {
                          fill: '#1F2937',
                          fontSize: 16,
                          fontWeight: 600
                        }
                      }
                    },
                    grid: {
                      line: {
                        stroke: '#E5E7EB',
                        strokeWidth: 1
                      }
                    },
                    crosshair: {
                      line: {
                        stroke: '#2563EB',
                        strokeWidth: 2,
                        strokeOpacity: 0.7
                      }
                    },
                    tooltip: {
                      container: {
                        background: '#FFFFFF',
                        color: '#1F2937',
                        fontSize: 14,
                        fontWeight: 500,
                        borderRadius: 8,
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        padding: '12px 16px'
                      }
                    }
                  }}
                  annotations={[
                    {
                      type: 'point',
                      x: '2020',
                      y: 700,
                      note: 'COVID-19 Impact',
                      noteX: 10,
                      noteY: -25,
                      noteTextOffset: -10,
                      noteWidth: 120,
                    }
                  ]}
                />
              </div>
              <div className="mt-6 text-gray-700">
                <p className="text-lg">This chart shows the global tourism arrivals from 1995 to 2022. Note the significant drop in 2020 due to the COVID-19 pandemic, followed by a gradual recovery in subsequent years.</p>
                <p className="mt-2 text-lg">The data reveals a consistent growth trend from 1995 until 2019, when international arrivals reached their peak before the pandemic caused an unprecedented decline.</p>
              </div>
            </div>
          </div>
        </section>

        {/* International Arrivals Map - Tableau Integration */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">International Arrivals Map</h2>
              
              {/* Static Map Image for Immediate Visibility */}
              <div className="mb-6">
                <div className="relative h-[400px] w-full">
                  <Image 
                    src="/images/charts/arrivals_map_2019.jpg"
                    alt="International Arrivals Map 2019"
                    fill
                    style={{objectFit: 'contain'}}
                  />
                </div>
              </div>
              
              {/* Tableau Visualization Container */}
              <div id="tableauViz" className="w-full h-[600px] bg-white border border-gray-200 rounded-lg">
                {!tableauLoaded && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                      <p className="text-gray-600">Loading interactive map...</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 text-gray-700">
                <p className="text-lg">This interactive map shows international tourism arrivals by country. Countries with darker blue colors received more international visitors.</p>
                <p className="mt-2 text-lg">You can interact with the map by hovering over countries to see detailed visitor numbers, zooming in/out, and using the filters to explore different views of the data.</p>
                <p className="mt-2 text-lg">Data source: <a href="https://public.tableau.com/app/profile/beatrice.filart/viz/shared/P94Q4RTHB" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Tableau Public</a></p>
              </div>
            </div>
          </div>
        </section>

        {/* Destination Showcase */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Popular Tourism Destinations</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <div className="relative h-64">
                  <Image 
                    src="/images/destinations/coastal_waterfall.jpg"
                    alt="Coastal Waterfall"
                    fill
                    style={{objectFit: 'cover'}}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Coastal Escapes</h3>
                  <p className="text-gray-700">
                    Breathtaking coastal landscapes with pristine beaches and dramatic cliffs continue to be among the most sought-after tourism destinations worldwide.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <div className="relative h-64">
                  <Image 
                    src="/images/destinations/desert_camels.jpg"
                    alt="Desert Camels"
                    fill
                    style={{objectFit: 'cover'}}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Desert Adventures</h3>
                  <p className="text-gray-700">
                    Desert tourism has seen significant growth as travelers seek unique landscapes and cultural experiences in regions like North Africa and the Middle East.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <div className="relative h-64">
                  <Image 
                    src="/images/destinations/mountain_roadtrip.jpg"
                    alt="Mountain Road Trip"
                    fill
                    style={{objectFit: 'cover'}}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Road Trip Journeys</h3>
                  <p className="text-gray-700">
                    Road trips through scenic landscapes have gained popularity, especially following the pandemic as travelers seek more independent and flexible travel options.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Insights */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Key Insights</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Long-term Growth Trend</h3>
                <p className="text-gray-700 text-lg">
                  Global tourism showed consistent growth from 1995 to 2019, with international arrivals more than doubling during this period. This reflects increasing global mobility, rising middle classes in developing countries, and the growing importance of tourism to the global economy.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800">COVID-19 Impact</h3>
                <p className="text-gray-700 text-lg">
                  The COVID-19 pandemic caused an unprecedented drop in global tourism in 2020, with arrivals falling by approximately 70% compared to 2019. This represents the largest disruption to global tourism in modern history, far exceeding previous crises like the 2008 financial crisis or the SARS outbreak.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Recovery Patterns</h3>
                <p className="text-gray-700 text-lg">
                  The data shows a gradual recovery beginning in 2021 and continuing into 2022, though arrivals remained well below pre-pandemic levels. The recovery has been uneven across regions, with some destinations recovering faster than others based on factors like vaccination rates and travel restrictions.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Regional Variations</h3>
                <p className="text-gray-700 text-lg">
                  The map visualization reveals significant regional variations in tourism arrivals. Europe and parts of Asia consistently receive the highest number of international visitors, while many regions in Africa and parts of South America receive fewer international tourists despite having significant tourism potential.
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
