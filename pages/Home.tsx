import React, { useState, useMemo } from 'react';
import FilterBar from '../components/FilterBar';
import ToolCard from '../components/ToolCard';
import { AI_TOOLS } from '../constants';
import { FilterState } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    query: '',
    category: 'All',
    pricing: 'All',
    sortBy: 'popular',
  });

  const filteredTools = useMemo(() => {
    let tools = [...AI_TOOLS];

    if (filters.query) {
      const q = filters.query.toLowerCase();
      tools = tools.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.shortDescription.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    if (filters.category !== 'All') {
      tools = tools.filter(t => t.category === filters.category);
    }

    if (filters.pricing !== 'All') {
      tools = tools.filter(t => t.pricing === filters.pricing);
    }

    tools.sort((a, b) => {
      if (filters.sortBy === 'popular') return b.rating - a.rating; 
      if (filters.sortBy === 'newest') return new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime();
      if (filters.sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

    return tools;
  }, [filters]);

  return (
    <>
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 z-0">
             <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
             <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
             <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-secondary mb-6 animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium text-secondary-foreground">Updated daily with new tools</span>
            </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
            Discover the Future of <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">
              Artificial Intelligence
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Curating the best AI tools to supercharge your workflow. From coding assistants to generative art, find exactly what you need.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button 
                onClick={() => {
                   const filterBar = document.getElementById('filter-bar');
                   filterBar?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Explore Directory
            </button>
            <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-input bg-background font-semibold hover:bg-muted transition-colors">
               Submit a Tool <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </section>

      <div id="filter-bar">
         <FilterBar filters={filters} setFilters={setFilters} />
      </div>

      <section className="py-12 bg-muted/20 min-h-[600px]">
        <div className="container mx-auto px-4">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {filteredTools.length} {filteredTools.length === 1 ? 'Result' : 'Results'}
            </h2>
            <span className="text-sm text-muted-foreground">
                Showing {filters.category === 'All' ? 'all' : filters.category} tools
            </span>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-card rounded-xl border border-dashed border-border">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No tools found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find any tools matching your filters. Try adjusting your search query or categories.
              </p>
              <button 
                onClick={() => setFilters({ query: '', category: 'All', pricing: 'All', sortBy: 'popular' })}
                className="mt-6 text-primary hover:underline font-medium"
            >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;