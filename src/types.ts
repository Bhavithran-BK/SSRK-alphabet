// Types for the alphabet learning application

export type CaseType = 'lowercase' | 'uppercase';

export type PatternName = 
  | 'Standing Line'
  | 'Sleeping Line'
  | 'Crossing Line'
  | 'Left Curve'
  | 'Right Curve'
  | 'Curve'
  | 'Dot';

export interface Stroke {
  id: string;
  patternName: PatternName;
  svgPath: string;        // SVG path for the draggable pattern piece
  targetX: number;        // Target X position in the workspace
  targetY: number;        // Target Y position in the workspace
  targetPath: string;     // SVG path at the target location (for dotted outline)
  previewPath?: string;   // Exact stroke shape normalized in 0 0 60 60 for the option card
  strokeNumber?: number;  // 1, 2, 3, 4 corresponding to stroke order reference
  startPoint?: [number, number]; // [x, y] coordinates where the stroke starts
}

export interface LetterData {
  character: string;
  caseType: CaseType;
  referencePath: string;  // Full dotted outline SVG path
  viewBox: string;        // SVG viewBox
  strokes: Stroke[];
}

export interface LearningProgress {
  lowercaseCompleted: string[];
  uppercaseCompleted: string[];
  lastSelectedCase: CaseType;
  lastSelectedLetter: string;
}

export interface DragState {
  isDragging: boolean;
  strokeId: string | null;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  offsetX: number;
  offsetY: number;
}
