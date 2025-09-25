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
        relative group cursor-pointer transition-all duration-500 ease-out
        ${isActive ? 'scale-110 z-10' : 'scale-75 hover:scale-85 opacity-60 hover:opacity-80'}
      `}
      onClick={onActivate}
    >
      <div className={`
        glassmorphism gradient-card rounded-xl p-3 
        transition-all duration-500 ease-out
        ${isActive ? 'glow-primary animate-pulse-glow opacity-100' : 'glow-hover'}
        w-48 max-w-[200px]
      `}>
        {/* Album Cover */}
        <div className="relative overflow-hidden rounded-lg mb-3">
          <img 
            src={song.coverUrl} 
            alt={`${song.album} by ${song.artist}`}
            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Play/Pause Button Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="p-2 rounded-full bg-primary/80 hover:bg-primary transition-colors duration-200 glow-primary"
            >
              {isPlaying ? 
                <Pause className="w-4 h-4 text-primary-foreground" /> : 
                <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
              }
            </button>
          </div>
          
          {/* Month Badge */}
          <div className="absolute top-1 right-1 px-2 py-0.5 bg-primary/90 rounded-full text-xs font-semibold text-primary-foreground backdrop-blur-sm">
            {month}
          </div>
        </div>

        {/* Song Info */}
        <div className="space-y-1">
          <h3 className="font-bold text-sm text-foreground line-clamp-2 leading-tight">
            {song.title}
          </h3>
          <p className="text-muted-foreground font-medium text-xs">
            {song.artist}
          </p>
          <p className="text-muted-foreground text-xs opacity-75 line-clamp-1">
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