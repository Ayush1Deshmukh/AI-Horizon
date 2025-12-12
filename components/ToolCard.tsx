import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Star, Tag } from 'lucide-react';
import { AITool } from '../types';
import { cn } from '../utils/cn';

interface ToolCardProps {
  tool: AITool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div className="group relative flex flex-col bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <img 
          src={tool.imageUrl} 
          alt={tool.name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
            <span className={cn(
                "px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm border",
                tool.pricing === 'Free' ? "bg-green-500/10 text-green-600 border-green-200 dark:border-green-800" :
                tool.pricing === 'Paid' ? "bg-red-500/10 text-red-600 border-red-200 dark:border-red-800" :
                "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800"
            )}>
                {tool.pricing}
            </span>
             {tool.featured && (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 border border-amber-200 dark:border-amber-800 backdrop-blur-md shadow-sm">
                    Featured
                </span>
            )}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/tool/${tool.id}`} className="hover:text-primary transition-colors">
            <h3 className="font-bold text-lg leading-tight">{tool.name}</h3>
          </Link>
          <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{tool.rating}</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
          {tool.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
            {tool.tags.slice(0, 3).map(tag => (
                <span key={tag} className="flex items-center text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                   <Tag className="w-3 h-3 mr-1 opacity-50"/> {tag}
                </span>
            ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
            <span className="text-xs font-medium text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                {tool.category}
            </span>
            <Link 
                to={`/tool/${tool.id}`}
                className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 group/link"
            >
                View Details 
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;