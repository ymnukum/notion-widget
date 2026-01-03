import React, { useState, useEffect, useCallback } from 'react';

// --- Types ---
type Theme = 'light' | 'dark';

interface TimeState {
  hours: number;
  minutes: number;
  greeting: string;
  dateString: string;
}

// --- Utils ---
const getGreetingText = (hours: number): string => {
  if (hours >= 5 && hours < 12) return 'Good Morning';
  if (hours >= 12 && hours < 17) return 'Good Afternoon';
  if (hours >= 17 && hours < 21) return 'Good Evening';
  return 'Good Night';
};

const formatTime = (part: number): string => part.toString().padStart(2, '0');

const getFormattedDateText = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

const App: React.FC = () => {
  const [time, setTime] = useState<TimeState>({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    greeting: getGreetingText(new Date().getHours()),
    dateString: getFormattedDateText(new Date()),
  });

  const [theme, setTheme] = useState<Theme>('dark');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        greeting: getGreetingText(now.getHours()),
        dateString: getFormattedDateText(now),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const containerStyle = {
    backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#000000',
    transition: 'background-color 1s ease, color 1s ease',
  };

  const borderStyle = {
    borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  };

  return (
    <div 
      style={containerStyle}
      className="w-screen h-screen flex items-center justify-center font-sans select-none overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseOpacity {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.5; }
        }
        @keyframes fadeGreeting {
          from { opacity: 0; filter: blur(4px); }
          to { opacity: 0.4; filter: blur(0); }
        }

        .font-serif-elegant { font-family: 'Playfair Display', serif; }
        .font-sans-modern { font-family: 'Poppins', sans-serif; }

        .animate-slide { animation: slideInLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .animate-up { animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .animate-greeting { animation: fadeGreeting 1s ease-out forwards; }
        
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        .delay-4 { animation-delay: 0.8s; }

        .clock-dots { animation: pulseOpacity 2s infinite ease-in-out; }
        
        .theme-btn {
          opacity: ${isHovered ? 1 : 0};
          transform: translateY(${isHovered ? '0' : '-10px'});
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
      `}</style>

      <div className="relative w-full max-w-lg px-8 py-12 text-center">
        
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="theme-btn absolute top-0 right-8 px-4 py-1.5 rounded-full border border-current text-[9px] uppercase tracking-[0.2em] font-medium hover:bg-current hover:invert transition-all z-50"
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>

        <div className="flex flex-col items-center justify-center">
          
          {/* Greeting Label */}
          <div className="h-4 mb-2 overflow-hidden">
            <p className="animate-greeting text-[10px] font-medium tracking-[0.25em] uppercase font-sans-modern">
              {time.greeting}
            </p>
          </div>
          
          {/* Main Name Greeting */}
          <h1 className="animate-slide delay-1 text-5xl md:text-6xl font-light tracking-tight leading-tight font-serif-elegant">
            Greetings, <span className="italic font-light">Saida</span>
          </h1>

          {/* Minimalist Smaller Clock */}
          <div className="animate-slide delay-2 mt-4 mb-6">
            <div className="flex items-baseline justify-center space-x-3 text-3xl font-extralight opacity-70 tabular-nums font-sans-modern tracking-tighter">
              <span>{formatTime(time.hours)}</span>
              <span className="clock-dots text-2xl">:</span>
              <span>{formatTime(time.minutes)}</span>
            </div>
          </div>

          {/* Date Section */}
          <div 
            style={borderStyle}
            className="animate-up delay-3 pt-4 border-t w-full max-w-[180px]"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-30 font-sans-modern">
              {time.dateString}
            </p>
          </div>
        </div>

        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 w-full h-[1px] flex justify-center opacity-[0.05]">
           <div className="w-1/2 h-full bg-current"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] flex justify-center opacity-[0.05]">
           <div className="w-1/2 h-full bg-current"></div>
        </div>
      </div>
    </div>
  );
};

export default App;