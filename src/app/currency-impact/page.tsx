"use client"

import { useState } from 'react';
import { ResponsiveGeoMap } from '@nivo/geo'
import { ResponsiveLine } from '@nivo/line'
import Link from 'next/link'
import Image from 'next/image'
import ViewHtml from '@/hooks/inject-html';

export default function CurrencyImpact() {
  const [selectedYear, setSelectedYear] = useState("2019")
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">Global Tourism Insights</Link>
            <nav className="flex gap-6">
              <Link href="/tourism-trends" className="font-semibold">Tourism Trends</Link>
              <Link href="/direct-flights" className="font-semibold">Direct Flights Impact</Link>
              <Link href="/currency-impact" className="font-semibold underline">Currency Strength Impact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Section Header */}
        <section className="bg-blue-50 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Currency Strength Impact on Travel</h1>
            <p className="text-xl text-gray-700">
              Analyze how currency fluctuations affect tourism patterns and visitor numbers around the world.
            </p>
          </div>
        </section>

        {/* Filters Panel */}
        <section className="py-6 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-6 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year:</label>
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
                >
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Side-by-Side Maps */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">World View of Currency and Visitors</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Visitor Percent Change</h3>
                  <div className="h-[400px] relative bg-white border border-gray-200 rounded-lg p-4">
                    <Image 
                      src="/images/slide_18_image_2.png"
                      alt="Visitor Percent Change"
                      fill
                      style={{objectFit: 'contain'}}
                    />
                    <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                        <span className="text-gray-800 font-medium">More visitors than previous year</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                        <span className="text-gray-800 font-medium">Less visitors than previous year</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Currency Percent Change</h3>
                  <div className="h-[400px] relative bg-white border border-gray-200 rounded-lg p-4">
                    <Image 
                      src="/images/slide_18_image_1.png"
                      alt="Currency Percent Change"
                      fill
                      style={{objectFit: 'contain'}}
                    />
                    <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                        <span className="text-gray-800 font-medium">USD strengthened vs currency</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                        <span className="text-gray-800 font-medium">USD weakened vs currency</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-gray-700">
                <p className="text-lg">These maps show the relationship between currency strength changes and visitor numbers. The left map shows changes in visitor numbers compared to the previous year, while the right map shows currency percent changes relative to the USD.</p>
                <p className="mt-2 text-lg">When comparing these maps, you can observe patterns that suggest how currency strength may influence tourism decisions. For example, many European countries experienced both a strengthening USD (making travel cheaper for Americans) and an increase in visitors.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Currency-Tourism Correlation */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Currency-Tourism Correlation</h2>
              <iframe
                  src="/currency_scatterplot.html"
                  width="100%"
                  height="600px"
                  style={{ border: 'none' }}
              />
              <div className="mt-4 text-gray-700">
                <p className="text-lg">This visualization represents the correlation between currency strength and tourism. Each point in the analysis represents a country, with the y-axis showing the tourism percent change from the previous year and the x-axis showing the currency percent change compared to the USD.</p>
                <p className="mt-2 text-lg">A positive correlation (0.42) suggests that as a country's currency weakens against the USD (making it cheaper for American tourists), tourism tends to increase. However, the relationship is complex and varies by region and other factors.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Destination Showcase */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Destinations Affected by Currency Fluctuations</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <div className="relative h-64">
                  <Image 
                    src="/images/destinations/coastal_waterfall.jpg"
                    alt="Coastal Destination"
                    fill
                    style={{objectFit: 'cover'}}
                  />
                  <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-bl-lg font-semibold">
                    +15% Visitors
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Iceland</h3>
                  <p className="text-gray-700">
                    Iceland saw increased tourism following currency weakening, making its stunning natural attractions more affordable for international visitors.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <div className="relative h-64">
                  <Image 
                    src="/images/destinations/snow_mountains.jpg"
                    alt="Mountain Destination"
                    fill
                    style={{objectFit: 'cover'}}
                  />
                  <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-bl-lg font-semibold">
                    +23% Visitors
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Japan</h3>
                  <p className="text-gray-700">
                    Japan experienced a tourism boom as the yen weakened against major currencies, making it a more affordable destination for international travelers.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <div className="relative h-64">
                  <Image 
                    src="/images/destinations/mountain_roadtrip.jpg"
                    alt="Road Trip Destination"
                    fill
                    style={{objectFit: 'cover'}}
                  />
                  <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg font-semibold">
                    -8% Visitors
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Chile</h3>
                  <p className="text-gray-700">
                    Despite currency weakening, Chile saw decreased tourism, suggesting that factors beyond affordability (such as political stability) influence travel decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Competing Hypotheses */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Exploring the Impact of Currency on Tourism</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Weaker Currency Attracts More Visitors</h3>
                </div>
                <p className="text-gray-700 text-lg">
                  When a currency loses value, foreigners have more purchasing power in that country, making it a more affordable destination. This increased affordability may attract more tourists looking to maximize their travel budget.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <span className="text-red-600 font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Weaker Currency Indicates Instability</h3>
                </div>
                <p className="text-gray-700 text-lg">
                  A weakening currency might signal economic or political instability in a country, which could discourage potential visitors concerned about safety, infrastructure, or service quality. This would lead to a decrease in tourism despite the better exchange rates.
                </p>
              </div>
            </div>
            
            <div className="mt-8 bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Analysis Findings</h3>
              <p className="text-gray-700 text-lg mb-4">
                The data presents evidence supporting both hypotheses, suggesting that the relationship between currency strength and tourism is complex and influenced by multiple factors:
              </p>
              <ul className="space-y-3 text-gray-700 text-lg">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-blue-600 font-bold">✓</span>
                  </div>
                  <span>Many European countries saw increased tourism when the USD strengthened against their currencies, supporting Hypothesis 1.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-blue-600 font-bold">✓</span>
                  </div>
                  <span>However, countries like Russia, Brazil, Chile, and Somalia saw decreases in visitors despite the USD rising in comparative strength against their currencies, supporting Hypothesis 2.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-blue-600 font-bold">✓</span>
                  </div>
                  <span>The correlation appears to be stronger in regions with established tourism infrastructure and political stability.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-blue-600 font-bold">✓</span>
                  </div>
                  <span>Other factors such as visa policies, marketing efforts, and global events also significantly influence tourism patterns.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Insights */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Key Insights</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Regional Variations</h3>
                <p className="text-gray-700 text-lg">
                  The impact of currency strength on tourism varies significantly by region. Established tourism destinations in stable economies tend to benefit more from currency weakening, while developing destinations may be more negatively affected by the perception of instability.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Multiple Influencing Factors</h3>
                <p className="text-gray-700 text-lg">
                  Currency strength is just one of many factors affecting tourism decisions. Safety perceptions, visa requirements, direct flight availability, and destination marketing all play significant roles in determining tourism patterns.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Implications for Tourism Boards</h3>
                <p className="text-gray-700 text-lg">
                  Tourism boards in countries experiencing currency weakening can potentially capitalize on increased affordability by targeting marketing efforts toward countries with stronger currencies. However, they must also address any perceptions of instability.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Opportunities for Travelers</h3>
                <p className="text-gray-700 text-lg">
                  For travelers, understanding currency trends can help identify destinations where their money will go further. Countries with recently weakened currencies but stable tourism infrastructure may offer particularly good value.
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
