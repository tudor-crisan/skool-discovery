'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function HarvestDetail() {
  const params = useParams();
  const [harvest, setHarvest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/harvests/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setHarvest(data);
          const groupName = data.data?.props?.pageProps?.currentGroup?.metadata?.displayName || 
                            data.data?.props?.pageProps?.allGroups?.[0]?.metadata?.displayName;
          if (groupName) {
            document.title = `${groupName} | skool`;
          }
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading) return <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center text-blue-600 font-bold">HYDRATING INTEL...</div>;
  if (!harvest) return <div className="min-h-screen bg-[#F7F7F7] p-20 text-center">Harvest not found</div>;

  const group = harvest.data?.props?.pageProps?.currentGroup || harvest.data?.props?.pageProps?.allGroups?.[0];
  const owner = group?.metadata?.owner ? JSON.parse(group.metadata.owner) : null;
  const levels = group?.metadata?.levels ? JSON.parse(group.metadata.levels).levels : [];
  const posts = harvest.data?.props?.pageProps?.feed?.posts || 
                harvest.data?.props?.pageProps?.initialState?.groupFeed?.posts ||
                harvest.domPosts || [];

  return (
    <main className="min-h-screen bg-[#F7F7F7] text-[#1a1a1a] font-sans pb-20">
      {/* Skool-style Header */}
      <div className="bg-white border-b border-[#e5e5e5] px-8 py-3 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center font-black text-3xl tracking-tighter">
            <span style={{ color: '#2929FF' }}>s</span>
            <span style={{ color: '#D1432A' }}>k</span>
            <span style={{ color: '#D9A75B' }}>o</span>
            <span style={{ color: '#6DBBEE' }}>o</span>
            <span style={{ color: '#C14B3A' }}>l</span>
            <div className="ml-2 flex flex-col -gap-1 text-slate-300">
               <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M5 10l5-5 5 5H5z"></path></svg>
               <svg className="w-3 h-3 rotate-180" fill="currentColor" viewBox="0 0 20 20"><path d="M5 10l5-5 5 5H5z"></path></svg>
            </div>
          </Link>
          <div className="w-[1px] h-6 bg-[#e5e5e5]"></div>
          <div className="flex items-center gap-2">
            <img src={group?.metadata?.logoUrl || group?.metadata?.logo_url} className="w-6 h-6 rounded border" />
            <span className="font-bold text-base">{group?.metadata?.displayName || group?.metadata?.display_name}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-tighter">Capture: {new Date(harvest.timestamp).toLocaleDateString()}</div>
        </div>
      </div>

      {/* Hero / Cover */}
      <div className="h-48 relative overflow-hidden bg-slate-200">
        <img 
          src={group?.metadata?.coverSmallUrl || group?.metadata?.cover_small_url} 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F7F7] to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-8 -mt-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content (Feed) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Tabs */}
          <div className="flex gap-8 border-b border-[#e5e5e5] mb-6">
            <button className="pb-3 border-b-2 border-blue-600 font-bold text-sm">Community</button>
            <button className="pb-3 text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors">Classroom</button>
            <button className="pb-3 text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors">Calendar</button>
            <button className="pb-3 text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors">Members</button>
          </div>

          {/* Post Filter Mock */}
          <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
            <button className="px-4 py-1.5 bg-slate-800 text-white rounded-full text-xs font-bold">All</button>
            {['General discussion', 'Testimonials', 'Q&A', 'Wins'].map(cat => (
              <button key={cat} className="px-4 py-1.5 bg-white border border-[#e5e5e5] rounded-full text-xs font-bold text-slate-600 whitespace-nowrap">{cat}</button>
            ))}
          </div>

          {/* Feed */}
          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="bg-white p-12 rounded-xl border border-[#e5e5e5] text-center text-slate-400">
                <p className="font-bold">No posts captured in this harvest.</p>
                <p className="text-sm">Try crawling more pages to get deeper intel.</p>
              </div>
            ) : posts.map((post: any, i: number) => (
              <div key={post.id || i} className="bg-white p-6 rounded-xl border border-[#e5e5e5] hover:border-slate-300 transition-all shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-[#e5e5e5]">
                    {post.user_picture && <img src={post.user_picture} className="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold flex items-center gap-2">
                      {post.user_name}
                      {post.user_role === 'admin' && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-black border border-emerald-200 uppercase tracking-tighter">Admin</span>}
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Level {post.user_level || '1'} • {post.category || 'General'}</div>
                  </div>
                </div>
                <h3 className="text-xl font-extrabold mb-3 tracking-tight text-[#1a1a1a]">{post.title}</h3>
                <p className="text-[#4a4a4a] text-[15px] leading-relaxed line-clamp-4 whitespace-pre-wrap">
                  {post.content_plain}
                </p>
                <div className="mt-6 pt-4 border-t border-[#f2f2f2] flex items-center gap-6">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.704a2 2 0 011.94 2.515l-1.203 4.812A2 2 0 0117.5 19H12.5m-4.5 0H3.5A1.5 1.5 0 012 17.5v-9A1.5 1.5 0 013.5 7H8m0 12v-9m0 0l4.582-4.582a2.353 2.353 0 013.328 0 2.353 2.353 0 010 3.328L12.5 10H8"></path></svg>
                    {post.likes_count}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    {post.comments_count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6 pt-12">
          
          {/* Group Stats Sidebar */}
          <div className="bg-white p-6 rounded-xl border border-[#e5e5e5] shadow-sm">
             <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Group Intel</h2>
             <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-600">Total Members</span>
                  <span className="text-sm font-black text-blue-600">{(group?.metadata?.totalMembers || group?.metadata?.total_members)?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-600">Online Now</span>
                  <span className="text-sm font-black text-emerald-500">{(group?.metadata?.totalOnlineMembers || group?.metadata?.total_online_members)?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-600">Posts Total</span>
                  <span className="text-sm font-black">{(group?.metadata?.totalPosts || group?.metadata?.total_posts)?.toLocaleString()}</span>
                </div>
             </div>
          </div>

          {/* Owner Card */}
          <div className="bg-white p-6 rounded-xl border border-[#e5e5e5] shadow-sm text-center">
             <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 text-left">Founder</h2>
             <img src={owner?.metadata?.picture_profile || owner?.metadata?.pictureProfile} className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-blue-600 p-1" />
             <h3 className="font-bold text-lg">{owner?.first_name || owner?.firstName} {owner?.last_name || owner?.lastName}</h3>
             <p className="text-blue-600 text-xs font-bold uppercase mb-4 tracking-tighter">@{owner?.name}</p>
             <p className="text-sm text-slate-500 leading-relaxed px-2 font-medium italic">"{owner?.metadata?.bio}"</p>
          </div>

          {/* Leaderboard Card */}
          <div className="bg-white p-6 rounded-xl border border-[#e5e5e5] shadow-sm">
             <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Leaderboard</h2>
             <div className="space-y-4">
                {levels.slice(0, 5).map((level: any) => (
                  <div key={level.number} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-black text-xs text-slate-500 border border-[#e5e5e5]">
                      {level.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate">{level.title || level.name}</div>
                      <div className="w-full h-1 bg-slate-100 rounded-full mt-1">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${level.percent_of_members}%` }}></div>
                      </div>
                    </div>
                    <div className="text-[10px] font-black text-slate-400">{level.percent_of_members}%</div>
                  </div>
                ))}
             </div>
          </div>

        </div>

      </div>
    </main>
  );
}
