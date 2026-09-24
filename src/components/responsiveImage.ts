/** Provide dimension attributes and async decoding for high-res assets. */
export function responsiveImage(src: string, _sizes = '100vw') {
  if (!src.includes('/4k/') || !src.endsWith('-4k.jpg')) return {};
  const portrait = /\/(startups|education|healthcare|retail|finance)-4k\.jpg$/.test(src);
  return {
    width: portrait ? 2160 : 3840,
    height: portrait ? 3840 : 2160,
    decoding: 'async' as const,
  };
}
