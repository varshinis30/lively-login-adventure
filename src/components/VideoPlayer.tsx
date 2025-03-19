
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
}

export const VideoPlayer = ({ src }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      const updateProgress = () => {
        if (videoElement.duration) {
          setProgress((videoElement.currentTime / videoElement.duration) * 100);
        }
      };
      
      videoElement.addEventListener('timeupdate', updateProgress);
      videoElement.addEventListener('loadeddata', () => setIsLoaded(true));
      
      return () => {
        videoElement.removeEventListener('timeupdate', updateProgress);
        videoElement.removeEventListener('loadeddata', () => setIsLoaded(true));
      };
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && videoRef.current.duration) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden glass animate-scale-up shadow-xl">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      
      <video 
        ref={videoRef}
        className="w-full rounded-2xl aspect-video object-cover"
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 opacity-80 hover:opacity-100">
        {/* Progress bar */}
        <div 
          className="w-full h-1 bg-white/20 rounded-full cursor-pointer mb-3"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-primary rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              size="icon" 
              variant="ghost" 
              className="text-white hover:bg-white/20 h-8 w-8" 
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </Button>
            
            <Button 
              size="icon" 
              variant="ghost" 
              className="text-white hover:bg-white/20 h-8 w-8" 
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
