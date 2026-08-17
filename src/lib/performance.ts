export class PerformanceMonitor {
  private frames: number[] = [];
  private lastTime = performance.now();
  private callback: (fps: number) => void;
  private threshold: number;
  private frameId: number | null = null;
  private enabled = false;

  constructor(callback: (fps: number) => void, threshold = 55) {
    this.callback = callback;
    this.threshold = threshold;
  }

  start() {
    this.enabled = true;
    this.tick();
  }

  stop() {
    this.enabled = false;
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }

  private tick = () => {
    if (!this.enabled) return;

    const now = performance.now();
    const delta = now - this.lastTime;
    this.lastTime = now;

    const fps = 1000 / delta;
    this.frames.push(fps);

    if (this.frames.length > 60) {
      this.frames.shift();
    }

    if (this.frames.length >= 30) {
      const avgFps =
        this.frames.reduce((a, b) => a + b, 0) / this.frames.length;
      this.callback(avgFps);
    }

    this.frameId = requestAnimationFrame(this.tick);
  };

  getAverageFPS(): number {
    if (this.frames.length === 0) return 60;
    return this.frames.reduce((a, b) => a + b, 0) / this.frames.length;
  }
}

export function getQualityLevel(fps: number): "high" | "medium" | "low" {
  if (fps >= 55) return "high";
  if (fps >= 35) return "medium";
  return "low";
}

export const instanceCounts = {
  high: 600,
  medium: 350,
  low: 200,
};

export const blobSubdivisions = {
  high: 4,
  medium: 3,
  low: 2,
};