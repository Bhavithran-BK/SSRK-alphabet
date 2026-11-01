import type { PatternName } from '../types';

// Pattern display configurations matching UI.png
export interface PatternConfig {
  name: PatternName;
  displayPath: string;  // SVG path for display in the tray
  color: string;
  viewBox: string;
  description: string;
}

export const patternConfigs: Record<PatternName, PatternConfig> = {
  'Standing Line': {
    name: 'Standing Line',
    displayPath: 'M 25 10 L 25 40',
    color: '#6366F1', // Indigo / Purple from UI.png
    viewBox: '0 0 50 50',
    description: 'Vertical stroke',
  },
  'Sleeping Line': {
    name: 'Sleeping Line',
    displayPath: 'M 10 25 L 40 25',
    color: '#6366F1',
    viewBox: '0 0 50 50',
    description: 'Horizontal stroke',
  },
  'Crossing Line': {
    name: 'Crossing Line',
    displayPath: 'M 12 38 L 38 12',
    color: '#6366F1',
    viewBox: '0 0 50 50',
    description: 'Slanting stroke',
  },
  'Left Curve': {
    name: 'Left Curve',
    displayPath: 'M 36 12 C 14 12 14 38 36 38',
    color: '#6366F1',
    viewBox: '0 0 50 50',
    description: 'Bends left',
  },
  'Right Curve': {
    name: 'Right Curve',
    displayPath: 'M 14 12 C 36 12 36 38 14 38',
    color: '#6366F1',
    viewBox: '0 0 50 50',
    description: 'Bends right',
  },
  'Curve': {
    name: 'Curve',
    displayPath: 'M 10 36 C 10 14 40 14 40 36', // Arch curve matching UI.png
    color: '#6366F1',
    viewBox: '0 0 50 50',
    description: 'Curved stroke',
  },
  'Dot': {
    name: 'Dot',
    displayPath: 'M 25 21 A 4 4 0 1 1 25 29 A 4 4 0 1 1 25 21',
    color: '#6366F1',
    viewBox: '0 0 50 50',
    description: 'Small dot',
  },
};

export function getRequiredPatterns(patternNames: PatternName[]): PatternConfig[] {
  const seen = new Set<PatternName>();
  const result: PatternConfig[] = [];
  
  for (const name of patternNames) {
    if (!seen.has(name)) {
      seen.add(name);
      result.push(patternConfigs[name] || patternConfigs['Curve']);
    }
  }
  
  return result;
}
