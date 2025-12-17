export enum MemeStyle {
  CLASSIC = 'Classic Impact Font',
  MODERN = 'Modern Twitter/X Style',
  SURREAL = 'Surreal/Abstract',
  DEEP_FRIED = 'Deep Fried',
  PIXEL_ART = 'Pixel Art',
  RETRO_90S = 'Retro 90s Internet',
  MINIMALIST = 'Minimalist Vector',
  COMIC_STRIP = 'Comic Strip Panel'
}

export interface MemeRequest {
  topic: string;
  customCaption?: string;
  style: MemeStyle;
  temperature: number;
}

export interface GeneratedMeme {
  id: string;
  imageUrl: string;
  timestamp: number;
  request: MemeRequest;
}

export interface GenerationState {
  isLoading: boolean;
  error: string | null;
}