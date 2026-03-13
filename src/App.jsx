import React, { useState, useEffect } from 'react';
import { 
  MapPin, Calendar, Users, Star, Search, Menu, X, ChevronRight, Heart,
  ArrowRight, Compass, CheckCircle2, Clock, Shield, Phone, Mail, 
  Globe, Award, TrendingUp, Users2, Target, Send, Facebook, 
  Twitter, Instagram, Linkedin, ArrowUpRight, Play, Quote
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';

// Raw Mock Data
const TOURS_DATA = [
  {
    id: 1,
    title: "Santorini Sunset Cruise",
    location: "Santorini, Greece",
    price: 129,
    rating: 4.9,
    reviews: 128,
    duration: "5 hours",
    groupSize: "12 people",
    image: "https://kated.com/wp-content/uploads/2020/06/Grc25a-Santorini-sunset-at-dawn-village-of-Oia.jpg",
    category: "Cruise",
    description: "Experience the world-famous sunset of Santorini from the deck of a luxury catamaran.",
    highlights: ["Sunset viewing", "Greek dinner", "Open bar", "Hotel pickup"],
    featured: true
  },
  {
    id: 2,
    title: "Machu Picchu Trek",
    location: "Cusco, Peru",
    price: 899,
    rating: 4.8,
    reviews: 342,
    duration: "4 days",
    groupSize: "8 people",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
    category: "Adventure",
    description: "Trek the legendary Inca Trail to the lost city of Machu Picchu.",
    highlights: ["Inca Trail", "Camping gear", "Expert guides", "All meals"],
    featured: true
  },
  {
    id: 3,
    title: "Kyoto Temple Tour",
    location: "Kyoto, Japan",
    price: 89,
    rating: 4.7,
    reviews: 215,
    duration: "8 hours",
    groupSize: "6 people",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    category: "Cultural",
    description: "Discover ancient temples, zen gardens, and traditional tea ceremonies.",
    highlights: ["Tea ceremony", "Temple visits", "Local lunch", "Transport"],
    featured: false
  },
  {
    id: 4,
    title: "Safari Adventure",
    location: "Serengeti, Tanzania",
    price: 2450,
    rating: 5.0,
    reviews: 89,
    duration: "7 days",
    groupSize: "6 people",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    category: "Wildlife",
    description: "Witness the Great Migration and spot the Big Five in their natural habitat.",
    highlights: ["Game drives", "Luxury lodge", "All meals", "Park fees"],
    featured: true
  },
  {
    id: 5,
    title: "Northern Lights Hunt",
    location: "Reykjavik, Iceland",
    price: 199,
    rating: 4.6,
    reviews: 456,
    duration: "4 hours",
    groupSize: "15 people",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
    category: "Nature",
    description: "Chase the magical Aurora Borealis with expert guides and hot chocolate.",
    highlights: ["Aurora hunting", "Hot drinks", "Photos included", "Warm gear"],
    featured: false
  },
  {
    id: 6,
    title: "Amalfi Coast Drive",
    location: "Amalfi, Italy",
    price: 159,
    rating: 4.8,
    reviews: 178,
    duration: "6 hours",
    groupSize: "4 people",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
    category: "Scenic",
    description: "Drive the stunning coastline in a vintage convertible with local insights.",
    highlights: ["Vintage car", "Positano stop", "Lemon grove", "Lunch included"],
    featured: false
  },
  {
  id: 6,
  title: "Great Wall Hiking Tour",
  location: "Beijing, China",
  price: 159,
  rating: 4.6,
  reviews: 245,
  duration: "1 day",
  groupSize: "20 people",
  image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
  category: "Adventure",
  description: "Walk along the ancient stones of the Great Wall and enjoy panoramic views of the Chinese countryside.",
  highlights: ["Historic insights", "Local lunch", "Photography spots", "Comfortable transport"],
  featured: false
},
{
  id: 7,
  title: "Wine Tasting in Tuscany",
  location: "Florence, Italy",
  price: 139,
  rating: 4.8,
  reviews: 312,
  duration: "6 hours",
  groupSize: "14 people",
  image: "https://www.moretimetotravel.com/wp-content/uploads/2023/08/WineTasting-in-ITalyAdobeStock_85166009.jpeg",
  category: "Food & Drink",
  description: "Savor world-class wines and traditional Italian cuisine in the rolling hills of Tuscany.",
  highlights: ["Wine cellar tour", "Cheese pairing", "Scenic vineyards", "Expert sommelier"],
  featured: true
},
{
  id: 8,
  title: "Hot Air Balloon Ride",
  location: "Cappadocia, Turkey",
  price: 179,
  rating: 4.9,
  reviews: 402,
  duration: "3 hours",
  groupSize: "10 people",
  image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/13/e4/d0.jpg",
  category: "Adventure",
  description: "Float above the fairy chimneys of Cappadocia and witness a sunrise like no other.",
  highlights: ["Sunrise views", "Champagne toast", "Scenic landscapes", "Professional pilot"],
  featured: true
},
{
  id: 9,
  title: "Amazon Rainforest Expedition",
  location: "Manaus, Brazil",
  price: 349,
  rating: 4.7,
  reviews: 189,
  duration: "4 days",
  groupSize: "12 people",
  image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0d/97/e7/fd.jpg",
  category: "Nature",
  description: "Explore the biodiversity of the Amazon with guided jungle treks and river cruises.",
  highlights: ["Wildlife spotting", "Local tribes visit", "River canoeing", "Eco-lodges"],
  featured: false
},
{
  id: 10,
  title: "New York City Skyline Helicopter Tour",
  location: "New York, USA",
  price: 299,
  rating: 4.8,
  reviews: 520,
  duration: "45 minutes",
  groupSize: "5 people",
  image: "https://i.ytimg.com/vi/q1CctfCfVu8/maxresdefault.jpg",
  category: "City Tour",
  description: "Soar above Manhattan and take in breathtaking views of the Statue of Liberty and Empire State Building.",
  highlights: ["Aerial views", "Professional pilot", "Photo opportunities", "Safety briefing"],
  featured: true
}
];

const CATEGORIES = [
  { name: "All", icon: Compass },
  { name: "Adventure", icon: TrendingUp },
  { name: "Cruise", icon: MapPin },
  { name: "Cultural", icon: Globe },
  { name: "Wildlife", icon: Target },
  { name: "Nature", icon: Award },
];

const TEAM_MEMBERS = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    bio: "Former travel journalist with 15+ years exploring hidden gems worldwide."
  },
  {
    name: "Michael Chen",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "Logistics expert who ensures every tour runs like clockwork."
  },
  {
    name: "Elena Rodriguez",
    role: "Lead Guide",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    bio: "Certified mountain guide fluent in 5 languages."
  },
  {
    name: "James Wilson",
    role: "Customer Experience",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    bio: "Dedicated to making every journey unforgettable."
  }
];

const TESTIMONIALS = [
  {
    name: "Emily & David",
    location: "New York, USA",
    text: "The Santorini cruise was magical. Everything was perfectly organized, from pickup to dinner. We'll never forget that sunset!",
    rating: 5,
    tour: "Santorini Sunset Cruise"
  },
  {
    name: "Marcus Schmidt",
    location: "Berlin, Germany",
    text: "Machu Picchu trek exceeded all expectations. Our guide was incredibly knowledgeable and the camping setup was luxurious.",
    rating: 5,
    tour: "Machu Picchu Trek"
  },
  {
    name: "Yuki Tanaka",
    location: "Tokyo, Japan",
    text: "Kyoto tour was authentic and intimate. The tea ceremony was the highlight of our Japan trip.",
    rating: 5,
    tour: "Kyoto Temple Tour"
  }
];

// Components
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  const navBg = scrolled || !isHome ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent';
  const textColor = scrolled || !isHome ? 'text-gray-900' : 'text-white';
  const linkColor = scrolled || !isHome ? 'text-gray-700' : 'text-white/90';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className={`text-2xl font-bold ${textColor}`}>Wanderlust</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`font-medium hover:text-orange-500 transition-colors ${linkColor}`}>Home</Link>
            <Link to="/tours" className={`font-medium hover:text-orange-500 transition-colors ${linkColor}`}>Tours</Link>
            <Link to="/about" className={`font-medium hover:text-orange-500 transition-colors ${linkColor}`}>About</Link>
            <Link to="/contact" className={`font-medium hover:text-orange-500 transition-colors ${linkColor}`}>Contact</Link>
            <Link to="/tours" className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all">
              Book Now
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X className={textColor} /> : <Menu className={textColor} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-orange-50 rounded-lg">Home</Link>
            <Link to="/tours" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-orange-50 rounded-lg">Tours</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-orange-50 rounded-lg">About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-orange-50 rounded-lg">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const [searchData, setSearchData] = useState({ location: '', date: '', guests: '' });
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/tours');
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80" 
          alt="Travel" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in-up">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-sm font-medium">Trusted by 50,000+ travelers worldwide</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
          Discover Your Next <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
            Great Adventure
          </span>
        </h1>
        
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto animate-fade-in-up delay-100">
          Curated tours to the world's most breathtaking destinations. 
          Unforgettable experiences, expert guides, and memories that last a lifetime.
        </p>

        <div className="bg-white p-4 rounded-2xl shadow-2xl max-w-4xl mx-auto animate-fade-in-up delay-200">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <MapPin className="w-5 h-5 text-orange-500" />
              <div className="text-left">
                <p className="text-xs text-gray-500 font-medium">Location</p>
                <input 
                  type="text" 
                  placeholder="Where to?"
                  className="bg-transparent outline-none text-gray-900 font-medium w-full"
                  value={searchData.location}
                  onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <Calendar className="w-5 h-5 text-orange-500" />
              <div className="text-left">
                <p className="text-xs text-gray-500 font-medium">Date</p>
                <input 
                  type="date" 
                  className="bg-transparent outline-none text-gray-900 font-medium w-full"
                  value={searchData.date}
                  onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <Users className="w-5 h-5 text-orange-500" />
              <div className="text-left">
                <p className="text-xs text-gray-500 font-medium">Guests</p>
                <select 
                  className="bg-transparent outline-none text-gray-900 font-medium w-full"
                  value={searchData.guests}
                  onChange={(e) => setSearchData({...searchData, guests: e.target.value})}
                >
                  <option value="">Select</option>
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3-5">3-5 People</option>
                  <option value="6+">6+ People</option>
                </select>
              </div>
            </div>
            
            <button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-orange-500 to-pink-600 text-white p-4 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
};

const TourCard = ({ tour, onBook }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="relative h-64 overflow-hidden">
        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute top-4 right-4">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-800">
            {tour.category}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center text-white space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold">{tour.rating}</span>
            <span className="text-white/80">({tour.reviews} reviews)</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {tour.location}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
          {tour.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {tour.duration}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {tour.groupSize}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-gray-900">${tour.price}</span>
            <span className="text-gray-500 text-sm">/person</span>
          </div>
          <button 
            onClick={() => onBook(tour)}
            className="flex items-center space-x-1 bg-gray-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-orange-500 transition-colors"
          >
            <span>Book Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const BookingModal = ({ tour, isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', guests: 1, date: '', specialRequests: ''
  });

  if (!isOpen || !tour) return null;

  const totalPrice = tour.price * formData.guests;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      alert('Booking confirmed! Check your email for details.');
      onClose();
      setStep(1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">Book Your Tour</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${s <= step ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {s < step ? <CheckCircle2 className="w-6 h-6" /> : s}
                </div>
                {s < 3 && <div className={`w-20 h-1 ${s < step ? 'bg-orange-500' : 'bg-gray-200'}`} />}
              </React.Fragment>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-4 flex gap-4">
                <img src={tour.image} alt={tour.title} className="w-24 h-24 rounded-xl object-cover" />
                <div>
                  <h3 className="font-bold text-lg">{tour.title}</h3>
                  <p className="text-gray-500 text-sm">{tour.location}</p>
                  <p className="text-orange-600 font-bold mt-1">${tour.price}/person</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      required
                      type="email" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                      placeholder="yourname@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    placeholder="+91 556600-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all">
                  Continue
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                <input 
                  required
                  type="date" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                <div className="flex items-center space-x-4">
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, guests: Math.max(1, formData.guests - 1)})}
                    className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold w-12 text-center">{formData.guests}</span>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, guests: formData.guests + 1})}
                    className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests (Optional)</label>
                <textarea 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all h-32 resize-none"
                  placeholder="Any dietary requirements, accessibility needs, etc."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                />
              </div>

              <div className="bg-orange-50 rounded-xl p-4 flex justify-between items-center">
                <span className="font-medium text-gray-700">Total Price</span>
                <span className="text-2xl font-bold text-orange-600">${totalPrice}</span>
              </div>

              <div className="flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setStep(1)} 
                  className="flex-1 py-4 rounded-xl border border-gray-200 font-bold hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
                <button type="submit" className="flex-1 bg-gradient-to-r from-orange-500 to-pink-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all">
                  Review Booking
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Confirm?</h3>
                <p className="text-gray-600">Please review your booking details before confirming.</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Tour</span>
                  <span className="font-medium">{tour.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium">{formData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Guests</span>
                  <span className="font-medium">{formData.guests} people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Contact</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-orange-600">${totalPrice}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setStep(2)} 
                  className="flex-1 py-4 rounded-xl border border-gray-200 font-bold hover:bg-gray-50 transition-all"
                >
                  Edit
                </button>
                <button 
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-pink-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Confirm Booking
                </button>
              </div>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>Secure SSL Encryption</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// HOME PAGE
const HomePage = ({ onBook }) => {
  const featuredTours = TOURS_DATA.filter(tour => tour.featured);

  return (
    <>
      <Hero />
      
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-orange-500 font-bold tracking-wider uppercase text-sm">Featured</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Popular Destinations</h2>
            <p className="text-gray-600 mt-2">Hand-picked tours loved by our travelers</p>
          </div>
          <Link to="/tours" className="hidden md:flex items-center space-x-2 text-orange-600 font-bold hover:space-x-3 transition-all">
            <span>View All</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} onBook={onBook} />
          ))}
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Secure Booking", desc: "Your payment and personal data are protected with 256-bit encryption." },
              { icon: CheckCircle2, title: "Verified Tours", desc: "Every tour is personally vetted by our team for quality assurance." },
              { icon: Clock, title: "24/7 Support", desc: "Our travel experts are available around the clock to assist you." },
              { icon: Heart, title: "Local Experts", desc: "Connect with knowledgeable guides who know every hidden gem." }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Travelers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Real stories from real adventurers</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-orange-200 mb-4" />
              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
              <div className="border-t pt-4">
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
                <p className="text-xs text-orange-600 mt-1 font-medium">{testimonial.tour}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-orange-500 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Get Travel Inspiration</h2>
          <p className="text-white/90 mb-8 text-lg">Subscribe to our newsletter for exclusive deals and travel tips.</p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full outline-none focus:ring-4 focus:ring-white/30 transition-all"
            />
            <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </form>
          
          <p className="text-white/70 text-sm mt-4">Join 50,000+ travelers. No spam, unsubscribe anytime.</p>
        </div>
      </section>
    </>
  );
};

// TOURS PAGE
const ToursPage = ({ onBook }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredTours = activeCategory === 'All' 
    ? TOURS_DATA 
    : TOURS_DATA.filter(tour => tour.category === activeCategory);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-orange-500 font-bold tracking-wider uppercase text-sm">Explore</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">Find Your Perfect Tour</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            From cultural immersions to adrenaline adventures, find the experience that speaks to you.
          </p>
          
          <div className="flex overflow-x-auto pb-4 gap-4 justify-start md:justify-center no-scrollbar">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full whitespace-nowrap transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg scale-105' 
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} onBook={onBook} />
          ))}
        </div>

        {filteredTours.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No tours found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ABOUT PAGE
const AboutPage = () => {
  const stats = [
    { number: "50K+", label: "Happy Travelers" },
    { number: "120+", label: "Destinations" },
    { number: "15+", label: "Years Experience" },
    { number: "4.9", label: "Average Rating" }
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80" 
            alt="About Us" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <span className="text-orange-400 font-bold tracking-wider uppercase text-sm mb-4 block">About Us</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Creating Unforgettable Journeys Since 2010</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            We're a team of passionate travelers dedicated to crafting authentic, immersive experiences that connect you with the heart of every destination.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-4 block">Our Mission</span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Travel That Transforms</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                We believe travel should be more than just sightseeing. It should be about connection—connecting with new cultures, with nature, with local communities, and ultimately, with yourself.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Every tour we design is crafted with intention, sustainability, and a deep respect for the places and people we visit. We partner with local guides who share their homes, stories, and traditions, creating authentic experiences you won't find anywhere else.
              </p>
              
              <div className="space-y-4">
                {[
                  "Sustainable and responsible tourism practices",
                  "Small group sizes for intimate experiences",
                  "Local expert guides in every destination",
                  "24/7 support throughout your journey"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-orange-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&q=80" 
                alt="Traveler" 
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="flex items-center space-x-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-900 font-bold">"Life changing experience!"</p>
                <p className="text-gray-500 text-sm">- Jennifer M.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-4 block">Our Team</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet the Explorers Behind Wanderlust</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate travelers, expert guides, and logistics wizards working together to create your perfect adventure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member, idx) => (
              <div key={idx} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-orange-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-orange-400 font-bold tracking-wider uppercase text-sm mb-4 block">Our Values</span>
            <h2 className="text-4xl font-bold mb-4">What We Stand For</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Passion for Travel",
                desc: "We live and breathe exploration. Every team member is an avid traveler who understands the transformative power of new experiences."
              },
              {
                icon: Shield,
                title: "Responsible Tourism",
                desc: "We're committed to sustainable practices that protect the environment and benefit local communities in every destination we visit."
              },
              {
                icon: Users2,
                title: "Authentic Connections",
                desc: "We prioritize genuine interactions over tourist traps, creating opportunities for meaningful cultural exchange."
              }
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="bg-gray-800 p-8 rounded-2xl hover:bg-gray-750 transition-colors">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Adventure?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of happy travelers who've discovered the world with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/tours" 
              className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:shadow-xl transition-all flex items-center justify-center space-x-2"
            >
              <span>Browse Tours</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// CONTACT PAGE
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 556600-0557", "+1 (555) 987-6543"],
      desc: "Mon-Fri from 8am to 6pm EST"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["hello@wanderlust.com", "support@wanderlust.com"],
      desc: "We reply within 24 hours"
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["123 munekolal Street", "New Banglore, TY 10001"],
      desc: "Come visit us!"
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-orange-400 font-bold tracking-wider uppercase text-sm mb-4 block">Contact Us</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Let's Plan Your Next Adventure</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <section className="py-20 -mt-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-700 font-medium mb-1">{detail}</p>
                  ))}
                  <p className="text-gray-500 text-sm mt-4">{info.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
              <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you shortly.</p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                      <input 
                        required
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input 
                        required
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                        placeholder="yourname@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="general">General Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea 
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none"
                      placeholder="Tell us about your dream trip or question..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              <div className="bg-gray-200 rounded-3xl overflow-hidden h-[400px] relative">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" 
                  alt="Map" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-xl font-bold">123 Adventure Street</p>
                    <p>New York, NY 10001</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {[
                    { q: "How do I modify my booking?", a: "Contact us at least 48 hours before your tour." },
                    { q: "What's your cancellation policy?", a: "Full refund up to 7 days before the tour." },
                    { q: "Do you offer private tours?", a: "Yes! Contact us for custom itinerary options." }
                  ].map((faq, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-4 last:border-0">
                      <h4 className="font-bold text-gray-900 mb-1 flex items-center">
                        <ArrowUpRight className="w-4 h-4 text-orange-500 mr-2" />
                        {faq.q}
                      </h4>
                      <p className="text-gray-600 text-sm ml-6">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-8 rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-2">Need Immediate Help?</h3>
                <p className="text-white/90 mb-4">Our travel experts are available 24/7 for urgent inquiries.</p>
                <a href="tel:+15551234567" className="inline-flex items-center space-x-2 bg-white text-gray-900 px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all">
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Follow Our Adventures</h2>
          <p className="text-gray-600 mb-8">Stay connected and see where we're exploring next.</p>
          
          <div className="flex justify-center space-x-6">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
              <a 
                key={idx} 
                href="#" 
                className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-orange-500 hover:to-pink-600 hover:text-white transition-all group"
              >
                <Icon className="w-6 h-6 text-gray-600 group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Wanderlust</span>
            </div>
            <p className="text-gray-400 max-w-sm mb-6">
              Creating unforgettable travel experiences since 2015. 
              Join thousands of happy travelers exploring the world with us.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Instagram, Facebook, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link to="/tours" className="hover:text-orange-500 transition-colors">Tours</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2026 Wanderlust Tours. All rights reserved.</p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <div className="flex space-x-1">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-400">4.9/5 from 12,000+ reviews</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// MAIN APP COMPONENT
export default function App() {
  const [selectedTour, setSelectedTour] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBook = (tour) => {
    setSelectedTour(tour);
    setIsBookingOpen(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-gray-900">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage onBook={handleBook} />} />
          <Route path="/tours" element={<ToursPage onBook={handleBook} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        <Footer />

        <BookingModal 
          tour={selectedTour} 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
        />
      </div>
    </Router>
  );
}