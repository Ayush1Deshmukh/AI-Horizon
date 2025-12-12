import React from 'react';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { CATEGORIES, PRICING_OPTIONS } from '../constants';
import { FilterState } from '../types';
import { cn } from '../utils/cn';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters }) => {
  const [showFilters, setShowFilters] = React.useState(false);
  const [localQuery, setLocalQuery] = React.useState(filters.query);

  React.useEffect(() => {
    setLocalQuery(filters.query);
  }, [filters.query]);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setFilters(prev => {
        if (prev.query !== localQuery) {
          return { ...prev, query: localQuery };
        }
        return prev;
      });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [localQuery, setFilters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  const handleCategoryChange = (cat: string) => {
    setFilters(prev => ({ ...prev, category: cat }));
  };
  
  const handlePricingChange = (price: string) => {
    setFilters(prev => ({ ...prev, pricing: price }));
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
     setFilters(prev => ({ ...prev, sortBy: e.target.value as any }));
  };

  const clearFilters = () => {
      setFilters({
          query: '',
          category: 'All',
          pricing: 'All',
          sortBy: 'popular'
      });
      setLocalQuery('');
  };

  const hasActiveFilters = localQuery || filters.category !== 'All' || filters.pricing !== 'All';

  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 py-4 border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tools, categories, or tags..."
              value={localQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-secondary/30 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm outline-none"
            />
          </div>

          <div className="hidden md:flex items-center gap-3">
             <div className="relative group">
                <select 
                    value={filters.category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-input bg-background text-sm font-medium hover:border-primary focus:outline-none cursor-pointer transition-colors"
                >
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
             </div>

             <div className="relative group">
                <select 
                    value={filters.pricing}
                    onChange={(e) => handlePricingChange(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-input bg-background text-sm font-medium hover:border-primary focus:outline-none cursor-pointer transition-colors"
                >
                     {PRICING_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
             </div>

            <div className="h-6 w-px bg-border mx-1"></div>

             <div className="relative group">
                <select 
                    value={filters.sortBy}
                    onChange={handleSortChange}
                    className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-input bg-background text-sm font-medium hover:border-primary focus:outline-none cursor-pointer transition-colors"
                >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest</option>
                    <option value="name">Name (A-Z)</option>
                </select>
                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
             </div>

             {hasActiveFilters && (
                 <button 
                    onClick={clearFilters}
                    className="p-2.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    title="Clear Filters"
                >
                    <X className="w-4 h-4" />
                 </button>
             )}
          </div>

          <button 
            className="md:hidden w-full flex items-center justify-center gap-2 py-2.5 border border-input rounded-lg font-medium text-sm hover:bg-muted"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters & Sort
          </button>
        </div>

        {showFilters && (
          <div className="md:hidden mt-4 grid grid-cols-2 gap-3 animate-slide-up">
             <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Category</label>
                <select 
                    value={filters.category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full p-2 rounded-md border border-input bg-background text-sm"
                >
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
             </div>
             <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Pricing</label>
                <select 
                    value={filters.pricing}
                    onChange={(e) => handlePricingChange(e.target.value)}
                    className="w-full p-2 rounded-md border border-input bg-background text-sm"
                >
                    {PRICING_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
             </div>
             <div className="flex flex-col gap-1 col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Sort By</label>
                <select 
                    value={filters.sortBy}
                    onChange={handleSortChange}
                    className="w-full p-2 rounded-md border border-input bg-background text-sm"
                >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest</option>
                    <option value="name">Name (A-Z)</option>
                </select>
             </div>
             {hasActiveFilters && (
                 <button 
                    onClick={clearFilters}
                    className="col-span-2 py-2 text-sm text-destructive font-medium border border-destructive/20 rounded-md hover:bg-destructive/10"
                >
                    Reset All Filters
                 </button>
             )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;