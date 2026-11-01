import { useRef, useState, useEffect } from 'react';
import type { LetterData } from '../types';

interface LetterWorkspaceProps {
  letterData: LetterData;
  completedStrokes: Set<string>;
  activeHoveredStrokeId?: string | null;
}

// Colors for stroke order reference badges (1: pink, 2: blue, 3: orange, 4: green)
const stepColors: Record<number, { bg: string; text: string }> = {
  1: { bg: '#ec4899', text: '#ffffff' }, // Pink
  2: { bg: '#3b82f6', text: '#ffffff' }, // Blue
  3: { bg: '#f97316', text: '#ffffff' }, // Orange
  4: { bg: '#10b981', text: '#ffffff' }, // Green
};

export default function LetterWorkspace({
  letterData,
  completedStrokes,
  activeHoveredStrokeId,
}: LetterWorkspaceProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [justCompletedId, setJustCompletedId] = useState<string | null>(null);

  useEffect(() => {
    if (justCompletedId) {
      const timer = setTimeout(() => setJustCompletedId(null), 500);
      return () => clearTimeout(timer);
    }
  }, [justCompletedId]);

  const isAllComplete = letterData.strokes.every(s => completedStrokes.has(s.id));
  const isLower = letterData.caseType === 'lowercase';
  const displayChar = isLower ? letterData.character.toLowerCase() : letterData.character.toUpperCase();

  return (
    <div className="bg-white border-2 border-indigo-100/80 shadow-md flex flex-col items-center justify-between h-full w-full p-4 sm:p-5 relative rounded-3xl select-none">
      {/* Top Header Label */}
      <div className="w-full flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Letter Stroke Guide
        </span>
        <div className="bg-[#ede9fe] px-4 py-1 flex items-center gap-2 border border-purple-200 rounded-full">
          <span className="text-[#1e1b4b] text-xs font-semibold">Letter:</span>
          <span className="text-[#6d28d9] text-base font-extrabold">{displayChar}</span>
        </div>
      </div>

      {/* SVG Container - Stroke Track & Hollow Line Shape matching Stroke Order Reference */}
      <div className="relative flex-1 min-h-0 w-full flex items-center justify-center p-2">
        <svg
          ref={svgRef}
          viewBox={letterData.viewBox || '0 0 200 200'}
          className="max-h-[50vh] max-w-[50vh] aspect-square w-full h-full"
          id="letter-workspace-svg"
          style={{ touchAction: 'none' }}
        >
          {/* RENDER EACH STROKE AS A HOLLOW TRACK / LINE SHAPE */}
          {letterData.strokes.map((stroke, idx) => {
            const isCompleted = completedStrokes.has(stroke.id);
            const isJustFinished = justCompletedId === stroke.id;
            const isHovered = activeHoveredStrokeId === stroke.id;
            const strokeNum = stroke.strokeNumber || (idx + 1);
            const stepStyle = stepColors[strokeNum] || stepColors[1];
            const startPt = stroke.startPoint || [stroke.targetX, stroke.targetY];
            const isDot = stroke.patternName === 'Dot';

            return (
              <g key={stroke.id} id={`target-stroke-${stroke.id}`}>
                {/* 1. OUTER BORDER of the Stroke Track */}
                {!isCompleted && !isDot && (
                  <path
                    d={stroke.targetPath}
                    fill="none"
                    stroke={isHovered ? '#6366f1' : '#475569'}
                    strokeWidth={isHovered ? '24' : '22'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-colors duration-150"
                  />
                )}

                {/* 2. INNER FILL of the Stroke Track (Hollow tunnel) */}
                {!isCompleted && !isDot && (
                  <path
                    d={stroke.targetPath}
                    fill="none"
                    stroke={isHovered ? '#e0e7ff' : '#f8fafc'}
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-colors duration-150"
                  />
                )}

                {/* 3. CENTER DASHED GUIDELINE inside the track */}
                {!isCompleted && !isDot && (
                  <path
                    d={stroke.targetPath}
                    fill="none"
                    stroke={isHovered ? '#6366f1' : '#94a3b8'}
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* 4. For DOT strokes (circular mark) */}
                {!isCompleted && isDot && (
                  <circle
                    cx={startPt[0]}
                    cy={startPt[1]}
                    r="12"
                    fill={isHovered ? '#e0e7ff' : '#f8fafc'}
                    stroke={isHovered ? '#6366f1' : '#475569'}
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                  />
                )}

                {/* 5. COMPLETED STROKE (Solid Vibrant Green Fill) */}
                {isCompleted && (
                  <path
                    d={stroke.targetPath}
                    fill={isDot ? '#22c55e' : 'none'}
                    stroke="#22c55e"
                    strokeWidth={isDot ? '3' : '20'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={isJustFinished ? 'animate-bounce-in' : ''}
                  />
                )}

                {/* 6. NUMBERED BADGE (1, 2, 3...) at the stroke start point */}
                {!isCompleted && (
                  <g className="pointer-events-none">
                    <circle
                      cx={startPt[0]}
                      cy={startPt[1]}
                      r="10"
                      fill={stepStyle.bg}
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <text
                      x={startPt[0]}
                      y={startPt[1] + 3.5}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="9.5"
                      fontWeight="900"
                    >
                      {strokeNum}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Completion Celebration Overlay */}
        {isAllComplete && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 pointer-events-none rounded-3xl animate-bounce-in">
            <span className="text-6xl mb-2">🎉</span>
            <span className="text-xl font-black text-emerald-600 bg-white px-5 py-1.5 border-2 border-emerald-300 rounded-full shadow-md">
              Letter {displayChar} Completed!
            </span>
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="w-full text-center text-xs text-gray-500 font-medium border-t border-gray-100 pt-2">
        {isAllComplete ? (
          <span className="text-emerald-600 font-bold">Awesome work! Ready for the next letter.</span>
        ) : (
          <span>Drag the patterns from the right and drop them onto the letter tracks</span>
        )}
      </div>
    </div>
  );
}
