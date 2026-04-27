'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Harvest {
  id: string;
  name: string;
  timestamp: string;
  groupName: string;
  url: string;
}

export default function Home() {
  const [harvests, setHarvests] = useState<Harvest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All Harvests');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/harvests')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.harvests)) {
          setHarvests(data.harvests);
        } else if (Array.isArray(data)) {
          setHarvests(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setHarvests([]);
        setLoading(false);
      });
  }, []);

  const filteredHarvests = harvests.filter(h => {
    // Filter by Search
    const matchesSearch = h.groupName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          h.url.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by Category
    const matchesCategory = activeCategory === 'All Harvests' || (() => {
      const cat = activeCategory.split(' ')[1]?.toLowerCase();
      return h.groupName.toLowerCase().includes(cat) || h.url.toLowerCase().includes(cat);
    })();

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#F7F7F7] text-[#1a1a1a] pb-20 font-sans">
      {/* Skool Clean Header */}
      <div className="bg-white border-b border-[#e5e5e5] px-8 py-3 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="flex items-center font-black text-3xl tracking-tighter">
            <span style={{ color: '#2929FF' }}>s</span>
            <span style={{ color: '#D1432A' }}>k</span>
            <span style={{ color: '#D9A75B' }}>o</span>
            <span style={{ color: '#6DBBEE' }}>o</span>
            <span style={{ color: '#C14B3A' }}>l</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Collector Active</span>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-4xl mx-auto pt-16 pb-12 text-center px-4">
        <h1 className="text-6xl font-black mb-4 tracking-tight">Discover niches</h1>
        <p className="text-xl text-slate-400 mb-10 font-medium">"The riches are in the niches"</p>
        
        <div className="relative group max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input 
            type="text" 
            placeholder="Search for harvested groups..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#e5e5e5] rounded-xl py-4 pl-16 pr-6 text-lg focus:outline-none focus:ring-2 focus:ring-blue-600/5 focus:border-blue-600 shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Categories / Niche Navigation */}
      <div className="flex justify-center gap-3 mb-12 px-4 overflow-x-auto no-scrollbar">
        {['All Harvests', '💰 Money', '🏠 Real Estate', '🚀 Marketing', '📈 Growth', '🎨 Creative'].map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all border ${
              activeCategory === cat 
              ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-lg' 
              : 'bg-white border-[#e5e5e5] text-[#1a1a1a] hover:border-slate-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full py-20 text-center text-slate-300 font-black animate-pulse uppercase tracking-widest text-sm">Hydrating intelligence...</div>
        ) : filteredHarvests.length === 0 ? (
          <div className="col-span-full py-24 text-center border-2 border-dashed border-[#e5e5e5] rounded-[32px] bg-white/50">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-slate-400 font-bold">No niches found for "{activeCategory}"</p>
            <p className="text-slate-300 text-sm mt-1 font-medium">Use the extension to capture data for this category.</p>
          </div>
        ) : filteredHarvests.map((h, i) => (
          <Link href={`/harvests/${h.id}`} key={h.id} className="group bg-white rounded-[24px] overflow-hidden border border-[#e5e5e5] hover:border-blue-600/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="relative h-56 bg-slate-100 overflow-hidden">
               <div className="absolute top-4 left-4 z-10 bg-black/40 text-white text-[10px] font-black px-2.5 py-1 rounded-md backdrop-blur-md">#{i+1}</div>
               <div className="w-full h-full bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center text-blue-100/50">
                 <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
               </div>
            </div>
            <div className="p-7">
               <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 bg-[#2929FF] rounded-[12px] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/20">{h.groupName?.[0]}</div>
                 <div>
                   <h3 className="font-extrabold text-xl leading-tight group-hover:text-[#2929FF] transition-colors">{h.groupName}</h3>
                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{new Date(h.timestamp).toLocaleDateString()}</p>
                 </div>
               </div>
               <p className="text-slate-500 text-[14px] line-clamp-2 leading-relaxed mb-8 font-medium italic">Intel harvest from {h.groupName}. Analyzed for authority levels and post engagement.</p>
               <div className="flex items-center justify-between">
                 <span className="text-[#2929FF] text-xs font-black uppercase tracking-tighter group-hover:gap-2 transition-all flex items-center gap-1">Analyze Intel <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg></span>
               </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
