import React, { useState, useMemo } from "https://esm.sh/react";

// --- DATA ---

const CHARACTERS = [
  {
    id: "france",
    name: "Louis",
    country: "FRANCE",
    color: "bg-indigo-600",
    gradient: "from-indigo-600 to-blue-900",
    images: {
      default: "https://i.imgur.com/z1fnoyg.png",
      positive: "https://i.imgur.com/z1fnoyg.png",
      negative: "https://i.imgur.com/p5wHmwP.png"
    }
  },
  {
    id: "iran",
    name: "Reza",
    country: "IRAN",
    color: "bg-stone-600",
    gradient: "from-stone-600 to-stone-900",
    images: {
      default: "https://i.imgur.com/D9qVE53.png",
      positive: "https://i.imgur.com/D9qVE53.png",
      negative: "https://i.imgur.com/2Mot1Kx.png"
    }
  },
  {
    id: "japan",
    name: "Kenji",
    country: "JAPAN",
    color: "bg-rose-600",
    gradient: "from-rose-600 to-rose-900",
    images: {
      default: "https://i.imgur.com/kwgNZJN.png",
      positive: "https://i.imgur.com/kwgNZJN.png", // Reset to default (only changes on specific gesture)
      negative: "https://i.imgur.com/kwgNZJN.png"  // Reset to default (only changes on specific gesture)
    }
  },
  {
    id: "usa",
    name: "Mike",
    country: "USA",
    color: "bg-blue-600",
    gradient: "from-blue-600 to-blue-900",
    images: {
      default: "https://i.imgur.com/7SmjYqQ.png",
      positive: "https://i.imgur.com/7SmjYqQ.png", // Reset to default (only changes on specific gesture)
      negative: "https://i.imgur.com/7SmjYqQ.png"  // Reset to default (only changes on specific gesture)
    }
  },
  {
    id: "china",
    name: "Wei",
    country: "CHINA",
    color: "bg-emerald-600",
    gradient: "from-emerald-600 to-emerald-900",
    images: {
      default: "https://i.imgur.com/8Q0wX7t.png",
      positive: "https://i.imgur.com/YUIayKK.png",
      negative: "https://i.imgur.com/YUIayKK.png"
    }
  },
  {
    id: "korea",
    name: "Minji",
    country: "KOREA",
    color: "bg-pink-600",
    gradient: "from-pink-600 to-purple-900",
    images: {
      default: "https://i.imgur.com/q6CtsFv.png",
      positive: "https://i.imgur.com/q6CtsFv.png",
      negative: "https://i.imgur.com/q6CtsFv.png"
    }
  },
  {
    id: "brazil",
    name: "Camila",
    country: "BRAZIL",
    color: "bg-orange-600",
    gradient: "from-orange-600 to-red-900",
    images: {
      default: "https://i.imgur.com/siSE3Lo.png",
      positive: "https://i.imgur.com/siSE3Lo.png",
      negative: "https://i.imgur.com/GG1EHzs.png"
    }
  },
  {
    id: "uk",
    name: "Olivia",
    country: "UK",
    color: "bg-red-600",
    gradient: "from-red-600 to-red-900",
    images: {
      default: "https://i.imgur.com/utD04N9.png",
      positive: "https://i.imgur.com/utD04N9.png",
      negative: "https://i.imgur.com/NmcKRbG.png"
    }
  },
  {
    id: "greece",
    name: "Nikos",
    country: "GREECE",
    color: "bg-cyan-600",
    gradient: "from-cyan-600 to-blue-800",
    images: {
      default: "https://i.imgur.com/YOkJPH5.png",
      positive: "https://i.imgur.com/YOkJPH5.png",
      negative: "https://i.imgur.com/E9tL3YH.png"
    }
  },
  {
    id: "vietnam",
    name: "Linh",
    country: "VIETNAM",
    color: "bg-teal-600",
    gradient: "from-teal-600 to-emerald-900",
    images: {
      default: "https://i.imgur.com/LDaDwya.png",
      positive: "https://i.imgur.com/LDaDwya.png",
      negative: "https://i.imgur.com/Qmmn3lx.png"
    }
  },
  {
    id: "australia",
    name: "Liam",
    country: "AUSTRALIA",
    color: "bg-yellow-600",
    gradient: "from-yellow-600 to-orange-900",
    images: {
      default: "https://i.imgur.com/li2sV02.png",
      positive: "https://i.imgur.com/li2sV02.png",
      negative: "https://i.imgur.com/iMAQNKm.png"
    }
  }
];

interface CulturalNote {
  characterId: string;
  note: string;
  isNegative?: boolean;
  image?: string;
}

interface Gesture {
  id: string;
  label: string;
  icon: string;
  relatedCharacters: string[];
  culturalNote: CulturalNote[];
}

const GESTURES: Gesture[] = [
  {
    id: "thumbs_up",
    label: "엄지 척",
    icon: "https://i.imgur.com/uGRSLpc.png",
    relatedCharacters: ["usa", "korea", "iran", "australia"],
    culturalNote: [
      { characterId: "iran", note: "장난해?\n이거 엄청 심한 욕이야!", isNegative: true },
      { characterId: "australia", note: "어이,\n그거 무례한 짓이야.", isNegative: true },
      { characterId: "usa", note: "오,\n완전 좋아!" },
      { characterId: "korea", note: "대박!\n최고야!" }
    ]
  },
  {
    id: "v_sign",
    label: "브이",
    icon: "https://i.imgur.com/Atdb3nG.png",
    relatedCharacters: ["korea", "usa", "uk", "australia"],
    culturalNote: [
      { characterId: "uk", note: "싸우자는 거야?\n당장 집어치워.", isNegative: true },
      { characterId: "korea", note: "하나 둘 셋,\n김치~" },
      { characterId: "usa", note: "평화!\n피스~" }
    ]
  },
  {
    id: "ok_sign",
    label: "OK 사인",
    icon: "https://i.imgur.com/j0xZ5AP.png",
    relatedCharacters: ["usa", "france", "brazil", "korea"],
    culturalNote: [
      { characterId: "brazil", note: "미쳤어?\n그거 뻐큐랑 같은 뜻이야!", isNegative: true },
      { characterId: "france", note: "음...\n형편없네. 빵점이야.", isNegative: true },
      { characterId: "usa", note: "오케이!\n딱 좋아." }
    ]
  },
  {
    id: "call_me",
    label: "전화해",
    icon: "https://i.imgur.com/CTbRPTO.png",
    relatedCharacters: ["usa", "china", "korea", "brazil"],
    culturalNote: [
      { characterId: "china", note: "이거 숫자\n6인 거 알지?" },
      { characterId: "usa", note: "나중에\n전화해!" }
    ]
  },
  {
    id: "crossed_fingers",
    label: "행운을 빌어",
    icon: "https://i.imgur.com/6iSs6LM.png",
    relatedCharacters: ["usa", "vietnam", "uk", "france"],
    culturalNote: [
      { characterId: "vietnam", note: "야! 그거 진짜\n저질스러운 욕이야.", isNegative: true },
      { characterId: "usa", note: "행운을 빌게!\n잘 될 거야." }
    ]
  },
  {
    id: "stop_palm",
    label: "멈춰",
    icon: "https://i.imgur.com/eme6I4i.png",
    relatedCharacters: ["usa", "greece", "iran", "japan"],
    culturalNote: [
      { characterId: "greece", note: "지금 내 얼굴에 뭐 뿌리냐?\n최악의 모욕이야!", isNegative: true },
      { characterId: "iran", note: "그만해,\n무례하네.", isNegative: true },
      { characterId: "japan", note: "잠깐!\n거기 서.", isNegative: true, image: "https://i.imgur.com/ygbmB4I.png" }, // Japan Specific Image
      { characterId: "usa", note: "잠깐,\n거기 멈춰." }
    ]
  },
  {
    id: "two_hands",
    label: "두 손 모아",
    icon: "https://i.imgur.com/XLesUSL.png",
    relatedCharacters: ["korea", "japan", "usa", "france"],
    culturalNote: [
      { characterId: "korea", note: "안녕하세요,\n존경합니다." },
      { characterId: "japan", note: "제발!\n부탁드려요." },
      { characterId: "usa", note: "돈 달라는 거야?\n왜 그래?", image: "https://i.imgur.com/7GJhlqS.png" } // USA Specific Image
    ]
  },
  {
    id: "rock_on",
    label: "락앤롤",
    icon: "https://i.imgur.com/eMVh3F9.png",
    relatedCharacters: ["usa", "brazil", "uk", "korea"],
    culturalNote: [
      { characterId: "brazil", note: "조심해,\n네 애인 바람피우고 있어...", isNegative: true },
      { characterId: "usa", note: "예아!\n락앤롤!" }
    ]
  }
];

const DEFAULT_CHARACTERS = ["france", "iran", "japan", "usa"];

// --- COMPONENTS ---

// 1. Title Screen
function TitleScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative w-full h-full bg-[#111] overflow-hidden">
        {/* Full Screen Background Image */}
        <div className="absolute inset-0 z-0">
             <img 
                src="https://i.imgur.com/onD1MMs.png" 
                alt="너 방금 뭐라고 했어? Title" 
                className="w-full h-full object-cover"
             />
             {/* Optional faint overlay to ensure button contrast if needed */}
             <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
        </div>

        {/* Controls Container - Positioned at bottom */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-24 md:pb-32">
            {/* Start Button */}
            <button
                onClick={onStart}
                className="group relative px-16 py-6 bg-black/40 backdrop-blur-xl border border-white/20 text-white font-black text-3xl tracking-widest rounded-full transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-white/50 shadow-[0_0_40px_rgba(0,0,0,0.6)]"
            >
                START
            </button>
        </div>
    </div>
  );
}

// 2. Encyclopedia Screen
function EncyclopediaScreen({ onBack }: { onBack: () => void }) {
    return (
        <div className="w-full h-full bg-neutral-950 text-white overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-neutral-900/50 backdrop-blur-xl border-b border-white/10 shrink-0 h-16 z-10">
                <button onClick={onBack} className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
                    <span className="font-bold tracking-widest text-xs">BACK</span>
                </button>
                <h2 className="text-lg font-black tracking-tighter uppercase">제스처 도감</h2>
                <div className="w-12"></div> {/* Spacer for center alignment */}
            </div>

            {/* Grid Content - Fit to screen */}
            <div className="flex-1 p-4 overflow-hidden">
                <div className="w-full h-full grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-3">
                    {GESTURES.map(gesture => (
                        <div key={gesture.id} className="bg-neutral-900/40 border border-white/5 rounded-xl p-3 hover:bg-neutral-800/40 transition-colors duration-300 flex flex-col min-h-0">
                            {/* Card Header (Icon Only, Centered) */}
                            <div className="flex items-center justify-center mb-2 shrink-0">
                                <div className="bg-white/10 p-2 rounded-xl shrink-0">
                                    <img src={gesture.icon} alt={gesture.label} className="w-8 h-8 object-contain" />
                                </div>
                            </div>

                            {/* Notes List - Flex 1 to take remaining height, overflow auto for internal scroll */}
                            <div className="flex-1 overflow-y-auto space-y-2 pr-1 no-scrollbar">
                                {gesture.culturalNote.map((note, idx) => {
                                    const char = CHARACTERS.find(c => c.id === note.characterId);
                                    if (!char) return null;
                                    return (
                                        <div key={idx} className={`flex items-start gap-2 p-2 rounded-lg ${note.isNegative ? 'bg-red-500/10 border border-red-500/10' : 'bg-white/5 border border-white/5'}`}>
                                            <div className="shrink-0 text-sm pt-0.5">
                                                {note.isNegative ? '🤬' : '😊'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-baseline gap-1.5">
                                                    <span className={`text-[10px] font-black uppercase tracking-wider ${note.isNegative ? 'text-red-400' : 'text-indigo-300'}`}>
                                                        {char.country}
                                                    </span>
                                                </div>
                                                <p className="text-[11px] leading-snug opacity-80 break-words">
                                                    {note.note.replace(/\n/g, ' ')}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// 3. Simulation Screen
function SimulationScreen({ onBack, onOpenDictionary }: { onBack: () => void, onOpenDictionary: () => void }) {
  const [clickedGestureId, setClickedGestureId] = useState<string | null>(null);
  const [hoveredGestureId, setHoveredGestureId] = useState<string | null>(null);

  // 우선순위: 호버된 제스처 > 클릭된 제스처
  const viewingGestureId = hoveredGestureId || clickedGestureId;
  const viewingGesture = GESTURES.find((g) => g.id === viewingGestureId);

  // 반응(텍스트/표정)은 '클릭된' 제스처가 현재 화면에 보일 때만 활성화
  const isReacting = !!clickedGestureId && (viewingGestureId === clickedGestureId);

  // 화면에 표시할 캐릭터 4명 계산
  const targetIds = viewingGesture?.relatedCharacters || DEFAULT_CHARACTERS;
  
  // 중복 제거 및 4명 채우기
  const displayCharacters = useMemo(() => {
    const primary = targetIds.map(id => CHARACTERS.find(c => c.id === id)).filter(Boolean);
    const primarySet = new Set(primary.map(c => c!.id));
    
    let others = [];
    if (primary.length < 4) {
        others = CHARACTERS.filter(c => !primarySet.has(c.id));
    }
    
    return [...primary, ...others].slice(0, 4);
  }, [targetIds]);

  return (
    <div className="relative w-full h-[100dvh] bg-black text-white font-sans overflow-hidden select-none flex flex-col md:flex-row animate-in fade-in duration-500">
      
      {/* Home Button (Top Left) */}
      <button 
        onClick={onBack}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50 bg-black/40 backdrop-blur-md border border-white/10 text-white/70 p-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 group shadow-lg"
        aria-label="Go Home"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      </button>

      {/* Dictionary Button (Top Right) */}
      <button
        onClick={onOpenDictionary}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-50 bg-black/40 backdrop-blur-md border border-white/10 text-white/70 p-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 group shadow-lg"
        aria-label="Open Dictionary"
      >
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      </button>

      {/* 4-Panel Grid */}
      {displayCharacters.map((char, index) => {
          if (!char) return null;
          
          // 제스처 반응
          const note = viewingGesture?.culturalNote?.find(n => n.characterId === char.id);
          const isNegative = note?.isNegative;
          // 특정 제스처에 대한 이미지 오버라이드 확인
          const overrideImage = note?.image;
          
          // 이미지는 반응 상태일 때만 감정 표현, 아니면 기본
          // 오버라이드 이미지가 있으면 그걸 쓰고, 없으면 기존 로직(positive/negative)을 따름
          const imgSrc = isReacting 
            ? (overrideImage || (isNegative ? char.images.negative : char.images.positive)) 
            : char.images.default;

          // 텍스트도 반응 상태일 때만 표시
          const bubbleText = isReacting 
            ? (note?.note || viewingGesture?.label) 
            : "";

          return (
            <div 
              key={char.id} 
              className={`
                relative h-full border-b md:border-b-0 md:border-r border-white/20 last:border-0 overflow-hidden 
                flex-1 
                group
              `}
            >
              {/* Background with Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-b ${char.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Giant Background Text */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                 <h2 className="text-[20vh] md:text-[40vh] font-black text-white opacity-10 leading-none -ml-4 md:-ml-10 select-none uppercase transform -rotate-12 origin-top-left group-hover:rotate-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    {char.country}
                 </h2>
              </div>

              {/* Character Image */}
              <div className="absolute inset-0 transition-all duration-500">
                <img 
                  src={imgSrc} 
                  alt={char.name}
                  className={`
                    w-full h-full object-cover object-top md:object-center drop-shadow-2xl will-change-transform 
                    transition-transform duration-500
                    ${isReacting ? "animate-float" : ""}
                    grayscale-0
                  `} 
                />
              </div>
              
              {/* Overlay Gradient for Text Readability */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

              {/* Reaction Bubble (Moved Lower to 75%, Smaller size) */}
              <div className={`
                 absolute top-[75%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4 flex justify-center 
                 transition-all duration-300 z-10
                 ${isReacting ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}
              `}>
                  {isReacting && (
                    <div className={`
                       relative px-4 py-2 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-center backdrop-blur-xl border-2
                       ${isNegative ? "bg-red-600/90 border-red-400 text-white" : "bg-white/90 border-white text-black"}
                       animate-[bounce_0.5s_ease-out]
                    `}>
                       {/* Speech bubble tail - Pointing UP */}
                       <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-t-2 border-l-2 ${isNegative ? "bg-red-600/90 border-red-400" : "bg-white/90 border-white"}`}></div>
                       
                       <p className="text-sm md:text-lg font-bold whitespace-pre-wrap leading-tight tracking-tight">"{bubbleText}"</p>
                    </div>
                  )}
              </div>

              {/* Country & Name Label */}
              <div className="absolute top-8 right-8 text-right z-10 hidden md:block">
                  <span className="block text-5xl font-black text-white tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-lg uppercase">
                    {char.country}
                  </span>
                  <span className="block text-xl font-bold tracking-widest text-white/60 mt-1">
                    {char.name}
                  </span>
              </div>
            </div>
          );
      })}

      {/* Footer Controls with Dock Wrapper */}
      <div className="fixed bottom-0 left-0 w-full pb-8 pt-6 px-4 z-50 pointer-events-none flex justify-center items-end bg-gradient-to-t from-black via-black/80 to-transparent h-48">
         <div 
           className="pointer-events-auto bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-2 md:p-3 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex gap-2 md:gap-3 overflow-x-auto max-w-full no-scrollbar mx-2"
         >
            {GESTURES.map(g => {
               const isClicked = clickedGestureId === g.id;
               const isHovered = hoveredGestureId === g.id;
               const isActive = isClicked || isHovered;
               
               return (
                 <button 
                   key={g.id}
                   onMouseEnter={() => setHoveredGestureId(g.id)}
                   onMouseLeave={() => setHoveredGestureId(null)}
                   onClick={() => setClickedGestureId(isClicked ? null : g.id)}
                   className={`
                     group relative shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center 
                     transition-all duration-300 border-2
                     ${isActive 
                       ? "bg-white border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]" 
                       : "bg-transparent border-transparent hover:bg-white/10 hover:border-white/30"}
                   `}
                 >
                   <img 
                     src={g.icon} 
                     alt={g.label} 
                     className={`w-8 h-8 md:w-10 md:h-10 object-contain transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} 
                   />
                   
                   {/* Tooltip */}
                   <div className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[10px] md:text-xs font-bold py-1 px-3 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/20 shadow-lg ${isActive ? 'hidden' : ''}`}>
                     {g.label}
                   </div>
                 </button>
               );
            })}
         </div>
      </div>

    </div>
  );
}

// --- APP ---

type Screen = 'TITLE' | 'SIM' | 'DICT';

export default function App() {
  const [screen, setScreen] = useState<Screen>('TITLE');
  const [prevScreen, setPrevScreen] = useState<Screen>('TITLE');

  const handleOpenDict = (from: Screen) => {
    setPrevScreen(from);
    setScreen('DICT');
  };

  return (
    <>
      {screen === 'TITLE' && (
        <TitleScreen
            onStart={() => setScreen('SIM')}
        />
      )}
      {screen === 'SIM' && (
        <SimulationScreen 
            onBack={() => setScreen('TITLE')} 
            onOpenDictionary={() => handleOpenDict('SIM')}
        />
      )}
      {screen === 'DICT' && (
        <EncyclopediaScreen onBack={() => setScreen(prevScreen)} />
      )}
    </>
  );
}