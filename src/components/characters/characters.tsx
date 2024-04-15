import { CHARACTERS } from '@lib/characters.lib';
import React from 'react';
import Character from './character';
import useAppState from '@hooks/use-app-state';
import { AppActionType } from 'types/app.types';

const Characters: React.FC = () => {
  const { state, dispatch } = useAppState();
  return (
    <div className="flex gap-2 flex-wrap justify-center items-center">
      {CHARACTERS.map((character) => (
        <Character
          key={character.value}
          data={character}
          onClick={() => {
            dispatch({ type: AppActionType.APPEND_CHARACTER, payload: { character } });
          }}
        />
      ))}
    </div>
  );
};

export default Characters;
