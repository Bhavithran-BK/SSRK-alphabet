import type { LearningProgress, CaseType } from '../types';

const STORAGE_KEY = 'alphabet-learning-progress';

const defaultProgress: LearningProgress = {
  lowercaseCompleted: [],
  uppercaseCompleted: [],
  lastSelectedCase: 'lowercase',
  lastSelectedLetter: 'a',
};

export function loadProgress(): LearningProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as LearningProgress;
    }
  } catch {
    // If parsing fails, return default
  }
  return { ...defaultProgress };
}

export function saveProgress(progress: LearningProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // LocalStorage may be full or unavailable
  }
}

export function markLetterCompleted(
  caseType: CaseType,
  letter: string
): LearningProgress {
  const progress = loadProgress();
  const arr = caseType === 'lowercase'
    ? progress.lowercaseCompleted
    : progress.uppercaseCompleted;
  
  if (!arr.includes(letter)) {
    arr.push(letter);
  }
  
  saveProgress(progress);
  return progress;
}

export function isLetterCompleted(
  caseType: CaseType,
  letter: string
): boolean {
  const progress = loadProgress();
  const arr = caseType === 'lowercase'
    ? progress.lowercaseCompleted
    : progress.uppercaseCompleted;
  return arr.includes(letter);
}

export function getCompletionCount(caseType: CaseType): number {
  const progress = loadProgress();
  return caseType === 'lowercase'
    ? progress.lowercaseCompleted.length
    : progress.uppercaseCompleted.length;
}

export function updateLastSelected(
  caseType: CaseType,
  letter: string
): void {
  const progress = loadProgress();
  progress.lastSelectedCase = caseType;
  progress.lastSelectedLetter = letter;
  saveProgress(progress);
}

export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}

