import { WebGLRenderer, Scene, OrthographicCamera, PlaneGeometry, ShaderMaterial, Mesh, Vector2 } from 'three';
import { gsap } from 'gsap';

/** Scroll-driven mountain atmosphere, kept inside the photographic scene. No idle animation loop. */
export async function initHeroWebGL(
  canvas: HTMLCanvasElement,
  signal: AbortSignal,
  getProgress: () => number = () => 0,
): Promise<() => void> {
  if (signal.aborted) return () => {};
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
  } catch {
    canvas.hidden = true;
    return () => {};
  }
  canvas.hidden = false;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
  renderer.setClearColor(0x000000, 0);
  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 2);
  camera.position.z = 1;
  const geometry = new PlaneGeometry(2, 2);
  const material = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { uProgress: { value: 0 }, uPointer: { value: new Vector2(0, 0) } },
    vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}`,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uProgress;
      uniform vec2 uPointer;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float noise(vec2 p){
        vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
        return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);
      }
      void main(){
        vec2 drift=vec2(uProgress*.48,uProgress*.17)+uPointer*.025;
        vec2 p=vUv*vec2(4.5,7.0)+drift;
        float cloud=noise(p)*.6+noise(p*2.1)*.28+noise(p*4.2)*.12;
        float foreground=(1.-smoothstep(.12,.65,vUv.y))*smoothstep(.2,.75,vUv.x);
        float density=smoothstep(.32,.72,cloud)*foreground*.18;
        gl_FragColor=vec4(.963,.966,.935,density);
      }
    `,
  });
  scene.add(new Mesh(geometry, material));
  const surface = canvas.closest<HTMLElement>('#home') ?? canvas.parentElement ?? canvas;
  let visible = false;
  let dirty = true;
  let disposed = false;
  let contextLost = false;
  let previousProgress = -1;
  const targetPointer = new Vector2();
  const render = () => {
    if (disposed || contextLost || !visible || document.hidden) return;
    const progress = getProgress();
    if (Math.abs(progress - previousProgress) > 0.0002) {
      material.uniforms.uProgress.value = progress;
      previousProgress = progress;
      dirty = true;
    }
    const pointer = material.uniforms.uPointer.value as Vector2;
    if (pointer.distanceToSquared(targetPointer) > 0.00001) {
      pointer.lerp(targetPointer, 0.08);
      dirty = true;
    }
    if (dirty) { renderer.render(scene, camera); dirty = false; }
  };
  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height || disposed || contextLost) return;
    renderer.setSize(width, height, false);
    dirty = true;
    render();
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    dirty = true;
    render();
  });
  const resizeObserver = new ResizeObserver(resize);
  const pointerMove = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    const bounds = surface.getBoundingClientRect();
    targetPointer.set((event.clientX-bounds.left)/Math.max(bounds.width,1)-.5,(event.clientY-bounds.top)/Math.max(bounds.height,1)-.5);
  };
  const reset = () => { targetPointer.set(0, 0); };
  const lost = (event: Event) => { event.preventDefault(); contextLost = true; canvas.hidden = true; };
  observer.observe(canvas);
  resizeObserver.observe(canvas);
  surface.addEventListener('pointermove', pointerMove, { passive: true });
  surface.addEventListener('pointerleave', reset);
  canvas.addEventListener('webglcontextlost', lost);
  gsap.ticker.add(render);
  resize();
  return () => {
    disposed = true;
    gsap.ticker.remove(render);
    observer.disconnect();
    resizeObserver.disconnect();
    surface.removeEventListener('pointermove', pointerMove);
    surface.removeEventListener('pointerleave', reset);
    canvas.removeEventListener('webglcontextlost', lost);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    canvas.width = 1;
    canvas.height = 1;
  };
}
