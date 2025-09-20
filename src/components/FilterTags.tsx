import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterTag {
  id: string;
  label: string;
  category: 'price' | 'style' | 'occasion' | 'material' | 'trending';
  count?: number;
}

const filterTags: FilterTag[] = [
  { id: 'newly-added', label: 'Newly Added', category: 'trending', count: 24 },
  { id: 'trending', label: 'Trending', category: 'trending', count: 18 },
  { id: 'premium', label: 'Premium Collection', category: 'style', count: 12 },
  { id: 'under-1000', label: 'Under ₹1,000', category: 'price', count: 45 },
  { id: 'under-5000', label: 'Under ₹5,000', category: 'price', count: 156 },
  { id: 'handwoven', label: 'Handwoven', category: 'material', count: 32 },
  { id: 'festival', label: 'Festival Special', category: 'occasion', count: 28 },
  { id: 'ceramic', label: 'Ceramic & Pottery', category: 'material', count: 67 },
  { id: 'brass', label: 'Brass & Metal', category: 'material', count: 89 },
  { id: 'wedding', label: 'Wedding Collection', category: 'occasion', count: 34 },
  { id: 'home-decor', label: 'Home Décor', category: 'style', count: 123 },
  { id: 'traditional', label: 'Traditional Art', category: 'style', count: 156 }
];

const categoryColors = {
  trending: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-primary-foreground',
  price: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-primary-foreground',
  style: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-primary-foreground',
  occasion: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-primary-foreground',
  material: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-primary-foreground'
};

interface FilterTagsProps {
  onTagSelect?: (tagId: string) => void;
  selectedTags?: string[];
}

export const FilterTags: React.FC<FilterTagsProps> = ({ 
  onTagSelect = () => {}, 
  selectedTags = [] 
}) => {
  const [showAllTags, setShowAllTags] = useState(false);
  
  const displayTags = showAllTags ? filterTags : filterTags.slice(0, 6);

  const handleTagClick = (tagId: string) => {
    onTagSelect(tagId);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Quick Filters</h3>
        {filterTags.length > 6 && (
          <button
            onClick={() => setShowAllTags(!showAllTags)}
            className="flex items-center space-x-1 text-sm text-primary hover:underline"
          >
            <span>{showAllTags ? 'Show Less' : 'Show More'}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${showAllTags ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {displayTags.map(tag => {
          const isSelected = selectedTags.includes(tag.id);
          const baseClasses = "px-3 py-1.5 rounded-full border text-sm font-medium transition-all duration-200 cursor-pointer";
          const colorClasses = isSelected 
            ? "bg-primary text-primary-foreground border-primary shadow-sm" 
            : categoryColors[tag.category];
          
          return (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag.id)}
              className={`${baseClasses} ${colorClasses} hover:shadow-md active:scale-95`}
            >
              <span>{tag.label}</span>
              {tag.count && (
                <span className={`ml-1 text-xs ${isSelected ? 'opacity-80' : 'opacity-60'}`}>
                  ({tag.count})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Category Legend */}
      {showAllTags && (
        <div className="text-xs text-muted-foreground">
          <div className="flex flex-wrap gap-4 mt-2 pt-2 border-t border-border">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-1"></span>
              All Categories
            </span>
          </div>
        </div>
      )}
    </div>
  );
};