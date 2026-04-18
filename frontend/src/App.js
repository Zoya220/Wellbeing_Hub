import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import bgImage from './background.jpg';
import Assessment from './components/Assessment';
import Header from './components/Header';
import Footer from './components/Footer';

// --- LOCAL AUDIO IMPORTS ---
import birdsChirpingMp3 from './birds-chirping.mp3';
import calmMp3 from './calm.mp3';
import rainMp3 from './rain.mp3';

const motivationQuotes = {
  mindCare: [
    "“Your calm mind is the ultimate weapon against your challenges.”",
    "“The soul always knows what to do to heal itself.”",
    "“Breathe. It’s just a bad day, not a bad life.”",
    "“In the middle of confusion, find stillness.”",
    "“Quiet the mind, and the soul will speak.”"
  ],
  personality: [
    "“Confidence is not ‘they will like me.’ Confidence is ‘I’ll be fine if they don’t.’”",
    "“The only way to do great work is to love what you do.”",
    "“Leadership is an action, not a position.”",
    "“Your identity is a work in progress. Build it with intention.”",
    "“Success is the sum of small efforts, repeated day in and day out.”"
  ]
};

function App() {
  const [currentQuote, setCurrentQuote] = useState("");

  // --- CORE STATES ---
  const [isAssessing, setIsAssessing] = useState(false);
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

  // --- COMMUNICATION STATES ---
  const [showCommunication, setShowCommunication] = useState(false);
  const [commDraft, setCommDraft] = useState("");
  const [commResult, setCommResult] = useState("");
  const [isRefining, setIsRefining] = useState(false);

  // --- CONFIDENCE STATES ---
  const [showConfidence, setShowConfidence] = useState(false);
  const [poseTimer, setPoseTimer] = useState(120);
  const [isPoseActive, setIsPoseActive] = useState(false);

  // --- DECISION MAKING STATES ---
  const [showDecisionMaking, setShowDecisionMaking] = useState(false);
  const [dilemma, setDilemma] = useState("");
  const [frameworkResult, setFrameworkResult] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // --- LEADERSHIP STATES ---
  const [showLeadership, setShowLeadership] = useState(false);
  const [critiqueInput, setCritiqueInput] = useState("");
  const [feedbackResult, setFeedbackResult] = useState("");
  const [isReframing, setIsReframing] = useState(false);

  // --- TIME MANAGEMENT STATES ---
  const [showTimeMgmt, setShowTimeMgmt] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, type: 'big', text: '', done: false },
    { id: 2, type: 'med', text: '', done: false },
    { id: 3, type: 'med', text: '', done: false },
    { id: 4, type: 'med', text: '', done: false },
    { id: 5, type: 'small', text: '', done: false },
    { id: 6, type: 'small', text: '', done: false },
    { id: 7, type: 'small', text: '', done: false },
    { id: 8, type: 'small', text: '', done: false },
    { id: 9, type: 'small', text: '', done: false }
  ]);

  // ==========================================
  // --- COGNITIVE CIRCUIT (BRAIN EXERCISE) ---
  // ==========================================
  const [showBrainExercise, setShowBrainExercise] = useState(false);
  const [circuitStage, setCircuitStage] = useState(1);
  const [circuitFeedback, setCircuitFeedback] = useState({ type: '', text: '' });
  const inputRef = useRef(null);

  const [brainSequence, setBrainSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isWatching, setIsWatching] = useState(false);
  const [highlightedGrid, setHighlightedGrid] = useState(null);
  const syncTargetScore = 3;

  const mindWords = ["FOCUS", "PEACE", "BREATHE", "CALM", "CLARITY"];
  const [currentWord, setCurrentWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [wordInput, setWordInput] = useState("");
  const [wordsSolved, setWordsSolved] = useState(0);
  const wordsTargetScore = 2;

  const [mathEquation, setMathEquation] = useState({ q: "", a: 0 });
  const [mathInput, setMathInput] = useState("");
  const [mathSolved, setMathSolved] = useState(0);
  const mathTargetScore = 3;

  // ==========================================
  // --- STATIC DATA ---
  // ==========================================
  const focusWords = ["Peace", "Stillness", "Clarity", "Presence", "Gratitude", "Softness"];

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
    "Communication": { thought: "Clear thoughts lead to clear words.", icon: "🗣️", color: "#6A1B9A" },
    "Decision Making": { thought: "Objectivity is the enemy of anxiety.", icon: "⚖️", color: "#6A1B9A" },
    "Leadership": { thought: "Great leaders critique the work, not the person.", icon: "👑", color: "#6A1B9A" },
    "Time Mgmt": { thought: "Focus on being productive instead of busy.", icon: "⏳", color: "#6A1B9A" }
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
    if (mode !== 'home') {
      const quotes = motivationQuotes[mode];
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }
  }, [mode]); // This runs every time you switch between Mind and Identity

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

  useEffect(() => {
    let interval = null;
    if (isPoseActive && poseTimer > 0 && !showQuitConfirm) {
      interval = setInterval(() => {
        setPoseTimer((time) => time - 1);
      }, 1000);
    } else if (poseTimer === 0) {
      setIsPoseActive(false);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPoseActive, poseTimer, showQuitConfirm]);

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
      { title: "Breathing Space", icon: "🌬️", desc: "Regulate system." },
      { title: "Meditation Room", icon: "🧘", desc: "Focus sessions." },
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
    while (scrambled === word) {
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
  // --- IDENTITY BLOOM LOGIC ---
  // ==========================================
  const handleRefinePitch = () => {
    if (!commDraft.trim()) return;
    setIsRefining(true);

    setTimeout(() => {
      setCommResult(
        "Here is a more formalized, structured version of your draft:\n\n" +
        "1. Hook: Start with the core problem you are solving.\n" +
        "2. Value: Clearly state your solution (e.g., 'This platform utilizes...').\n" +
        "3. Ask: End with a clear call to action or next step."
      );
      setIsRefining(false);
    }, 1500);
  };

  const handleAnalyzeDecision = (frameworkType) => {
    if (!dilemma.trim()) return;
    setIsAnalyzing(true);
    setFrameworkResult("");

    setTimeout(() => {
      let result = "";
      switch (frameworkType) {
        case 'inversion':
          result = `🔍 Inversion Analysis:\nInstead of asking how to succeed, ask: "What is the absolute worst-case scenario if I proceed with this, and how do I guarantee failure?"\n\nAction: Identify those failure points and build safeguards against them.`;
          break;
        case 'eisenhower':
          result = `⏳ Eisenhower Matrix:\n1. Is this critical to your long-term goals? (Important)\n2. Is there a strict, immediate deadline? (Urgent)\n\nAction: If it's both, do it now. If just important, schedule it. If just urgent, delegate or automate it. If neither, drop it.`;
          break;
        case 'safety':
          result = `🛡️ Margin of Safety:\nDoes this decision leave room for error? If your primary assumption is wrong, what is the intrinsic value you fall back on?\n\nAction: Never optimize for 100% efficiency if it means a 0% survival rate on failure. Build in a buffer.`;
          break;
        default:
          result = "Model applied.";
      }
      setFrameworkResult(result);
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleReframeFeedback = () => {
    if (!critiqueInput.trim()) return;
    setIsReframing(true);

    setTimeout(() => {
      setFeedbackResult(
        "Here is a constructive way to frame this using the SBI Model:\n\n" +
        "📍 Situation: State exactly where and when this happened to anchor the conversation.\n" +
        "👀 Behavior: Describe the observable action without assuming their intent.\n" +
        "💥 Impact: Explain how this behavior specifically affected the team or project timeline.\n\n" +
        "💡 Ask: End with 'How can we work together to resolve this moving forward?' to invite collaboration."
      );
      setIsReframing(false);
    }, 1500);
  };

  // 1-3-5 List Handlers
  const handleTaskChange = (id, newText) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text: newText } : t));
  };

  const handleTaskToggle = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
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

      // Mind Bloom Features
      if (activeFeatureTitle === "Breathing Space") setShowBreathing(true);
      if (activeFeatureTitle === "Meditation Room") {
        setShowMeditation(true);
        setFocusWord(focusWords[Math.floor(Math.random() * focusWords.length)]);
      }
      if (activeFeatureTitle === "Stress Shield") setShowStressShield(true);
      if (activeFeatureTitle === "Nature Audio") setShowNatureAudio(true);
      if (activeFeatureTitle === "Cognitive Circuit") setShowBrainExercise(true); // Fixed mapping

      // Identity Bloom Features
      if (activeFeatureTitle === "Communication") setShowCommunication(true);
      if (activeFeatureTitle === "Confidence") setShowConfidence(true);
      if (activeFeatureTitle === "Decision Making") setShowDecisionMaking(true);
      if (activeFeatureTitle === "Leadership") setShowLeadership(true);
      if (activeFeatureTitle === "Time Mgmt") setShowTimeMgmt(true);
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
      setShowCommunication(false);
      setShowConfidence(false);
      setShowDecisionMaking(false);
      setShowLeadership(false);
      setShowTimeMgmt(false);

      setIsActive(false);
      setJournalEntry("");
      setAiResponse("");
      setMeditationTime(initialMeditationTime);
      setBreathPhase('Inhale');

      setCommDraft("");
      setCommResult("");
      setIsPoseActive(false);
      setPoseTimer(120);

      setDilemma("");
      setFrameworkResult("");

      setCritiqueInput("");
      setFeedbackResult("");

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
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (meditationTime / initialMeditationTime) * circumference;

  return (
    <div className={`main-wrapper ${isExiting ? 'fade-out' : 'fade-in'}`} style={{ background: activeTheme.bg }}>

      {/* 1. HEADER */}
      {mode !== 'home' && (
        <Header
          user={user}
          activeTheme={activeTheme}
          onHome={() => transitionTo(() => setMode('home'))}
          onLogout={() => transitionTo(() => { setUser(null); setMode('home'); })}
        />
      )}

      {/* 2. MAIN CONTENT AREA */}
      <div className="content-area" style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
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
          <div className="section-container" style={{ padding: '40px 20px' }}>
            <div className="inner-content">
              {/* THIS IS THE LOGIC THAT SWAPS THE SCREEN */}
              {!isAssessing ? (
                <>
                  {/* Mid-Section Hero */}
                  <div className="section-hero" style={{ padding: '40px 20px', backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: '30px', marginBottom: '50px', backdropFilter: 'blur(10px)', textAlign: 'center' }}>
                    <h1 className="section-title" style={{ color: activeTheme.accent, fontSize: '2.5rem' }}>
                      The {mode === 'mindCare' ? 'Sanctuary' : 'Edge'}
                    </h1>
                    {/* DYNAMIC MOTIVATION QUOTE */}
                    <p style={{
                      fontSize: '1.2rem',
                      color: activeTheme.accent,
                      fontWeight: '600',
                      marginBottom: '10px',
                      fontStyle: 'italic',
                      animation: 'fadeIn 1s ease-in'
                    }}>
                      {currentQuote}
                    </p>

                    {/* MAIN DESCRIPTION */}
                    <p style={{ fontSize: '1rem', color: '#555', maxWidth: '700px', margin: '0 auto 10px', fontWeight: '500' }}>
                      {mode === 'mindCare'
                        ? "A space to breathe, focus, and find your inner calm."
                        : "A toolkit designed to sharpen your professional presence."}
                    </p>

                    {/* SMALLER SUB-DESCRIPTION */}
                    <p style={{ fontSize: '0.85rem', color: '#777', maxWidth: '600px', margin: '0 auto 30px', lineHeight: '1.5' }}>
                      {mode === 'mindCare'
                        ? "Discover guided exercises to reduce stress and improve your mental clarity through mindfulness techniques."
                        : "Build your leadership identity and communication skills with curated tools designed for the modern professional."}
                    </p>
                    <button onClick={() => setIsAssessing(true)} className="bloom-btn" style={{ background: activeTheme.accent, width: 'auto', padding: '0 40px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                      ✨ Start Skill Assessment
                    </button>
                  </div>

                  {/* Feature Cards Grid */}
                  <div className="card-grid-single-line">
                    {featureLists[mode].map((feature, i) => (
                      <div key={i} className="feature-card-small" onClick={() => handleFeatureClick(feature.title)}>
                        <div className="card-icon-small">{feature.icon}</div>
                        <h3 style={{ color: activeTheme.accent }}>{feature.title}</h3>
                        <p>{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <Assessment
                  mode={mode}
                  onComplete={(result) => {
                    setIsAssessing(false);
                    if (result) {
                      // If they finish the quiz, open the specific recommendation
                      handleFeatureClick(result);
                    }
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. FOOTER */}{/* 3. FOOTER: Now hidden on the home page gate */}
      {mode !== 'home' && (
        <Footer
          mode={mode}
          activeTheme={activeTheme}
          onNavigate={(targetMode) => {
            transitionTo(() => {
              setMode(targetMode);
              setIsAssessing(false);
              window.scrollTo(0, 0);
            });
          }}
        />
      )}

      {/* 4. ALL OVERLAYS (Keep these inside the wrapper) */}

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

      {/* --- MIND BLOOM OVERLAYS --- */}

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

      {/* COGNITIVE CIRCUIT */}
      {showBrainExercise && (
        <div className="brain-exercise-overlay">
          <button className="breath-quit-btn" onClick={() => setShowQuitConfirm(true)}>×</button>
          <div className="brain-container">
            <div className="circuit-progress">
              <div className={`progress-dot ${circuitStage >= 1 ? (circuitStage > 1 ? 'completed' : 'active') : ''}`}></div>
              <div className={`progress-dot ${circuitStage >= 2 ? (circuitStage > 2 ? 'completed' : 'active') : ''}`}></div>
              <div className={`progress-dot ${circuitStage >= 3 ? (circuitStage > 3 ? 'completed' : 'active') : ''}`}></div>
            </div>

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
                  <br />
                  <button type="submit" className="game-submit-btn" style={{ display: 'none' }}>Submit</button>
                </form>
              </>
            )}

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
                  <br />
                  <button type="submit" className="game-submit-btn" style={{ display: 'none' }}>Submit</button>
                </form>
              </>
            )}

            {circuitStage === 4 && (
              <>
                <div className="completion-icon">🌟</div>
                <h1 className="brain-title">Circuit Complete</h1>
                <p className="brain-sub" style={{ textTransform: 'none', fontSize: '1.1rem', marginTop: '20px' }}>
                  Your mind is sharp, focused, and ready for whatever comes next.
                </p>
                <button className="game-submit-btn" onClick={handleQuitSession}>Return to Sanctuary</button>
              </>
            )}

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
                <button className="clear-shield-btn" onClick={() => { setAiResponse(""); setJournalEntry(""); }}>Clear Mind</button>
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

                  {track.downloadFile && (
                    <a
                      href={track.downloadFile}
                      download={`${track.title.replace(/\s+/g, '-').toLowerCase()}.mp3`}
                      className="download-btn"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: 'inline-block',
                        marginTop: '10px',
                        fontSize: '0.85rem',
                        color: '#0288D1',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        background: 'rgba(2, 136, 209, 0.1)'
                      }}
                    >
                      ⬇️ Download
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

      {/* --- IDENTITY BLOOM OVERLAYS --- */}

      {/* COMMUNICATION MODULE */}
      {showCommunication && (
        <div className="stress-shield-overlay" style={{ background: 'rgba(74, 20, 140, 0.95)' }}>
          <button className="breath-quit-btn" onClick={() => setShowQuitConfirm(true)}>×</button>
          <div className="shield-container">
            <h1 className="shield-title" style={{ color: '#E1BEE7' }}>Pitch Perfector</h1>
            <p className="shield-sub" style={{ color: '#F3E5F5' }}>Draft your email, interview answer, or project pitch. Let's refine it for clarity and impact.</p>
            <textarea
              className="journal-input"
              placeholder="Paste your rough draft here..."
              value={commDraft}
              onChange={(e) => setCommDraft(e.target.value)}
              style={{ borderLeft: '4px solid #9C27B0' }}
            />
            <div className="shield-actions">
              <button
                className="reflect-btn"
                onClick={handleRefinePitch}
                disabled={isRefining || !commDraft}
                style={{ background: '#7B1FA2', color: 'white' }}
              >
                {isRefining ? "Refining..." : "Formalize Draft"}
              </button>
            </div>
            {commResult && (
              <div className="ai-response-box" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <p className="ai-text" style={{ whiteSpace: 'pre-line', color: 'white' }}>{commResult}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CONFIDENCE MODULE */}
      {showConfidence && (
        <div className="meditation-overlay" style={{ background: 'rgba(74, 20, 140, 0.95)' }}>
          <button className="breath-quit-btn" onClick={() => setShowQuitConfirm(true)}>×</button>
          <div className="meditation-container">
            <h1 className="shield-title" style={{ color: '#E1BEE7', textAlign: 'center', marginBottom: '10px' }}>Power Posture</h1>
            <p className="shield-sub" style={{ color: '#F3E5F5', textAlign: 'center', marginBottom: '30px' }}>
              Stand up. Shoulders back. Chin up. Hold for 2 minutes to lower cortisol and boost presence.
            </p>

            <div className="meditation-timer-circle">
              <svg className="timer-svg" viewBox="0 0 320 320">
                <circle className="bg-circle" cx="160" cy="160" r={radius} stroke="rgba(255,255,255,0.1)"></circle>
                <circle
                  className="progress-circle"
                  cx="160" cy="160" r={radius}
                  stroke="#CE93D8"
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: circumference - (poseTimer / 120) * circumference,
                    transition: 'stroke-dashoffset 1s linear'
                  }}
                ></circle>
              </svg>
              <div className="timer-display">
                <span className="time-numbers" style={{ color: 'white' }}>{formatTime(poseTimer)}</span>
                {poseTimer === 0 && <span style={{ display: 'block', color: '#CE93D8', marginTop: '10px', fontSize: '1.2rem', fontWeight: 'bold' }}>You are ready.</span>}
              </div>
            </div>

            <div className="meditation-controls" style={{ marginTop: '40px' }}>
              <button
                className={`med-start-stop ${isPoseActive ? "active-session" : ""}`}
                onClick={() => setIsPoseActive(!isPoseActive)}
                style={{ background: isPoseActive ? 'transparent' : '#7B1FA2', border: isPoseActive ? '2px solid #7B1FA2' : 'none' }}
              >
                {isPoseActive ? "Pause" : (poseTimer === 0 ? "Reset" : "Start Pose")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DECISION MAKING MODULE */}
      {showDecisionMaking && (
        <div className="stress-shield-overlay" style={{ background: 'rgba(74, 20, 140, 0.95)' }}>
          <button className="breath-quit-btn" onClick={() => setShowQuitConfirm(true)}>×</button>
          <div className="shield-container">
            <h1 className="shield-title" style={{ color: '#E1BEE7' }}>Mental Models</h1>
            <p className="shield-sub" style={{ color: '#F3E5F5' }}>Define your dilemma and view it through a proven framework.</p>

            <textarea
              className="journal-input"
              placeholder="What decision are you currently weighing? (e.g., Should I pivot to a new tech stack?)"
              value={dilemma}
              onChange={(e) => setDilemma(e.target.value)}
              style={{ borderLeft: '4px solid #AB47BC', height: '100px', minHeight: '100px' }}
            />

            <div className="bloom-button-container" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
              <button
                className="bloom-btn"
                onClick={() => handleAnalyzeDecision('inversion')}
                disabled={isAnalyzing || !dilemma}
                style={{ background: '#8E24AA', fontSize: '0.9rem', padding: '10px 15px' }}
              >
                Inversion
              </button>
              <button
                className="bloom-btn"
                onClick={() => handleAnalyzeDecision('eisenhower')}
                disabled={isAnalyzing || !dilemma}
                style={{ background: '#7B1FA2', fontSize: '0.9rem', padding: '10px 15px' }}
              >
                Eisenhower Matrix
              </button>
              <button
                className="bloom-btn"
                onClick={() => handleAnalyzeDecision('safety')}
                disabled={isAnalyzing || !dilemma}
                style={{ background: '#6A1B9A', fontSize: '0.9rem', padding: '10px 15px' }}
              >
                Margin of Safety
              </button>
            </div>

            {isAnalyzing && <p style={{ color: '#CE93D8', textAlign: 'center', marginTop: '20px' }}>Applying framework...</p>}

            {frameworkResult && (
              <div className="ai-response-box" style={{ background: 'rgba(255,255,255,0.1)', marginTop: '20px' }}>
                <p className="ai-text" style={{ whiteSpace: 'pre-line', color: 'white', fontSize: '0.95rem' }}>{frameworkResult}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LEADERSHIP MODULE */}
      {showLeadership && (
        <div className="stress-shield-overlay" style={{ background: 'rgba(74, 20, 140, 0.95)' }}>
          <button className="breath-quit-btn" onClick={() => setShowQuitConfirm(true)}>×</button>
          <div className="shield-container">
            <h1 className="shield-title" style={{ color: '#E1BEE7' }}>Feedback Framer</h1>
            <p className="shield-sub" style={{ color: '#F3E5F5' }}>Great leaders critique the work, not the person. Reframe your raw feedback.</p>

            <textarea
              className="journal-input"
              placeholder="What do you want to tell your team member? (e.g., 'Your code is messy and broke the build.')"
              value={critiqueInput}
              onChange={(e) => setCritiqueInput(e.target.value)}
              style={{ borderLeft: '4px solid #AB47BC', height: '120px', minHeight: '120px' }}
            />

            <div className="shield-actions">
              <button
                className="reflect-btn"
                onClick={handleReframeFeedback}
                disabled={isReframing || !critiqueInput}
                style={{ background: '#7B1FA2', color: 'white' }}
              >
                {isReframing ? "Reframing..." : "Generate Constructive Feedback"}
              </button>
            </div>

            {feedbackResult && (
              <div className="ai-response-box" style={{ background: 'rgba(255,255,255,0.1)', marginTop: '20px' }}>
                <p className="ai-text" style={{ whiteSpace: 'pre-line', color: 'white', fontSize: '0.95rem' }}>{feedbackResult}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TIME MANAGEMENT MODULE */}
      {showTimeMgmt && (
        <div className="stress-shield-overlay" style={{ background: 'rgba(74, 20, 140, 0.95)', alignItems: 'flex-start', paddingTop: '5vh' }}>
          <button className="breath-quit-btn" onClick={() => setShowQuitConfirm(true)}>×</button>
          <div className="shield-container" style={{ width: '900px', display: 'flex', flexDirection: 'column', height: '90vh', padding: '0 20px' }}>
            <h1 className="shield-title" style={{ color: '#E1BEE7' }}>The 1-3-5 Focus List</h1>
            <p className="shield-sub" style={{ color: '#F3E5F5', marginBottom: '10px' }}>Commit to 1 Big, 3 Medium, and 5 Small tasks to conquer your day.</p>

            <div style={{ display: 'flex', gap: '20px', flex: 1, overflowY: 'auto', textAlign: 'left', paddingBottom: '30px' }}>

              {/* 1 Big Thing */}
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', padding: '20px', borderRadius: '15px', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: '#E1BEE7', borderBottom: '2px solid #AB47BC', paddingBottom: '10px', margin: '0 0 15px 0' }}>1 Big Thing</h3>
                {tasks.filter(t => t.type === 'big').map(t => (
                  <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <input type="checkbox" checked={t.done} onChange={() => handleTaskToggle(t.id)} style={{ transform: 'scale(1.5)', cursor: 'pointer' }} />
                    <input type="text" value={t.text} onChange={(e) => handleTaskChange(t.id, e.target.value)} placeholder="Crucial task..."
                      style={{
                        width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.9)',
                        textDecoration: t.done ? 'line-through' : 'none', opacity: t.done ? 0.6 : 1, fontSize: '1rem', outline: 'none'
                      }} />
                  </div>
                ))}
              </div>

              {/* 3 Medium Things */}
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', padding: '20px', borderRadius: '15px', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: '#CE93D8', borderBottom: '2px solid #8E24AA', paddingBottom: '10px', margin: '0 0 15px 0' }}>3 Medium Things</h3>
                {tasks.filter(t => t.type === 'med').map(t => (
                  <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <input type="checkbox" checked={t.done} onChange={() => handleTaskToggle(t.id)} style={{ transform: 'scale(1.3)', cursor: 'pointer' }} />
                    <input type="text" value={t.text} onChange={(e) => handleTaskChange(t.id, e.target.value)} placeholder="Important task..."
                      style={{
                        width: '100%', padding: '10px', borderRadius: '6px', border: 'none', background: 'rgba(255,255,255,0.9)',
                        textDecoration: t.done ? 'line-through' : 'none', opacity: t.done ? 0.6 : 1, fontSize: '0.95rem', outline: 'none'
                      }} />
                  </div>
                ))}
              </div>

              {/* 5 Small Things */}
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', padding: '20px', borderRadius: '15px', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: '#BA68C8', borderBottom: '2px solid #7B1FA2', paddingBottom: '10px', margin: '0 0 15px 0' }}>5 Small Things</h3>
                {tasks.filter(t => t.type === 'small').map(t => (
                  <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <input type="checkbox" checked={t.done} onChange={() => handleTaskToggle(t.id)} style={{ transform: 'scale(1.1)', cursor: 'pointer' }} />
                    <input type="text" value={t.text} onChange={(e) => handleTaskChange(t.id, e.target.value)} placeholder="Quick task..."
                      style={{
                        width: '100%', padding: '8px', borderRadius: '4px', border: 'none', background: 'rgba(255,255,255,0.9)',
                        textDecoration: t.done ? 'line-through' : 'none', opacity: t.done ? 0.6 : 1, fontSize: '0.9rem', outline: 'none'
                      }} />
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- UTILITY OVERLAYS --- */}

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
              {!isLogin && <input type="text" placeholder="Full Name" className="auth-input" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />}
              <input type="email" placeholder="Email" className="auth-input" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              <input type="password" placeholder="Password" className="auth-input" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
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