import { useState, useEffect } from 'react';
import MonthCard from './MonthCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Song {
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  previewUrl: string;
}

interface TimelineData {
  [month: string]: Song;
}

// Sample data - Replace with your actual music data
const timelineData: TimelineData = {
  'Januari': {
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    previewUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  'Februari': {
    title: 'Imagine',
    artist: 'John Lennon',
    album: 'Imagine',
    coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop',
    previewUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  'Maart': {
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    coverUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop',
    previewUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  'April': {
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    album: 'Led Zeppelin IV',
    coverUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop',
    previewUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  'Mei': {
    title: 'Sweet Child O\' Mine',
    artist: 'Guns N\' Roses',
    album: 'Appetite for Destruction',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    previewUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  'Juni': {
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    album: 'Nevermind',
    coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop',
    previewUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  'Juli': {
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    coverUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop',
    previewUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  'Augustus': {
    title: 'Purple Rain',
    artist: 'Prince',
    album: 'Purple Rain',
    coverUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop',
    previewUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  'September': {
    title: 'Like a Rolling Stone',
    artist: 'Bob Dylan',
    album: 'Highway 61 Revisited',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    previewUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  'Oktober': {
    title: 'Hey Jude',
    artist: 'The Beatles',
    album: 'Hey Jude',
    coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop',
    previewUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  'November': {
    title: 'What\'s Going On',
    artist: 'Marvin Gaye',
    album: 'What\'s Going On',
    coverUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop',
    previewUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  'December': {
    title: 'Respect',
    artist: 'Aretha Franklin',
    album: 'I Never Loved a Man the Way I Love You',
    coverUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop',
    previewUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  }
};

const MusicTimeline = () => {
  const months = Object.keys(timelineData);
  const [activeMonthIndex, setActiveMonthIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveMonthIndex((prev) => (prev + 1) % months.length);
    }, 8000); // 8 seconds per month

    return () => clearInterval(interval);
  }, [isAutoPlaying, months.length]);

  const nextMonth = () => {
    setActiveMonthIndex((prev) => (prev + 1) % months.length);
  };

  const prevMonth = () => {
    setActiveMonthIndex((prev) => (prev - 1 + months.length) % months.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="text-center mb-12 animate-slide-in">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
          My <span className="text-primary">Music</span> Journey
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Top songs that defined my year, month by month
        </p>
        
        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={toggleAutoPlay}
            className={`
              px-6 py-3 rounded-full font-semibold transition-all duration-300
              ${isAutoPlaying 
                ? 'bg-primary text-primary-foreground glow-primary' 
                : 'bg-secondary text-secondary-foreground hover:bg-accent'
              }
            `}
          >
            {isAutoPlaying ? 'Pause Auto Play' : 'Start Auto Play'}
          </button>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative w-full max-w-7xl mx-auto px-8">
        {/* Timeline Line */}
        <div className="absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent transform -translate-y-1/2 z-0" />
        
        {/* Active Month Indicator */}
        <div 
          className="absolute top-1/2 w-4 h-4 bg-primary rounded-full glow-primary transform -translate-y-1/2 transition-all duration-500 z-10"
          style={{ 
            left: `calc(2rem + ${(activeMonthIndex / (months.length - 1)) * (100 - 4)}%)`,
            transform: 'translateX(-50%) translateY(-50%)'
          }}
        />

        {/* Month Cards - Distributed across full width */}
        <div className="relative grid grid-cols-12 gap-4 py-12">
          {months.map((month, index) => (
            <div
              key={month}
              className={`
                flex justify-center transition-all duration-500
                ${index === activeMonthIndex ? 'animate-scale-in z-20' : 'z-10'}
              `}
            >
              <MonthCard
                month={month}
                song={timelineData[month]}
                isActive={index === activeMonthIndex}
                onActivate={() => {
                  setActiveMonthIndex(index);
                }}
                autoPlay={true} // Always auto-play when focused
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 px-4">
          <button
            onClick={prevMonth}
            disabled={activeMonthIndex === 0}
            className={`
              p-4 rounded-full transition-all duration-200 group
              ${activeMonthIndex === 0 
                ? 'bg-muted/50 cursor-not-allowed opacity-50' 
                : 'bg-secondary hover:bg-accent glow-hover'
              }
            `}
          >
            <ChevronLeft className={`
              w-6 h-6 transition-colors duration-200
              ${activeMonthIndex === 0 
                ? 'text-muted-foreground' 
                : 'text-secondary-foreground group-hover:text-accent-foreground'
              }
            `} />
          </button>
          
          <div className="text-center">
            <p className="text-muted-foreground text-sm mb-1">
              {activeMonthIndex + 1} / {months.length}
            </p>
            <p className="text-foreground font-semibold text-lg">
              {months[activeMonthIndex]}
            </p>
          </div>
          
          <button
            onClick={nextMonth}
            disabled={activeMonthIndex === months.length - 1}
            className={`
              p-4 rounded-full transition-all duration-200 group
              ${activeMonthIndex === months.length - 1 
                ? 'bg-muted/50 cursor-not-allowed opacity-50' 
                : 'bg-secondary hover:bg-accent glow-hover'
              }
            `}
          >
            <ChevronRight className={`
              w-6 h-6 transition-colors duration-200
              ${activeMonthIndex === months.length - 1 
                ? 'text-muted-foreground' 
                : 'text-secondary-foreground group-hover:text-accent-foreground'
              }
            `} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicTimeline;