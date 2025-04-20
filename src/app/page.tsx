"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation';

const VIDEO_FOLDER_PATH = '/videos';

async function listVideos() {
  try {
    const response = await fetch(`${VIDEO_FOLDER_PATH}/list`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.videos;
  } catch (error) {
    console.error("Failed to list videos:", error);
    return [];
  }
}

export default function Home() {
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loadVideos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const videoList = await listVideos();
      setVideos(videoList);
    } catch (e: any) {
      setError(e.message || "Failed to load videos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  const handleVideoClick = (videoPath: string) => {
    router.push(`/play?video=${encodeURIComponent(videoPath)}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-loader border-opacity-50"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-info-card rounded-md p-4 text-error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4 text-foreground">Local Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((videoPath) => (
          <div
            key={videoPath}
            className="relative bg-clip-thumbnail rounded-md overflow-hidden shadow-md cursor-pointer border border-dark-border"
            onClick={() => handleVideoClick(videoPath)}
          >
            <img
              src={`https://picsum.photos/300/200?random=${videoPath}`}
              alt={videoPath}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-slate-gray bg-opacity-75 p-2 text-white">
              <h3 className="text-sm font-semibold truncate">{videoPath.split('/').pop()}</h3>
              <p className="text-xs text-light-gray-blue">Click to play</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
