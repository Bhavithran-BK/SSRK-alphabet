import { useRef, useState, useEffect, useCallback } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { LetterData, Stroke, PatternName } from '../types';
import { sounds } from '../utils/audio';

interface LetterWorkspaceProps {
  letterData: LetterData;
  completedStrokes: Set<string>;
  onStrokeComplete: (strokeId: string) => void;
  selectedPattern?: PatternName | null;
  onClearSelectedPattern?: () => void;
  activeDragPattern?: PatternName | null;
  activeDragStroke?: Stroke | null;
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
  onStrokeComplete,
  selectedPattern,
  onClearSelectedPattern,
  activeDragPattern,
  activeDragStroke,
}: LetterWorkspaceProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hoveredStrokeId, setHoveredStrokeId] = useState<string | null>(null);
  const [justCompletedId, setJustCompletedId] = useState<string | null>(null);

  useEffect(() => {
    if (justCompletedId) {
      const timer = setTimeout(() => setJustCompletedId(null), 600);
      return () => clearTimeout(timer);
    }
  }, [justCompletedId]);

  const isPatternCompatible = useCallback((dragged: PatternName, target: PatternName) => {
    if (dragged === target) return true;
    if (
      (dragged === 'Curve' || dragged === 'Left Curve' || dragged === 'Right Curve') &&
      (target === 'Curve' || target === 'Left Curve' || target === 'Right Curve')
    ) {
      return true;
    }
    return false;
  }, []);

  const attemptSnap = useCallback((stroke: Stroke, patternToUse: PatternName) => {
    if (completedStrokes.has(stroke.id)) return false;

    if (isPatternCompatible(patternToUse, stroke.patternName)) {
      sounds.playSnap();
      setJustCompletedId(stroke.id);
      onStrokeComplete(stroke.id);
      if (onClearSelectedPattern) onClearSelectedPattern();
      return true;
    } else {
      sounds.playGentleError();
      return false;
    }
  }, [completedStrokes, isPatternCompatible, onStrokeComplete, onClearSelectedPattern]);

  const getSvgCoords = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const pt = svgRef.current.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svgRef.current.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const svgP = pt.matrixTransform(ctm.inverse());
    return { x: svgP.x, y: svgP.y };
  }, []);

  const handleSvgPointerUp = useCallback((e: ReactPointerEvent) => {
    const pattern = activeDragPattern || selectedPattern;
    if (!pattern) return;

    if (activeDragStroke && !completedStrokes.has(activeDragStroke.id)) {
      const { x, y } = getSvgCoords(e.clientX, e.clientY);
      const dist = Math.hypot(x - activeDragStroke.targetX, y - activeDragStroke.targetY);
      if (dist < 65) {
        attemptSnap(activeDragStroke, pattern);
        return;
      }
    }

    const { x, y } = getSvgCoords(e.clientX, e.clientY);

    let closestStroke: Stroke | null = null;
    let minDistance = 60;

    for (const stroke of letterData.strokes) {
      if (completedStrokes.has(stroke.id)) continue;
      const dist = Math.hypot(x - stroke.targetX, y - stroke.targetY);
      if (dist < minDistance) {
        minDistance = dist;
        closestStroke = stroke;
      }
    }

    if (closestStroke) {
      attemptSnap(closestStroke, pattern);
    }
  }, [activeDragPattern, selectedPattern, activeDragStroke, getSvgCoords, letterData.strokes, completedStrokes, attemptSnap]);

  const handleTargetClick = (stroke: Stroke) => {
    if (completedStrokes.has(stroke.id)) return;

    if (selectedPattern) {
      attemptSnap(stroke, selectedPattern);
    } else {
      sounds.playPickup();
      setHoveredStrokeId(stroke.id);
      setTimeout(() => setHoveredStrokeId(null), 1200);
    }
  };

  const isAllComplete = letterData.strokes.every(s => completedStrokes.has(s.id));
  const isLower = letterData.caseType === 'lowercase';
  const displayChar = isLower ? letterData.character.toLowerCase() : letterData.character.toUpperCase();

  return (
    <div className="bg-white border border-purple-100 shadow-sm flex flex-col items-center justify-between h-full w-full p-3 sm:p-4 relative rounded-none">
      {/* Top Pill Badge */}
      <div className="mb-2">
        <div className="bg-[#f3e8ff] px-5 py-1 flex items-center gap-2 border border-purple-100 rounded-none">
          <span className="text-[#1e1b4b] text-xs sm:text-sm font-semibold">Practice Letter:</span>
          <span className="text-[#6d28d9] text-base font-extrabold">{displayChar}</span>
        </div>
      </div>

      {/* SVG Container - Responsive & constrained to viewport height so bottom buttons never get cut off */}
      <div className="relative flex-1 min-h-0 w-full flex items-center justify-center p-1">
        <svg
          ref={svgRef}
          viewBox={letterData.viewBox || '0 0 200 200'}
          className="max-h-[48vh] max-w-[48vh] aspect-square w-full h-full"
          onPointerUp={handleSvgPointerUp}
          style={{ touchAction: 'none' }}
        >
          {/* Subtle outline track */}
          <path
            d={letterData.referencePath}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dotted Reference Outline */}
          <path
            d={letterData.referencePath}
            fill="none"
            stroke="#64748b"
            strokeWidth="5.5"
            strokeDasharray="0.1 14"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-opacity duration-300"
            style={{ opacity: isAllComplete ? 0.2 : 0.85 }}
          />

          {/* Individual Stroke targets & completed strokes */}
          {letterData.strokes.map((stroke, idx) => {
            const isCompleted = completedStrokes.has(stroke.id);
            const isJustFinished = justCompletedId === stroke.id;
            const isHovered = hoveredStrokeId === stroke.id;
            const isMatchingSelected = selectedPattern && isPatternCompatible(selectedPattern, stroke.patternName);
            const shouldHighlight = !isCompleted && (isHovered || isMatchingSelected);
            const strokeNum = stroke.strokeNumber || (idx + 1);
            const stepStyle = stepColors[strokeNum] || stepColors[1];
            const startPt = stroke.startPoint || [stroke.targetX, stroke.targetY];

            return (
              <g key={stroke.id}>
                {/* 1. Dotted Stroke when not yet completed */}
                {!isCompleted && (
                  <path
                    d={stroke.targetPath}
                    fill="none"
                    stroke={shouldHighlight ? '#6366f1' : '#64748b'}
                    strokeWidth={shouldHighlight ? '6.5' : '5.5'}
                    strokeDasharray={shouldHighlight ? '0.1 11' : '0.1 14'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-200"
                  />
                )}

                {/* 2. Completed Stroke (Vivid Green) */}
                {isCompleted && (
                  <path
                    d={stroke.targetPath}
                    fill={stroke.patternName === 'Dot' ? '#22c55e' : 'none'}
                    stroke="#22c55e"
                    strokeWidth={stroke.patternName === 'Dot' ? '2' : '7.5'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={isJustFinished ? 'animate-bounce-in' : ''}
                  />
                )}

                {/* 3. Wide invisible touch hit area */}
                {!isCompleted && (
                  <path
                    d={stroke.targetPath}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="38"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="cursor-pointer"
                    onPointerEnter={() => setHoveredStrokeId(stroke.id)}
                    onPointerLeave={() => setHoveredStrokeId(null)}
                    onClick={() => handleTargetClick(stroke)}
                  />
                )}

                {/* 4. Stroke Order Badge (1, 2, 3...) at start */}
                {!isCompleted && (
                  <g className="pointer-events-none transition-all duration-300">
                    <circle
                      cx={startPt[0]}
                      cy={startPt[1]}
                      r={shouldHighlight ? '11' : '9.5'}
                      fill={stepStyle.bg}
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <text
                      x={startPt[0]}
                      y={startPt[1] + 3.5}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="9"
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

        {/* Completion celebration icon */}
        {isAllComplete && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-bounce-in">
            <span className="text-6xl drop-shadow-md">🎉</span>
          </div>
        )}
      </div>

      <div className="text-center text-xs text-gray-400">
        Match the patterns to complete letter {displayChar}
      </div>
    </div>
  );
}
