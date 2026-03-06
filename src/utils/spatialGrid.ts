/**
 * Simple 3D spatial hash grid for fast nearest-neighbor lookups.
 * Avoids O(n) per-frame scans for 90k+ stations.
 */
export class SpatialGrid {
  private cellSize: number;
  private cells = new Map<string, number[]>();

  constructor(cellSize = 0.2) {
    this.cellSize = cellSize;
  }

  private key(x: number, y: number, z: number): string {
    const cx = Math.floor(x / this.cellSize);
    const cy = Math.floor(y / this.cellSize);
    const cz = Math.floor(z / this.cellSize);
    return `${cx},${cy},${cz}`;
  }

  build(coords: Float32Array, count: number) {
    this.cells.clear();
    for (let i = 0; i < count; i++) {
      const j = i * 3;
      const k = this.key(coords[j], coords[j + 1], coords[j + 2]);
      let cell = this.cells.get(k);
      if (!cell) {
        cell = [];
        this.cells.set(k, cell);
      }
      cell.push(i);
    }
  }

  /**
   * Find nearest station index within maxDist of point (px,py,pz).
   * Only searches neighboring cells — O(1) average.
   */
  findNearest(
    px: number, py: number, pz: number,
    coords: Float32Array,
    maxDist: number
  ): number {
    const maxDistSq = maxDist * maxDist;
    let bestIdx = -1;
    let bestSq = maxDistSq;

    const cx = Math.floor(px / this.cellSize);
    const cy = Math.floor(py / this.cellSize);
    const cz = Math.floor(pz / this.cellSize);

    // Search 3x3x3 neighborhood
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          const k = `${cx + dx},${cy + dy},${cz + dz}`;
          const cell = this.cells.get(k);
          if (!cell) continue;
          for (const idx of cell) {
            const j = idx * 3;
            const ex = px - coords[j];
            const ey = py - coords[j + 1];
            const ez = pz - coords[j + 2];
            const sq = ex * ex + ey * ey + ez * ez;
            if (sq < bestSq) {
              bestSq = sq;
              bestIdx = idx;
            }
          }
        }
      }
    }

    return bestIdx;
  }
}
