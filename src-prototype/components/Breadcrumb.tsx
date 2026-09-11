import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { PageRoute } from '../types';

interface BreadcrumbProps {
  items: { label: string; route?: PageRoute }[];
  onNavigate: (route: PageRoute) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onNavigate }) => {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-400 py-3 mb-4 overflow-x-auto whitespace-nowrap">
      <button 
        onClick={() => onNavigate('/')} 
        className="flex items-center gap-1 hover:text-white transition-colors"
      >
        <Home className="w-3.5 h-3.5 text-slate-400" />
        <span>Início</span>
      </button>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
          {item.route ? (
            <button
              onClick={() => onNavigate(item.route!)}
              className="hover:text-white transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-[#E5C05B] font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
