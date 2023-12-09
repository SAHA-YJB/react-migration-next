import { IState } from '@/utils/types';
import React from 'react';

interface SelectStateProps {
  states: IState[];
  state: (value: number) => void;
}

const SelectState = ({ states, state }: SelectStateProps) => {
  return (
    <select
      onChange={(e) => state(Number(e.target.value))}
      className='mt-1 w-full rounded-md border border-gray-300
      bg-white py-2 px-3 shadow-sm  focus:border-indigo-500
      focus:outline-none focus:ring-indigo-1 sm:text-sm'
    >
      {states.map((state) => (
        <option key={state.id} value={state.id - 1}>
          {state.title}
        </option>
      ))}
    </select>
  );
};

export default SelectState;
