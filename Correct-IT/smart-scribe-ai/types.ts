export enum ToneType {
  ORIGINAL = 'Original',
  GRAMMAR = 'Fix Grammar',
  PROFESSIONAL = 'Professional',
  CASUAL = 'Casual',
  SOCIAL = 'Social',
  POLITE = 'Polite',
  WITTY = 'Witty',
  EMOJIFY = 'Emojify'
}

export interface Suggestion {
  original: string;
  transformed: string;
  tone: ToneType;
  explanation?: string;
}

export interface AIRequestState {
  status: 'idle' | 'loading' | 'success' | 'error';
  error?: string;
}
