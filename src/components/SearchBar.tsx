import React, { useState, useRef, useEffect } from 'react';
import { Search, Clock, TrendingUp } from 'lucide-react';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

const searchSuggestions = [
  { type: 'recent', text: 'Blue pottery vase', icon: Clock },
  { type: 'recent', text: 'Kashmir pashmina', icon: Clock },
  { type: 'trending', text: 'Brass diya set', icon: TrendingUp },
  { type: 'trending', text: 'Madhubani painting', icon: TrendingUp },
  { type: 'trending', text: 'Handwoven carpet', icon: TrendingUp },
];

const popularCategories = [
  'Pottery & Ceramics',
  'Textiles & Fabrics', 
  'Metalware',
  'Woodwork',
  'Paintings & Art',
  'Jewelry & Accessories'
];

export const SearchBar: React.FC<SearchBarProps> = ({ 
  className = '', 
  placeholder = 'Search for handicrafts, artisans, or categories...' 
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(searchSuggestions);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(searchSuggestions);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setShowSuggestions(false);
    console.log('Searching for:', searchQuery);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className="w-full pl-10 pr-4 py-2 border border-input rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          placeholder={placeholder}
        />
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 card-warm border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {query.length === 0 && (
            <>
              {/* Popular Categories */}
              <div className="p-3 border-b border-border">
                <h4 className="text-sm font-medium text-foreground mb-2">Popular Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {popularCategories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleSearch(category)}
                      className="px-3 py-1 text-xs bg-muted hover:bg-primary hover:text-primary-foreground rounded-full transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent & Trending */}
              <div className="p-3">
                <h4 className="text-sm font-medium text-foreground mb-2">Recent & Trending</h4>
                <div className="space-y-1">
                  {filteredSuggestions.map((suggestion, index) => {
                    const IconComponent = suggestion.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSearch(suggestion.text)}
                        className="w-full flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors text-left"
                      >
                        <IconComponent className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{suggestion.text}</span>
                        {suggestion.type === 'trending' && (
                          <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full ml-auto">
                            Trending
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {query.length > 0 && (
            <div className="p-3">
              <h4 className="text-sm font-medium text-foreground mb-2">
                Search suggestions for "{query}"
              </h4>
              {filteredSuggestions.length > 0 ? (
                <div className="space-y-1">
                  {filteredSuggestions.map((suggestion, index) => {
                    const IconComponent = suggestion.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSearch(suggestion.text)}
                        className="w-full flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors text-left"
                      >
                        <IconComponent className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{suggestion.text}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  No suggestions found. Try searching for categories or artisan names.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};