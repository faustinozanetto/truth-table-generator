import React from 'react';
import { CharacterData } from 'types/app.types';
import { Button } from 'ui/components/button';

interface CharacterProps {
  data: CharacterData;
  onClick: () => void;
}

const Character: React.FC<CharacterProps> = (props) => {
  const { data, onClick } = props;

  return (
    <Button size="icon" variant="outline" onClick={onClick}>
      {data.value}
    </Button>
  );
};

export default Character;
