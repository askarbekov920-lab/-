
import React, { useState, useRef, useEffect } from 'react';
import { AUDIO_TRACKS } from '../constants';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play blocked", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % AUDIO_TRACKS.length);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentTrackIndex]);

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-80 bg-white/95 backdrop-blur-md border-2 border-amber-300 p-4 rounded-3xl shadow-2xl z-50 flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full bg-amber-800 flex items-center justify-center text-white shadow-inner ${isPlaying ? 'animate-spin-slow' : ''}`}>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-amber-900 truncate w-32 md:w-40 leading-tight">{AUDIO_TRACKS[currentTrackIndex].title}</p>
            <p className="text-[10px] text-amber-600 font-semibold">{AUDIO_TRACKS[currentTrackIndex].author || 'Салттуу күү'}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <button onClick={togglePlay} className="p-3 bg-amber-800 hover:bg-amber-900 text-white rounded-full transition-all shadow-md active:scale-95">
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <button onClick={nextTrack} className="p-2 text-amber-800 hover:bg-amber-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4.555 7.168A1 1 0 003 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2zM11.555 7.168A1 1 0 0010 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="h-1 bg-amber-100 rounded-full overflow-hidden">
        <div className={`h-full bg-amber-600 transition-all duration-300 ${isPlaying ? 'w-full' : 'w-0'}`} style={{ transitionDuration: '30s' }}></div>
      </div>

      <audio 
        ref={audioRef} 
        src={AUDIO_TRACKS[currentTrackIndex].url} 
        onEnded={nextTrack}
        loop={false}
      />
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
