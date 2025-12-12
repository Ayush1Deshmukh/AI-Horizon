import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Globe, Calendar, Tag, Share2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AI_TOOLS } from '../constants';

const ToolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tool = AI_TOOLS.find(t => t.id === id);

  if (!tool) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Tool not found</h2>
        <Link to="/" className="text-primary hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="border-b border-border bg-muted/10">
        <div className="container mx-auto px-4 py-4">
            <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Directory
            </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-8">
                
                <div>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                         <span className="px-3 py-1 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20">
                            {tool.category}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-secondary text-secondary-foreground border border-border">
                            {tool.pricing}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{tool.name}</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">{tool.shortDescription}</p>
                </div>

                <div className="rounded-2xl overflow-hidden border border-border shadow-2xl bg-muted aspect-video relative group">
                    <img src={tool.imageUrl} alt={tool.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <a 
                            href={tool.websiteUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-white text-black font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        >
                            Visit Website
                        </a>
                    </div>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <h3 className="text-2xl font-bold mb-4">About {tool.name}</h3>
                    <p className="text-muted-foreground">{tool.fullDescription}</p>
                    
                    <h4 className="text-xl font-semibold mt-8 mb-4">Key Features</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 not-prose">
                        {[1,2,3,4].map((i) => (
                            <li key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card/50">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                                <span className="text-sm">Feature description placeholder {i} that highlights value.</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm sticky top-24">
                    <a 
                        href={tool.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 py-3.5 rounded-lg font-bold text-lg transition-all shadow-lg shadow-primary/20 mb-6"
                    >
                        Visit Website <ExternalLink className="w-5 h-5" />
                    </a>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-border">
                            <span className="text-muted-foreground flex items-center gap-2"><Globe className="w-4 h-4" /> Website</span>
                            <span className="font-medium truncate max-w-[150px]">{new URL(tool.websiteUrl).hostname}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border">
                            <span className="text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4" /> Launch Date</span>
                            <span className="font-medium">{new Date(tool.launchDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border">
                             <span className="text-muted-foreground flex items-center gap-2"><Tag className="w-4 h-4" /> Category</span>
                             <span className="font-medium">{tool.category}</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h4 className="font-semibold mb-3 text-sm uppercase text-muted-foreground">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                            {tool.tags.map(tag => (
                                <span key={tag} className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs rounded-md font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border">
                         <button className="w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                            <Share2 className="w-4 h-4" /> Share this tool
                         </button>
                    </div>
                </div>

                <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 flex gap-3 items-start">
                    <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-semibold text-sm text-blue-700 dark:text-blue-300">Verified Listing</h4>
                        <p className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-1">This tool has been vetted by our team for functionality and safety.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetail;