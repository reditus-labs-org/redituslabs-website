/** Art-directed generated images have a 4K export and two lighter variants. */
export function responsiveImage(src: string, sizes = '100vw') {
  if (!src.includes('/4k/') || !src.endsWith('-4k.jpg')) return {};
  const portrait = /\/(startups|education|healthcare|retail|finance)-4k\.jpg$/.test(src);
  const widths = portrait ? [540, 1080, 2160] : [960, 1920, 3840];
  return {
    srcSet: widths.map((width, index) => `${index === 2 ? src : src.replace('-4k.jpg', `-${width}.jpg`)} ${width}w`).join(', '),
    sizes,
    width: portrait ? 2160 : 3840,
    height: portrait ? 3840 : 2160,
    decoding: 'async' as const,
  };
}
