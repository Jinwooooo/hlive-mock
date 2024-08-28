import { atom } from 'recoil';

export const currentStageAtom = atom<number>({
  key: 'currentStageAtom',
  default: 1,
});

export const selectedModelAtom = atom<string | null>({
  key: 'selectedModelAtom',
  default: null,
});
