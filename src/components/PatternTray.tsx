import type { PointerEvent as ReactPointerEvent } from 'react';
import type { Stroke } from '../types';

interface PatternTrayProps {
  strokes: Stroke[];
  completedStrokes: Set<string>;
  onStartDrag: (stroke: Stroke, e: ReactPointerEvent) => void;
}

const stepColors: Record<number, { bg: string; text: string }> = {
  1: { bg: '#ec4899', text: '#ffffff' }, // Pink
  2: { bg: '#3b82f6', text: '#ffffff' }, // Blue
  3: { bg: '#f97316', text: '#ffffff' }, // Orange
  4: { bg: '#10b981', text: '#ffffff' }, // Green
};

export default function PatternTray({
  strokes,
  completedStrokes,
  onStartDrag,
}: PatternTrayProps) {
  return (
    <div className="bg-white border-2 border-gray-200 shadow-sm flex flex-col h-full w-full p-4 rounded-none select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-lg">🧩</span>
          <h2 className="text-sm font-bold text-[#1e1b4b] uppercase tracking-wider">
            Available Patterns
          </h2>
        </div>
        <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 border border-indigo-200">
          Drag to Match
        </span>
      </div>

      {/* Pattern Cards List */}
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1">
        {strokes.map((stroke, index) => {
          const isDone = completedStrokes.has(stroke.id);
          const strokeNum = stroke.strokeNumber || (index + 1);
          const stepStyle = stepColors[strokeNum] || stepColors[1];
          const displayPath = stroke.previewPath || stroke.targetPath;
          const isDot = stroke.patternName === 'Dot';

          return (
            <div
              key={stroke.id}
              className={`
                relative bg-white border-2 transition-all p-3 flex flex-col items-center justify-center rounded-none
                ${isDone
                  ? 'border-emerald-300 bg-emerald-50/50 opacity-60 cursor-default'
                  : 'border-gray-200 hover:border-indigo-600 hover:shadow-md cursor-grab active:cursor-grabbing bg-white'
                }
              `}
              onPointerDown={(e) => {
                if (!isDone) {
                  onStartDrag(stroke, e);
                }
              }}
            >
              {/* Stroke Order Number Badge */}
              <div
                className="absolute top-2 left-2 w-5 h-5 flex items-center justify-center text-[10px] font-black shadow-xs rounded-none"
                style={{ backgroundColor: stepStyle.bg, color: stepStyle.text }}
                title={`Stroke ${strokeNum}`}
              >
                {strokeNum}
              </div>

              {/* Status Badge */}
              {isDone ? (
                <span className="absolute top-2 right-2 text-emerald-700 font-bold text-xs bg-emerald-100 px-1.5 py-0.5 border border-emerald-300">
                  ✓ Placed
                </span>
              ) : (
                <span className="absolute top-2 right-2 text-[10px] font-bold text-gray-400">
                  Drag
                </span>
              )}

              {/* SVG Pattern Shape - Aligned to this specific stroke */}
              <div className="w-20 h-14 flex items-center justify-center my-1 pointer-events-none">
                <svg
                  viewBox="0 0 60 60"
                  className="w-full h-full"
                >
                  <path
                    d={displayPath}
                    fill={isDot ? (isDone ? '#22c55e' : '#4f46e5') : 'none'}
                    stroke={isDone ? '#22c55e' : '#4f46e5'}
                    strokeWidth={isDot ? '2' : '6.5'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Pattern Name */}
              <div className="text-center font-bold text-[#1e1b4b] text-xs sm:text-sm mt-1">
                {stroke.patternName}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Instructions */}
      <div className="pt-2 mt-2 border-t border-gray-100 text-[11px] text-gray-500 text-center font-medium">
        Drag each pattern onto its matching letter track
      </div>
    </div>
  );
}
