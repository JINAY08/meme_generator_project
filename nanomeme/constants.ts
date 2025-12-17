import { MemeStyle } from './types';

export const MEME_STYLES = [
  { value: MemeStyle.CLASSIC, label: 'Classic (Impact Font)', description: 'Old school top/bottom text' },
  { value: MemeStyle.MODERN, label: 'Modern Social', description: 'Clean text above image' },
  { value: MemeStyle.SURREAL, label: 'Surreal', description: 'Weird, dreamlike, nonsensical' },
  { value: MemeStyle.DEEP_FRIED, label: 'Deep Fried', description: 'High contrast, noisy, chaotic' },
  { value: MemeStyle.PIXEL_ART, label: 'Pixel Art', description: '8-bit retro gaming vibe' },
  { value: MemeStyle.RETRO_90S, label: 'Retro 90s', description: 'Windows 95 aesthetic' },
  { value: MemeStyle.COMIC_STRIP, label: 'Comic Panel', description: 'Drawn style with speech bubbles' },
];

export const DEFAULT_TEMPERATURE = 0.8;
