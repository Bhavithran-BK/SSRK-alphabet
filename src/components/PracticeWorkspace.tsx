import { useParams, useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect, useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { CaseType, LetterData, Stroke } from '../types';
import { markLetterCompleted } from '../utils/progress';
import { sounds } from '../utils/audio';
import LetterWorkspace from './LetterWorkspace';
import PatternTray from './PatternTray';
import CompletionModal from './CompletionModal';

import { lowercaseLetters } from '../data/lowercase';
import { uppercaseLetters } from '../data/uppercase';

const allLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default function PracticeWorkspace() {
  const { caseType, letter } = useParams<{ caseType: string; letter: string }>();
  const navigate = useNavigate();
  const ct = (caseType as CaseType) || 'lowercase';
  const currentLetter = (letter || 'a').toLowerCase();
  const isLower = ct === 'lowercase';

  const [completedStrokes, setCompletedStrokes] = useState<Set<string>>(new Set());
  const [showCompletion, setShowCompletion] = useState(false);
  const [letterData, setLetterData] = useState<LetterData | null>(null);
  const [activeHoveredStrokeId, setActiveHoveredStrokeId] = useState<string | null>(null);

  // High-performance direct DOM dragging refs (0 lag, 120 FPS GPU accelerated)
  const dragElementRef = useRef<HTMLDivElement | null>(null);
  const dragSvgPathRef = useRef<SVGPathElement | null>(null);
  const dragLabelRef = useRef<HTMLDivElement | null>(null);
  const draggingStrokeRef = useRef<Stroke | null>(null);
  const hoveredIdRef = useRef<string | null>(null);

  // Load letter data when letter changes
  useEffect(() => {
    const letters = isLower ? lowercaseLetters : uppercaseLetters;
    const found = letters.find(l => l.character.toLowerCase() === currentLetter);
    setLetterData(found || null);
    setCompletedStrokes(new Set());
    setShowCompletion(false);
    setActiveHoveredStrokeId(null);
    hoveredIdRef.current = null;
    draggingStrokeRef.current = null;
    if (dragElementRef.current) {
      dragElementRef.current.style.display = 'none';
    }
  }, [currentLetter, ct, isLower]);

  const letterIndex = allLetters.indexOf(currentLetter);
  const letterNumber = letterIndex + 1;
  const progressPercent = Math.round((letterNumber / 26) * 100);
  const hasPrev = letterIndex > 0;
  const hasNext = letterIndex < 25;

  const handleStrokeComplete = useCallback((strokeId: string, patternName?: string) => {
    if (patternName) {
      sounds.speakPattern(patternName);
    }
    setCompletedStrokes(prev => {
      const next = new Set(prev);
      next.add(strokeId);

      if (letterData && next.size === letterData.strokes.length) {
        setTimeout(() => {
          sounds.playCelebration();
          markLetterCompleted(ct, currentLetter);
          setShowCompletion(true);
        }, 900);
      }

      return next;
    });
  }, [letterData, ct, currentLetter]);

  const handleReset = useCallback(() => {
    setCompletedStrokes(new Set());
    setShowCompletion(false);
    setActiveHoveredStrokeId(null);
    hoveredIdRef.current = null;
    sounds.playPickup();
  }, []);

  const goToLetter = useCallback((l: string) => {
    navigate(`/practice/${ct}/${l}`);
  }, [navigate, ct]);

  const goPrev = () => {
    if (hasPrev) goToLetter(allLetters[letterIndex - 1]);
  };

  const goNext = () => {
    if (hasNext) goToLetter(allLetters[letterIndex + 1]);
  };

  // Convert screen coordinates to SVG coordinates
  const getSvgCoordinates = (clientX: number, clientY: number): { x: number; y: number } | null => {
    const svg = document.getElementById('letter-workspace-svg') as SVGSVGElement | null;
    if (!svg) return null;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const svgPoint = pt.matrixTransform(ctm.inverse());
    return { x: svgPoint.x, y: svgPoint.y };
  };

  // Start dragging
  const handleStartDrag = useCallback((stroke: Stroke, e: ReactPointerEvent) => {
    draggingStrokeRef.current = stroke;
    sounds.playPickup();

    if (dragElementRef.current && dragSvgPathRef.current && dragLabelRef.current) {
      const displayPath = stroke.previewPath || stroke.targetPath;
      dragSvgPathRef.current.setAttribute('d', displayPath);
      dragLabelRef.current.textContent = stroke.patternName;
      dragElementRef.current.style.display = 'block';
      dragElementRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }
  }, []);

  // Global Pointer Listeners for buttery smooth dragging
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const activeStroke = draggingStrokeRef.current;
      if (!activeStroke || !dragElementRef.current) return;

      dragElementRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

      if (!letterData) return;
      const svgCoords = getSvgCoordinates(e.clientX, e.clientY);
      if (!svgCoords) {
        if (hoveredIdRef.current !== null) {
          hoveredIdRef.current = null;
          setActiveHoveredStrokeId(null);
        }
        return;
      }

      let matchedId: string | null = null;
      for (const s of letterData.strokes) {
        if (completedStrokes.has(s.id)) continue;
        const dist = Math.hypot(svgCoords.x - s.targetX, svgCoords.y - s.targetY);
        if (dist <= 65) {
          matchedId = s.id;
          break;
        }
      }

      if (hoveredIdRef.current !== matchedId) {
        hoveredIdRef.current = matchedId;
        setActiveHoveredStrokeId(matchedId);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      const activeStroke = draggingStrokeRef.current;
      if (!activeStroke) return;

      if (dragElementRef.current) {
        dragElementRef.current.style.display = 'none';
      }
      draggingStrokeRef.current = null;
      hoveredIdRef.current = null;
      setActiveHoveredStrokeId(null);

      if (!letterData) return;
      const svgCoords = getSvgCoordinates(e.clientX, e.clientY);
      if (!svgCoords) {
        sounds.playGentleError();
        return;
      }

      const distToOwnTarget = Math.hypot(svgCoords.x - activeStroke.targetX, svgCoords.y - activeStroke.targetY);
      if (distToOwnTarget <= 65 && !completedStrokes.has(activeStroke.id)) {
        sounds.playSnap();
        handleStrokeComplete(activeStroke.id, activeStroke.patternName);
        return;
      }

      let foundSnap: Stroke | null = null;
      for (const s of letterData.strokes) {
        if (completedStrokes.has(s.id)) continue;
        const d = Math.hypot(svgCoords.x - s.targetX, svgCoords.y - s.targetY);
        if (d <= 65) {
          if (s.patternName === activeStroke.patternName || s.id === activeStroke.id) {
            foundSnap = s;
            break;
          }
        }
      }

      if (foundSnap) {
        sounds.playSnap();
        handleStrokeComplete(foundSnap.id, foundSnap.patternName);
      } else {
        sounds.playGentleError();
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [letterData, completedStrokes, handleStrokeComplete]);

  const displayChar = isLower ? currentLetter : currentLetter.toUpperCase();

  return (
    <div className="h-screen max-h-screen w-full bg-[#fbfbfe] text-[#1e1b4b] flex flex-col justify-between p-3 sm:p-4 overflow-hidden select-none">
      {/* Floating Dragged Preview with rounded corners */}
      <div
        ref={dragElementRef}
        className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 bg-white/95 p-3.5 shadow-2xl border-2 border-indigo-600 scale-105 rounded-lg"
        style={{ display: 'none', top: 0, left: 0 }}
      >
        <div className="w-16 h-16 flex items-center justify-center">
          <svg viewBox="0 0 60 60" className="w-full h-full">
            <path
              ref={dragSvgPathRef}
              d=""
              fill="none"
              stroke="#4f46e5"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          ref={dragLabelRef}
          className="text-xs font-bold text-center text-[#1e1b4b] mt-1 whitespace-nowrap"
        />
      </div>

      {/* TOP HEADER */}
      <header className="w-full border-b border-gray-200/80 pb-2">
        <div className="flex items-center justify-between gap-3">
          {/* Logo & School Name */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <img
              src="/logo.png"
              alt="Sri Sairam Kids Play School"
              className="w-10 h-10 object-contain shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black text-[#1e1b4b] leading-tight tracking-tight">
                Sri Sairam Kids Play School
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-indigo-600">
                we make your child genius
              </span>
            </div>
          </div>

          {/* Practice Badge */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm font-bold text-[#1e1b4b]">
              {isLower ? 'Small Letters Practice' : 'Capital Letters Practice'}
            </span>
            <span className="bg-[#ede9fe] text-[#7c3aed] text-xs font-bold px-3 py-1 border border-purple-200 rounded-full">
              {isLower ? 'a – z' : 'A – Z'}
            </span>
          </div>

          {/* Progress & Navigation (Smooth rounded buttons) */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-[11px] font-semibold text-gray-500">
                Letter {letterNumber} of 26 ({progressPercent}%)
              </span>
              <div className="w-28 sm:w-36 h-2.5 bg-[#ede9fe] overflow-hidden rounded-full">
                <div
                  className="h-full bg-[#22c55e] transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => navigate(`/alphabet/${ct}`)}
              className="px-3.5 py-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-[#1e1b4b] text-xs font-bold transition-all cursor-pointer rounded-md shadow-xs"
            >
              All Letters
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer rounded-md shadow-xs"
            >
              Home
            </button>
          </div>
        </div>
      </header>

      {/* MAIN 3-COLUMN LAYOUT: Fits laptop screen */}
      <main className="flex-1 min-h-0 grid grid-cols-12 gap-3 sm:gap-4 my-2 items-stretch">
        {/* LEFT COLUMN: Mascot & Instructions (col-span-3) */}
        <div className="col-span-3 flex flex-col justify-between gap-2.5 h-full min-h-0">
          {/* Mascot Box */}
          <div className="flex items-center justify-center p-2 bg-white border-2 border-indigo-100/80 rounded-lg shadow-xs shrink-0">
            <img
              src="/mascot.png"
              alt="Mascot"
              className="h-28 sm:h-32 object-contain select-none pointer-events-none"
            />
          </div>

          {/* Instructions Box */}
          <div className="bg-[#f5f3ff] p-4 border border-purple-100 flex-1 flex flex-col justify-between rounded-lg shadow-xs overflow-y-auto">
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-purple-100">
              <span className="text-sm">🎯</span>
              <h3 className="font-bold text-[#1e1b4b] text-sm">
                How to Play
              </h3>
            </div>

            <div className="flex flex-col gap-2.5 text-xs text-gray-700">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 bg-[#7c3aed] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 rounded-full">
                  1
                </span>
                <span className="font-medium leading-snug">
                  Drag a pattern piece from the right panel.
                </span>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 bg-[#7c3aed] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 rounded-full">
                  2
                </span>
                <span className="font-medium leading-snug">
                  Drop it onto the matching stroke track on the letter.
                </span>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 bg-[#7c3aed] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 rounded-full">
                  3
                </span>
                <span className="font-medium leading-snug">
                  When placed correctly, it will snap and turn green!
                </span>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-purple-100 text-[11px] text-gray-500 text-center font-medium">
              Sri Sairam Kids Play School
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN: Letter Workspace with Stroke Tracks (col-span-6) */}
        <div className="col-span-6 flex flex-col items-center justify-center h-full min-h-0">
          {letterData && (
            <LetterWorkspace
              letterData={letterData}
              completedStrokes={completedStrokes}
              activeHoveredStrokeId={activeHoveredStrokeId}
            />
          )}
        </div>

        {/* RIGHT COLUMN: Available Patterns aligned to this letter (col-span-3) */}
        <div className="col-span-3 flex flex-col h-full min-h-0">
          {letterData && (
            <PatternTray
              strokes={letterData.strokes}
              completedStrokes={completedStrokes}
              onStartDrag={handleStartDrag}
            />
          )}
        </div>
      </main>

      {/* BOTTOM ACTION BAR: Smooth rounded buttons */}
      <footer className="w-full border-t border-gray-200/80 pt-2 shrink-0">
        <div className="flex items-center justify-center gap-6 sm:gap-8">
          {/* Previous Button: rounded-2xl */}
          <button
            onClick={goPrev}
            disabled={!hasPrev}
            className={`
              rounded-md px-8 py-2.5 text-sm font-bold border transition-all flex items-center gap-2 shadow-xs
              ${hasPrev
                ? 'bg-gray-100 text-[#1e1b4b] border-gray-300 hover:bg-gray-200 cursor-pointer'
                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50'
              }
            `}
          >
            <span>←</span>
            <span>Previous</span>
          </button>

          {/* Reset Button: rounded-2xl */}
          <button
            onClick={handleReset}
            className="rounded-md px-8 py-2.5 bg-white border-2 border-indigo-600 text-indigo-700 text-sm font-bold hover:bg-indigo-50 transition-all shadow-xs cursor-pointer flex items-center gap-2"
          >
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Reset</span>
          </button>

          {/* Next Button: rounded-2xl */}
          <button
            onClick={goNext}
            disabled={!hasNext}
            className={`
              rounded-md px-10 py-2.5 text-sm font-bold transition-all shadow-md flex items-center gap-2
              ${hasNext
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-indigo-500/20'
                : 'bg-gray-300 text-gray-500 border border-gray-300 cursor-not-allowed opacity-50'
              }
            `}
          >
            <span>Next</span>
            <span>→</span>
          </button>
        </div>
      </footer>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletion && (
          <CompletionModal
            letter={displayChar}
            caseType={ct}
            onNext={hasNext ? goNext : undefined}
            onReplay={handleReset}
            onHome={() => navigate('/')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
