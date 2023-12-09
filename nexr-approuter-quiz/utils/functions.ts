import { IQuestion } from './types';

export const getQustions = (): IQuestion[] => {
  return require('../data/questions.json');
};
