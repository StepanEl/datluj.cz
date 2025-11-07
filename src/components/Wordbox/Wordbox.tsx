import React, { useEffect, useState } from 'react';
import './Wordbox.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void
  active: boolean;
  onMistake: () => void
}

const Wordbox: React.FC<IWordboxProp> = ({ word, onFinish, active, onMistake }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);
  const [mistake, setMistake] = useState<boolean>(false)

 useEffect(() => {
    setLettersLeft(word);
    setMistake(false);
  }, [word]);

  const handleKeyUp = (e: KeyboardEvent) => {
    if (!active) return;

    if (e.key === lettersLeft[0]) {
      if (lettersLeft.length === 1) {
        onFinish();
        setMistake(false);
      } else {
        setLettersLeft(lettersLeft.slice(1));
        setMistake(false);
      }
    } else {
      setMistake(true);
      onMistake()
    }
  };

  useEffect(() => {
    if (!active) return;

    document.addEventListener('keyup', handleKeyUp);
    return () => document.removeEventListener('keyup', handleKeyUp);
  }, [active, lettersLeft, onMistake]);

  return (
    <div className={`wordbox ${mistake && 'wordbox--mistake'}`} >{lettersLeft}</div>
  );
};

export default Wordbox;
