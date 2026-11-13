// The hero's paper texture: Paper Shaders' dithering fragment shader (Apache-2.0), same approach as the
// owner's personal site but tuned for a white page: near-white ink on white, so it reads as paper grain,
// never as a picture behind the text. ShaderMount pauses itself off-screen and in hidden tabs.
// Reduced motion renders one static frame; without WebGL the element keeps its CSS halftone.
import {
  ShaderMount,
  ditheringFragmentShader,
  DitheringShapes,
  DitheringTypes,
  ShaderFitOptions,
  getShaderColorFromString,
} from '@paper-design/shaders';

const MAX_DPR = 1.5;

/** Mix two #rrggbb colours: t=0 gives a, t=1 gives b. */
function mixHex(a: string, b: string, t: number) {
  const ch = (h: string, i: number) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
  return '#' + [0, 1, 2].map((i) => Math.round(ch(a, i) + (ch(b, i) - ch(a, i)) * t).toString(16).padStart(2, '0')).join('');
}

export function mountHeroShader(host: HTMLElement | null) {
  if (!host) return;
  const css = getComputedStyle(document.documentElement);
  const paper = css.getPropertyValue('--paper').trim() || '#ffffff';
  const ink = mixHex(paper, css.getPropertyValue('--ink').trim() || '#0b0b0b', 0.11);
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cap = () => Math.max(1, host.clientWidth * host.clientHeight) * MAX_DPR * MAX_DPR;
  try {
    const mount = new ShaderMount(
      host,
      ditheringFragmentShader,
      {
        u_colorBack: getShaderColorFromString(paper),
        u_colorFront: getShaderColorFromString(ink),
        u_shape: DitheringShapes.warp,
        u_type: DitheringTypes['4x4'],
        u_pxSize: 3,
        u_fit: ShaderFitOptions.none,
        u_scale: 0.8,
        u_rotation: 0,
        u_offsetX: 0.3,
        u_offsetY: 0,
        u_originX: 0.5,
        u_originY: 0.5,
        u_worldWidth: 0,
        u_worldHeight: 0,
      },
      { premultipliedAlpha: false, alpha: false },
      still ? 0 : 0.12,
      2400,
      1,
      cap(),
    );
    host.classList.add('has-gl');
    let t = 0;
    addEventListener('resize', () => {
      clearTimeout(t);
      t = window.setTimeout(() => mount.setMaxPixelCount(cap()), 150);
    });
  } catch {
    // No WebGL: the CSS halftone on the element stays.
  }
}
