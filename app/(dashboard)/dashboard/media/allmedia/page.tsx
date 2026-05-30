'use client';
import { useEffect, useState, useCallback } from 'react';
import type { MediaFile } from '@/app/api/media/route';

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

type Filter = 'all' | 'image' | 'video' | 'file';

export default function MediaGallery() {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/media');
    const data = await res.json();
    setMedia(data.media ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchMedia(); }, [fetchMedia]);

  const copyUrl = async (url: string) => {
    const full = `${window.location.origin}${url}`;
    await navigator.clipboard.writeText(full);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const filtered = media.filter((m) => {
    const matchFilter = filter === 'all' || m.type === filter;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const counts = {
    all: media.length,
    image: media.filter((m) => m.type === 'image').length,
    video: media.filter((m) => m.type === 'video').length,
    file: media.filter((m) => m.type === 'file').length,
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Media Library</h1>
          <p className="text-sm text-gray-500 mt-1">{media.length} files uploaded</p>
        </div>
        <button
          onClick={fetchMedia}
          className="flex items-center gap-2 text-sm text-gray-600 border border-gray-200
                     px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <RefreshIcon />
          Refresh
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search files..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {(['all', 'image', 'video', 'file'] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors
              ${filter === f
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            <span className={`ml-1.5 text-xs ${filter === f ? 'text-blue-100' : 'text-gray-400'}`}>
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <EmptyIcon />
          <p className="mt-3 text-sm">No files found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((file) => (
            <div
              key={file.url}
              className="group relative rounded-xl border border-gray-200 overflow-hidden
                         bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              {/* Preview */}
              <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                {file.type === 'image' ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : file.type === 'video' ? (
                  <video
                    src={file.url}
                    className="w-full h-full object-cover"
                    muted
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <FileIcon />
                    <span className="text-xs uppercase font-medium">
                      {file.name.split('.').pop()}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="text-xs font-medium text-gray-800 truncate" title={file.name}>
                  {file.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {formatBytes(file.size)} · {formatDate(file.uploadedAt)}
                </p>
              </div>

              {/* Copy Button */}
              <button
                onClick={() => copyUrl(file.url)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100
                           bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg
                           px-2.5 py-1.5 text-xs font-medium text-gray-700
                           hover:bg-white hover:border-gray-300 transition-all duration-150
                           flex items-center gap-1.5 shadow-sm"
              >
                {copiedUrl === file.url ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-3.5 h-3.5" />
                    Copy URL
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Icons
const CopyIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);
const CheckIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const SearchIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
  </svg>
);
const FileIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);
const RefreshIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);
const EmptyIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);