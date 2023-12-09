import { IQuestion, IState } from './types';

export const getQustions = (): IQuestion[] => {
  return require('../data/questions.json');
};

export const getStates = (): IState[] => {
  return require('../data/states.json');
};
