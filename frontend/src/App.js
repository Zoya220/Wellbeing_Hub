import React, { useState, useEffect, useRef } from 'react';
import './App.css'; 
import bgImage from './background.jpg'; 

// --- NEW AUDIO IMPORTS ---
import birdsChirpingMp3 from './birds-chirping.mp3';
import calmMp3 from './calm.mp3';
import rainMp3 from './rain.mp3';

function App() {
  // --- CORE STATES ---
  const [mode, setMode] = useState('home'); 
  const [showAuth, setShowAuth] = useState(false); 
  const [isLogin, setIsLogin] = useState(true); 
  const [pendingMode, setPendingMode] = useState(null); 
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isExiting, setIsExiting] = useState(false);

  // --- FEATURE & GATEWAY STATES ---
  const [showGateway, setShowGateway] = useState(false);
  const [activeFeatureTitle, setActiveFeatureTitle] = useState("");
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  // --- BREATHING STATES ---
  const [showBreathing, setShowBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Inhale'); 
  const [breathInstruction, setBreathInstruction] = useState('Prepare...');

  // --- MEDITATION STATES ---
  const [showMeditation, setShowMeditation] = useState(false);
  const [meditationTime, setMeditationTime] = useState(300);
  const [initialMeditationTime, setInitialMeditationTime] = useState(300);
  const [isActive, setIsActive] = useState(false);
  const [focusWord, setFocusWord] = useState("Peace");

  // --- STRESS SHIELD STATES ---
  const [showStressShield, setShowStressShield] = useState(false);
  const [journalEntry, setJournalEntry] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isReflecting, setIsReflecting] = useState(false);

  // --- NATURE AUDIO STATES ---
  const [showNatureAudio, setShowNatureAudio] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [audioElement, setAudioElement] = useState(null);

  // ==========================================
  // --- COGNITIVE CIRCUIT (BRAIN EXERCISE) ---
  // ==========================================
  const [showBrainExercise, setShowBrainExercise] = useState(false);
  const [circuitStage, setCircuitStage] = useState(1); // 1: Sync, 2: Word, 3: Math, 4: Done
  const [circuitFeedback, setCircuitFeedback] = useState({ type: '', text: '' });
  const inputRef = useRef(null);

  // Game 1: Neural Sync States
  const [brainSequence, setBrainSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isWatching, setIsWatching] = useState(false);
  const [highlightedGrid, setHighlightedGrid] = useState(null);
  const syncTargetScore = 3; // Number of successful rounds to pass stage 1

  // Game 2: Word Scramble States
  const mindWords = ["FOCUS", "PEACE", "BREATHE", "CALM", "CLARITY"];
  const [currentWord, setCurrentWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [wordInput, setWordInput] = useState("");
  const [wordsSolved, setWordsSolved] = useState(0);
  const wordsTargetScore = 2; // Words to solve to pass stage 2

  // Game 3: Quick Math States
  const [mathEquation, setMathEquation] = useState({ q: "", a: 0 });
  const [mathInput, setMathInput] = useState("");
  const [mathSolved, setMathSolved] = useState(0);
  const mathTargetScore = 3; // Equations to solve to pass stage 3

  // ==========================================
  // --- STATIC DATA ---
  // ==========================================
  const focusWords = ["Peace", "Stillness", "Clarity", "Presence", "Gratitude", "Softness"];

  // UPDATED: Added local files to the array alongside their download references
  const natureSounds = [
    { id: 'rain', title: 'Summer Rain', icon: '🌧️', url: rainMp3, downloadFile: rainMp3 }, 
    { id: 'forest', title: 'Deep Forest', icon: '🌲', url: 'https://cdn.pixabay.com/audio/2022/03/24/audio_732230009c.mp3' },
    { id: 'waves', title: 'Ocean Waves', icon: '🌊', url: calmMp3, downloadFile: calmMp3 },
    { id: 'birds', title: 'Morning Birds', icon: '🐦', url: birdsChirpingMp3, downloadFile: birdsChirpingMp3 },
    { id: 'cafe', title: 'Night Cafe', icon: '☕', url: 'https://cdn.pixabay.com/audio/2022/03/15/audio_187654.mp3' },
    { id: 'wind', title: 'Windy Mountain', icon: '🏔️', url: 'https://cdn.pixabay.com/audio/2024/02/08/audio_823e7430cd.mp3' }
  ];

  const gatewayData = {
    "Breathing": { thought: "Your breath is the anchor of your mind.", icon: "🌬️", color: "#0288D1" },
    "Cognitive Circuit": { thought: "A sharp mind is a powerful tool.", icon: "🧩", color: "#0288D1" },
    "Meditation": { thought: "Quiet the mind, and the soul will speak.", icon: "🧘", color: "#0288D1" },
    "Nature Audio": { thought: "Nature does not hurry, yet everything is accomplished.", icon: "🍃", color: "#0288D1" },
    "Stress Shield": { thought: "To name a worry is to begin to tame it.", icon: "🛡️", color: "#0288D1" },
    "Confidence": { thought: "Believe in the person you are becoming.", icon: "🦁", color: "#6A1B9A" },
    "Leadership": { thought: "To lead others, master oneself first.", icon: "👑", color: "#6A1B9A" }
  };

  const authQuotes = {
    mindCare: "“The soul always knows what to do to heal itself. The challenge is to silence the mind.”",
    personality: "“Personal growth is not a matter of learning new information but of unlearning old limits.”"
  };

  // ==========================================
  // --- EFFECTS & UTILS ---
  // ==========================================
  const transitionTo = (actionFunc) => {
    setIsExiting(true);
    setTimeout(() => {
      actionFunc();
      setIsExiting(false);
    }, 500); 
  };

  useEffect(() => {
    let timer;
    if (showBreathing && !showQuitConfirm) {
      const runCycle = () => {
        setBreathPhase('Inhale');
        setBreathInstruction('Inhale');
        timer = setTimeout(() => {
          setBreathPhase('Hold');
          setBreathInstruction('Hold');
          timer = setTimeout(() => {
            setBreathPhase('Exhale');
            setBreathInstruction('Exhale');
            timer = setTimeout(runCycle, 4000); 
          }, 2000); 
        }, 4000); 
      };
      runCycle();
    }
    return () => clearTimeout(timer);
  }, [showBreathing, showQuitConfirm]);

  useEffect(() => {
    let interval = null;
    if (isActive && meditationTime > 0 && !showQuitConfirm) {
      interval = setInterval(() => {
        setMeditationTime((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, meditationTime, showQuitConfirm]);

  // Focus input automatically when stage changes
  useEffect(() => {
    if ((circuitStage === 2 || circuitStage === 3) && showBrainExercise) {
      setTimeout(() => { if (inputRef.current) inputRef.current.focus(); }, 100);
    }
  }, [circuitStage, showBrainExercise]);

  const themes = {
    home: { bg: `url(${bgImage}) no-repeat center center/cover`, text: '#ffffff' },
    mindCare: { bg: '#E1F5FE', text: '#0277BD', accent: '#0288D1' },      
    personality: { bg: '#F3E5F5', text: '#4A148C', accent: '#7B1FA2' }   
  };

  const featureLists = {
    mindCare: [
      { title: "Cognitive Circuit", icon: "🧩", desc: "Multi-stage brain games." },
      { title: "Breathing", icon: "🌬️", desc: "Regulate system." },
      { title: "Meditation", icon: "🧘", desc: "Focus sessions." },
      { title: "Nature Audio", icon: "🍃", desc: "Calming sounds." },
      { title: "Stress Shield", icon: "🛡️", desc: "AI journaling." }
    ],
    personality: [
      { title: "Confidence", icon: "🦁", desc: "Posture tips." },
      { title: "Communication", icon: "🗣️", desc: "Speak clearly." },
      { title: "Decision Making", icon: "⚖️", desc: "Frameworks." },
      { title: "Leadership", icon: "👑", desc: "Inspire others." },
      { title: "Time Mgmt", icon: "⏳", desc: "Prioritize goals." }
    ]
  };

  // --- AUDIO HANDLER ---
  const handleToggleAudio = (track) => {
    if (currentTrack?.id === track.id) {
      audioElement.pause();
      setAudioElement(null);
      setCurrentTrack(null);
    } else {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = "";
      }
      const newAudio = new Audio(track.url);
      newAudio.loop = true;
      newAudio.volume = 0; 
      newAudio.play();
      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 0.5) {
          vol += 0.05;
          newAudio.volume = vol;
        } else {
          clearInterval(fadeIn);
        }
      }, 150);
      setAudioElement(newAudio);
      setCurrentTrack(track);
    }
  };

  // ==========================================
  // --- COGNITIVE CIRCUIT LOGIC ---
  // ==========================================
  const showFeedback = (type, text) => {
    setCircuitFeedback({ type, text });
    setTimeout(() => setCircuitFeedback({ type: '', text: '' }), 1500);
  };

  const startCircuit = () => {
    setShowBrainExercise(true);
    setCircuitStage(1);
    startSyncGame();
  };

  // Stage 1 Logic
  const startSyncGame = () => {
    const firstStep = Math.floor(Math.random() * 9);
    setBrainSequence([firstStep]);
    setUserSequence([]);
    setTimeout(() => playSequence([firstStep]), 500);
  };

  const playSequence = (sequence) => {
    setIsWatching(true);
    sequence.forEach((tile, index) => {
      setTimeout(() => {
        setHighlightedGrid(tile);
        setTimeout(() => setHighlightedGrid(null), 500);
        if (index === sequence.length - 1) {
          setTimeout(() => setIsWatching(false), 600);
        }
      }, (index + 1) * 800);
    });
  };

  const handleTileClick = (index) => {
    if (isWatching) return;
    const newTiles = [...userSequence, index];
    setUserSequence(newTiles);

    if (index !== brainSequence[userSequence.length]) {
      showFeedback('error', "Focus broken! Restarting sequence.");
      setUserSequence([]);
      setTimeout(startSyncGame, 1000);
      return;
    }

    if (newTiles.length === brainSequence.length) {
      setUserSequence([]);
      if (brainSequence.length >= syncTargetScore) {
        showFeedback('success', "Perfect! Moving to Phase 2...");
        setTimeout(startWordGame, 1500);
      } else {
        const nextStep = [...brainSequence, Math.floor(Math.random() * 9)];
        setBrainSequence(nextStep);
        setTimeout(() => playSequence(nextStep), 800);
      }
    }
  };

  // Stage 2 Logic
  const startWordGame = () => {
    setCircuitStage(2);
    setWordsSolved(0);
    setWordInput("");
    generateWord();
  };

  const generateWord = () => {
    const word = mindWords[Math.floor(Math.random() * mindWords.length)];
    setCurrentWord(word);
    let scrambled = word.split('').sort(() => 0.5 - Math.random()).join('');
    // Ensure it's actually scrambled
    while(scrambled === word) {
        scrambled = word.split('').sort(() => 0.5 - Math.random()).join('');
    }
    setScrambledWord(scrambled);
    setWordInput("");
  };

  const handleWordSubmit = (e) => {
    e.preventDefault();
    if (wordInput.toUpperCase() === currentWord) {
      const newScore = wordsSolved + 1;
      setWordsSolved(newScore);
      showFeedback('success', "Correct!");
      if (newScore >= wordsTargetScore) {
        setTimeout(startMathGame, 1000);
      } else {
        setTimeout(generateWord, 1000);
      }
    } else {
      showFeedback('error', "Try again!");
      setWordInput("");
    }
  };

  // Stage 3 Logic
  const startMathGame = () => {
    setCircuitStage(3);
    setMathSolved(0);
    setMathInput("");
    generateMath();
  };

  const generateMath = () => {
    const a = Math.floor(Math.random() * 12) + 2;
    const b = Math.floor(Math.random() * 12) + 2;
    const isAdd = Math.random() > 0.5;
    
    if (isAdd) {
        setMathEquation({ q: `${a} + ${b}`, a: a + b });
    } else {
        setMathEquation({ q: `${a} × ${b}`, a: a * b });
    }
    setMathInput("");
  };

  const handleMathSubmit = (e) => {
    e.preventDefault();
    if (parseInt(mathInput) === mathEquation.a) {
      const newScore = mathSolved + 1;
      setMathSolved(newScore);
      showFeedback('success', "Sharp!");
      if (newScore >= mathTargetScore) {
        setTimeout(() => setCircuitStage(4), 1000);
      } else {
        setTimeout(generateMath, 1000);
      }
    } else {
      showFeedback('error', "Recalculate!");
      setMathInput("");
    }
  };

  // ==========================================
  // --- NAVIGATION & PROCEED ---
  // ==========================================
  const handleFeatureClick = (title) => {
    transitionTo(() => {
      setActiveFeatureTitle(title);
      setShowGateway(true);
    });
  };

  const handleProceed = () => {
    transitionTo(() => {
      setShowGateway(false);
      if (activeFeatureTitle === "Breathing") setShowBreathing(true);
      if (activeFeatureTitle === "Meditation") {
          setShowMeditation(true);
          setFocusWord(focusWords[Math.floor(Math.random() * focusWords.length)]);
      }
      if (activeFeatureTitle === "Stress Shield") setShowStressShield(true);
      if (activeFeatureTitle === "Nature Audio") setShowNatureAudio(true);
      if (activeFeatureTitle === "Cognitive Circuit") startCircuit();
    });
  };

  const handleQuitSession = () => {
    transitionTo(() => {
      setShowQuitConfirm(false);
      setShowBreathing(false);
      setShowMeditation(false);
      setShowStressShield(false);
      setShowNatureAudio(false);
      setShowBrainExercise(false);
      
      setIsActive(false);
      setJournalEntry("");
      setAiResponse("");
      setMeditationTime(initialMeditationTime);
      setBreathPhase('Inhale');
      
      if (audioElement) {
        audioElement.pause();
        audioElement.src = "";
        setAudioElement(null);
        setCurrentTrack(null);
      }
    });
  };

  const handleAiReflect = () => {
    if (!journalEntry.trim()) return;
    setIsReflecting(true);
    setTimeout(() => {
      const prompts = [
        "That sounds heavy. If a close friend felt this way, what one kind thing would you say to them?",
        "What is one small thing within your control right now that could make today 1% better?",
        "Imagine looking back on this moment 12 months from now—how much will this matter?",
        "You're navigating a lot. Name one strength you've used today, even if it feels small."
      ];
      setAiResponse(prompts[Math.floor(Math.random() * prompts.length)]);
      setIsReflecting(false);
    }, 2000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    transitionTo(() => {
      setUser({ name: formData.name || "Explorer", email: formData.email });
      setShowAuth(false);
      setMode(pendingMode || 'home');
    });
  };

  const activeTheme = themes[mode];

  // Meditation Circle Logic
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (meditationTime / initialMeditationTime) * circumference;

  return (
    <div className={`main-wrapper ${isExiting ? 'fade-out' : 'fade-in'}`} style={{ background: activeTheme.bg }}>
      
      {mode === 'home' ? (
        <div className="home-view">
          <h1 className="bloom-title">WellBeing Hub</h1>
          <h2 className="bloom-subtitle">What is your focus today?</h2>
          <div className="bloom-button-container">
            <button onClick={() => { setPendingMode('mindCare'); setShowAuth(true); }} className="bloom-btn mind-btn">Mind Bloom</button>
            <button onClick={() => { setPendingMode('personality'); setShowAuth(true); }} className="bloom-btn identity-btn">Identity Bloom</button>
          </div>
        </div>
      ) : (
        <div className="section-container">
          <nav className="navbar">
            <h2 className="nav-logo">{mode === 'mindCare' ? '🌸 Mind Bloom' : '✨ Identity Bloom'}</h2>
            <div className="nav-right">
                <div className="profile-text-only">
                    <span style={{ color: activeTheme.accent }}>Hi, {user?.name}</span>
                </div>
                <button onClick={() => transitionTo(() => setMode('home'))} className="nav-home-btn-hover">Home</button>
                <button onClick={() => transitionTo(() => { setUser(null); setMode('home'); })} className="logout-btn">Logout</button>
            </div>
          </nav>

          <div className="inner-content">
            <h1 className="section-title">The {mode === 'mindCare' ? 'Sanctuary' : 'Edge'}</h1>
            <div className="card-grid-single-line">
              {featureLists[mode].map((feature, i) => (
                <div key={i} className="feature-card-small" onClick={() => handleFeatureClick(feature.title)}>
                  <div className="card-icon-small">{feature.icon}</div>
                  <h3 style={{ color: activeTheme.accent }}>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GATEWAY */}
      {showGateway && (
        <div className="gateway-overlay">
          <div className="gateway-box">
            <div className="gateway-icon">{gatewayData[activeFeatureTitle]?.icon || "✨"}</div>
            <h2 style={{ color: gatewayData[activeFeatureTitle]?.color }}>{activeFeatureTitle}</h2>
            <p className="gateway-thought">"{gatewayData[activeFeatureTitle]?.thought || "Take a moment for yourself."}"</p>
            <button className="proceed-btn" style={{ backgroundColor: gatewayData[activeFeatureTitle]?.color }} onClick={handleProceed}>
              Proceed to Exercise
            </button>
            <button className="gateway-cancel" onClick={() => setShowGateway(false)}>Maybe Later</button>
          </div>
        </div>
      )}

      {/* BREATHING */}
      {showBreathing && (
        <div className="breath-overlay-minimal">
          <button className="breath-quit-btn" onClick={() => setShowQuitConfirm(true)}>×</button>
          <div className="breath-stage">
            <div className={`breath-circle-floating ${breathPhase}`}>
                <div className="breath-dot"></div>
            </div>
            <h2 className="breath-instruction-minimal">{breathInstruction}</h2>
          </div>
        </div>
      )}

      {/* COGNITIVE CIRCUIT (Multi-Stage Game) */}
      {showBrainExercise && (
        <div className="brain-exercise-overlay">
          <button className="breath-quit-btn" onClick={() => setShowQuitConfirm(true)}>×</button>
          <div className="brain-container">
            
            {/* Progress Dots */}
            <div className="circuit-progress">
                <div className={`progress-dot ${circuitStage >= 1 ? (circuitStage > 1 ? 'completed' : 'active') : ''}`}></div>
                <div className={`progress-dot ${circuitStage >= 2 ? (circuitStage > 2 ? 'completed' : 'active') : ''}`}></div>
                <div className={`progress-dot ${circuitStage >= 3 ? (circuitStage > 3 ? 'completed' : 'active') : ''}`}></div>
            </div>

            {/* Stage 1: Neural Sync */}
            {circuitStage === 1 && (
              <>
                <h1 className="brain-title">Phase 1: Memory Sync</h1>
                <p className="brain-sub">{isWatching ? "Watch the pattern..." : "Repeat the pattern!"}</p>
                <div className="brain-grid">
                  {[...Array(9)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`brain-tile ${highlightedGrid === i ? 'active' : ''}`}
                      onClick={() => handleTileClick(i)}
                    ></div>
                  ))}
                </div>
              </>
            )}

            {/* Stage 2: Clarity Scramble */}
            {circuitStage === 2 && (
              <>
                <h1 className="brain-title">Phase 2: Clarity</h1>
                <p className="brain-sub">Unscramble the mindful word</p>
                <div className="game-prompt">{scrambledWord}</div>
                <form onSubmit={handleWordSubmit}>
                  <input 
                    ref={inputRef}
                    type="text" 
                    className="game-input" 
                    value={wordInput}
                    onChange={(e) => setWordInput(e.target.value)}
                    placeholder="Type here..."
                    autoComplete="off"
                  />
                  <br/>
                  <button type="submit" className="game-submit-btn" style={{display: 'none'}}>Submit</button>
                </form>
              </>
            )}

            {/* Stage 3: Logic Flow */}
            {circuitStage === 3 && (
              <>
                <h1 className="brain-title">Phase 3: Flow State</h1>
                <p className="brain-sub">Quick Mental Math</p>
                <div className="game-prompt">{mathEquation.q} = ?</div>
                <form onSubmit={handleMathSubmit}>
                  <input 
                    ref={inputRef}
                    type="number" 
                    className="game-input" 
                    value={mathInput}
                    onChange={(e) => setMathInput(e.target.value)}
                    placeholder="Answer"
                    autoComplete="off"
                  />
                  <br/>
                  <button type="submit" className="game-submit-btn" style={{display: 'none'}}>Submit</button>
                </form>
              </>
            )}

            {/* Stage 4: Completion */}
            {circuitStage === 4 && (
              <>
                <div className="completion-icon">🌟</div>
                <h1 className="brain-title">Circuit Complete</h1>
                <p className="brain-sub" style={{textTransform: 'none', fontSize: '1.1rem', marginTop: '20px'}}>
                  Your mind is sharp, focused, and ready for whatever comes next.
                </p>
                <button className="game-submit-btn" onClick={handleQuitSession}>Return to Sanctuary</button>
              </>
            )}

            {/* Global Feedback Text */}
            {circuitStage < 4 && (
              <div className={`feedback-text ${circuitFeedback.type === 'error' ? 'feedback-error' : 'feedback-success'}`}>
                {circuitFeedback.text}
              </div>
            )}

          </div>
        </div>
      )}

      {/* MEDITATION */}
      {showMeditation && (
        <div className="meditation-overlay">
            <button className="breath-quit-btn" onClick={() => setShowQuitConfirm(true)}>×</button>
            <div className="meditation-container">
                <div className="meditation-timer-circle">
                    <svg className="timer-svg" viewBox="0 0 320 320">
                        <circle className="bg-circle" cx="160" cy="160" r={radius}></circle>
                        <circle 
                          className="progress-circle" 
                          cx="160" cy="160" r={radius}
                          style={{ 
                            strokeDasharray: circumference, 
                            strokeDashoffset: offset,
                            transition: 'stroke-dashoffset 1s linear'
                          }}
                        ></circle>
                    </svg>
                    <div className="timer-display">
                        <span className="time-numbers">{formatTime(meditationTime)}</span>
                        <div className="focus-container">
                          <span className="focus-label">FOCUS:</span>
                          <span className="focus-word">{focusWord}</span>
                        </div>
                    </div>
                </div>
                <div className="meditation-controls">
                    {!isActive && (
                        <div className="time-selector">
                            <button className={initialMeditationTime === 300 ? "active" : ""} onClick={() => { setMeditationTime(300); setInitialMeditationTime(300); }}>5m</button>
                            <button className={initialMeditationTime === 600 ? "active" : ""} onClick={() => { setMeditationTime(600); setInitialMeditationTime(600); }}>10m</button>
                            <button className={initialMeditationTime === 900 ? "active" : ""} onClick={() => { setMeditationTime(900); setInitialMeditationTime(900); }}>15m</button>
                        </div>
                    )}
                    <button className={`med-start-stop ${isActive ? "active-session" : ""}`} onClick={() => setIsActive(!isActive)}>
                        {isActive ? "Pause Session" : "Start Session"}
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* STRESS SHIELD */}
      {showStressShield && (
        <div className="stress-shield-overlay">
          <button className="breath-quit-btn" onClick={() => setShowQuitConfirm(true)}>×</button>
          <div className="shield-container">
            <h1 className="shield-title">Stress Shield</h1>
            <p className="shield-sub">Dump your thoughts. Release the pressure.</p>
            <textarea 
              className="journal-input" 
              placeholder="What's weighing on your mind?"
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
            />
            <div className="shield-actions">
              <button className="reflect-btn" onClick={handleAiReflect} disabled={isReflecting || !journalEntry}>
                {isReflecting ? "Listening..." : "Seek Perspective"}
              </button>
            </div>
            {aiResponse && (
              <div className="ai-response-box">
                <p className="ai-text">{aiResponse}</p>
                <button className="clear-shield-btn" onClick={() => {setAiResponse(""); setJournalEntry("");}}>Clear Mind</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* NATURE AUDIO */}
      {showNatureAudio && (
        <div className="nature-audio-overlay">
          <button className="breath-quit-btn" onClick={() => setShowQuitConfirm(true)}>×</button>
          <div className="nature-container">
            <h1 className="nature-title">Nature Soundscapes</h1>
            <p className="nature-sub">Select a sound to anchor your focus.</p>
            <div className="audio-grid">
              {natureSounds.map((track) => (
                <div 
                  key={track.id} 
                  className={`audio-card ${currentTrack?.id === track.id ? 'active-playing' : ''}`}
                  onClick={() => handleToggleAudio(track)}
                >
                  <div className="audio-icon">{track.icon}</div>
                  <h3>{track.title}</h3>
                  <div className="play-indicator">
                    {currentTrack?.id === track.id ? "⏸ Playing" : "▶ Listen"}
                  </div>
                  
                  {/* UPDATED: Download Link Logic added here */}
                  {track.downloadFile && (
                    <a 
                      href={track.downloadFile} 
                      download={`${track.title.replace(/\s+/g, '-').toLowerCase()}.mp3`}
                      className="download-btn"
                      onClick={(e) => e.stopPropagation()} 
                      // style={{ 
                      //   display: 'inline-block', 
                      //   marginTop: '10px', 
                      //   fontSize: '0.85rem', 
                      //   color: '#0288D1', 
                      //   textDecoration: 'none',
                      //   fontWeight: 'bold',
                      //   padding: '4px 8px',
                      //   borderRadius: '4px',
                      //   background: 'rgba(2, 136, 209, 0.1)'
                      // }}
                    >
                      {/* ⬇️ Download */}
                    </a>
                  )}

                </div>
              ))}
            </div>
            {currentTrack && (
              <div className="now-playing-bar">
                <p>Now immersing you in: <strong>{currentTrack.title}</strong></p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QUIT CONFIRMATION */}
      {showQuitConfirm && (
        <div className="quit-confirm-overlay">
          <div className="quit-box">
            <p className="quit-phrase">"Small steps lead to big changes."</p>
            <div className="quit-actions">
              <button className="quit-yes" onClick={handleQuitSession}>End Session</button>
              <button className="quit-no" onClick={() => setShowQuitConfirm(false)}>Stay Mindful</button>
            </div>
          </div>
        </div>
      )}

      {/* AUTHENTICATION */}
      <div className={`auth-overlay ${showAuth ? 'active' : ''}`}>
        <div className="auth-box">
          <div className="auth-left" style={{ background: pendingMode === 'mindCare' ? '#0288D1' : '#6A1B9A' }}>
            <h3 className="auth-quote">
                {pendingMode ? authQuotes[pendingMode] : "Welcome"}
            </h3>
          </div>
          <div className="auth-right">
            <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <form onSubmit={handleAuthSubmit}>
              {!isLogin && <input type="text" placeholder="Full Name" className="auth-input" onChange={(e) => setFormData({...formData, name: e.target.value})} required />}
              <input type="email" placeholder="Email" className="auth-input" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              <input type="password" placeholder="Password" className="auth-input" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
              <button type="submit" className="auth-submit-btn" style={{ background: pendingMode === 'mindCare' ? '#0288D1' : '#6A1B9A' }}>
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </form>
            <p className="auth-switch" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "New here? Sign up" : "Have an account? Login"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;