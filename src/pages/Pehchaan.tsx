import React, { useState, useEffect } from 'react';
import { Star, Search, ShoppingCart, User, Sun, Moon, Menu, X, Heart, Plus, Minus, Eye, Edit, Trash2, Filter, ChevronDown, ChevronRight, LogIn } from 'lucide-react';
import { AuthModal } from '@/components/AuthModal';
import { SearchBar } from '@/components/SearchBar';
import { FilterTags } from '@/components/FilterTags';

// Import product images
import bluePotteryVase from '@/assets/blue-pottery-vase.jpg';
import pashmina from '@/assets/pashmina-shawl.jpg';
import brassDiya from '@/assets/brass-diya.jpg';
import handwovenCarpet from '@/assets/handwoven-carpet.jpg';
import jewelryBox from '@/assets/jewelry-box.jpg';
import madhubaniPainting from '@/assets/madhubani-painting.jpg';

//--- GLOBAL DESIGN SYSTEM ---//
// All design tokens are defined in src/index.css and tailwind.config.ts

//--- START: Theme Context ---//
const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {}
});

const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('pehchaan-theme');
    return saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('pehchaan-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
//--- END: Theme Context ---//

//--- START: Sample Data ---//
const sampleProducts = [
  {
    id: '1',
    name: 'Jaipur Blue Pottery Vase',
    seller: 'Rajasthan Blue Pottery Co.',
    artisan: 'Master Ramesh Kumhar',
    price: 1450,
    rating: 4.8,
    reviews: 23,
    image: bluePotteryVase,
    category: 'Pottery',
    description: 'Exquisite handcrafted blue pottery vase from Jaipur with traditional white floral patterns. Made using the ancient technique passed down through generations.',
    stock: 15,
    isNew: true
  },
  {
    id: '2',
    name: 'Kashmir Pashmina Shawl',
    seller: 'Kashmir Valley Weavers',
    artisan: 'Ustad Abdul Gani',
    price: 3200,
    rating: 4.9,
    reviews: 45,
    image: pashmina,
    category: 'Textiles',
    description: 'Luxurious hand-woven Pashmina shawl from Kashmir featuring intricate paisley patterns in golden saffron hues.',
    stock: 8,
    isTrending: true
  },
  {
    id: '3',
    name: 'Traditional Brass Diya Set',
    seller: 'Moradabad Metal Crafts',
    artisan: 'Craftsman Mohd. Salim',
    price: 650,
    rating: 4.7,
    reviews: 67,
    image: brassDiya,
    category: 'Metalware',
    description: 'Set of 5 handcrafted brass diyas with intricate engravings, perfect for festivals and religious ceremonies.',
    stock: 32,
    isNew: true
  },
  {
    id: '4',
    name: 'Handwoven Agra Carpet',
    seller: 'Agra Carpet House',
    artisan: 'Master Weaver Ashok',
    price: 12500,
    rating: 4.6,
    reviews: 12,
    image: handwovenCarpet,
    category: 'Carpets',
    description: 'Premium handwoven carpet with traditional Persian motifs in rich burgundy and gold, crafted over 6 months.',
    stock: 3,
    isPremium: true
  },
  {
    id: '5',
    name: 'Sheesham Wood Jewelry Box',
    seller: 'Saharanpur Wood Works',
    artisan: 'Craftsman Vikram Singh',
    price: 2100,
    rating: 4.5,
    reviews: 34,
    image: jewelryBox,
    category: 'Woodwork',
    description: 'Elegant jewelry box crafted from premium Sheesham wood with mother-of-pearl inlay work in traditional floral patterns.',
    stock: 18,
    isTrending: true
  },
  {
    id: '6',
    name: 'Madhubani Folk Art Painting',
    seller: 'Bihar Folk Art Collective',
    artisan: 'Artist Sita Devi',
    price: 850,
    rating: 4.8,
    reviews: 28,
    image: madhubaniPainting,
    category: 'Paintings',
    description: 'Authentic Madhubani painting depicting peacocks and nature motifs, hand-painted using natural colors on handmade paper.',
    stock: 12,
    isNew: true
  },
  {
    id: '7',
    name: 'Banarasi Silk Saree',
    seller: 'Varanasi Silk Emporium',
    artisan: 'Master Weaver Rajesh Kumar',
    price: 8500,
    rating: 4.9,
    reviews: 56,
    image: pashmina, // Using existing image as placeholder
    category: 'Textiles',
    description: 'Luxurious Banarasi silk saree with intricate zari work and traditional motifs. Perfect for weddings and special occasions.',
    stock: 6,
    isPremium: true
  },
  {
    id: '8',
    name: 'Copper Water Pot Set',
    seller: 'Rajasthan Copper Works',
    artisan: 'Craftsman Deepak Sharma',
    price: 1200,
    rating: 4.6,
    reviews: 42,
    image: brassDiya, // Using existing image as placeholder
    category: 'Metalware',
    description: 'Traditional copper water pot set with hammered finish. Known for its health benefits and traditional craftsmanship.',
    stock: 25,
    isNew: true
  },
  {
    id: '9',
    name: 'Handwoven Jute Bags',
    seller: 'Eco Craft Collective',
    artisan: 'Artisan Priya Mehta',
    price: 450,
    rating: 4.4,
    reviews: 38,
    image: handwovenCarpet, // Using existing image as placeholder
    category: 'Textiles',
    description: 'Eco-friendly handwoven jute bags with traditional patterns. Perfect for daily use and sustainable living.',
    stock: 50,
    isTrending: true
  },
  {
    id: '10',
    name: 'Marble Inlay Table',
    seller: 'Agra Marble Works',
    artisan: 'Master Craftsman Ahmed Ali',
    price: 18500,
    rating: 4.7,
    reviews: 19,
    image: jewelryBox, // Using existing image as placeholder
    category: 'Woodwork',
    description: 'Exquisite marble inlay table with intricate floral patterns. A masterpiece of traditional Indian craftsmanship.',
    stock: 2,
    isPremium: true
  },
  {
    id: '11',
    name: 'Terracotta Wall Hanging',
    seller: 'Bengal Pottery Studio',
    artisan: 'Artist Sunita Das',
    price: 750,
    rating: 4.5,
    reviews: 31,
    image: bluePotteryVase, // Using existing image as placeholder
    category: 'Pottery',
    description: 'Beautiful terracotta wall hanging with traditional Bengali motifs. Hand-molded and painted with natural colors.',
    stock: 20,
    isNew: true
  },
  {
    id: '12',
    name: 'Silver Filigree Earrings',
    seller: 'Cuttack Silver Crafts',
    artisan: 'Master Silversmith Bijay Kumar',
    price: 2800,
    rating: 4.8,
    reviews: 47,
    image: jewelryBox,
    category: 'Jewelry',
    description: 'Delicate silver filigree earrings with traditional Odisha designs. Handcrafted using ancient techniques.',
    stock: 15,
    isTrending: true
  }
];

const artisanStories = [
  {
    name: 'Master Ramesh Kumhar',
    craft: 'Blue Pottery',
    location: 'Jaipur, Rajasthan',
    experience: '25 years',
    story: 'Third generation blue pottery artisan keeping alive the 300-year-old tradition.'
  },
  {
    name: 'Ustad Abdul Gani',
    craft: 'Pashmina Weaving',
    location: 'Srinagar, Kashmir',
    experience: '35 years',
    story: 'Master weaver known for creating the finest Pashmina shawls using traditional handloom techniques.'
  }
];

const reviews = [
  {
    id: '1',
    productId: '1',
    user: 'Priya Sharma',
    rating: 5,
    comment: 'Absolutely beautiful vase! The craftsmanship is incredible and it looks stunning in my living room.',
    date: '2024-01-15'
  },
  {
    id: '2',
    productId: '1',
    user: 'Rajesh Kumar',
    rating: 4,
    comment: 'Good quality pottery. Arrived well-packaged and exactly as described.',
    date: '2024-01-10'
  }
];
//--- END: Sample Data ---//

//--- START: Reusable ProductCard Component ---//
const ProductCard = ({ product, onAddToCart, onViewProduct }: {
  product: typeof sampleProducts[0];
  onAddToCart?: (product: typeof sampleProducts[0]) => void;
  onViewProduct?: (product: typeof sampleProducts[0]) => void;
}) => {
  return (
    <div className="card-product group w-full h-full flex flex-col">
      <div className="relative overflow-hidden rounded-t-xl">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded-full font-medium">
            New
          </div>
        )}
        {product.isTrending && (
          <div className="absolute top-2 left-2 bg-terracotta text-white px-2 py-1 text-xs rounded-full font-medium">
            Trending
          </div>
        )}
        {product.isPremium && (
          <div className="absolute top-2 left-2 bg-gold text-black px-2 py-1 text-xs rounded-full font-medium">
            Premium
          </div>
        )}
        <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
          <Heart className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-3 space-y-2 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-playfair font-semibold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground">by {product.seller}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews})</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-foreground">₹{product.price.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex space-x-2 pt-2 mt-auto">
          <button 
            onClick={() => onViewProduct?.(product)}
            className="flex-1 btn-outline-saffron px-3 py-2 text-sm"
          >
            View Details
          </button>
          <button 
            onClick={() => onAddToCart?.(product)}
            className="flex-1 btn-saffron px-3 py-2 text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
//--- END: Reusable ProductCard Component ---//

//--- START: MainAppLayout Component ---//
const MainAppLayout = ({ 
  children, 
  isAuthenticated, 
  user, 
  userType, 
  onLogin, 
  onLogout, 
  currentPage, 
  setCurrentPage,
  cartCount
}: {
  children: React.ReactNode;
  isAuthenticated: boolean;
  user: {name: string, email: string, type: 'buyer' | 'seller'} | null;
  userType: 'buyer' | 'seller' | null;
  onLogin: (userData: {name: string, email: string, type: 'buyer' | 'seller'}) => void;
  onLogout: () => void;
  currentPage: string;
  setCurrentPage: (page: 'marketplace' | 'product' | 'checkout' | 'seller-dashboard' | 'buyer-profile' | 'categories' | 'about') => void;
  cartCount: number;
}) => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationBar 
        isAuthenticated={isAuthenticated}
        user={user}
        userType={userType}
        onLogin={onLogin}
        onLogout={onLogout}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cartCount}
      />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
};

//-- START: NavigationBar Component (within MainAppLayout) --//
const NavigationBar = ({ 
  isAuthenticated, 
  user, 
  userType, 
  onLogin, 
  onLogout, 
  currentPage, 
  setCurrentPage,
  cartCount
}: {
  isAuthenticated: boolean;
  user: {name: string, email: string, type: 'buyer' | 'seller'} | null;
  userType: 'buyer' | 'seller' | null;
  onLogin: (userData: {name: string, email: string, type: 'buyer' | 'seller'}) => void;
  onLogout: () => void;
  currentPage: string;
  setCurrentPage: (page: 'marketplace' | 'product' | 'checkout' | 'seller-dashboard' | 'buyer-profile' | 'categories' | 'about') => void;
  cartCount: number;
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' as 'login' | 'signup', userType: 'buyer' as 'buyer' | 'seller' });

  const handleAuthClose = () => {
    setAuthModal(prev => ({ ...prev, isOpen: false }));
  };

  const navigationItems = [
    { label: 'Marketplace', id: 'marketplace' },
    { label: 'Categories', id: 'categories' },
    { label: 'About', id: 'about' },
  ];

  const handleAuthSubmit = (formData: any) => {
    // Demo authentication with specific credentials
    const isDemoLogin = (formData.email === 'buyer@demo.com' || formData.email === 'seller@demo.com') && 
                       formData.password === 'demo123';
    
    if (isDemoLogin || formData.email || formData.password) {
      const userData = {
        name: formData.name || (formData.email === 'buyer@demo.com' ? 'Demo Buyer' : 
              formData.email === 'seller@demo.com' ? 'Demo Seller' : 'Demo User'),
        email: formData.email || 'demo@pehchaan.com',
        type: authModal.userType
      };
      onLogin(userData);
      setAuthModal(prev => ({ ...prev, isOpen: false }));
    } else {
      alert('Please use the demo credentials or enter valid information');
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border backdrop-blur-md" 
           style={{ background: theme === 'dark' ? 'var(--gradient-dark-nav)' : 'var(--card)' }}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section - Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => setCurrentPage('marketplace')}
                className="bg-gradient-to-r from-primary to-gold text-primary-foreground px-4 py-2 rounded-lg font-playfair font-bold text-xl hover:shadow-md transition-all"
              >
                Pehchaan
              </button>
            </div>

            {/* Center Section - Navigation & Search (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-4xl mx-8 items-center space-x-6">
              {/* Navigation Links */}
              <div className="flex items-center space-x-1">
                {navigationItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id as 'marketplace' | 'categories' | 'about')}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      currentPage === item.id 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-foreground hover:text-primary hover:bg-muted'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              
              {/* Search Bar */}
              <div className="flex-1 max-w-xl">
                <SearchBar />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* Auth Buttons */}
              <div className="hidden md:flex items-center space-x-2">
                {!isAuthenticated ? (
                  <>
                <button
                  onClick={() => setAuthModal({ isOpen: true, mode: 'login', userType: 'buyer' })}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-primary border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-lg shadow-sm hover:shadow-md"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => setAuthModal({ isOpen: true, mode: 'signup', userType: 'seller' })}
                  className="bg-primary text-white hover:bg-primary/90 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Sell on Pehchaan
                </button>
                  </>
                ) : (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="text-sm text-muted-foreground">{user?.name}</span>
                    </div>
                    <button
                      onClick={() => setCurrentPage(userType === 'seller' ? 'seller-dashboard' : 'buyer-profile')}
                      className="btn-outline-saffron px-3 py-2 text-sm"
                    >
                      {userType === 'seller' ? 'Dashboard' : 'Profile'}
                    </button>
                    <button
                      onClick={onLogout}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Logout
                </button>
                  </div>
                )}
              </div>
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>

              <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-3">
            <SearchBar placeholder="Search handicrafts..." />
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 border-t border-border pt-3">
              <div className="space-y-3">
                {navigationItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id as 'marketplace' | 'categories' | 'about');
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left py-2 px-3 rounded-lg transition-colors ${
                      currentPage === item.id 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-foreground hover:text-primary hover:bg-muted'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="border-t border-border pt-3 mt-3 space-y-2">
                  {!isAuthenticated ? (
                    <>
                  <button
                    onClick={() => {
                      setAuthModal({ isOpen: true, mode: 'login', userType: 'buyer' });
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left py-3 px-4 text-primary border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-lg font-medium mb-2"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setAuthModal({ isOpen: true, mode: 'signup', userType: 'seller' });
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left py-3 px-4 bg-primary text-white hover:bg-primary/90 transition-all duration-300 rounded-lg font-medium"
                  >
                    Sell on Pehchaan
                  </button>
                    </>
                  ) : (
                    <>
                      <div className="px-3 py-2 flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-primary-foreground" />
                        </div>
                        <span>{user?.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          setCurrentPage(userType === 'seller' ? 'seller-dashboard' : 'buyer-profile');
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left py-2 px-3 text-primary hover:underline"
                      >
                        {userType === 'seller' ? 'Dashboard' : 'Profile'}
                      </button>
                      <button
                        onClick={() => {
                          onLogout();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left py-2 px-3 text-foreground hover:text-primary"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={handleAuthClose}
        mode={authModal.mode}
        userType={authModal.userType}
        onModeChange={(mode) => setAuthModal(prev => ({ ...prev, mode }))}
        onUserTypeChange={(userType) => setAuthModal(prev => ({ ...prev, userType }))}
        onSubmit={handleAuthSubmit}
      />
    </>
  );
};

//-- START: Footer Component (within MainAppLayout) --//
const Footer = () => {
  return (
    <footer className="bg-indigo-deep text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="space-y-4">
            <div className="text-2xl font-playfair font-bold">Pehchaan</div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Celebrating India's rich heritage through authentic handcrafted treasures. 
              Connecting artisans with art lovers worldwide.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#pottery" className="text-gray-300 hover:text-white transition-colors">Pottery & Ceramics</a></li>
              <li><a href="#textiles" className="text-gray-300 hover:text-white transition-colors">Textiles & Fabrics</a></li>
              <li><a href="#metalware" className="text-gray-300 hover:text-white transition-colors">Metalware</a></li>
              <li><a href="#woodwork" className="text-gray-300 hover:text-white transition-colors">Woodwork</a></li>
              <li><a href="#paintings" className="text-gray-300 hover:text-white transition-colors">Paintings & Art</a></li>
            </ul>
          </div>

          {/* For Artisans */}
          <div>
            <h4 className="font-semibold text-lg mb-4">For Artisans</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#sell" className="text-gray-300 hover:text-white transition-colors">Start Selling</a></li>
              <li><a href="#dashboard" className="text-gray-300 hover:text-white transition-colors">Seller Dashboard</a></li>
              <li><a href="#success-stories" className="text-gray-300 hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#resources" className="text-gray-300 hover:text-white transition-colors">Resources</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#help" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#shipping" className="text-gray-300 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#returns" className="text-gray-300 hover:text-white transition-colors">Returns</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">© 2025 Pehchaan. Preserving traditions, celebrating artisans.</p>
          <div className="flex space-x-6 text-sm mt-4 md:mt-0">
            <a href="#privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
//-- END: Footer Component (within MainAppLayout) --//
//--- END: MainAppLayout Component ---//

//--- START: MarketplacePage Component ---//
const MarketplacePage = ({ onViewProduct, onAddToCart }: {
  onViewProduct: (product: typeof sampleProducts[0]) => void;
  onAddToCart: (product: typeof sampleProducts[0]) => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Pottery', 'Textiles', 'Metalware', 'Carpets', 'Woodwork', 'Paintings', 'Jewelry'];
  const filterTags = ['Newly Added', 'Trending', 'Premium', 'Under ₹1000', 'Handwoven', 'Festival Special'];

  const filteredProducts = sampleProducts.filter(product => {
    if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (selectedRating > 0 && product.rating < selectedRating) return false;
    return true;
  });

  const newlyAddedProducts = sampleProducts.filter(p => p.isNew);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative mb-12 rounded-2xl overflow-hidden bg-gradient-to-r from-primary/10 to-terracotta/10 pattern-paisley">
        <div className="px-8 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-foreground mb-4">
            Discover India's
            <span className="text-saffron"> Handcrafted</span> Heritage
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Authentic handicrafts from master artisans across India. Every piece tells a story of tradition, skill, and cultural pride.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar - Filters */}
        <div className="lg:w-64 space-y-6">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 btn-outline-saffron w-full py-2 px-4"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filter Panel */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'} space-y-6`}>
            {/* Categories */}
            <div className="card-warm p-4">
              <h3 className="font-semibold text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="card-warm p-4">
              <h3 className="font-semibold text-lg mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-primary"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="card-warm p-4">
              <h3 className="font-semibold text-lg mb-4">Minimum Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map(rating => (
                  <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={selectedRating === rating}
                      onChange={() => setSelectedRating(rating)}
                      className="text-primary focus:ring-primary"
                    />
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-gold text-gold' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm">& above</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 space-y-8">
          {/* Filter Tags */}
          <FilterTags
            selectedTags={[]}
            onTagSelect={(tagId) => console.log('Selected tag:', tagId)}
          />

          {/* Newly Added Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-playfair font-semibold">Newly Added for You</h2>
              <button className="text-primary hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newlyAddedProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product} 
                  onViewProduct={onViewProduct}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </section>

          {/* Main Product Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-playfair font-semibold">Explore Our Collection</h2>
              <div className="text-sm text-muted-foreground">
                {filteredProducts.length} products found
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product} 
                  onViewProduct={onViewProduct}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
//--- END: MarketplacePage Component ---//

//--- START: ProductDetailPage Component ---//
const ProductDetailPage = ({ product, onBack, onAddToCart }: {
  product: typeof sampleProducts[0];
  onBack: () => void;
  onAddToCart: (product: typeof sampleProducts[0], quantity: number) => void;
}) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  const productImages = [product.image, product.image, product.image, product.image];
  const productReviews = reviews.filter(r => r.productId === product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <button onClick={onBack} className="text-primary hover:underline">
          ← Back to Products
        </button>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-xl overflow-hidden bg-muted">
            <img 
              src={selectedImage} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === image ? 'border-primary' : 'border-border'
                }`}
              >
                <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="space-y-6">
          <div>
            <a href="#seller" className="text-primary hover:underline text-sm">{product.seller}</a>
            <h1 className="text-3xl font-playfair font-bold mt-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <a href="#reviews" className="text-sm text-primary hover:underline">
                ({product.reviews} reviews)
              </a>
            </div>
          </div>

          <div className="text-3xl font-bold text-foreground">
            ₹{product.price.toLocaleString()}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border border-input rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-muted transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border-x border-input min-w-[60px] text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 hover:bg-muted transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm text-muted-foreground">
                {product.stock} available
              </span>
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={() => onAddToCart(product, quantity)}
                className="flex-1 btn-outline-saffron px-6 py-3"
              >
                Add to Cart
              </button>
              <button className="flex-1 btn-saffron px-6 py-3">
                Buy Now
              </button>
            </div>
          </div>

          <div className="border-t border-border pt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Artisan:</span>
              <span className="font-medium">{product.artisan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Category:</span>
              <span className="font-medium">{product.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping:</span>
              <span className="font-medium text-primary">Free nationwide</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-16">
        <div className="border-b border-border">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'details' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'reviews' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Customer Reviews ({product.reviews})
            </button>
          </div>
        </div>

        <div className="py-8">
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Product Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Material:</span>
                      <span>Premium Clay & Natural Glazes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dimensions:</span>
                      <span>8" H x 5" W</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight:</span>
                      <span>1.2 kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Origin:</span>
                      <span>Jaipur, Rajasthan</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Care:</span>
                      <span>Hand wash only</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Technique:</span>
                      <span>Traditional Blue Pottery</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Age:</span>
                      <span>Contemporary</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Authenticity:</span>
                      <span className="text-primary">Certified Handmade</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">About the Artisan</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Master Ramesh Kumhar is a third-generation blue pottery artisan from Jaipur, carrying forward a 300-year-old family tradition. 
                  His work has been featured in numerous exhibitions and his pieces are cherished by collectors worldwide for their authentic 
                  craftsmanship and attention to detail.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-muted/30 rounded-xl p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">{product.rating}</div>
                  <div className="flex justify-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{product.reviews}</div>
                  <div className="text-sm text-muted-foreground">Total Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-sm text-muted-foreground">Recommend</div>
                </div>
              </div>

              <div className="space-y-6">
                {productReviews.map(review => (
                  <div key={review.id} className="border-b border-border pb-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-medium">{review.user}</div>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-gold text-gold' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{review.date}</div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
//--- END: ProductDetailPage Component ---//

//--- START: CheckoutPage Component ---//
const CheckoutPage = ({ cartItems, onBack }: {
  cartItems: Array<{product: typeof sampleProducts[0], quantity: number}>;
  onBack: () => void;
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [shippingForm, setShippingForm] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const [paymentStep, setPaymentStep] = useState<'method' | 'processing' | 'success'>('method');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    cardName: ''
  });

  const handlePlaceOrder = () => {
    setPaymentStep('processing');
    
    // Localhost simulation - save order to localStorage
    if (typeof window !== 'undefined') {
      const orderData = {
        id: `ORD${Date.now()}`,
        items: cartItems,
        total: total,
        paymentMethod: paymentMethod,
        shipping: shippingForm,
        paymentDetails: paymentDetails,
        date: new Date().toISOString(),
        status: 'Processing'
      };
      
      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('pehchaan_orders') || '[]');
      existingOrders.push(orderData);
      localStorage.setItem('pehchaan_orders', JSON.stringify(existingOrders));
      
      // Clear cart
      localStorage.removeItem('pehchaan_cart');
      
      // TODO: Replace with Supabase integration
      // const { data: order } = await supabase
      //   .from('orders')
      //   .insert(orderData)
      //   .select()
      //   .single();
      // 
      // await supabase
      //   .from('cart_items')
      //   .delete()
      //   .eq('user_id', user.id);
    }
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep('success');
    }, 3000);
  };

  const handlePaymentSuccess = () => {
    alert('Order placed successfully! You will receive a confirmation email shortly.');
    setPaymentStep('method');
    // Here you would normally process the order
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button onClick={onBack} className="text-primary hover:underline mb-4">
          ← Back to Cart
        </button>
        <h1 className="text-3xl font-playfair font-bold">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="card-warm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Shipping Address</h2>
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                1
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={shippingForm.fullName}
                  onChange={(e) => setShippingForm({...shippingForm, fullName: e.target.value})}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Address</label>
                <textarea
                  value={shippingForm.address}
                  onChange={(e) => setShippingForm({...shippingForm, address: e.target.value})}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="Enter your complete address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  value={shippingForm.city}
                  onChange={(e) => setShippingForm({...shippingForm, city: e.target.value})}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <select
                  value={shippingForm.state}
                  onChange={(e) => setShippingForm({...shippingForm, state: e.target.value})}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select State</option>
                  <option value="rajasthan">Rajasthan</option>
                  <option value="gujarat">Gujarat</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="delhi">Delhi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">PIN Code</label>
                <input
                  type="text"
                  value={shippingForm.pincode}
                  onChange={(e) => setShippingForm({...shippingForm, pincode: e.target.value})}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="PIN Code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={shippingForm.phone}
                  onChange={(e) => setShippingForm({...shippingForm, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Phone Number"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="card-warm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Payment Method</h2>
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                2
              </div>
            </div>
            <div className="space-y-4">
              <label className="flex items-center space-x-3 p-4 border border-input rounded-lg cursor-pointer hover:bg-muted/50">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <div className="flex-1">
                  <div className="font-medium">Credit/Debit Card</div>
                  <div className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</div>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 p-4 border border-input rounded-lg cursor-pointer hover:bg-muted/50">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <div className="flex-1">
                  <div className="font-medium">UPI</div>
                  <div className="text-sm text-muted-foreground">PhonePe, Google Pay, Paytm</div>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 p-4 border border-input rounded-lg cursor-pointer hover:bg-muted/50">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <div className="flex-1">
                  <div className="font-medium">Cash on Delivery (COD)</div>
                  <div className="text-sm text-muted-foreground">Pay when you receive</div>
                </div>
              </label>
            </div>

            {paymentMethod === 'card' && (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    value={paymentDetails.cardName}
                    onChange={(e) => setPaymentDetails({...paymentDetails, cardName: e.target.value})}
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Card Number</label>
                  <input
                    type="text"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Expiry Date</label>
                    <input
                      type="text"
                      value={paymentDetails.expiryDate}
                      onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                      className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CVV</label>
                    <input
                      type="text"
                      value={paymentDetails.cvv}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                      className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">UPI ID</label>
                <input
                  type="text"
                  value={paymentDetails.upiId}
                  onChange={(e) => setPaymentDetails({...paymentDetails, upiId: e.target.value})}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="yourname@upi"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="card-warm p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-primary">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>₹0</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold text-lg">
                <span>Total Amount Payable</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            {paymentStep === 'method' && (
            <button 
              onClick={handlePlaceOrder}
              className="w-full mt-6 btn-saffron py-3 text-lg font-semibold"
            >
              Place Order
            </button>
            )}

            {paymentStep === 'processing' && (
              <div className="w-full mt-6 p-6 bg-muted/30 rounded-lg text-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-lg font-medium">Processing Payment...</p>
                <p className="text-sm text-muted-foreground mt-2">Please don't close this window</p>
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="w-full mt-6 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <p className="text-lg font-medium text-green-800">Payment Successful!</p>
                <p className="text-sm text-green-600 mt-2">Your order has been placed successfully</p>
                <button 
                  onClick={handlePaymentSuccess}
                  className="mt-4 btn-saffron px-6 py-2"
                >
                  Continue Shopping
                </button>
              </div>
            )}

            <p className="text-xs text-muted-foreground mt-4 text-center">
              By placing your order, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
//--- END: CheckoutPage Component ---//

//--- START: SellerDashboardPage Component ---//
const SellerDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [listings, setListings] = useState(sampleProducts.slice(0, 6));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const kpiData = [
    { title: 'Total Revenue', value: '₹2,45,600', change: '+18%', trend: 'up' },
    { title: 'Orders', value: '234', change: '+12%', trend: 'up' },
    { title: 'Products Listed', value: '28', change: '+3', trend: 'up' },
    { title: 'Rating', value: '4.8', change: '+0.2', trend: 'up' },
    { title: 'Views', value: '12.5K', change: '+25%', trend: 'up' },
    { title: 'Conversion', value: '3.2%', change: '+0.5%', trend: 'up' }
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'Priya Sharma', product: 'Blue Pottery Vase', amount: 1450, status: 'Delivered', date: '2024-01-15' },
    { id: 'ORD-002', customer: 'Rajesh Kumar', product: 'Pashmina Shawl', amount: 3200, status: 'Shipped', date: '2024-01-14' },
    { id: 'ORD-003', customer: 'Sita Devi', product: 'Brass Diya Set', amount: 650, status: 'Processing', date: '2024-01-13' },
    { id: 'ORD-004', customer: 'Amit Singh', product: 'Handwoven Carpet', amount: 12500, status: 'Delivered', date: '2024-01-12' },
    { id: 'ORD-005', customer: 'Meera Patel', product: 'Jewelry Box', amount: 2100, status: 'Shipped', date: '2024-01-11' }
  ];

  const topProducts = [
    { name: 'Blue Pottery Vase', sales: 45, revenue: 65250, views: 1250 },
    { name: 'Pashmina Shawl', sales: 32, revenue: 102400, views: 980 },
    { name: 'Brass Diya Set', sales: 67, revenue: 43550, views: 2100 },
    { name: 'Handwoven Carpet', sales: 8, revenue: 100000, views: 450 },
    { name: 'Jewelry Box', sales: 28, revenue: 58800, views: 750 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <div className="bg-card shadow-sm border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="ml-4 lg:ml-0">
                <h1 className="text-xl font-bold text-foreground">Seller Dashboard</h1>
                <p className="text-sm text-muted-foreground">Rajasthan Blue Pottery Co.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-sm font-medium">RK</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Ramesh Kumhar</p>
                    <p className="text-xs text-muted-foreground">Master Artisan</p>
                  </div>
                </div>
              </div>
              <button className="p-2 text-muted-foreground hover:text-foreground">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block w-64 bg-card shadow-sm min-h-screen border-r border-border`}>
          <div className="p-6">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'overview' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                }`}
              >
                <span className="mr-3">📊</span>
                Overview
              </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'analytics' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
              }`}
            >
              <span className="mr-3">📈</span>
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'listings' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
              }`}
            >
              <span className="mr-3">📦</span>
              Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'orders' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
              }`}
            >
              <span className="mr-3">🛒</span>
              Orders
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'reviews' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
              }`}
            >
              <span className="mr-3">⭐</span>
              Reviews
            </button>
            <button
              onClick={() => setActiveTab('earnings')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'earnings' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
              }`}
            >
              <span className="mr-3">💰</span>
              Earnings
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'settings' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
              }`}
            >
              <span className="mr-3">⚙️</span>
              Settings
            </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
                <div className="flex space-x-3">
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
                    Add Product
                  </button>
                  <button className="border border-border text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted">
                    Export Data
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.slice(0, 4).map((kpi, index) => (
                  <div key={index} className="card-warm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                        <p className="text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
                      </div>
                      <div className={`p-2 rounded-full ${kpi.trend === 'up' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                        <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {kpi.change}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card-warm p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Recent Orders</h3>
                  <div className="space-y-3">
                    {recentOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm font-medium text-foreground">{order.customer}</p>
                          <p className="text-xs text-muted-foreground">{order.product}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">₹{order.amount.toLocaleString()}</p>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' :
                            order.status === 'Shipped' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400' :
                            'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-warm p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Top Products</h3>
                  <div className="space-y-3">
                    {topProducts.slice(0, 3).map((product, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm font-medium text-foreground">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.views} views</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">₹{product.revenue.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Analytics Overview</h2>
                <div className="flex space-x-2">
                  <select className="border border-border bg-background text-foreground rounded-lg px-3 py-2 text-sm">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 3 months</option>
                  </select>
                </div>
              </div>
                
                {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {kpiData.map((kpi, index) => (
                  <div key={index} className="card-warm p-6">
                      <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-muted-foreground">{kpi.title}</h3>
                      <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {kpi.change}
                      </span>
                      </div>
                    <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">vs last month</div>
                    </div>
                  ))}
                </div>

              {/* Revenue Chart Placeholder */}
              <div className="card-warm p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Revenue Over Time</h3>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would go here</p>
                </div>
              </div>

              {/* Most Viewed Products */}
              <div className="card-warm p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Most Viewed Products</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 text-muted-foreground">Product</th>
                        <th className="text-left py-2 text-muted-foreground">Views</th>
                        <th className="text-left py-2 text-muted-foreground">Sales</th>
                        <th className="text-left py-2 text-muted-foreground">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listings.map((product, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="py-3 flex items-center space-x-3">
                            <img src={product.image} alt={product.name} className="w-8 h-8 object-cover rounded" />
                            <span className="font-medium text-foreground">{product.name}</span>
                          </td>
                          <td className="py-3 text-muted-foreground">1,234</td>
                          <td className="py-3 text-muted-foreground">45</td>
                          <td className="py-3 text-foreground font-medium">₹{(product.price * 45).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'listings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl font-bold text-foreground">Product Management</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="border border-border bg-background text-foreground rounded-lg px-3 py-2 text-sm w-full sm:w-64"
                    />
                    <select className="border border-border bg-background text-foreground rounded-lg px-3 py-2 text-sm">
                      <option>All Categories</option>
                      <option>Pottery</option>
                      <option>Textiles</option>
                      <option>Metalware</option>
                    </select>
                  </div>
                  <button 
                    onClick={() => {
                      // Localhost simulation - show add product form
                      const productName = prompt('Enter product name:');
                      if (productName) {
                        const newProduct = {
                          id: `prod_${Date.now()}`,
                          name: productName,
                          price: Math.floor(Math.random() * 10000) + 500,
                          image: '/placeholder.svg',
                          category: 'Pottery',
                          seller: 'Rajasthan Blue Pottery Co.',
                          rating: 4.5,
                          stock: Math.floor(Math.random() * 50) + 10,
                          isNew: true,
                          isTrending: false,
                          isPremium: false
                        };
                        
                        // Save to localStorage
                        if (typeof window !== 'undefined') {
                          const existingProducts = JSON.parse(localStorage.getItem('pehchaan_products') || '[]');
                          existingProducts.push(newProduct);
                          localStorage.setItem('pehchaan_products', JSON.stringify(existingProducts));
                          alert(`Product "${productName}" added successfully! (Localhost simulation)`);
                        }
                        
                        // TODO: Replace with Supabase integration
                        // const { data: product } = await supabase
                        //   .from('products')
                        //   .insert(newProduct)
                        //   .select()
                        //   .single();
                      }
                    }}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((product) => (
                  <div key={product.id} className="card-warm rounded-lg overflow-hidden">
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="bg-background px-2 py-1 rounded-full text-xs font-medium text-foreground shadow-sm">
                          {product.stock} in stock
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-muted-foreground">{product.rating}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-muted text-muted-foreground px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted/80 flex items-center justify-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button className="flex-1 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 flex items-center justify-center space-x-1">
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Showing 1-6 of 28 products</p>
                <div className="flex space-x-2">
                  <button className="px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted">Previous</button>
                  <button className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm">1</button>
                  <button className="px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted">2</button>
                  <button className="px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted">3</button>
                  <button className="px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted">Next</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Recent Orders</h2>
                <button className="btn-outline-saffron px-4 py-2">View All Orders</button>
              </div>

              <div className="card-warm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="text-left p-4 text-muted-foreground">Order ID</th>
                        <th className="text-left p-4 text-muted-foreground">Customer</th>
                        <th className="text-left p-4 text-muted-foreground">Product</th>
                        <th className="text-left p-4 text-muted-foreground">Amount</th>
                        <th className="text-left p-4 text-muted-foreground">Status</th>
                        <th className="text-left p-4 text-muted-foreground">Date</th>
                        <th className="text-left p-4 text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-border/50">
                          <td className="p-4 font-medium text-foreground">{order.id}</td>
                          <td className="p-4 text-foreground">{order.customer}</td>
                          <td className="p-4 text-foreground">{order.product}</td>
                          <td className="p-4 font-medium text-foreground">₹{order.amount.toLocaleString()}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              order.status === 'Delivered' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                              order.status === 'Shipped' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' :
                              'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4 text-muted-foreground">{order.date}</td>
                          <td className="p-4">
                            <button className="text-primary hover:underline text-sm">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Earnings Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="card-warm p-6">
                  <h3 className="text-sm text-muted-foreground mb-2">Total Earnings</h3>
                  <div className="text-2xl font-bold text-foreground">₹2,45,600</div>
                  <div className="text-xs text-green-600 dark:text-green-400 mt-1">+18% from last month</div>
                </div>
                <div className="card-warm p-6">
                  <h3 className="text-sm text-muted-foreground mb-2">This Month</h3>
                  <div className="text-2xl font-bold text-foreground">₹45,200</div>
                  <div className="text-xs text-muted-foreground mt-1">15 days remaining</div>
                </div>
                <div className="card-warm p-6">
                  <h3 className="text-sm text-muted-foreground mb-2">Pending Payout</h3>
                  <div className="text-2xl font-bold text-foreground">₹12,500</div>
                  <div className="text-xs text-muted-foreground mt-1">Next payout: Jan 25</div>
                </div>
              </div>

              <div className="card-warm p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Top Performing Products</h3>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">{product.views} views</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-foreground">₹{product.revenue.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{product.sales} sales</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Account Settings</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card-warm p-6">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Profile Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Business Name</label>
                      <input
                        type="text"
                        defaultValue="Rajasthan Blue Pottery Co."
                        className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Contact Email</label>
                      <input
                        type="email"
                        defaultValue="contact@rajasthanpottery.com"
                        className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Phone Number</label>
                      <input
                        type="tel"
                        defaultValue="+91 9876543210"
                        className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90">Save Changes</button>
                  </div>
                </div>

                <div className="card-warm p-6">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Payment Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Bank Account</label>
                      <input
                        type="text"
                        defaultValue="****1234"
                        className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">UPI ID</label>
                      <input
                        type="text"
                        defaultValue="rajasthanpottery@upi"
                        className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Payout Frequency</label>
                      <select className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                        <option>Weekly</option>
                        <option>Bi-weekly</option>
                        <option>Monthly</option>
                      </select>
                    </div>
                    <button className="border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-primary-foreground">Update Payment Info</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Customer Reviews</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="card-warm p-6 text-center">
                  <div className="text-3xl font-bold mb-2 text-foreground">4.8</div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
                <div className="card-warm p-6 text-center">
                  <div className="text-3xl font-bold mb-2 text-foreground">156</div>
                  <div className="text-sm text-muted-foreground">Total Reviews</div>
                </div>
                <div className="card-warm p-6 text-center">
                  <div className="text-3xl font-bold mb-2 text-foreground">94%</div>
                  <div className="text-sm text-muted-foreground">5-Star Reviews</div>
                </div>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => {
                  const product = sampleProducts.find(p => p.id === review.productId);
                  return (
                    <div key={review.id} className="card-warm p-6">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={product?.image} 
                          alt={product?.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-foreground">{product?.name}</h3>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-gold text-gold' : 'text-muted-foreground'}`} />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-2">{review.comment}</p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>By {review.user}</span>
                            <span>{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
//--- END: SellerDashboardPage Component ---//

//--- START: BuyerProfilePage Component ---//
const BuyerProfilePage = () => {
  const [profile, setProfile] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 9876543210',
    address: 'Mumbai, Maharashtra'
  });

  const [selectedTags, setSelectedTags] = useState(['Pottery', 'Textiles', 'Paintings']);
  const availableTags = ['Pottery', 'Textiles', 'Metalware', 'Carpets', 'Woodwork', 'Paintings', 'Jewelry', 'Sculptures'];

  const recentOrders = [
    { id: 'ORD001', date: '2024-01-15', total: 1450, status: 'Delivered', items: 1 },
    { id: 'ORD002', date: '2024-01-10', total: 3200, status: 'In Transit', items: 1 },
    { id: 'ORD003', date: '2024-01-05', total: 650, status: 'Delivered', items: 5 },
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-foreground">My Profile</h1>

      <div className="space-y-8">
        {/* Profile Details */}
        <div className="card-warm p-6">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Profile Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Address</label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => setProfile({...profile, address: e.target.value})}
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="btn-saffron px-6 py-2">
              Save Changes
            </button>
          </div>
        </div>

        {/* Interest Tags */}
        <div className="card-warm p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">My Interest Tags</h2>
          <p className="text-muted-foreground mb-6">
            Select categories you're interested in to personalize your marketplace experience.
          </p>
          <div className="flex flex-wrap gap-3">
            {availableTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full border transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border hover:bg-muted'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card-warm p-6">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 text-muted-foreground">Order ID</th>
                  <th className="text-left py-3 text-muted-foreground">Date</th>
                  <th className="text-left py-3 text-muted-foreground">Items</th>
                  <th className="text-left py-3 text-muted-foreground">Total Amount</th>
                  <th className="text-left py-3 text-muted-foreground">Status</th>
                  <th className="text-left py-3 text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border/50">
                    <td className="py-3 font-medium text-foreground">{order.id}</td>
                    <td className="py-3 text-muted-foreground">{order.date}</td>
                    <td className="py-3 text-foreground">{order.items} item{order.items > 1 ? 's' : ''}</td>
                    <td className="py-3 font-medium text-foreground">₹{order.total.toLocaleString()}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'Delivered' 
                          ? 'bg-success/10 text-success' 
                          : 'bg-gold/10 text-gold'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <button className="text-primary hover:underline text-sm">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
//--- END: BuyerProfilePage Component ---//

//--- START: CategoriesPage Component ---//
const CategoriesPage = ({ onViewProduct, onAddToCart }: {
  onViewProduct: (product: typeof sampleProducts[0]) => void;
  onAddToCart: (product: typeof sampleProducts[0]) => void;
}) => {
  const categories = [
    {
      name: 'Pottery & Ceramics',
      description: 'Traditional clay pottery from across India',
      count: 45,
      image: bluePotteryVase,
      featured: sampleProducts.filter(p => p.category === 'Pottery')
    },
    {
      name: 'Textiles & Fabrics',
      description: 'Handwoven textiles and traditional fabrics',
      count: 78,
      image: pashmina,
      featured: sampleProducts.filter(p => p.category === 'Textiles')
    },
    {
      name: 'Metalware',
      description: 'Brass, copper, and silver metal crafts',
      count: 56,
      image: brassDiya,
      featured: sampleProducts.filter(p => p.category === 'Metalware')
    },
    {
      name: 'Carpets & Rugs',
      description: 'Handwoven carpets and traditional rugs',
      count: 23,
      image: handwovenCarpet,
      featured: sampleProducts.filter(p => p.category === 'Carpets')
    },
    {
      name: 'Woodwork',
      description: 'Handcrafted wooden furniture and decor',
      count: 34,
      image: jewelryBox,
      featured: sampleProducts.filter(p => p.category === 'Woodwork')
    },
    {
      name: 'Paintings & Art',
      description: 'Traditional Indian paintings and folk art',
      count: 67,
      image: madhubaniPainting,
      featured: sampleProducts.filter(p => p.category === 'Paintings')
    },
    {
      name: 'Jewelry',
      description: 'Traditional Indian jewelry and accessories',
      count: 42,
      image: jewelryBox,
      featured: sampleProducts.filter(p => p.category === 'Jewelry')
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-playfair font-bold text-foreground mb-4">
          Explore Our <span className="text-saffron">Categories</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover authentic handcrafted treasures organized by traditional Indian craft categories
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {categories.map((category, index) => (
          <div key={index} className="card-warm group hover:scale-105 transition-transform duration-300">
            <div className="relative overflow-hidden rounded-t-xl">
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-playfair font-bold">{category.name}</h3>
                <p className="text-sm opacity-90">{category.count} products</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-4">{category.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-primary">
                  {category.count} items
                </span>
                <button className="btn-outline-saffron px-4 py-2 text-sm">
                  Explore
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Products by Category */}
      <div className="space-y-12">
        {categories.map((category, index) => (
          <section key={index}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-playfair font-semibold">{category.name}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
              <button className="text-primary hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.featured.slice(0, 3).map(product => (
                <ProductCard 
                  key={product.id}
                  product={product} 
                  onViewProduct={onViewProduct}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
//--- END: CategoriesPage Component ---//

//--- START: AboutPage Component ---//
const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-playfair font-bold text-foreground mb-6">
          About <span className="text-saffron">Pehchaan</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          We are passionate about preserving India's rich cultural heritage by connecting 
          master artisans with art lovers worldwide. Every piece tells a story of tradition, 
          skill, and cultural pride.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="card-warm p-8">
          <h2 className="text-2xl font-playfair font-bold mb-4 text-primary">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            To preserve and promote India's traditional handicrafts by providing a platform 
            where master artisans can showcase their skills and connect with customers who 
            appreciate authentic, handcrafted products. We believe in fair trade practices 
            and ensuring artisans receive fair compensation for their exceptional work.
          </p>
        </div>
        <div className="card-warm p-8">
          <h2 className="text-2xl font-playfair font-bold mb-4 text-primary">Our Vision</h2>
          <p className="text-muted-foreground leading-relaxed">
            To become the world's leading marketplace for authentic Indian handicrafts, 
            where every purchase supports traditional artisans and helps preserve cultural 
            heritage for future generations. We envision a world where traditional crafts 
            thrive alongside modern innovation.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-playfair font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Authenticity</h3>
            <p className="text-muted-foreground">
              Every product is verified for authenticity and traditional craftsmanship
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Fair Trade</h3>
            <p className="text-muted-foreground">
              We ensure artisans receive fair compensation for their exceptional work
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
            <p className="text-muted-foreground">
              Promoting eco-friendly practices and sustainable traditional techniques
            </p>
          </div>
        </div>
      </div>

      {/* Artisan Stories */}
      <div className="mb-16">
        <h2 className="text-3xl font-playfair font-bold text-center mb-12">Meet Our Artisans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {artisanStories.map((artisan, index) => (
            <div key={index} className="card-warm p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍🎨</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{artisan.name}</h3>
                  <p className="text-primary font-medium mb-2">{artisan.craft} • {artisan.location}</p>
                  <p className="text-sm text-muted-foreground mb-3">{artisan.experience} of experience</p>
                  <p className="text-muted-foreground">{artisan.story}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">500+</div>
          <div className="text-muted-foreground">Artisans</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">10K+</div>
          <div className="text-muted-foreground">Products</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">50K+</div>
          <div className="text-muted-foreground">Happy Customers</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">25+</div>
          <div className="text-muted-foreground">States</div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center card-warm p-12">
        <h2 className="text-3xl font-playfair font-bold mb-4">Join Our Community</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Whether you're an artisan looking to showcase your work or a customer seeking 
          authentic handcrafted treasures, we'd love to have you join our community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-saffron px-8 py-3">Start Selling</button>
          <button className="btn-outline-saffron px-8 py-3">Browse Products</button>
        </div>
      </div>
    </div>
  );
};
//--- END: AboutPage Component ---//

//--- START: Main Pehchaan App Component ---//
const PehchaanApp = () => {
  const [currentPage, setCurrentPage] = useState<'marketplace' | 'product' | 'checkout' | 'seller-dashboard' | 'buyer-profile' | 'categories' | 'about'>('marketplace');
  const [selectedProduct, setSelectedProduct] = useState<typeof sampleProducts[0] | null>(null);
  const [cartItems, setCartItems] = useState<Array<{product: typeof sampleProducts[0], quantity: number}>>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'buyer' | 'seller' | null>(null);
  const [user, setUser] = useState<{name: string, email: string, type: 'buyer' | 'seller'} | null>(null);

  const handleViewProduct = (product: typeof sampleProducts[0]) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const handleAddToCart = (product: typeof sampleProducts[0], quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    
    // Localhost simulation - show success message
    if (typeof window !== 'undefined') {
      // Simulate localStorage for cart persistence
      const updatedCart = [...cartItems];
      const existingItem = updatedCart.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        updatedCart.push({ product, quantity });
      }
      localStorage.setItem('pehchaan_cart', JSON.stringify(updatedCart));
      
      // Show success notification
      alert(`Added ${product.name} to cart! (Localhost simulation)`);
    }
    
    // TODO: Replace with Supabase integration
    // await supabase.from('cart_items').upsert({
    //   user_id: user.id,
    //   product_id: product.id,
    //   quantity: quantity
    // });
  };

  const handleLogin = (userData: {name: string, email: string, type: 'buyer' | 'seller'}) => {
    setUser(userData);
    setUserType(userData.type);
    setIsAuthenticated(true);
    
    // Simulate localStorage for localhost
    if (typeof window !== 'undefined') {
      localStorage.setItem('pehchaan_user', JSON.stringify(userData));
      localStorage.setItem('pehchaan_authenticated', 'true');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUserType(null);
    setIsAuthenticated(false);
    setCurrentPage('marketplace');
    
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pehchaan_user');
      localStorage.removeItem('pehchaan_authenticated');
    }
  };

  // Check for existing authentication on component mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('pehchaan_user');
      const isAuth = localStorage.getItem('pehchaan_authenticated');
      
      if (savedUser && isAuth === 'true') {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setUserType(userData.type);
        setIsAuthenticated(true);
      }
      
      // Load cart from localStorage (localhost simulation)
      const savedCart = localStorage.getItem('pehchaan_cart');
      if (savedCart) {
        try {
          const cartData = JSON.parse(savedCart);
          setCartItems(cartData);
        } catch (error) {
          console.log('Error loading cart from localStorage:', error);
        }
      }
      
      // TODO: Replace with Supabase integration
      // const { data: cartItems } = await supabase
      //   .from('cart_items')
      //   .select('*, products(*)')
      //   .eq('user_id', user.id);
    }
  }, []);

  // Calculate cart count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'marketplace':
        return (
          <MarketplacePage 
            onViewProduct={handleViewProduct}
            onAddToCart={handleAddToCart}
          />
        );
      case 'product':
        return selectedProduct ? (
          <ProductDetailPage 
            product={selectedProduct}
            onBack={() => setCurrentPage('marketplace')}
            onAddToCart={handleAddToCart}
          />
        ) : null;
      case 'checkout':
        return (
          <CheckoutPage 
            cartItems={cartItems}
            onBack={() => setCurrentPage('marketplace')}
          />
        );
      case 'seller-dashboard':
        return <SellerDashboardPage />;
      case 'buyer-profile':
        return <BuyerProfilePage />;
      case 'categories':
        return <CategoriesPage onViewProduct={handleViewProduct} onAddToCart={handleAddToCart} />;
      case 'about':
        return <AboutPage />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
        <MainAppLayout
          isAuthenticated={isAuthenticated}
          user={user}
          userType={userType}
          onLogin={handleLogin}
          onLogout={handleLogout}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          cartCount={cartCount}
        >
        {renderCurrentPage()}
      </MainAppLayout>
    </ThemeProvider>
  );
};

export default PehchaanApp;
//--- END: Main Pehchaan App Component ---//