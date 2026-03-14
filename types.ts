
export type EndingType = 's-es' | 'ed';

export type SoundCategory = '/s/' | '/z/' | '/ɪz/' | '/t/' | '/d/' | '/ɪd/';

export interface Verb {
  id: string;
  base: string;
  modified: string;
  type: EndingType;
  category: SoundCategory;
  example: string;
}

export interface Rule {
  id: string;
  type: EndingType;
  sound: SoundCategory;
  description: string;
  examples: string[];
  color: string;
  voiceless?: string[];
}

export type ExerciseType = 'odd-one-out' | 'identification' | 'sorting';

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
}
