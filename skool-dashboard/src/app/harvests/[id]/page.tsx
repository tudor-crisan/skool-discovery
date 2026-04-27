'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HarvestDetail() {
  const params = useParams();
  const router = useRouter();
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

  const handleDelete = async () => {
    if (confirm('Delete this entire niche intelligence?')) {
      const res = await fetch(`/api/harvests/${params.id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/');
      }
    }
  };

  if (loading) return <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center text-[#2929FF] font-black tracking-widest animate-pulse text-sm">HYDRATING NICHE INTEL...</div>;
  if (!harvest) return <div className="min-h-screen bg-[#F7F7F7] p-20 text-center font-bold">Intelligence file not found.</div>;

  const group = harvest.data?.props?.pageProps?.currentGroup || harvest.data?.props?.pageProps?.allGroups?.[0];
  const owner = group?.metadata?.owner ? (typeof group.metadata.owner === 'string' ? JSON.parse(group.metadata.owner) : group.metadata.owner) : null;
  const posts = harvest.domPosts || [];

  return (
    <main className="min-h-screen bg-[#F7F7F7] text-[#1a1a1a] font-sans pb-20">
      {/* Header */}
      <div className="bg-white border-b border-[#e5e5e5] px-8 py-3 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center font-black text-3xl tracking-tighter">
            <span style={{ color: '#2929FF' }}>s</span>
            <span style={{ color: '#D1432A' }}>k</span>
            <span style={{ color: '#D9A75B' }}>o</span>
            <span style={{ color: '#6DBBEE' }}>o</span>
            <span style={{ color: '#C14B3A' }}>l</span>
          </Link>
          <div className="w-[1px] h-6 bg-[#e5e5e5]"></div>
          <div className="flex items-center gap-2">
            {group?.metadata?.logoUrl && <img src={group.metadata.logoUrl} className="w-6 h-6 rounded border" />}
            <span className="font-extrabold text-lg">{group?.metadata?.displayName || group?.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleDelete}
            className="text-slate-300 hover:text-red-500 transition-colors p-2"
            title="Delete Intelligence"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
          <div className="text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">
            Last Capture: {new Date(harvest.timestamp).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">
        
        {/* Discussion Analysis Feed */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-6">
             <div>
               <h2 className="text-3xl font-black tracking-tight text-slate-800">Niche Discussions</h2>
               <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Analyzing {posts.length} captured threads</p>
             </div>
             <div className="flex gap-2">
               <span className="px-4 py-1.5 bg-[#f7d37c] text-[#1a1a1a] rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">Intelligence Active</span>
             </div>
          </div>

          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="bg-white p-20 rounded-[32px] border border-[#e5e5e5] text-center shadow-sm">
                <div className="text-5xl mb-4">🌪️</div>
                <p className="text-slate-400 font-black uppercase text-sm tracking-widest">No discussions captured yet.</p>
                <p className="text-slate-300 text-sm mt-2">Try crawling more pages with the extension.</p>
              </div>
            ) : posts.map((post: any, i: number) => (
              <div key={post.id || i} className="bg-white p-10 rounded-[32px] border border-[#e5e5e5] hover:border-[#f7d37c]/50 transition-all shadow-sm group">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border border-[#e5e5e5] overflow-hidden shadow-inner">
                    {post.user_picture && <img src={post.user_picture} className="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <div className="text-sm font-black flex items-center gap-2">
                      {post.user_name}
                      {post.user_role === 'admin' && <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-black border border-emerald-200 uppercase">Admin</span>}
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Level {post.user_level || '1'} • {post.category || 'General'}</div>
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-5 tracking-tight leading-tight group-hover:text-[#2929FF] transition-colors">{post.title}</h3>
                <p className="text-[#4a4a4a] text-base leading-relaxed line-clamp-6 whitespace-pre-wrap font-medium">
                  {post.content_plain || post.description}
                </p>
                <div className="mt-10 pt-8 border-t border-[#f8f8f8] flex items-center gap-10">
                  <div className="flex items-center gap-2.5 text-slate-500 text-xs font-black">
                    <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.704a2 2 0 011.94 2.515l-1.203 4.812A2 2 0 0117.5 19H12.5m-4.5 0H3.5A1.5 1.5 0 012 17.5v-9A1.5 1.5 0 013.5 7H8m0 12v-9m0 0l4.582-4.582a2.353 2.353 0 013.328 0 2.353 2.353 0 010 3.328L12.5 10H8"></path></svg>
                    {post.likes_count}
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-500 text-xs font-black">
                    <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    {post.comments_count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white p-8 rounded-[32px] border border-[#e5e5e5] shadow-sm">
             <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 border-b pb-4">Niche Stats</h2>
             <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-600">Total Members</span>
                  <span className="text-lg font-black text-[#2929FF]">{(group?.metadata?.totalMembers || group?.metadata?.total_members)?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-600">Online Now</span>
                  <span className="text-lg font-black text-emerald-500">{(group?.metadata?.totalOnlineMembers || group?.metadata?.total_online_members)?.toLocaleString()}</span>
                </div>
             </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-[#e5e5e5] shadow-sm text-center">
             <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 text-left border-b pb-4">Niche Founder</h2>
             <div className="relative inline-block mb-6">
                <img src={owner?.metadata?.picture_profile || owner?.metadata?.pictureProfile || owner?.picture_profile} className="w-24 h-24 rounded-full border-4 border-white shadow-2xl" />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#2929FF] rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                   <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"></path></svg>
                </div>
             </div>
             <h3 className="font-black text-xl tracking-tight leading-tight">{owner?.first_name || owner?.firstName} {owner?.last_name || owner?.lastName}</h3>
             <p className="text-[#2929FF] text-[10px] font-black uppercase mt-1 tracking-[0.1em]">@{owner?.name || owner?.handle}</p>
             <p className="text-sm text-slate-500 leading-relaxed mt-6 font-medium italic border-t pt-8">"{owner?.metadata?.bio || owner?.bio}"</p>
          </div>

        </div>

      </div>
    </main>
  );
}
