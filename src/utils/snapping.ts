// Snapping utility functions

/**
 * Calculate distance between two points
 */
export function getDistance(
  x1: number, y1: number,
  x2: number, y2: number
): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 * Check if a dragged piece is close enough to snap to its target
 */
export function isWithinSnapThreshold(
  dragX: number,
  dragY: number,
  targetX: number,
  targetY: number,
  threshold: number = 35
): boolean {
  return getDistance(dragX, dragY, targetX, targetY) <= threshold;
}

/**
 * Get adaptive snap threshold based on workspace size
 * Larger workspaces get a slightly larger threshold
 */
export function getAdaptiveThreshold(workspaceSize: number): number {
  const baseThreshold = 35;
  const scaleFactor = workspaceSize / 400; // 400px is our reference size
  return Math.max(25, Math.min(50, baseThreshold * scaleFactor));
}

/**
 * Convert screen coordinates to SVG coordinates
 */
export function screenToSvg(
  screenX: number,
  screenY: number,
  svgElement: SVGSVGElement
): { x: number; y: number } {
  const rect = svgElement.getBoundingClientRect();
  const viewBox = svgElement.viewBox.baseVal;
  
  const scaleX = viewBox.width / rect.width;
  const scaleY = viewBox.height / rect.height;
  
  return {
    x: (screenX - rect.left) * scaleX + viewBox.x,
    y: (screenY - rect.top) * scaleY + viewBox.y,
  };
}

