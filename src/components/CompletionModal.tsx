import { motion } from 'framer-motion';
import type { CaseType } from '../types';
import { sounds } from '../utils/audio';

interface CompletionModalProps {
  letter: string;
  caseType: CaseType;
  onNext?: () => void;
  onReplay: () => void;
  onHome: () => void;
}

export default function CompletionModal({
  letter,
  caseType,
  onNext,
  onReplay,
  onHome,
}: CompletionModalProps) {
  const isLower = caseType === 'lowercase';
  const confettiColors = ['#10B981', '#3B82F6', '#F59E0B', '#EC4899', '#8B5CF6'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      {/* Falling confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${8 + Math.random() * 10}px`,
              height: `${8 + Math.random() * 10}px`,
              backgroundColor: confettiColors[i % confettiColors.length],
              animationDelay: `${Math.random() * 1.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative bg-white p-6 sm:p-8 max-w-sm sm:max-w-md w-full shadow-2xl border border-emerald-400 text-center z-10 rounded-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        {/* School Logo */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src="/logo.png" alt="Sri Sairam Kids Play School" className="w-8 h-8 object-contain" />
          <span className="text-xs font-bold text-[#1e1b4b]">Sri Sairam Kids Play School</span>
        </div>

        <div className="text-4xl mb-2">⭐</div>

        <h2 className="text-2xl font-black text-emerald-600 mb-1">
          Awesome Work!
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm mb-4">
          You built the {isLower ? 'small' : 'capital'} letter <span className="font-black text-[#1e1b4b] text-lg">{letter}</span>!
        </p>

        {/* Large completed letter display */}
        <div
          className="w-24 h-24 mx-auto mb-4 bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center cursor-pointer rounded-lg shadow-inner"
          onClick={() => sounds.speakLetter(letter)}
          title="Click to hear pronunciation"
        >
          <span className="text-5xl font-black text-emerald-600 select-none">
            {letter}
          </span>
        </div>

        {/* Action Buttons: smooth rounded corners */}
        <div className="flex flex-col gap-2">
          {onNext && (
            <button
              onClick={onNext}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm cursor-pointer transition-all rounded-md shadow-md shadow-emerald-600/20"
            >
              Next Letter ➡️
            </button>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onReplay}
              className="py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs cursor-pointer transition-colors border border-gray-300 rounded-md"
            >
              🔄 Try Again
            </button>
            <button
              onClick={onHome}
              className="py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer transition-colors rounded-md shadow-xs"
            >
              🏠 Home
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
