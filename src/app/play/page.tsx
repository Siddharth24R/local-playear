"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Icons } from "@/components/icons";

function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default function Play() {
  const searchParams = useSearchParams();
  const videoPath = searchParams.get('video') || '';
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setProgress(videoRef.current.currentTime / videoRef.current.duration);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };


  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = parseFloat(e.target.value) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(newTime / videoRef.current.duration);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (!isFullScreen) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        } else if ((videoRef.current as any).mozRequestFullScreen) {
          (videoRef.current as any).mozRequestFullScreen();
        } else if ((videoRef.current as any).webkitRequestFullscreen) {
          (videoRef.current as any).webkitRequestFullscreen();
        } else if ((videoRef.current as any).msRequestFullscreen) {
          (videoRef.current as any).msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
      }
      setIsFullScreen(!isFullScreen);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="bg-video-player min-h-screen flex flex-col items-center justify-center p-4">
      <video
        ref={videoRef}
        src={`${VIDEO_FOLDER_PATH}/${videoPath}`}
        className="w-full max-w-4xl rounded-md shadow-lg"
        controls={false}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <div className="w-full max-w-4xl mt-4 flex flex-col">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={progress}
          onChange={handleProgressChange}
          className="w-full"
        />
        <div className="flex justify-between items-center text-sm text-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-2">
            <button onClick={togglePlay} className="p-2 rounded-full hover:bg-secondary">
              {isPlaying ? <Icons.pause /> : <Icons.play />}
            </button>
            <button onClick={toggleMute} className="p-2 rounded-full hover:bg-secondary">
              {isMuted ? <Icons.volumeMute /> : (volume > 0.5 ? <Icons.volume2 /> : <Icons.volume1 />)}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={playbackRate}
              onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
              className="bg-secondary text-foreground rounded p-1"
            >
              <option value="0.5">0.5x</option>
              <option value="1">1x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
            <button onClick={toggleFullScreen} className="p-2 rounded-full hover:bg-secondary">
              {isFullScreen ? <Icons.minimize2 /> : <Icons.maximize2 />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
