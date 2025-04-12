"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const destinations = [
    {
      image: "/images/destinations/coastal_waterfall.jpg",
      title: "Coastal Escapes",
      description: "Discover breathtaking coastal landscapes with pristine beaches and dramatic cliffs."
    },
    {
      image: "/images/destinations/desert_camels.jpg",
      title: "Desert Adventures",
      description: "Experience the magic of desert landscapes with stunning dunes and unique wildlife."
    },
    {
      image: "/images/destinations/green_mountains.jpg",
      title: "Mountain Retreats",
      description: "Explore lush green mountains with winding rivers and peaceful valleys."
    },
    {
      image: "/images/destinations/snow_mountains.jpg",
      title: "Alpine Wonders",
      description: "Witness the majesty of snow-capped mountain ranges and breathtaking vistas."
    },
    {
      image: "/images/destinations/mountain_roadtrip.jpg",
      title: "Road Trip Journeys",
      description: "Embark on unforgettable road trips through dramatic mountain landscapes."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">Global Tourism Insights</Link>
            <nav className="flex gap-6">
              <Link href="/tourism-trends" className="font-semibold">Tourism Overview</Link>
              <Link href="/direct-flights" className="font-semibold">Direct Flights Impact</Link>
              <Link href="/currency-impact" className="font-semibold">Currency Strength Impact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Carousel */}
      <section className="relative h-[500px] overflow-hidden">
        {destinations.map((destination, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative h-full w-full">
              <Image 
                src={destination.image}
                alt={destination.title}
                fill
                style={{objectFit: 'cover'}}
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{destination.title}</h1>
                    <p className="text-xl md:text-2xl">{destination.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {destinations.map((_, index) => (
            <button 
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === activeSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Introduction */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Explore Global Tourism Insights</h2>
              <p className="text-xl text-gray-700 mb-8">
                Discover how tourism patterns have evolved over the past decades, the impact of direct flights on visitor numbers, and how currency fluctuations affect travel decisions around the world.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/tourism-trends" 
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Explore Tourism Trends
                </Link>
                <Link 
                  href="/direct-flights" 
                  className="px-6 py-3 bg-blue-100 text-blue-800 font-semibold rounded-lg hover:bg-blue-200 transition"
                >
                  Analyze Flight Impact
                </Link>
                <Link 
                  href="/currency-impact" 
                  className="px-6 py-3 bg-blue-100 text-blue-800 font-semibold rounded-lg hover:bg-blue-200 transition"
                >
                  Study Currency Effects
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Insights */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Featured Insights</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative h-64">
                  <Image 
                    src="/images/charts/arrivals_by_year.jpg"
                    alt="Tourism Arrivals by Year"
                    fill
                    style={{objectFit: 'cover'}}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Global Tourism Overview (1994-2022)</h3>
                  <p className="text-gray-700 mb-4">
                    Explore how global tourism has evolved over nearly three decades, including the dramatic impact of the COVID-19 pandemic and the ongoing recovery.
                  </p>
                  <Link 
                    href="/tourism-trends" 
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Explore the data →
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative h-64">
                  <Image 
                    src="/images/charts/arrivals_map_2019.jpg"
                    alt="International Arrivals Map"
                    fill
                    style={{objectFit: 'cover'}}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">International Arrivals Distribution</h3>
                  <p className="text-gray-700 mb-4">
                    Visualize how international tourism is distributed globally, with interactive maps showing visitor numbers by country and region.
                  </p>
                  <Link 
                    href="/tourism-trends" 
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Explore the map →
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-bold mb-3 text-gray-800">Direct Flight Impact</h3>
                <p className="text-gray-700 mb-4">
                  Countries with higher growth in direct flight connections tend to experience greater increases in tourism arrivals, suggesting that expanding air connectivity can boost tourism.
                </p>
                <Link 
                  href="/direct-flights" 
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Learn more →
                </Link>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-bold mb-3 text-gray-800">COVID-19 Recovery</h3>
                <p className="text-gray-700 mb-4">
                  The data shows a gradual recovery beginning in 2021 and continuing into 2022, though arrivals remained well below pre-pandemic levels with significant regional variations.
                </p>
                <Link 
                  href="/tourism-trends" 
                  className="text-blue-600 font-semibold hover:underline"
                >
                  See recovery patterns →
                </Link>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-bold mb-3 text-gray-800">Currency Strength Effects</h3>
                <p className="text-gray-700 mb-4">
                  The relationship between currency strength and tourism is complex. While weaker currencies can attract visitors seeking value, they may also signal economic instability.
                </p>
                <Link 
                  href="/currency-impact" 
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Analyze currency impact →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Explore Global Tourism Data?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Dive into our interactive visualizations to understand tourism trends, flight impacts, and currency effects on global travel patterns.
            </p>
            <Link 
              href="/tourism-trends" 
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition inline-block"
            >
              Start Exploring Now
            </Link>
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
              <Link href="/tourism-trends" className="hover:underline">Tourism Overview</Link>
              <Link href="/direct-flights" className="hover:underline">Direct Flights Impact</Link>
              <Link href="/currency-impact" className="hover:underline">Currency Strength Impact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
