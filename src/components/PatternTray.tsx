import type { PointerEvent as ReactPointerEvent } from 'react';
import type { Stroke, PatternName } from '../types';
import type { PatternConfig } from '../data/patterns';
import { sounds } from '../utils/audio';

interface PatternTrayProps {
  strokes: Stroke[];
  completedStrokes: Set<string>;
  patternConfigs: Record<PatternName, PatternConfig>;
  selectedPattern?: PatternName | null;
  onSelectPattern?: (patternName: PatternName | null) => void;
  onStartDrag?: (patternName: PatternName, e: ReactPointerEvent, stroke?: Stroke) => void;
}

const stepColors: Record<number, { bg: string; text: string }> = {
  1: { bg: '#ec4899', text: '#ffffff' },
  2: { bg: '#3b82f6', text: '#ffffff' },
  3: { bg: '#f97316', text: '#ffffff' },
  4: { bg: '#10b981', text: '#ffffff' },
};

export default function PatternTray({
  strokes,
  completedStrokes,
  selectedPattern,
  onSelectPattern,
  onStartDrag,
}: PatternTrayProps) {
  return (
    <div className="bg-white border border-purple-100 shadow-sm flex flex-col h-full w-full p-4 rounded-none">
      {/* Header with Puzzle Icon */}
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
        <div className="text-indigo-600">
          <svg className="w-5 h-5 fill-current text-indigo-600" viewBox="0 0 24 24">
            <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5a2.5 2.5 0 0 0-5 0V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5a2.5 2.5 0 0 0 0-5z" />
          </svg>
        </div>
        <h2 className="text-base font-bold text-[#1e1b4b] tracking-tight">
          Available Patterns
        </h2>
      </div>

      {/* Pattern Cards List - Aligned to each stroke with rounded-none */}
      <div className="flex flex-col gap-2.5 flex-1 overflow-y-auto pr-1">
        {strokes.map((stroke, index) => {
          const isDone = completedStrokes.has(stroke.id);
          const isSelected = selectedPattern === stroke.patternName;
          const strokeNum = stroke.strokeNumber || (index + 1);
          const stepStyle = stepColors[strokeNum] || stepColors[1];
          const displayPath = stroke.previewPath || stroke.targetPath;

          return (
            <div
              key={stroke.id}
              className={`
                relative bg-white border transition-all select-none p-3 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing rounded-none
                ${isDone
                  ? 'border-emerald-200 bg-emerald-50/40 opacity-70 cursor-default'
                  : isSelected
                  ? 'border-indigo-600 shadow-md ring-2 ring-indigo-200'
                  : 'border-purple-200 hover:border-indigo-400 hover:shadow-xs'
                }
              `}
              onPointerDown={(e) => {
                if (isDone) return;
                sounds.playPickup();
                if (onStartDrag) onStartDrag(stroke.patternName, e, stroke);
                if (onSelectPattern) onSelectPattern(isSelected ? null : stroke.patternName);
              }}
            >
              {/* Stroke Order Badge */}
              <div
                className="absolute top-2 left-2 w-5 h-5 flex items-center justify-center text-[10px] font-black shadow-xs rounded-none"
                style={{ backgroundColor: stepStyle.bg, color: stepStyle.text }}
                title={`Stroke ${strokeNum}`}
              >
                {strokeNum}
              </div>

              {/* Completed checkmark */}
              {isDone && (
                <span className="absolute top-2 right-2 text-emerald-600 font-bold text-xs flex items-center gap-0.5">
                  ✓ done
                </span>
              )}

              {/* Exact stroke shape aligned to this letter */}
              <div className="w-20 h-14 flex items-center justify-center my-0.5 pointer-events-none">
                <svg
                  viewBox="0 0 60 60"
                  className="w-full h-full"
                >
                  <path
                    d={displayPath}
                    fill={stroke.patternName === 'Dot' ? (isDone ? '#22c55e' : '#4f46e5') : 'none'}
                    stroke={isDone ? '#22c55e' : '#4f46e5'}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Label */}
              <div className="text-center font-bold text-[#1e1b4b] text-xs sm:text-sm mt-0.5">
                {stroke.patternName}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
