"use client";

import { useVideos } from "@/hooks/useVideos";

function getYouTubeId(url: string): string | null {
  const patterns = [/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function MediaPage() {
  const { data: videos, isLoading } = useVideos();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Galeri Video</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Video edukasi interaktif seputar zakat, keuangan syariah, dan kegiatan IZI.</p>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500">Memuat video...</div>
      ) : videos?.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Belum ada video</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos?.map((video) => {
            const ytId = getYouTubeId(video.youtubeUrl);
            return (
              <div key={video.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {ytId ? (
                  <div className="aspect-video">
                    <iframe src={`https://www.youtube.com/embed/${ytId}`} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-100 flex items-center justify-center text-gray-400">Video tidak tersedia</div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{video.title}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(video.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
