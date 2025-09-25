import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface Song {
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  previewUrl: string;
}

interface MonthCardProps {
  month: string;
  song: Song;
  isActive: boolean;
  onActivate: () => void;
  autoPlay?: boolean;
}

const MonthCard = ({ month, song, isActive, onActivate, autoPlay = false }: MonthCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedData = () => setIsLoaded(true);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (isActive && autoPlay && isLoaded) {
      handlePlay();
    } else if (!isActive) {
      handlePause();
    }
  }, [isActive, autoPlay, isLoaded]);

  const handlePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.log('Audio play failed:', error);
    }
  };

  const handlePause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  return (
    <div 
      className={`
        relative group cursor-pointer transition-all duration-500 ease-out h-full
        ${isActive ? 'scale-105 z-10' : 'scale-95 hover:scale-100 opacity-70 hover:opacity-90'}
      `}
      onClick={onActivate}
    >
      <div className={`
        glassmorphism gradient-card rounded-xl p-4 h-full
        transition-all duration-500 ease-out
        ${isActive ? 'glow-primary animate-pulse-glow opacity-100' : 'glow-hover'}
        w-full max-w-none
      `}>
        {/* Album Cover */}
        <div className="relative overflow-hidden rounded-lg mb-4">
          <img 
            src={song.coverUrl} 
            alt={`${song.album} by ${song.artist}`}
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Play/Pause Button Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-primary/80 hover:bg-primary transition-colors duration-200 glow-primary"
            >
              {isPlaying ? 
                <Pause className="w-6 h-6 text-primary-foreground" /> : 
                <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
              }
            </button>
          </div>
          
          {/* Month Badge */}
          <div className="absolute top-2 right-2 px-3 py-1 bg-primary/90 rounded-full text-sm font-semibold text-primary-foreground backdrop-blur-sm">
            {month}
          </div>
        </div>

        {/* Song Info */}
        <div className="space-y-2">
          <h3 className="font-bold text-base text-foreground line-clamp-2 leading-tight">
            {song.title}
          </h3>
          <p className="text-muted-foreground font-medium text-sm">
            {song.artist}
          </p>
          <p className="text-muted-foreground text-sm opacity-75 line-clamp-1">
            {song.album}
          </p>
        </div>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={song.previewUrl}
          preload="metadata"
          onError={() => console.log('Audio load error for:', song.title)}
        />
      </div>
    </div>
  );
};

export default MonthCard;