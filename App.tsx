
import React, { useState, useEffect, useRef } from 'react';
import { STORIES, BOOKS, HISTORIAN_QUOTES } from './constants';
import MusicPlayer from './components/MusicPlayer';
import GeminiChat from './components/GeminiChat';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeQuote, setActiveQuote] = useState<string | null>(null);
  const [showQuote, setShowQuote] = useState(false);
  const [openStoryId, setOpenStoryId] = useState<string | null>(STORIES[0].id); // Биринчи окуя ачык турат
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTextClick = () => {
    const randomQuote = HISTORIAN_QUOTES[Math.floor(Math.random() * HISTORIAN_QUOTES.length)];
    setActiveQuote(randomQuote);
    setShowQuote(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setShowQuote(false);
    }, 4000);
  };

  const toggleStory = (id: string) => {
    setOpenStoryId(openStoryId === id ? null : id);
  };

  return (
    <div className="min-h-screen kyrgyz-pattern text-slate-900 scroll-smooth">
      {/* Header */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-6 py-4 flex justify-between items-center ${
        isScrolled ? 'bg-white shadow-xl border-b border-amber-100' : 'bg-transparent'
      }`}>
        <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 bg-amber-800 rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-lg transition-transform group-hover:rotate-12">О</div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tighter text-amber-900 leading-none">ОСМОНААЛЫ</span>
            <span className="text-[10px] font-bold text-amber-700 tracking-[0.2em] uppercase">Сыдык уулу</span>
          </div>
        </div>
        <div className="hidden lg:flex space-x-10 text-xs font-bold text-amber-900">
          <a href="#hero" className="hover:text-amber-600 transition-colors uppercase tracking-widest">Башкы</a>
          <a href="#stories" className="hover:text-amber-600 transition-colors uppercase tracking-widest">Тарых барактары</a>
          <a href="#books" className="hover:text-amber-600 transition-colors uppercase tracking-widest">Эмгектери</a>
          <a href="#chat" className="hover:text-amber-600 transition-colors uppercase tracking-widest">AI Жардамчы</a>
        </div>
        <button className="bg-amber-800 text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-amber-900 transition-all shadow-md active:scale-95">
          Мурас
        </button>
      </nav>

      {/* Hero Section */}
      <header id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-amber-50/30">
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full animate-fade-in space-y-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-100/80 backdrop-blur-sm border border-amber-200 text-amber-900 text-[10px] font-bold tracking-[0.4em] uppercase rounded-full">
            <span className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></span>
            <span>Кыргыз тарых илиминин баштоочусу</span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl md:text-9xl font-black text-amber-950 leading-[0.9] tracking-tighter cursor-pointer hover:text-amber-800 transition-colors" onClick={handleTextClick}>
              Осмонаалы <br /> <span className="serif-font italic font-light text-amber-800">Сыдык уулу</span>
            </h1>
            <p className="text-sm font-bold text-amber-600 tracking-widest uppercase opacity-60">1875 — 1942</p>
          </div>

          <p className="text-xl md:text-3xl text-slate-800 max-w-3xl mx-auto leading-relaxed font-light opacity-90 italic">
            "Ал кыргыз элинин тарыхын биринчи болуп илимий негизде кагазга түшүргөн. Биздин улуттук иденттүүлүгүбүздүн сакчысы."
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <a href="#stories" className="group px-10 py-5 bg-amber-900 text-white rounded-full hover:bg-amber-950 transition-all shadow-2xl hover:-translate-y-1 font-bold text-lg">
              Тарыхты окуу
            </a>
          </div>

          {/* Quote Popup */}
          <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-[450px] bg-white p-10 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] z-50 transition-all duration-700 border-2 border-amber-200 ${showQuote ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
            <p className="text-amber-950 font-serif italic text-2xl md:text-3xl leading-snug text-center">"{activeQuote}"</p>
            <div className="h-px w-16 bg-amber-300 mx-auto my-6"></div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-600 text-center font-bold">— Осмонаалы Сыдык уулу</p>
          </div>
        </div>
      </header>

      {/* Interactive Stories Timeline Section */}
      <section id="stories" className="py-32 px-6 max-w-4xl mx-auto relative">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-bold text-amber-950 mb-6 font-serif tracking-tight">Өмүр тарыхы</h2>
          <p className="text-amber-800 font-bold uppercase tracking-[0.4em] text-sm">Окуяларды тандап окуңуз</p>
        </div>

        <div className="space-y-6">
          {STORIES.map((story, idx) => {
            const isOpen = openStoryId === story.id;
            return (
              <div 
                key={story.id} 
                className={`transition-all duration-500 rounded-[2rem] border ${
                  isOpen 
                    ? 'bg-white shadow-2xl border-amber-200 p-8 md:p-12' 
                    : 'bg-amber-50/50 border-transparent p-6 hover:bg-amber-100/50 cursor-pointer'
                }`}
                onClick={() => !isOpen && toggleStory(story.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <span className={`text-2xl font-black transition-colors ${isOpen ? 'text-amber-800' : 'text-amber-300'}`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="space-y-1">
                      <h3 className={`text-2xl md:text-3xl font-bold font-serif transition-all ${isOpen ? 'text-amber-950' : 'text-amber-900/60'}`}>
                        {story.title}
                      </h3>
                      {!isOpen && (
                        <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600/50">{story.period}</p>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleStory(story.id); }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isOpen ? 'bg-amber-800 text-white rotate-180' : 'bg-white text-amber-800 border border-amber-200'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                <div className={`overflow-hidden transition-all duration-700 ease-in-out ${
                  isOpen ? 'max-h-[1000px] mt-10 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="space-y-8">
                    <div className="inline-flex items-center space-x-3 px-6 py-2 bg-amber-50 text-amber-950 text-xs font-black rounded-full uppercase tracking-[0.2em] border border-amber-100">
                      <span>{story.period}</span>
                    </div>
                    <div className="h-px w-24 bg-amber-200"></div>
                    <p className="text-slate-800 leading-relaxed text-xl md:text-2xl font-light font-serif italic">
                      {story.content}
                    </p>
                    <div className="pt-6 flex justify-end">
                       <button 
                        onClick={() => toggleStory(story.id)}
                        className="text-xs font-bold uppercase tracking-widest text-amber-800 hover:text-amber-600 transition-colors"
                       >
                        Жабуу
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Legacy Books Section */}
      <section id="books" className="py-32 bg-[#1a1410] text-white relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
             <h2 className="text-5xl md:text-8xl font-bold mb-6 font-serif italic text-amber-500">Алтын мурас</h2>
             <p className="text-amber-100/40 text-xl max-w-2xl mx-auto font-light">
               Осмонаалы Сыдык уулунун калеминен чыккан туңгуч китептер — улуттун тарыхый кимдиги.
             </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {BOOKS.map((book) => (
              <div key={book.title} className="group bg-white/5 border border-white/10 p-16 rounded-[3rem] hover:bg-amber-600/5 transition-all cursor-default text-center">
                <div className="mb-10 inline-flex w-20 h-20 bg-amber-600/20 rounded-3xl items-center justify-center border border-amber-600/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="text-amber-500 font-black text-xl font-serif mb-4">{book.year}-жыл</div>
                <h4 className="text-4xl font-bold mb-8 font-serif group-hover:text-amber-400 transition-colors leading-tight">{book.title}</h4>
                <p className="text-amber-100/70 text-lg leading-relaxed mb-10 font-light italic">
                  "{book.description}"
                </p>
                <div className="h-0.5 w-12 bg-amber-600 mx-auto transition-all group-hover:w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive AI Chat */}
      <section id="chat" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-[4rem] p-12 md:p-24 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] border border-amber-100 text-center">
          <div className="max-w-3xl mx-auto mb-20 space-y-10">
            <h2 className="text-5xl md:text-7xl font-bold text-amber-950 font-serif leading-tight">Тарыхчы менен маектешиңиз</h2>
            <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light italic">
              "Осмонаалы Сыдык уулунун өмүрү жана кыргыз тарыхы боюнча суроо бериңиз. Биздин AI жардамчыбыз сизге кеңири маалымат берет."
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <GeminiChat />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b0806] text-white py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-amber-800 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-2xl mb-12">О</div>
          <h3 className="text-3xl font-bold mb-4 tracking-tighter uppercase font-serif">ОСМОНААЛЫ СЫДЫКОВ</h3>
          <div className="h-px w-24 bg-amber-600/30 my-8"></div>
          <p className="text-amber-100/40 text-xs font-bold tracking-[0.6em] uppercase">
            &copy; {new Date().getFullYear()} Санариптик тарых музейи
          </p>
        </div>
      </footer>

      <MusicPlayer />
    </div>
  );
};

export default App;
