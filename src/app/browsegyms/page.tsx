'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image"; 
import { Search, MapPin, Clock, Star, Dumbbell, ArrowRight, Phone } from "lucide-react";
import Header from "@/components/Header";

// NOTE: You must uncomment and ensure these imports point to your actual components/data.
// Example placeholders are used below if your components are not available.
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import CallbackForm from "@/components/CallbackForm";
// import Breadcrumb from "@/components/Breadcrumb";
// import OptimizedImage from "@/components/OptimizedImage";

// --- Mock Data and SEO Hook (Ensure these exist in your project) ---
import { getActiveGymsAndClubs, type GymClub } from "@/data/gymsAndClubs"; // Mocked
import { useSEO } from "@/hooks/useSEO"; // Mocked

// --- TYPE DEFINITIONS ---
interface GymClubWithDistance extends GymClub {
  distance?: number | null;
}
// ------------------------

const DiscoverGym = () => {
  // SEO (Using hook, but Next.js metadata is preferred in App Router)
  useSEO({
    title: "Discover Premium Gyms & Wellness Clubs | Fitflix",
    description: "Find the best gyms and wellness clubs in Bangalore and Hyderabad including Marathahalli, Electronic City, Brookefield, and Sainikpuri. Premium fitness centers with modern equipment, personal training, and advanced wellness therapies.",
    keywords: "gyms Bangalore, wellness clubs, fitness centers, Marathahalli gym, Electronic City gym, Brookefield gym, Sainikpuri wellness, personal training, group classes, cryotherapy, DNA testing, premium fitness",
    ogTitle: "Discover Premium Gyms & Wellness Clubs | Fitflix",
    ogDescription: "Find the best gyms and wellness clubs with state-of-the-art equipment, personal training, and advanced wellness therapies.",
    canonical: "https://fitflix.in/discover-gym"
  });

  const router = useRouter(); 
  
  const [searchQuery, setSearchQuery] = useState("");
  const [callbackFormOpen, setCallbackFormOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'gym' | 'wellness-club'>('all');

  const [gymsAndClubs] = useState<GymClubWithDistance[]>(getActiveGymsAndClubs());
  const [loading] = useState(false); 
  const [error] = useState(""); 

  useEffect(() => {
    const getCookie = (name: string): string | null => {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    };

    const savedLocation = getCookie('userLocation');
    if (savedLocation) {
      try {
        const location = JSON.parse(savedLocation);
        setUserLocation(location);
      } catch (error) {
        console.error('Error parsing saved location:', error);
      }
    }
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  };

  const filteredItems = gymsAndClubs
    .filter(item => {
      if (filterType !== 'all' && item.type !== filterType) return false;
      const searchLower = searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(searchLower) ||
             item.address.toLowerCase().includes(searchLower);
    })
    .map(item => ({
      ...item,
      distance: userLocation 
        ? calculateDistance(
            userLocation.lat, 
            userLocation.lng, 
            parseFloat(item.latitude), 
            parseFloat(item.longitude)
          )
        : null
    }))
    .sort((a, b) => {
      if (userLocation && a.distance !== null && b.distance !== null) {
        return a.distance - b.distance;
      }
      if (a.rating && b.rating) {
        return b.rating - a.rating;
      }
      return 0;
    });

  const handleViewDetails = (item: GymClubWithDistance) => {
    if (item.type === 'wellness-club') {
      router.push(`/wellness-club/${item.id}`);
    } else {
      router.push(`/gym/${item.id}`);
    }
  };

  return (
    <div className="min-h-screen pt-16" style={{ background: 'var(--black)', color: 'var(--white)' }}>
      <Header />
      <div className="container mx-auto px-4 py-8">
        
        {/* Breadcrumb (Placeholder for your Breadcrumb component) */}
        <p className="text-sm text-muted-foreground mb-4" style={{ color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--gold)' }}>Home</Link> / <span className="font-semibold">Discover Facilities</span>
        </p>
        
        {/* Header */}
        <div className="relative text-center mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-orange/20 to-gold/20 rounded-2xl overflow-hidden opacity-30">
            <img 
              src="/src/assets/hero-fitness.jpg"
              alt="Fitness background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 py-12 px-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white drop-shadow-lg">
              Discover Your <span style={{ color: 'var(--gold)' }}>Perfect</span>{" "}
              <span style={{ color: 'var(--orange)' }}>Gym & Wellness Club</span>
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto px-4 drop-shadow-md">
              Find the best fitness centers and wellness clubs with premium facilities, advanced therapies, and personalized programs
            </p>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" style={{ color: 'var(--muted)' }}/>
            {/* Input (Placeholder) - Replace with your <Input /> component */}
            <input
              type="text"
              placeholder="Search gyms and wellness clubs by name, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full p-3 border rounded-lg bg-[#111] text-white border-white/10 focus:border-gold" 
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Select (Placeholder) - Replace with your <Select /> component */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'gym' | 'wellness-club')}
              className="w-full sm:w-[200px] p-3 border rounded-lg bg-[#111] text-white border-white/10 focus:border-gold"
            >
              <option value="all">All Facilities</option>
              <option value="gym">Gyms Only</option>
              <option value="wellness-club">Wellness Clubs Only</option>
            </select>
          </div>
        </div>
        
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground" style={{ color: 'var(--muted)' }}>
              <span className="font-semibold" style={{ color: 'var(--gold)' }}>{filteredItems.length}</span> {filterType === 'gym' ? 'gyms' : filterType === 'wellness-club' ? 'wellness clubs' : 'facilities'} found
            </p>
            {userLocation && (
              <p className="text-xs text-muted-foreground" style={{ color: 'var(--muted)' }}>
                Sorted by distance from your location
              </p>
            )}
          </div>
        </div>

        {/* Enhanced Cards with Better Internal Linking */}
        <div className="grid lg:grid-cols-1 gap-6">
          {filteredItems.map((item) => (
            // Card (Placeholder) - Replace with your <Card /> component
            <div key={item.id} className="group transition-all duration-300 p-6 rounded-xl border border-white/10 hover:border-gold/50" style={{ background: '#111' }}>
              <div className="grid lg:grid-cols-3 gap-6 items-stretch">
                
                {/* Image */}
                <div className="lg:col-span-1">
                  <div className="relative h-full min-h-[200px] rounded-lg overflow-hidden bg-gray-900">
                    <img 
                      src={item.id === 1 ? "https://lh3.googleusercontent.com/p/AF1QipOx2pRaqdWCA4GzBMHvm_viNbAvGSZ6qEPpTpxF=w203-h152-k-no" : item.id === 2 ? "/media/1714407900720.jpeg" : item.id === 3 ? "https://lh3.googleusercontent.com/p/AF1QipPhE2xLhB1-TR_c9bpJCRKVDhum7mQvFY10iZRo=w203-h138-k-no" : "/src/assets/hero-fitness.jpg"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Badges (Placeholders) - Replace with your <Badge /> component */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <span className="text-xs p-1 px-2 rounded-full font-semibold" style={{ background: 'var(--gold)', color: 'var(--black)' }}>
                            {item.verified ? 'Verified' : 'Unverified'}
                        </span>
                        <span className="text-xs p-1 px-2 rounded-full font-semibold border" style={{ background: 'rgba(0,0,0,0.5)', color: 'var(--white)', borderColor: 'var(--white)' }}>
                            {item.type === 'wellness-club' ? '✨ Wellness Club' : '💪 Gym'}
                        </span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors" style={{ color: 'var(--white)' }}>
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3" style={{ color: 'var(--muted)' }}>
                        <MapPin className="h-4 w-4" />
                        <span>{item.address.split(',')[0]}, {item.address.split(',')[1]}</span>
                        {item.distance !== null && item.distance !== undefined && (
                          <span className="font-medium" style={{ color: 'var(--gold)' }}>
                            • {item.distance.toFixed(1)} km away
                          </span>
                        )}
                      </div>
                    </div>
                    {item.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{item.rating}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-muted-foreground leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {item.description}
                  </p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2">
                    {item.amenities.slice(0, 5).map((amenity, index) => (
                      <span key={index} className="text-xs p-1 px-2 rounded-full border" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
                        {amenity}
                      </span>
                    ))}
                    {item.amenities.length > 5 && (
                      <span className="text-xs p-1 px-2 rounded-full border" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
                        +{item.amenities.length - 5} more
                      </span>
                    )}
                  </div>

                  {/* Hours */}
                  {item.opening_time && item.closing_time && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground" style={{ color: 'var(--muted)' }}>
                      <Clock className="h-4 w-4" />
                      <span>
                        {new Date(item.opening_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                        {' - '}
                        {new Date(item.closing_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    {/* Button 1 (Placeholder) - Replace with your <Button /> component */}
                    <button 
                      className="btn solid flex-1 sm:flex-none flex items-center justify-center p-3 rounded-lg"
                      style={{ background: 'var(--orange)', color: 'var(--white)', fontWeight: '800' }}
                      onClick={() => handleViewDetails(item)}
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                    {/* Button 2 (Placeholder) - Replace with your <Button /> component */}
                    <button 
                      className="btn outline flex-1 sm:flex-none flex items-center justify-center p-3 rounded-lg"
                      style={{ background: 'transparent', border: '2px solid var(--gold)', color: 'var(--white)', fontWeight: '800' }}
                      onClick={() => setCallbackFormOpen(true)}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      {item.type === 'wellness-club' ? 'Contact Us' : 'Get Callback'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Related Content Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--white)' }}>
              Explore the Complete Fitflix Experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" style={{ color: 'var(--muted)' }}>
              Beyond our premium gyms, discover our comprehensive fitness ecosystem
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-6 border rounded-lg hover:shadow-xl transition-all duration-300" style={{ background: '#111', borderColor: 'var(--white)/10' }}>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-transform" style={{ background: 'rgba(212,160,23,0.1)', color: 'var(--gold)' }}>
                  <Dumbbell className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--white)' }}>Premium Gyms</h3>
                <p className="text-muted-foreground" style={{ color: 'var(--muted)' }}>
                  State-of-the-art facilities with modern equipment and certified trainers
                </p>
                {/* Link (Placeholder) */}
                <Link href="/services" className="p-2 border rounded-lg block font-bold" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 inline-block" />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 border rounded-lg hover:shadow-xl transition-all duration-300" style={{ background: '#111', borderColor: 'var(--white)/10' }}>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-transform" style={{ background: 'rgba(212,160,23,0.1)', color: 'var(--gold)' }}>
                  <span className="w-8 h-8 rounded" style={{ background: 'var(--gold)' }}></span>
                </div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--white)' }}>Workout App</h3>
                <p className="text-muted-foreground" style={{ color: 'var(--muted)' }}>
                  1000+ minutes of professional training across 10 categories
                </p>
                <Link href="/services" className="p-2 border rounded-lg block font-bold" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
                  Coming Soon
                  <ArrowRight className="ml-2 h-4 w-4 inline-block" />
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 border rounded-lg hover:shadow-xl transition-all duration-300" style={{ background: '#111', borderColor: 'var(--white)/10' }}>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-transform" style={{ background: 'rgba(212,160,23,0.1)', color: 'var(--gold)' }}>
                  <span className="w-8 h-8 rounded" style={{ background: 'var(--gold)' }}></span>
                </div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--white)' }}>Nutrition Products</h3>
                <p className="text-muted-foreground" style={{ color: 'var(--muted)' }}>
                  Premium supplements for optimal performance and recovery
                </p>
                <Link href="/services" className="p-2 border rounded-lg block font-bold" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 inline-block" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Callback Form (Hidden/Modal Logic) */}
        {/* Replace this placeholder with your actual <CallbackForm /> component */}
        {callbackFormOpen && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: '#0b0b0b', padding: '30px', borderRadius: '10px', maxWidth: '400px', width: '90%', border: '1px solid var(--gold)' }}>
                    <h4 className="font-bold text-white text-xl mb-3">Get a Callback</h4>
                    <p className="text-sm text-gray-400 mb-4">Please provide your details, and one of our specialists will call you shortly.</p>
                    {/* Your CallbackForm content goes here */}
                    <button onClick={() => setCallbackFormOpen(false)} className="mt-4 p-2 w-full rounded-lg text-white font-bold" style={{ background: 'var(--orange)' }}>Close</button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverGym;